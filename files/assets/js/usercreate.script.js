function createUser() {
    let username = $("#username").val();
    let password = $("#password").val();
    let name = $("#name").val();
    let surname = $("#surname").val();
    let email = $("#email").val();
    let address = $("#address").val()
    let phone = $('#phone').val()
  
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
      url: "http://localhost:3000/api/user/create",
      type: "post",
      data: item,
      dataType: "JSON",
    })
    .done(function(response) {
      let data = response.data;
      let status = response.status
  
      if (status) { 
          console.log(true,'Επιτυχής εισαγωγή του χρήστη');
          alert(true,'Επιτυχής εισαγωγή του χρήστη');
          $('#frmUser')[0].reset();
      } else {
          console.log(false,'Πρόβλημα στην εισαγωγή του χρήστη ('+ data.message + ')');
          alert(false,'Πρόβλημα στην εισαγωγή του χρήστη ('+ data.message + ')');
          $('#frmUser')[0].reset();
      }
    });
  }