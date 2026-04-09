(function () {
  function getCopyStatusEl() {
    return document.getElementById("copy-status");
  }

  function showCopyStatus(message) {
    var el = getCopyStatusEl();
    if (!el) return;
    el.textContent = message;
    el.hidden = false;
  }

  function clearCopyStatus() {
    var el = getCopyStatusEl();
    if (!el) return;
    el.textContent = "";
    el.hidden = true;
  }

  function copyViaExecCommand(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    ta.style.top = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (e) {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
  }

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      if (!text) return;
      var prevLabel = btn.getAttribute("aria-label") || "";
      var prevText = btn.textContent;

      function finishSuccess() {
        btn.setAttribute("data-copied", "true");
        btn.setAttribute("aria-label", "Copied to clipboard");
        btn.textContent = "Copied";
        clearCopyStatus();
        setTimeout(function () {
          btn.removeAttribute("data-copied");
          btn.textContent = prevText;
          btn.setAttribute("aria-label", prevLabel || "Copy email address");
        }, 2000);
      }

      function finishFailure() {
        btn.textContent = prevText;
        showCopyStatus(
          "Copy did not work in this browser. Select the email address above, or use the mailto link."
        );
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () {
            finishSuccess();
          },
          function () {
            if (copyViaExecCommand(text)) {
              finishSuccess();
            } else {
              finishFailure();
            }
          }
        );
      } else if (copyViaExecCommand(text)) {
        finishSuccess();
      } else {
        finishFailure();
      }
    });
  });
})();
