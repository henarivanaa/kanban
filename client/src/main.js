import Vue from 'vue'
import App from './App.vue'

new Vue ({
    render: createElement => createElement(App)
}).$mount('#app')

// let server = `http://localhost:3000`
// let heroku = `https://dry-castle-71353.herokuapp.com/`
// let socket = io('http://localhost:3000')
// let app = new Vue({
//     el: '#app',
//     data: {
//         isLoggedIn: false,
//         tasks: [],
//         password_login: null,
//         email_login: null,
//         name_register: null,
//         email_register: null,
//         password_register: null,
//         task_title: null,
//         task_difficulty: null,
//         isError: ''
//     },
//     created () {
//         socket.on('realtime-data', rtdata => {
//             this.tasks = rtdata
//         })
//         this.checkIsLogin()
//     } ,
//     watch: {
//         password_login() {
//             this.isError = ''
//         },
//         isLoggedIn () {
//             this.checkIsLogin()
//         }
//     },
//     methods: {
//         logout () {
//             localStorage.removeItem("access_token")
//             this.checkIsLogin()
//         },
//         checkIsLogin() {
//             if (localStorage.getItem("access_token")) {
//                 this.isLoggedIn = true
//                 this.showTask()
//             } else {
//                 this.isLoggedIn = false
//             }
//         },
//         register() {
//             axios.post(`${server}/register`, {
//                 "name": this.name_register,
//                 "email": this.email_register,
//                 "password": this.password_register
//             })
//                 .then(data => {
//                     let token = data.data
//                     localStorage.setItem("access_token", token)
//                     this.checkIsLogin()
//                 })
//                 .catch(err => {
//                     console.log(err)
//                 })
//         },
//         showTask() {
//             axios.get(`${server}/tasks`, {
//                 headers: {
//                     "access_token": localStorage.getItem("access_token")
//                 }
//             })
//                 .then(data  => {
//                     let tasks = data.data
                    // socket.emit('show-data', tasks)
//                     this.tasks = tasks
//                 })
//                 .catch(err => {
//                     console.log(err)
//                 })
//         },
//         login () {
//             axios.post(`${server}/login`, {
//                 "email": this.email_login,
//                 "password": this.password_login
//             })
//                 .then(data => {
//                     let token = data.data
//                     localStorage.setItem("access_token", token)
//                     this.isLoggedIn = true
//                 })
//                 .catch(err => {
//                     this.isError = err.response.data
//                 })
//         },
//         addTask () {
//             axios.post(`${server}/tasks`, {
//                 "title": this.task_title,
//                 "difficulty": this.task_difficulty
//             }, {
//                 headers: {
//                     "access_token": localStorage.getItem("access_token")
//                 }
//             })
//                 .then(() => {
//                     $('#exampleModalCenter').modal('toggle')
//                     this.showTask()
//                 })
//                 .catch(err => {
//                     console.log(err.response.data)
//                 })
//         },
//         deleteTask (id) {
//             axios.delete(`${server}/tasks/${id}`, {
//                 headers: {
//                     "access_token": localStorage.getItem("access_token")
//                 }
//             })
//                 .then(data => {
//                     this.showTask()
//                 })
//                 .catch(err => {
//                     console.log(err)
//                 })
//         }
//     }
// })