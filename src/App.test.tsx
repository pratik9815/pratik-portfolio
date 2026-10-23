// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './App';
import { mockPortfolioResponse } from './data/portfolio';
import { getPortfolio } from './features/portfolio/api';

vi.mock('./features/portfolio/api', () => ({ getPortfolio: vi.fn() }));
const { savePdf } = vi.hoisted(() => ({ savePdf: vi.fn() }));
vi.mock('./features/portfolio/cv', () => ({
  createCvPdf: vi.fn(() => ({ save: savePdf })),
}));

beforeEach(() => {
  savePdf.mockReset().mockResolvedValue(undefined);
  vi.mocked(getPortfolio).mockResolvedValue(
    structuredClone(mockPortfolioResponse),
  );
  localStorage.clear();
  document.documentElement.dataset.theme = 'light';
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    },
  );
  window.matchMedia = vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
  window.scrollTo = vi.fn();
  URL.createObjectURL = vi.fn().mockReturnValue('blob:generated-cv');
  URL.revokeObjectURL = vi.fn();
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute('open');
  };
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

async function showPortfolio() {
  render(<App />);
  await screen.findByRole('heading', { level: 1, name: /Thoughtful code/ });
}

describe('portfolio interactions', () => {
  it('filters projects by data-derived category and restores all projects', async () => {
    await showPortfolio();
    const { projects, expertise, experience } = mockPortfolioResponse.data;
    expect(screen.getAllByRole('article')).toHaveLength(
      Math.min(
        projects.length,
        mockPortfolioResponse.data.projectDisplay?.initialCount ?? 2,
      ) +
        expertise.length +
        experience.length,
    );
    expect(
      screen.getByRole('img', {
        name: 'Remittance System project illustration',
      }),
    ).toHaveAttribute(
      'src',
      `${import.meta.env.BASE_URL}projects/remittance-system.svg`,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Personal' }));
    expect(
      screen.getByRole('heading', { name: 'TeaShopPOS' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Remittance System' }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Personal' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    fireEvent.click(screen.getByRole('button', { name: 'Professional' }));
    expect(
      screen.getByRole('heading', { name: 'Remittance System' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Claims Processing Workflow' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'TeaShopPOS' }),
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /All projects/ }));
    expect(
      screen.getByRole('heading', { name: 'Remittance System' }),
    ).toBeInTheDocument();
  });

  it('reveals private projects on See more, omits repository links, and collapses them again', async () => {
    await showPortfolio();
    expect(
      screen.queryByRole('heading', { name: 'TeaShopPOS' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'StreamX' }),
    ).not.toBeInTheDocument();
    const reveal = screen.getByRole('button', { name: 'See more' });
    expect(reveal).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(reveal);
    expect(
      screen.getByRole('heading', { name: 'TeaShopPOS' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'StreamX' }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Demo available upon request/)).toHaveLength(2);
    expect(
      screen.queryByRole('link', { name: /Source code|Live project/ }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'See less' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'View TeaShopPOS project details' }),
    );
    const dialog = screen.getByRole('dialog', { name: 'TeaShopPOS' });
    expect(dialog).toHaveTextContent('Demo available upon request.');
    expect(
      within(dialog).queryByRole('link', { name: /Source code|Visit project/ }),
    ).not.toBeInTheDocument();
    fireEvent.click(
      within(dialog).getByRole('button', { name: 'Close project details' }),
    );
    fireEvent.click(screen.getByRole('button', { name: 'See less' }));
    expect(
      screen.queryByRole('heading', { name: 'TeaShopPOS' }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'See more' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('opens project details, hides missing links, and closes via Escape cancellation', async () => {
    await showPortfolio();
    fireEvent.click(
      screen.getByRole('button', {
        name: 'View Remittance System project details',
      }),
    );
    const dialog = screen.getByRole('dialog', { name: 'Remittance System' });
    expect(
      within(dialog).getByRole('heading', { name: 'A closer look' }),
    ).toBeInTheDocument();
    expect(
      within(dialog).queryByRole('link', { name: /Visit project/ }),
    ).not.toBeInTheDocument();
    expect(
      within(dialog).queryByRole('link', { name: /Source code/ }),
    ).not.toBeInTheDocument();
    expect(dialog).toHaveTextContent('Software Engineer at Inficare Pvt. Ltd.');
    fireEvent(dialog, new Event('cancel', { bubbles: true, cancelable: true }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body).not.toHaveClass('dialog-open');
  });

  it('switches themes and persists the chosen preference', async () => {
    await showPortfolio();
    fireEvent.click(
      screen.getByRole('button', { name: 'Switch to dark mode' }),
    );
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(localStorage.getItem('portfolio-theme')).toBe('dark');
    fireEvent.click(
      screen.getByRole('button', { name: 'Switch to light mode' }),
    );
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });

  it('downloads a real generated CV and addresses the email to the configured contact', async () => {
    await showPortfolio();
    const buttons = screen.getAllByRole('button', { name: /Download CV/ });
    expect(buttons).toHaveLength(2);
    fireEvent.click(buttons[0]);
    await waitFor(() =>
      expect(savePdf).toHaveBeenCalledWith('Pratik-CV.pdf', {
        returnPromise: true,
      }),
    );
    await waitFor(() => expect(buttons[0]).not.toBeDisabled());
    expect(buttons[0]).toHaveTextContent('PDF');
    expect(screen.getByRole('link', { name: /Say hello/ })).toHaveAttribute(
      'href',
      expect.stringContaining(
        `mailto:${mockPortfolioResponse.data.profile.email}?subject=`,
      ),
    );
  });

  it('offers a useful retry when PDF generation fails', async () => {
    savePdf.mockRejectedValueOnce(new Error('Could not save'));
    await showPortfolio();
    const button = screen.getAllByRole('button', { name: /Download CV/ })[0];
    fireEvent.click(button);
    await screen.findByText('Couldn’t create the PDF. Please try again.');
    expect(button).not.toBeDisabled();
    fireEvent.click(button);
    await waitFor(() => expect(savePdf).toHaveBeenCalledTimes(2));
    await waitFor(() =>
      expect(
        screen.queryByText('Couldn’t create the PDF. Please try again.'),
      ).not.toBeInTheDocument(),
    );
  });

  it('keeps a configured PDF file as a direct download', async () => {
    const response = structuredClone(mockPortfolioResponse);
    response.data.profile.cv = { url: '/cv.pdf', filename: 'My-CV.pdf' };
    vi.mocked(getPortfolio).mockResolvedValue(response);
    await showPortfolio();
    for (const link of screen.getAllByRole('link', { name: /Download CV/ })) {
      expect(link).toHaveAttribute('href', `${import.meta.env.BASE_URL}cv.pdf`);
      expect(link).toHaveAttribute('download', 'My-CV.pdf');
    }
    expect(savePdf).not.toHaveBeenCalled();
  });

  it('supports empty project collections and configured external links without UI changes', async () => {
    const response = structuredClone(mockPortfolioResponse);
    response.data.projects = [];
    vi.mocked(getPortfolio).mockResolvedValue(response);
    await showPortfolio();
    expect(
      screen.getByRole('heading', { name: 'More work is on the way.' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /All projects/ }),
    ).toHaveTextContent('00');
  });

  it('recovers from a failed content load with retry', async () => {
    vi.mocked(getPortfolio).mockRejectedValueOnce(new Error('Unavailable'));
    render(<App />);
    await screen.findByRole('heading', {
      name: 'Couldn’t load the portfolio.',
    });
    fireEvent.click(screen.getByRole('button', { name: /Try again/ }));
    await screen.findByRole('heading', { name: /Thoughtful code/ });
  });

  it('reports both clipboard success and a useful failure state', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    await showPortfolio();
    fireEvent.click(screen.getByRole('button', { name: 'Copy email address' }));
    await waitFor(() =>
      expect(screen.getByText('Email copied')).toBeInTheDocument(),
    );
    expect(writeText).toHaveBeenCalledWith(
      mockPortfolioResponse.data.profile.email,
    );
  });
});
