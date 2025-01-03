document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('toggleModeBtn').addEventListener('click', toggleDarkMode);

let isDarkMode = false;

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value === '') {
        alert('Please enter a task!');
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
        <div class="task-content">
            <input type="checkbox" class="complete">
            <span>${taskInput.value} (Due: ${dueDateInput.value})</span>
        </div>
        <div class="actions">
            <span class="edit" onclick="editTask(this)">✏️</span>
            <span class="delete" onclick="deleteTask(this)">🗑️</span>
        </div>
    `;
    taskList.appendChild(li);
    taskInput.value = '';
    dueDateInput.value = '';
}

function deleteTask(element) {
    const li = element.parentElement.parentElement;
    li.remove();
    checkAllTasksCompleted();
}

function editTask(element) {
    const li = element.parentElement.parentElement;
    const taskText = li.querySelector('.task-content span').textContent.split(' (Due: ')[0];
    const dueDate = li.querySelector('.task-content span').textContent.split(' (Due: ')[1].replace(')', '');
    document.getElementById('taskInput').value = taskText;
    document.getElementById('dueDateInput').value = dueDate;
    li.remove();
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
}

function checkAllTasksCompleted() {
    const tasks = document.querySelectorAll('#taskList li');
    let allCompleted = true;
    tasks.forEach(task => {
        if (!task.querySelector('.complete').checked) {
            allCompleted = false;
        }
    });

    if (allCompleted) {
        triggerConfetti();
    }
}

function triggerConfetti() {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}

document.getElementById('taskList').addEventListener('change', (event) => {
    if (event.target.classList.contains('complete')) {
        checkAllTasksCompleted();
    }
});
