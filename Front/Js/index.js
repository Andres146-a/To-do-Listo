document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.getElementById("toggle-sidebar");

    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("hidden");
    });

    // **Actualizar la fecha y hora cada segundo**
    function actualizarFechaHora() {
        const fechaHora = new Date();
        const opciones = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        };
        document.getElementById("fecha-hora").textContent = fechaHora.toLocaleDateString('es-ES', opciones);
    }
    actualizarFechaHora();
    setInterval(actualizarFechaHora, 1000);

    // **Referencias del DOM**
    const modal = document.getElementById("task-modal");
    const addTaskButton = document.getElementById("add-task-btn");
    const closeModal = document.querySelector(".close-btn");
    const saveTaskButton = document.getElementById("save-task");
    const taskType = document.getElementById("task-type");
    const dateField = document.getElementById("date-field");
    const obsField = document.getElementById("obs-field");
    const taskContainer = document.querySelector(".task-container");
    const taskList = document.querySelector(".task-list ul");

    // **Modal de detalles de la tarea**
    const detailsModal = document.getElementById("task-details-modal");
    const closeDetailsModal = detailsModal.querySelector(".close-btn");
    const taskDescModal = document.getElementById("task-desc-modal");
    const taskCreatedModal = document.getElementById("task-created-modal");
    const taskDeadlineModal = document.getElementById("task-deadline-modal");
    const taskObsModal = document.getElementById("task-obs-modal");

    // **Nuevo modal para editar tareas**
    const editModal = document.getElementById("task-edit-modal");
    const closeEditModal = editModal.querySelector(".close-btn");
    const editDesc = document.getElementById("edit-task-desc");
    const editDate = document.getElementById("edit-task-date");
    const editObs = document.getElementById("edit-task-obs");
    const saveEditBtn = document.getElementById("save-edit-task");
    const editDateField = document.getElementById("edit-date-field");
    const editObsField = document.getElementById("edit-obs-field");
    let editIndex = null;
    

    // **Cargar tareas almacenadas en localStorage**
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

    function guardarTareas() {
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }

    function renderizarTareas() {
        taskContainer.innerHTML = "";
        taskList.innerHTML = "";  // 🔥 LIMPIA la lista de tareas para evitar duplicados
        
        let ahora = new Date();
    
        tareas.forEach((tarea, index) => {
            agregarTarea(tarea, index, false);
    
            // 🔹 Crear solo UNA VEZ la tarea en la lista lateral
            const taskListItem = document.createElement("li");
            taskListItem.classList.add("task-list-item");
            taskListItem.textContent = `${index + 1}. ${tarea.descripcion}`;
    
            // 🔴 Si la tarea está vencida, ponerla en rojo
            if (tarea.fechaLimite && new Date(tarea.fechaLimite) < ahora) {
                taskListItem.style.color = "red";
                taskListItem.style.fontWeight = "bold";
            }
    
            taskListItem.addEventListener("click", function () {
                mostrarDetallesTarea(tarea);
            });
    
            taskList.appendChild(taskListItem); // ✅ Agregar una única vez
        });
    }
    
    

    // **Mostrar modal al hacer clic en "Agregar Tarea"**
    addTaskButton.addEventListener("click", function () {
        modal.classList.remove("hidden");
    });

    // **Cerrar modal al hacer clic en la "X"**
    closeModal.addEventListener("click", function () {
        modal.classList.add("hidden");
    });

    // **Cerrar modal de edición**
    closeEditModal.addEventListener("click", function () {
        editModal.classList.add("hidden");
    });

    // **Cerrar modal si se hace clic fuera de él**
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.add("hidden");
        }
    });

    // **Mostrar campos según el tipo de tarea**
    taskType.addEventListener("change", function () {
        dateField.classList.toggle("hidden", taskType.value !== "conFecha" && taskType.value !== "conFechaObs");
        obsField.classList.toggle("hidden", taskType.value !== "conObs" && taskType.value !== "conFechaObs");
    });

    // **Guardar nueva tarea**
    saveTaskButton.addEventListener("click", function () {
        const taskDesc = document.getElementById("task-desc").value.trim();
        const taskDate = document.getElementById("task-date").value;
        const taskObs = document.getElementById("task-obs").value.trim();

        if (taskDesc === "") {
            alert("Ingrese una descripción para la tarea.");
            return;
        }

        const nuevaTarea = {
            descripcion: taskDesc,
            fechaCreacion: new Date().toISOString().split("T")[0],
            fechaLimite: (taskType.value === "conFecha" || taskType.value === "conFechaObs") ? taskDate : null,
            observacion: (taskType.value === "conObs" || taskType.value === "conFechaObs") ? taskObs : "",
            estado: "pendiente"
        };

        tareas.push(nuevaTarea);
        guardarTareas();
        renderizarTareas();
        modal.classList.add("hidden");  // Cerrar modal tras guardar
    });

    function agregarTarea(tarea, index, guardar = true) {
        // **Crear elemento de la tarea**
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        // **Crear el círculo rojo para marcar como completada**
        const circle = document.createElement("span");
        circle.classList.add("circle");
        circle.innerHTML = "✔";

        // **Botón para editar la tarea**
        const editButton = document.createElement("button");
        editButton.classList.add("edit-btn");
        editButton.innerHTML = "🔄"; 

        // **Crear el texto de la tarea**
        const taskText = document.createElement("div");
        taskText.classList.add("task");
        taskText.textContent = tarea.descripcion;

        // **Evento para marcar la tarea como completada**
        circle.addEventListener("click", function () {
            tareas.splice(index, 1);
            guardarTareas();
            renderizarTareas();
        });

        // **Abrir modal de edición**
        editButton.addEventListener("click", function () {
            editIndex = index;
            editDesc.value = tarea.descripcion;

            // **Mostrar u ocultar fecha y observación según la tarea**
            if (tarea.fechaLimite) {
                editDateField.classList.remove("hidden");
                editDate.value = tarea.fechaLimite;
            } else {
                editDateField.classList.add("hidden");
                editDate.value = "";
            }

            if (tarea.observacion) {
                editObsField.classList.remove("hidden");
                editObs.value = tarea.observacion;
            } else {
                editObsField.classList.add("hidden");
                editObs.value = "";
            }

            editModal.classList.remove("hidden");
        });

       // **Mostrar detalles en modal en lugar de alert**
        // editButton.addEventListener("click", function () {
        //     const nuevaDescripcion = prompt("Editar tarea:", tarea.descripcion);
        //     if (nuevaDescripcion !== null && nuevaDescripcion.trim() !== "") {
        //         tarea.descripcion = nuevaDescripcion.trim();
        //         guardarTareas();
        //         renderizarTareas();
        //     }
        // });

        // **Mostrar detalles en modal en lugar de alert**
        taskText.addEventListener("click", function () {
            taskDescModal.textContent = tarea.descripcion;
            taskCreatedModal.textContent = tarea.fechaCreacion;
            taskDeadlineModal.textContent = tarea.fechaLimite || "Sin definir";
            taskObsModal.textContent = tarea.observacion || "Ninguna";
            detailsModal.classList.remove("hidden");
        });

        // **Agregar elementos a la tarea**
        taskItem.appendChild(circle);
        taskItem.appendChild(taskText);
        taskItem.appendChild(editButton);
        taskContainer.appendChild(taskItem);

        //    // **Guardar cambios al editar tarea**
        // saveEditBtn.addEventListener("click", function () {
        //     if (editIndex !== null) {
        //         tareas[editIndex].descripcion = editDesc.value.trim();
        //         tareas[editIndex].fechaLimite = editDate.value || null;
        //         tareas[editIndex].observacion = editObs.value.trim() || null;
        //         guardarTareas();
        //         renderizarTareas();
        //         editModal.classList.add("hidden");
        //     }
        // });

        // // **Agregar tarea a la lista lateral**
        // const taskListItem = document.createElement("li");
        // taskListItem.classList.add("task-list-item");
        // taskListItem.textContent = `${index + 1}. ${tarea.descripcion}`;

        // taskListItem.addEventListener("click", function () {
        //     mostrarDetallesTarea(tarea);
        // });

        // taskList.appendChild(taskListItem);

        if (guardar) {
            tareas.push(tarea);
            guardarTareas();
        }
    }

   
    

    // **Cerrar modal de detalles**
    closeDetailsModal.addEventListener("click", function () {
        detailsModal.classList.add("hidden");
    });

    window.addEventListener("click", function (event) {
        if (event.target === detailsModal) {
            detailsModal.classList.add("hidden");
        }
    });

    // **Renderizar tareas al cargar la página**
    renderizarTareas();
    verificarAlarmas();
});
function verificarAlarmas() {
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    let ahora = new Date();

    const taskListItems = document.querySelectorAll(".task-list-item");

    tareas.forEach((tarea, index) => {
        if (tarea.fechaLimite && new Date(tarea.fechaLimite) < ahora) {
            if (taskListItems[index]) {
                taskListItems[index].style.color = "red";
                taskListItems[index].style.fontWeight = "bold";
            }
        }
    });
}



setInterval(verificarAlarmas, 30000);  // Se ejecuta cada 30 segundos


