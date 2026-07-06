/*!
 * Screenshot - captura un frame del video actual y lo descarga como PNG.
 */

  export const Screenshot = {
    start: function() {
      var SF_Codhemeu = "png";
      var extension = "png";
      var appendixTitle = "screenshot." + extension;
      var title;
      var headerEls = document.querySelectorAll(
        "h1.title.ytd-video-primary-info-renderer"
      );
      function SetTitle() {
        if (headerEls.length > 0) {
          title = headerEls[0].innerText.trim();
          return true;
        } else {
          return false;
        }
      }
      if (SetTitle() == false) {
        headerEls = document.querySelectorAll("h1.watch-title-container");
        if (SetTitle() == false)
          title = "";
      }
      var player = document.getElementsByClassName("video-stream")[0];
      var time = player.currentTime;
      title += " ";
      let minutes = Math.floor(time / 60);
      time = Math.floor(time - minutes * 60);
      if (minutes > 60) {
        let hours = Math.floor(minutes / 60);
        minutes -= hours * 60;
        title += hours + "-";
      }
      title += minutes + "-" + time;
      title += " " + appendixTitle;
      var canvas = document.createElement("canvas");
      canvas.width = player.videoWidth;
      canvas.height = player.videoHeight;
      canvas.getContext("2d").drawImage(player, 0, 0, canvas.width, canvas.height);
      var downloadLink = document.createElement("a");
      downloadLink.download = title;
      function DownloadBlob(blob) {
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.click();
      }
      {
        canvas.toBlob(async function(blob) {
          DownloadBlob(blob);
        }, "image/" + SF_Codhemeu);
      }
    }
  };

