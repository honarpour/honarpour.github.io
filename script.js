(function () {
  var STORAGE_KEY = "theme-preference";
  var root = document.documentElement;
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function getPreference() {
    try {
      return localStorage.getItem(STORAGE_KEY) || "system";
    } catch (e) {
      return "system";
    }
  }

  function resolve(pref) {
    return pref === "system" ? (media.matches ? "dark" : "light") : pref;
  }

  function applyTheme(pref) {
    root.setAttribute("data-theme", resolve(pref));
    document.querySelectorAll("[data-theme-option]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.dataset.themeOption === pref));
    });
  }

  function setPreference(pref) {
    try {
      localStorage.setItem(STORAGE_KEY, pref);
    } catch (e) {}
    applyTheme(pref);
  }

  applyTheme(getPreference());

  media.addEventListener("change", function () {
    if (getPreference() === "system") applyTheme("system");
  });

  document.querySelectorAll("[data-theme-option]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setPreference(btn.dataset.themeOption);
    });
  });

  document.querySelectorAll(".repo-card").forEach(function (card, i) {
    card.style.setProperty("--i", i);
  });
})();
