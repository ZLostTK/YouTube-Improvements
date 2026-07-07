/*!
 * CustomConfirm - dialogo de confirmacion reutilizable basado en Dialog.
 */

// ponytail: this duplicates Dialog.js; consolidate if Dialog
// gains confirm-specific helpers (enter/cancel buttons built-in).
  export const CustomConfirm = {
    show: function(options) {
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.background = "rgba(0, 0, 0, 0.5)";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.zIndex = 9999;
      const box = document.createElement("div");
      box.style.background = "white";
      box.style.padding = "20px 30px";
      box.style.borderRadius = "8px";
      box.style.textAlign = "center";
      box.style.width = "90%";
      box.style.maxWidth = "300px";
      box.style.fontSize = "16px";
      box.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
      const text = document.createElement("div");
      text.textContent = options.message;
      text.style.marginBottom = "15px";
      text.style.textAlign = "left";
      const buttonBox = document.createElement("div");
      const confirmBtn = document.createElement("button");
      confirmBtn.textContent = options.enter;
      confirmBtn.style.margin = "0 10px";
      confirmBtn.style.padding = "8px 16px";
      confirmBtn.style.border = "none";
      confirmBtn.style.borderRadius = "4px";
      confirmBtn.style.backgroundColor = "#000";
      confirmBtn.style.color = "white";
      confirmBtn.style.cursor = "pointer";
      confirmBtn.style.fontSize = "15px";
      confirmBtn.onclick = function() {
        document.body.removeChild(overlay);
        if (options.onEnter) {
          options.onEnter();
        }
      };
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = options.cancel;
      cancelBtn.style.margin = "0 10px";
      cancelBtn.style.padding = "8px 16px";
      cancelBtn.style.border = "none";
      cancelBtn.style.borderRadius = "4px";
      cancelBtn.style.backgroundColor = "#ccc";
      cancelBtn.style.cursor = "pointer";
      cancelBtn.style.fontSize = "15px";
      cancelBtn.onclick = function() {
        if (options.onCancel) {
          options.onCancel();
        }
        document.body.removeChild(overlay);
      };
      buttonBox.appendChild(cancelBtn);
      buttonBox.appendChild(confirmBtn);
      box.appendChild(text);
      box.appendChild(buttonBox);
      overlay.appendChild(box);
      document.body.appendChild(overlay);
    }
  };

