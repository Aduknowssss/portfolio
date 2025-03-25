"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Linkedin,
  Mail,
  ExternalLink,
  Menu,
  X,
  Shield,
  Heart,
  TrendingUp,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  GraduationCap,
  Armchair,
  Coins,
  Building2,
  Home,
  Package,
} from "lucide-react"
import React, { useState, useRef, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Portfolio() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([
    { sender: "agent", text: "Hi there! How can I help you with insurance today?" },
    { sender: "user", text: "I;m interested in life insurance options." },
    {
      sender: "agent",
      text: "Great! I offer several life insurance plans. Would you like to schedule a consultation to discuss your needs?",
    },
  ])

  const chatEndRef = useRef(null)

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message
      setChatMessages([...chatMessages, { sender: "user", text: message }])
      setMessage("")

      // Simulate agent response after a short delay
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "agent",
            text: "Thank you for your message. I;ll get back to you shortly. Would you like to schedule a consultation to discuss your insurance needs in detail?",
          },
        ])
      }, 1000)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  // Auto-scroll to bottom of chat when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  return (
    <div className="flex min-h-screen flex-col max-w-[1920px] mx-auto">
      <header className="sticky top-0 z-40 w-full border-b shadow-sm" style={{ backgroundColor: "var(--secondary)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="font-bold text-xl">
            <Link href="#home" className="flex items-center group">
              <span className="text-white text-xl tracking-wide transition-all duration-300 group-hover:text-primary-light">
                Blue Sapphire
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#about"
              className="text-sm font-medium text-white relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-light hover:text-primary-light after:transition-all after:duration-300 hover:after:w-full transition-colors"
            >
              About
            </Link>
            <Link
              href="#skills"
              className="text-sm font-medium text-white relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-light hover:text-primary-light after:transition-all after:duration-300 hover:after:w-full transition-colors"
            >
              Skills
            </Link>
            <Link
              href="#products"
              className="text-sm font-medium text-white relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-light hover:text-primary-light after:transition-all after:duration-300 hover:after:w-full transition-colors"
            >
              Products
            </Link>
            <Link
              href="#experience"
              className="text-sm font-medium text-white relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-light hover:text-primary-light after:transition-all after:duration-300 hover:after:w-full transition-colors"
            >
              Experience
            </Link>
            <Link
              href="#faqs"
              className="text-sm font-medium text-white relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-light hover:text-primary-light after:transition-all after:duration-300 hover:after:w-full transition-colors"
            >
              FAQs
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-white relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-light hover:text-primary-light after:transition-all after:duration-300 hover:after:w-full transition-colors"
            >
              Contact
            </Link>
          </nav>
          <MobileNav />
        </div>
      </header>
      <main className="flex-1">
        <section id="home" style={{ backgroundColor: "var(--secondary)" }} className="text-white py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
              <div className="space-y-6 md:w-1/2">
                <Badge style={{ backgroundColor: "var(--primary)" }} className="text-white px-3 py-1 text-sm">
                  Available for appointments
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold">
                  Hi, I;m <span style={{ color: "var(--primary-light)" }}>Rona Oliveros</span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold text-white">PRU LIFE U.K. Agent</h2>
                <p className="text-white md:text-lg">
                  I inspire hope, spread joy, and create new opportunities to transform people;s lives.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    style={{ backgroundColor: "var(--primary)" }}
                    className="text-white relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                    asChild
                  >
                    <Link href="#contact">
                      <span className="relative z-10">Contact Me</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white bg-white/10 hover:bg-white/20 relative overflow-hidden group transition-all duration-300 hover:border-primary-light"
                    asChild
                  >
                    <Link href="#products">
                      <span className="relative z-10 group-hover:text-primary-light transition-colors duration-300">
                        View Products
                      </span>
                    </Link>
                  </Button>
                </div>
                <div className="flex gap-4 pt-2">
                  <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-white hover:text-primary-light transition-colors"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </Link>
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-6 w-6 text-white hover:text-primary-light transition-colors" />
                  </Link>
                  <Link href="mailto:rona@example.com" aria-label="Email">
                    <Mail className="h-6 w-6 text-white hover:text-primary-light transition-colors" />
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center items-center relative">
                {/* Updated larger image container with transparent background */}
                <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
                  {/* Decorative elements */}
                  <div className="absolute w-full h-full rounded-full border-4 border-primary-light/30 animate-pulse-slow"></div>
                  <div className="absolute w-[90%] h-[90%] rounded-full border-2 border-white/20"></div>

                  {/* Image with extended size */}
                  <div className="relative w-[120%] h-[120%] z-10">
                    <Image
                      src="/1.jpg"
                      alt="Rona Oliveros portrait"
                      fill
                      className="object-cover rounded-full shadow-2xl border-4 border-white/30"
                      priority
                    />

                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/30 to-transparent opacity-60 mix-blend-overlay"></div>
                  </div>

                  {/* Floating accent elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-primary-light/20 -translate-y-1/4 translate-x-1/4 backdrop-blur-sm"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-primary/20 translate-y-1/4 -translate-x-1/4 backdrop-blur-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 sm:py-24" style={{ backgroundColor: "var(--accent)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge style={{ backgroundColor: "var(--primary)" }} className="mb-4 text-white">
                About Me
              </Badge>
              <h2 className="text-3xl font-bold text-white">Your Trusted Financial Partner</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg mb-4 text-white">
                I;m a dedicated insurance professional with a passion for helping individuals and families secure their
                financial future. With a client-centered approach, I provide personalized insurance solutions that
                protect what matters most to you.
              </p>
              <p className="text-lg mb-4 text-white">
                My journey in the insurance industry began with a simple belief: everyone deserves financial security
                and peace of mind. As a Blue Sapphire Agent, I;m committed to understanding your unique needs and goals
                to create tailored protection plans.
              </p>
              <p className="text-lg text-white">
                I believe in building long-term relationships with my clients based on trust, transparency, and
                exceptional service. When I;m not helping clients, you can find me volunteering in community outreach
                programs, attending professional development seminars, and spending quality time with my family.
              </p>
            </div>
          </div>
        </section>

        <section id="skills" style={{ backgroundColor: "var(--accent)" }} className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge style={{ backgroundColor: "var(--primary)" }} className="mb-4 text-white">
                My Expertise
              </Badge>
              <h2 className="text-3xl font-bold text-white">How I Can Help You</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <SkillCard
                icon={<Shield style={{ color: "var(--primary-light)" }} className="h-12 w-12" />}
                title="Protection Planning"
                skills={[
                  "Life Insurance",
                  "Critical Illness",
                  "Income Protection",
                  "Family Security",
                  "Estate Planning",
                  "Business Protection",
                ]}
              />
              <SkillCard
                icon={<TrendingUp style={{ color: "var(--primary-light)" }} className="h-12 w-12" />}
                title="Financial Planning"
                skills={[
                  "Retirement Planning",
                  "Education Funding",
                  "Investment Strategies",
                  "Tax Efficiency",
                  "Wealth Accumulation",
                  "Legacy Planning",
                ]}
              />
              <SkillCard
                icon={<Heart style={{ color: "var(--primary-light)" }} className="h-12 w-12" />}
                title="Client Services"
                skills={[
                  "Needs Analysis",
                  "Policy Reviews",
                  "Claims Assistance",
                  "Financial Education",
                  "Personalized Service",
                  "Ongoing Support",
                ]}
              />
            </div>
          </div>
        </section>

        <section id="products" className="py-16 sm:py-24" style={{ backgroundColor: "var(--muted)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge style={{ backgroundColor: "var(--primary)" }} className="mb-4 text-white">
                Featured Products
              </Badge>
              <h2 className="text-3xl font-bold text-white">Insurance Solutions</h2>
              <p className="mt-4 text-white max-w-2xl mx-auto">What is your current priority for today;s discussion?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <PriorityCard icon={<Shield className="h-10 w-10" />} title="Protection" />
              <PriorityCard icon={<GraduationCap className="h-10 w-10" />} title="Children;s Education" />
              <PriorityCard icon={<Armchair className="h-10 w-10" />} title="Retirement" />
              <PriorityCard icon={<Coins className="h-10 w-10" />} title="Medium-to Long-term Goals" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PriorityCard icon={<Building2 className="h-10 w-10" />} title="Ready Fund for Critical Illness" />
              <PriorityCard icon={<Home className="h-10 w-10" />} title="Estate Conservation" />
              <PriorityCard icon={<Package className="h-10 w-10" />} title="Others" />
            </div>

            <div className="text-center mt-12">
              <Button
                style={{ backgroundColor: "var(--primary)" }}
                className="text-white relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                asChild
              >
                <Link href="#contact">
                  <span className="relative z-10">Schedule a Consultation</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="experience" style={{ backgroundColor: "var(--muted)" }} className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge style={{ backgroundColor: "var(--primary)" }} className="mb-4 text-white">
                Professional Experience
              </Badge>
              <h2 className="text-3xl font-bold text-white">My Career Journey</h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-8">
              <ExperienceItem
                title="Senior Insurance Agent"
                company="Blue Sapphire"
                period="2021 - Present"
                description="Provide comprehensive insurance solutions to clients, consistently exceeding sales targets and maintaining a high client retention rate. Specialize in life insurance, health coverage, and retirement planning."
              />
              <ExperienceItem
                title="Insurance Advisor"
                company="Financial Protectors Inc."
                period="2019 - 2021"
                description="Developed personalized insurance portfolios for diverse clientele. Conducted detailed needs analyses and presented tailored solutions. Achieved recognition for outstanding client satisfaction."
              />
              <ExperienceItem
                title="Financial Services Representative"
                company="Secure Future Group"
                period="2017 - 2019"
                description="Assisted clients with financial planning and insurance needs. Built a strong client base through referrals and networking. Participated in continuous professional development programs."
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faqs" className="py-16 sm:py-24" style={{ backgroundColor: "var(--accent)" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge style={{ backgroundColor: "var(--primary)" }} className="mb-4 text-white">
                Common Questions
              </Badge>
              <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
              <p className="mt-4 text-white max-w-2xl mx-auto">
                Find answers to the most common questions about insurance and financial planning.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <FAQAccordion />
            </div>

            <div className="text-center mt-12">
              <p className="text-white mb-6">Still have questions? I;m here to help.</p>
              <Button
                style={{ backgroundColor: "var(--primary)" }}
                className="text-white relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                asChild
              >
                <Link href="#contact">
                  <span className="relative z-10">Contact Me</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="contact" style={{ backgroundColor: "var(--primary)" }} className="py-16 sm:py-24 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="bg-white text-primary mb-4">Get In Touch</Badge>
              <h2 className="text-3xl font-bold text-white">Schedule a Free Consultation</h2>
              <p className="mt-4 text-white max-w-2xl mx-auto">
                Let;s discuss how I can help secure your financial future. Fill out the form below and I;ll get back to
                you within 24 hours.
              </p>
            </div>
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium leading-none text-gray-800">
                      Name
                    </label>
                    <input
                      id="name"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none text-gray-800">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium leading-none text-gray-800">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium leading-none text-gray-800">
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="flex min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="How can I help you?"
                    />
                  </div>
                </div>
                <Button style={{ backgroundColor: "var(--primary)" }} className="w-full text-white">
                  Schedule Consultation
                </Button>
              </form>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-white/10 p-4 rounded-full mb-4">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Call Me</h3>
                <p className="text-white">+63 (123) 456-7890</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white/10 p-4 rounded-full mb-4">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Email Me</h3>
                <p className="text-white">rona@example.com</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white/10 p-4 rounded-full mb-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Visit Me</h3>
                <p className="text-white">Blue Sapphire Office, Manila</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer style={{ backgroundColor: "var(--secondary)" }} className="text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <span className="text-white text-xl font-bold">Blue Sapphire</span>
              </div>
              <p className="text-white mb-4">
                Established in 2010, Blue Sapphire is one of the leading financial services and insurance providers in
                the region.
              </p>
              <div className="flex gap-4">
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-white hover:text-primary-light transition-colors"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5 text-white hover:text-primary-light transition-colors" />
                </Link>
                <Link href="mailto:rona@example.com" aria-label="Email">
                  <Mail className="h-5 w-5 text-white hover:text-primary-light transition-colors" />
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-white">
                <li>
                  <Link href="#" className="hover:text-primary-light transition-colors">
                    Life Insurance
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary-light transition-colors">
                    Health Insurance
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary-light transition-colors">
                    Investment Plans
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary-light transition-colors">
                    Retirement Solutions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white">
                <li>
                  <Link href="#about" className="hover:text-primary-light transition-colors">
                    About Me
                  </Link>
                </li>
                <li>
                  <Link href="#skills" className="hover:text-primary-light transition-colors">
                    My Expertise
                  </Link>
                </li>
                <li>
                  <Link href="#products" className="hover:text-primary-light transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="#faqs" className="hover:text-primary-light transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-primary-light transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Office Hours</h4>
              <ul className="space-y-2 text-white">
                <li>Monday - Friday: 9am - 5pm</li>
                <li>Saturday: 10am - 2pm</li>
                <li>Sunday: Closed</li>
                <li className="pt-2" style={{ color: "var(--primary-light)" }}>
                  Available for appointments
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-sm text-white">
              © {new Date().getFullYear()} Rona Oliveros, Blue Sapphire Agent. All rights reserved.
            </p>
            <div className="text-sm text-white">
              <Link href="#" className="hover:text-primary-light transition-colors mr-4">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary-light transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Chatbot Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-lg focus:outline-none transition-all duration-300 hover:scale-110 group"
        style={{
          background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
          boxShadow: "0 4px 20px rgba(0, 59, 92, 0.3)",
        }}
        aria-label="Chat with us"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <MessageCircle className="h-8 w-8 text-white absolute transition-opacity duration-300 group-hover:opacity-0" />
          <span className="absolute opacity-0 group-hover:opacity-100 text-white font-medium text-xs transition-opacity duration-300">
            Chat Now
          </span>

          {/* Notification dot */}
          <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
        </div>
      </button>

      {/* Enhanced Chat Window */}
      {isChatOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 animate-slideUp"
          style={{
            height: "500px",
            boxShadow: "0 10px 40px rgba(0, 59, 92, 0.3)",
            transform: "translateY(-10px)",
          }}
        >
          {/* Chat Header */}
          <div
            className="p-4 flex justify-between items-center"
            style={{ background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)" }}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <Image src="/1.jpg" alt="Rona Oliveros" width={40} height={40} className="rounded-full" />
              </div>
              <div>
                <h3 className="font-medium text-white">Chat with Rona</h3>
                <p className="text-xs text-white/80">Typically replies in minutes</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.sender === "user" ? "bg-gray-200 text-gray-800" : "text-white"
                    }`}
                    style={
                      msg.sender === "agent"
                        ? {
                            background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
                          }
                        : {}
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center rounded-full border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 focus:outline-none text-gray-700"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 text-white flex items-center justify-center"
                style={{
                  backgroundColor: "var(--primary)",
                }}
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Chat Footer */}
          <div className="p-2 text-center text-xs text-gray-500 bg-gray-50 border-t border-gray-200">
            Powered by Blue Sapphire • Your data is secure
          </div>
        </div>
      )}
    </div>
  )
}

function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  // Prevent scrolling when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="relative z-50 text-white"
        aria-label="Toggle Menu"
        onClick={toggleMenu}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={closeMenu} />}

      {/* Menu */}
      <div
        className={`fixed inset-0 z-45 flex flex-col p-6 pt-20 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "var(--secondary)" }}
      >
        <nav className="flex flex-col gap-6 items-end">
          <Link
            href="#about"
            className="text-lg font-medium text-white hover:text-primary-light transition-colors relative inline-block"
            onClick={closeMenu}
          >
            <span>About</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-light transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#skills"
            className="text-lg font-medium text-white hover:text-primary-light transition-colors relative inline-block"
            onClick={closeMenu}
          >
            <span>Skills</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-light transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#products"
            className="text-lg font-medium text-white hover:text-primary-light transition-colors relative inline-block"
            onClick={closeMenu}
          >
            <span>Products</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-light transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#experience"
            className="text-lg font-medium text-white hover:text-primary-light transition-colors relative inline-block"
            onClick={closeMenu}
          >
            <span>Experience</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-light transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#faqs"
            className="text-lg font-medium text-white hover:text-primary-light transition-colors relative inline-block"
            onClick={closeMenu}
          >
            <span>FAQs</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-light transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#contact"
            className="text-lg font-medium text-white hover:text-primary-light transition-colors relative inline-block"
            onClick={closeMenu}
          >
            <span>Contact</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-light transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
      </div>
    </div>
  )
}

function SkillCard({ icon, title, skills }) {
  return (
    <Card className="overflow-hidden prulife-card border-none">
      <CardContent className="p-8">
        <div className="flex flex-col items-center text-center">
          <div style={{ backgroundColor: "var(--primary)", opacity: 0.3 }} className="mb-6 p-4 rounded-full">
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
          <ul className="space-y-2">
            {skills.map((skill, index) => (
              <li key={index} className="flex items-center justify-center">
                <Badge
                  variant="outline"
                  style={{ borderColor: "var(--primary-light)", color: "white" }}
                  className="px-3 py-1 bg-secondary/50"
                >
                  {skill}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

function ProductCard({ title, description, tags, imageUrl, detailsUrl, applyUrl }) {
  return (
    <Card className="overflow-hidden prulife-card border-none">
      <div className="aspect-video relative">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 to-transparent flex items-end">
          <h3 className="text-xl font-bold p-4 text-white">{title}</h3>
        </div>
      </div>
      <CardContent className="p-6">
        <p className="text-white mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              style={{ borderColor: "var(--primary-light)", color: "white" }}
              className="bg-secondary/50"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-4">
          <Button
            size="sm"
            variant="outline"
            style={{ borderColor: "var(--primary-light)", color: "white" }}
            className="hover:bg-primary/20"
            asChild
          >
            <Link href={detailsUrl} target="_blank" rel="noopener noreferrer">
              <Shield className="h-4 w-4 mr-2" />
              Details
            </Link>
          </Button>
          <Button size="sm" style={{ backgroundColor: "var(--primary)" }} className="text-white" asChild>
            <Link href={applyUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Apply Now
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ExperienceItem({ title, company, period, description }) {
  return (
    <div style={{ borderLeftColor: "var(--primary-light)" }} className="border-l-2 pl-6 py-2">
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
        <span style={{ color: "var(--primary-light)" }} className="font-medium">
          {company}
        </span>
        <span className="hidden sm:inline text-white/50">•</span>
        <span className="text-sm text-white">{period}</span>
      </div>
      <p className="text-white">{description}</p>
    </div>
  )
}

function FAQAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-b border-white/20">
        <AccordionTrigger className="text-white hover:text-primary-light text-left">
          What types of insurance do you offer?
        </AccordionTrigger>
        <AccordionContent className="text-white/90">
          I offer a comprehensive range of insurance products including life insurance, health insurance, critical
          illness coverage, income protection, education plans, and retirement solutions. Each policy can be tailored to
          your specific needs and financial situation.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2" className="border-b border-white/20">
        <AccordionTrigger className="text-white hover:text-primary-light text-left">
          How much insurance coverage do I need?
        </AccordionTrigger>
        <AccordionContent className="text-white/90">
          The amount of coverage you need depends on several factors including your income, debts, family size,
          lifestyle, and future goals. I recommend scheduling a consultation where we can conduct a detailed needs
          analysis to determine the optimal coverage for your situation.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3" className="border-b border-white/20">
        <AccordionTrigger className="text-white hover:text-primary-light text-left">
          What is the difference between term and whole life insurance?
        </AccordionTrigger>
        <AccordionContent className="text-white/90">
          Term life insurance provides coverage for a specific period (e.g., 10, 20, or 30 years) and is generally more
          affordable. Whole life insurance provides lifetime coverage and includes a cash value component that grows
          over time. It typically has higher premiums but offers additional benefits like cash value accumulation and
          potential dividends.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4" className="border-b border-white/20">
        <AccordionTrigger className="text-white hover:text-primary-light text-left">
          How do I file a claim with Blue Sapphire?
        </AccordionTrigger>
        <AccordionContent className="text-white/90">
          Filing a claim is straightforward. Contact me directly or call Blue Sapphire;s claims department. I;ll guide
          you through the process, help you gather the necessary documentation, and ensure your claim is processed as
          quickly as possible. As your agent, I;m here to advocate for you throughout the claims process.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5" className="border-b border-white/20">
        <AccordionTrigger className="text-white hover:text-primary-light text-left">
          Can I change my policy after I purchase it?
        </AccordionTrigger>
        <AccordionContent className="text-white/90">
          Yes, most policies can be adjusted to accommodate changes in your life circumstances. You may be able to
          increase or decrease coverage, add riders, or convert from one policy type to another. I recommend an annual
          policy review to ensure your coverage continues to meet your needs as your life changes.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6" className="border-b border-white/20">
        <AccordionTrigger className="text-white hover:text-primary-light text-left">
          How are premiums determined?
        </AccordionTrigger>
        <AccordionContent className="text-white/90">
          Insurance premiums are calculated based on several factors including age, health status, lifestyle factors
          (such as smoking), occupation, coverage amount, and policy type. During our consultation, I can provide you
          with a detailed breakdown of your premium and explain how different factors affect the cost.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-7" className="border-b border-white/20">
        <AccordionTrigger className="text-white hover:text-primary-light text-left">
          What;s the best age to buy life insurance?
        </AccordionTrigger>
        <AccordionContent className="text-white/90">
          Generally, the younger you are when you purchase life insurance, the lower your premiums will be. However, the
          best time to buy is when you have dependents or financial obligations that would need to be covered if
          something happened to you. Life insurance becomes more important when you have a spouse, children, a mortgage,
          or other significant debts.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function PriorityCard({ icon, title }) {
  return (
    <Card className="overflow-hidden border-none hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
      <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full">
        <div className="mb-4 p-4 rounded-full" style={{ backgroundColor: "var(--primary-light)", opacity: 0.2 }}>
          <div className="text-primary">{icon}</div>
        </div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      </CardContent>
    </Card>
  )
}

