# 🔐 Generador de Contraseñas Seguras
### 🚀 Aplicación Web Profesional desarrollada con HTML5, CSS3 y JavaScript Vanilla

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![WCAG 2.1](https://img.shields.io/badge/Accesible-WCAG_2.1-005A9C?style=for-the-badge)
![Web Crypto API](https://img.shields.io/badge/Crypto.getRandomValues-Seguro-0A84FF?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Generador de contraseñas moderno, seguro y accesible, construido sin frameworks y siguiendo estándares profesionales de ingeniería frontend.**

[Ver demo](#) · [Reportar error](#) · [Solicitar función](#)

</div>

---

## 📋 Descripción General

El **Generador de Contraseñas Seguras** es una aplicación web creada para concebir contraseñas aleatorias, robustas y adaptadas a las necesidades exactas del usuario. 

Está desarrollada exclusivamente con tecnologías nativas del navegador (**JavaScript Vanilla**) y cumple estrictamente con las especificaciones definidas en el archivo `AGENTS.md`. 

A diferencia de las soluciones comunes que utilizan `Math.random()`, esta aplicación implementa la **Web Crypto API** (`crypto.getRandomValues`) para garantizar una aleatoriedad criptográficamente segura, mitigando cualquier riesgo de predictibilidad.

### ✨ Enfoque de Diseño y UX:
* Minimalista, moderno y limpio con estética *Glassmorphism*.
* Arquitectura responsiva optimizada para móviles y escritorio.
* Paleta cromática basada en tonos azules y fríos (`#3b82f6`, `#06b6d4`, `#060d1f`).
* Accesibilidad nativa bajo el estándar **WCAG 2.1**.

---

## ✨ Funcionalidades Principales

| Funcionalidad | Estado | Descripción |
| :--- | :---: | :--- |
| **📏 Longitud ajustable** | ✅ | Slider intuitivo de 6 a 64 caracteres con un badge de conteo dinámico. |
| **🔠 Mayúsculas** | ✅ | Permite activar o desactivar letras en el rango `A–Z`. |
| **🔡 Minúsculas** | ✅ | Permite activar o desactivar letras en el rango `a–z`. |
| **🔢 Números** | ✅ | Permite activar o desactivar dígitos en el rango `0–9`. |
| **✳️ Caracteres especiales** | ✅ | Inclusión/exclusión de símbolos seguros (`!@#$%^&*()-_=+[]{}|;:,.<>?`). |
| **🎲 Generación segura** | ✅ | Motor algorítmico basado en la API criptográfica del navegador. |
| **📋 Copiar al portapapeles** | ✅ | Integración con la Clipboard API ofreciendo feedback visual inmediato. |
| **👁️ Mostrar / Ocultar** | ✅ | Alternancia fluida entre texto plano y máscara de contraseña de tipo `password`. |
| **💪 Indicador de fortaleza** | ✅ | Algoritmo visual de evaluación reactiva en tiempo real con 4 niveles. |

---

## ⚙️ Cómo Funciona cada Opción

### 📏 Longitud
El slider controla cuántos caracteres tendrá la contraseña. El rango va de **6** (mínima seguridad) a **64** caracteres (máxima seguridad). La longitud recomendada para cuentas importantes es **mínimo 16 caracteres**.

### 🔠 Mayúsculas / 🔡 Minúsculas
Incluir ambas categorías aumenta el espacio de caracteres posibles, dificultando los ataques de fuerza bruta. Se recomienda activar ambas.

### 🔢 Números
Los dígitos del 0 al 9 aumentan significativamente la entropía de la contraseña. Es una práctica recomendada en todas las políticas de seguridad modernas.

### ✳️ Caracteres especiales
Símbolos complejos hacen que la contraseña sea exponencialmente más difícil de descifrar mediante tablas de arcoíris.

> ⚠️ **Nota**: Al menos un tipo de carácter debe estar activo para generar la contraseña. Si se desmarcan todos los parámetros, el sistema interrumpe la generación y lanza un mensaje controlado de error.

### 💪 Indicador de Fortaleza
El indicador evalúa la contraseña en tiempo real combinando la longitud total (≥8, ≥12, ≥20 caracteres) y la presencia de diferentes tipos de conjuntos activos:

| Nivel | Puntuación | Color | Estado visual |
| :--- | :---: | :---: | :--- |
| **Muy débil** | ≤1 | 🔴 Rojo | Contraseña crítica o inferior a 8 caracteres. |
| **Aceptable** | 2–3 | 🟡 Amarillo | Longitud regular con pocos conjuntos de caracteres. |
| **Buena** | 4 | 🔵 Azul | Longitud equilibrada (ej. 12 caracteres con mezcla). |
| **Muy fuerte** | 5–6 | 🟢 Verde | Seguridad máxima (≥16 caracteres combinando todo). |

---

## 🔒 Seguridad Técnica

Para garantizar la invulnerabilidad de los strings generados frente a ataques predictivos, la lógica de negocio se apoya en:

```javascript
// Generación criptográfica nativa sin sesgos estadísticos
const array = new Uint32Array(1);
window.crypto.getRandomValues(array);

Pilares de Seguridad:

Aleatoriedad Criptográfica: Uso estricto de la Web Crypto API (CSPRNG) disponible en navegadores modernos en lugar del motor pseudoaleatorio de Math.random(), el cual es predecible.
Algoritmo Fisher-Yates: Los caracteres seleccionados finales se someten a un Fisher-Yates Shuffle para barajar el resultado de forma uniforme y equitativa, garantizando que no haya posiciones predecibles en el string.
Privacidad Absoluta: Cero dependencias externas.
La aplicación funciona al 100% en el cliente de forma aislada sin enviar logs ni datos a servidores.

🧪 Pruebas de Calidad Realizadas

✔️ Test 1 — Carga inicial: Despliegue correcto del fondo azul oscuro con efecto glassmorphism. Contraseña auto-generada por defecto, slider inicializado en 12, indicador en estado "Buena" y consola limpia de advertencias.
✔️ Test 2 — Generación: Flujo correcto al solicitar nuevos caracteres con reactividad inmediata en el indicador de fortaleza.
✔️ Test 3 — Mostrar/Ocultar: El input de salida conmuta de manera segura entre los atributos password y text. El icono visual y el atributo de accesibilidad aria-label se actualizan de forma síncrona.
✔️ Test 4 — Copiar: Feedback visual reactivo que muestra el mensaje “✓ Copiada al portapapeles” y transforma el icono a un check, restaurando su estado original tras un delay de 2 segundos.
✔️ Test 5 — Slider: Modificación en tiempo real de la longitud con barra de progreso dinámica ajustada al recorrido del puntero.
✔️ Test 6 — Validación: Si el usuario desmarca todos los parámetros de caracteres, el sistema interrumpe la generación y lanza un mensaje controlado de error.
✔️ Test 7 — Consola: 0 errores y 0 warnings en las herramientas de desarrollo.

🎨 Diseño, Estilos y Accesibilidad

(♿)La interfaz se ha diseñado bajo una metodología Mobile-First utilizando exclusivamente CSS avanzado:Layouts: Combinación fluida de Flexbox y CSS Grid para la correcta distribución de los paneles de forma responsiva.

Tipografía e Iconos: Implementación de la fuente tipográfica Inter (Google Fonts) y animaciones de transición suaves.Dimensionamiento: Escalado del Layout basado en unidades relativas rem con base corregida (1rem = 10px mediante font-size: 62.5% en :root).

Estándares WCAG 2.1 Incorporados:Uso de regiones aria-live (role="status", role="alert") para anunciar de forma auditiva cambios dinámicos y alertas.Etiquetas semánticas y aria-label descriptivos en todos los controles interactivos y botones basados puramente en iconos.

Estilos definidos para el foco (:focus-visible) garantizando una excelente experiencia a usuarios que navegan mediante teclado.
Respeto a las preferencias del sistema mediante la media query prefers-reduced-motion.

🖥️ Requisitos TécnicosRequisitoDetalleNavegadorChrome 37+, Firefox 21+, Safari 7+, Edge 12+JavaScriptHabilitado (necesario para la lógica de generación)ConexiónSolo para cargar la fuente externa de Google Fonts (Inter)ServidorNo requerido — funciona localmente como archivo estático independienteDependenciasNinguna — Código 100% nativo

📁 Estructura del ProyectoEl código está modularizado para mantener separadas las responsabilidades de diseño y lógica:Bash02-pass-generator/
│
├── index.html        # Estructura HTML5 semántica y marcado accesible
├── AGENTS.md         # Archivo de especificaciones y directrices del proyecto
├── README.md         # Documentación principal (Este archivo)
│
└── assets/
    ├── css/
    │   └── styles.css # Variables de CSS3, Glassmorphism, Responsive y Animaciones
    ├── js/
    │   └── app.js     # Motor lógico CSPRNG, Fisher-Yates y manejo del DOM
    └── images/        # Directorio para recursos gráficos e imágenes futuros

🚀 Cómo Usar la Aplicación

Clona o descarga el repositorio y abre el archivo index.html directamente en tu navegador preferido.

Ajusta la longitud deseada deslizando el control horizontal (valor recomendado: 16–24).
Selecciona tus preferencias activando o desactivando las casillas de verificación (Mayúsculas, Minúsculas, Números, Especiales).
Haz clic en Generar contraseña.
Evalúa la robustez visual con el indicador de fortaleza.
Usa el botón de ojo para mostrar u ocultar los caracteres.
Haz clic en el botón de copiar para enviarla directamente a tu portapapeles.

👨‍💻 Créditos y Autoría

Desarrollado por Yoangel-dev Soluciones WebExperto en Desarrollo Web y Consultoría SAP ERP.
Especializado en aplicaciones web modernas, accesibles y de alto rendimiento.

© 2026 Yoangel-dev Soluciones Web — Todos los derechos reservados.
