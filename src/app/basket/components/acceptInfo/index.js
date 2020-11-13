import React from 'react'
import {Route} from 'react-router-dom'
import translate from '../../../data/staticTranslate'
import localize from '../../../data/localize'
const {lang} = localize(window.location.href)
const routes = ['/basket/checkout', `/${lang}/basket/checkout`]

const AcceptInfo = () => <>
  {routes.map((item, index) =>
    <Route exact path={item} render={() => <p>{translate.accessCondition1[lang]} <a href={translate.linkBuisness[lang]} target="_blank">{translate.accessCondition2[lang]}</a></p>}/>)}
</>

export default AcceptInfo
