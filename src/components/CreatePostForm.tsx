"use client";

import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MOCK_STUDENTS } from "@/app/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function CreatePostForm({ onPostCreated }: { onPostCreated: (post: any) => void }) {
  const [content, setContent] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const { toast } = useToast();

  const toggleStudent = (id: string) => {
    setSelectedStudents(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || selectedStudents.length === 0) {
      toast({
        title: "Incomplete post",
        description: "Please add a description and tag at least one student.",
        variant: "destructive",
      });
      return;
    }

    onPostCreated({
      id: Math.random().toString(),
      teacherId: 't1',
      teacherName: 'Sarah Teacher',
      content,
      mediaUrl: 'https://picsum.photos/seed/creative/800/600',
      taggedStudentIds: selectedStudents,
      createdAt: new Date().toISOString(),
    });

    setContent("");
    setSelectedStudents([]);
    toast({
      title: "Post Shared!",
      description: "The parents have been notified of this update.",
    });
  };

  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-headline font-bold text-primary flex items-center gap-2">
          <ImageIcon className="h-5 w-5" /> Share a Classroom Moment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-semibold">Description</Label>
            <Textarea 
              id="content"
              placeholder="Tell parents what the students did today..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[150px] resize-none"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold">Tag Students</Label>
            <p className="text-xs text-muted-foreground mb-2">Select the students featured in this update.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {MOCK_STUDENTS.map(student => (
                <div 
                  key={student.id} 
                  className={cn(
                    "flex items-center space-x-2 p-2 rounded-md border cursor-pointer transition-colors",
                    selectedStudents.includes(student.id) ? "bg-primary/10 border-primary" : "hover:bg-accent/5"
                  )}
                  onClick={() => toggleStudent(student.id)}
                >
                  <Checkbox 
                    id={student.id} 
                    checked={selectedStudents.includes(student.id)}
                    onCheckedChange={() => toggleStudent(student.id)}
                  />
                  <Label htmlFor={student.id} className="text-xs cursor-pointer">{student.name}</Label>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6 text-lg font-bold shadow-md">
            Share with Parents
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
