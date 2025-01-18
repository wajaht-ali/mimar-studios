import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const ThreeDViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("0xf3f3f3");
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x4f46e5 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({
      color: 0xf3f3f3,
      linewidth: 2,
    });
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    scene.add(edges);
    camera.position.z = 4;
    const controls = new OrbitControls(camera, renderer.domElement);

    const handleResize = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "20px auto", width: "80vw" }}>
      <h1 className="mb-3 font-semibold text-3xl text-start text-primary">
        3D Object Viewer
      </h1>
      <p className="text-sm text-danger text-start">
        (Please hold the object, and drag or rotate to see effects.)
      </p>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "60vh",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          background: "#f0f0f0",
        }}
      />
    </div>
  );
};

export default ThreeDViewer;
