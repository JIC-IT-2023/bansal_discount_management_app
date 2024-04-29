import AxiosInstance from "../axiosService";

export const HomeApi = {
    getUserDetails: async function () {
        return await AxiosInstance.get('account/current-user/')
    },
    getDiscount: async function () {
        return await AxiosInstance.get('/discount/counts/')
    },
    getBillDetails : async function(params){
        return await AxiosInstance.get('main/patient-details?mr_no='+params)
    },
}