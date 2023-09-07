import { Route, Routes } from 'react-router';
import Layout from '../components/Layout';
import HomePage from './pages/HomePage/HomePage';
import SingleRecipe from './pages/SingleRecipe/SingleRecipe';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="recipe/:id" element={<SingleRecipe />} />
      </Route>
    </Routes>
  );
}

export default App;
