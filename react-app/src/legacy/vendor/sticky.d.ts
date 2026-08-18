export default function createSticky(require: (id: number) => any): new (options: {
  el: HTMLElement; trigger: HTMLElement; start?: number | string; end?: number | string;
  anticipationDistance?: any; anticipationOffsetSize?: any; onProgress?: (state: any) => void; markers?: boolean;
}) => { destroy: () => void; bounds: DOMRect | null };
