import React, { useEffect, useRef } from 'react';
import Swal from 'sweetalert2';

export default function Home() {
    const videoRef = useRef(null);
    const token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {

        const videoElement = videoRef.current;

        const handleVideoEnd = () => {
            videoElement.currentTime = 0;
            videoElement.play();
        };

        if (videoElement) {
            videoElement.addEventListener('ended', handleVideoEnd);
        }

        return () => {
            if (videoElement) {
                videoElement.removeEventListener('ended', handleVideoEnd);
            }
        };
    }, []);
    return (
        <div className="w-full border border-b-yellow-50 mt-10 p-6 bg-[#DDE3F3] h-[100vh]">
            <header className="text-center py-8">
                <h1 className="text-4xl font-bold text-gray-800">
                    Welcome to our website
                </h1>
            </header>

            <section className="text-center w-full py-8">
                <video
                    ref={videoRef}
                    src="/home_video.mp4"
                    autoPlay
                    muted
                    playsInline
                    className="mx-auto w-full max-w-3xl rounded-lg shadow-lg object-cover"
                    aria-hidden="true"
                >
                    Your browser does not support the video tag.
                </video>
            </section>


        </div>

    )
}
