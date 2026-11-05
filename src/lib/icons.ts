// Line icons used on timeline nodes and skill cards (24×24, stroke-only).
export const icons: Record<string, string> = {
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3Z"/>',
  rover: '<circle cx="6" cy="17" r="2.5"/><circle cx="12" cy="17" r="2.5"/><circle cx="18" cy="17" r="2.5"/><path d="M4 12h16l-2-5H6z"/>',
  cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
  flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  network: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',
  sliders: '<path d="M4 21V14M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
  linkage: '<circle cx="5" cy="19" r="2"/><circle cx="12" cy="9" r="2"/><circle cx="19" cy="15" r="2"/><path d="M6.5 17.5l4-7M13.5 10.5l4 3.5"/>',
  code: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
  cube: '<path d="M12 2l9 5v10l-9 5-9-5V7z"/><path d="M12 22V12M21 7l-9 5-9-5"/>',
  sigma: '<path d="M18 4H6l6 8-6 8h12"/>',
};
export const icon = (name: string) => `<svg viewBox="0 0 24 24">${icons[name] ?? icons.code}</svg>`;
