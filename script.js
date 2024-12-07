const draggables = document.querySelectorAll('.draggable');
const dropZones = document.querySelectorAll('.drop-zone');

// Manejadores de eventos para el arrastre
draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
});

dropZones.forEach(dropZone => {
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    dropZone.addEventListener('drop', () => {
        const dragging = document.querySelector('.dragging');

        // Verificar si el Pokémon es correcto
        if ((dropZone.id === "pikachuZone" && dragging.id === "drag1") ||
            (dropZone.id === "bulbasaurZone" && dragging.id === "drag2") ||
            (dropZone.id === "celebiZone" && dragging.id === "drag3") ||
            (dropZone.id === "diancieZone" && dragging.id === "drag4") ||
            (dropZone.id === "lucarioZone" && dragging.id === "drag5") ||
            (dropZone.id === "rayquazaZone" && dragging.id === "drag6")) {
            dropZone.appendChild(dragging);

            // Comprobar si todas las zonas tienen un Pokémon
            if (checkAllZonesCorrect()) {
                showCongratsMessage();
            } else {
                showSuccess();
            }
        } else {
            // Mostrar "X" roja si es incorrecto
            showError();
        }
    });
});

// Función para verificar si todas las zonas están correctas
function checkAllZonesCorrect() {
    return (
        document.querySelector('#pikachuZone .draggable')?.id === "drag1" &&
        document.querySelector('#bulbasaurZone .draggable')?.id === "drag2" &&
        document.querySelector('#celebiZone .draggable')?.id === "drag3" &&
        document.querySelector('#diancieZone .draggable')?.id === "drag4" &&
        document.querySelector('#lucarioZone .draggable')?.id === "drag5" &&
        document.querySelector('#rayquazaZone .draggable')?.id === "drag6"
    );
}

// Función para mostrar el mensaje de felicitación y reiniciar
function showCongratsMessage() {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';

    const message = document.createElement('p');
    message.textContent = '¡Muy bien! Felicidades ';

    const retryButton = document.createElement('button');
    retryButton.textContent = 'Jugar otra vez';
    retryButton.addEventListener('click', resetGame);

    messageContainer.appendChild(message);
    messageContainer.appendChild(retryButton);
    document.body.appendChild(messageContainer);
}

// Función para reiniciar el juego con elementos aleatorios
function resetGame() {
    const messageContainer = document.querySelector('.message-container');
    if (messageContainer) {
        messageContainer.remove();
    }

    // Reorganizar imágenes y zonas de forma aleatoria
    shuffleElements(document.querySelector('.container'), draggables);
    shuffleElements(document.querySelector('.drop-zones'), dropZones);
}

// Función para mostrar una palomita verde
function showSuccess() {
    const success = document.createElement('div');
    success.className = 'success-message';
    success.textContent = '✔';

    document.body.appendChild(success);

    // Eliminar la palomita después de 1 segundo
    setTimeout(() => {
        success.remove();
    }, 1000);
}

// Función para mostrar una "X" roja
function showError() {
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = '✖';

    document.body.appendChild(error);

    // Eliminar la "X" después de 1 segundo
    setTimeout(() => {
        error.remove();
    }, 1000);
}

// Función para mezclar elementos dentro de un contenedor
function shuffleElements(container, elements) {
    const shuffled = Array.from(elements)
        .sort(() => Math.random() - 0.5);
    shuffled.forEach(el => container.appendChild(el));
}
