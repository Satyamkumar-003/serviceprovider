/**
 * Tiny fetch wrapper. Uses the same env var pattern as Login.js
 * (process.env.REACT_APP_BASE_URL) so it works in dev and on Netlify.
 *
 * Endpoints kept exactly as-is on the backend:
 *   POST /api/users/register
 *   POST /api/users/login
 *   GET  /api/services
 *   POST /api/bookings
 *   GET  /api/bookings/me
 *   PATCH /api/bookings/:id/cancel
 */

const BASE_URL =
  process.env.REACT_APP_BASE_URL ||
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";

function getToken() {
  try {
    return localStorage.getItem("token") || null;
  } catch {
    return null;
  }
}

async function request(path, { method = "GET", body, auth = false, signal } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (err) {
    const e = new Error("Network error. Please check your connection.");
    e.cause = err;
    throw e;
  }

  let data = null;
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const message =
      (data && (data.message || data.error)) ||
      `Request failed with status ${response.status}`;
    const err = new Error(message);
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
}

export const api = {
  baseUrl: BASE_URL,
  get:    (path, opts)       => request(path, { ...opts, method: "GET" }),
  post:   (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  patch:  (path, body, opts) => request(path, { ...opts, method: "PATCH", body }),
  delete: (path, opts)       => request(path, { ...opts, method: "DELETE" }),
};

export default api;
