import React from 'react';
import '../../css/article.scss';
import MostPopular from "./MostPopular";
import RecentArtls from "./RecentArtls";
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            panelNum: 0
        }
        // this.getTopMovies();
    }

    handleClick(panelNum, e) {
        this.setState({
            panelNum: panelNum
        });
    }
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-2">
                            <div className="btn-group-vertical position-fixed" style={{opacity: '0.6'}}>
                                    <button
                                        onClick={(e) => this.handleClick(0, e)}
                                        type="button" class={`btn ${this.state.panelNum === 0? 'btn-danger': 'btn-outline-secondary'}`}>
                                        Newly Posted
                                    </button>
                                    <button
                                        onClick={(e) => this.handleClick(1, e)}
                                        type="button" className={`btn ${this.state.panelNum === 1? 'btn-danger': 'btn-outline-secondary'}`}>
                                        Most Popular
                                    </button>
                                {/*<a className={this.state.panelNum == 0 ? "list-group-item active" : "list-group-item"} onClick={(e) => this.handleClick(0, e)}>
                                    <FormattedMessage id="article.recent"/>
                                </a>
                                <a className={this.state.panelNum == 1 ? "list-group-item active" : "list-group-item"} >
                                    <FormattedMessage id="article.popular"/>
                                </a>*/}
                            </div>
                        </div>
                        <div className="col-sm-10">
                            {this.state.panelNum === 1 && <MostPopular />}
                            {this.state.panelNum === 0 && <RecentArtls />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;