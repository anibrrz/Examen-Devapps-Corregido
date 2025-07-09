import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BaseLayout from '../layouts/BaseLayout';
import MascotasListPage from '../pages/MascotasListPage';
import MascotasNewPage from '../pages/MascotasNewPage';
import MascotasEditPage from '../pages/MascotasEditPage';
import MascotasViewPage from '../pages/MascotasViewPage';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/" element={<MascotasListPage />} />
        <Route path="/nuevo" element={<MascotasNewPage />} />
        <Route path="/ver/:id" element={<MascotasViewPage />} />
        <Route path="/editar/:id" element={<MascotasEditPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
