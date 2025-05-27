
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { EditorSettings, Theme } from '../types';
import { THEME_DEFINITIONS, PREDEFINED_BACKGROUND_IMAGES } from '../constants';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSettings: EditorSettings;
  onSettingsChange: (newSettings: EditorSettings) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, currentSettings, onSettingsChange }) => {
  const [settings, setSettings] = useState<EditorSettings>(currentSettings);

  useEffect(() => {
    if (isOpen) {
      setSettings(currentSettings); // Reset local state when modal opens or settings change
    }
  }, [currentSettings, isOpen]);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings(prev => ({ ...prev, theme: e.target.value as Theme }));
  };

  const handleBackgroundImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({ ...prev, backgroundImageUrl: e.target.value }));
  };
  
  const handlePredefinedBackgroundSelect = (url: string) => {
    setSettings(prev => ({ ...prev, backgroundImageUrl: url }));
  };

  const handleBackgroundMusicUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({ ...prev, backgroundMusicUrl: e.target.value }));
  };

  const handleSave = () => {
    onSettingsChange({
      ...settings,
      isMusicPlaying: settings.backgroundMusicUrl ? settings.isMusicPlaying : false, // Ensure music stops if URL is cleared
    });
    onClose();
  };

  const InputField: React.FC<{label: string, id: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string, type?: string}> = 
    ({label, id, value, onChange, placeholder, type = "text"}) => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-[color:var(--theme-text-secondary)] mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2.5 border rounded-md bg-[color:var(--theme-bg-page)] text-[color:var(--theme-text-primary)] border-[color:var(--theme-border-primary)] focus:ring-2 focus:ring-[color:var(--theme-text-accent)] focus:border-[color:var(--theme-text-accent)] transition-shadow"
        style={{backgroundColor: 'rgba(var(--rgb-theme-bg-input, 0, 0, 0), 0.1)', color: 'var(--theme-text-primary)'}} // Example fallback for input bg if not covered by theme
      />
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editor Settings">
      <div className="mb-6">
        <label htmlFor="theme-select" className="block text-sm font-medium text-[color:var(--theme-text-secondary)] mb-1">
          Theme
        </label>
        <select
          id="theme-select"
          value={settings.theme}
          onChange={handleThemeChange}
          className="w-full p-2.5 border rounded-md bg-[color:var(--theme-bg-page)] text-[color:var(--theme-text-primary)] border-[color:var(--theme-border-primary)] focus:ring-2 focus:ring-[color:var(--theme-text-accent)] focus:border-[color:var(--theme-text-accent)] transition-shadow"
          style={{backgroundColor: 'rgba(var(--rgb-theme-bg-input, 0, 0, 0), 0.1)', color: 'var(--theme-text-primary)'}}
        >
          {Object.entries(THEME_DEFINITIONS).map(([themeKey, themeDef]) => (
            <option key={themeKey} value={themeKey}>
              {themeDef.name}
            </option>
          ))}
        </select>
      </div>

      <InputField 
        label="Background Image URL"
        id="backgroundImageUrl"
        value={settings.backgroundImageUrl}
        onChange={handleBackgroundImageUrlChange}
        placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
        type="url"
      />
       <div className="mb-4">
        <p className="block text-sm font-medium text-[color:var(--theme-text-secondary)] mb-2">
          Or select a predefined background:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PREDEFINED_BACKGROUND_IMAGES.map((bg) => (
            <button
              key={bg.name}
              onClick={() => handlePredefinedBackgroundSelect(bg.url)}
              title={bg.name}
              className={`p-2 rounded-md border text-xs transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50
                          ${settings.backgroundImageUrl === bg.url 
                            ? 'border-[color:var(--theme-text-accent)] ring-2 ring-[color:var(--theme-text-accent)] bg-opacity-30' 
                            : 'border-[color:var(--theme-border-primary)] hover:border-[color:var(--theme-text-accent)]'}
                          bg-cover bg-center`}
              style={{ 
                backgroundImage: `url(${bg.url})`, 
                color: 'white', // Ensure text is visible over image
                textShadow: '0px 0px 3px black', // Add shadow for better visibility
                minHeight: '50px',
                 backgroundColor: settings.backgroundImageUrl === bg.url ? 'var(--theme-button-hover-bg)' : 'var(--theme-button-bg)'
              }}
            >
              {bg.name}
            </button>
          ))}
           <button
              onClick={() => handlePredefinedBackgroundSelect('')}
              className={`p-2 rounded-md border text-xs transition-colors 
                          ${!settings.backgroundImageUrl 
                            ? 'border-[color:var(--theme-text-accent)] ring-2 ring-[color:var(--theme-text-accent)]' 
                            : 'border-[color:var(--theme-border-primary)] hover:border-[color:var(--theme-text-accent)]'}
                            bg-[color:var(--theme-bg-page)] text-[color:var(--theme-text-primary)]`}
            >
              No Background
            </button>
        </div>
      </div>


      <InputField 
        label="Background Music URL"
        id="backgroundMusicUrl"
        value={settings.backgroundMusicUrl || ''}
        onChange={handleBackgroundMusicUrlChange}
        placeholder="Enter audio URL (e.g., https://example.com/music.mp3)"
        type="url"
      />
       <p className="text-xs text-[color:var(--theme-text-secondary)] opacity-80 mb-4">
        Note: Music playback requires browser support for the audio format and URL. Ensure CORS headers are correctly set on the music source if it's from a different domain.
      </p>
      <div className="flex justify-end space-x-3 mt-6">
        <button 
            onClick={onClose} 
            className="px-4 py-2 rounded-md transition-colors"
            style={{backgroundColor: 'var(--theme-button-bg)', color: 'var(--theme-button-text)', opacity: 0.7}}
            onMouseOver={e => e.currentTarget.style.opacity = '1'}
            onMouseOut={e => e.currentTarget.style.opacity = '0.7'}
        >
          Cancel
        </button>
        <button 
            onClick={handleSave} 
            className="px-4 py-2 rounded-md transition-colors"
            style={{backgroundColor: 'var(--theme-button-hover-bg)', color: 'var(--theme-button-text)'}}
        >
          Save Settings
        </button>
      </div>
    </Modal>
  );
};

export default SettingsModal;
