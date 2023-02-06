import {fetchProjectComments, fetchAllProjectComments} from "util/bimmanagementAPI/fetchProjectComment";
// *******************************************
// Custom Property Panel
// *******************************************
import "./style.css"

class ProjectCommmentPanel extends Autodesk.Viewing.UI.PropertyPanel {

    constructor(viewer, options) {
        super(viewer.container);
        this.addVisibilityListener(() => this.removeAllProperties())
    }

    getComment(buildingid, geometryId) {
        fetchProjectComments(buildingid, geometryId).then(res => {
            res.comments.map((element) => {
                this.addProperty(element.name, element.problem)
            })
        })
    }
}
class ProjectCommmentTree extends Autodesk.Viewing.UI.PropertyPanel {
    constructor(viewer, options) {
        super(viewer.container);
        this.addVisibilityListener(() => this.removeAllProperties())
    }
    getComment(buildingid) {
        fetchProjectComments(buildingid, geometryId).then(res => {
            res.comments.map((element) => {
                this.addProperty(element.name, element.problem)
            })
        })
    }
}



// *******************************************
// Custom Properties Extension
// *******************************************
class getProjectComment extends Autodesk.Viewing.Extension {
    static extensionName = "CustomPropertyPanel"

    constructor(viewer, options) {
        super(viewer, options);
    }

    async load() {
        //this.panel.addProperty('UserName','该部分不对。。。。。。。')
        //this.panel.setVisible(true)
        return true;
    }

    async unload() {
        //var ext = await this.viewer.getExtension('Autodesk.PropertiesManager');
        //ext.setDefaultPanel();
        return true;
    }

    async getAllComment() {
        let allcomment= await fetchAllProjectComments(this.options.id)
        let allid= await allcomment.map((element)=>{return parseInt(element.geometryId)})
        return allid

    }

    onToolbarCreated() {
        this._group = this.viewer.toolbar.getControl('approvalToolbar');
        if (!this._group) {
            this._group = new Autodesk.Viewing.UI.ControlGroup('approvalToolbar');
            this.viewer.toolbar.addControl(this._group);
        }
        this._button = new Autodesk.Viewing.UI.Button('approvalToolbarButton');
        this._button.onClick = (ev: any) => {
            let selectionCount = this.viewer.getSelectionCount()
            let selection = this.viewer.getSelection()[0]
            if (!this.panel) {
                this.panel = new ProjectCommmentPanel(this.viewer, {"id": "approval", "title": "审图建议", "option": {}});
            }
            if (selectionCount !== 1) {
                this.getAllComment().then(res=>{
                    console.log(res)
                    this.viewer.isolate(res)
                })
                alert("请选择一个构件")
            } else {
                if (this.panel.isVisible()) {
                    this.panel.setVisible(false);
                    this._button.removeClass('active');
                } else {
                    this.panel.getComment(this.options.id, selection)
                    this.panel.setVisible(true);
                    //this.panel.removeAllProperties()
                    this._button.addClass('active');
                }
            }
        };
        this._button.setToolTip('审图');
        this._button.setIcon("gg-comment")
        this._group.addControl(this._button);
    }

}

export default getProjectComment