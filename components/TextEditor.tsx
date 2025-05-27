
import React from 'react';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "Start writing your masterpiece..."}
      className="w-full h-full p-6 md:p-8 bg-transparent focus:outline-none resize-none text-base leading-relaxed font-sans selection:bg-sky-500 selection:text-white"
      style={{ color: 'var(--theme-text-primary)' }}
      aria-label="Text Editor"
    />
  );
};

export default TextEditor;