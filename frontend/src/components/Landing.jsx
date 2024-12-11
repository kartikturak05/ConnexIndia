import React, { useEffect, useRef, useState } from 'react';
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
                camera.position.set(0, 0, maxSize * 2);  // Zoomed in enough to fit the model within the view

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

            if (model) {
                model.rotation.y += 0.01; // Adjust speed by changing increment value
            }

            controls.update();

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
                // backgroundColor: 'transparent',
            }}
            className="model-container"
        ></div>
    );
};


function Landing() {
    let Scwidth = "600px";
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Dynamically set width and height for the 3D model
        let modelWidth, modelHeight;
        if (screenSize.width > 1024) {
            modelWidth = "600px"; // Large screens
            modelHeight = "400px";
        } else if (screenSize.width > 768) {
            modelWidth = "450px"; // Medium screens
            modelHeight = "300px";
        } else {
            modelWidth = "300px"; // Small screens
            modelHeight = "200px";
        }

        // Cleanup on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [screenSize.innerWidth]);




    return (
        <>
            <div>
                <div
                    className="mt-16 bg-gradient-to-r from-[rgba(252,238,238,1)] to-[rgba(221,254,243,1)] w-full lg:h-auto sm:h-auto flex flex-wrap pl-5 pr-5 pb-16 justify-evenly sm:flex-col sm:items-center lg:flex-row p-5"
                >
                    {/* Content Section */}
                    <div className="content flex flex-col flex-wrap">
                        {/* Heading Section */}
                        <h1 className="text-indigo-800 font-medium text-6xl sm:text-3xl md:text-5xl lg:text-6xl sm:text-center mb-5">
                            What We Do
                        </h1>

                        {/* Paragraph Section */}
                        <div className="ml-150 w-50 flex flex-wrap flex-col justify-between items-center sm:text-center">
                            <p className="text-[#0284c7] font-medium tracking-normal text-xl sm:text-sm md:text-lg lg:text-3xl ml-5">
                                Connex India is an augmented reality <br />
                                platform for design collaboration that <br />
                                   enables the viewing of 3D models in AR format
                            </p>

                            {/* Centered Button */}
                            <button className="bg-[#0284c7] text-white font-semibold w-[130px] px-5 py-2 text-lg sm:text-base md:text-xl lg:text-2xl rounded-full mt-5 mb-3">
                                DEMO
                            </button>
                        </div>
                    </div>

                    {/* 3D Model Section */}
                    <div
                        className="model-container sm:w-[250px] md:w-[400px] lg:w-[600px] sm:mt-5 lg:mt-0"
                        style={{
                            margin: "0 auto",
                        }}
                    >
                        <FullSizeModel
                            src="/models/watch.glb"
                            width={screenSize.width < 768 ? "250px" : "650px"}
                            height={screenSize.width < 768 ? "200px" : "350px"}
                        />
                    </div>
                </div>

            </div>
        </>
    );
}

export default Landing;