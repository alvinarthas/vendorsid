import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Mail, MapPin, Phone } from 'lucide-react';

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">VENDORS.ID</span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <Link href="/" className="transition-colors hover:text-primary">
              HOME
            </Link>
            <Link
              href="/products"
              className="transition-colors hover:text-primary"
            >
              PRODUK & LAYANAN
            </Link>
            <Link href="/blog" className="transition-colors hover:text-primary">
              BLOG
            </Link>
          </nav>
          <Button>Contact Us</Button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-zinc-900/90">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/90 to-zinc-900/60" />
          </div>
          <div className="container relative flex min-h-[600px] flex-col items-center justify-center space-y-8 py-20 text-center text-white">
            <h1 className="text-4xl font-bold tracking-tighter md:text-6xl">
              Your Trusted Partner in
              <br />
              Premium Clothing Solutions
            </h1>
            <p className="max-w-[600px] text-zinc-200">
              Vendors.ID provides high-quality textile and clothing
              manufacturing services, delivering excellence in every thread.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-muted py-20">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Our Services
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: 'Custom Manufacturing',
                  description:
                    'Tailored clothing production to meet your specific requirements and designs.'
                },
                {
                  title: 'Quality Materials',
                  description:
                    'Premium fabrics and materials sourced from trusted suppliers worldwide.'
                },
                {
                  title: 'Expert Craftsmanship',
                  description:
                    'Skilled artisans and modern technology ensuring superior quality in every piece.'
                }
              ].map((service, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-background p-6 shadow-sm"
                >
                  <h3 className="mb-3 text-xl font-semibold">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Why Choose Vendors.ID
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                'Industry Leading Quality',
                'Competitive Pricing',
                'Fast Turnaround Time',
                'Dedicated Support'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-muted py-20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-12 text-3xl font-bold">Get In Touch</h2>
              <div className="grid gap-8">
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>contact@vendors.id</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+62 123 456 7890</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Jakarta, Indonesia</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="text-sm text-muted-foreground">
              © 2024 Vendors.ID. All rights reserved.
            </div>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
