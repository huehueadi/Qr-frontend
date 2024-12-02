import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import Layout from './components/layouts/Layout'
import QRManagement from './components/pages/QRManagement';
import Analytics from './components/pages/Analytics';
import AddBrand from './components/pages/AddBrand';
import Slotmanagement from './components/pages/Slotmanagement';
import NotFound from './components/pages/NotFound'; 
import SlotList from './components/pages/SlotList';
import SlotUpdate from './components/pages/SlotUpdate';
import TemplateShowcase from './components/pages/TemplateShowcase';
import Drap from './components/pages/Drap';
import EditTemplate from './components/pages/TemplateSelector';
import Test from './components/pages/Test.js';
import CreateFlowpageForm from './components/pages/Check.js';
import EditTemplatee from './components/pages/Check.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/tt" element={< CreateFlowpageForm/>} />

        <Route element={<Layout />}>
          <Route path="analytics" element={<Analytics />} />
          <Route path="qrmanagement" element={<QRManagement />} />
          <Route path="slot_update" element={<SlotUpdate />} />
          <Route path="slot_list" element={<SlotList />} />
          <Route path="slot_management" element={<Slotmanagement />} />
          <Route path="add_brand" element={<AddBrand />} />
          <Route path="landing-page-selector" element={<TemplateShowcase />} />
          <Route path="landing-page-editor" element={<EditTemplate/>} />
          <Route path="landing-page-editorr" element={<Test/>} />
          <Route path="landing-page-editorrr" element={<EditTemplatee/>} />


        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
