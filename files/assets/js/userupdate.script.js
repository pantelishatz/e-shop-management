function updateUser(event) {
    event.preventDefault(); 

    const urlParams = new URLSearchParams(window.location.search);
    let username = urlParams.get('username');
    let password = $("#password").val();
    let name = $("#name").val();
    let surname = $("#surname").val();
    let email = $("#email").val();
    let address = $("#address").val();
    let phone = $("#phone").val();

    const item = {
        'username': username,
        'password': password,
        'name': name,
        'surname': surname,
        'email': email,
        'address': address,
        'phone': phone
    }

    $.ajax({
        url: "http://localhost:3000/api/user/update/" + username,
        type: "patch",
        data: item,
        dataType: "JSON",
    })
    .done(function(response) {
        let data = response.data;
        let status = response.status

        if (status) { 
            console.log('Επιτυχής ενημέρωση του χρήστη');
            alert('Επιτυχής ενημέρωση του χρήστη');
            $('#frmUser')[0].reset();
        } else {
            console.log('Πρόβλημα στην ενημέρωση του χρήστη ('+ data.message + ')');
            alert('Πρόβλημα στην ενημέρωση του χρήστη ('+ data.message + ')');
            $('#frmUser')[0].reset();
        }
    });
}