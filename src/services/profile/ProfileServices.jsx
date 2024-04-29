import AxiosInstance from "../axiosservice";

export const ProfileApi = {
    // updateUserName: async function (data) {
    //     return await AxiosInstance.put('account/update/',data)
    // },
    logout : async function(data){
        return await AxiosInstance.post('api/token/blacklist/', data)
    }
}