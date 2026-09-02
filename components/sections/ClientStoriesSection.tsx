"use client";

import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { StarIcon, CheckmarkCircleIcon, ArrowLeftIcon, ArrowRightIcon, CloseIcon, VerifiedBadgeIcon } from "@/components/icons";
import { GlassSurface } from "@/components/ui/GlassSurface";
import * as Flags from "country-flag-icons/react/3x2";
import gsap from "gsap";

// Helper component for country flag icons package
const CountryFlag = ({ code, className = "w-4 h-3 rounded-[2px]" }: { code: string; className?: string }) => {
  const FlagComponent = (Flags as Record<string, React.ComponentType<{ title?: string; className?: string }>>)[code];
  if (!FlagComponent) return null;
  return <FlagComponent className={className} />;
};

// Constants for globe configuration
const GLOBE_RADIUS = 4.2;
const MARKER_SIZE = 0.055;
const ARC_HEIGHT = 2.0;

// Helper function to convert lat/lng to 3D spherical coordinates
const latLongToVector3 = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
};

// Sample data for locations and connections
const locations = [
  { 
    id: "1", 
    name: "New York", 
    country: "United States",
    countryCode: "US",
    company: "Apex Capital", 
    role: "Head of Operations", 
    author: "Marcus Vance", 
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    rating: 5.0,
    verified: true,
    stat: "15 hrs/wk saved", 
    quote: "Their automated ledger sync wiped out 15 hours of weekly manual bookkeeping and eliminated reconciliation errors completely.",
    desc: "Autonomous financial ledger sync & automated audit across Stripe & multi-bank APIs.",
    lat: 40.7128, 
    lng: -74.0060 
  },
  { 
    id: "2", 
    name: "London", 
    country: "United Kingdom",
    countryCode: "GB",
    company: "MyAskAI", 
    role: "CEO", 
    author: "Alex Rainey", 
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
    rating: 5.0,
    verified: true,
    stat: "100k+ Queries/mo", 
    quote: "It was the best project management service I've experienced working with third-party developers or agencies. They shipped in weeks what others quoted six months for.",
    desc: "Enterprise RAG copilot answering 100k+ customer questions with sub-second citations.",
    lat: 51.5074, 
    lng: -0.1278 
  },
  { 
    id: "3", 
    name: "Tokyo", 
    country: "Japan",
    countryCode: "JP",
    company: "FlyWise Global", 
    role: "VP Engineering", 
    author: "Kenji Sato", 
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80",
    rating: 4.9,
    verified: true,
    stat: "-82% Latency", 
    quote: "Autonomous aviation dispatch reducing manual coordination by 82%. Integrated live weather telemetry with pilot scheduling.",
    desc: "Autonomous flight turnaround coordination & pilot telemetry dispatch systems.",
    lat: 35.6762, 
    lng: 139.6503 
  },
  { 
    id: "4", 
    name: "Sydney", 
    country: "Australia",
    countryCode: "AU",
    company: "Bellmade Goods", 
    role: "Chief Product Officer", 
    author: "Chloe Adams", 
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    rating: 5.0,
    verified: true,
    stat: "38ms Latency", 
    quote: "Engineered headless edge architecture slashing bounce rates by 68% on mobile devices across APAC.",
    desc: "Ultra-fast headless edge commerce storefront with zero-downtime automated deployment.",
    lat: -33.8688, 
    lng: 151.2093 
  },
  { 
    id: "5", 
    name: "San Francisco", 
    country: "United States",
    countryCode: "US",
    company: "SizzleKick", 
    role: "Founder & CEO", 
    author: "Andrew Heath", 
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80",
    rating: 5.0,
    verified: true,
    stat: "+64% ROAS", 
    quote: "Goodspeed's ability to think about how to do things in a better and more intelligent way is impressive. They transformed our product speed.",
    desc: "Autonomous creative generation engine producing 600+ high-converting video variations.",
    lat: 37.7749, 
    lng: -122.4194 
  },
  { 
    id: "6", 
    name: "Dubai", 
    country: "United Arab Emirates",
    countryCode: "AE",
    company: "Apex Global", 
    role: "Director of Ops", 
    author: "Tariq Al-Mansoor", 
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80",
    rating: 5.0,
    verified: true,
    stat: "2.4x ROI", 
    quote: "Self-healing logistics workflows replacing manual spreadsheets with real-time autonomous reasoning agents.",
    desc: "Self-healing logistics workflows replacing manual spreadsheets with real-time AI agents.",
    lat: 25.2048, 
    lng: 55.2708 
  },
  { 
    id: "7", 
    name: "Zurich", 
    country: "Switzerland",
    countryCode: "CH",
    company: "LexiGuard", 
    role: "General Counsel", 
    author: "Sophia Chen", 
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
    rating: 5.0,
    verified: true,
    stat: "45s Review", 
    quote: "The custom LLM contract workspace transformed our supplier review pipeline from 48 hours to under 45 seconds per document.",
    desc: "Private enterprise contract workspace redlining 60-page vendor agreements in seconds.",
    lat: 47.3769, 
    lng: 8.5417 
  },
  { 
    id: "8", 
    name: "Singapore", 
    country: "Singapore",
    countryCode: "SG",
    company: "Nexa Health", 
    role: "Lead Architect", 
    author: "Dr. James Lee", 
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160&auto=format&fit=crop&q=80",
    rating: 5.0,
    verified: false,
    stat: "99.9% Uptime", 
    quote: "High-compliance patient triage routing & automated medical transcription copilot running securely in production.",
    desc: "High-compliance patient triage routing & automated medical transcription copilot.",
    lat: 1.3521, 
    lng: 103.8198 
  }
];

const connections = [
  { start: "5", end: "1" }, // SF -> NY
  { start: "1", end: "2" }, // NY -> London
  { start: "2", end: "7" }, // London -> Zurich
  { start: "7", end: "6" }, // Zurich -> Dubai
  { start: "6", end: "8" }, // Dubai -> Singapore
  { start: "8", end: "3" }, // Singapore -> Tokyo
  { start: "3", end: "4" }, // Tokyo -> Sydney
  { start: "4", end: "5" }, // Sydney -> SF
  { start: "1", end: "3" }, // NY -> Tokyo
  { start: "2", end: "8" }, // London -> Singapore
];

export function ClientStoriesSection() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredHub, setHoveredHub] = useState<(typeof locations)[0] | null>(null);
  const [selectedHubId, setSelectedHubId] = useState<string>("5"); // Default: SF
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);

  // References to communicate with 3D scene without causing React unmount loops
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const markersRef = useRef<THREE.Mesh[]>([]);
  const selectedHubIdRef = useRef<string>("5");
  const isAutoRotatingRef = useRef<boolean>(true);
  const targetRotationYRef = useRef<number | null>(null);
  const lastHoveredIdRef = useRef<string | null>(null);

  // Keep refs in sync with state
  useEffect(() => {
    selectedHubIdRef.current = selectedHubId;
  }, [selectedHubId]);

  useEffect(() => {
    isAutoRotatingRef.current = isAutoRotating;
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotating;
    }
  }, [isAutoRotating]);

  // Active selected hub data
  const activeHub = useMemo(() => {
    return locations.find((l) => l.id === selectedHubId) || locations[0];
  }, [selectedHubId]);

  // GSAP Sliding Pill Indicator tracking for City Hub buttons
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const indicatorRef = useRef<HTMLDivElement>(null);
  const isInitialIndicatorSet = useRef<boolean>(false);

  useEffect(() => {
    const container = tabsContainerRef.current;
    const activeBtn = buttonRefs.current[selectedHubId];
    const indicator = indicatorRef.current;
    if (!container || !activeBtn || !indicator) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    const targetX = btnRect.left - containerRect.left;
    const targetY = btnRect.top - containerRect.top;
    const targetW = btnRect.width;
    const targetH = btnRect.height;

    if (!isInitialIndicatorSet.current) {
      isInitialIndicatorSet.current = true;
      gsap.set(indicator, {
        x: targetX,
        y: targetY,
        width: targetW,
        height: targetH,
        opacity: 1,
      });
    } else {
      // GSAP smooth gliding animation
      gsap.to(indicator, {
        x: targetX,
        y: targetY,
        width: targetW,
        height: targetH,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
  }, [selectedHubId]);

  useEffect(() => {
    const handleResize = () => {
      const container = tabsContainerRef.current;
      const activeBtn = buttonRefs.current[selectedHubId];
      const indicator = indicatorRef.current;
      if (!container || !activeBtn || !indicator) return;

      const containerRect = container.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();

      gsap.set(indicator, {
        x: btnRect.left - containerRect.left,
        y: btnRect.top - containerRect.top,
        width: btnRect.width,
        height: btnRect.height,
        opacity: 1,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedHubId]);

  // Rotate globe smoothly to target location & pause rotation
  const focusLocation = useCallback((locId: string, openPopover = true) => {
    setSelectedHubId(locId);
    if (openPopover) {
      setIsPopoverOpen(true);
      // Turn off auto-rotation when user selects a hub
      setIsAutoRotating(false);
      isAutoRotatingRef.current = false;
      if (controlsRef.current) {
        controlsRef.current.autoRotate = false;
      }
    }
    const loc = locations.find((l) => l.id === locId);
    if (!loc || !globeGroupRef.current) return;

    // Calculate rotation angle so the target longitude faces the front camera (z axis)
    const targetLngRad = ((loc.lng + 180) * Math.PI) / 180;
    targetRotationYRef.current = -targetLngRad + Math.PI / 2;
  }, []);

  const nextHub = useCallback(() => {
    const currentIndex = locations.findIndex((l) => l.id === selectedHubId);
    const nextIndex = (currentIndex + 1) % locations.length;
    focusLocation(locations[nextIndex].id, true);
  }, [selectedHubId, focusLocation]);

  const prevHub = useCallback(() => {
    const currentIndex = locations.findIndex((l) => l.id === selectedHubId);
    const prevIndex = currentIndex === 0 ? locations.length - 1 : currentIndex - 1;
    focusLocation(locations[prevIndex].id, true);
  }, [selectedHubId, focusLocation]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Prevent double rendering in React StrictMode
    mountRef.current.innerHTML = "";

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    
    // --- Camera Setup ---
    const initialWidth = mountRef.current.clientWidth || window.innerWidth;
    const initialHeight = mountRef.current.clientHeight || window.innerHeight;
    
    const camera = new THREE.PerspectiveCamera(
      42,
      initialWidth / initialHeight,
      0.1,
      1000
    );
    // Center camera precisely at (0, 0, 13.2) looking at (0, 0, 0)
    camera.position.set(0, 0, 13.2);
    cameraRef.current = camera;

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(initialWidth, initialHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.touchAction = "none";
    mountRef.current.appendChild(renderer.domElement);

    // --- Controls ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.minDistance = 5.2; // Allows seamless close-up zoom filling the entire section
    controls.maxDistance = 22.0;
    controls.rotateSpeed = 0.8;
    controls.target.set(0, 0, 0);
    controls.autoRotate = isAutoRotatingRef.current;
    controls.autoRotateSpeed = 0.6;
    controlsRef.current = controls;

    // --- Lighting ---
    // 1. Hemisphere Light: Soft ambient light (reduced brightness)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x14281e, 1.2);
    scene.add(hemiLight);

    // 2. Ambient Light fill (toned down)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // 3. Sun Key Light (Top-Right-Front)
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(12, 10, 14);
    scene.add(sunLight);

    // 4. Bottom Fill Light (Bottom-Left-Front)
    const bottomFillLight = new THREE.DirectionalLight(0x7ee787, 0.9);
    bottomFillLight.position.set(-10, -14, 10);
    scene.add(bottomFillLight);

    // 5. Back Rim Light
    const backRimLight = new THREE.DirectionalLight(0xd4ff00, 1.0);
    backRimLight.position.set(0, 0, -16);
    scene.add(backRimLight);

    // 6. Subtle Front Point Light
    const frontPointLight = new THREE.PointLight(0xffffff, 0.7, 50);
    frontPointLight.position.set(0, -4, 12);
    scene.add(frontPointLight);

    // --- Background Twinkling Starfield ---
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 700;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 95;
      starPositions[i + 1] = (Math.random() - 0.5) * 95;
      starPositions[i + 2] = (Math.random() - 0.5) * 55 - 12;
    }
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0x98f5d0,
      size: 0.13,
      transparent: true,
      opacity: 0.6,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // --- Group for Globe and Elements ---
    const globeGroup = new THREE.Group();
    globeGroupRef.current = globeGroup;
    scene.add(globeGroup);

    // --- Earth Mesh ---
    // Create a fallback material in case texture fails to load quickly
    const earthGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const textureLoader = new THREE.TextureLoader();

    // Load high-resolution local texture directly from public folder
    const earthTexture = textureLoader.load("/images/earth-blue-marble.jpg");
    const bumpTexture = textureLoader.load("/images/earth-topology.png");

    const earthMaterial = new THREE.MeshStandardMaterial({ 
      map: earthTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.03,
      roughness: 0.75, 
      metalness: 0.05,
      emissive: 0x040e08,
      emissiveIntensity: 0.12,
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    globeGroup.add(earthMesh);

    // Outer Atmospheric Glow Halo
    const atmosphereGeometry = new THREE.SphereGeometry(GLOBE_RADIUS * 1.025, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x2ee59d,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    globeGroup.add(atmosphereMesh);

    // Load texture asynchronously
    textureLoader.load(
      "/images/earth-blue-marble.jpg",
      (texture) => {
        earthMaterial.map = texture;
        earthMaterial.needsUpdate = true;
      }
    );

    // --- Markers ---
    const markers: THREE.Mesh[] = [];
    const markerRings: THREE.Mesh[] = [];
    const markerGeometry = new THREE.SphereGeometry(MARKER_SIZE, 24, 24);
    const defaultMarkerMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xd4ff00,
      emissive: 0xd4ff00,
      emissiveIntensity: 0.9,
      roughness: 0.2
    });

    // Sleek, delicate beacon ring geometry (compact, non-intrusive)
    const ringGeo = new THREE.RingGeometry(0.065, 0.095, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd4ff00,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
    });

    locations.forEach((loc) => {
      const pos = latLongToVector3(loc.lat, loc.lng, GLOBE_RADIUS);
      const marker = new THREE.Mesh(markerGeometry, defaultMarkerMaterial.clone());
      marker.position.copy(pos);
      marker.userData = loc;
      globeGroup.add(marker);
      markers.push(marker);

      // Subtle beacon ring around marker
      const ring = new THREE.Mesh(ringGeo, ringMat.clone());
      ring.position.copy(pos);
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      ring.userData = { phase: Math.random() * Math.PI };
      globeGroup.add(ring);
      markerRings.push(ring);
    });
    markersRef.current = markers;

    // --- Animated Arcs ---
    const animatedLines: THREE.Line[] = [];
    connections.forEach((conn) => {
      const startLoc = locations.find((l) => l.id === conn.start);
      const endLoc = locations.find((l) => l.id === conn.end);

      if (startLoc && endLoc) {
        const startVec = latLongToVector3(startLoc.lat, startLoc.lng, GLOBE_RADIUS);
        const endVec = latLongToVector3(endLoc.lat, endLoc.lng, GLOBE_RADIUS);

        const midPoint = startVec
          .clone()
          .lerp(endVec, 0.5)
          .normalize()
          .multiplyScalar(GLOBE_RADIUS + ARC_HEIGHT);
        const curve = new THREE.QuadraticBezierCurve3(startVec, midPoint, endVec);
        const points = curve.getPoints(60);

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: 0x70ffb0,
          transparent: true,
          opacity: 0.6,
          linewidth: 2, // Note: linewidth often doesn't work well on Windows/WebGL
        });

        const line = new THREE.Line(geometry, material);
        // Store random phase for staggered animation
        line.userData = { phase: Math.random() * Math.PI * 2 };
        globeGroup.add(line);
        animatedLines.push(line);
      }
    });

    // --- Raycaster for Hover Events ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    const pointerDownPos = { x: 0, y: 0 };

    const onPointerMove = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      // Calculate mouse position in normalized device coordinates (-1 to +1)
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onPointerDown = (event: PointerEvent) => {
      pointerDownPos.x = event.clientX;
      pointerDownPos.y = event.clientY;
      // If user starts dragging, release programmatic lerp lock
      targetRotationYRef.current = null;
    };

    const onPointerUp = (event: PointerEvent) => {
      const dx = event.clientX - pointerDownPos.x;
      const dy = event.clientY - pointerDownPos.y;
      // Only treat as click if pointer barely moved (< 6px)
      if (Math.hypot(dx, dy) < 6) {
        const rect = renderer.domElement.getBoundingClientRect();
        const clickMouse = new THREE.Vector2(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1
        );
        raycaster.setFromCamera(clickMouse, camera);
        const intersects = raycaster.intersectObjects(markers);
        if (intersects.length > 0) {
          const marker = intersects[0].object as THREE.Mesh;
          if (marker.userData.id) {
            focusLocation(marker.userData.id, true);
          }
        }
      }
    };

    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);

    // --- Window Resize Handler ---
    const onWindowResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(() => {
      onWindowResize();
    });
    resizeObserver.observe(mountRef.current);
    window.addEventListener("resize", onWindowResize);

    // --- Animation Loop ---
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth programmatic target rotation to selected hub
      if (targetRotationYRef.current !== null) {
        globeGroup.rotation.y += (targetRotationYRef.current - globeGroup.rotation.y) * 0.05;
        if (Math.abs(targetRotationYRef.current - globeGroup.rotation.y) < 0.002) {
          targetRotationYRef.current = null;
        }
      }

      // Update controls (OrbitControls handles manual drag, damping, and autoRotate)
      controls.update();

      // Animate arcs (pulsing opacity)
      animatedLines.forEach((line) => {
        (line.material as THREE.LineBasicMaterial).opacity =
          0.3 + 0.55 * Math.sin(elapsedTime * 2.5 + line.userData.phase);
      });

      // Animate subtle beacon rings (delicate micro pulse)
      markerRings.forEach((ring) => {
        const pulse = (Math.sin(elapsedTime * 2.5 + ring.userData.phase) + 1) / 2;
        ring.scale.set(1 + pulse * 0.35, 1 + pulse * 0.35, 1);
        (ring.material as THREE.MeshBasicMaterial).opacity = (1 - pulse) * 0.5;
      });

      // Raycasting for hover
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markers);

      // Reset all markers
      const currentSelectedId = selectedHubIdRef.current;
      markers.forEach((m) => {
        const isSelected = m.userData.id === currentSelectedId;
        (m.material as THREE.MeshStandardMaterial).color.setHex(
          isSelected ? 0xd4ff00 : 0x2ee59d
        );
        (m.material as THREE.MeshStandardMaterial).emissive.setHex(
          isSelected ? 0xd4ff00 : 0x2ee59d
        );
        m.scale.set(isSelected ? 1.25 : 1, isSelected ? 1.25 : 1, isSelected ? 1.25 : 1);
      });

      let currentlyHoveredObj: (typeof locations)[0] | null = null;

      if (intersects.length > 0) {
        // Get the first intersected object
        const intersectedMarker = intersects[0].object as THREE.Mesh;
        (intersectedMarker.material as THREE.MeshStandardMaterial).color.setHex(0xff4757); // Hover color
        (intersectedMarker.material as THREE.MeshStandardMaterial).emissive.setHex(0xff4757);
        intersectedMarker.scale.set(1.35, 1.35, 1.35);
        currentlyHoveredObj = intersectedMarker.userData as (typeof locations)[0];
      }

      // Only update state if hover state actually changed to avoid 60fps React re-render thrashing
      const hoveredId = currentlyHoveredObj ? currentlyHoveredObj.id : null;
      if (hoveredId !== lastHoveredIdRef.current) {
        lastHoveredIdRef.current = hoveredId;
        setHoveredHub(currentlyHoveredObj);
      }

      // Render scene
      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      window.removeEventListener("resize", onWindowResize);
      resizeObserver.disconnect();
      if (renderer.domElement) {
        renderer.domElement.removeEventListener("pointermove", onPointerMove);
        renderer.domElement.removeEventListener("pointerdown", onPointerDown);
        renderer.domElement.removeEventListener("pointerup", onPointerUp);
      }
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current) {
        mountRef.current.innerHTML = "";
      }
      // Dispose geometries and materials
      earthGeometry.dispose();
      earthMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      markerGeometry.dispose();
      defaultMarkerMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      animatedLines.forEach((line) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
      markerRings.forEach((ring) => {
        ring.geometry.dispose();
        (ring.material as THREE.Material).dispose();
      });
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
      controls.dispose();
    };
  }, [focusLocation]); // Empty dependency array ensures this runs only once on mount

  // Correct Three.js OrbitControls zoom handler that calculates distance relative to target
  const handleZoom = (delta: number) => {
    if (!cameraRef.current || !controlsRef.current) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    // Vector from target to camera
    const offset = new THREE.Vector3().subVectors(camera.position, controls.target);
    const currentDistance = offset.length();
    const newDistance = THREE.MathUtils.clamp(
      currentDistance + delta,
      controls.minDistance,
      controls.maxDistance
    );

    offset.setLength(newDistance);
    camera.position.copy(controls.target).add(offset);
    controls.update();
  };

  const handleReset = () => {
    if (!cameraRef.current || !controlsRef.current || !globeGroupRef.current) return;
    cameraRef.current.position.set(0, 0, 13.2);
    controlsRef.current.target.set(0, 0, 0);
    globeGroupRef.current.rotation.set(0, 0, 0);
    targetRotationYRef.current = null;
    setIsPopoverOpen(false);
    setIsAutoRotating(true);
    isAutoRotatingRef.current = true;
    if (controlsRef.current) {
      controlsRef.current.autoRotate = true;
    }
    focusLocation("5", false);
  };

  return (
    <section 
      id="stories" 
      className="relative w-full min-h-[750px] sm:min-h-[820px] lg:min-h-[880px] bg-gradient-to-b from-[#08120D] via-[#0D1C15] to-[#07110C] text-white flex flex-col justify-between overflow-hidden font-sans border-t border-[#243B2E] select-none"
    >
      {/* Dynamic Ambient Background Glows */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(212, 255, 0, 0.12) 0%, rgba(46, 229, 157, 0.05) 35%, transparent 70%)"
        }}
      />
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #D4FF00 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* 3D Canvas Container - Spans the ENTIRE section background seamlessly */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none z-0"
      />

      {/* Overlay UI (Top Header & Quick Hub Navigation Pills) */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-4 z-10 pointer-events-none">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gradient-accent tracking-wide leading-tight select-none">
              Client Stories
            </h2>
          </div>

          {/* Quick Hub Navigation Pills (Floating Independent Pills with GSAP Sliding Indicator) */}
          <div 
            ref={tabsContainerRef}
            className="relative flex flex-wrap items-center gap-2 pointer-events-auto max-w-full lg:max-w-xl justify-start lg:justify-end"
          >
            {/* GSAP Sliding Active Pill Indicator (3D Elevated Raised Button with Outer Drop Shadow & Top Bevel) */}
            <div
              ref={indicatorRef}
              className="absolute top-0 left-0 r-pill bg-gradient-to-b from-[#E6FF4D] to-[#BFEA00] border-t border-white/70 shadow-[0_6px_16px_rgba(0,0,0,0.65),0_2px_5px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.7)] pointer-events-none z-0 opacity-0"
            />

            {locations.map((loc) => {
              const isSelected = loc.id === selectedHubId;
              return (
                <button
                  key={loc.id}
                  ref={(el) => { buttonRefs.current[loc.id] = el; }}
                  onClick={() => focusLocation(loc.id, true)}
                  className={`relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 r-pill text-xs font-mono font-black transition-all duration-300 cursor-pointer backdrop-blur-md ${
                    isSelected
                      ? "text-black drop-shadow-none"
                      : "text-white/80 bg-[#13251B]/80 border border-white/10 hover:border-white/30 hover:text-white hover:bg-[#1A3324] hover:scale-[1.03] shadow-[0_2px_6px_rgba(0,0,0,0.3)]"
                  }`}
                >
                  <div className={`relative w-4 h-3 rounded-[2px] overflow-hidden shrink-0 transition-all duration-300 ${
                    isSelected ? "scale-105" : ""
                  }`}>
                    <CountryFlag code={loc.countryCode} className="w-4 h-3 object-cover rounded-[2px]" />
                  </div>
                  <span>{loc.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Middle Interactive Overlays (Toolbar, In-Section Floating Popover Card, Drag Hint) */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto flex-1 flex flex-col justify-end pb-4 z-10 pointer-events-none">
        {/* 3D Interactive Control Toolbar (Sleek Blurry Glass Backdrop + Eye-Catching Button Animations) */}
        <div className="absolute top-2 right-4 sm:right-8 z-20 pointer-events-auto">
          <div className="flex flex-col gap-1.5 p-1.5 r-lg bg-[#0A1810]/80 backdrop-blur-2xl border border-white/20 shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(212,255,0,0.12)]">
            <button
              onClick={() => {
                const nextState = !isAutoRotating;
                setIsAutoRotating(nextState);
                isAutoRotatingRef.current = nextState;
                if (controlsRef.current) {
                  controlsRef.current.autoRotate = nextState;
                }
              }}
              title={isAutoRotating ? "Pause auto-rotation" : "Resume auto-rotation"}
              className={`px-3 py-1.5 r-sm text-xs font-mono font-black tracking-wide transition-all duration-300 cursor-pointer ${
                isAutoRotating
                  ? "bg-[#D4FF00] text-black shadow-[0_0_18px_rgba(212,255,0,0.7)] scale-[1.03]"
                  : "text-white/80 bg-white/5 hover:bg-[#D4FF00] hover:text-black hover:shadow-[0_0_16px_rgba(212,255,0,0.6)] hover:scale-105 active:scale-95"
              }`}
            >
              {isAutoRotating ? "Auto ⏸" : "Auto ▶"}
            </button>
            <button
              onClick={() => handleZoom(-1.8)}
              title="Zoom In"
              className="p-1.5 r-sm text-sm font-bold text-white/80 hover:text-black hover:bg-[#D4FF00] hover:shadow-[0_0_16px_rgba(212,255,0,0.6)] transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer text-center"
            >
              +
            </button>
            <button
              onClick={() => handleZoom(1.8)}
              title="Zoom Out"
              className="p-1.5 r-sm text-sm font-bold text-white/80 hover:text-black hover:bg-[#D4FF00] hover:shadow-[0_0_16px_rgba(212,255,0,0.6)] transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer text-center"
            >
              &minus;
            </button>
            <button
              onClick={handleReset}
              title="Reset View"
              className="p-1.5 r-sm text-xs font-mono text-white/80 hover:text-black hover:bg-[#D4FF00] hover:shadow-[0_0_16px_rgba(212,255,0,0.6)] transition-all duration-300 hover:scale-110 active:scale-90 group cursor-pointer text-center"
            >
              <span className="inline-block transition-transform duration-500 group-hover:rotate-180">↺</span>
            </button>
          </div>
        </div>

        {/* In-Section Floating Client Story Popover (With Liquid Glass Surface) */}
        {isPopoverOpen ? (
          <div className="max-w-[calc(100%-1.5rem)] sm:max-w-lg w-full pointer-events-auto mb-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <GlassSurface
              borderRadius={10}
              backgroundOpacity={0.65}
              blur={14}
              saturation={1.5}
              className="p-5 sm:p-6 border-2 border-white/25 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(212,255,0,0.15)] text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsPopoverOpen(false)}
                className="absolute top-0 right-0 p-1.5 r-pill bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-20"
                title="Close popover"
              >
                <CloseIcon size={14} />
              </button>

              {/* Header: Verified Rating & ROI */}
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-3 pr-7 w-full">
                <div className="flex items-center gap-1.5">
                  {[...Array(Math.floor(activeHub.rating || 5))].map((_, i) => (
                    <StarIcon key={i} size={13} className="text-[#FBBF24] fill-[#FBBF24]" />
                  ))}
                  <span className="ml-1 font-mono text-[11px] font-bold text-white/90">
                    {(activeHub.rating || 5.0).toFixed(1)}
                  </span>
                  {activeHub.verified && (
                    <VerifiedBadgeIcon size={14} className="shrink-0 drop-shadow-xs" />
                  )}
                </div>
                <span className="font-mono text-xs font-black px-3 py-0.5 r-pill bg-[#D4FF00] text-black shadow-sm">
                  {activeHub.stat}
                </span>
              </div>

              {/* City & Country Hub with CountryFlag */}
              <div className="mb-2.5 w-full">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#D4FF00]/50 font-bold mb-2">
                  <div className="relative w-7 h-5 rounded-[2px] overflow-hidden shrink-0 border border-white/20">
                    <CountryFlag code={activeHub.countryCode} className="w-7 h-5 object-cover rounded-[2px]" />
                  </div>
                  <span>{activeHub.name}, {activeHub.country}</span>
                </div>
                <h3 className="text-base sm:text-xl font-normal! text-white font-heading">
                  {activeHub.company}
                </h3>
              </div>

              {/* Full Quote (Matches website r-md quote card radius) */}
              <blockquote className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed mb-3.5 font-normal italic bg-[#09150E]/55 p-3.5 r-md border border-white/10 w-full">
                &ldquo;{activeHub.quote}&rdquo;
              </blockquote>

              {/* Author Info with Real Portrait & Prev/Next */}
              <div className="flex items-center justify-between pt-2.5 border-t border-white/10 w-full">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden ring-1 ring-[#D4FF00]/40 shadow-md shrink-0">
                    <Image
                      src={activeHub.avatar}
                      alt={activeHub.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white font-heading">
                      {activeHub.author}
                    </div>
                    <div className="text-[11px] font-normal! tracking-tight! font-mono text-[#D4FF00]">
                      {activeHub.role}, {activeHub.company}
                    </div>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={prevHub}
                    className="p-2 r-pill bg-white/10 hover:bg-[#D4FF00] text-white hover:text-black transition-all cursor-pointer"
                    title="Previous client hub"
                  >
                    <ArrowLeftIcon size={12} />
                  </button>
                  <button
                    onClick={nextHub}
                    className="p-2 r-pill bg-white/10 hover:bg-[#D4FF00] text-white hover:text-black transition-all cursor-pointer"
                    title="Next client hub"
                  >
                    <ArrowRightIcon size={12} />
                  </button>
                </div>
              </div>
            </GlassSurface>
          </div>
        ) : (
          /* Docked Teaser Card when popover is closed (With Liquid Glass Surface) */
          <div className="max-w-[calc(100%-1.5rem)] sm:max-w-md w-full sm:w-auto pointer-events-auto mb-2">
            <div 
              onClick={() => focusLocation(selectedHubId, true)}
              className="cursor-pointer group"
            >
              <GlassSurface
                borderRadius={10}
                backgroundOpacity={0.6}
                blur={12}
                className="p-4 sm:p-5 border-2 border-white/20 group-hover:border-[#D4FF00]/60 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,255,0,0.12)] transition-all duration-300"
              >
                {/* Top Row: Stars & Stat Badge */}
                <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2.5 w-full">
                  <div className="flex items-center gap-1.5">
                    {[...Array(Math.floor(activeHub.rating || 5))].map((_, i) => (
                      <StarIcon key={i} size={13} className="text-[#FBBF24] fill-[#FBBF24]" />
                    ))}
                    <span className="ml-1 font-mono text-[11px] font-bold text-white/80">
                      {(activeHub.rating || 5.0).toFixed(1)}
                    </span>
                    {activeHub.verified && (
                      <VerifiedBadgeIcon size={14} className="shrink-0 drop-shadow-xs" />
                    )}
                  </div>
                  <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded bg-[#D4FF00] text-black">
                    {activeHub.stat}
                  </span>
                </div>

                {/* Company & City with CountryFlag */}
                <div className="flex items-center gap-2 mb-1 w-full">
                  <div className="relative w-4 h-3 rounded-[2px] overflow-hidden shrink-0 border border-white/20">
                    <CountryFlag code={activeHub.countryCode} className="w-4 h-3 object-cover rounded-[2px]" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white font-heading group-hover:text-[#D4FF00] transition-colors">
                    {activeHub.company} &mdash; <span className="text-[#D4FF00]">{activeHub.name}</span>
                  </h4>
                </div>
                <p className="text-xs text-[#D4E0D7] leading-relaxed mb-3 font-normal line-clamp-2 w-full">
                  &ldquo;{activeHub.quote}&rdquo;
                </p>

                {/* Author and Next/Prev Controls */}
                <div className="flex items-center justify-between pt-2.5 border-t border-white/10 w-full">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#D4FF00]/60 shrink-0">
                      <Image
                        src={activeHub.avatar}
                        alt={activeHub.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white font-heading">
                        {activeHub.author}
                      </div>
                      <div className="text-[11px] font-mono text-[#D4FF00]">
                        {activeHub.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={prevHub}
                      className="p-1.5 r-pill bg-white/10 hover:bg-[#D4FF00] text-white hover:text-black transition-colors cursor-pointer"
                      title="Previous client hub"
                    >
                      <ArrowLeftIcon size={12} />
                    </button>
                    <button
                      onClick={nextHub}
                      className="p-1.5 r-pill bg-white/10 hover:bg-[#D4FF00] text-white hover:text-black transition-colors cursor-pointer"
                      title="Next client hub"
                    >
                      <ArrowRightIcon size={12} />
                    </button>
                  </div>
                </div>
              </GlassSurface>
            </div>
          </div>
        )}
      </div>

      {/* HTML Hover Tooltip (Liquid Glass Surface with SVG Flag) */}
      {hoveredHub && !isPopoverOpen && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 animate-in fade-in zoom-in-95 duration-150">
          <GlassSurface
            borderRadius={8}
            backgroundOpacity={0.65}
            blur={12}
            saturation={1.5}
            className="p-3.5 sm:p-4 border border-[#D4FF00]/50 shadow-[0_15px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(212,255,0,0.25)] min-w-[250px]"
          >
            <div className="flex items-center gap-3.5">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#D4FF00] shrink-0">
                <Image
                  src={hoveredHub.avatar}
                  alt={hoveredHub.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="relative w-4 h-3 rounded-[2px] overflow-hidden shrink-0 border border-white/20">
                    <CountryFlag code={hoveredHub.countryCode} className="w-4 h-3 object-cover rounded-[2px]" />
                  </div>
                  <span className="text-sm font-extrabold text-white font-heading">
                    {hoveredHub.name}, {hoveredHub.country}
                  </span>
                </div>
                <div className="text-xs font-mono text-[#D4FF00] font-bold">
                  {hoveredHub.company} &bull; {hoveredHub.stat}
                </div>
                <div className="text-[10px] font-mono text-white/60 mt-0.5">
                  Click dot to open story &rarr;
                </div>
              </div>
            </div>
          </GlassSurface>
        </div>
      )}
    </section>
  );
}

export default ClientStoriesSection;
