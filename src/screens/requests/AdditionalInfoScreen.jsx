import { Text,View , SafeAreaView,Pressable,ImageBackground,Image,TextInput,ScrollView,StyleSheet, Keyboard} from "react-native";
import BackIcon from "../../assets/icons/BackIcon";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import CustomDatePicker from "../../components/CustomDatePicker";
import { useAppContext } from "../../context/AppContext";
import Modal from 'react-native-modal';
import CalendarPicker from "react-native-calendar-picker";
import moment from 'moment';



function AdditionalInfoScreen(){
    const navigation = useNavigation();
    const [referBy, setReferBy] = useState();
    const [desc, setDesc] = useState();
    const [open, setOpen] = useState(false)
    const {item, updateInfo} = useAppContext();
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedDateForModal, setSelectedDateForModal] = useState(null);
    const [ dateError, setDateError] = useState(false);
    const [referError, setReferError] = useState(false);
    const [descError, setDescError] = useState(false);

    useEffect(() => {
        // Set the selectedStartDate from the stored selected date when the modal is opened
        if (open && selectedDateForModal) {
            setSelectedStartDate(selectedDateForModal);
        }
    }, [open, selectedDateForModal]);

     const onDateChange = (date) => {
        setSelectedStartDate(date);
        setSelectedDateForModal(date); // Store the selected date
        setOpen(false); // Close the modal
    };

    const startDate = selectedStartDate ? moment(selectedStartDate).format('DD-MM-YYYY'): 'Choose date';

    function onChangeDateHandler(){
        setOpen(true);
        setDateError(false)
    }
    function continueHandler(){
      Keyboard.dismiss();
      let isValid = true;
      if(startDate == 'Choose date'){
          setDateError(true);
          isValid =  false;
      }
      if(!referBy){
         setReferError(true);
         isValid = false;
      }
      if(!desc){
        setDescError(true);
        isValid = false;
      }
      if(isValid){
        updateInfo({
           tentative: startDate,
           referBy : referBy,
           description: desc
        })
        navigation.navigate('DiscountAmount')
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
                            <Image style={{width:65, height:8, marginTop:40}} source={require('../../assets/images/progress_half.png')}></Image>
                            <Text style={{color:'white', fontSize:35, textAlign:'center', bottom:25}}>.</Text>
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
                <View style={{margin:13}}>
                    <Text style={{color:'rgba(13, 20, 34, 1)', fontSize:22,fontFamily: 'PlusJakartaSans-Medium'}}>Additional Information</Text>
                    <Text style={{color:'rgba(115, 127, 153, 1)', fontSize:14,fontFamily: 'PlusJakartaSans-Regular',marginTop:7,letterSpacing:0.5}}>Provide additional details to complete your {item === "Employee" ? 'Employee' : 'Non-Employee'} discount request.</Text>
                </View>
                <View style={{margin:13}}>
                    <Text style={{color:'rgba(13, 20, 34, 1)',fontSize:14, fontFamily:'PlusJakartaSans-SemiBold',marginTop:10,marginLeft:7}}>Tentative Discharge Date
                        <Text style={{ color: 'red' }}> {'*'}</Text>
                    </Text>
                    <Pressable style={{flexDirection:'row', width:'98%', height:44, backgroundColor:'white',alignSelf:'center',alignItems:'center',borderRadius:10,marginTop:10}} onPress={onChangeDateHandler} onFocus={() => setDateError(false)}>
                        <Text style={{color:'black', fontSize:14, fontFamily:'PlusJakartaSans-Medium',marginLeft:10}}>{startDate}</Text>
                        <Image style={{width:20, height:20, marginLeft:'auto', right:20}} source={require('../../assets/images/date_icon.png')}></Image>
                    </Pressable>
                    {
                        dateError && <Text style={{color:'red', fontSize:13,fontFamily:'PlusJakartaSans-Medium',margin:5}}>Please select Date</Text>
                    }
                </View>
                <View style={{margin:7, width:'95%',marginBottom:100,alignSelf:'center' }}>
                    <Text style={{color:'rgba(13, 20, 34, 1)',fontSize:14, fontFamily:'PlusJakartaSans-SemiBold',marginTop:10,marginLeft:7,marginBottom:10}}>Referred By
                        <Text style={{ color: 'red' }}> {'*'}</Text>
                    </Text>
                    <TextInput 
                        value={referBy}
                        onChangeText={(text) => setReferBy(text)}
                        style={{backgroundColor:'rgba(255, 255, 255, 1)', width:'95%', height:44, borderRadius:10, padding:10, color:'black', fontSize:14, fontFamily:'PlusJakartaSans-Medium',marginLeft:7}}
                        placeholder="Name of the referrer"
                        placeholderTextColor='rgba(120, 126, 139, 1)'
                        onFocus={() => setReferError(false)}>
                    </TextInput>
                    {
                        referError && <Text style={{color:'red', fontSize:13,fontFamily:'PlusJakartaSans-Medium',margin:5}}>Enter valid Referral Name</Text>
                    }
                    <Text style={{color:'rgba(13, 20, 34, 1)',fontSize:14, fontFamily:'PlusJakartaSans-SemiBold',marginTop:15,marginLeft:7,marginBottom:10}}>Treatment Description
                        <Text style={{ color: 'red' }}> {'*'}</Text>
                    </Text>
                    <TextInput 
                        value={desc}
                        onChangeText={(text) => setDesc(text)}
                        style={{backgroundColor:'rgba(255, 255, 255, 1)', width:'95%', height:200, borderRadius:10, color:'black', fontSize:14, fontFamily:'PlusJakartaSans-Medium', textAlignVertical:'top',padding:10,marginBottom: dateError ? 0 : 30,marginLeft:7}}
                        placeholder="Description of the treatment"
                        placeholderTextColor='rgba(120, 126, 139, 1)'
                        multiline={true}
                        onFocus={() => setDescError(false) }>
                    </TextInput>
                    {
                        descError && <Text style={{color:'red', fontSize:13,fontFamily:'PlusJakartaSans-Medium', marginBottom:30,marginTop:5}}>Enter valid Description</Text>
                    }
                </View>
            </ScrollView>
            <Modal isVisible={open}
              hasBackdrop={true}
              backdropColor="black"
              backdropOpacity={0.70}
              onBackdropPress={() => setOpen(!open)}
              width={'100%'}
              style={{ alignItems: 'center', justifyContent: 'flex-end', margin: 0 }}>
              <View style={styles.model}>
                <CalendarPicker onDateChange={onDateChange} 
                  todayBackgroundColor="white"
                  todayTextStyle={{color:'black'}}
                  selectedDayColor="#7300e6"
                  selectedDayTextColor="black"
                  selectedDayStyle={{backgroundColor: 'rgba(11, 160, 220, 1)'}}
                  minDate={Date.now()}
                  selectedStartDate={selectedStartDate} />
                {/* <View>
                  <Text>SELECTED DATE: {startDate}</Text>
                </View> */}
              </View>
            </Modal>
            <View style={{position: 'absolute', bottom: 0,left: 0,right: 0,backgroundColor: 'rgba(255, 255, 255, 1)',paddingBottom: Platform.OS === 'ios' ? 15 : 30,justifyContent:'center', alignItems:'center', width:'100%', height:100, borderTopRightRadius:16, borderTopLeftRadius:16,shadowColor: '#000',shadowOffset:{ width: 0,height: 2 },shadowOpacity: 0.25, shadowRadius: 3,elevation:10}}>
                <View style={{flexDirection:'row',marginTop:Platform.OS === 'ios' ? 30 : 30,height:30, width:'85%',alignItems:'center', justifyContent:'space-evenly'}}>
                    <Pressable style={{backgroundColor:'rgba(255, 255, 255, 1)', width:'50%', height:52, borderRadius:10,alignItems:'center',justifyContent:'center', borderColor:'rgba(239, 243, 249, 1)', borderWidth:1.5}} onPress={() => navigation.navigate('Requests')}>
                        <Text style={{color:'rgba(13, 20, 34, 1)', fontSize:14,fontFamily:'PlusJakartaSans-Medium'}}>Cancel</Text>
                    </Pressable>
                    <Pressable style={{backgroundColor:'rgba(11, 160, 220, 1)', width:'50%', height:52, borderRadius:10,alignItems:'center',justifyContent:'center', marginLeft:10}} onPress={continueHandler}>
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
  height: 375,
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

export default AdditionalInfoScreen;