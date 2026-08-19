"use strict";

/* ═══════════════════════════════════════════════════════════
   SARVAR BIRTHDAY GIFT  –  index.js
   ─────────────────────────────────────────────────────────
   Sections:
   1. DOM refs
   2. Terminal typing
   3. Run button  →  Birthday section
   4. Music control
   5. Birthday Cake Lightbox
   6. Surprise-trigger button  →  Final surprise + 2nd Secret Gift
   7. Confetti (canvas)
   8. Secret password
═══════════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────
   1. DOM REFS
───────────────────────────────────────── */
const terminalText     = document.getElementById("terminalText");
const runBtn           = document.getElementById("runBtn");
const terminal         = document.getElementById("terminal");
const birthday         = document.getElementById("birthday");
const unlockBtn        = document.getElementById("unlockBtn");
const passwordInput    = document.getElementById("password");
const secretResult     = document.getElementById("secretResult");
const bgMusic          = document.getElementById("bgMusic");
const musicBtn         = document.getElementById("musicBtn");
const musicWave        = document.getElementById("musicWave");
const surpriseBtn      = document.getElementById("surpriseBtn");
const surpriseOverlay  = document.getElementById("surprise");
const cakeContainer    = document.getElementById("cakeContainer");
const mainCakeImg      = document.getElementById("mainCakeImg");

const secondGiftSection = document.getElementById("secondGiftSection");
const trollGiftBtn      = document.getElementById("trollGiftBtn");
const trollReveal       = document.getElementById("trollReveal");
const closeSurpriseBtn  = document.getElementById("closeSurpriseBtn");


/* ─────────────────────────────────────────
   2. TERMINAL TYPING
───────────────────────────────────────── */
const lines = [
    "> INITIALIZING SARVAR SYSTEM...",
    "> Connecting to birthday server...",
    "> Connection established. ✓",
    "",
    "> Scanning user...",
    "> USER FOUND: SARVAR",
    "> AGE: 17",
    "> STATUS: Legend 😎",
    "",
    "> Checking security...",
    "> Security: BYPASSED ✓",
    "",
    "> WARNING ⚠",
    "> SPECIAL EVENT DETECTED!",
    "",
    "> Birthday protocol activated...",
    "> Loading SARVAR.exe...",
    "> SYSTEM READY. 🎂"
];

let lineIndex = 0;

function typeLine() {
    if (lineIndex >= lines.length) {
        runBtn.classList.remove("hidden");
        return;
    }
    terminalText.innerHTML += lines[lineIndex] + "<br>";
    lineIndex++;
    setTimeout(typeLine, 350);
}

typeLine();


/* ─────────────────────────────────────────
   3. RUN BUTTON
───────────────────────────────────────── */
runBtn.addEventListener("click", () => {
    terminal.classList.add("hidden");
    birthday.classList.remove("hidden");
    document.body.style.background = "#020b05";

    // try autoplay music
    tryAutoplay();
});


/* ─────────────────────────────────────────
   4. MUSIC CONTROL
───────────────────────────────────────── */
bgMusic.volume = 0.35;
let musicPlaying = false;

function tryAutoplay() {
    const p = bgMusic.play();
    if (p !== undefined) {
        p.then(() => {
            musicPlaying = true;
            syncMusicUI();
        }).catch(() => {
            // autoplay blocked – user can click button
            musicBtn.textContent = "🎵 Music ON";
            syncMusicUI();
        });
    }
}

function syncMusicUI() {
    if (musicPlaying) {
        musicBtn.textContent = "🔇 Music OFF";
        musicWave.classList.remove("paused");
    } else {
        musicBtn.textContent = "🎵 Music ON";
        musicWave.classList.add("paused");
    }
}

musicBtn.addEventListener("click", () => {
    if (musicPlaying) {
        bgMusic.pause();
        musicPlaying = false;
        syncMusicUI();
    } else {
        bgMusic.play().then(() => {
            musicPlaying = true;
            syncMusicUI();
        }).catch((err) => {
            console.warn("Audio play prevented:", err);
            musicPlaying = false;
            syncMusicUI();
        });
    }
});

// init paused state
musicWave.classList.add("paused");


/* ─────────────────────────────────────────
   5. BIRTHDAY CAKE LIGHTBOX
───────────────────────────────────────── */
const lbEl      = document.getElementById("lightbox");
const lbImg     = document.getElementById("lb-img");
const lbClose   = document.getElementById("lb-close");
const lbOverlay = document.getElementById("lightbox-overlay");

function openCakeLightbox() {
    lbImg.src = mainCakeImg.src;
    lbEl.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeCakeLightbox() {
    lbEl.classList.remove("active");
    document.body.style.overflow = "";
}

if (cakeContainer) {
    cakeContainer.addEventListener("click", openCakeLightbox);
}

lbClose.addEventListener("click", closeCakeLightbox);
lbOverlay.addEventListener("click", closeCakeLightbox);

document.addEventListener("keydown", (e) => {
    if (!lbEl.classList.contains("active")) return;
    if (e.key === "Escape") closeCakeLightbox();
});


/* ─────────────────────────────────────────
   6. FINAL SURPRISE + 2ND SECRET GIFT
───────────────────────────────────────── */
let surpriseDone = false;

if (surpriseBtn) {
    surpriseBtn.addEventListener("click", () => {
        if (surpriseDone) return;
        surpriseDone = true;
        launchSurprise();
    });
}

function launchSurprise() {
    surpriseOverlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    const giftEmoji   = document.getElementById("giftEmoji");
    const surpriseMsg = document.getElementById("surpriseMsg");
    const typingArea  = document.getElementById("surpriseTyping");

    // 1. Shake gift
    setTimeout(() => {
        giftEmoji.classList.add("shaking");
    }, 300);

    // 2. Open gift
    setTimeout(() => {
        giftEmoji.classList.remove("shaking");
        giftEmoji.classList.add("opening");
    }, 1400);

    // 3. Show message
    setTimeout(() => {
        giftEmoji.style.display = "none";
        surpriseMsg.classList.add("visible");

        // Start confetti
        startConfettiCanvas();

        // 4. Fast typing effect
        const fullText =
`> Sarvar, seni bilgan kundan beri
> hayot qiziqroq bo'lib ketdi... 😂

> Sen bilan o'tgan har bir kun
> rom-com emas, balki thriller 😂
> lekin yaxshi ma'noda 🔥

> 17 yosh — endi "bola emasman"
> deydigan, lekin onam uchun
> hali ham "bolam" bo'lgan yosh 😂

> Maqsadlaring ko'p, vaqting kam,
> lekin sen bajara olasan!
> Chunki... sen Sarvar-ku 😎

> Har doim shunaqa baquvvat,
> kulgili va g'alati tur.
> Aynan shunday Sarvar kerak! ❤️

> SYSTEM UPDATE COMPLETE.
> SARVAR v17.0 — READY TO CONQUER. 🚀`;

        // Faster speed: 14ms
        typeText(typingArea, fullText, 14, () => {
            // Typing finished callback -> Reveal 2nd Secret Gift
            setTimeout(() => {
                showSecondSecretGift();
            }, 1000);
        });

    }, 2100);
}

function typeText(el, text, speed, onComplete) {
    let i = 0;
    el.innerHTML = '<span class="typing-cursor">█</span>';

    const timer = setInterval(() => {
        if (i >= text.length) {
            clearInterval(timer);
            el.innerHTML = el.innerHTML.replace('<span class="typing-cursor">█</span>', '');
            if (typeof onComplete === "function") {
                onComplete();
            }
            return;
        }
        const cursor = el.querySelector(".typing-cursor");
        if (cursor) {
            cursor.insertAdjacentText("beforebegin", text[i]);
        } else {
            el.innerHTML += text[i];
        }
        i++;

        // auto-scroll typing box
        el.scrollTop = el.scrollHeight;
    }, speed);
}

function showSecondSecretGift() {
    secondGiftSection.classList.remove("hidden");
    closeSurpriseBtn.classList.remove("hidden");

    // Smooth scroll down to second gift
    secondGiftSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// 2nd Gift Troll Click
if (trollGiftBtn) {
    trollGiftBtn.addEventListener("click", () => {
        trollGiftBtn.style.display = "none";
        trollReveal.classList.remove("hidden");

        // Troll confetti burst with middle finger + laughing emojis!
        trollConfettiBurst();

        // Scroll to troll reveal
        trollReveal.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// Close Surprise Modal
if (closeSurpriseBtn) {
    closeSurpriseBtn.addEventListener("click", () => {
        surpriseOverlay.classList.add("hidden");
        document.body.style.overflow = "";
        stopConfettiCanvas();
    });
}


/* ─────────────────────────────────────────
   7. CONFETTI (canvas & troll burst)
───────────────────────────────────────── */
let confettiRAF = null;
let confettiParticles = [];

function startConfettiCanvas() {
    const canvas = document.getElementById("confettiCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const emojis = ["🎉","🎂","⭐","🎊","💚","✨","😂","🔥"];
    confettiParticles = [];

    for (let i = 0; i < 90; i++) {
        confettiParticles.push({
            x:    Math.random() * canvas.width,
            y:    Math.random() * -canvas.height,
            vy:   1.5 + Math.random() * 3,
            vx:   (Math.random() - .5) * 2,
            rot:  Math.random() * 360,
            rotV: (Math.random() - .5) * 6,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            size: 18 + Math.random() * 18
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiParticles.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot * Math.PI / 180);
            ctx.font = `${p.size}px serif`;
            ctx.fillText(p.emoji, 0, 0);
            ctx.restore();

            p.x   += p.vx;
            p.y   += p.vy;
            p.rot += p.rotV;

            if (p.y > canvas.height + 40) {
                p.y = -40;
                p.x = Math.random() * canvas.width;
            }
        });
        confettiRAF = requestAnimationFrame(draw);
    }
    draw();
}

function stopConfettiCanvas() {
    if (confettiRAF) cancelAnimationFrame(confettiRAF);
    const canvas = document.getElementById("confettiCanvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function trollConfettiBurst() {
    const emojis = ["🖕","😂","💀","🔥","🤣","🎉","💥"];
    for (let i = 0; i < 80; i++) {
        const p = document.createElement("span");
        p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.cssText = `
            position:fixed;
            left:${Math.random()*100}vw;
            top:-30px;
            font-size:${20+Math.random()*24}px;
            z-index:30000;
            pointer-events:none;
            transition:top 2.2s linear, transform 2.2s linear;
        `;
        document.body.appendChild(p);
        requestAnimationFrame(() => {
            p.style.top = "110vh";
            p.style.transform = `rotate(${Math.random()*720}deg)`;
        });
        setTimeout(() => p.remove(), 2500);
    }
}


/* ─────────────────────────────────────────
   8. SECRET PASSWORD
───────────────────────────────────────── */
unlockBtn.addEventListener("click", handleUnlock);
passwordInput.addEventListener("keydown", e => { if (e.key === "Enter") handleUnlock(); });

let bgConfettiRAF = null;
let bgConfettiParticles = [];

function handleUnlock() {
    const val = passwordInput.value.trim();

    if (val === "2025") {

        secretResult.innerHTML = `
<div class="success">

🎉 ACCESS GRANTED ✓ 🎉<br><br>

🎂 HAPPY 17TH BIRTHDAY, SARVAR! 🎂<br><br>

Bugun oddiy kun emas...<br>
Bugun SARVAR v17.0 versiyasiga yangilandi 😂<br><br>

Yangi versiyada:<br>
✔️ +1 yosh<br>
✔️ +100 ta yangi xotira<br>
✔️ +999 ta kulgili gap<br>
✔️ +∞ ta muammo 😂<br><br>

Rostini aytganda, sen bilan o'tgan vaqtlarimiz juda ko'p.<br>
Ba'zilari kulgili, ba'zilari esda qoladigan,<br>
ba'zilari esa umuman gapirishga arzimaydi 💀😂<br><br>

Har doim shunaqa kulib yur,<br>
maqsadlaringga yet,<br>
omading doim kulib tursin.<br>
17 yosh yangi va zo'r xotiralarga boy bo'lsin! ❤️<br><br>

Va eng muhimi...<br><br>

DO'STLIK<br>
STATUS: RUNNING ✓<br>
VERSION: FOREVER ❤️<br><br>

Yana bir bor:<br><br>
🎉🎂 HAPPY BIRTHDAY, SARVAR! 🎂🎉<br><br>

<small>Friendship.exe successfully installed.<br>
No uninstall option available 😂</small>

</div>`;

        // Show surprise button
        if (surpriseBtn) surpriseBtn.classList.remove("hidden");

        // Smooth falling emojis like secret gift, but falls down and disappears
        triggerPasswordConfetti();

    } else {
        secretResult.innerHTML = `<span class="denied">ACCESS DENIED 😂 Parol noto'g'ri!</span>`;
    }
}

// Smooth canvas falling emojis that fall from top and disappear
function triggerPasswordConfetti() {
    const canvas = document.getElementById("bgConfettiCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (bgConfettiRAF) {
        cancelAnimationFrame(bgConfettiRAF);
        bgConfettiRAF = null;
    }

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const emojis = ["🎉", "🎂", "⭐", "🎊", "💚", "✨", "😂", "🔥", "🍰", "🥳", "🎁", "🚀"];
    bgConfettiParticles = [];
    const count = 90;

    for (let i = 0; i < count; i++) {
        bgConfettiParticles.push({
            x: Math.random() * width,
            y: -(Math.random() * height * 0.85 + 30),
            vy: 2.2 + Math.random() * 3.5,
            vx: (Math.random() - 0.5) * 2.2,
            rot: Math.random() * 360,
            rotV: (Math.random() - 0.5) * 5,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            size: 20 + Math.random() * 18
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        let activeCount = 0;

        for (let i = 0; i < bgConfettiParticles.length; i++) {
            const p = bgConfettiParticles[i];

            p.x += p.vx;
            p.y += p.vy;
            p.rot += p.rotV;

            if (p.y < height + 60) {
                activeCount++;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rot * Math.PI) / 180);
                ctx.font = `${p.size}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(p.emoji, 0, 0);
                ctx.restore();
            }
        }

        if (activeCount > 0) {
            bgConfettiRAF = requestAnimationFrame(draw);
        } else {
            ctx.clearRect(0, 0, width, height);
            bgConfettiRAF = null;
            bgConfettiParticles = [];
        }
    }

    bgConfettiRAF = requestAnimationFrame(draw);
}
