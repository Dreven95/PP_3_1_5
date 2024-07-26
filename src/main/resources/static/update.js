const URL = "http://localhost:8080/api";

$(document).ready(function() {
    // Load roles into the select dropdown
    fetch(URL + '/roles')
        .then(response => response.json())
        .then(data => {
            const rolesSelect = $('#roles');
            data.forEach(role => {
                rolesSelect.append(new Option(role.name, role.id));
            });
        });

    // Show modal and load user data
    $(document).on('click', '.edit-user-btn', function() {
        const userId = $(this).data('id');

        fetch(`/api/user/${userId}`)
            .then(response => response.json())
            .then(user => {
                $('#userId').val(user.id);
                $('#name').val(user.name);
                $('#email').val(user.email);
                $('#password').val(user.password); // Be careful with password handling
                $('#roles').val(user.roles.map(role => role.id));

                $('#userModal').modal('show');
            });
    });

    // Submit the form data
    $('#update-user-form').on('submit', function(event) {
        event.preventDefault();

        const formData = {
            id: $('#userId').val(),
            name: $('#name').val(),
            email: $('#email').val(),
            password: $('#password').val(),
            roles: $('#roles').val()
        };

        fetch(URL + '/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                $('#userModal').modal('hide');
                // Optionally update the user list or UI
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});