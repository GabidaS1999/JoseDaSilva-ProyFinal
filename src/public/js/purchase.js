document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('purchase');

    button.addEventListener('click', e => {
        e.preventDefault();
        const cartId = localStorage.getItem('cartId');
        if (!cartId) {
            alert("No hay un carrito identificado para realizar la compra.");
            return;
        }

        fetch(`/api/carts/${cartId}/purchase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else if (!response.headers.get('content-type')?.includes('application/json')) {
                throw new Error("No recibimos JSON!");
            }
            return response.json();
        })
        .then(data => {
            alert("Compra realizada");
            window.location.replace('/products');
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Hubo un problema al realizar la compra.");
        });
    });
});

