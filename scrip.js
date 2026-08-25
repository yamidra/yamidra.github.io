document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');

  // Expresión regular para validar formato de correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Función para mostrar un error en un campo específico
  function showError(inputElement, message) {
    const formGroup = inputElement.parentElement;
    const errorSpan = formGroup.querySelector('.error-message');

    formGroup.classList.add('has-error');
    if (errorSpan) {
      errorSpan.textContent = message;
    }
  }

  // Función para limpiar el error de un campo
  function clearError(inputElement) {
    const formGroup = inputElement.parentElement;
    const errorSpan = formGroup.querySelector('.error-message');

    formGroup.classList.remove('has-error');
    if (errorSpan) {
      errorSpan.textContent = '';
    }
  }

  // Validación individual por cada campo
  function validateField(field) {
    const value = field.value.trim();

    // 1. Campo vacío (requerido)
    if (value === '') {
      const fieldName = field.previousElementSibling.textContent.replace(' *', '');
      showError(field, `El campo ${fieldName.toLowerCase()} es obligatorio.`);
      return false;
    }

    // 2. Validación específica para Email
    if (field.type === 'email' && !emailRegex.test(value)) {
      showError(field, 'Por favor, ingresa un correo electrónico válido.');
      return false;
    }

    // 3. Si pasa las validaciones, limpia el error
    clearError(field);
    return true;
  }

  // Validar en tiempo real conforme el usuario escribe o sale del campo
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.parentElement.classList.contains('has-error')) {
        validateField(input);
      }
    });
  });

  // Manejador del evento Submit
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Detiene el envío predeterminado

    let isValid = true;

    // Valida todos los campos al intentar enviar
    inputs.forEach(input => {
      const fieldValid = validateField(input);
      if (!fieldValid) {
        isValid = false;
      }
    });

    if (isValid) {
      alert('¡Formulario validado y enviado con éxito!');
      form.reset(); // Limpia los campos del formulario
    }
  });
});