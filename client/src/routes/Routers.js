import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Admin from '../pages/Admin';
import Home from '../pages/Home';
import Proposals from '../pages/Proposals';
import Results from '../pages/Results';
import Voting from '../pages/Voting';

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/proposals' element={<Proposals />} />
            <Route path='/voting' element={<Voting />} />
            <Route path='/results' element={<Results />} />

        </Routes>
    );
};

export default Routers;