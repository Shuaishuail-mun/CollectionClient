import React from 'react';
import '../css/Modal.css';


class LoginPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content loginModal">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Login</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label for="user-name" className="col-form-label">UserName:</label>
                                    <input type="text" className="form-control" id="user-name"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="user-name" className="col-form-label">UserName:</label>
                                    <input type="text" className="form-control" id="user-name"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-dark">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPanel;