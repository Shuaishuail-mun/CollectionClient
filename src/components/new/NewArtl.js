import React from 'react';
import '../../css/newArticle.scss';
import headImg from "../../images/add-headimg.png"
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import $ from 'jquery';

class NewArtl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: headImg,
            cropResult: headImg
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

    componentDidMount() {
        $('#emoji').find('button').bind('click', this.handleEmoji);
    }

    componentWillUnmount() {
        $('#emoji').find('button').unbind('click', this.handleEmoji);
    }

    render() {
        return (
            <div>
                <div class="container">
                    <div class="row">
                        <div class="left col-sm-3">
                            <div className="img-button circle" data-toggle="modal" data-target="#headImg">
                                <img src={headImg} className="img-thumbnail"/>
                                <span className="reveal"></span>
                            </div>
                            <div className="modal fade" id="headImg" tabIndex="-1" role="dialog" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
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
                                            <button onClick={(e) => alert("close")} type="button" className="btn btn-secondary"
                                                    data-dismiss="modal">Change
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h4>username</h4>
                            <div className="list-group">
                                <a className="list-group-item active">星期-</a>
                                <a className="list-group-item">4月2日</a>
                            </div>
                            {/*<div id="face_panel" v-show="false" class="container">
                                <div class="row">
                                    <div class="col-sm-5">
                                        <button class="upload_button">上传</button>
                                        <div>
                                            <canvas id="canvas" width="200" height="200"></canvas>
                                        </div>
                                    </div>
                                    <div class="col-sm-7 src-file">
                                        <a href="javascript:;" class="file">选择裁剪图片
                                            <input type="file" name="" id="face_file"/>
                                        </a>
                                        <img id="face_image"/>
                                    </div>
                                </div>
                            </div>*/}
                        </div>
                    <div class="right col-sm-9">
                        {/*<div id="image_upload" v-show="false">
                            <div class="file-upload btn btn-primary">
                                <span>选择图片</span>
                                <input type="file" id="image_file" class="upload"/>
                            </div>
                            <input type="text" id="imageuploadurl" readonly placeholder="文件大小不超过5M"/><br/><br/>
                                <button class="conform">确定</button>
                        </div>
                        <div id="music_input" v-show="false">
                            <textarea id="music_html" class="form-control" rows="5" v-model="music_value"></textarea>
                            <div>
                                <span><br/>
                                使用方式:<br/>
                                1.在网页版（music.163.com）进入单曲、歌单、专辑、电台节目页面后，点击 “生成外链播放器” 链接。<br/>
                                2.歌单和专辑外链播放器可以选择大中小三种尺寸，单曲和电台节目可以选择中小两种尺寸。你可以选择最适合你网站设计的尺寸。<br/>
                                3.还可以选择是否要自动播放，打上勾后，别人查看时播放器会自动开始播放。<br/>
                                4.最后将播放器的代码黏贴过来，大功告成！
                                </span><br/><br/>
                            </div>
                            <div class="button_right"><button type="button" class="btn btn-default">确定</button></div>
                        </div>*/}
                        <div class="editor">
                            <div class="btn-group" role="group" aria-label="...">
                                <button type="button" class="btn btn-default font-color" data-title="字体颜色">
                                    <i className="fas fa-font"></i>
                                    <input name="font-color" type="color" onChange={(e) => this.handleColorChange(e)}/>
                                </button>
                                <button type="button" class="btn btn-default back-color" data-title="背景颜色">
                                    <i className="fas fa-font"></i>
                                    <input name="back-color" type="color" defaultValue="#ffffff" onChange={(e) => this.handleColorChange(e)}/>
                                </button>
                                <button onClick={(e) => this.handleFormatChange('Bold', e)} type="button" class="btn btn-default" data-title="加粗">
                                    <i className="fas fa-bold"></i>
                                </button>
                                <button onClick={(e) => this.handleFormatChange('removeFormat', e)} type="button" class="btn btn-default" data-title="清空格式">
                                    <i className="fas fa-eraser"></i>
                                </button>
                                <button onClick={(e) => this.handleFormatChange('italic', e)} type="button" class="btn btn-default" data-title="斜体">
                                    <i className="fas fa-italic"></i>
                                </button>
                                <button onClick={(e) => this.handleFormatChange('underline', e)} type="button" class="btn btn-default" data-title="下划线">
                                    <i className="fas fa-underline"></i>
                                </button>
                                <button onClick={(e) => this.handleFormatChange('justifyCenter', e)} type="button" class="btn btn-default" data-title="居中">
                                    <i className="fas fa-align-center"></i>
                                </button>
                                <button onClick={(e) => this.handleFormatChange('justifyLeft', e)} type="button" class="btn btn-default" data-title="左对齐">
                                    <i className="fas fa-align-left"></i>
                                </button>
                                <button onClick={(e) => this.handleFormatChange('justifyRight', e)} type="button" class="btn btn-default" data-title="右对齐">
                                    <i className="fas fa-align-right"></i>
                                </button>
                                <button onClick={(e) => this.handleFormatChange('justifyFull', e)} type="button" class="btn btn-default" data-title="文本对齐">
                                    <i className="fas fa-align-justify"></i>
                                </button>
                                <button type="button" class="btn btn-default addTextImage" data-title="图片">
                                    <i className="fas fa-image"></i>
                                    <input type="file" onChange={(e) => this.insertTextImage(e)}/>
                                </button>
                                <button type="button" class="btn btn-default" data-toggle="modal" data-target="#addMusic" data-title="音乐">
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
                                    <button type="button" class="btn btn-default dropdown-toggle" data-title="字体类型" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                                        <a class="dropdown-item">private</a>
                                        <a className="dropdown-item">public</a>
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
                                <input type="text" className="form-control" placeholder="Add a Title" aria-label="Username"
                                       aria-describedby="basic-addon1"/>
                            </div>
                            <div class="publish">
                                <span>Record your Life</span>
                                <button type="button" class="btn btn-default">发布</button>
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