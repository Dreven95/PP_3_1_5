const URL = "http://localhost:8080/api";

$(document).ready(function() {
    fetch(URL + '/roles')
        .then(response => response.json())
        .then(data => {
            const rolesSelect = $('#new-roles');
            data.forEach(role => {
                rolesSelect.append(new Option(role.name, role.id));
            });
        });

    loadUsers();

    $('#new-user-form').on('submit', function(event) {
        event.preventDefault();

        const formData = {
            email: $('input[name="newUserEmail"]').val(),
            name: $('input[name="newUserName"]').val(),
            password: $('input[name="newUserPassword"]').val(),
            roles: $('#new-roles').val()
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
                loadUsers();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });

    $('#users-table-body').on('click', '.delete-user-btn', function() {
        const userId = $(this).data('id');
        fetch(URL + '/users/' + userId)
            .then(response => response.json())
            .then(user => {
                $('#deleteUserId').val(user.id);
                $('#deleteUserName').val(user.name);
                $('#deleteUserEmail').val(user.email);
                $('#deleteUserRoles').val(user.roles.map(role => role.name).join(', '));
                $('#deleteUserModal').modal('show');
            });
    });

    $('#confirmDeleteUser').on('click', function() {
        const userId = $('#deleteUserId').val();
        fetch(URL + '/users/' + userId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('User deleted:', data);
                $('#deleteUserModal').modal('hide');
                loadUsers(); // Reload users after deleting one
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });

    $('#users-table-body').on('click', '.edit-user-btn', function() {
        const userId = $(this).data('id');
        fetch(URL + '/users/' + userId)
            .then(response => response.json())
            .then(user => {
                $('#updateUserId').val(user.id);
                $('#updateName').val(user.name);
                $('#updateEmail').val(user.email);
                $('#updateRoles').empty();
                fetch(URL + '/roles')
                    .then(response => response.json())
                    .then(roles => {
                        roles.forEach(role => {
                            const selected = user.roles.some(userRole => userRole.id === role.id);
                            $('#updateRoles').append(new Option(role.name, role.id, selected, selected));
                        });
                    });
                $('#userModal').modal('show');
            });
    });

    $('#update-user-form').on('submit', function(event) {
        event.preventDefault();

        const userId = $('#updateUserId').val();
        const formData = {
            name: $('#updateName').val(),
            email: $('#updateEmail').val(),
            password: $('#updatePassword').val(),
            roles: $('#updateRoles').val()
        };

        fetch(URL + '/users/' + userId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('User updated:', data);
                $('#userModal').modal('hide');
                loadUsers(); // Reload users after updating one
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
});

function loadUsers() {
    fetch(URL + '/users')
        .then(response => response.json())
        .then(data => {
            const usersTableBody = $('#users-table-body');
            usersTableBody.empty();
            data.forEach(user => {
                const userRow = `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>
                            <ul>${user.roles.map(role => `<li>${role.name}</li>`).join('')}</ul>
                        </td>
                        <td>
                            <button type="button" class="btn btn-danger delete-user-btn" data-id="${user.id}" data-bs-toggle="modal" data-bs-target="#deleteUserModal">
                                Delete
                            </button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-primary edit-user-btn" data-bs-toggle="modal" data-bs-target="#userModal" data-id="${user.id}">
                                Update
                            </button>
                        </td>
                    </tr>
                `;
                usersTableBody.append(userRow);
            });

            $('.delete-user-btn').on('click', function() {
                const userId = $(this).data('id');
            });

            $('.edit-user-btn').on('click', function() {
                const userId = $(this).data('id');
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}