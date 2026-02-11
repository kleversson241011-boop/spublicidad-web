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
    openWhatsApp("Hola, quiero cotizar un cuadro en placa de aluminio (SK PUBLICIDAD).");
  });
}

// Botones de compra del catálogo
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
  main.style.paddingTop = (h + 14) + "px"; // 14px extra de seguridad
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

    // ✅ recalcula el padding del main si existe esa función
    if (typeof adjustMainOffset === "function") adjustMainOffset();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
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

  // Activo al click (respuesta inmediata)
  links.forEach(a => {
    a.addEventListener("click", () => setActive(a.dataset.link));
  });

  // Activo por scroll (IntersectionObserver)
  const io = new IntersectionObserver((entries) => {
    // Elegimos la sección más visible
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




