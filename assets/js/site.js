(function () {
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      if (!text) return;
      var prevLabel = btn.getAttribute("aria-label") || "";
      var prevText = btn.textContent;
      function finish(ok) {
        if (ok) {
          btn.setAttribute("data-copied", "true");
          btn.setAttribute("aria-label", "Copied to clipboard");
          btn.textContent = "Copied";
          setTimeout(function () {
            btn.removeAttribute("data-copied");
            btn.textContent = prevText;
            btn.setAttribute("aria-label", prevLabel || "Copy email address");
          }, 2000);
        }
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { finish(true); }).catch(function () { finish(false); });
      }
    });
  });
})();
