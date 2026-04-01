let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

export function addTask(text) {
  tasks.push({ id: Date.now(), text });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function getTasks() {
  return tasks;
}