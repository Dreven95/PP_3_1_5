$(document).ready(function() {
    const URL = "http://localhost:8080/api";

    $.getJSON(URL + '/roles', function(data) {
        const rolesSelect = $('#updateRoles');
        data.forEach(role => {
            rolesSelect.append(new Option(role.name, role.id));
        });
    });

    $('.edit-user-btn').on('click', function() {
        const userId = $(this).data('id');

        $.getJSON(`${URL}/user/${userId}`, function(user) {
            $('#updateUserId').val(user.id);
            $('#updateName').val(user.name);
            $('#updateEmail').val(user.email);
            $('#updatePassword').val(user.password);
            $('#updateRoles').val(user.roles.map(role => role.id));
        });
    });

    $('#update-user-form').on('submit', function(event) {
        event.preventDefault();

        const formData = {
            id: $('#updateUserId').val(),
            name: $('#updateName').val(),
            email: $('#updateEmail').val(),
            password: $('#updatePassword').val(),
            roles: $('#updateRoles').val()
        };

        $.ajax({
            url: URL + '/users',
            method: 'PUT',
            contentType: 'application/json',
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            data: JSON.stringify(formData),
            success: function(data) {
                console.log('Success:', data);
                $('#userModal').modal('hide');
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    });
});