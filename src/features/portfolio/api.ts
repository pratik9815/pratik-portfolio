import { mockPortfolioResponse } from '../../data/portfolio';
import type { PortfolioResponse } from './types';

/** An asynchronous mock API boundary. Replace this function with fetch later if desired. */
export function getPortfolio(signal?: AbortSignal): Promise<PortfolioResponse> {
  return new Promise((resolve, reject) => {
    const abort = () => {
      clearTimeout(timer);
      reject(new DOMException('Request cancelled', 'AbortError'));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', abort);
      resolve(structuredClone(mockPortfolioResponse));
    }, 180);
    if (signal?.aborted) abort();
    else signal?.addEventListener('abort', abort, { once: true });
  });
}
