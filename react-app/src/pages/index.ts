import type { PageComponent } from '../components/PageOutlet';
import { HomePage } from './home/HomePage';
import { StubPage } from './StubPage';

export const pages = {
  Home: HomePage as unknown as PageComponent,
  About: StubPage as unknown as PageComponent,
  Work: StubPage as unknown as PageComponent,
  Project: StubPage as unknown as PageComponent
};
