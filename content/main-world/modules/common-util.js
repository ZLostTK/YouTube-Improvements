/*!
 * Utilidades comunes (reemplaza GM_addStyle / GM_openInTab)
 */
import { addStyle } from './dom-utils.js';

export const commonUtil = {
  onPageLoad: function(callback) {
    if (document.readyState === "complete") {
      callback();
    } else {
      window.addEventListener("DOMContentLoaded", callback, { once: true });
      window.addEventListener("load", callback, { once: true });
    }
  },
  addStyle: function(style) {
    addStyle(style);
  },
  openInTab: function(url, options) {
    // Reemplazo de GM_openInTab/GM.openInTab: ya estamos en el
    // contexto real de la página, así que basta con window.open.
    window.open(url, "_blank", "noopener");
  },
  waitForElementByInterval: function(selector, target = document.body, allowEmpty = true, delay = 10, maxDelay = 10 * 1e3) {
    return new Promise((resolve, reject) => {
      let totalDelay = 0;
      let element = target.querySelector(selector);
      let result = allowEmpty ? !!element : !!element && !!element.innerHTML;
      if (result) {
        resolve(element);
      }
      const elementInterval = setInterval(() => {
        if (totalDelay >= maxDelay) {
          clearInterval(elementInterval);
          resolve(null);
        }
        element = target.querySelector(selector);
        result = allowEmpty ? !!element : !!element && !!element.innerHTML;
        if (result) {
          clearInterval(elementInterval);
          resolve(element);
        } else {
          totalDelay += delay;
        }
      }, delay);
    });
  }
};
