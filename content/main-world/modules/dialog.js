/*!
 * Dialog - dialogo modal generico singleton (confirmacion, formularios).
 * Parches de seguridad: sin innerHTML, close() tolera doble llamado.
 */
const hasOwn = Object.prototype.hasOwnProperty;

function setStyle(ele, styleObj) {
  for (const attr in styleObj) {
    if (hasOwn.call(styleObj, attr)) {
      ele.style[attr] = styleObj[attr];
    }
  }
}

export const Dialog = new (class {
  constructor() {
    this.mask = document.createElement("div");
    this.dialogStyle = document.createElement("style");
    this.mask.classList.add("dialog-gcc-mask");
    setStyle(this.mask, {
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, .6)",
      position: "fixed",
      left: "0px",
      top: "0px",
      bottom: "0px",
      right: "0px",
      zIndex: "9999999999999"
    });
    this.content = document.createElement("div");
    this.content.classList.add("dialog-gcc-container");
    setStyle(this.content, {
      maxWidth: "350px",
      width: "90%",
      backgroundColor: "#fff",
      boxShadow: "0 0 2px #999",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%,-50%)",
      borderRadius: "5px"
    });
    this.mask.appendChild(this.content);
    this._isOpen = false;
  }
  middleBox(param) {
    this.content.textContent = "";
    this._isOpen = true;
    if (hasOwn.call(param, "direction")) {
      this.content.setAttribute("data-extension-direction", param.direction);
    } else {
      this.content.removeAttribute("data-extension-direction");
    }
    let title = "";
    if (typeof param === "string") {
      title = param;
    } else if (param && typeof param === "object") {
      title = param.title || "";
    }
    if (!this.mask.parentNode) {
      document.body.appendChild(this.mask);
    }
    this.title = document.createElement("div");
    this.title.classList.add("dialog-gcc-title");
    setStyle(this.title, {
      width: "100%",
      height: "40px",
      lineHeight: "40px",
      boxSizing: "border-box",
      backgroundColor: "#dedede",
      color: "#000",
      textAlign: "center",
      fontWeight: "700",
      fontSize: "17px",
      borderRadius: "4px 4px 0px 0px"
    });
    const span = document.createElement("span");
    span.textContent = title;
    span.setAttribute("langue-extension-text", "setting_modal_title");
    this.title.appendChild(span);
    this.closeBtn = document.createElement("span");
    this.closeBtn.textContent = "\u00D7";
    setStyle(this.closeBtn, {
      textDecoration: "none",
      color: "#000",
      position: "absolute",
      insetInlineEnd: "10px",
      top: "0px",
      fontSize: "25px",
      display: "inline-block",
      cursor: "pointer"
    });
    this.title.appendChild(this.closeBtn);
    this.content.appendChild(this.title);
    this.closeBtn.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.close();
      if (param.onClose) {
        param.onClose();
      }
    };
  }
  showMake(param) {
    if (hasOwn.call(param, "styleSheet")) {
      this.dialogStyle.textContent = param.styleSheet;
    }
    if (!this.dialogStyle.parentNode) {
      document.head.appendChild(this.dialogStyle);
    }
    this.middleBox(param);
    this.dialogContent = document.createElement("div");
    this.dialogContent.classList.add("dialog-gcc-content");
    setStyle(this.dialogContent, {
      padding: "15px",
      maxHeight: "400px",
      overflow: "auto"
    });
    // ponytail: textContent instead of innerHTML to avoid XSS.
    // If callers need HTML content, they should pre-render to a DOM node
    // and pass it as param.contentNode instead.
    this.dialogContent.textContent = param.content || "";
    this.content.appendChild(this.dialogContent);
    if (param.onContentReady) {
      param.onContentReady(this);
    }
  }
  updateTitle(title) {
    if (this.title) {
      this.title.textContent = title || "";
    }
  }
  close() {
    if (!this._isOpen) return;
    this._isOpen = false;
    if (this.mask.parentNode) {
      this.mask.parentNode.removeChild(this.mask);
    }
    if (this.dialogStyle.parentNode) {
      this.dialogStyle.parentNode.removeChild(this.dialogStyle);
    }
    if (this.dialogContent && this.dialogContent.parentNode) {
      this.dialogContent.parentNode.removeChild(this.dialogContent);
      this.dialogContent = null;
    }
  }
})();

