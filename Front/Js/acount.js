document.addEventListener("DOMContentLoaded", function () {
    // Obtener elementos
    const userName = document.getElementById("user-name");
    const userAge = document.getElementById("user-age");

    // Obtener datos del usuario desde localStorage
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    console.log("Usuario recuperado:", usuario); 
    if (usuario) {
        userName.textContent = usuario.nombre || "No registrado";
        userAge.textContent = usuario.password !== undefined ? `${usuario.password} años` : "No registrada";
    } else {
        userName.textContent = "Usuario desconocido";
        userAge.textContent = "Edad no disponible";
    }
});
