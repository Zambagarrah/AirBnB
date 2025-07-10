// Dark mode toggle for login page
    const toggleThemeBtn = document.getElementById('toggleTheme');
    toggleThemeBtn.addEventListener('click', toggleTheme);
    toggleThemeBtn.addEventListener('keypress', e => {
      if (e.key === 'Enter' || e.key === ' ') toggleTheme();
    });

    function toggleTheme() {
      const html = document.documentElement;
      if (html.getAttribute('data-theme') === 'light') {
        html.setAttribute('data-theme', 'dark');
        toggleThemeBtn.textContent = '☀️ Light Mode';
        toggleThemeBtn.setAttribute('aria-pressed', 'true');
      } else {
        html.setAttribute('data-theme', 'light');
        toggleThemeBtn.textContent = '🌙 Dark Mode';
        toggleThemeBtn.setAttribute('aria-pressed', 'false');
      }
    }

    // Persist theme on load
    window.addEventListener('DOMContentLoaded', () => {
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
      if (savedTheme === 'dark') {
        toggleThemeBtn.textContent = '☀️ Light Mode';
        toggleThemeBtn.setAttribute('aria-pressed', 'true');
      }
    });

    toggleThemeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
    });

    // Simple form submit handler
    document.getElementById('loginForm').addEventListener('submit', e => {
      e.preventDefault();
      alert('Login form submitted (demo).');
    });