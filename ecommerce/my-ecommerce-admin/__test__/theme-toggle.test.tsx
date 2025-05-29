import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useTheme } from 'next-themes';

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeToggle', () => {
  const setThemeMock = jest.fn();

  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      setTheme: setThemeMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders toggle button', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });

  it('opens menu and shows options', () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button', { name: /toggle theme/i }));
    expect(screen.getByText('Light')).toBeVisible();
    expect(screen.getByText('Dark')).toBeVisible();
    expect(screen.getByText('System')).toBeVisible();
  });

  it.each([
    ['Light', 'light'],
    ['Dark', 'dark'],
    ['System', 'system'],
  ])('sets theme to %s when clicked', (label, theme) => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button', { name: /toggle theme/i }));
    fireEvent.click(screen.getByText(label));
    expect(setThemeMock).toHaveBeenCalledWith(theme);
  });
});
