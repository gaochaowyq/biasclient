/// <reference types="forge-viewer" />
import {ForgeExtension} from "@contecht/react-adsk-forge-viewer"

class ProblemChatPanel {
    _panel: any;
    _urn: any;
    _parentViewer: any;
    _filter: any;
    _container: any;
    _overlay: any;
    _content: any;
    _footer: any;
    _viewer: any;
    _onSelectionChanged: any;

    constructor(viewer: Autodesk.Viewing.Viewer3D, panelname: string, content: []) {
        this._panel = new Autodesk.Viewing.UI.DockingPanel(viewer.container, panelname, panelname);
        this._urn = '';
        this._content = content;
        this._parentViewer = viewer;
        this._viewer = viewer
        this._onSelectionChanged = this.onSelectionChanged.bind(this);
        this.initialize();
    }

    get urn() {
        return this._urn;
    }

    set urn(value) {
        if (this._panel._urn !== value) {
            this._panel._urn = value;
            this._updateDropdown();
        }
    }

    initialize() {
        this._panel.container.style.top = '5em';
        this._panel.container.style.right = '5em';
        this._panel.container.style.width = '200px';
        this._panel.container.style.height = '400px';

        this._panel.title = this._panel.createTitleBar(this._panel.titleLabel);

        //this._panel.container.appendChild(this._panel.title);
        this._container = document.createElement('div');
        this._container.style.position = 'absolute';
        this._container.style.left = '0';
        this._container.style.top = '50px';
        this._container.style.width = '100%';
        this._container.style.height = '330px'; // 400px - 50px (title bar) - 20px (footer)
        this._container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        this._container.style.color = 'white';
        this._container.style.justifyContent = 'center';
        this._container.style.alignItems = 'center';
        this._panel.container.appendChild(this._container);


        this._panel.initializeMoveHandlers(this._panel.container);
        this._footer = this._panel.createFooter();
        this._panel.footerInstance.resizeCallback = (width: any, height: number) => {
            this._container.style.height = `${height - 50 /* title bar */ - 20 /* footer */}px`;
            if (this._viewer) {
                this._viewer.resize();
            }
        };
        this._panel.container.appendChild(this._footer);
        this.setContent([{name: "a", value: "a"}, {name: "a", value: "a"}, {name: "a", value: "a"}])
        this._viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, this._onSelectionChanged);
    }

    setVisible(show: boolean) {
        this._panel.setVisible(show);
        if (show && !this._viewer) {
        }
    }

    select(dbids: any) {
        if (this._viewer) {
            this._viewer.select(dbids);
        }
    }

    setContent(content: any) {
        content.forEach((element: any) => {
                let content = document.createElement('p')
                content.innerText = `${element.name}:${element.value}`
                this._container.appendChild(content)
            }
        )

    }

    _updateDropdown() {

    }

    _onDropdownChanged() {

    }

    _cleanContent() {

        while (this._container.firstChild) {
            this._container.removeChild(this._container.lastChild);
        }
    }

    onSelectionChanged() {
        if (this._panel) {
            // Avoid endless loop between main viewer and
            // the nested viewer calling each other's select() method
            this._cleanContent()
            let vs = this._viewer.getSelection();
            let content = document.createElement('p')
            content.innerText = `name:${vs[0]}`
            this._container.appendChild(content)
            console.log(vs[0])
        }

    }

    isVisible() {
        return this._panel.isVisible();
    }
}

// *******************************************
// Custom ProblemChat Extension
// *******************************************
export default class ProblemChat extends ForgeExtension {
    public static extensionName = 'ProblemChat';
    public panel:any;
    public _group:any;
    public _button:any;

    activate(): void {
        throw new Error("Method not implemented.");
    }

    deactivate(): void {
        throw new Error("Method not implemented.");
    }

    constructor(viewer: any, options: any) {
        super(viewer, options);
        console.log(options)
        // @ts-ignore
    }

    async load() {
        console.log("show panel")
        return true;
    }

    async unload() {
        //var ext = await this.viewer.getExtension('Autodesk.PropertiesManager');
        //ext.setDefaultPanel();
        return true;
    }

    onToolbarCreated() {
        this._group = this.viewer.toolbar.getControl('problemChatExtensionToolbar');
        if (!this._group) {
            this._group = new Autodesk.Viewing.UI.ControlGroup('problemChatExtensionToolbar');
            this.viewer.toolbar.addControl(this._group);
        }
        this._button = new Autodesk.Viewing.UI.Button('problemChatExtensionButton');
        this._button.onClick = (ev: any) => {
            if (!this.panel) {
            this.panel = new ProblemChatPanel(this.viewer, "problem", []);

            }
            if (this.panel.isVisible()) {
                this.panel.setVisible(false);
                this._button.removeClass('active');
            } else {
                this.panel.setVisible(true);
                this._button.addClass('active');
            }
        };
        this._button.setToolTip('problemChat');
        this._button.addClass('nestedViewerExtensionIcon');
        this._group.addControl(this._button);
    }

}