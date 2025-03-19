'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/components/ui/card';
import { helpList, helpTopics } from '@/components/app/constants/index';

interface HelpCardProps {
  title: string;
  description: string;
  link: string;
  imgSrc?: string;
}

function HelpCard({ title, description, link, imgSrc }: HelpCardProps) {
  return (
    <Link href={link} passHref>
      <Card className="flex flex-row items-center p-4 rounded-2xl hover:shadow-md transition-transform hover:scale-105 cursor-pointer w-full h-auto">
        <div className="w-24 h-20 sm:w-28 sm:h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <Image 
            src={imgSrc || "/images/help/placeholder.jpg"} 
            alt={title} 
            width={112} 
            height={80} 
            className="w-full h-full object-cover" 
          />
        </div>

        <div className="flex flex-1 flex-col justify-center ml-4 sm:ml-6 w-full">
          <h3 className="text-lg sm:text-2xl font-semibold">{title}</h3>
          <div className="flex justify-between items-end w-full mt-2">
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
export default function HelpList() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title')?.toLowerCase() ?? ''; // ✅ Fix: Ensure it's always a string

  const topic = helpTopics.find((t) => t.title.toLowerCase() === title);

  if (!topic) {
    return <div className="text-center text-red-500 text-2xl mt-20">Topic Not Found</div>;
  }

  const filteredHelpList = helpList.filter((help) => help.category.toLowerCase() === title);

  return (
    <div className="px-6 lg:px-20 pt-28 sm:pt-22 mx-auto flex flex-col w-full">
      <div className="w-full mb-10">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-left">{topic.title}</h1>
        <p className="text-lg sm:text-xl mt-3">{topic.description}</p>
      </div>

      <div className="w-full flex flex-col space-y-6">
        {filteredHelpList.length > 0 ? (
          filteredHelpList.map((help, index) => (
            <HelpCard 
              key={index} 
              title={help.title} 
              description={help.description} 
              link={`/help/${encodeURIComponent(help.title)}`} 
              imgSrc={help.imgSrc} 
            />
          ))
        ) : (
          <p className="text-center text-xl text-gray-500">
            No related help articles found.
          </p>
        )}
      </div>
    </div>
  );
}
