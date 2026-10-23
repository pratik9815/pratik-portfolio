import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#121217' : '#f7f7fa');
  }, [theme]);
  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    try {
      localStorage.setItem('portfolio-theme', next);
    } catch {
      /* Theme remains available when storage is blocked. */
    }
  }
  useEffect(() => {
    const preference = matchMedia('(prefers-color-scheme: dark)');
    function syncPreference(event: MediaQueryListEvent) {
      try {
        if (localStorage.getItem('portfolio-theme')) return;
      } catch {
        /* Use system preference. */
      }
      setTheme(event.matches ? 'dark' : 'light');
    }
    preference.addEventListener('change', syncPreference);
    return () => preference.removeEventListener('change', syncPreference);
  }, []);
  return { theme, toggleTheme };
}
