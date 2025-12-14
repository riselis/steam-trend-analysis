// Chat store with localStorage persistence
// In production, this would be replaced with API calls

const STORAGE_KEY = "steam_trend_chats";
const MESSAGES_STORAGE_KEY = "steam_trend_chat_messages";

// Helper to derive chat name from response
const deriveChatName = (chatResponse, responseId) => {
  if (!chatResponse) {
    return `Game Strategy Chat ${responseId}`;
  }

  // Get first sentence or first line
  const firstLine = chatResponse.split("\n")[0].trim();
  const firstSentence = firstLine.split(/[.!?]/)[0].trim();

  // Use first sentence if reasonable length, otherwise first line
  let name =
    firstSentence.length > 10 && firstSentence.length < 100
      ? firstSentence
      : firstLine;

  // Trim to max 40 characters
  if (name.length > 40) {
    name = name.substring(0, 37) + "...";
  }

  return name || `Game Strategy Chat ${responseId}`;
};

// Load chats from localStorage
const loadChats = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load chats from localStorage:", error);
    return [];
  }
};

// Save chats to localStorage
const saveChats = (chats) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  } catch (error) {
    console.error("Failed to save chats to localStorage:", error);
  }
};

// Load messages for a specific chat
const loadChatMessages = (chatId) => {
  try {
    const stored = localStorage.getItem(`${MESSAGES_STORAGE_KEY}_${chatId}`);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error(`Failed to load messages for chat ${chatId}:`, error);
    return [];
  }
};

// Save messages for a specific chat
const saveChatMessages = (chatId, messages) => {
  try {
    localStorage.setItem(
      `${MESSAGES_STORAGE_KEY}_${chatId}`,
      JSON.stringify(messages)
    );
  } catch (error) {
    console.error(`Failed to save messages for chat ${chatId}:`, error);
  }
};

export const chatStore = {
  // Get all chats (metadata only)
  getAllChats: () => {
    const chats = loadChats();
    return [...chats].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  },

  // Get chat metadata by ID
  getChatById: (id) => {
    const chats = loadChats();
    return chats.find((chat) => chat.responseId === parseInt(id));
  },

  // Create new chat
  createChat: (responseId, initialMessage) => {
    const chats = loadChats();
    const chatName = deriveChatName(initialMessage.content, responseId);

    const newChat = {
      responseId: parseInt(responseId),
      chatName,
      createdAt: new Date().toISOString(),
    };

    chats.push(newChat);
    saveChats(chats);

    // Save initial message
    saveChatMessages(responseId, [initialMessage]);

    return newChat;
  },

  // Get chat with messages
  getChatWithMessages: (id) => {
    const chat = chatStore.getChatById(id);
    if (!chat) return null;

    const messages = loadChatMessages(id);
    return {
      ...chat,
      messages,
    };
  },

  // Add message to chat
  addMessage: (chatId, message) => {
    const messages = loadChatMessages(chatId);
    messages.push(message);
    saveChatMessages(chatId, messages);

    const chat = chatStore.getChatById(chatId);
    return chat ? { ...chat, messages } : null;
  },

  // Clear all chats (for testing)
  clearAll: () => {
    localStorage.removeItem(STORAGE_KEY);
    // Clear all message storage
    const chats = loadChats();
    chats.forEach((chat) => {
      localStorage.removeItem(`${MESSAGES_STORAGE_KEY}_${chat.responseId}`);
    });
    localStorage.removeItem(STORAGE_KEY);
  },
};
