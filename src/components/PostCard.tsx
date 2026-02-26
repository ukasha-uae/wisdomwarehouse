"use client";

import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type Post, MOCK_STUDENTS } from "@/app/lib/mock-data";

export default function PostCard({ post }: { post: Post }) {
  const taggedStudents = MOCK_STUDENTS.filter(s => post.taggedStudentIds.includes(s.id));

  return (
    <Card className="overflow-hidden border-none shadow-md bg-card transition-all hover:shadow-lg">
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
      </CardHeader>
      
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={post.mediaUrl}
          alt="Activity moment"
          fill
          className="object-cover transition-transform hover:scale-105 duration-500"
          data-ai-hint="activity photo"
        />
      </div>

      <CardContent className="p-4 space-y-3">
        <p className="text-sm leading-relaxed text-foreground/90">
          {post.content}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
        {taggedStudents.map(student => (
          <Badge key={student.id} variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20 border-none px-3 py-1 text-xs">
            {student.name}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}