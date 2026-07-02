const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const translations = {
  "zh-CN": {
    navHome: "首页", navMeet: "相遇", navMemory: "记忆", navWorld: "世界", navAbout: "关于",
    heroKicker: "来自微光森林的朋友", heroTitle: "有些相遇，<br>会让世界变得柔软。", heroLead: "LUMI 不擅长说大道理。它只会在你需要的时候，安静地靠近一点。", heroCta: "遇见 LUMI",
    storyKicker: "带它回家", storyTitle: "遇见<br><em>LUMI</em>", storySubtitle: "从此，它把陪伴挂在日常里。", storyBody: "藏进背包，路过晚风，也陪你看一场雨。它不需要被照顾得很好，只想参与你平凡又珍贵的每一天。", profileCta: "认识 LUMI",
    memoryTitle: "小小<br><em>记忆家</em>", memoryBody: "记忆不是宏大的故事，<br>是你回头时，它刚好也在。", memoryCta: "翻一张记忆", memoryHint: "点击任意照片，进入会动的回忆",
    photo1: "雨后的第一颗星", photo2: "藏进旅行的口袋", photo3: "溪水会记得", photo4: "晚安，小小冒险家", photo5: "光落在毛茸茸上", photo6: "出发前的夜晚", photo7: "我们又多了一天",
    worldTitle: "每一束微光，<br>都在等一个名字。", worldBody: "写下一句今天想对自己说的话。它会成为 LUMI 世界里新亮起的一颗星。", wishLabel: "给今天留句话", wishPlaceholder: "比如：慢一点，也没关系", wishButton: "点亮",
    aboutTitle: "从一张草图，<br>到你身边。", aboutBody: "LUMI 是一个关于陪伴、好奇与温柔勇气的原创角色计划。希望它像一盏不刺眼的小灯，在普通日子里陪你走一段。", backForest: "回到森林",
    petLumi: "摸摸 LUMI", memoryPlayHint: "移动鼠标看看它，点击 LUMI 和它玩", affection: "亲密度", languageTitle: "选择语言", languageNote: "简体中文为默认语言", musicPlaying: "LUMI 轻音乐正在播放"
  },
  "zh-TW": {
    navHome: "首頁", navMeet: "相遇", navMemory: "記憶", navWorld: "世界", navAbout: "關於",
    heroKicker: "來自微光森林的朋友", heroTitle: "有些相遇，<br>會讓世界變得柔軟。", heroLead: "LUMI 不擅長說大道理。它只會在你需要的時候，安靜地靠近一點。", heroCta: "遇見 LUMI",
    storyKicker: "帶它回家", storyTitle: "遇見<br><em>LUMI</em>", storySubtitle: "從此，它把陪伴掛在日常裡。", storyBody: "藏進背包，路過晚風，也陪你看一場雨。它只想參與你平凡又珍貴的每一天。", profileCta: "認識 LUMI",
    memoryTitle: "小小<br><em>記憶家</em>", memoryBody: "記憶不是宏大的故事，<br>是你回頭時，它剛好也在。", memoryCta: "翻一張記憶", memoryHint: "點擊任意照片，進入會動的回憶",
    photo1: "雨後的第一顆星", photo2: "藏進旅行的口袋", photo3: "溪水會記得", photo4: "晚安，小小冒險家", photo5: "光落在毛茸茸上", photo6: "出發前的夜晚", photo7: "我們又多了一天",
    worldTitle: "每一束微光，<br>都在等一個名字。", worldBody: "寫下一句今天想對自己說的話。它會成為 LUMI 世界裡新亮起的一顆星。", wishLabel: "給今天留句話", wishPlaceholder: "比如：慢一點，也沒關係", wishButton: "點亮",
    aboutTitle: "從一張草圖，<br>到你身邊。", aboutBody: "LUMI 是一個關於陪伴、好奇與溫柔勇氣的原創角色計畫。", backForest: "回到森林",
    petLumi: "摸摸 LUMI", memoryPlayHint: "移動游標看看它，點擊 LUMI 和它玩", affection: "親密度", languageTitle: "選擇語言", languageNote: "簡體中文為預設語言", musicPlaying: "LUMI 輕音樂正在播放"
  },
  en: {
    navHome: "Home", navMeet: "Meet", navMemory: "Memories", navWorld: "World", navAbout: "About",
    heroKicker: "A friend from the forest of tiny lights", heroTitle: "Some encounters<br>make the world feel softer.", heroLead: "LUMI never gives big speeches. It simply comes a little closer when you need it.", heroCta: "Meet LUMI",
    storyKicker: "Bring a little light home", storyTitle: "Meet<br><em>LUMI</em>", storySubtitle: "From now on, companionship lives in the everyday.", storyBody: "Tucked onto your backpack, passing through the evening breeze, staying for the rain—LUMI only wants to share your ordinary, precious days.", profileCta: "Know LUMI",
    memoryTitle: "Little<br><em>memory keeper</em>", memoryBody: "Memories are not grand stories.<br>They are who is there when you look back.", memoryCta: "Shuffle memories", memoryHint: "Open any photo and step into a living memory",
    photo1: "The first star after rain", photo2: "Tucked into the journey", photo3: "The stream remembers", photo4: "Good night, little explorer", photo5: "Light on something fluffy", photo6: "The night before leaving", photo7: "One more day together",
    worldTitle: "Every tiny light<br>is waiting for a name.", worldBody: "Leave a gentle note for yourself today. It will become a new star in LUMI's world.", wishLabel: "A note for today", wishPlaceholder: "For example: It is okay to slow down", wishButton: "Light it",
    aboutTitle: "From a doodle,<br>to your side.", aboutBody: "LUMI is an original character project about companionship, curiosity, and gentle courage—a small light for ordinary days.", backForest: "Back to the forest",
    petLumi: "Pet LUMI", memoryPlayHint: "Move around to look closer, then tap LUMI to play", affection: "Bond", languageTitle: "Choose language", languageNote: "Simplified Chinese is the default", musicPlaying: "LUMI's light music is playing"
  },
  ja: {
    navHome: "ホーム", navMeet: "出会い", navMemory: "思い出", navWorld: "世界", navAbout: "紹介",
    heroKicker: "微光の森から来た友だち", heroTitle: "ある出会いは、<br>世界をやさしくする。", heroLead: "LUMI は難しいことを言いません。必要な時、そっと近くに来てくれます。", heroCta: "LUMI に会う",
    storyKicker: "小さな光を連れて帰ろう", storyTitle: "出会う<br><em>LUMI</em>", storySubtitle: "その日から、日常に寄り添う存在。", storyBody: "バッグに揺られ、夕風を通り、雨を一緒に眺める。LUMI はあなたの大切な毎日に参加したいだけ。", profileCta: "LUMI を知る",
    memoryTitle: "小さな<br><em>思い出係</em>", memoryBody: "思い出は大きな物語ではなく、<br>振り返った時そこにいること。", memoryCta: "思い出をめくる", memoryHint: "写真を開いて、動く思い出へ",
    photo1: "雨上がりの一番星", photo2: "旅のポケットへ", photo3: "小川は覚えている", photo4: "おやすみ、小さな冒険家", photo5: "ふわふわに落ちる光", photo6: "出発前の夜", photo7: "一緒の日が増えた",
    worldTitle: "すべての微光が、<br>名前を待っている。", worldBody: "今日の自分に一言残そう。LUMI の世界に新しい星が灯ります。", wishLabel: "今日への言葉", wishPlaceholder: "ゆっくりでも、大丈夫", wishButton: "灯す",
    aboutTitle: "一枚のスケッチから、<br>あなたのそばへ。", aboutBody: "LUMI は寄り添い、好奇心、やさしい勇気を描くオリジナルキャラクターです。", backForest: "森へ戻る",
    petLumi: "LUMI をなでる", memoryPlayHint: "カーソルを動かし、LUMI をタップして遊ぼう", affection: "なかよし度", languageTitle: "言語を選ぶ", languageNote: "簡体字中国語が標準です", musicPlaying: "LUMI の軽音楽を再生中"
  },
  ko: {
    navHome: "홈", navMeet: "만남", navMemory: "추억", navWorld: "세계", navAbout: "소개",
    heroKicker: "작은 빛의 숲에서 온 친구", heroTitle: "어떤 만남은<br>세상을 더 포근하게 해요.", heroLead: "LUMI는 거창한 말을 하지 않아요. 필요할 때 조용히 조금 더 가까이 옵니다.", heroCta: "LUMI 만나기",
    storyKicker: "작은 빛을 집으로", storyTitle: "만나요<br><em>LUMI</em>", storySubtitle: "이제 일상 속에 함께함을 걸어 둡니다.", storyBody: "가방에 매달려 저녁 바람과 비를 함께 지나며, 평범하고 소중한 하루에 참여하고 싶어 해요.", profileCta: "LUMI 알아보기",
    memoryTitle: "작은<br><em>추억 수집가</em>", memoryBody: "추억은 거대한 이야기가 아니라<br>뒤돌아볼 때 곁에 있는 존재예요.", memoryCta: "추억 섞기", memoryHint: "사진을 눌러 움직이는 추억으로 들어가세요",
    photo1: "비 온 뒤 첫 별", photo2: "여행 주머니 속으로", photo3: "시냇물이 기억해요", photo4: "잘 자, 작은 모험가", photo5: "복슬복슬 위의 빛", photo6: "출발 전날 밤", photo7: "함께한 하루가 또 늘었어요",
    worldTitle: "모든 작은 빛은<br>이름을 기다리고 있어요.", worldBody: "오늘의 나에게 한마디를 남겨 보세요. LUMI의 세계에 새 별이 됩니다.", wishLabel: "오늘에게 한마디", wishPlaceholder: "천천히 가도 괜찮아", wishButton: "밝히기",
    aboutTitle: "한 장의 스케치에서<br>당신 곁으로.", aboutBody: "LUMI는 동행, 호기심, 다정한 용기에 관한 오리지널 캐릭터 프로젝트입니다.", backForest: "숲으로 돌아가기",
    petLumi: "LUMI 쓰다듬기", memoryPlayHint: "움직여 자세히 보고 LUMI를 눌러 놀아 주세요", affection: "친밀도", languageTitle: "언어 선택", languageNote: "중국어 간체가 기본 언어입니다", musicPlaying: "LUMI의 가벼운 음악 재생 중"
  },
  es: {
    navHome: "Inicio", navMeet: "Encuentro", navMemory: "Recuerdos", navWorld: "Mundo", navAbout: "Acerca de",
    heroKicker: "Un amigo del bosque de luces", heroTitle: "Algunos encuentros<br>vuelven el mundo más suave.", heroLead: "LUMI no da grandes discursos. Solo se acerca un poco cuando lo necesitas.", heroCta: "Conoce a LUMI",
    storyKicker: "Lleva una pequeña luz a casa", storyTitle: "Conoce a<br><em>LUMI</em>", storySubtitle: "Desde entonces, la compañía vive en lo cotidiano.", storyBody: "En tu mochila, con la brisa y bajo la lluvia, LUMI quiere compartir tus días sencillos y valiosos.", profileCta: "Descubre a LUMI",
    memoryTitle: "Pequeño<br><em>guardián de recuerdos</em>", memoryBody: "Los recuerdos no son grandes historias,<br>sino quien está cuando miras atrás.", memoryCta: "Mezclar recuerdos", memoryHint: "Abre una foto y entra en un recuerdo vivo",
    photo1: "La primera estrella tras la lluvia", photo2: "Dentro del viaje", photo3: "El arroyo recuerda", photo4: "Buenas noches, explorador", photo5: "Luz sobre lo esponjoso", photo6: "La noche antes de partir", photo7: "Un día más juntos",
    worldTitle: "Cada pequeña luz<br>espera un nombre.", worldBody: "Déjate una frase amable. Será una nueva estrella en el mundo de LUMI.", wishLabel: "Una nota para hoy", wishPlaceholder: "Está bien ir más despacio", wishButton: "Encender",
    aboutTitle: "De un boceto,<br>a tu lado.", aboutBody: "LUMI es un personaje original sobre compañía, curiosidad y valentía amable.", backForest: "Volver al bosque",
    petLumi: "Acaricia a LUMI", memoryPlayHint: "Muévete para mirar y toca a LUMI para jugar", affection: "Vínculo", languageTitle: "Elige idioma", languageNote: "El chino simplificado es el idioma principal", musicPlaying: "Suena la música ligera de LUMI"
  },
  fr: {
    navHome: "Accueil", navMeet: "Rencontre", navMemory: "Souvenirs", navWorld: "Monde", navAbout: "À propos",
    heroKicker: "Un ami de la forêt aux petites lumières", heroTitle: "Certaines rencontres<br>rendent le monde plus doux.", heroLead: "LUMI ne fait pas de grands discours. Il se rapproche simplement quand vous en avez besoin.", heroCta: "Rencontrer LUMI",
    storyKicker: "Ramenez une petite lumière", storyTitle: "Voici<br><em>LUMI</em>", storySubtitle: "Désormais, sa présence accompagne le quotidien.", storyBody: "Accroché au sac, dans le vent du soir ou sous la pluie, LUMI partage vos jours ordinaires et précieux.", profileCta: "Découvrir LUMI",
    memoryTitle: "Petit<br><em>gardien des souvenirs</em>", memoryBody: "Les souvenirs ne sont pas de grandes histoires,<br>mais ceux qui restent quand on se retourne.", memoryCta: "Mélanger les souvenirs", memoryHint: "Ouvrez une photo et entrez dans un souvenir vivant",
    photo1: "La première étoile après la pluie", photo2: "Glissé dans le voyage", photo3: "Le ruisseau se souvient", photo4: "Bonne nuit, petit explorateur", photo5: "La lumière sur le duvet", photo6: "La veille du départ", photo7: "Un jour de plus ensemble",
    worldTitle: "Chaque petite lumière<br>attend un nom.", worldBody: "Laissez-vous un mot doux. Il deviendra une étoile dans le monde de LUMI.", wishLabel: "Un mot pour aujourd'hui", wishPlaceholder: "Ralentir, c'est aussi avancer", wishButton: "Allumer",
    aboutTitle: "D'un croquis,<br>jusqu'à vous.", aboutBody: "LUMI est un personnage original autour de la présence, de la curiosité et du courage tendre.", backForest: "Retour à la forêt",
    petLumi: "Caresser LUMI", memoryPlayHint: "Bougez pour regarder, puis touchez LUMI pour jouer", affection: "Complicité", languageTitle: "Choisir la langue", languageNote: "Le chinois simplifié est la langue principale", musicPlaying: "La musique légère de LUMI joue"
  },
  de: {
    navHome: "Start", navMeet: "Begegnung", navMemory: "Erinnerungen", navWorld: "Welt", navAbout: "Über uns",
    heroKicker: "Ein Freund aus dem Wald der kleinen Lichter", heroTitle: "Manche Begegnungen<br>machen die Welt sanfter.", heroLead: "LUMI hält keine großen Reden. Wenn du es brauchst, rückt es einfach ein wenig näher.", heroCta: "LUMI treffen",
    storyKicker: "Nimm ein kleines Licht mit", storyTitle: "Triff<br><em>LUMI</em>", storySubtitle: "Von nun an wohnt Begleitung im Alltag.", storyBody: "Am Rucksack, im Abendwind und im Regen möchte LUMI deine einfachen, kostbaren Tage teilen.", profileCta: "LUMI kennenlernen",
    memoryTitle: "Kleiner<br><em>Erinnerungshüter</em>", memoryBody: "Erinnerungen sind keine großen Geschichten,<br>sondern wer beim Zurückblicken da ist.", memoryCta: "Erinnerungen mischen", memoryHint: "Öffne ein Foto und betrete eine lebendige Erinnerung",
    photo1: "Der erste Stern nach dem Regen", photo2: "In die Reise gepackt", photo3: "Der Bach erinnert sich", photo4: "Gute Nacht, kleiner Entdecker", photo5: "Licht auf weichem Fell", photo6: "Die Nacht vor der Reise", photo7: "Ein weiterer Tag zusammen",
    worldTitle: "Jedes kleine Licht<br>wartet auf einen Namen.", worldBody: "Hinterlasse dir heute einen freundlichen Satz. Er wird ein neuer Stern in LUMIs Welt.", wishLabel: "Eine Notiz für heute", wishPlaceholder: "Langsamer ist auch in Ordnung", wishButton: "Anzünden",
    aboutTitle: "Von einer Skizze<br>an deine Seite.", aboutBody: "LUMI ist ein originelles Figurenprojekt über Nähe, Neugier und sanften Mut.", backForest: "Zurück in den Wald",
    petLumi: "LUMI streicheln", memoryPlayHint: "Bewege dich zum Umschauen und tippe LUMI zum Spielen an", affection: "Nähe", languageTitle: "Sprache wählen", languageNote: "Vereinfachtes Chinesisch ist die Standardsprache", musicPlaying: "LUMIs leichte Musik läuft"
  }
};

const languageLabels = { "zh-CN": "简中", "zh-TW": "繁中", en: "EN", ja: "日本", ko: "한국", es: "ES", fr: "FR", de: "DE" };
let currentLanguage = localStorage.getItem("lumi-language") || "zh-CN";
if (!translations[currentLanguage]) currentLanguage = "zh-CN";

function applyLanguage(code) {
  const dictionary = translations[code] || translations["zh-CN"];
  qsa("[data-i18n]").forEach((element) => {
    const value = dictionary[element.dataset.i18n] ?? translations["zh-CN"][element.dataset.i18n];
    if (!value) return;
    if (element.hasAttribute("data-i18n-html")) element.innerHTML = value;
    else element.textContent = value;
  });
  qsa("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    element.placeholder = dictionary[key] || translations["zh-CN"][key];
  });
  document.documentElement.lang = code;
  qs(".language").textContent = languageLabels[code];
  qsa("[data-lang]").forEach((button) => button.classList.toggle("active", button.dataset.lang === code));
  currentLanguage = code;
  localStorage.setItem("lumi-language", code);
}

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
  header.classList.toggle("scrolled", window.scrollY > 32);
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    qsa(".parallax").forEach((layer) => {
      const offset = layer.parentElement.getBoundingClientRect().top;
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

// Theme mode
const themeButton = qs(".theme-toggle");
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute("aria-pressed", String(theme === "light"));
  themeButton.setAttribute("aria-label", theme === "light" ? "切换为深色模式" : "切换为明亮模式");
  localStorage.setItem("lumi-theme", theme);
}
setTheme(localStorage.getItem("lumi-theme") || "dark");
themeButton.addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));

// Cheerful generative music (Web Audio, no external audio file required)
const soundButton = qs(".sound-toggle");
const musicStatus = qs(".music-status");
const music = { context: null, master: null, timer: null, nextTime: 0, step: 0, playing: false };
const melody = [0, 4, 7, 9, 7, 4, 2, 7, 0, 4, 7, 11, 9, 7, 4, 2];
const roots = [48, 53, 45, 43];
const noteLength = 60 / 84 / 2;
const midiToFrequency = (note) => 440 * (2 ** ((note - 69) / 12));

function playBell(note, time, volume = 0.12, duration = 1.4) {
  const context = music.context;
  const oscillator = context.createOscillator();
  const shimmer = context.createOscillator();
  const gain = context.createGain();
  const shimmerGain = context.createGain();
  oscillator.type = "sine";
  shimmer.type = "sine";
  oscillator.frequency.setValueAtTime(midiToFrequency(note), time);
  shimmer.frequency.setValueAtTime(midiToFrequency(note) * 2.01, time);
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(volume, time + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
  shimmerGain.gain.value = 0.23;
  oscillator.connect(gain);
  shimmer.connect(shimmerGain).connect(gain);
  gain.connect(music.master);
  oscillator.start(time); shimmer.start(time);
  oscillator.stop(time + duration + 0.05); shimmer.stop(time + duration + 0.05);
}

function playPad(root, time) {
  [0, 4, 7].forEach((offset, index) => playBell(root + offset, time, 0.028 - index * 0.004, noteLength * 7.5));
}

function scheduleMusic() {
  while (music.nextTime < music.context.currentTime + 0.25) {
    const phraseStep = music.step % melody.length;
    playBell(72 + melody[phraseStep], music.nextTime, phraseStep % 4 === 0 ? 0.1 : 0.075, 1.15);
    if (music.step % 8 === 0) playPad(roots[Math.floor(music.step / 8) % roots.length], music.nextTime);
    if (music.step % 4 === 2) playBell(84 + melody[phraseStep], music.nextTime, 0.025, 0.7);
    music.nextTime += noteLength;
    music.step += 1;
  }
}

function startMusic() {
  music.context ||= new (window.AudioContext || window.webkitAudioContext)();
  if (!music.master) {
    music.master = music.context.createGain();
    music.master.gain.value = 0.0001;
    music.master.connect(music.context.destination);
  }
  music.context.resume();
  music.master.gain.cancelScheduledValues(music.context.currentTime);
  music.master.gain.setTargetAtTime(0.18, music.context.currentTime, 0.35);
  music.nextTime = music.context.currentTime + 0.06;
  music.timer = window.setInterval(scheduleMusic, 80);
  scheduleMusic();
  music.playing = true;
  soundButton.setAttribute("aria-pressed", "true");
  soundButton.setAttribute("aria-label", "暂停轻音乐");
  musicStatus.classList.add("playing");
}

function stopMusic() {
  clearInterval(music.timer);
  music.timer = null;
  music.master?.gain.setTargetAtTime(0.0001, music.context.currentTime, 0.16);
  music.playing = false;
  soundButton.setAttribute("aria-pressed", "false");
  soundButton.setAttribute("aria-label", "播放轻音乐");
  musicStatus.classList.remove("playing");
}
soundButton.addEventListener("click", () => music.playing ? stopMusic() : startMusic());

// Language selection
const languageDialog = qs(".language-dialog");
qs(".language").addEventListener("click", () => languageDialog.showModal());
qs(".language-close").addEventListener("click", () => languageDialog.close());
qsa("[data-lang]").forEach((button) => button.addEventListener("click", () => {
  applyLanguage(button.dataset.lang);
  languageDialog.close();
}));
languageDialog.addEventListener("click", (event) => { if (event.target === languageDialog) languageDialog.close(); });
applyLanguage(currentLanguage);

// Character profile
const profileDialog = qs(".profile-dialog");
qs(".profile-open").addEventListener("click", () => profileDialog.showModal());
qs(".dialog-close").addEventListener("click", () => profileDialog.close());
profileDialog.addEventListener("click", (event) => { if (event.target === profileDialog) profileDialog.close(); });

// Living memories
const photos = qsa(".polaroid");
const baseTransforms = photos.map((photo) => getComputedStyle(photo).transform);
const memoryDialog = qs(".memory-dialog");
const memoryStage = qs(".memory-stage");
const memoryImage = qs(".memory-image");
const memoryTitle = qs(".memory-dynamic-title");
const memoryIndex = qs(".memory-index");
const affectionValue = qs(".affection strong");
const affectionBar = qs(".affection i b");
let affection = 0;

function createFireflies() {
  const layer = qs(".memory-fireflies");
  if (layer.children.length) return;
  for (let index = 0; index < 14; index += 1) {
    const firefly = document.createElement("i");
    firefly.className = "firefly";
    firefly.style.left = `${8 + Math.random() * 84}%`;
    firefly.style.top = `${8 + Math.random() * 82}%`;
    firefly.style.setProperty("--x", `${-35 + Math.random() * 70}px`);
    firefly.style.setProperty("--y", `${-30 + Math.random() * 60}px`);
    firefly.style.setProperty("--duration", `${2.6 + Math.random() * 3.5}s`);
    firefly.style.setProperty("--delay", `${-Math.random() * 4}s`);
    layer.append(firefly);
  }
}

function openMemory(photo) {
  const index = Number(photo.dataset.memory || 0);
  const studio = photo.dataset.image.includes("studio");
  memoryImage.src = photo.dataset.image;
  memoryImage.alt = photo.innerText.trim();
  memoryImage.style.objectPosition = studio ? "66% center" : "center";
  memoryTitle.textContent = qs("figcaption", photo).textContent;
  memoryIndex.textContent = String(index + 1).padStart(2, "0");
  memoryDialog.classList.toggle("studio-memory", studio);
  affection = 0;
  affectionValue.textContent = "0";
  affectionBar.style.width = "0%";
  memoryStage.style.setProperty("--mx", "0px");
  memoryStage.style.setProperty("--my", "0px");
  createFireflies();
  memoryDialog.showModal();
}

photos.forEach((photo) => {
  photo.addEventListener("click", () => openMemory(photo));
  photo.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openMemory(photo);
    }
  });
});
qs(".memory-close").addEventListener("click", () => memoryDialog.close());
memoryDialog.addEventListener("click", (event) => { if (event.target === memoryDialog) memoryDialog.close(); });
memoryStage.addEventListener("pointermove", (event) => {
  const rect = memoryStage.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width - 0.5) * -18;
  const y = ((event.clientY - rect.top) / rect.height - 0.5) * -12;
  memoryStage.style.setProperty("--mx", `${x}px`);
  memoryStage.style.setProperty("--my", `${y}px`);
});
memoryStage.addEventListener("pointerleave", () => {
  memoryStage.style.setProperty("--mx", "0px");
  memoryStage.style.setProperty("--my", "0px");
});

qs(".lumi-hotspot").addEventListener("click", (event) => {
  event.stopPropagation();
  affection = Math.min(100, affection + 12);
  affectionValue.textContent = String(affection);
  affectionBar.style.width = `${affection}%`;
  const rect = memoryStage.getBoundingClientRect();
  for (let index = 0; index < 7; index += 1) {
    const heart = document.createElement("span");
    heart.className = "heart-particle";
    heart.textContent = index % 3 === 0 ? "✦" : "♥";
    heart.style.left = `${event.clientX - rect.left - 8 + (Math.random() - 0.5) * 42}px`;
    heart.style.top = `${event.clientY - rect.top - 8 + (Math.random() - 0.5) * 28}px`;
    heart.style.setProperty("--dx", `${(Math.random() - 0.5) * 100}px`);
    heart.style.setProperty("--spin", `${(Math.random() - 0.5) * 120}deg`);
    qs(".memory-particles").append(heart);
    heart.addEventListener("animationend", () => heart.remove());
  }
  qs(".lumi-hotspot").animate([{ transform: "translate(-50%,-50%) scale(1)" }, { transform: "translate(-50%,-50%) scale(.9)" }, { transform: "translate(-50%,-50%) scale(1.08)" }], { duration: 420, easing: "ease-out" });
});

qs(".shuffle-button").addEventListener("click", () => {
  photos.forEach((photo, index) => {
    const x = Math.round((Math.random() - 0.5) * 24);
    const y = Math.round((Math.random() - 0.5) * 18);
    const rotation = Math.round((Math.random() - 0.5) * 14);
    photo.style.zIndex = String(Math.floor(Math.random() * 8));
    photo.animate([
      { transform: baseTransforms[index] },
      { transform: `translate(${x}px, ${y - 18}px) rotate(${rotation}deg) scale(1.03)` },
      { transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)` }
    ], { duration: 700 + index * 55, easing: "cubic-bezier(.22,.72,.18,1)", fill: "forwards" });
  });
});

// Wish stars
const wishForm = qs(".wish-form");
const wishInput = qs("#wish");
const counter = qs(".wish-form small b");
const wishes = qs(".wishes");
const toast = qs(".toast");
const seedWishes = [["今天也已经很努力了", 12, 22], ["不着急，花会慢慢开", 76, 26], ["记得看看晚霞", 18, 72], ["愿你做个好梦", 80, 76]];
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
  if (!text) return wishInput.focus();
  addWish(text, 20 + Math.random() * 60, 18 + Math.random() * 64);
  wishInput.value = "";
  counter.textContent = "0";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileMenu.classList.contains("open")) setMenu(false);
});
