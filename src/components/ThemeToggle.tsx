'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        // Check local storage or system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setTheme('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            setTheme('light');
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2rem',
                padding: '0.5rem',
                borderRadius: '50%',
                color: 'var(--text-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            aria-label="Toggle Dark Mode"
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
}
