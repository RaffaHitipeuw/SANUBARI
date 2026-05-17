import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }) {
    useEffect(() => {
        const lenis = new Lenis({
            smoothWheel: true,
            duration: 1.2,
        });

        let rafId;

        function raf(time) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return children;
}