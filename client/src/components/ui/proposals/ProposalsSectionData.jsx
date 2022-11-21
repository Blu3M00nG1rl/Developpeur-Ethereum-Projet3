import { useEffect, useState } from "react";
import useEth from "../../../contexts/EthContext/useEth"
import { Table } from 'reactstrap';

function ProposalsSectionData() {
    const [oldEvents, setOldEvents] = useState([]);
    const [oldDataDesc, setOldDataDesc] = useState();
    const [oldDescriptions, setOldDescriptions] = useState([]);


    const { state: { contract, accounts } } = useEth();

    //Rafraichit la page en cas de changement de compte
    window.ethereum.on('accountsChanged', function (accounts) {
        window.location.reload();
    })

    useEffect(() => {
        (async function () {

            //Liste des propositions
            let oldEvents = await contract.getPastEvents('ProposalRegistered', {
                fromBlock: 0,
                toBlock: 'latest'
            });
            let oldies = [];
            oldEvents.forEach(event => {
                oldies.push(event.returnValues.proposalId);
            });
            setOldEvents(oldies);

            let desc_array = [];
            oldies.forEach(data => {
                let desc = contract.methods.getOneProposal(data).call({ from: accounts[0] });
                desc
                    .then((data) => {
                        console.log("description : " + data.description);
                        setOldDataDesc(data.description);
                        desc_array.push(data.description);
                    })
                    .catch((err) => console.log("erreur : " + err));
            });
            setOldDescriptions(desc_array);

        })();

    }, [contract, accounts])

    return (
        <div className="content_data">
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Liste des propositions</th>
                    </tr>
                </thead>
                <tbody>
                    {oldDescriptions.map((item, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{item}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>




    );
};

export default ProposalsSectionData;