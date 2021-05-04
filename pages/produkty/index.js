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

export async function getServerSideProps(context) {

  const {lang, currency} = localize(context.locale)

  var category, size;
  if(!context.query?.category){
    category = 'all'
  }else{
    category = context.query?.category
  }

  if(!context.query?.size){
    size = 6
  }else{
    size = context.query?.size
  }

  const queryProduct = `*[_type == "product"
                          ${category !== 'all' ? ` && ${lang}.category._ref == "${category}"` : ''}
                          ${!!context.query.search?.length ? ` && ${lang}.title match '${context.query.search.split(/[,-]+/).join(' ')}*'` : ''}
                        ].${lang}
                        [0...${size}]
                        | order(${lang}.sort asc) | order(${lang}.title asc)`;

  const query = `{
    'product': ${queryProduct},
    'category': *[_type == "category"] | order(${lang}.sort asc),
    'articles': *[_type == "article"] | order(${lang}.sort asc),
    'settings': *[_type == "settings"].${lang}
  }`;

  const data = await sanityClient.fetch(query)

  const products = await controledProduct(lang, data.product)

  const range = getRangeParameter(data.product)
  const rangeState = getRangeParameter(data.product)

  return {
    props: {
      category: data.category.filter(item => item?._id),
      settings: data.settings.filter(item => item?.titleCategory)?.[0],
      articleFirst: shuffle(data.articles.filter(item => item[lang]?.category._ref.includes("3252355e-13f2-4628-8db4-a90bb522713b")), 0),
      articleSeccond: shuffle(data.articles.filter(item => item[lang]?.category._ref.includes("53b17b89-299c-48b1-b332-26240fc0e624")), 1),
      lang,
      currency,
      productData: products,
      range,
      rangeState
    }
  }
}

const Catalog = ({
  category,
  settings,
  articleFirst,
  articleSeccond,
  lang,
  currency,
  productData,
  range,
  rangeState
}) => {
  const router = useRouter()

  const [firstLoad, setFirstLoad] = useState(false)
  const [queryUrlObj, setQueryUrlObj] = useState(router.query)
  const [reset, setReset] = useState(false)
  const [product, setProduct] = useState(productData)
  const [hasMore, setHasMore] = useState(true)
  const [filtered, setFiltered] = useState(false)
  const [resetFilter] = useState('')
  const [search, setSearch] = useState('')
  const [urlProduct, setUrlProduct] = useState(`*[_type == "product"].${lang} | order(${lang}.sort asc, ${lang}.title asc)`)

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

    {/*const diameterMin = queryUrl.diameterMin || false
    const diameterMax = queryUrl.diameterMax || false
    const lengthMin = queryUrl.lengthMin || false
    const lengthMax = queryUrl.lengthMax || false

    var diameterString = !!diameterMin && !!diameterMax
                            ? ` && (${lang}.parametrs[0].value <= ${diameterMax}
                                && ${lang}.parametrs[0].value >= ${diameterMin}
                                || ${lang}.parametrs[1].value <= ${diameterMax}
                                && ${lang}.parametrs[1].value >= ${diameterMin})`
                            : ''

    var lengthString = !!lengthMin && !!lengthMax
                            ? ` && (${lang}.parametrs[0].value <= ${lengthMax}
                                && ${lang}.parametrs[0].value >= ${lengthMin}
                                || ${lang}.parametrs[1].value <= ${lengthMax}
                                && ${lang}.parametrs[1].value >= ${lengthMin})`
                            : ''*/}

    var rootString = `*[_type == "product"
                        ${category !== 'all' ? ` && ${lang}.category._ref == "${category}"` : ''}
                        ${!!search.length ? ` && ${lang}.title match '${search.split(/[,-]+/).join(' ')}*'` : ''}
                      ]`

    var sizeString = `[${sizeBefore}...${count}]`
    var orderString = `| order(${lang}.sort asc) | order(${lang}.title asc)`

    const query = `${rootString}.${lang} ${sizeString} ${orderString}`

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

  const handleFilter = (e) => {
    e.preventDefault()

    setReset(true)
    changeUrl(6, false, search, stateRange, router)

    // const newUrlProduct = `*[_type == "product" ${!!search.length ? '&& '+lang+'.title match "'+ search.split(/[,-]+/).join(' ') +'*"' : ''}].${lang} | order(sort asc, title asc)`
    closeModal()
    setFiltered(true)
  }

  const cancelFilter = async (e) => {
    e.preventDefault()
    setFiltered(false)
    setStateRange(rangeNumber)
    setSearch('')
    setReset(true)
    changeUrl(6, false, '', {}, router)
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
                {filtered && <button className="cancel-filtered tm-button tm-button-text" onClick={e => cancelFilter(e)}>
                  <img src="/assets/times.svg" alt="Cancel filter" uk-svg="" />
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
              loader={<h4>Loading...</h4>}
              scrollThreshold={0.5}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
            <ul className={`js-filter uk-grid uk-child-width-1-1 uk-child-width-1-3@m uk-child-width-1-2@s${resetFilter ? ' show-all' : ''}`} uk-grid="">
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
