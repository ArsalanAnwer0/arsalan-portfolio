import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const easeOutCirc = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 4));

const DeskScene = () => {
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
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(26, W / H, 0.1, 100);
    camera.position.set(6, 4.8, 6);
    camera.lookAt(0, 0.55, 0);

    // ── LIGHTING ──
    scene.add(new THREE.AmbientLight(0xfff5eb, 0.5));
    const mainLight = new THREE.DirectionalLight(0xfff8f0, 1.2);
    mainLight.position.set(5, 10, 6);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.set(2048, 2048);
    mainLight.shadow.camera.left = -6; mainLight.shadow.camera.right = 6;
    mainLight.shadow.camera.top = 6; mainLight.shadow.camera.bottom = -6;
    mainLight.shadow.radius = 5; mainLight.shadow.bias = -0.0003;
    scene.add(mainLight);
    const fillLight = new THREE.DirectionalLight(0xc0d8ff, 0.3);
    fillLight.position.set(-4, 4, -3); scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0xffe0c0, 0.2);
    rimLight.position.set(-3, 2, 5); scene.add(rimLight);
    // Floor bounce light
    const bounceLight = new THREE.DirectionalLight(0xFFE8D0, 0.08);
    bounceLight.position.set(0, -2, 0); scene.add(bounceLight);

    // Screen glows
    const monGlow1 = new THREE.PointLight(0x4488CC, 0.4, 3.5);
    monGlow1.position.set(-0.42, 1.1, 0); scene.add(monGlow1);
    const monGlow2 = new THREE.PointLight(0x4488CC, 0.4, 3.5);
    monGlow2.position.set(0.42, 1.1, 0); scene.add(monGlow2);

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
    //  FLOOR — cooler ash-gray planks
    // ═══════════════════════════
    for (let i = 0; i < 5; i++) {
      const shade = i % 2 === 0 ? 0x9B9080 : 0x8E8575;
      put(g, bx(2.6, 0.02, 0.35, M.wood(shade), false, true), 0, 0.0, -0.5 + i * 0.35);
      put(g, bx(2.6, 0.021, 0.008, M.wood(0x6B6050), false, false), 0, 0.001, -0.325 + i * 0.35);
    }

    // ═══════════════════════════
    //  DESK — lighter birch tone
    // ═══════════════════════════
    put(g, bx(2.8, 0.06, 1.2, M.wood(0xD4B897)), 0, 0.54, 0);
    for (let i = 0; i < 7; i++) {
      const shade = i % 2 === 0 ? 0xD8BFA0 : 0xCCAA88;
      put(g, bx(2.76, 0.005, 0.16, M.wood(shade), false, false), 0, 0.572, -0.48 + i * 0.16);
    }
    put(g, bx(2.8, 0.03, 0.04, M.wood(0xC0996A)), 0, 0.52, 0.6);
    put(g, bx(2.8, 0.03, 0.04, M.wood(0xC0996A)), 0, 0.52, -0.58);
    [-1.35, 1.35].forEach(x => put(g, bx(0.06, 0.54, 1.16, M.wood(0xBB9060)), x, 0.27, 0));
    put(g, bx(2.64, 0.5, 0.04, M.wood(0xA88050)), 0, 0.27, -0.56);

    // Drawer unit
    put(g, bx(0.55, 0.46, 1.1, M.wood(0xC49B70)), 1.02, 0.26, 0);
    [0.4, 0.24, 0.08].forEach(y => {
      put(g, bx(0.48, 0.12, 0.04, M.wood(0xD0A578)), 1.02, y, 0.54);
      put(g, bx(0.14, 0.025, 0.025, M.metal(0xC0B090)), 1.02, y, 0.565);
    });

    // Cable management tray
    put(g, bx(1.2, 0.04, 0.15, M.metal(0x444444)), 0, 0.5, -0.48);

    // ═══════════════════════════
    //  DUAL MONITORS — centered symmetrically
    // ═══════════════════════════
    const buildMon = (cx: number, scrColor: number) => {
      const mW = 0.82, mH = 0.58;
      put(g, bx(mW, mH, 0.05, M.plastic(0x0E0E0E)), cx, 0.58 + mH / 2, -0.44);
      put(g, bx(mW - 0.05, mH - 0.05, 0.02, M.screen(0x0C1A30, scrColor, 0.55)), cx, 0.58 + mH / 2, -0.42);
      put(g, bx(mW, 0.04, 0.05, M.plastic(0x0E0E0E)), cx, 0.58, -0.44);
      put(g, bx(0.12, 0.32, 0.12, M.metal(0x999999)), cx, 0.4, -0.44);
      put(g, bx(0.5, 0.03, 0.28, M.metal(0xAAAAAA)), cx, 0.27, -0.44);
      put(g, bx(0.44, 0.02, 0.22, M.metal(0x888888)), cx, 0.26, -0.44);
    };

    // Left monitor — IDE (cx = -0.42)
    buildMon(-0.42, 0x0F1B30);
    put(g, bx(0.06, 0.48, 0.012, M.screen(0x1E1E2E, 0x1E1E2E, 0.2), false, false), -0.78, 0.87, -0.41);
    for (let i = 0; i < 6; i++) {
      put(g, bx(0.02, 0.012, 0.012, M.screen(0x5588CC, 0x5588CC, 0.3), false, false), -0.78, 1.05 - i * 0.04, -0.408);
    }
    put(g, bx(0.7, 0.025, 0.012, M.screen(0x252535, 0x252535, 0.15), false, false), -0.42, 1.115, -0.41);
    put(g, bx(0.12, 0.025, 0.012, M.screen(0x1E1E2E, 0x2A2A3A, 0.25), false, false), -0.62, 1.115, -0.408);
    put(g, bx(0.7, 0.02, 0.012, M.screen(0x0066AA, 0x0055AA, 0.35), false, false), -0.42, 0.62, -0.41);
    for (let row = 0; row < 8; row++) {
      const lineY = 1.06 - row * 0.05;
      const indent = (row % 3) * 0.04;
      const colors = [0x569CD6, 0x4EC9B0, 0xDCDCAA, 0xCE9178, 0x9CDCFE, 0xC586C0, 0x4FC1FF, 0xD4D4D4];
      const lw = 0.12 + Math.sin(row * 2.1) * 0.08;
      put(g, bx(0.015, 0.014, 0.012, M.screen(0x5A5A7A, 0x5A5A7A, 0.15), false, false), -0.74, lineY, -0.41);
      put(g, bx(lw, 0.014, 0.012, M.screen(colors[row], colors[row], 0.4), false, false),
        -0.70 + indent + lw / 2, lineY, -0.41);
      if (row % 2 === 0) {
        const lw2 = 0.06 + Math.sin(row) * 0.03;
        put(g, bx(lw2, 0.014, 0.012, M.screen(0x9CDCFE, 0x9CDCFE, 0.3), false, false),
          -0.70 + indent + lw + 0.02 + lw2 / 2, lineY, -0.41);
      }
      if (row % 3 === 1) {
        put(g, bx(0.05, 0.014, 0.012, M.screen(0xCE9178, 0xCE9178, 0.3), false, false), -0.34, lineY, -0.41);
      }
    }

    // Right monitor — terminal (cx = 0.42)
    buildMon(0.42, 0x0A1A18);
    put(g, bx(0.7, 0.025, 0.012, M.screen(0x1A2A28, 0x1A2A28, 0.15), false, false), 0.42, 1.115, -0.41);
    [0xFF5F56, 0xFFBD2E, 0x27C93F].forEach((c, i) => {
      put(g, bx(0.012, 0.012, 0.012, M.screen(c, c, 0.5), false, false), 0.10 + i * 0.02, 1.115, -0.408);
    });
    for (let row = 0; row < 8; row++) {
      const lineY = 1.06 - row * 0.05;
      const lw = 0.15 + Math.sin(row * 1.7) * 0.1;
      if (row % 3 === 0) {
        put(g, bx(0.02, 0.014, 0.012, M.screen(0x88AAFF, 0x88AAFF, 0.5), false, false), 0.12, lineY, -0.41);
      }
      put(g, bx(lw, 0.014, 0.012, M.screen(0x44CC66, 0x33BB55, 0.4), false, false),
        0.16 + lw / 2, lineY, -0.41);
      if (row % 2 === 1) {
        put(g, bx(0.08, 0.014, 0.012, M.screen(0xCCCC66, 0xBBBB55, 0.3), false, false),
          0.16 + lw + 0.06, lineY, -0.41);
      }
    }
    // Cursor
    const cursor = put(g, bx(0.008, 0.016, 0.012, M.screen(0x44CC66, 0x33FF55, 0.8), false, false), 0.14, 0.66, -0.41);

    // Webcam
    put(g, bx(0.035, 0.025, 0.03, M.plastic(0x111111), false, false), -0.42, 1.19, -0.43);
    put(g, bx(0.015, 0.015, 0.018, M.glow(0x22AA44, 0x22CC44, 0.6), false, false), -0.42, 1.19, -0.42);

    // Monitor light bar
    put(g, bx(0.6, 0.025, 0.04, M.plastic(0x222222)), -0.42, 1.2, -0.43);
    put(g, bx(0.5, 0.008, 0.015, M.glow(0xFFEECC, 0xFFDDBB, 0.4), false, false), -0.42, 1.19, -0.41);

    // LED strip — softer for professional
    put(g, bx(1.8, 0.015, 0.02, M.glow(0x5577CC, 0x4466BB, 0.4), false, false), 0, 0.57, -0.36);

    // ═══════════════════════════
    //  LAPTOP
    // ═══════════════════════════
    put(g, bx(0.46, 0.024, 0.32, M.plastic(0x3A3A3A)), -1.0, 0.575, 0.14);
    for (let r = 0; r < 4; r++)
      for (let c = 0; c < 10; c++)
        put(g, bx(0.025, 0.004, 0.025, M.plastic(0x2A2A2A), false, false), -1.18 + c * 0.035, 0.589, 0.04 + r * 0.035);
    put(g, bx(0.13, 0.004, 0.09, M.plastic(0x4A4A4A), false, false), -1.0, 0.588, 0.24);
    const ls = bx(0.44, 0.32, 0.015, M.plastic(0x333333));
    ls.position.set(-1.0, 0.78, -0.07); ls.rotation.x = -0.26; g.add(ls);
    const ld = bx(0.38, 0.26, 0.008, M.screen(0x0A1828, 0x0E2040, 0.35));
    ld.position.set(-1.0, 0.78, -0.06); ld.rotation.x = -0.26; g.add(ld);
    const logo = bx(0.04, 0.05, 0.008, M.glow(0xCCCCCC, 0xBBBBBB, 0.15));
    logo.position.set(-1.0, 0.78, -0.08); logo.rotation.x = -0.26; g.add(logo);

    // ═══════════════════════════
    //  DESK MAT — wider, centered
    // ═══════════════════════════
    put(g, bx(1.2, 0.006, 0.5, M.fabric(0x22222E)), 0.12, 0.555, 0.16);
    put(g, bx(1.2, 0.007, 0.008, M.fabric(0x333355), false, false), 0.12, 0.556, 0.41);
    put(g, bx(1.2, 0.007, 0.008, M.fabric(0x333355), false, false), 0.12, 0.556, -0.09);

    // ═══════════════════════════
    //  KEYBOARD
    // ═══════════════════════════
    put(g, bx(0.56, 0.03, 0.22, M.plastic(0x0E0E0E)), 0.06, 0.568, 0.16);
    put(g, bx(0.56, 0.04, 0.03, M.plastic(0x0E0E0E)), 0.06, 0.572, 0.28);
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 14; c++) {
        const kc = (r === 0 && c < 4) ? 0x4466AA : (r === 0 && c === 13) ? 0xAA3333 : 0x2A2A2A;
        put(g, bx(0.028, 0.014, 0.028, M.plastic(kc), false, false),
          -0.2 + c * 0.034, 0.585, 0.08 + r * 0.034);
      }
    }
    put(g, bx(0.16, 0.014, 0.028, M.plastic(0x2A2A2A), false, false), 0.06, 0.585, 0.25);
    put(g, bx(0.015, 0.015, 0.08, M.plastic(0x222222), false, false), 0.06, 0.565, 0.3);

    // ═══════════════════════════
    //  MOUSE
    // ═══════════════════════════
    put(g, bx(0.09, 0.035, 0.15, M.plastic(0x1C1C1C)), 0.52, 0.575, 0.16);
    put(g, bx(0.09, 0.015, 0.08, M.plastic(0x252525)), 0.52, 0.595, 0.12);
    put(g, bx(0.02, 0.02, 0.03, M.plastic(0x555555), false, false), 0.52, 0.6, 0.1);
    put(g, bx(0.003, 0.012, 0.06, M.plastic(0x333333), false, false), 0.52, 0.598, 0.12);
    put(g, bx(0.005, 0.01, 0.1, M.glow(0x44AAFF, 0x3388DD, 0.5), false, false), 0.565, 0.58, 0.15);

    // ═══════════════════════════
    //  COFFEE MUG
    // ═══════════════════════════
    put(g, bx(0.16, 0.2, 0.16, M.plastic(0xF2EDE5)), -0.55, 0.66, 0.35);
    put(g, bx(0.17, 0.02, 0.17, M.plastic(0xE8E0D5)), -0.55, 0.76, 0.35);
    put(g, bx(0.06, 0.1, 0.07, M.plastic(0xE8E0D5)), -0.64, 0.67, 0.35);
    put(g, bx(0.13, 0.015, 0.13, M.plastic(0x2A1200), false, false), -0.55, 0.75, 0.35);
    put(g, bx(0.165, 0.04, 0.008, M.plastic(0x2A5B99), false, false), -0.55, 0.67, 0.27);
    // Steam — store refs for animation
    const steamWisps: THREE.Mesh[] = [];
    const baseSteamY: number[] = [];
    const baseSteamX: number[] = [];
    [0, 0.04, -0.03].forEach((xOff, i) => {
      const yPos = 0.8 + i * 0.035;
      const xPos = -0.55 + xOff;
      const wisp = put(g, bx(0.012, 0.05, 0.012,
        new THREE.MeshStandardMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.12 + i * 0.03, roughness: 1 }),
        false, false), xPos, yPos, 0.35);
      steamWisps.push(wisp);
      baseSteamY.push(yPos);
      baseSteamX.push(xPos);
    });
    put(g, bx(0.2, 0.008, 0.2, M.wood(0x6B5A48)), -0.55, 0.555, 0.35);

    // ═══════════════════════════
    //  PLANT
    // ═══════════════════════════
    put(g, bx(0.15, 0.04, 0.15, M.plastic(0xC07040)), 1.1, 0.555, -0.38);
    put(g, bx(0.17, 0.06, 0.17, M.plastic(0xC87545)), 1.1, 0.59, -0.38);
    put(g, bx(0.19, 0.04, 0.19, M.plastic(0xB86535)), 1.1, 0.62, -0.38);
    put(g, bx(0.14, 0.015, 0.14, M.wood(0x3A2A1A), false, false), 1.1, 0.635, -0.38);
    put(g, bx(0.04, 0.12, 0.04, M.wood(0x5A3A1A)), 1.1, 0.7, -0.38);
    const leafColors = [0x2A7518, 0x338820, 0x2E8848, 0x2E8A1E, 0x3C9A28];
    const leafPositions: [number, number, number][] = [
      [0, 0.1, 0], [0.08, 0.06, 0.05], [-0.07, 0.07, -0.04],
      [0.05, 0.08, -0.06], [-0.06, 0.05, 0.07], [0, 0.12, -0.04],
      [0.06, 0.09, 0.03], [-0.04, 0.11, 0.02],
    ];
    leafPositions.forEach(([dx, dy, dz], i) => {
      put(g, bx(0.08, 0.06, 0.08, M.plastic(leafColors[i % leafColors.length])),
        1.1 + dx, 0.78 + dy, -0.38 + dz);
    });

    // ═══════════════════════════
    //  BOOKS
    // ═══════════════════════════
    [0x1E4488, 0xCC2233, 0x1A6644, 0x885522].forEach((c, i) => {
      put(g, bx(0.22, 0.035, 0.16, M.plastic(c)), -0.35, 0.575 + i * 0.038, -0.42);
      put(g, bx(0.2, 0.028, 0.01, M.plastic(0xF0E8D8), false, false), -0.35, 0.575 + i * 0.038, -0.35);
      put(g, bx(0.1, 0.008, 0.012, M.plastic(0xDDDDDD), false, false), -0.35, 0.575 + i * 0.038, -0.5);
    });

    // Sticky notes — moved between monitor stands
    put(g, bx(0.11, 0.11, 0.005, M.plastic(0xFFE66B), false, false), 0.3, 0.7, -0.35);
    put(g, bx(0.09, 0.09, 0.005, M.plastic(0xFF88AA), false, false), 0.38, 0.68, -0.35);
    put(g, bx(0.06, 0.008, 0.005, M.plastic(0x333333), false, false), 0.3, 0.72, -0.348);
    put(g, bx(0.04, 0.008, 0.005, M.plastic(0x333333), false, false), 0.3, 0.7, -0.348);

    // Pen holder — grouped with books
    put(g, bx(0.11, 0.15, 0.11, M.metal(0x666666)), -0.50, 0.64, -0.30);
    [0x2244AA, 0xCC2222, 0x111111].forEach((c, i) => {
      const pen = bx(0.018, 0.13, 0.018, M.plastic(c), false, false);
      pen.position.set(-0.50 + (i - 1) * 0.028, 0.75, -0.30);
      pen.rotation.z = (i - 1) * 0.1; g.add(pen);
    });

    // ═══════════════════════════
    //  HEADPHONE STAND
    // ═══════════════════════════
    put(g, bx(0.12, 0.02, 0.12, M.wood(0x4A3828)), -0.85, 0.56, -0.35);
    put(g, bx(0.03, 0.28, 0.03, M.metal(0x888888)), -0.85, 0.7, -0.35);
    put(g, bx(0.08, 0.04, 0.06, M.metal(0x999999)), -0.85, 0.86, -0.35);

    // ═══════════════════════════
    //  OFFICE CHAIR
    // ═══════════════════════════
    put(g, bx(0.54, 0.06, 0.48, M.fabric(0x1A1A1A)), 0.06, 0.36, 0.78);
    put(g, bx(0.48, 0.04, 0.42, M.fabric(0x282828)), 0.06, 0.4, 0.78);
    put(g, bx(0.52, 0.55, 0.06, M.fabric(0x1A1A1A)), 0.06, 0.7, 1.04);
    put(g, bx(0.46, 0.46, 0.04, M.fabric(0x282828)), 0.06, 0.7, 1.02);
    put(g, bx(0.32, 0.12, 0.05, M.fabric(0x1A1A1A)), 0.06, 1.04, 1.04);
    put(g, bx(0.28, 0.08, 0.04, M.fabric(0x282828)), 0.06, 1.04, 1.02);
    put(g, bx(0.04, 0.06, 0.04, M.plastic(0x333333)), 0.06, 0.98, 1.04);
    put(g, bx(0.3, 0.1, 0.04, M.fabric(0x2A2A2A)), 0.06, 0.52, 1.0);
    [-0.28, 0.34].forEach(x => {
      put(g, bx(0.04, 0.2, 0.04, M.plastic(0x333333)), x, 0.36, 0.78);
      put(g, bx(0.08, 0.035, 0.26, M.plastic(0x2A2A2A)), x, 0.48, 0.76);
    });
    put(g, bx(0.06, 0.3, 0.06, M.metal(0x555555)), 0.06, 0.14, 0.78);

    // ═══════════════════════════════════
    //  CHARACTER
    // ═══════════════════════════════════
    const ch = new THREE.Group();

    // Shoes
    [-0.1, 0.1].forEach(x => {
      put(ch, bx(0.13, 0.06, 0.2, M.plastic(0x1A1A1A)), x + 0.06, 0.03, 0.9);
      put(ch, bx(0.14, 0.02, 0.21, M.plastic(0x333333), false, false), x + 0.06, 0.005, 0.9);
      put(ch, bx(0.12, 0.008, 0.18, M.plastic(0xEEEEEE), false, false), x + 0.06, 0.002, 0.9);
    });

    // Legs
    [-0.1, 0.1].forEach(x => {
      put(ch, bx(0.14, 0.3, 0.14, M.fabric(0x1C2C48)), x + 0.06, 0.2, 0.78);
    });

    // Belt
    put(ch, bx(0.34, 0.03, 0.22, M.plastic(0x1A1200)), 0.06, 0.38, 0.74);
    put(ch, bx(0.04, 0.025, 0.02, M.metal(0xCCBB88), false, false), 0.06, 0.38, 0.63);

    // Torso — store ref for breathing
    const torso = put(ch, bx(0.34, 0.32, 0.24, M.fabric(0x2D6EB0)), 0.06, 0.54, 0.72);
    put(ch, bx(0.2, 0.06, 0.16, M.fabric(0xF5F0EA)), 0.06, 0.7, 0.65);
    [0.6, 0.54, 0.48].forEach(y => {
      put(ch, bx(0.02, 0.02, 0.01, M.plastic(0xDDD8D0), false, false), 0.06, y, 0.6);
    });
    put(ch, bx(0.06, 0.05, 0.008, M.fabric(0x2668A8), false, false), -0.06, 0.58, 0.6);

    // Shoulders + arms — grouped for typing animation
    const armGroups: THREE.Group[] = [];
    [-0.24, 0.3].forEach((x, idx) => {
      // Shoulder stays on character (doesn't move)
      put(ch, bx(0.12, 0.1, 0.2, M.fabric(0x2D6EB0)), x, 0.66, 0.72);

      // Arm group — everything below shoulder moves together
      const armG = new THREE.Group();
      // Upper arm
      put(armG, bx(0.11, 0.15, 0.11, M.fabric(0x2D6EB0)), x, 0.59, 0.6);
      // Forearm
      put(armG, bx(0.11, 0.08, 0.26, M.fabric(0x2D6EB0)), x, 0.56, 0.43);
      // Cuff
      put(armG, bx(0.115, 0.025, 0.12, M.fabric(0x2460A0), false, false), x, 0.59, 0.54);
      // Hand
      put(armG, bx(0.1, 0.06, 0.1, M.skin(0xECB896)), x, 0.57, 0.28);
      // Fingers
      put(armG, bx(0.08, 0.035, 0.06, M.skin(0xE0AC88), false, false), x, 0.565, 0.22);
      // Watch on left arm
      if (idx === 0) {
        put(armG, bx(0.05, 0.04, 0.06, M.plastic(0x222222)), x, 0.57, 0.36);
        put(armG, bx(0.03, 0.03, 0.01, M.screen(0x223344, 0x224466, 0.3), false, false), x, 0.575, 0.33);
      }
      ch.add(armG);
      armGroups.push(armG);
    });

    // ── HEAD ──
    const head = new THREE.Group();
    put(head, bx(0.12, 0.06, 0.1, M.skin(0xE8B090)), 0.06, 0.75, 0.68);
    put(head, bx(0.4, 0.4, 0.38, M.skin(0xECB896)), 0.06, 0.96, 0.66);

    [-0.06, 0.18].forEach(x => {
      put(head, bx(0.08, 0.07, 0.02, M.plastic(0xFFFFFF), false, false), x, 0.97, 0.47);
      put(head, bx(0.05, 0.055, 0.02, M.plastic(0x3A2510), false, false), x, 0.965, 0.465);
      put(head, bx(0.03, 0.035, 0.02, M.plastic(0x0A0A0A), false, false), x, 0.96, 0.46);
      put(head, bx(0.016, 0.016, 0.015, M.plastic(0xFFFFFF), false, false), x + 0.015, 0.98, 0.455);
      put(head, bx(0.07, 0.008, 0.015, M.skin(0xDCA080), false, false), x, 0.935, 0.465);
    });
    [-0.06, 0.18].forEach(x => {
      put(head, bx(0.08, 0.02, 0.025, M.skin(0x120A04), false, false), x, 1.01, 0.475);
    });
    put(head, bx(0.035, 0.045, 0.03, M.skin(0xDEA880), false, false), 0.06, 0.92, 0.465);
    put(head, bx(0.06, 0.015, 0.015, M.skin(0xCC8870), false, false), 0.06, 0.88, 0.47);
    [-0.035, 0.035].forEach(dx => {
      put(head, bx(0.015, 0.012, 0.015, M.skin(0xCC8870), false, false), 0.06 + dx, 0.884, 0.47);
    });
    [-0.15, 0.27].forEach(x => {
      put(head, bx(0.04, 0.1, 0.09, M.skin(0xE0AA88)), x, 0.96, 0.66);
      put(head, bx(0.015, 0.06, 0.05, M.skin(0xDCA080), false, false), x, 0.96, 0.66);
    });

    // Hair
    put(head, bx(0.42, 0.12, 0.4, M.skin(0x0C0604)), 0.06, 1.14, 0.65);
    put(head, bx(0.4, 0.1, 0.06, M.skin(0x100806)), 0.06, 1.06, 0.48);
    put(head, bx(0.32, 0.06, 0.05, M.skin(0x0E0604)), 0.06, 1.02, 0.465);
    [-0.15, 0.27].forEach(x => put(head, bx(0.06, 0.24, 0.34, M.skin(0x0C0604)), x, 1.0, 0.67));
    put(head, bx(0.38, 0.24, 0.06, M.skin(0x0A0502)), 0.06, 1.0, 0.88);
    put(head, bx(0.06, 0.06, 0.05, M.skin(0x0E0806)), 0.15, 1.18, 0.5);

    // Headphones
    put(head, bx(0.48, 0.04, 0.065, M.metal(0xAAAAAA)), 0.06, 1.2, 0.66);
    put(head, bx(0.34, 0.03, 0.055, M.fabric(0x999999), false, false), 0.06, 1.19, 0.66);
    [-0.2, 0.32].forEach(x => {
      put(head, bx(0.04, 0.22, 0.045, M.metal(0x999999)), x, 1.06, 0.66);
    });
    [-0.23, 0.35].forEach(x => {
      put(head, bx(0.07, 0.14, 0.14, M.plastic(0x888888)), x, 0.96, 0.66);
      put(head, bx(0.05, 0.12, 0.12, M.fabric(0xAAAAAA)), x, 0.96, 0.66);
      put(head, bx(0.018, 0.13, 0.13, M.metal(0xBBBBBB), false, false), x + (x > 0 ? 0.025 : -0.025), 0.96, 0.66);
    });

    ch.add(head);
    g.add(ch);
    scene.add(g);

    // ── ORBIT CONTROLS ──
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.6;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.target.set(0, 0.55, 0);
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = Math.PI / 2.2;

    // ── ANIMATION ──
    let fId: number;
    let frame = 0;
    const initY = camera.position.y;
    const initCamDist = Math.sqrt(6 * 6 + 6 * 6);

    const animate = () => {
      fId = requestAnimationFrame(animate);
      frame++;

      if (frame < 120) {
        const p = easeOutCirc(frame / 120);
        const angle = p * Math.PI * 2 + 0.55;
        camera.position.x = initCamDist * Math.sin(angle);
        camera.position.z = initCamDist * Math.cos(angle);
        camera.position.y = initY;
        camera.lookAt(0, 0.55, 0);
      } else {
        controls.update();
      }

      const t = frame * 0.016;

      // Typing animation — arms only lift up, never dip below desk
      armGroups[0].position.y = Math.abs(Math.sin(t * 8)) * 0.015;
      armGroups[1].position.y = Math.abs(Math.sin(t * 8 + Math.PI)) * 0.015;
      // Subtle forearm rotation for keystroke feel
      armGroups[0].rotation.x = Math.abs(Math.sin(t * 8)) * 0.025;
      armGroups[1].rotation.x = Math.abs(Math.sin(t * 8 + Math.PI)) * 0.025;

      // Breathing — subtle torso scale
      torso.scale.y = 1.0 + Math.sin(t * 1.2) * 0.008;
      torso.scale.z = 1.0 + Math.sin(t * 1.2) * 0.005;

      // Head looking between monitors with eased snapping
      const lookCycle = Math.sin(t * 0.15) * 0.6;
      const lookSnap = Math.sign(lookCycle) * Math.pow(Math.abs(lookCycle), 0.3);
      head.rotation.y = lookSnap * 0.04 + Math.sin(t * 0.8) * 0.008;
      head.rotation.x = Math.sin(t * 0.4) * 0.015 + Math.sin(t * 1.1) * 0.005;

      // Coffee steam animation
      steamWisps.forEach((wisp, i) => {
        const phase = i * 1.2;
        wisp.position.y = baseSteamY[i] + Math.sin(t * 0.8 + phase) * 0.015;
        wisp.position.x = baseSteamX[i] + Math.sin(t * 0.5 + phase) * 0.008;
        (wisp.material as THREE.MeshStandardMaterial).opacity =
          0.08 + Math.sin(t * 0.6 + phase) * 0.06;
      });

      // Cursor blink
      cursor.visible = Math.sin(t * 3.0) > 0;

      // Monitor glow variation
      monGlow1.intensity = 0.35 + Math.sin(t * 0.7) * 0.08;
      monGlow2.intensity = 0.35 + Math.sin(t * 0.9) * 0.06;

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

export default DeskScene;
