import {ForgeExtension} from "@contecht/react-adsk-forge-viewer"

declare var THREE: any;
declare var Autodesk: any;
export default class ExampleExtension extends ForgeExtension {
    public static extensionName = 'ExampleExtension';
    public onModelLoaded(event: any) {
        const model = event.model;
        const info = new Autodesk.DataVisualization.Core.ModelStructureInfo(model);
    }

    async load() {
        // change selection color to red
        const red = new THREE.Color(1, 0, 0);
        this.viewer.setSelectionColor(red, Autodesk.Viewing.SelectionType.MIXED);
        var  continer=this.viewer.canvas
        const viewerSearch = await this.viewer.loadExtension("Autodesk.InViewerSearch");

        this.viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
            this.onModelLoaded, {once: true});
        return true;
    }


    unload(): boolean {
        return true;
    }


    activate() {
    }

    deactivate() {
    }

    onToolbarCreated() {
        // Create a new toolbar group if it doesn't exist
        let _group = this.viewer.toolbar.getControl('allMyAwesomeExtensionsToolbar');
        if (!_group) {
            _group = new Autodesk.Viewing.UI.ControlGroup('allMyAwesomeExtensionsToolbar');
            this.viewer.toolbar.addControl(_group);
        }

        // Add a new button to the toolbar group
        var _button = new Autodesk.Viewing.UI.Button('myAwesomeExtensionButton');
        _button.onClick = (ev: any) => {
            // Execute an action here
        };
        _button.setToolTip('BasicSkeleton');
        _button.addClass('myAwesomeExtensionIcon');
        // @ts-ignore
        _group.addControl(_button);
    }


}