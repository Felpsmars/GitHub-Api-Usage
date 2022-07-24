import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';

import {
  SearchPage,
  RepositoriesPage,
  BranchesPage,
  CommitsPage,
} from './components/page';

import './index.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<SearchPage />} />
      <Route path='' element={<Layout />}>
        <Route path='/repositories/:name' element={<RepositoriesPage />} />
        <Route path='/branches/:name/:repo' element={<BranchesPage />} />
        <Route path='/branches/commits/:name/:repo' element={<CommitsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
