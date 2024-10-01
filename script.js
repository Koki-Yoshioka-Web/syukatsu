document.addEventListener("DOMContentLoaded", () => {
  const addTaskButton = document.getElementById("addTask");
  const taskInput = document.getElementById("taskInput");
  const dateInput = document.getElementById("dateInput");
  const timeInput = document.getElementById("timeInput");
  const taskList = document.getElementById("taskList");

  // ローカルストレージからタスクを読み込む関数
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = `${task.task} - ${task.date} ${task.time}`;
      taskList.appendChild(li);
    });
  }

  // タスクを追加してローカルストレージに保存する関数
  function addTask(task, date, time) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ task, date, time });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // ページ読み込み時にタスクをロード
  loadTasks();

  // タスク追加ボタンのクリックイベント
  addTaskButton.addEventListener("click", () => {
    const task = taskInput.value;
    const date = dateInput.value;
    const time = timeInput.value;

    if (task && date && time) {
      const li = document.createElement("li");
      li.textContent = `${task} - ${date} ${time}`;
      taskList.appendChild(li);

      // ローカルストレージに保存
      addTask(task, date, time);

      // 入力欄をクリア
      taskInput.value = "";
      dateInput.value = "";
      timeInput.value = "";
    }
  });
});
