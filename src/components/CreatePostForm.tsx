"use client";

import { useState } from "react";
import { Sparkles, Image as ImageIcon, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MOCK_STUDENTS, type Student } from "@/app/lib/mock-data";
import { aiPostDescriptionSuggestions } from "@/ai/flows/ai-post-description-suggestions";
import { useToast } from "@/hooks/use-toast";

export default function CreatePostForm({ onPostCreated }: { onPostCreated: (post: any) => void }) {
  const [content, setContent] = useState("");
  const [keywords, setKeywords] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const { toast } = useToast();

  const handleGenerateAI = async () => {
    if (!keywords && !content) {
      toast({
        title: "More info needed",
        description: "Please provide some keywords or start writing to help the AI suggest a description.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await aiPostDescriptionSuggestions({
        keywords: keywords || content,
        mediaUrls: [], // In a real app, we'd pass base64 image data here
      });
      setContent(result.description);
      toast({
        title: "AI Suggestion Ready!",
        description: "Review and edit the suggested description below.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate AI description. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

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
    setKeywords("");
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
          <ImageIcon className="h-5 w-5" /> Share a Moment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="keywords" className="text-sm font-semibold">AI Inspiration (Optional)</Label>
            <div className="flex gap-2">
              <Textarea 
                id="keywords"
                placeholder="E.g. painting, colors, creative, teamwork..."
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="resize-none h-20"
              />
              <Button 
                type="button" 
                variant="outline" 
                className="h-20 w-32 flex flex-col gap-1 border-primary/30 text-primary hover:bg-primary/5"
                onClick={handleGenerateAI}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    <span className="text-[10px]">AI Help</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-semibold">Description</Label>
            <Textarea 
              id="content"
              placeholder="What did the students do today?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold">Tag Students</Label>
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

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6 text-lg font-bold">
            Post to Feed
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}