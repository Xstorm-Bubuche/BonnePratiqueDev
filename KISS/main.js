const tasks = [
  { id: 1, title: 'Mettre à jour le README', completed: false },
  { id: 2, title: 'Corriger le bug du formulaire', completed: true },
  { id: 3, title: 'Revoir les PRs en attente', completed: false },
  { id: 4, title: 'Nettoyer le CSS', completed: true }
];

const tasksListEl = document.querySelector('#tasks-list');
const emptyStateEl = document.querySelector('#empty-state');

let currentFilter = 'all';


const filters = {
  all: task => true,
  active: task => !task.completed,
  completed: task => task.completed
};

function updateTasksList(filterName = currentFilter) {
  currentFilter = filterName;
  const filteredTasks = tasks.filter(filters[filterName] || filters.all);
  renderTasks(filteredTasks, filterName);
}

function renderTasks(filteredTasks, filterName) {
  tasksListEl.innerHTML = '';

  if (filteredTasks.length === 0) {
    const messages = {
      all: 'Aucune tâche à afficher.',
      active: 'Aucune tâche en cours.',
      completed: 'Aucune tâche terminée.'
    };
    emptyStateEl.textContent = messages[filterName] || messages.all;
    emptyStateEl.style.display = 'block';
    return;
  }

  emptyStateEl.style.display = 'none';

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (task.completed) li.classList.add('task-completed');

    const span = document.createElement('span');
    span.textContent = task.title;

    li.appendChild(span);
    tasksListEl.appendChild(li);
  });
}


document.querySelectorAll('.controls button').forEach(btn => {
  btn.addEventListener('click', () => updateTasksList(btn.id.split('-')[1]));
});


updateTasksList();
