import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Float, OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";

import CanvasLoader from "../Loader";

useGLTF.preload("./desktop_pc/scene.gltf");

const Computers = ({ isMobile, fit, reduceMotion }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  // The hero text is sized in pixels, so on a short laptop screen it eats a
  // larger share of the viewport. Shrink and drop the rig by the same factor
  // to keep it clear of the headline at any height.
  const scale = (isMobile ? 0.44 : 0.82) * fit;
  const position = isMobile
    ? [0, -3.2 - (1 - fit) * 1.2, -2.6]
    : [1.4, -3.0 - (1 - fit) * 1.2, -1.4];

  return (
    <group>
      <hemisphereLight intensity={0.65} groundColor='#3b2f6b' color='#cdbfff' />
      <ambientLight intensity={0.45} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.16}
        penumbra={1}
        intensity={2.6}
        castShadow={!isMobile}
        shadow-mapSize={1024}
      />
      {/* warm key from the right + violet rim so the case edges read against
          the dark background instead of going flat black */}
      <pointLight position={[12, 6, 12]} intensity={1.6} color='#ffd9a8' />
      <pointLight position={[-14, 2, -8]} intensity={1.1} color='#915EFF' />
      <Float
        speed={reduceMotion ? 0 : 0.65}
        rotationIntensity={reduceMotion ? 0 : 0.12}
        floatIntensity={reduceMotion ? 0 : 0.22}
        floatingRange={[-0.06, 0.06]}
      >
        <primitive
          object={computer.scene}
          scale={scale}
          position={position}
          rotation={[-0.01, -0.2, -0.1]}
        />
      </Float>
    </group>
  );
};

const ComputersCanvas = ({ isVisible }) => {
  const [isMobile, setIsMobile] = useState(false);
  const reduceMotion = useReducedMotion();
  const [viewportHeight, setViewportHeight] = useState(() =>
    typeof window === "undefined" ? 900 : window.innerHeight,
  );

  // 1 at a >=900px tall hero, shrinking on short laptop screens
  const fit = Math.min(1, Math.max(0.88, viewportHeight / 900));

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 640px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Canvas
      className='absolute inset-0 z-0'
      frameloop={!reduceMotion && isVisible ? 'always' : 'demand'}
      shadows={!isMobile}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      camera={{ position: [16, 4, 21], fov: 26 }}
      gl={{
        preserveDrawingBuffer: true,
        antialias: !isMobile,
        powerPreference: 'high-performance',
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          target={[0, -0.35, 0]}
        />
        <Computers isMobile={isMobile} fit={fit} reduceMotion={reduceMotion} />
        <AdaptiveDpr pixelated />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
