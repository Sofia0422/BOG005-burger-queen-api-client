import axios from "axios";

export const getProducts = async () => {
    const res = await axios({
        method: 'GET',
        url: baseUrl + '/products',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    });
    return res.data
};

const baseUrl = 'http://localhost:8080';
let token = localStorage.getItem('tokenUser')
let userId = localStorage.getItem('userId')

export const loginUsers = async (email, password) => {  
    const rest = await axios ({
        method: 'POST',
        url: baseUrl + '/login',
        data: {
            email: email,
            password: password
        }
    })
    localStorage.setItem('tokenUser', rest.data.accessToken)
    token = rest.data.accessToken
    localStorage.setItem('userId', rest.data.user.id)
    userId = rest.data.user.id
    localStorage.setItem('userRole', rest.data.user.role)
    localStorage.setItem('userEmail', rest.data.user.email)
    return rest 
  
}

export const orderPetition = async (objectProducts, client) => {
    const res = await axios({
        method: 'POST',
        url: baseUrl + '/orders',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        data: {
            userId: userId,
            client: client,
            products: objectProducts,
            status: 'pending',
            dataEntry: new Date().toLocaleString('sv')
        }
    });
    return res.status
    };

 