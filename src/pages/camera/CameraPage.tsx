import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraType } from '../../Camera';
import styled from 'styled-components';
import ControlPanel from '../../components/ControlPannel/ControlPanel';

const Wrapper = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
`;

const FullScreenImagePreview = styled.div<{ image: string | null }>`
    width: 100%;
    height: 100%;
    z-index: 100;
    position: absolute;
    background-color: black;
    ${({ image }) => (image ? `background-image:  url(${image});` : '')}
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;
const CameraPage = () => {
    const [numberOfCameras, setNumberOfCameras] = useState(0);
    const [image, setImage] = useState<string | null>(null);
    const [showImage, setShowImage] = useState<boolean>(false);
    const camera = useRef<CameraType>(null);
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [activeDeviceId, setActiveDeviceId] = useState<string | undefined>(undefined);
    const [torchToggled, setTorchToggled] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter((i) => i.kind == 'videoinput');
            setDevices(videoDevices);
        })();
    });

    return (
        <Wrapper>
            {showImage ? (
                <FullScreenImagePreview
                    image={image}
                    onClick={() => {
                        setShowImage(!showImage);
                    }}
                />
            ) : (
                <Camera
                    ref={camera}
                    aspectRatio="cover"
                    facingMode="environment"
                    numberOfCamerasCallback={(i) => setNumberOfCameras(i)}
                    videoSourceDeviceId={activeDeviceId}
                    errorMessages={{
                        noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
                        permissionDenied: 'Permission denied. Please refresh and give camera permission.',
                        switchCamera: 'It is not possible to switch camera to different one because there is only one video device accessible.',
                        canvas: 'Canvas is not supported.',
                    }}
                    videoReadyCallback={() => {
                        console.log('Video feed ready.');
                    }}
                />
            )}
            <ControlPanel
                camera={camera}
                image={image}
                numberOfCameras={numberOfCameras}
                devices={devices}
                setActiveDeviceId={setActiveDeviceId}
                setImage={setImage}
                setShowImage={setShowImage}
                showImage={showImage}
                setTorchToggled={setTorchToggled}
                torchToggled={torchToggled}
            />
        </Wrapper>
    );
};

export default CameraPage;
