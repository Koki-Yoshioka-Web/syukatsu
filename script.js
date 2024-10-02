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

// 日付をYYYY-MM-DD形式に変換する関数
function formatDate(dateString) {
  var date = new Date(dateString);

  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2); // 月は0から始まるため1を足す、2桁になるように0を追加
  var day = ("0" + date.getDate()).slice(-2); // 日にちも2桁になるように0を追加

  return year + "-" + month + "-" + day;
}

// スケジュールをlocalStorageから取得
var schedules = JSON.parse(localStorage.getItem("schedules")) || [];
console.log(schedules); // schedulesの内容をログ出力

// FullCalendarに渡すためのイベント配列を作成
var events = schedules.map(function (schedule) {
  var formattedDate = formatDate(schedule.date);
  console.log(formattedDate); // 変換後の日付をログ出力
  return {
    title: schedule.task,
    start: formattedDate,
  };
});

// FullCalendarを初期化
var calendarEl = document.getElementById("calendar");
console.log(calendarEl); // calendarElをログ出力
if (calendarEl) {
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    events: events,
  });

  // カレンダーを表示
  calendar.render();
  console.log(calendar.getEvents()); // カレンダーに追加されたイベントをログ出力
} else {
  console.log("calendarEl is not found in the DOM.");
}
