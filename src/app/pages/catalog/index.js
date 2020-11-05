import React, {useState, useEffect} from 'react';
import Page from '../../components/page';
import RandomArticles from '../../components/random-articles';
import Cart from '../../components/cart';
import SubMenu from '../../components/sub-menu';
import sanityClient from "../../../lib/sanity.js";
import ModalFilter from './modalFilter'
import {modal, util} from 'uikit'
import InfiniteScroll from 'react-infinite-scroller'

import times from '../../assets/times.svg'

import './style.scss'

import localize from '../../data/localize'
const {lang, currency} = localize(window.location.href)

const query = `{
  'product': *[_type == "product"].${lang} | order(sort asc) | order(title asc),
  'category': *[_type == "category"] | order(${lang}.sort asc),
  'articles': *[_type == "article"] | order(${lang}.sort asc),
  'settings': *[_type == "settings"].${lang}
}`;

export default () => {

  const [product, setProduct] = useState([])
  const [articleFirst, setArticleFirst] = useState([])
  const [articleSeccond, setArticleSeccond] = useState([])
  const [category, setCategory] = useState([])
  const [settings, setSettings] = useState([])
  const [filtered, setFiltered] = useState(false)
  const [resetFilter, setResetFilter] = useState('')
  const [search, setSearch] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [urlProduct, setUrlProduct] = useState(`*[_type == "product"].${lang}`)
  const [loading, setLoading] = useState(false)

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

  const shuffle = (a, count) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }

    if(!count) setArticleFirst(a);
    else setArticleSeccond(a);

  }

  const closeModal = () => {
    modal(util.find('#modal-filter')).hide();
  }

  useEffect(() => {
    sanityClient.fetch(query).then(data => {
      shuffle(data.articles.filter(item => item[lang]?.category._ref.includes("3252355e-13f2-4628-8db4-a90bb522713b")), 0)
      shuffle(data.articles.filter(item => item[lang]?.category._ref.includes("53b17b89-299c-48b1-b332-26240fc0e624")), 1)
      setCategory(data.category.filter(item => item?._id))
      setSettings(data.settings.filter(item => item?.titleCategory)?.[0])
    })

    sanityClient.fetch(`${urlProduct} | order(sort asc) | order(title asc)`).then(data => {
      const filteredProduct = data.filter(item => item?.title)

      setProduct(filteredProduct)

      const lengthNumbers = [], diameterNumbers = []
      var length = undefined, diameter = undefined, lengthNum = 0, diameterNum = 0;

      for(var i = 0; i < filteredProduct.length; i++){
        if(filteredProduct[i]?.parametrs){
          length = filteredProduct[i]?.parametrs.find(o => o.title === 'Délka' || o.title === 'Length')
          diameter = filteredProduct[i]?.parametrs.find(o => o.title === 'Průměr' || o.title === 'Diameter')
          if(length){
            lengthNumbers.push(+length.value.substr(0, length.value.length - 3).replace(/,/g, '.') )
          }
          if(diameter){
            diameterNumbers.push(+diameter.value.substr(0, diameter.value.length - 3).replace(/,/g, '.') )
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

  // const loadMore = async (empty = false, url) => {
  //
  //   if(empty){
  //     var from = 0
  //     var productsArr = []
  //     var modifyUrlProduct = url
  //     setHasMore(true)
  //   }else{
  //     var from = product.length
  //     var productsArr = [...product]
  //     var modifyUrlProduct = urlProduct
  //   }
  //   const size = 6
  //
  //   const newUrlProduct = `${modifyUrlProduct}[${from}...${from + size}]`
  //   if (loading) return
  //   setLoading(true)
  //   const data = await sanityClient.fetch(`${newUrlProduct} | order(sort asc) | order(title asc)`)
  //   if(data.length){
  //     const filteredProduct = data.filter(item => item?.title)
  //     productsArr.push(...filteredProduct)
  //     setProduct(productsArr)
  //   }else{
  //     setHasMore(false)
  //   }
  //
  //   setLoading(false)
  // }



  const handleFilter = (e) => {
    e.preventDefault()

    const newUrlProduct = `*[_type == "product" ${!!search.length ? '&& '+lang+'.title match "'+ search.split(/[,-]+/).join(' ') +'*"' : ''}].${lang}`
    setUrlProduct(newUrlProduct)
    const searchQuery = `${newUrlProduct} | order(sort asc) | order(title asc)`
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
              lengthNum = +length.value.substr(0, length.value.length - 3)
            }
            if(diameter){
              diameterNum = +diameter.value.substr(0, diameter.value.length - 3)
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
    setHasMore(true)
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
    // loadMore(true, `*[_type == "product"].${lang}`)
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
                <a className="tm-button tm-black-button" href="#modal-filter" uk-toggle="">Filtrovat</a>
                {filtered && <button className="cancel-filtered tm-button tm-button-text" onClick={e => cancelFilter(e)}><img src={times} alt="Cancel filter" uk-svg="" />Zrušit všechny filtry</button>}
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
