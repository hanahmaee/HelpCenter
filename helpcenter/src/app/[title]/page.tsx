'use client';

import { useParams } from 'next/navigation';
import { helpContent } from '@/components/app/constants/index';

export default function HelpContent() {
  const params = useParams();
  const title = params.title ? decodeURIComponent(params.title as string) : '';

  // Find the corresponding help content
  const content = helpContent.find((c) => c.title === title);

  if (!content) {
    return <div className="text-center text-red-500 text-2xl mt-20">Help Article Not Found</div>;
  }

  return (
    <div className="px-6 lg:px-20 pt-28 sm:pt-22 mx-auto flex flex-col w-full">
      <h1 className="text-3xl sm:text-5xl font-extrabold">{content.title}</h1>
      <p className="text-lg sm:text-xl mt-3">{content.description}</p>

      {/* Steps Section */}
      {content.steps && (
        <div className="mt-6 space-y-4">
          {content.steps.map((step, index) => (
            <div key={index} className="flex items-center space-x-4">
              <img src={step.img} alt={step.text} className="w-16 h-16 rounded-lg" />
              <p className="text-lg">{step.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
