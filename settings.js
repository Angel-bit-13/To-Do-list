
// Settings functionality
let settings = {
  showCompletedTasks: true,
  sortAlphabetically: false,
  enableNotifications: false,
  taskFontSize: 'medium'
};

// Load settings from localStorage
function loadSettings() {
  const savedSettings = localStorage.getItem("todoSettings");
  if (savedSettings) {
    settings = JSON.parse(savedSettings);
    applySettings();
  }
}

// Save settings to localStorage
function saveSettings() {
  localStorage.setItem("todoSettings", JSON.stringify(settings));
  applySettings();
}

// Apply settings to the UI
function applySettings() {
  // Apply font size
  document.documentElement.style.setProperty('--task-font-size', getFontSizeValue(settings.taskFontSize));
  
  // Apply sorting if needed
  if (currentView === "home") {
    if (settings.sortAlphabetically) {
      sortTasksAlphabetically();
    } else {
      // If sorting is disabled, reload tasks in original order
      const savedData = localStorage.getItem("data");
      if (savedData) {
        listContainer.innerHTML = savedData;
      }
    }
  }
  
  // Hide/show completed tasks if on home view
  if (currentView === "home") {
    const completedTasks = document.querySelectorAll('li.checked');
    completedTasks.forEach(task => {
      task.style.display = settings.showCompletedTasks ? 'block' : 'none';
    });
  }
}

// Get actual font size value
function getFontSizeValue(size) {
  switch(size) {
    case 'small': return '14px';
    case 'medium': return '17px';
    case 'large': return '20px';
    default: return '17px';
  }
}

// Sort tasks alphabetically
function sortTasksAlphabetically() {
  const taskList = document.getElementById("list-container");
  const tasks = Array.from(taskList.getElementsByTagName("li"));
  
  if (tasks.length <= 1) return;
  
  // Filter out archived tasks or special elements like settings
  const regularTasks = tasks.filter(task => !task.classList.contains('archived-item') && !task.classList.contains('no-tasks'));
  
  // Sort the tasks
  regularTasks.sort((a, b) => {
    const textA = a.childNodes[0].textContent.trim().toLowerCase();
    const textB = b.childNodes[0].textContent.trim().toLowerCase();
    return textA.localeCompare(textB);
  });
  
  // Re-append in sorted order
  regularTasks.forEach(task => taskList.appendChild(task));
}

// Display settings UI
function displaySettings() {
  const listContainer = document.getElementById("list-container");
  const row = document.querySelector(".row");
  
  // Hide input row
  row.style.display = "none";
  
  // Clear current content
  listContainer.innerHTML = "";
  
  // Create settings form
  const settingsForm = document.createElement("div");
  settingsForm.className = "settings-form";
  
  settingsForm.innerHTML = `
    <div class="setting-item">
      <label for="showCompleted">Show completed tasks</label>
      <label class="switch">
        <input type="checkbox" id="showCompleted" ${settings.showCompletedTasks ? 'checked' : ''}>
        <span class="slider round"></span>
      </label>
    </div>
    
    <div class="setting-item">
      <label for="sortAlpha">Sort tasks alphabetically</label>
      <label class="switch">
        <input type="checkbox" id="sortAlpha" ${settings.sortAlphabetically ? 'checked' : ''}>
        <span class="slider round"></span>
      </label>
    </div>
    
    <div class="setting-item">
      <label for="enableNotifications">Enable notifications</label>
      <label class="switch">
        <input type="checkbox" id="enableNotifications" ${settings.enableNotifications ? 'checked' : ''}>
        <span class="slider round"></span>
      </label>
    </div>
    
    <div class="setting-item">
      <label for="taskFontSize">Task font size</label>
      <select id="taskFontSize">
        <option value="small" ${settings.taskFontSize === 'small' ? 'selected' : ''}>Small</option>
        <option value="medium" ${settings.taskFontSize === 'medium' ? 'selected' : ''}>Medium</option>
        <option value="large" ${settings.taskFontSize === 'large' ? 'selected' : ''}>Large</option>
      </select>
    </div>
    
    <button id="saveSettings" class="settings-save-btn">Save Settings</button>
  `;
  
  listContainer.appendChild(settingsForm);
  
  // Add event listener to save button
  document.getElementById("saveSettings").addEventListener("click", function() {
    settings.showCompletedTasks = document.getElementById("showCompleted").checked;
    settings.sortAlphabetically = document.getElementById("sortAlpha").checked;
    settings.enableNotifications = document.getElementById("enableNotifications").checked;
    settings.taskFontSize = document.getElementById("taskFontSize").value;
    
    saveSettings();
    alert("Settings saved!");
  });
}

// Show settings view
function showSettingsView() {
  document.querySelector(".todo-app h2").textContent = "Settings";
  document.querySelectorAll(".topnav a").forEach(a => a.classList.remove("active"));
  document.querySelector(".topnav a[href='#settings']").classList.add("active");
  displaySettings();
}

// Initialize settings
loadSettings();
