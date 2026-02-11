// WhatsApp en formato internacional, SIN +, SIN espacios
const WHATSAPP_NUMBER = "593998006243";

function openWhatsApp(message){
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// Botón WhatsApp del header
const btnTopWa = document.getElementById("btnTopWa");
if (btnTopWa){
  btnTopWa.addEventListener("click", () => {
    openWhatsApp("Hola, quiero información de cuadros en placa de aluminio (SK PUBLICIDAD).");
  });
}

// Botón flotante
const waFloat = document.getElementById("waFloat");
if (waFloat){
  waFloat.addEventListener("click", () => {
    openWhatsApp("Hola, quiero cotizar un cuadro en placa de aluminio (SK PUBLICIDAD understand).");
  });
}

// Botones de compra del catálogo por tamaño (A0/A1/A2...)
document.querySelectorAll("button[data-product]").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const product = btn.getAttribute("data-product");
    openWhatsApp(`Hola, quiero comprar/cotizar: *${product}*.\n¿Me confirmas disponibilidad y forma de entrega en Quito?`);
  });
});

// Formulario a WhatsApp
const form = document.getElementById("formCotizacion");
if (form){
  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const tel = document.getElementById("tel").value.trim();
    const msg = document.getElementById("msg").value.trim();

    let extra = "";
    if (tel) extra += `WhatsApp del cliente: ${tel}\n`;
    extra += `Detalle: ${msg}`;

    openWhatsApp(`Hola, soy *${nombre}*.\nQuiero cotizar un cuadro en placa de aluminio.\n\n${extra}\n\nGracias.`);
  });
}

// Año footer
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();


// ===== Ajuste automático para que el header sticky NO tape el contenido =====
function adjustMainOffset(){
  const header = document.querySelector(".header-v3");
  const main = document.querySelector("main");
  if (!header || !main) return;

  const h = header.offsetHeight;
  main.style.paddingTop = (h + 14) + "px";
}

window.addEventListener("load", adjustMainOffset);
window.addEventListener("resize", adjustMainOffset);


// ===== Header "shrink" al hacer scroll (pro) =====
function setupHeaderShrink(){
  const header = document.querySelector(".header-v3");
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 10) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");

    // ✅ Recalcula el padding del main si existe
    adjustMainOffset();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

window.addEventListener("load", setupHeaderShrink);


// ===== Menú activo según sección visible =====
function setupActiveMenu(){
  const links = Array.from(document.querySelectorAll(".nav-pill[data-link]"));
  const sections = ["catalogo","personalizado","contacto"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (!links.length || !sections.length) return;

  const setActive = (id) => {
    links.forEach(a => {
      a.classList.toggle("is-active", a.dataset.link === id);
    });
  };

  // Activo al click
  links.forEach(a => {
    a.addEventListener("click", () => setActive(a.dataset.link));
  });

  // Activo por scroll
  const io = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible && visible.target && visible.target.id) {
      setActive(visible.target.id);
    }
  }, {
    root: null,
    threshold: [0.25, 0.4, 0.55],
  });

  sections.forEach(sec => io.observe(sec));

  // Estado inicial
  const hash = (location.hash || "#catalogo").replace("#","");
  if (["catalogo","personalizado","contacto"].includes(hash)) setActive(hash);
  else setActive("catalogo");
}

window.addEventListener("load", setupActiveMenu);


// ===== Catálogo por categorías (galería) + pestaña Tamaño =====
// ✅ IMPORTANTE:
// - Sube tus fotos a /imagenes/catalogo/<categoria>/
// - Luego agrega cada imagen aquí (src + title)
const CATALOG = {
  "deportes": [
    { src: "imagenes/catalogo/deportes/messi.png", title: "Deportes 1" }
  ],
  "anime": [
    { src: "imagenes/catalogo/anime/anime1.jpg", title: "Anime 1" }
    
  ],
  "videojuegos": [
    { src: "imagenes/catalogo/videojuegos/vid1.png", title: "Videojuegos 1" }
    
  ],
  "marvel-dc": [
    { src: "imagenes/catalogo/marvel-dc/marvel1.png", title: "Marvel/DC 1" }
    
  ],
  "dibujos": [
    { src: "imagenes/catalogo/dibujos/d1.png", title: "Dibujos 1" }
  ],
  "peliculas": [
    { src: "imagenes/catalogo/peliculas/peli1.png", title: "Películas 1" }
  ],
  "naturaleza": [
    { src: "imagenes/catalogo/naturaleza/nat1.png", title: "Naturaleza 1" }
  ],
};

function renderGallery(category){
  const gallery = document.getElementById("catGallery");
  const sizes = document.getElementById("catSizes");
  if (!gallery || !sizes) return;

  // Si es "tamano", oculto galería y muestro tamaños
  if (category === "tamano"){
    gallery.innerHTML = "";
    gallery.hidden = true;
    sizes.hidden = false;
    return;
  }

  // Caso normal: muestro galería
  sizes.hidden = true;
  gallery.hidden = false;

  const items = CATALOG[category] || [];
  if (!items.length){
    gallery.innerHTML = `
      <div class="note" style="grid-column:1/-1;">
        Aún no hay imágenes en esta categoría. Sube fotos a <b>/imagenes/catalogo/${category}/</b> y agrégalas en app.js.
      </div>
    `;
    return;
  }

  gallery.innerHTML = items.map((it) => `
    <article class="cat-item">
      <img src="${it.src}" alt="${it.title}" loading="lazy">
      <div class="cat-cap">
        <b>${it.title}</b>
        <button class="btn primary" type="button" data-wa="${it.title}">
          Cotizar
        </button>
      </div>
    </article>
  `).join("");

  // Botón cotizar por cada imagen
  gallery.querySelectorAll("button[data-wa]").forEach(btn => {
    btn.addEventListener("click", () => {
      const title = btn.getAttribute("data-wa");
      openWhatsApp(
        `Hola, quiero cotizar un cuadro en placa de aluminio del catálogo: *${category.toUpperCase()}*.\nModelo: *${title}*.\n¿Me confirmas precios por tamaño y tiempos de entrega en Quito?`
      );
    });
  });
}

function setupCatalogTabs(){
  const tabs = document.querySelectorAll(".cat-tab[data-tab]");
  if (!tabs.length) return;

  const setActiveTab = (key) => {
    tabs.forEach(t => t.classList.toggle("is-active", t.dataset.tab === key));
    renderGallery(key);

    // ✅ Recalcula por si cambia altura del catálogo
    adjustMainOffset();
  };

  tabs.forEach(t => {
    t.addEventListener("click", () => setActiveTab(t.dataset.tab));
  });

  // Inicial: Deportes (puedes cambiar a "tamano" si quieres abrir tamaños por defecto)
  setActiveTab("deportes");
}

window.addEventListener("load", setupCatalogTabs);




