'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlayCircle, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react'
import Image from 'next/image'
import { format } from 'date-fns'

const radioStations = [
  { 
    id: 1, 
    name: "DevTalk Radio", 
    genre: "Tech Talk",
    currentShow: "The Future of Web Development",
    image: "/placeholder.svg?height=200&width=200",
    streamUrl: "https://example.com/audio-placeholder.mp3"
  },
  { 
    id: 2, 
    name: "Code Beats", 
    genre: "Electronic",
    currentShow: "Coding to Lo-Fi Beats",
    image: "/placeholder.svg?height=200&width=200",
    streamUrl: "https://example.com/audio-placeholder.mp3"
  },
  { 
    id: 3, 
    name: "Syntax FM", 
    genre: "Programming",
    currentShow: "JavaScript Deep Dive",
    image: "/placeholder.svg?height=200&width=200",
    streamUrl: "https://example.com/audio-placeholder.mp3"
  },
  { 
    id: 4, 
    name: "Algorithm Acoustics", 
    genre: "Ambient",
    currentShow: "Soothing Sounds for Problem Solving",
    image: "/placeholder.svg?height=200&width=200",
    streamUrl: "https://example.com/audio-placeholder.mp3"
  },
  { 
    id: 5, 
    name: "Binary Broadcast", 
    genre: "Variety",
    currentShow: "Tech News Roundup",
    image: "/placeholder.svg?height=200&width=200",
    streamUrl: "https://example.com/audio-placeholder.mp3"
  },
]

export default function RadioPageContent() {
  const [currentStation, setCurrentStation] = useState(radioStations[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStations = radioStations.filter(station =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.genre.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handlePlay = (station) => {
    setCurrentStation(station)
    setIsPlaying(true)
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">DevPlatform Radio</h1>
      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{currentStation.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative mb-4">
                <Image
                  src={currentStation.image}
                  alt={currentStation.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon">
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="icon">
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-4 w-4" />
                  <Input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                    className="w-24"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500">Now playing: {currentStation.currentShow}</p>
              <p className="text-sm text-gray-500">
                {format(new Date(), "EEEE, MMMM do yyyy, h:mm:ss a")}
              </p>
            </CardContent>
          </Card>
          <Input
            type="search"
            placeholder="Search stations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStations.map((station) => (
              <Card key={station.id}>
                <CardHeader>
                  <CardTitle>{station.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src={station.image}
                    alt={station.name}
                    width={200}
                    height={200}
                    className="rounded-lg mb-4"
                  />
                  <div className="flex items-center justify-between">
                    <span>{station.genre}</span>
                    <Button variant="outline" onClick={() => handlePlay(station)}>
                      {currentStation.id === station.id && isPlaying ? 'Pause' : 'Play'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">About DevPlatform Radio</h2>
          <p className="mb-4">
            Tune in to DevPlatform Radio for a mix of tech talks, coding tutorials, and music to code by. Our stations are curated to keep you informed and entertained while you work.
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Station Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>9:00 AM - 12:00 PM: Morning Code Rush</li>
                <li>12:00 PM - 3:00 PM: Lunch Break Beats</li>
                <li>3:00 PM - 6:00 PM: Afternoon Dev Talks</li>
                <li>6:00 PM - 9:00 PM: Evening Syntax Sessions</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

