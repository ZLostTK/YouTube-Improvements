/*!
 * Loader script (ISOLATED world)
 *
 * Inyecta main.js como <script type="module"> en el contexto de la pagina
 * (MAIN world). Esto permite que main.js y todos sus modulos usen import/export
 * de ES modules sin problemas, porque el navegador los resuelve como modulos
 * al cargarlos via src.
 *
 * Chrome anade automaticamente el origin de la extension al CSP de la pagina,
 * por lo que <script type="module" src="chrome-extension://..."> funciona
 * sin bloqueos.
 *
 * No necesita world: "MAIN" en el manifest porque el <script> tag se inyecta
 * directamente en el DOM de la pagina, ejecutandose en el MAIN world.
 */
(function() {
  'use strict';
  var script = document.createElement('script');
  script.type = 'module';
  script.src = chrome.runtime.getURL('content/main-world/main.js');
  document.documentElement.appendChild(script);
})();
