// Ensure React is in scope for components compiled to React.createElement
import * as ReactNS from 'react';
import { vi } from 'vitest';
(globalThis as any).React = ReactNS;

// Basic mocks for Next.js components to avoid runtime errors in SSR tests
vi.mock('next/image', () => ({ default: (props: any) => ReactNS.createElement('img', { alt: props.alt || '', src: props.src || '', width: props.width, height: props.height }) }));
vi.mock('next/link', () => ({ default: (props: any) => ReactNS.createElement('a', { href: props.href }, props.children) }));
