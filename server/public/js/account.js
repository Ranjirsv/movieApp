/*calling login funtion when click login button in login form */
function login() {
   localStorage.setItem("username", "");
   localStorage.setItem("username",document.getElementById('username').value) ;
    //console.log("am in login");
    /*ajax call*/
    $.ajax({
        url: '/login',
        type: 'POST',
        data: {
            username: document.getElementById('username').value,
            password: document.getElementById('pw').value
        },
        error: function(err) {
            throw err;
        },
        /*with respect to the  received data alert will be shown */
        success: function(data) {
          /*  if (data.length == 0) {
                alert("UserName or password is invalid");
            } else {*/
              /*  window.location = "../html/signup.html";*/
               alert("login sucess");
           /* }*/

        }
    });
}