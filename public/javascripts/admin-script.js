function deleteUser(event, self) {
    event.preventDefault();
    
    $.ajax({
        type: "delete",
        url: `http://localhost:3000${self.getAttribute("href")}`,
        success: function (response, textStatus, xhr) {
            if (xhr.status === 204)
                location.reload();
        }
    });
}

function checkName(event) {
    $.ajax({
        type: "post",
        url: `http://localhost:3000/validate/name`,
        data: `name=${event.target.value}`,
        success: function (response) {
            if (response.status) {
                $("#nameHelp").text("");
                $("#exampleInputName").removeClass("is-invalid");
                $("#exampleInputName").addClass("is-valid");
            }
            else {
                $("#nameHelp").text(response.reason);
                $("#exampleInputName").addClass("is-invalid");
            }
        }
    });
}

function checkEmail(event) {
    $.ajax({
        type: "post",
        url: `http://localhost:3000/validate/email`,
        data: `email=${event.target.value}`,
        success: function (response) {
            if (response.status) {
                $("#emailHelp").text("");
                $("#exampleInputEmail1").removeClass("is-invalid")
                $("#exampleInputEmail1").addClass("is-valid");
            }
            else {
                $("#emailHelp").text(response.reason);
                $("#exampexampleInputEmail1leInputName").removeClass("is-valid")
                $("#exampleInputEmail1").addClass("is-invalid");
            }
        }
    });
}

function checkPassword(event) {
    $.ajax({
        type: "post",
        url: `http://localhost:3000/validate/password`,
        data: `password=${event.target.value}`,
        success: function (response) {
            if (response.status) {
                $("#passwordHelp").text("");
                $("#inputPassword").removeClass("is-invalid")
                $("#inputPassword").addClass("is-valid");
            }
            else {
                $("#passwordHelp").text(response.reason);
                $("#inputPassword").removeClass("is-valid")
                $("#inputPassword").addClass("is-invalid");
            }
        }
    });
}

function confirmPasswords(event) {
    let password = document.querySelector("#inputPassword").value;
    console.log(password);
    $.ajax({
        type: "post",
        url: `http://localhost:3000/validate/confirmPassword`,
        data: `password=${password}&confirmPassword=${event.target.value}`,
        success: function (response) {
            if (response.status) {
                $("#confirmPasswordHelp").text("");
                $("#inputPasswordConfirm").removeClass("is-invalid")
                $("#inputPasswordConfirm").addClass("is-valid");
            }
            else {
                $("#confirmPasswordHelp").text(response.reason);
                $("#inputPasswordConfirm").removeClass("is-valid")
                $("#inputPasswordConfirm").addClass("is-invalid");
            }
        }
    });
}