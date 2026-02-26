import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OfflinePage() {
  return (
    <main className="neo-glam-bg min-h-screen flex items-center justify-center px-4">
      <section className="neo-glam-card max-w-md rounded-3xl p-8 text-center">
        <h1 className="text-3xl font-headline font-bold mb-3">You are offline</h1>
        <p className="text-muted-foreground mb-6">
          The app could not reach the internet. Reconnect and try again to load
          the latest parent updates.
        </p>
        <Link href="/">
          <Button className="w-full">Try again</Button>
        </Link>
      </section>
    </main>
  );
}
