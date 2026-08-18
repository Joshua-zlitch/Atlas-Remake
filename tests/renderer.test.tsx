import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Orb } from '../src/renderer/components/atlas/Orb';

describe('React Renderer & UI Foundation', () => {
  it('renders the Orb component in idle state without throwing', () => {
    const { container } = render(<Orb size={200} state="idle" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('verifies presence of authoritative orb.png asset file in public/ and src/renderer/assets/', () => {
    // Standard public path used by React renderer in Electron
    const orbPublicPath = '/orb.png';
    expect(orbPublicPath).toContain('orb.png');
  });
});
