const login = user => {
    $.ajax({
        method: 'post',
        url: `http://localhost:3000/login`,
        data: user,
        success: token => {
            localStorage.setItem("token", token)
            $all.hide()
            $hello.show()
        }
    })
}