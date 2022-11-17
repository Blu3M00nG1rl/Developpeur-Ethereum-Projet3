import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function VotersSectionData() {
    const [EventAddress, setEventAddress] = useState("");

    const { state: { contract } } = useEth();

    useEffect(() => {
        (async function () {

            await contract.events.VoterRegistered({ fromBlock: "earliest" })
                .on('data', event => {
                    let votersevents = event.returnValues.voterAddress;
                    setEventAddress(votersevents);
                })
                .on('changed', changed => console.log(changed))
                .on('error', err => console.log(err))
                .on('connected', str => console.log(str));

        })();

    }, [contract])

    return (
        <div className="content_data">
            L'adresse {EventAddress} a été enregistrée.
        </div>
    );
};

export default VotersSectionData;