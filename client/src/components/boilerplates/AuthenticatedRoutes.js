import { lazy } from 'react';

const routes = [
  {
    path: 'CollectionLogin',
    component: lazy(() => import('./CollectionLogin')),
    exact: true
  }
];

export default routes;