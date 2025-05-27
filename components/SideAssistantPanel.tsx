
import React, { useEffect, useRef, useState } from 'react';
import { Message } from '../types';
import LoadingSpinner from './LoadingSpinner';
import IconButton from './IconButton'; // For send button

interface SideAssistantPanelProps {
  messages: Message[];
  isTyping: boolean;
  isAssistantVoiceEnabled: boolean;
  onToggleVoice: () => void;
  onSendMessage: (message: string) => void;
  onApplyAction: (messageId: string) => void;
  onRejectAction: (messageId: string) => void;
}

const IconBase: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className="" }) => <div className={`w-5 h-5 ${className}`}>{children}</div>;

const VoiceOnIcon = () => (
  <IconBase><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
   <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
 </svg></IconBase>
 );
const VoiceOffIcon = () => (
  <IconBase><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
   <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0L21.75 9.75M19.5 12l-2.25 2.25M17.25 9.75L19.5 12m0 0L21.75 9.75M19.5 12l2.25-2.25M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
 </svg></IconBase>
);

const SendIcon = () => (
  <IconBase><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg></IconBase>
);
 
const SideAssistantPanel: React.FC<SideAssistantPanelProps> = ({ 
    messages, 
    isTyping, 
    isAssistantVoiceEnabled, 
    onToggleVoice,
    onSendMessage,
    onApplyAction,
    onRejectAction,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const [userInput, setUserInput] = useState('');
  const [previewingMessageId, setPreviewingMessageId] = useState<string | null>(null);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.sender === 'ai' || isTyping) {
            const container = scrollableContainerRef.current;
            if (container && container.scrollHeight - container.scrollTop <= container.clientHeight + 200) { // Increased buffer
                scrollToBottom();
                 setShowScrollButton(false);
            } else {
                if (lastMessage.sender === 'ai') setShowScrollButton(true);
            }
        } else if (lastMessage.sender === 'user') {
            scrollToBottom(); // Scroll when user sends a message
        }
    } else {
        scrollToBottom('auto');
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const container = scrollableContainerRef.current;
    if (container) {
      const handleScroll = () => {
        const isScrolledToBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 50; 
        setShowScrollButton(!isScrolledToBottom);
      };
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleSendMessage = () => {
    if (userInput.trim()) {
      onSendMessage(userInput.trim());
      setUserInput('');
    }
  };

  const togglePreview = (messageId: string) => {
    setPreviewingMessageId(prevId => prevId === messageId ? null : messageId);
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center flex-shrink-0" style={{borderColor: 'var(--theme-border-primary)'}}>
        <h3 className="text-lg font-semibold" style={{color: 'var(--theme-text-accent)'}}>Lexi Assistant</h3>
        <button
          onClick={onToggleVoice}
          title={isAssistantVoiceEnabled ? "Mute Assistant" : "Unmute Assistant"}
          className="p-1.5 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          style={{color: 'var(--theme-text-secondary)', }}
          onMouseOver={e => e.currentTarget.style.color = 'var(--theme-text-accent)'}
          onMouseOut={e => e.currentTarget.style.color = 'var(--theme-text-secondary)'}
          aria-label={isAssistantVoiceEnabled ? "Mute Assistant" : "Unmute Assistant"}
        >
          {isAssistantVoiceEnabled ? <VoiceOnIcon /> : <VoiceOffIcon />}
        </button>
      </div>
      <div ref={scrollableContainerRef} className="flex-grow p-3 md:p-4 space-y-3 overflow-y-auto relative scrollbar-thin scrollbar-track-transparent"
           style={{ // Using theme variables for scrollbar
             scrollbarColor: "var(--theme-scrollbar-thumb) var(--theme-scrollbar-track)",
           }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'ai' ? 'items-start' : 'items-end'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-xl shadow ${
                msg.sender === 'ai'
                  ? 'bg-sky-600/90 text-white rounded-br-sm' // AI messages have their own explicit bg/text
                  : 'text-gray-100 rounded-bl-sm' // User messages use theme-defined text below
              }`}
              style={{ // User message bubble background
                backgroundColor: msg.sender === 'user' ? 'var(--theme-button-bg)' : undefined,
                color: msg.sender === 'user' ? 'var(--theme-button-text)' : undefined,
              }}
            >
              <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{msg.text}</p>
              
              {msg.sender === 'ai' && msg.actionCommand?.type === 'regenerate' && msg.isActionPending && (
                <div className="mt-2">
                  <button
                    onClick={() => togglePreview(msg.id)}
                    className="px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors mb-2"
                  >
                    {previewingMessageId === msg.id ? "Hide New Text" : "See New Text"}
                  </button>
                  {previewingMessageId === msg.id && (
                    <pre className="mt-1 p-2 text-xs bg-black/30 rounded-md max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500/50 scrollbar-track-transparent whitespace-pre-wrap break-all" style={{color: 'var(--theme-text-primary)'}}>
                      {msg.actionCommand.payload}
                    </pre>
                  )}
                </div>
              )}

              {msg.metadataText && (
                <p className="text-xs italic mt-1.5 pt-1.5 border-t" style={{color: msg.sender === 'ai' ? 'rgba(255,255,255,0.7)' : 'var(--theme-text-secondary)', borderColor: msg.sender === 'ai' ? 'rgba(255,255,255,0.2)' : 'var(--theme-border-primary)'}}>
                  Note: {msg.metadataText}
                </p>
              )}

              {msg.sender === 'ai' && msg.actionCommand && msg.isActionPending && !msg.isActionApplied && !msg.isActionRejected && (
                <div className="mt-2.5 pt-2 border-t border-white/20 flex space-x-2">
                  <button 
                    onClick={() => {
                        onApplyAction(msg.id);
                        if (previewingMessageId === msg.id) setPreviewingMessageId(null); // Hide preview on action
                    }}
                    className="px-3 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
                  >
                    Apply Change
                  </button>
                  <button 
                    onClick={() => {
                        onRejectAction(msg.id)
                        if (previewingMessageId === msg.id) setPreviewingMessageId(null); // Hide preview on action
                    }}
                    className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                  >
                    Reject Change
                  </button>
                </div>
              )}
               {msg.sender === 'ai' && msg.actionCommand && msg.isActionApplied && (
                <p className="text-xs text-green-300 mt-1.5 font-medium">✓ Change applied.</p>
              )}
              {msg.sender === 'ai' && msg.actionCommand && msg.isActionRejected && (
                <p className="text-xs text-red-300 mt-1.5 font-medium">✗ Change rejected.</p>
              )}
              <p className="text-xs mt-1.5 text-right" style={{color: msg.sender === 'ai' ? 'rgba(255,255,255,0.6)' : 'color-mix(in srgb, var(--theme-button-text) 70%, transparent)'}}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="p-2.5 rounded-lg bg-sky-600/90 text-white rounded-br-sm inline-flex items-center space-x-2">
              <LoadingSpinner size="w-4 h-4" color="text-white" />
              <span className="text-sm">Lexi is typing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
         {showScrollButton && !isTyping && (
          <button
            onClick={() => scrollToBottom()}
            className="absolute bottom-4 right-4 text-white p-2.5 rounded-full shadow-xl backdrop-blur-sm transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-[var(--theme-bg-assistant-panel)]"
            style={{backgroundColor: 'var(--theme-text-accent)', opacity: 0.8 }}
            onMouseOver={e => e.currentTarget.style.opacity = '1'}
            onMouseOut={e => e.currentTarget.style.opacity = '0.8'}
            title="Scroll to bottom"
            aria-label="Scroll to bottom"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </button>
        )}
      </div>
      <div className="p-2.5 md:p-3 border-t flex items-center space-x-2 flex-shrink-0" style={{borderColor: 'var(--theme-border-primary)'}}>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Chat with Lexi..."
          rows={1}
          className="flex-grow p-2.5 rounded-lg focus:outline-none focus:ring-2 resize-none scrollbar-thin scrollbar-track-transparent placeholder-opacity-70"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--theme-bg-page) 70%, var(--theme-text-primary) 5%)', // Subtle background
            color: 'var(--theme-text-primary)',
            borderColor: 'var(--theme-border-primary)',
            ringColor: 'var(--theme-text-accent)',
            '--placeholder-color': 'var(--theme-text-secondary)', // For custom placeholder style below
             scrollbarColor: "var(--theme-scrollbar-thumb) var(--theme-scrollbar-track)",
          } as React.CSSProperties & {'--placeholder-color': string} } // Type assertion for CSS variable
          aria-label="Chat with Lexi"
        />
        <style>{`
            textarea::placeholder {
                color: var(--placeholder-color);
                opacity: 0.7;
            }
        `}</style>
        <IconButton
          icon={<SendIcon />}
          label="Send message"
          onClick={handleSendMessage}
          disabled={!userInput.trim() || isTyping}
          className="disabled:cursor-not-allowed"
          style={{
            color: (!userInput.trim() || isTyping) ? 'var(--theme-text-secondary)' : 'var(--theme-text-accent)',
            opacity: (!userInput.trim() || isTyping) ? 0.6 : 1,
          }}
        />
      </div>
    </div>
  );
};

export default SideAssistantPanel;
