"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { MOCK_POSTS, MOCK_PARENT, MOCK_STUDENTS } from "@/app/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Sparkles, MessageCircle, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { loadPosts, savePosts } from "@/lib/post-storage";
import { Badge } from "@/components/ui/badge";

export default function ParentDashboard() {
  const [isLoadingFeed, setIsLoadingFeed] = useState(true);
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [hasHydrated, setHasHydrated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setPosts(loadPosts());
    setHasHydrated(true);
    const timer = setTimeout(() => setIsLoadingFeed(false), 850);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    savePosts(posts);
  }, [posts, hasHydrated]);

  // Filter posts that tag the parent's children
  const childrenPosts = posts
    .filter(post => post.taggedStudentIds.some(id => MOCK_PARENT.childIds.includes(id)))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const myChildren = MOCK_STUDENTS.filter(s => MOCK_PARENT.childIds.includes(s.id));
  const latestPrograms = Array.from(new Set(childrenPosts.map((post) => post.program).filter(Boolean))).slice(0, 3);

  const handleAcknowledge = (postId: string) => {
    const now = new Date().toISOString();
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              parentSeenAt: post.parentSeenAt ?? now,
              parentAcknowledgedAt: now,
            }
          : post
      )
    );
    toast({
      title: "Update acknowledged",
      description: "Your teacher can now see that this update was acknowledged.",
    });
  };

  return (
    <div className="neo-glam-bg min-h-screen bg-background pb-20">
      <Navbar role="parent" />
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Child Profile Header */}
        <section className="mb-10">
          <Card className="neo-glam-card bg-accent/10 border-none shadow-sm overflow-hidden relative">
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

        <section className="mb-8">
          <Card className="neo-glam-soft border-none shadow-sm">
            <CardContent className="p-4 grid gap-3 sm:grid-cols-2">
              <a href="https://wa.me/971543068648" target="_blank" rel="noreferrer">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <MessageCircle className="h-4 w-4 text-green-600" /> WhatsApp Administration
                </Button>
              </a>
              <a href="tel:+971543068648">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Phone className="h-4 w-4 text-primary" /> Call Wisdom Warehouse
                </Button>
              </a>
              <a
                href="https://maps.google.com/?q=Alserkal+Avenue+Warehouse+49A+Al+Quoz+1+Dubai+UAE"
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="outline" className="w-full justify-start gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> Open Location
                </Button>
              </a>
              <div className="rounded-md border px-3 py-2 text-sm text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" /> Mon-Thu 10:30-18:00
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <Card className="neo-glam-card border-none">
            <CardContent className="p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Daily Digest</p>
              <p className="text-sm text-foreground/90 mb-3">
                {childrenPosts.length > 0
                  ? `You have ${childrenPosts.length} update${childrenPosts.length === 1 ? "" : "s"} in your feed, with the latest shared ${formatDistanceToNow(new Date(childrenPosts[0].createdAt))} ago.`
                  : "Your daily digest will appear as soon as your teacher shares the first update."}
              </p>
              <div className="flex flex-wrap gap-2">
                {latestPrograms.length > 0 ? (
                  latestPrograms.map((program) => (
                    <Badge key={program} variant="secondary" className="bg-primary/10 text-primary border-none">
                      {program}
                    </Badge>
                  ))
                ) : (
                  <Badge variant="secondary" className="bg-muted text-muted-foreground border-none">
                    Awaiting new updates
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Personalized Feed */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-headline font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" /> Latest Updates
            </h3>
            <span className="text-sm text-muted-foreground">
              {childrenPosts.length} moments shared
              {childrenPosts[0] ? ` • Last update ${formatDistanceToNow(new Date(childrenPosts[0].createdAt))} ago` : ""}
            </span>
          </div>

          <div className="space-y-8">
            {isLoadingFeed ? (
              Array.from({ length: 2 }).map((_, idx) => (
                <Card key={idx} className="neo-glam-soft border-none shadow-sm">
                  <CardContent className="p-4 space-y-3">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="aspect-[4/3] w-full rounded-lg" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))
            ) : (
              childrenPosts.map(post => (
                <PostCard key={post.id} post={post} viewer="parent" onAcknowledge={handleAcknowledge} />
              ))
            )}
            
            {!isLoadingFeed && childrenPosts.length === 0 && (
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