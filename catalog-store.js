/* 35 — easy catalog in localStorage (no code edits) */
window.Catalog35 = (function () {
  var KEY = "35_catalog_v1";

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      var list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function save(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function add(item) {
    var list = load();
    list.unshift({
      id: "u" + Date.now(),
      section: item.section,
      name: item.name,
      desc: item.desc || "",
      price: item.price == null ? null : item.price,
      colors: item.colors || [],
      image: item.image,
      note: item.note || ""
    });
    save(list);
    return list;
  }

  function all() {
    return load();
  }

  function clear() {
    localStorage.removeItem(KEY);
  }

  return { add: add, all: all, clear: clear, load: load };
})();
