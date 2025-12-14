const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;

// カレンダーを生成する関数
function generateCalendar(year, month) {

  //new Dateのことについて調べておく。getDayも同様に
  const startDay = new Date(year, month - 1, 1).getDay();
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
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < startDay) {
        //ここのロジックを要理解
        let num = lastMonthEndDayCont - startDay + j + 1;
          calendarHtml += `<td class="is-disabled">${num}</td>`;
      } else if (dayCount > endDate) {
        let num = dayCount - endDate;
        calendarHtml += `<td class="is-disabled">${num}</td>`;
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
  let tasks = localStorage.getItem('tasks');
  tasks = tasks ? JSON.parse(tasks) : [];
  return tasks.filter(task => task.date === date);
}


// モーダル表示の関数（必要に応じて実装）
function showTaskDetail(date) {
  const tasks = getTasksByDate(date);
  const modal = document.getElementById('taskModal');
  modal.style.display = 'block';
  let contentHtml = `</div class="task-item"><h2>${date}のタスク</h2><ul>`;
  tasks.forEach(task => {
    contentHtml += `<li><strong><div class="task-name">${task.name}</div></strong><div class="task-desc">メモ：${task.desc || '説明なし'}</div></li>
    <button onclick="deleteTask(${task.id})">削除</button>`;
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

function deleteTask(taskId) {
  let tasks = localStorage.getItem('tasks');
  tasks = tasks ? JSON.parse(tasks) : [];
  tasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  // カレンダーを再描画
  generateCalendar(year, month);
  // モーダルを閉じる
  document.getElementById('taskModal').style.display = 'none';
}