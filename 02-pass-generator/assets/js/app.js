/**
 * app.js — Generador de Contraseñas Seguras
 * Autor: Yoangel-dev Soluciones Web
 *
 * Funcionalidades:
 *  - Generar contraseñas usando crypto.getRandomValues (seguro)
 *  - Configurar longitud, mayúsculas, minúsculas, números y especiales
 *  - Mostrar / ocultar la contraseña generada
 *  - Copiar la contraseña al portapapeles (Clipboard API)
 *  - Indicador de fortaleza con 4 niveles (débil, media, buena, fuerte)
 *  - Slider personalizado con progreso dinámico
 *  - Todo el feedback es visual (sin alert, confirm, prompt)
 *  - Sin innerHTML: uso de createElement / appendChild
 */

'use strict';

/* ==========================================================
   1. Constantes de conjuntos de caracteres
========================================================== */
const CHARS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers:   '0123456789',
  symbols:   '!@#$%^&*()-_=+[]{}|;:,.<>?',
};

/* ==========================================================
   2. Referencias al DOM
========================================================== */
const DOM = {
  // Formulario
  form:               document.getElementById('options-form'),
  // Slider de longitud
  lengthSlider:       document.getElementById('length-slider'),
  lengthValue:        document.getElementById('length-value'),
  // Checkboxes
  chkUppercase:       document.getElementById('chk-uppercase'),
  chkLowercase:       document.getElementById('chk-lowercase'),
  chkNumbers:         document.getElementById('chk-numbers'),
  chkSymbols:         document.getElementById('chk-symbols'),
  // Campo de contraseña
  passwordOutput:     document.getElementById('password-output'),
  // Botón mostrar/ocultar
  btnToggleVis:       document.getElementById('btn-toggle-visibility'),
  iconEyeShow:        document.getElementById('icon-eye-show'),
  iconEyeHide:        document.getElementById('icon-eye-hide'),
  // Botón copiar
  btnCopy:            document.getElementById('btn-copy'),
  iconCopy:           document.getElementById('icon-copy'),
  iconCheck:          document.getElementById('icon-check'),
  copyFeedback:       document.getElementById('copy-feedback'),
  // Indicador de fortaleza
  strengthBars:       [
    document.getElementById('strength-bar-1'),
    document.getElementById('strength-bar-2'),
    document.getElementById('strength-bar-3'),
    document.getElementById('strength-bar-4'),
  ],
  strengthLabel:      document.getElementById('strength-label'),
  // Error del formulario
  formError:          document.getElementById('form-error'),
};

/* ==========================================================
   3. Estado de la aplicación
========================================================== */
const state = {
  password:  '',       // Contraseña actual
  visible:   false,    // Si la contraseña está visible
};

/* ==========================================================
   4. Generación de contraseña segura
========================================================== */

/**
 * Construye el conjunto de caracteres disponibles según las
 * opciones seleccionadas por el usuario.
 * @returns {string} Cadena con todos los caracteres posibles
 */
function buildCharset() {
  let charset = '';
  if (DOM.chkUppercase.checked) charset += CHARS.uppercase;
  if (DOM.chkLowercase.checked) charset += CHARS.lowercase;
  if (DOM.chkNumbers.checked)   charset += CHARS.numbers;
  if (DOM.chkSymbols.checked)   charset += CHARS.symbols;
  return charset;
}

/**
 * Genera un número entero aleatorio criptográficamente seguro
 * en el rango [0, max).
 * @param {number} max - Límite superior (exclusivo)
 * @returns {number}
 */
function getSecureRandom(max) {
  const randomValues = new Uint32Array(1);
  crypto.getRandomValues(randomValues);
  // Eliminamos el sesgo de módulo usando rechazo
  const limit = Math.floor(0xFFFFFFFF / max) * max;
  if (randomValues[0] >= limit) {
    return getSecureRandom(max); // Recursión hasta obtener valor válido
  }
  return randomValues[0] % max;
}

/**
 * Genera la contraseña aleatoria con los parámetros actuales.
 * Garantiza al menos un carácter de cada grupo activo (Fisher-Yates shuffle).
 * @param {string} charset - Conjunto de caracteres disponibles
 * @param {number} length  - Longitud deseada
 * @returns {string} Contraseña generada
 */
function generatePassword(charset, length) {
  // 1. Construir una lista de caracteres obligatorios (uno por grupo activo)
  const required = [];
  if (DOM.chkUppercase.checked) required.push(CHARS.uppercase[getSecureRandom(CHARS.uppercase.length)]);
  if (DOM.chkLowercase.checked) required.push(CHARS.lowercase[getSecureRandom(CHARS.lowercase.length)]);
  if (DOM.chkNumbers.checked)   required.push(CHARS.numbers[getSecureRandom(CHARS.numbers.length)]);
  if (DOM.chkSymbols.checked)   required.push(CHARS.symbols[getSecureRandom(CHARS.symbols.length)]);

  // 2. Rellenar el resto con caracteres aleatorios del charset completo
  const remaining = [];
  const remainingCount = length - required.length;
  for (let i = 0; i < remainingCount; i++) {
    remaining.push(charset[getSecureRandom(charset.length)]);
  }

  // 3. Combinar y mezclar con Fisher-Yates para evitar posiciones predecibles
  const combined = required.concat(remaining);
  for (let i = combined.length - 1; i > 0; i--) {
    const j = getSecureRandom(i + 1);
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }

  return combined.join('');
}

/* ==========================================================
   5. Indicador de fortaleza
========================================================== */

/**
 * Calcula la puntuación de fortaleza de la contraseña.
 * Criterios:
 *  - Longitud >= 8:  +1
 *  - Longitud >= 12: +1
 *  - Longitud >= 20: +1 adicional
 *  - Tiene mayúsculas y minúsculas: +1
 *  - Tiene números: +1
 *  - Tiene símbolos: +1
 *
 * @param {string} password
 * @returns {{ score: number, label: string, level: string }}
 */
function calculateStrength(password) {
  if (!password) {
    return { score: 0, label: '-', level: '' };
  }

  let score = 0;

  // Longitud
  if (password.length >= 8)  score++;
  if (password.length >= 12) score++;
  if (password.length >= 20) score++;

  // Variedad de caracteres
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  // Mapear score a nivel
  let label, level;
  if (score <= 1) {
    label = '🔴 Muy débil';
    level = 'weak';
  } else if (score <= 3) {
    label = '🟡 Aceptable';
    level = 'fair';
  } else if (score <= 4) {
    label = '🔵 Buena';
    level = 'good';
  } else {
    label = '🟢 Muy fuerte';
    level = 'strong';
  }

  return { score, label, level };
}

/**
 * Actualiza visualmente el indicador de fortaleza en el DOM.
 * @param {string} password
 */
function updateStrengthMeter(password) {
  const { score, label, level } = calculateStrength(password);

  // Número de barras activas según score (máx 4)
  const activeBars = !password ? 0 : Math.min(Math.ceil(score / 1.5), 4);

  // Limpiar todas las barras
  DOM.strengthBars.forEach(function(bar) {
    bar.className = 'strength-bar';
  });

  // Activar las barras correspondientes
  for (let i = 0; i < activeBars; i++) {
    DOM.strengthBars[i].classList.add('active--' + level);
  }

  // Limpiar clases de label anteriores
  DOM.strengthLabel.className = 'strength-meter__label';
  if (level) {
    DOM.strengthLabel.classList.add('label--' + level);
  }

  // Actualizar texto del label (sin innerHTML)
  DOM.strengthLabel.textContent = label;
}

/* ==========================================================
   6. Actualizar campo de contraseña en el DOM
========================================================== */

/**
 * Renderiza la contraseña en el campo de texto.
 * @param {string} password
 */
function renderPassword(password) {
  DOM.passwordOutput.value = password;
  // Actualizar el indicador de fortaleza
  updateStrengthMeter(password);
}

/* ==========================================================
   7. Mostrar / Ocultar contraseña
========================================================== */

/**
 * Alterna la visibilidad del campo de contraseña.
 * Intercambia el type entre "password" y "text".
 */
function togglePasswordVisibility() {
  state.visible = !state.visible;

  if (state.visible) {
    DOM.passwordOutput.setAttribute('type', 'text');
    DOM.btnToggleVis.setAttribute('aria-label', 'Ocultar contraseña');
    // Mostrar icono de "ocultar"
    DOM.iconEyeShow.classList.add('icon--hidden');
    DOM.iconEyeHide.classList.remove('icon--hidden');
  } else {
    DOM.passwordOutput.setAttribute('type', 'password');
    DOM.btnToggleVis.setAttribute('aria-label', 'Mostrar contraseña');
    // Mostrar icono de "mostrar"
    DOM.iconEyeShow.classList.remove('icon--hidden');
    DOM.iconEyeHide.classList.add('icon--hidden');
  }
}

/* ==========================================================
   8. Copiar al portapapeles
========================================================== */

/** Temporizador para ocultar el feedback de copia */
let copyFeedbackTimer = null;

/**
 * Muestra un mensaje de feedback temporal.
 * @param {string} message
 * @param {boolean} [isError=false]
 */
function showCopyFeedback(message, isError) {
  // Limpiar timer anterior si existe
  if (copyFeedbackTimer) {
    clearTimeout(copyFeedbackTimer);
  }

  DOM.copyFeedback.textContent = message;
  DOM.copyFeedback.classList.add('is-visible');

  if (isError) {
    DOM.copyFeedback.style.color = 'var(--color-weak)';
  } else {
    DOM.copyFeedback.style.color = '';
  }

  // Ocultar tras 2 segundos
  copyFeedbackTimer = setTimeout(function() {
    DOM.copyFeedback.classList.remove('is-visible');
    copyFeedbackTimer = null;
  }, 2000);
}

/**
 * Copia la contraseña actual al portapapeles usando la Clipboard API.
 * Muestra feedback visual en el DOM (nunca alert).
 */
function copyToClipboard() {
  const password = state.password;

  // Validar que haya una contraseña para copiar
  if (!password) {
    showCopyFeedback('⚠ Genera una contraseña primero', true);
    return;
  }

  navigator.clipboard.writeText(password)
    .then(function() {
      // Cambiar icono a check
      DOM.iconCopy.classList.add('icon--hidden');
      DOM.iconCheck.classList.remove('icon--hidden');

      showCopyFeedback('✓ Copiada al portapapeles');

      // Restaurar icono tras 2s
      setTimeout(function() {
        DOM.iconCopy.classList.remove('icon--hidden');
        DOM.iconCheck.classList.add('icon--hidden');
      }, 2000);
    })
    .catch(function() {
      showCopyFeedback('✕ No se pudo copiar. Inténtalo manualmente.', true);
    });
}

/* ==========================================================
   9. Actualizar el slider (progreso visual)
========================================================== */

/**
 * Actualiza el CSS custom property que controla el relleno
 * del slider (barra de progreso izquierda).
 * @param {HTMLInputElement} slider
 */
function updateSliderProgress(slider) {
  const min   = Number(slider.min);
  const max   = Number(slider.max);
  const value = Number(slider.value);
  const pct   = ((value - min) / (max - min)) * 100;
  slider.style.setProperty('--slider-progress', pct + '%');
  // Actualizar aria-valuenow para accesibilidad
  slider.setAttribute('aria-valuenow', value);
}

/* ==========================================================
   10. Validación del formulario
========================================================== */

/**
 * Muestra un mensaje de error de formulario.
 * @param {string} message
 */
function showFormError(message) {
  DOM.formError.textContent = message;
  DOM.formError.classList.add('is-visible');
}

/**
 * Oculta el mensaje de error del formulario.
 */
function hideFormError() {
  DOM.formError.classList.remove('is-visible');
  DOM.formError.textContent = '';
}

/**
 * Valida que al menos un tipo de carácter esté seleccionado.
 * @returns {boolean}
 */
function validateOptions() {
  const anyChecked = (
    DOM.chkUppercase.checked ||
    DOM.chkLowercase.checked ||
    DOM.chkNumbers.checked   ||
    DOM.chkSymbols.checked
  );
  return anyChecked;
}

/* ==========================================================
   11. Manejadores de eventos
========================================================== */

/**
 * Manejador del submit del formulario (botón "Generar").
 * Previene el comportamiento por defecto del form.
 * @param {Event} event
 */
function handleFormSubmit(event) {
  // Siempre prevenir el default del submit
  event.preventDefault();

  // Validar que al menos un tipo esté seleccionado
  if (!validateOptions()) {
    showFormError('⚠ Selecciona al menos un tipo de carácter.');
    return;
  }

  hideFormError();

  // Construir charset y generar contraseña
  const charset  = buildCharset();
  const length   = Number(DOM.lengthSlider.value);
  const password = generatePassword(charset, length);

  // Actualizar estado
  state.password = password;

  // Renderizar en el DOM
  renderPassword(password);
}

/**
 * Manejador del slider de longitud.
 * Actualiza la etiqueta y el progreso visual en tiempo real.
 */
function handleSliderInput() {
  const value = DOM.lengthSlider.value;
  // Actualizar badge de longitud
  DOM.lengthValue.textContent = value;
  // Actualizar progreso visual del slider
  updateSliderProgress(DOM.lengthSlider);
}

/**
 * Manejador del botón "Mostrar / Ocultar".
 * @param {Event} event
 */
function handleToggleVisibility(event) {
  event.preventDefault();
  togglePasswordVisibility();
}

/**
 * Manejador del botón "Copiar".
 * @param {Event} event
 */
function handleCopy(event) {
  event.preventDefault();
  copyToClipboard();
}

/* ==========================================================
   12. Inicialización
========================================================== */

/**
 * Inicializa la aplicación:
 * - Registra todos los eventos
 * - Actualiza el slider a su valor inicial
 * - Genera una contraseña inicial al cargar
 */
function init() {
  // Evento submit del formulario (botón generar)
  DOM.form.addEventListener('submit', handleFormSubmit);

  // Evento input del slider
  DOM.lengthSlider.addEventListener('input', handleSliderInput);

  // Evento botón mostrar/ocultar
  DOM.btnToggleVis.addEventListener('click', handleToggleVisibility);

  // Evento botón copiar
  DOM.btnCopy.addEventListener('click', handleCopy);

  // Inicializar progreso visual del slider
  updateSliderProgress(DOM.lengthSlider);

  // Generar una contraseña inicial al cargar la página
  const charset  = buildCharset();
  const length   = Number(DOM.lengthSlider.value);
  const password = generatePassword(charset, length);
  state.password = password;
  renderPassword(password);
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
