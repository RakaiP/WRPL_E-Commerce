import React from 'react';
import { render, screen } from '@testing-library/react';
import { Input } from '@/components/ui/input'; // adjust path accordingly

describe('Input component', () => {
  it('renders an input element', () => {
    render(<Input data-testid="input-test" />);
    const input = screen.getByTestId('input-test');
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe('INPUT');
  });

  it('applies the given type attribute', () => {
    render(<Input type="email" data-testid="input-type" />);
    const input = screen.getByTestId('input-type');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('includes the custom className along with default classes', () => {
    const customClass = 'custom-class';
    render(<Input className={customClass} data-testid="input-class" />);
    const input = screen.getByTestId('input-class');
    expect(input).toHaveClass('border-input');
    expect(input).toHaveClass(customClass);
  });

  it('forwards other props to the input element', () => {
    render(<Input placeholder="Enter text" data-testid="input-props" />);
    const input = screen.getByTestId('input-props');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
  });

  it('includes data-slot="input" attribute', () => {
    render(<Input data-testid="input-slot" />);
    const input = screen.getByTestId('input-slot');
    expect(input).toHaveAttribute('data-slot', 'input');
  });
});
