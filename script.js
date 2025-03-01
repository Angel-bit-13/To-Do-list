const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let currentView = "home"; // Track current view

function addTask() {
  if (inputBox.value === '') {
    alert("You must write something!");
  }
  else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let archiveBtn = document.createElement("span");
    archiveBtn.innerHTML = "🗃️";
    archiveBtn.className = "archive-btn";
    li.appendChild(archiveBtn);

    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "\u00d7";
    deleteBtn.className = "delete-btn";
    li.appendChild(deleteBtn);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener("click", function(e) {
  if (currentView === "home") {
    // Main view event handling
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
      // Apply completed task visibility setting
      if (!settings.showCompletedTasks && e.target.classList.contains("checked")) {
        e.target.style.display = "none";
      }
    }
    else if (e.target.className === "archive-btn") {
      const taskText = e.target.parentElement.innerText.replace(/[×🗃️]/g, "").trim();
      archiveTask(taskText);
      e.target.parentElement.remove();
      saveData();
    }
    else if (e.target.className === "delete-btn") {
      e.target.parentElement.remove();
      saveData();
    }
  } else if (currentView === "archive") {
    // Archive view event handling
    if (e.target.tagName === "SPAN") {
      const index = e.target.getAttribute("data-index");
      if (index !== null) {
        deleteArchivedTask(index);
      }
    }
  }
}, false);

function saveData() {
  // Apply sorting before saving if enabled
  if (settings && settings.sortAlphabetically) {
    sortTasksAlphabetically();
  }
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  const savedData = localStorage.getItem("data");
  listContainer.innerHTML = savedData || "";
  
  // Apply sorting after loading if enabled
  if (settings && settings.sortAlphabetically) {
    sortTasksAlphabetically();
  }
  
  // Apply completed task visibility setting
  if (settings && !settings.showCompletedTasks) {
    const completedTasks = listContainer.querySelectorAll('li.checked');
    completedTasks.forEach(task => {
      task.style.display = 'none';
    });
  }
}

// Initial load
showTask();

// Handle navigation
document.addEventListener('DOMContentLoaded', function() {
  // Set up navigation event listeners
  const homeLink = document.querySelector('a[href="#home"]');
  const archiveLink = document.querySelector('a[href="#archive"]');
  const settingsLink = document.querySelector('a[href="#settings"]');

  homeLink.addEventListener('click', function(e) {
    e.preventDefault();
    currentView = "home";
    showMainView();
  });

  archiveLink.addEventListener('click', function(e) {
    e.preventDefault();
    currentView = "archive";
    showArchivedView();
  });
  
  settingsLink.addEventListener('click', function(e) {
    e.preventDefault();
    currentView = "settings";
    showSettingsView();
  });
});
