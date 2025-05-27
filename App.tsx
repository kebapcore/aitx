
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TextEditor from './components/TextEditor';
import MarkdownPreview from './components/MarkdownPreview';
import Toolbar from './components/Toolbar';
import SideAssistantPanel from './components/SideAssistantPanel';
import Modal from './components/Modal';
import SettingsModal from './components/SettingsModal';
import LoadingSpinner from './components/LoadingSpinner';

import { 
    AiTextFile, 
    EditorSettings, 
    Theme, 
    AiHistoryRecord, 
    Message, 
    LexiActionCommand, 
    AssistantInteractionRecord,
    AppState,
    TabState
} from './types';
import { 
    APP_VERSION, 
    DEFAULT_EDITOR_SETTINGS,
    THEME_DEFINITIONS, // Added for new theme system
    LOCALSTORAGE_APP_STATE_KEY,
    LOCALSTORAGE_LAUNCHED_BEFORE_KEY,
    GET_STARTED_MARKDOWN_CONTENT
} from './constants';
import { initializeAi, isAiInitialized, sendMessageToAssistantStream, resetAssistantChat } from './services/geminiService';
import useSpeechSynthesis from './hooks/useSpeechSynthesis';

const parseLexiResponse = (responseText: string): {
  displayText: string;
  actionCommand: LexiActionCommand | null;
  metadataText: string | null;
} => {
  let displayText = responseText;
  let actionCommand: LexiActionCommand | null = null;
  let metadataText: string | null = null;

  const commandRegex = /\{(regenerate|append):([\s\S]*?)\}/s;
  const metadataRegex = /\{metadata:([\s\S]*?)\}/s;

  const commandMatch = responseText.match(commandRegex);
  if (commandMatch) {
    actionCommand = {
      type: commandMatch[1] as 'regenerate' | 'append',
      payload: commandMatch[2],
      originalCommandString: commandMatch[0],
    };
    displayText = displayText.replace(commandMatch[0], '').trim();
  }

  const metadataMatch = displayText.match(metadataRegex);
  if (metadataMatch) {
    metadataText = metadataMatch[1].trim();
    displayText = displayText.replace(metadataMatch[0], '').trim();
  }
  
  if (!metadataText) {
      const originalMetadataMatch = responseText.match(metadataRegex);
      if (originalMetadataMatch && (!actionCommand || !actionCommand.originalCommandString.includes(originalMetadataMatch[0]))) {
          metadataText = originalMetadataMatch[1].trim();
          if(displayText.includes(originalMetadataMatch[0])) {
            displayText = displayText.replace(originalMetadataMatch[0], '').trim();
          }
      }
  }
  return { displayText, actionCommand, metadataText };
};

const createNewTab = (title = "Untitled", content = "", type: 'text' = 'text'): TabState => ({
    id: uuidv4(),
    title,
    type,
    textContent: content,
    assistantMessages: [{ 
        id: `lexi-intro-tab-${Date.now()}`, 
        sender: 'ai', 
        text: `Welcome to your new tab${title !== "Untitled" ? `: "${title}"` : ""}! I'm Lexi. How can I help you here?`, 
        timestamp: Date.now() 
    }],
    aiHistory: [],
});


const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState | null>(null);
  const [isLoadingState, setIsLoadingState] = useState<boolean>(true);
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isApiKeySet, setIsApiKeySet] = useState<boolean>(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [devApiKeyInput, setDevApiKeyInput] = useState<string>('');
  const [isDevApiKeyLoading, setIsDevApiKeyLoading] = useState<boolean>(false);

  const [isAssistantTyping, setIsAssistantTyping] = useState<boolean>(false);
  const { speak, cancel: cancelSpeech, isSupported: ttsSupported } = useSpeechSynthesis();
  const [isMarkdownPreviewActive, setIsMarkdownPreviewActive] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (initializeAi()) {
        setIsApiKeySet(true);
    } else {
        const devKey = localStorage.getItem('GEMINI_API_KEY_DEV');
        if (devKey) {
             if (initializeAi()) setIsApiKeySet(true); 
        }
    }

    const storedAppState = localStorage.getItem(LOCALSTORAGE_APP_STATE_KEY);
    if (storedAppState) {
      try {
        const parsedState = JSON.parse(storedAppState) as AppState;
        if (parsedState.tabs && parsedState.editorSettings) {
          // Ensure theme exists in THEME_DEFINITIONS, otherwise default
          const validTheme = THEME_DEFINITIONS[parsedState.editorSettings.theme] 
            ? parsedState.editorSettings.theme 
            : DEFAULT_EDITOR_SETTINGS.theme;
          setAppState({
            ...parsedState,
            editorSettings: { 
              ...DEFAULT_EDITOR_SETTINGS, 
              ...parsedState.editorSettings,
              theme: validTheme, // Use validated or default theme
             }
          });
        } else {
          loadDefaultState(); // Fallback if structure is too old or invalid
        }
      } catch (e) {
        console.error("Failed to parse stored app state, resetting:", e);
        localStorage.removeItem(LOCALSTORAGE_APP_STATE_KEY);
        loadDefaultState();
      }
    } else {
      loadDefaultState();
    }
    setIsLoadingState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDefaultState = () => {
    const launchedBefore = localStorage.getItem(LOCALSTORAGE_LAUNCHED_BEFORE_KEY);
    let initialTabs: TabState[];
    let initialActiveTabId: string | null;

    if (!launchedBefore) {
      const getStartedTab = createNewTab("Get Started", GET_STARTED_MARKDOWN_CONTENT);
      getStartedTab.assistantMessages = [{ 
          id: `lexi-intro-getstarted-${Date.now()}`, 
          sender: 'ai', 
          text: "Welcome! I'm Lexi. This 'Get Started' guide should help you out. Ask me anything!", 
          timestamp: Date.now() 
      }];
      initialTabs = [getStartedTab];
      initialActiveTabId = getStartedTab.id;
      localStorage.setItem(LOCALSTORAGE_LAUNCHED_BEFORE_KEY, 'true');
    } else {
      const defaultTab = createNewTab();
      initialTabs = [defaultTab];
      initialActiveTabId = defaultTab.id;
    }
    setAppState({
      tabs: initialTabs,
      activeTabId: initialActiveTabId,
      editorSettings: DEFAULT_EDITOR_SETTINGS,
    });
  };

  useEffect(() => {
    if (appState && !isLoadingState) {
      localStorage.setItem(LOCALSTORAGE_APP_STATE_KEY, JSON.stringify(appState));
    }
  }, [appState, isLoadingState]);

  // Update document theme, background, and music based on settings
  useEffect(() => {
    if (appState?.editorSettings) {
      const settings = appState.editorSettings;
      
      // --- Theme Application ---
      const themeKey = settings.theme;
      const themeDefinition = THEME_DEFINITIONS[themeKey] || THEME_DEFINITIONS[DEFAULT_EDITOR_SETTINGS.theme]; // Fallback
      
      // Clear old theme classes
      Object.keys(THEME_DEFINITIONS).forEach(key => {
        document.documentElement.classList.remove(`theme-${key}`);
      });

      // Add new theme class
      document.documentElement.classList.add(`theme-${themeKey}`);
      document.documentElement.classList.toggle('dark', themeDefinition.isDark);
      
      // Inject CSS Variables
      const styleElement = document.getElementById('dynamic-theme-styles');
      if (styleElement) {
        let cssText = `:root.theme-${themeKey} {\n`;
        for (const [variable, value] of Object.entries(themeDefinition.variables)) {
          cssText += `  ${variable}: ${value};\n`;
        }
        cssText += `}\n`;
        // For scrollbar styling (Tailwind doesn't directly support this via JS config)
        if (themeDefinition.variables['--theme-scrollbar-thumb'] && themeDefinition.variables['--theme-scrollbar-track']) {
            cssText += `
              .theme-${themeKey} ::-webkit-scrollbar { width: 8px; height: 8px; }
              .theme-${themeKey} ::-webkit-scrollbar-track { background: var(--theme-scrollbar-track); border-radius: 4px; }
              .theme-${themeKey} ::-webkit-scrollbar-thumb { background: var(--theme-scrollbar-thumb); border-radius: 4px; }
              .theme-${themeKey} ::-webkit-scrollbar-thumb:hover { background: color-mix(in srgb, var(--theme-scrollbar-thumb) 80%, #fff 20%); }
            `;
        }
        styleElement.textContent = cssText;
      }
      // --- End Theme Application ---

      if (settings.backgroundImageUrl) {
        document.body.style.backgroundImage = `url('${settings.backgroundImageUrl}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.transition = 'background-image 0.5s ease-in-out';
      } else {
        document.body.style.backgroundImage = '';
      }
      // Page background is now handled by --theme-bg-page in dynamic-theme-styles
      // document.body.className = `font-sans antialiased`; // Base classes set in index.html
      
      if (audioRef.current) {
        if (settings.backgroundMusicUrl && settings.backgroundMusicUrl !== audioRef.current.src) {
            audioRef.current.src = settings.backgroundMusicUrl;
            audioRef.current.load();
        } else if (!settings.backgroundMusicUrl) {
            audioRef.current.src = "";
        }
        
        if (settings.isMusicPlaying && settings.backgroundMusicUrl && audioRef.current.paused) {
            audioRef.current.play().catch(e => console.warn("Music autoplay prevented:", e));
        } else if (!settings.isMusicPlaying && !audioRef.current.paused) {
            audioRef.current.pause();
        }
        audioRef.current.loop = true;
      }
    }
  }, [appState?.editorSettings]);


  const handleSettingsChange = (newSettings: EditorSettings) => {
    setAppState(prev => prev ? { ...prev, editorSettings: newSettings } : null);
  };

  const handleToggleAssistantVoice = () => {
    setAppState(prev => {
        if (!prev) return null;
        const newVoiceState = !prev.editorSettings.assistantVoiceEnabled;
        if (!newVoiceState) cancelSpeech();
        return { 
            ...prev, 
            editorSettings: { ...prev.editorSettings, assistantVoiceEnabled: newVoiceState } 
        };
    });
  };
  const handleToggleMusic = () => {
    setAppState(prev => prev ? { 
        ...prev, 
        editorSettings: { ...prev.editorSettings, isMusicPlaying: !prev.editorSettings.isMusicPlaying } 
    } : null);
  };
  const handleTogglePreview = () => setIsMarkdownPreviewActive(prev => !prev);

  const handleToggleAssistantPanelVisibility = () => {
    setAppState(prev => {
        if (!prev) return null;
        return {
            ...prev,
            editorSettings: {
                ...prev.editorSettings,
                isAssistantPanelVisible: !(prev.editorSettings.isAssistantPanelVisible ?? true)
            }
        };
    });
  };


  const handleAddNewTab = useCallback(() => {
    setAppState(prev => {
      if (!prev) return null;
      const newTab = createNewTab();
      return {
        ...prev,
        tabs: [...prev.tabs, newTab],
        activeTabId: newTab.id,
      };
    });
    resetAssistantChat(); 
  }, []);

  const handleActivateTab = useCallback((tabId: string) => {
    setAppState(prev => prev ? { ...prev, activeTabId: tabId } : null);
    resetAssistantChat(); 
  }, []);

  const handleCloseTab = useCallback((tabIdToClose: string) => {
    setAppState(prev => {
      if (!prev) return null;
      const remainingTabs = prev.tabs.filter(tab => tab.id !== tabIdToClose);
      
      if (remainingTabs.length === 0) {
        const newDefaultTab = createNewTab();
        return { ...prev, tabs: [newDefaultTab], activeTabId: newDefaultTab.id };
      }

      let newActiveTabId = prev.activeTabId;
      if (prev.activeTabId === tabIdToClose) {
        const closingTabIndex = prev.tabs.findIndex(tab => tab.id === tabIdToClose);
        newActiveTabId = remainingTabs[Math.max(0, closingTabIndex -1)]?.id || remainingTabs[0]?.id;
      }
      return { ...prev, tabs: remainingTabs, activeTabId: newActiveTabId };
    });
    resetAssistantChat();
  }, []);

  const handleRenameTab = useCallback((tabId: string, newTitle: string) => {
    setAppState(prev => prev ? {
      ...prev,
      tabs: prev.tabs.map(tab => tab.id === tabId ? { ...tab, title: newTitle } : tab),
    } : null);
  }, []);

  const activeTab = appState?.tabs.find(tab => tab.id === appState.activeTabId);

  const handleActiveTabContentChange = (newContent: string) => {
    setAppState(prev => {
      if (!prev || !prev.activeTabId) return prev;
      return {
        ...prev,
        tabs: prev.tabs.map(tab => 
          tab.id === prev.activeTabId ? { ...tab, textContent: newContent } : tab
        ),
      };
    });
  };

  const updateActiveTabAiHistory = useCallback((newRecord: AiHistoryRecord) => {
    setAppState(prev => {
      if (!prev || !prev.activeTabId) return prev;
      return {
        ...prev,
        tabs: prev.tabs.map(tab =>
          tab.id === prev.activeTabId ? { ...tab, aiHistory: [...tab.aiHistory, newRecord] } : tab
        ),
      };
    });
  }, []);

  const handleSendAssistantMessage = async (userMessageText: string) => {
    if (!userMessageText.trim() || !isApiKeySet || !appState || !activeTab) {
        setErrorMessage("Cannot send message. API key, app state, or active tab might be missing.");
        return;
    }
    
    const newUserMessage: Message = {
        id: `user-${uuidv4()}`,
        sender: 'user',
        text: userMessageText,
        timestamp: Date.now(),
    };

    setAppState(prev => prev ? {
        ...prev,
        tabs: prev.tabs.map(t => t.id === activeTab.id ? {...t, assistantMessages: [...t.assistantMessages, newUserMessage]} : t)
    } : null);

    setIsAssistantTyping(true);
    setErrorMessage(null);

    const fullPromptForLexi = `User's current text:\n---\n${activeTab.textContent.trim() || "(empty)"}\n---\n\nUser's message: "${userMessageText}"`;
    let fullResponseText = "";
    const assistantMessageId = `ai-${uuidv4()}`;
    
    const placeholderAiMessage: Message = { 
        id: assistantMessageId, 
        sender: 'ai', 
        text: '', 
        timestamp: Date.now(),
        isActionPending: false
    };
    setAppState(prev => prev ? {
        ...prev,
        tabs: prev.tabs.map(t => t.id === activeTab.id ? {...t, assistantMessages: [...t.assistantMessages, placeholderAiMessage]} : t)
    } : null);


    try {
        const stream = await sendMessageToAssistantStream(fullPromptForLexi);
        if (stream) {
            for await (const chunk of stream) { 
                const chunkText = chunk.text;
                fullResponseText += chunkText;
                setAppState(prev => prev ? {
                    ...prev,
                    tabs: prev.tabs.map(t => t.id === activeTab.id ? {
                        ...t, 
                        assistantMessages: t.assistantMessages.map(m => 
                            m.id === assistantMessageId ? {...m, text: fullResponseText } : m
                        )
                    } : t)
                } : null);
            }

            const { displayText, actionCommand, metadataText } = parseLexiResponse(fullResponseText);
            
            setAppState(prev => prev ? {
                ...prev,
                tabs: prev.tabs.map(t => t.id === activeTab.id ? {
                    ...t,
                    assistantMessages: t.assistantMessages.map(m => 
                        m.id === assistantMessageId ? {
                            ...m, 
                            text: displayText || (actionCommand ? "Lexi suggests a change. You can preview it." : "(Lexi's response was empty)"),
                            actionCommand, 
                            metadataText,
                            isActionPending: !!actionCommand 
                        } : m
                    )
                } : t)
            } : null);

            if (appState.editorSettings.assistantVoiceEnabled && ttsSupported && displayText.trim()) {
                speak(displayText);
            }
            updateActiveTabAiHistory({ 
                type: 'assistant', 
                userMessage: userMessageText,
                editorSnapshot: activeTab.textContent, 
                assistantResponse: fullResponseText, 
                actionTaken: actionCommand ? actionCommand.type : 'none',
                timestamp: Date.now() 
            } as AssistantInteractionRecord);
        }
    } catch (error) {
        console.error("Assistant error:", error);
        const errorText = `Lexi had trouble responding: ${error instanceof Error ? error.message : String(error)}`;
        setAppState(prev => prev ? {
            ...prev,
            tabs: prev.tabs.map(t => t.id === activeTab.id ? {
                ...t,
                assistantMessages: t.assistantMessages.map(m => 
                    m.id === assistantMessageId ? {...m, text: errorText, isActionPending: false } : m
                )
            } : t)
        } : null);
        setErrorMessage(errorText);
    } finally {
        setIsAssistantTyping(false);
    }
  };

  const handleApplyLexiAction = (messageId: string) => {
    setAppState(prev => {
        if (!prev || !activeTab) return prev;
        const currentTab = prev.tabs.find(t => t.id === activeTab.id);
        if (!currentTab) return prev;

        const message = currentTab.assistantMessages.find(m => m.id === messageId);
        if (!message || !message.actionCommand) return prev;

        const { type, payload } = message.actionCommand;
        let newTextContent = currentTab.textContent;
        if (type === 'regenerate') {
            newTextContent = payload;
        } else if (type === 'append') {
            newTextContent = currentTab.textContent + payload;
        }

        return {
            ...prev,
            tabs: prev.tabs.map(t => t.id === activeTab.id ? {
                ...t,
                textContent: newTextContent,
                assistantMessages: t.assistantMessages.map(m => 
                    m.id === messageId ? { ...m, isActionPending: false, isActionApplied: true } : m
                )
            } : t)
        };
    });
  };

  const handleRejectLexiAction = (messageId: string) => {
     setAppState(prev => {
        if (!prev || !activeTab) return prev;
        return {
            ...prev,
            tabs: prev.tabs.map(t => t.id === activeTab.id ? {
                ...t,
                assistantMessages: t.assistantMessages.map(m => 
                    m.id === messageId ? { ...m, isActionPending: false, isActionRejected: true } : m
                )
            } : t)
        };
    });
  };

  const handleSaveFile = () => { 
    if (!appState || !activeTab) return;
    const fileData: AiTextFile = {
      version: APP_VERSION,
      activeTabContent: activeTab.textContent,
      activeTabAiHistory: activeTab.aiHistory,
      activeTabAssistantMessages: activeTab.assistantMessages, // Added
      editorSettings: appState.editorSettings,
    };
    const blob = new Blob([JSON.stringify(fileData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lexi-doc-${activeTab.title.replace(/\s+/g, '_')}-${Date.now()}.aitxt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLoadFile = (event: React.ChangeEvent<HTMLInputElement>) => { 
    const file = event.target.files?.[0];
    if (file && appState && activeTab) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result as string;
          const parsedData = JSON.parse(result) as AiTextFile;
          if (parsedData.version && parsedData.activeTabContent !== undefined && parsedData.editorSettings) {
             const validThemeOnLoad = THEME_DEFINITIONS[parsedData.editorSettings.theme] 
                ? parsedData.editorSettings.theme 
                : DEFAULT_EDITOR_SETTINGS.theme;

            setAppState(prev => {
                if (!prev || !prev.activeTabId) return prev;
                
                const loadedAssistantMessages: Message[] = // Explicitly type here
                    (parsedData.activeTabAssistantMessages && parsedData.activeTabAssistantMessages.length > 0)
                    ? parsedData.activeTabAssistantMessages
                    : [{ 
                        id: `lexi-intro-load-${uuidv4()}`, 
                        sender: 'ai', 
                        text: "File loaded into this tab. I'm Lexi, ready to assist!", 
                        timestamp: Date.now() 
                      }];

                return {
                    ...prev,
                    editorSettings: {
                        ...DEFAULT_EDITOR_SETTINGS, 
                        ...prev.editorSettings, 
                        ...parsedData.editorSettings,
                        theme: validThemeOnLoad, // Use validated theme from file or default
                    },
                    tabs: prev.tabs.map(tab => 
                      tab.id === prev.activeTabId ? { 
                          ...tab, 
                          textContent: parsedData.activeTabContent, 
                          aiHistory: parsedData.aiHistory || [],
                          assistantMessages: loadedAssistantMessages // Use loaded or default
                      } : tab
                    ),
                };
            });
            resetAssistantChat(); 
            setErrorMessage(null);
          } else {
            setErrorMessage('Invalid .aitxt file format.');
          }
        } catch (err) {
          setErrorMessage(`Failed to load file: ${err instanceof Error ? err.message : String(err)}`);
        }
      };
      reader.readAsText(file);
      event.target.value = ''; 
    }
  };

  const handleClearText = () => { 
    if (activeTab && window.confirm(`Are you sure you want to clear the text in tab "${activeTab.title}"? This cannot be undone.`)) {
      setAppState(prev => {
          if (!prev || !prev.activeTabId) return prev;
          return {
              ...prev,
              tabs: prev.tabs.map(tab => 
                tab.id === prev.activeTabId ? { 
                    ...tab, 
                    textContent: '',
                    assistantMessages: [...tab.assistantMessages, { 
                        id: `lexi-clear-${uuidv4()}`, 
                        sender: 'ai', 
                        text: "Editor cleared for this tab. Let's start something new!", 
                        timestamp: Date.now() 
                    }]
                } : tab
              ),
          };
      });
      resetAssistantChat();
    }
  };

  const handleSetDevApiKey = () => {
    if (devApiKeyInput.trim()) {
      localStorage.setItem('GEMINI_API_KEY_DEV', devApiKeyInput.trim());
      setIsDevApiKeyLoading(true);
      if (initializeAi()) {
        setIsApiKeySet(true);
        setIsApiKeyModalOpen(false);
        setDevApiKeyInput('');
        setErrorMessage(null);
      } else {
        setErrorMessage("API Key still invalid or service initialization failed.");
      }
      setIsDevApiKeyLoading(false);
    } else {
        setErrorMessage("Please enter an API Key.");
    }
  };
  
  if (isLoadingState || !appState || !activeTab) {
    return (
      <div className="flex items-center justify-center h-screen" style={{backgroundColor: 'var(--theme-bg-page, #111827)'}}>
        <LoadingSpinner size="w-16 h-16" color="text-sky-500" />
      </div>
    );
  }
  
  const currentThemeDef = THEME_DEFINITIONS[appState.editorSettings.theme] || THEME_DEFINITIONS['dark'];


  return (
    <div className={`flex flex-col h-screen min-h-screen font-sans transition-colors duration-300 overflow-hidden theme-${appState.editorSettings.theme} ${currentThemeDef.isDark ? 'dark' : ''}`}>
      <audio ref={audioRef} loop />
      <Toolbar
        tabs={appState.tabs}
        activeTabId={appState.activeTabId}
        onActivateTab={handleActivateTab}
        onCloseTab={handleCloseTab}
        onRenameTab={handleRenameTab}
        onNewTab={handleAddNewTab}
        onSaveFile={handleSaveFile}
        onLoadFile={handleLoadFile}
        isAssistantVoiceEnabled={appState.editorSettings.assistantVoiceEnabled}
        onToggleAssistantVoice={handleToggleAssistantVoice}
        onClearText={handleClearText}
        isApiKeySet={isApiKeySet}
        onSetDevApiKey={() => setIsApiKeyModalOpen(true)}
        onTogglePreview={handleTogglePreview}
        isPreviewActive={isMarkdownPreviewActive}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        isMusicPlaying={appState.editorSettings.isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        hasMusicUrl={!!appState.editorSettings.backgroundMusicUrl}
        isAssistantPanelVisible={appState.editorSettings.isAssistantPanelVisible ?? true}
        onToggleAssistantPanel={handleToggleAssistantPanelVisibility}
      />

      {errorMessage && (
        <div className="absolute top-[calc(theme(spacing.16)+theme(spacing.2))] left-1/2 -translate-x-1/2 z-30 p-3 bg-red-600/90 text-white text-sm rounded-md shadow-lg backdrop-blur-sm">
          {errorMessage}
          <button onClick={() => setErrorMessage(null)} className="ml-4 font-bold hover:text-red-200">✕</button>
        </div>
      )}
       {!isApiKeySet && !localStorage.getItem('GEMINI_API_KEY_DEV') && (
         <div className="absolute top-[calc(theme(spacing.16)+theme(spacing.2))] left-1/2 -translate-x-1/2 z-30 p-3 bg-yellow-500/90 text-black text-sm rounded-md shadow-lg backdrop-blur-sm">
            Gemini API Key not found. AI features are disabled. 
            <button onClick={() => setIsApiKeyModalOpen(true)} className="ml-2 underline font-semibold hover:text-yellow-800">Set Dev API Key</button>
        </div>
       )}

      <main className="flex-grow flex items-center justify-center p-4 md:p-6 lg:p-8 overflow-hidden relative" style={{ color: 'var(--theme-text-primary)'}}>
        <div className="flex w-full h-full max-w-7xl">
            {/* Main content area (Editor or Preview) */}
            <div 
              className="flex-1 flex flex-col backdrop-blur-xl shadow-2xl rounded-xl overflow-hidden min-w-0 h-full"
              style={{backgroundColor: 'var(--theme-bg-content-area)' }}
            >
                {isMarkdownPreviewActive ? (
                    <MarkdownPreview markdownText={activeTab.textContent} />
                ) : (
                    <TextEditor value={activeTab.textContent} onChange={handleActiveTabContentChange} />
                )}
            </div>
            
            {/* Assistant Panel */}
            {(appState.editorSettings.isAssistantPanelVisible ?? true) && (
                <div 
                  className="w-full md:w-[360px] lg:w-[420px] h-full ml-4 md:ml-6 backdrop-blur-lg shadow-2xl rounded-xl hidden md:flex flex-col overflow-hidden"
                  style={{backgroundColor: 'var(--theme-bg-assistant-panel)' }}
                >
                   <SideAssistantPanel 
                    messages={activeTab.assistantMessages} 
                    isTyping={isAssistantTyping} 
                    isAssistantVoiceEnabled={appState.editorSettings.assistantVoiceEnabled && ttsSupported}
                    onToggleVoice={handleToggleAssistantVoice} 
                    onSendMessage={handleSendAssistantMessage}
                    onApplyAction={handleApplyLexiAction}
                    onRejectAction={handleRejectLexiAction}
                    />
                </div>
            )}
        </div>
      </main>
      
      <Modal isOpen={isApiKeyModalOpen} onClose={() => setIsApiKeyModalOpen(false)} title="Set Gemini API Key (For Development)">
        <p className="text-sm mb-3 text-gray-300">This key will be stored in localStorage for development convenience. In production, API_KEY should be an environment variable.</p>
        <input
          type="password"
          value={devApiKeyInput}
          onChange={(e) => setDevApiKeyInput(e.target.value)}
          placeholder="Enter your Gemini API Key"
          className="w-full p-3 border rounded-md bg-gray-700 text-gray-100 border-gray-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow"
        />
        {isDevApiKeyLoading && <div className="flex justify-center my-3"><LoadingSpinner /></div>}
         <div className="flex justify-end space-x-3 mt-4">
            <button onClick={() => setIsApiKeyModalOpen(false)} className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500 transition-colors">Cancel</button>
            <button onClick={handleSetDevApiKey} disabled={isDevApiKeyLoading || !devApiKeyInput.trim()} className="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-500 disabled:opacity-60 transition-colors">Save Key</button>
        </div>
      </Modal>

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        currentSettings={appState.editorSettings}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  );
};

export default App;
