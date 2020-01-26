import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Navbar extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { cookies } = this.props;
        let name = cookies.get('name');
        return (
            <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
                <span className="navbar-brand mb-0 h1">Collection</span>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Movie</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Book</a>
                        </li>
                    </ul>
                    {name && <span className="navbar-brand">Hello {name}!</span>}
                    {(name === undefined) && <button className="btn btn-secondary btn-lg active" data-toggle="modal" data-target="#loginModal">Login</button>}
                </div>
            </nav>
        );
    }
}

export default withCookies(Navbar);