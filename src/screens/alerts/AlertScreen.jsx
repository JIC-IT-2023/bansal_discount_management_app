import { Text, View,SafeAreaView,ScrollView ,FlatList,Image} from "react-native";


const data=[
    {
      id: '1',
      date : '12:00 PM, 06 JAN 2024',
      title : 'Awaiting Approval',
      content : '#000085752257 is awaiting approval. We will notify you once a decision is made.',
      image: require('../../assets/images/pending_alert.png'),
    },
    {
      id: '2',
      date : '12:00 PM, 06 JAN 2024',
      title : 'Request Accepted',
      content : '#000085752257 has been approved.',
      image: require('../../assets/images/approved_alert.png'),
    },
    {
      id: '3',
      date : '12:00 PM, 06 JAN 2024',
      title : 'Awaiting Approval',
      content : '#000085752257 is awaiting approval. We will notify you once a decision is made.',
      image: require('../../assets/images/pending_alert.png'),
    },
    {
      id: '4',
      date : '12:00 PM, 06 JAN 2024',
      title : 'Request Rejected',
      content : 'Sorry, #000085752257 has been rejected.',
      image: require('../../assets/images/reject_alert.png'),
    },
    {
      id: '5',
      date : '12:00 PM, 06 JAN 2024',
      title : 'Request Rejected',
      content : 'Sorry, #000085752257 has been rejected.',
      image: require('../../assets/images/reject_alert.png'),
    },
    {
      id: '6',
      date : '12:00 PM, 06 JAN 2024',
      title : 'Request Accepted',
      content : '#000085752257 has been approved.',
      image: require('../../assets/images/approved_alert.png'),
    },
]
function ALertScreen(){
    function renderItem({item}){
        console.log('item====', item);
        return(
          <>
            <View style={{ width: '87%', height: 56, backgroundColor: 'rgba(255, 255, 255, 1)', borderRadius: 8, alignSelf: 'center', marginBottom: 10, flexDirection: 'row' }}>
                <Image style={{ width: 54, height: 54 }} source={item.image}></Image>
                <View style={{ marginLeft: 15, bottom: 3 }}>
                    <Text style={{ color: 'rgba(13, 20, 34, 1)', fontSize: 14, fontFamily: 'PlusJakartaSans-Medium' }}>{item?.title}</Text>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={{ color: 'rgba(120, 126, 139, 1)', fontSize: 12, fontFamily: 'PlusJakartaSans-Regular', width: '60%' }}>{item?.content}</Text>
                </View>
                <Text style={{ marginLeft: 'auto', right: 5, color: 'rgba(159, 164, 173, 1)', fontSize: 9, fontFamily: 'PlusJakartaSans-Regular' }}>{item?.date}</Text>
            </View>
            <View style={{ backgroundColor: 'rgba(245, 245, 245, 1)', height: 1, width: '100%',marginBottom:10 }}></View>
        </>
        )
      }
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
        <ScrollView>
           <View>
                <Text style={{color:'rgba(0, 0, 0, 1)', fontSize:18,textAlign:'center', fontFamily:'PlusJakartaSans-Medium', marginTop:20,marginBottom:25}}>Alerts</Text>
                <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={(item) => item?.id.toString()}></FlatList>
            </View>
        </ScrollView>
    </SafeAreaView>
    )
}

export default ALertScreen;