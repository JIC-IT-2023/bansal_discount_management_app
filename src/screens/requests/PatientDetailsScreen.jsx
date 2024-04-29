import { ImageBackground, SafeAreaView, ScrollView, Text,View, StyleSheet,Image,Pressable,TextInput, Keyboard} from "react-native";
import BackIcon from "../../assets/icons/BackIcon";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../context/AppContext";
import { RequestApi, fetchData } from "../../services/request/RequestServices";
import { HomeApi } from "../../services/home/HomeServices";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../../services/config";


function PatientDetailsScreen(){
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState('Outpatient');
    const [billId, setBillId] = useState('');
    const [billIdError, setBillIdError] = useState(false);
    const [billDetails, setBillDetails] = useState();
    const [showDetails, setShowDetails] = useState(false);
    const [doctor, setDoctor] = useState();
    const [doctorError, setDoctorError] = useState(false);
    const {item,updateBillDetails,userDetails,updatePatientDetails} = useAppContext();
    const [bearer, setBearer] = useState();
     
    console.log('item====', userDetails);

    const handleOptionSelection = (option) => {
        console.log('option====', option);
        setSelectedOption(option);
        // console.log(visitType);
    };
    useEffect(async () => 
    {
        const token = await AsyncStorage.getItem('access_token');
        console.log('token====', token);
        setBearer(token);
    },[])
    function getDetailsHandler() {
        Keyboard.dismiss();
        let isValid = true
        if(!billId){
           isValid = false;
            setBillIdError(true);
        }
        if(isValid){
            // Define your token
            const token = bearer;
            const url = baseURL + 'main/patient-details?mr_no='+billId;
            // Set up headers
            const headers = {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json' // This might not be necessary for a GET request, but it's good practice to include it
            };

            // Make the GET request with headers
            axios.get(url, { headers: headers })
            .then(response => {
                // Handle successful response
                console.log(response.data);
                if(response.status === 200){
                    setBillDetails(response.data);
                    updateBillDetails(response.data)
                    setShowDetails(true);
                }
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });

            // RequestApi.getBillDetails(billId).then((res) => {
            //     if(res.status === 200){
            //         setBillDetails(res.data);
            //         updateBillDetails(res.data)
            //         setShowDetails(true);
            //     }
            // })
        }
    }
    function continueHandler() {
        Keyboard.dismiss();
        let isValid = true;
        if(!billId){
            setBillIdError(true);
            isValid = false;
        }
        if(!doctor){
            setDoctorError(true);
            isValid = false;
        }
        if(isValid){
            updatePatientDetails({
                visitType : selectedOption,
                doctorList : doctor,
                billNo : billId
            })
            if(item === 'Employee'){
                navigation.navigate('Employee')
            }
            else{
                navigation.navigate('AdditionalInfo')
            }
        }
    }
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'rgba(248, 249, 249, 1)'}}>
            <ScrollView>
                <Pressable style={{margin:15}} onPress={() => navigation.goBack()}>
                    <BackIcon/>
                </Pressable>
                <View style={styles.discountContainer}>
                    <ImageBackground style={styles.imageBackground} source={require('../../assets/images/progress_background.png')}>
                        <View>
                            <Image style={{width:65, height:8, marginTop:40}} source={require('../../assets/images/progress_half.png')}></Image>
                            <Text style={{color:'white', fontSize:35, textAlign:'center', bottom:25}}>.</Text>
                            <Text style={{fontSize:12, color:'rgba(255, 255, 255, 1)', bottom:29, textAlign:'center',fontFamily: 'PlusJakartaSans-Medium'}}>Patient</Text>
                        </View>
                        { item=== 'Employee' &&
                        <View>
                            <Image style={{width:65, height:8, marginTop:40}} source={require('../../assets/images/progress_inactive.png')}></Image>
                            <Text style={{color:'rgba(58, 136, 168, 1)', fontSize:35, textAlign:'center', bottom:25}}>.</Text>
                            <Text style={{fontSize:12, color:'rgba(255, 255, 255, 1)', bottom:29, textAlign:'center',fontFamily: 'PlusJakartaSans-Medium'}}>Employee</Text>
                        </View>
                        }
                        <View>
                            <Image style={{width:65, height:8, marginTop:40}} source={require('../../assets/images/progress_inactive.png')}></Image>
                            <Text style={{color:'rgba(58, 136, 168, 1)', fontSize:35, textAlign:'center', bottom:25}}>.</Text>
                            <Text style={{fontSize:12, color:'rgba(255, 255, 255, 1)', bottom:29, textAlign:'center', fontFamily: 'PlusJakartaSans-Medium'}}>Additi. Info</Text>
                        </View>
                        <View>
                            <Image style={{width:65, height:8, marginTop:40}} source={require('../../assets/images/progress_inactive.png')}></Image>
                            <Text style={{color:'rgba(58, 136, 168, 1)', fontSize:35, textAlign:'center', bottom:25}}>.</Text>
                            <Text style={{fontSize:12, color:'rgba(255, 255, 255, 1)', bottom:29, textAlign:'center',fontFamily: 'PlusJakartaSans-Medium'}}>Discount</Text>
                        </View>
                        <View>
                            <Image style={{width:65, height:8, marginTop:40}} source={require('../../assets/images/progress_inactive.png')}></Image>
                            <Text style={{color:'rgba(58, 136, 168, 1)', fontSize:35, textAlign:'center', bottom:25}}>.</Text>
                            <Text style={{fontSize:12, color:'rgba(255, 255, 255, 1)', bottom:31, textAlign:'center',fontFamily: 'PlusJakartaSans-Medium'}}>Review</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{margin:15}}>
                    <Text style={{color:'rgba(13, 20, 34, 1)', fontSize:22,fontFamily: 'PlusJakartaSans-Medium'}}>Patient Details</Text>
                    <Text style={{color:'rgba(115, 127, 153, 1)', fontSize:13,fontFamily: 'PlusJakartaSans-Regular',marginTop:7,letterSpacing:0.5}}>Welcome to the {item === "Employee" ? 'Employee' : 'Non-Employee'} Discount Request Wizard. Let's start by fetching patient details using the Bill ID.</Text>
                </View>
                <View style={{margin:10}}>
                    <Text style={{color:'rgba(13, 20, 34, 1)',fontSize:14, fontFamily:'PlusJakartaSans-SemiBold',marginTop:10,marginLeft:7}}>Patient Visit Type
                        <Text style={{ color: 'red' }}> {'*'}</Text>
                    </Text>
                    <View style={{ flexDirection: 'row', marginLeft:8,marginTop:7, width:'90%'}}>
                        <Pressable
                            style={{ flexDirection: 'row', alignItems: 'center', backgroundColor:'white', width:'50%', height:44, borderRadius:10, padding:10,marginTop:10 }}
                            onPress={() => handleOptionSelection('Outpatient')}
                            >
                            <Image
                                source={
                                selectedOption === 'Outpatient'
                                    ? require('../../assets/images/radio_active.png')
                                    : require('../../assets/images/radio_inactive.png')
                                }
                                style={{ width: 22, height: 22 }}
                            ></Image>
                            <Text style={{ color: 'rgba(13, 20, 34, 1)', fontSize: 14, fontFamily: 'PlusJakartaSans-SemiBold', marginLeft: 5, textAlign: 'center',bottom:1 }}>
                                Outpatient
                            </Text>
                        </Pressable>
                        <Pressable
                            style={{ flexDirection: 'row', alignItems: 'center', backgroundColor:'white', width:'50%', height:44, borderRadius:10, padding:10,marginTop:10,marginLeft:15 }}
                            onPress={() => handleOptionSelection('Inpatient')}
                            >
                            <Image
                                source={
                                selectedOption === 'Inpatient'
                                    ? require('../../assets/images/radio_active.png')
                                    : require('../../assets/images/radio_inactive.png')
                                }
                                style={{ width: 22, height: 22 }}
                            ></Image>
                            <Text style={{ color: 'rgba(13, 20, 34, 1)', fontSize: 14, fontFamily: 'PlusJakartaSans-SemiBold', marginLeft: 5, bottom:1 }}>
                                Inpatient
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <View style={{margin:10, width:'95%'}}>
                    <Text style={{color:'rgba(13, 20, 34, 1)',fontSize:14, fontFamily:'PlusJakartaSans-SemiBold',marginTop:10,marginLeft:7}}>Patient Bill ID
                        <Text style={{ color: 'red' }}> {'*'}</Text>
                    </Text>
                    <View style={{flexDirection:'row',marginTop:10,marginLeft:8}}>
                        <TextInput 
                           value={billId}
                           onChangeText={(text) => setBillId(text)}
                           style={{backgroundColor:'rgba(255, 255, 255, 1)', width:'65%', height:44, borderRadius:10, padding:10, color:'black', fontSize:14, fontFamily:'PlusJakartaSans-Medium'}}
                           placeholder="Enter Patient’s Bill ID"
                           placeholderTextColor='rgba(120, 126, 139, 1)'
                           onFocus={() => setBillIdError(false)}>
                        </TextInput>
                        <Pressable style={{backgroundColor:'rgba(22, 32, 55, 1)',width:97, height:43, borderRadius:8, padding:10, marginLeft:15}} onPress={getDetailsHandler}>
                            <Text style={{color:'rgba(239, 243, 249, 1)', fontSize:12, textAlign:'center', fontFamily:'PlusJakartaSans-Medium'}}>Get Details</Text>
                        </Pressable>
                    </View>
                    {
                        billIdError && <Text style={{color:'red', fontSize:13,fontFamily:'PlusJakartaSans-Medium',margin:10}}>Enter Valid Bill ID</Text>
                    }
                </View>
                {
                    showDetails && (
                        <>
                            <View style={{ margin: 10, backgroundColor: 'rgba(255, 255, 255, 1)', width: '89%', height: 'auto', borderRadius: 10, padding: 10, alignSelf: 'center', borderColor: 'rgba(239, 243, 249, 1)', borderWidth: 1, }}>
                                <View>
                                    <View style={{ flexDirection: 'row', marginLeft: 20, justifyContent: 'space-between' }}>
                                        <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 15, fontFamily: 'PlusJakartaSans-Regular' }}>Patient Name:</Text>
                                        <Text style={{ color: 'rgba(33, 39, 53, 1)', fontSize: 15, fontFamily: 'PlusJakartaSans-Medium', right: 25 }}>{billDetails?.patient_name}</Text>
                                    </View>
                                    {/* <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 5, justifyContent: 'space-between' }}>
                                        <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Doctor:</Text>
                                        <Text style={{ color: 'rgba(33, 39, 53, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium', right: 20 }}>Rahul Choudhary</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 5, justifyContent: 'space-between' }}>
                                        <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Admission Date:</Text>
                                        <Text style={{ color: 'rgba(33, 39, 53, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium', right: 20 }}>04 OCT, 2023</Text>
                                    </View> */}
                                </View>
                                <View style={{ backgroundColor: 'rgba(248, 249, 249, 1)', width: '90%', height: 92, alignSelf: 'center', marginTop: 10, borderRadius: 4, alignItems: 'center', justifyContent: 'center', borderColor: 'rgba(239, 243, 249, 1)', borderWidth: 1,marginBottom:20 }}>
                                    <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 12, fontFamily: 'PlusJakartaSans-Medium', textAlign: 'center' }}>Total Unpaid Amount</Text>
                                    <Text style={{ color: 'rgba(36, 36, 36, 1)', fontSize: 18, fontFamily: 'PlusJakartaSans-Medium', textAlign: 'center' }}>Rs {billDetails?.total_unpaid_amount} /-</Text>
                                    {/* <Text style={{color:'rgba(62, 70, 89, 1)', fontSize:10, fontFamily:'PlusJakartaSans-Medium', textAlign:'center'}}>08 OCT, 2023</Text> */}
                                </View>
                            </View>
                            <View style={{ margin: 7, width: '95%', marginBottom: 120, alignSelf: 'center' }}>
                                <Text style={{ color: 'rgba(13, 20, 34, 1)', fontSize: 14, fontFamily: 'PlusJakartaSans-SemiBold', marginTop: 10, marginLeft: 7, marginBottom: 10 }}>Doctor Name
                                    <Text style={{ color: 'red' }}> {'*'}</Text>
                                </Text>
                                <TextInput
                                    value={doctor}
                                    onChangeText={(text) => setDoctor(text)}
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 1)', width: '95%', height: 44, borderRadius: 10, padding: 10, color: 'black', fontSize: 14, fontFamily: 'PlusJakartaSans-Medium', marginLeft: 7 }}
                                    placeholder="Name of the Doctor"
                                    placeholderTextColor='rgba(120, 126, 139, 1)'
                                    onFocus={() => setDoctorError(false)}>
                                </TextInput>
                                {doctorError && <Text style={{ color: 'red', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium', margin: 8 }}>Enter valid Doctor name</Text>}
                            </View>
                        </>
                    )
                }
            </ScrollView>
            <View style={{position: 'absolute', bottom: 0,left: 0,right: 0,backgroundColor: 'rgba(255, 255, 255, 1)',paddingBottom: Platform.OS === 'ios' ? 15 : 30,justifyContent:'center', alignItems:'center', width:'100%', height:100, borderTopRightRadius:16, borderTopLeftRadius:16,shadowColor: '#000',shadowOffset:{ width: 0,height: 2 },shadowOpacity: 0.25, shadowRadius: 3,elevation:10}}>
                <View style={{flexDirection:'row',marginTop:Platform.OS === 'ios' ? 30 : 30,height:30, width:'85%',alignItems:'center', justifyContent:'space-evenly'}}>
                    <Pressable style={{backgroundColor:'rgba(255, 255, 255, 1)', width:'50%', height:52, borderRadius:10,alignItems:'center',justifyContent:'center', borderColor:'rgba(239, 243, 249, 1)', borderWidth:1.5}} onPress={() => navigation.navigate('Requests')}>
                        <Text style={{color:'rgba(13, 20, 34, 1)', fontSize:14,fontFamily:'PlusJakartaSans-Medium'}}>Cancel</Text>
                    </Pressable>
                    <Pressable style={{backgroundColor:'rgba(11, 160, 220, 1)', width:'50%', height:52, borderRadius:10,alignItems:'center',justifyContent:'center', marginLeft:10}} onPress={() => continueHandler()}>
                        <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:14,fontFamily:'PlusJakartaSans-Medium'}}>Continue</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(248, 249, 249, 1)',
    },
    header: {
      flexDirection: 'row',
      marginTop: 20,
      alignItems: 'center',
    },
    logo: {
      alignSelf: 'center',
      marginTop: 15,
      width: 55,
      height: 35,
    },
    profile: {
      marginLeft: 15,
    },
    welcome: {
      color: 'rgba(120, 126, 139, 1)',
      fontFamily: 'PlusJakartaSans-Medium',
      fontSize: 13,
    },
    username: {
      color: 'rgba(13, 20, 34, 1)',
      fontFamily: 'PlusJakartaSans-Medium',
      fontSize: 15,
    },
    modBadge: {
      backgroundColor: 'rgba(239, 243, 249, 1)',
      width: 52,
      height: 22,
      marginLeft: 'auto',
      marginRight: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modText: {
      color: 'rgba(13, 20, 34, 1)',
      fontFamily: 'PlusJakartaSans-Medium',
      fontSize: 13,
    },
    discountContainer: {
        width: '94%',
        height: 79,
        alignSelf: 'center',
        marginTop: 13,
        borderRadius: 8,
        overflow: 'hidden', // This is important to make borderRadius work
      },
    imageBackground: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:'space-evenly'
    },
    discountIcon: {
      marginLeft: 20,
    },
    discountText: {
      marginLeft: 15,
    },
    discountTitle: {
      color: 'rgba(255, 255, 255, 1)',
      fontFamily: 'PlusJakartaSans-Medium',
      fontSize: 13,
    },
    discountNumber: {
      color: 'rgba(255, 255, 255, 1)',
      fontFamily: 'PlusJakartaSans-Medium',
      fontSize: 15,
    },
    dropdown: {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      width: 168,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 6,
      height: 44,
      marginLeft:'auto',
      right:20,
      shadowColor: '#000',
      shadowOffset:{ width: 0,height: 2 },
      shadowOpacity: 0.25, 
      shadowRadius: 3,
      elevation:6
    },
    placeholderStyle: {
      fontSize: 16,
      color: '#36454F',
      marginLeft:10
  },
  selectedTextStyle: {
      fontSize: 16,
      color: 'black',
      // marginTop: 12,
      marginLeft:10,
      textAlign:'left'
  },
  iconStyle: {
      width: 30,
      height: 30,
      // marginTop:10
  },
  itemTextStyle: {
      color: 'black',
      fontSize: 15,
      marginTop:-10 
  },
  filterContainer: {
    // width:'35%',
    // height:33,
    // // borderWidth: 0.5,
    // // borderRadius: 5,
    // // marginHorizontal: 8,
    // // paddingHorizontal: 10,
    // // alignItems: 'center',
    // justifyContent: 'center',
    // marginTop: 15,
    // // elevation: 8,
    // // backgroundColor: 'white',
    // marginBottom:20,
    // backgroundColor:'rgba(255, 255, 255, 1)',
    width:'27%',
    height:33,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:6
  },
  filterSection: {
    height: 60,
    justifyContent: 'center',
    marginBottom: 10,
  },
  flatListSection: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom:20 
  },
  selectedFilter: {
    backgroundColor:'rgba(255, 255, 255, 1)',
    width:'27%',
    height:33,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:6,
    shadowColor: '#000',
    shadowOffset:{ width: 0,height: 2 },
    shadowOpacity: 0.25, 
    shadowRadius: 3,
    elevation:6
  },
  filterText: {
    color: 'black',
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize:12
  },
  selectedText: {
    color: 'rgba(13, 20, 34, 1)',
    fontSize:12,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 5,
    margin: 5,
},
top: {
    flexDirection: 'row',
    flex: 0.3,
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
    borderColor: '#00000026'
},
card: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
},
image: {
    width: 310,
    height: 210,
    bottom: 40
},
ImgTxt: {
    fontSize: 20,
    marginBottom: 20,
    width: 300,
    height: 25,
    color: 'rgba(0, 104, 117, 1)',
    fontWeight: '500',
    fontFamily: 'Roboto-Regular',
    justifyContent: 'center',
    alignItems: 'center',
},
model: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: '100%',
    height: 330,
    padding: 20,
    // justifyContent: 'center',
    // marginTop:'auto'
},
filterSection: {
    height: 60,
    justifyContent: 'center',
    marginBottom: 10,
  },
  });

export default PatientDetailsScreen;