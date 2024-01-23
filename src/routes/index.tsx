import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import * as page from '../pages';
import Layout from '../components/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<page.NotFoundPage />} />
      <Route
        path="progress/:id"
        element={<page.MyProgress />}
        // loader={page.eventLoader}
        // errorElement={<page.NotFoundPage />}
      />
      <Route
        path="my-team/"
        element={<page.MyTeam />}
        // loader={page.eventLoader}
        // errorElement={<page.NotFoundPage />}
      />

      <Route path="*" element={<page.NotFoundPage />} />
    </Route>
  ),
  {
    basename: '/',
  }
);

export default router;
