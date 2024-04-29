import { useNavigation } from "@react-navigation/native";
import { Image, SafeAreaView, ScrollView, Text ,View,Pressable} from "react-native";
import { useAppContext } from "../../context/AppContext";
import moment from 'moment';

function SuccessScreen(){
    const navigation = useNavigation();
    const {item,billDetails, patientDetails,info, discountDetails,userDetails,requestDetails} = useAppContext();
    console.log('itm===', requestDetails);

   return(
    <SafeAreaView style={{flex:1, backgroundColor:'rgba(33, 39, 53, 1)'}}>
        <ScrollView>
            <View style={{marginTop:40,alignSelf:'center'}}>
                <Image style={{width:34.9, height:34.9,alignSelf:'center'}} source={require('../../assets/images/success_icon.png')}></Image>
                <Text style={{color:'rgba(52, 198, 111, 1)', fontSize:18,marginTop:10,fontFamily:'PlusJakartaSans-Medium'}}>Request Initiated!</Text>
            </View>
            <View style={{backgroundColor:'rgba(255, 255, 255, 1)', width:'90%',height:'auto',alignSelf:'center',padding:10,marginTop:15,borderRadius:8}}>
                <View style={{backgroundColor:'rgba(168, 207, 69, 1)', width:'100%',height:50,alignSelf:'center',justifyContent:'center',borderRadius:4}}>
                    <Text style={{color:'rgba(59, 80, 12, 1)', fontSize:18,textAlign:'center',fontFamily:'PlusJakartaSans-Medium'}}>Request Details</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:10}}>
                    <Text style={{color:'rgba(120, 126, 139, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium'}}>Req Number:</Text>
                    <Text style={{color:'rgba(13, 20, 34, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium',marginLeft:'auto'}}>{requestDetails?.request_id}</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:10}}>
                    <Text style={{color:'rgba(120, 126, 139, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium'}}>Created On:</Text>
                    <Text style={{color:'rgba(13, 20, 34, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium',marginLeft:'auto'}}>{moment(requestDetails?.created_at).format('DD-MM-YYYY, hh:mm:ss')}</Text>
                </View>
                <View style={{width:'100%', height:1.5,backgroundColor:'rgba(239, 243, 249, 1)',marginTop:10}}></View>
                <View style={{flexDirection:'row',marginTop:10}}>
                    <Text style={{color:'rgba(120, 126, 139, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium'}}>Patient:</Text>
                    <Text style={{color:'rgba(13, 20, 34, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium',marginLeft:'auto'}}>{requestDetails?.bill_details?.data?.patient_name}</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:10}}>
                    <Text style={{color:'rgba(120, 126, 139, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium'}}>Patient Visit Type:</Text>
                    <Text style={{color:'rgba(13, 20, 34, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium',marginLeft:'auto'}}>{requestDetails?.patient_visit_type}</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:10}}>
                    <Text style={{color:'rgba(120, 126, 139, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium'}}>Doctor:</Text>
                    <Text style={{color:'rgba(13, 20, 34, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium',marginLeft:'auto'}}>{requestDetails?.doctor}</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:10}}>
                    <Text style={{color:'rgba(120, 126, 139, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium'}}>Tentative Discharge Date:</Text>
                    <Text style={{color:'rgba(13, 20, 34, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium',marginLeft:'auto'}}>{moment(requestDetails?.discharge_date).format('DD MMM YYYY')}</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:10}}>
                    <Text style={{color:'rgba(120, 126, 139, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium'}}>Initiated By:</Text>
                    <Text style={{color:'rgba(13, 20, 34, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium',marginLeft:'auto'}}>{requestDetails?.initiated_by?.name}</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:10}}>
                    <Text style={{color:'rgba(120, 126, 139, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium'}}>Approval Authority :</Text>
                    <Text style={{color:'rgba(13, 20, 34, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium',marginLeft:'auto'}}>{requestDetails?.approve_authority?.name}</Text>
                </View>
                <View style={{width:'100%', height:1.5,backgroundColor:'rgba(239, 243, 249, 1)',marginTop:10}}></View>
                {requestDetails?.relation_type === 'Employee' && (
                    <>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 12, fontFamily: 'PlusJakartaSans-Medium' }}>Patient Type:</Text>
                            <Text style={{ color: 'rgba(13, 20, 34, 1)', fontSize: 12, fontFamily: 'PlusJakartaSans-Medium', marginLeft: 'auto' }}>{requestDetails?.relation_type}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 12, fontFamily: 'PlusJakartaSans-Medium' }}>Employer:</Text>
                                <Text style={{ color: 'rgba(13, 20, 34, 1)', fontSize: 12, fontFamily: 'PlusJakartaSans-Medium', marginLeft: 'auto' }}>{requestDetails?.bill_details?.patient?.employee?.company?.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 12, fontFamily: 'PlusJakartaSans-Medium' }}>Employee Name:</Text>
                                <Text style={{ color: 'rgba(13, 20, 34, 1)', fontSize: 12, fontFamily: 'PlusJakartaSans-Medium', marginLeft: 'auto' }}>{requestDetails?.bill_details?.patient?.employee?.name}</Text>
                        </View>
                        <View style={{ width: '100%', height: 1.5, backgroundColor: 'rgba(239, 243, 249, 1)', marginTop: 10 }}></View>
                    </>
                )} 
                <View style={{flexDirection:'row',marginTop:10}}>
                    <Text style={{color:'rgba(120, 126, 139, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium'}}>Total Unpaid Amount:</Text>
                    <Text style={{color:'rgba(13, 20, 34, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium',marginLeft:'auto'}}>Rs {requestDetails?.bill_amount}/-</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:10}}>
                    <Text style={{color:'rgba(120, 126, 139, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium'}}>Discount:</Text>
                    <Text style={{color:'rgba(40, 161, 56, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium',marginLeft:'auto'}}> ({requestDetails?.percentage ? requestDetails?.percentage : 0 }%) Rs {requestDetails?.discount_amount}/-</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:10}}>
                    <Text style={{color:'rgba(120, 126, 139, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium'}}>Total After Discount:</Text>
                    <Text style={{color:'rgba(13, 20, 34, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium',marginLeft:'auto'}}>Rs {requestDetails?.final_amount}/-</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:10}}>
                    <Text style={{color:'rgba(120, 126, 139, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium',marginTop:5}}>Request Status:</Text>
                    <Text style={{color:'rgba(252, 236, 218, 1)', fontSize:12,fontFamily:'PlusJakartaSans-Medium',marginLeft:'auto',backgroundColor:'rgba(223, 123, 0, 1)', padding:5,borderRadius:4}}>{requestDetails?.status}</Text>
                </View>
            </View>
            <Pressable onPress={() => navigation.navigate('HomeScreen')} style={{ backgroundColor: 'rgba(11, 160, 220, 1)', width: '95%', height: 52, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 25, borderRadius: 5 }}>
                <Text style={{ fontSize: 16, color: 'rgba(255, 255, 255, 1)', fontFamily: 'PlusJakartaSans-Medium' }}>Back To Home</Text>
            </Pressable>
        </ScrollView>
    </SafeAreaView>
   )
}

export default SuccessScreen;