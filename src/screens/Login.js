import React, { Component } from 'react';
import { StyleSheet,Alert } from 'react-native';
import { Container, Input, Button, Text, View,Item, Label, Icon } from 'native-base';

import { connect } from 'react-redux'
import * as authAction from './../redux/actions/actionsAuth'
import AuthService from './../auth/'
import Loader from './../components/Loader'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            icon: 'eye-off',
            type: true,
            loading: false
        };
    }    
    async componentDidMount(){
      if(await (new AuthService).exist()){
          this.props.navigation.navigate("Checkin")
      }
    }
    async componentWillUnmount() {
        this.setState({
            loading: false
        });  
    }          
    _fill(){
        this.setState(state=>({
            email:'admin@gmail.com',
            password: '123',
        }))
    }
    _changeShowPassoword(){
        this.setState(prevState =>({
            icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
            type: !prevState.type
        }));
    }
    heandleLogin = async() => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(!reg.test(this.state.email)){
            Alert.alert('Please enter a valid email!')
        }else{            

          const data={
              email:this.state.email,
              password:this.state.password
            }
            this.setState({
                loading: true
            });            
            await this.props.authLogin(data)
            const login =  this.props.authDataLocal.authData
            setTimeout(() => {
                this.setState({
                  loading: false,
                });
            }, 1000);

            if(login.error){
              alert(login.message)
            }else{
              const auth = new (AuthService)
              await auth.save(login.data)
              this.props.navigation.navigate("Checkin")
            }
        }
    }
  render() {
    return (
      <Container>
        <View style={st.textInfo}>
            <Loader
            loading={this.state.loading} />
            <View>
                <Text style={[st.header,st.center]}>LOG IN</Text>
                <Text style={st.center}>Login with your Account</Text>
            </View>
            <Item floatingLabel style={st.mt}>
                <Label>Email</Label>
                <Input
                value={this.state.email}
                autoCapitalize='none'
                keyboardType='email-address'
                onChangeText={(text) => this.setState({ email: text })}
                />
            </Item>
            <Item floatingLabel style={st.mt}>
                <Label>Password</Label>
                <Icon 
                name={this.state.icon}
                onPress={()=> this._changeShowPassoword()}
                />
                <Input
                value={this.state.password}
                onChangeText={(text) => this.setState({ password: text })}
                secureTextEntry={this.state.type}
                />
            </Item>
            <Button block rounded style={st.mt}
            onPress={()=>this.heandleLogin()}
            ><Text>Login</Text></Button>
            <View>
                <Text style={[st.mt,st.center]}>
                    Fill the email and password 
                    <Text style={st.linkHere}
                        onPress={()=>this._fill()}
                    > here!
                    </Text>
                </Text>
                <Text style={[st.mt,st.center]}>
                    Don't have an account, register
                    <Text style={st.linkHere}
                        onPress={()=>this.props.navigation.navigate('Register')}
                    > here!
                    </Text>
                    
                </Text>                
            </View>            
        </View>                
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
      authDataLocal: state.authData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authLogin: (data) => dispatch(authAction.heandleLogin(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

const st = StyleSheet.create({
    textInfo:{
        margin: 25,
    },
    header:{
        marginTop:80,
        fontSize: 35,
    },
    center:{
        textAlign:'center',
    },
    mt:{
        marginTop: 20,
    },
    linkHere:{
        color:'blue',
    }
})
