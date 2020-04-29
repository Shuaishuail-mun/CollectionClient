import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import {Link} from "react-router-dom";
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';

class Navbar extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    link;

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { cookies } = this.props;
        let name = cookies.get('name');
        return (
            <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
                <span className="navbar-brand mb-0 h1">Collection</span>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                <FormattedMessage id="title.articles"/>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/favorite" className="nav-link">
                                <FormattedMessage id="title.favorite"/>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/new-article" className="nav-link">
                                <FormattedMessage id="title.new"/>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/clipper" className="nav-link">
                                rwqew
                            </Link>
                        </li>
                    </ul>
                    {name && <span className="navbar-brand">Hello {name}!</span>}
                    {name && <i style={{color: 'white'}} className="fas fa-sign-out-alt"></i>}
                    {(name === undefined) &&
                        <i style={{color: 'white'}}
                            className="fas fa-sign-in-alt"
                           data-toggle="modal" data-target="#loginModal">
                        </i>
                    }
                </div>
            </nav>
        );
    }
}

export default withCookies(Navbar);