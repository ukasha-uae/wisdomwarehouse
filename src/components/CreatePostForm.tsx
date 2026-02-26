"use client";

import { useState } from "react";
import { Image as ImageIcon, Upload, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { MOCK_STUDENTS, type Post } from "@/app/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const PROGRAM_OPTIONS = ["Tutoring", "Enrichment", "Workshops", "Camp"] as const;

export default function CreatePostForm({ onPostCreated }: { onPostCreated: (post: Post) => void }) {
  const [content, setContent] = useState("");
  const [learningHighlight, setLearningHighlight] = useState("");
  const [program, setProgram] = useState<(typeof PROGRAM_OPTIONS)[number]>("Workshops");
  const [mediaPreviewUrls, setMediaPreviewUrls] = useState<string[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const { toast } = useToast();

  const toggleStudent = (id: string) => {
    setSelectedStudents(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    if (files.length > 5) {
      toast({
        title: "Too many photos",
        description: "Please upload up to 5 photos per update.",
        variant: "destructive",
      });
      return;
    }

    const validFiles = files.filter((file) => file.type.startsWith("image/") && file.size <= 6 * 1024 * 1024);
    if (validFiles.length !== files.length) {
      toast({
        title: "Some files were skipped",
        description: "Only JPG, PNG, or WebP images under 6 MB are accepted.",
        variant: "destructive",
      });
    }

    Promise.all(
      validFiles.map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
            reader.readAsDataURL(file);
          })
      )
    ).then((results) => {
      setMediaPreviewUrls(results.filter(Boolean));
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || selectedStudents.length === 0 || mediaPreviewUrls.length === 0) {
      toast({
        title: "Incomplete post",
        description: "Please upload photos, add a description, and tag at least one student.",
        variant: "destructive",
      });
      return;
    }

    onPostCreated({
      id: Math.random().toString(),
      teacherId: 't1',
      teacherName: 'Sarah Teacher',
      content: content.trim(),
      mediaUrl: mediaPreviewUrls[0],
      mediaUrls: mediaPreviewUrls,
      program,
      learningHighlight: learningHighlight.trim() || undefined,
      parentSeenAt: null,
      parentAcknowledgedAt: null,
      taggedStudentIds: selectedStudents,
      createdAt: new Date().toISOString(),
    });

    setContent("");
    setLearningHighlight("");
    setProgram("Workshops");
    setMediaPreviewUrls([]);
    setSelectedStudents([]);
    toast({
      title: "Post Shared!",
      description: "Parents can now view this classroom update in their feed.",
    });
  };

  return (
    <Card className="neo-glam-card border-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-headline font-bold text-primary flex items-center gap-2">
          <ImageIcon className="h-5 w-5" /> Share a Classroom Update
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="photo" className="text-sm font-semibold">Photo Upload</Label>
            <Input
              id="photo"
              type="file"
              multiple
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageChange}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground">Add up to 5 clear photos to showcase activity, engagement, and outcomes.</p>
            {mediaPreviewUrls.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-xl border p-2">
                {mediaPreviewUrls.map((url, index) => (
                  <img
                    key={url}
                    src={url}
                    alt={`Selected classroom update preview ${index + 1}`}
                    className="h-32 w-full rounded-md object-cover"
                  />
                ))}
              </div>
            ) : (
              <div className="h-28 rounded-xl border border-dashed bg-muted/30 flex items-center justify-center text-xs text-muted-foreground gap-2">
                <Upload className="h-4 w-4" /> No images selected yet
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="program" className="text-sm font-semibold">Program</Label>
              <select
                id="program"
                value={program}
                onChange={(e) => setProgram(e.target.value as (typeof PROGRAM_OPTIONS)[number])}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              >
                {PROGRAM_OPTIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="highlight" className="text-sm font-semibold">Learning Highlight (optional)</Label>
              <Input
                id="highlight"
                placeholder="E.g., problem-solving and confidence-building"
                value={learningHighlight}
                onChange={(e) => setLearningHighlight(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-semibold">Description</Label>
            <Textarea 
              id="content"
              placeholder="Share what the learners worked on, how they engaged, and what progress you observed..."
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

          <div className="rounded-xl bg-accent/10 px-4 py-3 text-sm text-accent-foreground flex items-start gap-2">
            <Sparkles className="h-4 w-4 mt-0.5 text-accent" />
            Parents value specific updates. Mention one behavior, one skill, and one proud moment.
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6 text-lg font-bold shadow-md">
            Share with Parents
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
