export function setWithExpiry(key: string, value: any, ttl: number): void {
  const item = {
    value: value,
    expiry: Date.now() + ttl, // Current time + time-to-live
  };
  localStorage.setItem(key, JSON.stringify(item));
}

// Function to get an item, checking expiry
export function getWithExpiry(key: string): any | null {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  if (Date.now() > item.expiry) {
    localStorage.removeItem(key); // Remove if expired
    return null;
  }
  return item.value; // Return the actual value
}