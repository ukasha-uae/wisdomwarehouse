"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, LayoutDashboard, LogOut, Users, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar({ role }: { role: 'teacher' | 'parent' | 'guest' }) {
  const pathname = usePathname();

  const navItems = role === 'teacher' ? [
    { label: 'Dashboard', href: '/teacher', icon: LayoutDashboard },
    { label: 'Students', href: '/teacher/students', icon: Users },
  ] : role === 'parent' ? [
    { label: 'Feed', href: '/parent', icon: Heart },
    { label: 'Profile', href: '/parent/profile', icon: User },
  ] : [];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <GraduationCap className="text-primary-foreground h-5 w-5" />
          </div>
          <span className="font-headline font-bold text-xl text-primary tracking-tight">Maplewood Academy</span>
        </Link>

        <div className="flex items-center space-x-1 md:space-x-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "gap-2 transition-all",
                  pathname === item.href ? "text-primary bg-primary/10 font-bold" : "text-muted-foreground hover:text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            </Link>
          ))}
          {role !== 'guest' && (
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive transition-colors gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
