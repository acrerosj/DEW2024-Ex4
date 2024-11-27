const panels = {
  'to-do': document.getElementById('to-do'),
  'in-progress': document.getElementById('in-progress'),
  'done': document.getElementById('done'),
  'paperbin': document.getElementById('paperbin')
}

const container = document.querySelector('.container');

container.addEventListener('dragstart', (event) => {
    event.target.nodeType
    if (event.target.nodeType==1 && event.target.classList.contains('task')) {
      event.dataTransfer.setData('text/plain', event.target.id);
      console.log(event.target.id);
    }
 });

let nextId = Math.max(tasks.map(task => task.id));

function addTask(task) {
  // console.log(task);
  const divTask = document.createElement('div');
  // divTask.className = 'task ' + task.priority;
  divTask.classList.add('task', task.priority);
  divTask.textContent = task.task;
  divTask.id = 'task_' + task.id;
  divTask.draggable = true;
  // divTask.addEventListener('dragstart', (event) => {
  //   event.dataTransfer.setData('text/plain', divTask.id);
  //   console.log(divTask.id);
  // });
  // const panel = document.getElementById(task.state);
  // panel.append(divTask);
  panels[task.state].append(divTask);
}

tasks.forEach(task => addTask(task));

const form = document.forms[0];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(form.elements.task.value);
  console.log(form.elements.priority.value);
  addTask({
    id: ++nextId,
    task: form.elements.task.value,
    priority: form.elements.priority.value,
    state: "to-do"
  })
});

form.elements.priority.addEventListener('change', (e) => {
  form.elements.priority.className = form.elements.priority.value;
});

Object.values(panels).forEach(panel => {
  panel.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  panel.addEventListener('drop', (event) => {
    const idTask = event.dataTransfer.getData('text/plain');
    const divTask = document.getElementById(idTask);
    if (divTask) {
      event.currentTarget.append(divTask);
      if (event.currentTarget.id == 'paperbin') {
        let id = setTimeout(()=> divTask.remove(), 10_000);
        divTask.dataset.timeout=id;
      } else {
        clearTimeout(divTask.dataset.timeout);
      }
    }
  });
});

document.querySelector('#paperbin button').addEventListener('click', (event) => {
  // const header = panels.paperbin.firstElementChild;
  // panels.paperbin.innerHTML="";
  // panels.paperbin.append(header);

  // for (let i = panels.paperbin.children.length -1; i > 0;  i--) {
  //   panels.paperbin.children[i].remove();
  // }

  //const taskDivs = panels.paperbin.querySelectorAll('.task');
  //const taskDivs = [...panels.paperbin.children].filter((t,i) => i!=0);
  const taskDivs = [...panels.paperbin.children];
  taskDivs.shift();
  taskDivs.forEach(t => t.remove());
})