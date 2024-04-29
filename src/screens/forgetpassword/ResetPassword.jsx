import { View,Text, SafeAreaView, Pressable, Platform, TextInput,Keyboard } from "react-native";
import BackIcon from "../../assets/icons/BackIcon";
// import Styles from "../../public/Styles";
import { useCallback, useState } from "react";
import CustomTextInput from "../../components/CustomTextInput";
// import useBackButtonHandler from "../../components/BackHandlerUtils";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


function ResetPassword(){
    const navigation = useNavigation();
    const[password,setPassword] = useState('');
    const[confirmPassword,setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordErrror] = useState(false);
    const [userId, setUserId] = useState();
    

    // useBackButtonHandler(navigation, false);

    useFocusEffect(
        useCallback(() => {
        const retrieveUserName = async () => {
        try {
            const user_id = await AsyncStorage.getItem('userId');
            setUserId(user_id);
        } catch (error) {
            console.error('Error retrieving username from AsyncStorage:', error);
        }
        };

        retrieveUserName();
    }, [])
    );
   

    // async function passwordHandler(){
    //     Keyboard.dismiss
    //     let isValid= true;
    //     if(!password){
    //         setPasswordError(true)
    //         isValid = false;
    //     }
    //     if(!confirmPassword || confirmPassword !== password){
    //         setConfirmPasswordErrror(true);
    //         isValid = false;
    //     }
    //     if(isValid){
    //         const data = {
    //             user_id : userId,
    //             new_password : password
    //         }
    //         ForgetPasswordApi.resetpassword(data).then((res) => {
    //             console.log('res====', res.data);
    //             navigation.navigate('SignIn')
    //         }).catch((err) => {
    //             console.error(err);
    //         })
    //     }
    // }
    
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'rgba(248, 249, 249, 1)'}}>
            <Pressable style={[{marginTop:20,marginLeft:15}]} onPress={() => navigation.navigate('EmailVerification')}>
              <BackIcon color='#1B1E28'></BackIcon>
           </Pressable>
           <View style={{marginTop:40,justifyContent:'center',marginLeft:15}}>
               <Text style={{color:'rgba(27, 30, 40, 1)', fontFamily:'PlusJakartaSans-Medium', fontSize:26}}>Set New Password</Text>
               <Text style={{color:'rgba(120, 126, 139, 1)',fontSize:14, fontFamily:'PlusJakartaSans-Regular',marginTop:10}}>Choose a new password for your account. Make sure it's secure.</Text>
           </View>
            <View style={{marginTop:30}}>
                <CustomTextInput 
                    placeholder='Enter new password'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    inputHeader='New Password'
                    secureTextEntry={true}
                    isPassword={true}
                    width='94%'
                    onFocus={() => setPasswordError(false)}
                    required={true}
                />
                {passwordError && (
                    <View style={{marginLeft:25}}>
                        <Text style={{color:'red', fontFamily:'PlusJakartaSans-Regular', fontSize:13,marginBottom:10}}>Enter valid password</Text>
                    </View>
                )}
                <CustomTextInput 
                    placeholder='Enter confirm password'
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    inputHeader='Confirm Password'
                    secureTextEntry={true}
                    isPassword={true}
                    width='94%'
                    onFocus={() => setConfirmPasswordErrror(false)}
                    required={true}
                />
                {confirmPasswordError && (
                    <View style={{marginLeft:20}}>
                        <Text style={{color:'red', fontFamily:'PlusJakartaSans-Regular', fontSize:13,marginBottom:10}}>Enter valid confirm password</Text>
                    </View>
                )}
               <Pressable  style={{ backgroundColor: 'rgba(11, 160, 220, 1)', width: '93%', height: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 30, borderRadius: 5,marginBottom:10 }} 
            //    onPress={passwordHandler}
                    onPress={() => navigation.navigate('Login')}
               >
                    <Text style={{ fontSize: 16, color: 'rgba(255, 255, 255, 1)', fontFamily: 'PlusJakartaSans-Medium' }}>Reset Password</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default ResetPassword;