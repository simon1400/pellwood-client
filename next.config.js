const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)

  const env = {
    APP_API: process.env.APP_API || 'http://localhost:3001/api',
    REACT_APP_API: '/api'
  }

  return {
    env,
    i18n: {
      locales: ['cs', 'en'],
      defaultLocale: 'cs',
      localeDetection: false,
    },
    images: {
      dangerouslyAllowLocalIP: true,
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
        },
        {
          protocol: 'https',
          hostname: '**.pellwood.com',
        },
      ],
    },
    sassOptions: {
      quietDeps: true,
      silenceDeprecations: ['import', 'color-functions', 'global-builtin', 'slash-div'],
    }
  }
}
