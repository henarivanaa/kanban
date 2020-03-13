<template>
    <div>
        <Navbar @logout="logoutUser" :isLoggedIn="isLoggedIn"/>
        <Login @login="loginUser" @register="registerUser" :isLoggedIn="isLoggedIn"/>
        <div v-if="isLoggedIn" class="all mt-3" id="task-container">
            <div class="row no-gutters mt-2">
                <TaskColumn @changeStatus="changeStatus" v-for="(category, index) in categories" :key="index" :boxId="`${index}ty`" :category="category" :tasks="tasks" @modalTrue="changeModal">

                    <Task v-for="task in tasks" :key="task.id" @modalEditTrue="showModalEdit" @delete="deleteTask" :task="task" :category="category" :id="task.id" draggable="true" />
                    
                </TaskColumn>
            </div>
        <div>
        <AddTask v-if="showModal"  @add="addTask" @close="showModal = false" :category="addCategory" />
        <EditTask v-if="showEdit" @edit="editTask" @close="showEdit = false" :task="editTaskData" />
    </div>
</template>


<script>
let heroku = `https://dry-castle-71353.herokuapp.com`
let socket = io(`${heroku}`)
import axios from 'axios'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Task from './components/Task'
import AddTask from './components/AddTask'
import EditTask from './components/EditTask'
import TaskColumn from './components/TaskColumn'
import TaskBox from './components/TaskBox'

export default {
    components: {
        Navbar,
        Login,
        Task,
        AddTask,
        TaskBox,
        TaskColumn,
        EditTask
    },
    data: function() {
        return {
            isLoggedIn: false,
            categories: ['Backlog', 'Todo', 'Done', 'Completed'],
            tasks: [],
            showModal: false,
            showEdit: false,
            addCategory: null,
            editTaskData: null
        }
    },
    created () {
        this.checkIsLogin()
        socket.on('realtime-data', rtdata => {
            this.tasks = rtdata
        })
    },
    methods: {
        showModalEdit (data) {
            this.showEdit = data.modal
            this.editTaskData = data.task
        },
        registerUser(data) {
            localStorage.setItem("access_token", data.token)
            this.isLoggedIn = data.isLoggedIn
            this.showTask()
        },
        changeModal(state) {
            this.addCategory = state.category
            this.showModal = state.modal
        },
        checkIsLogin () {
            if (localStorage.getItem("access_token")) {
                this.isLoggedIn = true
                this.showTask()
            } else {
                this.isLoggedIn = false
            }
        },
        loginUser (data) {
            localStorage.setItem("access_token", data.token)
            this.isLoggedIn = data.isLoggedIn
            this.showTask()
        },
        showTask() {
            axios.get(`${heroku}/tasks`, {
                headers: {
                    "access_token": localStorage.getItem("access_token")
                }
            })
                .then(data => {
                    let tasks = data.data
                    socket.emit('show-data', tasks)
                    this.tasks = data.data
                })
        },
        logoutUser () {
            localStorage.removeItem("access_token")
            this.isLoggedIn = false
        },
        deleteTask(id) {
            this.tasks = this.tasks.filter(task => task.id !== id)
            socket.emit('show-data', this.tasks)
        },
        addTask(newTask) {
            this.tasks.push(newTask)
            socket.emit('show-data', this.tasks)
        },
        changeStatus(data) {
            socket.emit('show-data', this.tasks)
        },
        editTask(data) {
            this.tasks = this.tasks.map(task => task.id === data.id ? task = data : task)
        }
    }
}
</script>

