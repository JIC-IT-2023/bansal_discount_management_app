import { useState } from "react";
import { SafeAreaView, ScrollView, Text, View ,Pressable,StyleSheet, TextInput, FlatList, Image,ImageBackground} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from "react-native-element-dropdown";
import Modal from 'react-native-modal';
import { useAppContext } from "../../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import moment from 'moment';

function RequestExpandScreen(){
  const navigation = useNavigation();
    const filterTitle = [
        {
          id:1,
          title : 'All'
        },
        {
          id : 2,
          title: 'Employee'
        },
        {
          id : 3,
          title : 'Non-Employee'
        }
    ]
    const genderOptions = [
      { label: 'All Status', value: '1' },
      { label: 'Review', value: '2' },
      { label: 'Completed', value: '3' }
    ];
    const [selectedFilter, setSelectedFilter] = useState(filterTitle[0]);
    const [selectedstatus, setSelectedStatus] = useState();
    const [selected, setSelected] = useState("");
    const[searchText, setSearchText] = useState();
    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [showDetails, setShowDetails] = useState(false);
    const [discount, setDiscount] = useState();
    const {requestItem} = useAppContext();
    console.log('requestItem', requestItem);
    const handlePress = (item) => {
        console.log("handlePress",item)
        setSelectedFilter(item);
    };
    const handleSelect = (value) => {
      setSelected(value);
    };
    function renderItem({item}){
      console.log('item====', item);
      return(
        <View style={{width:'87%', height:200,backgroundColor:'rgba(255, 255, 255, 1)',borderRadius:8, alignSelf:'center',marginBottom:15,shadowColor: '#000',shadowOffset:{ width: 0,height: 2 },shadowOpacity: 0.25, shadowRadius: 3,elevation:6}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:20,marginTop:5}}>
            <Text style={{fontSize:14, color:'rgba(13, 20, 34, 1)', fontFamily:'PlusJakartaSans-Bold'}}>{item?.id}</Text>
            <Text style={{fontSize:12, color:'rgba(120, 126, 139, 1)', fontFamily:'PlusJakartaSans-Regular',right:20}}>{item?.date}</Text>
          </View>
          <View style={{flexDirection:'row',marginLeft:17,marginTop:5}}>
            {
              item?.type === 'Employee' ? (
                <View style={{flexDirection:'row', backgroundColor:'rgba(248, 249, 249, 1)',width:'30%', height:27,alignItems:'center',justifyContent:'center', borderRadius:4, borderColor:'rgba(239, 243, 249, 1)', borderWidth:1.5 }}>
                  <Image style={{width:15, height:15, marginHorizontal:5}} source={require('../../assets/images/employee.png')}></Image>
                  <Text style={{fontSize:10, color:'rgba(13, 20, 34, 1)', fontFamily:'PlusJakartaSans-Medium'}}>{item?.type}</Text>
                </View>
              ) : 
              <View style={{flexDirection:'row', backgroundColor:'rgba(248, 249, 249, 1)',width:'32%', height:27,alignItems:'center',justifyContent:'center', borderRadius:4, borderColor:'rgba(239, 243, 249, 1)', borderWidth:1.5 }}>
                <Image style={{width:13, height:13, marginHorizontal:5}} source={require('../../assets/images/non_employee.png')}></Image>
                <Text style={{fontSize:10, color:'rgba(13, 20, 34, 1)', fontFamily:'PlusJakartaSans-Medium'}}>{item?.type}</Text>
              </View>
            }
            <View style={{backgroundColor: item?.status === 'Approved' ? "rgba(40, 161, 56, 1)" : item?.status === 'Pending' ? 'rgba(223, 123, 0, 1)' : 'rgba(210, 28, 28, 1)', height:25, width:'29%', justifyContent:'center', alignItems:'center', marginLeft:10,borderRadius:4}}>
              <Text style={{color: item?.status === 'Approved' ? "rgba(225, 239, 226, 1)" : item?.status === 'Pending' ? 'rgba(252, 236, 218, 1)' : 'rgba(248, 226, 226, 1)',fontSize:12, fontFamily:"PlusJakartaSans-Medium"}}>{item?.status}</Text>
            </View>
          </View>
          <View style={{backgroundColor:'rgba(239, 243, 249, 1)',height:75, width:'90%', alignSelf:'center',marginTop:5,borderRadius:4, flexDirection:'row'}}>
            <View>
              <Text style={{color:'rgba(13, 20, 34, 1)', fontFamily:'PlusJakartaSans-Bold', fontSize:13,marginLeft:10,textAlign:'left',marginTop:15}}>{item?.discount}  Discount</Text>
              <Text style={{color:'rgba(11, 160, 220, 1)', fontFamily:'PlusJakartaSans-Bold', fontSize:18,marginLeft:10,textAlign:'left'}}>{item?.amount}</Text>
           </View>
           <Image style={{marginLeft:'auto'}} source={require('../../assets/images/green.png')}></Image>
          </View>
          <View>
            <View style={{flexDirection:'row', marginLeft:20,marginTop:9,justifyContent:'space-between'}}>
              <Text style={{color:'rgba(120, 126, 139, 1)', fontSize:13,fontFamily:'PlusJakartaSans-Regular'}}>Patient:</Text>
              <Text style={{color:'rgba(33, 39, 53, 1)',fontSize:13,fontFamily:'PlusJakartaSans-Medium', right:20}}>{item?.patient}</Text>
            </View>
            <View style={{flexDirection:'row', marginLeft:20,marginTop:5,justifyContent:'space-between'}}>
              <Text style={{color:'rgba(120, 126, 139, 1)', fontSize:13,fontFamily:'PlusJakartaSans-Regular'}}>Doctor:</Text>
              <Text style={{color:'rgba(33, 39, 53, 1)',fontSize:13,fontFamily:'PlusJakartaSans-Medium', right:20}}>{item?.doctor}</Text>
            </View>
          </View>
        </View>
      )
    }
    const cancelLogout = () => {
      setLogoutModalVisible(false);
    }
    function requestHandler(item) {
      console.log('item', item);
      setLogoutModalVisible(true);
    }
    function addRequestHandler(item) {
      console.log('item', item);
      setSelectedType(item)
      updateItem(item);
      navigation.navigate('PatientDetails');
      setLogoutModalVisible(false);
      setSelectedType('')
      
    }
    function applyHandler() {
      setShowDetails(true);
  }
    return(
       <SafeAreaView style={{flex:1, backgroundColor:'rgba(248, 249, 249, 1)'}}>
           <View style={{backgroundColor:'white', width:'100%', height:requestItem?.status === 'Pending' ? 162 : 102,marginTop:20}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Pressable onPress={() => navigation.goBack()}>
                     <Image style={{width:20, height:16,marginLeft:10}} source={require('../../assets/images/back_icon.png')}></Image>
                </Pressable>
                <View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'rgba(13, 20, 34, 1)',fontSize:20,fontFamily:'PlusJakartaSans-SemiBold',marginLeft:15,bottom:10}}>{requestItem?.request_id}</Text>
                        <Text style={{color:'rgba(120, 126, 139, 1)',fontSize:13,fontFamily:'PlusJakartaSans-SemiBold',marginLeft:10,bottom:2}}>{moment(requestItem?.discharge_date).format('DD MMM YYYY')}</Text>
                    </View>
                    <View style={{flexDirection:'row',marginLeft:17}}>
                        {
                        requestItem?.relation_type === 'Employee' ? (
                            <View style={{flexDirection:'row', backgroundColor:'rgba(248, 249, 249, 1)',width:'30%', height:27,alignItems:'center',justifyContent:'center', borderRadius:4, borderColor:'rgba(239, 243, 249, 1)', borderWidth:1.5 }}>
                            <Image style={{width:15, height:15, marginHorizontal:5}} source={require('../../assets/images/employee.png')}></Image>
                            <Text style={{fontSize:10, color:'rgba(13, 20, 34, 1)', fontFamily:'PlusJakartaSans-Medium'}}>{requestItem?.relation_type}</Text>
                            </View>
                        ) : 
                        <View style={{flexDirection:'row', backgroundColor:'rgba(248, 249, 249, 1)',width:'auto', height:27,alignItems:'center',justifyContent:'center', borderRadius:4, borderColor:'rgba(239, 243, 249, 1)', borderWidth:1.5 ,padding:5}}>
                            <Image style={{width:13, height:13, marginHorizontal:5}} source={require('../../assets/images/non_employee.png')}></Image>
                            <Text style={{fontSize:10, color:'rgba(13, 20, 34, 1)', fontFamily:'PlusJakartaSans-Medium'}}>{requestItem?.relation_type}</Text>
                        </View>
                        }
                        <View style={{backgroundColor: requestItem?.status === 'Approved' ? "rgba(40, 161, 56, 1)" : requestItem?.status === 'Pending' ? 'rgba(223, 123, 0, 1)' : 'rgba(210, 28, 28, 1)', height:25, width:'29%', justifyContent:'center', alignItems:'center', marginLeft:10,borderRadius:4}}>
                            <Text style={{color: requestItem?.status === 'Approved' ? "rgba(225, 239, 226, 1)" : requestItem?.status === 'Pending' ? 'rgba(252, 236, 218, 1)' : 'rgba(248, 226, 226, 1)',fontSize:12, fontFamily:"PlusJakartaSans-Medium"}}>{requestItem?.status}</Text>
                        </View>
                    </View>
                </View>
              </View>
                {
                  requestItem?.status === 'Pending' && (
                    <View style={{flexDirection:'row',marginTop:Platform.OS === 'ios' ? 30 : 30,height:30, width:'90%',alignItems:'center', justifyContent:'space-evenly',alignSelf:'center'}}>
                      <Pressable style={{backgroundColor:'rgba(248, 226, 226, 1)', width:'50%', height:52, borderRadius:10,alignItems:'center',justifyContent:'center', borderColor:'rgba(239, 243, 249, 1)', borderWidth:1.5}}>
                        <Text style={{color:'rgba(137, 11, 11, 1)', fontSize:14,fontFamily:'PlusJakartaSans-Medium'}}>Cancel Request</Text>
                      </Pressable>
                      <Pressable style={{backgroundColor:'rgba(231, 246, 252, 1)', width:'50%', height:52, borderRadius:10,alignItems:'center',justifyContent:'center', marginLeft:10}} onPress={() => continueHandler()}>
                        <Text style={{color:'rgba(12, 97, 134, 1)', fontSize:14,fontFamily:'PlusJakartaSans-Medium'}}>Change MD</Text>
                      </Pressable>
                    </View>
                  )
                }
           </View>
           <ScrollView style={{width:'92%',alignSelf:'center'}}>
            <View>
                {
                    requestItem?.status === 'Approved' ? (
                        <View style={{backgroundColor:'rgba(225, 239, 226, 1)',width:'95%',height:79,alignSelf:'center',borderRadius:8, borderColor:'rgba(40, 161, 56, 1)',borderWidth:1,justifyContent:'center'}}>
                          <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image style={{width:20, height:20,marginLeft:10}} source={require('../../assets/images/request_approve.png')}></Image>
                            <Text style={{color:'rgba(39, 104, 49, 1)',fontSize:16,fontFamily:'PlusJakartaSans-Bold',marginLeft:10,bottom:2}}>Approved Request</Text>
                          </View>
                          <Text style={{color:'rgba(13, 20, 34, 1)',fontSize:14,fontFamily:'PlusJakartaSans-Medium',marginLeft:10}}>This request has been approved.</Text>
                        </View>
                    ) : requestItem?.status === 'Pending' ? (
                        <View style={{backgroundColor:'rgba(252, 236, 218, 1)',width:'95%',height:79,alignSelf:'center',borderRadius:8, borderColor:'rgba(223, 123, 0, 1)',borderWidth:1,justifyContent:'center'}}>
                          <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image style={{width:20, height:20,marginLeft:10}} source={require('../../assets/images/request_pending.png')}></Image>
                            <Text style={{color:'rgba(167, 84, 0, 1)',fontSize:16,fontFamily:'PlusJakartaSans-Bold',marginLeft:10,bottom:2}}>Pending Request</Text>
                          </View>
                          <Text style={{color:'rgba(13, 20, 34, 1)',fontSize:14,fontFamily:'PlusJakartaSans-Medium',marginLeft:10}}>This request is currently pending approval.</Text>
                        </View>
                    ):
                    (
                        <View style={{backgroundColor:'rgba(248, 226, 226, 1)',width:'95%',height:85,alignSelf:'center',borderRadius:8, borderColor:'rgba(210, 28, 28, 1)',borderWidth:1,justifyContent:'center'}}>
                          <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image style={{width:20, height:20,marginLeft:10}} source={require('../../assets/images/request_reject.png')}></Image>
                            <Text style={{color:'rgba(137, 11, 11, 1)',fontSize:16,fontFamily:'PlusJakartaSans-Bold',marginLeft:10,bottom:2}}>Rejected Request</Text>
                          </View>
                          <Text style={{color:'rgba(13, 20, 34, 1)',fontSize:14,fontFamily:'PlusJakartaSans-Medium',marginLeft:10}}>This request has been rejected and will not proceed further.</Text>
                        </View>
                    )
                }
            </View>
            <View style={{backgroundColor:"rgba(22, 32, 55, 1)", width:'95%', height:'auto', borderRadius:8, padding:10,alignSelf:'center',marginTop:10}}>
              <View>
                  <View style={{ flexDirection: 'row', marginLeft: 10, justifyContent: 'space-between' }}>
                      <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Patient:</Text>
                      <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium', right: 10 }}>{requestItem?.bill_details?.data?.patient_name}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 9, justifyContent: 'space-between' }}>
                      <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Patient Visit Type:</Text>
                      <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium', right: 10 }}>{requestItem?.patient_visit_type}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 9, justifyContent: 'space-between' }}>
                      <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Doctor:</Text>
                      <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium', right: 10 }}>{requestItem?.doctor}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 9, justifyContent: 'space-between' }}>
                      <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Admission Date:</Text>
                      <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium', right: 10 }}>{requestItem?.admission_date}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 9, justifyContent: 'space-between' }}>
                      <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Initiated By:</Text>
                      <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium', right: 10 }}>Vikas Tiwari</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 9, justifyContent: 'space-between',marginBottom:7 }}>
                      <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Approval Authority:</Text>
                      <Text style={{ color: 'rgba(255, 255, 255, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium', right: 10 }}>Vishwas Patel</Text>
                  </View>
                </View>
            </View>
            <View style={{ marginTop: 15, backgroundColor: 'rgba(255, 255, 255, 1)', width: '93%', height: 'auto', borderRadius: 10, padding: 10, alignSelf: 'center', borderColor: 'rgba(239, 243, 249, 1)', borderWidth: 1 }}>
                <View>
                    <View style={{ flexDirection: 'row', marginLeft: 20, justifyContent: 'space-between' }}>
                        <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Original Amount:</Text>
                        <Text style={{ color: 'rgba(33, 39, 53, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium', right: 20 }}>Rs 50,000 /-</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 5, justifyContent: 'space-between' }}>
                        <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Discount:(50%)</Text>
                        <Text style={{ color: 'rgba(40, 161, 56, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium', right: 20 }}>Rs 12,500 /-</Text>
                    </View>
                </View>
                <View style={styles.discountContainer}>
                    <ImageBackground style={{ width: '100%',height: '100%',alignItems: 'center',flexDirection: 'row'}} source={require('../../assets/images/total_discount.png')}>
                        <Image style={styles.discountIcon} source={require('../../assets/images/discount_green.png')} />
                        <View style={styles.discountText}>
                            <Text style={styles.discountTitle}>Total After Discount</Text>
                            <Text style={styles.discountNumber}>Rs 50,000 /-</Text>
                        </View>        
                    </ImageBackground>
                </View>
            </View>
            <View style={{ marginTop: 15, backgroundColor: 'rgba(255, 255, 255, 1)', width: '93%', height: 'auto', borderRadius: 10, padding: 10, alignSelf: 'center', borderColor: 'rgba(239, 243, 249, 1)', borderWidth: 1 }}>
                    <View>
                        <View style={{ marginLeft: 10, justifyContent: 'space-between' }}>
                            <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Tentative Discharge Date:</Text>
                            <Text style={{ color: 'rgba(33, 39, 53, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium',marginTop:2}}>12 JAN, 2024</Text>
                        </View>
                        <View style={{ marginLeft: 10, marginTop: 5, justifyContent: 'space-between' }}>
                            <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Referred By:</Text>
                            <Text style={{ color: 'rgba(33, 39, 53, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium',marginTop:2 }}>Rahul Choudhary</Text>
                        </View>
                        <View style={{ marginLeft: 10, marginTop: 5, justifyContent: 'space-between' ,marginBottom:7}}>
                            <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Treatment Description:</Text>
                            <Text style={{ color: 'rgba(33, 39, 53, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium',marginTop:2 }}>Routine check-up</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 15, backgroundColor: 'rgba(255, 255, 255, 1)', width: '93%', height: 'auto', borderRadius: 10, padding: 10, alignSelf: 'center', borderColor: 'rgba(239, 243, 249, 1)', borderWidth: 1,marginBottom:110 }}>
                    <View>
                        <View style={{ marginLeft: 10, justifyContent: 'space-between' }}>
                            <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Total Paid Amount to Date </Text>
                            <Text style={{ color: 'rgba(33, 39, 53, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-SemiBold',marginTop:5}}>Rs 50,000 /-</Text>
                            <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 10, fontFamily: 'PlusJakartaSans-SemiBold',marginTop:5 }}>04 OCT, 2023</Text>
                        </View>
                    </View>
                </View>
           </ScrollView>
           {
            requestItem?.status === 'Pending' && (
              <View style={{position: 'absolute', bottom: 0,left: 0,right: 0,paddingBottom: Platform.OS === 'ios' ? 20 : 30,justifyContent:'center', alignItems:'center'}}>
                <Pressable style={{backgroundColor:'rgba(62, 70, 89, 1)', width:'90%', height:52, borderRadius:10,alignItems:'center', flexDirection:'row'}} onPress={requestHandler}>
                  <Text style={{color:"rgba(231, 246, 252, 1)", fontSize:14, fontFamily:'PlusJakartaSans-Bold',marginLeft:10}}>Modify</Text>
                  <Image style={{width:20, height:19,marginLeft:'auto',right:10}} source={require('../../assets/images/modify_icon.png')}></Image>
                </Pressable>
              </View>
            )
           }
            <Modal isVisible={isLogoutModalVisible}
            hasBackdrop={true}
            backdropColor="black"
            backdropOpacity={0.70}
            onBackdropPress={() => setLogoutModalVisible(!isLogoutModalVisible)}
            width={'100%'}
            style={{ alignItems: 'center', justifyContent: 'flex-end', margin: 0 }}>
                <View style={styles.model}>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{color:'rgba(33, 39, 53, 1)', fontSize:18,fontFamily:'PlusJakartaSans-SemiBold',bottom:7}}>Modify Discount</Text>
                    <Text style={{color:'rgba(1, 114, 203, 1)', fontSize:10,marginLeft:90,textDecorationLine:'underline',fontFamily:'PlusJakartaSans-Bold'}}>RESET CHANGES</Text>
                    <Pressable style={{ marginLeft:'auto', bottom:5}} onPress={cancelLogout}>
                      <Image style={{width:28, height:28,}} source={require('../../assets/images/close_icon.png')}></Image>
                    </Pressable>
                  </View>
                  <View style={{margin:2, width:'99%'}}>
                    <Text style={{color:'rgba(13, 20, 34, 1)',fontSize:14, fontFamily:'PlusJakartaSans-SemiBold',marginTop:10}}>Discount Percentage
                        <Text style={{ color: 'red' }}> {'*'}</Text>
                    </Text>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <TextInput 
                           value={discount}
                           onChangeText={(text) => setDiscount(text)}
                           style={{backgroundColor:'rgba(255, 255, 255, 1)', width:'65%', height:44, borderRadius:10, padding:10, color:'black', fontSize:14, fontFamily:'PlusJakartaSans-Medium',borderColor:'rgba(239, 243, 249, 1)', borderWidth:1}}
                           placeholder="Enter Discount Percentage"
                           placeholderTextColor='rgba(120, 126, 139, 1)'>
                        </TextInput>
                        <Pressable style={{backgroundColor:'rgba(22, 32, 55, 1)',width:97, height:43, borderRadius:8, padding:10, marginLeft:15}} onPress={applyHandler}>
                            <Text style={{color:'rgba(239, 243, 249, 1)', fontSize:12, textAlign:'center', fontFamily:'PlusJakartaSans-Medium'}}>Apply</Text>
                        </Pressable>
                    </View>
                </View>
                {
                    showDetails && (
                        <>
                        <View style={{ marginTop: 15, backgroundColor: 'rgba(255, 255, 255, 1)', width: '97%', height: 'auto', borderRadius: 10, padding: 7, alignSelf: 'center', borderColor: 'rgba(239, 243, 249, 1)', borderWidth: 1 }}>
                            <View>
                                <View style={{ flexDirection: 'row', marginLeft: 10, justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Estimated Discount:(50%)</Text>
                                    <Text style={{ color: 'rgba(40, 161, 56, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium', right: 10 }}>Rs 12,500 /-</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5, justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Original Bill Amount:</Text>
                                    <Text style={{ color: 'rgba(33, 39, 53, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium', right: 10 }}>Rs 50,000 /-</Text>
                                </View>
                            </View>
                            <View style={styles.discountContainer}>
                              <ImageBackground style={{ width: '100%',height: '100%',alignItems: 'center',flexDirection: 'row',borderRadius:10}} source={require('../../assets/images/total_discount.png')}>
                                  <Image style={styles.discountIcon} source={require('../../assets/images/discount_green.png')} />
                                  <View style={styles.discountText}>
                                      <Text style={styles.discountTitle}>Total After Discount</Text>
                                      <Text style={styles.discountNumber}>Rs 50,000 /-</Text>
                                  </View>        
                              </ImageBackground>
                          </View>
                        </View>
                       
                      <Pressable style={{ backgroundColor: 'rgba(11, 160, 220, 1)', width: '95%', height: 44, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 25, borderRadius: 5 }}>
                          <Text style={{ fontSize: 16, color: 'rgba(255, 255, 255, 1)', fontFamily: 'PlusJakartaSans-Medium' }}>Confirm</Text>
                      </Pressable>
                        </>
                    )
                }
                </View>
            </Modal>
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
      backgroundColor: 'rgba(28, 42, 73, 1)',
      width: '93%',
      height: 84,
      alignSelf: 'center',
      marginTop: 20,
      // borderRadius: 16,
      // borderTopLeftRadius: 16,
      alignItems: 'center',
      flexDirection: 'row',
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
      color: 'rgba(37, 53, 3, 1)',
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
    height: 420,
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
export default RequestExpandScreen;