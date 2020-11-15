import React , {useContext} from 'react';
import { Route, Switch } from 'react-router-dom';
import { DataStateContext } from './context/dataStateContext'
import loadable from '@loadable/component'

const NotFound = loadable(() => import('./pages/not-found'));
const Homepage = loadable(() => import('./pages/homepage'));
const Catalog = loadable(() => import('./pages/catalog'));
const BlogShort = loadable(() => import('./pages/blog/short'));
const BlogFull = loadable(() => import('./pages/blog/full'));
const Product = loadable(() => import('./pages/product'));

// ------------------------------------------ BASKET ------------------------------------- //

const Basket = loadable(() => import('./basket'));
const ThankYou = loadable(() => import('./basket/thankYou'));

// ------------------------------------------ USER ---------------------------------------//

const User = loadable(() => import('./user'));


const Routers = () => {

  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)

  const routesArr = [
    {
      path: '/',
      component: Homepage,
      exact: true,
      allow: true
    },
    {
      path: '/produkty',
      component: Catalog,
      exact: true,
      allow: true
    },
    {
      path: '/produkt/:url',
      component: Product,
      exact: true,
      allow: true
    },
    {
      path: '/produkt/:url/:handle',
      component: Product,
      exact: true,
      allow: true
    },
    {
      path: '/:category/kategorie',
      component: BlogShort,
      exact: true,
      allow: true
    },
    {
      path: '/:url/:category/clanek',
      component: BlogFull,
      exact: true,
      allow: true
    },
    {
      path: '/basket',
      component: Basket,
      exact: false,
      allow: Boolean(dataContextState.basket.length)
    },
    {
      path: '/thank-you',
      component: ThankYou,
      exact: true,
      allow: true
    },
    {
      path: '/user',
      component: User,
      exact: true,
      allow: Boolean(dataContextState.user.email)
    }
  ]

  return (
    <Switch>
      <Route exact={true} path="/not-found" component={NotFound} />
      {routesArr.map((item, index) => {
        if(item?.allow){
          return <Route key={index} exact={item.exact} path={item.path} component={item.component} />
        }
        return ''
      })}
      {routesArr.map((item, index) => {
        if(item?.allow){
          return <Route key={index} exact={item.exact} path={`/:lang${item.path}`} component={item.component} />
        }
        return ''
      })}
      <Route component={NotFound} />
    </Switch>
  )
}

export default Routers
