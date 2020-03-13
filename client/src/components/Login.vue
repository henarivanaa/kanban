<template>
    <div class="home all" id="home" v-if="!isLoggedIn">
        <div class="home-container" :class="{'right-panel-active': onSignup} " id="container">
            <div class="form-container sign-up-container">
                <form @submit.prevent="register" id="signup-form">
                    <h1>Create Account</h1>
                    <div class="social-container">
                        <a href="" class="social"><i class="fab fa-google-plus-g"></i></a>
                    </div>
                    <span>or use your email for registration</span>
                    <input v-model="name_register" type="text" placeholder="Name" />
                    <input v-model="email_register" type="email" placeholder="Email" />
                    <input v-model="password_register" type="password" placeholder="Password" />
                    <!-- Alert Signup -->
                    <div v-if="errorTrue" style="padding: 5px 5px;" id="alert-signup" class="alert alert-danger alert-dismissible fade show mb-0 all" role="alert">
                        {{ errorTrue }}
                    </div>
                    <!-- ------------ -->
                    <button class="mt-3" type="submit">Sign Up</button>
                </form>
            </div>
            <div class="form-container sign-in-container">
                <form @submit.prevent="login" id="login-form">
                    <h1>Sign in</h1>
                    <div class="social-container">
                        <a href="" @click.prevent="onSuccess" class="social"><i class="fab fa-google-plus-g"></i></a>
                    </div>
                    <span>or use your account</span>
                    <input v-model="email_login" type="email" placeholder="Email" id="email-login"/>
                    <input v-model="password_login" type="password" placeholder="Password" id="password-login"/>
                    <!-- Alert Login -->
                    <div v-if="errorTrue" style="padding: 5px 5px;" id="alert-login" class="alert alert-danger alert-dismissible fade show mb-0 all" role="alert">
                        {{ errorTrue }}
                    </div>
                    <!-- ----------- -->
                    <button class="mt-4" type="submit">Sign In</button>
                </form>
            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button @click="showLogin" class="ghost" id="login-button">Sign In</button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button @click="showSignup" class="ghost" id="signup-button" type="button">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let heroku = `https://dry-castle-71353.herokuapp.com`
import axios from 'axios'
export default {
    props: ['isLoggedIn'],
    data () {
        return {
            email_login: null,
            password_login: null,
            name_register: null,
            email_register: null,
            password_register: null,
            onSignup: false,
            errorTrue: null
        }
    },
    watch : {
        password_login () {
            this.errorTrue = null
        }
    },
    methods: {
        onSuccess () {
            this.$gAuth.signIn()
                .then(GoogleUser => {
                // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
                let token = GoogleUser.getAuthResponse().id_token
                this.glogin(token)
                })
                .catch(error  => {
                //on fail do something
                    this.errorTrue = err.response.data
                })
        },
        glogin(token) {
            axios.post(`${heroku}/glogin`, {
                token: token
            })
                .then(data => {
                    this.$emit('login', { token:data.data, isLoggedIn: true })
                })
                .catch(err => {
                    this.errorTrue = err.response.data
                })
                
        },
        login() {
            axios.post(`${heroku}/login`, {
                "email": this.email_login,
                "password": this.password_login
            })
                .then(token => {
                    this.$emit('login', { token:token.data, isLoggedIn: true })
                })
                .catch(err => {
                    console.log('salah')
                    this.errorTrue = err.response.data
                })
        },
        register() {
            axios.post(`${heroku}/register`, {
                "name": this.email_register,
                "email": this.email_register,
                "password": this.password_register
            })
                .then(token => {
                    this.$emit('register', { token: token.data, isLoggedIn: true })
                })
                .catch(err => {
                    this.errorTrue = err.response.data
                })
        },
        showSignup () {
            this.onSignup = true
        },
        showLogin () {
            this.onSignup = false
        }
    }
}
</script>

