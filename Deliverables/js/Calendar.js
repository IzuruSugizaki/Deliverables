//task.htmlのカレンダーを生成・操作する
//カレンダーの日付セルをクリックすると、その日のタスク詳細をモーダルで表示する。

const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const nowDate = new Date();
let year = nowDate.getFullYear();
let month = nowDate.getMonth() + 1;

function generateCalendar(year, month) {
  const startDayOfWeek = new Date(year, month - 1, 1).getDay();
  const endDate = new Date(year, month, 0).getDate();
  const today = new Date();
  const lastMonthEndDayCont = new Date(year, month - 1, 0).getDate();
  let dayCount = 1;

  let calendarHtml = `<table><tr><th colspan="7">${year}年 ${month}月</th></tr><tr>`;

  const WeeksInCalendar = 6;
  const DaysInWeek = 7;

  for (let i = 0; i < weeks.length; i++) {
    calendarHtml += `<th>${weeks[i]}</th>`;
  } 

  calendarHtml += '</tr><tr>';

  for (let iDays = 0; iDays < WeeksInCalendar; iDays++) {
    for (let jWeek = 0; jWeek < DaysInWeek; jWeek++) {
      if (iDays === 0 && jWeek < startDayOfWeek) {
        //前月の余白の生成
        let lastMonthDays = lastMonthEndDayCont - startDayOfWeek + jWeek + 1;
          calendarHtml += `<td class="is-disabled">${lastMonthDays}</td>`;
      } else if (dayCount > endDate) {
        //次月の余白の生成
        let nextMonthDays = dayCount - endDate;
        calendarHtml += `<td class="is-disabled">${nextMonthDays}</td>`;
        dayCount++;
      } else {
        //日付文字列の作成(YYYY-MM-DD)
        const dateStr = `${year}-${String(month).padStart(2,'0')}-${String(dayCount).padStart(2,'0')}`;

        const dayTasks = getTasksByDate(dateStr);

        const isToday = (year === today.getFullYear() && month === (today.getMonth() + 1) && dayCount === today.getDate());

        //class名の設定
        let classNames = isToday ? 'is-today' : '';

        if (dayTasks.length > 0) {
          calendarHtml += `<td onclick="showTaskDetail('${dateStr}')" class="${classNames}" data-date="${dateStr}">
                            <div class="date-number">${dayCount}</div>
                            <div class="tasks-count">${dayTasks.length}件のタスク</div>
                           </td>`;
        } else {
          calendarHtml += `<td class="${classNames}">${dayCount}</td>`;
        }
        dayCount++;
      }
    }
    calendarHtml += '</tr><tr>';
  }
  calendarHtml += '</tr></table>';
  let calendarContainer = document.getElementById('calendar');
  calendarContainer.innerHTML = calendarHtml;
}

// 初期表示
generateCalendar(year, month);

//前月のイベントリスナー
document.getElementById('prevMonth').addEventListener('click', () => {
  month--;
  if (month < 1) {
    month = 12;
    year--;
  }
  generateCalendar(year, month);
});

//次月のイベントリスナー
document.getElementById('nextMonth').addEventListener('click', () => {
  month++;
  if (month > 12) {
    month = 1;
    year++;
  }
  generateCalendar(year, month);
});

function getTasksByDate(date) {
  let userTasks = localStorage.getItem('tasks');
  const arrayTasks = userTasks ? JSON.parse(userTasks) : [];
  return arrayTasks.filter(task => task.date === date);
}

function showTaskDetail(date) {
  const tasks = getTasksByDate(date);
  const modal = document.getElementById('taskModal');
  modal.style.display = 'block';
  let contentHtml = `</div class="task-item"><h2>${date}のタスク</h2><ul>`;
  tasks.forEach(task => {
    contentHtml += `<li>
                     <strong>
                      <div class="task-name">${task.name}</div>
                     </strong>
                     <div class="task-desc">メモ：${task.desc || '説明なし'}</div>
                    </li>
                    <button onclick="deleteUserTask(${task.id})">削除</button>`;
  });
  contentHtml += '</ul><button id="close">閉じる</button></div>';

  const modalTaskList = document.getElementById('modalContent');
  modalTaskList.innerHTML = contentHtml;
  window.addEventListener('click', (e) => {
    if (e.target == modal || e.target.id === 'close') {
      modal.style.display = 'none';
    }
});
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