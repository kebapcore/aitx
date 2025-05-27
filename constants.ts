
import { EditorSettings, Theme } from './types';

export const APP_VERSION = "1.0.0";

export const LOCALSTORAGE_APP_STATE_KEY = 'aiTextEditorAppState_v1';
export const LOCALSTORAGE_LAUNCHED_BEFORE_KEY = 'aiTextEditorLaunchedBefore_v1';

interface ThemeDefinition {
  name: string;
  isDark: boolean;
  variables: Record<string, string>;
}

export const THEME_DEFINITIONS: Record<Theme, ThemeDefinition> = {
  'light': {
    name: 'Default Light',
    isDark: false,
    variables: {
      '--theme-bg-page': '#f3f4f6', // gray-100
      '--theme-bg-content-area': 'rgba(255, 255, 255, 0.85)', // white with opacity
      '--theme-bg-toolbar': 'rgba(229, 231, 235, 0.8)', // gray-200 with opacity
      '--theme-bg-assistant-panel': 'rgba(243, 244, 246, 0.85)', // gray-100 with opacity
      '--theme-text-primary': '#1f2937', // gray-800
      '--theme-text-secondary': '#4b5563', // gray-600
      '--theme-text-accent': '#0ea5e9', // sky-500
      '--theme-border-primary': '#d1d5db', // gray-300
      '--theme-button-bg': '#3b82f6', // blue-500
      '--theme-button-text': '#ffffff', // white
      '--theme-button-hover-bg': '#2563eb', // blue-600
      '--theme-scrollbar-thumb': '#9ca3af', // gray-400
      '--theme-scrollbar-track': '#e5e7eb', // gray-200
      // Prose Overrides (light) - Align with tailwind.config in index.html
      '--tw-prose-body': '#374151', // gray-700
      '--tw-prose-headings': '#111827', // gray-900
      '--tw-prose-lead': '#4b5563', // gray-600
      '--tw-prose-links': '#0284c7', // sky-600
      '--tw-prose-bold': '#111827', // gray-900
      '--tw-prose-counters': '#6b7280', // gray-500
      '--tw-prose-bullets': '#d1d5db', // gray-300
      '--tw-prose-hr': '#e5e7eb', // gray-200
      '--tw-prose-quotes': '#111827', // gray-900
      '--tw-prose-quote-borders': '#e5e7eb', // gray-200
      '--tw-prose-captions': '#6b7280', // gray-500
      '--tw-prose-code': '#db2777', // pink-600
      '--tw-prose-pre-code': '#e5e7eb', // gray-200 (text in pre)
      '--tw-prose-pre-bg': '#1f2937', // gray-800 (bg of pre)
      '--tw-prose-th-borders': '#d1d5db', // gray-300
      '--tw-prose-td-borders': '#e5e7eb', // gray-200
    }
  },
  'dark': {
    name: 'Default Dark',
    isDark: true,
    variables: {
      '--theme-bg-page': '#111827', // gray-900
      '--theme-bg-content-area': 'rgba(17, 24, 39, 0.8)', // gray-900 with opacity
      '--theme-bg-toolbar': 'rgba(31, 41, 55, 0.75)', // gray-800 with opacity
      '--theme-bg-assistant-panel': 'rgba(17, 24, 39, 0.85)', // gray-900 with opacity
      '--theme-text-primary': '#f3f4f6', // gray-100
      '--theme-text-secondary': '#9ca3af', // gray-400
      '--theme-text-accent': '#38bdf8', // sky-400
      '--theme-border-primary': '#374151', // gray-700
      '--theme-button-bg': '#0ea5e9', // sky-500
      '--theme-button-text': '#ffffff', // white
      '--theme-button-hover-bg': '#0284c7', // sky-600
      '--theme-scrollbar-thumb': '#4b5563', // gray-600
      '--theme-scrollbar-track': '#1f2937', // gray-800
      // Prose Overrides (dark) - Align with tailwind.config in index.html (:invert)
      '--tw-prose-body': '#d1d5db', // gray-300
      '--tw-prose-headings': '#f9fafb', // gray-100
      '--tw-prose-lead': '#9ca3af', // gray-400
      '--tw-prose-links': '#38bdf8', // sky-400
      '--tw-prose-bold': '#f9fafb', // gray-100
      '--tw-prose-counters': '#9ca3af', // gray-400
      '--tw-prose-bullets': '#4b5563', // gray-600
      '--tw-prose-hr': '#374151', // gray-700
      '--tw-prose-quotes': '#f9fafb', // gray-100
      '--tw-prose-quote-borders': '#374151', // gray-700
      '--tw-prose-captions': '#9ca3af', // gray-400
      '--tw-prose-code': '#ec4899', // pink-400
      '--tw-prose-pre-code': '#d1d5db', // gray-300 (text in pre)
      '--tw-prose-pre-bg': '#111827', // gray-900 (bg of pre)
      '--tw-prose-th-borders': '#374151', // gray-700
      '--tw-prose-td-borders': '#1f2937', // gray-800 (was gray-800, changed to differentiate)
    }
  },
  'amoled-black': {
    name: 'Amoled Black',
    isDark: true,
    variables: {
      '--theme-bg-page': '#000000',
      '--theme-bg-content-area': 'rgba(0, 0, 0, 0.7)',
      '--theme-bg-toolbar': 'rgba(5, 5, 5, 0.65)',
      '--theme-bg-assistant-panel': 'rgba(0, 0, 0, 0.75)',
      '--theme-text-primary': '#e0e0e0',
      '--theme-text-secondary': '#a0a0a0',
      '--theme-text-accent': '#00e5ff', // Bright cyan
      '--theme-border-primary': '#222222',
      '--theme-button-bg': '#00bfa5', // Teal
      '--theme-button-text': '#000000',
      '--theme-button-hover-bg': '#008c7a',
      '--theme-scrollbar-thumb': '#333333',
      '--theme-scrollbar-track': '#111111',
      '--tw-prose-body': '#c0c0c0',
      '--tw-prose-headings': '#ffffff',
      '--tw-prose-links': '#00e5ff',
      '--tw-prose-bold': '#ffffff',
      '--tw-prose-code': '#ff4081', // Bright pink
      '--tw-prose-pre-bg': '#0d0d0d',
      '--tw-prose-pre-code': '#c0c0c0',
      '--tw-prose-bullets': '#444444',
      '--tw-prose-hr': '#2a2a2a',
      '--tw-prose-quotes': '#ffffff',
      '--tw-prose-quote-borders': '#2a2a2a',
    }
  },
  'slate-blue': {
    name: 'Slate Blue (Dark)',
    isDark: true,
    variables: {
      '--theme-bg-page': '#1e293b', // slate-800
      '--theme-bg-content-area': 'rgba(30, 41, 59, 0.8)', // slate-800
      '--theme-bg-toolbar': 'rgba(15, 23, 42, 0.75)', // slate-900
      '--theme-bg-assistant-panel': 'rgba(30, 41, 59, 0.85)', // slate-800
      '--theme-text-primary': '#cbd5e1', // slate-300
      '--theme-text-secondary': '#94a3b8', // slate-400
      '--theme-text-accent': '#818cf8', // indigo-400
      '--theme-border-primary': '#334155', // slate-700
      '--theme-button-bg': '#6366f1', // indigo-500
      '--theme-button-text': '#ffffff',
      '--theme-button-hover-bg': '#4f46e5', // indigo-600
      '--theme-scrollbar-thumb': '#475569', // slate-600
      '--theme-scrollbar-track': '#1e293b', // slate-800
      '--tw-prose-body': '#cbd5e1',
      '--tw-prose-headings': '#f1f5f9', // slate-100
      '--tw-prose-links': '#818cf8',
      '--tw-prose-bold': '#f1f5f9',
      '--tw-prose-code': '#f472b6', // pink-400
      '--tw-prose-pre-bg': '#0f172a', // slate-900
      '--tw-prose-pre-code': '#cbd5e1',
      '--tw-prose-bullets': '#475569',
      '--tw-prose-hr': '#334155',
      '--tw-prose-quotes': '#f1f5f9',
      '--tw-prose-quote-borders': '#334155',
    }
  },
  'forest-green': {
    name: 'Forest Green (Dark)',
    isDark: true,
    variables: {
      '--theme-bg-page': '#064e3b', // green-900
      '--theme-bg-content-area': 'rgba(4, 78, 59, 0.8)',
      '--theme-bg-toolbar': 'rgba(3, 60, 45, 0.75)',
      '--theme-bg-assistant-panel': 'rgba(4, 78, 59, 0.85)',
      '--theme-text-primary': '#a7f3d0', // green-200
      '--theme-text-secondary': '#6ee7b7', // green-300
      '--theme-text-accent': '#34d399', // green-400
      '--theme-border-primary': '#047857', // green-700
      '--theme-button-bg': '#10b981', // green-500
      '--theme-button-text': '#f0fdf4', // green-50
      '--theme-button-hover-bg': '#059669', // green-600
      '--theme-scrollbar-thumb': '#065f46', // green-800
      '--theme-scrollbar-track': '#064e3b',
      '--tw-prose-body': '#a7f3d0',
      '--tw-prose-headings': '#d1fae5', // green-100
      '--tw-prose-links': '#34d399',
      '--tw-prose-bold': '#d1fae5',
      '--tw-prose-code': '#a3e635', // lime-400
      '--tw-prose-pre-bg': '#022c22',
      '--tw-prose-pre-code': '#a7f3d0',
      '--tw-prose-bullets': '#059669',
      '--tw-prose-hr': '#047857',
      '--tw-prose-quotes': '#d1fae5',
      '--tw-prose-quote-borders': '#047857',
    }
  },
  'sunset-orange': {
    name: 'Sunset Orange (Light)',
    isDark: false,
    variables: {
      '--theme-bg-page': '#fff7ed', // orange-50
      '--theme-bg-content-area': 'rgba(255, 247, 237, 0.85)',
      '--theme-bg-toolbar': 'rgba(255, 237, 213, 0.8)', // orange-100
      '--theme-bg-assistant-panel': 'rgba(255, 247, 237, 0.85)',
      '--theme-text-primary': '#9a3412', // orange-800
      '--theme-text-secondary': '#c2410c', // orange-700
      '--theme-text-accent': '#f97316', // orange-500
      '--theme-border-primary': '#fed7aa', // orange-200
      '--theme-button-bg': '#ea580c', // orange-600
      '--theme-button-text': '#ffffff',
      '--theme-button-hover-bg': '#c2410c', // orange-700
      '--theme-scrollbar-thumb': '#fdba74', // orange-300
      '--theme-scrollbar-track': '#ffedd5', // orange-100
      '--tw-prose-body': '#9a3412',
      '--tw-prose-headings': '#7c2d12', // orange-900
      '--tw-prose-links': '#f97316',
      '--tw-prose-bold': '#7c2d12',
      '--tw-prose-code': '#c026d3', // fuchsia-600
      '--tw-prose-pre-bg': '#b91c1c', // red-700 (for contrast with orange)
      '--tw-prose-pre-code': '#ffedd5',
      '--tw-prose-bullets': '#fed7aa',
      '--tw-prose-hr': '#fed7aa',
      '--tw-prose-quotes': '#7c2d12',
      '--tw-prose-quote-borders': '#fed7aa',
    }
  },
   'crimson-night': {
    name: 'Crimson Night (Dark)',
    isDark: true,
    variables: {
      '--theme-bg-page': '#450a0a', // red-900
      '--theme-bg-content-area': 'rgba(69, 10, 10, 0.8)',
      '--theme-bg-toolbar': 'rgba(50, 8, 8, 0.75)',
      '--theme-bg-assistant-panel': 'rgba(69, 10, 10, 0.85)',
      '--theme-text-primary': '#fecaca', // red-200
      '--theme-text-secondary': '#fca5a5', // red-300
      '--theme-text-accent': '#f87171', // red-400
      '--theme-border-primary': '#991b1b', // red-700
      '--theme-button-bg': '#ef4444', // red-500
      '--theme-button-text': '#ffffff',
      '--theme-button-hover-bg': '#dc2626', // red-600
      '--theme-scrollbar-thumb': '#b91c1c', // red-700
      '--theme-scrollbar-track': '#7f1d1d', // red-800
      '--tw-prose-body': '#fecaca',
      '--tw-prose-headings': '#fee2e2', // red-100
      '--tw-prose-links': '#f87171',
      '--tw-prose-bold': '#fee2e2',
      '--tw-prose-code': '#fbbf24', // amber-400
      '--tw-prose-pre-bg': '#200505',
      '--tw-prose-pre-code': '#fecaca',
      '--tw-prose-bullets': '#dc2626',
      '--tw-prose-hr': '#b91c1c',
      '--tw-prose-quotes': '#fee2e2',
      '--tw-prose-quote-borders': '#b91c1c',
    }
  },
  'ocean-breeze': {
    name: 'Ocean Breeze (Light)',
    isDark: false,
    variables: {
      '--theme-bg-page': '#eff6ff', // blue-50
      '--theme-bg-content-area': 'rgba(239, 246, 255, 0.85)',
      '--theme-bg-toolbar': 'rgba(219, 234, 254, 0.8)', // blue-100
      '--theme-bg-assistant-panel': 'rgba(239, 246, 255, 0.85)',
      '--theme-text-primary': '#1e3a8a', // blue-800
      '--theme-text-secondary': '#1d4ed8', // blue-700
      '--theme-text-accent': '#2563eb', // blue-600
      '--theme-border-primary': '#bfdbfe', // blue-200
      '--theme-button-bg': '#3b82f6', // blue-500
      '--theme-button-text': '#ffffff',
      '--theme-button-hover-bg': '#2563eb', // blue-600
      '--theme-scrollbar-thumb': '#93c5fd', // blue-300
      '--theme-scrollbar-track': '#dbeafe', // blue-100
      '--tw-prose-body': '#1e3a8a',
      '--tw-prose-headings': '#172554', // blue-900
      '--tw-prose-links': '#2563eb',
      '--tw-prose-bold': '#172554',
      '--tw-prose-code': '#0891b2', // cyan-600
      '--tw-prose-pre-bg': '#1e3a8a', // blue-800
      '--tw-prose-pre-code': '#eff6ff',
      '--tw-prose-bullets': '#bfdbfe',
      '--tw-prose-hr': '#bfdbfe',
      '--tw-prose-quotes': '#172554',
      '--tw-prose-quote-borders': '#bfdbfe',
    }
  },
  'royal-purple': {
    name: 'Royal Purple (Dark)',
    isDark: true,
    variables: {
      '--theme-bg-page': '#3b0764', // purple-900 (approx)
      '--theme-bg-content-area': 'rgba(59, 7, 100, 0.8)',
      '--theme-bg-toolbar': 'rgba(45, 5, 80, 0.75)',
      '--theme-bg-assistant-panel': 'rgba(59, 7, 100, 0.85)',
      '--theme-text-primary': '#e9d5ff', // purple-200
      '--theme-text-secondary': '#d8b4fe', // purple-300
      '--theme-text-accent': '#c084fc', // purple-400
      '--theme-border-primary': '#581c87', // purple-800
      '--theme-button-bg': '#9333ea', // purple-600
      '--theme-button-text': '#f3e8ff', // purple-50
      '--theme-button-hover-bg': '#7e22ce', // purple-700
      '--theme-scrollbar-thumb': '#6b21a8', // purple-700
      '--theme-scrollbar-track': '#581c87', // purple-800
      '--tw-prose-body': '#e9d5ff',
      '--tw-prose-headings': '#f3e8ff', // purple-100
      '--tw-prose-links': '#c084fc',
      '--tw-prose-bold': '#f3e8ff',
      '--tw-prose-code': '#f472b6', // pink-400
      '--tw-prose-pre-bg': '#2a0447',
      '--tw-prose-pre-code': '#e9d5ff',
      '--tw-prose-bullets': '#7e22ce',
      '--tw-prose-hr': '#6b21a8',
      '--tw-prose-quotes': '#f3e8ff',
      '--tw-prose-quote-borders': '#6b21a8',
    }
  },
  // Add more themes here... (Cyberpunk, Pastel, Coffee, etc.)
  'cyberpunk-glow': {
    name: 'Cyberpunk Glow (Dark)',
    isDark: true,
    variables: {
      '--theme-bg-page': '#0d0221', // Deep blue/purple
      '--theme-bg-content-area': 'rgba(13, 2, 33, 0.85)',
      '--theme-bg-toolbar': 'rgba(5, 0, 15, 0.8)',
      '--theme-bg-assistant-panel': 'rgba(13, 2, 33, 0.9)',
      '--theme-text-primary': '#00f0ff', // Bright cyan
      '--theme-text-secondary': '#f000ff', // Bright magenta
      '--theme-text-accent': '#ceff00',   // Bright lime
      '--theme-border-primary': '#4f00ff', // Electric purple
      '--theme-button-bg': '#ff0055', // Hot pink
      '--theme-button-text': '#0d0221',
      '--theme-button-hover-bg': '#d10043',
      '--theme-scrollbar-thumb': '#4f00ff',
      '--theme-scrollbar-track': '#1a053d',
      '--tw-prose-body': '#00f0ff',
      '--tw-prose-headings': '#ceff00',
      '--tw-prose-links': '#f000ff',
      '--tw-prose-bold': '#ffffff',
      '--tw-prose-code': '#ffffff',
      '--tw-prose-pre-bg': '#11032e',
      '--tw-prose-pre-code': '#00f0ff',
      '--tw-prose-bullets': '#f000ff',
      '--tw-prose-hr': '#4f00ff',
      '--tw-prose-quotes': '#ceff00',
      '--tw-prose-quote-borders': '#4f00ff',
    }
  },
  'pastel-dream': {
    name: 'Pastel Dream (Light)',
    isDark: false,
    variables: {
      '--theme-bg-page': '#fff5f7', // Very light pink
      '--theme-bg-content-area': 'rgba(255, 245, 247, 0.9)',
      '--theme-bg-toolbar': 'rgba(255, 230, 235, 0.85)',
      '--theme-bg-assistant-panel': 'rgba(255, 245, 247, 0.9)',
      '--theme-text-primary': '#7a4a58', // Muted rose
      '--theme-text-secondary': '#9b7280', // Lighter muted rose
      '--theme-text-accent': '#82a0c2', // Pastel blue
      '--theme-border-primary': '#ffe0e5', // Light pink border
      '--theme-button-bg': '#a2d2ff', // Pastel blue button
      '--theme-button-text': '#533640',
      '--theme-button-hover-bg': '#8cbfe0',
      '--theme-scrollbar-thumb': '#e0b8c0', // Pastel rose
      '--theme-scrollbar-track': '#fff0f2',
      '--tw-prose-body': '#7a4a58',
      '--tw-prose-headings': '#5e3744',
      '--tw-prose-links': '#82a0c2',
      '--tw-prose-bold': '#5e3744',
      '--tw-prose-code': '#b08da0', // Pastel purple
      '--tw-prose-pre-bg': '#f5e1e5',
      '--tw-prose-pre-code': '#7a4a58',
      '--tw-prose-bullets': '#e0b8c0',
      '--tw-prose-hr': '#ffe0e5',
      '--tw-prose-quotes': '#5e3744',
      '--tw-prose-quote-borders': '#ffe0e5',
    }
  },
  'coffee-house': {
      name: 'Coffee House (Warm Light)',
      isDark: false,
      variables: {
        '--theme-bg-page': '#f5f0e8', // Creamy beige
        '--theme-bg-content-area': 'rgba(245, 240, 232, 0.9)',
        '--theme-bg-toolbar': 'rgba(230, 220, 208, 0.85)',
        '--theme-bg-assistant-panel': 'rgba(245, 240, 232, 0.9)',
        '--theme-text-primary': '#4a3b31', // Dark brown
        '--theme-text-secondary': '#786154', // Medium brown
        '--theme-text-accent': '#a16207', // Dark yellow/gold
        '--theme-border-primary': '#dcd0c0', // Light brown
        '--theme-button-bg': '#8c5a40', // Coffee brown
        '--theme-button-text': '#f5f0e8',
        '--theme-button-hover-bg': '#6b4530',
        '--theme-scrollbar-thumb': '#b59f8c',
        '--theme-scrollbar-track': '#e6ddd4',
        '--tw-prose-body': '#4a3b31',
        '--tw-prose-headings': '#382c25',
        '--tw-prose-links': '#a16207',
        '--tw-prose-bold': '#382c25',
        '--tw-prose-code': '#78350f', // Amber 700
        '--tw-prose-pre-bg': '#4a3b31', // dark brown for pre bg
        '--tw-prose-pre-code': '#f5f0e8', // light text in pre
        '--tw-prose-bullets': '#b59f8c',
        '--tw-prose-hr': '#dcd0c0',
        '--tw-prose-quotes': '#382c25',
        '--tw-prose-quote-borders': '#dcd0c0',
      }
  },
  'monochrome-light': {
      name: 'Monochrome (Light)',
      isDark: false,
      variables: {
        '--theme-bg-page': '#ffffff',
        '--theme-bg-content-area': 'rgba(255, 255, 255, 0.85)',
        '--theme-bg-toolbar': 'rgba(240, 240, 240, 0.8)',
        '--theme-bg-assistant-panel': 'rgba(255, 255, 255, 0.85)',
        '--theme-text-primary': '#212121',
        '--theme-text-secondary': '#555555',
        '--theme-text-accent': '#007bff', // A standard blue for accent
        '--theme-border-primary': '#e0e0e0',
        '--theme-button-bg': '#424242',
        '--theme-button-text': '#ffffff',
        '--theme-button-hover-bg': '#616161',
        '--theme-scrollbar-thumb': '#bdbdbd',
        '--theme-scrollbar-track': '#f5f5f5',
        '--tw-prose-body': '#333333',
        '--tw-prose-headings': '#000000',
        '--tw-prose-links': '#007bff',
        '--tw-prose-bold': '#000000',
        '--tw-prose-code': '#212121',
        '--tw-prose-pre-bg': '#f0f0f0',
        '--tw-prose-pre-code': '#212121',
        '--tw-prose-bullets': '#cccccc',
        '--tw-prose-hr': '#e0e0e0',
        '--tw-prose-quotes': '#000000',
        '--tw-prose-quote-borders': '#e0e0e0',
      }
  },
  'monochrome-dark': {
      name: 'Monochrome Dark',
      isDark: true,
      variables: {
        '--theme-bg-page': '#121212',
        '--theme-bg-content-area': 'rgba(24, 24, 24, 0.8)', // Slightly lighter than page
        '--theme-bg-toolbar': 'rgba(30, 30, 30, 0.75)',
        '--theme-bg-assistant-panel': 'rgba(24, 24, 24, 0.85)',
        '--theme-text-primary': '#e0e0e0',
        '--theme-text-secondary': '#aaaaaa',
        '--theme-text-accent': '#bb86fc', // Material Design Purple A200
        '--theme-border-primary': '#333333',
        '--theme-button-bg': '#555555',
        '--theme-button-text': '#e0e0e0',
        '--theme-button-hover-bg': '#777777',
        '--theme-scrollbar-thumb': '#424242',
        '--theme-scrollbar-track': '#1e1e1e',
        '--tw-prose-body': '#cccccc',
        '--tw-prose-headings': '#ffffff',
        '--tw-prose-links': '#bb86fc',
        '--tw-prose-bold': '#ffffff',
        '--tw-prose-code': '#e0e0e0',
        '--tw-prose-pre-bg': '#1f1f1f',
        '--tw-prose-pre-code': '#e0e0e0',
        '--tw-prose-bullets': '#555555',
        '--tw-prose-hr': '#333333',
        '--tw-prose-quotes': '#ffffff',
        '--tw-prose-quote-borders': '#333333',
      }
  },
   'minty-fresh': {
      name: 'Minty Fresh (Light)',
      isDark: false,
      variables: {
        '--theme-bg-page': '#f0fdfa', // teal-50
        '--theme-bg-content-area': 'rgba(240, 253, 250, 0.9)',
        '--theme-bg-toolbar': 'rgba(204, 251, 241, 0.85)', // teal-100
        '--theme-bg-assistant-panel': 'rgba(240, 253, 250, 0.9)',
        '--theme-text-primary': '#0f766e', // teal-700
        '--theme-text-secondary': '#115e59', // teal-800
        '--theme-text-accent': '#0d9488', // teal-600
        '--theme-border-primary': '#99f6e4', // teal-200
        '--theme-button-bg': '#14b8a6', // teal-500
        '--theme-button-text': '#ffffff',
        '--theme-button-hover-bg': '#0d9488', // teal-600
        '--theme-scrollbar-thumb': '#5eead4', // teal-300
        '--theme-scrollbar-track': '#ccfbf1', // teal-100
        '--tw-prose-body': '#0f766e',
        '--tw-prose-headings': '#134e4a', // teal-900
        '--tw-prose-links': '#0d9488',
        '--tw-prose-bold': '#134e4a',
        '--tw-prose-code': '#06b6d4', // cyan-500
        '--tw-prose-pre-bg': '#0f766e', // teal-700
        '--tw-prose-pre-code': '#f0fdfa',
        '--tw-prose-bullets': '#99f6e4',
        '--tw-prose-hr': '#99f6e4',
        '--tw-prose-quotes': '#134e4a',
        '--tw-prose-quote-borders': '#99f6e4',
      }
  },
  'rose-quartz': {
      name: 'Rose Quartz (Light)',
      isDark: false,
      variables: {
        '--theme-bg-page': '#fff1f2', // rose-50
        '--theme-bg-content-area': 'rgba(255, 241, 242, 0.9)',
        '--theme-bg-toolbar': 'rgba(255, 228, 230, 0.85)', // rose-100
        '--theme-bg-assistant-panel': 'rgba(255, 241, 242, 0.9)',
        '--theme-text-primary': '#9f1239', // rose-700
        '--theme-text-secondary': '#881337', // rose-800
        '--theme-text-accent': '#e11d48', // rose-600
        '--theme-border-primary': '#fecdd3', // rose-200
        '--theme-button-bg': '#f43f5e', // rose-500
        '--theme-button-text': '#ffffff',
        '--theme-button-hover-bg': '#e11d48', // rose-600
        '--theme-scrollbar-thumb': '#fda4af', // rose-300
        '--theme-scrollbar-track': '#ffe4e6', // rose-100
        '--tw-prose-body': '#9f1239',
        '--tw-prose-headings': '#881337', // rose-800 (Darker for headings)
        '--tw-prose-links': '#e11d48',
        '--tw-prose-bold': '#881337',
        '--tw-prose-code': '#a21caf', // fuchsia-600
        '--tw-prose-pre-bg': '#9f1239', // rose-700
        '--tw-prose-pre-code': '#fff1f2',
        '--tw-prose-bullets': '#fecdd3',
        '--tw-prose-hr': '#fecdd3',
        '--tw-prose-quotes': '#881337',
        '--tw-prose-quote-borders': '#fecdd3',
      }
  },
  'deep-indigo': {
      name: 'Deep Indigo (Dark)',
      isDark: true,
      variables: {
        '--theme-bg-page': '#312e81', // indigo-800
        '--theme-bg-content-area': 'rgba(49, 46, 129, 0.85)',
        '--theme-bg-toolbar': 'rgba(30, 27, 75, 0.8)', // indigo-900
        '--theme-bg-assistant-panel': 'rgba(49, 46, 129, 0.9)',
        '--theme-text-primary': '#c7d2fe', // indigo-200
        '--theme-text-secondary': '#a5b4fc', // indigo-300
        '--theme-text-accent': '#818cf8', // indigo-400
        '--theme-border-primary': '#4338ca', // indigo-700
        '--theme-button-bg': '#6366f1', // indigo-500
        '--theme-button-text': '#e0e7ff', // indigo-100
        '--theme-button-hover-bg': '#4f46e5', // indigo-600
        '--theme-scrollbar-thumb': '#4f46e5',
        '--theme-scrollbar-track': '#3730a3', // indigo-700
        '--tw-prose-body': '#c7d2fe',
        '--tw-prose-headings': '#e0e7ff',
        '--tw-prose-links': '#818cf8',
        '--tw-prose-bold': '#e0e7ff',
        '--tw-prose-code': '#a78bfa', // violet-400
        '--tw-prose-pre-bg': '#1e1b4b', // indigo-950
        '--tw-prose-pre-code': '#c7d2fe',
        '--tw-prose-bullets': '#6366f1',
        '--tw-prose-hr': '#4f46e5',
        '--tw-prose-quotes': '#e0e7ff',
        '--tw-prose-quote-borders': '#4f46e5',
      }
  },
  'volcanic-ash': {
      name: 'Volcanic Ash (Dark)',
      isDark: true,
      variables: {
        '--theme-bg-page': '#262626', // neutral-800
        '--theme-bg-content-area': 'rgba(38, 38, 38, 0.85)',
        '--theme-bg-toolbar': 'rgba(23, 23, 23, 0.8)', // neutral-900
        '--theme-bg-assistant-panel': 'rgba(38, 38, 38, 0.9)',
        '--theme-text-primary': '#d4d4d4', // neutral-300
        '--theme-text-secondary': '#a3a3a3', // neutral-400
        '--theme-text-accent': '#f97316', // orange-500 (lava accent)
        '--theme-border-primary': '#525252', // neutral-600
        '--theme-button-bg': '#737373', // neutral-500
        '--theme-button-text': '#f5f5f5', // neutral-100
        '--theme-button-hover-bg': '#525252', // neutral-600
        '--theme-scrollbar-thumb': '#525252',
        '--theme-scrollbar-track': '#171717', // neutral-900
        '--tw-prose-body': '#d4d4d4',
        '--tw-prose-headings': '#e5e5e5', // neutral-200
        '--tw-prose-links': '#f97316',
        '--tw-prose-bold': '#e5e5e5',
        '--tw-prose-code': '#fbbf24', // amber-400
        '--tw-prose-pre-bg': '#0a0a0a', // neutral-950
        '--tw-prose-pre-code': '#d4d4d4',
        '--tw-prose-bullets': '#737373',
        '--tw-prose-hr': '#525252',
        '--tw-prose-quotes': '#e5e5e5',
        '--tw-prose-quote-borders': '#525252',
      }
  },
  'arctic-blue': {
      name: 'Arctic Blue (Light)',
      isDark: false,
      variables: {
        '--theme-bg-page': '#f0f9ff', // sky-50
        '--theme-bg-content-area': 'rgba(240, 249, 255, 0.9)',
        '--theme-bg-toolbar': 'rgba(224, 242, 254, 0.85)', // sky-100
        '--theme-bg-assistant-panel': 'rgba(240, 249, 255, 0.9)',
        '--theme-text-primary': '#075985', // sky-800
        '--theme-text-secondary': '#0369a1', // sky-700
        '--theme-text-accent': '#0ea5e9', // sky-500
        '--theme-border-primary': '#bae6fd', // sky-200
        '--theme-button-bg': '#38bdf8', // sky-400
        '--theme-button-text': '#f0f9ff',
        '--theme-button-hover-bg': '#0ea5e9', // sky-500
        '--theme-scrollbar-thumb': '#7dd3fc', // sky-300
        '--theme-scrollbar-track': '#e0f2fe', // sky-100
        '--tw-prose-body': '#075985',
        '--tw-prose-headings': '#0c4a6e', // sky-900
        '--tw-prose-links': '#0ea5e9',
        '--tw-prose-bold': '#0c4a6e',
        '--tw-prose-code': '#06b6d4', // cyan-500
        '--tw-prose-pre-bg': '#0369a1', // sky-700
        '--tw-prose-pre-code': '#f0f9ff',
        '--tw-prose-bullets': '#bae6fd',
        '--tw-prose-hr': '#bae6fd',
        '--tw-prose-quotes': '#0c4a6e',
        '--tw-prose-quote-borders': '#bae6fd',
      }
  },
  'golden-hour': {
      name: 'Golden Hour (Warm Light)',
      isDark: false,
      variables: {
        '--theme-bg-page': '#fffbeb', // yellow-50
        '--theme-bg-content-area': 'rgba(255, 251, 235, 0.9)',
        '--theme-bg-toolbar': 'rgba(254, 249, 195, 0.85)', // yellow-100
        '--theme-bg-assistant-panel': 'rgba(255, 251, 235, 0.9)',
        '--theme-text-primary': '#713f12', // yellow-800
        '--theme-text-secondary': '#854d0e', // yellow-700
        '--theme-text-accent': '#ca8a04', // yellow-600
        '--theme-border-primary': '#fde68a', // yellow-200
        '--theme-button-bg': '#eab308', // yellow-500
        '--theme-button-text': '#422006', // yellow-900
        '--theme-button-hover-bg': '#ca8a04', // yellow-600
        '--theme-scrollbar-thumb': '#facc15', // yellow-400
        '--theme-scrollbar-track': '#fef9c3', // yellow-100
        '--tw-prose-body': '#713f12',
        '--tw-prose-headings': '#422006', // yellow-900
        '--tw-prose-links': '#ca8a04',
        '--tw-prose-bold': '#422006',
        '--tw-prose-code': '#c2410c', // orange-700
        '--tw-prose-pre-bg': '#713f12', // yellow-800
        '--tw-prose-pre-code': '#fffbeb',
        '--tw-prose-bullets': '#fde68a',
        '--tw-prose-hr': '#fde68a',
        '--tw-prose-quotes': '#422006',
        '--tw-prose-quote-borders': '#fde68a',
      }
  },
};

export const DEFAULT_EDITOR_SETTINGS: EditorSettings = {
  theme: 'dark', // Updated default theme
  backgroundImageUrl: 'https://picsum.photos/seed/lexi-editor/1920/1080',
  assistantVoiceEnabled: true,
  backgroundMusicUrl: '',
  isMusicPlaying: false,
  isAssistantPanelVisible: true,
};

export const PREDEFINED_BACKGROUND_IMAGES = [
  { name: 'Abstract Dark Blue', url: 'https://picsum.photos/seed/darkblueabstract/1920/1080' },
  { name: 'Mountain Sunrise', url: 'https://picsum.photos/seed/mountainsunrise/1920/1080' },
  { name: 'Minimalist Waves', url: 'https://picsum.photos/seed/minimalwaves/1920/1080' },
  { name: 'Forest Canopy', url: 'https://picsum.photos/seed/forestcanopy/1920/1080' },
  { name: 'Cosmic Nebulae', url: 'https://picsum.photos/seed/cosmicnebulae/1920/1080' },
  { name: 'City Lights', url: 'https://picsum.photos/seed/citylights/1920/1080' },
  { name: 'Desert Dunes', url: 'https://picsum.photos/seed/desertdunes/1920/1080' },
  { name: 'Ocean Depths', url: 'https://picsum.photos/seed/oceandepths/1920/1080' },
];


export const GEMINI_TEXT_MODEL = "gemini-2.5-flash-preview-04-17";
export const IMAGEN_MODEL = "imagen-3.0-generate-002";

export const ASSISTANT_SYSTEM_INSTRUCTION = `You are "Lexi," a friendly, witty, and highly creative writing assistant integrated into a text editor.
Your primary goal is to chat with the user, understand their requests, offer insightful suggestions, generate or modify text according to their needs, and occasionally make humorous or thought-provoking comments.
You will receive the user's current editor text content (from the active tab) along with their direct message to you. Use this context to inform your responses and actions.

Core Capabilities:
1.  **Chat & Discussion:** Engage in conversation about the user's writing, ideas, or any related topic.
2.  **Text Generation & Modification:** You can generate new text or modify the existing editor content based on user requests. To do this, you MUST use the following special commands in your response. Only use these commands when explicitly intending to change the editor's content.
    *   \\\`{regenerate:[new full text content]}\\\`: Use this to replace the ENTIRE current editor content with the text provided inside the brackets.
    *   \\\`{append:[text to append]}\\\`: Use this to add the text provided inside the brackets to the END of the current editor content.
3.  **Metadata Explanation:** After performing an action or to clarify your response, you can include a metadata note using the format: \\\`{metadata:[Your explanation or note about the action taken, tone, etc.]}\\\`. This should preferably be at the end of your response.
4.  **Markdown Usage:** For your general chat responses (not the content within \\\`regenerate\\\` or \\\`append\\\` unless specifically requested by the user to be Markdown), feel free to use Markdown for formatting (headings, lists, bold, italics, etc.) to make your output clear and readable. The content *inside* \\\`regenerate\\\` or \\\`append\\\` will be treated as plain text unless the user's prompt implies Markdown.
5.  **Custom Editor Markdown Features:** The user can use special syntax in the editor for advanced formatting. You should be aware of these if the user asks how to use them, but you should *not* try to generate these custom syntaxes in your chat responses unless you are specifically demonstrating them. These features are processed by the editor's previewer.
    *   **YouTube Embeds:** e.g., \\\`#yt:YOUTUBE_URL\\\`, \\\`##yt:URL\\\` (right float), \\\`###yt:URL\\\` (left float), \\\`####yt:URL|start=SS&end=SS\\\` (segment). Shorthands: \\\`#Y:\\\`, \\\`##Y:\\\`, etc.
    *   **Image Effects:** e.g., \\\`#img:center:IMAGE_URL\\\`, \\\`#img:left:URL|radius=10|shadow\\\`, \\\`#img:gallery:[URL1,URL2]\\\`, \\\`#img:blur:URL\\\`. Shorthands: \\\`#I:C:\\\`, \\\`#I:L:\\\`, etc.
    *   **Colored Blocks:** e.g., \\\`:::danger Your message here:::\\\`, \\\`:::info ...:::\\\`, \\\`:::success ...:::\\\`, \\\`:::note ...:::\\\`. Shorthands: \\\`:::D ...:::\\\`, \\\`:::I ...:::\\\`, etc.
    *   **Nesting Features:** Users can nest these features, for example, placing a YouTube video or a styled image inside a colored admonition block.

Interaction Flow:
- The user will type a message to you.
- You will receive this message along with the full current text from their active editor tab.
- Analyze both the user's message and their editor text to understand the request.
- Formulate your response. If the request involves changing the editor's text, embed the appropriate command (\\\`{regenerate:...}\\\` or \\\`{append:...}\\\`).
- Optionally, add a \\\`{metadata:...}\\\` explanation.

Examples:
User Message: "Can you make this story sound more exciting?"
Editor Content: "The cat sat on the mat. It was a gray cat. The mat was blue."
Your Response (example): "Let's spice that up! How about this: {regenerate:The sleek panther, a shadow in the twilight, coiled upon the ancient, cerulean rug, its eyes gleaming with untold secrets.} {metadata:I've used more vivid imagery and a hint of mystery to make it more exciting.}"

User Message: "Add a concluding sentence about hope."
Editor Content: "The journey was long and arduous."
Your Response (example): "Good idea! Let's add this: {append:Yet, a tiny spark of hope remained, flickering resiliently against the encroaching darkness.} {metadata:Added a concluding sentence focusing on resilience and hope.}"

User Message: "Tell me a joke."
Editor Content: (Any text)
YourResponse (example): "Why don't scientists trust atoms? Because they make up everything! {metadata:Just a little humor for you!}"

Tone: Adapt your tone to the user's writing style and content. If they are writing a serious piece, be more formal. If it's creative or casual, feel free to be more playful.
Conciseness: Try to be concise but helpful.
Clarity: Ensure your instructions (if any) and explanations are clear.
You output text, and it might be spoken aloud.
Your responses will be streamed, so make them flow naturally.`;

export const DEBOUNCE_DELAY = 1500; 
export const ASSISTANT_MIN_CHAR_THRESHOLD = 75; 
export const ASSISTANT_MAX_CHAR_THRESHOLD = 150; 
export const ASSISTANT_TIME_THRESHOLD_MS = 25000; 
export const MIN_TEXT_LENGTH_FOR_ASSISTANT = 10;

export const GET_STARTED_MARKDOWN_CONTENT = `
# Welcome to Your AI Text Editor!

Hi there! I'm **Lexi**, your AI assistant, and this is your smart text editor. Let's get you started!

## The Editor & Markdown

*   **Write Freely:** The main area is your canvas. Just start typing!
*   **Markdown Power:** You can use Markdown to format your text. Here are some basics:
    *   \`# Heading 1\`, \`## Heading 2\`, ...
    *   \`*italic*\` or \`_italic_\` for *italic text*
    *   \`**bold**\` or \`__bold__\` for **bold text**
    *   \`- List item 1\`
    *   \`- List item 2\`
    *   \`1. Numbered item 1\`
    *   \`[Link text](https://example.com)\` for links
    *   \`![Alt text](image_url)\` for images
    *   \`\`\` \`code block\` \`\`\` for code blocks
    *   \`> Blockquote\`
*   **Preview:** Click the **Eye Icon** (👁️) in the toolbar to see how your Markdown looks! Click it again (now a slashed eye 👁️‍🗨️) to return to editing.

## Advanced Markdown Features ✨

Take your notes to the next level with these custom features:

### 🎥 YouTube Embeds

Easily embed YouTube videos directly into your notes.

*   **Centered Embed:**
    *   Syntax: \`#yt:YOUTUBE_VIDEO_URL\`
    *   Shorthand: \`#Y:YOUTUBE_VIDEO_URL\`
    *   Example: \`#yt:https://www.youtube.com/watch?v=dQw4w9WgXcQ\`
*   **Right-aligned Small Embed:**
    *   Syntax: \`##yt:YOUTUBE_VIDEO_URL\`
    *   Shorthand: \`##Y:YOUTUBE_VIDEO_URL\`
    *   Example: \`##yt:https://www.youtube.com/watch?v=dQw4w9WgXcQ\`
*   **Left-aligned Small Embed:**
    *   Syntax: \`###yt:YOUTUBE_VIDEO_URL\`
    *   Shorthand: \`###Y:YOUTUBE_VIDEO_URL\`
    *   Example: \`###yt:https://www.youtube.com/watch?v=dQw4w9WgXcQ\`
*   **Embed with Start/End Times:**
    *   Syntax: \`####yt:URL|start=SECONDS&end=SECONDS\`
    *   Shorthand: \`####Y:URL|start=SS&end=SS\`
    *   Example: \`####yt:https://www.youtube.com/watch?v=dQw4w9WgXcQ|start=30&end=90\`

### 🖼️ Enhanced Image Display

Control how your images appear with powerful options.

*   **Centered, Full-Width Image:**
    *   Syntax: \`#img:center:IMAGE_URL\`
    *   Shorthand: \`#I:C:IMAGE_URL\`
    *   Example: \`#img:center:https://picsum.photos/800/300\`
*   **Left-aligned Image with Effects:**
    *   Syntax: \`#img:left:IMAGE_URL|radius=VALUE|shadow\`
    *   Shorthand: \`#I:L:IMAGE_URL|radius=VAL|shadow\`
    *   (\`radius\` and \`shadow\` are optional. \`radius\` value is in pixels.)
    *   Example: \`#img:left:https://picsum.photos/300/200|radius=15|shadow\`
    *   Example (no shadow): \`#img:left:https://picsum.photos/300/200|radius=8\`
    *   Example (only shadow): \`#img:left:https://picsum.photos/300/200|shadow\`
*   **Image Gallery:**
    *   Syntax: \`#img:gallery:[URL1,URL2,URL3,...]\`
    *   Shorthand: \`#I:G:[URL1,URL2,...]\`
    *   Example: \`#img:gallery:[https://picsum.photos/200/150?random=1,https://picsum.photos/200/150?random=2,https://picsum.photos/200/150?random=3]\`
*   **Blur Image (Reveals on Hover):**
    *   Syntax: \`#img:blur:IMAGE_URL\`
    *   Shorthand: \`#I:B:IMAGE_URL\`
    *   Example: \`#img:blur:https://picsum.photos/400/250\`

### 🎨 Colored Admonition Blocks

Highlight important information with styled blocks.

*   **Danger Block:**
    *   Syntax: \`:::danger Your dangerous message here:::\`
    *   Shorthands: \`:::DANGER ...:::\` or \`:::D ...:::\`
    *   Example: \`:::danger Warning: This action is irreversible!:::\`
*   **Info Block:**
    *   Syntax: \`:::info Useful information for the user:::\`
    *   Shorthands: \`:::INFO ...:::\` or \`:::I ...:::\`
    *   Example: \`:::info Tip: Remember to save your work frequently.\`
*   **Success Block:**
    *   Syntax: \`:::success Operation completed successfully!:::\`
    *   Shorthands: \`:::SUCCESS ...:::\` or \`:::S ...:::\`
    *   Example: \`:::success Your file has been uploaded.\`
*   **Note Block:**
    *   Syntax: \`:::note Important note to consider:::\`
    *   Shorthands: \`:::NOTE ...:::\` or \`:::N ...:::\`
    *   Example: \`:::note This feature is currently in beta.\`

### 💡 Combining Features (Nesting)

You can embed features within others, for example, placing a YouTube video inside an info block:

\`\`\`markdown
:::info
Check out this helpful video:

#yt:https://www.youtube.com/watch?v=dQw4w9WgXcQ

And here's an important image related to it:
#img:center:https://picsum.photos/seed/nested/400/200
:::
\`\`\`
This will render the info block with the YouTube video and the centered image inside it!

## Managing Your Work

*   **Saving:** Click the **Save Icon** (💾) in the toolbar to download your current tab's text and AI history as an \`.aitxt\` file.
*   **Loading:** Click the **Load Icon** (📂) to open an \`.aitxt\` file into your current tab.
*   **Clear Text:** The **Trash Icon** (🗑️) clears the text in the current tab (you'll be asked to confirm).

## Tabs: Your Workspace

*   **Multiple Documents:** You're currently in the "Get Started" tab. You can have many tabs open at once!
*   **New Tab:** Click the **"+" button** in the tab bar (top area) to create a new "Untitled" tab.
*   **Switch Tabs:** Simply click on a tab title to switch to it.
*   **Rename Tab:** Double-click on a tab's title (e.g., "Untitled") to rename it. Type the new name and press Enter.
*   **Close Tab:** Click the "✕" on a tab to close it.

## Chat With Lexi (That's Me!)

The panel on the right is my home!
*   **Hide/Show Panel:** Want more writing space? Click the **Panel Toggle Icon** (➡️ or ⬅️) in the toolbar to hide or show my panel.
*   **Ask Me Anything:** Type a message in the input field at the bottom of my panel and hit Enter or the Send button.
*   **I Know Your Text:** When you chat with me, I can see the text in your *active tab*. This helps me give relevant suggestions.
*   **Text Changes:** I can help you rewrite, append, or generate text.
    *   Example: "Rewrite this to be more formal."
    *   Example: "Add a paragraph about the future."
    *   When I suggest a change to your document, you'll see **"Apply Change"** and **"Reject Change"** buttons in my chat bubble. The change only happens if you click "Apply"!
*   **See New Text:** For bigger changes (like a full rewrite), I'll offer a "See New Text" button so you can preview it before deciding.
*   **Voice:** By default, I'll speak my responses. You can toggle this with the **Speaker Icon** (🔊 or 🔇) in my panel's header or in the main toolbar.

## Settings & Customization

*   **More Settings:** Click the **Gear Icon** (⚙️) to:
    *   Choose a visual **Theme** for the editor.
    *   Change the editor's **Background Image** (select from predefined options or enter a URL).
    *   Set a **Background Music URL**.
*   **API Key (For Devs):** If AI features aren't working, you might need to set a Gemini API Key (especially for local development). The "Set Dev API Key" button will appear if needed.

---

That's the gist! Play around, explore, and don't hesitate to ask me if you have questions. Happy writing!
`;
