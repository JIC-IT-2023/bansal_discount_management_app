import { View,Text, SafeAreaView, Pressable, Platform, TextInput, Keyboard } from "react-native";
import BackIcon from "../../assets/icons/BackIcon";
// import Styles from "../../public/Styles";
import { useState } from "react";
import CustomTextInput from "../../components/CustomTextInput";
// import useBackButtonHandler from "../../components/BackHandlerUtils";
// import { ForgetPasswordApi } from "../../Services/forgetpassword/ForgetPasswordService";
// import AsyncStorage from "@react-native-async-storage/async-storage";

function EmailVerification({navigation}){
    
    const[email,setEmail] = useState('')
    const [emailError, setEmailError] = useState(false);
    // useBackButtonHandler(navigation, false);
    
    async function emailHandler(){
        Keyboard.dismiss
        let isValid= true;
        if(!email){
            setEmailError(true)
            isValid = false;
        }
        if(isValid){
            // const data = {
            //     email : email
            // }
            // ForgetPasswordApi.requestOtp(data).then(async (res) =>{
            //     console.log('ress====', res.data);
            //     if(res.status === 200){
            //         await AsyncStorage.setItem('userId',res.data.user_id );
            //         await AsyncStorage.setItem('email',email )
            //     }
            // }).catch((err) => {
            //     console.error(err);
            // })
            navigation.navigate('OtpVerification')
        }
    }
    
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'rgba(248, 249, 249, 1)'}}>
            <Pressable style={[{marginLeft:15,marginTop:20}]} onPress={() => navigation.goBack()}>
              <BackIcon color='#1B1E28'></BackIcon>
           </Pressable>
           <View style={{marginTop:20,justifyContent:'center',marginLeft:15}}>
               <Text style={{color:'rgba(27, 30, 40, 1)', fontFamily:'PlusJakartaSans-SemiBold', fontSize:22}}>Reset Password</Text>
               <Text style={{color:'rgba(120, 126, 139, 1)',fontSize:14, fontFamily:'PlusJakartaSans-Regular',marginTop:10}}>To reset your password, Please enter your email address below, and we'll send you a verification code shortly.</Text>
           </View>
            <View style={{marginTop:20}}>
                <CustomTextInput 
                    placeholder='Enter E- Mail'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    width='93%'
                    inputHeader='Email'
                    required = {true}
                />
                {emailError && (
                    <View style={{marginLeft:25}}>
                        <Text style={{color:'red', fontFamily:'Roboto-Regular', fontSize:13,marginBottom:10}}>Enter valid email</Text>
                    </View>
                )}
               <Pressable  style={{ backgroundColor: 'rgba(11, 160, 220, 1)', width: '93%', height: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 30, borderRadius: 5,marginBottom:10 }} onPress={emailHandler}>
                    <Text style={{ fontSize: 16, color: 'rgba(255, 255, 255, 1)', fontFamily: 'Roboto-Medium' }}>Send Verification Code</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default EmailVerification;