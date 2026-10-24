/**
 * ============================================================================
 * SUBHADIP BETAL — PORTFOLIO INTERACTIVITY & ANIMATION ENGINE (js/main.js)
 * ============================================================================
 */
(function () {
  "use strict";

  const CFG = window.PORTFOLIO_CONFIG || {};
  const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --------------------------------------------------------------------------
   * 1. SAFE STORAGE & TOAST HELPER
   * -------------------------------------------------------------------------- */
  function safeGetStorage(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function safeSetStorage(key, val) {
    try {
      window.localStorage.setItem(key, val);
    } catch (e) {
      // Ignore storage error in sandboxed iframes
    }
  }

  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById("toast-notification");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 3200);
  }

  function copyTextToClipboard(text, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast("Copied " + label + " to clipboard!");
      }).catch(function () {
        fallbackCopy(text, label);
      });
    } else {
      fallbackCopy(text, label);
    }
  }

  function fallbackCopy(text, label) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast("Copied " + label + " to clipboard!");
    } catch (err) {
      showToast("Copy ready: " + text);
    }
    document.body.removeChild(ta);
  }

  /* --------------------------------------------------------------------------
   * 2. THEME TOGGLE (Light / Dark with System Default & LocalStorage)
   * -------------------------------------------------------------------------- */
  function initTheme() {
    const root = document.documentElement;
    const toggleBtn = document.getElementById("theme-toggle-btn");
    if (!toggleBtn) return;

    function updateAria(theme) {
      toggleBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
      toggleBtn.setAttribute("title", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }

    updateAria(root.getAttribute("data-theme") || "dark");

    toggleBtn.addEventListener("click", function () {
      const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      safeSetStorage("sb_portfolio_theme", next);
      updateAria(next);
      showToast(next === "dark" ? "Dark futuristic theme activated" : "Light daylight theme activated");
    });
  }

  /* --------------------------------------------------------------------------
   * 3. NAVBAR SCROLL SPY, PROGRESS BAR & MOBILE MENU
   * -------------------------------------------------------------------------- */
  function initNavigation() {
    const progressBar = document.getElementById("scroll-progress-bar");
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const mobileDrawer = document.getElementById("mobile-nav-drawer");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section[id]");

    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener("click", function () {
        const isOpen = mobileDrawer.classList.toggle("open");
        mobileBtn.setAttribute("aria-expanded", String(isOpen));
      });

      mobileDrawer.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          mobileDrawer.classList.remove("open");
          mobileBtn.setAttribute("aria-expanded", "false");
        });
      });
    }

    function onScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (progressBar && docHeight > 0) {
        const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        progressBar.style.width = pct.toFixed(1) + "%";
      }

      let currentSectionId = "hero";
      sections.forEach(function (sec) {
        const top = sec.offsetTop - 140;
        if (scrollTop >= top) {
          currentSectionId = sec.getAttribute("id");
        }
      });

      navLinks.forEach(function (link) {
        const href = link.getAttribute("href");
        if (href === "#" + currentSectionId) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* --------------------------------------------------------------------------
   * 4. HERO PARTICLE / NEURAL NETWORK CANVAS
   * -------------------------------------------------------------------------- */
  let heroAnimId = null;
  function initHeroCanvas() {
    const canvas = document.getElementById("hero-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let particles = [];
    const mouse = { x: -9999, y: -9999, radius: 150 };

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = canvas.width = rect.width || window.innerWidth;
      height = canvas.height = rect.height || window.innerHeight;
      const count = prefersReducedMotion ? 18 : Math.min(68, Math.max(28, Math.floor((width * height) / 18000)));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0.1 : 0.55),
          vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0.1 : 0.55),
          size: Math.random() * 2 + 1.2
        });
      }
    }

    window.addEventListener("resize", resize);
    resize();

    const heroSection = document.getElementById("hero");
    if (heroSection) {
      heroSection.addEventListener("mousemove", function (e) {
        const r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
      });
      heroSection.addEventListener("mouseleave", function () {
        mouse.x = -9999;
        mouse.y = -9999;
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const nodeColor = isLight ? "rgba(2, 132, 199, 0.55)" : "rgba(34, 211, 238, 0.65)";
      const lineBase = isLight ? [79, 70, 229] : [34, 211, 238];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius && distMouse > 0) {
          const force = (mouse.radius - distMouse) / mouse.radius;
          p.x += (dxMouse / distMouse) * force * 1.1;
          p.y += (dyMouse / distMouse) * force * 1.1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * (isLight ? 0.22 : 0.28);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "rgba(" + lineBase[0] + "," + lineBase[1] + "," + lineBase[2] + "," + alpha.toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        heroAnimId = requestAnimationFrame(draw);
      }
    }

    if (heroAnimId) cancelAnimationFrame(heroAnimId);
    draw();
  }

  /* --------------------------------------------------------------------------
   * 5. TYPING / ROTATING ROLE EFFECT
   * -------------------------------------------------------------------------- */
  function initTypingEffect() {
    const el = document.getElementById("rotating-role-text");
    if (!el) return;
    const roles = (CFG.personal && CFG.personal.rotatingRoles) || [
      "Web Developer",
      "Laravel Engineer",
      "API Builder"
    ];

    if (prefersReducedMotion) {
      el.textContent = roles.join(" • ");
      return;
    }

    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;

    function tick() {
      const currentWord = roles[roleIdx];
      if (!deleting) {
        charIdx++;
        el.textContent = currentWord.slice(0, charIdx);
        if (charIdx >= currentWord.length) {
          deleting = true;
          setTimeout(tick, 1800);
          return;
        }
        setTimeout(tick, 75);
      } else {
        charIdx--;
        el.textContent = currentWord.slice(0, charIdx);
        if (charIdx <= 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          setTimeout(tick, 320);
          return;
        }
        setTimeout(tick, 40);
      }
    }

    tick();
  }

  /* --------------------------------------------------------------------------
   * 6. HERO PORTRAIT SWITCHER (Studio vs Candid)
   * -------------------------------------------------------------------------- */
  function initPortraitSwitcher() {
    const heroImg = document.getElementById("hero-portrait-img");
    const captionEl = document.getElementById("hero-photo-caption");
    const switchBtns = document.querySelectorAll(".photo-switch-btn");
    if (!heroImg || !switchBtns.length) return;

    switchBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const targetSrc = btn.getAttribute("data-photo-src");
        const targetCap = btn.getAttribute("data-photo-caption");
        switchBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        if (targetSrc) {
          heroImg.style.opacity = "0.25";
          setTimeout(function () {
            heroImg.src = targetSrc;
            heroImg.style.opacity = "1";
          }, 150);
        }
        if (captionEl && targetCap) {
          captionEl.textContent = targetCap;
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
   * 7. CUSTOM CURSOR & MAGNETIC HOVER BUTTONS
   * -------------------------------------------------------------------------- */
  function initCursorAndMagnetic() {
    if (prefersReducedMotion) return;
    const dot = document.getElementById("cursor-dot");
    const glow = document.getElementById("cursor-glow");
    if (!dot || !glow) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    }, { passive: true });

    function animateCursor() {
      glowX += (mouseX - glowX) * 0.18;
      glowY += (mouseY - glowY) * 0.18;
      glow.style.left = glowX + "px";
      glow.style.top = glowY + "px";
      requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    const interactiveEls = document.querySelectorAll("a, button, input, textarea, select, .project-card");
    interactiveEls.forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        document.body.classList.add("cursor-hover");
      });
      el.addEventListener("mouseleave", function () {
        document.body.classList.remove("cursor-hover");
      });
    });

    const magneticBtns = document.querySelectorAll("[data-magnetic]");
    magneticBtns.forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + (x * 0.18).toFixed(1) + "px, " + (y * 0.18).toFixed(1) + "px)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "translate(0px, 0px)";
      });
    });
  }

  /* --------------------------------------------------------------------------
   * 8. 3D TILT & RADIAL SPOTLIGHT CARDS
   * -------------------------------------------------------------------------- */
  function initTiltAndSpotlight() {
    const cards = document.querySelectorAll(".tilt-card");
    cards.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        card.style.setProperty("--mouse-x", x + "px");
        card.style.setProperty("--mouse-y", y + "px");

        if (!prefersReducedMotion && card.classList.contains("project-card")) {
          const rotY = ((x / r.width) - 0.5) * 7;
          const rotX = (0.5 - (y / r.height)) * 7;
          card.style.transform = "perspective(900px) rotateX(" + rotX.toFixed(2) + "deg) rotateY(" + rotY.toFixed(2) + "deg) translateY(-4px)";
        }
      });

      card.addEventListener("mouseleave", function () {
        if (card.classList.contains("project-card")) {
          card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
   * 9. INTERACTIVE ORBITING SKILL RADAR CANVAS
   * -------------------------------------------------------------------------- */
  let orbitAnimId = null;
  function initSkillOrbitCanvas() {
    const canvas = document.getElementById("skill-orbit-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const size = 320;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;

    const rings = [
      { radius: 58, speed: 0.008, items: ["Laravel", "PHP", "MySQL"] },
      { radius: 98, speed: -0.006, items: ["JavaScript", "jQuery", "Ajax", "Bootstrap", "HTML/CSS"] },
      { radius: 136, speed: 0.004, items: ["Git", "GitHub", "Jira", "Bitbucket", "Composer"] }
    ];

    let angleOffset = 0;

    function renderOrbit() {
      ctx.clearRect(0, 0, size, size);
      const isLight = document.documentElement.getAttribute("data-theme") === "light";

      // Center core
      ctx.beginPath();
      ctx.arc(cx, cy, 24, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? "#0284c7" : "#06b6d4";
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "700 12px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("SB", cx, cy);

      rings.forEach(function (ring) {
        ctx.beginPath();
        ctx.arc(cx, cy, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = isLight ? "rgba(15, 23, 42, 0.12)" : "rgba(148, 163, 184, 0.16)";
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        const step = (Math.PI * 2) / ring.items.length;
        ring.items.forEach(function (label, idx) {
          const theta = idx * step + angleOffset * (ring.speed * 120);
          const nx = cx + Math.cos(theta) * ring.radius;
          const ny = cy + Math.sin(theta) * ring.radius;

          ctx.beginPath();
          ctx.arc(nx, ny, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = isLight ? "#4f46e5" : "#22d3ee";
          ctx.fill();

          ctx.font = "600 10px 'JetBrains Mono', monospace";
          ctx.fillStyle = isLight ? "#0f172a" : "#e2e8f0";
          ctx.fillText(label, nx, ny - 11);
        });
      });

      if (!prefersReducedMotion) {
        angleOffset += 0.012;
        orbitAnimId = requestAnimationFrame(renderOrbit);
      }
    }

    if (orbitAnimId) cancelAnimationFrame(orbitAnimId);
    renderOrbit();
  }

  /* --------------------------------------------------------------------------
   * 10. ANIMATED COUNTERS, SKILL BARS, EDUCATION RINGS & GSAP SCROLL REVEALS
   * -------------------------------------------------------------------------- */
  function initScrollAnimations() {
    // 1. Number counters
    const counters = document.querySelectorAll("[data-counter-target]");
    const counterObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.getAttribute("data-counter-target") || "0");
        const suffix = el.getAttribute("data-counter-suffix") || "";
        const decimals = parseInt(el.getAttribute("data-counter-decimals") || "0", 10);

        if (prefersReducedMotion) {
          el.textContent = target.toFixed(decimals) + suffix;
          obs.unobserve(el);
          return;
        }

        const duration = 1400;
        const startTime = performance.now();
        function step(now) {
          const progress = Math.min(1, (now - startTime) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = target * eased;
          el.textContent = current.toFixed(decimals) + suffix;
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = target.toFixed(decimals) + suffix;
          }
        }
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    }, { threshold: 0.25 });

    counters.forEach(function (c) { counterObserver.observe(c); });

    // 2. Skill Progress Bars
    const skillFills = document.querySelectorAll(".skill-progress-fill[data-skill-level]");
    const skillObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const bar = entry.target;
        const pct = bar.getAttribute("data-skill-level") || "85";
        bar.style.width = pct + "%";
        obs.unobserve(bar);
      });
    }, { threshold: 0.2 });

    skillFills.forEach(function (b) { skillObserver.observe(b); });

    // 3. Education SVG Percentage Rings
    const eduRings = document.querySelectorAll(".ring-meter[data-score]");
    const ringObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const circle = entry.target;
        const score = parseFloat(circle.getAttribute("data-score") || "75");
        const circumference = 226;
        const offset = circumference - (circumference * Math.min(100, score)) / 100;
        circle.style.strokeDashoffset = offset.toFixed(1);
        obs.unobserve(circle);
      });
    }, { threshold: 0.25 });

    eduRings.forEach(function (r) { ringObserver.observe(r); });

    // 4. GSAP ScrollTrigger Reveals (if loaded and motion allowed)
    if (window.gsap && window.ScrollTrigger && !prefersReducedMotion) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      const revealSections = document.querySelectorAll(".gsap-reveal");
      revealSections.forEach(function (sec) {
        window.gsap.fromTo(
          sec,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 86%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }
  }

  /* --------------------------------------------------------------------------
   * 11. PROJECT FILTERING & ARCHITECTURE CASE-STUDY MODAL
   * -------------------------------------------------------------------------- */
  function initProjects() {
    const filterBtns = document.querySelectorAll(".filter-btn[data-filter]");
    const projectCards = document.querySelectorAll(".project-card[data-categories]");

    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const cat = btn.getAttribute("data-filter") || "all";
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");

        projectCards.forEach(function (card) {
          const cats = (card.getAttribute("data-categories") || "").split(",");
          if (cat === "all" || cats.indexOf(cat) !== -1) {
            card.classList.remove("hidden-card");
          } else {
            card.classList.add("hidden-card");
          }
        });
      });
    });

    // Project Architecture Modal
    const archBtns = document.querySelectorAll("[data-project-modal]");
    const archModal = document.getElementById("project-arch-modal");
    const archTitle = document.getElementById("arch-modal-title");
    const archBody = document.getElementById("arch-modal-body");
    const archClose = document.getElementById("arch-modal-close");

    if (archModal && archBtns.length) {
      archBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          const projId = btn.getAttribute("data-project-modal");
          const proj = ((CFG.projects || []).find(function (p) { return p.id === projId; }));
          if (!proj) return;
          if (archTitle) archTitle.textContent = proj.title + " — " + proj.subtitle;
          if (archBody) {
            const highlightsHtml = (proj.highlights || []).map(function (h) {
              return "<li style='margin-bottom:0.5rem;'>• " + h + "</li>";
            }).join("");
            const stackHtml = (proj.stack || []).map(function (s) {
              return "<span class='chip'>" + s + "</span>";
            }).join(" ");
            const actionLink = proj.liveUrl
              ? "<a href='" + proj.liveUrl + "' target='_blank' rel='noopener noreferrer' class='btn btn-primary btn-sm'>Open Live Application ↗</a>"
              : "<a href='" + proj.repoUrl + "' target='_blank' rel='noopener noreferrer' class='btn btn-primary btn-sm'>Explore GitHub Repository ↗</a>";

            archBody.innerHTML =
              "<p style='color:var(--text-secondary);margin-bottom:1rem;'><strong>Timeline:</strong> " + proj.period + " &nbsp;|&nbsp; <strong>Status:</strong> " + proj.status + "</p>" +
              "<p style='margin-bottom:1.1rem;'>" + proj.description + "</p>" +
              "<h4 style='margin-bottom:0.6rem;font-family:var(--font-display);'>Key Architecture & Feature Breakdown</h4>" +
              "<ul style='list-style:none;color:var(--text-secondary);margin-bottom:1.25rem;'>" + highlightsHtml + "</ul>" +
              "<div class='chip-list' style='margin-bottom:1.35rem;'>" + stackHtml + "</div>" +
              "<div>" + actionLink + "</div>";
          }
          archModal.classList.add("open");
          archModal.setAttribute("aria-hidden", "false");
        });
      });

      if (archClose) {
        archClose.addEventListener("click", function () {
          archModal.classList.remove("open");
          archModal.setAttribute("aria-hidden", "true");
        });
      }

      archModal.addEventListener("click", function (e) {
        if (e.target === archModal) {
          archModal.classList.remove("open");
          archModal.setAttribute("aria-hidden", "true");
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
   * 12. CONTACT FORM VALIDATION & SUBMISSION (Formspree + Direct Mailto Fallback)
   * -------------------------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById("portfolio-contact-form");
    if (!form) return;

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const subjectInput = document.getElementById("contact-subject");
    const messageInput = document.getElementById("contact-message");
    const submitBtn = document.getElementById("contact-submit-btn");
    const statusBox = document.getElementById("contact-status-box");

    function setError(inputEl, errId, show) {
      const errEl = document.getElementById(errId);
      if (inputEl) inputEl.classList.toggle("invalid", show);
      if (errEl) errEl.classList.toggle("visible", show);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const nameVal = (nameInput.value || "").trim();
      const emailVal = (emailInput.value || "").trim();
      const subjectVal = (subjectInput.value || "").trim();
      const msgVal = (messageInput.value || "").trim();

      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
      let valid = true;

      if (nameVal.length < 2) { setError(nameInput, "err-name", true); valid = false; } else { setError(nameInput, "err-name", false); }
      if (!emailValid) { setError(emailInput, "err-email", true); valid = false; } else { setError(emailInput, "err-email", false); }
      if (subjectVal.length < 3) { setError(subjectInput, "err-subject", true); valid = false; } else { setError(subjectInput, "err-subject", false); }
      if (msgVal.length < 10) { setError(messageInput, "err-message", true); valid = false; } else { setError(messageInput, "err-message", false); }

      if (!valid) {
        showToast("Please complete the highlighted fields.");
        return;
      }

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = "<span>Sending Message...</span>";

      const endpoint = (CFG.contact && CFG.contact.formspreeUrl) || "";
      const isConfigured = endpoint.indexOf("formspree.io/f/") !== -1 && endpoint.indexOf("your_formspree_id") === -1;

      const mailtoHref =
        "mailto:subhadipbetal316@gmail.com?subject=" +
        encodeURIComponent("[Portfolio Inquiry] " + subjectVal + " — from " + nameVal) +
        "&body=" +
        encodeURIComponent("Name: " + nameVal + "\nEmail: " + emailVal + "\n\nMessage:\n" + msgVal);

      function showSuccess(viaApi) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        statusBox.classList.add("visible");
        statusBox.innerHTML =
          "<div style='font-weight:700;margin-bottom:0.35rem;color:var(--accent-emerald);'>✓ Message Ready & Validated!</div>" +
          "<p style='font-size:0.88rem;color:var(--text-secondary);margin-bottom:0.75rem;'>" +
          (viaApi
            ? "Thank you, <strong>" + nameVal + "</strong>! Your message has been delivered to Subhadip Betal via Formspree."
            : "Thank you, <strong>" + nameVal + "</strong>! Your message is formatted and ready. Click below to dispatch directly in your mail client or connect your Formspree ID in <code>js/config.js</code>.") +
          "</p>" +
          "<a href='" + mailtoHref + "' class='btn btn-primary btn-sm'>Send Direct Email to subhadipbetal316@gmail.com ↗</a>";
        form.reset();
        showToast("Message validated & ready!");
      }

      if (isConfigured) {
        fetch(endpoint, {
          method: "POST",
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ name: nameVal, email: emailVal, subject: subjectVal, message: msgVal })
        }).then(function (res) {
          showSuccess(res.ok);
        }).catch(function () {
          showSuccess(false);
        });
      } else {
        setTimeout(function () {
          showSuccess(false);
        }, 420);
      }
    });
  }

  /* --------------------------------------------------------------------------
   * 13. COPY BUTTONS, DEPLOY KIT MODAL, RESUME MODAL & LIVE KOLKATA CLOCK
   * -------------------------------------------------------------------------- */
  function initUtilitiesAndModals() {
    document.querySelectorAll("[data-copy-value]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const val = btn.getAttribute("data-copy-value");
        const label = btn.getAttribute("data-copy-label") || "text";
        if (val) copyTextToClipboard(val, label);
      });
    });

    // Generic modal openers / closers
    document.querySelectorAll("[data-open-modal]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const targetId = btn.getAttribute("data-open-modal");
        const modal = document.getElementById(targetId);
        if (modal) {
          modal.classList.add("open");
          modal.setAttribute("aria-hidden", "false");
        }
      });
    });

    document.querySelectorAll("[data-close-modal]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const targetId = btn.getAttribute("data-close-modal");
        const modal = document.getElementById(targetId);
        if (modal) {
          modal.classList.remove("open");
          modal.setAttribute("aria-hidden", "true");
        }
      });
    });

    document.querySelectorAll(".modal-backdrop").forEach(function (backdrop) {
      backdrop.addEventListener("click", function (e) {
        if (e.target === backdrop) {
          backdrop.classList.remove("open");
          backdrop.setAttribute("aria-hidden", "true");
        }
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-backdrop.open").forEach(function (m) {
          m.classList.remove("open");
          m.setAttribute("aria-hidden", "true");
        });
      }
    });

    // Live Kolkata Time in Footer
    const clockEl = document.getElementById("kolkata-live-clock");
    function updateClock() {
      if (!clockEl) return;
      try {
        const now = new Date();
        const formatted = now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        });
        clockEl.textContent = formatted + " IST (UTC+5:30)";
      } catch (err) {
        clockEl.textContent = "Kolkata, India (IST UTC+5:30)";
      }
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  /* --------------------------------------------------------------------------
   * INITIALIZE ALL MODULES ON DOM READY
   * -------------------------------------------------------------------------- */
  function initAll() {
    initTheme();
    initNavigation();
    initHeroCanvas();
    initTypingEffect();
    initPortraitSwitcher();
    initCursorAndMagnetic();
    initTiltAndSpotlight();
    initSkillOrbitCanvas();
    initScrollAnimations();
    initProjects();
    initContactForm();
    initUtilitiesAndModals();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
