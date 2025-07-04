// config.js

const ENV = "auto"; // "auto" | "local" | "prod"

export const BASE_API_URL =
  ENV === "local"
    ? "http://localhost:5000"
    : ENV === "prod"
    ? "https://data-collection-system.onrender.com"
    : window.location.hostname.includes("localhost")
    ? "http://localhost:5000"
    : "https://data-collection-system.onrender.com";
