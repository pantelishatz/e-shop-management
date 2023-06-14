function handleLogin(event) {
    event.preventDefault();

    let username = $("#username").val();
    let password = $("#password").val();

    $.ajax({
        url: 'http://localhost:3000/api/user/login',
        type: 'post',
        dataType: 'JSON',
        data: { username, password }
    })
    .done(function(response) {
        let status = response.status;
        let user = response.data;
        if (status) {
            alert('Επιτυχής σύνδεση!');
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'index.html'; 
        } else {
            alert('Αποτυχία σύνδεσης. ' + user);
        }
    })
    .fail(function(error) {
        alert('Αποτυχία σύνδεσης. Παρουσιάστηκε σφάλμα κατά τη διάρκεια της αίτησης.');
    });
}