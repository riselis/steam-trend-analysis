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

export const fetchChatResponse = async (message) => {
  await delay(3200);

  const normalized = message.toLowerCase();

  // Strategic + 3D
  if (normalized.includes("strategic") && normalized.includes("3d")) {
    return {
      success: true,
      response:
        "If you are aiming for a more strategic and fully 3D experience, a City Builder combined with Tower Defense mechanics is a strong and realistic direction.",
    };
  }

  // Large team + big investment
  if (
    normalized.includes("over 10") ||
    normalized.includes("large team") ||
    normalized.includes("investment")
  ) {
    return {
      success: true,
      response:
        "With a team of over 10 people and plans for larger investment, an Open World Survival Craft game becomes a viable option with long-term growth potential.",
    };
  }

  // Default fallback
  return {
    success: true,
    response:
      "I can help you explore different strategic directions based on your team size, technical ambitions, and investment goals.",
  };
};

// Submit trend input (wizard form)
export const submitTrendInput = async (formData) => {
  await delay(1500);

  // Generate a mock responseId
  const responseId = Math.floor(Math.random() * 1000000) + 1000;

  // Generate mock structured response
  const summary = {
    recommended_niche: "Roguelike Deckbuilder",
    core_theme: "tactical decision-making",
    game_mode: formData.gameMode || "singleplayer",
    recommended_release_window: "Q2 2025",
    target_audience: {
      age_range: {
        min: 20,
        max: 40,
      },
      player_type: "core",
    },
    risk_success: {
      success_probability: 64.0,
      risk_level: "moderate",
      ai_summary:
        "Roguelike deckbuilders have a proven and loyal audience on PC platforms, especially Steam. While the market is competitive, strong mechanics, replayability, and clarity of design significantly increase success odds for small to mid-sized teams.",
    },
    revenue_snapshot: {
      month_1: { low: 3000, mid: 10000, high: 25000 },
      month_6: { low: 15000, mid: 60000, high: 120000 },
      month_12: { low: 30000, mid: 120000, high: 250000 },
    },
  };

  const top_niches = [
    {
      niche_title: "Roguelike Deckbuilder",
      trend_direction: "stable_up",
      success_probability: 64.0,
      risk_score: 40,
      market_saturation: 60,
      competition_density: 70,
      team_fit_score: 82,
      release_timing: {
        recommended_window: "Q2 2025",
        best_months: ["April", "May", "June"],
        worst_months: ["December", "January"],
        visibility_score: 74,
      },
      financial_projections: {
        month_1: { low: 3000, mid: 10000, high: 25000 },
        month_6: { low: 15000, mid: 60000, high: 120000 },
        month_12: { low: 30000, mid: 120000, high: 250000 },
      },
      product_direction: {
        game_mode: "singleplayer",
        core_theme: "tactical deck optimization",
        recommended_scope: "medium",
        core_mechanics: [
          "Deck Building",
          "Turn-Based Combat",
          "Meta Progression",
          "Synergy Optimization",
        ],
      },
      publisher_fit: [
        {
          publisher: "Humble Games",
          match_score: 84,
          example_games: ["Slay the Spire", "For The King", "Void Bastards"],
        },
        {
          publisher: "Devolver Digital",
          match_score: 76,
          example_games: ["Inscryption", "Loop Hero"],
        },
        {
          publisher: "Hooded Horse",
          match_score: 71,
          example_games: ["Against the Storm", "Norland"],
        },
      ],
      marketing_plan: {
        pre_launch:
          "Steam page live early with playable demo. Devlogs focused on card synergies and design philosophy. Participate in Steam Next Fest.",
        launch:
          "Leverage Steam algorithm via wishlists, coordinated streamer coverage, and Reddit exposure (r/roguelikes, r/deckbuilders).",
        post_launch:
          "Balance updates, new cards, additional characters, and challenge modes to drive retention.",
        primary_channels: ["Steam", "YouTube", "Reddit", "Discord"],
        community_strategy:
          "Active Discord with feedback-driven balance patches and public roadmap.",
        risks:
          "High competition within the genre and strong player expectations for balance and depth.",
      },
      explainability: {
        top_success_factors: [
          "Proven genre demand",
          "High replayability potential",
          "Clear scope control",
        ],
        top_risk_factors: [
          "Genre fatigue",
          "Balance complexity",
          "Discoverability on Steam",
        ],
        model_confidence: 77.0,
      },
    },
    {
      niche_title: "Strategy Deckbuilder",
      trend_direction: "stable",
      success_probability: 58.0,
      risk_score: 48,
      market_saturation: 65,
      competition_density: 75,
      team_fit_score: 70,
      release_timing: {
        recommended_window: "Q3 2025",
        best_months: ["July", "August"],
        worst_months: ["November", "December"],
        visibility_score: 66,
      },
      financial_projections: {
        month_1: { low: 2500, mid: 8000, high: 20000 },
        month_6: { low: 12000, mid: 45000, high: 90000 },
        month_12: { low: 25000, mid: 90000, high: 200000 },
      },
      product_direction: {
        game_mode: "singleplayer",
        core_theme: "long-term strategic planning",
        recommended_scope: "medium",
        core_mechanics: [
          "Resource Management",
          "Deck Optimization",
          "Scenario-Based Progression",
        ],
      },
      publisher_fit: [
        {
          publisher: "Raw Fury",
          match_score: 69,
          example_games: ["Card Shark", "Kingdom"],
        },
      ],
      marketing_plan: {
        pre_launch:
          "Long-form gameplay previews and deep-dive videos explaining systems.",
        launch:
          "Press outreach to strategy-focused media and Steam visibility events.",
        post_launch: "Scenario expansions and difficulty modes.",
        primary_channels: ["Steam", "YouTube", "Discord"],
        community_strategy:
          "High-quality guides, theorycrafting discussions, and mod support.",
        risks: "Higher learning curve and narrower audience.",
      },
      explainability: {
        top_success_factors: [
          "Dedicated niche audience",
          "Depth of systems",
          "Replay value",
        ],
        top_risk_factors: [
          "Complex onboarding",
          "Lower mass appeal",
          "Competition from established titles",
        ],
        model_confidence: 70.0,
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

  const summary = {
    recommended_niche: "Roguelike Deckbuilder",
    core_theme: "tactical decision-making",
    game_mode: "singleplayer",
    recommended_release_window: "Q2 2025",
    target_audience: {
      age_range: { min: 20, max: 40 },
      player_type: "core",
    },
    risk_success: {
      success_probability: 64.0,
      risk_level: "moderate",
      ai_summary:
        "Roguelike deckbuilders have a stable and proven audience on Steam. While competition is high, titles with strong mechanical depth, replayability, and clear visual identity consistently perform well in this niche.",
    },
    revenue_snapshot: {
      month_1: { low: 3000, mid: 10000, high: 25000 },
      month_2: { low: 5000, mid: 18000, high: 40000 },
      month_3: { low: 8000, mid: 30000, high: 70000 },
      month_6: { low: 15000, mid: 60000, high: 120000 },
      month_9: { low: 20000, mid: 90000, high: 180000 },
      month_12: { low: 30000, mid: 120000, high: 250000 },
    },
  };

  const top_niches = [
    {
      niche_title: "Roguelike Deckbuilder",
      trend_direction: "stable_up",
      success_probability: 64.0,
      risk_score: 40,
      market_saturation: 60,
      competition_density: 70,
      team_fit_score: 82,
      release_timing: {
        recommended_window: "Q2 2025",
        best_months: ["April", "May", "June"],
        worst_months: ["December", "January"],
        visibility_score: 74,
      },
      financial_projections: {
        month_1: { low: 3000, mid: 10000, high: 25000 },
        month_6: { low: 15000, mid: 60000, high: 120000 },
        month_12: { low: 30000, mid: 120000, high: 250000 },
      },
      product_direction: {
        game_mode: "singleplayer",
        core_theme: "tactical deck optimization",
        recommended_scope: "medium",
        core_mechanics: [
          "Deck Building",
          "Turn-Based Combat",
          "Meta Progression",
          "Synergy Optimization",
        ],
      },
      publisher_fit: [
        {
          publisher: "Humble Games",
          match_score: 84,
          example_games: ["Slay the Spire", "For The King", "Void Bastards"],
        },
        {
          publisher: "Devolver Digital",
          match_score: 76,
          example_games: ["Inscryption", "Loop Hero"],
        },
        {
          publisher: "Hooded Horse",
          match_score: 71,
          example_games: ["Against the Storm", "Norland"],
        },
      ],
      marketing_plan: {
        pre_launch:
          "Early Steam page with playable demo, devlogs focused on card synergies, and participation in Steam Next Fest.",
        launch:
          "Wishlist conversion push, coordinated streamer coverage, and exposure on Reddit and YouTube.",
        post_launch:
          "Balance patches, new cards, additional characters, and challenge modes.",
        primary_channels: ["Steam", "YouTube", "Reddit", "Discord"],
        community_strategy:
          "Feedback-driven balance updates, transparent roadmap, and active Discord moderation.",
        risks:
          "High competition and strong player expectations for balance and replayability.",
      },
      explainability: {
        top_success_factors: [
          "Proven genre demand",
          "High replayability",
          "Controlled production scope",
        ],
        top_risk_factors: [
          "Genre fatigue",
          "Balance complexity",
          "Steam discoverability",
        ],
        model_confidence: 77.0,
      },
    },
    {
      niche_title: "Strategy Deckbuilder",
      trend_direction: "stable",
      success_probability: 58.0,
      risk_score: 48,
      market_saturation: 65,
      competition_density: 75,
      team_fit_score: 70,
      release_timing: {
        recommended_window: "Q3 2025",
        best_months: ["July", "August"],
        worst_months: ["November", "December"],
        visibility_score: 66,
      },
      financial_projections: {
        month_1: { low: 2500, mid: 8000, high: 20000 },
        month_6: { low: 12000, mid: 45000, high: 90000 },
        month_12: { low: 25000, mid: 90000, high: 200000 },
      },
      product_direction: {
        game_mode: "singleplayer",
        core_theme: "long-term strategic planning",
        recommended_scope: "medium",
        core_mechanics: [
          "Resource Management",
          "Deck Optimization",
          "Scenario-Based Progression",
        ],
      },
      publisher_fit: [
        {
          publisher: "Raw Fury",
          match_score: 69,
          example_games: ["Card Shark", "Kingdom"],
        },
      ],
      marketing_plan: {
        pre_launch: "Deep-dive videos explaining systems and mechanics.",
        launch:
          "Outreach to strategy-focused media and Steam visibility events.",
        post_launch: "Scenario expansions and difficulty modifiers.",
        primary_channels: ["Steam", "YouTube", "Discord"],
        community_strategy:
          "Guides, theorycrafting discussions, and optional mod support.",
        risks: "Higher learning curve and narrower audience.",
      },
      explainability: {
        top_success_factors: [
          "Dedicated niche audience",
          "System depth",
          "Replay value",
        ],
        top_risk_factors: [
          "Complex onboarding",
          "Lower mass appeal",
          "Strong genre incumbents",
        ],
        model_confidence: 70.0,
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
