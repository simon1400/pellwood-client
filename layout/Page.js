import {useState, useEffect, useContext} from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { DataStateContext } from '../context/dataStateContext'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import Login from '../components/Login'
import ForgotPassword from '../components/ForgotPassword'
import ResetPassword from '../components/ResetPassword'

const SITE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://pellwood.com';
const defaultTitle = 'PELLWOOD';
const defaultDescription = 'Paličky';
const defaultImage = `${SITE_URL}/assets/logo.svg`;
// const defaultTwitter = '@pellwood';
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
  tags
}) => {

  const router = useRouter()
  const theTitle = title ? (title + defaultSep + defaultTitle).substring(0, 60) : defaultTitle;
  const theDescription = description ? description.substring(0, 155) : defaultDescription;
  const theImage = image ? image : defaultImage;

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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-JZZP01DVF0"></script>
        <script dangerouslySetInnerHTML={{__html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-JZZP01DVF0');`}} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-182610890-1"></script>
        <script dangerouslySetInnerHTML={{__html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-182610890-1');`}} />

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
        <link rel="canonical" href={SITE_URL+router.asPath} />
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
        <meta property="og:url" content={SITE_URL+router.asPath} />
        <meta property="og:image" content={theImage} />
        <meta property="og:description" content={theDescription} />
        <meta property="og:site_name" content={defaultTitle} />
        <meta property="fb:app_id" content={global.facebook_app_id} />

        {published && <meta name="article:published_time" content={published} />}
        {category && <meta name="article:section" content={category} />}
        {updated && <meta name="article:modified_time" content={updated} />}
        {noCrawl && <meta name="robots" content="noindex, nofollow" />}
        {tags && <meta name="article:tag" content={tags} />}

      </Head>
      <Header loginUser={loginUser} />
      <main id={id} className={className}>{children}</main>
      <Footer />
      <ForgotPassword />
      <ResetPassword />
      <Login setLoginUser={setLoginUser}/>
    </>
  );
}

export default Page;
