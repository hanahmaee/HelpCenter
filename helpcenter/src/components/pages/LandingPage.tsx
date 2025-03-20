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
  const router = useRouter()

  const handleClick = () => {
    router.push(`/list?title=${encodeURIComponent(category_title)}`)
  }

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <Card className="group transition-transform hover:shadow-md hover:scale-105 border-gray-200 rounded-2xl p-3">
        <div className="relative w-full h-40 bg-gray-100 rounded-xl overflow-hidden mx-auto">
          <img
            src={category_img_src || "/placeholder.svg"}
            alt={category_title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <CardHeader className="p-2 pb-0">
          <h3 className="font-semibold text-2xl leading-none">{category_title}</h3>
        </CardHeader>
        <CardContent className="p-2 pt-0">
          <p className="text-base">{category_description}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LandingPage() {
  const [categories, setCategories] = useState<HelpCardProps[]>([])
  const [searchQuery, setSearchQuery] = useState("")

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
    category.category_title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="px-6 lg:px-20 py-16 mt-10 mx-auto flex flex-col">
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold">Need Assistance? We've Got You Covered.</h1>
        <p className="mt-5 text-2xl">Get answers to your questions and step-by-step guides.</p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What do you want to learn?"
            className="w-full py-3 pl-10 pr-4 rounded-full bg-secondary border border-primary text-primary"
          />
          <Search className="absolute left-3 top-3 text-gray-500" />
        </div>
      </div>

      {/* Help Topics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  )
}

