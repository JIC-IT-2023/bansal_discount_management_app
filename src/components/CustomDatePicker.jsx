import { useEffect, useState } from "react";
import { Text, View,StyleSheet} from "react-native";
import Modal from 'react-native-modal';
import {Calendar} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['en'] = {
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    today: 'Today'
  };
  
  LocaleConfig.defaultLocale = 'en';
function CustomDatePicker({isVisible}){
    const [isLogoutModalVisible, setLogoutModalVisible] = useState();
    const [selected, setSelected] = useState('');
    const currentDate = new Date();
    const minDate = currentDate.toISOString().split('T')[0];

    useEffect(() => {
        setLogoutModalVisible(isVisible)
    })

    return(
        <View>
            <Modal isVisible={isLogoutModalVisible}
            hasBackdrop={true}
            backdropColor="black"
            backdropOpacity={0.70}
            onBackdropPress={() => setLogoutModalVisible(!isVisible)}
            width={'100%'}
            style={{ alignItems: 'center', margin: 0 }}>
                <View style={styles.model}>
                <Calendar
                    onDayPress={day => {
                    setSelected(day.dateString);
                    onValueChange(day.dateString)
                    }}
                    markedDates={{
                    [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange', selectedColor:'rgba(0, 104, 117, 1)'}
                    }}
                    // minDate={minDate}
                    theme={{
                    'stylesheet.calendar.header': {
                        dayTextAtIndex0: {
                        color: 'rgba(0, 104, 117, 1)'
                        },
                        dayTextAtIndex1: {
                        color: 'rgba(0, 104, 117, 1)'
                        },
                        dayTextAtIndex2: {
                        color: 'rgba(0, 104, 117, 1)'
                        },
                        dayTextAtIndex3: {
                        color: 'rgba(0, 104, 117, 1)'
                        },
                        dayTextAtIndex4: {
                        color: 'rgba(0, 104, 117, 1)'
                        },
                        dayTextAtIndex5: {
                        color: 'rgba(0, 104, 117, 1)'
                        },
                        dayTextAtIndex6: {
                        color: 'rgba(0, 104, 117, 1)'
                        }
                    },
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    textSectionTitleDisabledColor: '#d9e1e8',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: 'black',
                    todayBackgroundColor:'rgba(0, 104, 117, 0.2)',
                    dayTextColor: 'black',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'rgba(0, 104, 117, 1)',
                    disabledArrowColor: '#d9e1e8',
                    monthTextColor: 'rgba(51, 51, 51, 1)',
                    indicatorColor: 'blue',
                    textDayFontFamily: 'Roboto-Regular',
                    textMonthFontFamily: 'Roboto-Regular',
                    textDayHeaderFontFamily: 'Roboto-Regular',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16
                    }}
                />
                </View>
            </Modal>
        </View>
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
    // padding: 20,
    // justifyContent: 'center',
    // marginTop:'auto'
},
filterSection: {
    height: 60,
    justifyContent: 'center',
    marginBottom: 10,
  },
  });

export default CustomDatePicker;