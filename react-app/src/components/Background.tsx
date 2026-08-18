import { forwardRef, useEffect } from 'react';
import { sv, useLegacy, useGetterEffect } from '../runtime/context';

const VIEW_BY_ROUTE: Record<string, string> = { index: 'Home', work: 'Work', about: 'About' };

/**
 * WebglBackground (scope 424232e3): the engine canvas. The engine itself is
 * created by the preloader flow once loading starts (see Preloader).
 */
export const Background = forwardRef<HTMLCanvasElement, object>(function Background(_props, ref) {
  const { root, store } = useLegacy();
  // If loading already completed when mounted (hot reload), set up and show the current view.
  useEffect(() => {
    if (store.getters['preloader/isLoadingCompleted'] && root.webglApp && !root.webglApp.viewManager) {
      root.webglApp.setup();
      const view = VIEW_BY_ROUTE[root.getRouteBaseName()];
      if (view) root.webglApp.viewManager.show(view);
    }
  }, [root, store]);
  useGetterEffect('preloader/isLoadingStarted', () => {});
  return (
    <div {...sv('424232e3', '6d28008c')}>
      <canvas ref={ref} className="background" {...sv('424232e3')} />
    </div>
  );
});

/** AudioController (scope 5d87bb12): drives the audio manager from store/route state. */
export function useAudioController(isHome: boolean) {
  const { audio, store } = useLegacy();
  useEffect(() => {
    if (isHome) audio.unmuteLandscape();
    else audio.unmuteMain();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (isHome) {
      audio.unmuteLandscape();
      audio.muteMain();
    } else {
      audio.muteLandscape();
      audio.unmuteMain();
    }
  }, [isHome, audio]);
  useEffect(() => {
    const unwatchCompleted = store.watch((_s: any, g: any) => g['preloader/isCompleted'], (value: boolean) => {
      if (value) audio.playMainTrack();
    });
    const unwatchMenu = store.watch((_s: any, g: any) => g['menu/isOpen'], (open: boolean) => {
      if (open) {
        audio.muteLandscape();
        audio.unmuteMain();
      } else if (isHome) {
        audio.muteMain();
        audio.unmuteLandscape();
      }
    });
    return () => {
      unwatchCompleted();
      unwatchMenu();
    };
  }, [audio, store, isHome]);
}
