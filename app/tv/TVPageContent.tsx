'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from 'next/image'
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react'
import { format } from 'date-fns'

const channels = [
  { 
    id: 1, 
    name: 'DevTalks', 
    description: 'Interviews with top developers',
    currentShow: 'Interview with Linus Torvalds',
    image: '/placeholder.svg?height=400&width=600',
    streamUrl: 'https://example.com/video-placeholder.mp4'
  },
  { 
    id: 2, 
    name: 'CodeReviews', 
    description: 'Live code reviews and discussions',
    currentShow: 'Reviewing a Complex React Component',
    image: '/placeholder.svg?height=400&width=600',
    streamUrl: 'https://example.com/video-placeholder.mp4'
  },
  { 
    id: 3, 
    name: 'TechNews', 
    description: 'Latest updates in the tech world',
    currentShow: 'Breaking: New JavaScript Framework Released',
    image: '/placeholder.svg?height=400&width=600',
    streamUrl: 'https://example.com/video-placeholder.mp4'
  },
  { 
    id: 4, 
    name: 'TutorialTime', 
    description: 'Step-by-step coding tutorials',
    currentShow: 'Building a Full-Stack App with Next.js and MongoDB',
    image: '/placeholder.svg?height=400&width=600',
    streamUrl: 'https://example.com/video-placeholder.mp4'
  },
]

export function TVPageContent() {
  const [selectedChannel, setSelectedChannel] = useState(channels[0])
  const [isPlaying, setIsPlaying] = useState(false)

  const handleChannelChange = (channelId: string) => {
    const channel = channels.find(c => c.id === parseInt(channelId))
    if (channel) {
      setSelectedChannel(channel)
      setIsPlaying(true)
    }
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">DevPlatform TV</h1>
      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        <Card>
          <CardHeader>
            <CardTitle>{selectedChannel.name}</CardTitle>
            <CardDescription>{selectedChannel.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-black relative rounded-lg overflow-hidden mb-4">
              <Image
                src={selectedChannel.image}
                alt={selectedChannel.name}
                fill
                className="object-cover"
              />
              {isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <p className="text-white text-xl">Now Playing: {selectedChannel.currentShow}</p>
                </div>
              )}
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              <Button size="icon" variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button size="icon" variant="outline">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Current time: {format(new Date(), "EEEE, MMMM do yyyy, h:mm:ss a")}
            </p>
          </CardContent>
        </Card>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Channel Guide</h2>
          <Select onValueChange={handleChannelChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a channel" />
            </SelectTrigger>
            <SelectContent>
              {channels.map((channel) => (
                <SelectItem key={channel.id} value={channel.id.toString()}>
                  {channel.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {channels.map((channel) => (
              <Card key={channel.id}>
                <CardHeader>
                  <CardTitle>{channel.name}</CardTitle>
                  <CardDescription>{channel.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src={channel.image}
                    alt={channel.name}
                    width={300}
                    height={200}
                    className="rounded-lg mb-4"
                  />
                  <p className="mb-2">Now Playing: {channel.currentShow}</p>
                  <Button variant="outline" onClick={() => handleChannelChange(channel.id.toString())}>
                    Watch Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

