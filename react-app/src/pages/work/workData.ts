import { content } from '../../content/portfolio';

export interface ProjectData {
  name: string;
  title: string;
  short_description: string;
  description: string[];
  main_image: { url: string; dimensions: { width: number; height: number }; alt: string };
  images: Array<{ image: { url: string; dimensions: { width: number; height: number }; alt: string } }>;
  tags: Array<{ tag: { uid: string } }>;
}

export interface ProjectEntry {
  project: { uid: string; data: ProjectData };
}

export interface Tag {
  uid: string;
  data: { tag_name: string };
}

const work = content.work.en;

/** Same shape the original app received for the work overview (projects + tags). */
export const projects: ProjectEntry[] = work.cases.map((item) => ({
  project: {
    uid: item.slug,
    data: {
      name: item.title,
      title: item.title,
      short_description: item.short,
      description: [...item.detail],
      main_image: { url: item.image, dimensions: { width: 2048, height: 1365 }, alt: item.title },
      images: [],
      tags: [{ tag: { uid: item.category } }]
    }
  }
}));

export const tags: Tag[] = work.filters.slice(1).map((filter) => ({ uid: filter.uid, data: { tag_name: filter.label } }));

export function findProject(slug: string): ProjectData | null {
  const entry = projects.find((item) => item.project.uid === slug);
  return entry ? entry.project.data : null;
}
