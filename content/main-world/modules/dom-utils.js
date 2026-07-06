/*!
 * Inyección de estilos (reemplaza GM_addStyle)
 */
export function addStyle(css) {
  const style = document.createElement('style');
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);
  return style;
}
