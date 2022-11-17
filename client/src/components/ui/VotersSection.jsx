import React from 'react';
import { Col, Container, Row, Table } from 'reactstrap';
import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import "./voters-section.css";
import VotersSectionBtns from './VotersSectionBtns';
import VotersSectionData from './VotersSectionData';
import NoticeNoArtifact from './NoticeNoArtifact';
import NoticeWrongNetwork from "./NoticeWrongNetwork";


function VotersSection() {
    const [arrayAddress, setArrayAddress] = useState(['0x4BF1EDe9dE6FE31AA8780bD9b467f558187E6E3']);

    const { state } = useEth();

    const voters_section =
        <>
            <Col lg='6' md='6'>
                <div className="content">
                    <h2>Ajouter un <span>voteur</span></h2>
                    <p>Enregistrement par l'administrateur du vote d'une liste blanche d'électeurs identifiés par leur adresse Ethereum.</p>
                </div>
                <VotersSectionBtns />
                <VotersSectionData />
            </Col>
        </>;

    return <section className="section">
        <Container>
            <Row>
                {
                    !state.artifact ? <NoticeNoArtifact /> :
                        !state.contract ? <NoticeWrongNetwork /> :
                            voters_section
                }
                <Col lg='6' md='6'>
                    <div className="content">
                        <h2>Consulter la <span>liste des voteurs</span></h2>
                    </div>
                    <div className="btns d-flex align-items-center gap-4">
                        <button className='btn d-flex align-items-center gap-2'><i className="ri-file-list-3-line"></i><span>Liste</span></button>
                    </div>
                    <div className="content">
                        <p>Phrase de description : Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente quos totam soluta doloribus doloremque architecto natus ut sed modi ea.</p>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Adresse</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>{
                                    arrayAddress.map((value) => (
                                        [
                                            value
                                        ]
                                    ))

                                }</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    </section>
};

export default VotersSection;