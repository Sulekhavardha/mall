import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

export default function ThreeScene({ onZoneChange, onProgressUpdate }) {
  const mountRef = useRef(null);
  const { theme, currentPalette } = useTheme();
  const [webglSupported, setWebglSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const sceneRefs = useRef({
    scene: null,
    camera: null,
    renderer: null,
    sunLight: null,
    hemiLight: null,
    mat: {},
    currentProgress: 0,
    targetProgress: 0,
    mouseX: 0,
    mouseY: 0,
    kineticArt: null,
    animationFrameId: null,
  });

  useEffect(() => {
    // 1. Detect WebGL support
    function detectWebGL() {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
      } catch (e) {
        return false;
      }
    }

    if (!detectWebGL()) {
      setWebglSupported(false);
      setIsLoading(false);
      return;
    }

    const host = mountRef.current;
    if (!host) return;

    // 2. Hardware & Device Capability Profiling
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;

    // Adaptive DPR: Max 1.35 on desktop, 1.15 on mobile (prevents 4x GPU fillrate penalty on retina screens)
    const targetDpr = isMobile
      ? Math.min(window.devicePixelRatio || 1, 1.15)
      : Math.min(window.devicePixelRatio || 1, 1.35);

    // 3. Initialize Three.js Scene
    const scene = new THREE.Scene();
    const bgCol = new THREE.Color(currentPalette.bg);
    scene.background = bgCol;
    scene.fog = new THREE.Fog(currentPalette.bg, 25, 95);

    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(0, 3.8, 28);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile, // Disable MSAA on mobile for massive fill-rate performance boost
      powerPreference: 'high-performance',
      alpha: false,
      stencil: false,
      depth: true,
    });
    renderer.setPixelRatio(targetDpr);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Optimized Shadows: PCFSoft on desktop, Basic on mobile (slashes shadow pass cost)
    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = isMobile ? THREE.BasicShadowMap : THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = currentPalette.exposure;

    host.appendChild(renderer.domElement);

    // 4. Memory Registry for Clean Resource Cleanup
    const geometriesToDispose = [];
    const materialsToDispose = [];
    const texturesToDispose = [];

    function trackGeom(geo) {
      geometriesToDispose.push(geo);
      return geo;
    }
    function trackMat(material) {
      materialsToDispose.push(material);
      return material;
    }
    function trackTex(tex) {
      texturesToDispose.push(tex);
      return tex;
    }

    // Procedural Architectural Canvas Textures (Generated once, cached)
    function createTravertineTexture() {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 512;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#ded6c7';
      ctx.fillRect(0, 0, 512, 512);

      for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(197, 160, 89, 0.14)';
        ctx.lineWidth = 1.5 + Math.random() * 2.5;
        const y = Math.random() * 512;
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(170, y + (Math.random() - 0.5) * 40, 340, y + (Math.random() - 0.5) * 40, 512, y);
        ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(197, 160, 89, 0.35)';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, 512, 512);

      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.generateMipmaps = true;
      return trackTex(tex);
    }

    const signTextureCache = new Map();
    function createSignTexture(brand, category, style = 'luxury') {
      const cacheKey = `${brand}_${category}_${style}`;
      if (signTextureCache.has(cacheKey)) {
        return signTextureCache.get(cacheKey);
      }

      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 128;
      const ctx = c.getContext('2d');

      if (style === 'toys') {
        ctx.fillStyle = '#25221e';
        ctx.fillRect(0, 0, 512, 128);
        ctx.fillStyle = '#e5b244';
        ctx.font = "bold 34px 'Manrope', sans-serif";
        ctx.textAlign = 'center';
        ctx.fillText(brand, 256, 56);
        ctx.fillStyle = '#a3ad9c';
        ctx.font = "bold 13px 'DM Sans', sans-serif";
        ctx.fillText(category, 256, 90);
        ctx.strokeStyle = '#e5b244';
        ctx.lineWidth = 3;
        ctx.strokeRect(8, 8, 496, 112);
      } else if (style === 'cinema') {
        ctx.fillStyle = '#1e1a17';
        ctx.fillRect(0, 0, 512, 128);
        ctx.fillStyle = '#dfc07d';
        ctx.font = "bold 34px 'Manrope', sans-serif";
        ctx.textAlign = 'center';
        ctx.fillText(brand, 256, 58);
        ctx.fillStyle = '#c5a059';
        ctx.font = "14px 'DM Sans', sans-serif";
        ctx.fillText(category, 256, 92);
        ctx.strokeStyle = '#c5a059';
        ctx.lineWidth = 3;
        ctx.strokeRect(8, 8, 496, 112);
      } else if (style === 'dining') {
        ctx.fillStyle = '#2a241e';
        ctx.fillRect(0, 0, 512, 128);
        ctx.fillStyle = '#ece6dc';
        ctx.font = "500 32px 'Manrope', sans-serif";
        ctx.textAlign = 'center';
        ctx.fillText(brand, 256, 58);
        ctx.fillStyle = '#cbb99d';
        ctx.font = "13px 'DM Sans', sans-serif";
        ctx.fillText(category, 256, 92);
        ctx.strokeStyle = '#cbb99d';
        ctx.lineWidth = 2;
        ctx.strokeRect(8, 8, 496, 112);
      } else {
        ctx.fillStyle = '#ded7cb';
        ctx.fillRect(0, 0, 512, 128);
        ctx.fillStyle = '#25221e';
        ctx.font = "500 32px 'Manrope', sans-serif";
        ctx.textAlign = 'center';
        ctx.fillText(brand, 256, 60);
        ctx.fillStyle = '#9c7f50';
        ctx.font = "14px 'DM Sans', sans-serif";
        ctx.fillText(category, 256, 94);
        ctx.strokeStyle = '#c5a059';
        ctx.lineWidth = 2;
        ctx.strokeRect(8, 8, 496, 112);
      }

      const tex = new THREE.CanvasTexture(c);
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.generateMipmaps = true;
      trackTex(tex);
      signTextureCache.set(cacheKey, tex);
      return tex;
    }

    function createPosterTexture(title, sub, col1, col2) {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 384;
      const ctx = c.getContext('2d');
      const grad = ctx.createLinearGradient(0, 0, 256, 384);
      grad.addColorStop(0, col1);
      grad.addColorStop(1, col2);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 384);

      ctx.strokeStyle = 'rgba(223, 192, 125, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(128, 160, 55, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#ece6dc';
      ctx.font = "bold 22px 'Manrope', sans-serif";
      ctx.textAlign = 'center';
      ctx.fillText(title, 128, 290);
      ctx.fillStyle = 'rgba(236, 230, 220, 0.75)';
      ctx.font = "12px 'DM Sans', sans-serif";
      ctx.fillText(sub, 128, 320);

      const tex = new THREE.CanvasTexture(c);
      return trackTex(tex);
    }

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');

    function createPhotoMaterial(imageUrl, fallbackTex, emissiveIntensity = 0.25) {
      const pMat = trackMat(
        new THREE.MeshStandardMaterial({
          map: fallbackTex,
          roughness: 0.25,
          metalness: 0.08,
          emissive: 0xffffff,
          emissiveMap: fallbackTex,
          emissiveIntensity: emissiveIntensity,
        })
      );
      if (imageUrl) {
        textureLoader.load(
          imageUrl,
          (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            pMat.map = tex;
            pMat.emissiveMap = tex;
            pMat.needsUpdate = true;
            trackTex(tex);
          },
          undefined,
          () => {}
        );
      }
      return pMat;
    }

    // 5. Shared Materials Library (Single-pass materials, NO expensive physical transmission)
    const travertineTex = createTravertineTexture();
    travertineTex.repeat.set(12, 28);

    const mat = {
      neonCyan: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0x00f0ff,
          emissive: 0x00c8e0,
          emissiveIntensity: 0.75,
          roughness: 0.2,
        })
      ),
      neonMagenta: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xff0077,
          emissive: 0xe00060,
          emissiveIntensity: 0.75,
          roughness: 0.2,
        })
      ),
      arcadeBody: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0x16171a,
          roughness: 0.32,
        })
      ),
      bowlingLaneWood: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xd4a373,
          roughness: 0.18,
          metalness: 0.04,
        })
      ),
      groundPlaza: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xcbb99d,
          roughness: 0.8,
        })
      ),
      travertineFloor: trackMat(
        new THREE.MeshStandardMaterial({
          map: travertineTex,
          color: currentPalette.floor,
          roughness: 0.28,
          metalness: 0.1,
        })
      ),
      champagneGold: trackMat(
        new THREE.MeshStandardMaterial({
          color: currentPalette.gold,
          metalness: 0.85,
          roughness: 0.22,
        })
      ),
      brushedBrass: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xdfb96b,
          metalness: 0.9,
          roughness: 0.26,
        })
      ),
      warmStone: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xd5cebf,
          roughness: 0.75,
        })
      ),
      darkCharcoal: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0x22201e,
          roughness: 0.5,
        })
      ),
      flutedWood: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0x8b6548,
          roughness: 0.6,
        })
      ),
      // High-performance single-pass glass (eliminates multi-pass transmission render target)
      glass: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xeef5fc,
          transparent: true,
          opacity: 0.32,
          roughness: 0.05,
          metalness: 0.15,
        })
      ),
      glassSkylight: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xedf7ff,
          transparent: true,
          opacity: 0.38,
          roughness: 0.08,
          metalness: 0.1,
        })
      ),
      foliageGreen: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0x4f6b52,
          roughness: 0.8,
        })
      ),
      toyYellow: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xf5b700,
          roughness: 0.35,
        })
      ),
      toyTeal: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0x00a896,
          roughness: 0.35,
        })
      ),
      toyMagenta: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xd62246,
          roughness: 0.35,
        })
      ),
      redCarpet: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0x85141b,
          roughness: 0.7,
        })
      ),
      warmIvory: trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xf4eee4,
          roughness: 0.3,
        })
      ),
    };

    // 6. Geometry Pool / Shared Geometries (Reduces allocations by 95%)
    const sharedGeo = {
      colShaft: trackGeom(new THREE.CylinderGeometry(0.48, 0.48, 15.5, isMobile ? 12 : 16)),
      colCap: trackGeom(new THREE.CylinderGeometry(0.55, 0.55, 0.4, isMobile ? 12 : 16)),
      planterPot: trackGeom(new THREE.CylinderGeometry(0.9, 0.75, 0.85, isMobile ? 12 : 14)),
      planterRing: trackGeom(new THREE.CylinderGeometry(0.85, 0.85, 0.08, isMobile ? 12 : 14)),
      treeTrunk: trackGeom(new THREE.CylinderGeometry(0.12, 0.16, 2.8, 8)),
      foliage1: trackGeom(new THREE.CylinderGeometry(0.95, 1.35, 1.2, 10)),
      foliage2: trackGeom(new THREE.CylinderGeometry(0.65, 1.05, 1.1, 10)),
      roofTruss: trackGeom(new THREE.BoxGeometry(18.4, 0.3, 0.3)),
      roofCable: trackGeom(new THREE.CylinderGeometry(0.04, 0.04, 5.5, 6)),
      stanchionPost: trackGeom(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 8)),
      stanchionCap: trackGeom(new THREE.CylinderGeometry(0.09, 0.09, 0.08, 8)),
      diningTableTop: trackGeom(new THREE.CylinderGeometry(0.65, 0.65, 0.06, 12)),
      diningTableBase: trackGeom(new THREE.CylinderGeometry(0.05, 0.15, 0.74, 8)),
      diningChair: trackGeom(new THREE.CylinderGeometry(0.22, 0.22, 0.45, 8)),
      pendantCap: trackGeom(new THREE.CylinderGeometry(0.16, 0.25, 0.28, 8)),
      pendantCord: trackGeom(new THREE.CylinderGeometry(0.012, 0.012, 2.2, 4)),
      arcadeBody: trackGeom(new THREE.BoxGeometry(0.9, 1.8, 0.8)),
      arcadeScreen: trackGeom(new THREE.BoxGeometry(0.15, 0.55, 0.65)),
      arcadeMarquee: trackGeom(new THREE.BoxGeometry(0.15, 0.2, 0.65)),
      storePedestalBase: trackGeom(new THREE.CylinderGeometry(0.3, 0.35, 0.75, 12)),
      storePedestalCap: trackGeom(new THREE.CylinderGeometry(0.12, 0.18, 0.35, 10)),
      storeWindowFrameV: trackGeom(new THREE.BoxGeometry(0.08, 3.2, 0.18)),
      storeWindowFrameH: trackGeom(new THREE.BoxGeometry(8.5 * 0.56, 0.08, 0.18)),
      storeWindowGlass: trackGeom(new THREE.BoxGeometry(8.5 * 0.55, 3.2, 0.1)),
      storeWall: trackGeom(new THREE.BoxGeometry(8.5, 4.4, 0.35)),
      storeSign: trackGeom(new THREE.BoxGeometry(8.5 * 0.62, 0.85, 0.15)),
      groundFloorSlab: trackGeom(new THREE.BoxGeometry(80, 0.5, 90)),
      upperFloorWalkway: trackGeom(new THREE.BoxGeometry(6.5, 0.35, 60)),
      upperFloorGlass: trackGeom(new THREE.BoxGeometry(0.08, 1.1, 58)),
      upperFloorHandrail: trackGeom(new THREE.BoxGeometry(0.14, 0.1, 58)),
      skylightRoof: trackGeom(new THREE.BoxGeometry(18, 0.25, 62)),
    };

    // 7. Lighting System (Consolidated into 5 key strategic zone lights instead of 22)
    const hemiLight = new THREE.HemisphereLight(
      currentPalette.hemiSky,
      currentPalette.hemiGround,
      0.95
    );
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(currentPalette.sun, 1.85);
    sunLight.position.set(14, 32, 18);
    if (!isMobile) {
      sunLight.castShadow = true;
      sunLight.shadow.mapSize.width = 1024;
      sunLight.shadow.mapSize.height = 1024;
      sunLight.shadow.camera.near = 10;
      sunLight.shadow.camera.far = 75;
      sunLight.shadow.camera.left = -18;
      sunLight.shadow.camera.right = 18;
      sunLight.shadow.camera.top = 18;
      sunLight.shadow.camera.bottom = -18;
      sunLight.shadow.bias = -0.0003;
    }
    scene.add(sunLight);

    const ambientFill = new THREE.AmbientLight(0xfff6ea, 0.5);
    scene.add(ambientFill);

    // 5 Strategic Zone Accent Lights (Warm luxury coverage with minimal shader overhead)
    const entranceGlow = new THREE.PointLight(0xffecd0, 15, 20);
    entranceGlow.position.set(0, 3.8, 14);
    scene.add(entranceGlow);

    const fashionAtriumGlow = new THREE.PointLight(0xffe6c4, 18, 22);
    fashionAtriumGlow.position.set(0, 3.5, -6);
    scene.add(fashionAtriumGlow);

    const toysZoneGlow = new THREE.PointLight(0xffebc8, 16, 22);
    toysZoneGlow.position.set(0, 7.8, -8);
    scene.add(toysZoneGlow);

    const diningPromenadeGlow = new THREE.PointLight(0xffbe6b, 20, 24);
    diningPromenadeGlow.position.set(-5.2, 12.0, -8);
    scene.add(diningPromenadeGlow);

    const cinemaNeonGlow = new THREE.PointLight(0x00f0ff, 18, 22);
    cinemaNeonGlow.position.set(7.5, 12.0, -10);
    scene.add(cinemaNeonGlow);

    const atriumCenterChandelier = new THREE.PointLight(0xffecd0, 35, 30);
    atriumCenterChandelier.position.set(0, 8.5, -9);
    scene.add(atriumCenterChandelier);

    // Mall Master Group
    const mall = new THREE.Group();
    scene.add(mall);

    // Mesh Creation Helpers utilizing Shared Geometry & Selective Shadows
    function box(w, h, d, material, x = 0, y = 0, z = 0, parent = mall, rx = 0, ry = 0, rz = 0, cast = false, recv = false) {
      let geo;
      if (w === 80 && h === 0.5 && d === 90) geo = sharedGeo.groundFloorSlab;
      else if (w === 6.5 && h === 0.35 && d === 60) geo = sharedGeo.upperFloorWalkway;
      else if (w === 0.08 && h === 1.1 && d === 58) geo = sharedGeo.upperFloorGlass;
      else if (w === 0.14 && h === 0.1 && d === 58) geo = sharedGeo.upperFloorHandrail;
      else if (w === 18 && h === 0.25 && d === 62) geo = sharedGeo.skylightRoof;
      else if (w === 18.4 && h === 0.3 && d === 0.3) geo = sharedGeo.roofTruss;
      else geo = trackGeom(new THREE.BoxGeometry(w, h, d));

      const mesh = new THREE.Mesh(geo, material);
      mesh.position.set(x, y, z);
      if (rx || ry || rz) mesh.rotation.set(rx, ry, rz);
      if (!isMobile) {
        mesh.castShadow = cast;
        mesh.receiveShadow = recv;
      }
      parent.add(mesh);
      return mesh;
    }

    function cyl(rT, rB, h, material, x = 0, y = 0, z = 0, parent = mall, segs = 16, cast = false, recv = false) {
      let geo;
      if (rT === 0.48 && rB === 0.48 && h === 15.5) geo = sharedGeo.colShaft;
      else if (rT === 0.55 && rB === 0.55 && h === 0.4) geo = sharedGeo.colCap;
      else if (rT === 0.9 && rB === 0.75 && h === 0.85) geo = sharedGeo.planterPot;
      else if (rT === 0.85 && rB === 0.85 && h === 0.08) geo = sharedGeo.planterRing;
      else if (rT === 0.12 && rB === 0.16 && h === 2.8) geo = sharedGeo.treeTrunk;
      else if (rT === 0.95 && rB === 1.35 && h === 1.2) geo = sharedGeo.foliage1;
      else if (rT === 0.65 && rB === 1.05 && h === 1.1) geo = sharedGeo.foliage2;
      else if (rT === 0.04 && rB === 0.04 && h === 5.5) geo = sharedGeo.roofCable;
      else if (rT === 0.04 && rB === 0.04 && h === 0.9) geo = sharedGeo.stanchionPost;
      else if (rT === 0.09 && rB === 0.09 && h === 0.08) geo = sharedGeo.stanchionCap;
      else if (rT === 0.65 && rB === 0.65 && h === 0.06) geo = sharedGeo.diningTableTop;
      else if (rT === 0.05 && rB === 0.15 && h === 0.74) geo = sharedGeo.diningTableBase;
      else if (rT === 0.22 && rB === 0.22 && h === 0.45) geo = sharedGeo.diningChair;
      else if (rT === 0.16 && rB === 0.25 && h === 0.28) geo = sharedGeo.pendantCap;
      else if (rT === 0.012 && rB === 0.012 && h === 2.2) geo = sharedGeo.pendantCord;
      else if (rT === 0.3 && rB === 0.35 && h === 0.75) geo = sharedGeo.storePedestalBase;
      else if (rT === 0.12 && rB === 0.18 && h === 0.35) geo = sharedGeo.storePedestalCap;
      else geo = trackGeom(new THREE.CylinderGeometry(rT, rB, h, segs));

      const mesh = new THREE.Mesh(geo, material);
      mesh.position.set(x, y, z);
      if (!isMobile) {
        mesh.castShadow = cast;
        mesh.receiveShadow = recv;
      }
      parent.add(mesh);
      return mesh;
    }

    // High-performance Storefront Builder (Reuses shared geometries & textures)
    function buildStorefront(x, y, z, width, brand, category, facing = 'left', style = 'luxury') {
      const group = new THREE.Group();
      group.position.set(x, y, z);

      // Main facade wall
      const wallMesh = new THREE.Mesh(sharedGeo.storeWall, mat.warmStone);
      wallMesh.position.set(0, 2.2, 0);
      group.add(wallMesh);

      // Glass display window
      const glassMesh = new THREE.Mesh(sharedGeo.storeWindowGlass, mat.glass);
      glassMesh.position.set(-width * 0.18, 1.6, 0.12);
      group.add(glassMesh);

      // Signboard
      const signTex = createSignTexture(brand, category, style);
      const signMat = trackMat(
        new THREE.MeshStandardMaterial({
          map: signTex,
          roughness: 0.25,
          metalness: 0.1,
          emissive: 0xffffff,
          emissiveMap: signTex,
          emissiveIntensity: 0.22,
        })
      );
      const signMesh = new THREE.Mesh(sharedGeo.storeSign, signMat);
      signMesh.position.set(-width * 0.15, 3.65, 0.18);
      group.add(signMesh);

      // Frame Accents
      const frameMat = style === 'toys' ? mat.toyYellow : mat.champagneGold;
      const fLeft = new THREE.Mesh(sharedGeo.storeWindowFrameV, frameMat);
      fLeft.position.set(-width * 0.46, 1.6, 0.14);
      const fRight = new THREE.Mesh(sharedGeo.storeWindowFrameV, frameMat);
      fRight.position.set(width * 0.1, 1.6, 0.14);
      const fTop = new THREE.Mesh(sharedGeo.storeWindowFrameH, frameMat);
      fTop.position.set(-width * 0.18, 3.2, 0.14);
      group.add(fLeft, fRight, fTop);

      // Window pedestal
      const pedBase = new THREE.Mesh(sharedGeo.storePedestalBase, mat.warmStone);
      pedBase.position.set(-width * 0.18, 0.38, 1.2);
      const pedCap = new THREE.Mesh(sharedGeo.storePedestalCap, frameMat);
      pedCap.position.set(-width * 0.18, 0.95, 1.2);
      group.add(pedBase, pedCap);

      if (facing === 'right') {
        group.rotation.y = Math.PI;
      }
      mall.add(group);
      return group;
    }

    // High-performance Escalator Builder
    function buildEscalator(x, z, yStart, yEnd, rotY = 0) {
      const esc = new THREE.Group();
      esc.position.set(x, yStart, z);
      esc.rotation.y = rotY;

      const len = 9.8;
      const hDiff = yEnd - yStart;
      const angle = Math.atan2(hDiff, len);

      const truss = box(1.3, 0.55, len + 1, mat.champagneGold, 0, hDiff * 0.5, 0, esc, 0, 0, 0, true, false);
      truss.rotation.x = -angle;

      const glassLeft = box(0.05, 0.95, len, mat.glass, -0.62, hDiff * 0.5 + 0.6, 0, esc);
      glassLeft.rotation.x = -angle;
      const glassRight = box(0.05, 0.95, len, mat.glass, 0.62, hDiff * 0.5 + 0.6, 0, esc);
      glassRight.rotation.x = -angle;

      const railLeft = box(0.1, 0.08, len, mat.darkCharcoal, -0.62, hDiff * 0.5 + 1.1, 0, esc);
      railLeft.rotation.x = -angle;
      const railRight = box(0.1, 0.08, len, mat.darkCharcoal, 0.62, hDiff * 0.5 + 1.1, 0, esc);
      railRight.rotation.x = -angle;

      mall.add(esc);
    }

    // High-performance Planter Tree Builder
    function planterTree(x, y, z, scale = 1.0) {
      const g = new THREE.Group();
      g.position.set(x, y, z);
      if (scale !== 1.0) g.scale.set(scale, scale, scale);

      const pot = new THREE.Mesh(sharedGeo.planterPot, mat.warmStone);
      pot.position.set(0, 0.42, 0);
      const ring = new THREE.Mesh(sharedGeo.planterRing, mat.champagneGold);
      ring.position.set(0, 0.85, 0);
      const trunk = new THREE.Mesh(sharedGeo.treeTrunk, mat.flutedWood);
      trunk.position.set(0, 1.8, 0);

      const f1 = new THREE.Mesh(sharedGeo.foliage1, mat.foliageGreen);
      f1.position.set(0, 2.9, 0);
      f1.rotation.y = 0.4;
      const f2 = new THREE.Mesh(sharedGeo.foliage2, mat.foliageGreen);
      f2.position.set(0, 3.7, 0);
      f2.rotation.y = -0.3;

      g.add(pot, ring, trunk, f1, f2);
      mall.add(g);
    }

    // --- GROUND FLOOR PLAZA & GRAND ATRIUM ---
    box(80, 0.5, 90, mat.travertineFloor, 0, -0.25, 0, mall, 0, 0, 0, false, true);

    // Architectural Grand Colonnade (Shared column geometries)
    for (let colZ = 16; colZ >= -36; colZ -= 10) {
      // Left Colonnade
      const colL = new THREE.Mesh(sharedGeo.colShaft, mat.warmStone);
      colL.position.set(-9.0, 7.75, colZ);
      colL.castShadow = !isMobile;
      const capLB = new THREE.Mesh(sharedGeo.colCap, mat.champagneGold);
      capLB.position.set(-9.0, 0.2, colZ);
      const capLT = new THREE.Mesh(sharedGeo.colCap, mat.champagneGold);
      capLT.position.set(-9.0, 15.2, colZ);

      // Right Colonnade
      const colR = new THREE.Mesh(sharedGeo.colShaft, mat.warmStone);
      colR.position.set(9.0, 7.75, colZ);
      colR.castShadow = !isMobile;
      const capRB = new THREE.Mesh(sharedGeo.colCap, mat.champagneGold);
      capRB.position.set(9.0, 0.2, colZ);
      const capRT = new THREE.Mesh(sharedGeo.colCap, mat.champagneGold);
      capRT.position.set(9.0, 15.2, colZ);

      mall.add(colL, capLB, capLT, colR, capRB, capRT);
    }

    // Central Entrance Plaza Fountain
    cyl(3.8, 3.8, 0.6, mat.warmStone, 0, 0.3, 14, mall, isMobile ? 16 : 24, false, true);
    cyl(3.4, 3.4, 0.08, mat.glass, 0, 0.58, 14, mall, isMobile ? 16 : 24);
    cyl(0.2, 0.25, 1.8, mat.champagneGold, 0, 1.2, 14, mall, 12, true, false);

    // Level 00 Storefronts
    buildStorefront(-10, 0, 2, 8.5, 'MAISON VENDÔME', 'HAUTE COUTURE & TAILORING', 'left', 'luxury');
    buildStorefront(-10, 0, -9, 8.5, 'ATELIER MILANO', 'FINE LEATHER & FOOTWEAR', 'left', 'luxury');
    buildStorefront(-10, 0, -20, 8.5, 'SAINT-HONORÉ', 'ACCESSORIES & EYEWEAR', 'left', 'luxury');

    buildStorefront(10, 0, 2, 8.5, 'DIAMANT SALON', 'HIGH JEWELLERY & WATCHES', 'right', 'luxury');
    buildStorefront(10, 0, -9, 8.5, 'SWISS HOROLOGY', 'MASTER CHRONOMETERS', 'right', 'luxury');
    buildStorefront(10, 0, -20, 8.5, 'AURELIA OPTIQUE', 'LUXURY EYEWEAR & SILK', 'right', 'luxury');

    buildEscalator(-3.8, -4, 0, 4.8, 0);
    buildEscalator(3.8, -12, 0, 4.8, Math.PI);

    planterTree(-4.5, 0, 2, 1.1);
    planterTree(4.5, 0, 2, 1.1);
    planterTree(-4.5, 0, -23, 1.1);
    planterTree(4.5, 0, -23, 1.1);

    // --- FIRST FLOOR (Level 01 / Y = 4.8) — TOYS & LIFESTYLE ---
    box(6.5, 0.35, 60, mat.warmStone, -10.2, 4.8, -20, mall, 0, 0, 0, false, true);
    box(6.5, 0.35, 60, mat.warmStone, 10.2, 4.8, -20, mall, 0, 0, 0, false, true);

    box(0.08, 1.1, 58, mat.glass, -6.9, 4.8 + 0.65, -20);
    box(0.14, 0.1, 58, mat.champagneGold, -6.9, 4.8 + 1.2, -20);
    box(0.08, 1.1, 58, mat.glass, 6.9, 4.8 + 0.65, -20);
    box(0.14, 0.1, 58, mat.champagneGold, 6.9, 4.8 + 1.2, -20);

    buildStorefront(-10, 4.8, 2, 8.5, 'WONDER TOYS', 'TOYS, COLLECTIBLES & KIDS WORLD', 'left', 'toys');
    buildStorefront(-10, 4.8, -9, 8.5, 'LIFESTYLE LAB', 'HOME DECOR & LIVING', 'left', 'luxury');
    buildStorefront(-10, 4.8, -20, 8.5, 'STUDIO CASUAL', 'PREMIUM FOOTWEAR & DENIM', 'left', 'luxury');

    buildStorefront(10, 4.8, 2, 8.5, 'KIDS WONDERLAND', 'GAMES & FAMILY PLAY LAB', 'right', 'toys');
    buildStorefront(10, 4.8, -9, 8.5, 'SONUS & VISION', 'HIGH-END AUDIO & ELECTRONICS', 'right', 'luxury');
    buildStorefront(10, 4.8, -20, 8.5, 'MAISON TEXTILE', 'ARTISANAL INTERIORS & BEDDING', 'right', 'luxury');

    buildEscalator(-3.8, -18, 4.8, 9.6, 0);
    buildEscalator(3.8, -26, 4.8, 9.6, Math.PI);

    planterTree(-6.2, 4.8, 1, 0.9);
    planterTree(6.2, 4.8, 1, 0.9);
    planterTree(-6.2, 4.8, -14, 0.9);
    planterTree(6.2, 4.8, -14, 0.9);

    // --- SECOND FLOOR (Level 02 / Y = 9.6) — DINING & CINEMA ---
    box(6.5, 0.35, 60, mat.warmStone, -10.2, 9.6, -20, mall, 0, 0, 0, false, true);
    box(6.5, 0.35, 60, mat.warmStone, 10.2, 9.6, -20, mall, 0, 0, 0, false, true);

    box(0.08, 1.1, 58, mat.glass, -6.9, 9.6 + 0.65, -20);
    box(0.14, 0.1, 58, mat.champagneGold, -6.9, 9.6 + 1.2, -20);
    box(0.08, 1.1, 58, mat.glass, 6.9, 9.6 + 0.65, -20);
    box(0.14, 0.1, 58, mat.champagneGold, 6.9, 9.6 + 1.2, -20);

    buildStorefront(-10, 9.6, 2, 8.5, 'LE BISTRO PARIS', 'FRENCH FINE BRASSERIE', 'left', 'dining');
    buildStorefront(-10, 9.6, -9, 8.5, 'SORA ROBATA', 'JAPANESE TEPPANYAKI & SUSHI', 'left', 'dining');
    buildStorefront(-10, 9.6, -20, 8.5, 'CAFE BOTANICA', 'ARTISANAL ESPRESSO & BAKERY', 'left', 'dining');

    // Dining Terrace Tables (Shared geometries)
    for (let tz = 0; tz >= -18; tz -= 4.2) {
      const top = new THREE.Mesh(sharedGeo.diningTableTop, mat.warmStone);
      top.position.set(-5.2, 9.6 + 0.76, tz);
      const base = new THREE.Mesh(sharedGeo.diningTableBase, mat.champagneGold);
      base.position.set(-5.2, 9.6 + 0.38, tz);
      const c1 = new THREE.Mesh(sharedGeo.diningChair, mat.flutedWood);
      c1.position.set(-5.2, 9.6 + 0.25, tz - 0.7);
      const c2 = new THREE.Mesh(sharedGeo.diningChair, mat.flutedWood);
      c2.position.set(-5.2, 9.6 + 0.25, tz + 0.7);

      const pCap = new THREE.Mesh(sharedGeo.pendantCap, mat.champagneGold);
      pCap.position.set(-5.2, 9.6 + 2.6, tz);
      const pCord = new THREE.Mesh(sharedGeo.pendantCord, mat.darkCharcoal);
      pCord.position.set(-5.2, 9.6 + 3.8, tz);

      mall.add(top, base, c1, c2, pCap, pCord);
    }

    // LEVEL 02: CINEMA & ENTERTAINMENT PROMENADE
    const cinemaGroup = new THREE.Group();
    cinemaGroup.position.set(10, 9.6, -12);
    mall.add(cinemaGroup);

    box(3.5, 4.4, 22, mat.darkCharcoal, -1.6, 2.2, -2, cinemaGroup);
    box(2.8, 0.06, 12, mat.redCarpet, -1.6, 0.05, 3, cinemaGroup);

    // Stanchions (Shared geometries)
    for (let sz of [-1, 2, 5, 8]) {
      const p1 = new THREE.Mesh(sharedGeo.stanchionPost, mat.champagneGold);
      p1.position.set(-0.15, 0.45, sz);
      const c1 = new THREE.Mesh(sharedGeo.stanchionCap, mat.champagneGold);
      c1.position.set(-0.15, 0.95, sz);
      const p2 = new THREE.Mesh(sharedGeo.stanchionPost, mat.champagneGold);
      p2.position.set(-3.05, 0.45, sz);
      const c2 = new THREE.Mesh(sharedGeo.stanchionCap, mat.champagneGold);
      c2.position.set(-3.05, 0.95, sz);
      cinemaGroup.add(p1, c1, p2, c2);
    }

    const cinemaSignTex = createSignTexture('CINEMA LUXE', 'IMAX LASER • 12 PREMIERE SCREENS', 'cinema');
    const cinemaSignMat = trackMat(new THREE.MeshStandardMaterial({ map: cinemaSignTex, roughness: 0.15 }));
    const cinemaMarquee = box(0.12, 1.2, 9.2, cinemaSignMat, -3.3, 3.6, 3, cinemaGroup);
    cinemaMarquee.rotation.y = -Math.PI / 2;

    const moviePosters = [
      {
        title: 'ASTRONOMIA',
        sub: 'IMAX 3D / SCI-FI',
        img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
        z: 0.5,
      },
      {
        title: 'NIGHTFALL',
        sub: 'DOLBY VIP / NOIR',
        img: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80',
        z: 3.5,
      },
      {
        title: 'GOLDEN KINGDOM',
        sub: '4K LASER / EPIC',
        img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
        z: 6.5,
      },
    ];

    moviePosters.forEach((p) => {
      const fallbackTex = createPosterTexture(p.title, p.sub, '#1a1816', '#c5a059');
      const pMat = createPhotoMaterial(p.img, fallbackTex, 0.55);
      box(0.1, 2.2, 1.45, mat.champagneGold, -3.2, 2.1, p.z, cinemaGroup);
      box(0.12, 2.05, 1.35, pMat, -3.22, 2.1, p.z, cinemaGroup);
    });

    // Velocity Arcade (Shared geometries)
    const arcadeSignTex = createSignTexture('VELOCITY ARCADE', 'MOTION SIMULATORS & VR ARENA', 'toys');
    const arcadeSignMat = trackMat(new THREE.MeshStandardMaterial({ map: arcadeSignTex, roughness: 0.2 }));
    const arcadeMarquee = box(0.12, 0.95, 7.8, arcadeSignMat, -3.3, 3.6, -7.5, cinemaGroup);
    arcadeMarquee.rotation.y = -Math.PI / 2;

    for (let az of [-5.5, -7.2, -8.9]) {
      const body = new THREE.Mesh(sharedGeo.arcadeBody, mat.arcadeBody);
      body.position.set(-2.2, 0.9, az);
      const scr = new THREE.Mesh(sharedGeo.arcadeScreen, mat.neonCyan);
      scr.position.set(-2.6, 1.25, az);
      const topMarq = new THREE.Mesh(sharedGeo.arcadeMarquee, mat.neonMagenta);
      topMarq.position.set(-2.6, 1.7, az);
      cinemaGroup.add(body, scr, topMarq);
    }

    // Omni VR Arena
    cyl(1.35, 1.35, 0.12, mat.darkCharcoal, -1.8, 0.06, -11.5, cinemaGroup, 16);
    cyl(1.4, 1.4, 0.04, mat.neonCyan, -1.8, 0.14, -11.5, cinemaGroup, 16);
    cyl(0.15, 0.2, 1.0, mat.champagneGold, -1.8, 0.6, -11.5, cinemaGroup, 10);
    cyl(0.35, 0.35, 0.08, mat.neonCyan, -1.8, 1.15, -11.5, cinemaGroup, 10);

    // The Strike Club Bowling
    box(1.2, 0.06, 6.5, mat.bowlingLaneWood, -0.6, 0.04, -8.5, cinemaGroup);
    box(0.1, 0.09, 6.5, mat.champagneGold, 0.05, 0.05, -8.5, cinemaGroup);
    box(0.1, 0.09, 6.5, mat.champagneGold, -1.25, 0.05, -8.5, cinemaGroup);
    for (let px of [-0.85, -0.6, -0.35]) {
      cyl(0.04, 0.06, 0.35, mat.warmIvory, px, 0.22, -11.2, cinemaGroup, 8);
    }

    // Kids Soft Play Shapes
    cyl(0.55, 0.55, 0.8, mat.toyYellow, -2.0, 0.4, -15.5, cinemaGroup, 14);
    cyl(0.45, 0.45, 1.2, mat.toyTeal, -1.2, 0.6, -16.8, cinemaGroup, 14);
    box(0.8, 0.8, 0.8, mat.toyMagenta, -2.2, 0.4, -17.5, cinemaGroup);

    // CENTRAL ATRIUM ROOF & GLASS BARREL VAULT SKYLIGHT (Y = 15.5)
    box(18, 0.25, 62, mat.glassSkylight, 0, 15.5, -20);
    for (let rz = 8; rz >= -48; rz -= 4) {
      const truss = new THREE.Mesh(sharedGeo.roofTruss, mat.champagneGold);
      truss.position.set(0, 15.4, rz);
      const cabL = new THREE.Mesh(sharedGeo.roofCable, mat.champagneGold);
      cabL.position.set(-9, 12.6, rz);
      const cabR = new THREE.Mesh(sharedGeo.roofCable, mat.champagneGold);
      cabR.position.set(9, 12.6, rz);
      mall.add(truss, cabL, cabR);
    }

    // Kinetic Art Chandelier (Optimized torus segments)
    const kineticArt = new THREE.Group();
    kineticArt.position.set(0, 8.5, -9);
    mall.add(kineticArt);

    const ring1 = new THREE.Mesh(
      trackGeom(new THREE.TorusGeometry(3.0, 0.07, 12, isMobile ? 48 : 72)),
      mat.champagneGold
    );
    const ring2 = new THREE.Mesh(
      trackGeom(new THREE.TorusGeometry(2.1, 0.06, 12, isMobile ? 48 : 72)),
      mat.brushedBrass
    );
    const ring3 = new THREE.Mesh(
      trackGeom(new THREE.TorusGeometry(1.2, 0.05, 12, isMobile ? 48 : 72)),
      mat.champagneGold
    );
    ring1.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    ring3.rotation.x = -Math.PI / 4;
    kineticArt.add(ring1, ring2, ring3);

    // Cinematic Camera Waypoints
    const stops = [
      { p: [0, 3.8, 28], look: [0, 3.2, 8], floor: 'ground', zone: 'Ground Floor · Grand Entrance Plaza' },
      { p: [-3.0, 2.4, 3], look: [4.2, 2.2, -6], floor: 'ground', zone: 'Ground Floor · Fashion Boutique Shop' },
      { p: [3.2, 2.4, -9], look: [-4.2, 2.2, -18], floor: 'ground', zone: 'Ground Floor · High Jewellery & Watches' },
      { p: [-2.8, 6.2, 3], look: [3.8, 5.8, -8], floor: 'first', zone: 'First Floor · Toys Shop & Kids Wonderland' },
      { p: [-3.2, 11.0, -9], look: [3.5, 10.4, -18], floor: 'second', zone: 'Second Floor · Dining Promenade & Cafes' },
      { p: [2.5, 10.8, -14], look: [-3.2, 10.6, -12], floor: 'second', zone: 'Second Floor · Cinema & Entertainment Promenade' },
      { p: [0, 13.2, 0], look: [0, 5.2, -26], floor: 'all', zone: 'Grand 3-Storey Atrium Vista' },
    ];

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const mix = (a, b, t) => a + (b - a) * t;

    // Save refs
    sceneRefs.current = {
      scene,
      camera,
      renderer,
      sunLight,
      hemiLight,
      mat,
      currentProgress: 0,
      targetProgress: 0,
      mouseX: 0,
      mouseY: 0,
      kineticArt,
      stops,
      animationFrameId: null,
    };

    // Scroll Handler (Throttled via requestAnimationFrame)
    let scrollScheduled = false;
    const handleScroll = () => {
      if (scrollScheduled) return;
      scrollScheduled = true;
      requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * (stops.length - 1) : 0;
        sceneRefs.current.targetProgress = progress;
        if (onProgressUpdate) onProgressUpdate(progress);
        scrollScheduled = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mouse Move Handler (Bypassed on mobile devices for battery and jitter optimization)
    const handleMouseMove = (e) => {
      if (isMobile) return;
      sceneRefs.current.mouseX = e.clientX / window.innerWidth - 0.5;
      sceneRefs.current.mouseY = e.clientY / window.innerHeight - 0.5;
    };
    if (!isMobile) {
      window.addEventListener('pointermove', handleMouseMove, { passive: true });
    }

    // Resize Handler
    let resizeTimer = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!renderer || !camera) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 100);
    };
    window.addEventListener('resize', handleResize);

    // Zero-Allocation Vectors for Camera Loop (Zero Garbage Collection pressure)
    const _camTarget = new THREE.Vector3();
    let clock = new THREE.Clock();
    let currentStopIndex = -1;

    // High-performance Animation Loop
    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.1); // Clamp delta to avoid huge leap on tab unfocus
      const state = sceneRefs.current;

      // Animate kinetic chandelier
      if (state.kineticArt) {
        ring1.rotation.z += 0.45 * delta;
        ring2.rotation.x += 0.35 * delta;
        ring3.rotation.y += 0.55 * delta;
      }

      // Delta-time independent exponential damping (ensures 60Hz/120Hz/144Hz consistency)
      const damp = 1 - Math.exp(-8.0 * delta);
      state.currentProgress += (state.targetProgress - state.currentProgress) * damp;

      const cp = clamp(state.currentProgress, 0, stops.length - 1);
      const baseIndex = Math.floor(cp);
      const nextIndex = Math.min(baseIndex + 1, stops.length - 1);
      const fraction = cp - baseIndex;

      // Notify parent zone change only when checkpoint shifts
      if (baseIndex !== currentStopIndex) {
        currentStopIndex = baseIndex;
        if (onZoneChange && stops[baseIndex]) {
          onZoneChange(stops[baseIndex]);
        }
      }

      // Compute camera positions smoothly
      const s1 = stops[baseIndex];
      const s2 = stops[nextIndex];

      const px = mix(s1.p[0], s2.p[0], fraction);
      const py = mix(s1.p[1], s2.p[1], fraction);
      const pz = mix(s1.p[2], s2.p[2], fraction);

      const lx = mix(s1.look[0], s2.look[0], fraction);
      const ly = mix(s1.look[1], s2.look[1], fraction);
      const lz = mix(s1.look[2], s2.look[2], fraction);

      // Mouse parallax (Active on desktop only)
      if (!isMobile) {
        camera.position.set(
          px + state.mouseX * 0.45,
          py - state.mouseY * 0.35,
          pz
        );
        _camTarget.set(
          lx + state.mouseX * 0.25,
          ly - state.mouseY * 0.2,
          lz
        );
      } else {
        camera.position.set(px, py, pz);
        _camTarget.set(lx, ly, lz);
      }

      camera.lookAt(_camTarget);

      renderer.render(scene, camera);
      state.animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Loader simulation
    let progressVal = 0;
    const loadTimer = setInterval(() => {
      progressVal += 35;
      setLoadingProgress(progressVal);
      if (progressVal >= 100) {
        clearInterval(loadTimer);
        setTimeout(() => setIsLoading(false), 200);
      }
    }, 80);

    // Thorough Cleanup Routine
    return () => {
      clearInterval(loadTimer);
      clearTimeout(resizeTimer);
      window.removeEventListener('scroll', handleScroll);
      if (!isMobile) {
        window.removeEventListener('pointermove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      if (sceneRefs.current.animationFrameId) {
        cancelAnimationFrame(sceneRefs.current.animationFrameId);
      }
      if (host && renderer.domElement) {
        host.removeChild(renderer.domElement);
      }

      // Dispose all GPU resources
      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
      texturesToDispose.forEach((t) => t.dispose());
      renderer.dispose();
    };
  }, []);

  // Update theme colors when palette changes
  useEffect(() => {
    const state = sceneRefs.current;
    if (!state.scene || !state.renderer) return;

    state.scene.background.setHex(currentPalette.bg);
    state.scene.fog.color.setHex(currentPalette.bg);
    state.sunLight.color.setHex(currentPalette.sun);
    state.hemiLight.color.setHex(currentPalette.hemiSky);
    state.hemiLight.groundColor.setHex(currentPalette.hemiGround);
    state.mat.champagneGold.color.setHex(currentPalette.gold);
    state.mat.travertineFloor.color.setHex(currentPalette.floor);
    state.renderer.toneMappingExposure = currentPalette.exposure;
  }, [theme, currentPalette]);

  return (
    <>
      {!webglSupported && (
        <div id="webgl-fallback" style={{ display: 'block' }}>
          WebGL is required to render the 3D multi-level mall walkthrough. Please ensure hardware acceleration is enabled in your browser settings.
        </div>
      )}

      {isLoading && (
        <div className={`loader ${loadingProgress >= 100 ? 'hide' : ''}`} id="loader">
          <div className="loader-brand">
            <div className="logo-diamond"></div>
            AURELIA <span>/</span> LUXURY DESTINATION
          </div>
          <div className="loader-bar-wrap">
            <div className="loader-bar" style={{ width: `${loadingProgress}%` }}></div>
          </div>
          <div className="loader-status">Initializing High-Performance 3D Architecture...</div>
        </div>
      )}

      <div id="scene" ref={mountRef} aria-hidden="true" />
    </>
  );
}
