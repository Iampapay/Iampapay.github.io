/**
 * ============================================================================
 * SUBHADIP BETAL — MODULAR 3D WEBGL & SPATIAL INTERACTION ENGINE (portfolio-3d.js)
 * ============================================================================
 * HOW TO INCLUDE OR EXCLUDE:
 *   Include before </body> (alongside Three.js r128):
 *     script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer
 *     script src="js/portfolio-3d.js" defer
 *
 *   To disable 3D WebGL & spatial effects and fall back to the 2D portfolio,
 *   simply remove or comment out script src="js/portfolio-3d.js" defer
 *   and link rel="stylesheet" href="css/portfolio-3d.css".
 * ============================================================================
 */
(function () {
  "use strict";

  // Signal to main.js that the 3D engine is active
  window.SB_3D_ENABLED = true;

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function show3DToast(message) {
    const toast = document.getElementById("toast-notification");
    if (!toast) return;
    toast.innerHTML =
      '<span style="color:var(--accent-bright);font-weight:700;">✦</span> <span>' +
      message +
      "</span>";
    toast.classList.add("show");
    clearTimeout(show3DToast._timer);
    show3DToast._timer = setTimeout(function () {
      toast.classList.remove("show");
    }, 3200);
  }

  /* --------------------------------------------------------------------------
   * 1. ENSURE OPTIONAL 3D DOM ELEMENTS EXIST (Progressive Enhancement)
   * -------------------------------------------------------------------------- */
  function ensure3DDomElements() {
    // A. Navbar 3D Scene Mode Switcher Button
    const navActions = document.querySelector(".nav-actions");
    if (navActions && !document.getElementById("scene-3d-mode-btn")) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-secondary btn-sm scene-mode-btn";
      btn.id = "scene-3d-mode-btn";
      btn.setAttribute("data-magnetic", "");
      btn.title = "Cycle 3D WebGL Architecture Scene";
      btn.innerHTML =
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>' +
        '<polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>' +
        '<line x1="12" y1="22.08" x2="12" y2="12"></line>' +
        "</svg>" +
        '<span id="scene-3d-mode-label">3D: Quantum Core</span>';
      const deployBtn = navActions.querySelector('[data-open-modal="deploy-kit-modal"]');
      if (deployBtn) {
        navActions.insertBefore(btn, deployBtn);
      } else {
        navActions.appendChild(btn);
      }
    }

    // B. Hero Floating 3D Holographic Telemetry Badges
    const heroCard = document.querySelector(".hero-visual-card");
    if (heroCard && !heroCard.querySelector(".hero-3d-float-badge")) {
      const badges = [
        { cls: "badge-tl", dot: "", text: "Laravel::MVC • REST API" },
        { cls: "badge-rm", dot: "background:#818cf8;box-shadow:0 0 10px #818cf8;", text: "MySQL • Normalized Schema" },
        { cls: "badge-bl", dot: "background:#10b981;box-shadow:0 0 10px #10b981;", text: "WebGL 3D • Interactive" }
      ];
      badges.forEach(function (b) {
        const div = document.createElement("div");
        div.className = "hero-3d-float-badge " + b.cls;
        div.setAttribute("aria-hidden", "true");
        div.innerHTML =
          '<span class="float-dot"' + (b.dot ? ' style="' + b.dot + '"' : "") + "></span>" +
          "<span>" + b.text + "</span>";
        heroCard.insertBefore(div, heroCard.firstChild);
      });
    }

    // C. 3D Skill Sphere Hint Pill
    const orbitWrap = document.querySelector(".orbit-canvas-wrap");
    if (orbitWrap && orbitWrap.parentElement && !orbitWrap.parentElement.querySelector(".orbit-3d-hint")) {
      const hint = document.createElement("div");
      hint.className = "orbit-3d-hint";
      hint.setAttribute("aria-hidden", "true");
      hint.innerHTML = "<span>⟳ Drag or hover to spin 3D Skill Sphere</span>";
      orbitWrap.insertAdjacentElement("afterend", hint);
    }
  }

  /* --------------------------------------------------------------------------
   * 2. THREE.JS WEBGL 3D HERO SHOWSTOPPER SCENE
   * -------------------------------------------------------------------------- */
  let hero3DAnimId = null;

  function initHero3DScene() {
    if (typeof window.SB_CANCEL_2D_HERO === "function") {
      window.SB_CANCEL_2D_HERO();
    }
    if (hero3DAnimId) {
      cancelAnimationFrame(hero3DAnimId);
      hero3DAnimId = null;
    }

    let canvas = document.getElementById("hero-canvas");
    if (!canvas || typeof window.THREE === "undefined") return;

    // Replace canvas element if a 2D context was previously bound to it
    const freshCanvas = canvas.cloneNode(false);
    if (canvas.parentNode) {
      canvas.parentNode.replaceChild(freshCanvas, canvas);
      canvas = freshCanvas;
    }

    const heroSection = document.getElementById("hero");
    const modeBtn = document.getElementById("scene-3d-mode-btn");
    const modeLabel = document.getElementById("scene-3d-mode-label");
    const modeNames = ["Quantum Core", "Torus Matrix", "Geodesic Lattice"];
    let currentMode = 0;

    try {
      const THREE = window.THREE;
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
      });

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
      camera.position.set(0, 0, 9.2);

      const rootGroup = new THREE.Group();
      scene.add(rootGroup);

      const coreGroup = new THREE.Group();
      rootGroup.add(coreGroup);

      // Studio 3-Point Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
      scene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0x22d3ee, 2.4, 28);
      pointLight1.position.set(5, 4, 6);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0x6366f1, 2.1, 28);
      pointLight2.position.set(-5, -4, 5);
      scene.add(pointLight2);

      const rimLight = new THREE.DirectionalLight(0xa855f7, 1.15);
      rimLight.position.set(0, 6, -5);
      scene.add(rimLight);

      // Theme-Adaptive Materials
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        wireframe: true,
        transparent: true,
        opacity: 0.34
      });

      const innerCoreMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        emissive: 0x0e7490,
        emissiveIntensity: 0.42,
        metalness: 0.82,
        roughness: 0.22,
        flatShading: true,
        transparent: true,
        opacity: 0.88
      });

      const ringMat1 = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.42
      });

      const ringMat2 = new THREE.MeshBasicMaterial({
        color: 0x818cf8,
        transparent: true,
        opacity: 0.32
      });

      let outerMesh = null;
      let innerMesh = null;

      function buildSculptureMode(modeIdx) {
        if (outerMesh) {
          coreGroup.remove(outerMesh);
          outerMesh.geometry.dispose();
        }
        if (innerMesh) {
          coreGroup.remove(innerMesh);
          innerMesh.geometry.dispose();
        }

        let outerGeo, innerGeo;
        if (modeIdx === 0) {
          outerGeo = new THREE.IcosahedronGeometry(2.25, 1);
          innerGeo = new THREE.IcosahedronGeometry(1.28, 0);
        } else if (modeIdx === 1) {
          outerGeo = new THREE.TorusKnotGeometry(1.48, 0.38, 110, 18, 2, 3);
          innerGeo = new THREE.OctahedronGeometry(1.05, 1);
        } else {
          outerGeo = new THREE.IcosahedronGeometry(2.38, 2);
          innerGeo = new THREE.DodecahedronGeometry(1.36, 0);
        }

        outerMesh = new THREE.Mesh(outerGeo, wireMat);
        innerMesh = new THREE.Mesh(innerGeo, innerCoreMat);
        coreGroup.add(outerMesh);
        coreGroup.add(innerMesh);
        coreGroup.scale.set(0.76, 0.76, 0.76);
      }

      buildSculptureMode(0);

      // Gyroscopic 3D Orbital Rings
      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.05, 0.016, 16, 120), ringMat1);
      ring1.rotation.set(Math.PI / 2.6, 0.3, 0);
      coreGroup.add(ring1);

      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.58, 0.012, 16, 120), ringMat2);
      ring2.rotation.set(-Math.PI / 3.1, -0.5, 0.2);
      coreGroup.add(ring2);

      const ring3 = new THREE.Mesh(new THREE.TorusGeometry(4.12, 0.009, 12, 100), ringMat1);
      ring3.rotation.set(0.45, Math.PI / 4, -0.35);
      coreGroup.add(ring3);

      // Floating 3D Geometric Satellites
      const satellites = [];
      const satGeos = [
        new THREE.OctahedronGeometry(0.28, 0),
        new THREE.TetrahedronGeometry(0.3, 0),
        new THREE.IcosahedronGeometry(0.24, 0)
      ];
      const satPositions = [
        [-4.8, 2.2, -1.5],
        [-3.6, -2.3, -0.8],
        [4.2, 2.5, -1.2],
        [4.5, -2.1, -0.6],
        [-1.2, 3.1, -2.2],
        [1.6, -3.0, -1.8]
      ];

      for (let i = 0; i < satPositions.length; i++) {
        const satGroup = new THREE.Group();
        const geo = satGeos[i % satGeos.length];
        const solid = new THREE.Mesh(geo, innerCoreMat);
        const wire = new THREE.Mesh(geo, wireMat);
        wire.scale.set(1.18, 1.18, 1.18);
        satGroup.add(solid);
        satGroup.add(wire);
        satGroup.position.set(satPositions[i][0], satPositions[i][1], satPositions[i][2]);
        rootGroup.add(satGroup);
        satellites.push({
          mesh: satGroup,
          baseY: satPositions[i][1],
          baseX: satPositions[i][0],
          speed: 0.55 + i * 0.14,
          phase: i * 1.15
        });
      }

      // Volumetric 3D Starfield Lattice
      const particleCount = prefersReducedMotion ? 90 : 260;
      const posArray = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 22;
        posArray[i + 1] = (Math.random() - 0.5) * 14;
        posArray[i + 2] = (Math.random() - 0.5) * 12 - 2;
      }
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 0.055,
        transparent: true,
        opacity: 0.62
      });
      const particleSystem = new THREE.Points(particleGeo, particleMat);
      scene.add(particleSystem);

      // Theme Sync Function + MutationObserver on <html data-theme>
      window.updateHero3DTheme = function (theme) {
        const isLight = theme === "light";
        wireMat.color.setHex(isLight ? 0x0284c7 : 0x22d3ee);
        wireMat.opacity = isLight ? 0.28 : 0.34;
        innerCoreMat.color.setHex(isLight ? 0xe0f2fe : 0x0f172a);
        innerCoreMat.emissive.setHex(isLight ? 0x38bdf8 : 0x0e7490);
        innerCoreMat.emissiveIntensity = isLight ? 0.22 : 0.44;
        ringMat1.color.setHex(isLight ? 0x0284c7 : 0x38bdf8);
        ringMat2.color.setHex(isLight ? 0x4f46e5 : 0x818cf8);
        particleMat.color.setHex(isLight ? 0x0284c7 : 0x38bdf8);
        particleMat.opacity = isLight ? 0.42 : 0.62;
      };

      window.updateHero3DTheme(document.documentElement.getAttribute("data-theme") || "dark");

      if ("MutationObserver" in window) {
        const themeObserver = new MutationObserver(function () {
          const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
          window.updateHero3DTheme(currentTheme);
        });
        themeObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["data-theme"]
        });
      }

      if (modeBtn) {
        modeBtn.addEventListener("click", function () {
          currentMode = (currentMode + 1) % modeNames.length;
          buildSculptureMode(currentMode);
          if (modeLabel) {
            modeLabel.textContent = "3D: " + modeNames[currentMode];
          }
          show3DToast("3D Scene Architecture: " + modeNames[currentMode]);
        });
      }

      function resizeThree() {
        const rect = canvas.parentElement.getBoundingClientRect();
        const w = rect.width || window.innerWidth;
        const h = rect.height || window.innerHeight;
        renderer.setSize(w, h, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        camera.aspect = w / h;
        camera.updateProjectionMatrix();

        if (w > 980) {
          coreGroup.position.set(2.15, 0.15, 0);
        } else {
          coreGroup.position.set(0, 0.2, -1.1);
        }
      }

      window.addEventListener("resize", resizeThree);
      resizeThree();

      let targetX = 0;
      let targetY = 0;
      let smoothX = 0;
      let smoothY = 0;
      let scrollRatio = 0;

      if (heroSection) {
        heroSection.addEventListener(
          "mousemove",
          function (e) {
            const r = heroSection.getBoundingClientRect();
            const nx = ((e.clientX - r.left) / (r.width || 1)) * 2 - 1;
            const ny = -(((e.clientY - r.top) / (r.height || 1)) * 2 - 1);
            targetX = nx;
            targetY = ny;
            heroSection.style.setProperty("--hero-px", nx.toFixed(3));
            heroSection.style.setProperty("--hero-py", ny.toFixed(3));
          },
          { passive: true }
        );

        heroSection.addEventListener("mouseleave", function () {
          targetX = 0;
          targetY = 0;
          heroSection.style.setProperty("--hero-px", "0");
          heroSection.style.setProperty("--hero-py", "0");
        });
      }

      window.addEventListener(
        "scroll",
        function () {
          const sy = window.scrollY || document.documentElement.scrollTop;
          const vh = window.innerHeight || 800;
          scrollRatio = Math.min(1.5, Math.max(0, sy / vh));
        },
        { passive: true }
      );

      const clockStart = performance.now();
      function animateThree(now) {
        const elapsed = (now - clockStart) * 0.001;

        smoothX += (targetX - smoothX) * 0.055;
        smoothY += (targetY - smoothY) * 0.055;
        coreGroup.scale.x += (1 - coreGroup.scale.x) * 0.08;
        coreGroup.scale.y += (1 - coreGroup.scale.y) * 0.08;
        coreGroup.scale.z += (1 - coreGroup.scale.z) * 0.08;

        camera.position.x = smoothX * 0.85;
        camera.position.y = smoothY * 0.55 - scrollRatio * 1.35;
        camera.position.z = 9.2 + scrollRatio * 1.8;
        camera.lookAt(coreGroup.position.x * 0.45, -scrollRatio * 0.6, 0);

        if (outerMesh && innerMesh) {
          outerMesh.rotation.y = elapsed * 0.22 + smoothX * 0.45;
          outerMesh.rotation.x = elapsed * 0.14 - smoothY * 0.35;
          innerMesh.rotation.y = -elapsed * 0.32 + smoothX * 0.25;
          innerMesh.rotation.z = elapsed * 0.18;
        }

        ring1.rotation.z = elapsed * 0.28 + smoothX * 0.2;
        ring2.rotation.z = -elapsed * 0.21 + smoothY * 0.2;
        ring3.rotation.y = elapsed * 0.16;

        for (let i = 0; i < satellites.length; i++) {
          const s = satellites[i];
          s.mesh.position.y = s.baseY + Math.sin(elapsed * s.speed + s.phase) * 0.32;
          s.mesh.rotation.x = elapsed * 0.45 + s.phase;
          s.mesh.rotation.y = elapsed * 0.35;
        }

        particleSystem.rotation.y = elapsed * 0.035 + smoothX * 0.08;
        particleSystem.rotation.x = -smoothY * 0.06;

        renderer.render(scene, camera);

        if (!prefersReducedMotion) {
          hero3DAnimId = requestAnimationFrame(animateThree);
        }
      }

      animateThree(performance.now());
    } catch (err) {
      // Fallback silently if WebGL context creation fails
    }
  }

  /* --------------------------------------------------------------------------
   * 3. MULTI-LAYER 3D PERSPECTIVE TILT & SPECULAR GLARE CARDS
   * -------------------------------------------------------------------------- */
  function init3DCardsAndGlare() {
    const cards = document.querySelectorAll(".tilt-card");
    cards.forEach(function (card) {
      if (!card.querySelector(".card-3d-glare")) {
        const glare = document.createElement("div");
        glare.className = "card-3d-glare";
        glare.setAttribute("aria-hidden", "true");
        card.appendChild(glare);
      }

      card.addEventListener("mousemove", function (e) {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const pctX = (x / (r.width || 1)) * 100;
        const pctY = (y / (r.height || 1)) * 100;

        card.style.setProperty("--mouse-x", x + "px");
        card.style.setProperty("--mouse-y", y + "px");
        card.style.setProperty("--card-glare-x", pctX.toFixed(1) + "%");
        card.style.setProperty("--card-glare-y", pctY.toFixed(1) + "%");
        card.style.setProperty("--card-glare-opacity", "1");

        if (!prefersReducedMotion) {
          let maxTilt = 4.2;
          if (card.classList.contains("hero-visual-card")) {
            maxTilt = 6.5;
          } else if (card.classList.contains("project-card") || card.classList.contains("service-card")) {
            maxTilt = 5.4;
          } else if (card.classList.contains("about-portrait-card")) {
            maxTilt = 2.4;
          }
          const rotY = (x / (r.width || 1) - 0.5) * (maxTilt * 2);
          const rotX = (0.5 - y / (r.height || 1)) * (maxTilt * 2);
          card.style.transform =
            "perspective(1050px) rotateX(" +
            rotX.toFixed(2) +
            "deg) rotateY(" +
            rotY.toFixed(2) +
            "deg) translate3d(0, -5px, 8px)";
        }
      });

      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
        card.style.setProperty("--card-glare-opacity", "0");
      });
    });
  }

  /* --------------------------------------------------------------------------
   * 4. INTERACTIVE 3D FIBONACCI SKILL SPHERE & ORBITAL CONSTELLATION
   * -------------------------------------------------------------------------- */
  let sphere3DAnimId = null;

  function init3DSkillSphere() {
    if (typeof window.SB_CANCEL_2D_ORBIT === "function") {
      window.SB_CANCEL_2D_ORBIT();
    }
    if (sphere3DAnimId) {
      cancelAnimationFrame(sphere3DAnimId);
      sphere3DAnimId = null;
    }

    const canvas = document.getElementById("skill-orbit-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const skills = [
      { name: "Laravel", level: "94%", cat: "backend" },
      { name: "PHP", level: "92%", cat: "backend" },
      { name: "MySQL", level: "91%", cat: "backend" },
      { name: "Composer", level: "88%", cat: "backend" },
      { name: "JavaScript", level: "88%", cat: "frontend" },
      { name: "jQuery", level: "92%", cat: "frontend" },
      { name: "Ajax", level: "90%", cat: "frontend" },
      { name: "Bootstrap", level: "94%", cat: "frontend" },
      { name: "HTML5", level: "95%", cat: "frontend" },
      { name: "CSS3", level: "92%", cat: "frontend" },
      { name: "Git", level: "91%", cat: "tools" },
      { name: "GitHub", level: "92%", cat: "tools" },
      { name: "Jira", level: "87%", cat: "tools" },
      { name: "Bitbucket", level: "88%", cat: "tools" }
    ];

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const nodes3D = skills.map(function (sk, idx) {
      const y = 1 - (idx / (skills.length - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = goldenAngle * idx;
      return {
        name: sk.name,
        level: sk.level,
        cat: sk.cat,
        bx: Math.cos(theta) * radiusAtY,
        by: y,
        bz: Math.sin(theta) * radiusAtY
      };
    });

    let rotY = 0.4;
    let rotX = 0.22;
    let velY = prefersReducedMotion ? 0 : 0.0048;
    let velX = prefersReducedMotion ? 0 : 0.0014;
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let pointerX = -9999;
    let pointerY = -9999;

    canvas.addEventListener("mousedown", function (e) {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    });

    window.addEventListener("mouseup", function () {
      isDragging = false;
    });

    canvas.addEventListener("mousemove", function (e) {
      const r = canvas.getBoundingClientRect();
      pointerX = e.clientX - r.left;
      pointerY = e.clientY - r.top;

      if (isDragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        rotY += dx * 0.008;
        rotX = Math.max(-1.1, Math.min(1.1, rotX + dy * 0.008));
        velY = dx * 0.0008;
        velX = dy * 0.0005;
        lastX = e.clientX;
        lastY = e.clientY;
      } else if (!prefersReducedMotion) {
        const nx = pointerX / (r.width || 1) - 0.5;
        const ny = pointerY / (r.height || 1) - 0.5;
        velY = nx * 0.014;
        velX = ny * 0.008;
      }
    });

    canvas.addEventListener("mouseleave", function () {
      pointerX = -9999;
      pointerY = -9999;
      if (!prefersReducedMotion) {
        velY = 0.0048;
        velX = 0.0014;
      }
    });

    function renderSphere() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = (canvas.width = rect.width || 360);
      const h = (canvas.height = rect.height || 360);
      const cx = w / 2;
      const cy = h / 2;
      const sphereRadius = Math.min(w, h) * 0.34;
      const fov = 340;

      ctx.clearRect(0, 0, w, h);
      const isLight = document.documentElement.getAttribute("data-theme") === "light";

      if (!isDragging && !prefersReducedMotion) {
        rotY += velY;
        rotX = Math.max(-0.65, Math.min(0.65, rotX + velX * 0.35));
      }

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.strokeStyle = isLight ? "rgba(79, 70, 229, 0.16)" : "rgba(56, 189, 248, 0.16)";
      ctx.lineWidth = 1;
      for (let rIdx = 0; rIdx < 2; rIdx++) {
        ctx.beginPath();
        const tilt = rIdx === 0 ? rotX : rotX + Math.PI / 3;
        ctx.ellipse(0, 0, sphereRadius, Math.abs(sphereRadius * Math.sin(tilt)) + 14, rIdx * 0.6, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      const coreGrad = ctx.createRadialGradient(cx - 5, cy - 5, 3, cx, cy, 34);
      coreGrad.addColorStop(0, "#22d3ee");
      coreGrad.addColorStop(0.55, "#6366f1");
      coreGrad.addColorStop(1, "rgba(99, 102, 241, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "700 10px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("3D CORE", cx, cy);

      const projected = nodes3D.map(function (n) {
        const x1 = n.bx * cosY - n.bz * sinY;
        const z1 = n.bz * cosY + n.bx * sinY;
        const y2 = n.by * cosX - z1 * sinX;
        const z2 = z1 * cosX + n.by * sinX;

        const wx = x1 * sphereRadius;
        const wy = y2 * sphereRadius;
        const wz = z2 * sphereRadius;

        const scale = fov / (fov - wz);
        const sx = cx + wx * scale;
        const sy = cy + wy * scale;
        const depthAlpha = Math.max(0.24, Math.min(1, (z2 + 1.15) / 2.05));

        return {
          name: n.name,
          level: n.level,
          cat: n.cat,
          sx: sx,
          sy: sy,
          wz: wz,
          zNorm: z2,
          scale: scale,
          alpha: depthAlpha
        };
      });

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const dx = a.sx - b.sx;
          const dy = a.sy - b.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < sphereRadius * 0.92) {
            const lineAlpha = ((1 - dist / (sphereRadius * 0.92)) * 0.22 * ((a.alpha + b.alpha) * 0.5)).toFixed(3);
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.strokeStyle = isLight
              ? "rgba(2, 132, 199, " + lineAlpha + ")"
              : "rgba(34, 211, 238, " + lineAlpha + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      projected.sort(function (a, b) {
        return a.wz - b.wz;
      });

      projected.forEach(function (p) {
        const dMouse = Math.hypot(p.sx - pointerX, p.sy - pointerY);
        const isHovered = dMouse < 34;
        const pillScale = p.scale * (isHovered ? 1.16 : 1);

        let dotColor = "#22d3ee";
        if (p.cat === "backend") dotColor = "#818cf8";
        if (p.cat === "tools") dotColor = "#10b981";

        ctx.save();
        ctx.translate(p.sx, p.sy);
        ctx.scale(pillScale, pillScale);
        ctx.globalAlpha = isHovered ? 1 : p.alpha;

        const label = isHovered || p.zNorm > 0.25 ? p.name + " • " + p.level : p.name;
        ctx.font = "600 10.5px 'JetBrains Mono', monospace";
        const textW = ctx.measureText(label).width;
        const boxW = textW + 22;
        const boxH = 22;

        ctx.fillStyle = isLight ? "rgba(255, 255, 255, 0.94)" : "rgba(11, 17, 33, 0.9)";
        ctx.strokeStyle = isHovered
          ? dotColor
          : p.zNorm > 0
          ? "rgba(34, 211, 238, 0.52)"
          : "rgba(148, 163, 184, 0.24)";
        ctx.lineWidth = isHovered ? 1.6 : 1;

        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(-boxW / 2, -boxH / 2, boxW, boxH, 11);
        } else {
          ctx.rect(-boxW / 2, -boxH / 2, boxW, boxH);
        }
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(-boxW / 2 + 8, 0, 3, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();

        ctx.fillStyle = isLight ? "#0f172a" : "#f8fafc";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(label, -boxW / 2 + 15, 0.5);
        ctx.restore();
      });

      if (!prefersReducedMotion) {
        sphere3DAnimId = requestAnimationFrame(renderSphere);
      }
    }

    renderSphere();
    window.addEventListener("resize", function () {
      if (prefersReducedMotion) renderSphere();
    });
  }

  /* --------------------------------------------------------------------------
   * 5. 3D COVERFLOW CAROUSEL DEPTH SYNC (is-prev / is-next)
   * -------------------------------------------------------------------------- */
  function init3DCoverflowCarouselSync() {
    const track = document.getElementById("about-photo-carousel");
    if (!track) return;
    const slides = Array.prototype.slice.call(track.querySelectorAll(".carousel-slide"));
    if (!slides.length) return;

    function syncCoverflowClasses() {
      let activeIdx = 0;
      slides.forEach(function (s, idx) {
        if (s.classList.contains("is-active")) activeIdx = idx;
      });
      slides.forEach(function (s, idx) {
        s.classList.toggle("is-prev", idx === activeIdx - 1);
        s.classList.toggle("is-next", idx === activeIdx + 1);
      });
    }

    syncCoverflowClasses();
    track.addEventListener("scroll", function () {
      requestAnimationFrame(syncCoverflowClasses);
    }, { passive: true });

    document.querySelectorAll("#gallery-prev-btn, #gallery-next-btn, #about-gallery-dots .gallery-dot").forEach(function (el) {
      el.addEventListener("click", function () {
        setTimeout(syncCoverflowClasses, 50);
      });
    });
  }

  function initPortfolio3D() {
    ensure3DDomElements();
    initHero3DScene();
    init3DCardsAndGlare();
    init3DSkillSphere();
    init3DCoverflowCarouselSync();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPortfolio3D);
  } else {
    initPortfolio3D();
  }
})();