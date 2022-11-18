import { useEffect, useState } from "react";
import useEth from "../../../contexts/EthContext/useEth"
import { Table } from 'reactstrap';

function VotersSectionData() {
    const [EventAddress, setEventAddress] = useState("");
    const [oldEvents, setOldEvents] = useState([]);

    const { state: { contract } } = useEth();

    useEffect(() => {
        (async function () {

            let oldEvents = await contract.getPastEvents('VoterRegistered', {
                fromBlock: 0,
                toBlock: 'latest'
            });
            let oldies = [];
            oldEvents.forEach(event => {
                oldies.push(event.returnValues.voterAddress);
            });
            setOldEvents(oldies);

            await contract.events.VoterRegistered({ fromBlock: "earliest" })
                .on('data', event => {
                    let votersevents = event.returnValues.voterAddress;
                    setEventAddress(votersevents);
                })
                .on('changed', changed => console.log("changed :" + changed))
                .on('error', err => console.log("error :" + err))
                .on('connected', str => console.log("connected :" + str));

        })();

    }, [contract])

    const eventAdressSection =
        <>
            <tr className="nouveau">
                <td>Nouveau</td>
                <td>{EventAddress}</td>
            </tr>
        </>;

    return (
        <div className="content_data">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Liste des Voteurs Autorisés</th>
                    </tr>
                </thead>
                <tbody>
                    {oldEvents.map((item, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{item}</td>
                        </tr>
                    ))}
                    {
                        EventAddress === "" ? "" : eventAdressSection

                    }

                </tbody>
            </Table>

        </div>

    );
};

export default VotersSectionData;