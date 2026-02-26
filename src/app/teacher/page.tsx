"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import CreatePostForm from "@/components/CreatePostForm";
import { MOCK_POSTS, type Post } from "@/app/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, LayoutGrid, PlusCircle } from "lucide-react";

export default function TeacherDashboard() {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);

  const handleNewPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar role="teacher" />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <header className="mb-10">
          <h1 className="text-3xl font-headline font-bold text-foreground">Teacher Dashboard</h1>
          <p className="text-muted-foreground font-body">Manage your class activities and keep parents updated.</p>
        </header>

        <Tabs defaultValue="feed" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1">
            <TabsTrigger value="feed" className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <LayoutGrid className="h-4 w-4" /> Activity Feed
            </TabsTrigger>
            <TabsTrigger value="create" className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <PlusCircle className="h-4 w-4" /> Create Update
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            {posts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl shadow-sm border-2 border-dashed">
                <PlusCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-headline text-xl">No posts yet</h3>
                <p className="text-muted-foreground">Start sharing student progress by creating a new post.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="create">
            <div className="max-w-2xl mx-auto">
              <CreatePostForm onPostCreated={handleNewPost} />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}