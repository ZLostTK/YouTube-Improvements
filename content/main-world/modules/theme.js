/*!
 * Theme - alterna el modo claro/oscuro de YouTube via la cookie PREF.
 */

  export const Theme = {
    setTheme: function(theme = "light", isReload = true) {
      if (theme === "light") {
        this.setLight(isReload);
      } else if (theme === "dark") {
        this.setDark(isReload);
      } else {
        this.setLight(isReload);
      }
    },
    setDark: function(isReload) {
      this.isDarkTheme(true, isReload);
    },
    setLight: function(isReload) {
      this.isDarkTheme(false, isReload);
    },
    reloadYouTube: function() {
      location.reload();
    },
    isDarkTheme: function(enabled, isReload) {
      const cookies = document.cookie.split("; ");
      let prefCookie = cookies.find((cookie) => cookie.startsWith("PREF="));
      let prefValue = prefCookie ? prefCookie.split("=")[1] : "f6=400";
      prefValue = prefValue.replace(/&f6=\d+/, "").replace(/f6=\d+/, "");
      const prefix = prefValue ? "&" : "";
      if (enabled) {
        prefValue += prefix + "f6=400";
      } else {
        prefValue += prefix + "f6=80000";
      }
      document.cookie = `PREF=${prefValue}; path=/; domain=.youtube.com; secure`;
      if (isReload) {
        this.reloadYouTube();
      }
    }
  };

