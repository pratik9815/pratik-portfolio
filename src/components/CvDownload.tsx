import { ArrowDownToLine, LoaderCircle } from 'lucide-react';
import { useRef, useState } from 'react';
import type { PortfolioData } from '../features/portfolio/types';
import { publicAssetUrl } from '../lib/publicAssetUrl';

export function CvDownload({ data }: { data: PortfolioData }) {
  const [status, setStatus] = useState<'idle' | 'busy' | 'error'>('idle');
  const downloading = useRef(false);
  const { cv } = data.profile;

  async function downloadPdf() {
    if (downloading.current) return;
    downloading.current = true;
    setStatus('busy');
    try {
      // Load PDF support on demand to keep the initial page bundle small.
      const { createCvPdf } = await import('../features/portfolio/cv');
      await createCvPdf(data).save(
        cv.filename.replace(/\.[^.]+$/, '') + '.pdf',
        { returnPromise: true },
      );
      setStatus('idle');
    } catch {
      setStatus('error');
    } finally {
      downloading.current = false;
    }
  }

  if (cv.url)
    return (
      <a
        className="button button-secondary"
        href={publicAssetUrl(cv.url)}
        download={cv.filename}
      >
        <ArrowDownToLine size={16} /> Download CV{' '}
        <span className="file-type">
          {cv.filename.split('.').pop()?.toUpperCase()}
        </span>
      </a>
    );

  return (
    <span className="cv-download">
      <button
        className="button button-secondary"
        onClick={() => void downloadPdf()}
        disabled={status === 'busy'}
        aria-busy={status === 'busy'}
      >
        {status === 'busy' ? (
          <LoaderCircle size={16} className="spinner" />
        ) : (
          <ArrowDownToLine size={16} />
        )}{' '}
        Download CV <span className="file-type">PDF</span>
      </button>
      <span className="cv-download-status" role="status">
        {status === 'error' ? 'Couldn’t create the PDF. Please try again.' : ''}
      </span>
    </span>
  );
}
