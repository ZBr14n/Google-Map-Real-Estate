import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Map from './components/Map';
import Listings from './components/Listings';

import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>

    
      <div className="style-listings">
        <Map />
        {/* <div style={{width: '60%'}}></div> */}
        
        <Listings />
      </div>



  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
