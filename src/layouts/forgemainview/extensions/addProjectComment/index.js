import {postProjectComments} from "util/bimmanagementAPI/fetchProjectComment";
// *******************************************
// Custom Property Panel
// *******************************************
import './style.css'


// *******************************************
// Custom Properties Extension
// *******************************************
class addProjectCommentPanel extends Autodesk.Viewing.UI.DockingPanel {
    constructor(viewer, option) {
        super(viewer.container, 'create-projcet-comment', '添加新建议');
        this.options = option
        this._parentViewer = viewer;
    }

    initialize() {
        this.container.style.top = '5em';
        this.container.style.right = '5em';
        this.container.style.width = '300px';
        this.container.style.height = '400px';
        this.title = this.createTitleBar(this.titleLabel || this.container.id);
        this.container.appendChild(this.title);
        this._container = document.createElement('div');
        this._container.style.position = 'absolute';
        this._container.style.background = "rgba(15,17,17,0.7)"
        this._container.style.left = '0';
        this._container.style.top = '50px';
        this._container.style.width = '100%';
        this._container.style.height = '330px'; // 400px - 50px (title bar) - 20px (footer)
        this.container.appendChild(this._container);
        this._container.innerHTML = [
            '<table>',
            '<thead>',
            '<th>人名</th><th>问题</th>',
            '</thead>',
            '<tbody>',
            '<tr><td contenteditable="true" ><input  type="text" id="name" name="name" value="某某某"></td><td contenteditable="true"> <input  type="text" id="problem" name="problem" value="添加问题"></td></tr>',
            '<tr><td><button type="button" id="submit" value="确认" >确认</button></td></tr>',
            '</tbody>',
            '</table>',
        ].join('\n')
        let button = this._container.getElementsByTagName('button')[0]


        button.onclick = () => {
            this.setComment()
            postProjectComments(this.commentTemplate).then(res => {
                console.log(res);
                alert("create comment success")
            })
        }
        this.initializeMoveHandlers(this.title);
        this._footer = this.createFooter();
        this.footerInstance.resizeCallback = (width, height) => {
            this._container.style.height = `${height - 50 /* title bar */ - 20 /* footer */}px`;
            if (this._viewer) {
                this._viewer.resize();
            }
        };
        this.container.appendChild(this._footer);
    }

    setComment() {
        let [peoplename, problem] = this._container.getElementsByTagName('input')
        this.commentTemplate = {
            "projectid": this.options.id,
            "geometryId": this._parentViewer.getSelection()[0],
            "comments": {"name": peoplename.value, "problem": problem.value}
        }
    }

    uninitialize() {
        super.uninitialize();
    }

    setVisible(show) {
        super.setVisible(show);
    }
}


class addProjectCommentExtension extends Autodesk.Viewing.Extension {
    static extensionName = "addProjectCommentExtension"

    constructor(viewer, options) {
        super(viewer, options);
        this.options = options
    }

    async load() {
        return true;
    }

    async unload() {
        return true;
    }


    onToolbarCreated() {
        this._group = this.viewer.toolbar.getControl('approvalToolbar');
        if (!this._group) {
            this._group = new Autodesk.Viewing.UI.ControlGroup('approvalToolbar');
            this.viewer.toolbar.addControl(this._group);
        }
        this._button = new Autodesk.Viewing.UI.Button('addapprovalToolbarButton');


        this._button.onClick = (ev: any) => {
            const initPanel = () => {
                let selection=this.viewer.getSelection()[0]
                this.panel.setTitle("为构件" + selection + "添加批注")
            }
            let selectionCount = this.viewer.getSelectionCount()
            if (selectionCount !== 1) {
                alert("请选择一个构件添加问题");
            } else {
                if (!this.panel) {
                    this.panel = new addProjectCommentPanel(this.viewer, this.options);
                    this._button.removeClass('active')
                }
                if (this.panel.isVisible()) {
                    this.panel.setVisible(false);
                    this._button.removeClass('active');
                    this.viewer.removeEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, initPanel)


                } else {
                    this.panel.setVisible(true);
                    initPanel()
                    this.viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, initPanel)
                    this._button.addClass('active');
                }
            }
        };


        this._button.setToolTip('添加意见');
        //this._button.addClass('AddProjectProblemButtonIcon');
        this._button.setIcon('gg-readme')
        this._group.addControl(this._button);
    }

}

export default addProjectCommentExtension