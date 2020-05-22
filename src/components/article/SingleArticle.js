import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from "axios";
import '../../css/singleArticle.scss';
import $ from "jquery";

class SingleArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {
                _id: '',
                title: '',
                text: '',
                userId: '',
                date: ''
            },
            comments: [],
            favorNum: 0,
            favored: false
        }
    }

    handleEmoji(event) {
        let input = $("#publish_text");
        let text = input.val() + event.target.innerHTML;
        input.val(text);
        event.preventDefault();
    }

    publish(event) {
        event.preventDefault();
        let text = $("#publish_text").val();
        let data = {
            articleId: this.state.article._id,
            text: text
        };
        axios.post(process.env.REACT_APP_SERVER + '/comments/add', data, {withCredentials: true}).then(res => {
            if(!res.data.auth) {
                alert("login first");
            } else {
                if(res.data.published) {
                    let user = res.data.user;
                    let comments = this.state.comments;
                    comments.unshift({
                        userId: {
                            username: user.username,
                            headImg: user.headImg,
                        },
                        text: text
                    });
                    this.setState({
                        comments: comments
                    });
                }
            }
        });
    }

    addToFavor() {
        let favored = this.state.favored;
        let data = {
            articleId: this.state.article._id,
            favored: !favored
        };
        axios.post(process.env.REACT_APP_SERVER + '/favored/addOrDelete', data, {withCredentials: true}).then(res => {
            if(!res.data.auth) {
                alert("login first");
            } else {
                if(res.data.saved) {
                    this.setState({
                        favored: !favored
                    });
                }
            }
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.componentDidMount();
    }

    componentDidMount() {
        let id = this.props.match.params.articleId;
        //get single article
        axios.get(process.env.REACT_APP_SERVER + '/articles/getById/' + id).then(res => {
            if(res.data.query) {
                this.setState({
                    article: res.data.article,
                    comments: res.data.comments,
                    favorNum: res.data.favorNum
                });
            }else {
                alert("system error");
            }
        });

        axios.get(process.env.REACT_APP_SERVER + '/favored/check/' + id, {withCredentials: true}).then(res => {
            if(res.data.auth && res.data.favor) {
                this.setState({
                    favored: true
                });
            }
        });

        $('#face').find('button').bind('click', this.handleEmoji);
    }

    componentWillUnmount() {
        $('#face').find('button').unbind('click', this.handleEmoji);
    }

    render() {
        let article = this.state.article;
        let comments = this.state.comments;
        return (
            <div className="single-article">
                <div className="container">
                    <div className="row">
                        <div className="col-2 align-self-start left">
                            <img src={process.env.REACT_APP_SERVER + '/users/uploads/' + article.userId.headImg}
                                 className="thumbnail"/>
                            {article.userId.username}
                        </div>
                        <div className="col-10 align-self-end right">
                            <div className="header">{article.title}</div>
                            <div className="date">{article.date}</div>
                            <div className="text" dangerouslySetInnerHTML={{ __html: article.text }}>
                            </div>
                            <div className="heat">
                                <i className="fa fa-commenting-o" aria-hidden="true">
                                    <span>&nbsp;&nbsp;{comments.length}</span>
                                </i>
                                <i onClick={() => this.addToFavor()} className={`${this.state.favored ? 'fas favored' : 'far'} fa-heart`} aria-hidden="true">
                                    <span>&nbsp;&nbsp;{this.state.favorNum}</span>
                                </i>
                            </div>
                            <div className="comment">
                                <div className="edit_comment">
                                    <div className="input-group input-group">
                                        <div className="input-group-prepend dropdown">
                                            <span id="dropdownMenu2"
                                                  className="input-group-text dropdown-toggle"
                                                  data-toggle="dropdown" aria-haspopup="true" aria-hidden="true">
                                                <i className="fa fa-smile-o"></i>
                                            </span>
                                            <ul id="face" className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                <li>
                                                    <button>⊙﹏⊙b</button>
                                                    <button>~(@^_^@)~</button>
                                                    <button>（ˉ﹃ˉ）</button>
                                                </li>
                                                <li>
                                                    <button>(ㄒoㄒ)</button>
                                                    <button>(╰_╯)#</button>
                                                    <button>(@﹏@)~</button>
                                                </li>
                                                <li>
                                                    <button>(╯﹏╰)b</button>
                                                    <button>(⊙_⊙?)</button>
                                                    <button>(ˇ__ˇ)</button>
                                                </li>
                                                <li>
                                                    <button>(#‵′)凸</button>
                                                    <button>o(>﹏>)o</button>
                                                    <button>O(∩_∩)O</button>
                                                </li>
                                                <li>
                                                    <button>(*^◎^*)</button>
                                                    <button>o(≧v≦)o</button>
                                                    <button>╭(╯^╰)╮</button>
                                                </li>
                                                <li>
                                                    <button>（＞﹏＜）</button>
                                                    <button>╮(╯_╰)╭</button>
                                                    <button>（￣Ｑ￣）╯</button>
                                                </li>
                                                <li>
                                                    <button>(づ￣ 3￣)づ</button>
                                                    <button>[]~(￣▽￣)~*</button>
                                                    <button>╰（‵□′）╯</button>
                                                </li>
                                                <li>
                                                    <button>＼（￣︶￣）／</button>
                                                    <button>〈（＿ ＿）〉</button>
                                                    <button>( ⊙ o ⊙ )！</button>
                                                </li>
                                                <li>
                                                    <button>Σ( ° △ °|||)|</button>
                                                    <button>（￣ c￣）y▂ξ</button>
                                                    <button>(￣o￣) . z Z</button>
                                                </li>
                                            </ul>
                                        </div>
                                        <input id="publish_text" type="text" value={this.state.current_comment} className="form-control"/>
                                        <div className="input-group-append">
                                            <button onClick={(e) => this.publish(e)} className="btn btn-outline-secondary" type="button"
                                                    id="button-addon2">Publish
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <div className="list-group">
                                    {comments.map((comment, key) =>
                                        <a className="list-group-item">
                                        <img src={process.env.REACT_APP_SERVER + '/users/uploads/' + comment.userId.headImg}/>
                                        <a href="">{comment.userId.username}</a>
                                        <p>{comment.text}</p>
                                        <button className="btn btn-default">Reply</button>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SingleArticle);