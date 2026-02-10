'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import * as THREE from 'three';
import Matter from 'matter-js';
import { useDeviceMode } from '../../contexts/DeviceModeContext';

// Add type declaration if needed (or rely on @types)
// declare global { interface Window { THREE: any; Matter: any; } } 
// -> We don't need window.THREE anymore properly, but some plugins might.
// But we are using pure modules here.

export default function GravityHero() {
    // Vercel Deploy Trigger v3
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const physicsContainerRef = useRef<HTMLDivElement>(null);
    // No loading states needed anymore
    const initializedRef = useRef(false);
    const { isMobileMode } = useDeviceMode();

    // 모바일 모드가 변경되면 초기화
    useEffect(() => {
        // Delay initialization slightly to allow CSS transitions to complete
        const timer = setTimeout(() => {
            initializedRef.current = false;
            const isMobile = isMobileMode || window.innerWidth < 768;
            initThreeJS(isMobile);
            initPhysics();
            initializedRef.current = true;
        }, 100); // reduced delay as we don't wait for scripts

        return () => clearTimeout(timer);
    }, [isMobileMode]);

    const initThreeJS = (isMobile: boolean) => {
        const container = canvasContainerRef.current;
        if (!container) return;

        // Clear previous canvas
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.0001);

        console.log('[GravityHero] Mobile mode:', isMobile);

        // Mobile: camera farther away for better perspective of rings + planet
        const mobileCamera = { fov: 50, x: 0, y: 3, z: 28 };
        const desktopCamera = { fov: 35, x: 0, y: 6, z: 25 };
        const camConfig = isMobile ? mobileCamera : desktopCamera;

        // Use container size explicitly
        // Force check container size
        const width = container.clientWidth;
        const height = container.clientHeight;
        console.log('[GravityHero] Container size:', width, height);

        const camera = new THREE.PerspectiveCamera(camConfig.fov, width / height, 0.1, 10000);
        camera.position.set(camConfig.x, camConfig.y, camConfig.z);
        // Always look at origin (0, 0, 0) where earth is centered
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);

        // Resize Observer to handle container size changes
        const resizeObserver = new ResizeObserver(() => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        });
        resizeObserver.observe(container);

        // State - different defaults for mobile/desktop
        const defaultCam = isMobile
            ? { x: 0, y: 3, z: 28 }   // Mobile: farther view
            : { x: 0, y: 6, z: 25 }; // Desktop: standard view
        const state = {
            targetCamZ: defaultCam.z,
            targetCamX: defaultCam.x,
            targetCamY: defaultCam.y,
            targetRotX: 0, targetRotY: 0,
            mouseX: 0, mouseY: 0,
            isShiftDown: false,
            isDragging: false, lastX: 0, lastY: 0,
            // Touch state for mobile
            touchStartDist: 0,
            lastTouchX: 0, lastTouchY: 0,
            isTouching: false,
            // Auto-reset timer
            lastInteractionTime: Date.now(),
            resetTimeout: 5000 // 5 seconds
        };

        // Lighting
        const sunPos = new THREE.Vector3(-400, 100, -500);
        const dirLight = new THREE.DirectionalLight(0xfff7ed, 3.5);
        dirLight.position.copy(sunPos);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        scene.add(dirLight);
        scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.5));
        const rimLight = new THREE.SpotLight(0x60a5fa, 8.0);
        rimLight.position.set(50, 0, 20);
        rimLight.lookAt(0, 0, 0);
        scene.add(rimLight);

        // Procedural Textures
        const createTex = (w: number, h: number, fn: (c: CanvasRenderingContext2D, w: number, h: number) => void) => {
            const c = document.createElement('canvas'); c.width = w; c.height = h;
            const x = c.getContext('2d')!; fn(x, w, h);
            return new THREE.CanvasTexture(c);
        };

        const texSun = createTex(512, 512, (c, w, h) => {
            c.fillStyle = '#f97316'; c.fillRect(0, 0, w, h);
            for (let i = 0; i < 2000; i++) { c.fillStyle = Math.random() > .5 ? '#fbbf24' : '#ef4444'; const s = Math.random() * 10 + 2; c.fillRect(Math.random() * w, Math.random() * h, s, s); }
        });
        const texEarth = createTex(1024, 512, (c, w, h) => {
            const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#475569'); g.addColorStop(0.5, '#94a3b8'); g.addColorStop(1, '#475569'); c.fillStyle = g; c.fillRect(0, 0, w, h);
        });
        const texJup = createTex(512, 512, (c, w, h) => {
            const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#d4b483'); g.addColorStop(0.5, '#a0522d'); g.addColorStop(1, '#9e8e76'); c.fillStyle = g; c.fillRect(0, 0, w, h);
        });
        const texMars = createTex(512, 512, (c, w, h) => {
            c.fillStyle = '#9c4126'; c.fillRect(0, 0, w, h); c.fillStyle = '#6d2616';
            for (let i = 0; i < 500; i++) { c.beginPath(); c.arc(Math.random() * w, Math.random() * h, Math.random() * 20 + 5, 0, Math.PI * 2); c.fill(); }
        });
        const texTech = createTex(512, 512, (c, w, h) => {
            c.fillStyle = '#e2e8f0'; c.fillRect(0, 0, w, h); c.strokeStyle = '#94a3b8'; c.lineWidth = 2;
            for (let i = 0; i < 40; i++) { c.strokeRect(Math.random() * w, Math.random() * h, Math.random() * 60 + 10, Math.random() * 60 + 10); }
        });
        const texSolar = createTex(512, 512, (c, w, h) => {
            c.fillStyle = '#0f172a'; c.fillRect(0, 0, w, h);
            const cw = (w - 36) / 8; const ch = (h - 84) / 20;
            for (let i = 0; i < 8; i++) for (let j = 0; j < 20; j++) {
                c.fillStyle = '#172554'; c.fillRect(4 + i * (cw + 4), 4 + j * (ch + 4), cw, ch);
                c.fillStyle = 'rgba(255,255,255,0.05)'; c.fillRect(4 + i * (cw + 4), 4 + j * (ch + 4), cw, ch / 2);
            }
        });
        texSolar.wrapS = texSolar.wrapT = THREE.RepeatWrapping;

        // Solar System
        const solarGroup = new THREE.Group();
        scene.add(solarGroup);

        // Sun
        const sun = new THREE.Mesh(new THREE.SphereGeometry(75, 64, 64), new THREE.MeshBasicMaterial({ map: texSun, color: 0xffaa00 }));
        sun.position.copy(sunPos);

        // Hide sun on mobile - focus only on Earth
        if (!isMobile) {
            solarGroup.add(sun);

            const sGlow = new THREE.Sprite(new THREE.SpriteMaterial({
                map: createTex(64, 64, (c) => {
                    const g = c.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, 'rgba(255,200,100,1)'); g.addColorStop(1, 'transparent'); c.fillStyle = g; c.fillRect(0, 0, 64, 64);
                }), color: 0xffaa00, blending: THREE.AdditiveBlending
            }));
            sGlow.scale.set(400, 400, 1);
            sun.add(sGlow);
        }

        // Earth - larger for mobile, positioned at EXACT CENTER
        const earthGroup = new THREE.Group();

        // On mobile: add earth directly to scene at center (0, 0, 0)
        // On desktop: add to solar system group as before
        if (isMobile) {
            earthGroup.position.set(0, 0, 0); // EXACT CENTER
            scene.add(earthGroup);
        } else {
            solarGroup.add(earthGroup);
        }

        const earthSize = isMobile ? 2.0 : 3.2; // Smaller on mobile to see rings
        const earth = new THREE.Mesh(new THREE.SphereGeometry(earthSize, 64, 64), new THREE.MeshStandardMaterial({ map: texEarth, roughness: 0.4, emissive: 0x1e293b, emissiveIntensity: 0.2 }));
        earth.receiveShadow = true;
        earthGroup.add(earth);

        // Rings - tilted for better perspective view
        const ringG = new THREE.Group();
        ringG.rotation.x = isMobile ? 0.6 : 0.2; // More tilt on mobile for dramatic effect
        earthGroup.add(ringG);

        const ringScale = isMobile ? 0.8 : 1; // Fit rings in frame
        const addRing = (cnt: number, min: number, max: number, col: number) => {
            const pos = new Float32Array(cnt * 3);
            const clr = new Float32Array(cnt * 3);
            const bc = new THREE.Color(col);
            for (let i = 0; i < cnt; i++) {
                const a = Math.random() * Math.PI * 2;
                const r = (min + Math.random() * (max - min)) * ringScale;
                pos[i * 3] = Math.cos(a) * r; pos[i * 3 + 1] = (Math.random() - 0.5) * 0.15; pos[i * 3 + 2] = Math.sin(a) * r;
                clr[i * 3] = bc.r; clr[i * 3 + 1] = bc.g; clr[i * 3 + 2] = bc.b;
            }
            const geo = new THREE.BufferGeometry();
            geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
            geo.setAttribute('color', new THREE.BufferAttribute(clr, 3));
            const pointSize = isMobile ? 0.08 : 0.05; // Larger points on mobile
            ringG.add(new THREE.Points(geo, new THREE.PointsMaterial({ size: pointSize, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending })));
        };
        addRing(isMobile ? 6000 : 4000, 9, 12, 0xd1d5db);
        addRing(isMobile ? 8000 : 6000, 12.4, 19, 0x38bdf8);

        // Planets
        const mercury = new THREE.Mesh(new THREE.SphereGeometry(0.8, 32, 32), new THREE.MeshStandardMaterial({ map: texTech, roughness: 0.8 }));
        solarGroup.add(mercury);
        const venus = new THREE.Mesh(new THREE.SphereGeometry(1.8, 32, 32), new THREE.MeshStandardMaterial({ map: texJup, color: 0xffdd88 }));
        solarGroup.add(venus);
        const mars = new THREE.Mesh(new THREE.SphereGeometry(1.2, 32, 32), new THREE.MeshStandardMaterial({ map: texMars }));
        solarGroup.add(mars);
        const jupiter = new THREE.Mesh(new THREE.SphereGeometry(8.0, 32, 32), new THREE.MeshStandardMaterial({ map: texJup }));
        solarGroup.add(jupiter);
        jupiter.position.set(sunPos.x + 800, sunPos.y * 0.5, sunPos.z - 200);

        // ISS
        const createISS = () => {
            const g = new THREE.Group();
            const matA = new THREE.MeshStandardMaterial({ map: texTech, color: 0xdddddd });
            const matS = new THREE.MeshStandardMaterial({ map: texSolar, side: THREE.DoubleSide });
            const truss = new THREE.Mesh(new THREE.BoxGeometry(1, 0.4, 0.4), matA); g.add(truss);
            const addWing = (x: number) => {
                const w = new THREE.Mesh(new THREE.BoxGeometry(0.9, 5.8, 0.04), matS); w.position.set(x, 0, 0); w.rotation.x = 0.3; return w;
            };
            const arm1 = new THREE.Group(); arm1.position.x = 1.5; arm1.add(addWing(-0.6)); arm1.add(addWing(0.6)); truss.add(arm1);
            const arm2 = arm1.clone(); arm2.position.x = -1.5; truss.add(arm2);
            const mod = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 2, 16), new THREE.MeshStandardMaterial({ color: 0xffffff }));
            mod.rotation.z = Math.PI / 2; mod.position.y = -0.5; g.add(mod);
            g.scale.set(0.15, 0.15, 0.15);
            return g;
        };

        // JWST
        const createJWST = () => {
            const g = new THREE.Group();
            const matP = new THREE.MeshPhysicalMaterial({ color: 0xe879f9, side: THREE.DoubleSide, metalness: 0.6 });
            const matG = new THREE.MeshPhysicalMaterial({ color: 0xffd700, metalness: 1, roughness: 0.05 });
            const shape = new THREE.Shape();
            shape.moveTo(0, 2.2);
            shape.lineTo(1.5, 0);
            shape.lineTo(0, -2.2);
            shape.lineTo(-1.5, 0);
            shape.lineTo(0, 2.2);
            const sGeo = new THREE.ShapeGeometry(shape);
            for (let i = 0; i < 5; i++) {
                const l = new THREE.Mesh(sGeo, matP); l.position.z = -i * 0.15; l.scale.setScalar(1 - i * 0.04); g.add(l);
            }
            g.rotation.x = -Math.PI / 2;
            const m = new THREE.Group(); m.position.set(0, 0.5, 0);
            const hGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.03, 6);
            const addHex = (x: number, y: number) => { const h = new THREE.Mesh(hGeo, matG); h.rotation.set(Math.PI / 2, Math.PI / 2, 0); h.position.set(x, 0.2 + y, 0.15); m.add(h); };
            addHex(0, 0); addHex(0, 0.24); addHex(0, -0.24); addHex(0.21, 0.12); addHex(-0.21, 0.12);
            g.add(m); g.scale.set(0.2, 0.2, 0.2); // Even smaller JWST
            return g;
        };

        // Satellites (ISS, JWST, Communication Satellite) - All 3 satellites with better spacing
        const satObjs: { mesh: any, r: number, s: number, a: number, inc: number }[] = [];
        const satScale = isMobile ? 1.0 : 1; // Same scale for mobile
        const addSat = (mesh: any, r: number, s: number, inc: number, startAngle: number) => {
            mesh.scale.multiplyScalar(satScale);
            earthGroup.add(mesh);
            satObjs.push({ mesh, r: r * (isMobile ? 0.6 : 1), s, a: startAngle, inc });
        };

        // ISS - International Space Station (closest orbit)
        addSat(createISS(), 10, 0.025, -0.2, 0);

        // Communication Satellite - sphere (middle orbit)
        const commSat = new THREE.Mesh(
            new THREE.SphereGeometry(isMobile ? 1.0 : 0.6, 32, 32),
            new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.8, roughness: 0.2 })
        );
        addSat(commSat, 18, 0.015, 0.4, 2.1);

        // JWST - James Webb Space Telescope (farthest orbit)
        addSat(createJWST(), 28, 0.008, 0.1, 4.2);

        // Stars
        const stG = new THREE.BufferGeometry();
        const stP = new Float32Array(3000 * 3);
        for (let i = 0; i < 9000; i++) stP[i] = (Math.random() - 0.5) * 2500;
        stG.setAttribute('position', new THREE.BufferAttribute(stP, 3));
        scene.add(new THREE.Points(stG, new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, opacity: 0.8, transparent: true })));

        // Animation Loop
        const animate = (time: number) => {
            requestAnimationFrame(animate);
            const t = time * 0.0008;

            earth.rotation.y = t * 0.05;
            ringG.rotation.y = t * 0.01;

            mercury.position.set(sunPos.x + Math.cos(t * 0.5) * 100, sunPos.y * 0.5, sunPos.z + Math.sin(t * 0.5) * 100);
            venus.position.set(sunPos.x + Math.cos(t * 0.35) * 180, sunPos.y * 0.3, sunPos.z + Math.sin(t * 0.35) * 180);
            mars.position.set(sunPos.x + 550 + Math.cos(t * 0.2) * 20, sunPos.y * 0.5, sunPos.z + 300);
            jupiter.rotation.y = t * 0.2;

            satObjs.forEach(o => {
                const a = o.a + t * o.s;
                o.mesh.position.set(Math.cos(a) * o.r, Math.sin(a) * o.r * Math.sin(o.inc), Math.sin(a) * o.r);
                o.mesh.lookAt(0, 0, 0);
            });

            // Auto-reset to default position after 5 seconds of no interaction
            const timeSinceInteraction = Date.now() - state.lastInteractionTime;
            if (timeSinceInteraction > state.resetTimeout) {
                // Smoothly return to default position
                state.targetCamX += (defaultCam.x - state.targetCamX) * 0.02;
                state.targetCamY += (defaultCam.y - state.targetCamY) * 0.02;
                state.targetCamZ += (defaultCam.z - state.targetCamZ) * 0.02;
            }

            // Smooth camera position updates (X, Y, Z)
            camera.position.x += (state.targetCamX - camera.position.x) * 0.05;
            camera.position.y += (state.targetCamY - camera.position.y) * 0.05;
            camera.position.z += (state.targetCamZ - camera.position.z) * 0.05;

            // Rotate earth group based on mouse/touch drag
            if (state.targetRotY !== 0) {
                earthGroup.rotation.y += state.targetRotY * 0.01;
                state.targetRotY *= 0.95; // Damping
            }
            if (state.targetRotX !== 0) {
                earthGroup.rotation.x += state.targetRotX * 0.01;
                state.targetRotX *= 0.95; // Damping
            }

            // Always look at origin (0, 0, 0) where earth is
            camera.lookAt(0, 0, 0);
            renderer.render(scene, camera);
        };
        animate(0);

        // Event Handlers - PC
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        // Mouse move = camera orbit ONLY when Shift is held
        const handleMouseMove = (e: MouseEvent) => {
            state.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            state.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

            // Only move camera when Shift is held
            if (state.isShiftDown) {
                state.lastInteractionTime = Date.now(); // Reset auto-return timer

                // Free camera movement based on mouse position
                state.targetCamX = state.mouseX * 15; // X axis movement
                state.targetCamY = 6 + state.mouseY * 10; // Y axis movement (centered at 6)

                // Drag rotation
                if (state.isDragging) {
                    state.targetRotY = (e.clientX - state.lastX) * 0.5;
                    state.targetRotX = (e.clientY - state.lastY) * 0.3;
                }
            }
            state.lastX = e.clientX;
            state.lastY = e.clientY;
        };

        const handleMouseDown = (e: MouseEvent) => {
            // Only enable dragging when Shift is held
            if (state.isShiftDown) {
                state.isDragging = true;
                state.lastX = e.clientX;
                state.lastY = e.clientY;
            }
        };
        const handleMouseUp = () => state.isDragging = false;

        // Reset camera to default position
        const resetCamera = () => {
            state.targetCamX = defaultCam.x;
            state.targetCamY = defaultCam.y;
            state.targetCamZ = defaultCam.z;
        };

        // Shift + Wheel = Zoom, Spacebar = Reset
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Shift') state.isShiftDown = true;
            if (e.key === ' ' || e.code === 'Space') {
                e.preventDefault();
                resetCamera();
            }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Shift') state.isShiftDown = false;
        };

        const handleWheel = (e: WheelEvent) => {
            // Only zoom when Shift is held
            if (state.isShiftDown) {
                e.preventDefault();
                state.lastInteractionTime = Date.now(); // Reset auto-return timer
                state.targetCamZ = Math.max(8, Math.min(150, state.targetCamZ + e.deltaY * 0.08));
            }
            // Without shift, allow normal page scrolling
        };
        const handleContextMenu = (e: Event) => e.preventDefault();

        // Event Handlers - Mobile Touch
        const getTouchDistance = (touches: TouchList) => {
            if (touches.length < 2) return 0;
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        };

        const handleTouchStart = (e: TouchEvent) => {
            state.lastInteractionTime = Date.now(); // Reset auto-return timer
            if (e.touches.length === 1) {
                state.isTouching = true;
                state.lastTouchX = e.touches[0].clientX;
                state.lastTouchY = e.touches[0].clientY;
            } else if (e.touches.length === 2) {
                state.touchStartDist = getTouchDistance(e.touches);
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            state.lastInteractionTime = Date.now(); // Reset auto-return timer

            if (e.touches.length === 1 && state.isTouching) {
                // Single finger = rotate/move camera
                const dx = e.touches[0].clientX - state.lastTouchX;
                const dy = e.touches[0].clientY - state.lastTouchY;

                state.targetRotY = dx * 0.3;
                state.targetRotX = dy * 0.2;

                state.lastTouchX = e.touches[0].clientX;
                state.lastTouchY = e.touches[0].clientY;
            } else if (e.touches.length === 2) {
                // Pinch = zoom
                const currentDist = getTouchDistance(e.touches);
                const delta = state.touchStartDist - currentDist;
                state.targetCamZ = Math.max(8, Math.min(150, state.targetCamZ + delta * 0.05));
                state.touchStartDist = currentDist;
            }
        };

        const handleTouchEnd = () => {
            state.isTouching = false;
        };

        // Add event listeners
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('contextmenu', handleContextMenu);

        // Touch events for mobile
        const canvas = renderer.domElement;
        canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvas.addEventListener('touchend', handleTouchEnd);
    };

    // Physics disabled - falling blocks removed per user feedback
    const initPhysics = () => {
        // Physics engine disabled
    };

    return (
        <>
            {/* Google Fonts */}

            {/* Google Fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Noto+Sans+KR:wght@300;400;700&display=swap"
                rel="stylesheet"
            />

            <div
                className="relative w-full h-screen overflow-hidden select-none"
                style={{ backgroundColor: '#000' }}
            >
                {/* Loading State */}
                {/* Loading State Removed */}

                {/* Background: Three.js */}
                <div
                    ref={canvasContainerRef}
                    className="absolute inset-0 z-0"
                />

                {/* Overlay */}
                <div
                    className="absolute inset-0 z-[5] pointer-events-none"
                    style={{ background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 100%)' }}
                />

                {/* Physics Layer removed - falling blocks disabled */}

                {/* UI Layer */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    {/* Header */}
                    <div className="absolute top-[5%] w-full text-center">
                        <h1
                            className="text-4xl md:text-6xl font-black text-white tracking-wider"
                            style={{
                                fontFamily: "'Orbitron', sans-serif",
                                textShadow: '0 0 30px rgba(6, 182, 212, 0.6)'
                            }}
                        >
                            FUTURE STRATEGY <span style={{ color: '#22d3ee' }}>TF</span>
                        </h1>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <p
                                className="text-slate-400 tracking-widest text-sm"
                                style={{ fontFamily: 'monospace' }}
                            >
                                GRAVITY PROTOCOL: ACTIVE
                            </p>
                        </div>

                        {/* 한글 서브타이틀 */}
                        <p className="text-cyan-400 mt-4 text-lg md:text-xl" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
                            서원토건 미래전략TF | Seowon Vision 2030
                        </p>
                    </div>

                    {/* Controls Hint - PC */}
                    <div
                        className="absolute bottom-8 right-8 text-right text-slate-500 text-xs hidden md:block"
                        style={{ fontFamily: 'monospace' }}
                    >
                        SHIFT + MOUSE: ORBIT<br />
                        SHIFT + DRAG: ROTATE<br />
                        SHIFT + SCROLL: ZOOM<br />
                        SPACEBAR: RESET VIEW
                    </div>

                    {/* Controls Hint - Mobile */}
                    <div
                        className="absolute bottom-8 right-8 text-right text-slate-500 text-xs block md:hidden"
                        style={{ fontFamily: 'monospace' }}
                    >
                        SWIPE: ROTATE<br />
                        PINCH: ZOOM
                    </div>

                    {/* CTA Buttons */}
                    <div className="absolute bottom-8 left-8 flex gap-4 pointer-events-auto">
                        <a
                            href="#trends"
                            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl 
                                hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/25
                                hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-1"
                        >
                            2026 트렌드 보기
                        </a>
                        <Link
                            href="/about"
                            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl 
                                backdrop-blur-sm transition-all duration-300 border border-white/20
                                hover:border-white/40 hover:-translate-y-1"
                        >
                            TF 소개
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
