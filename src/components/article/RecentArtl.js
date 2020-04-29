import React from 'react';

class RecentArtl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        }
        // this.getTopMovies();
    }

    render() {
        return(
            <div className="recent_notes" v-show="display_style === 0">
                <div className="note" v-for="(note, index) in recent_note">
                    <br/>
                    Recent Articles.
                        <div className="header">
                            <div>
                                <label></label>
                                <label></label>
                            </div>
                            <strong></strong>
                        </div>
                        <br/>
                            <div className="text">
                                <div v-html="note.text"></div>
                                <div className="heat">
                                    <i className="fa fa-commenting-o" aria-hidden="true"
                                       v-if="comments[note.noteId]"><span></span></i>
                                    <i className="fa fa-heart-o" aria-hidden="true"
                                       v-if="comments[note.noteId]"><span></span></i>
                                </div>
                                <div className="list-group">
                                    <a className="list-group-item">
                                        <img/>
                                        <a></a>
                                        <span v-if="comment.remindId !== '0' ">回复<a></a></span>
                                        <p></p>
                                    </a>
                                </div>
                            </div>
                            <i className="fa fa-angle-double-down" aria-hidden="true"/>
                </div>
                <div className="load_more">
                    <a>加载更多</a>
                </div>
            </div>
        );
    }
}

export default RecentArtl;