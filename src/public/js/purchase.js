// script.js
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('purchase');

    button.addEventListener('click', async (e) => {
        e.preventDefault();
        const cartId = localStorage.getItem('cartId');
        if (!cartId) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No hay un carrito identificado para realizar la compra.'
            });
            return;
        }

        try {
            const response = await fetch(`/api/carts/${cartId}/purchase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else if (!response.headers.get('content-type')?.includes('application/json')) {
                throw new Error("No recibimos JSON!");
            }

            const data = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Compra realizada',
                text: 'Tu compra ha sido realizada con éxito.',
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                window.location.replace('/products');
            });

        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al realizar la compra.'
            });
        }
    });
});

