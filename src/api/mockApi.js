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
  await delay(3200);

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

  // Generate mock structured response
  const summary = {
    recommended_niche: formData.preferredGenres?.[0] || "Action RPG",
    core_theme: formData.themePreferences?.[0] || "strategy",
    game_mode: formData.gameMode || "singleplayer",
    recommended_release_window: formData.targetReleaseWindow || "Q2 2024",
    target_audience: {
      age_range: {
        min: formData.targetAgeGroup?.min || 18,
        max: formData.targetAgeGroup?.max || 35,
      },
      player_type: formData.playerType || "midcore",
    },
    risk_success: {
      success_probability: 72.5,
      risk_level: "moderate",
      ai_summary:
        "Based on your team composition and project scope, this niche shows strong market potential with moderate competition. Success probability is favorable given your technical capabilities.",
    },
    revenue_snapshot: {
      month_1: {
        low: 5000,
        mid: 15000,
        high: 35000,
      },
      month_3: {
        low: 12000,
        mid: 45000,
        high: 95000,
      },
    },
  };

  const top_niches = [
    {
      niche_title: formData.preferredGenres?.[0] || "Action RPG",
      trend_direction: "up",
      success_probability: 72.5,
      risk_score: 35,
      market_saturation: 45,
      competition_density: 60,
      team_fit_score: 85,
      release_timing: {
        recommended_window: "Q2 2024",
        best_months: ["April", "May", "June"],
        worst_months: ["December", "January"],
        visibility_score: 78,
      },
      financial_projections: {
        month_1: { low: 5000, mid: 15000, high: 35000 },
        month_6: { low: 25000, mid: 75000, high: 150000 },
        month_12: { low: 50000, mid: 180000, high: 400000 },
      },
      product_direction: {
        game_mode: formData.gameMode || "singleplayer",
        core_theme: formData.themePreferences?.[0] || "strategy",
        recommended_scope: "medium",
        core_mechanics: ["Combat", "Progression", "Exploration"],
      },
      publisher_fit: [
        {
          publisher: "Publisher A",
          match_score: 82,
          example_games: ["Game X", "Game Y"],
        },
        {
          publisher: "Publisher B",
          match_score: 75,
          example_games: ["Game Z"],
        },
      ],
      marketing_plan: {
        pre_launch:
          "Build community through Discord and Twitter. Create dev logs and teaser content.",
        launch:
          "Steam page optimization, influencer partnerships, press kit distribution.",
        post_launch:
          "Regular content updates, community engagement, seasonal events.",
        primary_channels: ["Steam", "Discord", "Twitter"],
        community_strategy:
          "Active moderation, weekly updates, player feedback integration.",
        risks:
          "Market saturation in target genre, timing competition with major releases.",
      },
      explainability: {
        top_success_factors: [
          "Strong team composition",
          "Clear target audience",
          "Moderate competition",
        ],
        top_risk_factors: [
          "Market timing",
          "Competition density",
          "Scope management",
        ],
        model_confidence: 78.5,
      },
    },
    {
      niche_title: formData.preferredGenres?.[1] || "Strategy",
      trend_direction: "stable",
      success_probability: 65.0,
      risk_score: 42,
      market_saturation: 55,
      competition_density: 70,
      team_fit_score: 72,
      release_timing: {
        recommended_window: "Q3 2024",
        best_months: ["July", "August"],
        worst_months: ["November", "December"],
        visibility_score: 65,
      },
      financial_projections: {
        month_1: { low: 4000, mid: 12000, high: 28000 },
        month_6: { low: 20000, mid: 60000, high: 120000 },
        month_12: { low: 40000, mid: 150000, high: 350000 },
      },
      product_direction: {
        game_mode: formData.gameMode || "singleplayer",
        core_theme: "strategy",
        recommended_scope: "medium",
        core_mechanics: ["Planning", "Resource Management", "Tactical Combat"],
      },
      publisher_fit: [
        {
          publisher: "Publisher C",
          match_score: 70,
          example_games: ["Game A"],
        },
      ],
      marketing_plan: {
        pre_launch:
          "Strategy-focused content, tutorial videos, community building.",
        launch: "Steam featured placement, strategy gaming sites coverage.",
        post_launch: "DLC content, balance updates, competitive features.",
        primary_channels: ["Steam", "YouTube", "Reddit"],
        community_strategy:
          "Strategy guides, balance discussions, tournament organization.",
        risks: "Higher competition, need for deep gameplay systems.",
      },
      explainability: {
        top_success_factors: [
          "Niche appeal",
          "Team expertise",
          "Market demand",
        ],
        top_risk_factors: ["Complexity", "Learning curve", "Competition"],
        model_confidence: 72.0,
      },
    },
  ];

  const chatResponse = {
    summary,
    top_niches,
  };

  return {
    success: true,
    chatResponse: JSON.stringify(chatResponse),
    responseId,
  };
};

// Get full report
export const getFullReport = async (responseId) => {
  await delay(1000);

  // Return structured response (same as initial submit)
  // In real app, this would fetch from server
  // For now, generate mock data similar to submitTrendInput
  const summary = {
    recommended_niche: "Action RPG",
    core_theme: "strategy",
    game_mode: "singleplayer",
    recommended_release_window: "Q2 2024",
    target_audience: {
      age_range: { min: 18, max: 35 },
      player_type: "midcore",
    },
    risk_success: {
      success_probability: 72.5,
      risk_level: "moderate",
      ai_summary:
        "Based on your team composition and project scope, this niche shows strong market potential with moderate competition.",
    },
    revenue_snapshot: {
      month_1: { low: 5000, mid: 15000, high: 35000 },
      month_3: { low: 12000, mid: 45000, high: 95000 },
    },
  };

  const top_niches = [
    {
      niche_title: "Action RPG",
      trend_direction: "up",
      success_probability: 72.5,
      risk_score: 35,
      market_saturation: 45,
      competition_density: 60,
      team_fit_score: 85,
      release_timing: {
        recommended_window: "Q2 2024",
        best_months: ["April", "May", "June"],
        worst_months: ["December", "January"],
        visibility_score: 78,
      },
      financial_projections: {
        month_1: { low: 5000, mid: 15000, high: 35000 },
        month_6: { low: 25000, mid: 75000, high: 150000 },
        month_12: { low: 50000, mid: 180000, high: 400000 },
      },
      product_direction: {
        game_mode: "singleplayer",
        core_theme: "strategy",
        recommended_scope: "medium",
        core_mechanics: ["Combat", "Progression", "Exploration"],
      },
      publisher_fit: [
        {
          publisher: "Publisher A",
          match_score: 82,
          example_games: ["Game X", "Game Y"],
        },
        {
          publisher: "Publisher B",
          match_score: 75,
          example_games: ["Game Z"],
        },
      ],
      marketing_plan: {
        pre_launch:
          "Build community through Discord and Twitter. Create dev logs and teaser content.",
        launch:
          "Steam page optimization, influencer partnerships, press kit distribution.",
        post_launch:
          "Regular content updates, community engagement, seasonal events.",
        primary_channels: ["Steam", "Discord", "Twitter"],
        community_strategy:
          "Active moderation, weekly updates, player feedback integration.",
        risks:
          "Market saturation in target genre, timing competition with major releases.",
      },
      explainability: {
        top_success_factors: [
          "Strong team composition",
          "Clear target audience",
          "Moderate competition",
        ],
        top_risk_factors: [
          "Market timing",
          "Competition density",
          "Scope management",
        ],
        model_confidence: 78.5,
      },
    },
    {
      niche_title: "Strategy",
      trend_direction: "stable",
      success_probability: 65.0,
      risk_score: 42,
      market_saturation: 55,
      competition_density: 70,
      team_fit_score: 72,
      release_timing: {
        recommended_window: "Q3 2024",
        best_months: ["July", "August"],
        worst_months: ["November", "December"],
        visibility_score: 65,
      },
      financial_projections: {
        month_1: { low: 4000, mid: 12000, high: 28000 },
        month_6: { low: 20000, mid: 60000, high: 120000 },
        month_12: { low: 40000, mid: 150000, high: 350000 },
      },
      product_direction: {
        game_mode: "singleplayer",
        core_theme: "strategy",
        recommended_scope: "medium",
        core_mechanics: ["Planning", "Resource Management", "Tactical Combat"],
      },
      publisher_fit: [
        {
          publisher: "Publisher C",
          match_score: 70,
          example_games: ["Game A"],
        },
      ],
      marketing_plan: {
        pre_launch:
          "Strategy-focused content, tutorial videos, community building.",
        launch: "Steam featured placement, strategy gaming sites coverage.",
        post_launch: "DLC content, balance updates, competitive features.",
        primary_channels: ["Steam", "YouTube", "Reddit"],
        community_strategy:
          "Strategy guides, balance discussions, tournament organization.",
        risks: "Higher competition, need for deep gameplay systems.",
      },
      explainability: {
        top_success_factors: [
          "Niche appeal",
          "Team expertise",
          "Market demand",
        ],
        top_risk_factors: ["Complexity", "Learning curve", "Competition"],
        model_confidence: 72.0,
      },
    },
  ];

  return {
    success: true,
    content: JSON.stringify({ summary, top_niches }),
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

// Genres Trend Data API
export const fetchGenresTrendData = async (params) => {
  await delay(1000);

  const { startdate, enddate, profitabilityType, minNumberForProfitability } =
    params;

  // Parse dates
  const startDate = new Date(startdate);
  const endDate = new Date(enddate);
  const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const dataPointCount = Math.max(1, daysDiff);

  // Generate date range
  const generateDateRange = () => {
    const dates = [];
    for (let i = 0; i <= dataPointCount; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const dates = generateDateRange();

  // Generate released_games data (base value varies by profitability type)
  const getBaseReleased = () => {
    switch (profitabilityType) {
      case "wishlists":
        return 150;
      case "revenue":
        return 120;
      case "reviews":
        return 100;
      default:
        return 130;
    }
  };

  // Generate profitable_games data (typically 30-50% of released)
  const getBaseProfitable = () => {
    switch (profitabilityType) {
      case "wishlists":
        return 60;
      case "revenue":
        return 45;
      case "reviews":
        return 40;
      default:
        return 50;
    }
  };

  const baseReleased = getBaseReleased();
  const baseProfitable = getBaseProfitable();

  const released_games = dates.map((date, index) => ({
    date,
    y: Math.max(
      0,
      Math.floor(
        baseReleased + (Math.random() - 0.5) * 40 + Math.sin(index * 0.1) * 10
      )
    ),
  }));

  const profitable_games = dates.map((date, index) => ({
    date,
    y: Math.max(
      0,
      Math.floor(
        baseProfitable + (Math.random() - 0.5) * 20 + Math.sin(index * 0.1) * 5
      )
    ),
  }));

  // Calculate profitability_ratio (profitable / released * 100)
  const profitability_ratio = dates.map((date, index) => {
    const released = released_games[index].y;
    const profitable = profitable_games[index].y;
    const ratio = released > 0 ? (profitable / released) * 100 : 0;
    return {
      date,
      y: Math.round(ratio * 10) / 10, // Round to 1 decimal
    };
  });

  // Calculate totals
  const totalNumberOfReleasedGames = released_games.reduce(
    (sum, item) => sum + item.y,
    0
  );
  const totalNumberOfProfitableGames = profitable_games.reduce(
    (sum, item) => sum + item.y,
    0
  );

  return {
    success: true,
    data: {
      released_games,
      profitable_games,
      profitability_ratio,
      totalNumberOfReleasedGames,
      totalNumberOfProfitableGames,
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

// Deep Data Analytics API
export const fetchDeepDataAnalytics = async (params) => {
  await delay(1000);

  const {
    tags = [],
    wishlistMin = 0,
    wishlistMax = 1000000,
    revenueMin = 0,
    revenueMax = 10000000,
    reviewsMin = 0,
    reviewsMax = 100000,
    startdate,
    enddate,
  } = params;

  // Generate mock top revenue games
  const topRevenueGames = [
    { name: "Cyberpunk 2077", value: 8500000 },
    { name: "Elden Ring", value: 7200000 },
    { name: "Baldur's Gate 3", value: 6800000 },
    { name: "The Witcher 3", value: 5500000 },
    { name: "Red Dead Redemption 2", value: 4800000 },
    { name: "Hogwarts Legacy", value: 4200000 },
    { name: "Starfield", value: 3800000 },
    { name: "God of War", value: 3500000 },
  ].slice(0, 8);

  // Generate mock top wishlisted games
  const topWishlistedGames = [
    { name: "Hollow Knight: Silksong", value: 285000 },
    { name: "The Elder Scrolls VI", value: 245000 },
    { name: "Half-Life 3", value: 198000 },
    { name: "GTA VI", value: 175000 },
    { name: "Star Citizen", value: 152000 },
    { name: "Titanfall 3", value: 128000 },
    { name: "Portal 3", value: 115000 },
    { name: "Left 4 Dead 3", value: 98000 },
  ].slice(0, 8);

  // Generate mock language support
  const topSupportedLanguages = [
    "English",
    "Simplified Chinese",
    "Russian",
    "German",
    "French",
    "Spanish",
    "Japanese",
    "Korean",
    "Portuguese",
    "Italian",
  ];

  return {
    success: true,
    data: {
      topRevenueGames,
      topWishlistedGames: topWishlistedGames,
      topSupportedLanguages,
      percentThatWentWithPublishers: 42.5,
      linuxSupportPercentage: 68.3,
      macSupportPercentage: 54.7,
      medianPrice: 19.99,
      averagePrice: 24.87,
      partialControllerSupportPercentage: 78.2,
      fullControllerSupportPercentage: 65.4,
      coopSupportPercentage: 45.8,
      multiplayerSupportPercentage: 52.3,
      steamLeaderboardSupportPercentage: 38.9,
      steamAchievementsSupportPercentage: 89.2,
    },
  };
};
