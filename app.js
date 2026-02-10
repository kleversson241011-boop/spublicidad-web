// Pon tu número: SIN +, SIN espacios
const WHATSAPP_NUMBER = "593998006243";

function openWhatsApp(message){
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// Botones del catálogo
document.querySelectorAll("button[data-product]").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const product = btn.getAttribute("data-product");
    openWhatsApp(`Hola, quiero comprar/cotizar: *${product}*.\n¿Me confirmas disponibilidad y tiempo de entrega?`);
  });
});

// Botón de arriba
document.getElementById("btnTopWa").addEventListener("click", ()=>{
  openWhatsApp("Hola, quiero información de cuadros en placa de aluminio.");
});

// Botón flotante
document.getElementById("waFloat").addEventListener("click", ()=>{
  openWhatsApp("Hola, quiero cotizar un cuadro en placa de aluminio.");
});

// Formulario a WhatsApp
document.getElementById("formCotizar").addEventListener("submit", (e)=>{
  e.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const wa = document.getElementById("wa").value.trim();
  const msg = document.getElementById("msg").value.trim();

  let extra = "";
  if (wa) extra += `Mi WhatsApp: ${wa}\n`;
  extra += `Detalle: ${msg}`;

  openWhatsApp(`Hola, soy *${nombre}*.\nQuiero cotizar un cuadro en aluminio.\n\n${extra}\n\nGracias.`);
});
