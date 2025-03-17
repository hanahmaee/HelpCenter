'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function GettingStarted() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsVideoPlaying(true);
  };

  return (
    <div className="w-full px-6 lg:px-20 pt-28 sm:pt-22 mx-auto flex flex-col">
      {/* Heading Section (With Proper Spacing) */}
      <div className="text-4xl md:text-5xl font-extrabold text-left mb-8">
        Getting Started
      </div>

      {/* Video/Image Section */}
      <div className="relative w-full">
        {isVideoPlaying ? (
          <iframe
            className="w-full h-64 sm:h-96"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Fixed YouTube Embed URL
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
              className="w-full h-64 sm:h-96 object-cover rounded-lg"
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

      {/* Fallback Button for Non-Embeddable Videos */}
      {!isVideoPlaying && (
        <div className="text-center mt-4">
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
          >
          </a>
        </div>
      )}

      {/* Text Section */}
      <div className="p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          How to create an account?
        </h2>
        <p className="text-lg text-gray-600">
          Learn how to sign up and set up your profile in just a few simple steps.
        </p>
      </div>
    </div>
  );
}
