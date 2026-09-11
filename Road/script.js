document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los items de la línea de tiempo
    const timelineItems = document.querySelectorAll('.timeline-item');

    // Configuración del observer
    const observerOptions = {
        threshold: 0.2, // Se activa cuando el 20% del elemento es visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Agregar clase CSS que activa la animación
                entry.target.classList.add('show');
                // Dejar de observar una vez que ya apareció
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Asignar el observer a cada elemento
    timelineItems.forEach(item => {
        observer.observe(item);
    });
});