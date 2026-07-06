/*!
 * Trusted Types passthrough (igual que el script original), por si
 * YouTube exige una politica antes de que exista la default.
 *
 * Efecto secundario puro: al importarse, configura window.TTP si hace
 * falta. No exporta nada porque nada mas del proyecto depende de este
 * resultado (queda disponible en window.TTP por si YouTube lo necesita).
 */
export function setupTrustedTypesPassthrough() {
  const overwrite_default = false;
  const passThroughFunc = function(string, sink) {
    return string;
  };
  const TTPName = "passthrough";
  let TTP_default;
  let TTP = { createHTML: passThroughFunc, createScript: passThroughFunc, createScriptURL: passThroughFunc };
  let needsTrustedHTML = false;

  !window.TTP && (() => {
    try {
      if (typeof window.isSecureContext !== "undefined" && window.isSecureContext) {
        if (window.trustedTypes && window.trustedTypes.createPolicy) {
          needsTrustedHTML = true;
          if (trustedTypes.defaultPolicy) {
            if (overwrite_default) ; else {
              TTP = window.trustedTypes.createPolicy(TTPName, TTP);
            }
            TTP_default = trustedTypes.defaultPolicy;
          } else {
            TTP_default = TTP = window.trustedTypes.createPolicy(
              "default",
              TTP
            );
          }
        }
      }
    } catch (e) {
    } finally {
      window.TTP = TTP;
    }
  })();
}
