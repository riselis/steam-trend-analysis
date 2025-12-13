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

// Submit trend input (wizard form)
export const submitTrendInput = async (formData) => {
  await delay(1500);

  // Generate a mock responseId
  const responseId = Math.floor(Math.random() * 1000000) + 1000;

  const chatResponse = `Thank you for submitting your project details. Based on your team composition of ${
    formData.teamSize
  } members, ${formData.gameDimension} ${
    formData.gameEngine
  } project targeting ${
    formData.playerType
  } players, I've analyzed your requirements and prepared a comprehensive report. Your project shows strong potential in the ${
    formData.preferredGenres?.join(", ") || "selected"
  } genre(s). The analysis is ready for review.`;

  return {
    success: true,
    chatResponse,
    responseId,
  };
};

// Get full report
export const getFullReport = async (responseId) => {
  await delay(1000);

  return {
    success: true,
    content: `# Full Analysis Report #${responseId}

## Executive Summary
This comprehensive analysis has been generated based on your project submission. The report includes detailed insights into market trends, competitive analysis, and recommendations tailored to your specific project requirements.

## Market Analysis
Based on current Steam trends and your project specifications, we've identified key market opportunities and potential challenges in your target genre and platform focus.

## Recommendations
1. Consider focusing on your primary objective while maintaining flexibility for pivots
2. Leverage your team's previous experience in released genres
3. Plan for community engagement through selected channels
4. Monitor development timeline against target release window

## Risk Assessment
Your pivot readiness and release delay readiness scores have been factored into this analysis. Consider these factors when making critical project decisions.

## Next Steps
Review this report and use the action plan to guide your development process.`,
  };
};

// Get genres
export const getGenres = async () => {
  await delay(500);

  return {
    success: true,
    genres: [
      "Action",
      "Adventure",
      "RPG",
      "Strategy",
      "Simulation",
      "Puzzle",
      "Platformer",
      "Racing",
      "Sports",
      "Horror",
      "Educational",
      "Indie",
      "Casual",
      "Arcade",
    ],
  };
};

// Get action step plan
export const getActionStepPlan = async (responseId) => {
  await delay(1000);

  return {
    success: true,
    plan: `# Action Step Plan for Report #${responseId}

## Phase 1: Pre-Development (Weeks 1-2)
- Finalize team roles and responsibilities
- Set up development environment and tools
- Create initial project timeline and milestones

## Phase 2: Early Development (Weeks 3-8)
- Begin core gameplay mechanics implementation
- Establish art style and visual direction
- Set up community channels (Discord, Twitter, Steam page)

## Phase 3: Mid-Development (Weeks 9-20)
- Implement core features based on technical scope
- Begin playtesting and iteration cycles
- Start building community presence

## Phase 4: Pre-Release (Weeks 21-24)
- Finalize all features and content
- Conduct comprehensive testing
- Prepare marketing materials and store pages
- Plan release strategy

## Phase 5: Launch & Post-Release
- Execute launch plan
- Monitor community feedback
- Plan post-release updates based on player response`,
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
