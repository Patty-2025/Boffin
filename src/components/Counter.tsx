import React, { useEffect, useState, useRef } from 'react';
import { animate, useInView } from 'motion/react';

interface CounterProps {
  value: number;
  suffix?: string;
  className?: string;
  id?: string;
  as?: 'h4' | 'span' | 'h1' | 'h2' | 'h3' | 'div' | 'p';
}

export default function Counter({ value, suffix = '', className, id, as: Component = 'span' }: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 1.8,
        ease: 'easeOut',
        onUpdate: (latest) => setDisplayValue(latest),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  const formattedValue = value % 1 !== 0 ? displayValue.toFixed(2) : Math.floor(displayValue);

  return (
    // @ts-expect-error Component polymorphic ref
    <Component ref={ref} className={className} id={id}>
      {formattedValue}
      {suffix}
    </Component>
  );
}
