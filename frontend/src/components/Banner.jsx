import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const FullSizeModel = ({ src, width = '100%', height = '100%' }) => {
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
          5000 // Extend far clip plane
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

              // Center the model
              model.position.sub(center);

              // Rotate the model slightly to the right (around Y-axis)
              const rotationAngle = Math.PI / 0.7; // Adjust rotation angle as needed
              model.rotation.y = rotationAngle;
              model.rotation.x = 0.2;

              // Calculate scaling factor for 80% size
              const maxDimension = Math.max(size.x, size.y, size.z);
              const scale = Math.min(
                  (containerRef.current.clientWidth * 0.8) / maxDimension,
                  (containerRef.current.clientHeight * 0.8) / maxDimension
              ); // Ensure the model occupies 80% of the space
              model.scale.setScalar(scale);

              // Adjust camera position dynamically for zooming out
              const distance = maxDimension * 2.2; // Increase the multiplier to zoom out further
              camera.position.set(0, 0, distance);
              camera.lookAt(0, 0, 0);
          },
          undefined,
          (error) => {
              console.error('Error loading model:', error);
          }
      );

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.enableZoom = true;

      const animate = () => {
          requestAnimationFrame(animate);

          if (model) {
            model.rotation.y += 0.01; // Adjust speed by changing increment value
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
  }, [src]);

  return (
      <div
          ref={containerRef}
          style={{
              width,
              height,
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: 'transparent',
          }}
      ></div>
  );
};


// Banner Component
function Banner() {
  return (
      <>
          <div className="mt-10 bg-slate-200 mb-10">
              <div>
                  <h1 className="text-center text-indigo-800 font-semibold text-3xl pt-5 pb-1">
                      A sneak peek into the digital experience
                  </h1>
              </div>

              <div
                  className="model-container ml-10 mr-20 rounded-3xl p-10 bg-slate-300"
                  style={{
                      width: "calc(100% - 40px)", // Adjust for margin
                      height: "600px", // Full height for the div
                  }}
              >
                  <FullSizeModel src="/models/building.glb" />
              </div>
          </div>
      </>
  );
}

export default Banner;
