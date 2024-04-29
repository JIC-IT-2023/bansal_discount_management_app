import AxiosInstance from "../axiosService";

export const RequestApi = {
    getBillDetails : async function(params){
        return await AxiosInstance.get('main/patient-details?mr_no='+params)
    },
    getMdDetails : async function(){
        return await AxiosInstance.get('account/users/?role=MD')
    },
    initiateRequest : async function(data){
        return await AxiosInstance.post('/discount/', data)
    },
    getEmployer : async function(){
        return await AxiosInstance.get('/company/companies/')
    },
    getRelation : async function(){
        return await AxiosInstance.get('/main/relationships/')
    },
    getDiscountList : async function(params1, params2){
        return await AxiosInstance.get(`/discount?relation_type=${params1}&status=${params2}`)
    },

}