/**
 * ==========================================================================
 * PODOGERIÁTRICA · Capacitación y Certificaciones
 * Lógica interactiva en JavaScript Vanilla (ES6+)
 * Funcionalidades:
 *  1. Menú de navegación responsivo (móvil) y resaltado de sección activa
 *  2. Filtro dinámico del catálogo comercial (Instrumental, Kits, Módulos)
 *  3. Lista interactiva de solicitud de cotización vía WhatsApp (sin precios inventados)
 *  4. Acordeón accesible para Preguntas Frecuentes (FAQ)
 *  5. Generador de mensaje personalizado para prospectos hacia WhatsApp oficial
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUMERO = '525523160570';
  const WHATSAPP_URL_BASE = `https://wa.me/${WHATSAPP_NUMERO}`;

  /* ========================================================================
     1. MENÚ MÓVIL Y NAVEGACIÓN ACTIVA
     ======================================================================== */
  const botonMenuMovil = document.getElementById('boton-menu-movil');
  const navPrincipal = document.getElementById('nav-principal');
  const enlacesNav = document.querySelectorAll('.nav-enlace');

  if (botonMenuMovil && navPrincipal) {
    const cerrarMenuMovil = () => {
      navPrincipal.classList.remove('abierto');
      botonMenuMovil.setAttribute('aria-expanded', 'false');
    };

    botonMenuMovil.addEventListener('click', () => {
      const estaAbierto = navPrincipal.classList.toggle('abierto');
      botonMenuMovil.setAttribute('aria-expanded', String(estaAbierto));
    });

    // Cerrar el menú móvil al hacer clic en cualquier enlace o botón del menú
    navPrincipal.querySelectorAll('a').forEach((enlace) => {
      enlace.addEventListener('click', cerrarMenuMovil);
    });

    // Cerrar el menú móvil con la tecla Escape
    document.addEventListener('keydown', (evento) => {
      if (evento.key === 'Escape' && navPrincipal.classList.contains('abierto')) {
        cerrarMenuMovil();
        botonMenuMovil.focus();
      }
    });
  }

  // Observador de intersección para resaltar la sección activa en el menú
  const secciones = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window && secciones.length > 0) {
    const observadorSecciones = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            const idActual = entrada.target.getAttribute('id');
            enlacesNav.forEach((enlace) => {
              enlace.classList.toggle(
                'activo',
                enlace.getAttribute('href') === `#${idActual}`
              );
            });
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    secciones.forEach((seccion) => observadorSecciones.observe(seccion));
  }

  /* ========================================================================
     2. FILTRO DINÁMICO DE CATÁLOGO (INSTRUMENTAL, KITS, MÓDULOS DIGITALES)
     ======================================================================== */
  const botonesFiltro = document.querySelectorAll('.btn-filtro');
  const tarjetasProducto = document.querySelectorAll('.tarjeta-producto');

  botonesFiltro.forEach((boton) => {
    boton.addEventListener('click', () => {
      const categoriaSeleccionada = boton.getAttribute('data-filtro');

      // Actualizar estado visual y ARIA de los botones
      botonesFiltro.forEach((b) => {
        b.classList.remove('activo');
        b.setAttribute('aria-pressed', 'false');
      });
      boton.classList.add('activo');
      boton.setAttribute('aria-pressed', 'true');

      // Mostrar u ocultar productos según su categoría
      tarjetasProducto.forEach((tarjeta) => {
        const categoriaProducto = tarjeta.getAttribute('data-categoria');
        const mostrar =
          categoriaSeleccionada === 'todos' ||
          categoriaProducto === categoriaSeleccionada;

        if (mostrar) {
          tarjeta.removeAttribute('hidden');
        } else {
          tarjeta.setAttribute('hidden', '');
        }
      });
    });
  });

  /* ========================================================================
     3. LISTA DE SOLICITUD DE INFORMACIÓN / COTIZACIÓN DE PRODUCTOS
     ======================================================================== */
  const productosSeleccionados = new Set();
  const botonesAgregarCotizacion = document.querySelectorAll('.btn-agregar-cotizacion');
  const contenedorChips = document.getElementById('lista-chips-cotizacion');
  const textoEstadoCotizacion = document.getElementById('texto-estado-cotizacion');
  const btnEnviarCotizacion = document.getElementById('btn-enviar-cotizacion');

  function actualizarVistaCotizacion() {
    const lista = Array.from(productosSeleccionados);

    if (!contenedorChips || !textoEstadoCotizacion || !btnEnviarCotizacion) {
      return;
    }

    contenedorChips.innerHTML = '';

    if (lista.length === 0) {
      textoEstadoCotizacion.textContent =
        'Aún no has agregado artículos a tu solicitud. Selecciona instrumental, kits o módulos digitales del catálogo.';
      btnEnviarCotizacion.setAttribute('disabled', 'disabled');
      btnEnviarCotizacion.style.opacity = '0.6';
    } else {
      textoEstadoCotizacion.textContent = `Has seleccionado ${lista.length} artículo(s) para consultar disponibilidad y cotización por WhatsApp:`;
      btnEnviarCotizacion.removeAttribute('disabled');
      btnEnviarCotizacion.style.opacity = '1';

      lista.forEach((nombreProducto) => {
        const chip = document.createElement('span');
        chip.className = 'chip-item';
        chip.textContent = nombreProducto + ' ';

        const btnQuitar = document.createElement('button');
        btnQuitar.type = 'button';
        btnQuitar.setAttribute('aria-label', `Quitar ${nombreProducto}`);
        btnQuitar.textContent = '×';
        btnQuitar.addEventListener('click', () => {
          productosSeleccionados.delete(nombreProducto);
          sincronizarBotonesProducto();
          actualizarVistaCotizacion();
        });

        chip.appendChild(btnQuitar);
        contenedorChips.appendChild(chip);
      });
    }
  }

  function sincronizarBotonesProducto() {
    botonesAgregarCotizacion.forEach((boton) => {
      const nombre = boton.getAttribute('data-producto');
      if (productosSeleccionados.has(nombre)) {
        boton.textContent = '✓ En tu solicitud';
        boton.classList.add('btn-turquesa');
        boton.classList.remove('btn-contorno');
      } else {
        boton.textContent = '+ Agregar a solicitud';
        boton.classList.remove('btn-turquesa');
        boton.classList.add('btn-contorno');
      }
    });
  }

  botonesAgregarCotizacion.forEach((boton) => {
    boton.addEventListener('click', () => {
      const nombre = boton.getAttribute('data-producto');
      if (!nombre) return;

      if (productosSeleccionados.has(nombre)) {
        productosSeleccionados.delete(nombre);
      } else {
        productosSeleccionados.add(nombre);
      }
      sincronizarBotonesProducto();
      actualizarVistaCotizacion();
    });
  });

  if (btnEnviarCotizacion) {
    btnEnviarCotizacion.addEventListener('click', () => {
      const lista = Array.from(productosSeleccionados);
      if (lista.length === 0) return;

      const mensaje = [
        'Hola PODOGERIÁTRICA, me gustaría solicitar información de disponibilidad y cotización de los siguientes artículos del catálogo:',
        '',
        ...lista.map((item, idx) => `${idx + 1}. ${item}`),
        '',
        'Quedo atento(a) a sus indicaciones. ¡Gracias!'
      ].join('\n');

      const url = `${WHATSAPP_URL_BASE}?text=${encodeURIComponent(mensaje)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  actualizarVistaCotizacion();

  /* ========================================================================
     4. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
     ======================================================================== */
  const itemsFaq = document.querySelectorAll('.faq-item');

  itemsFaq.forEach((item) => {
    const botonPregunta = item.querySelector('.faq-pregunta');
    const contenedorRespuesta = item.querySelector('.faq-respuesta');

    if (!botonPregunta || !contenedorRespuesta) return;

    botonPregunta.addEventListener('click', () => {
      const estabaAbierto = item.classList.contains('abierto');

      // Cerrar otros elementos abiertos para mantener lectura limpia
      itemsFaq.forEach((otroItem) => {
        otroItem.classList.remove('abierto');
        const otroBoton = otroItem.querySelector('.faq-pregunta');
        const otraRespuesta = otroItem.querySelector('.faq-respuesta');
        if (otroBoton) otroBoton.setAttribute('aria-expanded', 'false');
        if (otraRespuesta) otraRespuesta.style.maxHeight = null;
      });

      // Alternar el elemento actual
      if (!estabaAbierto) {
        item.classList.add('abierto');
        botonPregunta.setAttribute('aria-expanded', 'true');
        contenedorRespuesta.style.maxHeight = `${contenedorRespuesta.scrollHeight}px`;
      }
    });
  });

  /* ========================================================================
     5. FORMULARIO DE PROSPECTOS CONECTADO A WHATSAPP
     ======================================================================== */
  const formularioProspecto = document.getElementById('formulario-prospecto');

  if (formularioProspecto) {
    formularioProspecto.addEventListener('submit', (evento) => {
      evento.preventDefault();

      const nombre = document.getElementById('nombre-prospecto')?.value.trim() || '';
      const sede = document.getElementById('sede-prospecto')?.value || '';
      const interes = document.getElementById('interes-prospecto')?.value || '';
      const comentarios = document.getElementById('mensaje-prospecto')?.value.trim() || '';

      const lineasMensaje = [
        'Hola PODOGERIÁTRICA, solicito información académica/comercial desde el sitio web:',
        '',
        `• Nombre: ${nombre}`,
        `• Sede o modalidad de interés: ${sede}`,
        `• Área de interés: ${interes}`
      ];

      if (comentarios) {
        lineasMensaje.push(`• Comentarios o dudas: ${comentarios}`);
      }

      if (productosSeleccionados.size > 0) {
        lineasMensaje.push(
          `• Artículos seleccionados del catálogo: ${Array.from(productosSeleccionados).join(', ')}`
        );
      }

      const url = `${WHATSAPP_URL_BASE}?text=${encodeURIComponent(lineasMensaje.join('\n'))}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }
});
