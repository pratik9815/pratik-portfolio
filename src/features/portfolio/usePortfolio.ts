import { useCallback, useEffect, useState } from 'react';
import { getPortfolio } from './api';
import type { PortfolioData } from './types';

type State =
  | { status: 'loading' }
  | { status: 'success'; data: PortfolioData }
  | { status: 'error' };

export function usePortfolio() {
  const [state, setState] = useState<State>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => {
    setState({ status: 'loading' });
    setAttempt((value) => value + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    getPortfolio(controller.signal)
      .then((response) => {
        if (!controller.signal.aborted)
          setState({ status: 'success', data: response.data });
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'AbortError'))
          setState({ status: 'error' });
      });
    return () => controller.abort();
  }, [attempt]);

  return { state, retry };
}
