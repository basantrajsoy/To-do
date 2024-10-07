const inputTask = document.querySelector(".inputToList");
const inputSubmit = document.querySelector(".inputSubmit");
const taskList = document.querySelector(".taskList");
const clear = document.querySelector(".clear");

let savedList = JSON.parse(localStorage.getItem("saved list")) || [];

// FUNKTIONES

function updateLocalStorage() {
    localStorage.setItem("saved list", JSON.stringify(savedList));
};

function removeTask(removeId) {
    savedList = savedList.filter((item) => item.id !== removeId);
    updateLocalStorage();
    displayTask();
}

function displayTask() {
    taskList.innerHTML = "";
    
    savedList.forEach(function (item) {
        let li = document.createElement("li");
        li.classList.add("task-container");
        li.innerHTML = `<input type="checkbox" id="task" class="checkbox" ${item.done ? "checked" : ""} /><label for="task" class="taskText"> ${item.task} </label><button class="remove">Remove</button>`;
        taskList.append(li);
        
        let taskText = li.children[1];
        let checkbox = li.children[0];
        let remove = li.children[2];
        
        taskText.style.textDecoration = item.done ? "line-through" : "";
        
        remove.addEventListener("click", () => removeTask(item.id));
        
        checkbox.addEventListener("click", function () {
            if (checkbox.checked) {
                item.done = true;
                taskText.style.textDecoration = "line-through";
            } else {
                item.done = false;
                taskText.style.textDecoration = "";
            }
            updateLocalStorage();
        });
        
        updateLocalStorage();
    });
    
};

// EVENT LISTENERS

inputTask.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        savedList.push({task: inputTask.value, done: false, id: savedList.length + 1});
        displayTask();
    
        inputTask.value = "a";
    }
});

inputSubmit.addEventListener("click", function () {
    // ADD TO LIST
    savedList.push({task: inputTask.value, done: false, id: savedList.length + 1});
    displayTask();
    
    inputTask.value = "a";
});

clear.addEventListener("click", function() {
    savedList = [];
    localStorage.removeItem("saved list");
    displayTask();
});

// FINISH UPS

displayTask();