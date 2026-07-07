/*!
 * Screenshot - captura un frame del video actual y lo descarga como PNG.
 */

  export const Screenshot = {
    start: function() {
      const extension = "png";
      const appendixTitle = "screenshot." + extension;
      let title;
      let headerEls = document.querySelectorAll(
        "h1.title.ytd-video-primary-info-renderer"
      );
      const setTitle = () => {
        if (headerEls.length > 0) {
          title = headerEls[0].textContent.trim();
          return true;
        }
        return false;
      };
      if (!setTitle()) {
        headerEls = document.querySelectorAll("h1.watch-title-container");
        if (!setTitle())
          title = "";
      }
      const player = document.getElementsByClassName("video-stream")[0];
      const time = player.currentTime;
      title += " ";
      let minutes = Math.floor(time / 60);
      let secs = Math.floor(time - minutes * 60);
      if (minutes > 60) {
        const hours = Math.floor(minutes / 60);
        minutes -= hours * 60;
        title += hours + "-";
      }
      title += minutes + "-" + secs;
      title += " " + appendixTitle;
      const canvas = document.createElement("canvas");
      canvas.width = player.videoWidth;
      canvas.height = player.videoHeight;
      try {
        canvas.getContext("2d").drawImage(player, 0, 0, canvas.width, canvas.height);
      } catch (_) { return; }
      const downloadLink = document.createElement("a");
      downloadLink.download = title;
      const downloadBlob = (blob) => {
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.click();
      };
      canvas.toBlob((blob) => {
        downloadBlob(blob);
      }, "image/" + extension);
    }
  };

