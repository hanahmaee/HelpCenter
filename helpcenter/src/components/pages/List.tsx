'use client';
import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/components/ui/card';
import { gettingStarted } from '@/components/app/constants/index';

// HelpCard Component
interface HelpCardProps {
  title: string;
  description: string;
  link: string;
}

function HelpCard({ title, description, link }: HelpCardProps) {
  return (
    <Link href={link} passHref>
      <Card className="flex flex-row items-center p-4 rounded-2xl hover:shadow-md
        transition-transform hover:scale-105 cursor-pointer w-full max-w-7xl mb-8 h-auto">
        
        {/* Image Section */}
        <div className="w-26 h-20 sm:w-30 sm:h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src="/path/to/placeholder-image.jpg"
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

      {/* Text + "See Details" Section */}
      <div className="flex flex-1 flex-col justify-center ml-4 sm:ml-6 w-full">
        <h3 className="text-lg sm:text-2xl font-semibold">{title}</h3>

        <div className="flex justify-between items-end w-full">
          <p className="text-sm sm:text-lg">{description}</p>
          <div className="text-sm sm:text-lg font-medium whitespace-nowrap self-end">
            See Details →
          </div>
        </div>
      </div>
      </Card>
    </Link>
  );
}

// Main Component
export default function GettingStarted() {
  return (
    <div className="px-6 lg:px-20 pt-28 sm:pt-22 mx-auto flex flex-col w-full">
      {/* Heading Section (Left Aligned) */}
      <div className="w-full mb-10">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-left">
          Getting Started
        </h1>
      </div>

      {/* Cards Section */}
      <div className="space-y-8 w-full">
        {gettingStarted.map((topic, index) => (
          <HelpCard
            key={index}
            title={topic.title}
            description={topic.description}
            link={topic.link}
          />
        ))}
      </div>
    </div>
  );
}
