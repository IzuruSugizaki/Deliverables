const form = document.getElementById('form');
const taskDate = document.getElementById('taskDate');
const taskName = document.getElementById('taskName');
const taskDesc = document.getElementById('taskDesc');
let i = 0;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask();
  form.reset();
});

function addTask() {
  const date = taskDate.value;
  const name = taskName.value;
  const desc = taskDesc.value;
  
  
  if(!date || !name) {
    alert("日付とタスク名は必須です。");
    return;
  }

  const task = {
    id: i,
    date: date,
    name: name,
    desc: desc,
    completed: false
  }
  i++;

  // タスクを保存するロジックをここに追加
  saveToLocalStorage(task);

  // カレンダーに再描画する
  //reloadCalendar();

  console.log('タスクが追加されました:', task);

}

function saveToLocalStorage(task) {
  let tasks = JSON.stringify(task);
  localStorage.setItem(task.id, tasks);
  console.log('タスクがローカルストレージに保存されました:', task);
}
