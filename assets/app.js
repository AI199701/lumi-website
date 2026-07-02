const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const sections = qsa("[data-section]");
const navLinks = qsa(".desktop-nav a");
const progressFill = qs(".section-progress b");
const header = qs("[data-header]");
const glow = qs(".cursor-glow");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const index = sections.indexOf(entry.target);
    navLinks.forEach((link) => link.classList.toggle("active", link.hash === `#${entry.target.id}`));
    progressFill.style.height = `${((index + 1) / sections.length) * 100}%`;
    qsa(".reveal", entry.target).forEach((item) => item.classList.add("visible"));
  });
}, { threshold: 0.54 });

sections.forEach((section) => sectionObserver.observe(section));
qsa(".hero .reveal").forEach((item) => item.classList.add("visible"));

let ticking = false;
function updateScrollEffects() {
  const y = window.scrollY;
  header.classList.toggle("scrolled", y > 32);
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    qsa(".parallax").forEach((layer) => {
      const section = layer.parentElement;
      const offset = section.getBoundingClientRect().top;
      const speed = Number(layer.dataset.speed || 0.08);
      layer.style.transform = `translate3d(0, ${-offset * speed}px, 0) scale(1.08)`;
    });
  }
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) requestAnimationFrame(updateScrollEffects);
  ticking = true;
}, { passive: true });
updateScrollEffects();

window.addEventListener("pointermove", (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
}, { passive: true });

const menuButton = qs(".menu-toggle");
const mobileMenu = qs(".mobile-menu");
function setMenu(open) {
  document.body.classList.toggle("menu-open", open);
  mobileMenu.classList.toggle("open", open);
  mobileMenu.setAttribute("aria-hidden", String(!open));
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
}
menuButton.addEventListener("click", () => setMenu(!mobileMenu.classList.contains("open")));
qsa("a", mobileMenu).forEach((link) => link.addEventListener("click", () => setMenu(false)));

const soundButton = qs(".sound-toggle");
let audioContext;
let ambience;
soundButton.addEventListener("click", () => {
  const isOn = soundButton.getAttribute("aria-pressed") === "true";
  if (isOn) {
    ambience?.gain.gain.setTargetAtTime(0, audioContext.currentTime, 0.15);
    soundButton.setAttribute("aria-pressed", "false");
    soundButton.setAttribute("aria-label", "开启环境音");
    return;
  }
  audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
  if (!ambience) {
    const oscillator = audioContext.createOscillator();
    const oscillatorTwo = audioContext.createOscillator();
    const filter = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 110;
    oscillatorTwo.type = "sine";
    oscillatorTwo.frequency.value = 164.81;
    filter.type = "lowpass";
    filter.frequency.value = 240;
    gain.gain.value = 0;
    oscillator.connect(filter);
    oscillatorTwo.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillatorTwo.start();
    ambience = gain;
  }
  audioContext.resume();
  ambience.gain.gain.setTargetAtTime(0.026, audioContext.currentTime, 0.3);
  soundButton.setAttribute("aria-pressed", "true");
  soundButton.setAttribute("aria-label", "关闭环境音");
});

const dialog = qs(".profile-dialog");
qs(".profile-open").addEventListener("click", () => dialog.showModal());
qs(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

const photos = qsa(".polaroid");
const baseTransforms = photos.map((photo) => getComputedStyle(photo).transform);
qs(".shuffle-button").addEventListener("click", () => {
  photos.forEach((photo, index) => {
    const x = Math.round((Math.random() - 0.5) * 24);
    const y = Math.round((Math.random() - 0.5) * 18);
    const r = Math.round((Math.random() - 0.5) * 14);
    photo.style.zIndex = String(Math.floor(Math.random() * 8));
    photo.animate([
      { transform: baseTransforms[index] },
      { transform: `translate(${x}px, ${y - 18}px) rotate(${r}deg) scale(1.03)` },
      { transform: `translate(${x}px, ${y}px) rotate(${r}deg)` }
    ], { duration: 700 + index * 55, easing: "cubic-bezier(.22,.72,.18,1)", fill: "forwards" });
  });
});

const wishForm = qs(".wish-form");
const wishInput = qs("#wish");
const counter = qs(".wish-form small b");
const wishes = qs(".wishes");
const toast = qs(".toast");
const seedWishes = [
  ["今天也已经很努力了", 12, 22],
  ["不着急，花会慢慢开", 76, 26],
  ["记得看看晚霞", 18, 72],
  ["愿你做个好梦", 80, 76]
];

function addWish(text, left, top) {
  const star = document.createElement("span");
  star.className = "wish-star";
  star.textContent = text;
  star.style.left = `${left}%`;
  star.style.top = `${top}%`;
  wishes.append(star);
}
seedWishes.forEach(([text, left, top]) => addWish(text, left, top));
wishInput.addEventListener("input", () => { counter.textContent = wishInput.value.length; });
wishForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = wishInput.value.trim();
  if (!text) {
    wishInput.focus();
    return;
  }
  addWish(text, 20 + Math.random() * 60, 18 + Math.random() * 64);
  wishInput.value = "";
  counter.textContent = "0";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileMenu.classList.contains("open")) setMenu(false);
});
