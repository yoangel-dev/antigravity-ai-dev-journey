# 🔐 Generador de Contraseñas Seguras
<<<<<<< HEAD
### 🚀 Aplicación Web Profesional desarrollada con HTML5, CSS3 y JavaScript Vanilla

<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Accesible-WCAG_2.1-005A9C?style=for-the-badge" alt="WCAG 2.1">
  <img src="https://img.shields.io/badge/Crypto.getRandomValues-Seguro-0A84FF?style=for-the-badge" alt="Web Crypto API">

  <p><em>Generador de contraseñas moderno, seguro y accesible, construido sin frameworks y siguiendo estándares profesionales de ingeniería frontend.</em></p>
=======

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![WCAG](https://img.shields.io/badge/WCAG-Accessible-005A9C?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Una aplicación web moderna y segura para generar contraseñas aleatorias de alta calidad.**

[Ver demo](#) · [Reportar error](#) · [Solicitar función](#)

>>>>>>> a6704eb (Add 02-pass-generator project with full documentation (README.md) — Desarrollado por Yoangel-dev Soluciones Web)
</div>

---

<<<<<<< HEAD
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
=======
## 📋 Descripción

**Generador de Contraseñas Seguras** es una herramienta web desarrollada con tecnologías nativas del navegador (HTML5, CSS3 y JavaScript Vanilla) que permite crear contraseñas aleatorias y robustas de forma rápida e intuitiva.

La generación de contraseñas utiliza la **Web Crypto API** (`crypto.getRandomValues`), que garantiza aleatoriedad criptográficamente segura, evitando los sesgos típicos de `Math.random()`.

El diseño es **minimalista, moderno y accesible**, con una estética glassmorphism en tonos azul frío, adaptado completamente a dispositivos móviles y de escritorio.

---

## ✨ Funcionalidades

| Funcionalidad | Descripción |
|--------------|-------------|
| 📏 **Longitud ajustable** | Slider interactivo para elegir entre 6 y 64 caracteres |
| 🔠 **Mayúsculas** | Activa o desactiva letras en mayúscula (A–Z) |
| 🔡 **Minúsculas** | Activa o desactiva letras en minúscula (a–z) |
| 🔢 **Números** | Activa o desactiva dígitos (0–9) |
| ✳️ **Caracteres especiales** | Activa o desactiva símbolos como `!@#$%^&*` |
| 🎲 **Generación aleatoria** | Genera una contraseña criptográficamente segura |
| 📋 **Copiar al portapapeles** | Copia la contraseña con un clic vía Clipboard API |
| 👁️ **Mostrar / Ocultar** | Alterna la visibilidad de la contraseña generada |
| 💪 **Indicador de fortaleza** | Muestra el nivel: Muy débil, Aceptable, Buena o Muy fuerte |

---

## 🚀 Cómo usar la aplicación

1. **Abre** el archivo `index.html` en tu navegador (o despliégalo en un servidor).
2. **Ajusta la longitud** de la contraseña moviendo el slider (valor recomendado: 16–24).
3. **Activa o desactiva** los tipos de caracteres según tus necesidades.
4. **Haz clic en "Generar contraseña"** para obtener una nueva contraseña segura.
5. **Revisa el indicador de fortaleza** para evaluar la robustez de la contraseña.
6. **Usa el botón de ojo** para ver la contraseña completa o mantenerla oculta.
7. **Haz clic en el botón de copiar** para guardarla en el portapapeles.

---

## ⚙️ Cómo funciona cada opción

### 📏 Longitud
El slider controla cuántos caracteres tendrá la contraseña. El rango va de **6** (mínima seguridad) a **64** caracteres (máxima seguridad). La longitud recomendada para cuentas importantes es **mínimo 16 caracteres**.

### 🔠 Mayúsculas / 🔡 Minúsculas
Incluir ambas categorías aumenta el espacio de caracteres posibles, dificultando los ataques de fuerza bruta. Se recomienda activar ambas.

### 🔢 Números
Los dígitos del 0 al 9 aumentan significativamente la entropía de la contraseña. Es una práctica recomendada en todas las políticas de seguridad modernas.

### ✳️ Caracteres especiales
Símbolos como `! @ # $ % ^ & * ( ) - _ = + [ ] { } | ; : , . < > ?` hacen que la contraseña sea exponencialmente más difícil de descifrar.

> ⚠️ **Nota**: Al menos un tipo de carácter debe estar activo para generar la contraseña.

### 💪 Indicador de fortaleza
El indicador evalúa la contraseña en tiempo real según:
- Longitud (≥8, ≥12, ≥20 caracteres)
- Variedad de tipos (mayúsculas + minúsculas)
- Presencia de números
- Presencia de símbolos

| Nivel | Puntuación | Color |
|-------|-----------|-------|
| Muy débil  | ≤1 | 🔴 Rojo |
| Aceptable  | 2–3 | 🟡 Amarillo |
| Buena      | 4 | 🔵 Azul |
| Muy fuerte | 5–6 | 🟢 Verde |

---

## 🔒 Seguridad técnica

La generación de números aleatorios utiliza:

```javascript
crypto.getRandomValues(new Uint32Array(1));
```

Esto garantiza **aleatoriedad criptográficamente segura** (CSPRNG) disponible en todos los navegadores modernos, a diferencia de `Math.random()` que es predecible.

Adicionalmente, se aplica el **algoritmo Fisher-Yates** para mezclar los caracteres de forma imparcial, garantizando que no haya posiciones predecibles aunque se usen caracteres obligatorios por grupo.

---

## 🖥️ Requisitos técnicos

| Requisito | Detalle |
|----------|---------|
| **Navegador** | Chrome 37+, Firefox 21+, Safari 7+, Edge 12+ |
| **JavaScript** | Habilitado (necesario para la generación) |
| **Conexión** | Solo para cargar la fuente de Google Fonts (Inter) |
| **Servidor** | No requerido — funciona como archivo estático |
| **Dependencias** | Ninguna — 100% nativo |

---

## 📁 Estructura del proyecto

```
02-pass-generator/
│
├── 📄 index.html          # Estructura HTML5 semántica y accesible
├── 📄 AGENTS.md           # Especificaciones del proyecto para el agente IA
├── 📄 README.md           # Documentación del proyecto
│
└── 📂 assets/
    ├── 📂 css/
    │   └── styles.css     # Estilos CSS3 nativos (glassmorphism, responsive)
    ├── 📂 js/
    │   └── app.js         # Lógica JavaScript Vanilla (sin frameworks)
    └── 📂 images/
        └── (vacío)        # Directorio para recursos de imagen futuros
```

---

## 🎨 Diseño y tecnologías

- **HTML5** semántico con roles ARIA y atributos de accesibilidad (WCAG 2.1)
- **CSS3** con variables personalizadas, flexbox, CSS grid, glassmorphism y animaciones
- **JavaScript** Vanilla con Web Crypto API, Clipboard API y Fisher-Yates shuffle
- **Tipografía**: Inter (Google Fonts)
- **Paleta**: azules fríos (`#3b82f6`, `#06b6d4`, `#060d1f`)
- **Base rem**: `1rem = 10px` (`font-size: 62.5%` en `:root`)

---

## ♿ Accesibilidad (WCAG)

- Roles ARIA correctos (`role="status"`, `role="alert"`, `aria-live`)
- Labels descriptivos en todos los controles interactivos
- Soporte completo de navegación por teclado (`focus-visible`)
- Compatibilidad con `prefers-reduced-motion`
- Contraste de colores adecuado (mínimo AA)
- Estructura de encabezados correcta (`h1` único por página)

---

## 👨‍💻 Créditos y autoría

<div align="center">

**Desarrollado por [Yoangel-dev Soluciones Web](https://github.com/yoangel-dev)**

*Experto en desarrollo web con 12 años de experiencia.*  
*Especializado en aplicaciones web modernas, accesibles y de alto rendimiento.*

---

© 2024 Yoangel-dev Soluciones Web. Todos los derechos reservados.

>>>>>>> a6704eb (Add 02-pass-generator project with full documentation (README.md) — Desarrollado por Yoangel-dev Soluciones Web)
</div>
