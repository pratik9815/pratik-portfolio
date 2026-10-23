import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockPortfolioResponse } from '../../data/portfolio';
import { getPortfolio } from './api';
import { createCvPdf } from './cv';

afterEach(() => vi.useRealTimers());

describe('frontend mock API', () => {
  it('returns editable content without making a network request, isolated from mutations', async () => {
    const originalName = mockPortfolioResponse.data.profile.name;
    vi.useFakeTimers();
    const request = getPortfolio();
    await vi.runAllTimersAsync();
    const response = await request;
    expect(response).toEqual(mockPortfolioResponse);
    response.data.profile.name = 'Another engineer';
    expect(mockPortfolioResponse.data.profile.name).toBe(originalName);
  });

  it('cancels a pending request when the page unmounts', async () => {
    vi.useFakeTimers();
    const controller = new AbortController();
    const request = getPortfolio(controller.signal);
    const expectation = expect(request).rejects.toMatchObject({
      name: 'AbortError',
    });
    controller.abort();
    await expectation;
    expect(vi.getTimerCount()).toBe(0);
  });

  it('handles a request that was already cancelled', async () => {
    vi.useFakeTimers();
    const controller = new AbortController();
    controller.abort();
    await expect(getPortfolio(controller.signal)).rejects.toMatchObject({
      name: 'AbortError',
    });
    expect(vi.getTimerCount()).toBe(0);
  });
});

describe('data-generated CV', () => {
  it('uses the actual profile and includes all experience, projects, skills, and configured links', () => {
    const data = structuredClone(mockPortfolioResponse.data);
    data.profile.name = 'Your Name';
    data.profile.email = 'you@example.com';
    data.projects[0].links.live = 'https://example.com/my-project';
    const document = createCvPdf(data);
    const cv = document.output();
    expect(cv.startsWith('%PDF-')).toBe(true);
    expect(cv).toContain('Your Name');
    expect(cv).toContain('you@example.com');
    expect(cv).toContain('https://example.com/my-project');
    for (const item of data.experience) expect(cv).toContain(item.role);
    for (const item of data.education ?? []) {
      expect(cv).toContain(item.qualification);
      expect(cv).toContain(item.institution);
      expect(cv).toContain(item.location);
    }
    for (const item of data.projects) expect(cv).toContain(item.name);
    for (const item of data.expertise)
      for (const skill of item.skills) expect(cv).toContain(skill);
    expect(cv).not.toContain('/URI (null)');
    expect(cv).not.toContain('https://github.com/pratik9815/TeaShopPOS');
    expect(cv).not.toContain('https://github.com/pratik9815/StreamX');
  });

  it('still generates a useful CV with no projects or work history', () => {
    const data = structuredClone(mockPortfolioResponse.data);
    data.projects = [];
    data.experience = [];
    const cv = createCvPdf(data).output();
    expect(cv).toContain(data.profile.name);
    expect(cv).toContain('Hey, I');
  });

  it('paginates long descriptions without losing their final text or the PDF footer', () => {
    const data = structuredClone(mockPortfolioResponse.data);
    data.experience[0].description =
      'A longer account of the engineering work. '.repeat(180) +
      'Final experience sentence.';
    const document = createCvPdf(data);
    expect(document.getNumberOfPages()).toBeGreaterThan(2);
    const pdf = document.output();
    expect(pdf).toContain('Final experience sentence.');
    expect(pdf).toContain('Selected projects'.toUpperCase());
    expect(pdf).toContain(
      `${document.getNumberOfPages()} / ${document.getNumberOfPages()}`,
    );
  });
});
