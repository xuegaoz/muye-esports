(() => {
  const data = window.MUYE_DATA;
  const tabs = document.getElementById("categoryTabs");
  const overview = document.getElementById("overview");
  const grid = document.getElementById("cardGrid");
  const input = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearSearch");
  const sectionTitle = document.getElementById("sectionTitle");
  const sectionKicker = document.getElementById("sectionKicker");
  const itemCount = document.getElementById("itemCount");
  const emptyState = document.getElementById("emptyState");

  const viewer = document.getElementById("viewer");
  const viewerTitle = document.getElementById("viewerTitle");
  const viewerCategory = document.getElementById("viewerCategory");
  const viewerImage = document.getElementById("viewerImage");

  let activeCategory = "all";

  function renderTabs() {
    const defs = [{ id: "all", emoji: "✦", title: "全部" }, ...data.categories];
    tabs.innerHTML = defs.map(c => `
      <button class="tab ${activeCategory === c.id ? "active" : ""}" data-category="${c.id}">
        ${c.emoji} ${c.title}
      </button>
    `).join("");

    tabs.querySelectorAll(".tab").forEach(btn => {
      btn.addEventListener("click", () => {
        activeCategory = btn.dataset.category;
        renderTabs();
        renderCards();
        if (window.innerWidth < 700) {
          document.querySelector(".content-panel").scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  function renderOverview() {
    overview.innerHTML = data.categories.map(c => `
      <article class="category-card" data-id="${c.id}" role="button" tabindex="0">
        <div class="emoji">${c.emoji}</div>
        <h3>${c.title}</h3>
        <p>${c.items.length} 项 · ${c.subtitle}</p>
        <span class="arrow">›</span>
      </article>
    `).join("");

    overview.querySelectorAll(".category-card").forEach(card => {
      const open = () => {
        activeCategory = card.dataset.id;
        input.value = "";
        clearBtn.classList.remove("visible");
        renderTabs();
        renderCards();
        document.querySelector(".content-panel").scrollIntoView({ behavior: "smooth", block: "start" });
      };
      card.addEventListener("click", open);
      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") open();
      });
    });
  }

  function getVisibleItems() {
    const q = input.value.trim().toLowerCase();
    const categories = activeCategory === "all"
      ? data.categories
      : data.categories.filter(c => c.id === activeCategory);

    return categories.flatMap(category =>
      category.items
        .filter(item => {
          const haystack = `${item.title} ${item.description} ${category.title}`.toLowerCase();
          return !q || haystack.includes(q);
        })
        .map(item => ({ ...item, category }))
    );
  }

  function renderCards() {
    const items = getVisibleItems();
    const current = data.categories.find(c => c.id === activeCategory);

    sectionTitle.textContent = input.value.trim()
      ? `“${input.value.trim()}” 的搜索结果`
      : (current ? current.title : "全部价目表");

    sectionKicker.textContent = current ? "CATEGORY" : "PRICE LIST";
    itemCount.textContent = `${items.length} 项`;
    emptyState.hidden = items.length !== 0;

    grid.innerHTML = items.map((item, index) => `
      <article class="price-card" data-index="${index}">
        <div class="card-thumb">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
          <span class="card-tag">${item.category.emoji} ${item.category.title}</span>
        </div>
        <div class="card-body">
          <h3>${item.title}</h3>
          <p>${item.description || ""}</p>
          <span class="view-link">查看价目表 <b>↗</b></span>
        </div>
      </article>
    `).join("");

    grid.querySelectorAll(".price-card").forEach((card, index) => {
      card.addEventListener("click", () => openViewer(items[index]));
    });
  }

  function openViewer(item) {
    viewerTitle.textContent = item.title;
    viewerCategory.textContent = `${item.category.emoji} ${item.category.title}`;
    viewerImage.src = item.image;
    viewerImage.alt = item.title;
    viewer.classList.add("open");
    viewer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeViewer() {
    viewer.classList.remove("open");
    viewer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    viewerImage.src = "";
  }

  document.querySelectorAll("[data-close-viewer]").forEach(el => el.addEventListener("click", closeViewer));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeViewer(); });

  input.addEventListener("input", () => {
    clearBtn.classList.toggle("visible", input.value.length > 0);
    renderCards();
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    clearBtn.classList.remove("visible");
    input.focus();
    renderCards();
  });

  renderTabs();
  renderOverview();
  renderCards();
})();
