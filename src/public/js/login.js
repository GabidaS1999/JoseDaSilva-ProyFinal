
const form = document.getElementById('loginForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form)

    const obj = {}

    data.forEach((value, key) => obj[key] = value);

    fetch('/api/jwt/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            fetch('/check-admin', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` // Ajusta si usas otro método de autenticación
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.auth) {
                        window.location.href = '/users';
                    }else{
                        result.json()
                        .then(json => {
                            console.log(json);
                            localStorage.setItem('jwtToken', json.token);
                            localStorage.setItem('cartId', json.cartId);
                            console.log("Cookie generada");
                            console.log(document.cookie)
                            alert("Login realizado con exito y carrito creado")
                        })
                    window.location.replace('/products')

                    }
                })
                .catch(error => console.error('Error al verificar el rol del usuario:', error));
        } else {
            alert("Error al iniciar sesión");
        }
    }

    )
})