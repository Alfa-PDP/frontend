import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Spinner } from '@alfalab/core-components/spinner';
import * as page from '../pages';
import Layout from '../components/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      loader={() => <Spinner />}
      errorElement={<page.NotFoundPage />}
    >
      <Route index element={<h1>Добро пожаловать</h1>} />
      <Route path="progress/:id" element={<page.MyProgress />} />
      <Route path="my-team/" element={<page.MyTeam />} />

      <Route path="*" element={<page.NotFoundPage />} />
    </Route>
  ),
  {
    basename: '/',
  }
);

export default router;
