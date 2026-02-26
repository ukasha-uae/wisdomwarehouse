"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import CreatePostForm from "@/components/CreatePostForm";
import { MOCK_POSTS, type Post } from "@/app/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, PlusCircle, Camera, Clock3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { loadPosts, savePosts } from "@/lib/post-storage";
import { format } from "date-fns";

export default function TeacherDashboard() {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [isLoadingFeed, setIsLoadingFeed] = useState(true);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setPosts(loadPosts());
    setHasHydrated(true);
    const timer = setTimeout(() => setIsLoadingFeed(false), 700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    savePosts(posts);
  }, [posts, hasHydrated]);

  const handleNewPost = (newPost: Post) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const seenCount = posts.filter((post) => Boolean(post.parentSeenAt)).length;
  const acknowledgedCount = posts.filter((post) => Boolean(post.parentAcknowledgedAt)).length;
  const programsCovered = new Set(posts.map((post) => post.program).filter(Boolean)).size;
  const todayPosts = posts.filter((post) => format(new Date(post.createdAt), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd"));

  return (
    <div className="neo-glam-bg min-h-screen bg-background pb-20">
      <Navbar role="teacher" />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <header className="mb-10">
          <h1 className="text-3xl font-headline font-bold text-foreground">Teacher Dashboard</h1>
          <p className="text-muted-foreground font-body">Share high-quality classroom moments so parents feel connected to daily learning.</p>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-3">
          <Card className="neo-glam-card border-none shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Updates Shared</p>
              <p className="text-2xl font-bold">{posts.length}</p>
            </CardContent>
          </Card>
          <Card className="neo-glam-card border-none shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <Camera className="h-5 w-5 text-primary" />
              <p className="text-sm text-muted-foreground">Use clear photos that show activity and engagement.</p>
            </CardContent>
          </Card>
          <Card className="neo-glam-card border-none shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <Clock3 className="h-5 w-5 text-primary" />
              <p className="text-sm text-muted-foreground">Aim for timely updates so families stay informed.</p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-3">
          <Card className="neo-glam-soft border-none">
            <CardContent className="p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Seen by Parents</p>
              <p className="text-xl font-bold">{seenCount}</p>
            </CardContent>
          </Card>
          <Card className="neo-glam-soft border-none">
            <CardContent className="p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Acknowledged</p>
              <p className="text-xl font-bold">{acknowledgedCount}</p>
            </CardContent>
          </Card>
          <Card className="neo-glam-soft border-none">
            <CardContent className="p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Programs Covered</p>
              <p className="text-xl font-bold">{programsCovered}</p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <Card className="neo-glam-card border-none">
            <CardContent className="p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Daily Digest Preview</p>
              <p className="text-sm text-foreground/90">
                Today&apos;s summary: {todayPosts.length} update{todayPosts.length === 1 ? "" : "s"} shared,
                {" "}{todayPosts.reduce((total, post) => total + (post.mediaUrls?.length ?? 1), 0)} photo
                {todayPosts.reduce((total, post) => total + (post.mediaUrls?.length ?? 1), 0) === 1 ? "" : "s"},
                {" "}with {todayPosts.filter((post) => Boolean(post.learningHighlight)).length} explicit learning highlight
                {todayPosts.filter((post) => Boolean(post.learningHighlight)).length === 1 ? "" : "s"}.
              </p>
            </CardContent>
          </Card>
        </section>

        <Tabs defaultValue="feed" className="space-y-8">
          <TabsList className="neo-glam-soft grid w-full grid-cols-2 bg-muted/50 p-1">
            <TabsTrigger value="feed" className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <LayoutGrid className="h-4 w-4" /> Activity Feed
            </TabsTrigger>
            <TabsTrigger value="create" className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <PlusCircle className="h-4 w-4" /> Create Update
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            {isLoadingFeed ? (
              <div className="grid md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Card key={idx} className="neo-glam-soft border-none shadow-sm">
                    <CardContent className="p-4 space-y-3">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="aspect-[4/3] w-full rounded-lg" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {posts.map(post => (
                  <PostCard key={post.id} post={post} viewer="teacher" />
                ))}
              </div>
            )}
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