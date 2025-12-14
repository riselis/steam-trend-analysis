import { apiFetch } from "./http";

// Mock users storage (in real app, this would be on server)
const mockUsers = [
  { email: "demo@example.com", password: "demo123", name: "Demo User" },
];

// Authentication (MOCKED)
export const login = async (email, password) => {
  // keep same delay feel as before (optional)
  await new Promise((r) => setTimeout(r, 800));

  const user = mockUsers.find((u) => u.email === email && u.password === password);

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
  await new Promise((r) => setTimeout(r, 800));

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


// ------------------------------------
// CHAT (NOT implemented on backend yet)
// ------------------------------------
export const fetchChatResponse = async (message) => {
  return {
    success: false,
    error: "Chat endpoint not implemented on backend yet",
  };
};

// ------------------------------------
// Trend wizard -> maps to GET /trend
// Keeps old return shape: {success, chatResponse: string, responseId}
// ------------------------------------
export const submitTrendInput = async (formData) => {
  const query = {
    teamSize: formData.teamSize,
    preferredGenres: formData.preferredGenres ?? formData.preferredGenres?.length ? formData.preferredGenres : (formData.preferredGenres ?? []),
    commercialGamesBuiltCount: formData.commercialGamesBuiltCount,
    artHeavyLevel: formData.artHeavyLevel,
    maxDevelopmentTimeInMonths: formData.maxDevelopmentTimeInMonths,
    revenueExpectedInThousandsOfDollars: formData.revenueExpectedInThousandsOfDollars,
  };

  const data = await apiFetch("/trend", { query });

  // backend returns chatResponse as OBJECT; old frontend expects STRING
  return {
    success: true,
    chatResponse: JSON.stringify(data.chatResponse),
    responseId: data.responseId,
  };
};

// ------------------------------------
// Full report (NOT implemented on backend yet)
// Your backend doesn't currently have a "get stored chatResponse by responseId" endpoint.
// Keep signature, return a meaningful error to avoid silent failures.
// ------------------------------------
export const getFullReport = async (responseId) => {
  return {
    success: false,
    error:
      "Backend endpoint missing for full report. Add something like GET /trend-response/{responseId} to return stored chatResponse.",
  };
};

// ------------------------------------
// Genres list -> maps to GET /tags
// Keeps old return: {success, genres: [...]}
// ------------------------------------
export const getGenres = async () => {
  const data = await apiFetch("/tags");
  return {
    success: true,
    genres: data.tags,
  };
};

// ------------------------------------
// Action step plan -> maps to GET /action-step-plan/{id}
// Keeps old return: {success, plan: string}
// ------------------------------------
export const getActionStepPlan = async (responseId) => {
  const data = await apiFetch(`/action-step-plan/${responseId}`);
  return {
    success: true,
    plan: data.text,
  };
};

// ------------------------------------
// Trend chart mock -> NO backend endpoint provided
// Keeping signature; return an error (or keep your old mock if UI depends on it)
// ------------------------------------
export const fetchTrendData = async (filters) => {
  return {
    success: false,
    error: "Trend chart endpoint not implemented on backend yet",
  };
};

// ------------------------------------
// Genres trend data -> maps to GET /genres-trend-data
// NOTE: backend query param is minNumberForProtifability (typo) and must match.
// Keeps old return: {success, data: {...}}
// ------------------------------------
export const fetchGenresTrendData = async (params) => {
  const query = {
    startdate: params.startdate,
    enddate: params.enddate,
    profitabilityType: params.profitabilityType,
    minNumberForProtifability: params.minNumberForProfitability,
  };

  const data = await apiFetch("/genres-trend-data", { query });

  return {
    success: true,
    data,
  };
};

// ------------------------------------
// Analytics mock -> NO backend endpoint provided
// Keeping signature; return an error (or keep old mock)
// ------------------------------------
export const fetchAnalyticsData = async () => {
  return {
    success: false,
    error: "Analytics endpoint not implemented on backend yet",
  };
};

// ------------------------------------
// Deep data analytics -> maps to GET /deep-data
// Keeps old return: {success, data: {...}}
// ------------------------------------
export const fetchDeepDataAnalytics = async (params) => {
  const query = {
    tags: params.tags ?? [],
    wishlistMin: params.wishlistMin ?? 0,
    wishlistMax: params.wishlistMax ?? 2000000000,
    revenueMin: params.revenueMin ?? 0,
    revenueMax: params.revenueMax ?? 2000000000,
    reviewsMin: params.reviewsMin ?? 0,
    reviewsMax: params.reviewsMax ?? 2000000000,
    startdate: params.startdate,
    enddate: params.enddate,
  };

  const data = await apiFetch("/deep-data", { query });

  return {
    success: true,
    data,
  };
};
