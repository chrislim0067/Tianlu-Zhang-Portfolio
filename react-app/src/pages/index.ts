import type { PageComponent } from '../components/PageOutlet';
import { HomePage } from './home/HomePage';
import { AboutPage } from './about/AboutPage';
import { WorkLayout } from './work/WorkLayout';

export const pages = {
  Home: HomePage as unknown as PageComponent,
  About: AboutPage as unknown as PageComponent,
  Work: WorkLayout as unknown as PageComponent
};
