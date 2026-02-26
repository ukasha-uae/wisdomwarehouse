"use client";

import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, Eye, Send } from "lucide-react";
import { type Post, MOCK_STUDENTS } from "@/app/lib/mock-data";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

export default function PostCard({
  post,
  viewer = "parent",
  onAcknowledge,
}: {
  post: Post;
  viewer?: "parent" | "teacher";
  onAcknowledge?: (postId: string) => void;
}) {
  const taggedStudents = MOCK_STUDENTS.filter(s => post.taggedStudentIds.includes(s.id));
  const mediaItems = post.mediaUrls && post.mediaUrls.length > 0 ? post.mediaUrls : [post.mediaUrl];
  const isDataUrl = mediaItems.some((url) => url.startsWith("data:"));

  return (
    <Card className="neo-glam-card overflow-hidden border-none shadow-md bg-card transition-all hover:shadow-lg">
      <CardHeader className="p-4 flex flex-row items-center space-x-3">
        <Avatar className="h-10 w-10 border-2 border-primary/20">
          <AvatarFallback className="bg-primary/10 text-primary">{post.teacherName[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-semibold text-sm">{post.teacherName}</p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </p>
        </div>
        <div className="ml-auto">
          {post.parentAcknowledgedAt ? (
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-none gap-1">
              <Eye className="h-3 w-3" />
              {viewer === "teacher"
                ? `Acknowledged ${formatDistanceToNow(new Date(post.parentAcknowledgedAt))} ago`
                : "Acknowledged"}
            </Badge>
          ) : post.parentSeenAt ? (
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-none gap-1">
              <Eye className="h-3 w-3" />
              {viewer === "teacher"
                ? `Seen ${formatDistanceToNow(new Date(post.parentSeenAt))} ago`
                : "Seen by parent app"}
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-none gap-1">
              <Send className="h-3 w-3" /> Sent to parent
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <Carousel className="w-full">
        <CarouselContent className="ml-0">
          {mediaItems.map((mediaUrl, index) => (
            <CarouselItem key={`${post.id}-${index}`} className="pl-0">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={mediaUrl}
                  alt={`Activity moment ${index + 1}`}
                  fill
                  unoptimized={isDataUrl}
                  className="object-cover transition-transform hover:scale-105 duration-500"
                  data-ai-hint="activity photo"
                />
                {mediaItems.length > 1 ? (
                  <Badge className="absolute bottom-3 right-3 bg-black/60 text-white border-none">
                    {index + 1} / {mediaItems.length}
                  </Badge>
                ) : null}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {mediaItems.length > 1 ? (
          <>
            <CarouselPrevious className="left-3 h-8 w-8 border-none bg-black/55 text-white hover:bg-black/70" />
            <CarouselNext className="right-3 h-8 w-8 border-none bg-black/55 text-white hover:bg-black/70" />
          </>
        ) : null}
      </Carousel>

      <CardContent className="p-4 space-y-3">
        {post.program ? (
          <Badge variant="outline" className="w-fit border-primary/30 text-primary bg-primary/5">
            {post.program}
          </Badge>
        ) : null}
        <p className="text-sm leading-relaxed text-foreground/90">
          {post.content}
        </p>
        {post.learningHighlight ? (
          <p className="text-xs text-muted-foreground flex items-start gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-accent mt-0.5" />
            <span><strong className="text-foreground/80">Learning highlight:</strong> {post.learningHighlight}</span>
          </p>
        ) : null}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-2">
          {taggedStudents.map(student => (
            <Badge key={student.id} variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20 border-none px-3 py-1 text-xs">
              {student.name}
            </Badge>
          ))}
        </div>
        {viewer === "parent" && !post.parentAcknowledgedAt && onAcknowledge ? (
          <Button
            size="sm"
            className="ml-auto"
            onClick={() => onAcknowledge(post.id)}
          >
            Acknowledge Update
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}