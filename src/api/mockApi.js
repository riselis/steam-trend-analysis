// Mock API functions

const MOCK_DELAY = 800; // milliseconds

// Simulate API delay
const delay = (ms = MOCK_DELAY) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock users storage (in real app, this would be on server)
const mockUsers = [
  { email: "demo@example.com", password: "demo123", name: "Demo User" },
];

// Authentication
export const login = async (email, password) => {
  await delay();

  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    return {
      success: true,
      token: `mock_token_${Date.now()}`,
      user: {
        email: user.email,
        name: user.name,
      },
    };
  }

  return {
    success: false,
    error: "Invalid email or password",
  };
};

export const register = async (email, password, name) => {
  await delay();

  const existingUser = mockUsers.find((u) => u.email === email);

  if (existingUser) {
    return {
      success: false,
      error: "User with this email already exists",
    };
  }

  mockUsers.push({ email, password, name });

  return {
    success: true,
    token: `mock_token_${Date.now()}`,
    user: {
      email,
      name,
    },
  };
};

// Chat API
export const fetchChatResponse = async (message) => {
  await delay(1200);

  const responses = [
    "Based on the current Steam trends, I can help you analyze player engagement patterns.",
    "The data shows interesting patterns in user behavior across different game genres.",
    "Let me break down the key metrics for you: player retention has increased by 12% this quarter.",
    "I can provide insights on trending games and their performance metrics.",
    "Would you like me to analyze specific game categories or time periods?",
  ];

  return {
    success: true,
    response: responses[Math.floor(Math.random() * responses.length)],
  };
};

// Trend Analysis API
export const fetchTrendData = async (filters) => {
  await delay(1000);

  // Generate mock data points
  const generateDataPoints = (count, baseValue, variance) => {
    return Array.from({ length: count }, (_, i) => ({
      date: new Date(Date.now() - (count - i) * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      value: Math.floor(baseValue + (Math.random() - 0.5) * variance),
    }));
  };

  return {
    success: true,
    data: {
      playerCount: generateDataPoints(30, 50000, 10000),
      engagement: generateDataPoints(30, 75, 15),
    },
  };
};

// Analytics API
export const fetchAnalyticsData = async () => {
  await delay(1000);

  return {
    success: true,
    data: {
      retention: {
        day1: 68.5,
        day7: 42.3,
        day30: 28.7,
      },
      sessionLength: {
        average: 127,
        median: 95,
        p95: 245,
      },
      activeUsers: {
        daily: 125000,
        weekly: 450000,
        monthly: 1800000,
      },
      topGames: [
        { name: "Game A", players: 45000, growth: 12.5 },
        { name: "Game B", players: 38000, growth: -3.2 },
        { name: "Game C", players: 32000, growth: 8.7 },
        { name: "Game D", players: 28000, growth: 15.3 },
        { name: "Game E", players: 25000, growth: 5.1 },
      ],
    },
  };
};
