'use client';
import React from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/components/ui/card';
import { helpTopics } from '@/components/app/constants/index';

// HelpCard Component
interface HelpCardProps {
  title: string;
  description: string;
  imgSrc: string;
}

function HelpCard({ title, description, imgSrc }: HelpCardProps) {
  return (
        <Card className="group cursor-pointer transition-transform hover:shadow-md hover:scale-105 border-gray-200 rounded-2xl">
        <div className="relative h-32 bg-gray-100 overflow-hidden rounded-t-2xl">
            <img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-cover transition-opacity duration-300"
            />
        </div>
        <CardHeader className="p-3 pb-0">
            <h3 className="font-semibold text-xl">{title}</h3>
        </CardHeader>
        <CardContent className="p-3 pt-0">
            <p className="text-sm">{description}</p>
        </CardContent>
</Card>
  );
}

export default function HelpCenter() {
  return (
    <div className="px-6 lg:px-20 py-16 mt-10 mx-auto flex flex-col">
      {/* Heading Section */}
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Need Assistance? We’ve Got You Covered.
        </h1>
        <p className="mt-5 text-2xl">
          Get answers to your questions and step-by-step guides.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
  <div className="relative w-full max-w-xl">
    <input
      type="text"
      placeholder="What do you want to learn?"
      className="w-full py-3 pl-10 pr-4 rounded-full bg-secondary border border-primary text-primary"
    />
    
    <Search className="absolute left-3 top-3 text-gray-500" />
  </div>
</div>


      {/* Help Topics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {helpTopics.map((topic, index) => (
          <HelpCard
            key={index}
            title={topic.title}
            description={topic.description}
            imgSrc={topic.imgSrc}
          />
        ))}
      </div>
    </div>
  );
}
