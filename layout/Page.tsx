import {useState, useEffect, useContext, ReactNode} from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { DataStateContext } from '../context/dataStateContext'
import Header from './Header'
import Footer from './Footer'
import dynamic from 'next/dynamic'
const Login = dynamic(() => import('../components/Login'), { ssr: false })
const ForgotPassword = dynamic(() => import('../components/ForgotPassword'), { ssr: false })
const ResetPassword = dynamic(() => import('../components/ResetPassword'), { ssr: false })
const CookieConsent = dynamic(() => import('../components/CookieConsent'), { ssr: false })
import { modal } from 'uikit'
import Script from 'next/script'
import type { PageProps } from '@/src/types/shop'

const SITE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://pellwood.com';
const defaultTitle = 'PELLWOOD';
const defaultDescription = 'Paličky';
const defaultImage = `${SITE_URL}/assets/logo.svg`;
const defaultSep = ' | ';

const Page = ({
  children,
  id,
  className,
  title,
  description,
  image,
  twitter,
  contentType,
  published,
  category,
  updated,
  noCrawl,
  tags,
  purchase = false
}: PageProps) => {

  const router = useRouter()
  const theTitle = title ? (title + defaultSep + defaultTitle).substring(0, 60) : defaultTitle;
  const theDescription = description ? description.substring(0, 155) : defaultDescription;
  const theImage = image ? image : defaultImage;
  const canonical = router.locale === 'en' ? SITE_URL+'/'+router.locale+router.asPath.split('?')[0] : SITE_URL+router.asPath.split('?')[0]

  const { dataContextState } = useContext(DataStateContext)
  const [loginUser, setLoginUser] = useState(false)

  useEffect(() => {
    if(dataContextState.user){
      setLoginUser(true)
    }
    if(router.query?.email){
      modal('#reset-password').show();
    }
  }, [])

  return (
    <>
      <Head>

        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon/favicon.ico" />

        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/manifest.json" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />

        {/*<link rel="stylesheet preload prefetch" href="/fonts.css" as="style" type="text/css" crossOrigin="anonymous" />*/}
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#232323" />
        <meta name="google-site-verification" content="P5i8IZ7hI1tHTStpXE_BlzfEggYY31nJUUiNZX3CN-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{theTitle}</title>
        <link rel="canonical" href={canonical} />
        <meta itemProp="name" content={theTitle} />
        <meta itemProp="description" content={theDescription} />
        <meta itemProp="image" content={theImage} />
        <meta name="description" content={theDescription} />
        {/*<meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={global.defaultTwitter} />
        <meta name="twitter:title" content={theTitle} />
        <meta name="twitter:description" content={theDescription} />
        <meta name="twitter:creator" content={twitter || global.defaultTwitter} />
        <meta name="twitter:image:src" content={theImage} />*/}
        <meta property="og:title" content={theTitle} />
        <meta property="og:type" content={contentType || 'website'} />
        <meta property="og:url" content={SITE_URL+router.asPath.split('?')[0]} />
        <meta property="og:image" content={theImage} />
        <meta property="og:description" content={theDescription} />
        <meta property="og:site_name" content={defaultTitle} />
        <meta property="fb:app_id" content={(global as any).facebook_app_id} />

        {published && <meta name="article:published_time" content={published} />}
        {category && <meta name="article:section" content={category} />}
        {updated && <meta name="article:modified_time" content={updated} />}
        {noCrawl && <meta name="robots" content="noindex, nofollow" />}
        {tags && <meta name="article:tag" content={tags} />}

      </Head>
      <Script strategy="afterInteractive" type="text/plain" data-cookiecategory="analytics" src="https://www.googletagmanager.com/gtag/js?id=UA-182610890-1"></Script>
      <Script strategy="afterInteractive" id="google-analytics" type="text/plain" data-cookiecategory="analytics" dangerouslySetInnerHTML={{__html: `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-182610890-1');`}} />
      <Script strategy="lazyOnload" src="https://c.seznam.cz/js/rc.js"></Script>
      {purchase && <Script strategy="afterInteractive" id="google-analytics-purchase" type="text/plain" data-cookiecategory="analytics" dangerouslySetInnerHTML={{__html: `gtag('event', 'purchase', ${JSON.stringify(purchase)})`}} />}
      <Script strategy="lazyOnload" src="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v2.8.0/dist/cookieconsent.js"></Script>

      {purchase && <Script strategy="lazyOnload" id="seznam-conversion" dangerouslySetInnerHTML={{__html: `
        var conversionConf = {
          zboziId: 153477,
          orderId: ${purchase.transaction_id},
          zboziType: "standard",
          consent: 1,
        };
        if (window.rc && window.rc.conversionHit) {
          window.rc.conversionHit(conversionConf);
        }`}} />}
      <Header loginUser={loginUser} />
      <main id={id} className={className}>{children}</main>
      <Footer />
      <ForgotPassword />
      <ResetPassword />
      <Login setLoginUser={setLoginUser}/>
      <CookieConsent />
    </>
  );
}

export default Page;
