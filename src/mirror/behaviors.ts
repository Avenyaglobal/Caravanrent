const BODY_CLASS =
  "home wp-singular page-template page-template-elementor-page-template page page-id-17 wp-theme-dreamsrent theme-dreamsrent";

let started = false;

export function startMirrorBehaviors() {
  if (started) return () => {};
  started = true;

  const onHome = Boolean(document.querySelector("#how"));
  document.body.classList.add(
    ...(onHome ? BODY_CLASS : "wp-singular page wp-theme-dreamsrent theme-dreamsrent").split(" "),
  );

  document.querySelectorAll<HTMLElement>("[style*='1440px']").forEach((el) => {
    if (el.classList.contains("elementor-nav-menu__container")) return;
    el.style.width = "100%";
    el.style.maxWidth = "100%";
  });

  const head = document.querySelector<HTMLElement>(".elementor-sticky--active");
  const spacer = document.querySelector<HTMLElement>(".cr-head-spacer");
  if (head && spacer) spacer.style.height = `${head.offsetHeight}px`;

  const placeNav = () => {
    const header = document.querySelector<HTMLElement>(".elementor-sticky--active");
    if (!header) return;
    document.documentElement.style.setProperty("--nav-top", `${Math.round(header.getBoundingClientRect().bottom)}px`);
    if (spacer) spacer.style.height = `${header.offsetHeight}px`;
  };
  placeNav();
  window.addEventListener("resize", placeNav);

  const menuBtn = document.querySelector("#mobile_btn");
  const menuClose = document.querySelector("#menu_close");
  menuBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    document.documentElement.classList.toggle("menu-opened");
  });
  menuClose?.addEventListener("click", (event) => {
    event.preventDefault();
    document.documentElement.classList.remove("menu-opened");
  });

  const closeLang = () => {
    document.querySelectorAll("details.lang-switch").forEach((details) => {
      details.removeAttribute("open");
    });
  };

  const closeMenus = () => {
    document.documentElement.classList.remove("menu-opened");
    document.querySelectorAll<HTMLInputElement>(".nav-check").forEach((box) => {
      box.checked = false;
    });
    document.querySelectorAll(".elementor-nav-menu--dropdown").forEach((menu) => {
      menu.setAttribute("aria-hidden", "true");
    });
    closeLang();
  };

  const onPanelToggle = (event: Event) => {
    const details = event.target;
    if (!(details instanceof HTMLDetailsElement) || !details.classList.contains("lang-switch") || !details.open) return;
    document.querySelectorAll("details.lang-switch").forEach((other) => {
      if (other !== details) other.removeAttribute("open");
    });
    document.querySelectorAll<HTMLInputElement>(".nav-check").forEach((box) => {
      box.checked = false;
    });
  };
  const onMenuChange = (event: Event) => {
    const box = event.target;
    if (!(box instanceof HTMLInputElement) || !box.classList.contains("nav-check") || !box.checked) return;
    closeLang();
    document.querySelectorAll<HTMLInputElement>(".nav-check").forEach((other) => {
      if (other !== box) other.checked = false;
    });
  };
  document.addEventListener("toggle", onPanelToggle, true);
  document.addEventListener("change", onMenuChange);

  const onOutsideMenu = (event: Event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (!document.querySelector(".nav-check:checked")) return;
    if (target.closest(".elementor-nav-menu--dropdown, .elementor-menu-toggle, .nav-check")) return;
    document.documentElement.classList.remove("menu-opened");
    document.querySelectorAll<HTMLInputElement>(".nav-check").forEach((box) => {
      box.checked = false;
    });
    document.querySelectorAll(".elementor-nav-menu--dropdown").forEach((menu) => {
      menu.setAttribute("aria-hidden", "true");
    });
  };
  document.addEventListener("click", onOutsideMenu, true);

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!link) return;
      if (!link.matches(".elementor-item, .nav-link")) return;
      const href = link.getAttribute("href") || "";
      const hashAt = href.indexOf("#");
      if (hashAt < 0) return;
      const hash = href.slice(hashAt);
      const path = href.slice(0, hashAt) || "/";
      const here = window.location.pathname.replace(/\/$/, "") || "/";
      const there = path.replace(/\/$/, "") || "/";
      if (here !== there) return;
      const section = document.querySelector(hash);
      if (!section) return;
      event.preventDefault();
      event.stopPropagation();
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `${window.location.pathname}${hash}`);
      closeMenus();
    },
    true,
  );

  if (window.location.hash && window.scrollY < 8) {
    const section = document.querySelector(window.location.hash);
    section?.scrollIntoView({ block: "start" });
  }

  const onFaq = (event: Event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const link = target.closest<HTMLAnchorElement>(".faq-title a");
    if (!link) return;
    event.preventDefault();
    event.stopPropagation();
    const panel = document.querySelector(link.getAttribute("href") || "");
    if (!(panel instanceof HTMLElement)) return;
    const willOpen = !panel.classList.contains("show");
    document.querySelectorAll(".card-collapse").forEach((item) => {
      item.classList.remove("show");
      item.classList.add("collapsed");
    });
    document.querySelectorAll(".faq-title a").forEach((item) => {
      item.classList.add("collapsed");
      item.setAttribute("aria-expanded", "false");
    });
    if (willOpen) {
      panel.classList.add("show");
      panel.classList.remove("collapsed");
      link.classList.remove("collapsed");
      link.setAttribute("aria-expanded", "true");
    }
  };
  document.addEventListener("click", onFaq, true);

  const track = document.querySelector<HTMLElement>(".rpi-slides");

  const step = () => {
    const slide = track?.querySelector<HTMLElement>(".rpi-slide");
    if (!slide || !track) return 280;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 8;
    return slide.getBoundingClientRect().width + gap;
  };
  const showNext = () => {
    if (!track || track.scrollWidth <= track.clientWidth + 4) return;
    const pageY = window.scrollY;
    const max = track.scrollWidth - track.clientWidth;
    track.scrollLeft = track.scrollLeft >= max - 4 ? 0 : track.scrollLeft + step();
    if (Math.abs(window.scrollY - pageY) > 2) window.scrollTo(0, pageY);
  };
  document.querySelector(".grw-next")?.addEventListener("click", showNext);
  document.querySelector(".grw-prev")?.addEventListener("click", () => {
    if (!track) return;
    const pageY = window.scrollY;
    track.scrollLeft -= step();
    if (Math.abs(window.scrollY - pageY) > 2) window.scrollTo(0, pageY);
  });
  let reviewTimer = window.setInterval(showNext, 3000);
  const reviews = document.querySelector(".grw-row");
  const pauseReviews = () => window.clearInterval(reviewTimer);
  const resumeReviews = () => {
    window.clearInterval(reviewTimer);
    reviewTimer = window.setInterval(showNext, 3000);
  };
  reviews?.addEventListener("mouseenter", pauseReviews);
  reviews?.addEventListener("mouseleave", resumeReviews);

  document.querySelectorAll<HTMLElement>(".wp-google-feedback").forEach((box) => {
    if (box.scrollHeight <= box.clientHeight + 4) return;
    const more = document.createElement("button");
    more.type = "button";
    more.className = "eui-item-text-see-more";
    const lang = document.documentElement.lang;
    const readMore: Record<string, string> = {
      es: "leer más",
      fr: "lire la suite",
      de: "mehr lesen",
      ru: "читать далее",
      uk: "читати далі",
    };
    const readLess: Record<string, string> = {
      es: "ocultar",
      fr: "réduire",
      de: "weniger",
      ru: "свернуть",
      uk: "згорнути",
    };
    const moreLabel = readMore[lang] ?? "read more";
    const lessLabel = readLess[lang] ?? "read less";
    more.textContent = moreLabel;
    more.style.position = "absolute";
    more.style.left = "0";
    more.style.bottom = "0";
    more.style.background = "#fff";
    more.style.border = "0";
    more.style.padding = "0";
    more.addEventListener("click", () => {
      const open = box.dataset.open === "1";
      box.style.height = open ? "100px" : "auto";
      box.style.overflow = open ? "auto" : "visible";
      box.dataset.open = open ? "0" : "1";
      more.textContent = open ? moreLabel : lessLabel;
      more.style.position = open ? "absolute" : "static";
    });
    box.style.position = "relative";
    box.appendChild(more);
  });

  const bar = document.querySelector<HTMLElement>("#gdpr-bar");
  if (bar) {
    if (localStorage.getItem("gdpr-choice")) bar.classList.remove("is-on");
    else bar.classList.add("is-on");
  }
  const hideBar = (choice: string) => {
    localStorage.setItem("gdpr-choice", choice);
    document.querySelector<HTMLElement>("#gdpr-bar")?.classList.remove("is-on");
  };
  document.querySelector("#gdpr-accept-btn")?.addEventListener("click", () => hideBar("accept"));
  document.querySelector("#gdpr-cancel-btn")?.addEventListener("click", () => hideBar("cancel"));

  document.querySelectorAll(".e-gallery--lazyload").forEach((el) => el.classList.remove("e-gallery--lazyload"));
  document.querySelectorAll<HTMLElement>(".e-gallery-image").forEach((el) => {
    const thumb = el.getAttribute("data-thumbnail");
    const full = el.parentElement?.getAttribute("href");
    const url = thumb || full;
    if (!url) return;
    el.style.backgroundImage = `url("${url}")`;
    el.classList.add("e-gallery-image-loaded");
    if (!el.querySelector("img")) {
      const img = document.createElement("img");
      img.src = url;
      img.alt = el.getAttribute("aria-label") || "";
      el.appendChild(img);
    }
  });

  const lightbox = document.createElement("div");
  lightbox.className = "cr-lightbox";
  lightbox.hidden = true;
  lightbox.innerHTML = `<button type="button" class="cr-x" aria-label="Close">×</button><button type="button" class="cr-prev" aria-label="Previous">‹</button><img alt=""><button type="button" class="cr-next" aria-label="Next">›</button>`;
  document.body.appendChild(lightbox);
  const shot = lightbox.querySelector("img")!;
  let photos: string[] = [];
  let fallbacks: string[] = [];
  let photoIndex = 0;
  const showPhoto = (index: number) => {
    if (!photos.length) return;
    photoIndex = (index + photos.length) % photos.length;
    shot.src = photos[photoIndex];
    lightbox.hidden = false;
  };
  shot.addEventListener("error", () => {
    const fallback = fallbacks[photoIndex];
    if (fallback && shot.src !== fallback && !shot.src.endsWith(fallback)) shot.src = fallback;
  });
  const onGalleryClick = (event: Event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const item = target.closest("a.e-gallery-item");
    if (!item) return;
    event.preventDefault();
    event.stopPropagation();
    const gallery = item.closest(".elementor-gallery__container") ?? item.parentElement;
    const links = [...(gallery?.querySelectorAll("a.e-gallery-item") ?? [])];
    photos = links.map((link) => link.getAttribute("href") || "");
    fallbacks = links.map(
      (link) => link.querySelector(".e-gallery-image")?.getAttribute("data-thumbnail") || link.getAttribute("href") || "",
    );
    showPhoto(Math.max(0, links.indexOf(item)));
  };
  document.addEventListener("click", onGalleryClick, true);
  lightbox.querySelector(".cr-x")?.addEventListener("click", () => {
    lightbox.hidden = true;
  });
  lightbox.querySelector(".cr-prev")?.addEventListener("click", () => showPhoto(photoIndex - 1));
  lightbox.querySelector(".cr-next")?.addEventListener("click", () => showPhoto(photoIndex + 1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.hidden = true;
  });

  document.querySelector(".progress-wrap")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.querySelector(".callback-countdown-block")?.classList.remove("display-flex", "show-messageners-block");
  document.querySelector(".arcontactus-message-button")?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const link = document.createElement("a");
    link.href = "https://wa.me/34607223726";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  });
  document.querySelector("#arcu-callback-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const phone = document.querySelector<HTMLElement>(".callback-countdown-block-phone");
    const sorry = document.querySelector<HTMLElement>(".callback-countdown-block-sorry");
    if (phone) phone.style.display = "none";
    if (sorry) sorry.style.display = "block";
  });

  return () => {
    window.clearInterval(reviewTimer);
    window.removeEventListener("resize", placeNav);
    document.removeEventListener("toggle", onPanelToggle, true);
    document.removeEventListener("change", onMenuChange);
    document.removeEventListener("click", onOutsideMenu, true);
    document.removeEventListener("click", onGalleryClick, true);
    document.removeEventListener("click", onFaq, true);
    lightbox.remove();
    started = false;
  };
}
