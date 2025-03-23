'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CONTENT_DATA } from '@/components/app/constants/index';

export default function Content() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedContent, setSelectedContent] = useState(CONTENT_DATA[0]); // Default content

  const handlePlayClick = () => {
    setIsVideoPlaying(true);
  };

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-20 pt-28 sm:pt-22 mx-auto flex flex-col">
      {/* Heading Section */}
      <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-left mb-8">
        {selectedContent.title}
      </div>

      {/* Video/Image Section */}
      <div className="relative w-full">
        {isVideoPlaying ? (
          <iframe
            className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px]"
            src={selectedContent.videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={selectedContent.thumbnail}
              alt={selectedContent.title}
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg"
            />
            {/* Play Button */}
            <div className="absolute inset-0 flex justify-center items-center">
              <button
                onClick={handlePlayClick}
                className="bg-black bg-opacity-50 text-white rounded-full p-4 sm:p-5 md:p-6 lg:p-8 text-2xl sm:text-3xl md:text-4xl"
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
            href={selectedContent.videoUrl.replace('embed/', 'watch?v=')}
            target="_blank"
            rel="noopener noreferrer"
          >
          </a>
        </div>
      )}

      {/* Text Section */}
      <div className="p-4 sm:p-6 md:p-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
          {selectedContent.description}
        </h2>

        {/* Step-by-Step Section (Always Two Columns) */}
        <div className="flex flex-col space-y-12">
          {selectedContent.steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-row items-center space-x-6 md:space-x-10 lg:space-x-16"
            >
              {/* Step Image (Always on the left) */}
              <div className="w-1/2">
                {step.img && (
                  <img
                    src={step.img}
                    alt={step.text}
                    className="w-full h-40 sm:h-56 md:h-72 lg:h-80 object-cover rounded-lg"
                  />
                )}
              </div>

              {/* Step Text (Always on the right) */}
              <div className="w-1/2">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">{`Step ${index + 1}: ${step.text}`}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
