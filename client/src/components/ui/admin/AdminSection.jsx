import React from 'react';
import { Col, Row } from 'reactstrap';
import useEth from '../../../contexts/EthContext/useEth';
import "./admin-section.css";
import VotersSectionBtns from './VotersSectionBtns';
import VotersSectionData from './VotersSectionData';
import NoticeNoArtifact from '../NoticeNoArtifact';
import NoticeWrongNetwork from "../NoticeWrongNetwork";
import StatutSectionBtns from './StatutSectionBtns';


function VotersSection() {

    const { state } = useEth();

    const voters_section =
        <>
            <Col lg='6' md='6' className="content">
                <div>
                    <h2>Ajouter un <span>Voteur</span></h2>
                    <p>Liste blanche d'électeurs identifiés par leur adresse Ethereum.</p>
                </div>
                <VotersSectionBtns />
                <VotersSectionData />
            </Col>
            <Col lg='6' md='6' className="content">
                <div>
                    <h2>Modifier le <span>Statut du Workflow</span></h2>
                    <p>Cliquez sur le statut à activer.</p>
                </div>
                <StatutSectionBtns />
            </Col>
        </>;

    return <section className="section">
        <Row>
            {
                !state.artifact ? <NoticeNoArtifact /> :
                    !state.contract ? <NoticeWrongNetwork /> :
                        voters_section
            }
        </Row>
    </section>
};

export default VotersSection;