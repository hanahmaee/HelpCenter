'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';

interface Step {
  text: string;
  img?: string;
}

interface ContentData {
  category: string;
  videoUrl: string;
  title: string;
  description: string;
  steps: Step[];
  thumbnail: string;
}

export default function Content() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title')?.trim() || '';

  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const [selectedContent, setSelectedContent] = useState<ContentData | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  const [listId, setListId] = useState<string | null>(null);

  useEffect(() => {
    const storedListId = localStorage.getItem('selectedListId');
    if (storedListId) {
      setListId(storedListId);
    }
  }, []);

  useEffect(() => {
    const fetchInstructions = async () => {
      if (!listId) return;

      try {
        const instructionsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/instructions/${listId}`);
        const instructions = await instructionsResponse.json();

        if (!instructions.length) {
          console.error('No instructions found');
          return;
        }

        const instructionData = instructions[0];

        setSelectedContent({
          category: instructionData.category_title,
          videoUrl: instructionData.instruction_video_url || '',
          title: instructionData.instruction_title,
          description: instructionData.instruction_description,
          steps: instructionData.steps.map((step: any, index: number) => ({
            text: step.steps_description,
            img: instructionData.pictures[index]?.picture_url || undefined,
          })),
          thumbnail: instructionData.instruction_thumbnail || instructionData.pictures[0]?.picture_url || '',
        });
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructions();
  }, [listId]);


  const handlePlayClick = () => {
    setIsVideoPlaying(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading content...
      </div>
    );
  }

  if (!selectedContent) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Content not found.
      </div>
    );
  }

  const shadowClass = `shadow-xl dark:shadow-[0_6px_20px_rgba(255,255,255,0.3)]`;

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-20 pt-28 sm:pt-22 mx-auto flex flex-col">
      <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-left mb-8">
        {selectedContent.title}
      </div>

      {/* Video Player with Shadow */}
      <div className={`relative w-full rounded-lg overflow-hidden ${shadowClass}`}>
        {isVideoPlaying ? (
          <iframe
            className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] rounded-lg"
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
            <div className="absolute inset-0 flex justify-center items-center">
              <button
                onClick={handlePlayClick}
                className={`relative flex items-center justify-center rounded-full w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20
                ${isDarkMode ? 'bg-white bg-opacity-30' : 'bg-black bg-opacity-60'}`}
              >
                <span className={`${isDarkMode ? 'text-black' : 'text-white'} text-3xl`}>
                  ▶
                </span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Description */}
      <div className="p-4 sm:p-6 md:p-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl mb-4">
          {selectedContent.description}
        </h2>

        {/* Steps Section */}
        <div className="flex flex-col space-y-12">
          {selectedContent.steps.map((step, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-center"
            >
              {/* Image Section - Now Fully Responsive */}
              <div className="w-full flex justify-center items-center">
                {step.img ? (
                  <img
                    src={step.img}
                    alt={step.text}
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-[150px] sm:h-[200px] md:h-[250px] rounded-lg bg-gray-100 dark:bg-gray-800"></div>
                )}
              </div>

              {/* Text Section */}
              <div className="w-full">
                <p className="text-lg sm:text-xl md:text-2xl">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
