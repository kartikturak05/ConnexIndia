import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const FullSizeModel = ({ src, width = "100%", height = "100%" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      5000
    );

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    let model;

    loader.load(
      src,
      (gltf) => {
        model = gltf.scene;
        scene.add(model);

        // Center and Scale the Model
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        model.position.sub(center); // Center the model

        const maxDimension = Math.max(size.x, size.y, size.z);
        const scale = Math.min(
          (containerRef.current.clientWidth * 0.8) / maxDimension,
          (containerRef.current.clientHeight * 0.8) / maxDimension
        );
        model.scale.setScalar(scale); // Scale the model to fit 80% of container space

        const distance = maxDimension * 2.1;
        camera.position.set(0, distance * 0.5, distance); // Adjust for an upper view
        camera.lookAt(0, 0, 0);
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    const animate = () => {
      requestAnimationFrame(animate);

      if (model) {
        model.rotation.y += 0.007; // Rotate the model
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [window.onresize]);

  return (
    <div
      ref={containerRef}
      style={{
        width,
        height,
        overflow: "hidden",
        position: "relative",
        backgroundColor: "transparent",
      }}
    ></div>
  );
};

function Banner() {
  return (
    <>
      <div className="mt-10 bg-slate-200 mb-10 flex flex-col items-center">
        <h1 className="text-center text-indigo-800 font-semibold text-3xl pt-5 pb-1">
          A sneak peek into the digital experience
        </h1>
        <div
          className="model-container rounded-3xl p-10 bg-slate-300 flex justify-center items-center"
          style={{
            width: "90%", // Responsive width
            height: "600px", // Set fixed height for consistent appearance
            margin: "0 auto",
          }}
        >
          <FullSizeModel src="/models/building.glb" />
        </div>
      </div>
    </>
  );
}

export default Banner;
