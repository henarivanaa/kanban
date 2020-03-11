let server = `http://localhost:3000`
let heroku = `https://dry-castle-71353.herokuapp.com/`
let app = new Vue({
    el: '#app',
    data: {
        isLoggedIn: false,
        tasks: [],
        password_login: null,
        email_login: null,
        name_register: null,
        email_register: null,
        password_register: null
    },
    created () {
        this.checkIsLogin()
    } ,
    watch: {
        isLoggedIn () {
            this.checkIsLogin()
        }
    },
    methods: {
        logout () {
            localStorage.removeItem("access_token")
            this.checkIsLogin()
        },
        checkIsLogin() {
            if (localStorage.getItem("access_token")) {
                this.isLoggedIn = true
                this.showTask()
            } else {
                this.isLoggedIn = false
            }
        },
        register() {
            axios.post(`${server}/register`, {
                "name": this.name_register,
                "email": this.email_register,
                "password": password_register
            })
                .then(data => {
                    let token = data.data
                    localStorage.setItem("access_token", token)
                    this.checkIsLogin()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        showTask() {
            axios.get(`${server}/tasks`, {
                headers: {
                    "access_token": localStorage.getItem("access_token")
                }
            })
                .then(data  => {
                    let tasks = data.data
                    this.tasks = tasks
                })
                .catch(err => {
                    console.log(err)
                })
        },
        login () {
            axios.post(`${server}/login`, {
                "email": this.email_login,
                "password": this.password_login
            })
                .then(data => {
                    let token = data.data
                    localStorage.setItem("access_token", token)
                    this.isLoggedIn = true
                })
                .catch(err => {
                    console.log(err)
                })
        },
        addTask () {

        },
        deleteTask (id) {
            axios.delete(`${server}/tasks/${id}`, {
                headers: {
                    "access_token": localStorage.getItem("access_token")
                }
            })
                .then(data => {
                    this.showTask()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
})