import React from 'react';
import { useEffect, useState } from "react";

function StatutWallet(strOwner) {
    const [statusWallet, setStatusWallet] = useState();
    console.log(strOwner);
    useEffect(() => {
        (async function () {
            /*if (owner === account) {
                setStatusWallet("Admin");
            } else {
                setStatusWallet("Non Admin");
            }*/


        })();

    }, [])


    return (
        <div>
            {statusWallet}

        </div>
    );
}

export default StatutWallet;