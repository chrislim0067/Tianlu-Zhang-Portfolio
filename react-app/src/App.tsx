import { useEffect, useRef } from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { RuntimeProvider, sv, useGetter, useLegacy } from './runtime/context';
import { Background, useAudioController } from './components/Background';
import { TheMenu } from './components/TheMenu';
import { ButtonMute, type ButtonMuteHandle } from './components/ButtonMute';
import { Preloader } from './components/Preloader';
import { PageOutlet, type ResolvedPage } from './components/PageOutlet';
import { pages } from './pages';
import { routeInfoFromPath } from './legacy/boot';
import { applySeo } from './runtime/seo';
import { findProject } from './pages/work/workData';

function resolvePage(path: string): ResolvedPage {
  const clean = path.replace(/\/$/, '') || '/';
  if (clean === '/about') return { key: 'about', Component: pages.About, params: {} };
  if (clean === '/work') return { key: 'work', Component: pages.Work, params: {} };
  const project = clean.match(/^\/work\/([^/]+)$/);
  // unknown slugs fall back to the work overview (Layout replaces the URL with /work)
  if (project) return { key: 'work', Component: pages.Work, params: findProject(project[1]) ? { slug: project[1] } : {} };
  return { key: 'home', Component: pages.Home, params: {} };
}

/** Default layout (scope 6d28008c). */
function Layout() {
  const { root } = useLegacy();
  const location = useLocation();
  const navigate = useNavigate();
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

  // keep the engine's route info current + head tags (original page head())
  useEffect(() => {
    // Unknown URLs: unknown project slugs go to the work overview, anything else to the home page
    // (the original site sent both to its error page; the static export redirected them the same way).
    const clean = location.pathname.replace(/\/$/, '') || '/';
    const project = clean.match(/^\/work\/([^/]+)$/);
    if (project && !findProject(project[1])) {
      navigate('/work', { replace: true });
      return;
    }
    if (!project && !['/', '/about', '/work'].includes(clean)) {
      navigate('/', { replace: true });
      return;
    }
    root.$route = routeInfoFromPath(location.pathname);
    applySeo(location.pathname);
  }, [location.pathname, root, navigate]);

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
