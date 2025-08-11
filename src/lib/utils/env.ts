export type CollectEnvResult = {
  timestamp: string
  timezone: string
  page: {
    url: string
    referrer?: string
  }
  browser: {
    userAgent: string
    language: string
    platform: string
    viewport: { w: number; h: number; dpr: number }
    performance?: {
      type: string
      domContentLoaded: number
      load: number
    }
    deviceMemoryGB?: number
    connection?: {
      downlink: number
      rtt: number
      effectiveType: string
      saveData: boolean
    }
    battery: { level?: number; charging?: boolean }
  }
}

export async function collectEnv(): Promise<CollectEnvResult> {
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
  const mem = (navigator as any).deviceMemory
  const conn = (navigator as any).connection
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone

  let battery: { level?: number; charging?: boolean } = {}
  try {
    const b = (navigator as any).getBattery ? await (navigator as any).getBattery() : null
    if (b) battery = { level: b.level, charging: b.charging }
  } catch {}

  return {
    timestamp: new Date().toISOString(),
    timezone: tz,
    page: {
      url: location.href,
      referrer: document.referrer || undefined,
    },
    browser: {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: (navigator as any).platform,
      viewport: { w: window.innerWidth, h: window.innerHeight, dpr: window.devicePixelRatio },
      performance: nav
        ? {
            type: nav.type,
            domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
            load: Math.round(nav.loadEventEnd - nav.startTime),
          }
        : undefined,
      deviceMemoryGB: typeof mem === 'number' ? mem : undefined,
      connection: conn
        ? { downlink: conn.downlink, rtt: conn.rtt, effectiveType: conn.effectiveType, saveData: conn.saveData }
        : undefined,
      battery,
    },
  }
}
