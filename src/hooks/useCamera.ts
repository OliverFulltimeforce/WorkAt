import { useState } from 'react';

export function UseCamera() {
  const [isCameraOn, setIsCameraOn] = useState(false);

  function handleSuccess(stream: any) {
    window.MediaStream = stream;
    window.mediaStreamObject = stream;

    if (stream.active) {
      setIsCameraOn(true);
    } else {
      setIsCameraOn(false);
    }
  }

  async function init(constraints: any) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream);
    } catch (error) {
      console.error('Navigator.getUserMedia error: ', error);
    }
  }

  return {
    isCameraOn,
    init,
  };
}
