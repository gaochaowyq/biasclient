// *******************************************
// Custom Property Panel
// *******************************************
import "./style.css"
import {element} from "prop-types";


// *******************************************
// Custom Properties Extension
// *******************************************
class DisplayByCoder extends Autodesk.Viewing.Extension {
    static extensionName = "DisplayByCoder"

    constructor(viewer, options) {
        super(viewer, options);
        this._viewer = viewer;
    }

    async load() {
        return true;
    }

    async unload() {
        return true;
    }

    getAlldbIds() {
        let instanceTree = this._viewer.model.getInstanceTree()
        var allDbIdsStr = Object.keys(instanceTree.nodeAccess.dbIdToIndex);

        return allDbIdsStr.map(function (id) {
            return parseInt(id)
        });
    }

    async filterDbIdByCoder(coder) {
        let filterId = []
        let allDbIds = this.getAlldbIds();
        console.log(coder)
        let propertySet = await this._viewer.model.getPropertySetAsync(allDbIds, {propFilter: ["Assembly Code"]})
        propertySet.forEach((name, properties) => {
            properties.forEach((element) => {
                try {
                    if (element.displayValue.startsWith(coder)) {
                        filterId.push(element.dbId)
                    }
                } catch (e) {
                    //console.log(e)
                }
            })
        });
        return filterId
    }

    islateByCoder(coder) {
        this.filterDbIdByCoder(coder).then(res => {
            this._viewer.isolate(res)
        })
    }


    onToolbarCreated() {
        this._group = this.viewer.toolbar.getControl('displayCoderToolbar');
        if (!this._group) {
            this._group = new Autodesk.Viewing.UI.ControlGroup('displayCoderToolbar');
            this.viewer.toolbar.addControl(this._group);
        }
        this._Combobutton = new Autodesk.Viewing.UI.ComboButton('displayCoderButton');
        this._Combobutton.setIcon('gg-organisation')
        this._buttonArc = new Autodesk.Viewing.UI.Button('buttonArc');
        this._buttonStu = new Autodesk.Viewing.UI.Button('buttonStu');
        this._buttonMep = new Autodesk.Viewing.UI.Button('buttonMep');
        this._buttonArc.setIcon('gg-home')
        this._buttonArc.setToolTip('建筑')
        this._buttonStu.setIcon('gg-ghost')
        this._buttonStu.setToolTip('结构')
        this._buttonMep.setIcon('gg-gitter')
        this._buttonMep.setToolTip('暖通')
        this._Combobutton.addControl(this._buttonArc)
        this._Combobutton.addControl(this._buttonStu)
        this._Combobutton.addControl(this._buttonMep)
        this._buttonArc.onClick = () => {
            this.islateByCoder("14-10")
        }
        this._buttonStu.onClick = () => {
            this.islateByCoder("14-20")
        }
        this._buttonMep.onClick = () => {
            this.islateByCoder("14-30")
        }
        /*
        this._button.onClick = (ev: any) => {
            let selectionCount = this.viewer.getSelectionCount()
            let selection=this.viewer.getSelection()[0]
            if (!this.panel) {
                this.panel = new ProjectCommmentPanel(this.viewer, {"id":"approval", "title":"审图建议","option":{}});
            }
            if (selectionCount!==1){
                alert("请选择一个构件")
            }
            else {
                if (this.panel.isVisible()) {
                    this.panel.setVisible(false);
                    this._button.removeClass('active');
                } else {
                    this.panel.getComment(this.options.id,selection)
                    this.panel.setVisible(true);
                    //this.panel.removeAllProperties()
                    this._button.addClass('active');
                }
            }
        };

         */
        this._group.addControl(this._Combobutton);
    }

}

export default DisplayByCoder