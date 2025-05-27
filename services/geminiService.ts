import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { GEMINI_TEXT_MODEL, ASSISTANT_SYSTEM_INSTRUCTION } from '../constants'; // IMAGEN_MODEL removed as unused

let ai: GoogleGenAI | null = null;

const getApiKey = (): string | undefined => {
  const key = process.env.API_KEY || localStorage.getItem('GEMINI_API_KEY_DEV');
  if (!key) {
    console.warn("API_KEY is not set in process.env or localStorage. Gemini API calls will fail.");
  }
  return key;
};


export const initializeAi = (): boolean => {
  const apiKey = getApiKey();
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
    return true;
  }
  return false;
};

export const isAiInitialized = (): boolean => !!ai;

// generateText and generateImage removed as Lexi chat will handle these functionalities.
// If specific generation endpoints are needed later, they can be re-added.

let assistantChat: Chat | null = null;

export const startAssistantChat = (): Chat | null => {
  if (!ai) {
    console.error("AI service not initialized for chat.");
    return null;
  }
  // The chat history is maintained by the 'assistantChat' instance.
  // For more complex history management (e.g., summarizing, truncating),
  // this logic would be expanded.
  // System instruction is part of the chat model config.
  if (!assistantChat) {
     assistantChat = ai.chats.create({
        model: GEMINI_TEXT_MODEL, // Ensure this uses the model from constants
        config: {
            systemInstruction: ASSISTANT_SYSTEM_INSTRUCTION,
            // Other config like temperature, topP, topK can be added here if needed
        }
     });
  }
  return assistantChat;
};

export const sendMessageToAssistantStream = async (
  fullPromptIncludingContextAndUserMessage: string // This is the combined prompt
): Promise<AsyncIterable<GenerateContentResponse> | null> => {
  const chat = startAssistantChat();
  if (!chat) return null;

  try {
    // The 'message' sent to chat.sendMessageStream is the user's turn.
    // The `ASSISTANT_SYSTEM_INSTRUCTION` is part of the chat's config.
    // The `fullPromptIncludingContextAndUserMessage` now effectively becomes the user's message *plus* context,
    // which might be slightly redundant if the chat history inherently includes context.
    // However, explicitly sending current editor text ensures Lexi always has the latest version for its response.
    // The Gemini API's Chat service should handle history appropriately.
    // For the `Chat` object, `sendMessageStream` takes the newest user part.
    // The `ASSISTANT_SYSTEM_INSTRUCTION` is set at chat creation.
    // The other context (editor text, actual user query) forms the user's latest message.
    return chat.sendMessageStream({ message: fullPromptIncludingContextAndUserMessage });
  } catch (error) {
    console.error("Error sending message to assistant:", error);
    // More sophisticated error handling could be added here (e.g., specific error types)
    throw error; // Re-throw for the caller (App.tsx) to handle UI updates
  }
};

export const resetAssistantChat = () => {
  // This will clear the chat history for the current session,
  // so Lexi starts fresh.
  assistantChat = null; 
};
