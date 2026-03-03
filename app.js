// WhatsApp en formato internacional, SIN +, SIN espacios
const WHATSAPP_NUMBER = "593998006243";

function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// Botón WhatsApp del header
const btnTopWa = document.getElementById("btnTopWa");
if (btnTopWa) {
  btnTopWa.addEventListener("click", () => {
    openWhatsApp("Hola, quiero información de cuadros en placa de aluminio (SK PUBLICIDAD).");
  });
}

// Botón flotante
const waFloat = document.getElementById("waFloat");
if (waFloat) {
  waFloat.addEventListener("click", () => {
    openWhatsApp("Hola, quiero cotizar un cuadro en placa de aluminio (SK PUBLICIDAD).");
  });
}

// Botones de compra del catálogo por tamaño (A0/A1/A2...)
function bindSizeButtons() {
  document.querySelectorAll("button[data-product]").forEach(btn => {
    btn.addEventListener("click", () => {
      const product = btn.getAttribute("data-product");
      openWhatsApp(
        `Hola, quiero comprar/cotizar: *${product}*.\n¿Me confirmas disponibilidad y forma de entrega en Quito?`
      );
    });
  });
}
bindSizeButtons();

// Formulario a WhatsApp
const form = document.getElementById("formCotizacion");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const tel = document.getElementById("tel").value.trim();
    const msg = document.getElementById("msg").value.trim();

    let extra = "";
    if (tel) extra += `WhatsApp del cliente: ${tel}\n`;
    extra += `Detalle: ${msg}`;

    openWhatsApp(
      `Hola, soy *${nombre}*.\nQuiero cotizar un cuadro en placa de aluminio.\n\n${extra}\n\nGracias.`
    );
  });
}

// Año footer
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();


// ===== Ajuste automático para que el header sticky NO tape el contenido =====
function adjustMainOffset() {
  const header = document.querySelector(".header-v3");
  const main = document.querySelector("main");
  if (!header || !main) return;

  const h = header.offsetHeight;
  main.style.paddingTop = (h + 14) + "px";
}

window.addEventListener("load", adjustMainOffset);
window.addEventListener("resize", adjustMainOffset);


// ===== Header shrink al hacer scroll =====
function setupHeaderShrink() {
  const header = document.querySelector(".header-v3");
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 10) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
    adjustMainOffset();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

window.addEventListener("load", setupHeaderShrink);


// ===== Menú activo según sección visible =====
function setupActiveMenu() {
  const links = Array.from(document.querySelectorAll(".nav-pill[data-link]"));

  const sections = ["inicio", "catalogo", "tamano", "personalizado", "contacto"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (!links.length || !sections.length) return;

  const setActive = (id) => {
    links.forEach(a => a.classList.toggle("is-active", a.dataset.link === id));
  };

  links.forEach(a => a.addEventListener("click", () => setActive(a.dataset.link)));

  const io = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible?.target?.id) {
      setActive(visible.target.id);
    }

    // Activar / desactivar fondo especial en sección Tamaño
    const secTam = document.getElementById("tamano");
    if (secTam) {
      secTam.classList.toggle("section-visible", visible?.target?.id === "tamano");
    }
  }, { threshold: [0.25, 0.4, 0.55] });

  sections.forEach(sec => io.observe(sec));

  const hash = (location.hash || "#inicio").replace("#", "");
  if (["inicio", "catalogo", "tamano", "personalizado", "contacto"].includes(hash)) setActive(hash);
  else setActive("inicio");
}

window.addEventListener("load", setupActiveMenu);


// ===== Catálogo por categorías (galería) =====
const CATALOG = {
  "deportes": [
    { src: "imagenes/catalogo/deportes/messi.png" },
    { src: "imagenes/catalogo/deportes/messi_magic.jpg"},
    { src: "imagenes/catalogo/deportes/cr7.jpg" },
    { src: "imagenes/catalogo/deportes/cr7_1.jpg" },
    { src: "imagenes/catalogo/deportes/cr7_2.jpg" },
    { src: "imagenes/catalogo/deportes/cr7_3.jpg" },
    { src: "imagenes/catalogo/deportes/ronaldo.jpg" },
    { src: "imagenes/catalogo/deportes/legend.jpg" },
     { src: "imagenes/catalogo/deportes/selec.jpg" }
  ],
  "anime": [
    { src: "imagenes/catalogo/anime/anime1.jpg" },
    { src: "imagenes/catalogo/anime/anime2.jpg" },
    { src: "imagenes/catalogo/anime/anime3.jpg" },
    { src: "imagenes/catalogo/anime/anime4.jpg" },
    { src: "imagenes/catalogo/anime/anime5.jpg" },
    { src: "imagenes/catalogo/anime/anime6.jpg" },
    { src: "imagenes/catalogo/anime/anime7.jpg" },
    { src: "imagenes/catalogo/anime/anime8.jpg" },
    { src: "imagenes/catalogo/anime/anime9.jpg" },
    { src: "imagenes/catalogo/anime/anime10.jpg" },
    { src: "imagenes/catalogo/anime/anime11.jpg" },
    { src: "imagenes/catalogo/anime/anime12.jpg" }, 
  ],
  "videojuegos": [
    { src: "imagenes/catalogo/videojuegos/vid.jpg" },
    { src: "imagenes/catalogo/videojuegos/vid1.png" },
    { src: "imagenes/catalogo/videojuegos/vid2.jpg" },
    { src: "imagenes/catalogo/videojuegos/vid3.jpg" },
    { src: "imagenes/catalogo/videojuegos/vid4.jpg" },
    { src: "imagenes/catalogo/videojuegos/vid5.jpg" },
    { src: "imagenes/catalogo/videojuegos/vid6.jpg" },
    { src: "imagenes/catalogo/videojuegos/vid7.jpg" },
    { src: "imagenes/catalogo/videojuegos/vid8.jpg" },
    { src: "imagenes/catalogo/videojuegos/vid9.jpg" },
    { src: "imagenes/catalogo/videojuegos/vid10.jpg" },
    { src: "imagenes/catalogo/videojuegos/vid11.jpg" },
    { src: "imagenes/catalogo/videojuegos/vid12.jpg" },
  ],
  "marvel-dc": [
    { src: "imagenes/catalogo/marvel-dc/marvel.jpg" },
    { src: "imagenes/catalogo/marvel-dc/marvel1.png" },
    { src: "imagenes/catalogo/marvel-dc/marvel2.jpg" },
    { src: "imagenes/catalogo/marvel-dc/marvel3.jpg" },
    { src: "imagenes/catalogo/marvel-dc/marvel4.jpg" },
    { src: "imagenes/catalogo/marvel-dc/marvel5.jpg" },
    { src: "imagenes/catalogo/marvel-dc/marvel6.jpg" },
    { src: "imagenes/catalogo/marvel-dc/marvel7.jpg" },
    { src: "imagenes/catalogo/marvel-dc/marvel8.jpg" },
    { src: "imagenes/catalogo/marvel-dc/marvel9.jpg" },
    { src: "imagenes/catalogo/marvel-dc/marvel10.jpg" },
    { src: "imagenes/catalogo/marvel-dc/marvel11.jpg" },
    { src: "imagenes/catalogo/marvel-dc/marvel12.jpg" },
    { src: "imagenes/catalogo/marvel-dc/marvel13.jpg" },
    { src: "imagenes/catalogo/marvel-dc/marvel14.jpg" }
  ],
  "dibujos": [
    { src: "imagenes/catalogo/dibujos/d1.png" },
    { src: "imagenes/catalogo/dibujos/dibu.jpg" },
    { src: "imagenes/catalogo/dibujos/dibu1.jpg" },
    { src: "imagenes/catalogo/dibujos/dibu2.jpg" },
    { src: "imagenes/catalogo/dibujos/dibu3.jpg" },
    { src: "imagenes/catalogo/dibujos/dibu4.jpg" },
    { src: "imagenes/catalogo/dibujos/dibu5.jpg" },
    { src: "imagenes/catalogo/dibujos/dibu6.jpg" },
    { src: "imagenes/catalogo/dibujos/dibu7.jpg" },
    { src: "imagenes/catalogo/dibujos/dibu8.jpg" }
  ],
  "peliculas": [
    { src: "imagenes/catalogo/peliculas/peli1.png" }
  ],
  "naturaleza": [
    { src: "imagenes/catalogo/naturaleza/nat1.png" }
  ]
};

function renderGallery(category) {
  const gallery = document.getElementById("catGallery");
  if (!gallery) return;

  const items = CATALOG[category] || [];
  if (!items.length) {
    gallery.innerHTML = `
      <div class="note" style="grid-column:1/-1;">
        Aún no hay imágenes en esta categoría.
      </div>
    `;
    adjustMainOffset();
    return;
  }

  gallery.innerHTML = items.map((it, idx) => `
    <article class="cat-item">
      <div class="img-box">
        <img src="${it.src}" alt="Catálogo ${category}" loading="lazy">
      </div>
      <div class="cat-cap">
        <button class="btn primary" type="button" data-cat="${category}" data-idx="${idx}">
          Cotizar
        </button>
      </div>
    </article>
  `).join("");

  gallery.querySelectorAll("button[data-cat]").forEach(btn => {
    btn.addEventListener("click", () => {
      const cat = btn.getAttribute("data-cat");
      const idx = Number(btn.getAttribute("data-idx")) + 1;

      openWhatsApp(
        `Hola, quiero cotizar un cuadro en placa de aluminio.\nCategoría: *${cat.toUpperCase()}*.\nModelo: *${idx}*.\n¿Me confirmas precios por tamaño y tiempos de entrega en Quito?`
      );
    });
  });

  adjustMainOffset();
}

function setupCatalogTabs() {
  const tabs = document.querySelectorAll(".cat-tab[data-tab]");
  if (!tabs.length) return;

  const setActiveTab = (key) => {
    tabs.forEach(t => t.classList.toggle("is-active", t.dataset.tab === key));
    renderGallery(key);
  };

  tabs.forEach(t => t.addEventListener("click", () => setActiveTab(t.dataset.tab)));

  // Inicial
  setActiveTab("deportes");
}

window.addEventListener("load", setupCatalogTabs);

















// ===== HAMBURGUESA MENÚ MÓVIL =====
(function setupHamburger() {
  const btn = document.getElementById("hamburger");
  const nav = document.getElementById("mobileNav");
  const mobileWa = document.getElementById("btnMobileWa");

  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    btn.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open);
    nav.setAttribute("aria-hidden", !open);
  });

  // Cerrar al hacer clic en link
  nav.querySelectorAll("a.mobile-link").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      btn.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    });
  });

  // Botón WA en menú móvil
  if (mobileWa) {
    mobileWa.addEventListener("click", () => {
      openWhatsApp("Hola, quiero cotizar un cuadro en placa de aluminio (SK PUBLICIDAD).");
    });
  }
})();

// v1772500753

