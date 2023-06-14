function createPartner() {
    let name = $("#name").val();
    let surname = $("#surname").val();
    let address = $("#address").val();
    let phone = $("#phone").val();
    let role = $("#role").val();
    
    const item = {
      'name': name,
      'surname': surname,
      'address': address,
      'phone': phone,
      'role': role
    };
    
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
        console.log('Πρόβλημα στην εισαγωγή του συνεργάτη ('+ data.message + ')');
        alert('Πρόβλημα στην εισαγωγή του συνεργάτη ('+ data.message + ')');
        $('#frmPartner')[0].reset();
      }
    });
  }