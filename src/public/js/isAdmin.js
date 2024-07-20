// document.addEventListener('DOMContentLoaded', () => {
//     fetch('/check-admin', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` // Ajusta si usas otro método de autenticación
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.auth) {
//             window.location.href = '/private'; 
//         }
//     })
//     .catch(error => console.error('Error al verificar el rol del usuario:', error));
// });

