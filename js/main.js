// 片付け本舗なかのくん公式サイト 共通スクリプト
(function () {
  "use strict";

  // ---- モバイルナビゲーション開閉 ----
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("siteNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // メニュー内リンクをクリックしたら閉じる（モバイル）
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- 現在ページのナビゲーションにハイライト ----
  var currentPath = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === currentPath) {
      link.classList.add("is-current");
      link.setAttribute("aria-current", "page");
    }
  });

  // ---- 写真アップロードのプレビュー表示 ----
  var fileInput = document.getElementById("photos");
  var previewBox = document.getElementById("uploadPreview");

  if (fileInput && previewBox) {
    fileInput.addEventListener("change", function () {
      previewBox.innerHTML = "";
      var files = Array.prototype.slice.call(fileInput.files || []).slice(0, 10);
      files.forEach(function (file) {
        if (!file.type || file.type.indexOf("image/") !== 0) return;
        var reader = new FileReader();
        reader.onload = function (e) {
          var img = document.createElement("img");
          img.src = e.target.result;
          img.alt = file.name;
          previewBox.appendChild(img);
        };
        reader.readAsDataURL(file);
      });
    });
  }

  // ---- お問い合わせフォーム: 簡易バリデーション ----
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      var requiredFields = form.querySelectorAll("[required]");
      var hasError = false;
      requiredFields.forEach(function (field) {
        if (!field.value || (field.type === "checkbox" && !field.checked)) {
          hasError = true;
          field.classList.add("field-error");
        } else {
          field.classList.remove("field-error");
        }
      });

      if (hasError) {
        e.preventDefault();
        var firstError = form.querySelector(".field-error");
        if (firstError) {
          firstError.focus();
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        var msg = document.getElementById("formErrorMsg");
        if (msg) msg.hidden = false;
      }

      // 送信先は後日WordPress等のフォーム処理エンドポイントに接続してください。
      // このデモではブラウザの既定送信（もしくは未接続の場合は何も起きません）に任せています。
    });
  }
})();
