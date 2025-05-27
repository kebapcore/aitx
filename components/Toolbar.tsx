
import React from 'react';
import IconButton from './IconButton';
import { TabState } from '../types'; // Removed Theme type as it's not used here
import TabItem from './TabItem';

interface ToolbarProps {
  onSaveFile: () => void;
  onLoadFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // currentTheme: Theme; // Removed
  // onToggleTheme: () => void; // Removed
  isAssistantVoiceEnabled: boolean;
  onToggleAssistantVoice: () => void;
  onClearText: () => void;
  isApiKeySet: boolean;
  onSetDevApiKey: () => void;
  onTogglePreview: () => void;
  isPreviewActive: boolean;
  onOpenSettings: () => void;
  isMusicPlaying?: boolean;
  onToggleMusic?: () => void;
  hasMusicUrl?: boolean;

  tabs: TabState[];
  activeTabId: string | null;
  onActivateTab: (tabId: string) => void;
  onCloseTab: (tabId: string) => void;
  onRenameTab: (tabId: string, newTitle: string) => void;
  onNewTab: () => void;

  isAssistantPanelVisible: boolean;
  onToggleAssistantPanel: () => void;
}

const IconWrapper: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className="" }) => <div className={`w-5 h-5 ${className}`}>{children}</div>;

const SaveIcon = () => (
  <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg></IconWrapper>
);
const LoadIcon = () => (
  <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg></IconWrapper>
);

// ThemeIcon removed as toggle is removed from Toolbar

const VoiceOnIcon = () => (
 <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
</svg></IconWrapper>
);
const VoiceOffIcon = () => (
 <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0L21.75 9.75M19.5 12l-2.25 2.25M17.25 9.75L19.5 12m0 0L21.75 9.75M19.5 12l2.25-2.25M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
</svg></IconWrapper>
);

const TrashIcon = () => (
  <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg></IconWrapper>
);

const EyeIcon = () => (
  <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg></IconWrapper>
);

const EyeSlashIcon = () => (
    <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.574M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg></IconWrapper>
);

const SettingsIcon = () => (
  <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.646.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 1.985c-.007.379.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.333.183-.582.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.759 6.759 0 010-1.985c.007-.379-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg></IconWrapper>
);

const PlayIcon = () => (
  <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
  </svg></IconWrapper>
);

const PauseIcon = () => (
  <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
  </svg></IconWrapper>
);

const AddIcon = () => (
    <IconWrapper className="w-4 h-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg></IconWrapper>
);

const HidePanelIcon = () => (
    <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg></IconWrapper>
);

const ShowPanelIcon = () => (
    <IconWrapper><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg></IconWrapper>
);


const ToolbarButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {label: string, icon: React.ReactNode}> = ({icon, label, className, ...props}) => (
    <IconButton 
        icon={icon} 
        label={label} 
        className={`text-[color:var(--theme-text-secondary)] hover:text-[color:var(--theme-text-accent)] hover:bg-black/10 dark:hover:bg-white/10 ${className}`} 
        {...props} 
    />
);


const Toolbar: React.FC<ToolbarProps> = ({
  onSaveFile,
  onLoadFile,
  // currentTheme, // Removed
  // onToggleTheme, // Removed
  isAssistantVoiceEnabled,
  onToggleAssistantVoice,
  onClearText,
  isApiKeySet,
  onSetDevApiKey,
  onTogglePreview,
  isPreviewActive,
  onOpenSettings,
  isMusicPlaying,
  onToggleMusic,
  hasMusicUrl,
  tabs,
  activeTabId,
  onActivateTab,
  onCloseTab,
  onRenameTab,
  onNewTab,
  isAssistantPanelVisible,
  onToggleAssistantPanel,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleLoadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-1.5 flex items-center shadow-lg backdrop-blur-md relative z-20 flex-wrap" style={{backgroundColor: 'var(--theme-bg-toolbar)'}}>
      {/* Main Action Buttons */}
      <div className="flex items-center space-x-1 md:space-x-1.5 mr-2">
        <ToolbarButton onClick={onTogglePreview} icon={isPreviewActive ? <EyeSlashIcon /> : <EyeIcon />} label={isPreviewActive ? "Show Editor" : "Show Preview"} />
        <div className="h-5 w-px bg-[color:var(--theme-border-primary)] opacity-50 mx-0.5"></div> {/* Divider */}
        <ToolbarButton onClick={onSaveFile} icon={<SaveIcon />} label="Save Active Tab (.aitxt)" />
        <ToolbarButton onClick={handleLoadClick} icon={<LoadIcon />} label="Load into Active Tab (.aitxt)" />
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".aitxt"
          onChange={onLoadFile}
        />
        <ToolbarButton onClick={onClearText} icon={<TrashIcon />} label="Clear Active Tab Text" className="hover:!text-red-400" />
      </div>

      {/* Tab Bar - occupies flexible space */}
      <div className="flex-grow flex items-center overflow-x-auto scrollbar-thin scrollbar-thumb-[color:var(--theme-scrollbar-thumb)] scrollbar-track-[color:var(--theme-scrollbar-track)] scrollbar-thumb-rounded min-w-0 h-[44px]">
        {tabs.map((tab) => (
          <TabItem
            key={tab.id}
            tab={tab}
            isActive={tab.id === activeTabId}
            onActivate={onActivateTab}
            onClose={onCloseTab}
            onRename={onRenameTab}
          />
        ))}
        <IconButton
            icon={<AddIcon />}
            label="New Tab"
            onClick={onNewTab}
            className="ml-1 text-[color:var(--theme-text-secondary)] hover:text-[color:var(--theme-text-accent)] hover:bg-black/10 dark:hover:bg-white/10 p-2"
        />
      </div>
      
      {/* Right-aligned buttons */}
      <div className="flex items-center space-x-1 md:space-x-1.5 ml-auto pl-2">
        {!isApiKeySet && (
           <button
            onClick={onSetDevApiKey}
            className="px-3 py-1.5 text-xs bg-yellow-500 hover:bg-yellow-600 text-black rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Set Dev API Key
          </button>
        )}
        
        {hasMusicUrl && onToggleMusic && (
          <ToolbarButton 
            onClick={onToggleMusic} 
            icon={isMusicPlaying ? <PauseIcon /> : <PlayIcon />} 
            label={isMusicPlaying ? "Pause Music" : "Play Music"} 
          />
        )}
        <ToolbarButton onClick={onToggleAssistantVoice} icon={isAssistantVoiceEnabled ? <VoiceOnIcon /> : <VoiceOffIcon />} label={isAssistantVoiceEnabled ? "Disable Assistant Voice" : "Enable Assistant Voice"} />
        <ToolbarButton 
            onClick={onToggleAssistantPanel} 
            icon={isAssistantPanelVisible ? <HidePanelIcon /> : <ShowPanelIcon />} 
            label={isAssistantPanelVisible ? "Hide Assistant Panel" : "Show Assistant Panel"} 
        />
        <ToolbarButton onClick={onOpenSettings} icon={<SettingsIcon />} label="Settings" />
        {/* Theme toggle button removed from here */}
      </div>
    </div>
  );
};

export default Toolbar;
