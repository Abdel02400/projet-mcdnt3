import React , { Component } from "react";
import AuthService from "./AuthService";

export default function withAuth(AuthComponent) {
    return class AuthWrapped extends Component {
        constructor(props) {
            super(props);
            this.state = {
                user: null
            }
        }
        async componentWillMount() {
            if (!AuthService.loggedIn()) {
                this.props.history.replace('/login')
            }
            else {
                try {
                    const profile = await AuthService.getProfile()
                    console.log(profile)
                    if(profile.data !== undefined && profile.data !== "" && profile.data !== null){
                        this.setState({
                            user: profile.data
                        })
                    }else {
                        AuthService.logout()
                        this.props.history.replace('/login')
                    }

                }
                catch(err){
                    AuthService.logout()
                    this.props.history.replace('/login')
                }
            }
        }

        render() {
            if (this.state.user) {
                return (
                    <AuthComponent history={this.props.history} user={this.state.user} />
                )
            }
            else {
                return null
            }
        }
    };


}