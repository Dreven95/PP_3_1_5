const URL = "http://localhost:8080/api";

$(document).ready(function() {
    // Fetch roles from the server
    fetch(URL + '/roles')
        .then(response => response.json())
        .then(data => {
            const rolesSelect = $('#new-roles'); // Убедитесь, что ID совпадает с HTML
            data.forEach(role => {
                rolesSelect.append(new Option(role.name, role.id));
            });
        });

    // Form submission handler
    $('#new-user-form').on('submit', function(event) {
        event.preventDefault();

        const formData = {
            email: $('input[name="newUserEmail"]').val(),
            name: $('input[name="newUserName"]').val(),
            password: $('input[name="newUserPassword"]').val(),
            roles: $('#new-roles').val() // Получаем выбранные роли
        };

        fetch(URL + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                $('#new-user-form')[0].reset();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
});