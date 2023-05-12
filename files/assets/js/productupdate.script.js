function updateProduct(event) {
    event.preventDefault(); 

    const urlParams = new URLSearchParams(window.location.search);
    let product = urlParams.get('product'); 
    let cost = $("#cost").val();
    let description = $("#description").val();
    let quantity = $("#quantity").val();

    const item = {
        'product': product,
        'cost': cost,
        'description': description,
        'quantity': quantity
    }

    $.ajax({
        url: "http://localhost:3000/api/product/update/" + encodeURIComponent(product),
        type: "PATCH",
        data: item,
        dataType: "JSON",
    })
    .done(function(response) {
        let data = response.data;
        let status = response.status

        if (status) { 
            console.log('Επιτυχής ενημέρωση του προϊόντος');
            alert('Επιτυχής ενημέρωση του προϊόντος!');
            $('#updateProductForm')[0].reset();
        } else {
            console.log('Πρόβλημα στην ενημέρωση του προϊόντος ('+ data.message + ')');
            alert('Πρόβλημα στην ενημέρωση του προϊόντος ('+ data.message + ')');
            $('#updateProductForm')[0].reset();
        }
    });
}