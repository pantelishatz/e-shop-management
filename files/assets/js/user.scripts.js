$(document).ready(function(){

  $.ajax({
    url:'http://localhost:3000/api/user/findall',
    type:'get',
    dataType:'JSON'
  })
  .done(function(response){
    let data = response.data;
    let status = response.status
    
    if (status) { 
        createTbody(data);
    } else {
        showAlert(false,'Πρόβλημα στην αναζήτηση των χρηστών ('+ data.message + ')');
    }
  });

  $('.row').off('click', '.btnSubmit').on('click', '.btnSubmit', function () {

    let username = $("#username").val();
    let password = $("#password").val();
    let name = $("#name").val();
    let surname = $("#surname").val();
    let email = $("#email").val();
    let address =  $("#address").val();
    let phone =  $("#phone").val();

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
    .done( function(response) {
      
      let data = response.data;
      let status = response.status
  
      if (status) { 
          console.log('Επιτυχής εισαγωγή του χρήστη');
          alert('Επιτυχής εισαγωγή του χρήστη');
          $('#frmUser')[0].reset();
      } else {
          console.log('Πρόβλημα στην εισαγωγή του χρήστη ('+ data.message + ')');
          alert('Πρόβλημα στην εισαγωγή του χρήστη ('+ data.message + ')');
          $('#frmUser')[0].reset();
      }
    });

    return false
  });

});

function createTbody(data){

  $("#userTable > tbody").empty();

  const len = data.length;
  for (let i=0; i<len; i++){
    let username = data[i].username;
    let name = data[i].name;
    let surname = data[i].surname;
    let email = data[i].email;
    let address = data[i].address;
    let phone = data[i].phone;
  
    let tr_str = "<tr>" +
      "<td>" + username + "</td>" +
      "<td>" + name + "</td>" +
      "<td>" + surname + "</td>" +
      "<td>" + email + "</td>" +
      "<td>" + address + "</td>" +
      "<td>" + phone + "</td>" +      
      "<td>" +
          "<button class='btnUpdate btn btn-primary' value='"+username+"\'>Τροποποίηση</button> " +
          "<button class='btnDelete btn btn-primary' value=\'"+username+"\'>Διαγραφή</button>" +
      "</td>" + 
      "</tr>";

    $("#userTable tbody").append(tr_str);
  }
}

$(document).ready(function () {
  $(document).on('click', '.btnUpdate', function () {
    var username = $(this).val();
    window.location.href = 'update.html?username=' + username;
  });

  $('#updateUserForm').on('submit', updateUser);
});

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function updateUser(event) {
  event.preventDefault();

  var username = getParameterByName('username');
  var name = $('#name').val();
  var surname = $('#surname').val();
  var email = $('#email').val();
  var address = $('#address').val();
  var phone = $('#phone').val();

  $.ajax({
    url: 'http://localhost:3000/api/user/update/' + username,
    type: 'patch',
    dataType: 'JSON',
    data: {
      username: username,
      name: name,
      surname: surname,
      email: email,
      address: address,
      phone: phone
    }
  })
}

$(document).ready(function () {
  $(document).on('click', '.btnDelete', function () {
      var username = $(this).val();
      deleteUser(username);
  });

  function deleteUser(username) {
    let confirmation = confirm('Are you sure you want to delete this user?');
    if (confirmation) {
        $.ajax({
            url: 'http://localhost:3000/api/user/delete/' + username,
            type: 'delete',
            dataType: 'JSON'
        })
        .done(function (response) {
            let data = response.data;
            let status = response.status;

            if (status) { 
                alert('Επιτυχής διαγραφή του χρήστη');
            } else {
                alert('Πρόβλημα στη διαγραφή του χρήστη ('+ data.message + ')');
            }
        })
        .fail(function (error) {
            alert('Αποτυχία διαγραφής του χρήστη.');
        });
    }
}
});