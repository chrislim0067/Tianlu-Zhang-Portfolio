import { forwardRef, useImperativeHandle } from 'react';
import type { PageHandle } from '../components/PageOutlet';

/** Temporary placeholder while the remaining pages are ported. */
export const StubPage = forwardRef<PageHandle, { params: Record<string, string> }>(function StubPage(_props, ref) {
  useImperativeHandle(ref, () => ({}));
  return <div className="page" style={{ color: '#fff', padding: '20vh 10vw' }}>Coming soon</div>;
});
