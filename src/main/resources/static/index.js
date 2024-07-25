const URL = "http://localhost:8080/api";

$(document).ready(function() {
    fetch(URL + '/roles')
        .then(response => response.json())
        .then(data => {
            const rolesSelect = $('#roles');
            data.forEach(role => {
                rolesSelect.append(new Option(role.name, role.id));
            });
        });


    $('#new-user-form').on('submit', function(event) {
        event.preventDefault();

        const formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            password: $('#password').val(),
            roles: $('#roles').val()
        };

        fetch('/admin/saveUser', {
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