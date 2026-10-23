import { describe, expect, it } from 'vitest';
import { publicAssetUrl } from './publicAssetUrl';

describe('public asset URLs on GitHub Pages', () => {
  it.each([
    '/projects/streamx.svg',
    'projects/streamx.svg',
    './projects/streamx.svg',
  ])('resolves %s within the repository path', (path) =>
    expect(publicAssetUrl(path, '/pratik-portfolio/')).toBe(
      '/pratik-portfolio/projects/streamx.svg',
    ),
  );

  it('resolves a configured CV file and preserves its query and fragment', () => {
    expect(
      publicAssetUrl('/cv.pdf?version=2#page=1', '/pratik-portfolio/'),
    ).toBe('/pratik-portfolio/cv.pdf?version=2#page=1');
  });

  it('does not add the repository path twice', () => {
    expect(
      publicAssetUrl(
        '/pratik-portfolio/projects/streamx.svg',
        '/pratik-portfolio/',
      ),
    ).toBe('/pratik-portfolio/projects/streamx.svg');
  });

  it('supports deployment at the domain root', () => {
    expect(publicAssetUrl('/cv.pdf', '/')).toBe('/cv.pdf');
    expect(publicAssetUrl('projects/streamx.svg', '/')).toBe(
      '/projects/streamx.svg',
    );
  });

  it.each([
    'https://example.com/cv.pdf',
    '//cdn.example.com/image.webp',
    'data:image/png;base64,example',
    'blob:https://example.com/cv',
    '#contact',
    '',
  ])('preserves non-local asset URL %s', (path) =>
    expect(publicAssetUrl(path, '/pratik-portfolio/')).toBe(path),
  );
});
