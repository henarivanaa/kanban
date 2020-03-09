let $all = $('.all')

let $login = $('#login-div')
let $loginForm = $('#login-form')

let $hello = $('#hello')

if (localStorage.getItem("token")) {
    $(document).ready(() => {
        $all.hide()
        $hello.show()
    })
} else {
    $(document).ready(() => {
        $all.hide()
        $login.show()
        $hello.hide()
    })
}

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