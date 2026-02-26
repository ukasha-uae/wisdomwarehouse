"use client";

import Link from "next/link";
import { Camera, Heart, ShieldCheck, Sparkles, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center justify-center p-3 mb-8 bg-primary/10 rounded-2xl">
          <Camera className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-5xl md:text-7xl font-headline font-bold text-foreground mb-6 leading-tight">
          Every Moment <br /><span className="text-primary italic">Worth Sharing.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-10 leading-relaxed font-body">
          The ultimate communication bridge for teachers and parents. Share daily glimpses of learning, growth, and joy at school.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login?role=teacher">
            <Button size="lg" className="h-14 px-8 text-lg font-bold gap-2 rounded-full">
              <GraduationCap className="h-5 w-5" /> I'm a Teacher
            </Button>
          </Link>
          <Link href="/login?role=parent">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold gap-2 rounded-full border-primary text-primary hover:bg-primary/5">
              <Heart className="h-5 w-5" /> I'm a Parent
            </Button>
          </Link>
        </div>
      </header>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-none shadow-sm bg-accent/5">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto">
                <Sparkles className="text-accent h-6 w-6" />
              </div>
              <h3 className="font-headline font-bold text-xl">AI Assistant</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Effortlessly write creative and engaging daily updates with our smart AI description tool.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm bg-primary/5">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto">
                <ShieldCheck className="text-primary h-6 w-6" />
              </div>
              <h3 className="font-headline font-bold text-xl">Private & Secure</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Parents only see posts tagged with their own children, ensuring a safe and focused experience.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-accent/5">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto">
                <Camera className="text-accent h-6 w-6" />
              </div>
              <h3 className="font-headline font-bold text-xl">Visual Stories</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Capture and share high-quality photos and videos of classroom adventures instantly.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center border-t text-sm text-muted-foreground bg-white">
        &copy; 2024 DailyGlimpse. Empowering Education Through Communication.
      </footer>
    </div>
  );
}