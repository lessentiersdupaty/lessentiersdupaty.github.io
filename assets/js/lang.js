(function () {
    var STORAGE_KEY = "lang";

    function setLang(lang) {
        document.documentElement.lang = lang;
        var els = document.querySelectorAll("[data-en]");
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            if (lang === "en") {
                el.innerHTML = el.getAttribute("data-en");
            } else {
                el.innerHTML = el.getAttribute("data-fr");
            }
        }
        var toggle = document.getElementById("lang-toggle");
        if (toggle) {
            toggle.checked = lang === "en";
        }
        var frLabel = document.getElementById("lang-label-fr");
        var enLabel = document.getElementById("lang-label-en");
        if (frLabel && enLabel) {
            frLabel.className = lang === "fr" ? "active" : "";
            enLabel.className = lang === "en" ? "active" : "";
        }
        localStorage.setItem(STORAGE_KEY, lang);
    }

    function init() {
        // Store original French text in data-fr before first toggle
        var els = document.querySelectorAll("[data-en]");
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            if (!el.getAttribute("data-fr")) {
                el.setAttribute("data-fr", el.innerHTML);
            }
        }

        var toggle = document.getElementById("lang-toggle");
        if (toggle) {
            toggle.addEventListener("change", function () {
                setLang(this.checked ? "en" : "fr");
            });
        }

        var saved = localStorage.getItem(STORAGE_KEY);
        if (saved === "en") {
            setLang("en");
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
