import { useEffect, useRef, useState } from 'react';
import { bootRuntime } from './legacy/boot';

// Spike: boot the shared runtime, load resources, set up the engine and show the Home landscape.
export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState('booting');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const runtime = await bootRuntime((path) => console.log('navigate', path));
      const { store } = runtime.legacy;
      setStatus('detecting gpu');
      const gpu = await runtime.legacy.detectGpu({ benchmarksURL: '/webgl/misc/benchmarks' });
      let tier = gpu.tier;
      if (gpu.gpu === 'apple m1 (Apple M1)') tier = 3;
      store.dispatch('device/setGpuTier', tier);
      store.dispatch('preloader/setLoadingStarted');
      if (cancelled) return;
      runtime.createEngine(canvasRef.current!);
      setStatus('loading resources');
      runtime.resourceLoader.addEventListener('complete', () => {
        store.dispatch('preloader/setLoadingCompleted');
        setStatus('setting up engine');
        runtime.setupEngine(() => {
          setStatus('engine ready');
          runtime.root.webglApp.viewManager.show('Home');
          store.dispatch('preloader/setCompleted');
          store.dispatch('scroll/unlock');
          setStatus('home shown');
          (window as any).__runtime = runtime;
        });
      });
      runtime.resourceLoader.preload();
    })().catch((error) => { console.error(error); setStatus('error: ' + error.message); });
    return () => { cancelled = true; };
  }, []);

  return (
    <div>
      <div>
        <canvas ref={canvasRef} className="background" />
      </div>
      <div style={{ position: 'fixed', top: 8, left: 8, color: '#fff', font: '12px monospace', zIndex: 10 }} data-status>{status}</div>
    </div>
  );
}
