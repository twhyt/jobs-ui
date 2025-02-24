"use client";

import { useRef, useState } from "react";

export default function CameraCapture() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: {
            facingMode: 'environment',
        }
       });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera: ", error);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        setImageSrc(canvasRef.current.toDataURL("image/png"));
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <video ref={videoRef} autoPlay className="w-full max-w-md rounded-lg" />
      <canvas ref={canvasRef} className="hidden" />
      <button onClick={startCamera} className="bg-blue-500 text-white px-4 py-2 rounded">
        เปิดกล้อง
      </button>
      <button onClick={capturePhoto} className="bg-green-500 text-white px-4 py-2 rounded">
        ถ่ายภาพ
      </button>
      {imageSrc && <img src={imageSrc} alt="Captured" className="mt-4 rounded-lg" />}

        <form>
            <label title="camera">Camera</label>
            <input placeholder="camera" type="file" name="image" accept="image/*"></input>
        </form>
    </div>
  );
}
