const URL = "http://localhost:8080/api";

function loadCurrentUser() {
    fetch(URL + '/current-user')
        .then(response => response.json())
        .then(user => {
            document.getElementById('user-info').innerHTML = `${user.email} with roles: ${user.roles.map(role => role.name).join(', ')}`;

            const userTableBody = document.getElementById('user-table-body');
            userTableBody.innerHTML = `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td><ul>${user.roles.map(role => `<li>${role.name}</li>`).join('')}</ul></td>
                        </tr>
                    `;
        })
        .catch(error => {
            console.error('Error fetching current user:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    loadCurrentUser();
});