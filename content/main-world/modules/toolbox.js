/*!
 * ToolBox - panel flotante de herramientas sobre el reproductor
 * (ajustes, descarga, tema, captura de pantalla, loop de video, etc.)
 */
import { StorageUtil } from './storage.js';
import { commonUtil } from './common-util.js';
import { LangueUtil } from './language.js';
import { Theme } from './theme.js';
import { Screenshot } from './screenshot.js';
import { Dialog } from './dialog.js';
import { CustomConfirm } from './custom-confirm.js';

const _hasOwn = Object.prototype.hasOwnProperty;

  export const ToolBox = {
    getFunctionState: function() {
      return StorageUtil.getValue(
        StorageUtil.keys.youtube.functionState,
        StorageUtil.getDefaultFunctionState()
      );
    },
    insertStyle: function() {
      const speedOptionsStyle = `
			.toolbox_extension_container {
			    position: absolute!important;
			    background: rgba(0, 0, 0, 0.4) !important;
			    color: white!important;
			    border-radius: 8px!important;
			    box-sizing: border-box!important;
				z-index:999999999999!important;
				display:none;
				padding:13px!important;
			}
			.toolbox_extension_container .toolbox_extension_tools {
			    display: grid!important;
			    grid-template-columns: repeat(4, 1fr)!important;
			    gap: 8px!important;
			}
			.toolbox_extension_container .toolbox_extension_tool_btn {
			    width: 25px!important;
			    height: 25px!important;
			    background:#F4F4F4!important;
			    border: none!important;
			    cursor: pointer!important;
				display: flex!important;
				justify-content: center!important;
				align-items: center!important;
				border-radius:5px!important;
			}
		`;
      commonUtil.addStyle(speedOptionsStyle);
    },
    genrateSettingSvg: function() {
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("viewBox", "0 0 1024 1024");
      svg.setAttribute("width", "22");
      svg.setAttribute("height", "22");
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", "M449.194667 82.346667a128 128 0 0 1 125.610666 0l284.16 160a128 128 0 0 1 65.194667 111.530666v316.245334a128 128 0 0 1-65.194667 111.530666l-284.16 160a128 128 0 0 1-125.610666 0l-284.16-160a128 128 0 0 1-65.194667-111.530666V353.877333A128 128 0 0 1 165.034667 242.346667z m83.754666 74.410666a42.666667 42.666667 0 0 0-41.898666 0L206.933333 316.714667a42.666667 42.666667 0 0 0-21.76 37.162666v316.245334a42.666667 42.666667 0 0 0 21.76 37.162666l284.16 160a42.666667 42.666667 0 0 0 41.898667 0l284.16-160a42.666667 42.666667 0 0 0 21.76-37.162666V353.877333a42.666667 42.666667 0 0 0-21.76-37.162666zM512 341.333333a170.666667 170.666667 0 1 1 0 341.333334 170.666667 170.666667 0 0 1 0-341.333334z m0 85.333334a85.333333 85.333333 0 1 0 0 170.666666 85.333333 85.333333 0 0 0 0-170.666666z");
      path.setAttribute("fill", "#000000");
      svg.appendChild(path);
      return svg;
    },
    genrateToolSvg: function() {
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("viewBox", "0 0 1024 1024");
      svg.setAttribute("width", "22");
      svg.setAttribute("height", "22");
      svg.setAttribute("class", "icon");
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", "M364.999 128.853H158.28c-52.383 0-95 42.617-95 95v206.719c0 52.383 42.617 95 95 95h206.719c52.383 0 95-42.617 95-95V223.853c0-52.384-42.617-95-95-95zM364.999 562.39H158.28c-52.383 0-95 42.617-95 95v206.719c0 52.383 42.617 95 95 95h206.719c52.383 0 95-42.617 95-95V657.39c0-52.383-42.617-95-95-95zM943.066 230.037L796.895 83.865c-17.943-17.943-41.8-27.825-67.175-27.825-25.376 0-49.232 9.881-67.175 27.825L516.372 230.037c-37.041 37.041-37.041 97.31 0 134.35l146.172 146.172c17.943 17.943 41.8 27.825 67.176 27.825 25.375 0 49.231-9.882 67.175-27.825l146.172-146.172c17.943-17.943 27.825-41.8 27.825-67.175s-9.882-49.233-27.826-67.175z m-21.212 113.137L775.682 489.346c-12.277 12.277-28.601 19.038-45.962 19.038-17.362 0-33.686-6.761-45.963-19.038L537.585 343.174c-25.343-25.344-25.343-66.581 0-91.924l146.173-146.172c12.276-12.277 28.6-19.038 45.962-19.038 17.361 0 33.685 6.761 45.962 19.038L921.854 251.25c12.276 12.277 19.038 28.6 19.038 45.962s-6.762 33.685-19.038 45.962zM798.887 562.39H592.168c-52.383 0-95 42.617-95 95v206.719c0 52.383 42.617 95 95 95h206.719c52.383 0 95-42.617 95-95V657.39c0-52.383-42.617-95-95-95z");
      path.setAttribute("fill", "#ffffff");
      svg.appendChild(path);
      return svg;
    },
    genrateDownloadSvg: function(width = 20, height = 20) {
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("t", "1743576847386");
      svg.setAttribute("class", "icon");
      svg.setAttribute("viewBox", "0 0 1024 1024");
      svg.setAttribute("version", "1.1");
      svg.setAttribute("xmlns", svgNS);
      svg.setAttribute("p-id", "1746");
      svg.setAttribute("width", width);
      svg.setAttribute("height", height);
      const path1 = document.createElementNS(svgNS, "path");
      path1.setAttribute("d", "M32 32h960v960H32z");
      path1.setAttribute("fill", "#000000");
      path1.setAttribute("fill-opacity", "0");
      path1.setAttribute("p-id", "1747");
      const path2 = document.createElementNS(svgNS, "path");
      path2.setAttribute("d", "M852.00000031 476.54c21.07999969 0 38.35999969 16.51999969 39.9 37.5l0.09999938 3.01999969v212.80000031C891.99999969 819.42000031 820.35999969 891.99999969 732.00000031 891.99999969H291.99999969c-88.36000031 0-160.00000031-72.6-159.99999938-162.13999969v-212.80000031l0.09999938-3A40.21999969 40.21999969 0 0 1 171.99999969 476.52000031c21.07999969 0 38.35999969 16.51999969 39.9 37.5l0.10000031 3.01999969v212.80000031c0 44.77999969 35.80000031 81.07999969 79.99999969 81.07999969h440.00000062c44.20000031 0 79.99999969-36.3 79.99999969-81.07999969v-212.80000031l0.10000031-3A40.21999969 40.21999969 0 0 1 852.00000031 476.52000031zM512 132.00000031a40.00000031 40.00000031 0 0 1 40.00000031 39.99999938v342.24l99.63999938-104.13999938a45.94000031 45.94000031 0 0 1 66.46000031 0.06 50.4 50.4 0 0 1-0.06 69.6l-170.34 178.03999969a45.94000031 45.94000031 0 0 1-66.28000031 0.13999969 46.62 46.62 0 0 1-4.38-4.03999969l-170.34-178.02a50.4 50.4 0 0 1-0.06-69.6 45.94000031 45.94000031 0 0 1 64.96000031-1.57999969l1.5 1.5L471.99999969 509.55999969V171.99999969a40.00000031 40.00000031 0 0 1 40.00000031-39.99999938z");
      path2.setAttribute("fill", "#000000");
      path2.setAttribute("p-id", "1748");
      svg.appendChild(path1);
      svg.appendChild(path2);
      return svg;
    },
    genrateShortDownloadSvg: function() {
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("viewBox", "0 0 1024 1024");
      svg.setAttribute("width", "32");
      svg.setAttribute("height", "32");
      const paths = [
        {
          d: "M0 0m512 0l0 0q512 0 512 512l0 0q0 512-512 512l0 0q-512 0-512-512l0 0q0-512 512-512Z",
          opacity: "0.7"
        },
        {
          d: "M671.1552 727.2192H350.4128a95.7696 95.7696 0 0 1-96.2304-95.104v-190.2336a31.872 31.872 0 0 1 32.0768-31.7184 31.872 31.872 0 0 1 32.0768 31.7184v190.2336a31.9232 31.9232 0 0 0 32.0768 31.6928h320.7424a31.9232 31.9232 0 0 0 32.0768-31.6928v-190.2336a32.0768 32.0768 0 0 1 64.1536 0v190.2336a95.7696 95.7696 0 0 1-96.2304 95.104z",
          fill: "#FFFFFF"
        },
        {
          d: "M499.1232 563.7376a16.5632 16.5632 0 0 0 23.3472 0l108.7744-108.8256c6.4256-6.4256 4.2496-11.6736-4.8384-11.6736h-33.0496a16.5632 16.5632 0 0 1-16.512-16.5376v-66.0992a16.5376 16.5376 0 0 0-16.512-16.512h-99.0976a16.5632 16.5632 0 0 0-16.512 16.512v66.0992a16.5632 16.5632 0 0 1-16.512 16.5376h-33.1008c-9.088 0-11.264 5.248-4.8384 11.6736z",
          fill: "#FFFFFF"
        },
        {
          d: "M446.2336 294.5792a16.512 16.512 0 1 1 16.512 16.5376 16.5376 16.5376 0 0 1-16.512-16.5376z",
          fill: "#FFFFFF"
        },
        {
          d: "M542.2848 294.5792a16.512 16.512 0 1 1 16.512 16.5376 16.5376 16.5376 0 0 1-16.512-16.5376z",
          fill: "#FFFFFF"
        },
        {
          d: "M461.2352 277.9904h99.0976v33.0496h-99.0976z",
          fill: "#FFFFFF"
        }
      ];
      paths.forEach((attr) => {
        const path = document.createElementNS(svgNS, "path");
        for (let key in attr) {
          path.setAttribute(key, attr[key]);
        }
        svg.appendChild(path);
      });
      return svg;
    },
    genrateScreenshotSvg: function() {
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("viewBox", "0 0 1024 1024");
      svg.setAttribute("width", "20");
      svg.setAttribute("height", "20");
      svg.setAttribute("class", "icon");
      const path1 = document.createElementNS(svgNS, "path");
      path1.setAttribute("d", "M924.49999971 755.74999971h-93.74999942V287c0-52.49999971-41.24999971-93.75000029-93.75000029-93.75000029H268.25000029V99.50000029c0-22.5-15.00000029-37.50000029-37.50000029-37.50000029s-37.50000029 15.00000029-37.50000029 37.50000029v93.74999942H99.50000029c-22.5 0-37.50000029 15.00000029-37.50000029 37.50000029s15.00000029 37.50000029 37.50000029 37.50000029h93.74999942V737c0 52.49999971 41.24999971 93.75000029 93.75000029 93.75000029h468.74999971V924.49999971c0 22.5 15.00000029 37.50000029 37.50000029 37.50000029s37.50000029-15.00000029 37.50000029-37.50000029v-93.74999942H924.49999971c22.5 0 37.50000029-15.00000029 37.50000029-37.50000029s-15.00000029-37.50000029-37.50000029-37.50000029z m-187.49999971-487.49999942c11.25 0 18.74999971 7.49999971 18.74999971 18.74999971v299.99999971l-127.49999942-123.75c-15.00000029-15.00000029-37.50000029-15.00000029-52.50000058 0l-123.75 127.50000029L399.5 538.25000029c-15.00000029-15.00000029-33.75-15.00000029-48.75000029-3.75000029l-78.75 63.74999971V268.25000029H737z m-450 487.49999942c-11.25 0-18.74999971-7.49999971-18.74999971-18.74999971v-37.50000029l101.25-82.49999942 56.25 56.25c7.49999971 7.49999971 15.00000029 11.25 26.24999942 11.25s18.74999971-3.75000029 26.25000029-11.25l123.75-127.50000029 153.74999971 146.25v63.74999971H287z");
      path1.setAttribute("fill", "#000000");
      const path2 = document.createElementNS(svgNS, "path");
      path2.setAttribute("d", "M399.5 485.74999971c45 0 82.50000029-37.50000029 82.50000029-82.49999942s-37.50000029-82.50000029-82.50000029-82.50000029-82.50000029 33.75-82.50000029 78.75 37.50000029 86.24999971 82.50000029 86.24999971z m0-112.5c15.00000029 0 29.99999971 11.25 29.99999971 30.00000058s-15.00000029 26.25000029-29.99999971 26.24999942-29.99999971-15.00000029-29.99999971-29.99999971 15.00000029-26.25000029 29.99999971-26.25000029z");
      path2.setAttribute("fill", "#000000");
      svg.appendChild(path1);
      svg.appendChild(path2);
      return svg;
    },
    genrateSwitchThemeSvg: function() {
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("t", "1743577080138");
      svg.setAttribute("class", "icon");
      svg.setAttribute("viewBox", "0 0 1024 1024");
      svg.setAttribute("version", "1.1");
      svg.setAttribute("xmlns", svgNS);
      svg.setAttribute("p-id", "1950");
      svg.setAttribute("width", "20");
      svg.setAttribute("height", "20");
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", "M873.91601563 358.72753906A393.42480469 393.42480469 0 0 0 512 118.25c-217.546875 0.47460938-393.75 176.57226563-393.75 393.75s176.203125 393.27539063 393.75 393.75a393.95214844 393.95214844 0 0 0 361.91601563-547.02246094zM749.77050781 750.65820313A335.27636719 335.27636719 0 0 1 512 849.5V174.5a337.5 337.5 0 0 1 237.77050781 576.15820313z");
      path.setAttribute("p-id", "1951");
      svg.appendChild(path);
      return svg;
    },
    genratePictureToPictureSvg: function() {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "20");
      svg.setAttribute("height", "20");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("stroke-width", "2");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("fill", "none");
      svg.setAttribute("stroke-linecap", "round");
      svg.setAttribute("stroke-linejoin", "round");
      const paths = [
        { d: "M0 0h24v24H0z", fill: "none" },
        { d: "M11 19h-6a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v4" },
        { d: "M14 14m0 1a1 1 0 0 1 1 -1h5a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-5a1 1 0 0 1 -1 -1z" }
      ];
      paths.forEach((attrs) => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        if (!_hasOwn.call(attrs, "fill")) {
          path.setAttribute("fill", "#000000");
        }
        Object.entries(attrs).forEach(([key, value]) => path.setAttribute(key, value));
        svg.appendChild(path);
      });
      return svg;
    },
    genrateLoopSvg: function() {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("t", "1746700282649");
      svg.setAttribute("class", "icon");
      svg.setAttribute("viewBox", "0 0 1024 1024");
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svg.setAttribute("width", "20");
      svg.setAttribute("height", "20");
      const paths = [
        { d: "M286.95 286.95h450.1v134.61l178.78-178.78L737.05 64v134.61H198.61v269.22h88.34V286.95z m450.1 450.1h-450.1V602.44L108.17 781.22 286.95 960V825.39h538.44V556.17h-88.34v180.88z", "p-id": "3512", fill: "#000000" }
      ];
      paths.forEach((attrs) => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        Object.entries(attrs).forEach(([key, value]) => path.setAttribute(key, value));
        svg.appendChild(path);
      });
      return svg;
    },
    genrateNotLoopSvg: function() {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("t", "1746700343318");
      svg.setAttribute("class", "icon");
      svg.setAttribute("viewBox", "0 0 1024 1024");
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svg.setAttribute("width", "20");
      svg.setAttribute("height", "20");
      const paths = [
        { d: "M759.14 198.61V64l178.78 178.78-178.78 178.78V286.95H391.06l-90.44-88.34h458.52z m0 357.56h88.34v189.3l-88.34-90.44v-98.86zM86.09 209.13l56.79-56.79 750.87 750.87L836.96 960 702.35 825.39H309.03V960L130.25 781.22l178.78-178.78v134.61H611.9L309.03 434.18v33.65H220.7V343.74L86.09 209.13z", "p-id": "3770", fill: "#000000" }
      ];
      paths.forEach((attrs) => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        Object.entries(attrs).forEach(([key, value]) => path.setAttribute(key, value));
        svg.appendChild(path);
      });
      return svg;
    },
    downloadVideo: function() {
      const language = LangueUtil.getLanguage();
      const downloadingConfirm = StorageUtil.getValue(StorageUtil.keys.youtube.downloadingConfirm, false);
      const downloadOperat = () => {
        const url = "https://www.grabshorts.com/" + LangueUtil.getLang() + "/yt?s=40&url=" + window.location.href;
        commonUtil.openInTab(url);
      };
      if (downloadingConfirm) {
        downloadOperat();
      } else {
        CustomConfirm.show({
          "message": language.content.download_confirm_message,
          "enter": language.content.download_enter_text,
          "cancel": language.content.download_cancel_text,
          "onEnter": function() {
            downloadOperat();
            StorageUtil.setValue(StorageUtil.keys.youtube.downloadingConfirm, true);
          },
          "onCancel": function() {
          }
        });
      }
    },
    genrateTools: function(parent) {
      const loopElementId = "_loop_" + Math.ceil(Math.random() * 1e8);
      this.getFunctionState();
      const download = () => {
        this.downloadVideo();
      };
      const switchTheme = () => {
        let currentTheme = StorageUtil.getValue(StorageUtil.keys.youtube.theme, null);
        if (currentTheme == "light" || !currentTheme) {
          currentTheme = "dark";
        } else {
          currentTheme = "light";
        }
        StorageUtil.setValue(StorageUtil.keys.youtube.theme, currentTheme);
        Theme.setTheme(currentTheme, true);
      };
      const screenshot = () => {
        Screenshot.start();
      };
      const showSettingDialog = () => {
        this.showSettingDialog();
      };
      const pictureToPicture = () => {
        const video = document.querySelector("video");
        if ("pictureInPictureEnabled" in document) {
          if (!document.pictureInPictureElement) {
            video.requestPictureInPicture().then(() => {
            }).catch((error) => {
            });
          }
        }
      };
      let videoLoopSate = StorageUtil.getValue(StorageUtil.keys.youtube.videoLoop, false);
      let videoLoopInterval = null;
      const videoLoopEvent = () => {
        if (videoLoopInterval) {
          clearInterval(videoLoopInterval);
          videoLoopInterval = null;
        }
        const videoFull = document.querySelector("#movie_player > div.html5-video-container > video");
        if (videoFull != null) {
          videoLoopInterval = setInterval(() => {
            if (videoLoopSate) {
              document.querySelector("#movie_player > div.html5-video-container > video").setAttribute("loop", "true");
            } else {
              document.querySelector("#movie_player > div.html5-video-container > video").removeAttribute("loop");
            }
          }, 1e3);
        }
      };
      const videoLoop = () => {
        const target = document.querySelector("#" + loopElementId);
        let svg = null;
        if (videoLoopSate) {
          videoLoopSate = false;
          svg = this.genrateNotLoopSvg();
        } else {
          videoLoopSate = true;
          svg = this.genrateLoopSvg();
        }
        target.replaceChildren(svg);
        StorageUtil.setValue(StorageUtil.keys.youtube.videoLoop, videoLoopSate);
        videoLoopEvent();
      };
      videoLoopEvent();
      const btns = [
        {
          "tagName": "div",
          "title": "Setting",
          "classname": "toolbox_extension_tool_btn",
          "onclick": showSettingDialog,
          "icon": this.genrateSettingSvg()
        },
        {
          "tagName": "div",
          "title": "Switch the theme",
          "classname": "toolbox_extension_tool_btn",
          "onclick": switchTheme,
          "icon": this.genrateSwitchThemeSvg()
        },
        {
          "tagName": "div",
          "title": "Screenshot",
          "classname": "toolbox_extension_tool_btn",
          "onclick": screenshot,
          "icon": this.genrateScreenshotSvg()
        },
        {
          "tagName": "div",
          "title": "Picture to picture",
          "classname": "toolbox_extension_tool_btn",
          "onclick": pictureToPicture,
          "icon": this.genratePictureToPictureSvg()
        },
        {
          "tagName": "div",
          "title": "Loop",
          "classname": "toolbox_extension_tool_btn",
          "id": loopElementId,
          "onclick": videoLoop,
          "icon": videoLoopSate ? this.genrateLoopSvg() : this.genrateNotLoopSvg()
        },
        {
          "tagName": "div",
          "title": "Download",
          "classname": "toolbox_extension_tool_btn",
          "onclick": download,
          "icon": this.genrateDownloadSvg()
        }
      ];
      for (let i = 0; i < btns.length; i++) {
        let item = btns[i];
        const element = document.createElement(item.tagName);
        element.className = item.classname;
        element.setAttribute("title", item.title);
        if (_hasOwn.call(item, "icon")) {
          element.appendChild(item.icon);
        }
        if (_hasOwn.call(item, "id")) {
          element.id = item.id;
        }
        if (_hasOwn.call(item, "onclick")) {
          element.onclick = item.onclick;
        }
        if (_hasOwn.call(item, "style")) {
          element.setAttribute("style", item.style);
        }
        parent.appendChild(element);
      }
    },
    genrateBoxContainer: function(button, player) {
      const toolBoxContainer = document.createElement("div");
      toolBoxContainer.id = "toolbox_extension_container";
      toolBoxContainer.className = "toolbox_extension_container";
      const tools = document.createElement("div");
      tools.className = "toolbox_extension_tools";
      this.genrateTools(tools);
      toolBoxContainer.appendChild(tools);
      player.appendChild(toolBoxContainer);
      let isHovering = false;
      button.addEventListener("mouseenter", () => {
        toolBoxContainer.style.display = "block";
        const containerRect = player.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        const toolBoxContainerRect = toolBoxContainer.getBoundingClientRect();
        const left = buttonRect.left - containerRect.left - toolBoxContainerRect.width / 2 + buttonRect.width / 2;
        const top = buttonRect.top - containerRect.top - toolBoxContainer.clientHeight;
        toolBoxContainer.style.left = `${left}px`;
        toolBoxContainer.style.top = `${top}px`;
      });
      button.addEventListener("mouseleave", () => {
        isHovering = false;
        setTimeout(() => {
          if (!isHovering) {
            toolBoxContainer.style.display = "none";
          }
        }, 100);
      });
      toolBoxContainer.addEventListener("mouseenter", () => {
        isHovering = true;
      });
      toolBoxContainer.addEventListener("mouseleave", () => {
        isHovering = false;
        toolBoxContainer.style.display = "none";
      });
    },
    genrateBox: function() {
      return new Promise((resolve) => {
        const buttonId = "toolBox_extension_codehemu_x";
        const boxContainer = document.createElement("div");
        boxContainer.className = "ytp-button";
        boxContainer.id = buttonId;
        boxContainer.setAttribute("style", `position: relative;display: inline-block;width: 48px;height: 100%;`);
        const boxInner = document.createElement("div");
        boxInner.setAttribute("style", `position: absolute;width: 100%;height: 100%;	`);
        const boxActiveButton = document.createElement("button");
        boxActiveButton.setAttribute("style", `background-color: transparent;width: 100%;height: 100%;outline: none;flex: 1 1 0%;display: flex;-webkit-box-align: center;align-items: center;-webkit-box-pack: center;justify-content: center;border: none;padding: 0px;cursor: pointer;`);
        boxContainer.appendChild(boxInner);
        boxInner.appendChild(boxActiveButton);
        boxActiveButton.appendChild(this.genrateToolSvg());
        const genrateHtml = () => {
          const player = document.querySelector("#player-container-outer .html5-video-player");
          if (player) {
            const rightControls = player.querySelector(".ytp-right-controls");
            if (rightControls) {
              rightControls.prepend(boxContainer);
              this.genrateBoxContainer(boxContainer, player);
            }
          }
        };
        const interval = setInterval(() => {
          if (!document.querySelector("#" + buttonId)) {
            genrateHtml();
          } else {
            resolve();
            clearInterval(interval);
          }
        }, 500);
      });
    },
    genrateShorts: function() {
      const genrateHtml = () => {
        if (window.location.href.indexOf("/shorts/") != -1) {
          const navigationButtonDown = document.querySelector("#navigation-button-down");
          if (navigationButtonDown) {
            const download = document.createElement("div");
            download.setAttribute("style", "cursor:pointer;display: flex;justify-content: center;align-items: center;");
            download.id = "script_download_shorts";
            download.className = "navigation-button style-scope ytd-shorts";
            navigationButtonDown.after(download);
            download.appendChild(this.genrateShortDownloadSvg());
            download.addEventListener("click", () => {
              this.downloadVideo();
            });
          }
        }
      };
      setInterval(() => {
        if (!document.querySelector("#script_download_shorts")) {
          genrateHtml();
        }
      }, 800);
    },
    genrateOuterBox: function() {
      const outerBoxId = "script_outer_box";
      const outerBox = document.createElement("div");
      outerBox.id = outerBoxId;
      outerBox.setAttribute("style", "margin-left:10px;display:inline-flex;border-radius:10px;overflow: hidden;");
      const download = document.createElement("div");
      download.setAttribute("style", "width:36px;height:36px;border:none;cursor:pointer;display:flex;align-items: center;justify-content:center");
      download.appendChild(this.genrateShortDownloadSvg());
      outerBox.appendChild(download);
      download.onclick = this.downloadVideo;
      const interval = setInterval(() => {
        if (!document.querySelector("#" + outerBoxId)) {
          const owner = document.querySelector("#owner");
          if (owner) {
            owner.appendChild(outerBox);
            clearInterval(interval);
          } else {
            const actions = document.querySelector("#actions");
            if (actions) {
              actions.insertBefore(outerBox, actions.firstChild);
              clearInterval(interval);
            }
          }
        }
      }, 500);
    },
    showSettingDialog: function() {
      const functionState = StorageUtil.getValue(StorageUtil.keys.youtube.functionState, StorageUtil.getDefaultFunctionState());
      const language = LangueUtil.getLanguage();
      const styleSheet = `
			.row-item{
			    background: #ffffff;
			    padding: 15px;
			    border-radius: 10px;
			    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
			    transition: background 0.3s;
				margin-bottom: 10px;
			}
			.setting {
			    display: flex;
			    justify-content: space-between;
			    align-items: center;
			}
			.setting .setting-name{
			    flex: 1;
			    text-align: left;
			    font-size: 14px;
			}
			.setting .setting-switch{
			    width: 60px;
			    display: flex;
			    justify-content: end;
			}
			label {
			    font-size: 16px;
			    font-weight: bold;
			}
			.toggle {
			    width: 50px;
			    height: 25px;
			    background-color: #ccc;
			    border-radius: 15px;
			    position: relative;
			    cursor: pointer;
			    transition: background-color 0.3s;
			    display: inline-block;
			}
			.toggle:before {
			    content: '';
			    position: absolute;
			    width: 20px;
			    height: 20px;
			    background-color: white;
			    border-radius: 50%;
			    top: 50%;
			    left: 3px;
			    transform: translateY(-50%);
			    transition: 0.2s;
			}
			input:checked + .toggle {
			    background-color: #4CAF50;
			}
			input:checked + .toggle:before {
			    transform: translate(24px, -50%);
			}
			input {
			    display: none;
			}
		`;
      // build settings form as DOM nodes (no innerHTML XSS)
      const contentRoot = document.createDocumentFragment();
      const settings = [
        { id: "isCommentTableOpen", i18n: "function_is_comment_table_open", key: "isOpenCommentTable" },
        { id: "isThemeProgressBarOpen", i18n: "function_is_theme_progress_bar_open", key: "isOpenThemeProgressBar" },
        { id: "isSpeedControlOpen", i18n: "function_is_speed_control_open", key: "isOpenSpeedControl" },
        { id: "isMarkOrRemoveAdOpen", i18n: "function_is_mark_or_remove_ad_open", key: "isOpenMarkOrRemoveAd" },
        { id: "isYoutubedownloadingOpen", i18n: "function_is_youtube_downloading_open", key: "isOpenYoutubedownloading" }
      ];
      settings.forEach(({ id, i18n, key }) => {
        const row = document.createElement("div");
        row.className = "row-item setting";
        const name = document.createElement("div");
        name.className = "setting-name";
        name.setAttribute("data-i18n", i18n);
        name.textContent = language.content[i18n];
        const sw = document.createElement("div");
        sw.className = "setting-switch";
        const input = document.createElement("input");
        input.type = "checkbox";
        input.id = id;
        input.checked = functionState[key];
        const label = document.createElement("label");
        label.className = "toggle";
        label.setAttribute("for", id);
        sw.appendChild(input);
        sw.appendChild(label);
        row.appendChild(name);
        row.appendChild(sw);
        contentRoot.appendChild(row);
        input.addEventListener("change", (e) => {
          functionState[key] = e.target.checked;
          StorageUtil.setValue(StorageUtil.keys.youtube.functionState, functionState);
        });
      });
      Dialog.showMake({
        title: language.content.function_setting_title,
        contentNode: contentRoot,
        styleSheet,
        direction: language.direction,
        onClose: function() {
          location.reload();
        }
      });
    },
    run: function() {
      return new Promise((resolve) => {
        if (/youtube\.com/.test(window.location.host)) {
          // GM_registerMenuCommand reemplazado: ya no hay menú de Tampermonkey,
          // los ajustes se abren con el engranaje del reproductor (arriba) o
          // desde el popup de la extensión.
          commonUtil.onPageLoad(async () => {
            const theme = StorageUtil.getValue(StorageUtil.keys.youtube.theme, null);
            if (theme) {
              Theme.setTheme(theme, false);
            }
            this.insertStyle();
            const functionState = this.getFunctionState();
            await this.genrateBox();
            if (functionState && functionState.isOpenYoutubedownloading) {
              this.genrateShorts();
              this.genrateOuterBox();
            }
            resolve();
          });
        } else {
          resolve();
        }
      });
    }
  };

