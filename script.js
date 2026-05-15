const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const gsapAvailable = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

if (gsapAvailable) {
  window.gsap.registerPlugin(window.ScrollTrigger);
}

const company = window.ASGORITHM_DATA?.company;
const blogs = window.ASGORITHM_DATA?.blogs ?? [];
const caseStudies = window.ASGORITHM_DATA?.caseStudies ?? [];
const services = window.ASGORITHM_DATA?.services ?? {};
const engagementModel = window.ASGORITHM_DATA?.engagementModel ?? [];

function initHeader() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (!header) return;

  const syncScrolledState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  const closeMenu = () => {
    header.classList.remove("menu-open");
    document.body.classList.remove("menu-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
    }
  };

  const openMenu = () => {
    header.classList.add("menu-open");
    document.body.classList.add("menu-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "true");
    }
  };

  syncScrolledState();
  window.addEventListener("scroll", syncScrolledState, { passive: true });

  toggle?.addEventListener("click", () => {
    if (header.classList.contains("menu-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 920) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href*="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;
      if (!url.hash) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", url.hash);
    });
  });
}

function renderSlideshow(container, slides) {
  if (!container || !slides?.length) return;

  container.innerHTML = `
    <div class="service-slideshow-frame">
      ${slides
        .map(
          (slide, index) => `
            <figure class="service-slide${index === 0 ? " is-active" : ""}" data-slide="${index}">
              <img src="${slide.src}" alt="${slide.title}" loading="${index === 0 ? "eager" : "lazy"}" />
            </figure>
          `
        )
        .join("")}
    </div>
    <div class="service-slideshow-meta">
      <div class="service-slideshow-copy">
        <p class="service-slideshow-title">${slides[0].title}</p>
        <p class="service-slideshow-caption">${slides[0].caption}</p>
      </div>
      <div class="service-slideshow-controls">
        <button class="slideshow-arrow" type="button" aria-label="Previous slide">&larr;</button>
        <div class="slideshow-dots" aria-label="Slideshow navigation">
          ${slides
            .map(
              (_, index) => `
                <button
                  class="slideshow-dot${index === 0 ? " is-active" : ""}"
                  type="button"
                  data-dot="${index}"
                  aria-label="Go to slide ${index + 1}"
                ></button>
              `
            )
            .join("")}
        </div>
        <button class="slideshow-arrow" type="button" aria-label="Next slide">&rarr;</button>
      </div>
    </div>
  `;

  const slideElements = Array.from(container.querySelectorAll(".service-slide"));
  const dotElements = Array.from(container.querySelectorAll(".slideshow-dot"));
  const titleElement = container.querySelector(".service-slideshow-title");
  const captionElement = container.querySelector(".service-slideshow-caption");
  const [prevButton, nextButton] = container.querySelectorAll(".slideshow-arrow");
  let activeIndex = 0;
  let timerId = null;

  const setActive = (nextIndex) => {
    activeIndex = (nextIndex + slides.length) % slides.length;

    slideElements.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === activeIndex);
    });

    dotElements.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
    });

    if (titleElement) titleElement.textContent = slides[activeIndex].title;
    if (captionElement) captionElement.textContent = slides[activeIndex].caption;
  };

  const stopAuto = () => {
    if (!timerId) return;
    window.clearInterval(timerId);
    timerId = null;
  };

  const startAuto = () => {
    stopAuto();
    timerId = window.setInterval(() => setActive(activeIndex + 1), 4200);
  };

  dotElements.forEach((dot) => {
    dot.addEventListener("click", () => {
      setActive(Number(dot.dataset.dot));
      startAuto();
    });
  });

  prevButton?.addEventListener("click", () => {
    setActive(activeIndex - 1);
    startAuto();
  });

  nextButton?.addEventListener("click", () => {
    setActive(activeIndex + 1);
    startAuto();
  });

  container.addEventListener("mouseenter", stopAuto);
  container.addEventListener("mouseleave", startAuto);

  if (!prefersReducedMotion && slides.length > 1) {
    startAuto();
  }
}

function initHomeSlideshows() {
  document.querySelectorAll("[data-service-slideshow]").forEach((container) => {
    const serviceKey = container.getAttribute("data-service-slideshow");
    const service = services[serviceKey];
    if (!service) return;
    renderSlideshow(container, service.slides);
  });
}

function renderHomeJournal() {
  const container = document.querySelector("[data-journal-list]");
  if (!container || !blogs.length) return;

  container.innerHTML = blogs
    .map(
      (blog) => `
        <article class="journal-card">
          <a class="journal-link" href="${blog.slug}">
            <figure class="journal-thumb">
              <img src="${blog.cover}" alt="${blog.title}" loading="lazy" />
            </figure>
            <div class="journal-card-body">
              <span class="card-tag">${blog.label}</span>
              <h4>${blog.title}</h4>
              <p>${blog.subtitle}</p>
              <span class="journal-read">Read article</span>
            </div>
          </a>
        </article>
      `
    )
    .join("");
}

function renderHomeCaseStudies() {
  const container = document.querySelector("[data-case-studies-grid]");
  if (!container || !caseStudies.length) return;

  container.innerHTML = caseStudies
    .map(
      (caseStudy, index) => `
        <article class="research-card${index === 0 ? " research-card-feature" : ""} reveal">
          <a class="research-link" href="${caseStudy.slug}">
            <figure class="research-thumb">
              <img src="${caseStudy.cover}" alt="${caseStudy.title}" loading="lazy" />
            </figure>
            <div class="research-copy">
              <span class="card-tag">${caseStudy.category}</span>
              <h3>${caseStudy.title}</h3>
              <p>${caseStudy.subtitle}</p>
              <span class="research-read">Read case study</span>
            </div>
          </a>
        </article>
      `
    )
    .join("");
}

function renderServicePage() {
  if (!document.body.classList.contains("page-service")) return;

  const serviceKey = document.body.dataset.service;
  const service = services[serviceKey];
  const root = document.getElementById("service-page-root");
  if (!service || !root) return;

  const themeClass = service.theme === "darkened" ? "theme-darkened" : `theme-${service.theme}`;
  const heroImage = service.products[0]?.image ?? service.slides[0]?.src ?? "";

  document.title = `${service.title} | Asgorithm Technologies`;

  root.innerHTML = `
    <div class="service-page-root ${themeClass}">
      <section class="service-page-hero">
        <div class="service-page-hero-grid">
          <div class="service-page-copy">
            <div class="service-page-meta">
              <strong>0${Object.keys(services).indexOf(serviceKey) + 1}</strong>
              <span>Asgorithm Technologies</span>
            </div>
            <h1 class="service-page-title reveal-text">${service.title}</h1>
            <p class="service-page-subtitle reveal">${service.heroSubtext}</p>
            <div class="service-page-actions reveal">
              <a class="button button-primary" href="#cta">Start a Project</a>
              <a class="button button-secondary" href="index.html#services">Back to Services</a>
            </div>
            <div class="hero-highlights reveal">
              ${service.whatWeBuild.slice(0, 4).map((item) => `<span>${item}</span>`).join("")}
            </div>
          </div>

          <div class="service-page-hero-media reveal">
            <img src="${heroImage}" alt="${service.products[0]?.title ?? service.title}" />
            <div class="service-page-hero-badge">
              <span>What We Build</span>
              <strong>${service.products.length} premium product surfaces designed for custom builds, white-labeled delivery, and enterprise execution.</strong>
            </div>
          </div>
        </div>
      </section>

      <section class="service-overview">
        <div class="section-shell">
          <div class="section-heading">
            <p class="eyebrow reveal">Overview</p>
            <h2 class="section-title reveal-text">Built for real operating environments.</h2>
          </div>

          <div class="service-overview-grid">
            <div class="overview-copy reveal">
              <p>${service.overview}</p>
            </div>

            <div class="overview-panel reveal">
              <h3>How we position the work</h3>
              <p>Custom product development for startups, businesses, and enterprise teams with real operational requirements.</p>
              <p>White-labeled solutions where speed-to-launch and internal ownership matter.</p>
              <p>Integration into existing stacks, plus consulting, technical strategy, and on-demand execution support.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="what-we-build">
        <div class="section-shell">
          <div class="section-heading">
            <p class="eyebrow reveal">What We Build</p>
            <h2 class="section-title reveal-text">Clear product categories, engineered for scale.</h2>
          </div>

          <div class="build-grid">
            ${service.whatWeBuild
              .map(
                (item, index) => `
                  <article class="build-card reveal">
                    <span class="card-tag">Area ${String(index + 1).padStart(2, "0")}</span>
                    <p>${item}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
      </section>

      ${service.products
        .map(
          (product, index) => `
            <section class="product-story${index % 2 === 1 ? " reverse" : ""}">
              <div class="product-grid">
                <div class="product-copy reveal">
                  <span class="product-index">Product ${String(index + 1).padStart(2, "0")}</span>
                  <h3>${product.title}</h3>
                  <p>${product.description}</p>
                  <ul class="capability-list">
                    ${product.capabilities.map((capability) => `<li>${capability}</li>`).join("")}
                  </ul>
                  <span class="product-note">Available as a custom build, white-labeled solution, or integrated system.</span>
                </div>

                <div class="product-media reveal">
                  <div class="product-image-shell">
                    <img src="${product.image}" alt="${product.title}" loading="lazy" />
                  </div>
                </div>
              </div>
            </section>
          `
        )
        .join("")}

      <section class="engagement-model">
        <div class="section-shell">
          <div class="section-heading">
            <p class="eyebrow reveal">Engagement Model</p>
            <h2 class="section-title reveal-text">Different delivery models. One technical standard.</h2>
          </div>

          <div class="engagement-grid">
            ${engagementModel
              .map(
                (item) => `
                  <article class="engagement-card reveal">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="service-final-cta" id="cta">
        <div class="section-shell">
          <div class="cta-panel reveal">
            <div class="cta-copy">
              <p class="eyebrow">Start a Project</p>
              <h2>Have an idea worth building?</h2>
              <p>Let’s turn it into a working system.</p>
            </div>

            <div class="cta-actions">
              <a class="button button-primary" href="mailto:${company?.email ?? "hello@asgorithm.com"}">Start a Project</a>
              <a class="button button-secondary" href="index.html#contact">Contact Asgorithm</a>
            </div>

            <p class="contact-mini">
              <a href="mailto:${company?.email ?? "hello@asgorithm.com"}">${company?.email ?? "hello@asgorithm.com"}</a><br />
              ${company?.address ?? ""}
            </p>
          </div>
        </div>
      </section>
    </div>
  `;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeMarkdownAssetPath(src) {
  if (src.startsWith("/blogs/")) {
    return `public${src}`;
  }

  if (src.startsWith("/case-studies/hospitality/")) {
    return `public/case-studies/hospitality /${src.split("/").pop()}`;
  }

  if (src.startsWith("/case-studies/")) {
    return `public${src}`;
  }

  if (src.startsWith("/")) {
    return src.slice(1);
  }

  return src;
}

function formatInlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, href) => {
      const safeHref = href.startsWith("http") ? href : normalizeMarkdownAssetPath(href);
      return `<a href="${safeHref}">${escapeHtml(label)}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/ {2,}\n/g, "<br />")
    .replace(/\n/g, " ");
}

function parseMarkdownArticle(markdown) {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const title = (markdown.match(/^# (.+)$/m) || [null, "Untitled"])[1];
  const heroMatch = markdown.match(/!\[([^\]]*)\]\(([^)]+)\)/);
  const subtitle = (markdown.match(/^## (.+)$/m) || [null, ""])[1];
  let bodyStarted = false;
  const htmlParts = [];
  let paragraphBuffer = [];
  let listItems = [];

  const flushParagraph = () => {
    if (!paragraphBuffer.length) return;
    htmlParts.push(`<p>${formatInlineMarkdown(paragraphBuffer.join("\n"))}</p>`);
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (!listItems.length) return;
    htmlParts.push(`<ul>${listItems.map((item) => `<li>${formatInlineMarkdown(item)}</li>`).join("")}</ul>`);
    listItems = [];
  };

  for (const line of lines) {
    if (!bodyStarted) {
      if (line.startsWith("## ")) {
        bodyStarted = true;
      } else {
        continue;
      }
    }

    if (line.startsWith("## ") && line.slice(3).trim() === subtitle.trim()) {
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.trim() === "---") {
      flushParagraph();
      flushList();
      htmlParts.push("<hr />");
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      htmlParts.push(`<h3>${escapeHtml(line.slice(4).trim())}</h3>`);
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      htmlParts.push(`<h2>${escapeHtml(line.slice(3).trim())}</h2>`);
      continue;
    }

    if (line.trim().startsWith("- ")) {
      flushParagraph();
      listItems.push(line.trim().slice(2));
      continue;
    }

    if (line.trim().startsWith("![")) {
      flushParagraph();
      flushList();
      const imageMatch = line.trim().match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (!imageMatch) continue;
      htmlParts.push(
        `<figure><img src="${normalizeMarkdownAssetPath(imageMatch[2])}" alt="${escapeHtml(
          imageMatch[1]
        )}" loading="lazy" /><figcaption>${escapeHtml(imageMatch[1])}</figcaption></figure>`
      );
      continue;
    }

    paragraphBuffer.push(line);
  }

  flushParagraph();
  flushList();

  return {
    title,
    subtitle,
    heroImage: heroMatch ? normalizeMarkdownAssetPath(heroMatch[2]) : "",
    heroAlt: heroMatch?.[1] ?? title,
    bodyHtml: htmlParts.join("")
  };
}

async function renderBlogPage() {
  if (!document.body.classList.contains("page-blog")) return;

  const blogKey = document.body.dataset.blog;
  const blog = blogs.find((entry) => entry.key === blogKey);
  const root = document.getElementById("blog-page-root");
  if (!blog || !root) return;

  let article = {
    title: blog.title,
    subtitle: blog.subtitle,
    heroImage: blog.cover,
    heroAlt: blog.title,
    bodyHtml: `<p>${blog.excerpt}</p>`
  };

  try {
    const response = await fetch(blog.markdown);
    if (response.ok) {
      const markdown = await response.text();
      article = parseMarkdownArticle(markdown);
    }
  } catch (_error) {
    // Keep metadata fallback if markdown fetch fails.
  }

  document.title = `${blog.title} | Asgorithm Technologies`;

  root.innerHTML = `
    <div class="blog-page-root theme-${blog.theme}">
      <section class="blog-page-hero">
        <div class="blog-page-hero-grid">
          <div class="blog-page-copy">
            <div class="blog-page-meta">
              <strong>${blog.label}</strong>
              <span>${blog.category}</span>
            </div>
            <h1 class="blog-page-title reveal-text">${article.title}</h1>
            <p class="blog-page-subtitle reveal">${article.subtitle}</p>
            <div class="blog-page-actions reveal">
              <a class="button button-primary" href="index.html#contact">Start a Project</a>
              <a class="button button-secondary" href="index.html#research">Back to Journal</a>
            </div>
          </div>

          <div class="blog-page-media reveal">
            <img src="${article.heroImage || blog.cover}" alt="${article.heroAlt || blog.title}" />
            <div class="blog-page-media-badge">
              <span>${blog.category}</span>
              <strong>${blog.excerpt}</strong>
            </div>
          </div>
        </div>
      </section>

      <section class="blog-article">
        <div class="blog-article-shell">
          <article class="blog-article-card reveal">
            <div class="blog-richtext">${article.bodyHtml}</div>
          </article>
        </div>
      </section>

      <section class="blog-footer-cta" id="cta">
        <div class="cta-panel reveal">
          <div class="cta-copy">
            <p class="eyebrow">Start a Project</p>
            <h2>Have an idea worth building?</h2>
            <p>Let’s turn it into a working system.</p>
          </div>

          <div class="cta-actions">
            <a class="button button-primary" href="mailto:${company?.email ?? "hello@asgorithm.com"}">Start a Project</a>
            <a class="button button-secondary" href="index.html#contact">Contact Asgorithm</a>
          </div>

          <p class="contact-mini">
            <a href="mailto:${company?.email ?? "hello@asgorithm.com"}">${company?.email ?? "hello@asgorithm.com"}</a><br />
            ${company?.address ?? ""}
          </p>
        </div>
      </section>
    </div>
  `;
}

async function renderCaseStudyPage() {
  if (!document.body.classList.contains("page-case-study")) return;

  const caseStudyKey = document.body.dataset.caseStudy;
  const caseStudy = caseStudies.find((entry) => entry.key === caseStudyKey);
  const root = document.getElementById("case-study-page-root");
  if (!caseStudy || !root) return;

  let article = {
    title: caseStudy.title,
    subtitle: caseStudy.subtitle,
    heroImage: caseStudy.cover,
    heroAlt: caseStudy.title,
    bodyHtml: `<p>${caseStudy.excerpt}</p>`
  };

  try {
    const response = await fetch(caseStudy.markdown);
    if (response.ok) {
      const markdown = await response.text();
      article = parseMarkdownArticle(markdown);
    }
  } catch (_error) {
    // Keep metadata fallback if markdown fetch fails.
  }

  document.title = `${caseStudy.title} | Asgorithm Technologies`;

  root.innerHTML = `
    <div class="blog-page-root theme-${caseStudy.theme}">
      <section class="blog-page-hero">
        <div class="blog-page-hero-grid">
          <div class="blog-page-copy">
            <div class="blog-page-meta">
              <strong>${caseStudy.label}</strong>
              <span>${caseStudy.category}</span>
            </div>
            <h1 class="blog-page-title reveal-text">${article.title}</h1>
            <p class="blog-page-subtitle reveal">${article.subtitle}</p>
            <div class="blog-page-actions reveal">
              <a class="button button-primary" href="index.html#contact">Start a Project</a>
              <a class="button button-secondary" href="index.html#research">Back to Research</a>
            </div>
          </div>

          <div class="blog-page-media reveal">
            <img src="${article.heroImage || caseStudy.cover}" alt="${article.heroAlt || caseStudy.title}" />
            <div class="blog-page-media-badge">
              <span>${caseStudy.category}</span>
              <strong>${caseStudy.excerpt}</strong>
            </div>
          </div>
        </div>
      </section>

      <section class="blog-article">
        <div class="blog-article-shell">
          <article class="blog-article-card reveal">
            <div class="blog-richtext">${article.bodyHtml}</div>
          </article>
        </div>
      </section>

      <section class="blog-footer-cta" id="cta">
        <div class="cta-panel reveal">
          <div class="cta-copy">
            <p class="eyebrow">Start a Project</p>
            <h2>Have an idea worth building?</h2>
            <p>Let’s turn it into a working system.</p>
          </div>

          <div class="cta-actions">
            <a class="button button-primary" href="mailto:${company?.email ?? "hello@asgorithm.com"}">Start a Project</a>
            <a class="button button-secondary" href="index.html#contact">Contact Asgorithm</a>
          </div>

          <p class="contact-mini">
            <a href="mailto:${company?.email ?? "hello@asgorithm.com"}">${company?.email ?? "hello@asgorithm.com"}</a><br />
            ${company?.address ?? ""}
          </p>
        </div>
      </section>
    </div>
  `;
}

function initRevealAnimations() {
  if (!gsapAvailable) return;

  const elements = window.gsap.utils.toArray(
    ".reveal, .reveal-text, .service-showcase, .team-card, .research-card, .journal-panel, .contact-panel, .build-card, .product-copy, .product-media, .engagement-card, .cta-panel, .blog-article-card, .blog-page-media"
  );

  elements.forEach((element) => {
    const isText = element.classList.contains("reveal-text");
    window.gsap.from(element, {
      y: isText ? 48 : 36,
      opacity: 0,
      duration: isText ? 1 : 0.9,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: element,
        start: "top 88%",
        once: true
      }
    });
  });

  const heroTimeline = window.gsap.timeline({ defaults: { ease: "power3.out" } });

  heroTimeline
    .from(".site-header", { y: -22, opacity: 0, duration: 0.8 })
    .from(".hero-title, .service-page-title, .blog-page-title", { y: 48, opacity: 0, duration: 1 }, "-=0.35")
    .from(".hero-subtitle, .service-page-subtitle, .blog-page-subtitle", { y: 24, opacity: 0, duration: 0.8 }, "-=0.55")
    .from(".hero-actions, .service-page-actions, .blog-page-actions", { y: 20, opacity: 0, duration: 0.75 }, "-=0.45")
    .from(".hero-visual, .service-page-hero-media, .blog-page-media", { y: 30, opacity: 0, duration: 1 }, "-=0.7");

  if (!prefersReducedMotion) {
    window.gsap.to(".orb-a", {
      xPercent: 10,
      yPercent: -6,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    window.gsap.to(".orb-b", {
      xPercent: -10,
      yPercent: 8,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    window.gsap.to(".orb-c", {
      xPercent: 8,
      yPercent: -10,
      duration: 14,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    window.gsap.to(".hero-copy", {
      yPercent: -7,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    window.gsap.to(".hero-visual", {
      yPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    window.gsap.utils.toArray(".service-showcase, .product-image-shell, .team-portrait img").forEach((element) => {
      window.gsap.to(element, {
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  }
}

async function boot() {
  renderServicePage();
  renderHomeCaseStudies();
  renderHomeJournal();
  await renderBlogPage();
  await renderCaseStudyPage();
  initHeader();
  initSmoothScroll();
  initHomeSlideshows();
  initRevealAnimations();
}

boot();
