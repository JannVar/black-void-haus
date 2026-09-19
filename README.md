# Black Void Haus

Proyecto personal de práctica: una tienda online ficticia de ropa "gothic streetwear", construida con **HTML, CSS y JavaScript vanilla** (sin frameworks ni backend).

> ⚠️ Esto es un proyecto educativo / de portfolio. "Black Void Haus" no es una marca real y el carrito de compra no procesa pagos ni pedidos reales.

## Demo

👉 [Ver demo en vivo](#) *(añade aquí el enlace de GitHub Pages una vez lo despliegues)*

## Capturas

*(añade aquí 1-2 capturas de pantalla de la home y de una página de producto)*

## ¿Qué hace?

- Navegación entre varias "páginas" (Home, Hombre, Mujer, Archive, About, Support) sin recargar la web, usando JavaScript puro para mostrar/ocultar secciones.
- Filtrado de productos por categoría (camisetas, hoodies, pantalones) mediante atributos `data-*` y manipulación del DOM.
- Carrito de compra funcional en el cliente: añadir, eliminar, calcular totales y notificaciones tipo *toast*.
- El carrito persiste entre recargas de página gracias a `localStorage`.
- Sistema de fallback de imágenes: si una imagen no carga, se sustituye automáticamente por una imagen de stock libre de derechos para que la interfaz nunca se rompa.
- Diseño responsive con Grid/Flexbox y variables CSS (`:root`) para mantener una paleta de color coherente.

## Tecnologías

- HTML5 semántico
- CSS3 (Custom Properties, Grid, Flexbox, animaciones)
- JavaScript (ES6+), sin librerías ni frameworks
- Google Fonts

## Estructura del proyecto

```
BlackVoidHaus/
├── index.html        # Estructura y contenido de la página
├── styles.css         # Todos los estilos
├── script.js           # Routing, filtros y lógica del carrito
├── Hombres/            # Imágenes de producto (categoría hombre)
└── Mujeres/             # Imágenes de producto (categoría mujer)
```

## Cómo ejecutarlo en local

No necesita instalación ni dependencias. Basta con:

1. Clonar o descargar el repositorio.
2. Abrir `index.html` en el navegador (o usar la extensión "Live Server" de VS Code para evitar problemas de rutas relativas).

## Cosas que aprendí / practiqué

- Manipulación del DOM sin frameworks (crear, actualizar y eliminar elementos dinámicamente).
- Gestión de estado en el cliente (el "carrito") y su persistencia con la Web Storage API.
- Delegación de eventos (`document.addEventListener` con `closest()`) para no tener que enlazar un listener por cada botón.
- Organización de una interfaz "single page" con varias vistas controladas por JavaScript.

## Posibles mejoras futuras

- [ ] Separar los productos en un archivo de datos (JSON) en lugar de tenerlos hardcodeados en el HTML.
- [ ] Añadir un buscador de productos.
- [ ] Mejorar la accesibilidad (roles ARIA, navegación por teclado en el carrito).
- [ ] Desplegar con GitHub Pages y enlazar la demo aquí arriba.

---

Proyecto realizado como parte de mi formación en Desarrollo de Aplicaciones Multiplataforma (DAM).
