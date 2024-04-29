import axios from "axios";
import { baseURL } from "./config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AlertService } from "./utils/alertservice";
import AlertMsg from "./utils/alertMsg";
// import {navigate} from '../providers/RootNavigator'
import {decode as atob, encode as btoa} from 'base-64'



const AxiosInstance = axios.create({
    baseURL : baseURL,
    timeout: 1000 * 30,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
});

AxiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      //const navigation = useNavigation();
      console.log("error", error.response);
      if (!error.response) {
        // Handle network errors here
        AlertService.ShowSingleActionAlert(AlertMsg.NetworkError).then(async () => {
          // Perform any actions needed when encountering a network error
          // For example: Retry logic, showing a message to the user, etc.
          console.log('Network error occurred');
        });
      } else {
        if (error.response?.status === 401) {
          //navigate("Login")
          console.log('401=====');
          
            AlertService.ShowSingleActionAlert(AlertMsg.SessionExpird).then(async (data) => {
              // await AsyncStorage.removeItem('access_token'); 
              // navigate("Login")
            })
            
        }
        else if (error.response?.status >= 500) {
          AlertService.ShowSingleActionAlert(AlertMsg.UnableToConnectToServer).then(async (data) => {
            console.log(data.data);
            // await AsyncStorage.removeItem('access_token'); 
            // navigate("Login")
          })
        }
        else if (error.response?.status === 400) {
          AlertService.ShowSingleActionAlert(AlertMsg.ServerUnhandledRequest).then(async (data) => {
            // await AsyncStorage.removeItem('access_token'); 
            // navigate("Login")
          })
        }
      }
        return Promise.reject(error);
    }
);

AxiosInstance.interceptors.request.use(async (config) => {
    //await AsyncStorage.setItem('access_token', ApiToken);
    const token = await AsyncStorage.getItem('access_token');
    const refresh = await AsyncStorage.getItem('refresh_token') ;
    console.log('tokennn===', refresh);
    if (token) { 
      try {
        // config.headers.Authorization = `Bearer ${token}`;
        const tokenParts = token.split('.');
        const tokenPayload = JSON.parse(atob(tokenParts[1]));
        const tokenExpiration = tokenPayload.exp * 1000; // Convert to timestamp in milliseconds
        const tokenAge = Date.now() - tokenExpiration;
       // console.log("tokenExpiration",Date.now(), tokenExpiration);
      //  if (tokenAge > 86400000) {
      //   // Clear the access token from AsyncStorage
      //   await AsyncStorage.removeItem('access_token');
      //   // Redirect to the login screen
      //   // navigate('Login');
      // }
      if (Date.now() > tokenExpiration) {
       //console.log('worked')
          await axios.post(baseURL + 'api/token/refresh/', {
            refresh: refresh
          })
          .then(async (response) => {
            if(response.status === 200){
              await AsyncStorage.setItem('access_token', response.data.access)
              config.headers.Authorization = `Bearer ${token}`;
            }
            else{
              AlertService.ShowSingleActionAlert(AlertMsg.SessionExpird).then(async (data) => {
                // await AsyncStorage.removeItem('access_token'); 
                // navigate("Login")
              })
            }
          })
        } else {
          console.log('notworked', refresh)
          await axios.post(baseURL + 'api/token/refresh/', {
            refresh: refresh
          })
          .then(async (response) => {
            console.log('response', response.data)
            if(response.status === 200){
              await AsyncStorage.setItem('access_token', response.data.access)
              config.headers.Authorization = `Bearer ${token}`;
            }
            else{
              AlertService.ShowSingleActionAlert(AlertMsg.SessionExpird).then(async (data) => {
                // await AsyncStorage.removeItem('access_token'); 
                // navigate("Login")
              })
            }
          })
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error(error);
        throw new Error('Refresh failed');
      }
    }
    else{
      navigate('Login')
    }
    return config;
}, (error) => Promise.reject(error));
// export const getWithBearerToken = async (url, params = {}) => {
//   try {
//       const token = await AsyncStorage.getItem('access_token');
//       if (!token) {
//           // Handle case when token is not available (e.g., redirect to login)
//           // navigate('Login');
//       }

//       const response = await AxiosInstance.get(url, {
//           params,
//           headers: {
//               Authorization: `Bearer ${token}`,
//           },
//       });

//       return response.data;
//   } catch (error) {
//       throw error;
//   }
// };

export default AxiosInstance;