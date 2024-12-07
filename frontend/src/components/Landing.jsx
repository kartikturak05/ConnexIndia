import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Import OrbitControls

const FullSizeModel = ({ src, width = '600px', height = '350px' }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Initialize Three.js Scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(30, parseFloat(width) / parseFloat(height), 0.1, 10000);  // Adjusted FOV
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        // Set Renderer Size
        renderer.setSize(parseFloat(width), parseFloat(height));
        containerRef.current.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);  // White light with full intensity
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Additional directional light
        directionalLight.position.set(5, 5, 5); // Position of the light
        scene.add(directionalLight);

        // Load GLTF Model
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
                model.scale.set(1, 1, 1); // Adjust the scale if needed

                // Set camera position based on the model's bounding box
                // This ensures the model is always visible when the scene is loaded
                const maxSize = Math.max(size.x, size.y, size.z);
                camera.position.set(0, 0, maxSize * 2.5);  // Zoomed in enough to fit the model within the view

            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            (error) => {
                console.error('Error loading the model:', error);
            }
        );

        // Add OrbitControls to allow mouse interaction
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;

        // Animation Loop (no rotation)
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        // Clean up on unmount
        return () => {
            renderer.dispose();
            containerRef.current.removeChild(renderer.domElement);
        };
    }, [src, width, height]);

    return (
        <div
            ref={containerRef}
            style={{
                width,
                height,
                overflow: 'hidden',
                position: 'relative',
                // backgroundColor: '#d3d3d3',
                backgroundColor: 'transparent',
            }}
            className="model-container"
        ></div>
    );
};

function Landing() {
    return (
        <>
            <div>
                <div className='mt-20 bg-gradient-to-r from-[rgba(252,238,238,1)] to-[rgba(221,254,243,1)] w-full h-[450px] flex flex-row pl-20 pr-20 pb-15 pt-5 justify-evenly'>
                    <div className="content flex flex-col mt-100">
                        <div className='ml-150 w-50 flex flex-wrap' >
                            <h1 className='text-indigo-800 font-medium text-6xl mb-5'>What We Do</h1>
                            <p className='text-[#0284c7] text-3xl font-medium tracking-normal'>Connex India is an augumented reality <br />platform for design collaboration that <br />enables the viewing of 3D models in AR format</p>
                        </div>
                        <button className="bg-[#0284c7] text-white font-semibold w-[130px] pl-5 pr-5 pt-1 pb-1 text-3xl rounded-full mt-10 ml-20 ">DEMO</button>
                    </div>
                    <div style={{ padding: '20px' }}>
                        <FullSizeModel
                            src="/models/phoenix_bird.glb"
                            width="600px"
                            height="350px"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Landing;
