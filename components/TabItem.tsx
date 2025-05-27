
import React, { useState, useEffect, useRef } from 'react';
import { TabState } from '../types';

interface TabItemProps {
  tab: TabState;
  isActive: boolean;
  onActivate: (tabId: string) => void;
  onClose: (tabId: string) => void;
  onRename: (tabId: string, newTitle: string) => void;
}

const TabItem: React.FC<TabItemProps> = ({ tab, isActive, onActivate, onClose, onRename }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(tab.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    if (!isEditing) {
        setEditingTitle(tab.title);
    }
  }, [tab.title, isEditing]);


  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleRename = () => {
    if (editingTitle.trim() && editingTitle.trim() !== tab.title) {
      onRename(tab.id, editingTitle.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleRename();
    } else if (event.key === 'Escape') {
      setEditingTitle(tab.title); 
      setIsEditing(false);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    onClose(tab.id);
  };
  
  const activeClasses = 'border-[color:var(--theme-text-accent)] text-[color:var(--theme-text-accent)] bg-opacity-30 dark:bg-opacity-20';
  const inactiveClasses = 'border-transparent text-[color:var(--theme-text-secondary)] hover:text-[color:var(--theme-text-primary)] hover:bg-opacity-40 dark:hover:bg-opacity-50';
  
  const activeBgStyle = { backgroundColor: 'color-mix(in srgb, var(--theme-text-accent) 15%, transparent)' };
  const inactiveHoverBgStyle = { backgroundColor: 'color-mix(in srgb, var(--theme-text-secondary) 20%, transparent)' };

  return (
    <div
      role="tab"
      aria-selected={isActive}
      onClick={() => onActivate(tab.id)}
      onDoubleClick={handleDoubleClick}
      className={`flex items-center justify-between px-3 py-2.5 border-b-2 cursor-pointer min-w-[120px] max-w-[200px] group transition-all duration-150 ease-in-out
                  ${isActive ? activeClasses : inactiveClasses}`}
      style={isActive ? activeBgStyle : {}}
      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = inactiveHoverBgStyle.backgroundColor; }}
      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
      title={tab.title}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editingTitle}
          onChange={(e) => setEditingTitle(e.target.value)}
          onBlur={handleRename}
          onKeyDown={handleKeyDown}
          className="text-sm bg-transparent outline-none border rounded-sm px-1 py-0 flex-grow min-w-0"
          style={{ color: 'inherit', borderColor: 'var(--theme-text-accent)' }}
        />
      ) : (
        <span className="text-sm truncate flex-grow" style={{color: 'inherit'}}>{tab.title}</span>
      )}
      <button
        onClick={handleClose}
        aria-label={`Close tab ${tab.title}`}
        className={`ml-2 p-0.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity
                    ${isActive ? 'opacity-100' : ''} `}
        style={{ 
          color: 'var(--theme-text-secondary)',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--theme-admonition-danger-border)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--theme-text-secondary)'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default TabItem;