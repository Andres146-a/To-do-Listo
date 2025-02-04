document.addEventListener("DOMContentLoaded", function () {
    // Obtener los elementos del DOM
    const loginNombre = document.getElementById("login-nombre");
    const loginPassword = document.getElementById("login-password");
    const btnLogin = document.querySelector("#login-form input[type='submit']");

    const registroNombre = document.getElementById("registro-nombre");
    const registroPassword = document.getElementById("registro-password");
    const btnRegistro = document.querySelector("#registro-form input[type='submit']");

    // Verificar si los elementos existen antes de usarlos
    console.log("Verificando elementos...");
    console.log("loginNombre:", loginNombre);
    console.log("loginPassword:", loginPassword);
    console.log("btnLogin:", btnLogin);
    console.log("registroNombre:", registroNombre);
    console.log("registroPassword:", registroPassword);
    console.log("btnRegistro:", btnRegistro);

    if (!loginNombre || !loginPassword || !btnLogin || !registroNombre || !registroPassword || !btnRegistro) {
        console.error("❌ Error: No se encontraron algunos elementos del formulario.");
        return;
    }

    // Función para alternar entre Login y Registro
    window.mostrarFormulario = function (tipo) {
        if (tipo === "login") {
            document.getElementById("login-form").classList.remove("hidden");
            document.getElementById("registro-form").classList.add("hidden");
            document.querySelector(".tab.active").classList.remove("active");
            document.querySelectorAll(".tab")[0].classList.add("active");
        } else {
            document.getElementById("registro-form").classList.remove("hidden");
            document.getElementById("login-form").classList.add("hidden");
            document.querySelector(".tab.active").classList.remove("active");
            document.querySelectorAll(".tab")[1].classList.add("active");
        }
    };

    // Guardar usuarios en localStorage - Registro
    btnRegistro.addEventListener("click", function (event) {
        event.preventDefault(); // Evitar recargar la página

        const nombre = registroNombre.value.trim();
        const password = registroPassword.value.trim();

        console.log("Registro - Nombre:", nombre);
        console.log("Registro - Password:", password);

        if (nombre !== "" && password !== "") {
            localStorage.setItem("usuario", JSON.stringify({ nombre: nombre, password: password }));
            alert("Usuario registrado exitosamente");
            mostrarFormulario("login"); // Cambiar a login automáticamente
        } else {
            alert("Por favor, llena todos los campos");
        }
    });

    // Verificar usuario en localStorage - Login
    btnLogin.addEventListener("click", function (event) {
        event.preventDefault(); // Evitar recargar la página

        const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

        if (!usuarioGuardado || !usuarioGuardado.nombre || !usuarioGuardado.password) {
            alert("No hay usuario registrado. Por favor, regístrate primero.");
            return;
        }

        console.log("Login - Datos ingresados:", loginNombre.value.trim(), loginPassword.value.trim());
        console.log("Login - Datos guardados:", usuarioGuardado.nombre, usuarioGuardado.password);

        if (loginNombre.value.trim() === usuarioGuardado.nombre &&
            loginPassword.value.trim() === usuarioGuardado.password) {
            alert("Inicio de sesión exitoso");
            window.location.href = "index.html";
        } else {
            alert("❌ Credenciales incorrectas");
        }
    });

    mostrarFormulario("login");
});
