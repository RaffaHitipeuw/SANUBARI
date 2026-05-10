import { Outlet } from "react-router";
import { useEffect } from "react";
import Lenis from "lenis";

export default function Layout() {

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            smoothTouch: true,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <main>
            <Outlet />
        </main>
    );
}