// js/theme.js
// Execute immediately to prevent Flash of Unstyled Content (FOUC)
(function() {
    const savedTheme = localStorage.getItem('nacos_theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-mode');
    } else if (savedTheme === 'dark') {
        document.documentElement.classList.remove('light-mode');
    }
})();

// Expose a global function to toggle the theme
window.toggleGlobalTheme = function() {
    const isLight = document.documentElement.classList.contains('light-mode');
    if (isLight) {
        document.documentElement.classList.remove('light-mode');
        localStorage.setItem('nacos_theme', 'dark');
    } else {
        document.documentElement.classList.add('light-mode');
        localStorage.setItem('nacos_theme', 'light');
    }
    // Dispatch event so other scripts can update UI (e.g., icons)
    window.dispatchEvent(new Event('themeChanged'));
};
