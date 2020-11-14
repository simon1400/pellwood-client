import React from 'react'
import {Route} from 'react-router-dom'

export default (
  <Route>
    <Route exact path="/" />
    <Route exact path="/en" />

    <Route exact path="/produkty" />
    <Route exact path="/en/produkty" />
    <Route exact path="/:lang/produkt/:url" />
    <Route exact path="/:lang/:category/kategorie" />
    <Route exact path="/:lang/:url/:category/clanek" />
  </Route>
)
