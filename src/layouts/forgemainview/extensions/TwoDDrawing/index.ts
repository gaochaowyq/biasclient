import {ForgeExtension} from "@contecht/react-adsk-forge-viewer"
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {fetchMainfest} from "util/forgeAPI/fetchMainfest"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const css = require('./style.css');
declare var THREE: any;
declare var Autodesk: any;
export default class TwoDDrawing extends ForgeExtension {
    public static extensionName = 'TwoDDrawing';
    public panel: any;
    public container: any;
    public overlay: any;
    public buttons: [any];
    public model: any;
    public urn:string;

    onModelLoaded(event: any) {
        //this.model = event.model;
        //console.log("onModelLoaded")
        //this.initUI();
        //console.log(this.model.urn);

    }

    async load() {
        // change selection color to red
        const red = new THREE.Color(1, 0, 0);
        this.viewer.setSelectionColor(red, Autodesk.Viewing.SelectionType.MIXED);
        var continer = this.viewer.canvas
        //const viewerSearch = await this.viewer.loadExtension("Autodesk.InViewerSearch");
        this.viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
            this.onModelLoaded, {once: true});
        this.initUI()
        //const urn = this.viewer.model.getData().urn
        //this.load2dViewer(urn)
        return true;
    }


    unload(): boolean {
        return true;
    }


    activate() {
    }

    deactivate() {
    }

    initUI() {
        console.log("init model")
        this.panel = new Autodesk.Viewing.UI.DockingPanel(this.viewer.container, '2d-viewer-panel', '平面图');
        this.panel.container.style.top = '5em';
        this.panel.container.style.right = '5em';
        this.panel.container.style.width = '200px';
        this.panel.container.style.height = '400px';
        //this.panel.title = this.panel.createTitleBar(this.panel.titleLabel || this.panel.container.id);
        //this.panel.container.appendChild(this.panel.title);
        this.container = document.createElement('div');
        this.container.style.position = 'absolute';
        this.container.style.left = '0';
        this.container.style.top = '50px';
        this.container.style.width = '100%';
        this.container.style.height = '330px'; // 400px - 50px (title bar) - 20px (footer)
        this.panel.container.appendChild(this.container);
        this.overlay = document.createElement('div');
        this.overlay.style.width = '100%';
        this.overlay.style.height = '100%';
        this.overlay.style.display = 'none';
        this.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        this.overlay.style.color = 'white';
        this.overlay.style.zIndex = '101';
        this.overlay.style.justifyContent = 'center';
        this.overlay.style.alignItems = 'center';
        this.panel.container.appendChild(this.overlay);
        /*
        fetchMainfest(urn).then((res: any) => console.log(res))
        for (var i = 0; i < 5; i++) {
            let ccc = document.createElement('div');
            let button = React.createElement(Button, {}, "waterver");
            var root = createRoot(ccc);
            root.render(button);
            this.container.appendChild(ccc)
        }
         */


    }


    onToolbarCreated() {
        // Create a new toolbar group if it doesn't exist
        let _group = this.viewer.toolbar.getControl('TwoDDrawingToolbar');
        if (!_group) {
            _group = new Autodesk.Viewing.UI.ControlGroup('TwoDDrawingToolbar');
            this.viewer.toolbar.addControl(_group);
        }

        // Add a new button to the toolbar group
        var _button = new Autodesk.Viewing.UI.Button('TwoDDrawingButton');
        _button.onClick = (ev: any) => {
            console.log(this.panel)
            this.panel.setVisible(true)
        };
        _button.setToolTip('平面图');
        _button.addClass(css.TwoDDrawingButtonIcon);
        // @ts-ignore
        _group.addControl(_button);
    }

}