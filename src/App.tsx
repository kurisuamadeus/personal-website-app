import React, { createContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './styles/Content.css'
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import HeaderComponent from './components/header/HeaderComponent';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import { GlobalStateProvider } from './components/GlobalStateProvider';
import PageNotFound from './pages/PageNotFound';
import { UpdateLanguageParams } from './helper/LanguageDetector';
import ProjectDetails from './pages/ProjectDetails';
import { HelmetProvider } from 'react-helmet-async';

const indexRoute = `/${UpdateLanguageParams(sessionStorage.getItem('lang') != null ? String(sessionStorage.getItem('lang')) : navigator.language)}/home`


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <HelmetProvider>
          <GlobalStateProvider>
            <HeaderComponent />
            <BrowserRouter>
              <Routes>
                {/* <Route path="/" element={<Layout />}> */}
                <Route index element={<Navigate to={indexRoute} />} />
                <Route path='/:lang?/home' element={<Home />} />
                <Route path='/:lang?/profile' element={<Profile />} />
                <Route path='/:lang?/projects' element={<Projects />} />
                <Route path='/:lang?/projects/details/:projectId' element={<ProjectDetails />} />
                <Route path='/:lang?/contact' element={<Contact />} />
                <Route path='*' element={<PageNotFound />} />
                {/* </Route> */}
              </Routes>
            </BrowserRouter>
          </GlobalStateProvider>
        </HelmetProvider>
        {/*
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        */}
      </header>
    </div>
  );
}

export default App;
