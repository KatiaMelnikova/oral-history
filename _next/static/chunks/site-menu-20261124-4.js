(function () {
  const sections = [
    { title: "Перед началом", items: [["Зачем", "/pered-nachalom/"], ["Я и мой собеседник", "/pered-nachalom/ya-i-moy-sobesednik/"], ["Сколько интервью нужно", "/pered-nachalom/skolko-intervyu/"], ["Типы респондентов", "/pered-nachalom/tipy-respondentov/"], ["Подготовка и путеводитель", "/pered-nachalom/podgotovka/"]] },
    { title: "В процессе", items: [["Вопрошание", "/v-processe/"], ["Исследовательские вопросы", "/v-processe/issledovatelskie-voprosy/"], ["Общие принципы коммуникации", "/v-processe/kommunikaciya/"], ["Установление контакта", "/v-processe/kontakt/"], ["Базовые правила вопрошания", "/v-processe/pravila-voproshaniya/"], ["Полезные приёмы", "/v-processe/priemy/"], ["Интервью и истории о жизни", "/v-processe/tipy-intervyu/"], ["Этика и ответственность", "/v-processe/etika/"], ["Техника", "/v-processe/tekhnika/"], ["Анкеты, конспекты, дневники", "/v-processe/dopolnitelnye-materialy/"]] },
    { title: "После интервью", items: [["Расшифровка интервью", "/posle-intervyu/"], ["Поделиться", "/posle-intervyu/podelitsya/"], ["Цифровой архив", "/posle-intervyu/cifrovoy-arkhiv/"], ["Защита информантов", "/posle-intervyu/zashchita/"]] },
    { title: "Почитать ещё", href: "/pochitat-esche/" },
    { title: "P.S.", items: [["Рефлексии", "/refleksii/"], ["Доверие", "/refleksii/doverie/"], ["Нарратив", "/refleksii/narrativ/"], ["Достоверность", "/refleksii/dostovernost/"]] },
    { title: "Расскажите о своем опыте", href: "/rasskazhite-o-proekte/" },
    { title: "О проекте", href: "/o-proekte/" }
  ];

  let panel;
  let toggle;

  function closeMenu() {
    if (!panel || panel.hidden) return;
    panel.hidden = true;
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Открыть меню");
    }
  }

  function makeMenu() {
    if (panel) return;
    toggle = document.querySelector("header button");

    panel = document.createElement("div");
    panel.id = "site-menu-panel";
    panel.hidden = true;
    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "Основное меню");

    sections.forEach((section) => {
      const item = document.createElement("div");
      item.className = "site-menu-item";
      if (section.items) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "site-menu-parent";
        button.textContent = section.title;
        button.setAttribute("aria-expanded", "false");
        const children = document.createElement("div");
        children.className = "site-menu-children";
        children.hidden = true;
        section.items.forEach(([title, href]) => {
          const link = document.createElement("a");
          link.href = href;
          link.textContent = title;
          children.appendChild(link);
        });
        item.append(button, children);
      } else {
        const link = document.createElement("a");
        link.className = "site-menu-direct";
        link.href = section.href;
        link.textContent = section.title;
        item.appendChild(link);
      }
      nav.appendChild(item);
    });
    panel.appendChild(nav);
    document.body.appendChild(panel);

    document.addEventListener("click", (event) => {
      const button = event.target.closest("header button");
      if (!button) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      toggle = button;
      panel.hidden = !panel.hidden;
      toggle.setAttribute("aria-expanded", String(!panel.hidden));
      toggle.setAttribute("aria-label", panel.hidden ? "Открыть меню" : "Закрыть меню");
    }, true);

    panel.addEventListener("click", (event) => {
      const button = event.target.closest(".site-menu-parent");
      if (!button) return;
      const children = button.nextElementSibling;
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      children.hidden = expanded;
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", makeMenu, { once: true });
  else makeMenu();
})();
