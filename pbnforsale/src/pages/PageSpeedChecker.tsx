import { useState } from 'react';
import { Check, AlertCircle, Zap } from 'lucide-react';

interface PageSpeedResult {
  performanceScore: number;
  seoScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  fcp: string;
  lcp: string;
  tbt: string;
  cls: string;
}

function getScoreColor(score: number): string {
  if (score >= 90) return 'text-green-500';
  if (score >= 50) return 'text-orange-500';
  return 'text-red-500';
}

function getScoreBgColor(score: number): string {
  if (score >= 90) return 'bg-green-500/20 border-green-500/30';
  if (score >= 50) return 'bg-orange-500/20 border-orange-500/30';
  return 'bg-red-500/20 border-red-500/30';
}

export default function PageSpeedChecker() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<PageSpeedResult | null>(null);

  const validateUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!url.trim()) {
      setError('Please enter a website URL');
      return;
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_PAGESPEED_API_KEY || 'AIzaSyBBeCf57CJ_EfOVziDTcfr5-YjsXrp_YAg';
      const encodedUrl = encodeURIComponent(url);
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodedUrl}&category=performance&category=accessibility&category=best-practices&category=seo&strategy=mobile&key=${apiKey}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('API quota exceeded or invalid API key');
        }
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      // Extract scores
      const lighthouseResult = data.lighthouseResult;
      const categories = lighthouseResult.categories;

      // Extract metrics
      const metrics = lighthouseResult.audits;
      const fcp = metrics['first-contentful-paint']?.displayValue || 'N/A';
      const lcp = metrics['largest-contentful-paint']?.displayValue || 'N/A';
      const tbt = metrics['total-blocking-time']?.displayValue || 'N/A';
      const cls = metrics['cumulative-layout-shift']?.displayValue || 'N/A';

      setResult({
        performanceScore: Math.round(categories.performance.score * 100),
        seoScore: Math.round(categories.seo.score * 100),
        accessibilityScore: Math.round(categories.accessibility.score * 100),
        bestPracticesScore: Math.round(categories['best-practices'].score * 100),
        fcp,
        lcp,
        tbt,
        cls,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch PageSpeed data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-200 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-gold-500" />
            <h1 className="text-3xl font-bold text-white">PageSpeed Checker</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Check your website's performance, SEO score, and Core Web Vitals instantly
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleCheck} className="bg-dark-800 rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your website URL (e.g., https://example.com)"
              className="flex-1 px-4 py-3 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 font-semibold rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Checking...' : 'Check Performance'}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-8 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-gold-500 border-t-transparent"></div>
            <p className="text-gray-400 mt-4">Analyzing your website...</p>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="space-y-6">
            {/* Scores Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Performance', score: result.performanceScore },
                { label: 'SEO', score: result.seoScore },
                { label: 'Accessibility', score: result.accessibilityScore },
                { label: 'Best Practices', score: result.bestPracticesScore },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`rounded-lg p-6 border-2 ${getScoreBgColor(item.score)}`}
                >
                  <p className="text-gray-300 text-sm mb-2">{item.label}</p>
                  <p className={`text-4xl font-bold ${getScoreColor(item.score)}`}>
                    {item.score}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {item.score >= 90
                      ? '✓ Excellent'
                      : item.score >= 50
                      ? '⚠ Needs Work'
                      : '✗ Poor'}
                  </p>
                </div>
              ))}
            </div>

            {/* Core Web Vitals */}
            <div className="bg-dark-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-gold-500" />
                Core Web Vitals
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'First Contentful Paint (FCP)', value: result.fcp },
                  { label: 'Largest Contentful Paint (LCP)', value: result.lcp },
                  { label: 'Total Blocking Time (TBT)', value: result.tbt },
                  { label: 'Cumulative Layout Shift (CLS)', value: result.cls },
                ].map((metric) => (
                  <div key={metric.label} className="bg-dark-700 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">{metric.label}</p>
                    <p className="text-xl font-semibold text-white">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gold-500/10 border border-gold-500/20 rounded-lg p-6">
              <h2 className="text-lg font-bold text-gold-400 mb-2">💡 Tips to Improve</h2>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Minimize JavaScript and CSS files</li>
                <li>• Optimize images and use modern formats (WebP)</li>
                <li>• Enable browser caching</li>
                <li>• Use a Content Delivery Network (CDN)</li>
                <li>• Reduce server response time</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
