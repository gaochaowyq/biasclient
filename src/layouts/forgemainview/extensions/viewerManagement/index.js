import {fetchProjectViewer, postProjectViewer} from "util/bimmanagementAPI/fetchProjectViewer";
// *******************************************
// Viewer Management
// Camera Saveed as ......
// Section Saved as .......
// Saveed as ViewerManagement.json in Server
// *******************************************
import "./style.css"
// *******************************************
// viewer Panel on the top of screed
// *******************************************

class viewerManagetPanel extends Autodesk.Viewing.UI.DockingPanel {
    constructor(viewer, options) {
        super(viewer.container, 1, "视图管理");
        this._viewer=viewer
        this.container.style.height = "auto";
        this.container.style.width = "150px";
        this.container.style.left = "10px";
        this.container.style.top = "10px";
    }

    initialize() {
        super.initialize();
        this.createScrollContainer({left: false, heightAdjustment: true, marginTop: "10px"})
        this.scrollContainer.style.backgroundColor = "#bbb7b7"
        //TODO Fixed Height
        this.ul = document.createElement("ul")
        this.scrollContainer.appendChild(this.ul)
    }

    updateviewer(vs: {}) {
        this.ul.innerHTML = '';
        vs.forEach(
            (item) => {
                let li = document.createElement('li')
                let a = document.createElement('a')
                a.innerText = item.name;
                a.onclick=()=>{
                    this._viewer.restoreState(item)
                }
                li.appendChild(a);
                this.ul.appendChild(li)
            }
        )
    }


}


class viwerManagement extends Autodesk.Viewing.Extension {
    static extensionName = "viwerManagement"

    constructor(viewer, options) {
        super(viewer, options);
        this.viewercount = 0
    }

    async load() {
        //this.panel.addProperty('UserName','该部分不对。。。。。。。')
        //this.panel.setVisible(true)
        this.viewerManagePanel = new viewerManagetPanel(this.viewer, {})
        return true;
    }

    async unload() {
        //var ext = await this.viewer.getExtension('Autodesk.PropertiesManager');
        //ext.setDefaultPanel();
        return true;
    }

    onToolbarCreated() {
        this._group = this.viewer.toolbar.getControl('viewerManagement');
        if (!this._group) {
            this._group = new Autodesk.Viewing.UI.ControlGroup('viewerManagement');
            this.viewer.toolbar.addControl(this._group);
        }
        this._Combobutton = new Autodesk.Viewing.UI.ComboButton('viewerManagementButton');
        this._Combobutton.setIcon('gg-camera')
        this._button = new Autodesk.Viewing.UI.Button('displayViewerPanel');
        this._button2 = new Autodesk.Viewing.UI.Button('addViewer');
        this._Combobutton.addControl(this._button)
        this._Combobutton.addControl(this._button2)
        this._button.onClick = (ev: any) => {
            this.viewerManagePanel.setVisible(!this.viewerManagePanel.isVisible())
            fetchProjectViewer(this.options.projectid).then(
                res => {
                    if (res != null) {
                        this.viewerManagePanel.updateviewer(res.viewer)
                    }
                    else {
                        this.viewerManagePanel.updateviewer([{name:"没有可用视图"}])
                    }
                }
            )
            if (this._button1.isActive){
                this._button1.removeClass('active');
            }
            else {
                this._button1.addClass('active');
            }

            //this._button.setActive(!this._button.isActive)
            //1 click button and create name input panel
            //2 click confirm button and same viewer to server
            //3 update viewer panel to show new created
        };
        // button2 is Add viewerButton
        this._button2.onClick = (ev: any) => {
            //this._button.setActive(!this._button.isActive)
            //1 click button and create name input panel
            //2 click confirm button and same viewer to server
            //3 update viewer panel to show new created
            let currentState = this.viewer.getState();


            currentState["name"] = "视图" + (this.viewercount+1)
            postProjectViewer(this.options.projectid, currentState).then(
                res => {
                    if (res !== null) {
                        console.log(res)
                        this.viewercount=res['viewer'].length
                        console.log("create viewer success")
                    }

                }
            )


        };

        this._button.setToolTip("显示视图");
        this._button.setIcon("gg-add-r")
        this._button2.setToolTip("添加视图");
        this._button2.setIcon("gg-layout-list")
        this._group.addControl(this._Combobutton);
    }

}

export default viwerManagement