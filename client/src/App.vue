<template>
    <div>
        <Navbar @logout="logoutUser" :isLoggedIn="isLoggedIn"/>
        <Login @login="loginUser" :isLoggedIn="isLoggedIn"/>
        <div v-if="isLoggedIn" class="all mt-3" id="task-container">
            <div class="row no-gutters mt-2">
                <TaskBox v-for="(category, index) in categories" :key="index" :id="index">
                    <div class="card-header ml-1 mr-1">{{ category }}</div>
                    <div v-for="task in tasks" :key="task.id" style="max-height: 65vh;" class="card-box ml-1 mr-1 overflow-auto">
                        <Task @delete="deleteTask" :task="task" :category="category"/>
                    </div>
                    <div class="card-header ml-1 mr-1">
                            <a href="" id="show-modal" @click.prevent="showModal = true"><i class="material-icons">add</i></a>
                    </div>
                </TaskBox>
            </div>
        <div>
        <AddTask v-if="showModal" @add="addTask" @close="showModal = false"  />
    </div>
</template>


<script>
let socket = io('http://localhost:3000')
import axios from 'axios'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Task from './components/Task'
import AddTask from './components/AddTask'
import TaskBox from './components/TaskBox'

export default {
    components: {
        Navbar,
        Login,
        Task,
        AddTask,
        TaskBox
    },
    data: function() {
        return {
            isLoggedIn: false,
            categories: ['Backlog', 'Todo', 'Done', 'Completed'],
            tasks: [],
            showModal: false
        }
    },
    created () {
        this.checkIsLogin()
        socket.on('realtime-data', rtdata => {
            this.tasks = rtdata
        })
    },
    methods: {
        drop: e => {
            const card_id = e.dataTransfer.getData('card_id')

            const card = document.getElementById(card_id)

            card.style.display = "block"
            e.target.appendChild(card)
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
            axios.get(`http://localhost:3000/tasks`, {
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
        }
    }
}
</script>

