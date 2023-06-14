function updatePartner(event) {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    let surname = urlParams.get('surname');
    let address = $("#address").val();
    let phone = $("#phone").val();
    let role = $("#role").val();

    const item = {
        'surname': surname,
        'address': address,
        'phone': phone,
        'role': role
    };

    $.ajax({
        url: "http://localhost:3000/api/partner/update/" + encodeURIComponent(surname),
        type: "PATCH",
        data: item,
        dataType: "JSON",
    })
    .done(function(response) {
        let data = response.data;
        let status = response.status;

        if (status) {
            console.log('Επιτυχής ενημέρωση του συνεργάτη');
            alert('Επιτυχής ενημέρωση του συνεργάτη!');
            $('#updatePartnerForm')[0].reset();
        } else {
            console.log('Πρόβλημα στην ενημέρωση του συνεργάτη (' + data.message + ')');
            alert('Πρόβλημα στην ενημέρωση του συνεργάτη (' + data.message + ')');
            $('#updatePartnerForm')[0].reset();
        }
    });
}