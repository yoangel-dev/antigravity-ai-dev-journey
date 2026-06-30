# 🔐 Generador de Contraseñas Seguras
### 🚀 Aplicación Web Profesional desarrollada con HTML5, CSS3 y JavaScript Vanilla

<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Accesible-WCAG_2.1-005A9C?style=for-the-badge" alt="WCAG 2.1">
  <img src="https://img.shields.io/badge/Crypto.getRandomValues-Seguro-0A84FF?style=for-the-badge" alt="Web Crypto API">

  <p><em>Generador de contraseñas moderno, seguro y accesible, construido sin frameworks y siguiendo estándares profesionales de ingeniería frontend.</em></p>
</div>

---

## 📋 Descripción General

El **Generador de Contraseñas Seguras** es una aplicación web creada para concebir contraseñas aleatorias, robustas y adaptadas a las necesidades exactas del usuario. 

Está desarrollada exclusivamente con tecnologías nativas del navegador (**JavaScript Vanilla**) y cumple estrictamente con las especificaciones definidas en el archivo `AGENTS.md`. 

A diferencia de las soluciones comunes que utilizan `Math.random()`, esta aplicación implementa la **Web Crypto API** (`crypto.getRandomValues`) para garantizar una aleatoriedad criptográficamente segura, mitigando cualquier riesgo de predictibilidad.

### ✨ Enfoque de Diseño:
* Minimalista, moderno y limpio con estética *Glassmorphism*.
* Arquitectura responsiva optimizada para móviles y escritorio.
* Paleta cromática basada en tonos azules y fríos.
* Accesibilidad nativa bajo el estándar **WCAG 2.1**.

---

## ✨ Funcionalidades Principales

| Funcionalidad | Estado | Descripción |
| :--- | :---: | :--- |
| **📏 Longitud ajustable** | ✅ | Slider intuitivo de 6 a 64 caracteres con un badge de conteo dinámico. |
| **🔠 Mayúsculas** | ✅ | Permite activar o desactivar letras en el rango `A–Z`. |
| **🔡 Minúsculas** | ✅ | Permite activar o desactivar letras en el rango `a–z`. |
| **🔢 Números** | ✅ | Permite activar o desactivar dígitos en el rango `0–9`. |
| **✳️ Caracteres especiales** | ✅ | Inclusión/exclusión de símbolos seguros (`!@#$%^&*`, etc.). |
| **🎲 Generación segura** | ✅ | Motor algorítmico basado en la API criptográfica del navegador. |
| **📋 Copiar al portapapeles** | ✅ | Integración con la Clipboard API ofreciendo feedback visual inmediato. |
| **👁️ Mostrar / Ocultar** | ✅ | Alternancia fluida entre texto plano y máscara de contraseña de tipo `password`. |
| **💪 Indicador de fortaleza** | ✅ | Algoritmo visual de evaluación reactiva con 4 niveles (*Muy débil* → *Muy fuerte*). |

---

## 🔒 Seguridad Técnica

Para garantizar la invulnerabilidad de los strings generados frente a ataques predictivos, la lógica de negocio se apoya en:

```javascript
// Generación criptográfica nativa sin sesgos estadísticos
const array = new Uint32Array(1);
window.crypto.getRandomValues(array);

Pilares de Seguridad:Aleatoriedad criptográfica: Uso estricto de la Web Crypto API en lugar del motor pseudoaleatorio de Math.random().
Algoritmo Fisher-Yates: Los caracteres seleccionados finales se someten a un Fisher-Yates Shuffle para barajar el resultado de forma uniforme y equitativa.
Compatibilidad total: Arquitectura moderna soportada nativamente por navegadores actuales sin requerir dependencias externas.

🧪 Pruebas de Calidad Realizadas

✔️ Test 1 — Carga inicial: Despliegue correcto del fondo azul oscuro con efecto glassmorphism. Contraseña auto-generada por defecto, slider inicializado en 12, indicador en estado "Buena" y consola limpia de advertencias.
✔️ Test 2 — Generación: Flujo correcto al solicitar nuevos caracteres con reactividad inmediata en el indicador de fortaleza.
✔️ Test 3 — Mostrar/Ocultar: El input de salida conmuta de manera segura entre los atributos password y text. El icono visual y el atributo de accesibilidad aria-label se actualizan de forma síncrona.
✔️ Test 4 — Copiar: Feedback visual reactivo que muestra el mensaje "✓ Copiada al portapapeles" y transforma el icono a un check, restaurando su estado original tras un delay de 2 segundos.
✔️ Test 5 — Slider: Modificación en tiempo real de la longitud con barra de progreso dinámica ajustada al recorrido del puntero.
✔️ Test 6 — Validación: Si el usuario desmarca todos los parámetros de caracteres, el sistema interrumpe la generación y lanza un mensaje controlado de error.
✔️ Test 7 — Consola: 0 errores y 0 warnings en las herramientas de desarrollo.

🎨 Diseño, Estilos y Accesibilidad

(♿)La interfaz se ha diseñado bajo una metodología Mobile-First utilizando exclusivamente CSS avanzado:Layouts: Combinación fluida de Flexbox y CSS Grid para la distribución de los paneles.

Tipografía e Iconos: Implementación de la fuente tipográfica Inter y animaciones de transición suaves.Dimensionamiento: Escalado del Layout basado en unidades relativas rem ($1\text{rem} = 10\text{px}$).
Estándares WCAG 2.1 Incorporados:Uso de regiones aria-live para anunciar de forma auditiva cambios dinámicos (como la copia exitosa).Etiquetas semánticas aria-label descriptivas en botones basados puramente en iconos.
Estilos definidos para el foco (:focus-visible) garantizando una excelente experiencia a usuarios que navegan mediante teclado.Respeto a las preferencias del sistema mediante la media query prefers-reduced-motion.

📁 Estructura del ProyectoEl código está modularizado para mantener separadas las responsabilidades de diseño y lógica:Bash02-pass-generator/
│
├── index.html        # Estructura semántica de la aplicación
├── AGENTS.md         # Archivo de especificaciones y directrices del proyecto
├── README.md         # Documentación principal (Este archivo)
│
└── assets/
    ├── css/
    │   └── styles.css # Diseño, variables y animaciones de la interfaz
    ├── js/
    │   └── app.js     # Motor lógico de generación y manejo del DOM
    └── images/        # Recursos gráficos y assets visuales

🚀 Cómo Usar la Aplicación

Clona o descarga el repositorio y abre el archivo index.html directamente en tu navegador preferido.
Ajusta la longitud deseada deslizando el control horizontal.
Selecciona tus preferencias activando o desactivando las casillas de verificación (Mayúsculas, Minúsculas, Números, Especiales).
Haz clic en Generar contraseña.Evalúa la robustez visual con el indicador de fortaleza.
Haz clic en el botón de copiar para enviarla directamente a tu portapapeles o usa el icono del ojo si deseas verificar visualmente los caracteres.

---

## 👨‍💻 Autoría

<div align="center">
  <p><strong>Desarrollado por Yoangel-dev Soluciones Web</strong></p>
  <p><em>Ingeniería frontend enfocada en soluciones modernas, accesibles y de alto rendimiento.</em></p>
  
  <a href="https://github.com/yoangel-dev" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Profile">
  </a>

  <br><br>
  <sub>© 2026 Yoangel-dev Soluciones Web — Todos los derechos reservados.</sub>
</div>
