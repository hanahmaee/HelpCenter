"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Card, CardHeader } from "@/components/components/ui/card";
import { useTheme } from "next-themes";

interface HelpCardProps {
  category_id: number;
  category_title: string;
  category_description: string;
  category_img_src: string;
}

interface SearchResult {
  type: "category" | "list";
  id: number;
  title: string;
}

function HelpCard({ category_id, category_title, category_description, category_img_src }: HelpCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/list?title=${encodeURIComponent(category_title)}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer h-full">
      <Card className="group transition-transform hover:shadow-md hover:scale-105 border rounded-2xl p-3 h-full flex flex-col">
        <div className="relative w-full h-40 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
          <img
            src={category_img_src || "/placeholder.svg"}
            alt={category_title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <CardHeader className="p-1 pb-0">
          <div className="space-y-2">
            <h3 className="font-semibold text-[1.75rem] leading-snug">{category_title}</h3>
            <p className="text-base">{category_description}</p>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

export default function LandingPage() {
  const [categories, setCategories] = useState<HelpCardProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (query.length > 0) {
      setShowDropdown(true);
      setIsSearching(true);

      try {
        const searchUrl = `${process.env.NEXT_PUBLIC_API_URL}/search?query=${encodeURIComponent(query)}`;
        const response = await fetch(searchUrl);

        if (!response.ok) {
          throw new Error(`Search API returned status ${response.status}`);
        }

        const data = await response.json();
        if (data?.categories && data?.lists) {
          const results: SearchResult[] = [];
          data.categories.forEach((category: any) => {
            results.push({ type: "category", id: category.category_id, title: category.category_title });
          });
          data.lists.forEach((list: any) => {
            results.push({ type: "list", id: list.list_id, title: list.list_title });
          });
          setSearchResults(results);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setShowDropdown(false);
      setSearchResults([]);
    }
  };

  const handleSearchSelect = (item: SearchResult) => {
    setSearchQuery(item.title);
    setShowDropdown(false);

    if (item.type === "category") {
      router.push(`/list?title=${encodeURIComponent(item.title)}`);
    } else if (item.type === "list") {
      localStorage.setItem("selectedListId", item.id.toString());
      router.push(`/content`);
    }
  };

  return (
    <div className="px-6 lg:px-20 py-16 mt-10 mx-auto flex flex-col">
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold">Need Assistance? We've Got You Covered.</h1>
        <p className="mt-5 text-2xl">Get answers to your questions and step-by-step guides.</p>
      </div>

      <div className="flex justify-center mb-10">
        <div ref={searchRef} className="relative w-full max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="What do you want to learn?"
            className="w-full py-3 pl-10 pr-4 rounded-full border"
          />
          <Search className="absolute left-3 top-3" />
          {showDropdown && (
            <div
              className={`absolute z-50 w-full border shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto ${
                theme === "dark" ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {isSearching ? (
                <div className="px-4 py-2">Searching...</div>
              ) : searchResults.length > 0 ? (
                <ul>
                  {searchResults.map((item, index) => (
                    <li
                      key={`${item.type}-${item.id}-${index}`}
                      className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleSearchSelect(item)}
                    >
                      {item.title} <span className="text-sm">({item.type})</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-2">No results found.</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Help Topics Grid */}
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {categories.map((category) => (
            <HelpCard
              key={category.category_id}
              category_id={category.category_id}
              category_title={category.category_title}
              category_description={category.category_description}
              category_img_src={category.category_img_src}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-xl mt-10">Loading categories...</p>
      )}
    </div>
  );
}
