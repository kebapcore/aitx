
// export enum Theme { // Old enum
//   Light = 'light',
//   Dark = 'dark',
// }

// New Theme string literal union type
export type Theme = 
  | 'light'
  | 'dark'
  | 'amoled-black'
  | 'slate-blue'
  | 'forest-green'
  | 'sunset-orange'
  | 'crimson-night'
  | 'ocean-breeze'
  | 'royal-purple'
  | 'cyberpunk-glow'
  | 'pastel-dream'
  | 'coffee-house'
  | 'monochrome-light'
  | 'monochrome-dark'
  | 'minty-fresh'
  | 'rose-quartz'
  | 'deep-indigo'
  | 'volcanic-ash'
  | 'arctic-blue'
  | 'golden-hour';

export interface EditorSettings {
  theme: Theme; // Updated to use the new Theme type
  backgroundImageUrl: string;
  assistantVoiceEnabled: boolean;
  backgroundMusicUrl?: string;
  isMusicPlaying?: boolean;
  isAssistantPanelVisible?: boolean;
}

export interface TextPromptRecord {
  type: 'textGeneration'; 
  prompt: string;
  response: string;
  timestamp: number;
}

export interface ImagePromptRecord {
  type: 'imageGeneration';
  prompt: string;
  generatedImageBase64: string;
  timestamp: number;
}

export interface AssistantInteractionRecord {
  type: 'assistant';
  userMessage: string; 
  editorSnapshot: string; 
  assistantResponse: string; 
  actionTaken?: string; 
  timestamp: number;
}

export interface AiFeedbackRequestRecord {
  type: 'aiFeedback';
  editorSnapshot: string;
  userPrompt: string; 
  assistantResponse: string;
  timestamp: number;
}

export type AiHistoryRecord = TextPromptRecord | ImagePromptRecord | AssistantInteractionRecord | AiFeedbackRequestRecord;

export interface AiTextFile {
  version: string;
  activeTabContent: string;
  activeTabAiHistory: AiHistoryRecord[];
  activeTabAssistantMessages: Message[]; // Added to store Lexi's chat for the active tab
  editorSettings: EditorSettings;
  notes?: string;
}

export interface LexiActionCommand {
  type: 'regenerate' | 'append'; 
  payload: string; 
  originalCommandString: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string; 
  timestamp: number;
  actionCommand?: LexiActionCommand | null; 
  metadataText?: string | null; 
  isActionPending?: boolean; 
  isActionApplied?: boolean; 
  isActionRejected?: boolean; 
}

export interface TabState {
  id: string;
  title: string;
  type: 'text'; 
  textContent: string;
  assistantMessages: Message[];
  aiHistory: AiHistoryRecord[];
}

export interface AppState {
  tabs: TabState[];
  activeTabId: string | null;
  editorSettings: EditorSettings;
}
