import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import {Link} from "react-router-dom";
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import cookie from 'react-cookies';
import '../css/navbar.scss';
import $ from 'jquery';
import axios from "axios";
import { withRouter } from 'react-router-dom';

class Navbar extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    link;

    constructor(props) {
        super(props);
        this.state = {
            searchResults: []
        }
    }

    handleSignOut() {
        cookie.remove('name', { path: '/' });
        cookie.remove('token', { path: '/' });
        window.location.reload();
    }

    handleSearch(event) {
        console.log("change");
        let keyWords = event.target.value;
        const data = {
            keyWords: keyWords
        };

        axios.post(process.env.REACT_APP_SERVER + '/articles/search', data).then(res => {
            if(res.data.query) {
                this.setState({
                    searchResults: res.data.articles
                });
            } else {
            }
        });
    }

    componentDidMount() {

    }

    handleTitleClick(id, event) {
        event.preventDefault();
        this.props.history.push('/single-article/' + id);
    }

    render() {
        const { cookies } = this.props;
        let name = cookies.get('name');
        let searchResult = this.state.searchResults;
        let self = this;
        const searchItems = searchResult.map((item, index) =>
            <div key={index}>
                <a className="dropdown-item" onClick={(e) => self.handleTitleClick(item._id, e)}>
                    {item.title}
                </a>
                <div className="dropdown-divider"></div>
            </div>
        );
        return (
            <nav className="navbar navbar-expand-lg sticky-top navbar-dark" style={{backgroundColor: 'rgb(250, 202, 183)'}}>
                <span className="navbar-brand mb-0 h1">Collection</span>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                <FormattedMessage id="title.articles"/>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/new-article" className="nav-link">
                                <FormattedMessage id="title.new"/>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/favorite" className="nav-link">
                                <FormattedMessage id="title.favorite"/>
                            </Link>
                        </li>
                    </ul>
                    <form className="form-inline mr-right search-form dropdown" id="myDropdown">
                        <input
                            type="text"
                            onBlur={(e) => this.handleSearch(e)}
                            className="form-control mr-sm-2" name="keyWords"
                            placeholder="Search"/>
                            <button
                                className="btn btn-outline-success my-2 my-sm-0"
                                data-toggle="dropdown">
                                Search
                            </button>
                            <div className="dropdown-menu show-search-result">
                                <div className="dropdown-divider"></div>
                                {searchItems}
                            </div>
                    </form>
                    {(name && name != '') && <span className="welcome-nav">Hello {name}!</span>}
                    {(name && name != '') && <i style={{color: "#cc544c"}} onClick={() => this.handleSignOut()} className="fas fa-sign-out-alt"></i>}
                    {(name === undefined) &&
                        <button
                            className="btn btn-outline-danger"
                            type="button"
                           data-toggle="modal" data-target="#loginModal">
                            Login
                        </button>
                    }
                </div>
            </nav>
        );
    }
}

export default withRouter(withCookies(Navbar));