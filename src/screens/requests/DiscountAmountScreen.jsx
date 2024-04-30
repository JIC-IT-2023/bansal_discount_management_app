import { Text,View , SafeAreaView,Pressable,ImageBackground,Image,TextInput,ScrollView,StyleSheet, Keyboard} from "react-native";
import BackIcon from "../../assets/icons/BackIcon";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import CustomDatePicker from "../../components/CustomDatePicker";
import { useAppContext } from "../../context/AppContext";
import { RequestApi } from "../../services/request/RequestServices";
import { Dropdown } from "react-native-element-dropdown";


function DiscountAmountScreen(){
    const navigation = useNavigation();
    const [director, setDirector] = useState();
    const [showDetails, setShowDetails] = useState(false);
    const [discount, setDiscount] = useState();
    const [discountError, setDiscountError] = useState(false);
    const [discountValue, setDiscountValue] = useState();
    const [total, setTotal] = useState();
    const {item , billDetails, updateDiscount} = useAppContext();
    const [md, setMd] = useState([]);
    const [directorError, setDirectorError] =useState(false);
    console.log('bill===', billDetails );
    
    useEffect(() => {
       getMD();
    },[])
    function getMD(){
        RequestApi.getMdDetails().then((res) =>{
            console.log(res.data.results);
            if(res.status === 200){
                setMd(res.data.results);
            }
        })
    }
    function applyHandler() {
        Keyboard.dismiss();
        let isValid = true
        if(!discount){
           isValid = false;
            setDiscountError(true);
        }
        if(isValid){
            const value = billDetails?.total_unpaid_amount * discount / 100;
            setDiscountValue(value);
            const total_value = billDetails?.total_unpaid_amount - value;
            console.log('valie====', discountValue, total_value);
            setTotal(total_value);
            setShowDetails(true);
        }
        // setShowDetails(true);
    }
    const handleSelect = (value) => {
        setDirector(value);
      };
    const md_list = md.map((list) => ({
        value : list?.id,
        label : list?.name
    }))
    function continueHandler(){
        Keyboard.dismiss();
        let isValid = true;
        if(!discount){
            setDiscountError(true);
            isValid =  false;
        }
        if(!director){
          setDirectorError(true);
          isValid = false;
        }
        if(isValid){
          updateDiscount({
            discount : discount,
            discount_value : discountValue,
            total_amount : total,
            director : director
          })
          navigation.navigate('Review')
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
                            <Image style={{width:65, height:8, marginTop:40}} source={require('../../assets/images/progress_active.png')}></Image>
                            <Text style={{color:'white', fontSize:35, textAlign:'center', bottom:25}}>.</Text>
                            <Text style={{fontSize:12, color:'rgba(255, 255, 255, 1)', bottom:29, textAlign:'center', fontFamily: 'PlusJakartaSans-Medium'}}>Additi. Info</Text>
                        </View>
                        <View>
                            <Image style={{width:65, height:8, marginTop:40}} source={require('../../assets/images/progress_half.png')}></Image>
                            <Text style={{color:'white', fontSize:35, textAlign:'center', bottom:25}}>.</Text>
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
                    <Text style={{color:'rgba(13, 20, 34, 1)', fontSize:22,fontFamily: 'PlusJakartaSans-Medium'}}>Choose Discount Amount</Text>
                    <Text style={{color:'rgba(115, 127, 153, 1)', fontSize:14,fontFamily: 'PlusJakartaSans-Regular',marginTop:7,letterSpacing:0.5}}>Now, let's determine the discount amount for the  request.</Text>
                </View>
                <View style={{margin:10, width:'95%'}}>
                    <Text style={{color:'rgba(13, 20, 34, 1)',fontSize:14, fontFamily:'PlusJakartaSans-SemiBold',marginTop:10,marginLeft:7}}>Discount Percentage
                        <Text style={{ color: 'red' }}> {'*'}</Text>
                    </Text>
                    <View style={{flexDirection:'row',marginTop:10,marginLeft:8}}>
                        <TextInput 
                           value={discount}
                           onChangeText={(text) => setDiscount(text)}
                           style={{backgroundColor:'rgba(255, 255, 255, 1)', width:'65%', height:44, borderRadius:10, padding:10, color:'black', fontSize:14, fontFamily:'PlusJakartaSans-Medium'}}
                           placeholder="Enter Discount Percentage"
                           placeholderTextColor='rgba(120, 126, 139, 1)'
                           onFocus={() => setDiscountError(false)}
                           keyboardType='numeric'>
                        </TextInput>
                        <Pressable style={{backgroundColor:'rgba(22, 32, 55, 1)',width:97, height:43, borderRadius:8, padding:10, marginLeft:15}} onPress={applyHandler}>
                            <Text style={{color:'rgba(239, 243, 249, 1)', fontSize:12, textAlign:'center', fontFamily:'PlusJakartaSans-Medium'}}>Apply</Text>
                        </Pressable>
                    </View>
                    {
                        discountError && <Text style={{color:'red', fontSize:13,fontFamily:'PlusJakartaSans-Medium',margin:10}}>Enter valid Discount Percent</Text>
                    }
                </View>
                {
                    showDetails && (
                        <>
                        <View style={{ marginTop: 15, backgroundColor: 'rgba(255, 255, 255, 1)', width: '90%', height: 'auto', borderRadius: 10, padding: 10, alignSelf: 'center', borderColor: 'rgba(239, 243, 249, 1)', borderWidth: 1 }}>
                            <View>
                                <View style={{ flexDirection: 'row', marginLeft: 20, justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Estimated Discount:({discount}%)</Text>
                                    <Text style={{ color: 'rgba(40, 161, 56, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium', right: 20 }}>Rs {discountValue} /-</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 5, justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Regular' }}>Total Unpaid Amount:</Text>
                                    <Text style={{ color: 'rgba(33, 39, 53, 1)', fontSize: 13, fontFamily: 'PlusJakartaSans-Medium', right: 20 }}>Rs {billDetails?.total_unpaid_amount} /-</Text>
                                </View>
                            </View>
                            <View style={styles.discountContainer}>
                                <ImageBackground style={{ width: '100%',height: '100%',alignItems: 'center',flexDirection: 'row'}} source={require('../../assets/images/total_discount.png')}>
                                    <Image style={styles.discountIcon} source={require('../../assets/images/discount_green.png')} />
                                    <View style={styles.discountText}>
                                        <Text style={styles.discountTitle}>Total After Discount</Text>
                                        <Text style={styles.discountNumber}>Rs {total} /-</Text>
                                    </View>        
                                </ImageBackground>
                            </View>
                        </View>
                       {item !== 'Employee' &&
                        <View style={{ marginLeft:15, width: '93%', marginBottom: 100,alignSelf:'center' }}>
                            <Text style={{ color: 'rgba(13, 20, 34, 1)', fontSize: 14, fontFamily: 'PlusJakartaSans-SemiBold', marginTop: 10, marginLeft: 7, marginBottom: 10 }}>Managing Director
                                <Text style={{ color: 'red' }}> {'*'}</Text>
                            </Text>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={[styles.selectedTextStyle]}
                                iconStyle={styles.iconStyle}
                                // iconColor= {disable ? GlobalColors.iconActive : GlobalColors.iconUnActive } 
                                data={md_list}
                                maxHeight={300}
                                // activeColor={selectedValue ? GlobalColors.activeColor : undefined}
                                itemTextStyle={styles.itemTextStyle}
                                placeholder='Select'
                                value={director}
                                labelField='label'
                                valueField='value'
                                // onFocus={() => setIsFocus(true)}
                                // onBlur={() => setIsFocus(false)}
                                onChange={handleSelect}
                                onFocus={() => setDirectorError(false)}
                            />
                            {
                                directorError && <Text style={{color:'red', fontSize:13,fontFamily:'PlusJakartaSans-Medium',margin:10}}>Please select Managing Director</Text>
                            }
                        </View>
                        }
                        </>
                    )
                }
            </ScrollView>
            {/* <CustomDatePicker isVisible={open}/> */}
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
      width: '94%',
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 6,
      height: 44,
      alignSelf:'center',
      right:5,
    //   shadowColor: '#000',
    //   shadowOffset:{ width: 0,height: 2 },
    //   shadowOpacity: 0.25, 
    //   shadowRadius: 3,
    //   elevation:6
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

export default DiscountAmountScreen;