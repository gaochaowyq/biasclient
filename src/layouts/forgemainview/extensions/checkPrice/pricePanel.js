
declare var Autodesk: any;
declare var Viewing: any;
export default class pricePanel extends Autodesk.Viewing.Extension {
    static extensionName = 'pricePanel'
    options: any;
    _filter: any;
    _crossSelection: any;
    _group: any;
    _button: any;
    _panel: any;
    _onModelLoaded: any;
    _onSelectionChanged: any;

    constructor(viewer: Autodesk.Viewing.Viewer3D, options: Autodesk.Viewing.ExtensionOptions) {
        super(viewer, options);
        this.options = options || {};
        this._filter = this.options.filter || ['2d', '3d'];
        this._crossSelection = !!this.options.crossSelection;
        this._group = null;
        this._button = null;
        this._panel = null;
        this._onModelLoaded = this.onModelLoaded.bind(this);
        this._onSelectionChanged = this.onSelectionChanged.bind(this);
    }

    async load() {
        this.viewer.addEventListener(Autodesk.Viewing.MODEL_ROOT_LOADED_EVENT, this._onModelLoaded);
        if (this._crossSelection) {
            this.viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, this._onSelectionChanged);
        }
        console.log('NestedViewerExtension has been loaded.');
        return true;
    }

    isSelectionSame(sel1: string | any[], sel2: string | any[]) {
        if (sel1.length !== sel2.length)
            return false;

        for (let i = 0; i < sel1.length; i++) {
            if (sel1[i] !== sel2[i])
                return false;
        }

        return true;
    }


    unload() {
        return true;
    }

    activate() {
    }

    deactivate() {
    }

    onToolbarCreated() {
        this._group = this.viewer.toolbar.getControl('nestedViewerExtensionToolbar');
        if (!this._group) {
            this._group = new Autodesk.Viewing.UI.ControlGroup('nestedViewerExtensionToolbar');
            this.viewer.toolbar.addControl(this._group);
        }
        this._button = new Autodesk.Viewing.UI.Button('nestedViewerExtensionButton');
        this._button.onClick = (ev: any) => {
            if (!this._panel) {
                this._panel = new NestedViewerPanel(this.viewer, this._filter, this._crossSelection);
                this._panel.urn = this.viewer.model.getData().urn;
            }
            if (this._panel.isVisible()) {
                this._panel.setVisible(false);
                this._button.removeClass('active');
            } else {
                this._panel.setVisible(true);
                this._button.addClass('active');
            }
        };
        this._button.setToolTip('Nested Viewer');
        this._button.addClass('nestedViewerExtensionIcon');
        this._group.addControl(this._button);
    }

    onModelLoaded() {
        console.log("model loaded")
    }

    onSelectionChanged() {
        console.log("selection loaded")
    }

}


class NestedViewerPanel {
    _panel: any;
    _urn: any;
    _parentViewer: any;
    _filter: any;
    _crossSelection: any;
    _container: any;
    _overlay: any;
    _dropdown: any;
    _footer: any;
    _viewer: any;

    constructor(viewer: Autodesk.Viewing.Viewer3D, filter: any, crossSelection: any) {
        this._panel = new Autodesk.Viewing.UI.DockingPanel(viewer.container, 'nested-viewer-panel', 'Nested Viewer');
        this._urn = '';
        this._parentViewer = viewer;
        this._filter = filter;
        this._crossSelection = crossSelection;
        this._dropdown = document.createElement('select');
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

        this._panel.title = this._panel.createTitleBar(this._panel.titleLabel || this._panel.container.id);
        this._panel.container.appendChild(this._panel.title);

        this._container = document.createElement('div');
        this._container.style.position = 'absolute';
        this._container.style.left = '0';
        this._container.style.top = '50px';
        this._container.style.width = '100%';
        this._container.style.height = '330px'; // 400px - 50px (title bar) - 20px (footer)
        this._panel.container.appendChild(this._container);

        this._overlay = document.createElement('div');
        this._overlay.style.width = '100%';
        this._overlay.style.height = '100%';
        this._overlay.style.display = 'none';
        this._overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        this._overlay.style.color = 'white';
        this._overlay.style.zIndex = '101';
        this._overlay.style.justifyContent = 'center';
        this._overlay.style.alignItems = 'center';
        this._container.appendChild(this._overlay);

        this._dropdown = document.createElement('select');
        this._dropdown.style.position = 'absolute';
        this._dropdown.style.left = '1em';
        this._dropdown.style.top = '1em';
        this._dropdown.style.setProperty('z-index', '100');
        this._dropdown.setAttribute('id', 'nestedViewerExtensionDropdown');
        this._dropdown.addEventListener('change', this._onDropdownChanged.bind(this))
        this._dropdown.addEventListener('mousedown', function (ev: any) {
            ev.stopPropagation();
        }); // prevent DockingPanel from kidnapping clicks on the dropdown
        this._container.appendChild(this._dropdown);

        this._panel.initializeMoveHandlers(this._panel.container);
        this._footer = this._panel.createFooter();
        this._panel.footerInstance.resizeCallback = (width: any, height: number) => {
            this._container.style.height = `${height - 50 /* title bar */ - 20 /* footer */}px`;
            if (this._viewer) {
                this._viewer.resize();
            }
        };
        this._panel.container.appendChild(this._footer);
    }

    setVisible(show:boolean) {
        this._panel.setVisible(show);
        if (show && !this._viewer) {
            this._onDropdownChanged();
            if (this._crossSelection) {
                this._viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, () => {
                    this._parentViewer.select(this._viewer.getSelection());
                });
            }
        }
    }

    select(dbids: any) {
        if (this._viewer) {
            this._viewer.select(dbids);
        }
    }

    _updateDropdown() {
        this._dropdown.innerHTML = '';

    }

    _onDropdownChanged() {

    }

    isVisible(){
        return this._panel.isVisible();
    }
}