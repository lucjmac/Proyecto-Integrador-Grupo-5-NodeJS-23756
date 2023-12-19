const loginForm = document.querySelector(".account"); // Obtener el formulario de inicio de sesión
const messageContainer = document.getElementById("message-container"); // Obtener el contenedor del mensaje

loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    const email = document.getElementById("account_email").value; // Obtener el valor del campo de correo electrónico
    const password = document.getElementById("password").value; // Obtener el valor del campo de contraseña

    fetch("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => {
            if (response.ok) {
                // Resto del código para manejar el inicio de sesión exitoso
            } else {
                // Resto del código para manejar el inicio de sesión fallido
                const confirmation = confirm("Usuario incorrecto. ¿Deseas registrarte?");
                
                if (confirmation) {
                    window.location.href = "/auth/register";
                } else {
                    const message = confirm("Puedes intentarlo de nuevo o iniciar sesión más tarde.");
                    
                    if (message) {
                        window.location.href = "/auth/login";
                    } else {
                        window.location.href = "/";
                    }
                }
            }
        })
        .catch((error) => {
            console.log("Error en la solicitud de inicio de sesión: " + error);
        });
});
