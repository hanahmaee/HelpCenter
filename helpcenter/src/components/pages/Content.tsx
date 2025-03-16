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
      <Card className="flex items-start p-4 rounded-2xl hover:shadow-md
        transition-transform hover:scale-105 cursor-pointer w-full max-w-7xl mb-6">

        {/* Image Section */}
        <div className="w-32 h-20 sm:w-40 sm:h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src="/path/to/placeholder-image.jpg"
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Content + "See Details" Section */}
        <div className="flex flex-col sm:flex-row flex-1 items-start sm:items-center ml-4">
          <div className="flex-1">
            <h3 className="text-4xl sm:text-2xl font-semibold">{title}</h3>
            <p className="text-lg text-gray-600 mt-2">{description}</p>
            </div>

            <div className="text-lg font-medium mt-0 sm:mt-2 sm:ml-4 self-end">
            See Details →
          </div>
        </div>
      </Card>
    </Link>
  );
}

// Main Component
export default function GettingStarted() {
  return (
    <div className="pl-4 sm:pl-10 pt-16 sm:pt-6 flex flex-col items-start w-full ml-0 sm:ml-20">
      {/* Heading Section */}
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-8">Getting Started</h1>

      {/* Cards Section */}
      <div className="space-y-6 w-full">
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
