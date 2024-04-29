import { View, Text, SafeAreaView, ImageBackground, Pressable, ScrollView, TouchableOpacity, Image,KeyboardAvoidingView, Keyboard, Alert,Linking,TextInput } from "react-native";
import { useCallback, useEffect, useState } from "react";
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import CustomTextInput from "../../components/CustomTextInput";
import { baseURL } from "../../services/config";
import ErrorIcon from "../../assets/icons/ErrorIcon";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingIndicator from "../../components/LoadingIndicator";
import { decode as atob, encode as btoa } from 'base-64'



function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const [erorr,setErorr]=useState('')
    const [loading,setLoading]=useState(false)
    const [emailErorr,setEmailErorr]=useState(false)
    const [passwordErorr,setPasswordError]=useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [googleUrl, setGoogleUrl] = useState();
    const [isSigningIn, setIsSigningIn] = useState(false);
    
    // useFocusEffect(
    //     useCallback(() => {
    //       const addInputValues = async () => {
    //         GoogleSignin.configure({
    //           // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    //           webClientId: '28649892510-rgjl5vm2voa642ls3aedf0u0u17pcq16.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
    //           // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    //           iosClientId:'28649892510-omh9o85cb0ldgjf0lq5ph3toepjlquiq.apps.googleusercontent.com',
    //           forceCodeForRefreshToken: true,
    //         });
    //         const savedRememberMe = await AsyncStorage.getItem('RememberMe');
    //         const savedloginId = await AsyncStorage.getItem('loginId');
    //         console.log('savedRememberMe====', savedRememberMe)
    //         if(savedRememberMe === 'true'){
    //           setSelection(true);
    //           setEmail(savedloginId);
    //           setPassword('')
    //         }
    //         else{
    //           setSelection(false);
    //           setEmail('');
    //           setPassword('');
    //         }
    //       }
    //       addInputValues();
    //       getGoogleAuth();
    //       signOut()
    //     }, [])
    //   );
     
      
      
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

   
    const LoginAPI = async () => {
        Keyboard.dismiss();
        let isValid= true;
        if(!email){
            setEmailErorr(true)
            isValid = false
        }
        if(!password){
            setPasswordError(true);
            isValid = false
        }
        if(isValid){
            loginHandler();
        }
          
    };
  
    async function loginHandler(){
        setLoading(true)
        const url = baseURL + 'api/token/';
        const data ={
            email: email,
            password: password
        }
        console.log('data', data)
        axios.post(url, data).then(async(res)  => {
            // console.log('res', res.data);
            if (res.status===200) {
                console.log("response login",res.data)
                await AsyncStorage.setItem('access_token', res.data.access);
                await AsyncStorage.setItem('refresh_token', res.data.refresh);
                const [header, payload, signature] = res.data.access.split('.');
                const decodedPayload = JSON.parse(atob(payload));
                console.log('Decoded Payload:', decodedPayload?.user_id);
                await AsyncStorage.setItem('userId',decodedPayload?.user_id)
                setLoading(false)
                await navigation.navigate('HomeScreen');
                setEmail('');
                setPassword('')
            }
        })
        .catch((err) => {
            setLoading(false);
            console.error(err)
        });
      }
   
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor:'rgba(248, 249, 249, 1)' }}>
            <View>
                <Text style={{color:'rgba(13, 20, 34, 1)',fontSize:22, marginLeft:15, marginTop:50, fontFamily:'PlusJakartaSans-Medium'}}>Login to Your Account</Text>
                <Text style={{color:'rgba(120, 126, 139, 1)', fontSize:14,marginLeft:15,marginTop:10,marginBottom:15,fontFamily:'PlusJakartaSans-Regular'}}>Access your account securely to manage discount requests. Please enter your credentials to proceed.</Text>
                <CustomTextInput 
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType='email-address'
                    placeholder="Enter E- Mail "
                    placeholderTextColor='rgba(255, 255, 255, 0.7))'
                    onPressIn={() => setEmailErorr(false)}
                    maxLength={50}
                    inputHeader='Email'
                    required = {true}
                    onFocus={() => setEmailErorr(false)} />
                <View>
                {
                    emailErorr && (
                    <View style={{flexDirection:'row',marginLeft:17,marginBottom:5}}>
                        <ErrorIcon/>
                        <Text style={{color:'red',marginLeft:5}}>Please enter valid Email</Text>
                    </View>
                    )
                }
                    <CustomTextInput
                        secureTextEntry={!isPasswordVisible}
                        placeholder="Enter Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholderTextColor='rgba(255, 255, 255, 0.7)'
                        onPressIn={() => setPasswordError(false)}
                        inputHeader='Password'
                        required = {true} 
                        isPassword={true}
                        onFocus={() => setPasswordError(false)}
                    />
                </View>
                {
                    passwordErorr && (
                    <View style={{flexDirection:'row',marginLeft:17}}>
                        <ErrorIcon/>
                        <Text style={{color:'red',marginLeft:5}}>Please enter valid Password</Text>
                    </View>
                    )
                }
                {erorr !== '' && (
                    <Text style={{color: 'red',alignSelf: 'center',marginTop: 5 ,fontFamily: 'Roboto-Regular',}}>{erorr}</Text>
                    )}
                <Pressable>
                    <Text style={{ marginLeft: 'auto', color: 'rgba(1, 114, 203, 1)', marginTop: 10, right: 20,textDecorationLine:'underline' ,fontFamily:'PlusJakartaSans-Regular'}} onPress={() => navigation.navigate('EmailVerification')}>Forget Password?</Text>
                </Pressable>
                <Pressable onPress={LoginAPI} style={{ backgroundColor: 'rgba(11, 160, 220, 1)', width: '95%', height: 52, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 25, borderRadius: 5 }}>
                    <Text style={{ fontSize: 16, color: 'rgba(255, 255, 255, 1)', fontFamily: 'PlusJakartaSans-Medium' }}>Login</Text>
                </Pressable>
                <View style={{flexDirection:'row',marginTop:15,width:'70%',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                    <Text style={{color:'rgba(120, 126, 139, 1)',fontSize:11, fontFamily:'PlusJakartaSans-Regular',}}>By continuing, you agree to our </Text>
                    <Text style={{color:'rgba(120, 126, 139, 1)',fontSize:11, fontFamily:'PlusJakartaSans-Regular', textDecorationLine:'underline',}}>Terms & Conditions</Text>
                    <Text style={{color:'rgba(120, 126, 139, 1)',fontSize:11, fontFamily:'PlusJakartaSans-Regular'}}> and</Text>
                    <Text style={{color:'rgba(120, 126, 139, 1)',fontSize:11, fontFamily:'PlusJakartaSans-Regular',textDecorationLine:'underline',}}> Privacy Policy</Text>
                </View>
            </View>
            {loading && <LoadingIndicator visible={loading} text='Loading...'></LoadingIndicator>}
        </SafeAreaView>
    )
}
export default LoginScreen;