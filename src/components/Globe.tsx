'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Vertex Shader: positions points and sets their size
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 3.0; // Adjust dot size here
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// Fragment Shader: colors points and masks them based on texture
const fragmentShader = `
  uniform sampler2D globeTexture;
  varying vec2 vUv;
  void main() {
    vec3 color = texture2D(globeTexture, vUv).rgb;
    // Specular map: land is light, ocean is black.
    // Discard pixels where the texture is dark (oceans)
    if (length(color) < 0.2) discard; 
    
    // Gray color
    gl_FragColor = vec4(0.6, 0.6, 0.6, 1.0);
  }
`;

function AnimatedGlobe() {
  const meshRef = useRef<THREE.Points>(null);
  // Using specular map because it has high contrast (black oceans, light land)
  const globeTexture = useTexture('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg');

  const uniforms = useMemo(() => ({
    globeTexture: { value: globeTexture }
  }), [globeTexture]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const { x, y } = state.pointer;
    
    // Smooth rotation
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      y * 0.2, 
      0.1
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      state.clock.getElapsedTime() * 0.15 + x * 0.5, 
      0.1
    );
  });

  return (
    <points ref={meshRef} scale={1.8}>
      {/* High detail Icosahedron for uniform point distribution */}
      <icosahedronGeometry args={[1, 60]} />  
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
      />
    </points>
  );
}

export default function Globe() {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#0ea5e9" intensity={1} />
        <AnimatedGlobe />
      </Canvas>
    </div>
  );
}
