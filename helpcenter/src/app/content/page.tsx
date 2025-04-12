export const dynamic = 'force-dynamic';

import Content from '@/components/components/pages/Content'
import NavBar from '@/components/components/pages/NavBar'

export default function page() {
  return (
    <div>
        < NavBar />
        < Content />   
    </div>
  )
}