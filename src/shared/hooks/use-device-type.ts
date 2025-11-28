import { useEffect, useState } from "react";

type DeviceType = "mobile" | "tablet" | "desktop";

interface UseDeviceTypeOptions {
  mobileBreakpoint?: number; // ancho máximo para mobile
  tabletBreakpoint?: number; // ancho máximo para tablet
  debounceMs?: number; // tiempo para evitar múltiples updates en resize
}

/**
 * Hook para detectar el tipo de dispositivo basado en el ancho de la ventana
 *
 * @param mobileBreakpoint Ancho maximo para mobile
 * @param tabletBreakpoint Ancho maximo para tablet
 * @param debounceMs Tiempo para evitar múltiples updates en resize
 * @returns "mobile", "tablet" o "desktop".
 */
export function useDeviceType(options: UseDeviceTypeOptions = {}): DeviceType {
  const {mobileBreakpoint = 640, tabletBreakpoint = 1024, debounceMs = 100} = options
  const getDevice = (width: number) => {
    if (width < 640) return 'mobile'
    if (width < 1024) return "tablet";
    return 'desktop'
  }
  const [device, setDevice] = useState<DeviceType>(() => {
    if (typeof window === 'undefined') return 'desktop'
    return getDevice(window.innerWidth)
  })


  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      const newDevice = getDevice(window.innerWidth)
      setDevice(prevDevice => {
        if (prevDevice !== newDevice) return newDevice
        console.log("STATE UPDATE!", { prevDevice, newDevice });
        return prevDevice
      })
    }
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, debounceMs)
    }
    window.addEventListener('resize', debouncedResize)
    handleResize()
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', debouncedResize)
    }
  }, [device, mobileBreakpoint, tabletBreakpoint, debounceMs])
  return device
}
