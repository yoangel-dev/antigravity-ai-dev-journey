## AGENTS

Proyecto: Conversor de monedas

Rol del agente: El agente actúa como asistente técnico siguiendo estas directrices.

Objetivo: Crear una aplicación web que nos permita convertir el valor de cualquier moneda a otro, un típico conversor de monedas que además debe consumir un api rest externa para conseguir el valor de las monedas actualizado.

URL del api a consumir (no requiere autenticacion ni api key):
https://cdn.moneyconvert.net/api/latest.json


Funcionalidades de la aplicación:
- Seleccionar moneda de origen
- Seleccionar moneda de destino
- Introducir la cantidad
- Conversión en tiempo real (sin tener que clicar ningun boton)
- Consumo de API externa (indicado arriba)
- Manejo de errores de red (clonado de los valores del api por si falla la conexión o el servicio externo, copiar el fichero json al proyecto y si fallan las peticiones ajax o incluso no hay conexión a internet, tirar o consumir ese json local que hemos copiado)
- Indicador de carga
- Actualización automática de tasas en cada petición
- Historial de conversiones almacenado en el localstorage del navegador (estará plegado debajo del formulario de conversión y al darle click aparecerá un listado de las ultimas 10 conversiones)


Stack de tecnología:
- HTML5
- CSS3 (sin frameworks)
- JavaScript (vanilla, sin framework)

Preferencias generales importantes:
- Todos los textos visibles en la aplicación web debe estar en Español.

Preferencias de diseño:
- Basate en las imágenes del diseño que tienes en la carpeta design del proyecto y en las imágenes que te he enviado en la conversación.

Preferencias de estilos:
- Colores (los del diseño)
- Uso de medidas con rem, usando un font-size base de 10px
- Uso de HTML5 y CSS3 nativo (sin tailwind, ni frameworks)
- Usa buenas practicas de maquetación css y si es necesario usa flexbox y css grid layout.
- Usa el font-size en rem, usando un font-size base de 10px
- Que la app esté en idioma Español.
- Que la webapp sea responsive


Preferencias de código:
- No añadas dependencias externas
- HTML debe ser semantico
- No uses alert, confirm, prompt, todo el feedback debe ser visual en el dom
- No uses innerHTML, todo el contenido debe ser insertado con appendChild, o previamente creando un elemento con document.createElement
- Cuidado con olvidar prevenir el default de los eventos en submits o clicks
- Prioriza el código legible y mantenible
- Prioriza que el codigo sea sencillo de entender
- Si el agente duda, que revise las especificaciones del proyecto y si no que pregunte al usuario


Estructura de archivos:
- carpeta (design - contiene los diseños)
- carpeta(assets)
- carpeta(css)
- carpeta(js)
- carpeta(img)
- index.html
- AGENTS.md
- README.md

Instrucción adicional importante:

- El agente debe generar Documentación profesional, clara y atractivo, que incluya:

- Descripción del proyecto
- Funcionalidades detalladas
- Capturas o secciones visuales (si aplica)
- Cómo usar la aplicación
- Cómo funciona cada opción
- Requisitos técnicos
- Estructura del proyecto

Autoría: 

Todas las decisiones técnicas, estructura del proyecto y validación del código fueron realizadas por Yoangel-dev Soluiones Web.
