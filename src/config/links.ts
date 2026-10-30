const DEFAULT_TELEGRAM_LINK =
  import.meta.env.VITE_TELEGRAM_URL || 'https://t.me/suporteoperax';

const DEFAULT_BROKER_LINK =
  import.meta.env.VITE_BROKER_URL || 'https://operax.ai/corretora';

const TRACKING_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'src',
  'sck',
  'fbclid',
  'gclid',
];

function appendTrackingParams(targetUrl: string, extraParams?: Record<string, string>): string {
  if (typeof window === 'undefined') {
    return targetUrl;
  }

  try {
    const url = new URL(targetUrl);
    const currentParams = new URLSearchParams(window.location.search);

    for (const key of TRACKING_KEYS) {
      const val = currentParams.get(key);
      if (val && !url.searchParams.has(key)) {
        url.searchParams.set(key, val);
      }
    }

    if (extraParams) {
      for (const [k, v] of Object.entries(extraParams)) {
        if (v && !url.searchParams.has(k)) {
          url.searchParams.set(k, v);
        }
      }
    }

    return url.toString();
  } catch {
    return targetUrl;
  }
}

export function getTelegramUrl(selectedTierLabel?: string): string {
  let base = DEFAULT_TELEGRAM_LINK;

  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const override = params.get('telegram') || params.get('tg');
    if (override && /^https?:\/\//i.test(override)) {
      base = override;
    }
  }

  const activationText = selectedTierLabel
    ? `DESTRAVAR A IA - ${selectedTierLabel}`
    : 'DESTRAVAR A IA';

  const isDirectUsernameLink =
    /^https?:\/\/(t\.me|telegram\.me)\/[a-zA-Z0-9_]+\/?$/i.test(base);

  return appendTrackingParams(
    base,
    isDirectUsernameLink ? { text: activationText } : undefined
  );
}

export function getBrokerUrl(): string {
  let base = DEFAULT_BROKER_LINK;

  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const override = params.get('broker') || params.get('corretora');
    if (override && /^https?:\/\//i.test(override)) {
      base = override;
    }
  }

  return appendTrackingParams(base);
}
