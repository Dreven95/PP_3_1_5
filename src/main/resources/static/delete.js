$(document).ready(function() {
    const URL = "http://localhost:8080/api";

    $('.delete-user-btn').on('click', function() {
        const userId = $(this).data('id');

        fetch(`${URL}/user/${userId}`)
            .then(response => response.json())
            .then(user => {
                $('#deleteUserId').val(user.id);
                $('#deleteUserName').val(user.name);
                $('#deleteUserEmail').val(user.email);
                $('#deleteUserRoles').val(user.roles.map(role => role.name).join(', '));
            })
            .catch(error => console.error('Error fetching user data:', error));
    });

    $('#confirmDeleteUser').on('click', function() {
        const userId = $('#deleteUserId').val();

        fetch(`${URL}/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            }
        })
            .then(response => {
                if (response.ok) {
                    $('#deleteUserModal').modal('hide');
                    console.log('User deleted successfully');
                } else {
                    response.text().then(text => {
                        console.error('Failed to delete user:', text);
                    });
                }
            })
            .catch(error => console.error('Error deleting user:', error));
    });
});