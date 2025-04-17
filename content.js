let qrSize = 256;
const cursorMargin = 8;

let isEnabled = false;
let hoveredLink;

let qrBox = document.createElement("div");
qrBox.style.position = "absolute";
qrBox.style.zIndex = "9999";
qrBox.style.background = "white";
qrBox.style.padding = "0.5rem";
qrBox.style.display = "none";
qrBox.style.pointerEvents = "none";

let qrCanvas = document.createElement("canvas");
qrBox.appendChild(qrCanvas);
document.body.appendChild(qrBox);

let qr = new QRious({
  element: qrCanvas,
  size: qrSize,
})

chrome.runtime.onMessage.addListener(message => {
  if (message.action !== "linqr:toggle") return;

  isEnabled = !isEnabled;
  chrome.runtime.sendMessage({ action: "linqr:updateIcon", value: isEnabled })
  if (!isEnabled) qrBox.style.display = "none";
});

document.addEventListener("mouseover", (e) => {
  if (!isEnabled) return;

  const closestLink = e.target.closest("a[href]");
  if (!closestLink || closestLink === hoveredLink) return;

  hoveredLink = closestLink;
  qr.value = closestLink.href;
  qrBox.style.display = "block";
});

document.addEventListener("mousemove", (e) => {
  if (!isEnabled) return;
  let left = e.pageX + cursorMargin;
  let top = e.pageY + cursorMargin;

  if (left + qrSize > window.scrollX + window.innerWidth) {
    left -= qrSize - cursorMargin*2;
  }
  if (top + qrSize > window.scrollY + window.innerHeight) {
    top -= qrSize - cursorMargin*2;
  }

  qrBox.style.left = `${left}px`;
  qrBox.style.top = `${top}px`;
});

document.addEventListener("mouseleave", (e) => {
  if (e.target !== hoveredLink) return;

  hoveredLink = null;
  qrBox.style.display = "none"
}, true);
