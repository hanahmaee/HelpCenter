// ContentPage.tsx

'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CONTENT_DATA, ContentData } from '@/components/app/constants/index';

export default function ContentPage() {
  const { title } = useParams(); // Get the title from the URL path
  const [contentData, setContentData] = useState<ContentData | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    if (!title) return;

    // Find content that matches the title
    const formattedTitle = decodeURIComponent(title as string);
    const content = CONTENT_DATA.find((item) => item.title === formattedTitle);
    if (content) {
      setContentData(content);
    }
  }, [title]);

  if (!contentData) {
    return <div className="fixed inset-0 flex items-center justify-center text-xl">Content Not Found</div>;
  }

  const { category, videoUrl, title: contentTitle, description, steps } = contentData;

  return (
    <div className="w-full px-6 lg:px-20 pt-28 sm:pt-22 mx-auto flex flex-col">
      {/* Category Header */}
      <div className="text-sm sm:text-lg text-gray-500 mb-2">{category}</div>

      {/* Title */}
      <div className="text-4xl md:text-5xl font-extrabold text-left mb-8">{contentTitle}</div>

      {/* Video/Image Section */}
      <div className="relative w-full">
        {isVideoPlaying ? (
          <iframe
            className="w-full h-[500px] sm:h-[500px]"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src="/images/content/video-placeholder.jpg"
              alt={contentTitle}
              className="w-full h-64 sm:h-96 object-cover rounded-lg"
            />
            {/* Play Button */}
            <div className="absolute inset-0 flex justify-center items-center">
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="bg-black bg-opacity-50 text-white rounded-full p-4 text-3xl"
              >
                ▶
              </button>
            </div>
          </>
        )}
      </div>

      {/* Description */}
      <div className="p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Overview</h2>
        <p className="text-lg text-gray-600">{description}</p>
      </div>

      {/* Step-by-Step Guide */}
      <div className="p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Step-by-Step Guide</h2>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {step.img && (
                <img
                  src={step.img}
                  alt={`Step ${index + 1}`}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg object-cover"
                />
              )}
              <p className="text-lg sm:text-xl">{`${index + 1}. ${step.text}`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
