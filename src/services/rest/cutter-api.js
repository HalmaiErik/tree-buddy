import RestApiClient from "../../common/api/rest-client";
import { serverEndpoint } from "../../common/constants/server-endpoint";

const endpoint = {
    insertCutter: serverEndpoint + "/new/cutter",
    getAllCutters: serverEndpoint + "/view/cutters",
    getCutterByCif: serverEndpoint + "/view/cutters/by-cif/"
}

const insertCutter = (cutter) => {
    let request = new Request(endpoint.insertCutter, {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cutter)
    });
    return RestApiClient.performRequest(request);
};

const getAllCutters = () => {
    let request = new Request(endpoint.getAllCutters, {
        method: 'GET'
    });
    return RestApiClient.performRequest(request); 
};

const getCutterByCif = (cif) => {
    let request = new Request(endpoint.getCutterByCif + cif, {
        method: 'GET'
    });
    return RestApiClient.performRequest(request);
};

export {
    insertCutter,
    getAllCutters,
    getCutterByCif
};

