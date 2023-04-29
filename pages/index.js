import Image from 'next/image'
import { Inter } from 'next/font/google'
import ImageUpload from '@/components/ImageUpload'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <ImageUpload />
    </div>
  )
}
