import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {makeStore} from './lib/store';
import Chart from './components/chart.jsx';
import Network from './components/network';
import {
  Route,
  Routes,
  BrowserRouter,
  Link,
  Outlet
} from 'react-router-dom';
import './main.css';

const store = makeStore();

const app = (
  <Provider store={store}>
    <Chart />
  </Provider>
);

const layout = (
  <div>
    Home sweet home!
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/graph">Graph</Link>
        </li>
        <li>
          <Link to="/network">Network</Link>
        </li>
      </ul>
    </nav>
    <Outlet/>
  </div>
);

const master = (
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={layout}>
          <Route path="graph" element={app}/>
          <Route path="network" element={<Network/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

const mountingPoint = document.createElement('div');
mountingPoint.className = 'react-app';
document.body.appendChild(mountingPoint);

ReactDOM.render(master, mountingPoint);
