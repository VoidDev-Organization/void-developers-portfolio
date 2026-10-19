import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { useInView, useReducedMotion } from "framer-motion";
import * as random from "maath/random/dist/maath-random.esm.js";

const Stars = ({ reduceMotion, ...props }) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }));

  useFrame((state, delta) => {
    if (reduceMotion) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  const canvasRef = useRef(null);
  const isInView = useInView(canvasRef, { margin: '120px' });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={canvasRef} className='w-full h-auto absolute inset-0 z-[-1]'>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        frameloop={!reduceMotion && isInView ? 'always' : 'demand'}
      >
        <Suspense fallback={null}>
          <Stars reduceMotion={reduceMotion} />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
