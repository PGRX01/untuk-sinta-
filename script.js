/* ====================================================
     1) DEKORASI HATI MELAYANG
     Membuat beberapa elemen hati secara acak (posisi, ukuran,
     durasi, delay) lalu menempelkannya ke #floaters supaya
     background terasa hidup tanpa perlu gambar/video.
  ==================================================== */
  const floaters = document.getElementById('floaters');
  const heartChars = ['♡','❤','✿'];
  for(let i=0; i<18; i++){
    const el = document.createElement('span');
    el.textContent = heartChars[Math.floor(Math.random()*heartChars.length)];
    el.style.left = Math.random()*100 + 'vw';
    el.style.fontSize = (14 + Math.random()*22) + 'px';
    el.style.animationDuration = (10 + Math.random()*12) + 's';
    el.style.animationDelay = (Math.random()*10) + 's';
    floaters.appendChild(el);
  }

  /* ====================================================
     2) COUNTDOWN TIMER
     TARGET_DATE = tanggal ulang tahun yang dituju.
     Ganti tanggalnya sesuai hari spesial yang kamu maksud.
     Format: 'YYYY-MM-DDTHH:mm:ss'
  ==================================================== */
  const TARGET_DATE = new Date('2027-03-30T00:00:00'); // ganti tanggal di sini

  function updateCountdown(){
    const now = new Date();
    let diff = TARGET_DATE - now;
    if(diff < 0) diff = 0;

    const days  = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const mins  = Math.floor((diff / (1000*60)) % 60);
    const secs  = Math.floor((diff / 1000) % 60);

    // Menampilkan angka dengan format 2 digit (contoh: 05, bukan 5)
    document.getElementById('cd-days').textContent  = String(days).padStart(2,'0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2,'0');
    document.getElementById('cd-mins').textContent  = String(mins).padStart(2,'0');
    document.getElementById('cd-secs').textContent  = String(secs).padStart(2,'0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000); // diperbarui setiap 1 detik

  /* ====================================================
     3) BACKSOUND / MUSIK LATAR
     Klik pada tombol loading screen ("Ketuk untuk membuka")
     dihitung sebagai interaksi pengguna, jadi browser pasti
     mengizinkan audio diputar tepat saat itu (tidak diblokir).
  ==================================================== */
  const bgMusic = document.getElementById('bgMusic');
  const musicBtn = document.getElementById('musicToggle');
  let isPlaying = false;

  function playMusic(){
    bgMusic.play().then(()=>{
      isPlaying = true;
      musicBtn.classList.add('spin');
    }).catch(()=>{ isPlaying = false; });
  }

  // Tombol manual di pojok kanan bawah untuk memutar/menjeda musik kapan saja
  musicBtn.addEventListener('click', (e)=>{
    e.stopPropagation();
    if(isPlaying){
      bgMusic.pause();
      isPlaying = false;
      musicBtn.classList.remove('spin');
    } else {
      playMusic();
    }
  });

  /* ====================================================
     4) LOADING SCREEN: GENERATE BUNGA ACAK
     Membuat sejumlah emoji bunga dengan posisi, warna glow,
     ukuran, dan delay animasi acak, lalu ditempel ke
     #flowerField supaya tiap kali dibuka terasa "hidup".
  ==================================================== */
  const flowerField = document.getElementById('flowerField');
  const flowerEmojis = ['🌸','🌺','🌼','🌻','🌷','💐'];
  const glowClasses  = ['glow-blue','glow-pink','glow-yellow','glow-purple'];

  for(let i=0; i<24; i++){
    const f = document.createElement('span');
    f.className = 'flower ' + glowClasses[Math.floor(Math.random()*glowClasses.length)];
    f.textContent = flowerEmojis[Math.floor(Math.random()*flowerEmojis.length)];
    f.style.left = Math.random()*94 + 'vw';
    f.style.top  = Math.random()*90 + 'vh';
    f.style.setProperty('--delay', (Math.random()*1.2) + 's');
    f.style.fontSize = (28 + Math.random()*40) + 'px';
    flowerField.appendChild(f);
  }

  /* ====================================================
     5) MASUK KE WEBSITE (tutup loading screen)
     Saat tombol "Ketuk untuk membuka" diklik:
     - loading screen memudar (class .hide)
     - konten utama website muncul (class .show pada siteContent)
     - musik latar mulai diputar bersamaan
  ==================================================== */
  const loadingScreen = document.getElementById('loadingScreen');
const siteContent   = document.getElementById('siteContent');
const loginCard     = document.getElementById('loginCard');
const loginName     = document.getElementById('loginName');
const loginDay      = document.getElementById('loginDay');
const loginMonth    = document.getElementById('loginMonth');
const loginSubmit   = document.getElementById('loginSubmit');
const loginError    = document.getElementById('loginError');

const monthNames = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
for(let d=1; d<=31; d++){
  const opt = document.createElement('option');
  opt.value = String(d);
  opt.textContent = d;
  loginDay.appendChild(opt);
}
monthNames.forEach((name, idx)=>{
  const opt = document.createElement('option');
  opt.value = String(idx+1);
  opt.textContent = name;
  loginMonth.appendChild(opt);
});

const VALID_NAME  = 'sayangku'; // ganti sesuai nama yang diinginkan (huruf kecil semua)
const VALID_DAY   = '30';
const VALID_MONTH = '3'; // Maret

// Pintu masuk 2: nama & tanggal lain -> diarahkan ke website/halaman LAIN
// Ganti 'halaman-lain.html' dengan nama file HTML yang kamu buat nanti
// (taruh file itu di folder yang SAMA dengan index.html)
const REDIRECT_NAME  = 'sinta';
const REDIRECT_DAY   = '30';
const REDIRECT_MONTH = '3'; // Maret
const REDIRECT_URL   = 'sinta.html'; // ganti sesuai nama file HTML tujuan

function revealSite(){
  loadingScreen.classList.add('hide');
  siteContent.classList.add('show');
  playMusic();
  setTimeout(()=> loadingScreen.remove(), 1000);
}

function tryLogin(){
  const nameInput  = loginName.value.trim().toLowerCase();
  const dayInput   = loginDay.value;
  const monthInput = loginMonth.value;

  const nameOk  = nameInput === VALID_NAME;
  const dayOk   = dayInput === VALID_DAY;
  const monthOk = monthInput === VALID_MONTH;

  const redirectOk = nameInput === REDIRECT_NAME && dayInput === REDIRECT_DAY && monthInput === REDIRECT_MONTH;

  if(nameOk && dayOk && monthOk){
    loginError.classList.remove('show');
    loginCard.classList.add('login-success');
    setTimeout(revealSite, 550);
  } else if(redirectOk){
    loginError.classList.remove('show');
    loginCard.classList.add('login-success');
    setTimeout(() => { window.location.href = REDIRECT_URL; }, 550);
  } else {
    loginCard.classList.remove('shake');
    void loginCard.offsetWidth;
    loginCard.classList.add('shake');
    loginError.classList.add('show');
  }
}

loginSubmit.addEventListener('click', tryLogin);
[loginName, loginDay, loginMonth].forEach(el=>{
  el.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') tryLogin(); });
});

  /* ====================================================
     6) EFEK BUNGA & PITA SAAT TOMBOL "🤍 Untuk Kamu" DIKLIK
     Membuat sejumlah partikel (emoji bunga/kilauan + potongan
     pita berwarna) yang "meledak" keluar dari posisi tombol,
     terbang ke arah acak, lalu jatuh & memudar — seperti
     confetti kejutan ulang tahun.
  ==================================================== */
  const ctaBtn = document.querySelector('.btn-cta');
  const ctaFlowerEmojis = ['🌸','🌺','🌼','🌷','💐','🌹'];
  const ctaRibbonColors = ['#f2879f','#ffd6e0','#e05c7c','#ffe6ee','#ffd23f','#fff4d6'];

  function spawnFlowerRibbonBurst(x, y){
    const burst = document.createElement('div');
    burst.className = 'celebration-burst';
    document.body.appendChild(burst);

    const totalParticles = 28;
    for(let i=0; i<totalParticles; i++){
      const el = document.createElement('span');
      const isRibbon = i % 3 === 0; // sepertiga jadi pita, sisanya bunga/kilauan

      // Arah & jarak acak untuk tiap partikel (efek "meledak" keluar)
      const angle   = Math.random() * Math.PI * 2;
      const distance = 70 + Math.random() * 170;
      const dx      = Math.cos(angle) * distance;
      const dyUp    = -(30 + Math.random() * 70);   // naik dulu sesaat
      const dyDown  = 160 + Math.random() * 190;      // lalu jatuh ke bawah
      const rot     = (Math.random() * 720 - 360) + 'deg';

      el.style.setProperty('--dx', dx + 'px');
      el.style.setProperty('--dy1', dyUp + 'px');
      el.style.setProperty('--dy2', dyDown + 'px');
      el.style.setProperty('--rot', rot);
      el.style.left = x + 'px';
      el.style.top  = y + 'px';
      el.style.animationDelay = (Math.random() * 0.15) + 's';

      if(isRibbon){
        el.className = 'burst-ribbon';
        el.style.background = ctaRibbonColors[Math.floor(Math.random() * ctaRibbonColors.length)];
      } else {
        el.className = 'burst-flower';
        el.textContent = Math.random() < 0.25
          ? '✨'
          : ctaFlowerEmojis[Math.floor(Math.random() * ctaFlowerEmojis.length)];
        el.style.fontSize = (16 + Math.random() * 18) + 'px';
      }

      burst.appendChild(el);
    }

    // Bersihkan elemen burst dari DOM setelah animasi selesai
    setTimeout(() => burst.remove(), 1700);
  }

  if(ctaBtn){
    ctaBtn.addEventListener('click', () => {
      const rect = ctaBtn.getBoundingClientRect();
      spawnFlowerRibbonBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);

      // Efek "pop" kecil pada tombolnya sendiri
      ctaBtn.classList.remove('pop');
      void ctaBtn.offsetWidth; // reset animasi supaya bisa diklik berkali-kali
      ctaBtn.classList.add('pop');
    });
  }