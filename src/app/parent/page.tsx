"use client";

import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { MOCK_POSTS, MOCK_PARENT, MOCK_STUDENTS } from "@/app/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Sparkles } from "lucide-react";

export default function ParentDashboard() {
  // Filter posts that tag the parent's children
  const childrenPosts = MOCK_POSTS.filter(post => 
    post.taggedStudentIds.some(id => MOCK_PARENT.childIds.includes(id))
  );

  const myChildren = MOCK_STUDENTS.filter(s => MOCK_PARENT.childIds.includes(s.id));

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar role="parent" />
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Child Profile Header */}
        <section className="mb-10">
          <Card className="bg-accent/10 border-none shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Heart className="h-32 w-32" />
            </div>
            <CardContent className="p-6 flex items-center space-x-4 relative z-10">
              {myChildren.map(child => (
                <div key={child.id} className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16 border-4 border-white shadow-md">
                    <AvatarImage src={child.avatarUrl} alt={child.name} />
                    <AvatarFallback className="bg-primary text-white">{child.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-headline font-bold text-foreground">Welcome back, {MOCK_PARENT.name}!</h2>
                    <p className="text-accent font-semibold">{child.name}'s Daily Glimpses • {child.className}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Personalized Feed */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-headline font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" /> Latest Updates
            </h3>
            <span className="text-sm text-muted-foreground">{childrenPosts.length} moments shared</span>
          </div>

          <div className="space-y-8">
            {childrenPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
            
            {childrenPosts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                <p className="text-muted-foreground">No updates shared for your child yet. Stay tuned!</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}