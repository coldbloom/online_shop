import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const ScreenType = ["main", "country", "search"];

const MobileMenuContext = createContext(null);

import useCurrentWidth from "@/src/lib/hooks/use-current-with";
import useDebounce from "@/src/lib/hooks/use-debounce";

const MobileMenuProvider = ({ children }) => {
    const [state, setState] = useState(false);
    const [screen, setScreen] = useState("main");

    const windowWidth = useCurrentWidth()

    const debouncedWith = useDebounce(windowWidth, 200)

    const open = () => {
        setState(true);
    };

    const close = () => {
        setState(false);
        setTimeout(() => {
            setScreen("main");
        }, 500);
    };

    const toggle = () => {
        setState(prevState => !prevState);
    };

    const closeMenu = useCallback(() => {
        close();
    }, [close]);

    useEffect(() => {
        if (state && debouncedWith >= 1024) {
            closeMenu();
        }
    }, [state]);

    useEffect(() => {
    }, []);

    return (
        <MobileMenuContext.Provider
            value={{
                state,
                close: closeMenu,
                open,
                toggle,
                screen: [screen, setScreen],
            }}
        >
            {children}
        </MobileMenuContext.Provider>
    );
};

const useMobileMenu = () => {
    const context = useContext(MobileMenuContext);

    if (context === null) {
        throw new Error("useMobileMenu must be used within a MobileMenuProvider");
    }

    return context;
};

export { MobileMenuProvider, useMobileMenu };