import React from 'react';
import { hydrate } from 'react-dom';
import { Frontload } from 'react-frontload';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';


// Running locally, we should run on a <ConnectedRouter /> rather than on a <StaticRouter /> like on the server
// Let's also let React Frontload explicitly know we're not rendering on the server here
const Application = (
  <BrowserRouter>
    <Frontload noServerRender={true}>
      <App />
    </Frontload>
  </BrowserRouter>
);

const root = document.querySelector('#root');
hydrate(Application, root);
