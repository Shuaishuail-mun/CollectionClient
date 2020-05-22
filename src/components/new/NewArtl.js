import React from 'react';
import '../../css/newArticle.scss';
import headImg from "../../images/add-headimg.png"
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import $ from 'jquery';
import axios from "axios";
import moment from "moment";

class NewArtl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headImg: headImg,
            imgSrc: headImg,
            cropResult: headImg,
            article: {
                permit: 1
            }
        };
        this.cropper = React.createRef();
        this.reader = new FileReader();
        this.handleEmoji = this.handleEmoji.bind(this);
    }

    handleFileChange(e) {
        this.setState({
            imgSrc: URL.createObjectURL(e.target.files[0])
        })
    }

    handleColorChange(event){
        const target = event.target;
        const value = target.value;
        console.log(value);
        const commandId = target.name === 'font-color'? 'ForeColor' : 'BackColor';
        document.execCommand(commandId, false, value);
    }

    handleFormatChange(commandId, event) {
        document.execCommand(commandId);
    }

    insertTextImage(event) {
        let file = event.target.files[0];
        this.reader.onload = function() {
            document.execCommand('insertImage', false, this.result);
        };
        this.reader.readAsDataURL(file);
        event.preventDefault();
    }

    handleFontFamily(value, event) {
        document.execCommand('FontName', false, value);
    }

    _crop(event){
        this.setState({
            cropResult: this.cropper.current.getCroppedCanvas().toDataURL()
        });
        // console.log(event);
        // console.log(event.detail.x + "" + event.detail.y + event.detail.width + event.detail.height);
    }

    handleEmoji(event) {
        document.execCommand('insertText', false, event.target.innerHTML);
        event.preventDefault();
    }
    sendBlob(blob){
        let data = new FormData();
        let imgSrc = this.state.cropResult;
        data.append('file', blob, 'headImg.png');
        axios.post(process.env.REACT_APP_SERVER + '/users/changeHead', data, {withCredentials: true}).then(res => {
            if(!res.data.auth) {
                alert("login first");
            } else {
                if(res.data.upload) {
                    this.setState({
                        headImg: imgSrc
                    });
                }
            }
        });
    }

    changeHeadImg(event) {
        this.cropper.current.getCroppedCanvas().toBlob((blob) => this.sendBlob(blob), 'image/png', 0.95);
    }

    handlePermitChange(event, value) {
        event.preventDefault();
        this.setState(
            {
                article: {
                    permit: value
                }
            }
        );
    }

    handlePublish() {
        let title = $('#title').val();
        let text = $('#show').html();
        let str = $('#show').text();
        let description = str.substring(0, str.length / 5);
        let permit = this.state.article.permit;
        axios.post(process.env.REACT_APP_SERVER + '/articles/add', {
            title: title,
            text: text,
            description: description,
            permit: permit
        }, {withCredentials: true}).then(res => {
            if(!res.data.auth) {
                alert("login first");
            } else {
                if(res.data.published) {
                    alert("successfully published");
                }
            }
        });
    }

    componentDidMount() {
        $('#emoji').find('button').bind('click', this.handleEmoji);

        //get head image
        axios.get(process.env.REACT_APP_SERVER + '/users/getHead', {withCredentials: true}).then(res => {
            if(res.data.headImg) {
                this.setState({
                        headImg: process.env.REACT_APP_SERVER + '/users/uploads/' + res.data.headImg
                });
            }
        });
    }

    componentWillUnmount() {
        $('#emoji').find('button').unbind('click', this.handleEmoji);
    }

    render() {
        return (
            <div className="new-article">
                <div class="container">
                    <div class="row">
                        <div class="left col-sm-2">
                            <div className="img-button circle" data-toggle="modal" data-target="#headImg">
                                <img src={this.state.headImg} className="img-thumbnail"/>
                                <span className="reveal"></span>
                            </div>
                            <div className="modal fade" id="headImg" tabIndex="-1" role="dialog" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content image-cropping">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalScrollableTitle">Change Photo</h5>
                                            <button type="button" className="close" data-dismiss="modal"
                                                    aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body container">
                                            <div className="row justify-content-center">
                                                <div className="col-6">
                                                    <div className="input-file-container">
                                                        <input className="input-file" onChange={(e) => this.handleFileChange(e)} type="file"/>
                                                        <label tabIndex="0" htmlFor="my-file" className="input-file-trigger">
                                                            Select Photo
                                                        </label>
                                                    </div>
                                                    <Cropper
                                                        ref={this.cropper}
                                                        style={{ maxHeight: 300, maxWidth: '100%' }}
                                                        // Cropper.js options
                                                        aspectRatio={1 / 1}
                                                        guides={false}
                                                        src={this.state.imgSrc}
                                                        crop={this._crop.bind(this)} />
                                                </div>
                                                <div className="col-6">
                                                    <img class="croppedImg" src={this.state.cropResult}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button onClick={(e) => this.changeHeadImg(e)} type="button" className="btn btn-info"
                                                    data-dismiss="modal">Change
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h4>username</h4>
                            <div className="list-group show-date">
                                <a className="list-group-item active">{moment().format('dddd')}</a>
                                <a className="list-group-item">{moment().format('DD MMMM')}</a>
                            </div>
                        </div>
                    <div class="right col-sm-10">
                        <div class="editor">
                            <div class="btn-group edit-lists" role="group" aria-label="...">
                                <button type="button" class="btn btn-default font-color" data-toggle="tooltip" data-placement="top" title="Font Color">
                                    <i className="fas fa-font"></i>
                                    <input name="font-color" type="color" onChange={(e) => this.handleColorChange(e)}/>
                                </button>
                                <button type="button" class="btn btn-default back-color" data-toggle="tooltip" data-placement="top" title="Back-Color">
                                    <i className="fas fa-font"></i>
                                    <input name="back-color" type="color" defaultValue="#ffffff" onChange={(e) => this.handleColorChange(e)}/>
                                </button>
                                <button onClick={(e) => this.handleFormatChange('Bold', e)} type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" title="Bold">
                                    <i className="fas fa-bold"></i>
                                </button>
                                <button onClick={(e) => this.handleFormatChange('removeFormat', e)} type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" title="CLear Format">
                                    <i className="fas fa-eraser"></i>
                                </button>
                                <button onClick={(e) => this.handleFormatChange('italic', e)} type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" title="Italic">
                                    <i className="fas fa-italic"></i>
                                </button>
                                <button onClick={(e) => this.handleFormatChange('underline', e)} type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" title="Underline">
                                    <i className="fas fa-underline"></i>
                                </button>
                                <button onClick={(e) => this.handleFormatChange('justifyCenter', e)} type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" title="Text Center">
                                    <i className="fas fa-align-center"></i>
                                </button>
                                <button onClick={(e) => this.handleFormatChange('justifyLeft', e)} type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" title="Text Left">
                                    <i className="fas fa-align-left"></i>
                                </button>
                                <button onClick={(e) => this.handleFormatChange('justifyRight', e)} type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" title="Text Right">
                                    <i className="fas fa-align-right"></i>
                                </button>
                                <button onClick={(e) => this.handleFormatChange('justifyFull', e)} type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" title="Text-Align">
                                    <i className="fas fa-align-justify"></i>
                                </button>
                                <button type="button" class="btn btn-default addTextImage" data-toggle="tooltip" data-placement="top" title="Pictures">
                                    <i className="fas fa-image"></i>
                                    <input type="file" onChange={(e) => this.insertTextImage(e)}/>
                                </button>
                                <button type="button" class="btn btn-default" data-toggle="modal" data-target="#addMusic" data-toggle="tooltip" data-placement="top" title="Music">
                                    <i className="fas fa-music"></i>
                                </button>
                                <div className="modal fade" id="addMusic" tabIndex="-1" role="dialog" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Add Photo</h5>
                                                <button type="button" className="close" data-dismiss="modal"
                                                        aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"
                                                              id="basic-addon3">Link to Music</span>
                                                    </div>
                                                    <input type="text" className="form-control" id="basic-url"
                                                           aria-describedby="basic-addon3"/>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary"
                                                        data-dismiss="modal">Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-font"></i>
                                        <span class="caret"></span>
                                    </button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item">
                                            <button type="button"
                                                    onClick={(e) => this.handleFontFamily('Microsoft YaHei UI', e)}
                                                    style={{fontFamily: "Microsoft YaHei UI"}} class="btn btn-default">
                                                Microsoft YaHei UI
                                            </button>
                                        </a>
                                        <a class="dropdown-item">
                                            <button type="button"
                                                    onClick={(e) => this.handleFontFamily('Consolas', e)}
                                                    style={{fontFamily: "Consolas"}} class="btn btn-default">
                                                Consolas
                                            </button>
                                        </a>
                                        <a class="dropdown-item">
                                            <button type="button"
                                                    onClick={(e) => this.handleFontFamily('Arial', e)}
                                                    style={{fontFamily: "Arial"}} class="btn btn-default">
                                                Arial
                                            </button>
                                        </a>
                                        <a class="dropdown-item">
                                            <button type="button"
                                                    onClick={(e) => this.handleFontFamily('-apple-system', e)}
                                                    style={{fontFamily: "-apple-system"}} class="btn btn-default">
                                                -apple-system
                                            </button>
                                        </a>
                                        <a className="dropdown-item">
                                            <button type="button"
                                                    onClick={(e) => this.handleFontFamily('宋体', e)}
                                                    style={{fontFamily: "宋体"}} className="btn btn-default">
                                                宋体
                                            </button>
                                        </a>
                                    </div>
                                </div>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-default dropdown-toggle" data-title="颜文字" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-smile-o" aria-hidden="true"></i>
                                        <span class="caret"></span>
                                    </button>
                                    <ul id="emoji" className="dropdown-menu">
                                        <li><button>⊙﹏⊙b</button><button>~(@^_^@)~</button><button>（ˉ﹃ˉ）</button></li>
                                        <li><button>(ㄒoㄒ)</button><button>(╰_╯)#</button><button>(@﹏@)~</button></li>
                                        <li><button>(╯﹏╰)b</button><button>(⊙_⊙?)</button><button>(ˇ__ˇ)</button></li>
                                        <li><button>(#‵′)凸</button><button>@_@</button><button>O(∩_∩)O</button></li>
                                        <li><button>(*^◎^*)</button><button>o(≧v≦)o</button><button>╭(╯^╰)╮</button></li>
                                        <li><button>（＞﹏＜）</button><button>╮(╯_╰)╭</button><button>（￣Ｑ￣）╯</button></li>
                                        <li><button>(づ￣ 3￣)づ</button><button>[]~(￣▽￣)~*</button><button>╰（‵□′）╯</button></li>
                                        <li><button>＼（￣︶￣）／</button><button>〈（＿　＿）〉</button><button>( ⊙ o ⊙ )！</button></li>
                                        <li><button>Σ( ° △ °|||)|</button><button>（￣ c￣）y▂ξ</button><button>(￣o￣) . z Z</button></li>
                                    </ul>
                                </div>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-default dropdown-toggle" data-title="可见性设置" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-user-lock"></i>
                                        <span class="caret"></span>
                                    </button>
                                    <div class="dropdown-menu">
                                        <a onClick={(e) => this.handlePermitChange(e, 0)} className={`dropdown-item ${this.state.article.permit === 0 ? "active" : ""}`}>private</a>
                                        <a onClick={(e) => this.handlePermitChange(e, 1)} className={`dropdown-item ${this.state.article.permit === 1 ? "active" : ""}`}>public</a>
                                    </div>
                                </div>
                            </div>
                            <div class="show" id="show" contenteditable="true">
                            </div>
                            <div class="input-group title">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><i
                                        className="fas fa-exclamation-circle"></i></span>
                                </div>
                                <input id="title" type="text" className="form-control" placeholder="Add a Title" aria-label="Username"
                                       aria-describedby="basic-addon1"/>
                            </div>
                            <div class="publish">
                                <span>Record your Life</span>
                                <button type="button" onClick={() => this.handlePublish()} class="btn btn-default">Publish</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default NewArtl;