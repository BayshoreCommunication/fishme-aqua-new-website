// Main public domain. Canonical URLs always point here, even on preview deployments.
export const SITE_URL = "https://www.fishmeaqua.com";

// Absolute canonical URL for a path, e.g. canonicalUrl("/shop") -> https://www.fishmeaqua.com/shop
export const canonicalUrl = (path = "/"): string => {
  const clean = `/${path.replace(/^\/+/, "")}`.replace(/\/+$/, "");
  return `${SITE_URL}${clean || "/"}`;
};
