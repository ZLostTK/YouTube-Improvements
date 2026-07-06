/*!
 * Dialog - fabrica de dialogos modales genericos (confirmacion, formularios).
 */

  export const Dialog = function() {
    class Dialog2 {
      constructor() {
        this.mask = document.createElement("div");
        this.dialogStyle = document.createElement("style");
        this.mask.classList.add("dialog-gcc-mask");
        this.setStyle(this.mask, {
          "width": "100%",
          "height": "100%",
          "backgroundColor": "rgba(0, 0, 0, .6)",
          "position": "fixed",
          "left": "0px",
          "top": "0px",
          "bottom": "0px",
          "right": "0px",
          "z-index": "9999999999999"
        });
        this.content = document.createElement("div");
        this.content.classList.add("dialog-gcc-container");
        this.setStyle(this.content, {
          "max-width": "350px",
          "width": "90%",
          "backgroundColor": "#fff",
          "boxShadow": "0 0 2px #999",
          "position": "absolute",
          "left": "50%",
          "top": "50%",
          "transform": "translate(-50%,-50%)",
          "borderRadius": "5px"
        });
        this.mask.appendChild(this.content);
      }
      middleBox(param) {
        this.content.innerHTML = "";
        if (param.hasOwnProperty("direction")) {
          this.content.setAttribute("data-extension-direction", param.direction);
        }
        let title = "";
        if ({}.toString.call(param) === "[object String]") {
          title = param;
        } else if ({}.toString.call(param) === "[object Object]") {
          title = param.title;
        }
        document.body.appendChild(this.mask);
        this.title = document.createElement("div");
        this.title.classList.add("dialog-gcc-title");
        this.setStyle(this.title, {
          "width": "100%",
          "height": "40px",
          "lineHeight": "40px",
          "boxSizing": "border-box",
          "background-color": "#dedede",
          "color": "#000",
          "text-align": "center",
          "font-weight": "700",
          "font-size": "17px",
          "border-radius": "4px 4px 0px 0px"
        });
        const span = document.createElement("span");
        span.innerText = title;
        span.setAttribute("langue-extension-text", "setting_modal_title");
        this.title.appendChild(span);
        this.closeBtn = document.createElement("span");
        this.closeBtn.innerText = "×";
        this.setStyle(this.closeBtn, {
          "textDecoration": "none",
          "color": "#000",
          "position": "absolute",
          "inset-inline-end": "10px",
          "top": "0px",
          "fontSize": "25px",
          "display": "inline-block",
          "cursor": "pointer"
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
        if (param.hasOwnProperty("styleSheet")) {
          this.dialogStyle.textContent = param.styleSheet;
        }
        document.querySelector("head").appendChild(this.dialogStyle);
        this.middleBox(param);
        this.dialogContent = document.createElement("div");
        this.dialogContent.classList.add("dialog-gcc-content");
        this.setStyle(this.dialogContent, {
          "padding": "15px",
          "max-height": "400px",
          "overflow": "auto"
        });
        this.dialogContent.innerHTML = param.content;
        this.content.appendChild(this.dialogContent);
        param.onContentReady(this);
      }
      updateTitle(title) {
        if (this.title) {
          this.title.innerText = title;
        }
      }
      close() {
        document.body.removeChild(this.mask);
        document.querySelector("head").removeChild(this.dialogStyle);
      }
      setStyle(ele, styleObj) {
        for (let attr in styleObj) {
          ele.style[attr] = styleObj[attr];
        }
      }
    }
    let dialog = null;
    return function() {
      if (!dialog) {
        dialog = new Dialog2();
      }
      return dialog;
    }();
  }();

