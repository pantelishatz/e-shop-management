$(document).ready(function(){

    // Ανάγνωση προϊόντων
    $.ajax({
      url:'http://localhost:3000/api/product/findall',
      type:'get',
      dataType:'JSON'
    })
    .done(function(response){
      let data = response.data;
      let status = response.status
      
      if (status) { 
          createTbody(data);
      } else {
          alert(false,'Πρόβλημα στην αναζήτηση των προϊόντων ('+ data.message + ')');
      }
    });
  
    // Δημιουργία προϊόντος
    $('.row').off('click', '.btnSubmit').on('click', '.btnSubmit', function () {
  
      let product = $("#product").val();
      let cost = $("#cost").val();
      let description = $("#description").val();
      let quantity = $("#quantity").val();
  
      const item = {
        'product': product,
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
      .done( function(response) {
        let data = response.data;
        let status = response.status
    
        if (status) { 
            alert(true,'Επιτυχής εισαγωγή του προϊόντος');
            $('#frmProduct')[0].reset();
            createTbody(data);
        } else {
            alert(false,'Πρόβλημα στην εισαγωγή του προϊόντος ('+ data.message + ')');
            $('#frmProduct')[0].reset();
        }
      });
  
      return false
    });
})
    
    function createTbody(data){

        $("#productTable > tbody").empty();
      
        const len = data.length;
        for (let i=0; i<len; i++){
          let product = data[i].product;
          let cost = data[i].cost;
          let description = data[i].description;
          let quantity = data[i].quantity;
          
          let tr_str = "<tr>" +
            "<td>" + product + "</td>" +
            "<td>" + cost + "</td>" +
            "<td>" + description + "</td>" +
            "<td>" + quantity + "</td>" + 
            "<td>" +
                "<button class='btnUpdate btn btn-primary' value=\'"+product+"\'>Τροποποίηση</button> " +
                "<button class='btnDelete btn btn-primary' value=\'"+product+"\'>Διαγραφή</button>" +
            "</td>" + 
            "</tr>";
      
          $("#productTable tbody").append(tr_str);
        }
      }
      
      function alert(status, message){
        if (status){
            $('.alert').addClass('alert-success');
            $('.alert').removeClass('alert-danger');
        } else {
            $('.alert').addClass('alert-danger');
            $('.alert').removeClass('alert-success');
        }
        $('.alert').html(message);
      }