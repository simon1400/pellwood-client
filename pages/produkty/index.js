import {useState, useEffect} from 'react';
import {modal, util} from 'uikit'
import Page from '../../layout/Page';
import RandomArticles from '../../components/RandomArticles';
import Cart from '../../components/Cart';
import SubMenu from '../../components/SubMenu';
import sanityClient from "../../lib/sanity.js";
import ModalFilter from '../../components/ModalFilter'
import translate from '../../data/staticTranslate'
import localize from '../../data/localize'
import changeUrl from '../../helpers/changeUrl'
import { useRouter } from 'next/router'
import controledProduct from '../../helpers/controledProduct'
import getRangeParameter from '../../helpers/getRangeParameter'
import shuffle from '../../helpers/shuffle'
import InfiniteScroll from 'react-infinite-scroll-component';

import Loader from '../../components/Loader'

export async function getServerSideProps(context) {

  const {lang, currency} = localize(context.locale)

  const category = context.query?.category || 'all'
  const size = context.query?.size || 6
  const search = context.query?.search || ''
  const diameterMin = context.query?.diameterMin || false
  const diameterMax = context.query?.diameterMax || false
  const lengthMin = context.query?.lengthMin || false
  const lengthMax = context.query?.lengthMax || false

  const diameterString = !!diameterMin && !!diameterMax
                          ? ` && (${lang}.parametrs[0].value <= "${(+diameterMax + 0.5).toLocaleString()}"
                              && ${lang}.parametrs[0].value >= "${diameterMin}"
                              || ${lang}.parametrs[1].value <= "${(+diameterMax + 0.5).toLocaleString()}"
                              && ${lang}.parametrs[1].value >= "${diameterMin}")`
                          : ''

  const lengthString = !!lengthMin && !!lengthMax
                          ? ` && (${lang}.parametrs[0].value <= "${(+lengthMax + 0.5).toLocaleString()}"
                              && ${lang}.parametrs[0].value >= "${lengthMin}"
                              || ${lang}.parametrs[1].value <= "${(+lengthMax + 0.5).toLocaleString()}"
                              && ${lang}.parametrs[1].value >= "${lengthMin}")`
                          : ''

  var parametersArr = false
  if(lengthMin && lengthMax && diameterMin && diameterMax){
    parametersArr = { lengthMin, lengthMax, diameterMin, diameterMax }
  }

  const queryProduct = `*[_type == "product"
                          ${category !== 'all' ? ` && ${lang}.category._ref == "${category}"` : ''}
                          ${!!search.length ? ` && ${lang}.title match '${search.split(/[,-]+/).join(' ')}*'` : ''}
                          ${!!diameterString.length ? diameterString : ''}
                          ${!!lengthString.length ? lengthString : ''}
                        ].${lang} | order(sort asc, title asc) [0...${size}]`;


  const queryParameters = `*[_type == "product"] {
    "parametrs": ${lang}.parametrs
  }`

  const queryCategory = `*[_type == "category"]{
    _id,
    "title": ${lang}.title,
    "slug": ${lang}.slug
  } | order(${lang}.sort asc)`

  const queryArticle = `*[_type == "article"] {
    "category": ${lang}.category,
    "categorySlug": *[_type == "archive" && _id == ^.${lang}.category._ref][0].${lang}.slug,
    "title": ${lang}.title,
    "slug": ${lang}.slug,
    "image": ${lang}.image
  } | order(${lang}.sort asc)`

  const querySettings = `*[_type == "settings"] {
    "titleCategory": ${lang}.titleCategory,
    "metaCatalog": ${lang}.metaCatalog,
    "descriptionCategory": ${lang}.descriptionCategory,
  }[0]`

  const query = `{
    'product': ${queryProduct},
    'parametrs': ${queryParameters},
    'category': ${queryCategory},
    'articles': ${queryArticle},
    'settings': ${querySettings}
  }`;

  const data = await sanityClient.fetch(query)

  const products = await controledProduct(lang, data.product)

  const range = getRangeParameter(data.parametrs)
  const rangeState = getRangeParameter(data.parametrs, parametersArr)

  const ifFiltered = !!search.length || !!parametersArr

  return {
    props: {
      category: data.category.filter(item => item?._id),
      settings: data.settings,
      articleFirst: shuffle(data.articles.filter(item => item?.category._ref.includes("3252355e-13f2-4628-8db4-a90bb522713b")), 0),
      articleSeccond: shuffle(data.articles.filter(item => item?.category._ref.includes("53b17b89-299c-48b1-b332-26240fc0e624")), 1),
      lang,
      currency,
      productData: products,
      range,
      rangeState,
      ifFiltered,
      searchQuery: search,
      query
    }
  }
}

const Catalog = ({
  query,
  category,
  settings,
  articleFirst,
  articleSeccond,
  lang,
  currency,
  productData,
  range,
  rangeState,
  parametrs,
  ifFiltered,
  searchQuery
}) => {

  const router = useRouter()

  const [firstLoad, setFirstLoad] = useState(false)
  const [queryUrlObj, setQueryUrlObj] = useState(router.query)
  const [reset, setReset] = useState(false)
  const [product, setProduct] = useState(productData)
  const [hasMore, setHasMore] = useState(true)
  const [filtered, setFiltered] = useState(ifFiltered)
  const [resetFilter] = useState('')
  const [search, setSearch] = useState(searchQuery || '')

  const [stateRange, setStateRange] = useState(rangeState)
  const [rangeNumber, setRangeNumber] = useState(range)

  useEffect(() => {
    if(firstLoad){
      changeData(router.query)
    }
    setFirstLoad(true)
  }, [router.query])

  const changeData = async (queryUrl) => {

    const sizeBefore = +queryUrl.size - 6 || 0
    const count = queryUrl.size || 6
    const category = queryUrl.category
    const search = queryUrl.search || ''

    const diameterMin = queryUrl.diameterMin || false
    const diameterMax = queryUrl.diameterMax || false
    const lengthMin = queryUrl.lengthMin || false
    const lengthMax = queryUrl.lengthMax || false

    var diameterString = !!diameterMin && !!diameterMax
                            ? ` && (${lang}.parametrs[0].value <= "${(+diameterMax + 0.5).toLocaleString()}"
                                && ${lang}.parametrs[0].value >= "${diameterMin}"
                                || ${lang}.parametrs[1].value <= "${(+diameterMax + 0.5).toLocaleString()}"
                                && ${lang}.parametrs[1].value >= "${diameterMin}")`
                            : ''

    var lengthString = !!lengthMin && !!lengthMax
                            ? ` && (${lang}.parametrs[0].value <= "${(+lengthMax + 0.5).toLocaleString()}"
                                && ${lang}.parametrs[0].value >= "${lengthMin}"
                                || ${lang}.parametrs[1].value <= "${(+lengthMax + 0.5).toLocaleString()}"
                                && ${lang}.parametrs[1].value >= "${lengthMin}")`
                            : ''

    var rootString = `*[_type == "product"
                        ${category !== 'all' ? ` && ${lang}.category._ref == "${category}"` : ''}
                        ${!!search.length ? ` && ${lang}.title match '${search.split(/[,-]+/).join(' ')}*'` : ''}
                        ${!!diameterString.length ? diameterString : ''}
                        ${!!lengthString.length ? lengthString : ''}
                      ]`

    var sizeString = `[${sizeBefore}...${count}]`
    var orderString = `| order(sort asc, title asc)`

    const query = `${rootString}.${lang} ${orderString} ${sizeString}`

    const data = await sanityClient.fetch(query)

    if(!data.length) {
      setHasMore(false)
    }

    if(reset){
      setProduct(data)
      setReset(false)
    }else{
      setProduct([...product, ...data])
    }

  }

  const moreData = () => {
    changeUrl(+router.query.size + 6, false, false, [], router)
  }

  const closeModal = () => {
    modal(util.find('#modal-filter')).hide();
  }

  const handleFilter = e => {
    e.preventDefault()

    setReset(true)
    changeUrl(6, false, search, stateRange, router)

    closeModal()
    setFiltered(true)
  }

  const cancelFilter = async (e) => {
    e.preventDefault()
    setFiltered(false)
    setStateRange(rangeNumber)
    setSearch('')
    setReset(true)
    changeUrl(6, false, '', {}, router, true)
  }

  return (
    <Page id="catalog" title={settings.metaCatalog?.title} description={settings.metaCatalog?.description}>
      {settings?.titleCategory && <section className="head_category">
        <div className="uk-container uk-container-expand">
          <div className="content_head_wrap">
            <h1>{settings.titleCategory}</h1>
            <p>{settings.descriptionCategory}</p>
          </div>
        </div>
      </section>}

      <section className="category grey" id="catalog-short" uk-filter="target: .js-filter">
        <div className="uk-container uk-container-expand">
          <div className="category_menu uk-flex uk-flex-between uk-flex-middle uk-flex-wrap">
            <div className="uk-flex uk-flex-middle uk-width-1-1 uk-flex-between uk-flex-wrap">
              <div className="filter-controls-wrap">
                <a className="tm-button tm-black-button" href="#modal-filter" uk-toggle="">{translate.searchAndFilter[lang]}</a>
                {!!filtered && <button className="cancel-filtered tm-button tm-button-text" onClick={e => cancelFilter(e)}>
                  <img className="uk-svg" src="/assets/times.svg" alt="Cancel filter" uk-svg="" hidden="" />
                  {translate.cancelFilters[lang]}
                </button>}
              </div>
              <SubMenu data={category} setReset={setReset}/>
            </div>
          </div>
        </div>

        <div className="uk-container uk-container-expand">
          {!!product.length && <InfiniteScroll
              dataLength={product.length}
              next={moreData}
              hasMore={hasMore}
              loader={<Loader />}
              scrollThreshold={0.6}
              endMessage={<div></div>}
            >
            <ul className="uk-grid uk-child-width-1-1 uk-child-width-1-3@m uk-child-width-1-2@s" uk-grid="">
              {product.map((item, index) => <Cart item={item} key={index} lang={lang} currency={currency} />)}
            </ul>
          </InfiniteScroll>}
        </div>
      </section>

      <RandomArticles lang={lang} articleFirst={articleFirst} articleSeccond={articleSeccond}/>

      <ModalFilter
        setSearch={setSearch}
        search={search}
        lang={lang}
        closeModal={closeModal}
        setStateRange={setStateRange}
        handleFilter={handleFilter}
        rangeNumber={rangeNumber}
        stateRange={stateRange} />

    </Page>
  )
}

export default Catalog
