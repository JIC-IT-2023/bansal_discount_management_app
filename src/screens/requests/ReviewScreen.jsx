import { Text,View , SafeAreaView,Pressable,ImageBackground,Image,TextInput,ScrollView,StyleSheet} from "react-native";
import BackIcon from "../../assets/icons/BackIcon";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import CustomDatePicker from "../../components/CustomDatePicker";
import { useAppContext } from "../../context/AppContext";
import moment from 'moment';
import { RequestApi } from "../../services/request/RequestServices";


function ReviewScreen(){
    const navigation = useNavigation();
    const {item,billDetails, patientDetails,info, discountDetails,userDetails,employeeDetails, updateRequestDetails} = useAppContext();
    console.log('valueeee', billDetails,info,discountDetails,userDetails,patientDetails,item ,employeeDetails,item);

    function submitHandler(){
        let data;
        if(item === 'Employee'){
            var bodyFormData = new FormData();
            bodyFormData.append('image', {
                uri: employeeDetails?.image?.uri,
                type: 'image/jpeg', 
                name: employeeDetails?.image?.name, 
            });
            data = {
                patient_visit_type : patientDetails?.visitType,
                discharge : moment(info?.tentative, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                treatment_description : info?.description,
                referred_by : info?.referBy,
                bill_amount : billDetails?.total_unpaid_amount === 0 ? 50000 : billDetails?.total_unpaid_amount,
                discount_amount : discountDetails?.discount_value === 0 ? 10000 : discountDetails?.discount_value,
                final_amount : discountDetails?.total_amount === 0 ? 40000 : discountDetails?.total_amount,
                approve_authority : discountDetails?.director?.value,
                bansal_api_data : {
                    patient_name : billDetails?.patient_name,
                    bill_no : patientDetails?.billNo
                },
                doctor : patientDetails?.doctorList,
                treatment_description : info?.description,
                relation_type : item,
                bill_data : {
                    patient_name : billDetails?.patient_name,
                    bill_no : patientDetails?.billNo
                },
                patient_data : {
                    patient_name : billDetails?.patient_name,
                    bill_no : patientDetails?.billNo
                },
                employee_id: employeeDetails?.employeeId,
                employee_name : employeeDetails?.name,
                employee_id_image : bodyFormData,
                employee_company : employeeDetails?.employer?.value,
                is_dependant : employeeDetails?.patient_type === 'Dependant' ? true : false,
                relationship : employeeDetails?.patient_type === 'Dependant' ? employeeDetails?.relation.value : null ,
                percentage : discountDetails?.discount
            }
        }
        else{
            data = {
                patient_visit_type : patientDetails?.visitType,
                discharge : moment(info?.tentative, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                treatment_description : info?.description,
                referred_by : info?.referBy,
                bill_amount : billDetails?.total_unpaid_amount === 0 ? 50000 : billDetails?.total_unpaid_amount,
                discount_amount : discountDetails?.discount_value === 0 ? 10000 : discountDetails?.discount_value,
                final_amount : discountDetails?.total_amount === 0 ? 40000 : discountDetails?.total_amount,
                approve_authority : discountDetails?.director?.value,
                bansal_api_data : {
                    patient_name : billDetails?.patient_name,
                    bill_no : patientDetails?.billNo
                },
                doctor : patientDetails?.doctorList,
                treatment_description : info?.description,
                relation_type : item,
                bill_data : {
                    patient_name : billDetails?.patient_name,
                    bill_no : patientDetails?.billNo
                },
                patient_data : {
                    patient_name : billDetails?.patient_name,
                    bill_no : patientDetails?.billNo
                },
                percentage : discountDetails?.discount
            }
        }
        console.log('data=====',data);
        RequestApi.initiateRequest(data).then((res) => {
            console.log(res.data);
            if(res.status === 201){
                updateRequestDetails(res.data)
                navigation.navigate('Success')
            }
        })
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
                            <Image style={{width:65, height:8, marginTop:40}} source={require('../../assets/images/progress_active.png')}></Image>
                            <Text style={{color:'white', fontSize:35, textAlign:'center', bottom:25}}>.</Text>
                            <Text style={{fontSize:12, color:'rgba(255, 255, 255, 1)', bottom:29, textAlign:'center',fontFamily: 'PlusJakartaSans-Medium'}}>Patient</Text>
                        </View>
                        { item=== 'Employee' &&
                        <View>
                            <Image style={{width:65, height:8, marginTop:40}} source={require('../../assets/images/progress_active.png')}></Image>
                            <Text style={{color:'white', fontSize:35, textAlign:'center', bottom:25}}>.</Text>
                            <Text style={{fontSize:12, color:'rgba(255, 255, 255, 1)', bottom:29, textAlign:'center',fontFamily: 'PlusJakartaSans-Medium'}}>Employee</Text>
                        </View>
                        }
                        <View>
                            <Image style={{width:65, height:8, marginTop:40}} source={require('../../assets/images/progress_active.png')}></Image>
                            <Text style={{color:'white', fontSize:35, textAlign:'center', bottom:25}}>.</Text>
                            <Text style={{fontSize:12, color:'rgba(255, 255, 255, 1)', bottom:29, textAlign:'center', fontFamily: 'PlusJakartaSans-Medium'}}>Additi. Info</Text>
                        </View>
                        <View>
                            <Image style={{width:65, height:8, marginTop:40}} source={require('../../assets/images/progress_active.png')}></Image>
                            <Text style={{color:'white', fontSize:35, textAlign:'center', bottom:25}}>.</Text>
                            <Text style={{fontSize:12, color:'rgba(255, 255, 255, 1)', bottom:29, textAlign:'center',fontFamily: 'PlusJakartaSans-Medium'}}>Discount</Text>
                        </View>
                        <View>
                            <Image style={{width:65, height:8, marginTop:40}} source={require('../../assets/images/progress_active.png')}></Image>
                            <Text style={{color:'white', fontSize:35, textAlign:'center', bottom:25}}>.</Text>
                            <Text style={{fontSize:12, color:'rgba(255, 255, 255, 1)', bottom:31, textAlign:'center',fontFamily: 'PlusJakartaSans-Medium'}}>Review</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{margin:13}}>
                    <Text style={{color:'rgba(13, 20, 34, 1)', fontSize:22,fontFamily: 'PlusJakartaSans-Medium'}}>Review & Confirm</Text>
                    <Text style={{color:'rgba(115, 127, 153, 1)', fontSize:14,fontFamily: 'PlusJakartaSans-Regular',marginTop:7,letterSpacing:0.5}}>Fantastic! Review your selections and submit the discount request.</Text>
                </View>
                <View style={{backgroundColor:"rgba(22, 32, 55, 1)", width:'95%', height:'auto', borderRadius:8, padding:10,alignSelf:'center'}}>
                    <View>
                        <View style={{ flexDirection: 'row', marginLeft: 20, justifyContent: 'space-between' }}>
                            <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Patient:</Text>
                            <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium', right: 20 }}>{billDetails?.patient_name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 9, justifyContent: 'space-between' }}>
                            <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Patient Visit Type:</Text>
                            <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium', right: 20 }}>{patientDetails?.visitType}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 9, justifyContent: 'space-between' }}>
                            <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Doctor:</Text>
                            <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium', right: 20 }}>{patientDetails?.doctorList}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 9, justifyContent: 'space-between' }}>
                            <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Admission Date:</Text>
                            <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium', right: 20 }}>04 OCT, 2023</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 9, justifyContent: 'space-between' }}>
                            <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Initiated By:</Text>
                            <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium', right: 20 }}>{userDetails?.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 9, justifyContent: 'space-between',marginBottom:7 }}>
                            <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Approval Authority:</Text>
                            <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium', right: 20 }}>{discountDetails?.director?.label}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 15, backgroundColor: 'rgba(255, 255, 255, 1)', width: '93%', height: 'auto', borderRadius: 10, padding: 10, alignSelf: 'center', borderColor: 'rgba(239, 243, 249, 1)', borderWidth: 1 }}>
                    <View>
                        <View style={{ flexDirection: 'row', marginLeft: 20, justifyContent: 'space-between' }}>
                            <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Total Unpaid Amount:</Text>
                            <Text style={{ color: 'rgba(33, 39, 53, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium', right: 20 }}>Rs {billDetails?.total_unpaid_amount} /-</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 5, justifyContent: 'space-between' }}>
                            <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Discount:({discountDetails?.discount}%)</Text>
                            <Text style={{ color: 'rgba(40, 161, 56, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium', right: 20 }}>Rs {discountDetails?.discount_value} /-</Text>
                        </View>
                    </View>
                    <View style={styles.discountContainer}>
                        <ImageBackground style={{ width: '100%',height: '100%',alignItems: 'center',flexDirection: 'row'}} source={require('../../assets/images/total_discount.png')}>
                            <Image style={styles.discountIcon} source={require('../../assets/images/discount_green.png')} />
                            <View style={styles.discountText}>
                                <Text style={styles.discountTitle}>Total After Discount</Text>
                                <Text style={styles.discountNumber}>Rs {discountDetails?.total_amount} /-</Text>
                            </View>        
                        </ImageBackground>
                    </View>
                </View>
                {
                    item === "Employee" &&  
                    <View style={{ marginTop: 15, backgroundColor: 'rgba(255, 255, 255, 1)', width: '93%', height: 'auto', borderRadius: 10, padding: 10, alignSelf: 'center', borderColor: 'rgba(239, 243, 249, 1)', borderWidth: 1 }}>
                        <View>
                            <View style={{ marginLeft: 20, justifyContent: 'space-between' }}>
                                <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Patient Type:</Text>
                                <Text style={{ color: 'rgba(33, 39, 53, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium',marginTop:2}}>{employeeDetails?.patient_type}</Text>
                            </View>
                            <View style={{ marginLeft: 20, marginTop: 5, justifyContent: 'space-between' }}>
                                <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Employer:</Text>
                                <Text style={{ color: 'rgba(33, 39, 53, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium',marginTop:2 }}>{employeeDetails?.employer?.label}</Text>
                            </View>
                            <View style={{ marginLeft: 20, marginTop: 5, justifyContent: 'space-between' ,marginBottom:7}}>
                                <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Employee Name:</Text>
                                <Text style={{ color: 'rgba(33, 39, 53, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium',marginTop:2 }}>{employeeDetails?.name}</Text>
                            </View>
                            <View style={{ marginLeft: 20, marginTop: 5, justifyContent: 'space-between' ,marginBottom:7}}>
                                <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Employee ID:</Text>
                                <Text style={{ color: 'rgba(33, 39, 53, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium',marginTop:2 }}>{employeeDetails?.employeeId}</Text>
                            </View>
                            <View style={{ marginLeft: 20, marginTop: 5, justifyContent: 'space-between' ,marginBottom:7}}>
                                <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>ID Card Photo:</Text>
                                <Pressable style={{backgroundColor:'rgba(11,160,220,1)', width:60, height:35,alignItems:'center',justifyContent:'center',marginTop:10,borderRadius:7}}>
                                    <Text style={{ color: 'white', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium' }}>View</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                }
                <View style={{ marginTop: 15, backgroundColor: 'rgba(255, 255, 255, 1)', width: '93%', height: 'auto', borderRadius: 10, padding: 10, alignSelf: 'center', borderColor: 'rgba(239, 243, 249, 1)', borderWidth: 1,marginBottom:110 }}>
                    <View>
                        <View style={{ marginLeft: 20, justifyContent: 'space-between' }}>
                            <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Tentative Discharge Date:</Text>
                            <Text style={{ color: 'rgba(33, 39, 53, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium',marginTop:2}}>{moment(info?.tentative, 'DD-MM-YYYY').format('DD MMM, YYYY')}</Text>
                        </View>
                        <View style={{ marginLeft: 20, marginTop: 5, justifyContent: 'space-between' }}>
                            <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Referred By:</Text>
                            <Text style={{ color: 'rgba(33, 39, 53, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium',marginTop:2 }}>{info?.referBy}</Text>
                        </View>
                        <View style={{ marginLeft: 20, marginTop: 5, justifyContent: 'space-between' ,marginBottom:7}}>
                            <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Treatment Description:</Text>
                            <Text style={{ color: 'rgba(33, 39, 53, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium',marginTop:2 }}>{info?.description}</Text>
                        </View>
                    </View>
                </View>
                {/* <View style={{ marginTop: 15, backgroundColor: 'rgba(255, 255, 255, 1)', width: '93%', height: 'auto', borderRadius: 10, padding: 10, alignSelf: 'center', borderColor: 'rgba(239, 243, 249, 1)', borderWidth: 1,marginBottom:110 }}>
                    <View>
                        <View style={{ marginLeft: 20, justifyContent: 'space-between' }}>
                            <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Total Paid Amount to Date </Text>
                            <Text style={{ color: 'rgba(33, 39, 53, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-SemiBold',marginTop:5}}>Rs {billDetails} /-</Text>
                            <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 10, fontFamily: 'PlusJakartaSans-SemiBold',marginTop:5 }}>04 OCT, 2023</Text>
                        </View>
                    </View>
                </View> */}
            </ScrollView>
            {/* <CustomDatePicker isVisible={open}/> */}
            <View style={{position: 'absolute', bottom: 0,left: 0,right: 0,backgroundColor: 'rgba(255, 255, 255, 1)',paddingBottom: Platform.OS === 'ios' ? 15 : 30,justifyContent:'center', alignItems:'center', width:'100%', height:100, borderTopRightRadius:16, borderTopLeftRadius:16,shadowColor: '#000',shadowOffset:{ width: 0,height: 2 },shadowOpacity: 0.25, shadowRadius: 3,elevation:10}}>
                <View style={{flexDirection:'row',marginTop:Platform.OS === 'ios' ? 30 : 30,height:30, width:'85%',alignItems:'center', justifyContent:'space-evenly'}}>
                    <Pressable style={{backgroundColor:'rgba(255, 255, 255, 1)', width:'50%', height:52, borderRadius:10,alignItems:'center',justifyContent:'center', borderColor:'rgba(239, 243, 249, 1)', borderWidth:1.5}} onPress={() => navigation.navigate('Requests')}>
                        <Text style={{color:'rgba(13, 20, 34, 1)', fontSize:14,fontFamily:'PlusJakartaSans-Medium'}}>Cancel</Text>
                    </Pressable>
                    <Pressable style={{backgroundColor:'rgba(11, 160, 220, 1)', width:'50%', height:52, borderRadius:10,alignItems:'center',justifyContent:'center', marginLeft:10}} onPress={submitHandler}>
                        <Text style={{color:'rgba(255, 255, 255, 1)', fontSize:14,fontFamily:'PlusJakartaSans-Medium'}}>Submit</Text>
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
      width:44,
      height:44
    },
    discountText: {
      marginLeft: 15,
    },
    discountTitle: {
      color: 'rgba(59, 80, 12, 1)',
      fontFamily: 'PlusJakartaSans-Medium',
      fontSize: 13,
    },
    discountNumber: {
      color: 'rgba(37, 53, 3, 1)',
      fontFamily: 'PlusJakartaSans-Bold',
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

export default ReviewScreen;