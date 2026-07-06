// Popup de "YouTube Improvements – Layout & Video Enhancer"
// Lee/escribe los mismos datos que usa el content script (localStorage de
// youtube.com, prefijo "ytie:"), así que no hace falta duplicar lógica ni
// mensajería: solo inyectamos una función pequeña en la página activa.

const STORAGE_PREFIX = "ytie:";
const FUNCTION_STATE_KEY = "yt/functionState_01";

const SETTINGS = [
  {
    key: "isOpenCommentTable",
    title: "Diseño en pestañas",
    desc: "Reorganiza info, comentarios, videos y playlist en pestañas laterales.",
    icon: "layout"
  },
  {
    key: "isOpenThemeProgressBar",
    title: "Barra de progreso con color",
    desc: "Embellece la barra de progreso del reproductor.",
    icon: "bar"
  },
  {
    key: "isOpenSpeedControl",
    title: "Control de velocidad",
    desc: "Botón de velocidad de reproducción seleccionable en el reproductor.",
    icon: "speed"
  },
  {
    key: "isOpenMarkOrRemoveAd",
    title: "Marcar anuncios",
    desc: "Tacha visualmente los bloques de anuncios en la página.",
    icon: "ad"
  },
  {
    key: "isOpenYoutubedownloading",
    title: "Descarga de videos",
    desc: "Agrega botones de descarga en video normal y Shorts.",
    icon: "download"
  }
];

const ICONS = {
  layout: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M15 3v18"/></svg>',
  bar: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16"/><circle cx="12" cy="12" r="2"/></svg>',
  speed: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 13l3-3M9 5h6"/></svg>',
  ad: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 12h18"/></svg>',
  download: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16"/></svg>'
};

const DEFAULT_STATE = {
  isOpenCommentTable: true,
  isOpenThemeProgressBar: true,
  isOpenSpeedControl: true,
  isOpenMarkOrRemoveAd: true,
  isOpenYoutubedownloading: true
};

const listEl = document.getElementById("settings-list");
const bannerEl = document.getElementById("status-banner");
const reloadBtn = document.getElementById("reload-btn");

let activeTabId = null;
let isYouTubeTab = false;
let dirty = false;

function showBanner(text, warn) {
  bannerEl.textContent = text;
  bannerEl.hidden = false;
  bannerEl.classList.toggle("warn", !!warn);
}

function hideBanner() {
  bannerEl.hidden = true;
}

// Función que se inyecta en la pestaña de YouTube (contexto de página,
// world: "MAIN") para leer el estado actual de las funciones.
function pageReadState(storageKey) {
  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

// Función que se inyecta para escribir el nuevo estado.
function pageWriteState(storageKey, value) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
}

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab || null;
}

async function readState() {
  const [result] = await chrome.scripting.executeScript({
    target: { tabId: activeTabId },
    world: "MAIN",
    func: pageReadState,
    args: [STORAGE_PREFIX + FUNCTION_STATE_KEY]
  });
  const value = result && result.result;
  return Object.assign({}, DEFAULT_STATE, value || {});
}

async function writeState(state) {
  await chrome.scripting.executeScript({
    target: { tabId: activeTabId },
    world: "MAIN",
    func: pageWriteState,
    args: [STORAGE_PREFIX + FUNCTION_STATE_KEY, state]
  });
}

function renderRow(setting, checked) {
  const row = document.createElement("div");
  row.className = "setting-row";
  row.innerHTML = `
    <div class="setting-copy">
      <div class="setting-icon">${ICONS[setting.icon] || ""}</div>
      <div class="setting-text">
        <span class="setting-title">${setting.title}</span>
        <span class="setting-desc">${setting.desc}</span>
      </div>
    </div>
    <label class="switch">
      <input type="checkbox" data-key="${setting.key}" ${checked ? "checked" : ""} />
      <span class="slider"></span>
    </label>
  `;
  return row;
}

function renderUnavailable() {
  listEl.innerHTML = "";
  showBanner("Abrí una pestaña de YouTube para ver y cambiar los ajustes.", true);
  reloadBtn.disabled = true;
  reloadBtn.textContent = "Ir a YouTube";
}

async function init() {
  const tab = await getActiveTab();
  if (!tab || !tab.url || !/^https?:\/\/([a-z0-9-]+\.)*youtube\.com\//i.test(tab.url)) {
    isYouTubeTab = false;
    renderUnavailable();
    reloadBtn.disabled = false;
    reloadBtn.addEventListener("click", () => {
      chrome.tabs.create({ url: "https://www.youtube.com/" });
    });
    return;
  }

  activeTabId = tab.id;
  isYouTubeTab = true;

  let state;
  try {
    state = await readState();
  } catch (e) {
    state = Object.assign({}, DEFAULT_STATE);
  }

  listEl.innerHTML = "";
  SETTINGS.forEach((setting) => {
    const row = renderRow(setting, state[setting.key] !== false);
    listEl.appendChild(row);
  });

  listEl.addEventListener("change", async (evt) => {
    const input = evt.target;
    if (!input.matches('input[type="checkbox"]')) return;
    const key = input.dataset.key;
    const current = await readState();
    current[key] = input.checked;
    await writeState(current);
    dirty = true;
    showBanner("Cambios guardados. Recargá YouTube para aplicarlos.");
    reloadBtn.textContent = "Aplicar y recargar YouTube";
  });

  reloadBtn.addEventListener("click", () => {
    if (activeTabId != null) {
      chrome.tabs.reload(activeTabId);
      window.close();
    }
  });
}

init();
