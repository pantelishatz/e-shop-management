function createProduct() {
    let productName = $("#productName").val();
    let cost = parseFloat($("#cost").val().replace(",", "."));
    let description = $("#description").val();
    let quantity = parseFloat($("#quantity").val().replace(",", "."));

  
    const item = {
      'product': productName,
      'cost': cost,
      'description': description,
      'quantity': quantity,
    }
  
    $.ajax({
      url: "http://localhost:3000/api/product/create",
      type: "post",
      data: item,
      dataType: "JSON",
    })
    .done(function(response) {
      let data = response.data;
      let status = response.status;
  
      if (status) { 
        console.log('Επιτυχής εισαγωγή του προϊόντος');
        alert('Επιτυχής εισαγωγή του προϊόντος');
        $('#frmProduct')[0].reset();
      } else {
        console.log('Πρόβλημα στην εισαγωγή του προϊόντος ('+ data.message + ')');
        alert('Πρόβλημα στην εισαγωγή του προϊόντος ('+ data.message + ')');
        $('#frmProduct')[0].reset();
      }
    });
  }