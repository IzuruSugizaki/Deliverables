const form = document.getElementById('form');
const taskDate = document.getElementById('taskDate');
const taskName = document.getElementById('taskName');
const taskDesc = document.getElementById('taskDesc');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask();
  form.reset();
});

function reloadCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  generateCalendar(year, month);
}

function addTask() {
  const date = taskDate.value;
  const name = taskName.value;
  const desc = taskDesc.value;
  
  
  if(!date || !name) {
    alert("日付とタスク名は必須です。");
    return;
  }

  const task = {
    id: Date.now(),
    date: date,
    name: name,
    desc: desc,
    completed: false
  }

  // タスクを保存するロジックをここに追加
  saveToLocalStorage(task);

  // カレンダーに再描画する
  reloadCalendar();

  console.log('タスクが追加されました:', task);

}

function saveToLocalStorage(task) {
  let tasks = localStorage.getItem('tasks');
  tasks = tasks ? JSON.parse(tasks) : [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  console.log('タスクがローカルストレージに保存されました:', task);
}

     


