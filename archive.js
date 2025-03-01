
// Archive functionality
let archivedTasks = [];

// Load archived tasks from localStorage
function loadArchivedTasks() {
  const savedArchive = localStorage.getItem("archivedTasks");
  if (savedArchive) {
    archivedTasks = JSON.parse(savedArchive);
  }
}

// Save archived tasks to localStorage
function saveArchivedTasks() {
  localStorage.setItem("archivedTasks", JSON.stringify(archivedTasks));
}

// Archive a task
function archiveTask(taskText) {
  archivedTasks.push({
    text: taskText,
    date: new Date().toLocaleString()
  });
  saveArchivedTasks();
}

// Display archived tasks
function displayArchivedTasks() {
  const listContainer = document.getElementById("list-container");
  listContainer.innerHTML = "";
  
  if (archivedTasks.length === 0) {
    listContainer.innerHTML = "<p class='no-tasks'>No archived tasks</p>";
    return;
  }
  
  archivedTasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.innerHTML = `${task.text} <small>(Archived: ${task.date})</small>`;
    li.classList.add("archived-item");
    
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    span.className = "delete-btn";
    span.setAttribute("data-index", index);
    li.appendChild(span);
    
    listContainer.appendChild(li);
  });
}

// Delete an archived task
function deleteArchivedTask(index) {
  archivedTasks.splice(index, 1);
  saveArchivedTasks();
  displayArchivedTasks();
}

// Initialize archive
loadArchivedTasks();

// Handle navigation between views
function showMainView() {
  document.querySelector(".todo-app h2").textContent = "To-do List";
  document.querySelector(".row").style.display = "flex";
  document.querySelectorAll(".topnav a").forEach(a => a.classList.remove("active"));
  document.querySelector(".topnav a[href='#home']").classList.add("active");
  showTask(); // Function from script.js to display regular tasks
}

function showArchivedView() {
  document.querySelector(".todo-app h2").textContent = "Archived Tasks";
  document.querySelector(".row").style.display = "none"; // Hide the input row
  document.querySelectorAll(".topnav a").forEach(a => a.classList.remove("active"));
  document.querySelector(".topnav a[href='#archive']").classList.add("active");
  displayArchivedTasks();
}
