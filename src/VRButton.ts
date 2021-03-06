import * as THREE from 'three';

const VRButton = {
    createButton: (renderer: THREE.WebGLRenderer, options?: any): HTMLElement => {
        if (options && options.referenceSpaceType)
            renderer.xr.setReferenceSpaceType(options.referenceSpaceType);

        function showEnterVR(button: HTMLButtonElement) {
            let currentSession: any = null;
            function onSessionStarted(session: any) {
                session.addEventListener('end', onSessionEnded);

                renderer.xr.setSession(session);
                button.textContent = 'EXIT VR';

                currentSession = session;
            }

            function onSessionEnded() {
                currentSession.removeEventListener('end', onSessionEnded);
                button.textContent = 'ENTER VR';
                currentSession = null;
            }

            button.style.display = '';

            button.style.cursor = 'pointer';
            button.style.left = 'calc(50% - 50px)';
            button.style.width = '100px';

            button.textContent = 'ENTER VR';

            button.onmouseenter = () => {
                button.style.opacity = '1.0';
            };

            button.onmouseleave = () => {
                button.style.opacity = '0.5';
            };

            button.onclick = () => {
                if (currentSession === null) {
                    // WebXR's requestReferenceSpace only works if the corresponding feature
                    // was requested at session creation time. For simplicity, just ask for
                    // the interesting ones as optional features, but be aware that the
                    // requestReferenceSpace call will fail if it turns out to be unavailable.
                    // ('local' is always available for immersive sessions and doesn't need to
                    // be requested separately.)

                    var sessionInit = { optionalFeatures: [ 'local-floor', 'bounded-floor' ] };
                    (navigator as any).xr.requestSession('immersive-vr', sessionInit).then(onSessionStarted);

                } else currentSession.end();
            };
        }

        function disableButton(button: HTMLButtonElement) {

            button.style.display = '';

            button.style.cursor = 'auto';
            button.style.left = 'calc(50% - 75px)';
            button.style.width = '150px';

            button.onmouseenter = null;
            button.onmouseleave = null;

            button.onclick = null;

        }

        function showWebXRNotFound(button: HTMLButtonElement) {
            disableButton(button);
            button.textContent = 'VR NOT SUPPORTED';
        }

        function stylizeElement(element: HTMLElement) {
            element.style.position = 'absolute';
            element.style.bottom = '20px';
            element.style.padding = '12px 6px';
            element.style.border = '1px solid #fff';
            element.style.borderRadius = '4px';
            element.style.background = 'rgba(0,0,0,0.1)';
            element.style.color = '#fff';
            element.style.font = 'normal 13px sans-serif';
            element.style.textAlign = 'center';
            element.style.opacity = '0.5';
            element.style.outline = 'none';
            element.style.zIndex = '999';
        }

        if ('xr' in navigator) {
            const button = document.createElement( 'button' );
            button.style.display = 'none';

            stylizeElement(button);

            (navigator as any).xr.isSessionSupported('immersive-vr').then((supported: boolean) => {
                supported ? showEnterVR(button) : showWebXRNotFound(button);
            });

            return button;
        } else {
            const message = document.createElement('a');
            message.href = 'https://immersiveweb.dev/';

            if (!window.isSecureContext)
                message.innerHTML = 'WEBXR NEEDS SECURE CONNECTION';
            else message.innerHTML = 'WEBXR NOT AVAILABLE';

            message.style.left = 'calc(50% - 90px)';
            message.style.width = '180px';
            message.style.textDecoration = 'none';

            stylizeElement(message);

            return message;
        }
    },
};

export { VRButton };