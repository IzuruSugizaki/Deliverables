//フォームから情報を取得してローカルストレージに保存する。

const form = document.getElementById('form');
const taskDate = document.getElementById('taskDate');
const taskName = document.getElementById('taskName');
const taskDesc = document.getElementById('taskDesc');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask();
  form.reset();
});

function addTask() {

  const taskDateValue = taskDate.value;
  const taskNameValue = taskName.value;
  const taskDescValue = taskDesc.value;

  if(!taskDateValue || !taskNameValue) {
    alert("日付とタスク名は必須です。");
    return;
  }

  const userTask = {
    id: Date.now(),
    date: taskDateValue,
    name: taskNameValue,
    desc: taskDescValue,
    completed: false
  }

  addToLocalStorage(userTask);

  reloadCalendar();

  console.log('タスクが追加されました:', userTask);

}

function reloadCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  generateCalendar(year, month);
}


