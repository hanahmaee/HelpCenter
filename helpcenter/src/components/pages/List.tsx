'use client';
import React, { useState } from 'react';
import Link from 'next/link';

// Main Component
export default function GettingStarted() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsVideoPlaying(true);
  };

  return (
    <div className="w-full">
      {/* Heading Section */}
      <div className="text-2xl sm:text-3xl font-bold p-4 sm:p-6">
        Getting Started
      </div>

      {/* Video/Image Section */}
      <div className="relative w-full">
        {isVideoPlaying ? (
          <iframe
            className="w-full h-64 sm:h-96"
            src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src="/path/to/your-image.jpg"
              alt="Getting Started"
              className="w-full h-64 sm:h-96 object-cover"
            />
            {/* Play Button */}
            <div className="absolute inset-0 flex justify-center items-center">
              <button
                onClick={handlePlayClick}
                className="bg-black bg-opacity-50 text-white rounded-full p-4 text-3xl"
              >
                ▶
              </button>
            </div>
          </>
        )}
      </div>

      {/* Text Section */}
      <div className="p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          How to create an account?
        </h2>
        <p className="text-lg">
          Learn how to sign up and set up your profile in just a few simple steps.
        </p>
      </div>
    </div>
  );
}
