(function(window, document, undefined) {
  var nightModeStorage = localStorage.getItem("gmtNightMode");
  var nightMode = document.querySelector("#night-mode");
  var metaThemeColor = document.querySelector("meta[name=theme-color]");
  var initialThemeColor = metaThemeColor.content;

  if (nightModeStorage) {
    document.documentElement.classList.add("night-mode");
    metaThemeColor.setAttribute("content", "#2b2b2b");
    nightMode.checked = true;
  }

  // When clicked, toggle night mode on or off
  nightMode.addEventListener(
    "click",
    function(event) {
      document.documentElement.classList.toggle("night-mode");

      if (typeof DISQUS !== "undefined") {
        DISQUS.reset({
          reload: true,
          config: function() {
            this.page.identifier = document.location.href;
            this.page.url = document.location.href;
          }
        });
      }

      if (document.documentElement.classList.contains("night-mode")) {
        localStorage.setItem("gmtNightMode", true);
        metaThemeColor.setAttribute("content", "#2b2b2b");
        return;
      }
      localStorage.removeItem("gmtNightMode");
      metaThemeColor.setAttribute("content", initialThemeColor);
    },
    false
  );
})(window, document);
