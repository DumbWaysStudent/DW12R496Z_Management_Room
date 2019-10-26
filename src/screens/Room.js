import React, { Component } from 'react'
import { StyleSheet, Text,FlatList,TouchableOpacity,TouchableHighlight,Modal } from 'react-native'
import { Container, Button,Body, Thumbnail, ListItem,Left,Right, View, Card,Item,Input,Label, Icon } from 'native-base'

import { connect } from 'react-redux'
import * as actionsCustomer from './../redux/actions/actionsCustomer'
import axios from 'axios'
import AuthService from './../auth/'
import Loader from './../components/Loader'
import env from './../../env'

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idCustomer:'',
      loading: false,
      token:'',
      webtoonLocal:[],
      customerData:[],
      modalVisible: false,
      modalEditVisible:false,
    };
  }
  async componentDidMount(){
    this.getDatas()
  }
  getDatas  = async()=>{
    let token = await (new AuthService).fetch('token');
    this.setState({
      loading: true
    });            
    await this.props.getCustomers(token)
    setTimeout(() => {
        this.setState({
          loading: false,
          customerData:this.props.customerDataLocal.customers,
          token,
        });
    }, 1000);

  }
  goToDetails = async (data) =>{
    this.setState({
      loading: true
    });            
    await this.setState({
      id:data.id,
      name:data.name,
      identity_number:data.identity_number,
      phone:data.phone
    });
    setTimeout(() => {
        this.setState({
          loading: false,
        });
    }, 1000);
    this.setEditModalVisible(!this.state.modalEditVisible);
  }
  handleAdd = async () =>{   
    const data = {
      name:this.state.name,
      phone:this.state.phone,
      identity_number:this.state.identity_number,
    }
    this.setState({
      loading: true,
    }); 

    await axios({
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${this.state.token}`
    },
    data,
    url: `${env.apiUrl}/customer`
    })

    await this.getDatas()
    setTimeout(() => {
        this.setState({
          loading: false,
          name:'',
          phone:'',
          identity_number:'',
        });
    }, 1000);
    this.setModalVisible(!this.state.modalVisible);
  }
  handleEdit = async () =>{
    const data = {
      name:this.state.name,
      phone:this.state.phone,
      identity_number:this.state.identity_number,
      loading: true,
    }
    const id = this.state.id
    await axios({
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${this.state.token}`
    },
    data,
    url: `${env.apiUrl}/customer/${id}`
    })
    await this.getDatas()
    setTimeout(() => {
        this.setState({
          loading: false,
        });
    }, 1000);
    this.setEditModalVisible(!this.state.modalEditVisible);        
  }
  handleDelete = async () => {
    this.setState({
      loading: true
    });            
    const id = this.state.id
    await axios({
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${this.state.token}`
    },
    url: `${env.apiUrl}/customer/${id}`
    })
    await this.getDatas()
    setTimeout(() => {
        this.setState({
          loading: false,
        });
    }, 1000);
    this.setEditModalVisible(!this.state.modalEditVisible);    
  }

  setEditModalVisible(visible) {
    this.setState({modalEditVisible: visible});
  }
  setModalVisible(visible) {
    this.setState({
      name:'',
      identity_number:'',
      phone:''
    });     
    this.setState({modalVisible: visible});
  }
  render() {
    return (
      <Container>
      <View>
          <Loader
          loading={this.state.loading} />
      </View>
      <Text style={[st.title,st.mt]}>All</Text>
      <FlatList
      data={this.state.customerData}
      renderItem={({item})=>
          <View>
              <TouchableOpacity>
              <ListItem thumbnail onPress={()=>this.goToDetails({
                id:item.id,
                name:item.name,
                identity_number:item.identity_number,
                phone:item.phone
              })}>
                  <Left>
                      <Thumbnail square source={{uri: 'http://www.seedcoworking.com/wp-content/uploads/2018/06/placeholder.jpg'}}/>
                  </Left>
                  <Body>
                      <Text style={st.title}>{item.name}</Text>
                      <Text>{item.identity_number}</Text>
                      <Text style={st.by}>{item.phone}</Text>
                  </Body>
                  <Right>
                  <Button 
                  transparent>
                      
                  </Button>
                  </Right>                        
              </ListItem>
              </TouchableOpacity>
          </View> 
          }
          keyExtractor={(item,index)=>index.toString()}
          />
      <View>
        <Modal
          animationType="fide"
          transparent={true}
          visible={this.state.modalVisible}>
          <View style={{flex : 1, justifyContent: "center"}}>
            <Card style={{paddingVertical : 40, paddingHorizontal : 20, padding:20,}}>
                <Text style={st.form_title}>Input</Text>
                <Item floatingLabel style={st.mt}>
                  <Label>Name</Label>
                  <Input 
                    value={this.state.name}
                    keyboardType="default"
                    onChangeText={(name)=> this.setState({name})}
                  />
                </Item>
                <Item floatingLabel style={st.mt}>
                  <Label>Identity Number</Label>
                  <Input 
                    value={this.state.identity_number}
                    keyboardType="number-pad"
                    onChangeText={(identity_number)=> this.setState({identity_number})}
                  />
                </Item>  
                <Item floatingLabel style={st.mt}>
                  <Label>Phone</Label>
                  <Input 
                    value={this.state.phone}
                    keyboardType="number-pad"
                    onChangeText={(phone)=> this.setState({phone})}
                  />
                </Item>                                
                <View style={{flexDirection : 'row', justifyContent : 'space-around',paddingTop :20}}>
                  <TouchableOpacity  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                    <View>
                        <Text>Close</Text>
                    </View>                                  
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.handleAdd} >
                      <View>
                          <Text>Save</Text>
                      </View>                                  
                  </TouchableOpacity>
                </View>
            </Card>
          </View>
        </Modal>

        <Modal
          animationType="fide"
          transparent={true}
          visible={this.state.modalEditVisible}>
          <View style={{flex : 1, justifyContent: "center"}}>
            <Card style={{paddingVertical : 40, paddingHorizontal : 20, padding:20,}}>
                <Text style={st.form_title}>Edit</Text>
                <Item floatingLabel style={st.mt}>
                  <Label>Name</Label>
                  <Input 
                    value={this.state.name}
                    keyboardType="default"
                    onChangeText={(name)=> this.setState({name})}
                  />
                </Item>
                <Item floatingLabel style={st.mt}>
                  <Label>Identity Number</Label>
                  <Input 
                    value={this.state.identity_number}
                    keyboardType="number-pad"
                    onChangeText={(identity_number)=> this.setState({identity_number})}
                  />
                </Item>  
                <Item floatingLabel style={st.mt}>
                  <Label>Phone</Label>
                  <Input 
                    value={this.state.phone}
                    keyboardType="number-pad"
                    onChangeText={(phone)=> this.setState({phone})}
                  />
                </Item>                                
                <View style={{flexDirection : 'row', justifyContent : 'space-around',paddingTop :20}}>
                  <TouchableOpacity  onPress={() => {
                    this.setEditModalVisible(!this.state.modalEditVisible);
                  }}>
                    <View>
                        <Text>Close</Text>
                    </View>                                  
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.handleDelete} >
                      <View>
                          <Text>Delete</Text>
                      </View>                                  
                  </TouchableOpacity>                  
                  <TouchableOpacity onPress={this.handleEdit} >
                      <View>
                          <Text>Save</Text>
                      </View>                                  
                  </TouchableOpacity>
                </View>
            </Card>
          </View>
        </Modal>
      </View>
      <View style={{position:'absolute',bottom:10,alignSelf:'flex-end', padding :25}}>
      <TouchableHighlight>
        <Icon style={{fontSize : 50}} color="#64ccda" name="ios-add-circle-outline"
            onPress={() => {
              this.setModalVisible(true);
            }}
            />
            </TouchableHighlight>
        </View>
                  
      </Container>  
    );
  }
}
const mapStateToProps = state => {
  return {
      customerDataLocal: state.customers,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCustomers: (token) => dispatch(actionsCustomer.heandleGetCustomer(token)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);

const st = StyleSheet.create({
  title:{
      fontWeight: 'bold',
      fontSize:18,
  },
  form_title:{
    fontWeight: 'bold',
    fontSize:20,
  },  
  ml:{
      marginLeft:10,
  },
  mt:{
    marginTop: 10,
  },
  by:{
      fontStyle: 'italic',
      color:'blue',
  }
})