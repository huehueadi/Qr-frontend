import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import Login from './components/pages/Login';
import QRManagement from './components/pages/QRManagement';
import Analytics from './components/pages/Analytics';
import AddBrand from './components/pages/AddBrand';
import Slotmanagement from './components/pages/Slotmanagement';
import NotFound from './components/pages/NotFound'; // Import the 404 page
import SlotList from './components/pages/SlotList';
import SlotUpdate from './components/pages/SlotUpdate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Routes wrapped with Layout for the main app */}
        <Route element={<Layout />}>
          <Route path="analytics" element={<Analytics />} />
          <Route path="qrmanagement" element={<QRManagement />} />
          <Route path="slot_update" element={<SlotUpdate />} />
          <Route path="slot_list" element={<SlotList />} />
          <Route path="slot_management" element={<Slotmanagement />} />
          <Route path="add_brand" element={<AddBrand />} />


        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
