import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
    renderer.toneMappingExposure = 1.45;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(26, W / H, 0.1, 100);
    camera.position.set(6.5, 5, 6.5);
    camera.lookAt(0, 0.5, 0);

    // ── LIGHTING — moody gaming ──
    scene.add(new THREE.AmbientLight(0xffe5d0, 0.4));
    const mainLight = new THREE.DirectionalLight(0xfff8f0, 1.0);
    mainLight.position.set(4, 10, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.set(2048, 2048);
    mainLight.shadow.camera.left = -6; mainLight.shadow.camera.right = 6;
    mainLight.shadow.camera.top = 6; mainLight.shadow.camera.bottom = -6;
    mainLight.shadow.radius = 5; mainLight.shadow.bias = -0.0003;
    scene.add(mainLight);
    const fillLight = new THREE.DirectionalLight(0x8888ff, 0.2);
    fillLight.position.set(-4, 3, -2); scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0xffe0c0, 0.15);
    rimLight.position.set(-3, 2, 5); scene.add(rimLight);

    // TV glow — bumped intensity
    const tvGlow = new THREE.PointLight(0x44AA55, 0.7, 4.5);
    tvGlow.position.set(0, 1.0, -0.15); scene.add(tvGlow);
    // PS5 LED
    const ps5Glow = new THREE.PointLight(0x0066FF, 0.35, 2);
    ps5Glow.position.set(0.95, 0.5, -0.4); scene.add(ps5Glow);
    // LED strip behind TV
    const ledStripLight = new THREE.PointLight(0x5533DD, 0.45, 3);
    ledStripLight.position.set(0, 1.2, -0.4); scene.add(ledStripLight);

    // ── MATERIALS ──
    const M = {
      wood: (c: number) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.88, metalness: 0.02 }),
      metal: (c: number) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.3, metalness: 0.75 }),
      plastic: (c: number) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.55, metalness: 0.1 }),
      fabric: (c: number) => new THREE.MeshStandardMaterial({ color: c, roughness: 1.0, metalness: 0 }),
      screen: (c: number, e: number, i = 0.5) => new THREE.MeshStandardMaterial({ color: c, emissive: e, emissiveIntensity: i, roughness: 0.12, metalness: 0.05 }),
      skin: (c: number) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.75, metalness: 0, emissive: 0xFFAA88, emissiveIntensity: 0.02 }),
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
    //  RUG — intensified border
    // ═══════════════════════════
    put(g, bx(3.2, 0.02, 2.6, M.fabric(0x2A2440)), 0, 0.01, 0.35);
    put(g, bx(3.2, 0.021, 0.05, M.fabric(0x4A3F72), false, false), 0, 0.015, -0.92);
    put(g, bx(3.2, 0.021, 0.05, M.fabric(0x4A3F72), false, false), 0, 0.015, 1.62);
    [-1.57, 1.57].forEach(x => {
      put(g, bx(0.05, 0.021, 2.6, M.fabric(0x4A3F72), false, false), x, 0.015, 0.35);
    });
    [-0.5, 0, 0.5].forEach(x => {
      put(g, bx(0.35, 0.022, 0.35, M.fabric(0x3D3460), false, false), x, 0.012, 0.35);
    });

    // ═══════════════════════════
    //  TV UNIT
    // ═══════════════════════════
    put(g, bx(2.5, 0.42, 0.52, M.wood(0x2A2420)), 0, 0.21, -0.58);
    put(g, bx(2.6, 0.035, 0.56, M.wood(0x3A3430)), 0, 0.42, -0.58);
    put(g, bx(2.5, 0.018, 0.04, M.wood(0x4A4438)), 0, 0.42, -0.33);
    [-0.55, 0.55].forEach(x => {
      put(g, bx(0.55, 0.34, 0.025, M.wood(0x333028)), x, 0.2, -0.33);
      put(g, bx(0.09, 0.022, 0.022, M.metal(0x888078)), x, 0.22, -0.31);
    });
    [-0.25, 0.25].forEach(x => {
      put(g, bx(0.02, 0.36, 0.48, M.wood(0x252018), false, false), x, 0.2, -0.58);
    });
    put(g, bx(0.48, 0.02, 0.44, M.wood(0x222018), false, true), 0, 0.2, -0.58);
    [-1.15, -0.4, 0.4, 1.15].forEach(x => {
      put(g, bx(0.06, 0.04, 0.06, M.wood(0x1A1810)), x, 0.02, -0.33);
    });
    for (let i = 0; i < 3; i++) {
      put(g, bx(0.13, 0.17, 0.015, M.plastic([0x003366, 0x333333, 0x660022][i])),
        -0.55 + i * 0.04, 0.12, -0.45);
    }
    put(g, bx(0.03, 0.15, 0.03, M.metal(0x555555)), 0.55, 0.12, -0.55);
    // RGB LED strip under TV unit — violet-blue
    put(g, bx(2.4, 0.015, 0.015, M.glow(0x5533DD, 0x4422CC, 0.8), false, false), 0, 0.015, -0.32);

    // ═══════════════════════════
    //  TV
    // ═══════════════════════════
    const tW = 1.85, tH = 1.05, tb = 0.02;
    put(g, bx(tW, tb, 0.05, M.plastic(0x080808)), 0, 0.44 + tH, -0.6);
    put(g, bx(tW, tb + 0.008, 0.05, M.plastic(0x080808)), 0, 0.44, -0.6);
    put(g, bx(tb, tH, 0.05, M.plastic(0x080808)), -tW / 2, 0.44 + tH / 2, -0.6);
    put(g, bx(tb, tH, 0.05, M.plastic(0x080808)), tW / 2, 0.44 + tH / 2, -0.6);
    put(g, bx(tW - 0.02, tH - 0.02, 0.025, M.plastic(0x0A0A0A)), 0, 0.44 + tH / 2, -0.63);
    put(g, bx(tW - tb * 2, tH - tb * 2, 0.018, M.screen(0x1A4A1A, 0x1A5A1A, 0.4)), 0, 0.44 + tH / 2, -0.58);

    // ── FIFA ON SCREEN ──
    // Pitch base
    put(g, bx(1.6, 0.85, 0.015, M.screen(0x1A6B2A, 0x1A7A2A, 0.45), false, false), 0, 0.94, -0.57);
    // Mowing stripes — 10 alternating strips for realism
    for (let i = 0; i < 10; i++) {
      const shade = i % 2 === 0 ? 0x1E7A30 : 0x166622;
      put(g, bx(1.55, 0.075, 0.012, M.screen(shade, shade, 0.15), false, false), 0, 0.56 + i * 0.078, -0.568);
    }
    // Darker edges for depth
    put(g, bx(1.58, 0.03, 0.012, M.screen(0x145518, 0x145518, 0.12), false, false), 0, 0.54, -0.568);
    put(g, bx(1.58, 0.03, 0.012, M.screen(0x145518, 0x145518, 0.12), false, false), 0, 1.34, -0.568);

    // Center circle — more segments for smoother look
    const circleSegs = 24;
    for (let i = 0; i < circleSegs; i++) {
      const a = (i / circleSegs) * Math.PI * 2;
      put(g, bx(0.015, 0.015, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.35), false, false),
        Math.cos(a) * 0.12, 0.94 + Math.sin(a) * 0.12, -0.565);
    }
    // Center line + spot
    put(g, bx(0.012, 0.75, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.25), false, false), 0, 0.94, -0.565);
    put(g, bx(0.02, 0.02, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.4), false, false), 0, 0.94, -0.565);
    // Touchlines + goal lines
    put(g, bx(1.5, 0.012, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.25), false, false), 0, 1.33, -0.565);
    put(g, bx(1.5, 0.012, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.25), false, false), 0, 0.55, -0.565);
    put(g, bx(0.012, 0.78, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.25), false, false), -0.75, 0.94, -0.565);
    put(g, bx(0.012, 0.78, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.25), false, false), 0.75, 0.94, -0.565);
    // Penalty areas + goal areas
    [-0.75, 0.75].forEach(side => {
      const s = side > 0 ? 1 : -1;
      // Penalty box
      put(g, bx(0.012, 0.4, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.22), false, false), side, 0.94, -0.565);
      put(g, bx(0.22, 0.012, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.22), false, false), side - s * 0.11, 1.14, -0.565);
      put(g, bx(0.22, 0.012, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.22), false, false), side - s * 0.11, 0.74, -0.565);
      // Six-yard box
      put(g, bx(0.012, 0.22, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.22), false, false), side - s * 0.08, 0.94, -0.565);
      put(g, bx(0.08, 0.012, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.22), false, false), side - s * 0.04, 1.05, -0.565);
      put(g, bx(0.08, 0.012, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.22), false, false), side - s * 0.04, 0.83, -0.565);
      // Penalty spot
      put(g, bx(0.012, 0.012, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.4), false, false), side - s * 0.16, 0.94, -0.565);
      // Goal net (subtle)
      put(g, bx(0.025, 0.15, 0.012, M.screen(0xCCCCCC, 0xBBBBBB, 0.15), false, false), side + s * 0.01, 0.94, -0.565);
    });
    // Corner arcs (quarter circles, 5 segments each)
    [[-0.75, 1.33], [0.75, 1.33], [-0.75, 0.55], [0.75, 0.55]].forEach(([cx, cy]) => {
      const sx = cx < 0 ? 1 : -1, sy = cy > 0.94 ? -1 : 1;
      for (let i = 0; i <= 4; i++) {
        const a = (i / 4) * Math.PI / 2;
        put(g, bx(0.01, 0.01, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.25), false, false),
          cx + Math.cos(a) * 0.035 * sx, cy + Math.sin(a) * 0.035 * sy, -0.565);
      }
    });

    // Players — more detailed with legs + shadows
    const mkPlayer = (x: number, y: number, jersey: number, jerseyE: number, shorts: number) => {
      // Shadow
      put(g, bx(0.03, 0.008, 0.012, M.screen(0x0A3A0A, 0x0A3A0A, 0.15), false, false), x, y - 0.025, -0.564);
      // Legs
      put(g, bx(0.008, 0.018, 0.012, M.screen(0xEEBB88, 0xDDAA77, 0.3), false, false), x - 0.006, y - 0.016, -0.562);
      put(g, bx(0.008, 0.018, 0.012, M.screen(0xEEBB88, 0xDDAA77, 0.3), false, false), x + 0.006, y - 0.016, -0.562);
      // Shorts
      put(g, bx(0.022, 0.012, 0.012, M.screen(shorts, shorts, 0.4), false, false), x, y - 0.002, -0.562);
      // Jersey
      put(g, bx(0.025, 0.03, 0.012, M.screen(jersey, jerseyE, 0.6), false, false), x, y + 0.015, -0.562);
      // Head
      put(g, bx(0.016, 0.016, 0.012, M.screen(0xEEBB88, 0xDDAA77, 0.35), false, false), x, y + 0.038, -0.562);
      // Hair
      put(g, bx(0.016, 0.006, 0.012, M.screen(0x221100, 0x221100, 0.2), false, false), x, y + 0.048, -0.562);
    };
    // Red team (home) — 4-3-3 ish formation
    [[-0.65, 0.94], [-0.45, 1.15], [-0.45, 0.73], [-0.42, 0.94],
     [-0.28, 1.08], [-0.28, 0.80], [-0.15, 0.94],
     [-0.35, 1.25], [-0.5, 0.65], [-0.2, 1.18]].forEach(([x, y]) => {
      mkPlayer(x, y, 0xDD2222, 0xCC1111, 0xEEEEEE);
    });
    // Blue team (away) — 4-3-3 ish
    [[0.65, 0.94], [0.45, 1.15], [0.45, 0.73], [0.42, 0.94],
     [0.28, 1.08], [0.28, 0.80], [0.15, 0.94],
     [0.35, 1.25], [0.5, 0.65], [0.2, 0.72]].forEach(([x, y]) => {
      mkPlayer(x, y, 0x2244DD, 0x1133CC, 0xEEEEEE);
    });
    // Goalkeepers
    mkPlayer(-0.72, 0.94, 0xFFCC00, 0xDDAA00, 0x222222);
    mkPlayer(0.72, 0.94, 0x44CC44, 0x33AA33, 0x222222);
    // Referee
    mkPlayer(0.02, 1.1, 0x111111, 0x111111, 0x111111);

    // Ball — store ref for animation
    const ball = put(g, bx(0.02, 0.02, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.9), false, false), -0.05, 0.92, -0.56);
    // Ball shadow
    put(g, bx(0.015, 0.008, 0.012, M.screen(0x0A3A0A, 0x0A3A0A, 0.2), false, false), -0.05, 0.905, -0.563);
    const baseBallX = -0.05, baseBallY = 0.92;

    // HUD — EA FC style scoreboard
    // Main scoreboard bar
    put(g, bx(0.6, 0.055, 0.012, M.screen(0x111111, 0x0A0A0A, 0.3), false, false), 0, 1.38, -0.564);
    // Home team badge + name
    put(g, bx(0.1, 0.04, 0.012, M.screen(0xDD2222, 0xCC1111, 0.55), false, false), -0.2, 1.38, -0.562);
    put(g, bx(0.04, 0.025, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.3), false, false), -0.16, 1.38, -0.561);
    // Score
    put(g, bx(0.035, 0.04, 0.012, M.screen(0x1A1A1A, 0x0A0A0A, 0.4), false, false), -0.08, 1.38, -0.562);
    put(g, bx(0.015, 0.025, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.7), false, false), -0.08, 1.38, -0.561);
    put(g, bx(0.008, 0.008, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.5), false, false), -0.045, 1.385, -0.561);
    put(g, bx(0.008, 0.008, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.5), false, false), -0.045, 1.375, -0.561);
    put(g, bx(0.035, 0.04, 0.012, M.screen(0x1A1A1A, 0x0A0A0A, 0.4), false, false), -0.01, 1.38, -0.562);
    put(g, bx(0.015, 0.025, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.7), false, false), -0.01, 1.38, -0.561);
    // Away team badge + name
    put(g, bx(0.1, 0.04, 0.012, M.screen(0x2244DD, 0x1133CC, 0.55), false, false), 0.1, 1.38, -0.562);
    put(g, bx(0.04, 0.025, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.3), false, false), 0.06, 1.38, -0.561);
    // Timer
    put(g, bx(0.06, 0.03, 0.012, M.screen(0x222222, 0x111111, 0.35), false, false), 0.25, 1.38, -0.562);
    put(g, bx(0.04, 0.018, 0.012, M.screen(0x44FF44, 0x33DD33, 0.5), false, false), 0.25, 1.38, -0.561);
    // EA FC logo placeholder
    put(g, bx(0.08, 0.025, 0.012, M.screen(0xFFCC00, 0xFFBB00, 0.4), false, false), -0.7, 1.38, -0.562);
    // Minimap
    put(g, bx(0.2, 0.1, 0.012, M.screen(0x0A3A0A, 0x0A3A0A, 0.3), false, false), 0.6, 0.56, -0.564);
    put(g, bx(0.18, 0.088, 0.012, M.screen(0x166622, 0x145518, 0.2), false, false), 0.6, 0.56, -0.563);
    // Minimap dots — home
    [[-0.04, 0.02], [-0.02, -0.02], [-0.03, 0.035], [-0.01, 0.0]].forEach(([dx, dy]) => {
      put(g, bx(0.008, 0.008, 0.012, M.screen(0xDD2222, 0xCC1111, 0.6), false, false), 0.6 + dx, 0.56 + dy, -0.562);
    });
    // Minimap dots — away
    [[0.04, -0.02], [0.02, 0.02], [0.03, -0.035], [0.01, 0.0]].forEach(([dx, dy]) => {
      put(g, bx(0.008, 0.008, 0.012, M.screen(0x2244DD, 0x1133CC, 0.6), false, false), 0.6 + dx, 0.56 + dy, -0.562);
    });
    // Minimap ball
    put(g, bx(0.006, 0.006, 0.012, M.screen(0xFFFFFF, 0xFFFFFF, 0.8), false, false), 0.6, 0.56, -0.561);

    // TV stand legs
    [-0.35, 0.35].forEach(x => {
      put(g, bx(0.04, 0.055, 0.08, M.metal(0x333333)), x, 0.41, -0.56);
      put(g, bx(0.12, 0.02, 0.1, M.metal(0x2A2A2A)), x, 0.385, -0.56);
    });

    // TV back panel — simple black
    put(g, bx(1.8, 1.0, 0.02, M.plastic(0x0A0A0A)), 0, 0.95, -0.68);

    // LED STRIP BEHIND TV — violet-blue
    const ledStripMeshes: THREE.Mesh[] = [];
    const topLed = put(g, bx(1.5, 0.035, 0.015, M.glow(0x5533DD, 0x6644EE, 1.5), false, false), 0, 1.4, -0.68);
    const botLed = put(g, bx(1.5, 0.035, 0.015, M.glow(0x5533DD, 0x6644EE, 1.5), false, false), 0, 0.5, -0.68);
    ledStripMeshes.push(topLed, botLed);
    [-0.75, 0.75].forEach(x => {
      const sideLed = put(g, bx(0.015, 0.9, 0.015, M.glow(0x5533DD, 0x6644EE, 1.2), false, false), x, 0.95, -0.68);
      ledStripMeshes.push(sideLed);
    });

    // SOUNDBAR
    put(g, bx(1.2, 0.06, 0.1, M.plastic(0x111111)), 0, 0.46, -0.38);
    for (let i = 0; i < 8; i++) {
      put(g, bx(0.015, 0.015, 0.008, M.plastic(0x333333), false, false), -0.4 + i * 0.11, 0.46, -0.33);
    }
    put(g, bx(0.4, 0.008, 0.008, M.glow(0x22CCFF, 0x11BBEE, 0.6), false, false), 0, 0.435, -0.33);

    // ═══════════════════════════
    //  PS5 CONSOLE
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

    // ── TABLE ITEMS — rearranged ──
    // Energy drink
    put(g, bx(0.08, 0.17, 0.08, M.plastic(0x111111)), 0.35, 0.44, 0.14);
    put(g, bx(0.08, 0.055, 0.08, M.plastic(0x3344CC)), 0.35, 0.41, 0.14);
    put(g, bx(0.08, 0.035, 0.08, M.plastic(0x22AA44)), 0.35, 0.48, 0.14);
    put(g, bx(0.065, 0.013, 0.065, M.metal(0xBBBBBB), false, false), 0.35, 0.53, 0.14);
    put(g, bx(0.14, 0.013, 0.14, M.wood(0x4A3A2A)), 0.35, 0.365, 0.14);

    // Game cases — angled casually
    [0x004488, 0x111111, 0xAA1111].forEach((c, i) => {
      const gc = bx(0.13, 0.18, 0.018, M.plastic(c));
      gc.position.set(-0.35 + i * 0.025, 0.45, 0.16 - i * 0.025);
      gc.rotation.y = i * 0.05;
      gc.castShadow = true; gc.receiveShadow = true; g.add(gc);
      const label = bx(0.11, 0.035, 0.013, M.plastic(0xDDDDDD));
      label.position.set(-0.35 + i * 0.025, 0.49, 0.16 - i * 0.025 + 0.004);
      label.rotation.y = i * 0.05;
      label.castShadow = false; label.receiveShadow = false; g.add(label);
    });

    // Snack bowl
    put(g, bx(0.16, 0.06, 0.16, M.plastic(0xDDCCBB)), 0.08, 0.39, 0.26);
    put(g, bx(0.12, 0.03, 0.12, M.plastic(0xF0A040), false, false), 0.08, 0.41, 0.26);

    // TV remote — moved closer to character
    put(g, bx(0.07, 0.02, 0.2, M.plastic(0x1A1A1A)), 0.12, 0.375, 0.08);
    put(g, bx(0.025, 0.008, 0.025, M.glow(0xFF1111, 0xDD0000, 0.4), false, false), 0.12, 0.386, 0.0);
    [0.02, 0.05, 0.08].forEach(z => {
      put(g, bx(0.02, 0.008, 0.02, M.plastic(0x333333), false, false), 0.12, 0.386, z);
    });

    // Phone
    put(g, bx(0.09, 0.012, 0.18, M.plastic(0x0A0A0A)), 0.15, 0.375, 0.38);
    put(g, bx(0.075, 0.005, 0.15, M.screen(0x112233, 0x112244, 0.2), false, false), 0.15, 0.382, 0.38);
    put(g, bx(0.012, 0.012, 0.15, M.plastic(0xDDDDDD), false, false), 0.15, 0.37, 0.48);

    // Spare controller — tossed aside with rotation
    const spareCtrl = bx(0.2, 0.04, 0.12, M.plastic(0x111111));
    spareCtrl.position.set(-0.30, 0.385, 0.36);
    spareCtrl.rotation.y = 0.3;
    spareCtrl.castShadow = true; spareCtrl.receiveShadow = true; g.add(spareCtrl);
    [-0.08, 0.08].forEach(x => {
      const grip = bx(0.05, 0.06, 0.06, M.plastic(0x151515));
      grip.position.set(-0.30 + x, 0.37, 0.4);
      grip.rotation.y = 0.3;
      grip.castShadow = true; grip.receiveShadow = true; g.add(grip);
    });

    // ═══════════════════════════
    //  COUCH — lifted cushion colors
    // ═══════════════════════════
    put(g, bx(1.85, 0.25, 0.72, M.fabric(0x2A3560)), 0, 0.3, 0.78);
    [-0.42, 0.42].forEach(x => {
      put(g, bx(0.78, 0.1, 0.62, M.fabric(0x3B4D80)), x, 0.47, 0.78);
      put(g, bx(0.004, 0.055, 0.54, M.fabric(0x2E3D6A), false, false), x, 0.47, 0.78);
    });
    put(g, bx(1.85, 0.62, 0.22, M.fabric(0x2A3560)), 0, 0.72, 1.14);
    [-0.42, 0.42].forEach(x => {
      put(g, bx(0.72, 0.5, 0.14, M.fabric(0x3B4D80)), x, 0.72, 1.07);
      [-0.15, 0.15].forEach(dy => {
        put(g, bx(0.025, 0.025, 0.01, M.fabric(0x2A3560), false, false), x, 0.72 + dy, 1.0);
      });
    });
    [-0.95, 0.95].forEach(x => {
      put(g, bx(0.18, 0.52, 0.72, M.fabric(0x2A3560)), x, 0.45, 0.8);
      put(g, bx(0.2, 0.055, 0.68, M.fabric(0x3B4D80)), x, 0.72, 0.8);
    });
    [[-0.8, 0.42], [0.8, 0.42], [-0.8, 1.14], [0.8, 1.14]].forEach(([x, z]) => {
      put(g, bx(0.08, 0.1, 0.08, M.wood(0x3A2818)), x, 0.05, z);
    });
    // Throw pillows — teal + gold (no orange competing with page bg)
    const pillow = bx(0.26, 0.22, 0.1, M.fabric(0x228899));
    pillow.position.set(0.58, 0.6, 0.76); pillow.rotation.z = 0.2; pillow.rotation.y = -0.15; g.add(pillow);
    const pillow2 = bx(0.22, 0.18, 0.09, M.fabric(0xAA8844));
    pillow2.position.set(-0.56, 0.58, 0.76); pillow2.rotation.z = -0.15; g.add(pillow2);
    // Blanket
    put(g, bx(0.22, 0.4, 0.08, M.fabric(0x444466)), 0.96, 0.55, 0.65);
    put(g, bx(0.15, 0.2, 0.06, M.fabric(0x3A3A55)), 0.98, 0.35, 0.6);

    // ═══════════════════════════
    //  SIDE TABLE + LAMP
    // ═══════════════════════════
    put(g, bx(0.35, 0.03, 0.35, M.wood(0x5A4A30)), -1.35, 0.52, 0.8);
    [[-1.48, 0.65], [-1.22, 0.65], [-1.48, 0.95], [-1.22, 0.95]].forEach(([x, z]) => {
      put(g, bx(0.035, 0.5, 0.035, M.metal(0x555555)), x, 0.26, z);
    });
    put(g, bx(0.1, 0.02, 0.1, M.metal(0x444444)), -1.35, 0.545, 0.8);
    put(g, bx(0.025, 0.2, 0.025, M.metal(0x555555)), -1.35, 0.65, 0.8);
    const lampShade = put(g, bx(0.14, 0.1, 0.14, M.fabric(0x555544)), -1.35, 0.79, 0.8);
    const lampBulb = put(g, bx(0.06, 0.04, 0.06, M.glow(0xFFDD88, 0xFFCC66, 0.6), false, false), -1.35, 0.76, 0.8);

    // Headset stand
    put(g, bx(0.08, 0.02, 0.08, M.metal(0x444444)), -1.35, 0.545, 0.68);
    put(g, bx(0.025, 0.2, 0.025, M.metal(0x666666)), -1.35, 0.65, 0.68);
    put(g, bx(0.06, 0.03, 0.04, M.metal(0x777777)), -1.35, 0.76, 0.68);

    // Slippers
    [-0.15, 0.15].forEach(x => {
      put(g, bx(0.1, 0.03, 0.18, M.fabric(0x5544AA)), x + 0.3, 0.015, 0.35);
    });

    // ═══════════════════════════════════
    //  CHARACTER
    // ═══════════════════════════════════
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

    // Torso — hoodie (store ref for breathing)
    const hoodieBody = put(ch, bx(0.36, 0.38, 0.24, M.fabric(0x1E1E22)), 0, 0.6, 0.76);
    put(ch, bx(0.26, 0.11, 0.035, M.fabric(0x252528)), 0, 0.5, 0.64);
    put(ch, bx(0.2, 0.004, 0.025, M.fabric(0x181818), false, false), 0, 0.56, 0.64);
    put(ch, bx(0.28, 0.12, 0.12, M.fabric(0x1C1C20)), 0, 0.78, 0.88);
    [-0.045, 0.045].forEach(x => {
      put(ch, bx(0.01, 0.11, 0.013, M.fabric(0x888888), false, false), x, 0.7, 0.64);
      put(ch, bx(0.013, 0.018, 0.013, M.metal(0xAAAA88), false, false), x, 0.64, 0.64);
    });
    [-0.12, 0.12].forEach(x => {
      put(ch, bx(0.004, 0.3, 0.2, M.fabric(0x181818), false, false), x, 0.6, 0.76);
    });
    put(ch, bx(0.008, 0.3, 0.012, M.metal(0x555555), false, false), 0, 0.6, 0.64);
    put(ch, bx(0.05, 0.04, 0.008, M.fabric(0x333336), false, false), 0.08, 0.65, 0.64);

    // Shoulders
    [-0.24, 0.24].forEach(x => {
      put(ch, bx(0.12, 0.11, 0.2, M.fabric(0x1E1E22)), x, 0.72, 0.76);
    });

    // Arms + controller group (store for animation)
    const controllerGroup = new THREE.Group();
    [-0.24, 0.24].forEach(x => {
      put(controllerGroup, bx(0.1, 0.12, 0.1, M.fabric(0x1E1E22)), x, 0.62, 0.62);
      put(controllerGroup, bx(0.1, 0.075, 0.24, M.fabric(0x1E1E22)), x, 0.56, 0.48);
      put(controllerGroup, bx(0.105, 0.025, 0.06, M.fabric(0x252528), false, false), x, 0.56, 0.36);
    });

    // DualSense
    put(controllerGroup, bx(0.38, 0.07, 0.22, M.plastic(0xE0E0DC)), 0, 0.54, 0.36);
    put(controllerGroup, bx(0.15, 0.045, 0.04, M.plastic(0x9AA0C0)), 0, 0.565, 0.28);
    [-0.16, 0.16].forEach(x => {
      put(controllerGroup, bx(0.1, 0.12, 0.12, M.plastic(0xD4D4D0)), x, 0.49, 0.38);
      put(controllerGroup, bx(0.08, 0.003, 0.08, M.plastic(0xC8C8C4), false, false), x, 0.46, 0.38);
      put(controllerGroup, bx(0.08, 0.003, 0.08, M.plastic(0xC8C8C4), false, false), x, 0.48, 0.38);
    });
    [[0.03, 0.035], [0.06, 0], [0.03, -0.035], [0, 0]].forEach(([dx, dz]) => {
      put(controllerGroup, bx(0.022, 0.014, 0.022, M.plastic(0x8888CC), false, false), 0.13 + dx, 0.565, 0.36 + dz);
    });
    put(controllerGroup, bx(0.04, 0.014, 0.08, M.plastic(0xCCCCC8), false, false), -0.13, 0.565, 0.36);
    put(controllerGroup, bx(0.08, 0.014, 0.04, M.plastic(0xCCCCC8), false, false), -0.13, 0.565, 0.36);
    [-0.07, 0.07].forEach(x => {
      put(controllerGroup, bx(0.035, 0.018, 0.035, M.plastic(0x333333), false, false), x, 0.568, 0.42);
    });
    put(controllerGroup, bx(0.18, 0.01, 0.018, M.glow(0x0088FF, 0x0066CC, 1.2), false, false), 0, 0.565, 0.26);
    put(controllerGroup, bx(0.028, 0.016, 0.028, M.glow(0x4488FF, 0x2266DD, 0.5), false, false), 0, 0.565, 0.44);
    [-0.06, 0.06].forEach(x => {
      put(controllerGroup, bx(0.025, 0.012, 0.015, M.plastic(0xBBBBBB), false, false), x, 0.565, 0.3);
    });
    [-0.15, 0.15].forEach(x => {
      put(controllerGroup, bx(0.08, 0.015, 0.04, M.plastic(0xCCCCC8), false, false), x, 0.575, 0.28);
    });

    // Hands
    [-0.24, 0.24].forEach(x => {
      put(controllerGroup, bx(0.1, 0.09, 0.11, M.skin(0xECB896)), x, 0.54, 0.32);
      put(controllerGroup, bx(0.06, 0.04, 0.06, M.skin(0xE0AC88), false, false), x, 0.56, 0.38);
      put(controllerGroup, bx(0.08, 0.04, 0.06, M.skin(0xE0AC88), false, false), x * 0.7, 0.5, 0.38);
    });

    ch.add(controllerGroup);

    // ── HEAD ──
    const head = new THREE.Group();
    put(head, bx(0.12, 0.06, 0.1, M.skin(0xE8B090)), 0, 0.82, 0.76);
    put(head, bx(0.4, 0.4, 0.38, M.skin(0xECB896)), 0, 1.0, 0.74);

    [-0.21, 0.21].forEach(x => {
      put(head, bx(0.04, 0.1, 0.09, M.skin(0xE0AA88)), x, 1.0, 0.74);
      put(head, bx(0.015, 0.06, 0.05, M.skin(0xDCA080), false, false), x, 1.0, 0.74);
    });
    [-0.075, 0.075].forEach(x => {
      put(head, bx(0.08, 0.07, 0.02, M.plastic(0xFFFFFF), false, false), x, 1.01, 0.55);
      put(head, bx(0.05, 0.055, 0.02, M.plastic(0x2A1A0A), false, false), x, 1.005, 0.545);
      put(head, bx(0.025, 0.03, 0.02, M.plastic(0x0A0A0A), false, false), x, 1.0, 0.54);
      put(head, bx(0.015, 0.015, 0.015, M.plastic(0xFFFFFF), false, false), x + 0.015, 1.02, 0.535);
      put(head, bx(0.07, 0.008, 0.015, M.skin(0xDCA080), false, false), x, 0.975, 0.545);
    });
    put(head, bx(0.08, 0.02, 0.025, M.skin(0x120A04), false, false), -0.075, 1.05, 0.555);
    const rBrow = bx(0.08, 0.02, 0.025, M.skin(0x120A04));
    rBrow.position.set(0.075, 1.055, 0.555); rBrow.rotation.z = -0.08;
    rBrow.castShadow = false; rBrow.receiveShadow = false; head.add(rBrow);
    put(head, bx(0.03, 0.04, 0.03, M.skin(0xDEA880), false, false), 0, 0.965, 0.55);
    put(head, bx(0.04, 0.015, 0.02, M.skin(0xD6A078), false, false), 0, 0.95, 0.555);
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
      put(head, bx(0.06, 0.24, 0.32, M.skin(0x0C0604)), x, 1.04, 0.75);
    });
    put(head, bx(0.38, 0.26, 0.06, M.skin(0x0A0502)), 0, 1.04, 0.96);

    // Headphones
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
    put(head, bx(0.015, 0.08, 0.015, M.plastic(0x777777)), -0.26, 0.94, 0.68);
    put(head, bx(0.025, 0.025, 0.025, M.plastic(0x555555)), -0.26, 0.9, 0.68);

    ch.add(head);
    ch.position.set(0, 0.08, 0);
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

      // PS5 LED pulse
      (ps5Led.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.7 + Math.sin(t * 1.0) * 0.4;

      // LED strip color cycling (blue to violet)
      const hue = 0.72 + Math.sin(t * 0.2) * 0.06;
      ledStripLight.color.setHSL(hue, 0.8, 0.45);
      ledStripMeshes.forEach(mesh => {
        (mesh.material as THREE.MeshStandardMaterial).color.setHSL(hue, 0.7, 0.4);
        (mesh.material as THREE.MeshStandardMaterial).emissive.setHSL(hue, 0.8, 0.45);
      });

      // TV glow variation
      tvGlow.intensity = 0.6 + Math.sin(t * 1.3) * 0.15;

      // Controller tilt — playing animation
      controllerGroup.rotation.z = Math.sin(t * 2.5) * 0.03;
      controllerGroup.rotation.x = Math.sin(t * 1.8) * 0.015;

      // Head tracking game — quicker movements
      head.rotation.y = Math.sin(t * 0.8) * 0.04 + Math.sin(t * 2.0) * 0.015;
      head.rotation.x = Math.sin(t * 0.5) * 0.02;

      // Breathing
      hoodieBody.scale.y = 1.0 + Math.sin(t * 1.0) * 0.01;

      // FIFA ball movement — slow figure-8
      ball.position.x = baseBallX + Math.sin(t * 0.6) * 0.3;
      ball.position.y = baseBallY + Math.sin(t * 0.9) * 0.15;

      // Lamp glow flicker
      (lampBulb.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5 + Math.sin(t * 0.4) * 0.1;

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
