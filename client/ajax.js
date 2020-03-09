const login = user => {
    $.ajax({
        method: 'post',
        url: `https://dry-castle-71353.herokuapp.com/login`,
        data: user,
        success: token => {
            console.log(token)
            localStorage.setItem("token", token)
            $all.hide()
            $hello.show()
        }
    })
}