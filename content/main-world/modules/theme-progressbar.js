/*!
 * ThemeProgressbar - barra de progreso multicolor del reproductor.
 */
import { addStyle } from './dom-utils.js';
import { PROGRESS_BAR_CSS } from './theme-progressbar.css.js';

export const ThemeProgressbar = {
  start: function() {
    if (!/youtube\.com/.test(window.location.host)) {
      return;
    }
    addStyle(PROGRESS_BAR_CSS);
  }
};
