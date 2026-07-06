/*!
 * YouTube Improvements - Layout & Video Enhancer
 * Adaptado de un userscript (Tampermonkey/Violentmonkey) a extension de
 * Chrome (Manifest V3). Este archivo corre en el "MAIN world" de la
 * pestana de YouTube, es decir, directamente en el contexto JS de la
 * pagina - el equivalente exacto de lo que "unsafeWindow" y
 * "GM_addElement" hacian en el script original. Por eso ya no se
 * necesitan esos dos permisos: aqui ya somos la pagina.
 *
 * Basado en: Thalrien.vx, CY Fung - MIT License
 * https://github.com/tabview-youtube/Tabview-Youtube
 *
 * Punto de entrada: cada feature vive en su propio archivo bajo
 * ./modules (o ./tabview para el motor de pestanas laterales) y aqui
 * solo se orquesta el arranque, leyendo los interruptores guardados
 * en localStorage (los mismos que edita el popup de la extension).
 */
import { StorageUtil } from './modules/storage.js';
import { addStyle } from './modules/dom-utils.js';
import { setupTrustedTypesPassthrough } from './modules/trusted-types.js';
import { ThemeProgressbar } from './modules/theme-progressbar.js';
import { SpeedControl } from './modules/speed-control.js';
import { MarkOrRemoveAd } from './modules/mark-or-remove-ad.js';
import { ToolBox } from './modules/toolbox.js';
import { TABVIEW_MAIN_CSS } from './tabview/styles.js';
import { executionScript } from './tabview/engine.js';

(function main() {
  'use strict';

  // Arranque: lee ajustes (localStorage) y ejecuta cada modulo solo si
  // su interruptor esta activado - esto es lo que hace que cada
  // funcion sea togleable desde el popup de la extension.
  const {
    isOpenCommentTable,
    isOpenThemeProgressBar,
    isOpenSpeedControl,
    isOpenMarkOrRemoveAd
  } = StorageUtil.getValue(StorageUtil.keys.youtube.functionState, StorageUtil.getDefaultFunctionState());

  setupTrustedTypesPassthrough();

  // Pestanas laterales (Info/Comentarios/Videos/Playlist).
  // Corre directamente: ya no hace falta GM_addElement para "escapar"
  // hacia el contexto de la pagina, porque este script YA esta ahi.
  if (/youtube\.com/.test(window.location.host) && isOpenCommentTable) {
    const communicationKey = `ck-${Date.now()}-${Math.floor(Math.random() * 314159265359 + 314159265359).toString(36)}`;
    if (document.documentElement) {
      addStyle(TABVIEW_MAIN_CSS);
      executionScript(communicationKey);
    } else {
      const start = () => {
        addStyle(TABVIEW_MAIN_CSS);
        executionScript(communicationKey);
      };
      document.addEventListener("DOMContentLoaded", start, { once: true });
    }
  }

  // Resto de modulos: cada uno respeta su propio interruptor.
  (async () => {
    if (isOpenThemeProgressBar) {
      ThemeProgressbar.start();
    }
    await ToolBox.run();
    if (isOpenSpeedControl) {
      await SpeedControl.run();
    }
    if (isOpenMarkOrRemoveAd) {
      MarkOrRemoveAd.run();
    }
  })();

})();
