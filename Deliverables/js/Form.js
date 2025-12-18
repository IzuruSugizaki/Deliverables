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
  const taskdate = taskDate.value;
  const taskname = taskName.value;
  const taskdesc = taskDesc.value;


  if(!taskdate || !taskname) {
    alert("日付とタスク名は必須です。");
    return;
  }

  //localstrageに追加するオブジェクト
  const userTask = {
    id: Date.now(),
    date: taskdate,
    name: taskname,
    desc: taskdesc,
    completed: false
  }

  // タスクを保存するロジックをここに追加
  saveToLocalStorage(userTask);

  // カレンダーに再描画する
  reloadCalendar();

  console.log('タスクが追加されました:', userTask);

}

//localstrageにタスクを追加する
function saveToLocalStorage(userTask) {
  let tasks = localStorage.getItem('tasks');
  arrayTasks = tasks ? JSON.parse(tasks) : [];
  arrayTasks.push(userTask);
  localStorage.setItem('tasks', JSON.stringify(arrayTasks));
  console.log('タスクがローカルストレージに保存されました:', userTask);
}

     


