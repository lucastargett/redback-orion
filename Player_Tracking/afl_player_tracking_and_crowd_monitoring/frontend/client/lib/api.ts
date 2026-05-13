const API_BASE_URL = "http://localhost:8000";

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  let accessToken = localStorage.getItem("access_token");

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // If token expired
  if (response.status === 401) {
    const refreshToken = localStorage.getItem("refresh_token");

    // Try refresh token
    const refreshResponse = await fetch(
      `${API_BASE_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      }
    );

    // Refresh success
    if (refreshResponse.ok) {
      const data = await refreshResponse.json();

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      accessToken = data.access_token;

      // Retry original request
      response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } else {
      // Refresh failed
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      window.location.href = "/login";
    }
  }

  return response;
}