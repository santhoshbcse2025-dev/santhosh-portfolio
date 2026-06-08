'use client';

import { useEffect, useRef } from 'react';
import styles from './CinematicLayer.module.css';

export default function CinematicLayer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let animationId;
    let THREE;
    let renderer, scene, camera;
    let particles, particleSystem;
    let mouse = { x: 0, y: 0 };
    let targetMouse = { x: 0, y: 0 };
    let clock;

    async function init() {
      THREE = await import('three');
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Scene
      scene = new THREE.Scene();
      clock = new THREE.Clock();

      // Camera
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      // Renderer
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);

      // Particles
      const count = window.innerWidth < 768 ? 280 : 600;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const speeds = new Float32Array(count);
      const offsets = new Float32Array(count);

      // Warm palette: deep orange, amber, warm white, soft gold
      const palette = [
        new THREE.Color(0xff6a1a), // orange
        new THREE.Color(0xff9a40), // amber
        new THREE.Color(0xffd580), // gold
        new THREE.Color(0xfff0cc), // warm white
        new THREE.Color(0xff4500), // deep orange
        new THREE.Color(0x4a9eff), // cool blue accent (monitor glow)
      ];

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        // Spread in 3D space — deeper z range for parallax depth
        positions[i3]     = (Math.random() - 0.5) * 20;
        positions[i3 + 1] = (Math.random() - 0.5) * 12;
        positions[i3 + 2] = (Math.random() - 0.5) * 8;

        // Mostly warm orange, rare blue accents
        const colorIdx = Math.random() < 0.08
          ? 5
          : Math.floor(Math.random() * 5);
        const c = palette[colorIdx];
        colors[i3]     = c.r;
        colors[i3 + 1] = c.g;
        colors[i3 + 2] = c.b;

        sizes[i] = Math.random() * 18 + 3;
        speeds[i] = Math.random() * 0.3 + 0.1;
        offsets[i] = Math.random() * Math.PI * 2;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      // Bokeh circle texture
      const textureCanvas = document.createElement('canvas');
      textureCanvas.width = 64;
      textureCanvas.height = 64;
      const ctx = textureCanvas.getContext('2d');
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0,   'rgba(255,255,255,1)');
      gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
      gradient.addColorStop(0.5, 'rgba(255,255,255,0.2)');
      gradient.addColorStop(1,   'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      const texture = new THREE.CanvasTexture(textureCanvas);

      const material = new THREE.PointsMaterial({
        size: 0.15,
        map: texture,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });

      particleSystem = new THREE.Points(geometry, material);
      scene.add(particleSystem);

      // Store for animation
      particles = { positions, speeds, offsets, count };

      // Mouse parallax
      const onMouseMove = (e) => {
        targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('mousemove', onMouseMove);

      // Resize
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      // Animate
      const posAttr = particleSystem.geometry.attributes.position;

      function animate() {
        animationId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        // Float particles with sine oscillation
        for (let i = 0; i < particles.count; i++) {
          const i3 = i * 3;
          const speed = particles.speeds[i];
          const offset = particles.offsets[i];

          posAttr.array[i3]     += Math.sin(t * speed * 0.4 + offset) * 0.0008;
          posAttr.array[i3 + 1] += Math.cos(t * speed * 0.3 + offset * 1.3) * 0.0006;
          posAttr.array[i3 + 2] += Math.sin(t * speed * 0.2 + offset * 0.7) * 0.0004;

          // Wrap bounds
          if (posAttr.array[i3 + 1] > 6)  posAttr.array[i3 + 1] = -6;
          if (posAttr.array[i3 + 1] < -6) posAttr.array[i3 + 1] = 6;
          if (posAttr.array[i3]     > 10) posAttr.array[i3]      = -10;
          if (posAttr.array[i3]     < -10) posAttr.array[i3]     = 10;
        }
        posAttr.needsUpdate = true;

        // Smooth mouse parallax
        mouse.x += (targetMouse.x - mouse.x) * 0.03;
        mouse.y += (targetMouse.y - mouse.y) * 0.03;
        camera.position.x = mouse.x * 0.4;
        camera.position.y = mouse.y * 0.25;

        // Slowly rotate the entire system
        particleSystem.rotation.y = t * 0.012;
        particleSystem.rotation.x = Math.sin(t * 0.008) * 0.04;

        renderer.render(scene, camera);
      }

      animate();

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
      };
    }

    let cleanup;
    init().then(fn => { cleanup = fn; });

    return () => {
      cancelAnimationFrame(animationId);
      if (cleanup) cleanup();
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
      }
      if (particleSystem) {
        particleSystem.geometry.dispose();
        particleSystem.material.dispose();
      }
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
