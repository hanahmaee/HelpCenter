"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/components/ui/card"

interface HelpCardProps {
  category_id: number
  category_title: string
  category_description: string
  category_img_src: string
}

function HelpCard({ category_id, category_title, category_description, category_img_src }: HelpCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/list?title=${encodeURIComponent(category_title)}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer h-full">
      <Card className="group transition-transform hover:shadow-md hover:scale-105 border-gray-200 rounded-2xl p-3 h-full flex flex-col">
        <div className="relative w-full h-40 bg-gray-100 rounded-xl overflow-hidden">
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
  const [categories, setCategories] = useState<HelpCardProps[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  const filteredCategories = categories.filter((category) =>
    category.category_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchSelect = (title: string) => {
    setSearchQuery(title);
    setShowDropdown(false);
    router.push(`/list?title=${encodeURIComponent(title)}`);
  };

  return (
    <div className="px-6 lg:px-20 py-16 mt-10 mx-auto flex flex-col">
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold">Need Assistance? We've Got You Covered.</h1>
        <p className="mt-5 text-2xl">Get answers to your questions and step-by-step guides.</p>
      </div>

      {/* Search Bar with Dropdown */}
      <div className="flex justify-center mb-10 relative">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(e.target.value.length > 0);
            }}
            placeholder="What do you want to learn?"
            className="w-full py-3 pl-10 pr-4 rounded-full bg-secondary border border-primary text-primary"
          />
          <Search className="absolute left-3 top-3 text-gray-500" />
          
          {/* Dropdown Suggestions */}
          {showDropdown && filteredCategories.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-200 shadow-md rounded-lg mt-1 overflow-hidden">
              {filteredCategories.map((category) => (
                <li 
                  key={category.category_id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSearchSelect(category.category_title)}
                >
                  {category.category_title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Help Topics Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredCategories.map((category) => (
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
        <p className="text-center text-gray-500 text-xl mt-10">No results found.</p>
      )}
    </div>
  )
}
