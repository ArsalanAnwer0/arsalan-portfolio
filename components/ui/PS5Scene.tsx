import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const easeOutCirc = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 4));

const PS5Scene = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    while (container.firstChild) container.removeChild(container.firstChild);

    const W = 550, H = 550;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(26, W / H, 0.1, 100);
    camera.position.set(6.5, 5, 6.5);
    camera.lookAt(0, 0.5, 0);

    // ── LIGHTING — moody gaming ──
    scene.add(new THREE.AmbientLight(0xffe5d0, 0.35));
    const mainLight = new THREE.DirectionalLight(0xfff8f0, 1.0);
    mainLight.position.set(4, 10, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.set(2048, 2048);
    mainLight.shadow.camera.left = -6; mainLight.shadow.camera.right = 6;
    mainLight.shadow.camera.top = 6; mainLight.shadow.camera.bottom = -6;
    mainLight.shadow.radius = 5; mainLight.shadow.bias = -0.0005;
    scene.add(mainLight);
    const fillLight = new THREE.DirectionalLight(0x8888ff, 0.2);
    fillLight.position.set(-4, 3, -2); scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0xffe0c0, 0.15);
    rimLight.position.set(-3, 2, 5); scene.add(rimLight);

    // TV glow
    const tvGlow = new THREE.PointLight(0x44AA55, 0.6, 4.5);
    tvGlow.position.set(0, 1.0, -0.15); scene.add(tvGlow);
    // PS5 LED
    const ps5Glow = new THREE.PointLight(0x0066FF, 0.35, 2);
    ps5Glow.position.set(0.95, 0.5, -0.4); scene.add(ps5Glow);
    // LED strip behind TV
    const ledStrip = new THREE.PointLight(0x6633CC, 0.45, 3);
    ledStrip.position.set(0, 1.2, -0.85); scene.add(ledStrip);

    // ── MATERIALS ──
    const M = {
      wood: (c: number) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.88, metalness: 0 }),
      metal: (c: number) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.3, metalness: 0.75 }),
      plastic: (c: number) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.55, metalness: 0.1 }),
      fabric: (c: number) => new THREE.MeshStandardMaterial({ color: c, roughness: 1.0, metalness: 0 }),
      screen: (c: number, e: number, i = 0.5) => new THREE.MeshStandardMaterial({ color: c, emissive: e, emissiveIntensity: i, roughness: 0.12, metalness: 0.1 }),
      skin: (c: number) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.75, metalness: 0 }),
      glow: (c: number, e: number, i = 1.0) => new THREE.MeshStandardMaterial({ color: c, emissive: e, emissiveIntensity: i, roughness: 0.3, metalness: 0.2 }),
    };

    const bx = (w: number, h: number, d: number, m: THREE.Material, cs = true, rs = true) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
      mesh.castShadow = cs; mesh.receiveShadow = rs; return mesh;
    };
    const put = (p: THREE.Object3D, m: THREE.Mesh, x: number, y: number, z: number) => {
      m.position.set(x, y, z); p.add(m); return m;
    };

    const gnd = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.ShadowMaterial({ opacity: 0.18 }));
    gnd.rotation.x = -Math.PI / 2; gnd.position.y = -0.01; gnd.receiveShadow = true;
    scene.add(gnd);

    const g = new THREE.Group();

    // ═══════════════════════════
    //  FLOOR — dark wood planks
    // ═══════════════════════════
    for (let i = 0; i < 5; i++) {
      const shade = i % 2 === 0 ? 0x3A3028 : 0x322820;
      put(g, bx(2.6, 0.02, 0.35, M.wood(shade), false, true), 0, 0.0, -0.5 + i * 0.35);
      put(g, bx(2.6, 0.021, 0.008, M.wood(0x1A1810), false, false), 0, 0.001, -0.325 + i * 0.35);
    }

    // ═══════════════════════════
    //  RUG — gaming themed
    // ═══════════════════════════
    put(g, bx(3.2, 0.02, 2.6, M.fabric(0x2A2440)), 0, 0.01, 0.35);
    // Border
    put(g, bx(3.2, 0.021, 0.05, M.fabric(0x443868), false, false), 0, 0.015, -0.92);
    put(g, bx(3.2, 0.021, 0.05, M.fabric(0x443868), false, false), 0, 0.015, 1.62);
    [-1.57, 1.57].forEach(x => {
      put(g, bx(0.05, 0.021, 2.6, M.fabric(0x443868), false, false), x, 0.015, 0.35);
    });
    // Pattern
    [-0.5, 0, 0.5].forEach(x => {
      put(g, bx(0.35, 0.022, 0.35, M.fabric(0x352C50), false, false), x, 0.012, 0.35);
    });

    // ═══════════════════════════
    //  TV UNIT / ENTERTAINMENT CENTER
    // ═══════════════════════════
    put(g, bx(2.5, 0.42, 0.52, M.wood(0x2A2420)), 0, 0.21, -0.58);
    put(g, bx(2.6, 0.035, 0.56, M.wood(0x3A3430)), 0, 0.42, -0.58);
    put(g, bx(2.5, 0.018, 0.04, M.wood(0x4A4438)), 0, 0.42, -0.33);
    // Cabinet doors
    [-0.55, 0.55].forEach(x => {
      put(g, bx(0.55, 0.34, 0.025, M.wood(0x333028)), x, 0.2, -0.33);
      put(g, bx(0.09, 0.022, 0.022, M.metal(0x888078)), x, 0.22, -0.31);
    });
    // Center shelf dividers
    [-0.25, 0.25].forEach(x => {
      put(g, bx(0.02, 0.36, 0.48, M.wood(0x252018), false, false), x, 0.2, -0.58);
    });
    put(g, bx(0.48, 0.02, 0.44, M.wood(0x222018), false, true), 0, 0.2, -0.58);
    // Feet
    [-1.15, -0.4, 0.4, 1.15].forEach(x => {
      put(g, bx(0.06, 0.04, 0.06, M.wood(0x1A1810)), x, 0.02, -0.33);
    });

    // Items in left cabinet (visible through gap)
    // Extra game cases stored
    for (let i = 0; i < 3; i++) {
      put(g, bx(0.13, 0.17, 0.015, M.plastic([0x003366, 0x333333, 0x660022][i])),
        -0.55 + i * 0.04, 0.12, -0.45);
    }
    // Right cabinet — headset stand spare
    put(g, bx(0.03, 0.15, 0.03, M.metal(0x555555)), 0.55, 0.12, -0.55);

    // RGB LED strip under TV unit
    put(g, bx(2.4, 0.015, 0.015, M.glow(0x6633CC, 0x5522BB, 0.8), false, false), 0, 0.015, -0.32);

    // ═══════════════════════════
    //  TV — large LED
    // ═══════════════════════════
    const tW = 1.85, tH = 1.05, tb = 0.02;
    put(g, bx(tW, tb, 0.05, M.plastic(0x080808)), 0, 0.44 + tH, -0.6);
    put(g, bx(tW, tb + 0.008, 0.05, M.plastic(0x080808)), 0, 0.44, -0.6);
    put(g, bx(tb, tH, 0.05, M.plastic(0x080808)), -tW / 2, 0.44 + tH / 2, -0.6);
    put(g, bx(tb, tH, 0.05, M.plastic(0x080808)), tW / 2, 0.44 + tH / 2, -0.6);
    put(g, bx(tW - 0.02, tH - 0.02, 0.025, M.plastic(0x0A0A0A)), 0, 0.44 + tH / 2, -0.63);
    put(g, bx(tW - tb * 2, tH - tb * 2, 0.018, M.screen(0x1A4A1A, 0x1A5A1A, 0.4)), 0, 0.44 + tH / 2, -0.58);

    // ── FIFA ON SCREEN ──
    put(g, bx(1.6, 0.85, 0.015, M.screen(0x1A6B2A, 0x1A7A2A, 0.45), false, false), 0, 0.94, -0.57);
    // Pitch mowing stripes (alternating green shades)
    for (let i = 0; i < 6; i++) {
      const shade = i % 2 === 0 ? 0x1E7A30 : 0x166622;
      put(g, bx(1.55, 0.13, 0.012, M.screen(shade, shade, 0.15), false, false), 0, 0.56 + i * 0.13, -0.568);
    }

    // Center circle
    const circleSegs = 16;
    for (let i = 0; i < circleSegs; i++) {
      const a = (i / circleSegs) * Math.PI * 2;
      const cx = Math.cos(a) * 0.12;
      const cy = Math.sin(a) * 0.12;
      put(g, bx(0.02, 0.02, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.3), false, false), cx, 0.94 + cy, -0.565);
    }
    put(g, bx(0.012, 0.75, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.25), false, false), 0, 0.94, -0.565);
    put(g, bx(0.025, 0.025, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.3), false, false), 0, 0.94, -0.565);

    // Touchlines
    put(g, bx(1.5, 0.012, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.2), false, false), 0, 1.33, -0.565);
    put(g, bx(1.5, 0.012, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.2), false, false), 0, 0.55, -0.565);
    put(g, bx(0.012, 0.78, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.2), false, false), -0.75, 0.94, -0.565);
    put(g, bx(0.012, 0.78, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.2), false, false), 0.75, 0.94, -0.565);

    // Penalty boxes
    [-0.75, 0.75].forEach(side => {
      const s = side > 0 ? 1 : -1;
      put(g, bx(0.012, 0.35, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.2), false, false), side, 0.94, -0.565);
      put(g, bx(0.2, 0.012, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.2), false, false), side - s * 0.1, 1.115, -0.565);
      put(g, bx(0.2, 0.012, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.2), false, false), side - s * 0.1, 0.765, -0.565);
      put(g, bx(0.015, 0.12, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.3), false, false), side, 0.94, -0.565);
    });

    // Players — red team
    [[-0.45, 1.1], [-0.35, 0.85], [-0.5, 0.7], [-0.2, 0.95], [-0.55, 1.0], [-0.3, 1.2]].forEach(([x, y]) => {
      put(g, bx(0.025, 0.045, 0.012, M.screen(0xDD2222, 0xCC1111, 0.6), false, false), x, y, -0.562);
      put(g, bx(0.02, 0.02, 0.012, M.screen(0xEEBB88, 0xDDAA77, 0.3), false, false), x, y + 0.03, -0.562);
    });
    // Blue team
    [[0.45, 1.0], [0.35, 0.8], [0.5, 1.15], [0.2, 0.9], [0.55, 0.75], [0.3, 1.1]].forEach(([x, y]) => {
      put(g, bx(0.025, 0.045, 0.012, M.screen(0x2244DD, 0x1133CC, 0.6), false, false), x, y, -0.562);
      put(g, bx(0.02, 0.02, 0.012, M.screen(0xEEBB88, 0xDDAA77, 0.3), false, false), x, y + 0.03, -0.562);
    });

    // Ball
    put(g, bx(0.025, 0.025, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.8), false, false), -0.05, 0.92, -0.56);

    // HUD
    put(g, bx(0.5, 0.05, 0.012, M.screen(0x0A0A0A, 0x0A0A0A, 0.2), false, false), 0, 1.38, -0.565);
    put(g, bx(0.08, 0.035, 0.012, M.screen(0xDD2222, 0xCC1111, 0.5), false, false), -0.15, 1.38, -0.562);
    put(g, bx(0.03, 0.03, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.6), false, false), -0.05, 1.38, -0.562);
    put(g, bx(0.015, 0.025, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.4), false, false), 0, 1.38, -0.562);
    put(g, bx(0.03, 0.03, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.6), false, false), 0.05, 1.38, -0.562);
    put(g, bx(0.08, 0.035, 0.012, M.screen(0x2244DD, 0x1133CC, 0.5), false, false), 0.15, 1.38, -0.562);
    put(g, bx(0.06, 0.025, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.3), false, false), 0, 1.34, -0.562);
    // Minimap
    put(g, bx(0.22, 0.1, 0.012, M.screen(0x0A3A0A, 0x0A3A0A, 0.3), false, false), 0.6, 0.55, -0.565);
    put(g, bx(0.02, 0.015, 0.012, M.screen(0xFFFF44, 0xFFFF44, 0.5), false, false), 0.6, 0.55, -0.562);
    // EA SPORTS
    put(g, bx(0.12, 0.03, 0.012, M.screen(0xFFCC00, 0xFFBB00, 0.4), false, false), -0.7, 1.38, -0.562);

    // TV stand legs
    [-0.35, 0.35].forEach(x => {
      put(g, bx(0.04, 0.055, 0.08, M.metal(0x333333)), x, 0.41, -0.56);
      put(g, bx(0.12, 0.02, 0.1, M.metal(0x2A2A2A)), x, 0.385, -0.56);
    });

    // LED STRIP BEHIND TV
    put(g, bx(1.5, 0.035, 0.015, M.glow(0x6633CC, 0x7744DD, 1.5), false, false), 0, 1.4, -0.68);
    put(g, bx(1.5, 0.035, 0.015, M.glow(0x6633CC, 0x7744DD, 1.5), false, false), 0, 0.5, -0.68);
    [-0.75, 0.75].forEach(x => {
      put(g, bx(0.015, 0.9, 0.015, M.glow(0x6633CC, 0x7744DD, 1.2), false, false), x, 0.95, -0.68);
    });

    // ═══════════════════════════
    //  SOUNDBAR under TV
    // ═══════════════════════════
    put(g, bx(1.2, 0.06, 0.1, M.plastic(0x111111)), 0, 0.46, -0.38);
    // Speaker grille dots
    for (let i = 0; i < 8; i++) {
      put(g, bx(0.015, 0.015, 0.008, M.plastic(0x333333), false, false), -0.4 + i * 0.11, 0.46, -0.33);
    }
    // Soundbar LED
    put(g, bx(0.4, 0.008, 0.008, M.glow(0x22CCFF, 0x11BBEE, 0.6), false, false), 0, 0.435, -0.33);

    // ═══════════════════════════
    //  PS5 CONSOLE (in center shelf)
    // ═══════════════════════════
    put(g, bx(0.1, 0.42, 0.16, M.plastic(0x050505)), 0, 0.22, -0.58);
    const p5L = bx(0.15, 0.4, 0.14, M.plastic(0xEEEEEA));
    p5L.position.set(-0.05, 0.23, -0.58); p5L.rotation.z = 0.06; g.add(p5L);
    const p5R = bx(0.15, 0.38, 0.14, M.plastic(0xEEEEEA));
    p5R.position.set(0.05, 0.22, -0.58); p5R.rotation.z = -0.06; g.add(p5R);
    put(g, bx(0.11, 0.003, 0.12, M.plastic(0x1A1A1A), false, false), -0.02, 0.33, -0.58);
    const ps5Led = bx(0.015, 0.32, 0.035, M.glow(0x0088FF, 0x0066DD, 1.0));
    ps5Led.position.set(0, 0.22, -0.48); ps5Led.castShadow = false; g.add(ps5Led);
    put(g, bx(0.26, 0.025, 0.2, M.plastic(0x0A0A0A)), 0, 0.01, -0.58);
    put(g, bx(0.04, 0.04, 0.012, M.glow(0x4488FF, 0x2266DD, 0.3), false, false), 0, 0.35, -0.49);
    // USB ports on front
    put(g, bx(0.025, 0.012, 0.012, M.plastic(0x222222), false, false), -0.03, 0.14, -0.49);
    put(g, bx(0.025, 0.012, 0.012, M.plastic(0x222222), false, false), 0.03, 0.14, -0.49);

    // ═══════════════════════════
    //  COFFEE TABLE
    // ═══════════════════════════
    put(g, bx(1.1, 0.045, 0.58, M.wood(0x7A5A38)), 0, 0.34, 0.18);
    put(g, bx(1.1, 0.018, 0.035, M.wood(0x6A4A28)), 0, 0.32, 0.47);
    put(g, bx(1.1, 0.018, 0.035, M.wood(0x6A4A28)), 0, 0.32, -0.09);
    put(g, bx(0.035, 0.018, 0.58, M.wood(0x6A4A28)), -0.53, 0.32, 0.18);
    put(g, bx(0.035, 0.018, 0.58, M.wood(0x6A4A28)), 0.53, 0.32, 0.18);
    [[-0.47, -0.05], [0.47, -0.05], [-0.47, 0.41], [0.47, 0.41]].forEach(([x, z]) => {
      put(g, bx(0.05, 0.3, 0.05, M.wood(0x6A4A28)), x, 0.15, z);
      put(g, bx(0.04, 0.04, 0.04, M.metal(0x555555)), x, 0.01, z);
    });
    put(g, bx(0.85, 0.02, 0.4, M.wood(0x5A3A1A)), 0, 0.12, 0.18);

    // ── STUFF ON TABLE ──
    // Energy drink can
    put(g, bx(0.08, 0.17, 0.08, M.plastic(0x111111)), 0.35, 0.44, 0.14);
    put(g, bx(0.08, 0.055, 0.08, M.plastic(0x3344CC)), 0.35, 0.41, 0.14);
    put(g, bx(0.08, 0.035, 0.08, M.plastic(0x22AA44)), 0.35, 0.48, 0.14);
    put(g, bx(0.065, 0.013, 0.065, M.metal(0xBBBBBB), false, false), 0.35, 0.53, 0.14);
    put(g, bx(0.14, 0.013, 0.14, M.wood(0x4A3A2A)), 0.35, 0.365, 0.14);

    // Game cases
    [0x004488, 0x111111, 0xAA1111].forEach((c, i) => {
      put(g, bx(0.13, 0.18, 0.018, M.plastic(c)), -0.38 + i * 0.025, 0.45, 0.16 - i * 0.025);
      put(g, bx(0.11, 0.035, 0.013, M.plastic(0xDDDDDD), false, false), -0.38 + i * 0.025, 0.49, 0.16 - i * 0.025 + 0.004);
      put(g, bx(0.003, 0.15, 0.014, M.plastic(0xEEEEEE), false, false), -0.38 + i * 0.025, 0.45, 0.16 - i * 0.025 + 0.01);
    });

    // Snack bowl
    put(g, bx(0.16, 0.06, 0.16, M.plastic(0xDDCCBB)), 0.08, 0.39, 0.26);
    put(g, bx(0.12, 0.03, 0.12, M.plastic(0xF0A040), false, false), 0.08, 0.41, 0.26);

    // TV remote
    put(g, bx(0.07, 0.02, 0.2, M.plastic(0x1A1A1A)), -0.12, 0.375, 0.08);
    put(g, bx(0.025, 0.008, 0.025, M.glow(0xFF1111, 0xDD0000, 0.4), false, false), -0.12, 0.386, 0.0);
    [0.02, 0.05, 0.08].forEach(z => {
      put(g, bx(0.02, 0.008, 0.02, M.plastic(0x333333), false, false), -0.12, 0.386, z);
    });

    // Phone on table (charging)
    put(g, bx(0.09, 0.012, 0.18, M.plastic(0x0A0A0A)), 0.15, 0.375, 0.38);
    put(g, bx(0.075, 0.005, 0.15, M.screen(0x112233, 0x112244, 0.2), false, false), 0.15, 0.382, 0.38);
    // Charging cable
    put(g, bx(0.012, 0.012, 0.15, M.plastic(0xDDDDDD), false, false), 0.15, 0.37, 0.48);

    // Second controller on table (spare)
    put(g, bx(0.2, 0.04, 0.12, M.plastic(0x111111)), -0.22, 0.385, 0.36);
    [-0.08, 0.08].forEach(x => {
      put(g, bx(0.05, 0.06, 0.06, M.plastic(0x151515)), -0.22 + x, 0.37, 0.4);
    });
    put(g, bx(0.08, 0.008, 0.015, M.glow(0xFF2222, 0xDD1111, 0.8), false, false), -0.22, 0.405, 0.31);

    // ═══════════════════════════
    //  COUCH
    // ═══════════════════════════
    put(g, bx(1.85, 0.25, 0.72, M.fabric(0x2A3560)), 0, 0.3, 0.78);
    [-0.42, 0.42].forEach(x => {
      put(g, bx(0.78, 0.1, 0.62, M.fabric(0x354575)), x, 0.47, 0.78);
      put(g, bx(0.004, 0.055, 0.54, M.fabric(0x2E3D6A), false, false), x, 0.47, 0.78);
    });
    put(g, bx(1.85, 0.62, 0.22, M.fabric(0x2A3560)), 0, 0.72, 1.14);
    [-0.42, 0.42].forEach(x => {
      put(g, bx(0.72, 0.5, 0.14, M.fabric(0x354575)), x, 0.72, 1.07);
      [-0.15, 0.15].forEach(dy => {
        put(g, bx(0.025, 0.025, 0.01, M.fabric(0x2A3560), false, false), x, 0.72 + dy, 1.0);
      });
    });
    [-0.95, 0.95].forEach(x => {
      put(g, bx(0.18, 0.52, 0.72, M.fabric(0x2A3560)), x, 0.45, 0.8);
      put(g, bx(0.2, 0.055, 0.68, M.fabric(0x354575)), x, 0.72, 0.8);
    });
    [[-0.8, 0.42], [0.8, 0.42], [-0.8, 1.14], [0.8, 1.14]].forEach(([x, z]) => {
      put(g, bx(0.08, 0.1, 0.08, M.wood(0x3A2818)), x, 0.05, z);
    });
    // Throw pillows
    const pillow = bx(0.26, 0.22, 0.1, M.fabric(0xCC6622));
    pillow.position.set(0.58, 0.6, 0.76); pillow.rotation.z = 0.2; pillow.rotation.y = -0.15; g.add(pillow);
    const pillow2 = bx(0.22, 0.18, 0.09, M.fabric(0x886644));
    pillow2.position.set(-0.56, 0.58, 0.76); pillow2.rotation.z = -0.15; g.add(pillow2);
    // Blanket draped on armrest
    put(g, bx(0.22, 0.4, 0.08, M.fabric(0x444466)), 0.96, 0.55, 0.65);
    put(g, bx(0.15, 0.2, 0.06, M.fabric(0x3A3A55)), 0.98, 0.35, 0.6);

    // ═══════════════════════════
    //  SIDE TABLE
    // ═══════════════════════════
    put(g, bx(0.35, 0.03, 0.35, M.wood(0x5A4A30)), -1.35, 0.52, 0.8);
    [[-1.48, 0.65], [-1.22, 0.65], [-1.48, 0.95], [-1.22, 0.95]].forEach(([x, z]) => {
      put(g, bx(0.035, 0.5, 0.035, M.metal(0x555555)), x, 0.26, z);
    });
    // Lamp
    put(g, bx(0.1, 0.02, 0.1, M.metal(0x444444)), -1.35, 0.545, 0.8);
    put(g, bx(0.025, 0.2, 0.025, M.metal(0x555555)), -1.35, 0.65, 0.8);
    put(g, bx(0.14, 0.1, 0.14, M.fabric(0x555544)), -1.35, 0.79, 0.8);
    put(g, bx(0.06, 0.04, 0.06, M.glow(0xFFDD88, 0xFFCC66, 0.6), false, false), -1.35, 0.76, 0.8);

    // Headset stand on side table
    put(g, bx(0.08, 0.02, 0.08, M.metal(0x444444)), -1.35, 0.545, 0.68);
    put(g, bx(0.025, 0.2, 0.025, M.metal(0x666666)), -1.35, 0.65, 0.68);
    put(g, bx(0.06, 0.03, 0.04, M.metal(0x777777)), -1.35, 0.76, 0.68);

    // Slippers
    [-0.15, 0.15].forEach(x => {
      put(g, bx(0.1, 0.03, 0.18, M.fabric(0x5544AA)), x + 0.3, 0.015, 0.35);
    });

    // ═══════════════════════════
    //  CHARACTER
    // ═══════════════════════════
    const ch = new THREE.Group();

    // Sneakers
    [-0.1, 0.1].forEach(x => {
      put(ch, bx(0.13, 0.075, 0.22, M.plastic(0x1A1A1A)), x, 0.04, 0.04);
      put(ch, bx(0.14, 0.022, 0.23, M.plastic(0xCC2222), false, false), x, 0.015, 0.04);
      put(ch, bx(0.12, 0.008, 0.2, M.plastic(0xEEEEEE), false, false), x, 0.003, 0.04);
      put(ch, bx(0.03, 0.01, 0.04, M.fabric(0xDDDDDD), false, false), x, 0.06, -0.04);
    });

    // Legs
    [-0.1, 0.1].forEach(x => {
      put(ch, bx(0.14, 0.12, 0.42, M.fabric(0x111111)), x, 0.38, 0.35);
      put(ch, bx(0.12, 0.11, 0.3, M.fabric(0x111111)), x, 0.2, 0.1);
      put(ch, bx(0.125, 0.025, 0.13, M.fabric(0x1A1A1A), false, false), x, 0.1, 0.06);
      put(ch, bx(0.13, 0.035, 0.05, M.fabric(0x333333), false, false), x, 0.085, -0.05);
    });

    // Torso — hoodie
    put(ch, bx(0.36, 0.38, 0.24, M.fabric(0x1A1A1A)), 0, 0.6, 0.76);
    put(ch, bx(0.26, 0.11, 0.035, M.fabric(0x202020)), 0, 0.5, 0.64);
    put(ch, bx(0.2, 0.004, 0.025, M.fabric(0x151515), false, false), 0, 0.56, 0.64);
    put(ch, bx(0.28, 0.12, 0.12, M.fabric(0x1C1C1C)), 0, 0.78, 0.88);
    [-0.045, 0.045].forEach(x => {
      put(ch, bx(0.01, 0.11, 0.013, M.fabric(0x888888), false, false), x, 0.7, 0.64);
      put(ch, bx(0.013, 0.018, 0.013, M.metal(0xAAAA88), false, false), x, 0.64, 0.64);
    });
    [-0.12, 0.12].forEach(x => {
      put(ch, bx(0.004, 0.3, 0.2, M.fabric(0x151515), false, false), x, 0.6, 0.76);
    });
    put(ch, bx(0.008, 0.3, 0.012, M.metal(0x555555), false, false), 0, 0.6, 0.64);
    // Small logo on hoodie
    put(ch, bx(0.05, 0.04, 0.008, M.fabric(0x333333), false, false), 0.08, 0.65, 0.64);

    // Shoulders
    [-0.24, 0.24].forEach(x => {
      put(ch, bx(0.12, 0.11, 0.2, M.fabric(0x1A1A1A)), x, 0.72, 0.76);
    });

    // Arms holding controller
    [-0.24, 0.24].forEach(x => {
      put(ch, bx(0.1, 0.12, 0.1, M.fabric(0x1A1A1A)), x, 0.62, 0.62);
      put(ch, bx(0.1, 0.075, 0.24, M.fabric(0x1A1A1A)), x, 0.56, 0.48);
      put(ch, bx(0.105, 0.025, 0.06, M.fabric(0x222222), false, false), x, 0.56, 0.36);
    });

    // ── DUALSENSE CONTROLLER ──
    put(ch, bx(0.38, 0.07, 0.22, M.plastic(0xE0E0DC)), 0, 0.54, 0.36);
    put(ch, bx(0.15, 0.045, 0.04, M.plastic(0x9AA0C0)), 0, 0.565, 0.28);
    [-0.16, 0.16].forEach(x => {
      put(ch, bx(0.1, 0.12, 0.12, M.plastic(0xD4D4D0)), x, 0.49, 0.38);
      put(ch, bx(0.08, 0.003, 0.08, M.plastic(0xC8C8C4), false, false), x, 0.46, 0.38);
      put(ch, bx(0.08, 0.003, 0.08, M.plastic(0xC8C8C4), false, false), x, 0.48, 0.38);
    });
    [[0.03, 0.035], [0.06, 0], [0.03, -0.035], [0, 0]].forEach(([dx, dz]) => {
      put(ch, bx(0.022, 0.014, 0.022, M.plastic(0x8888CC), false, false), 0.13 + dx, 0.565, 0.36 + dz);
    });
    put(ch, bx(0.04, 0.014, 0.08, M.plastic(0xCCCCC8), false, false), -0.13, 0.565, 0.36);
    put(ch, bx(0.08, 0.014, 0.04, M.plastic(0xCCCCC8), false, false), -0.13, 0.565, 0.36);
    [-0.07, 0.07].forEach(x => {
      put(ch, bx(0.035, 0.018, 0.035, M.plastic(0x333333), false, false), x, 0.568, 0.42);
    });
    put(ch, bx(0.18, 0.01, 0.018, M.glow(0x0088FF, 0x0066CC, 1.2), false, false), 0, 0.565, 0.26);
    put(ch, bx(0.028, 0.016, 0.028, M.glow(0x4488FF, 0x2266DD, 0.5), false, false), 0, 0.565, 0.44);
    [-0.06, 0.06].forEach(x => {
      put(ch, bx(0.025, 0.012, 0.015, M.plastic(0xBBBBBB), false, false), x, 0.565, 0.3);
    });
    [-0.15, 0.15].forEach(x => {
      put(ch, bx(0.08, 0.015, 0.04, M.plastic(0xCCCCC8), false, false), x, 0.575, 0.28);
    });

    // Hands
    [-0.24, 0.24].forEach(x => {
      put(ch, bx(0.1, 0.09, 0.11, M.skin(0xECB896)), x, 0.54, 0.32);
      put(ch, bx(0.06, 0.04, 0.06, M.skin(0xE0AC88), false, false), x, 0.56, 0.38);
      put(ch, bx(0.08, 0.04, 0.06, M.skin(0xE0AC88), false, false), x * 0.7, 0.5, 0.38);
    });

    // ── HEAD ──
    const head = new THREE.Group();
    put(head, bx(0.12, 0.06, 0.1, M.skin(0xE8B090)), 0, 0.82, 0.76);
    put(head, bx(0.4, 0.4, 0.38, M.skin(0xECB896)), 0, 1.0, 0.74);

    // Ears
    [-0.21, 0.21].forEach(x => {
      put(head, bx(0.04, 0.1, 0.09, M.skin(0xE0AA88)), x, 1.0, 0.74);
      put(head, bx(0.015, 0.06, 0.05, M.skin(0xDCA080), false, false), x, 1.0, 0.74);
    });

    // Eyes
    [-0.075, 0.075].forEach(x => {
      put(head, bx(0.08, 0.07, 0.02, M.plastic(0xFFFFFF), false, false), x, 1.01, 0.55);
      put(head, bx(0.05, 0.055, 0.02, M.plastic(0x2A1A0A), false, false), x, 1.005, 0.545);
      put(head, bx(0.025, 0.03, 0.02, M.plastic(0x0A0A0A), false, false), x, 1.0, 0.54);
      put(head, bx(0.015, 0.015, 0.015, M.plastic(0xFFFFFF), false, false), x + 0.015, 1.02, 0.535);
      put(head, bx(0.07, 0.008, 0.015, M.skin(0xDCA080), false, false), x, 0.975, 0.545);
    });

    // Eyebrows
    put(head, bx(0.08, 0.02, 0.025, M.skin(0x120A04), false, false), -0.075, 1.05, 0.555);
    const rBrow = bx(0.08, 0.02, 0.025, M.skin(0x120A04));
    rBrow.position.set(0.075, 1.055, 0.555); rBrow.rotation.z = -0.08;
    rBrow.castShadow = false; rBrow.receiveShadow = false; head.add(rBrow);

    // Nose
    put(head, bx(0.03, 0.04, 0.03, M.skin(0xDEA880), false, false), 0, 0.965, 0.55);
    put(head, bx(0.04, 0.015, 0.02, M.skin(0xD6A078), false, false), 0, 0.95, 0.555);

    // Mouth
    put(head, bx(0.06, 0.015, 0.015, M.skin(0xCC8870), false, false), 0, 0.92, 0.555);
    put(head, bx(0.04, 0.008, 0.012, M.skin(0xBB7060), false, false), 0, 0.91, 0.555);

    // Hair
    put(head, bx(0.42, 0.12, 0.4, M.skin(0x0C0604)), 0, 1.18, 0.73);
    put(head, bx(0.4, 0.11, 0.07, M.skin(0x120A06)), 0, 1.1, 0.56);
    put(head, bx(0.32, 0.06, 0.05, M.skin(0x0E0604)), 0, 1.06, 0.54);
    put(head, bx(0.07, 0.08, 0.06, M.skin(0x100808)), 0.08, 1.24, 0.72);
    put(head, bx(0.06, 0.07, 0.055, M.skin(0x100808)), -0.07, 1.22, 0.7);
    put(head, bx(0.04, 0.06, 0.04, M.skin(0x0E0806)), 0.12, 1.2, 0.68);
    [-0.21, 0.21].forEach(x => {
      put(head, bx(0.06, 0.24, 0.32, M.skin(0x0C0604)), x, 1.04, 0.73);
    });
    put(head, bx(0.38, 0.26, 0.06, M.skin(0x0A0502)), 0, 1.04, 0.94);

    // Headphones — grey/silver with RGB
    put(head, bx(0.48, 0.04, 0.065, M.metal(0xAAAAAA)), 0, 1.24, 0.74);
    put(head, bx(0.34, 0.03, 0.055, M.fabric(0x999999), false, false), 0, 1.23, 0.74);
    [-0.22, 0.22].forEach(x => {
      put(head, bx(0.04, 0.22, 0.045, M.metal(0x999999)), x, 1.1, 0.74);
    });
    [-0.24, 0.24].forEach(x => {
      put(head, bx(0.07, 0.14, 0.14, M.plastic(0x888888)), x, 1.0, 0.74);
      put(head, bx(0.05, 0.12, 0.12, M.fabric(0xAAAAAA)), x, 1.0, 0.74);
      put(head, bx(0.018, 0.13, 0.13, M.metal(0xBBBBBB), false, false), x + (x > 0 ? 0.025 : -0.025), 1.0, 0.74);
      put(head, bx(0.025, 0.03, 0.018, M.glow(0x22CCAA, 0x22CCAA, 0.9), false, false), x + (x > 0 ? 0.038 : -0.038), 1.0, 0.69);
    });
    // Mic boom on headset
    put(head, bx(0.015, 0.08, 0.015, M.plastic(0x777777)), -0.26, 0.94, 0.68);
    put(head, bx(0.025, 0.025, 0.025, M.plastic(0x555555)), -0.26, 0.9, 0.68);

    ch.add(head);
    ch.position.set(-0.1, 0.08, 0);
    g.add(ch);
    scene.add(g);

    // ── ORBIT CONTROLS ──
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.6;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.target.set(0, 0.5, 0);
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = Math.PI / 2.2;

    // ── ANIMATION ──
    let fId: number;
    let frame = 0;
    const initY = camera.position.y;
    const initCamDist = Math.sqrt(6.5 * 6.5 + 6.5 * 6.5);

    const animate = () => {
      fId = requestAnimationFrame(animate);
      frame++;

      if (frame < 120) {
        const p = easeOutCirc(frame / 120);
        const angle = p * Math.PI * 2 + 0.55;
        camera.position.x = initCamDist * Math.sin(angle);
        camera.position.z = initCamDist * Math.cos(angle);
        camera.position.y = initY;
        camera.lookAt(0, 0.5, 0);
      } else {
        controls.update();
      }

      const t = frame * 0.016;
      (ps5Led.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.7 + Math.sin(t * 1.0) * 0.4;
      ledStrip.intensity = 0.35 + Math.sin(t * 0.5) * 0.15;
      tvGlow.intensity = 0.5 + Math.sin(t * 1.3) * 0.1;

      head.rotation.x = Math.sin(t * 0.4) * 0.01;
      head.rotation.y = Math.sin(t * 0.25) * 0.015;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(fId);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: 550, height: 550 }} />;
};

export default PS5Scene;
