import React from 'react';
import { CameraType } from '../../Camera';

export interface ControlPanelPropsInterface {
    setActiveDeviceId: (id: string) => void;
    devices: MediaDeviceInfo[];
    setShowImage: (show: boolean) => void;
    showImage: boolean;
    handelPictureTaken: (image: string) => void;
    camera: React.RefObject<CameraType>;
    torchToggled: boolean;
    setTorchToggled: (toggled: boolean) => void;
    numberOfCameras: number;
    image: string | null;
}
