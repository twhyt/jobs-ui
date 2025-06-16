'use client';
import { useEffect, useRef, useState } from 'react';

export default function VideoRecorder() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { exact: "user" } },
      audio: true,
    });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    mediaRecorderRef.current = new MediaRecorder(stream);
    const chunks: Blob[] = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      setVideoURL(URL.createObjectURL(blob));
    };
  };

  const startRecording = () => {
    mediaRecorderRef.current?.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  useEffect(() => {
    startCamera();
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
      />
      <div className="mt-4">
        {!recording ? (
          <button onClick={startRecording}>เริ่มบันทึก</button>
        ) : (
          <button onClick={stopRecording}>หยุด</button>
        )}
      </div>
      {videoURL && (
        <div className="mt-4">
          <video src={videoURL} controls style={{ width: '100%' }} />
        </div>
      )}
    </div>
  );
}
