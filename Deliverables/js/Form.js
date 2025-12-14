//タスクの追加・削除を行う

//task.htmlのID要素を取得
const form = document.getElementById('form');
const taskDate = document.getElementById('taskDate');
const taskName = document.getElementById('taskName');
const taskDesc = document.getElementById('taskDesc');

//登録ボタンを押すとlocalstrageに追加
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask();
  form.reset();
});

//カレンダーを再描画する
function reloadCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  //Calendar.jsのカレンダーを描画する関数を呼び出す。
  generateCalendar(year, month);
}

//タスクを追加する
function addTask() {
  //取得したID要素の値を取り出す。
  const date = taskDate.value;
  const name = taskName.value;
  const desc = taskDesc.value;
  
  
  if(!date || !name) {
    alert("日付とタスク名は必須です。");
    return;
  }

  //localstrageに追加するオブジェクト
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

//localstrageにタスクを追加する
function saveToLocalStorage(task) {
  let tasks = localStorage.getItem('tasks');
  tasks = tasks ? JSON.parse(tasks) : [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  console.log('タスクがローカルストレージに保存されました:', task);
}

     


