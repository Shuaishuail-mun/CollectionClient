import React from 'react';
import '../../css/article.scss';
import RecentArtl from "./RecentArtl";
import MostPopular from "./MostPopular";
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
                <div className="container">
                    <div className="row">
                        <div className="left col-sm-2">
                            <div className="list-group">
                                <a className={this.state.panelNum == 0 ? "list-group-item active" : "list-group-item"} onClick={(e) => this.handleClick(0, e)}>
                                    <FormattedMessage id="article.recent"/>
                                </a>
                                <a className={this.state.panelNum == 1 ? "list-group-item active" : "list-group-item"} onClick={(e) => this.handleClick(1, e)}>
                                    <FormattedMessage id="article.popular"/>
                                </a>
                            </div>
                        </div>
                        <div className="right col-sm-9">
                            {this.state.panelNum == 0 && <RecentArtl />}
                            {this.state.panelNum == 1 && <MostPopular />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;