import React from 'react';
import '../../css/Modal.scss';
import Form from './Form';
import axios from 'axios';
import sha1 from 'sha1';
import cookie from 'react-cookies';

class LoginPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'login'
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(data, event) {
        event.preventDefault();
        // alert(JSON.stringify(data));
        let type = this.state.type;
        data.passWord = sha1(data.passWord);
        axios.post(process.env.REACT_APP_SERVER + '/users/' + type, { data })
            .then(res => {
                if (res.data.auth) {
                    cookie.save('name', data.userName, { path: '/', maxAge: 1000});
                    cookie.save('token', res.data.token, {path: '/', maxAge: 1000});
                    // document.cookie = "name=" + data.userName;
                    window.location.reload();
                } else {
                    if (type === 'login') {
                        console.log("user not exists or password not correct");
                    } else {
                        console.log("register failed");
                    }
                }
            })

    };

    changeType() {
        let value = this.state.type;
        if (value === 'login') {
            value = 'register';
        } else {
            value = 'login';
        }
        this.setState({
            type: value
        })
    }



    render() {
        return (
            <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content loginModal">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {this.state.type.charAt(0).toUpperCase() + this.state.type.slice(1)}
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Form type={this.state.type} onSubmit={this.onSubmit}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={() => this.changeType()} className="btn btn-link">
                                {this.state.type === "login" && 'register'}
                                {this.state.type === "register" && 'login'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPanel;