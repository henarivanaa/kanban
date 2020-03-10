const login = user => {
    $.ajax({
        method: 'post',
        url: `https://dry-castle-71353.herokuapp.com/login`,
        // url: `http://localhost:3000/login`,
        data: user,
        success: token => {
            localStorage.setItem("token", token)
            $all.hide()
            $navbar.show()
            $logout.show()
            // $task.show()
            $task.slideDown(1000).show()
        },
        error: jqxhr => {
            $alert.empty()
            $alert.append(jqxhr.responseJSON.message)
            // $alert.show()
            $alert.fadeTo(2000, 500).slideUp(500, () => {
                $alert.slideUp(500);
            })
        }
    })
}