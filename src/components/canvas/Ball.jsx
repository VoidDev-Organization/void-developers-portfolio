import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useInView, useReducedMotion } from "framer-motion";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = ({ reduceMotion, ...props }) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float
      speed={reduceMotion ? 0 : 1.4}
      rotationIntensity={reduceMotion ? 0 : 0.7}
      floatIntensity={reduceMotion ? 0 : 1.2}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon, name }) => {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef(null);
  const isInView = useInView(canvasRef, { margin: '80px' });
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const updateViewport = (event) => setIsMobile(event.matches);

    mediaQuery.addEventListener('change', updateViewport);
    return () => mediaQuery.removeEventListener('change', updateViewport);
  }, []);

  if (isMobile) {
    return (
      <div className='grid h-full w-full place-items-center rounded-full bg-white p-5 shadow-md'>
        <img src={icon} alt={`${name} logo`} className='h-full w-full object-contain' />
      </div>
    );
  }

  return (
    <div ref={canvasRef} className='w-full h-full'>
      <Canvas
        frameloop={!reduceMotion && isInView ? 'always' : 'demand'}
        dpr={[1, 1.5]}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls enableZoom={false} />
          <Ball imgUrl={icon} reduceMotion={reduceMotion} />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default BallCanvas;
