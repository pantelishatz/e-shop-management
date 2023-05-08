$(document).ready(function(){

  $.ajax({
    url:'http://localhost:3000/api/user/findall',
    type:'get',
    dataType:'JSON'
  })
  .done(function(response){
    // console.log(">>", response);
    let data = response.data;
    let status = response.status
    
    if (status) { 
        createTbody(data);
    } else {
        showAlert(false,'Πρόβλημα στην αναζήτηση των χρηστών ('+ data.message + ')');
        // console.log(data);
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

    //console.log($('.btnSubmit').val(), item);
    $.ajax({
      url: "http://localhost:3000/api/user/create",
      type: "post",
      data: item,
      dataType: "JSON",
      // encode: true,
    })
    .done( function(response) {
      // console.log(">>", response);
      
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
          // console.log(data.message);
      }
    });

    return false
  });

});

function createTbody(data){

  $("#userTable > tbody").empty();

  // console.log("CreateTBody", data);
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

  // Συνδέστε το συμβάν submit της φόρμας με τη συνάρτηση updateUser
  $('#updateUserForm').on('submit', updateUser);
});

function showAlert(status, message) {
  if (status) {
    $('.alert').addClass('alert-success');
    $('.alert').removeClass('alert-danger');
  } else {
    $('.alert').addClass('alert-danger');
    $('.alert').removeClass('alert-success');
  }
  $('.alert').html(message);
}
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

  // Λήψη των τιμών από τη φόρμα
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
    .done(function (response) {
      // Επιτυχία: Εμφάνιση του μηνύματος επιτυχίας
      showAlert(true, 'Επιτυχής ενημέρωση του χρήστη!');
    })
    .fail(function (error) {
      // Σφάλμα: Εμφάνιση του μηνύματος σφάλματος
      showAlert(false, 'Αποτυχία ενημέρωσης του χρήστη.');
    });
}