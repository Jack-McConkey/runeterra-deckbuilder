import {useRef, useEffect, useState} from "react";
import {createPortal} from "react-dom";

interface Portal {
    children: JSX.Element;
    selector: string;
}

export default function ClientOnlyPortal({children, selector}: Portal) {
    const ref = useRef<Element | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        ref.current = document.querySelector(selector);
        setMounted(true);
    }, [selector]);

    return mounted ? createPortal(children, ref.current as Element) : null;
}
