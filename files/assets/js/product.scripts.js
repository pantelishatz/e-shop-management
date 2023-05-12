$(document).ready(function(){

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
          alert('Πρόβλημα στην αναζήτηση των προϊόντων ('+ data.message + ')');
      }
    });
  
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
            alert('Επιτυχής εισαγωγή του προϊόντος');
            $('#frmProduct')[0].reset();
            createTbody(data);
        } else {
            alert('Πρόβλημα στην εισαγωγή του προϊόντος ('+ data.message + ')');
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
                "<button class='btnUpdateProduct btn btn-primary' value=\'"+product+"\'>Τροποποίηση</button> " +
                "<button class='btnDeleteProduct btn btn-primary' value=\'"+product+"\'>Διαγραφή</button>" +
            "</td>" + 
            "</tr>";
      
          $("#productTable tbody").append(tr_str);
        }
      }
      
      $(document).ready(function () {
        $(document).on('click', '.btnDeleteProduct', function () {
          var product = $(this).val();
          deleteProduct(product);
      });
        $(document).on('click', '.btnUpdateProduct', function () {
          var product = $(this).val();
          window.location.href = 'updateproduct.html?product=' + encodeURIComponent(product);
        });
      
        $(document).on('submit', '#updateProductForm', updateProduct);
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
      
      function updateProduct(event) {
        event.preventDefault();
      
        var product = getParameterByName('product');
        var cost = $('#cost').val();
        var description = $('#description').val();
        var quantity = $('#quantity').val();
      
        $.ajax({
          url: 'http://localhost:3000/api/product/update/' + product,
          type: 'patch',
          dataType: 'JSON',
          data: {
            product: product,
            cost: cost,
            description: description,
            quantity: quantity
          }
        })
        .done(function (response) {
          alert('Επιτυχής ενημέρωση του προϊόντος!');
        })
        .fail(function (error) {
          alert('Αποτυχία ενημέρωσης του προϊόντος.');
        });
      }

      function deleteProduct(product) {
        let confirmation = confirm('Are you sure you want to delete this product?');
        if (confirmation) {
            $.ajax({
                url: 'http://localhost:3000/api/product/delete/' + product,
                type: 'delete',
                dataType: 'JSON'
            })
            .done(function (response) {
                let data = response.data;
                let status = response.status;
    
                if (status) { 
                    alert('Επιτυχής διαγραφή του προϊόντος');
                } else {
                    alert('Πρόβλημα στη διαγραφή του προϊόντος ('+ data.message + ')');
                }
            })
            .fail(function (error) {
                alert('Αποτυχία διαγραφής του προϊόντος.');
            });
        }
    }


