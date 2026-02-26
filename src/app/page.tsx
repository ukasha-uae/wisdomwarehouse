"use client";

import Link from "next/link";
import { Camera, Heart, ShieldCheck, MapPin, Phone, Mail, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center justify-center p-3 mb-8 bg-primary/10 rounded-2xl">
          <GraduationCap className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-5xl md:text-7xl font-headline font-bold text-foreground mb-6 leading-tight">
          Maplewood Academy <br /><span className="text-primary italic">Parent Portal.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-10 leading-relaxed font-body">
          Connecting our classroom to your home. Stay updated with your child's daily learning, growth, and joy at Maplewood Academy.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login?role=teacher">
            <Button size="lg" className="h-14 px-8 text-lg font-bold gap-2 rounded-full shadow-lg hover:shadow-xl transition-all">
              <GraduationCap className="h-5 w-5" /> Teacher Login
            </Button>
          </Link>
          <Link href="/login?role=parent">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold gap-2 rounded-full border-primary text-primary hover:bg-primary/5 shadow-sm">
              <Heart className="h-5 w-5" /> Parent Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-none shadow-sm bg-primary/5">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto">
                <Camera className="text-primary h-6 w-6" />
              </div>
              <h3 className="font-headline font-bold text-xl">Daily Glimpses</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Receive real-time photos and updates of your child's activities and classroom adventures.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm bg-accent/5">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto">
                <ShieldCheck className="text-accent h-6 w-6" />
              </div>
              <h3 className="font-headline font-bold text-xl">Secure Access</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A private and encrypted environment where you only see updates relevant to your child.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-primary/5">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto">
                <Mail className="text-primary h-6 w-6" />
              </div>
              <h3 className="font-headline font-bold text-xl">Direct Connection</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The most efficient way to stay in sync with teachers regarding school events and progress.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* School Identity Section */}
      <section className="bg-white py-16 border-t border-b">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-headline font-bold">Visit Maplewood Academy</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold">Location</p>
                  <p className="text-muted-foreground text-sm">123 Education Lane, Maplewood Heights, CA 90210</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold">Contact</p>
                  <p className="text-muted-foreground text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold">Email</p>
                  <p className="text-muted-foreground text-sm">info@maplewoodacademy.edu</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
             <img 
               src="https://picsum.photos/seed/school/800/600" 
               alt="Maplewood Academy Campus" 
               className="object-cover w-full h-full"
             />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground bg-muted/30">
        <div className="container mx-auto px-4">
          <p className="mb-2 font-bold text-foreground">Maplewood Academy</p>
          <p>&copy; 2024 Maplewood Academy. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
