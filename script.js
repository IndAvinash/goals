  // On app load, get all tasks from localStorage
  window.onload = function() {

      if (localStorage.getItem("unm") == null) {
          document.getElementById("container").style.height = "0vh";
          document.getElementById("container").style.visibility = "collapse";



      } else {
          let nam = localStorage.getItem("unm")
          document.getElementById("name").innerHTML = "Hi " + nam + " ";
          document.getElementById("un").remove()
          document.getElementById("container").style.visibility = "visible"
          loadTasks();
          sendData();
      }
      // loadTasks()
  };
  //   if (localStorage.getItem("") == null) return;
  // On form submit add task
  document.querySelector("form").addEventListener("submit", e => {
      e.preventDefault();
      addTask();
  });

  function loadTasks() {
      // check if localStorage has any tasks
      // if not then return

      if (localStorage.getItem("tasks") == null) return;

      // Get the tasks from localStorage and convert it to an array
      let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

      // Loop through the tasks and add them to the list
      tasks.forEach(task => {
          const list = document.querySelector("ul");
          const li = document.createElement("li");
          li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
    <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
    <i class="del" onclick="removeTask(this)"><img src="trash.svg"/></i>
    <i class="mark" onclick="changeTypeOfTask(this)"></i>`;
          if (task.completed) {
              li.style.background = getColor("c")
          }

          list.insertBefore(li, list.children[0]);
      });
  }

  function addTask() {
      const task = document.querySelector("form input");
      const list = document.querySelector("ul");
      // return if task is empty
      if (task.value === "") {
          alert("Empty Value not Permitted");
          return false;
      }
      // check is task already exist
      if (document.querySelector(`input[value="${task.value}"]`)) {
          alert("Task already exist!");
          return false;
      }

      // add task to local storage
      localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), {
          task: task.value,
          completed: false,
          status: "r"
      }]));

      // create list item, add innerHTML and append to ul
      const li = document.createElement("li");
      li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
<input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
<i class="del" onclick="removeTask(this)"><img src="trash.svg"/></i>
<i class="del" onclick="changeTypeOfTask(this)"></i>`;
      list.insertBefore(li, list.children[0]);
      // clear input
      task.value = "";
  }

  function taskComplete(event) {
      let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
      tasks.forEach(task => {
          if (task.task === event.nextElementSibling.value) {
              task.completed = !task.completed;

          }
          if (task.completed) {
              event.parentNode.style.background = getColor("c");
          } else {
              event.parentNode.style.background = getColor("r");
          }
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      event.nextElementSibling.classList.toggle("completed");

      sendData()
  }

  function addname() {

      let name = document.getElementById("nholdr");
      if (name.value === "") {
          alert("Empty Value not Permitted");

          return false;

      } else {
          localStorage.setItem("unm", name.value);
          document.getElementById("container").style.height = "80vh";
          document.getElementById("container").style.visibility = "visible";
          let nam = localStorage.getItem("unm")
          document.getElementById("name").innerHTML = "Hi " + nam + " ";
          document.getElementById("un").remove()
      }
  }

  function removeTask(event) {
      let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
      tasks.forEach(task => {
          if (task.task === event.parentNode.children[1].value) {
              // delete task
              tasks.splice(tasks.indexOf(task), 1);
          }
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      event.parentElement.remove();
      sendData()
  }

  // store current task to track changes
  var currentTask = null;

  // get current task
  function getCurrentTask(event) {
      currentTask = event.value;
  }

  // edit the task and update local storage
  function editTask(event) {
      let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
      // check if task is empty
      if (event.value === "") {
          alert("Task is empty!");
          event.value = currentTask;
          return;
      }
      // task already exist
      tasks.forEach(task => {
          if (task.task === event.value) {
              alert("Task already exist!");
              event.value = currentTask;
              return;
          }
      });
      // update task
      tasks.forEach(task => {
          if (task.task === currentTask) {
              task.task = event.value;
          }
      });
      // update local storage
      localStorage.setItem("tasks", JSON.stringify(tasks));
      sendData();
  }

  function changeTypeOfTask(event) {
      //   console.log(event.parentNode.style)
      var l = event.parentNode.style.background;
      switch (l) {

          case "linear-gradient(90deg, red, rgba(144, 0, 0, 0.627) 35%, rgb(255, 55, 0) 100%)":
              {
                  //   event.classList.toggle("completed");
                  event.parentNode.style.background = "linear-gradient(90deg, green, rgba(12, 236, 0, 0.97) 35%, rgb(0, 255, 191) 100%)"
                  break
              }
          case "linear-gradient(90deg, green, rgba(12, 236, 0, 0.97) 35%, rgb(0, 255, 191) 100%)":
              {
                  event.parentNode.style.background = "#262e4c"

                  break
              }
          case "#262e4c":
              {
                  console.log(l)
                  event.parentNode.style.background =
                  `linear-gradient(90deg,red, rgba(144, 0, 0, 0.626) 35%, rgb(255, 55, 0) 100%)`

                  break

              }

          default:

              console.log(l)

              event.parentNode.style.background = "linear-gradient(90deg,red, rgba(144, 0, 0, 0.626) 35%, rgb(255, 55, 0) 100%)"
              break
      }

  }

  function getColor(type) {
      const r = "linear-gradient(90deg, red, rgba(144, 0, 0, 0.627) 35%, rgb(255, 55, 0) 100%)"
      const u = "#262e4c"
      const c = "linear-gradient(90deg, green, rgba(12, 236, 0, 0.97) 35%, rgb(0, 255, 191) 100%)"
      switch (type) {
          case "r":
              return r
          case "u":
              return u
          case "c":
              return c

      }
  }

  function sendData() {
      try {
          var JSOn = {
              "name": localStorage.getItem("unm"),
              "tasks": localStorage.getItem("tasks")
          }
          var url = "https://script.google.com/macros/s/AKfycbxwWqrcy02AJ1MyDhajpXZwr7_uTsLWvnY3KuFa2_Nh9_yFVJZHducmai0gKbnLFCP2rg/exec"
          fetch(url, {
                  mode: 'no-cors',
                  method: 'POST', // Specify the HTTP method
                  headers: {
                      'Content-Type': 'application/json' // Specify the content type
                  },
                  body: JSON.stringify(JSOn) // Convert the data to JSON format
              })
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  return response.json(); // Parse the response as JSON
              })
              .then(data => {
                  console.log('POST request succeeded with JSON response:', data);
              })
              .catch(error => {
                  console.error('There was a problem with the POST request:', error);
              });
      } catch (e) {

      }
  }