"use client";

import Link from "next/link";
import Image from "next/image";
import { Camera, Heart, ShieldCheck, MapPin, Phone, Mail, Sparkles, Instagram, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center justify-center p-4 mb-8 bg-primary/10 rounded-3xl">
          <Image
            src="/wisdom-warehouse-logo-dark.png"
            alt="Wisdom Warehouse logo"
            width={56}
            height={56}
            className="h-14 w-14 object-contain"
            priority
          />
        </div>
        <h1 className="text-5xl md:text-7xl font-headline font-bold text-foreground mb-6 leading-tight">
          Reimagining <br /><span className="text-primary italic">Education.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-10 leading-relaxed font-body">
          Wisdom Warehouse is a holistic learning space in Dubai for children who do not always thrive in traditional systems. We support each learner through personalised mentorship, hands-on learning, and emotional resilience.
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
                Families receive regular updates from workshops and learning sessions, helping them stay connected to each child&apos;s growth.
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
                A private, trusted communication space for mentors and families to track progress, confidence, and practical skill-building.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-primary/5 hover:bg-primary/10 transition-colors">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto">
                <Sparkles className="text-primary h-6 w-6" />
              </div>
              <h3 className="font-headline font-bold text-xl">Holistic Learning</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Built around individuality, curiosity, inclusion, and growth over perfection - education that adapts to the child.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
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
                  <p className="text-muted-foreground">Alserkal Avenue, Warehouse 49A, Al Quoz 1, Dubai, UAE</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">Contact</p>
                  <p className="text-muted-foreground font-body">+971 54 306 8648</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">Email</p>
                  <p className="text-muted-foreground">admin@wisdomwarehousedubai.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">Operating Times</p>
                  <p className="text-muted-foreground">
                    Monday - Thursday: 10:30 - 18:00
                    <br />
                    Friday: 10:30 - 16:30
                    <br />
                    Saturday: 9:30 - 14:00
                    <br />
                    Sunday: 10:00 - 15:00
                  </p>
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
              <Image
                src="/wisdom-warehouse-about-us.jpg"
                alt="Wisdom Warehouse learning environment"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
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
            <Image
              src="/wisdom-warehouse-logo-dark.png"
              alt="Wisdom Warehouse logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
          </div>
          <p className="font-headline font-bold text-xl text-foreground mb-2">Wisdom Warehouse UAE</p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
            Beyond the system. Into their potential.
          </p>
          <div className="h-px w-full max-w-xs bg-border mx-auto mb-6"></div>
          <p className="text-xs text-muted-foreground">&copy; 2025 Wisdom Warehouse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
