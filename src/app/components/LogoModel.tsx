"use client";
import React, { useRef, Suspense, useLayoutEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Bounds } from '@react-three/drei';
import * as THREE from 'three';

// Model component - simplified, removing centering logic
function Model(props: any) {
  const { scene } = useGLTF('/assets/logo.glb');
  const groupRef = useRef<THREE.Group>(null!); // Keep ref if needed for other things, otherwise remove

  return (
    <group ref={groupRef} {...props}>
      <primitive 
        object={scene} 
        // Scale might need adjustment now that Bounds is controlling zoom
        // scale={5} 
        rotation={[-Math.PI / 2, Math.PI, Math.PI]} // Keep user's rotation
      />
    </group>
  );
}

// Preload the model for better performance
useGLTF.preload('/assets/logo.glb');

// Main component rendering the Canvas
const LogoModel: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}> 
      <Canvas camera={{ position: [0, 0, 5] }}> { /* Set a default camera position */ }
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        
        <Suspense fallback={null}> 
          {/* Wrap Model in Bounds */}
          <Bounds fit clip observe margin={1.5}> 
            <Model />
          </Bounds>
        </Suspense>

        <OrbitControls 
          makeDefault // Important when using Bounds
          enableZoom={false} 
          enablePan={false} 
          minPolarAngle={Math.PI / 2} 
          maxPolarAngle={Math.PI / 2} 
          autoRotate 
          autoRotateSpeed={1.0} 
        /> 
      </Canvas>
    </div>
  );
};

export default LogoModel; 