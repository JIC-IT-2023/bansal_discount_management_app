import { useCallback, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View ,Pressable,StyleSheet, TextInput, FlatList, Image} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from "react-native-element-dropdown";
import Modal from 'react-native-modal';
import { useAppContext } from "../../context/AppContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { RequestApi } from "../../services/request/RequestServices";
import moment from 'moment'


const data=[
  {
    id: '#234234344234',
    date : '12 JAN, 2024',
    type : 'Non Employee',
    discount : '50%',
    amount: 'Rs 37,500 /-',
    patient: 'Jayshri Tiwari',
    doctor: 'Rahul Choudhary',
    status : 'Approved'
  },
  {
    id: '#234234344235',
    date : '12 JAN, 2024',
    type : 'Employee',
    discount : '50%',
    amount: 'Rs 37,500 /-',
    patient: 'Jayshri Tiwari',
    doctor: 'Rahul Choudhary',
    status : 'Pending'
  },
  {
    id: '#234234344236',
    date : '12 JAN, 2024',
    type : 'Non Employee',
    discount : '50%',
    amount: 'Rs 37,500 /-',
    patient: 'Jayshri Tiwari',
    doctor: 'Rahul Choudhary',
    status : 'Rejected'
  },
  {
    id: '#234234344237',
    date : '12 JAN, 2024',
    type : 'Non Employee',
    discount : '50%',
    amount: 'Rs 37,500 /-',
    patient: 'Jayshri Tiwari',
    doctor: 'Rahul Choudhary',
    status : 'Pending'
  },
  {
    id: '#234234344238',
    date : '12 JAN, 2024',
    type : 'Employee',
    discount : '50%',
    amount: 'Rs 37,500 /-',
    patient: 'Jayshri Tiwari',
    doctor: 'Rahul Choudhary',
    status : 'Approved'
  },
  {
    id: '#234234344239',
    date : '12 JAN, 2024',
    type : 'Employee',
    discount : '50%',
    amount: 'Rs 37,500 /-',
    patient: 'Jayshri Tiwari',
    doctor: 'Rahul Choudhary',
    status : 'Rejected'
  },
]

function RequestScreen(){
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
      { label: 'Approved', value: '2' },
      { label: 'Pending', value: '3' },
      { label: 'Rejected', value: '4' },
      // { label: 'Pending', value: '3' }
    ];
    const [selectedFilter, setSelectedFilter] = useState(filterTitle[0]);
    const [selectedstatus, setSelectedStatus] = useState();
    const [selected, setSelected] = useState(genderOptions[0]);
    const[searchText, setSearchText] = useState();
    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [discountList, setDiscountList] = useState([]);
    const [filteredDiscountList, setFilteredDiscountList] = useState([]);
    const {updateItem, updateRequestItem,userDetails} = useAppContext();
    console.log('value===', selectedFilter,selected);
    useEffect(() => {
      getDiscount(selectedFilter.title, selected.label);
  }, []);

  function getDiscount(relation, status){
    RequestApi.getDiscountList( relation === 'All' ? '' : relation,status === 'All Status' ? '' : status ).then((res) => {
       console.log('res-----',res.data.results);
       if(res.status === 200){
          setDiscountList(res.data.results)
       }
    }).catch((err) => {
      console.error(err);
    })
}
  const handleFilter = () => {
      let filteredList = discountList.filter(item => {
          // Perform filtering based on selected filter and status
          return (selectedFilter.title === 'All' || item.relation_type === selectedFilter.title) &&
              (selected.label === '' || item.status === selected.label);
      });
      // Update filtered discount list
      setFilteredDiscountList(filteredList);
  };

  // useEffect to update filtered discount list when filter or status changes
  useEffect(() => {
      handleFilter();
  }, [selectedFilter, selected]);

    
   
    const handlePress = (item) => {
        console.log("handlePress",item)
        setSelectedFilter(item);
        getDiscount(item.title,selected.label);
    };
    const handleSelect = (value) => {
      setSelected(value);
      getDiscount(selectedFilter.title,value.label);
    };
    function requestExpandHandler(item){
      console.log('item----', item);
      updateRequestItem(item);
      navigation.navigate('RequestExpand')
    }
    function renderItem({item}){
      console.log('item====', item);
      return(
        <Pressable style={{width:'87%', height:200,backgroundColor:'rgba(255, 255, 255, 1)',borderRadius:8, alignSelf:'center',marginBottom:15,shadowColor: '#000',shadowOffset:{ width: 0,height: 2 },shadowOpacity: 0.25, shadowRadius: 3,elevation:6}} onPress={() => requestExpandHandler(item)}>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:20,marginTop:5}}>
            <Text style={{fontSize:14, color:'rgba(13, 20, 34, 1)', fontFamily:'PlusJakartaSans-Bold'}}>{item?.bill_details?.data?.bill_no}</Text>
            <Text style={{fontSize:12, color:'rgba(120, 126, 139, 1)', fontFamily:'PlusJakartaSans-Regular',right:20}}>{moment(item?.discharge_date).format('DD MMM YYYY')}</Text>
          </View>
          <View style={{flexDirection:'row',marginLeft:17,marginTop:5}}>
            {
              item?.relation_type === 'Employee' ? (
                <View style={{flexDirection:'row', backgroundColor:'rgba(248, 249, 249, 1)',width:'30%', height:27,alignItems:'center',justifyContent:'center', borderRadius:4, borderColor:'rgba(239, 243, 249, 1)', borderWidth:1.5 }}>
                  <Image style={{width:15, height:15, marginHorizontal:5}} source={require('../../assets/images/employee.png')}></Image>
                  <Text style={{fontSize:10, color:'rgba(13, 20, 34, 1)', fontFamily:'PlusJakartaSans-Medium'}}>{item?.relation_type}</Text>
                </View>
              ) : 
              <View style={{flexDirection:'row', backgroundColor:'rgba(248, 249, 249, 1)',width:'32%', height:27,alignItems:'center',justifyContent:'center', borderRadius:4, borderColor:'rgba(239, 243, 249, 1)', borderWidth:1.5 }}>
                <Image style={{width:13, height:13, marginHorizontal:5}} source={require('../../assets/images/non_employee.png')}></Image>
                <Text style={{fontSize:10, color:'rgba(13, 20, 34, 1)', fontFamily:'PlusJakartaSans-Medium'}}>{item?.relation_type}</Text>
              </View>
            }
            <View style={{backgroundColor: item?.status === 'Approved' ? "rgba(40, 161, 56, 1)" : item?.status === 'Pending' ? 'rgba(223, 123, 0, 1)' : 'rgba(210, 28, 28, 1)', height:25, width:'29%', justifyContent:'center', alignItems:'center', marginLeft:10,borderRadius:4}}>
              <Text style={{color: item?.status === 'Approved' ? "rgba(225, 239, 226, 1)" : item?.status === 'Pending' ? 'rgba(252, 236, 218, 1)' : 'rgba(248, 226, 226, 1)',fontSize:12, fontFamily:"PlusJakartaSans-Medium"}}>{item?.status}</Text>
            </View>
          </View>
          <View style={{backgroundColor:'rgba(239, 243, 249, 1)',height:75, width:'90%', alignSelf:'center',marginTop:5,borderRadius:4, flexDirection:'row'}}>
            <View>
              <Text style={{color:'rgba(13, 20, 34, 1)', fontFamily:'PlusJakartaSans-Bold', fontSize:13,marginLeft:10,textAlign:'left',marginTop:15}}>{item?.discount}  Discount</Text>
              <Text style={{color:'rgba(11, 160, 220, 1)', fontFamily:'PlusJakartaSans-Bold', fontSize:18,marginLeft:10,textAlign:'left'}}>Rs. {item?.final_amount} /-</Text>
           </View>
           <Image style={{marginLeft:'auto'}} source={require('../../assets/images/green.png')}></Image>
          </View>
          <View>
            <View style={{flexDirection:'row', marginLeft:20,marginTop:9,justifyContent:'space-between'}}>
              <Text style={{color:'rgba(120, 126, 139, 1)', fontSize:13,fontFamily:'PlusJakartaSans-Regular'}}>Patient:</Text>
              <Text style={{color:'rgba(33, 39, 53, 1)',fontSize:13,fontFamily:'PlusJakartaSans-Medium', right:20}}>{item?.bill_details?.data?.patient_name}</Text>
            </View>
            <View style={{flexDirection:'row', marginLeft:20,marginTop:5,justifyContent:'space-between'}}>
              <Text style={{color:'rgba(120, 126, 139, 1)', fontSize:13,fontFamily:'PlusJakartaSans-Regular'}}>Doctor:</Text>
              <Text style={{color:'rgba(33, 39, 53, 1)',fontSize:13,fontFamily:'PlusJakartaSans-Medium', right:20}}>{item?.doctor}</Text>
            </View>
          </View>
        </Pressable>
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
    return(
       <SafeAreaView style={{flex:1, backgroundColor:'rgba(248, 249, 249, 1)'}}>
           <ScrollView>
              <View>
                <Text style={{color:'rgba(0, 0, 0, 1)', fontSize:18,textAlign:'center', fontFamily:'PlusJakartaSans-Medium', marginTop:20}}>Requests</Text>
                {
                  userDetails?.role === 'MOD' && 
                  <View style={{flexDirection:'row',backgroundColor:'rgba(239, 243, 249, 1)',width:'93%', height:37, borderRadius:6,alignItems:'center',justifyContent:'space-around',alignSelf:'center',marginTop:15}}>
                      {filterTitle.map((item, index) => {
                          return (
                              <Pressable
                              key={index}
                              style={[
                                  styles.filterContainer,
                                  selectedFilter.id === item.id && styles.selectedFilter,
                              ]}
                              onPress={() => {handlePress(item)}}
                              >
                              <Text
                                  style={[
                                  styles.filterText,
                                  selectedFilter.id === item.id && styles.selectedText,
                                  ]}
                              >
                                  {item.title}
                              </Text>
                              </Pressable>
                          );
                      })}
                  </View>
                }
                <View style={{flexDirection:'row',marginTop:20,justifyContent:'space-between',marginBottom:15}}>
                  <View style={{backgroundColor:'rgba(255, 255, 255, 1)', height:44, width:168, borderRadius:6,flexDirection:'row',alignItems:'center',marginLeft:15,shadowColor: '#000',shadowOffset:{ width: 0,height: 2 },shadowOpacity: 0.25, shadowRadius: 3,elevation:6}}>
                    <TextInput 
                      placeholder="Search"
                      placeholderTextColor='rgba(120, 126, 139, 1)'
                      onChangeText={(text) => setSearchText(text)}
                      style={{color:'black', width:'80%',marginLeft:5, fontSize:14, fontFamily:'PlusJakartaSans-Regular'}}></TextInput>
                    <Icon name={'search'} size={30} color="rgba(62, 70, 89, 1)" />
                  </View>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={[styles.selectedTextStyle]}
                    iconStyle={styles.iconStyle}
                    // iconColor= {disable ? GlobalColors.iconActive : GlobalColors.iconUnActive } 
                    data={genderOptions}
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
                </View>
                <FlatList
                  data={discountList}
                  renderItem={renderItem}
                  keyExtractor={(item) => item?.id.toString()}></FlatList>
              </View>
           </ScrollView>
           <View style={{position: 'absolute', bottom: 0,left: 0,right: 0,paddingBottom: Platform.OS === 'ios' ? 20 : 30,justifyContent:'center', alignItems:'center'}}>
              <Pressable style={{backgroundColor:'rgba(11, 160, 220, 1)', width:'90%', height:52, borderRadius:10,alignItems:'center', flexDirection:'row'}} onPress={requestHandler}>
                <Text style={{color:"rgba(231, 246, 252, 1)", fontSize:14, fontFamily:'PlusJakartaSans-Bold',marginLeft:10}}>Initiate Request</Text>
                <Image style={{width:20, height:19,marginLeft:'auto',right:10}} source={require('../../assets/images/request_icon.png')}></Image>
              </Pressable>
            </View>
            <Modal isVisible={isLogoutModalVisible}
            hasBackdrop={true}
            backdropColor="black"
            backdropOpacity={0.70}
            onBackdropPress={() => setLogoutModalVisible(!isLogoutModalVisible)}
            width={'100%'}
            style={{ alignItems: 'center', justifyContent: 'flex-end', margin: 0 }}>
                <View style={styles.model}>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{color:'rgba(33, 39, 53, 1)', fontSize:18}}>Add New Request</Text>
                    <Pressable style={{ marginLeft:'auto', bottom:5}} onPress={cancelLogout}>
                      <Image style={{width:28, height:28,}} source={require('../../assets/images/close_icon.png')}></Image>
                    </Pressable>
                  </View>
                  <View style={{flexDirection:'row',marginTop:15, justifyContent:'center'}}>
                    <Pressable onPress={() => addRequestHandler('Non-Employee')}>
                      <Image style={{width:158, height:224, borderRadius:10, borderColor: selectedType === 'Non-Employee' ? 'rgba(12, 97, 134, 1)' : 'black',
                        borderWidth: selectedType === 'Non-Employee' ? 0.5 : 0.5}} source={selectedType === 'Non-Employee' ? require('../../assets/images/nonemployee_active.png'): require('../../assets/images/nonemployee_inactive.png')}></Image>
                    </Pressable>
                    <Pressable onPress={() => addRequestHandler('Employee')}>
                      <Image style={{width:158, height:224, borderRadius:10, borderColor:'black', borderColor: selectedType === 'Employee' ? 'rgba(12, 97, 134, 1)' : 'black',
                        borderWidth: selectedType === 'Employee' ? 0.5 : 0.5, marginLeft:15}} source={selectedType === 'Employee' ? require('../../assets/images/employee_active.png'): require('../../assets/images/employee_inactive.png')}></Image>
                    </Pressable>
                  </View> 
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
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      alignItems: 'center',
      flexDirection: 'row',
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
export default RequestScreen;