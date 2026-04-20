import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Forces the window to scroll to the top whenever the route pathname changes.
 * Mounted once near the top of the router tree.
 */
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        if (typeof window === "undefined") return;

        // Disable any inherited smooth-scroll for this jump so it feels instant.
        const html = document.documentElement;
        const previous = html.style.scrollBehavior;
        html.style.scrollBehavior = "auto";

        window.scrollTo({ top: 0, left: 0, behavior: "auto" });

        html.style.scrollBehavior = previous;
    }, [pathname]);

    return null;
}
