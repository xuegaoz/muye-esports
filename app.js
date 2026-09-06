(() => {
  const DATA = window.MUYE_DATA;
  const glyphs = {
    basic: "￥",
    fun: "✦",
    fortune: "签",
    rules: "阅"
  };

  const homeView = document.getElementById("homeView");
  const categoryView = document.getElementById("categoryView");
  const searchView = document.getElementById("searchView");

  const categoryGrid = document.getElementById("categoryGrid");
  const cardList = document.getElementById("cardList");
  const bottomNav = document.getElementById("bottomNav");

  const categoryTitle = document.getElementById("categoryTitle");
  const categorySubtitle = document.getElementById("categorySubtitle");
  const categoryMark = document.getElementById("categoryMark");
  const categoryCount = document.getElementById("categoryCount");

  const searchInput = document.getElementById("searchInput");
  const clearSearch = document.getElementById("clearSearch");
  const searchList = document.getElementById("searchList");
  const searchCount = document.getElementById("searchCount");
  const searchKeyword = document.getElementById("searchKeyword");
  const emptySearch = document.getElementById("emptySearch");

  const logoHome = document.getElementById("logoHome");
  const backHome = document.getElementById("backHome");
  const exitSearch = document.getElementById("exitSearch");

  const viewer = document.getElementById("viewer");
  const closeViewer = document.getElementById("closeViewer");
  const viewerImage = document.getElementById("viewerImage");
  const viewerTitle = document.getElementById("viewerTitle");
  const viewerCategory = document.getElementById("viewerCategory");
  const imageLoading = document.getElementById("imageLoading");
  const imageError = document.getElementById("imageError");
  const viewerStage = document.getElementById("viewerStage");

  let activeCategory = null;
  let previousMode = "home";

  function showOnly(view) {
    [homeView, categoryView, searchView].forEach(v => v.classList.add("is-hidden"));
    view.classList.remove("is-hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateNav() {
    bottomNav.querySelectorAll(".nav-item").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.id === activeCategory);
    });
  }

  function renderHome() {
    categoryGrid.innerHTML = DATA.categories.map(cat => `
      <button class="category-tile" data-id="${cat.id}" type="button">
        <span class="tile-mark">${glyphs[cat.id] || "✦"}</span>
        <h3>${cat.title}</h3>
        <p>${cat.subtitle}</p>
        <span class="tile-foot">
          <span>${cat.items.length} 项内容</span>
          <span class="tile-arrow">›</span>
        </span>
      </button>
    `).join("");

    categoryGrid.querySelectorAll(".category-tile").forEach(btn => {
      btn.addEventListener("click", () => openCategory(btn.dataset.id));
    });
  }

  function renderBottomNav() {
    bottomNav.innerHTML = DATA.categories.map(cat => `
      <button type="button" class="nav-item" data-id="${cat.id}">
        <span class="nav-glyph">${glyphs[cat.id] || "✦"}</span>
        <span class="nav-label">${shortLabel(cat.id, cat.title)}</span>
      </button>
    `).join("");

    bottomNav.querySelectorAll(".nav-item").forEach(btn => {
      btn.addEventListener("click", () => {
        searchInput.value = "";
        clearSearch.classList.remove("show");
        openCategory(btn.dataset.id);
      });
    });
  }

  function shortLabel(id, title) {
    if (id === "basic") return "基础";
    if (id === "fun") return "趣味";
    if (id === "fortune") return "一日一签";
    if (id === "rules") return "须知";
    return title;
  }

  function buildCard(item, category) {
    return `
      <article class="price-card" tabindex="0"
        data-full="${item.full}"
        data-title="${escapeAttr(item.title)}"
        data-category="${escapeAttr(category.title)}">
        <div class="price-thumb">
          <img src="${item.thumb}" alt="${escapeAttr(item.title)}"
               loading="lazy" decoding="async" />
          <span class="card-category-mini">${category.title}</span>
        </div>
        <div class="price-info">
          <h3>${item.title}</h3>
          <div class="english">${item.english || ""}</div>
          <p class="description">${item.description || ""}</p>
          <div class="card-open">
            <span>查看高清价目表</span>
            <i>›</i>
          </div>
        </div>
      </article>
    `;
  }

  function bindCards(container) {
    container.querySelectorAll(".price-card").forEach(card => {
      const open = () => openViewer({
        full: card.dataset.full,
        title: card.dataset.title,
        category: card.dataset.category
      });
      card.addEventListener("click", open);
      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") open();
      });
    });
  }

  function openCategory(id) {
    const cat = DATA.categories.find(c => c.id === id);
    if (!cat) return;

    activeCategory = id;
    previousMode = "category";
    updateNav();

    categoryMark.textContent = glyphs[id] || "✦";
    categoryTitle.textContent = cat.title;
    categorySubtitle.textContent = cat.subtitle;
    categoryCount.textContent = `${cat.items.length} 项`;

    cardList.innerHTML = cat.items.map(item => buildCard(item, cat)).join("");
    bindCards(cardList);

    showOnly(categoryView);
  }

  function goHome() {
    activeCategory = null;
    previousMode = "home";
    searchInput.value = "";
    clearSearch.classList.remove("show");
    updateNav();
    showOnly(homeView);
  }

  function runSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      if (previousMode === "category" && activeCategory) openCategory(activeCategory);
      else goHome();
      return;
    }

    const results = [];
    DATA.categories.forEach(cat => {
      cat.items.forEach(item => {
        const haystack = `${item.title} ${item.english || ""} ${item.description || ""} ${cat.title} ${cat.subtitle}`.toLowerCase();
        if (haystack.includes(q)) results.push({ item, cat });
      });
    });

    searchKeyword.textContent = `“${query.trim()}”`;
    searchCount.textContent = `${results.length} 项`;
    searchList.innerHTML = results.map(r => buildCard(r.item, r.cat)).join("");
    bindCards(searchList);
    emptySearch.classList.toggle("is-hidden", results.length !== 0);

    showOnly(searchView);
  }

  searchInput.addEventListener("input", () => {
    const value = searchInput.value;
    clearSearch.classList.toggle("show", value.length > 0);
    runSearch(value);
  });

  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    clearSearch.classList.remove("show");
    searchInput.focus();
    if (activeCategory) openCategory(activeCategory);
    else goHome();
  });

  exitSearch.addEventListener("click", () => {
    searchInput.value = "";
    clearSearch.classList.remove("show");
    if (activeCategory) openCategory(activeCategory);
    else goHome();
  });

  backHome.addEventListener("click", goHome);
  logoHome.addEventListener("click", goHome);

  function openViewer(item) {
    viewerTitle.textContent = item.title;
    viewerCategory.textContent = item.category;

    // 每次打开都重置三个状态，彻底解决“加载中文字不消失”
    viewerImage.classList.add("is-hidden");
    imageError.classList.add("is-hidden");
    imageLoading.classList.remove("is-hidden");

    viewerImage.removeAttribute("src");
    viewerImage.alt = item.title;
    viewerStage.scrollTop = 0;

    viewer.classList.remove("is-hidden");
    viewer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // 先用独立 Image 对象加载，成功后再显示真正图片
    const preloader = new Image();

    preloader.onload = async () => {
      viewerImage.src = item.full;

      try {
        if (viewerImage.decode) {
          await viewerImage.decode();
        }
      } catch (_) {
        // decode 失败也不影响显示
      }

      imageLoading.classList.add("is-hidden");
      imageError.classList.add("is-hidden");
      viewerImage.classList.remove("is-hidden");
    };

    preloader.onerror = () => {
      imageLoading.classList.add("is-hidden");
      viewerImage.classList.add("is-hidden");
      imageError.classList.remove("is-hidden");
    };

    preloader.src = item.full;
  }

  function closeImageViewer() {
    viewer.classList.add("is-hidden");
    viewer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    viewerImage.classList.add("is-hidden");
    viewerImage.removeAttribute("src");
    imageLoading.classList.remove("is-hidden");
    imageError.classList.add("is-hidden");
  }

  closeViewer.addEventListener("click", closeImageViewer);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !viewer.classList.contains("is-hidden")) {
      closeImageViewer();
    }
  });

  function escapeAttr(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  renderHome();
  renderBottomNav();
  updateNav();
})();
