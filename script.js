/* ═══ HOBBIES DATA ═══ */
const hobbiesData = {
  cooking:   { icon: '🍳', title: 'Cooking'},
  gardening: { icon: '🌱', title: 'Gardening' },
  birds:     { icon: '🐦', title: 'Bird Watching'},
  insects:   { icon: '🦋', title: 'Insect Catching'},
  fishing:   { icon: '🎣', title: 'Fishing'},
};

/* ═══ EVENTS DATA ═══ */
const eventsData = {
  birdwatching: { icon: '🐦', title: 'Bird Watching Event'},
  insect:       { icon: '🦋', title: 'Insect Catching Event'},
  fishing:      { icon: '🎣', title: 'Fishing Event'},
};

/* ═══ HAMBURGER MENU ═══ */
function toggleMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const overlay   = document.getElementById('navOverlay');

  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  overlay.classList.toggle('visible', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const overlay   = document.getElementById('navOverlay');

  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  overlay.classList.remove('visible');
  document.body.style.overflow = '';
}

/* Close menu on Escape key */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

/* ═══ OUTFIT STATE ═══ */
const outfit = { shirt: 0, pants: 0, shoes: 0 };

function getAvatarSrc() {
  const s = outfit.shirt, p = outfit.pants, sh = outfit.shoes;
  const none = (v) => v === 0;

  if (!none(s) && !none(p) && !none(sh)) return `fullset/fullset-${s}-${p}-${sh}.png`;
  if (!none(s) && none(p) && none(sh))   return `default/top${s}.png`;
  if (none(s) && !none(p) && none(sh))   return `default/pants${p}.png`;
  if (none(s) && none(p) && !none(sh))   return `default/bottom${sh}.png`;

  if (none(s))  return `halfset/halfset-0-${p}-${sh}.png`;
  if (none(p)) {
    if (s === 1) return `halfset/halftset-${s}-0-${sh}.png`;
    return `halfset/halfset-${s}-0-${sh}.png`;
  }
  if (none(sh)) {
    if (s === 1 && p === 1) return `halfset/halftset-1-1-0.png`;
    return `halfset/halfset-${s}-${p}-0.png`;
  }

  return `default/ava-default.png`;
}

function tryImage(src, fallback, imgEl) {
  const test = new Image();
  test.onload = () => {
    imgEl.src = src;
    imgEl.classList.remove('fade');
    void imgEl.offsetWidth;
    imgEl.classList.add('fade');
  };
  test.onerror = () => {
    imgEl.src = fallback;
    imgEl.classList.remove('fade');
    void imgEl.offsetWidth;
    imgEl.classList.add('fade');
  };
  test.src = src;
}

function selectPiece(el) {
  const type  = el.dataset.type;
  const index = parseInt(el.dataset.index);

  if (outfit[type] === index) {
    outfit[type] = 0;
    el.classList.remove('active');
  } else {
    document.querySelectorAll(`.clothes-item[data-type="${type}"]`).forEach(i => i.classList.remove('active'));
    outfit[type] = index;
    el.classList.add('active');
  }
  updateAvatar();
}

function updateAvatar() {
  const img = document.getElementById('avatarImg');
  const s = outfit.shirt, p = outfit.pants, sh = outfit.shoes;
  const anySelected = s || p || sh;

  if (!anySelected) {
    img.src = 'default/ava-default.png';
    img.classList.remove('fade');
    void img.offsetWidth;
    img.classList.add('fade');
    return;
  }

  tryImage(getAvatarSrc(), 'default/ava-default.png', img);
}

function resetOutfit() {
  outfit.shirt = 0; outfit.pants = 0; outfit.shoes = 0;
  document.querySelectorAll('.clothes-item').forEach(i => i.classList.remove('active'));
  const img = document.getElementById('avatarImg');
  img.src = 'default/ava-default.png';
  img.classList.remove('fade');
  void img.offsetWidth;
  img.classList.add('fade');
}

function selectOutfit(el) { selectPiece(el); }

/* ═══ HOBBIES / VIDEO ═══ */
let currentHobby = 'cooking';

function selectHobby(btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const hobby = btn.dataset.hobby;
  const data  = hobbiesData[hobby];

  document.querySelectorAll('#videoWrapper video').forEach(v => { v.pause(); v.style.display = 'none'; });

  const vid = document.getElementById('vid-' + hobby);
  const ph  = document.getElementById('videoPlaceholder');

  if (vid && vid.src && vid.src !== window.location.href) {
    vid.style.display = 'block';
    ph.style.display  = 'none';
  } else {
    ph.style.display = 'flex';
    document.getElementById('placeholderEmoji').textContent = data.icon;
    document.getElementById('placeholderText').textContent  = 'Add your video to vid-' + hobby + ' src=""';
  }

  document.getElementById('hobbyBadgeIcon').textContent = data.icon;
  document.getElementById('hobbyTitle').textContent      = data.title;
  document.getElementById('hobbyDesc').textContent       = data.desc;
  currentHobby = hobby;
}

/* ═══ EVENTS / VIDEO ═══ */
let currentEvent = 'birdwatching';

function selectEvent(btn) {
  document.querySelectorAll('.event-tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const ev   = btn.dataset.event;
  const data = eventsData[ev];

  document.querySelectorAll('#eventVideoWrapper video').forEach(v => { v.pause(); v.style.display = 'none'; });

  const vid = document.getElementById('evid-' + ev);
  const ph  = document.getElementById('eventVideoPlaceholder');

  if (vid && vid.src && vid.src !== window.location.href) {
    vid.style.display = 'block';
    ph.style.display  = 'none';
  } else {
    ph.style.display = 'flex';
    document.getElementById('eventPlaceholderEmoji').textContent = data.icon;
    document.getElementById('eventPlaceholderText').textContent  = 'Add your video to evid-' + ev + ' src=""';
  }

  document.getElementById('eventBadgeIcon').textContent = data.icon;
  document.getElementById('eventTitle').textContent     = data.title;
  currentEvent = ev;
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  selectHobby(document.querySelector('.tab-btn[data-hobby="cooking"]'));
  selectEvent(document.querySelector('.event-tab-btn[data-event="birdwatching"]'));
});