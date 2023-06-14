$(document).ready(function() {
    $.ajax({
      url: 'http://localhost:3000/api/partner/findall',
      type: 'get',
      dataType: 'JSON'
    })
    .done(function(response) {
      let data = response.data;
      let status = response.status;
  
      if (status) {
        createPartnerTable(data);
      } else {
        showAlert(false, 'Πρόβλημα στην αναζήτηση των συνεργατών (' + data.message + ')');
      }
    });
  
    $('.row').off('click', '.btnPartnerSubmit').on('click', '.btnPartnerSubmit', function() {
      let name = $("#partnerName").val();
      let surname = $("#partnerSurname").val();
      let address = $("#partnerAddress").val();
      let phone = $("#partnerPhone").val();
      let role = $("#partnerRole").val();
  
      const item = {
        'name': name,
        'surname': surname,
        'address': address,
        'phone': phone,
        'role': role
      }
  
      $.ajax({
        url: "http://localhost:3000/api/partner/create",
        type: "post",
        data: item,
        dataType: "JSON",
      })
      .done(function(response) {
        let data = response.data;
        let status = response.status;
  
        if (status) {
          console.log('Επιτυχής εισαγωγή του συνεργάτη');
          alert('Επιτυχής εισαγωγή του συνεργάτη');
          $('#frmPartner')[0].reset();
        } else {
          console.log('Πρόβλημα στην εισαγωγή του συνεργάτη (' + data.message + ')');
          alert('Πρόβλημα στην εισαγωγή του συνεργάτη (' + data.message + ')');
          $('#frmPartner')[0].reset();
        }
      });
  
      return false;
    });
  });
  
  function createPartnerTable(data) {
    $("#partnerTable > tbody").empty();
  
    const len = data.length;
    for (let i = 0; i < len; i++) {
      let name = data[i].name;
      let surname = data[i].surname;
      let address = data[i].address;
      let phone = data[i].phone;
      let role = data[i].role;
  
      let tr_str =
        "<tr>" +
        "<td>" + name + "</td>" +
        "<td>" + surname + "</td>" +
        "<td>" + address + "</td>" +
        "<td>" + phone + "</td>" +
        "<td>" + role + "</td>" +
        "<td>" +
        "<button class='btnPartnerUpdate btn btn-primary' value='" + surname + "'>Τροποποίηση</button> " +
        "<button class='btnPartnerDelete btn btn-primary' value=\'" + surname + "\'>Διαγραφή</button>" +
        "</td>" +
        "</tr>";
  
      $("#partnerTable tbody").append(tr_str);
    }
  }
  
  $(document).ready(function() {
    $(document).on('click', '.btnPartnerUpdate', function() {
      var surname = $(this).val();
      window.location.href = 'updatepartner.html?surname=' + surname;
    });
  
    $('#updatePartnerForm').on('submit', updatePartner);
  });
  
  function updatePartner(event) {
    event.preventDefault();
  
    var surname = getParameterByName('surname');
    var name = $('#partnerName').val();
    var address = $('#partnerAddress').val();
    var phone = $('#partnerPhone').val();
    var role = $('#partnerRole').val();
  
    $.ajax({
      url: 'http://localhost:3000/api/partner/update/' + surname,
      type: 'patch',
      dataType: 'JSON',
      data: {
        name: name,
        surname: surname,
        address: address,
        phone: phone,
        role: role
      }
    });
  }
  
  $(document).ready(function() {
    $(document).on('click', '.btnPartnerDelete', function() {
      var surname = $(this).val();
      deletePartner(surname);
    });
  
    function deletePartner(surname) {
      let confirmation = confirm('Are you sure you want to delete this partner?');
      if (confirmation) {
        $.ajax({
            url: 'http://localhost:3000/api/partner/delete/' + surname,
            type: 'delete',
            dataType: 'JSON'
          })
          .done(function(response) {
            let data = response.data;
            let status = response.status;
  
            if (status) {
              alert('Επιτυχής διαγραφή του συνεργάτη');
            } else {
              alert('Πρόβλημα στη διαγραφή του συνεργάτη (' + data.message + ')');
            }
          })
          .fail(function(error) {
            alert('Αποτυχία διαγραφής του συνεργάτη.');
          });
      }
    }
  });