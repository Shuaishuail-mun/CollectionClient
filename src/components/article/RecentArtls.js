import React from 'react';
import '../../css/newlyPosted.scss';
import axios from "axios";
import { withRouter } from 'react-router-dom';

class RecentArtls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }
        // this.getTopMovies();
    }
    componentDidMount() {
        //get articles
        axios.get(process.env.REACT_APP_SERVER + '/articles/getRecent').then(res => {
            if(res.data.query) {
                this.setState({
                    articles: res.data.articles
                });
            }else {
                alert("system error");
            }
        });
    }

    handleClick(articleId, event) {
        event.preventDefault();
        this.props.history.push('/single-article/' + articleId);
    }

    render() {
        let articles = this.state.articles;
        let self = this;
        const listItems = articles.map((article, key) =>
            <div className="pin" key={key}>
                <img src={process.env.REACT_APP_SERVER + '/users/uploads/' + article.userId.headImg}/>
                <h6>{article.title}</h6>
                <p>{article.description.substr(0,article.description.length/2)}...<br/></p>
                <span>
                    <button onClick={(e) => self.handleClick(article._id, e)} type="button" className="btn btn-danger">read more</button>
                <p>
                    {article.description}
                </p>
                </span>
            </div>
        );
        return (
            <div id="wrapper">
                <div id="columns">
                    {listItems}
                </div>
            </div>
    );
    }
}

export default withRouter(RecentArtls);