let $all = $('.all')
let $alert = $('#alert')
let $navbar = $('#navbar')

let $home = $('#home')
let $homeContainer = $('.home-container')
let $loginBtn = $('#login-button')
let $signupBtn = $('#signup-button')
let $loginForm = $('#login-form')

let $logout = $('#logout-div')
let $logoutBtn = $('#logout-button')

let $task = $('#task-container')
let $deleteBtn = $('#delete-button')

$(document).ready(() => {
    if (localStorage.getItem("token")) {
        $all.hide()
        $navbar.show()
        $logout.show()
        $task.show()
    } else {
        $all.hide()
        $home.show()
    }
})

$deleteBtn.on('click', e => {
    e.preventDefault()
})

$loginBtn.on('click', () => {
    $homeContainer.removeClass("right-panel-active")
})

$signupBtn.on('click', () => {
    $homeContainer.addClass("right-panel-active")
})

$logoutBtn.on('click', () => {
    localStorage.removeItem("token")
    $all.hide()
    $home.show()
})

$loginForm.on('submit', e => {
    e.preventDefault()
    let $email = $('#email-login').val()
    let $password = $('#password-login').val()
    let userData = {
        "email" : $email,
        "password" : $password
    }
    login(userData)
})