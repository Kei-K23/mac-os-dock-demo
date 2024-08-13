import { useMotionValue } from "framer-motion";
import { useSpring } from "framer-motion";
import { useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { useRef } from "react";

function App() {
  const mouseX = useMotionValue(Infinity);
  return (
    <div className="flex h-screen justify-center items-end pb-28">
      <div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={(e) => mouseX.set(Infinity)}
        className="flex items-end gap-x-4 bg-gray-300 px-5 h-20 rounded-2xl pb-2.5"
      >
        {[...Array(6).keys()].map((i) => (
          <AppIcon key={i} mouseX={mouseX} />
        ))}
      </div>
    </div>
  );
}

const AppIcon = ({ mouseX }) => {
  let ref = useRef(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-150, 0, 150], [60, 120, 60]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{
        width,
      }}
      className="aspect-square w-14 rounded-full bg-gray-600"
    />
  );
};

export default App;
