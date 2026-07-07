/*!
 * MarkOrRemoveAd - tacha visualmente los huecos de anuncios en la UI
 * de YouTube (no bloquea publicidad, solo la marca/oculta via CSS).
 */
import { commonUtil } from './common-util.js';
import { addStyle } from './dom-utils.js';

  export const MarkOrRemoveAd = {
    generateRemoveAdElementId: "removeADHTMLElement_" + Math.ceil(Math.random() * 1e8),
    markADHTMLElement: function() {
      if (document.querySelector("#" + this.generateRemoveAdElementId)) {
        return;
      }
      const cssMarkSelectorArr = [
        `#masthead-ad`,
        `ytd-rich-item-renderer.style-scope.ytd-rich-grid-row #content:has(.ytd-display-ad-renderer)`,
        `.video-ads.ytp-ad-module`,
        `tp-yt-paper-dialog:has(yt-mealbar-promo-renderer)`,
        `ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-ads"]`,
        `#related #player-ads`,
        `#related ytd-ad-slot-renderer`,
        `ytd-ad-slot-renderer`,
        `yt-mealbar-promo-renderer`,
        `ytd-popup-container:has(a[href="/premium"])`,
        `ad-slot-renderer`,
        `ytm-companion-ad-renderer`
      ];
      const cssText = cssMarkSelectorArr.map(
        s => `${s} *{text-decoration:line-through!important;text-decoration-thickness:2px!important;}`
      ).join(" ");
      const style = addStyle(cssText);
      style.id = this.generateRemoveAdElementId;
    },
    run: function() {
      if (!/youtube\.com/.test(window.location.host)) {
        return;
      }
      commonUtil.onPageLoad(() => {
        this.markADHTMLElement();
      });
    }
  };

