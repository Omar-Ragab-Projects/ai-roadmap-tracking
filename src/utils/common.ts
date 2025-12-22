export function setWithExpiry(key: string, value: any, ttl: number): void {
  const item = {
    value: value,
    expiry: Date.now() + ttl, // Current time + time-to-live
  };
  localStorage.setItem(key, JSON.stringify(item));
}

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

export function download(filename: string, text: string): void {
  const blob = new Blob([text], { type: "text/plain" });

  const element = document.createElement("a");
  element.style.display = "none";
  document.body.appendChild(element);

  element.href = window.URL.createObjectURL(blob);
  element.setAttribute("download", filename);
  element.click();

  document.body.removeChild(element);
  window.URL.revokeObjectURL(element.href);
}

export const isMobile =
  typeof window !== "undefined" && window.innerWidth < 768;
