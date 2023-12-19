const loginForm = document.querySelector(".account"); 
const messageContainer = document.getElementById("message-container"); 

loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const email = document.getElementById("account_email").value; 
    const password = document.getElementById("password").value; 

    fetch("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => {
            if (response.ok) {
                
            } else {
                
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
