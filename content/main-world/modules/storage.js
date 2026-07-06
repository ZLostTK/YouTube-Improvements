/*!
 * Almacenamiento (reemplaza GM_setValue / GM_getValue)
 * Usa localStorage de youtube.com — igual de síncrono que GM_*,
 * y editable desde el popup de la extensión (mismo storage).
 */
const STORAGE_PREFIX = 'ytie:';

export const StorageUtil = {
  keys: {
    youtube: {
      videoPlaySpeed: "yt/videoPlaySpeed",
      functionState: "yt/functionState_01",
      videoLoop: "py/videoLoop",
      theme: "yt/theme",
      downloadingConfirm: "yt/downloadingConfirm"
    }
  },
  getDefaultFunctionState: function() {
    return {
      isOpenCommentTable: true,
      isOpenThemeProgressBar: true,
      isOpenSpeedControl: true,
      isOpenMarkOrRemoveAd: true,
      isOpenYoutubedownloading: true
    };
  },
  getValue: function(key, defaultValue) {
    try {
      const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
      if (raw === null || raw === undefined) return defaultValue;
      return JSON.parse(raw);
    } catch (e) {
      return defaultValue;
    }
  },
  setValue: function(key, value) {
    try {
      window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      /* localStorage puede fallar en modo incógnito sin persistencia; ignorar */
    }
  }
};
