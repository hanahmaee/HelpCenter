"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/components/ui/card";

interface HelpCardProps {
  id: number;
  title: string;
  description: string;
  imgSrc?: string;
}

interface HelpListItem {
  list_id: number;
  list_title: string;
  list_description: string;
  list_img_url?: string;
}

function HelpCard({ title, description, imgSrc, id }: HelpCardProps) {
  const handleClick = () => {
    if (id) {
      localStorage.setItem("selectedListId", id.toString());
    }
  };

  return (
    <Link href={`/content`} passHref onClick={handleClick}>
      <Card className="flex flex-row items-center p-4 rounded-2xl hover:shadow-md transition-transform hover:scale-105 cursor-pointer w-full h-auto space-x-6">
        <div className="w-24 h-20 sm:w-28 sm:h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <Image
            src={imgSrc || "/images/help/placeholder.jpg"}
            alt={title}
            width={112}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col justify-center">
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

export default function HelpList() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title")?.toLowerCase() ?? "";
  const [helpList, setHelpList] = useState<HelpListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const categoryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        const categories = await categoryResponse.json();
        const category = categories.find((cat: any) => cat.category_title.toLowerCase() === title);

        if (category) {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lists/${category.category_id}`);
          const data = await response.json();
          setHelpList(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, [title]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="px-6 lg:px-20 pt-28 sm:pt-22 mx-auto flex flex-col w-full">
      <div className="w-full mb-6 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold capitalize">{title}</h1>
      </div>

      {helpList.length > 0 ? (
        <div className="flex flex-col space-y-6">
          {helpList.map((help) => (
            <HelpCard
              key={help.list_id}
              id={help.list_id}
              title={help.list_title}
              description={help.list_description}
              imgSrc={help.list_img_url}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500 mt-10">No related help articles found.</p>
      )}
    </div>
  );
}
