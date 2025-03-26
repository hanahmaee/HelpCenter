'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  const titleBgColor = isDarkMode ? '#fff' : '#000';
  const playButtonBgColor = titleBgColor;

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
    return <div className="flex items-center justify-center h-screen text-xl">Loading content...</div>;
  }

  if (!selectedContent) {
    return <div className="flex items-center justify-center h-screen text-xl">Content not found.</div>;
  }

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-20 pt-28 sm:pt-22 mx-auto flex flex-col space-y-4">
      {/* Title and Video Section */}
      <div className="flex flex-col items-stretch rounded-lg p-4"
        style={{ backgroundColor: titleBgColor, color: isDarkMode ? '#000' : '#fff' }}>
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2">{selectedContent.title}</h1>

        {/* Video Player */}
        <div className="relative w-full aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
          {isVideoPlaying ? (
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={selectedContent.videoUrl}
              title="Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg">
              <img
                src={selectedContent.thumbnail}
                alt={selectedContent.title}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex justify-center items-center">
                <button
                  onClick={handlePlayClick}
                  className="relative flex items-center justify-center rounded-full w-14 h-14 bg-opacity-60"
                  style={{ backgroundColor: playButtonBgColor }}>
                  <span className={`${isDarkMode ? 'text-black' : 'text-white'} text-3xl`}>▶</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description Section */}
      <div className="p-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl mb-2">{selectedContent.description}</h2>
      </div>

      {/* Steps Section */}
      <div className="flex flex-col space-y-6">
        {selectedContent.steps.map((step, index) => (
          <div key={index} className="grid md:grid-cols-[1fr_2fr] grid-cols-1 gap-x-6 items-center">
            {step.img ? (
              <img
                src={step.img}
                alt={step.text}
                className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto object-contain rounded-lg"
              />
            ) : (
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md h-[150px] sm:h-[200px] rounded-lg bg-gray-200"></div>
            )}
            <p className="text-lg sm:text-xl md:text-2xl">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}