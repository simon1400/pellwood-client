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

export async function getServerSideProps({locale}) {
  const {lang, currency} = localize(locale)

  const query = `{
    'product': *[_type == "product"].${lang} | order(${lang}.sort asc) | order(${lang}.title asc),
    'category': *[_type == "category"] | order(${lang}.sort asc),
    'articles': *[_type == "article"] | order(${lang}.sort asc),
    'settings': *[_type == "settings"].${lang}
  }`;

  const data = await sanityClient.fetch(query)

  const shuffle = (a, count) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a
  }

  return {
    props: {
      category: data.category.filter(item => item?._id),
      settings: data.settings.filter(item => item?.titleCategory)?.[0],
      articleFirst: shuffle(data.articles.filter(item => item[lang]?.category._ref.includes("3252355e-13f2-4628-8db4-a90bb522713b")), 0),
      articleSeccond: shuffle(data.articles.filter(item => item[lang]?.category._ref.includes("53b17b89-299c-48b1-b332-26240fc0e624")), 1),
      lang,
      currency
    }
  }
}

const Catalog = ({
  category,
  settings,
  articleFirst,
  articleSeccond,
  lang,
  currency
}) => {

  const [product, setProduct] = useState([])
  const [filtered, setFiltered] = useState(false)
  const [resetFilter] = useState('')
  const [search, setSearch] = useState('')
  const [urlProduct, setUrlProduct] = useState(`*[_type == "product"].${lang}`)

  const [stateRange, setStateRange] = useState({
    length: {
      min: 0,
      max: 45
    },
    diameter: {
      min: 0,
      max: 45
    }
  })

  const [rangeNumber, setRangeNumber] = useState({
    length: {
      min: 0,
      max: 45
    },
    diameter: {
      min: 0,
      max: 45
    }
  })

  useEffect(() => {
    sanityClient.fetch(`${urlProduct} | order(sort asc, title asc)`).then(data => {

      let filteredProduct = data.filter(item => item?.title)
      if(lang === 'en'){
        filteredProduct.map(item => {
          if(typeof item.price === 'string'){
            item.price.replace(/,/g, '.')
          }else if(item.variants?.length){
            item.variants = item.variants.map(variant => {
              variant.price = variant.price.replace(/,/g, '.')
              return variant
            })
          }
        })
      }

      setProduct(filteredProduct)

      const lengthNumbers = [], diameterNumbers = []
      var length = undefined, diameter = undefined;

      for(var i = 0; i < filteredProduct.length; i++){
        if(filteredProduct[i]?.parametrs){
          length = filteredProduct[i]?.parametrs.find(o => o.title === 'Délka' || o.title === 'Length')
          diameter = filteredProduct[i]?.parametrs.find(o => o.title === 'Průměr' || o.title === 'Diameter')
          if(length){
            lengthNumbers.push(+length.value.substr(0, length.value.length - 3).split(',').join('.'))
          }
          if(diameter){
            diameterNumbers.push(+diameter.value.substr(0, diameter.value.length - 3).split(',').join('.'))
          }
        }
      }
      const rangeNum = {
        length: {
          min: Math.min(...lengthNumbers),
          max: Math.max(...lengthNumbers)
        },
        diameter: {
          min: Math.min(...diameterNumbers),
          max: Math.max(...diameterNumbers)
        }
      }

      setRangeNumber(rangeNum)
      setStateRange(rangeNum)
    })
  }, [])



  const closeModal = () => {
    modal(util.find('#modal-filter')).hide();
  }

  const handleFilter = (e) => {
    e.preventDefault()

    const newUrlProduct = `*[_type == "product" ${!!search.length ? '&& '+lang+'.title match "'+ search.split(/[,-]+/).join(' ') +'*"' : ''}].${lang}`
    setUrlProduct(newUrlProduct)
    const searchQuery = `${newUrlProduct} | order(sort asc, title asc)`
    sanityClient.fetch(searchQuery).then(data => {
      const filteredProduct = data.filter(item => item?.title)
      const filteredProdParameters = []
      var length = undefined, diameter = undefined, lengthNum = 0, diameterNum = 0;

      for(var i = 0; i < filteredProduct.length; i++){
        if(filteredProduct[i]?.parametrs){
          length = filteredProduct[i]?.parametrs.find(o => o.title === 'Délka' || o.title === 'Length')
          diameter = filteredProduct[i]?.parametrs.find(o => o.title === 'Průměr' || o.title === 'Diameter')

          if(length || diameter){
            if(length){
              lengthNum = +length.value.substr(0, length.value.length - 3).split(',').join('.')
            }
            if(diameter){
              diameterNum = +diameter.value.substr(0, diameter.value.length - 3).split(',').join('.')
            }
            if(lengthNum <= stateRange.length.max
              && lengthNum >= stateRange.length.min
              && diameterNum <= stateRange.diameter.max
              && diameterNum >= stateRange.diameter.min){
                filteredProdParameters.push(filteredProduct[i])
            }
          }
        }
      }
      setProduct(filteredProdParameters)
    })
    closeModal()
    setFiltered(true)
  }


  const cancelFilter = async (e) => {
    e.preventDefault()
    setFiltered(false)
    setStateRange(rangeNumber)
    setSearch('')
    setUrlProduct(`*[_type == "product"].${lang}`)
    const data = await sanityClient.fetch(`*[_type == "product"].${lang} | order(sort asc) | order(title asc)`)
    setProduct(data)
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
              <SubMenu data={category}/>
            </div>
          </div>
        </div>
        <div className="uk-container uk-container-expand">
          <ul className={`js-filter uk-grid uk-child-width-1-1 uk-child-width-1-3@m uk-child-width-1-2@s${resetFilter ? ' show-all' : ''}`} uk-grid="">
            {!!product.length && product.map((item, index) => <Cart item={item} key={index} lang={lang} currency={currency} />)}
          </ul>
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
