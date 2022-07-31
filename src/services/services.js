import axios from "axios";

const httpUrlApi = "http://localhost:8084/api";
const httpUrlGraphQl = "http://localhost:8084/graphql"

//get Accounts
export const getAllAccounts = async () =>{
    return await axios.get(`${httpUrlApi}/bancos`).then((response) => response.data);
};

export const getAccountById =  (id) =>{
    return  axios.get(`${httpUrlApi}/bancos/${id}`).then((response) => response.data);
};


export const createNewAccount =  (account) =>{
    return axios.post(`${httpUrlApi}/bancos`, account).then((response) => response.data);
};

//Update Value
export const updateValue = (id, body) => {
    return axios.put(`${httpUrlApi}/bancos/${id}`, body ).then((response) => response.data);
}



//Graphql

export const getGraphQLData = async (graphql) =>{
    return await axios.post(`${httpUrlGraphQl}`, {
                                            query: graphql
                                        }).then((response => response.data));
}

