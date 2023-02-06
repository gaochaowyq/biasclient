import './style.css'
import React from 'react'
import { createRoot } from 'react-dom/client';
import MDSlider from "components/MDSlider";


// *******************************************
// Custom Properties Extension
// *******************************************


class timeControl extends Autodesk.Viewing.Extension {
    static extensionName = "timeControl"
    constructor(viewer, options) {
        super(viewer, options);
        this.options = options;
        this._container=viewer.container;
        this._viewer = viewer;
    }
    createTimerUI(container){

        container.classList.add('react-docking-panel')
        let DOMContent = document.createElement('div')

        DOMContent.className = 'content'

        container.insertBefore(DOMContent, container.firstChild);
        let reactroot=createRoot(DOMContent)
        reactroot.render(<MDSlider viewer={this._viewer}/>)

    }

    load() {
        this._viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT,()=>this.createTimerUI(this._container));
        return true;
    }

    async unload() {
        return true;
    }
}

export default timeControl