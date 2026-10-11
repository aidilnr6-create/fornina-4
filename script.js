// =====================
// 1. Trigger musik pas klik tombol di hero
// =====================
const startBtn = document.getElementById('startBtn');
const bgm = document.getElementById('bgm');
const musicToggle = document.getElementById('musicToggle');
let musicPlaying = false;

startBtn.addEventListener('click', () => {
  bgm.volume = 0.5;
  bgm.play().then(() => {
    musicPlaying = true;
    musicToggle.textContent = '🔊';
  }).catch(err => {
    console.log('Autoplay diblokir / file lagu belum ada:', err);
  });

  // Auto scroll ke section berikutnya
  document.querySelector('.section').scrollIntoView({ behavior: 'smooth' });
});

// Toggle musik
musicToggle.addEventListener('click', () => {
  if (musicPlaying) {
    bgm.pause();
    musicPlaying = false;
    musicToggle.textContent = '🔇';
  } else {
    bgm.play();
    musicPlaying = true;
    musicToggle.textContent = '🔊';
  }
});

// =====================
// 2. Reveal on scroll
// =====================
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));

// =====================
// 3. Kata semangat random
// =====================
const boostMessages = [
  "Nina, kamu udah hebat banget hari ini 🌷",
  "Capek itu wajar, kamu bukan robot 💛",
  "Istirahat dulu, dunia bisa nunggu ⏳",
  "Kamu berharga, bahkan di hari yang berat ✨",
  "Nanti aku peluk kamu erat-erat ya 🤗",
  "Pelan-pelan aja, ngga harus buru-buru 🌸",
  "Aku bangga sama kamu, selalu 🥹",
  "Kamu lebih kuat dari yang kamu kira 💪",
  "Hari ini berat, besok pasti lebih ringan 🌤️",
  "Terima kasih udah bertahan sampai sini 🤍",
  "Minum air dulu, tarik napas, kamu aman 🌿",
  "Kalau dunia lagi jahat, aku tetap di sini 💛"
];

const boostBtn = document.getElementById('boostBtn');
const boostText = document.getElementById('boostText');
let lastIndex = -1;

boostBtn.addEventListener('click', () => {
  let idx;
  do {
    idx = Math.floor(Math.random() * boostMessages.length);
  } while (idx === lastIndex && boostMessages.length > 1);
  lastIndex = idx;

  boostText.classList.add('fade');
  setTimeout(() => {
    boostText.textContent = boostMessages[idx];
    boostText.classList.remove('fade');
  }, 300);
});

// =====================
// 4. Peluk virtual — muncul hati
// =====================
const hugBtn = document.getElementById('hugBtn');
const hugContainer = document.getElementById('hugContainer');
const emojis = ['💛', '🌸', '✨', '🤗', '💕', '🌷'];

function spawnHeart() {
  const heart = document.createElement('span');
  heart.className = 'hug-heart';
  heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  heart.style.left = Math.random() * 100 + '%';
  heart.style.bottom = '-50px';
  heart.style.fontSize = (1.5 + Math.random() * 1.5) + 'rem';
  heart.style.animationDuration = (2.5 + Math.random() * 1.5) + 's';

  hugContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 4000);
}

hugBtn.addEventListener('click', () => {
  // Spawn 20 hati dalam 1 detik
  for (let i = 0; i < 20; i++) {
    setTimeout(spawnHeart, i * 50);
  }
});

// =====================
// 5. Body loaded (fade in)
// =====================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// =====================
// 6. Floating hearts background (Love melayang)
// =====================
const bgFloaties = document.getElementById('bg-floaties');
const bgEmojis = ['💛', '🌸', '✨', '🤗', '💕', '🌷', '❤️', '💖', '🥺', '💌'];

function createBgHeart() {
  if (!bgFloaties) return;
  const heart = document.createElement('span');
  heart.className = 'bg-float-heart';
  heart.textContent = bgEmojis[Math.floor(Math.random() * bgEmojis.length)];
  
  // Posisi random di layar
  heart.style.left = Math.random() * 100 + '%';
  heart.style.fontSize = (1 + Math.random() * 1.5) + 'rem'; // ukuran beda-beda
  heart.style.animationDuration = (8 + Math.random() * 8) + 's'; // durasi beda-beda
  heart.style.animationDelay = Math.random() * 2 + 's';
  
  bgFloaties.appendChild(heart);

  // Hapus elemen setelah animasi selesai biar browser ngga berat
  setTimeout(() => heart.remove(), 16000);
}

// Munculin emoji baru tiap 1.5 detik
setInterval(createBgHeart, 1500);
// Langsung munculin beberapa pas pertama buka
for (let i = 0; i < 5; i++) {
  setTimeout(createBgHeart, i * 300);
}