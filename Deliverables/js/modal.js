//モーダルの生成と閉じる処理

function showTaskDetail(date) {
   const tasks = getTasksByDate(date);
   const modal = document.getElementById('taskModal');
   modal.style.display = 'block';
   modalCalendar(tasks, date);
   closeModal(modal);
}

function modalCalendar(tasks, date) {
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
}

function closeModal(modal) {
  window.addEventListener('click', (e) => {
     if (e.target == modal || e.target.id === 'close') {
       modal.style.display = 'none';
       }
     });
}