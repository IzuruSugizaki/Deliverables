const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;

// カレンダーを生成する関数
function generateCalendar(year, month) {
  const startDay = new Date(year, month - 1, 1).getDay();
  const endDate = new Date(year, month, 0).getDate();
  const today = new Date();
  const lastMonthEndDayCont = new Date(year, month - 1, 0).getDate();
  let dayCount = 1;
  let calendarHtml = `<table><tr><th colspan="7">${year}年 ${month}月</th></tr><tr>`;

  for (let i = 0; i < weeks.length; i++) {
    calendarHtml += `<th>${weeks[i]}</th>`;
  } 
  calendarHtml += '</tr><tr>';
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < startDay) {
        let num = lastMonthEndDayCont - startDay + j + 1;
          calendarHtml += `<td class="is-disabled">${num}</td>`;
      } else if (dayCount > endDate) {
        let num = dayCount - endDate;
        calendarHtml += `<td class="is-disabled">${num}</td>`;
        dayCount++;
      } else {
        if(month === today.getMonth() + 1 && year === today.getFullYear() && dayCount === today.getDate()) {
          calendarHtml += `<td class="is-today">${dayCount}</td>`;
        } else {
          calendarHtml += `<td>${dayCount}</td>`;
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

