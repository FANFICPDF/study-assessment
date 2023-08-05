//   const title = document.createElement('h1');
//   title.innerText = 'TO-DO List';
//   document.querySelector('body').appendChild(title);
const taskList = document.querySelector('#tasks');
class Task {
  constructor(taskData) {
    this.taskTitle = taskData['title'];
    this.taskDescription = taskData['description'];
    this.taskCompleted = taskData['completed'];
    this.taskId = taskData['_id'];

    this.node = document.createElement('li');
    this.node.setAttribute('id', 'taskId');

    const taskLine = document.createElement('div');
    taskLine.innerText = `${this.taskTitle}: ${this.taskDescription}, completed: ${this.taskCompleted}`;

    this.node.appendChild(taskLine);
    taskList.appendChild(this.node);
  }
}
const getTasks = async () => {
  try {
    const data = await fetch('/api/tasks');
    const tasksArr = await data.json();
    taskList.innerHTML = null;
    console.log('fetched data! ', tasksArr);
    tasksArr.forEach((el) => {
      new Task(el);
    });
  } catch (err) {
    console.log(`fetch error: ${err.message}`);
  }
};

document.addEventListener('DOMContentLoaded', getTasks);
const submitTask = document.getElementById('taskForm');

submitTask.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskTitle = document.getElementById('taskTitle').value;
  const taskDiscribe = document.getElementById('taskDiscribe').value;

  const postTask = async () => {
    try {
      const data = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: taskTitle,
          description: taskDiscribe,
          completed: false,
        }),
      });
      console.log('post data! ', data);
      getTasks();
    } catch (err) {
      console.log(`post error: ${err.message}`);
    }
  };
  postTask();
});
