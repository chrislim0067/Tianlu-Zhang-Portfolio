import { createRoot } from 'react-dom/client';
import './legacy.css';
import App from './App';

// No StrictMode: the site is driven by imperative GSAP timelines and shared
// singletons (engine, audio, loaders); dev-only double effects would boot them twice.
createRoot(document.getElementById('root')!).render(<App />);
