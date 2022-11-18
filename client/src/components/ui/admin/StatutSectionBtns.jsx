import { ButtonGroup, Button } from "reactstrap";
import { useState } from "react";
import useEth from "../../../contexts/EthContext/useEth"


/*const types = ['Enregistrement Voteurs', 'Debut propositions', 'Cloture propositions', 'Début Vote', 'Cloture Vote', 'Resultats'];

const STATUS_BTNS = [
    {
        display: 'Enregistrement Voteurs',
        function: 'registeringVoters'
    },
    {
        display: 'Debut propositions',
        function: 'startProposalsRegistering'
    },
    {
        display: 'Cloture propositions',
        function: 'endProposalsRegistering'
    },
    {
        display: 'Début Vote',
        function: 'startVotingSession'
    },
    {
        display: 'Cloture Vote',
        function: 'endVotingSession'
    },
    {
        display: 'Resultats',
        function: 'tallyVotes'
    }]*/

function StatutSectionBtns() {
    const { state: { contract, accounts } } = useEth();
    const [active, setActive] = useState("");

    const startProposalsRegistering = async () => {
        await contract.methods.startProposalsRegistering().call({ from: accounts[0] });
        console.log('start p');
    };
    const endProposalsRegistering = async () => {
        await contract.methods.endProposalsRegistering().call({ from: accounts[0] });
        console.log('end p');
    };
    const startVotingSession = async () => {
        await contract.methods.startVotingSession().call({ from: accounts[0] });
        console.log('start v');
    };
    const endVotingSession = async () => {
        await contract.methods.endVotingSession().call({ from: accounts[0] });
        console.log('end v');
    };
    const tallyVotes = async () => {
        await contract.methods.tallyVotes().call({ from: accounts[0] });
        console.log('resultats');
    };
    return (
        <>

            <ButtonGroup>
                <Button
                    active={active === "Debut propositions"}
                    onClick={() => setActive("Debut propositions")}
                >
                    <span onClick={startProposalsRegistering}>Debut propositions</span>
                </Button>
                <Button
                    active={active === "Cloture propositions"}
                    onClick={() => setActive("Cloture propositions")}
                >
                    <span onClick={endProposalsRegistering}>Cloture propositions</span>
                </Button>
                <Button
                    active={active === "Début Vote"}
                    onClick={() => setActive("Début Vote")}
                >
                    <span onClick={startVotingSession}>Début Vote</span>
                </Button>
                <Button
                    active={active === "Cloture Vote"}
                    onClick={() => setActive("Cloture Vote")}
                >
                    <span onClick={endVotingSession}>Clôture Vote</span>
                </Button>
                <Button
                    active={active === "Résultats"}
                    onClick={() => setActive("Résultats")}
                >
                    <span onClick={tallyVotes}>Résultats</span>
                </Button>

            </ButtonGroup>

        </>

    );
}

export default StatutSectionBtns;