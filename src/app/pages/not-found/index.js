import React from 'react';
import Page from '../../layout/page';

import img from '../../assets/404.jpg'

export default () => (
  <Page
    id="not-found"
    title="Not Found"
    description="This is embarrassing."
    noCrawl
  >
    <section className="not-found-page">
      <h1>Chyba 404 :(</h1>
      <p>Jejda! Tuto stránku nelze nalézt. Zdá se, že na této stránce nebylo nic nalezeno.</p>
      <img src={img} alt="Not found" uk-img="" />
      <a href="/" className="tm-button tm-black-button">Zpět na hlavní stranu</a>
    </section>
  </Page>
);
