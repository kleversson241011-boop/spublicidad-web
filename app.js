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
    if (visible?.target?.id) setActive(visible.target.id);
    const secTam = document.getElementById("tamano");
    if (secTam) secTam.classList.toggle("section-visible", visible?.target?.id === "tamano");
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
    { src: "imagenes/catalogo/deportes/messi_magic.jpg" },
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
    { src: "imagenes/catalogo/dibujos/d1.jpg" },
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
    { src: "imagenes/catalogo/peliculas/peli.jpg" },
    { src: "imagenes/catalogo/peliculas/peli1.jpg" },
    { src: "imagenes/catalogo/peliculas/peli2.jpg" },
    { src: "imagenes/catalogo/peliculas/peli3.jpg" },
    { src: "imagenes/catalogo/peliculas/peli4.jpg" },
    { src: "imagenes/catalogo/peliculas/peli5.jpg" },
    { src: "imagenes/catalogo/peliculas/peli6.jpg" },
    { src: "imagenes/catalogo/peliculas/peli7.jpg" },
    { src: "imagenes/catalogo/peliculas/peli8.jpg" },
    { src: "imagenes/catalogo/peliculas/peli9.jpg" },
    { src: "imagenes/catalogo/peliculas/peli10.jpg" },
  ],
  "naturaleza": [
    { src: "imagenes/catalogo/naturaleza/nat.jpg" },
    { src: "imagenes/catalogo/naturaleza/nat1.jpg" },
    { src: "imagenes/catalogo/naturaleza/nat2.jpg" },
    { src: "imagenes/catalogo/naturaleza/nat3.jpg" },
    { src: "imagenes/catalogo/naturaleza/nat4.jpg" },
    { src: "imagenes/catalogo/naturaleza/nat5.jpg" },
  ]
};


// ===== LIGHTBOX =====
let lbItems = [];
let lbIndex = 0;

function createLightbox() {
  if (document.getElementById("lb-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "lb-overlay";
  overlay.innerHTML = `
    <div id="lb-box">
      <button id="lb-close" aria-label="Cerrar">✕</button>
      <button id="lb-prev" aria-label="Anterior">&#8249;</button>
      <div id="lb-img-wrap">
        <img id="lb-img" src="" alt="Vista ampliada" />
      </div>
      <button id="lb-next" aria-label="Siguiente">&#8250;</button>
      <div id="lb-counter"></div>
      <button id="lb-cotizar">💬 Cotizar este modelo</button>
    </div>
  `;

  // Estilos inline para no depender del CSS
  overlay.style.cssText = `
    position:fixed; inset:0; z-index:9999;
    background:rgba(0,0,0,0.92);
    display:flex; align-items:center; justify-content:center;
    opacity:0; transition:opacity .25s ease;
    backdrop-filter:blur(6px);
  `;

  const box = overlay.querySelector("#lb-box");
  box.style.cssText = `
    position:relative;
    display:flex; align-items:center; justify-content:center; gap:12px;
    max-width:92vw; max-height:92vh;
    flex-direction:row;
  `;

  const imgWrap = overlay.querySelector("#lb-img-wrap");
  imgWrap.style.cssText = `
    display:flex; flex-direction:column; align-items:center; gap:14px;
  `;

  const img = overlay.querySelector("#lb-img");
  img.style.cssText = `
    max-width:80vw; max-height:78vh;
    border-radius:12px;
    box-shadow:0 0 40px rgba(77,214,255,0.3), 0 0 80px rgba(168,85,247,0.2);
    object-fit:contain;
    transition:opacity .2s ease;
  `;

  const btnStyle = `
    background:rgba(255,255,255,0.1);
    border:1px solid rgba(255,255,255,0.2);
    color:#fff; border-radius:50%;
    width:52px; height:52px; font-size:28px;
    cursor:pointer; flex-shrink:0;
    transition:background .2s, transform .15s;
    display:flex; align-items:center; justify-content:center;
  `;

  overlay.querySelector("#lb-prev").style.cssText = btnStyle;
  overlay.querySelector("#lb-next").style.cssText = btnStyle;

  const closeBtn = overlay.querySelector("#lb-close");
  closeBtn.style.cssText = `
    position:fixed; top:20px; right:24px;
    background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.3);
    color:#fff; border-radius:50%;
    width:44px; height:44px; font-size:18px;
    cursor:pointer; z-index:10000;
    display:flex; align-items:center; justify-content:center;
    transition:background .2s;
  `;

  const counter = overlay.querySelector("#lb-counter");
  counter.style.cssText = `
    color:rgba(255,255,255,0.6); font-size:13px;
    text-align:center; letter-spacing:1px;
  `;

  const cotizarBtn = overlay.querySelector("#lb-cotizar");
  cotizarBtn.style.cssText = `
    background:linear-gradient(135deg,#25d366,#1aad54);
    color:#fff; border:none; border-radius:22px;
    padding:10px 24px; font-size:14px; font-weight:700;
    cursor:pointer; letter-spacing:.3px;
    box-shadow:0 4px 15px rgba(37,211,102,0.4);
    transition:transform .15s, box-shadow .15s;
    white-space:nowrap;
  `;

  document.body.appendChild(overlay);

  // Hover effects
  [overlay.querySelector("#lb-prev"), overlay.querySelector("#lb-next")].forEach(btn => {
    btn.addEventListener("mouseenter", () => btn.style.background = "rgba(77,214,255,0.25)");
    btn.addEventListener("mouseleave", () => btn.style.background = "rgba(255,255,255,0.1)");
  });
  closeBtn.addEventListener("mouseenter", () => closeBtn.style.background = "rgba(255,80,80,0.4)");
  closeBtn.addEventListener("mouseleave", () => closeBtn.style.background = "rgba(255,255,255,0.15)");
  cotizarBtn.addEventListener("mouseenter", () => { cotizarBtn.style.transform="scale(1.04)"; cotizarBtn.style.boxShadow="0 6px 20px rgba(37,211,102,0.6)"; });
  cotizarBtn.addEventListener("mouseleave", () => { cotizarBtn.style.transform="scale(1)"; cotizarBtn.style.boxShadow="0 4px 15px rgba(37,211,102,0.4)"; });

  // Eventos
  closeBtn.addEventListener("click", closeLightbox);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeLightbox(); });
  overlay.querySelector("#lb-prev").addEventListener("click", () => navigateLightbox(-1));
  overlay.querySelector("#lb-next").addEventListener("click", () => navigateLightbox(1));
  cotizarBtn.addEventListener("click", () => {
    const cat = lbItems[lbIndex]?.cat || "";
    const idx = lbIndex + 1;
    openWhatsApp(`Hola, quiero cotizar un cuadro en placa de aluminio.\nCategoría: *${cat.toUpperCase()}*.\nModelo: *${idx}*.\n¿Me confirmas precios por tamaño y tiempos de entrega en Quito?`);
  });

  // Teclado
  document.addEventListener("keydown", (e) => {
    if (!document.getElementById("lb-overlay")?.classList.contains("lb-open")) return;
    if (e.key === "ArrowRight") navigateLightbox(1);
    if (e.key === "ArrowLeft")  navigateLightbox(-1);
    if (e.key === "Escape")     closeLightbox();
  });

  // Swipe táctil
  let touchStartX = 0;
  overlay.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  overlay.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) navigateLightbox(diff > 0 ? 1 : -1);
  });
}

function openLightbox(items, index) {
  createLightbox();
  lbItems = items;
  lbIndex = index;
  updateLightbox();

  const overlay = document.getElementById("lb-overlay");
  overlay.classList.add("lb-open");
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => { overlay.style.opacity = "1"; });
}

function closeLightbox() {
  const overlay = document.getElementById("lb-overlay");
  if (!overlay) return;
  overlay.style.opacity = "0";
  overlay.classList.remove("lb-open");
  setTimeout(() => { overlay.style.display = "none"; }, 250);
  document.body.style.overflow = "";
}

function navigateLightbox(dir) {
  lbIndex = (lbIndex + dir + lbItems.length) % lbItems.length;
  updateLightbox();
}

function updateLightbox() {
  const img = document.getElementById("lb-img");
  const counter = document.getElementById("lb-counter");
  const prev = document.getElementById("lb-prev");
  const next = document.getElementById("lb-next");

  img.style.opacity = "0";
  setTimeout(() => {
    img.src = lbItems[lbIndex].src;
    img.style.opacity = "1";
  }, 150);

  counter.textContent = `${lbIndex + 1} / ${lbItems.length}`;

  // Ocultar flechas si solo hay 1 imagen
  prev.style.visibility = lbItems.length > 1 ? "visible" : "hidden";
  next.style.visibility = lbItems.length > 1 ? "visible" : "hidden";
}


function renderGallery(category) {
  const gallery = document.getElementById("catGallery");
  if (!gallery) return;

  const items = CATALOG[category] || [];
  if (!items.length) {
    gallery.innerHTML = `<div class="note" style="grid-column:1/-1;">Aún no hay imágenes en esta categoría.</div>`;
    adjustMainOffset();
    return;
  }

  // Añadir categoría a cada item para el lightbox
  const itemsWithCat = items.map(it => ({ ...it, cat: category }));

  gallery.innerHTML = itemsWithCat.map((it, idx) => `
    <article class="cat-item" style="cursor:pointer;" data-idx="${idx}">
      <div class="img-box">
        <img src="${it.src}" alt="Catálogo ${category}" loading="lazy">
        <div class="lb-hint">🔍 Ver</div>
      </div>
    </article>
  `).join("");

  // Estilos del hint hover
  gallery.querySelectorAll(".lb-hint").forEach(hint => {
    hint.style.cssText = `
      position:absolute; inset:0;
      display:flex; align-items:center; justify-content:center;
      background:rgba(0,0,0,0.45); color:#fff;
      font-size:15px; font-weight:700; letter-spacing:.5px;
      border-radius:inherit;
      opacity:0; transition:opacity .2s;
      pointer-events:none;
    `;
  });

  gallery.querySelectorAll(".cat-item").forEach((item, idx) => {
    const imgBox = item.querySelector(".img-box");
    const hint = item.querySelector(".lb-hint");
    imgBox.style.position = "relative";

    item.addEventListener("mouseenter", () => { hint.style.opacity = "1"; });
    item.addEventListener("mouseleave", () => { hint.style.opacity = "0"; });
    item.addEventListener("click", () => openLightbox(itemsWithCat, idx));
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

  nav.querySelectorAll("a.mobile-link").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      btn.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    });
  });

  if (mobileWa) {
    mobileWa.addEventListener("click", () => {
      openWhatsApp("Hola, quiero cotizar un cuadro en placa de aluminio (SK PUBLICIDAD).");
    });
  }
})();



