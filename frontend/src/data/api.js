// Thin fetch helper — same env contract as Login (REACT_APP_BASE_URL).
// Never hardcode the base URL anywhere else.

const RAW_BASE = process.env.REACT_APP_BASE_URL || "";
export const API_BASE = RAW_BASE.replace(/\/+$/, "");

const buildUrl = (path) => {
    if (/^https?:\/\//i.test(path)) return path;
    if (!path.startsWith("/")) path = "/" + path;
    return `${API_BASE}${path}`;
};

const authHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

async function request(path, { method = "GET", body, auth = false, signal } = {}) {
    const headers = { "Content-Type": "application/json", ...(auth ? authHeaders() : {}) };

    let response;
    try {
        response = await fetch(buildUrl(path), {
            method,
            headers,
            body: body !== undefined ? JSON.stringify(body) : undefined,
            signal,
        });
    } catch (networkError) {
        const err = new Error("Network error — please check your connection.");
        err.cause = networkError;
        err.isNetwork = true;
        throw err;
    }

    let json = null;
    try {
        json = await response.json();
    } catch {
        // Non-JSON response is allowed (e.g. 204).
    }

    if (!response.ok) {
        const message =
            (json && (json.message || json.error)) ||
            `Request failed (${response.status})`;
        const err = new Error(message);
        err.status = response.status;
        err.payload = json;
        throw err;
    }

    return json;
}

export const api = {
    get:    (path, opts) => request(path, { ...opts, method: "GET" }),
    post:   (path, body, opts) => request(path, { ...opts, method: "POST", body }),
    patch:  (path, body, opts) => request(path, { ...opts, method: "PATCH", body }),
    delete: (path, opts) => request(path, { ...opts, method: "DELETE" }),
};

export const isAuthed = () => Boolean(localStorage.getItem("token"));
