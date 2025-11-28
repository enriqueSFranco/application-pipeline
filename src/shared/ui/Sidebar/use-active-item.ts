import { useCallback, useEffect, useRef, useState } from "react";

type Rect = { top: number; height: number; left?: number; width?: number };

interface UseActiveItemOpts<T extends HTMLElement = HTMLElement> {
  containerRef: React.RefObject<T | null>;
  getActiveKey: () => string | undefined;
  observeResize?: boolean;
  animationFrame?: boolean;
}

/**
 * Hook para medir y exponer el rect del item activo
 * register: función para asignar callback refs: ref={el => register(el, key)}
 * @param param0
 * @returns
 */
export function useActiveItem<T extends HTMLElement = HTMLElement>({
  containerRef,
  getActiveKey,
  observeResize = true,
  animationFrame = true,
}: UseActiveItemOpts<T>) {
  const elementsRef = useRef<Map<string, HTMLElement | null>>(new Map())
  const [activeItemRect, setActiveItemRect] = useState<Rect>({ top: 0, height: 0, left: 0, width: 0 });

  // registrar el callback
  const register = useCallback((el: HTMLElement | null, key: string) => {
    if (!key) return
    if (el) {
      elementsRef.current.set(key, el)
    } else {
      elementsRef.current.delete(key)
    }
  }, [])

  const measureAndSetIndicator = useCallback(() => {
    try {
      const activeKey = getActiveKey();

      if (!activeKey) {
        setActiveItemRect({ top: 0, height: 0, left: 0, width: 0 });
        return
      }

      // buscar el enlace activo en la ruta actual
      const activeEle = elementsRef.current.get(activeKey) ?? null
      const containerEle = containerRef.current

      if(!containerEle || !activeEle) {
        setActiveItemRect({top: 0, height: 0, left: 0, width: 0})
        return
      }

      // Obtener las coordenadas relativas al Viewport
      const activeRect = activeEle.getBoundingClientRect();
      const containerRect = containerEle.getBoundingClientRect();

      // Calcular la posición relativa:
      const top = activeRect.top - containerRect.top + containerEle.scrollTop
      const left = activeRect.left - containerRect.left + containerEle.scrollLeft;
      const height = activeRect.height;
      const width = activeRect.width;

      // Actualizar el estado con las nuevas dimensiones
      setActiveItemRect(prev => {
        // Solo actualizar si hay cambio real para evitar re-renders
        if (prev.top === top && prev.height === height && prev.left === left && prev.width === width) {
          return prev;
        }
        return { top, height, left, width };
      });
    } catch(e) {
      console.warn("useActiveItem.measure error:", e);
    }
  }, [containerRef, getActiveKey]);

  // Efecto para calcular la posición y altura del indicador.
  useEffect(() => {
    if(!animationFrame) {
      measureAndSetIndicator()
      return
    }
    let raf = 0;
    raf = requestAnimationFrame(() => measureAndSetIndicator());
    return () => cancelAnimationFrame(raf);
  }, [ getActiveKey, animationFrame, measureAndSetIndicator]);

  useEffect(() => {
    if (!observeResize) return;
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    // Use ResizeObserver if available (better que resize listener)
    const ro = new ResizeObserver(() => {
      measureAndSetIndicator();
    });
    ro.observe(container);

    // Observa cada item tambien (opcional - ayuda si items cambian su tamanho)
    elementsRef.current.forEach((el) => el && ro.observe(el));

    return () => ro.disconnect();
  }, [containerRef, observeResize, measureAndSetIndicator]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      // medir en rAF para performance
      requestAnimationFrame(() => measureAndSetIndicator());
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [containerRef, measureAndSetIndicator]);

  return { register, activeItemRect };
}
