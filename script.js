/* 35 — filters + render (base products.js + easy Add page storage) */
(function () {
  "use strict";

  var WA_BASE = "https://wa.me/201064093135?text=";
  var IG_DM = "https://ig.me/m/35.dubai";
  var TT_PROFILE = "https://www.tiktok.com/@35.dubai";

  var SECTION_LABELS = {
    gemstones: "Gemstones",
    sterling: "925 Sterling",
    accessories: "Accessories"
  };

  function allProducts() {
    var base = window.PRODUCTS_35 || [];
    var extra = window.Catalog35 ? Catalog35.all() : [];
    return extra.concat(base);
  }

  function encodeMsg(product) {
    var note = product.note ? " · Note: " + product.note : "";
    var colors =
      product.colors && product.colors.length
        ? " · Color: " + product.colors.join("/")
        : "";
    var priceBit =
      product.price == null || product.price === ""
        ? "price on chat"
        : product.price + " AED";
    var msg =
      "Hi 35, I'd like to order: " +
      product.name +
      " (" +
      priceBit +
      " · COD · Dubai)" +
      colors +
      note;
    return encodeURIComponent(msg);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/'/g, "&#39;");
  }

  function renderCard(product) {
    var label = SECTION_LABELS[product.section] || product.section;
    var article = document.createElement("article");
    article.className = "product-card";
    article.dataset.section = product.section;

    var priceHtml =
      product.price == null || product.price === ""
        ? '<span class="price-ask">Price on WhatsApp</span>'
        : escapeHtml(String(product.price)) + " <span>AED</span>";

    var colorsHtml =
      product.colors && product.colors.length
        ? '<p class="product-card__colors">' +
          escapeHtml(product.colors.join(" · ")) +
          "</p>"
        : "";

    article.innerHTML =
      '<div class="product-card__media">' +
      '<img src="' +
      escapeAttr(product.image) +
      '" alt="' +
      escapeAttr(product.name) +
      '" loading="lazy" />' +
      "</div>" +
      '<div class="product-card__body">' +
      '<span class="product-card__section">' +
      label +
      "</span>" +
      '<h3 class="product-card__name">' +
      escapeHtml(product.name) +
      "</h3>" +
      '<p class="product-card__desc">' +
      escapeHtml(product.desc || "") +
      "</p>" +
      '<p class="product-card__price">' +
      priceHtml +
      "</p>" +
      colorsHtml +
      '<div class="product-card__actions">' +
      '<a class="btn btn--wa btn--xs" href="' +
      WA_BASE +
      encodeMsg(product) +
      '" target="_blank" rel="noopener noreferrer">Order on WhatsApp</a>' +
      '<a class="btn btn--ig btn--xs" href="' +
      IG_DM +
      '" target="_blank" rel="noopener noreferrer">DM Instagram</a>' +
      '<a class="btn btn--tt btn--xs" href="' +
      TT_PROFILE +
      '" target="_blank" rel="noopener noreferrer">DM TikTok</a>' +
      "</div>" +
      "</div>";

    return article;
  }

  function renderProducts(filter) {
    var grid = document.getElementById("product-grid");
    if (!grid) return;
    grid.innerHTML = "";
    var list = allProducts().filter(function (p) {
      return filter === "all" || p.section === filter;
    });
    if (!list.length) {
      var empty = document.createElement("p");
      empty.className = "empty-state";
      empty.innerHTML =
        'No photos yet.<br /><a href="add.html">Tap here to add a piece</a> — easy, no code.';
      grid.appendChild(empty);
      return;
    }
    list.forEach(function (p) {
      grid.appendChild(renderCard(p));
    });
  }

  function setActiveFilter(filter) {
    document.querySelectorAll(".filter-tab").forEach(function (tab) {
      var on = tab.dataset.filter === filter;
      tab.classList.toggle("is-active", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
    });
    renderProducts(filter);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());

    document.querySelectorAll(".filter-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        setActiveFilter(tab.dataset.filter || "all");
      });
    });
    document.querySelectorAll(".section-card[data-filter]").forEach(function (card) {
      card.addEventListener("click", function () {
        setActiveFilter(card.dataset.filter);
        var shop = document.getElementById("shop");
        if (shop) shop.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    renderProducts("all");
  });
})();
