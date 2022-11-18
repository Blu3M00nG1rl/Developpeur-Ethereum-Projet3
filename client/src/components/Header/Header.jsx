import React from 'react';
import './header.css';
import { NavLink, Link } from 'react-router-dom';
import logoImg from '../assets/images/logo_vote.png';
import useEth from "../../contexts/EthContext/useEth";
import Workflow from '../ui/Workflow';

const NAV_LINKS = [
    {
        display: 'Admin',
        url: '/admin'
    },
    {
        display: 'Propositions',
        url: '/proposals'
    },
    {
        display: 'Vote',
        url: '/voting'
    }
]

function Header() {

    const { state: { accounts } } = useEth();

    return (
        <header className="header">
            <div className="navigation">
                <div className="logo">
                    <Link to="/proposals"><h2 className=' d-flex gap-2 align-items-center'>
                        <span>
                            <img src={logoImg} alt="" />
                        </span>
                        Voting Dapp
                    </h2></Link>
                </div>
                <div className='statut'>
                    <Workflow />
                </div>
                <div className="nav_menu">
                    <ul className="nav_list">
                        {NAV_LINKS.map((item, index) => (
                            <li className="nav_item" key={index}>
                                <NavLink to={item.url} className={navClass => navClass.isActive ? 'active' : ''}
                                >
                                    {item.display}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="nav_right d-flex align-items-center gap-5 ">
                    Adresse du wallet : {accounts}
                </div>
                <div className="nav_right d-flex align-items-center gap-5 ">
                </div>
            </div>
        </header>
    );
};
export default Header;
