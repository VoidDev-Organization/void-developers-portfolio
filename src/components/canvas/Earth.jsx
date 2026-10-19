import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { useInView, useReducedMotion } from "framer-motion";

import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");

  // The model's raw diameter is only ~1.75 units, and perspective magnifies the
  // near face, so anything above ~2.2 overflows the canvas and gets cropped.
  return (
    <primitive object={earth.scene} scale={2.1} position-y={0} rotation-y={0} />
  );
};

const EarthCanvas = () => {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef(null);
  const isInView = useInView(canvasRef, { margin: '120px' });

  return (
    <div ref={canvasRef} className='w-full h-full'>
      <Canvas
        shadows
        frameloop={!reduceMotion && isInView ? 'always' : 'demand'}
        dpr={[1, 1.5]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 6],
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            autoRotate={!reduceMotion && isInView}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Earth />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EarthCanvas;
