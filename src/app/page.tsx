
"use client";

import Link from "next/link";
import { Camera, Heart, ShieldCheck, MapPin, Phone, Mail, Warehouse, Sparkles, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center justify-center p-4 mb-8 bg-primary/10 rounded-3xl animate-bounce-slow">
          <Warehouse className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-5xl md:text-7xl font-headline font-bold text-foreground mb-6 leading-tight">
          Wisdom Warehouse <br /><span className="text-primary italic">Parent Portal.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-10 leading-relaxed font-body">
          Where curiosity meets creativity. Stay updated with your child's creative journey, artistic discoveries, and innovative workshops at Wisdom Warehouse UAE.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login?role=teacher">
            <Button size="lg" className="h-14 px-8 text-lg font-bold gap-2 rounded-full shadow-lg hover:shadow-xl transition-all">
              Teacher Access
            </Button>
          </Link>
          <Link href="/login?role=parent">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold gap-2 rounded-full border-primary text-primary hover:bg-primary/5 shadow-sm">
              <Heart className="h-5 w-5" /> Parent Access
            </Button>
          </Link>
        </div>
      </header>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-none shadow-sm bg-primary/5 hover:bg-primary/10 transition-colors">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto">
                <Camera className="text-primary h-6 w-6" />
              </div>
              <h3 className="font-headline font-bold text-xl">Daily Moments</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Receive real-time photos of creative projects and learning breakthroughs as they happen in our studio.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm bg-accent/5 hover:bg-accent/10 transition-colors">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto">
                <ShieldCheck className="text-accent h-6 w-6" />
              </div>
              <h3 className="font-headline font-bold text-xl">Secure Portfolio</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A private digital collection for your child's growth, accessible only to you and their dedicated mentors.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-primary/5 hover:bg-primary/10 transition-colors">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto">
                <Sparkles className="text-primary h-6 w-6" />
              </div>
              <h3 className="font-headline font-bold text-xl">Direct Connection</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Streamlined updates on workshop schedules, new creative themes, and your child's developmental progress.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Identity Section - Explicitly pulled from wisdomwarehouseuae.com */}
      <section className="bg-white py-20 border-t border-b overflow-hidden">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-headline font-bold text-primary mb-2">Visit Our Warehouse</h2>
              <div className="w-20 h-1 bg-accent rounded-full"></div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">Location</p>
                  <p className="text-muted-foreground">Villa 20, 4th Street, Al Quoz 1, Dubai, UAE</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">Contact</p>
                  <p className="text-muted-foreground font-body">+971 4 388 9955 / +971 50 152 6139</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">Email</p>
                  <p className="text-muted-foreground">hello@wisdomwarehouse.ae</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Follow our journey</p>
              <Link href="https://www.instagram.com/wisdom_warehouse/" target="_blank">
                <Button variant="ghost" size="icon" className="rounded-full bg-primary/5 hover:bg-primary/20">
                  <Instagram className="h-5 w-5 text-primary" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] rotate-2"></div>
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
               <img 
                 src="https://picsum.photos/seed/wisdom-warehouse-dubai/800/600" 
                 alt="Wisdom Warehouse Creative Studio" 
                 className="object-cover w-full h-full"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Warehouse className="h-8 w-8 text-primary/50" />
          </div>
          <p className="font-headline font-bold text-xl text-foreground mb-2">Wisdom Warehouse UAE</p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
            "A creative workspace for kids to explore their curiosity and express their imagination."
          </p>
          <div className="h-px w-full max-w-xs bg-border mx-auto mb-6"></div>
          <p className="text-xs text-muted-foreground">&copy; 2024 Wisdom Warehouse. All Rights Reserved. Al Quoz 1, Dubai.</p>
        </div>
      </footer>
    </div>
  );
}
