import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import useEth from '../../../contexts/EthContext/useEth';
import "./admin-section.css";
import VotersSectionBtns from './VotersSectionBtns';
import VotersSectionData from './VotersSectionData';
import NoticeNoArtifact from '../NoticeNoArtifact';
import NoticeWrongNetwork from "../NoticeWrongNetwork";
import StatusSectionBtns from './StatusSectionBtns';


function VotersSection() {

    const { state } = useEth();

    const admin_section =
        <>
            <Col lg='7' md='7' >
                <div className="content">
                    <h2>Ajouter un <span>Voteur</span></h2>
                    <p>Liste blanche d'électeurs identifiés par leur adresse Ethereum.</p>
                    <VotersSectionBtns />
                    <VotersSectionData />
                </div>
            </Col>
            <Col lg='5' md='5'>
                <div className="content">
                    <h2>Statut du <span>Workflow</span></h2>
                    <p>Cliquez sur le statut à activer.</p>
                    <StatusSectionBtns />
                </div>
            </Col>
        </>;

    return <section className="section">
        <Container>
            <Row>
                {
                    !state.artifact ? <NoticeNoArtifact /> :
                        !state.contract ? <NoticeWrongNetwork /> :
                            admin_section
                }
            </Row>
        </Container>
    </section>
};

export default VotersSection;