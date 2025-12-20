//ローカルストレージに追加・取得・削除を行うプログラム。

function addToLocalStorage(userTask) {
  let tasks = localStorage.getItem('tasks');
  const arrayTasks = tasks ? JSON.parse(tasks) : [];
  arrayTasks.push(userTask);
  localStorage.setItem('tasks', JSON.stringify(arrayTasks));
  console.log('タスクがローカルストレージに保存されました:', userTask);
}

function getTasksByDate(date) {
   let userTasks = localStorage.getItem('tasks');
   const arrayTasks = userTasks ? JSON.parse(userTasks) : [];
   return arrayTasks.filter(task => task.date === date);
}

function deleteUserTask(taskId) {
  let deleteTasks = localStorage.getItem('tasks');
  let allTasks = deleteTasks ? JSON.parse(deleteTasks) : [];
  // 指定されたIDのタスクを削除(TODO:ここを理解すること）
  allTasks = allTasks.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(allTasks));

  generateCalendar(year, month);
  
  document.getElementById('taskModal').style.display = 'none';
}