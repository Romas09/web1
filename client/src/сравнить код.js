import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Component } from "react";
import ContentState from "draft-js/lib/ContentState";

class EditorConvertToHTML extends Component {
    state = {
        editorState: EditorState.createEmpty(),
        htmlContent: '',
        hidden: false // Добавляем состояние для определения видимости компонента
    }

    toggleVisibility = () => {
        this.setState(prevState => ({ hidden: !prevState.hidden }));
    }

    onEditorStateChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        const htmlContent = draftToHtml(convertToRaw(contentState));
        this.props.setHtmlContent(htmlContent);
        this.setState({ editorState });
    };

    render() {
        const { editorState, hidden } = this.state;
        return (
            <div style={{ display: hidden ? 'none' : 'block' }}> {/* Применяем стиль невидимости */}
                <button onClick={this.toggleVisibility}>Toggle Visibility</button> {/* Добавляем кнопку для переключения видимости */}
                <div className={'mb-5'} style={{ width: '100%', minHeight: '500px' }}>
                    <textarea
                        style={{ display: 'none' }} // Скрываем textarea
                        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                        onChange={(e) => {
                            const htmlContent = e.target.value;
                            this.setState({ htmlContent });
                            const contentBlock = htmlToDraft(htmlContent);
                            if (contentBlock) {
                                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                                const editorState = EditorState.createWithContent(contentState);
                                this.setState({ editorState });
                            }
                        }}
                    />
                    <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </div>
            </div>
        );
    }
}
export default EditorConvertToHTML;
