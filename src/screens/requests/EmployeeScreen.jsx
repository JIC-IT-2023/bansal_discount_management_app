import { ImageBackground, SafeAreaView, ScrollView, Text,View, StyleSheet,Image,Pressable,TextInput, PermissionsAndroid, Alert, Keyboard} from "react-native";
import BackIcon from "../../assets/icons/BackIcon";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../context/AppContext";
import { Dropdown } from "react-native-element-dropdown";
import { RequestApi } from "../../services/request/RequestServices";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment';

function EmployeeScreen(){
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState('Employee');
    const [name, setName] = useState();
    const [showDetails, setShowDetails] = useState(false);
    const [employeeId, setEmployeeId] = useState();
    const [fileName, setFileName] = useState('Upload Image');
    const [file, setFile] = useState({});
    const {item, updateEmployeeDetails} = useAppContext();
    const [companyList, setCompanyList] = useState([])
    const [selected, setSelected] = useState("");
    // const genderOptions = [
    //     { label: 'Spouse', value: '1' },
    //     { label: 'Son', value: '2' },
    //     { label: 'Daughter', value: '3' },
    //     { label: 'Father', value: '4' },
    //     { label: 'Mother', value: '5' }
    //   ];
    const [relationList, setRelationList] = useState();
    const [relation, setRelation] = useState();
    const [companyError, setCompanyError] = useState(false);
    const [relationError, setRelationError] = useState(false);
    const [nameError, setnameError] = useState(false);
    const[idError, setIdError] = useState(false);
    const [imageError, setImageError] =useState(false);
    const company_data = companyList?.map((item) => ({
        label : item?.name,
        value : item?.id
    }))
    const relation_data = relationList?.map((item) => ({
        label : item?.name,
        value : item?.id
    }))
    const handleSelect = (value) => {
        setCompanyError(false);
        setSelected(value);
    };
    const selectedRelation = (value) => {
        setRelationError(false)
        setRelation(value);
    };
    useEffect(() => {
        getEmployerDetails();
        getRelationshipDetails();
    },[])
    console.log('item====', item);
    function getEmployerDetails(){
        RequestApi.getEmployer().then((res) => {
            console.log('ressss=====', res.data);
            if(res.status === 200){
                setCompanyList(res.data.results);
            }
        })
    }
    function getRelationshipDetails(){
        RequestApi.getRelation().then((res) => {
            console.log('ressss=====', res.data.results);
            if(res.status === 200){
                const data = res.data.results.filter(item => item.is_active)
                setRelationList(data);
            }
        })
    }
    const handleOptionSelection = (option) => {
        console.log('option====', option);
        setSelectedOption(option);
        if(option === 'Dependant'){
            setShowDetails(true);
        }
        else{
            setShowDetails(false);
        }
    };
    // function getDetailsHandler() {
    //     setShowDetails(true);
    // }
    function continueHandler() {
        Keyboard.dismiss();
        let isValid = true;
        if(!selected &&selected === ''){
            setCompanyError(true);
            isValid = false;
        }
        if(selectedOption === 'Dependant' && !relation){
            setRelationError(true);
            isValid = false;
        }
        if(!name){
            setnameError(true);
            isValid = false;
        }
        if(!employeeId){
            setIdError(true);
            isValid = false;
        }
        if(!fileName || fileName === 'Upload Image'){
            setImageError(true);
            isValid = false;
        }
        if(isValid){
            updateEmployeeDetails({
                employer : selected,
                patient_type : selectedOption,
                name : name,
                employeeId : employeeId,
                image: file,
                relation : relation
            })
            navigation.navigate('AdditionalInfo')
        }
    }
    const options = {
        storageOptions: {
            path: 'images',
            mediaType: 'photo',
            
        },
        
        
    };
    async function cameraHandler() {
        setImageError(false);
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        if (granted == PermissionsAndroid.RESULTS.GRANTED) {
            launchCamera(options,(response) => {
                console.log('Response = ', response);
        
                if (response.didCancel) {
                  Alert.alert("Cancelled")
                  return;
                } else if (response.errorCode == 'camera_unavailable') {
                    Alert.alert("Camera Unavailable")
                  return;
                } else if (response.errorCode == 'permission') {
                    Alert.alert("Camera Permission required")
                  return;
                } else if (response.errorCode == 'others') {
                    //alert(response.errorMessage);
                    Alert.alert("Try Again")
                  return;
                }
                
                
                const result = response.assets.map((item) => {
                    let fileName = `bansalhospital_${moment(Date.now()).format('YYYYMMDD_HHmm')}.jpg`;
                    if (Platform.OS === 'ios') {
                        const uriParts = result.split('.');
                        const fileExtension = uriParts[uriParts.length - 1];
                        fileName = `bansalhospital_${item.fileName}.${fileExtension}`;
                    }
                    setFileName(fileName);
                    console.log(item)
                    const image = {
                        uri: item.uri,
                        type: item.type,
                        name: fileName
                    }
                    setFile(image)
                    return item.uri; 
                });
             
                
                
                console.log('result',fileName)
                
               
                
                
            });
            
        }
        // setShowImageName(true);
        // setModalVisible(false)
    }
    // async function cameraHandler(){
    //     try {
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.CAMERA,
    //         {
    //           title: "App Camera Permission",
    //           message: "App needs access to your camera ",
    //           buttonNeutral: "Ask Me Later",
    //           buttonNegative: "Cancel",
    //           buttonPositive: "OK"
    //         }
    //       );
    //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //         ImagePicker.openCamera({
    //           width: 400,
    //           height: 500,
    //           cropping: false,
    //           mediaType : 'photo',
    //         //   freeStyleCropEnabled : true,
    //           //compressImageQuality : 0.8,
    //           includeBase64: true,
    //           includeExif: true,
    //         }).then(image => {
    //           console.log(('image===', image));
    //            const imageUri = image.path;
    //             var bodyFormData = new FormData();
    //             bodyFormData.append('image', {
    //               uri: imageUri,
    //               type: 'image/jpeg', 
    //               name: 'photo.jpeg', 
    //             });
    //             //  setIsLoading(true)
    //         }).catch((e) => {
    //           console.log(e)
    //         //   setIsLoading(false)
    //           //setModalVisible(false)
    //           //updateFileInfo(null)
    //         });
    //       } else {
    //         //console.log("Camera permission denied");
    //       }
    //     } catch (err) {
    //       console.warn(err);
    //     }
    //   }
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
                            <Image style={{width:65, height:8, marginTop:40}} source={require('../../assets/images/progress_half.png')}></Image>
                            <Text style={{color:'white', fontSize:35, textAlign:'center', bottom:25}}>.</Text>
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
                    <Text style={{color:'rgba(13, 20, 34, 1)', fontSize:22,fontFamily: 'PlusJakartaSans-Medium'}}>Employee Details</Text>
                    <Text style={{color:'rgba(115, 127, 153, 1)', fontSize:14,fontFamily: 'PlusJakartaSans-Regular',marginTop:7,letterSpacing:0.5}}>Now, let's identify the employee for whom you're requesting a discount.</Text>
                </View>
                <View style={{margin:10}}>
                    <Text style={{color:'rgba(13, 20, 34, 1)',fontSize:14, fontFamily:'PlusJakartaSans-SemiBold',marginTop:10,marginLeft:7}}>Employer
                        <Text style={{ color: 'red' }}> {'*'}</Text>
                    </Text>
                    <View style={{ flexDirection: 'row', marginLeft:8,marginTop:17, width:'95%'}}>        
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={[styles.selectedTextStyle]}
                            iconStyle={styles.iconStyle}
                            // iconColor= {disable ? GlobalColors.iconActive : GlobalColors.iconUnActive } 
                            data={company_data}
                            maxHeight={300}
                            // activeColor={selectedValue ? GlobalColors.activeColor : undefined}
                            itemTextStyle={styles.itemTextStyle}
                            placeholder='Select'
                            value={selected}
                            labelField='label'
                            valueField='value'
                            // onFocus={() => setIsFocus(true)}
                            // onBlur={() => setIsFocus(false)}
                            onChange={handleSelect}
                        />
                        {
                            companyError && <Text style={{color:'red', fontSize:13,fontFamily:'PlusJakartaSans-Medium',margin:10}}>Please choose Employer</Text>
                        }
                    </View>
                </View>
                <View style={{margin:10}}>
                    <Text style={{color:'rgba(13, 20, 34, 1)',fontSize:14, fontFamily:'PlusJakartaSans-SemiBold',marginTop:5,marginLeft:7}}>Patient Visit Type
                        <Text style={{ color: 'red' }}> {'*'}</Text>
                    </Text>
                    <View style={{ flexDirection: 'row', marginLeft:8,marginTop:7, width:'90%'}}>
                        <Pressable
                            style={{ flexDirection: 'row', alignItems: 'center', backgroundColor:'white', width:'50%', height:44, borderRadius:10, padding:10,marginTop:10 }}
                            onPress={() => handleOptionSelection('Employee')}
                            >
                            <Image
                                source={
                                selectedOption === 'Employee'
                                    ? require('../../assets/images/radio_active.png')
                                    : require('../../assets/images/radio_inactive.png')
                                }
                                style={{ width: 22, height: 22 }}
                            ></Image>
                            <Text style={{ color: 'rgba(13, 20, 34, 1)', fontSize: 14, fontFamily: 'PlusJakartaSans-SemiBold', marginLeft: 5, textAlign: 'center',bottom:1 }}>
                                Employee
                            </Text>
                        </Pressable>
                        <Pressable
                            style={{ flexDirection: 'row', alignItems: 'center', backgroundColor:'white', width:'50%', height:44, borderRadius:10, padding:10,marginTop:10,marginLeft:15 }}
                            onPress={() => handleOptionSelection('Dependant')}
                            >
                            <Image
                                source={
                                selectedOption === 'Dependant'
                                    ? require('../../assets/images/radio_active.png')
                                    : require('../../assets/images/radio_inactive.png')
                                }
                                style={{ width: 22, height: 22 }}
                            ></Image>
                            <Text style={{ color: 'rgba(13, 20, 34, 1)', fontSize: 14, fontFamily: 'PlusJakartaSans-SemiBold', marginLeft: 5, bottom:1 }}>
                                Dependant
                            </Text>
                        </Pressable>
                    </View>
                </View>
                {
                    showDetails && (
                        <>
                            <View style={{ margin: 7, width: '95%', alignSelf: 'center' }}>
                                <Text style={{ color: 'rgba(13, 20, 34, 1)', fontSize: 14, fontFamily: 'PlusJakartaSans-SemiBold', marginTop: 10, marginLeft: 7, marginBottom: 10 }}>Relationship
                                    <Text style={{ color: 'red' }}> {'*'}</Text>
                                </Text>
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={[styles.selectedTextStyle]}
                                    iconStyle={styles.iconStyle}
                                    // iconColor= {disable ? GlobalColors.iconActive : GlobalColors.iconUnActive } 
                                    data={relation_data}
                                    maxHeight={300}
                                    // activeColor={selectedValue ? GlobalColors.activeColor : undefined}
                                    itemTextStyle={styles.itemTextStyle}
                                    placeholder='Select'
                                    value={relation}
                                    labelField='label'
                                    valueField='value'
                                    // onFocus={() => setIsFocus(true)}
                                    // onBlur={() => setIsFocus(false)}
                                    onChange={selectedRelation}
                                    onFocus={() => setRelationError(false)}
                                />
                                {
                                    relationError && <Text style={{color:'red', fontSize:13,fontFamily:'PlusJakartaSans-Medium',margin:10}}>Please choose Relationship type.</Text>
                                }
                            </View>
                        </>
                    )
                }
                <View style={{margin:10, width:'97%',marginBottom:100 }}>
                    <Text style={{color:'rgba(13, 20, 34, 1)',fontSize:14, fontFamily:'PlusJakartaSans-SemiBold',marginTop:10,marginLeft:7,marginBottom:10}}>Employee Name
                        <Text style={{ color: 'red' }}> {'*'}</Text>
                    </Text>
                    <TextInput 
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={{backgroundColor:'rgba(255, 255, 255, 1)', width:'95%', height:44, borderRadius:10, padding:10, color:'black', fontSize:14, fontFamily:'PlusJakartaSans-Medium'}}
                        placeholder="Enter Employee Name"
                        placeholderTextColor='rgba(120, 126, 139, 1)'
                        onFocus={() => setnameError(false)}>
                    </TextInput>
                    {
                        nameError && <Text style={{color:'red', fontSize:13,fontFamily:'PlusJakartaSans-Medium',margin:10}}>Please enter valid Employee-Name</Text>
                    }
                    <Text style={{color:'rgba(13, 20, 34, 1)',fontSize:14, fontFamily:'PlusJakartaSans-SemiBold',marginTop:15,marginLeft:7,marginBottom:10}}>Employee ID
                        <Text style={{ color: 'red' }}> {'*'}</Text>
                    </Text>
                    <TextInput 
                        value={employeeId}
                        onChangeText={(text) => setEmployeeId(text)}
                        style={{backgroundColor:'rgba(255, 255, 255, 1)', width:'95%', height:44, borderRadius:10, color:'black', fontSize:14, fontFamily:'PlusJakartaSans-Medium', textAlignVertical:'top',padding:10,marginBottom:30}}
                        placeholder="Enter Employee ID"
                        placeholderTextColor='rgba(120, 126, 139, 1)'
                        onFocus={() => setIdError(false)}>
                    </TextInput>
                    {
                        idError && <Text style={{color:'red', fontSize:13,fontFamily:'PlusJakartaSans-Medium',margin:10}}>Please enter valid Employee-ID</Text>
                    }
                    <Text style={{color:'rgba(13, 20, 34, 1)',fontSize:14, fontFamily:'PlusJakartaSans-SemiBold',marginLeft:7,marginBottom:10}}>ID Card Photo
                        <Text style={{ color: 'red' }}> {'*'}</Text>
                    </Text>
                    <Pressable style={{backgroundColor:'rgba(255, 255, 255, 1)', width:'95%', height:44, borderRadius:10, color:'black', fontSize:14, fontFamily:'PlusJakartaSans-Medium', textAlignVertical:'top',padding:10,marginBottom: imageError ? 0 : 30}} onPress={cameraHandler}>
                        <Text style={{color : 'black'}}>{fileName}</Text>
                    </Pressable>
                    {
                        imageError && <Text style={{color:'red', fontSize:13,fontFamily:'PlusJakartaSans-Medium',margin:10}}>Please upload ID Photo</Text>
                    }
                </View>
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
      width: '99%',
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 6,
      height: 44,
    //   marginLeft:'auto',
    //   right:20,
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

export default EmployeeScreen;