import React from 'react';
import './header.css';
import { useEffect, useState } from "react";
import { NavLink, Link } from 'react-router-dom';
import logoImg from '../assets/images/logo_vote.png';
import useEth from "../../contexts/EthContext/useEth";
import Workflow from './Workflow';

function Header() {
    const [strAccount, setStrAccount] = useState("Compte Non Autorisé");
    const [callStatus, setCallStatus] = useState();

    const { state: { contract, accounts } } = useEth();

    useEffect(() => {
        (async function () {
            if (contract?.methods) {
                let propr = contract.methods.owner().call({ from: accounts[0] })
                propr
                    .then((data) => {
                        console.log("data :" + data);
                        console.log("wallet :" + accounts)
                        if (data == accounts) {
                            setStrAccount("Admin");
                        } else {
                            let voter = contract.methods.getVoter(accounts[0]).call({ from: accounts[0] });
                            voter
                                .then((data) => {
                                    console.log("data :" + data[1]);
                                    console.log("wallet :" + accounts)
                                    if (data[0] == true) {
                                        setStrAccount("Whitelist Voter");
                                    } else { setStrAccount("Compte Non Autorisé"); }
                                })
                                .catch((err) => console.log("erreur : " + err));
                        }


                    })
                    .catch((err) => console.log("erreur : " + err));


                let stat = contract.methods.workflowStatus().call({ from: accounts[0] });
                stat
                    .then((data) => {
                        console.log(data);
                        setCallStatus(data);
                    })
                    .catch((err) => console.log("erreur : " + err));
            }
        })();

    }, [contract, accounts])

    // Lien affiché uniquement pour l'admin
    const adminLink = () => {
        if (strAccount == "Admin") {
            return <li className="nav_item">
                <NavLink to="/admin" className={navClass => navClass.isActive ? 'active' : ''}
                >Admin
                </NavLink>
            </li>
        }
    }

    // Lien affiché en fonction du statut
    const statusLink = () => {
        if (callStatus == 1) {
            return <li className="nav_item">
                <NavLink to="/proposals" className={navClass => navClass.isActive ? 'active' : ''}
                >Propositions
                </NavLink>
            </li>
        }
        if (callStatus == 3) {
            return <li className="nav_item">
                <NavLink to="/vote" className={navClass => navClass.isActive ? 'active' : ''}
                >Votes
                </NavLink>
            </li>
        }
        if (callStatus == 5) {
            return <li className="nav_item">
                <NavLink to="/results" className={navClass => navClass.isActive ? 'active' : ''}
                >Résultats
                </NavLink>
            </li>
        }
    }

    return (
        <header className="header">
            <div className="navigation">
                <div className="logo">
                    <Link to="/home"><h2 className='d-flex gap-2 align-items-center'>
                        <span>
                            <img src={logoImg} alt="" />
                        </span>
                        Voting Dapp
                    </h2></Link>
                </div>

                <div className="nav_menu">
                    <ul className="nav_list">
                        {adminLink()}
                        {statusLink()}
                    </ul>
                </div>


                <div className="nav_right d-flex align-items-center">
                    <div className='statut'>{strAccount}</div> {accounts}
                </div>
            </div>
            <Workflow callStatus={callStatus} />
        </header>
    );
};
export default Header;
