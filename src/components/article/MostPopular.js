import React from 'react';
import '../../css/mostPopular.scss';
import $ from 'jquery';
import axios from "axios";
import { withRouter } from 'react-router-dom';

class MostPopular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultList: [],
            offset: 0
        }

        this.handleScroll = this.handleScroll.bind(this);
        // this.getTopMovies();
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        console.log(windowBottom + ":" + docHeight)
        if ((windowBottom + 10) >= docHeight) {
            let offset = this.state.offset;
            let limit = 2;
            let resultList = this.state.resultList;
            axios.get(process.env.REACT_APP_SERVER + `/articles/getPopular?offset=${offset}&limit=${limit}`).then(res => {
                if(res.data.query) {
                    this.setState({
                        resultList: resultList.concat(res.data.results),
                        offset: offset + limit
                    });
                }else {
                    alert("system error");
                }
            });
        }
    }

    componentDidMount() {
        //get articles
        let offset = this.state.offset;
        let limit = 6;
        axios.get(process.env.REACT_APP_SERVER + `/articles/getPopular?offset=${offset}&limit=${limit}`).then(res => {
            if(res.data.query) {
                this.setState({
                    resultList: res.data.results,
                    offset: offset + limit
                });
                window.addEventListener("scroll", this.handleScroll);
            }else {
                alert("system error");
            }
        });
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleClick(articleId, event) {
        event.preventDefault();
        this.props.history.push('/single-article/' + articleId);
    }

    render() {
        let lists = this.state.resultList;
        const listItems = lists.map((item, index) =>
            <div className={`blog-card ${(index % 2 == 0) ? 'alt' : ''}`} key={index}>
                <div className="meta">
                    <div className="photo" style={{backgroundImage: `url(${process.env.REACT_APP_SERVER + '/users/uploads/' + item.user[0].headImg})`}}></div>
                    <ul className="details">
                        <li className="author"><a href="#">{item.user[0].username}</a></li>
                        <li className="date">{item.article[0].date.substring(0, 10)}</li>
                        <li className="num-comment">{item.num_comment}</li>
                    </ul>
                </div>
                <div className="description">
                    <h1>{item.article[0].title}</h1>
                    <p>{item.article[0].description.substring(0, 100)}...</p>
                    <p className="read-more">
                        <a onClick={(e) => self.handleClick(item.article[0]._id, e)}>Read More</a>
                    </p>
                </div>
            </div>
        );
        let self = this;
        return(
            <div className="most-popular">
                {listItems}
            </div>
        );
    }
}

export default withRouter(MostPopular);