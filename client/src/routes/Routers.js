import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Voters from '../pages/Voters';
import Proposals from '../pages/Proposals';
import Voting from '../pages/Voting';

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/voters' />} />
            <Route path='/voters' element={<Voters />} />
            <Route path='/proposals' element={<Proposals />} />
            <Route path='/voting' element={<Voting />} />
        </Routes>
    );
};

export default Routers;