import '../scss/main.scss'
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import { DataProvider } from '../context/dataStateContext'

// loads the Icon plugin
UIkit.use(Icons);

const App = ({ Component, pageProps }) => {
  return <DataProvider><Component {...pageProps} /></DataProvider>
}

export default App
