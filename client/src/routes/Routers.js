import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Admin from '../pages/Admin';
import Proposals from '../pages/Proposals';
import Voting from '../pages/Voting';

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/proposals' />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/proposals' element={<Proposals />} />
            <Route path='/voting' element={<Voting />} />
        </Routes>
    );
};

export default Routers;