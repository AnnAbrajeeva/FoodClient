import { Route, Routes } from 'react-router';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/useQueryParamsStoreInit';
import Layout from '../components/Layout';
import FavoriteRecipes from './pages/FavoriteRecipes';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import SingleRecipe from './pages/SingleRecipe/SingleRecipe';

function App() {
  useQueryParamsStoreInit();
  return (
    <main>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/favorite" element={<FavoriteRecipes />} />
          <Route path="recipe/:id" element={<SingleRecipe />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
