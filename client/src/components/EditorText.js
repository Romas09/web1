import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {Component} from "react";
import ContentState from "draft-js/lib/ContentState";
import {Button} from "react-bootstrap";


class EditorConvertToHTML extends Component {
    state = {
        editorState: EditorState.createEmpty(),
        htmlContent: '',
        hidden: false
    }
    toggleVisibility = () => {
        this.setState(prevState => ({ hidden: !prevState.hidden }));
    }


    onEditorStateChange: Function = (editorState) => {
        this.setState({
            editorState,
        });console.log(editorState);
    };

    onEditorStateChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        const htmlContent = draftToHtml(convertToRaw(contentState));
        this.props.setHtmlContent(htmlContent); // Обновляем htmlContent в родительском компоненте
        this.setState({ editorState });
    };
    render() {
        const { editorState, hidden } = this.state;
        return (<>
            <Button className={'bg-dark border-dark text-success'} onClick={this.toggleVisibility}>Toggle Visibility</Button>
            <div style={{ display: hidden ? 'none' : 'block' }}> {/* Применяем стиль невидимости */}

               <textarea
                   className={'mb-5'}

                   style={{ width: '100%', minHeight: '500px' }}
                   value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                   onChange={(e) => {
                       // Обработчик изменения значения в текстовом поле
                       const htmlContent = e.target.value;
                       this.setState({ htmlContent }); // Обновление состояния компонента
                       const contentBlock = htmlToDraft(htmlContent);
                       if (contentBlock) {
                           const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                           const editorState = EditorState.createWithContent(contentState);
                           this.setState({ editorState }); // Установка нового состояния редактора
                       }
                   }}
               />

                <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                />

            </div></>
        );
    }
}
export default EditorConvertToHTML;