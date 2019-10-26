import React, { Component } from 'react';
import { Share,Image,Dimensions,StyleSheet,FlatList } from 'react-native';
import { View, Text,Container, Header, Button,Left,Right,Icon, Title, Body,List,ListItem, Thumbnail } from 'native-base';

import AuthService from './../auth'
import Loader from './../components/Loader'

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      profileName: ''
    };
  }
  async componentDidMount(){
    this.setState({
      loading: true
    });            
    let profileName = await (new AuthService).fetch('username');
    setTimeout(() => {
        this.setState({
          loading: false,
          profileName
        });
    }, 1000);
  }
  toLogout = async () => {
    await (new AuthService).destroy().then(()=>{
      this.props.navigation.navigate("Login");
    }) 
  }
  render() {
    return (
      <Container>
        <View style={[st.center,st.mt]}>
          <Loader
            loading={this.state.loading} />
          <Thumbnail style={st.imgProfile} source={{uri:'https://media.comicbook.com/2019/07/my-hero-academia-150-152-image-pv-1178294.jpeg?auto=webp&width=696&height=395&crop=696:395,smart'}}/>
          <Text style={st.profileText}>{this.state.profileName}</Text>              
        </View>
        <View>
          <List>
              <ListItem>
                  <Left>
                    <Text onPress={()=> this.toLogout()}>Log out</Text>
                  </Left>
              </ListItem>
          </List>      
        </View>          
      </Container>
    );
  }
}


const st = StyleSheet.create({
  title:{
      fontSize:25,
  },
  mt:{
      marginTop:80,
  },
  date:{
      fontStyle: 'italic',
      color:'blue',
  },
  center:{
    alignItems:'center',
  },
  imgProfile:{
    borderRadius:150/2,
    width:  150, 
    height: 150,
  },
  profileText:{
    fontSize: 26,
  }
})
