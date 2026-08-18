import { forwardRef, useImperativeHandle, useRef } from 'react';

interface CharsProps {
  text: string;
  className?: string;
  attrs?: Record<string, string>;
  spanClassName?: string;
}

/** Renders text as one <span> per character (the site's typographic animation unit). */
export const Chars = forwardRef<HTMLSpanElement[], CharsProps>(function Chars({ text, className, attrs = {}, spanClassName }, ref) {
  const spans = useRef<HTMLSpanElement[]>([]);
  spans.current = [];
  useImperativeHandle(ref, () => spans.current, [text]);
  return (
    <>
      {Array.from(text).map((character, index) => (
        <span
          key={index}
          className={spanClassName ?? className}
          {...attrs}
          ref={(element) => {
            if (element) spans.current[index] = element;
          }}
        >
          {character}
        </span>
      ))}
    </>
  );
});
