const STORAGE_KEY = "offline-todos";
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const remainingCount = document.querySelector("#remaining-count");
const clearCompletedButton = document.querySelector("#clear-completed");
const themeToggle = document.querySelector("#theme-toggle");
const filterButtons = document.querySelectorAll(".filter-button");
const THEME_KEY = "offline-todos-theme";
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
let activeFilter = "all";

// 從瀏覽器儲存空間讀取既有資料，資料損壞時回到空清單。
let todos = loadTodos();

function updateThemeButton() {
  const isDark = document.documentElement.dataset.theme === "dark"
    || (!document.documentElement.dataset.theme && systemTheme.matches);
  themeToggle.innerHTML = isDark ? "<span aria-hidden=\"true\">☀️</span> 淺色模式" : "<span aria-hidden=\"true\">🌙</span> 深色模式";
  themeToggle.setAttribute("aria-label", isDark ? "切換至淺色模式" : "切換至深色模式");
}

function applySavedTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    document.documentElement.dataset.theme = savedTheme;
  }
  updateThemeButton();
}

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.dataset.theme === "dark"
    || (!document.documentElement.dataset.theme && systemTheme.matches);
  const nextTheme = isDark ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem(THEME_KEY, nextTheme);
  updateThemeButton();
});

systemTheme.addEventListener("change", () => {
  if (!localStorage.getItem(THEME_KEY)) {
    updateThemeButton();
  }
});

function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos() {
  const visibleTodos = todos.filter((todo) => {
    if (activeFilter === "active") return !todo.completed;
    if (activeFilter === "completed") return todo.completed;
    return true;
  });

  list.replaceChildren();
  emptyState.hidden = visibleTodos.length > 0;
  emptyState.textContent = todos.length === 0
    ? "還沒有任何待辦事項，新增一個吧！"
    : activeFilter === "active"
      ? "太棒了！目前沒有未完成事項。"
      : "目前沒有已完成事項。";

  visibleTodos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = `todo-item${todo.completed ? " completed" : ""}`;

    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `標記「${todo.text}」為完成`);
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;
    label.append(checkbox, text);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除「${todo.text}」`);
    deleteButton.addEventListener("click", () => {
      todos = todos.filter((currentTodo) => currentTodo.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    item.append(label, deleteButton);
    list.append(item);
  });

  const remaining = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - remaining;
  remainingCount.textContent = `未完成：${remaining} 項`;
  clearCompletedButton.disabled = completedCount === 0;
}

clearCompletedButton.addEventListener("click", () => {
  const hasCompletedTodos = todos.some((todo) => todo.completed);
  if (!hasCompletedTodos || !confirm("確定要清除所有已完成的待辦事項嗎？")) return;

  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    renderTodos();
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) {
    input.focus();
    return;
  }

  todos.push({
    id: crypto.randomUUID(),
    text,
    completed: false
  });
  saveTodos();
  renderTodos();
  form.reset();
  input.focus();
});

applySavedTheme();
renderTodos();
