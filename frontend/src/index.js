import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from "./serviceWorker";

/*
// Required Polyfills For ReactNative
import {encode, decode} from 'base-64';
if (global.btoa == null) {
  global.btoa = encode;
}
if (global.atob == null) {
  global.atob = decode;
}
import 'text-encoding-polyfill';
import 'react-native-get-random-values';

import { BSON, EJSON } from 'bson';
*/

// const { constRequire } = require("module");
// const require = createRequire(import.meta.url);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorker.unregister();