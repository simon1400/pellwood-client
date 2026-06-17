const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export function getStrapiURL(path = '') {
  return `${STRAPI_URL}${path}`;
}

/**
 * Modern, dependency-free deep object serializer for Strapi URL queries.
 * Replaces the deprecated `qs` library.
 */
function buildQuery(params: any, prefix = ''): URLSearchParams {
  const query = new URLSearchParams();

  if (!params) return query;

  Object.keys(params).forEach((key) => {
    const value = params[key];
    const newPrefix = prefix ? `${prefix}[${key}]` : key;

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      const nestedQuery = buildQuery(value, newPrefix);
      nestedQuery.forEach((v, k) => query.append(k, v));
    } else if (Array.isArray(value)) {
      value.forEach((val, i) => {
        if (typeof val === 'object') {
          const nestedQuery = buildQuery(val, `${newPrefix}[${i}]`);
          nestedQuery.forEach((v, k) => query.append(k, v));
        } else {
          query.append(`${newPrefix}[${i}]`, String(val));
        }
      });
    } else if (value !== undefined) {
      query.append(newPrefix, String(value));
    }
  });

  return query;
}

// Helper to fetch data from Strapi API
export async function fetchAPI(path: string, urlParamsObject: Record<string, any> = {}) {
  // Set default populate parameter to get all relations and components if not specified
  if (!urlParamsObject.populate) {
    urlParamsObject.populate = '*';
  }

  // Convert params to query string using native URLSearchParams
  const searchParams = buildQuery(urlParamsObject);
  const queryString = searchParams.toString();
  
  const requestUrl = getStrapiURL(`/api/${path}${queryString ? `?${queryString}` : ''}`);

  const response = await fetch(requestUrl);

  if (!response.ok) {
    console.error(`Error fetching from Strapi: ${response.statusText}`);
    throw new Error(`An error occurred while fetching data from Strapi.`);
  }

  try {
    const text = await response.text();
    if (!text) return {};
    return JSON.parse(text);
  } catch (error) {
    console.error(`Error parsing JSON from Strapi at ${requestUrl}:`, error);
    return {};
  }
}

/**
 * Resolves Strapi image objects to their full URL.
 * Emulates the old Sanity builder pattern but tailored for Strapi formats.
 */
export function urlFor(image: any) {
  let imageUrl = '';
  let formats: any = null;

  if (image) {
    if (typeof image === 'string') {
      imageUrl = image;
    } else {
      imageUrl = image.url || (image.data?.attributes?.url) || '';
      formats = image.formats || (image.data?.attributes?.formats) || null;
    }
  }

  const resolvedUrl = imageUrl ? (imageUrl.startsWith('/') ? getStrapiURL(imageUrl) : imageUrl) : '';

  // Minimal builder to support legacy components calling .width().url() without breaking the app
  const createBuilder = (currentUrl: string) => {
    const builder: any = {
      url: () => currentUrl,
      toString: () => currentUrl,
      width: (w: number) => {
        let widthUrl = currentUrl;
        if (formats && w) {
          if (w <= 150 && formats.thumbnail) widthUrl = getStrapiURL(formats.thumbnail.url);
          else if (w <= 500 && formats.small) widthUrl = getStrapiURL(formats.small.url);
          else if (w <= 750 && formats.medium) widthUrl = getStrapiURL(formats.medium.url);
          else if (w <= 1000 && formats.large) widthUrl = getStrapiURL(formats.large.url);
        }
        return createBuilder(widthUrl);
      },
      // Stub methods for legacy compatibility
      height: () => builder,
      size: () => builder,
      focalPoint: () => builder,
      maxWidth: () => builder,
      minWidth: () => builder,
      maxHeight: () => builder,
      minHeight: () => builder,
      blur: () => builder,
      sharpen: () => builder,
      rect: () => builder,
      format: () => builder,
      invert: () => builder,
      orientation: () => builder,
      quality: () => builder,
      forceDownload: () => builder,
      flipHorizontal: () => builder,
      flipVertical: () => builder,
      ignoreImageParams: () => builder,
      fit: () => builder,
      crop: () => builder,
      saturation: () => builder,
      auto: () => builder,
      pad: () => builder,
      vanityName: () => builder,
      frame: () => builder,
      image: () => builder,
      dataset: () => builder,
      projectId: () => builder,
      bg: () => builder,
      dpr: () => builder,
      withOptions: () => builder,
    };
    return builder;
  };

  return createBuilder(resolvedUrl);
}
