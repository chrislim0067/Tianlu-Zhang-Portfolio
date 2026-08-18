import { useEffect, useRef } from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { RuntimeProvider, sv, useGetter, useLegacy } from './runtime/context';
import { Background, useAudioController } from './components/Background';
import { TheMenu } from './components/TheMenu';
import { ButtonMute, type ButtonMuteHandle } from './components/ButtonMute';
import { Preloader } from './components/Preloader';
import { PageOutlet, type PageComponent } from './components/PageOutlet';
import { pages } from './pages';

function resolvePage(path: string): { Component: PageComponent; params: Record<string, string> } {
  const clean = path.replace(/\/$/, '') || '/';
  if (clean === '/') return { Component: pages.Home, params: {} };
  if (clean === '/about') return { Component: pages.About, params: {} };
  if (clean === '/work') return { Component: pages.Work, params: {} };
  const project = clean.match(/^\/work\/([^/]+)$/);
  if (project) return { Component: pages.Project, params: { slug: project[1] } };
  return { Component: pages.Home, params: {} };
}

/** Default layout (scope 6d28008c). */
function Layout() {
  const { root } = useLegacy();
  const location = useLocation();
  const isCompleted = useGetter<boolean>('preloader/isCompleted');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonMute = useRef<ButtonMuteHandle>(null);
  const isHome = (location.pathname.replace(/\/$/, '') || '/') === '/';
  useAudioController(isHome);

  // watch isCompleted -> transitionIn (mute button)
  const wasCompleted = useRef(isCompleted);
  useEffect(() => {
    if (isCompleted && !wasCompleted.current) buttonMute.current?.transitionIn();
    wasCompleted.current = isCompleted;
  }, [isCompleted]);

  // keep the engine's route info current
  useEffect(() => {
    root.$route = { ...root.$route, fullPath: location.pathname };
  }, [location.pathname, root]);

  return (
    <div {...sv('6d28008c')}>
      <Background ref={canvasRef} />
      <PageOutlet resolve={resolvePage} />
      <TheMenu />
      <ButtonMute ref={buttonMute} />
      {!isCompleted && <Preloader canvasRef={canvasRef} />}
      <div className="audio-controller" {...sv('5d87bb12', '6d28008c')} />
    </div>
  );
}

function Shell() {
  const navigate = useNavigate();
  return (
    <RuntimeProvider navigate={(path) => navigate(path)}>
      <div id="__nuxt">
        <div id="__layout">
          <Layout />
        </div>
      </div>
    </RuntimeProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
