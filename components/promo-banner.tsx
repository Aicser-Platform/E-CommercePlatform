import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function PromoBanner() {
  return (
    <section className="py-12">
      <div className="relative overflow-hidden rounded-2xl bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-foreground/20 via-transparent to-transparent" />
        <div className="relative px-6 py-12 md:px-12 md:py-16 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                Limited Time Offer
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground text-balance">
                Get 25% Off Your First Order
              </h2>
              <p className="mt-3 text-primary-foreground/80 max-w-lg text-pretty">
                Sign up today and enjoy exclusive discounts on your first purchase. 
                Don&apos;t miss out on amazing deals!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                asChild
                size="lg" 
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
