const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const now_date = new Date();
let year = now_date.getFullYear();
let month = now_date.getMonth() + 1;

// カレンダーを生成する関数
function generateCalendar(year, month) {
  const startDayOfWeek = new Date(year, month - 1, 1).getDay();
  const endDate = new Date(year, month, 0).getDate();
  const today = new Date();
  const lastMonthEndDayCont = new Date(year, month - 1, 0).getDate();
  let dayCount = 1;
  //カレンダーをtable要素で生成しcalendarHtmlに追加していく。
  let calendarHtml = `<table><tr><th colspan="7">${year}年 ${month}月</th></tr><tr>`;

  for (let i = 0; i < weeks.length; i++) {
    calendarHtml += `<th>${weeks[i]}</th>`;
  } 
  calendarHtml += '</tr><tr>';
  for (let i_days = 0; i_days < 6; i_days++) {
    for (let j_week = 0; j_week < 7; j_week++) {
      if (i_days === 0 && j_week < startDayOfWeek) {
        //ここのロジックを要理解
        let lastMonthDays = lastMonthEndDayCont - startDayOfWeek + j_week + 1;
          calendarHtml += `<td class="is-disabled">${lastMonthDays}</td>`;
      } else if (dayCount > endDate) {
        let nextMonthDays = dayCount - endDate;
        calendarHtml += `<td class="is-disabled">${nextMonthDays}</td>`;
        dayCount++;
        //ここまでがカレンダーの余白の生成
      } else {
        //日付文字列の作成(padStartを検索する2025/12/13)
        const dateStr = `${year}-${String(month).padStart(2,'0')}-${String(dayCount).padStart(2,'0')}`;

        //その日のタスクを取得
        const dayTasks = getTasksByDate(dateStr);

        //今日かどうか判定
        const isToday = (year === today.getFullYear() && month === (today.getMonth() + 1) && dayCount === today.getDate());

        //class名の設定
        let classNames = isToday ? 'is-today' : '';

        //タスクがある場合はクラスを追加
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

//ローカルストレージから要素を取り出す。
function getTasksByDate(date) {
  let userTasks = localStorage.getItem('tasks');
  arrayTasks = userTasks ? JSON.parse(userTasks) : [];
  return arrayTasks.filter(task => task.date === date);
}


// モーダル表示の関数（必要に応じて実装）
function showTaskDetail(date) {
  const tasks = getTasksByDate(date);
  const modal = document.getElementById('taskModal');
  modal.style.display = 'block';
  let contentHtml = `</div class="task-item"><h2>${date}のタスク</h2><ul>`;
  tasks.forEach(task => {
    contentHtml += `<li><strong><div class="task-name">${task.name}</div></strong><div class="task-desc">メモ：${task.desc || '説明なし'}</div></li>
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
  let delete_tasks = localStorage.getItem('tasks');
  task = delete_tasks ? JSON.parse(delete_tasks) : [];
  // 指定されたIDのタスクを削除(ここは理解すること)
  task = task.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(task));
  // カレンダーを再描画
  generateCalendar(year, month);
  // モーダルを閉じる
  document.getElementById('taskModal').style.display = 'none';
}