import * as React from "react";

export function useIsMobile(mobile_breakpoint = 768) {
    const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
        undefined
    );

    React.useEffect(() => {
        const mql = window.matchMedia(
            `(max-width: ${mobile_breakpoint - 1}px)`
        );
        const onChange = () => {
            setIsMobile(window.innerWidth < mobile_breakpoint);
        };
        mql.addEventListener("change", onChange);
        setIsMobile(window.innerWidth < mobile_breakpoint);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    return !!isMobile;
}
