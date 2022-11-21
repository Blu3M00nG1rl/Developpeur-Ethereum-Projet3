import { useEffect, useState } from "react";
import useEth from "../../../contexts/EthContext/useEth"

function VotingSectionData() {
    const [verifHasVoted, setVerifHasVoted] = useState("");

    const { state: { contract, accounts } } = useEth();

    useEffect(() => {
        (async function () {

            //Affiche si l'utilisateur à voté
            let voter = contract.methods.getVoter(accounts[0]).call({ from: accounts[0] });
            voter
                .then((data) => {
                    console.log("data :" + data[1]);
                    console.log("wallet :" + accounts)
                    if (data[1] == true) {
                        setVerifHasVoted("Vous avez voté pour la proposition " + data[2]);
                    } else {
                        setVerifHasVoted("Vous n'avez pas encore voté");
                    }
                })
                .catch((err) => console.log("erreur : " + err));

        })();

    }, [contract, accounts])


    return (
        <>
            <div className="content_data">
                {verifHasVoted}
            </div>
        </>
    );
};

export default VotingSectionData;