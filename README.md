# PODOGERIÁTRICA · Capacitación y Certificaciones

Sitio web institucional de **PODOGERIÁTRICA Capacitación y Certificaciones**, dedicado a:

- **Curso Presencial de Podología (7 meses)** en sedes CDMX y Querétaro.
- **Orientación y acompañamiento SEP-CONOCER EC1417**.
- **Talleres especializados y prácticos**.
- **Catálogo interactivo** de instrumental podológico, kits y módulos educativos digitales con solicitud de cotización por WhatsApp.

## Sitio publicado

- **Producción (Vercel):** [https://podogeriatrica-web.vercel.app/](https://podogeriatrica-web.vercel.app/)

El sitio se publica en **Vercel** con despliegue automático en cada `push` a la rama `main`.

## Tecnologías

- **HTML5:** Estructura semántica, accesibilidad (`aria-label`, `skip-link`) y metadatos SEO / Schema.org.
- **CSS3:** Estilos puros (*Vanilla CSS*) con variables institucionales (`:root`) y diseño responsivo para computadora, tablet y celular.
- **JavaScript:** Lógica nativa (*Vanilla JS*, ES6+) para menú móvil, filtros del catálogo, lista de cotización y formulario conectado a WhatsApp, y acordeón de preguntas frecuentes.

## Estructura de carpetas

```text
.
├── index.html                   # Página principal del sitio
├── css/
│   └── styles.css               # Hoja de estilos principal y diseño responsivo
├── js/
│   └── main.js                  # Interactividad del catálogo, FAQ, menú y formulario
├── img/
│   ├── hero-podologia.jpg       # Fotografía principal del Hero optimizada para web
│   └── logo-podogeriatrica.png  # Logotipo oficial (header y favicon)
├── .gitignore                   # Archivos locales y respaldos excluidos de Git
└── README.md                    # Documentación del proyecto
```

## Cómo verlo en local

1. **Opción rápida:** Haz doble clic en `index.html` para abrirlo directamente en tu navegador.
2. **Con servidor local (recomendado para pruebas):** Desde la carpeta del proyecto en la Terminal ejecuta:
   ```bash
   python3 -m http.server 8000
   ```
   Luego abre `http://localhost:8000` en tu navegador.

## Cómo publicar cambios

Este repositorio está conectado a **Vercel** con despliegue automático sobre la rama `main`. Para publicar una actualización:

```bash
git add <archivos-modificados>
git commit -m "Descripción clara del cambio"
git push origin main
```

Al completarse el `push` a `main`, Vercel publica automáticamente el sitio.
