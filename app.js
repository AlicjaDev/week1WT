const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Add Task
addTaskBtn.addEventListener('click', () => {
    const task = taskInput.value.trim();
    if (task) {
        const li = document.createElement('li');
        li.textContent = task;
        taskList.appendChild(li);
        taskInput.value = '';
    }
});

// Remove Task on Click
taskList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        e.target.remove();
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/week1WT/service-worker.js')
            .then(reg => console.log('Service Worker Registered'))
            .catch(err => console.error('Service Worker Error:', err));
    });
}


const sw = new URL('service-worker.js', import.meta.url)
if ('serviceWorker' in navigator) {
    const s = navigator.serviceWorker; s.register(sw.href, {
        scope: '/YOUR_REPOSITORY_NAME_HERE/'
    })
        .then(_ => console.log('Service Worker Registered for scope:', sw.href, 'with', import.meta.url))
        .catch(err => console.error('Service Worker Error:', err));
}




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyvjfF6YoOgA0hNnEv8p_0nRikiDBHG4k",
  authDomain: "webtrends-79d76.firebaseapp.com",
  projectId: "webtrends-79d76",
  storageBucket: "webtrends-79d76.firebasestorage.app",
  messagingSenderId: "447969209191",
  appId: "1:447969209191:web:2389cf9ab0ea0061b29dc2",
  measurementId: "G-J1ZYVEBZXM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


addTaskBtn.addEventListener('click', async () => { const task = taskInput.value.trim();
    if (task) {
    const taskInput = document.getElementById("taskInput"); const taskText = taskInput.value.trim();
    
    if (taskText) {
    await addTaskToFirestore(taskText); renderTasks();
    taskInput.value = "";
    }
    renderTasks();
    }
    });
    
    
    async function addTaskToFirestore(taskText) { await addDoc(collection(db, "todos"), {
    text: taskText, completed: false
    });
    }

    

    
async function renderTasks() {
    var tasks = await getTasksFromFirestore(); taskList.innerHTML = "";
    
    tasks.forEach((task, index) => { if(!task.data().completed){
    const taskItem = document.createElement("li"); taskItem.id = task.id;
    taskItem.textContent = task.data().text;

    taskList.appendChild(taskItem);
}
});
}


async function getTasksFromFirestore() {
var data = await getDocs(collection(db, "todos")); let userData = [];
data.forEach((doc) => { userData.push(doc);
});
return userData;
}



function sanitizeInput(input) {
    const div = document.createElement("div"); div.textContent = input;
    return div.innerHTML;
    }

    
    const taskText = sanitizeInput(taskInput.value.trim());
