import {fetchProjectComments, fetchAllProjectComments} from "util/bimmanagementAPI/fetchProjectComment";

class MarkUp3DExtension extends Autodesk.Viewing.Extension {

    static extensionName = 'MarkUp3DExtension';

    async load() {
        // change selection color to red
        //this.Makrupextension = new Autodesk.Viewing.Extensions.Markups.Core.MarkupsCore(this.viewer,{});
        this.Makrupextension = await this.viewer.getExtensionAsync("Autodesk.Viewing.MarkupsCore")

        return true;
    }


    unload(): boolean {
        return true;
    }


    activate() {
    }

    deactivate() {
    }

    createMarkUpToolBar() {
        if (this.Makrupextension) {
            console.log("create Mark upExtension")
            const button1 = new Autodesk.Viewing.UI.Button('button-1');
            const button2 = new Autodesk.Viewing.UI.Button('button-2');
            button1.setToolTip('Button 1');
            button1.onClick = function () {
                // Code to execute when button 1 is clicked
            };
            button2.setToolTip('Button 2');
            button2.onClick = function () {
                // Code to execute when button 2 is clicked
            };
            //toolbar.addControl(button1);
            //toolbar.addControl(button2);
            console.log(this.Makrupextension)

        }


    }


    onToolbarCreated() {
        // Create a new toolbar group if it doesn't exist
        let _group = this.viewer.toolbar.getControl('MarkUpExtension');
        if (!_group) {
            _group = new Autodesk.Viewing.UI.ControlGroup('MarkUpExtensionToolbar');
            this.viewer.toolbar.addControl(_group);
        }

        // Add a new button to the toolbar group
        var _button = new Autodesk.Viewing.UI.Button('MarkUpExtensionButton');
        _button.onClick = (ev: any) => {

            this.Makrupextension.enterEditMode();
            this.createMarkUpToolBar()
            const Cloud = new Autodesk.Viewing.Extensions.Markups.Core.EditModeCloud(this.Makrupextension)
            const Text = new Autodesk.Viewing.Extensions.Markups.Core.EditModeText(this.Makrupextension)
            this.Makrupextension.changeEditMode(Text);

            this.Makrupextension.leaveEditMode()
            this.Makrupextension.unloadMarkupsAllLayers()

            // Execute an action here
        };
        _button.setToolTip('BasicSkeleton');
        _button.addClass('myAwesomeExtensionIcon');
        // @ts-ignore
        _group.addControl(_button);
    }

}

export default MarkUp3DExtension