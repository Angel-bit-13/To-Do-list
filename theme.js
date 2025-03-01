
// Array of theme objects with color configurations
const themes = [
  {
    name: "Default Pink",
    background: "linear-gradient(150deg, #ee5482, #e97856)",
    todoApp: "#fff",
    headerColor: "#f065a6",
    inputBg: "#fce1e1",
    buttonBg: "#f36b67",
    buttonText: "#fff",
    navBg: "#f5c3d2",
    navText: "#ec107e",
    navHover: "#f77c9096",
    navActive: "#ffffff",
    navActiveText: "rgb(240, 40, 90)"
  },
  {
    name: "Blue Ocean",
    background: "linear-gradient(150deg, #3498db, #2c3e50)",
    todoApp: "#f5f5f5",
    headerColor: "#2980b9",
    inputBg: "#d6eaf8",
    buttonBg: "#2980b9",
    buttonText: "#fff",
    navBg: "#85c1e9",
    navText: "#1a5276",
    navHover: "#5dade2",
    navActive: "#ffffff",
    navActiveText: "#2874a6"
  },
  {
    name: "Forest Green",
    background: "linear-gradient(150deg, #27ae60, #2ecc71)",
    todoApp: "#f5f5f5",
    headerColor: "#196f3d",
    inputBg: "#d4efdf",
    buttonBg: "#196f3d",
    buttonText: "#fff",
    navBg: "#a9dfbf",
    navText: "#145a32",
    navHover: "#7dcea0",
    navActive: "#ffffff",
    navActiveText: "#196f3d"
  },
  {
    name: "Dark Mode",
    background: "#121212",
    todoApp: "#1e1e1e",
    headerColor: "#bb86fc",
    inputBg: "#333333",
    buttonBg: "#bb86fc",
    buttonText: "#121212",
    navBg: "#333333",
    navText: "#bb86fc",
    navHover: "#4e4e4e",
    navActive: "#bb86fc",
    navActiveText: "#121212"
  },
  {
    name: "Sunset",
    background: "linear-gradient(150deg, #ff7e5f, #feb47b)",
    todoApp: "#fff",
    headerColor: "#e74c3c",
    inputBg: "#fadbd8",
    buttonBg: "#e74c3c",
    buttonText: "#fff",
    navBg: "#f5b7b1",
    navText: "#943126",
    navHover: "#f1948a",
    navActive: "#ffffff",
    navActiveText: "#c0392b"
  }
];

// Get current theme from localStorage or use default
let currentTheme = localStorage.getItem('theme') || 0;

// Function to apply theme
function applyTheme(themeIndex) {
  const theme = themes[themeIndex];
  document.documentElement.style.setProperty('--background', theme.background);
  document.documentElement.style.setProperty('--todo-app-bg', theme.todoApp);
  document.documentElement.style.setProperty('--header-color', theme.headerColor);
  document.documentElement.style.setProperty('--input-bg', theme.inputBg);
  document.documentElement.style.setProperty('--button-bg', theme.buttonBg);
  document.documentElement.style.setProperty('--button-text', theme.buttonText);
  document.documentElement.style.setProperty('--nav-bg', theme.navBg);
  document.documentElement.style.setProperty('--nav-text', theme.navText);
  document.documentElement.style.setProperty('--nav-hover', theme.navHover);
  document.documentElement.style.setProperty('--nav-active', theme.navActive);
  document.documentElement.style.setProperty('--nav-active-text', theme.navActiveText);

  // Save theme preference
  localStorage.setItem('theme', themeIndex);
  currentTheme = themeIndex;
}

// Initialize theme on load
function initTheme() {
  applyTheme(currentTheme);
}

// Generate theme options in the theme modal
function generateThemeOptions() {
  const themeContainer = document.getElementById('theme-options');
  themeContainer.innerHTML = '';

  themes.forEach((theme, index) => {
    const themeOption = document.createElement('div');
    themeOption.className = 'theme-option';
    themeOption.innerHTML = `
      <div class="theme-preview" style="background: ${theme.background}">
        <div class="theme-todo-app" style="background: ${theme.todoApp}"></div>
      </div>
      <p>${theme.name}</p>
    `;
    themeOption.onclick = () => {
      applyTheme(index);
      document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
      themeOption.classList.add('active');
    };

    if (index == currentTheme) {
      themeOption.classList.add('active');
    }

    themeContainer.appendChild(themeOption);
  });
}

// Show/hide theme modal
function toggleThemeModal() {
  const themeModal = document.getElementById('theme-modal');
  themeModal.style.display = themeModal.style.display === 'flex' ? 'none' : 'flex';
  generateThemeOptions();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initTheme();

  // Add event listener to theme link
  const themeLink = document.querySelector('a[href="#theme"]');
  if (themeLink) {
    themeLink.addEventListener('click', function(e) {
      e.preventDefault();
      toggleThemeModal();
    });
  }
});
