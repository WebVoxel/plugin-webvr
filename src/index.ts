import { Plugin } from "@webvoxel/core";
import { VRButton } from "./VRButton";

export class WebVRPlugin extends Plugin {
    constructor() {
        super('webvr');
    }

    init(): void {
        document.body.appendChild(VRButton.createButton(this.game!.renderer));
        this.game!.renderer.xr.enabled = true;
    }
}