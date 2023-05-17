import {createRoot} from 'react-dom/client';

import AddViewerNameUI from './component/AddViewerNameUI'
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

class viwerManagement extends Autodesk.Viewing.Extension {
    static extensionName = "viwerManagement"

    constructor(viewer, options) {
        super(viewer, options);
        this.options=options;
        this._viewer=viewer
        this.container = viewer.container
    }

    async load() {
        let _DOMContent = document.createElement('div')
        _DOMContent.className = 'addViewerNameUI'
        this.container.insertBefore(_DOMContent, this.container.firstChild);
        let reactroot = createRoot(_DOMContent)
        console.log(this.options.projectid)
        reactroot.render(<AddViewerNameUI viewer={this._viewer} projectid={this.options.projectid}/>)
        return true;
    }



    async unload() {
        //var ext = await this.viewer.getExtension('Autodesk.PropertiesManager');
        //ext.setDefaultPanel();
        return true;
    }

    onToolbarCreated() {
    }

}

export default viwerManagement