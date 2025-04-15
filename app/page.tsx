"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Linkedin,
  Mail,
  Menu,
  X,
  Shield,
  Heart,
  TrendingUp,
  Phone,
  MessageCircle,
  Send,
  GraduationCap,
  Armchair,
  Coins,
  Building2,
  Home,
  Package,
  Award,
  Star,
  Users,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react"
import React, { useState, useRef, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AnimatedSection, AnimatedElement, StaggerContainer } from "./components/animated-section"
import { FloatingElement, FloatingBackground } from "./components/floating-elements"
import { ImageSlideShow } from "./components/image-slideshow"
import { FeedbackForm } from "./components/feedback-form"
import { InteractiveMap } from "./components/interactive-map"

export default function Portfolio() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([
    { sender: "agent", text: "Hi there! How can I help you with insurance today?" },
    { sender: "user", text: "I'm interested in life insurance options." },
    {
      sender: "agent",
      text: "Great! I offer several life insurance plans. Would you like to schedule a consultation to discuss your needs?",
    },
  ])
  const [activeSection, setActiveSection] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const [stats, setStats] = useState({ clients: 0, experience: 0, satisfaction: 0, policies: 0 })
  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [contactMessage, setContactMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [appointmentDate, setAppointmentDate] = useState("")
  const [appointmentTime, setAppointmentTime] = useState("")
  const [appointmentType, setAppointmentType] = useState("virtual")
  const [appointmentName, setAppointmentName] = useState("")
  const [appointmentEmail, setAppointmentEmail] = useState("")
  const [appointmentPhone, setAppointmentPhone] = useState("")
  const [appointmentNotes, setAppointmentNotes] = useState("")
  const [isAppointmentSubmitting, setIsAppointmentSubmitting] = useState(false)
  const [isAppointmentSubmitted, setIsAppointmentSubmitted] = useState(false)

  // Sample profile images - in a real app, these would be actual different photos
  const profileImages = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg"]

  const chatEndRef = useRef<HTMLDivElement>(null)

  // Add refs for sections that need animation reset
  const aboutSectionRef = useRef(null)
  const skillsSectionRef = useRef(null)
  const productsSectionRef = useRef(null)
  const contactSectionRef = useRef(null)
  const feedbackSectionRef = useRef(null)

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
            text: "Thank you for your message. I'll get back to you shortly. Would you like to schedule a consultation to discuss your insurance needs in detail?",
          },
        ])
      }, 1000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      // In a real application, you would send this data to your backend
      console.log({
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        message: contactMessage,
      })

      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after submission
      setTimeout(() => {
        setContactName("")
        setContactEmail("")
        setContactPhone("")
        setContactMessage("")
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAppointmentSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      // In a real application, you would send this data to your backend
      console.log({
        name: appointmentName,
        email: appointmentEmail,
        phone: appointmentPhone,
        date: appointmentDate,
        time: appointmentTime,
        type: appointmentType,
        notes: appointmentNotes,
      })

      setIsAppointmentSubmitting(false)
      setIsAppointmentSubmitted(true)

      // Reset form after submission
      setTimeout(() => {
        setAppointmentName("")
        setAppointmentEmail("")
        setAppointmentPhone("")
        setAppointmentDate("")
        setAppointmentTime("")
        setAppointmentType("virtual")
        setAppointmentNotes("")
        setIsAppointmentSubmitted(false)
        setShowAppointmentModal(false)
      }, 3000)
    }, 1500)
  }

  // Auto-scroll to bottom of chat when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  // Track active section for navigation highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Animate stats counters
  useEffect(() => {
    const animateStats = () => {
      const targetStats = { clients: 100, experience: 6, satisfaction: 98, policies: 0 }
      const duration = 2000 // 2 seconds
      const steps = 50
      const interval = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps

        setStats({
          clients: Math.floor(progress * targetStats.clients),
          experience: Math.floor(progress * targetStats.experience),
          satisfaction: Math.floor(progress * targetStats.satisfaction),
          policies: Math.floor(progress * targetStats.policies),
        })

        if (step >= steps) {
          clearInterval(timer)
          setStats(targetStats)
        }
      }, interval)

      return () => clearInterval(timer)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateStats()
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    const statsSection = document.getElementById("stats")
    if (statsSection) {
      observer.observe(statsSection)
    }

    return () => observer.disconnect()
  }, [])

  // Fix the TypeScript errors by adding proper type annotations
  const resetSectionAnimation = (sectionRef: React.RefObject<any>) => {
    if (sectionRef.current && sectionRef.current.resetAnimation) {
      sectionRef.current.resetAnimation()
    }
  }

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.getElementById("appointment-modal")
      if (modal && !modal.contains(event.target as Node) && showAppointmentModal) {
        setShowAppointmentModal(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showAppointmentModal])

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (showAppointmentModal) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [showAppointmentModal])


  return (
    <div className="flex min-h-screen flex-col max-w-[1920px] mx-auto overflow-hidden">
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled ? "bg-secondary/95 backdrop-blur-sm shadow-md py-2" : "bg-secondary py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="font-bold text-xl">
            <Link href="#home" className="flex items-center group">
            <Image src="/Blue Sapphire.png" alt="PRU LIFE U.K." width={40} height={40} className="mr-2 rounded-md filter invert brightness-0" />
              <span className="text-white text-xl tracking-wide transition-all duration-300 group-hover:text-primary-light">
                Blue Sapphire
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            {["about", "skills", "products", "experience", "feedback", "FAQs", "contact"].map((section) => (
              <Link
                key={section}
                href={`#${section}`}
                onClick={() => {
                  if (section === "about") resetSectionAnimation(aboutSectionRef)
                  if (section === "skills") resetSectionAnimation(skillsSectionRef)
                  if (section === "products") resetSectionAnimation(productsSectionRef)
                  if (section === "contact") resetSectionAnimation(contactSectionRef)
                  if (section === "feedback") resetSectionAnimation(feedbackSectionRef)
                }}
                className={`text-sm font-medium text-white relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-light hover:text-primary-light after:transition-all after:duration-300 hover:after:w-full transition-colors ${
                  activeSection === section ? "text-primary-light after:w-full" : ""
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ))}
          </nav>
          <MobileNav activeSection={activeSection} />
        </div>
      </header>
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <AnimatedSection
          id="home"
          style={{ backgroundColor: "var(--secondary)" }}
          className="text-white py-24 sm:py-32 relative overflow-hidden"
          animation="none"
        >
          <FloatingBackground
            count={15}
            colors={["var(--primary)", "var(--primary-light)"]}
            minOpacity={0.03}
            maxOpacity={0.08}
          />

          <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 lg:gap-12">
              <AnimatedElement className="space-y-6 md:w-2/5 pl-4 md:pl-8" animation="slide-in-left">
                <Badge style={{ backgroundColor: "var(--primary)" }} className="text-white px-3 py-1 text-sm">
                  Available for appointments
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold">
                  Hi, I&apos;m <span style={{ color: "var(--primary-light)" }}>Rona Oliveros</span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold text-white">PRU LIFE U.K. Agent</h2>
                <p className="text-white md:text-lg">Secure Your Future with Pru Life UK.</p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    style={{ backgroundColor: "var(--primary)" }}
                    className="text-white relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                    onClick={() => setShowAppointmentModal(true)}
                  >
                    <span className="relative z-10 flex items-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      Book Appointment
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
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
                <StaggerContainer className="flex gap-4 pt-2" staggerDelay={150}>
                  <Link
                    href="https://www.linkedin.com/in/rona-oliveros-3923a5354"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-6 w-6 text-white hover:text-primary-light transition-colors" />
                  </Link>
                  <Link href="mailto:pluk.ronaoliveros11@gmail.com" aria-label="Email">
                    <Mail className="h-6 w-6 text-white hover:text-primary-light transition-colors" />
                  </Link>
                  <Link href="tel:09627645297" aria-label="Phone">
                    <Phone className="h-6 w-6 text-white hover:text-primary-light transition-colors" />
                  </Link>
                  <Link
                    href="https://maps.app.goo.gl/18F Exquadra Tower 1 Jade Drive, Ortigas Center, San Antonio Pasig City"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Location"
                  >
                    <MapPin className="h-6 w-6 text-white hover:text-primary-light transition-colors" />
                  </Link>
                </StaggerContainer>
              </AnimatedElement>
              <AnimatedElement
                className="md:w-1/2 flex justify-center items-center relative"
                animation="zoom-in"
                delay={300}
              >
                {/* Updated image container with enhanced slideshow */}
                <div className="relative w-[80vw] h-[80vw] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] flex items-center justify-center">
                  {/* Decorative elements */}
                  <div className="absolute w-full h-full rounded-full border-4 border-primary-light/30 animate-pulse-slow"></div>
                  <div className="absolute w-[90%] h-[90%] rounded-full border-2 border-white/20"></div>

                  {/* Enhanced image slideshow with extended size */}
                  <div className="relative w-[110%] h-[110%] z-10">
                    <ImageSlideShow
                      images={profileImages}
                      interval={4000}
                      showControls={true}
                      showIndicators={true}
                      effect="kenburn"
                      theme="glass"
                      className="profile-slideshow"
                    />
                  </div>

                  {/* Floating accent elements */}
                  <FloatingElement
                    size="lg"
                    top="-10%"
                    right="-10%"
                    color="var(--primary-light)"
                    opacity={0.2}
                    blur={2}
                    duration={8}
                  />
                  <FloatingElement
                    size="lg"
                    bottom="-10%"
                    left="-10%"
                    color="var(--primary)"
                    opacity={0.2}
                    blur={2}
                    duration={10}
                    delay={2}
                  />
                  <FloatingElement
                    size="md"
                    top="20%"
                    right="15%"
                    color="var(--primary-light)"
                    opacity={0.15}
                    blur={3}
                    duration={12}
                    delay={1}
                  />
                  <FloatingElement
                    size="sm"
                    bottom="20%"
                    right="10%"
                    color="white"
                    opacity={0.1}
                    blur={2}
                    duration={7}
                    delay={3}
                  />
                  <FloatingElement
                    size="sm"
                    top="15%"
                    left="10%"
                    color="white"
                    opacity={0.1}
                    blur={2}
                    duration={9}
                    delay={2}
                  />
                </div>
              </AnimatedElement>
            </div>
          </div>
        </AnimatedSection>

        {/* Stats Section - New */}
        <AnimatedSection
          id="stats"
          className="py-16 relative bg-gradient-to-b from-secondary to-accent"
          animation="fade-in"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <StatCard
                icon={<Users className="h-10 w-10 text-primary-light" />}
                value={stats.clients}
                label="Happy Clients"
                suffix="+"
              />
              <StatCard
                icon={<Award className="h-10 w-10 text-primary-light" />}
                value={stats.experience}
                label="Years Experience"
                suffix="+"
              />
              <StatCard
                icon={<Star className="h-10 w-10 text-primary-light" />}
                value={stats.satisfaction}
                label="Client Satisfaction"
                suffix="%"
              />
              <StatCard
                icon={<Shield className="h-10 w-10 text-primary-light" />}
                value={stats.policies}
                label="Policies Issued"
                suffix="+"
              />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection
    id="about"
    ref={aboutSectionRef}
    className="py-16 sm:py-24 relative"
    style={{ backgroundColor: "var(--accent)" }}
    animation="fade-in"
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <AnimatedElement animation="slide-in-left" delay={200}>
          <Badge style={{ backgroundColor: "var(--primary)" }} className="mb-4 text-white">
            About Me
          </Badge>
        </AnimatedElement>
        <AnimatedElement animation="slide-in-right" delay={200}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Your Journey to Financial Confidence Starts Here
          </h2>
        </AnimatedElement>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch md:min-h-[600px]">
        
        {/* Desktop Only: Full-Height Image with Animation */}
        <AnimatedElement animation="fade-in" delay={300}>
          <div className="hidden md:block h-full w-full">
                  <Image
                    src="/4.jpg" // ← Use a high-res version
                    alt="Financial Advisor"
                    fill
                    quality={100} // ensures no compression
                    className="object-cover rounded-2xl hidden lg:block"
                  />
          </div>
        </AnimatedElement>

        {/* Text Content */}
        <AnimatedElement animation="slide-in-right" delay={400}>
          <div className="flex items-center h-full">
            <div className="space-y-6">
              <StaggerContainer staggerDelay={250}>
                <p className="text-lg text-white leading-relaxed">
                  At <strong>Pru Life UK</strong>, we believe that everyone deserves a future they can look forward to—free from uncertainty and full of possibilities. With deep roots going back to 1848 as part of Prudential PLC, our legacy is built on trust, resilience, and helping people achieve lifelong financial wellness.
                </p>

                <p className="text-lg text-white leading-relaxed">
                  Since launching in the Philippines in 1996, we’ve been more than just an insurance provider. We pioneered the <em>Insuravest</em>—a bold blend of life insurance and investment—empowering Filipinos to grow wealth while protecting what matters most. Today, we're proud to be recognized as the country's leading life insurance company, with a digitally-empowered network of trusted agents nationwide.
                </p>

                <p className="text-lg text-white leading-relaxed">
                  But our mission goes beyond policies and numbers. We’re here to walk with you through life’s most important milestones—buying your first home, sending your children to college, planning your retirement, or simply sleeping soundly at night knowing your future is secure.
                </p>

                <p className="text-lg text-white leading-relaxed">
                  Our approach is personal. We provide tailored financial assessments, continuous policy reviews, 24/7 claims assistance, and customer-first service. Through education and guidance, we ensure our clients understand their options and make confident financial decisions every step of the way.
                </p>

                <p className="text-lg text-white leading-relaxed">
                  When you choose Pru Life UK, you’re choosing a lifelong partner who puts you first. Whether you're building wealth, protecting your family, or creating a legacy—our commitment remains the same: to help you live with purpose, protect your dreams, and plan for everything that’s yet to come.
                </p>
              </StaggerContainer>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </div>
  </AnimatedSection>


        {/* Skills Section */}
        <AnimatedSection
          id="skills"
          ref={skillsSectionRef}
          style={{ backgroundColor: "var(--accent)" }}
          className="py-16 sm:py-24 relative overflow-hidden"
          animation="fade-in"
        >
          <FloatingBackground
            count={8}
            colors={["var(--primary)", "var(--primary-light)"]}
            minOpacity={0.03}
            maxOpacity={0.08}
          />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <AnimatedElement animation="slide-in-left" delay={100}>
                <Badge style={{ backgroundColor: "var(--primary)" }} className="mb-4 text-white">
                  My Expertise
                </Badge>
              </AnimatedElement>
              <AnimatedElement animation="slide-in-right" delay={200}>
                <h2 className="text-3xl font-bold text-white">How I Can Help You</h2>
              </AnimatedElement>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedElement animation="slide-in-left" delay={300}>
                <SkillCard
                  icon={<Shield className="h-12 w-12 text-white" strokeWidth={1.5} />}
                  title="Protection Planning"
                  skills={[
                    "Life Insurance",
                    "Critical Illness",
                    "Income Protection",
                    "Financial Security",
                    "Estate Planning",
                    "Business Protection",
                  ]}
                />
              </AnimatedElement>
              <AnimatedElement animation="fade-in" delay={500}>
                <SkillCard
                  icon={<TrendingUp className="h-12 w-12 text-white" strokeWidth={1.5} />}
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
              </AnimatedElement>
              <AnimatedElement animation="slide-in-right" delay={700}>
                <SkillCard
                  icon={<Heart className="h-12 w-12 text-white" strokeWidth={1.5} />}
                  title="Client Services"
                  skills={[
                    "Continuous Guidance & Monitoring",
                    "Policy Reviews",
                    "Claims Assistance",
                    "Financial Education",
                    "Personalized Financial Assessment",
                    "Dedicated Customer Support",
                  ]}
                />
              </AnimatedElement>
            </div>
          </div>
        </AnimatedSection>

        {/* Divider */}
        <div className="h-16 bg-gradient-to-b from-accent/80 to-muted flex items-center justify-center">
          <div className="w-24 h-1 bg-primary-light rounded-full"></div>
        </div>

        {/* Products Section */}
        <AnimatedSection
          id="products"
          ref={productsSectionRef}
          className="py-16 sm:py-24 relative"
          style={{ backgroundColor: "var(--muted)" }}
          animation="fade-in"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <AnimatedElement animation="slide-in-left" delay={100}>
                <Badge style={{ backgroundColor: "var(--primary)" }} className="mb-4 text-white">
                  Featured Products
                </Badge>
              </AnimatedElement>
              <AnimatedElement animation="slide-in-right" delay={200}>
                <h2 className="text-3xl font-bold text-white">Insurance Solutions</h2>
              </AnimatedElement>
              <AnimatedElement animation="fade-in" delay={300}>
                <p className="mt-4 text-white max-w-2xl mx-auto">
                  What is your current priority for today&apos;s discussion?
                </p>
              </AnimatedElement>
            </div>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" staggerDelay={150}>
              <PriorityCard icon={<Shield className="h-12 w-12 text-white" strokeWidth={1.5} />} title="Protection" />
              <PriorityCard
                icon={<GraduationCap className="h-12 w-12 text-white" strokeWidth={1.5} />}
                title="Children's Education"
              />
              <PriorityCard icon={<Armchair className="h-12 w-12 text-white" strokeWidth={1.5} />} title="Retirement" />
              <PriorityCard
                icon={<Coins className="h-12 w-12 text-white" strokeWidth={1.5} />}
                title="Medium-to Long-term Goals"
              />
            </StaggerContainer>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={150}>
              <PriorityCard
                icon={<Building2 className="h-12 w-12 text-white" strokeWidth={1.5} />}
                title="Ready Fund for Critical Illness"
              />
              <PriorityCard
                icon={<Home className="h-12 w-12 text-white" strokeWidth={1.5} />}
                title="Estate Conservation"
              />
              <PriorityCard icon={<Package className="h-12 w-12 text-white" strokeWidth={1.5} />} title="Others" />
            </StaggerContainer>

            <AnimatedElement className="text-center mt-12" animation="fade-in" delay={800}>
              <Button
                style={{ backgroundColor: "var(--primary)" }}
                className="text-white relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                onClick={() => setShowAppointmentModal(true)}
              >
                <span className="relative z-10 flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule a Consultation
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </AnimatedElement>
          </div>
        </AnimatedSection>

        {/* Divider */}
        <div className="h-16 bg-gradient-to-b from-muted to-muted/90 flex items-center justify-center">
          <div className="w-24 h-1 bg-primary-light rounded-full"></div>
        </div>

        {/* Experience Section */}
        <AnimatedSection
          id="experience"
          style={{ backgroundColor: "var(--muted)" }}
          className="py-16 sm:py-24"
          animation="fade-in"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <AnimatedElement animation="slide-in-left" delay={100}>
                <Badge style={{ backgroundColor: "var(--primary)" }} className="mb-4 text-white">
                  Professional Experience
                </Badge>
              </AnimatedElement>
              <AnimatedElement animation="slide-in-right" delay={200}>
                <h2 className="text-3xl font-bold text-white">My Career Journey</h2>
              </AnimatedElement>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedElement animation="slide-in-left" delay={300} className="space-y-8">
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">🌟 My Career Journey 🌟</h3>
                    <div className="flex items-center justify-center mb-2">
                      <div className="h-1 w-16 bg-primary-light rounded-full"></div>
                    </div>
                    <p className="text-white mb-2">📅 Started: March 30, 2019</p>
                    <p className="text-white mb-2">🚀 Promoted to Assistant Unit Manager: June 2019</p>
                    <p className="text-white mb-2">👔 Became a Full-Time Financial Advisor: January 2, 2021</p>
                  </div>

                  <ExperienceItem
                    title="2019 Achievements"
                    company="PRU LIFE U.K."
                    period="2019"
                    description="Top Agent, Top Referrer, Rookie Fast Track Qualifier"
                  />
                  <ExperienceItem
                    title="2020 Achievements"
                    company="PRU LIFE U.K."
                    period="2020"
                    description="Breakthrough Boundaries Conference Delegate (Malaysia), Top Unit Agent (October), Top 3 Unit Agent (March), Top 2 Unit Agent (April)"
                  />
                </div>
              </AnimatedElement>

              <AnimatedElement animation="slide-in-right" delay={500} className="space-y-8">
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">🏆 Achievements & Goals 🏆</h3>
                    <div className="flex items-center justify-center mb-2">
                      <div className="h-1 w-16 bg-primary-light rounded-full"></div>
                    </div>
                  </div>

                  <ExperienceItem
                    title="2021 Achievements"
                    company="PRU LIFE U.K."
                    period="2021"
                    description="Top 1 Unit Agent (January), Ace Builder (April), Top Agent (Unit Level, Jan-Aug), Life Club Qualifier Member, BBCon Delegate, National Achievers Club, Top 10K Active Agent Member"
                  />
                  <ExperienceItem
                    title="2022 Achievements"
                    company="PRU LIFE U.K."
                    period="2022"
                    description="Top Agent, Top Branch Business Builder, Sectoral Achiever"
                  />
                  <ExperienceItem
                    title="2023 Achievements"
                    company="PRU LIFE U.K."
                    period="2023"
                    description="Top Agent (Unit Level), Top 1 Business Builder (Branch Level YTD), National Achievers Club"
                  />
                  <ExperienceItem
                    title="2024-2025 Goals"
                    company="PRU LIFE U.K."
                    period="2024-2025"
                    description="Aspirant Unit Manager (Stepping up to lead and inspire a new generation of financial consultants!)"
                  />
                </div>
              </AnimatedElement>
            </div>
          </div>
        </AnimatedSection>

        {/* Divider */}
        <div className="h-16 bg-gradient-to-b from-muted/90 to-accent flex items-center justify-center">
          <div className="w-24 h-1 bg-primary-light rounded-full"></div>
        </div>

        {/* Feedback Section - New */}
        <AnimatedSection
          id="feedback"
          ref={feedbackSectionRef}
          className="py-16 sm:py-24 relative"
          style={{ backgroundColor: "var(--secondary)" }}
          animation="fade-in"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <AnimatedElement animation="slide-in-left" delay={100}>
                <Badge style={{ backgroundColor: "var(--primary)" }} className="mb-4 text-white px-6 py-2 text-base">
                  Client Feedback
                </Badge>
              </AnimatedElement>
              <AnimatedElement animation="slide-in-right" delay={200}>
                <h2 className="text-4xl font-bold text-white mt-4">What My Clients Say</h2>
              </AnimatedElement>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TestimonialCard
                quote="Rona helped me secure my family's future with a comprehensive life insurance plan. Her expertise and dedication are unmatched!"
                name="Maria Santos"
                title="Business Owner"
                rating={5}
              />
              <TestimonialCard
                quote="I was overwhelmed by insurance options until I met Rona. She simplified everything and found the perfect plan for my retirement needs."
                name="Juan Dela Cruz"
                title="School Teacher"
                rating={5}
              />
              <TestimonialCard
                quote="Professional, knowledgeable, and genuinely cares about her clients. Rona has been managing my family's insurance needs for years."
                name="Anna Reyes"
                title="Healthcare Professional"
                rating={5}
              />
            </div>

            <div className="mt-16">
              <FeedbackForm />
            </div>
          </div>
        </AnimatedSection>

        {/* Divider */}
        <div className="h-16 bg-gradient-to-b from-accent to-accent/90 flex items-center justify-center">
          <div className="w-24 h-1 bg-primary-light rounded-full"></div>
        </div>

        {/* FAQ Section */}
        <AnimatedSection
          id="faqs"
          className="py-16 sm:py-24 relative"
          style={{ backgroundColor: "var(--accent)" }}
          animation="fade-in"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <AnimatedElement animation="slide-in-left" delay={100}>
                <Badge style={{ backgroundColor: "var(--primary)" }} className="mb-4 text-white">
                  Common Questions
                </Badge>
              </AnimatedElement>
              <AnimatedElement animation="slide-in-right" delay={200}>
                <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
              </AnimatedElement>
              <AnimatedElement animation="fade-in" delay={300}>
                <p className="mt-4 text-white max-w-2xl mx-auto">
                  Find answers to the most common questions about insurance and financial planning.
                </p>
              </AnimatedElement>
            </div>

            <AnimatedElement className="max-w-3xl mx-auto" animation="fade-in" delay={400}>
              <FAQAccordion />
            </AnimatedElement>

            <AnimatedElement className="text-center mt-12" animation="fade-in" delay={600}>
              <p className="text-white mb-6">Still have questions? I&apos;m here to help.</p>
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
            </AnimatedElement>
          </div>
        </AnimatedSection>

        {/* Divider */}
        <div className="h-16 bg-gradient-to-b from-accent/90 to-secondary flex items-center justify-center">
          <div className="w-24 h-1 bg-primary-light rounded-full"></div>
        </div>

        {/* Contact Section */}
    
        <AnimatedSection
          id="contact"
          ref={contactSectionRef}
          style={{ backgroundColor: "var(--light-blue)" }}
          className="py-16 sm:py-24 text-white relative overflow-hidden"
          animation="fade-in"
        >
          <FloatingBackground
            count={10}
            colors={["var(--secondary)", "var(--primary-light)"]}
            minOpacity={0.03}
            maxOpacity={0.08}
          />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <AnimatedElement animation="slide-in-left" delay={100}>
                <Badge className="bg-white text-primary mb-4">Get In Touch</Badge>
              </AnimatedElement>
              <AnimatedElement animation="slide-in-right" delay={200}>
                <h2 className="text-3xl font-bold text-white">Schedule a Free Consultation</h2>
              </AnimatedElement>
              <AnimatedElement animation="fade-in" delay={300}>
                <p className="mt-4 text-white max-w-2xl mx-auto">
                  Let's discuss how I can help secure your financial future. Visit our office or fill out the form below
                  and I'll get back to you within 24 hours.
                </p>
              </AnimatedElement>
            </div>

            {/* Updated contact section with map on left and form on right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Map section - left side */}
              <AnimatedElement animation="slide-in-left" delay={400} className="h-full">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg h-full">
                  <h3 className="text-xl font-semibold mb-4 text-white">Visit Our Office</h3>
                  <p className="mb-6 text-white">
                    18th floor Exquadra Tower, 1 Jade Drive
                    <br />
                    Ortigas Center, Pasig, Metro Manila
                  </p>

                  {/* Interactive Map Component with real Google Maps */}
                  <InteractiveMap
                    address="18th floor Exquadra Tower, 1 Jade Drive Ortigas Center, Pasig, Metro Manila"
                    height="400px"
                    showControls={true}
                  />

                  {/* Contact info below map */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <div className="bg-white/10 p-3 rounded-full mr-3">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Phone</h4>
                        <p className="text-sm text-white">+63 (123) 456-7890</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-white/10 p-3 rounded-full mr-3">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Email</h4>
                        <p className="text-sm text-white">rona@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-white/10 p-3 rounded-full mr-3">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Hours</h4>
                        <p className="text-sm text-white">Mon-Fri: 9am-5pm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedElement>

              {/* Form section - right side */}
              <AnimatedElement animation="slide-in-right" delay={500}>
                <div className="bg-white rounded-xl shadow-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Schedule a Free Consultation</h3>
                  <form className="space-y-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium leading-none text-gray-800">
                        Full Name
                      </label>
                      <input
                        id="name"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="service" className="text-sm font-medium leading-none text-gray-800">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select a service</option>
                        <option value="life">Life Insurance</option>
                        <option value="health">Health Insurance</option>
                        <option value="retirement">Retirement Planning</option>
                        <option value="education">Education Planning</option>
                        <option value="estate">Estate Planning</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="date" className="text-sm font-medium leading-none text-gray-800">
                        Preferred Date
                      </label>
                      <input
                        id="date"
                        type="date"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium leading-none text-gray-800">
                        Message
                      </label>
                      <textarea
                        id="message"
                        className="flex min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Tell us about your insurance needs"
                      />
                    </div>
                    <Button
                      style={{ backgroundColor: "var(--primary)" }}
                      className="w-full text-white hover:shadow-lg transition-all duration-300"
                    >
                      Schedule Consultation
                    </Button>
                    <p className="text-xs text-gray-500 text-center mt-4">
                      Your information is secure and will never be shared with third parties.
                    </p>
                  </form>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </AnimatedSection>
      </main>
      <footer style={{ backgroundColor: "#001525" }} className="text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <AnimatedElement animation="slide-in-left" delay={100}>
              <div>
                <div className="mb-4">
                  <span className="text-white text-xl font-bold">PRU LIFE U.K.</span>
                </div>
                <p className="text-white mb-4">
                  Established in 2010, PRU LIFE U.K. is one of the leading financial services and insurance providers in
                  the region.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="https://www.linkedin.com/in/rona-oliveros-3923a5354"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5 text-white hover:text-primary-light transition-colors" />
                  </Link>
                  <Link href="mailto:pluk.ronaoliveros11@gmail.com" aria-label="Email">
                    <Mail className="h-5 w-5 text-white hover:text-primary-light transition-colors" />
                  </Link>
                  <Link href="tel:09627645297" aria-label="Phone">
                    <Phone className="h-5 w-5 text-white hover:text-primary-light transition-colors" />
                  </Link>
                </div>
              </div>
            </AnimatedElement>
            <AnimatedElement animation="fade-in" delay={200}>
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
            </AnimatedElement>
            <AnimatedElement animation="fade-in" delay={300}>
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
                    <Link href="#feedback" className="hover:text-primary-light transition-colors">
                      Feedback
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
            </AnimatedElement>
            <AnimatedElement animation="slide-in-right" delay={400}>
              <div>
                <h4 className="font-semibold mb-4">Contact Information</h4>
                <ul className="space-y-2 text-white">
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary-light" />
                    <span>09627645297</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary-light" />
                    <span>pluk.ronaoliveros11@gmail.com</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary-light" />
                    <span>18F Exquadra Tower 1 Jade Drive, Ortigas Center, San Antonio Pasig City</span>
                  </li>
                  <li className="flex items-center gap-2 mt-2">
                    <Linkedin className="h-4 w-4 text-primary-light" />
                    <Link
                      href="https://www.linkedin.com/in/rona-oliveros-3923a5354"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary-light transition-colors"
                    >
                      LinkedIn Profile
                    </Link>
                  </li>
                </ul>
              </div>
            </AnimatedElement>
          </div>
          <AnimatedElement
            animation="fade-in"
            delay={500}
            className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"
          >
            <p className="text-sm text-white">
              © {new Date().getFullYear()} Rona Oliveros, PRU LIFE U.K. Agent. All rights reserved.
            </p>
            <div className="text-sm text-white">
              <Link href="#" className="hover:text-primary-light transition-colors mr-4">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary-light transition-colors">
                Terms of Service
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </footer>
      {/* Draggable Chat Button */}
      <div id="chat-button-container" className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className="w-16 h-16 rounded-full shadow-lg focus:outline-none transition-all duration-300 hover:scale-110 group"
          style={{
            background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
            boxShadow: "0 4px 20px rgba(0, 120, 200, 0.3)",
          }}
          aria-label="Chat with us"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <MessageCircle className="h-10 w-10 text-white/70 absolute transition-opacity duration-300 group-hover:opacity-0" />
            <span className="absolute inset-0 m-auto h-fit w-fit opacity-0 group-hover:opacity-100 text-white font-medium text-xs transition-opacity duration-300">
            Chat Now
          </span>


            {/* Notification dot */}
            <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
          </div>
        </button>
      </div>
      {/* Enhanced Chat Window */}
      {isChatOpen && (
        <div
          className="fixed z-50 w-80 sm:w-96 rounded-t-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 animate-slideUp chat-window"
          style={{
            height: "500px",
            boxShadow: "0 10px 40px rgba(0, 59, 92, 0.3)",
            bottom: 0,
            right: "24px",
            transform: "none",
          }}
        >
          {/* Chat Header */}
          <div
            className="p-4 flex justify-between items-center"
            style={{ background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)" }}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <Image src="/1.jpg" alt="Rona Oliveros" width={50} height={50} className="rounded-full" />
              </div>
              <div>
                <h3 className="font-medium text-white">Chat with Rona</h3>
                <p className="text-xs text-white/80">Typically replies in less than an hour.</p>
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
            Powered by PRU LIFE U.K. • Your data is secure
          </div>
        </div>
      )}
      {/* Appointment Modal */}
      {showAppointmentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            id="appointment-modal"
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{
              background: "linear-gradient(to bottom, var(--secondary) 0%, var(--accent) 100%)",
            }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Schedule an Appointment</h3>
                <button
                  onClick={() => setShowAppointmentModal(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {isAppointmentSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-12 w-12 text-primary-light" />
                  </div>
                  <h4 className="text-2xl font-semibold text-white mb-3">Appointment Scheduled!</h4>
                  <p className="text-white/90 text-lg mb-6">
                    Thank you for scheduling a consultation. I&apos;ll be in touch shortly to confirm your appointment.
                  </p>
                  <Button
                    onClick={() => setShowAppointmentModal(false)}
                    style={{ backgroundColor: "var(--primary)" }}
                    className="text-white px-8 py-2"
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleAppointmentSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="appointment-name" className="block text-sm font-medium text-white mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="appointment-name"
                        value={appointmentName}
                        onChange={(e) => setAppointmentName(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-light"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="appointment-email" className="block text-sm font-medium text-white mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="appointment-email"
                        value={appointmentEmail}
                        onChange={(e) => setAppointmentEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-light"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="appointment-phone" className="block text-sm font-medium text-white mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="appointment-phone"
                      value={appointmentPhone}
                      onChange={(e) => setAppointmentPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-light"
                      placeholder="09XXXXXXXXX"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="appointment-date" className="block text-sm font-medium text-white mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        id="appointment-date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-light"
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="appointment-time" className="block text-sm font-medium text-white mb-1">
                        Preferred Time
                      </label>
                      <input
                        type="time"
                        id="appointment-time"
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-light"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Appointment Type</label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="appointment-type"
                          value="virtual"
                          checked={appointmentType === "virtual"}
                          onChange={() => setAppointmentType("virtual")}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="text-white">Virtual Meeting</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="appointment-type"
                          value="in-person"
                          checked={appointmentType === "in-person"}
                          onChange={() => setAppointmentType("in-person")}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="text-white">In-Person Meeting</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="appointment-notes" className="block text-sm font-medium text-white mb-1">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="appointment-notes"
                      value={appointmentNotes}
                      onChange={(e) => setAppointmentNotes(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-light"
                      placeholder="Let me know if you have any specific topics you'd like to discuss"
                    />
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAppointmentModal(false)}
                      className="border-white text-white hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isAppointmentSubmitting}
                      style={{ backgroundColor: "var(--primary)" }}
                      className="text-white relative overflow-hidden group"
                    >
                      {isAppointmentSubmitting ? (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </div>
                      ) : (
                        <span className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Appointment
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MobileNav({ activeSection }: { activeSection: string }) {
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
          {["about", "skills", "products", "experience", "feedback", "faqs", "contact"].map((section) => (
            <Link
              key={section}
              href={`#${section}`}
              className={`text-lg font-medium text-white hover:text-primary-light transition-colors relative inline-block ${
                activeSection === section ? "text-primary-light" : ""
              }`}
              onClick={closeMenu}
            >
              <span>{section.charAt(0).toUpperCase() + section.slice(1)}</span>
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-primary-light transition-all duration-300 ${
                  activeSection === section ? "w-full" : "w-0"
                }`}
              ></span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

interface SkillCardProps {
  icon: React.ReactNode
  title: string
  skills: string[]
}

interface PriorityCardProps {
  icon: React.ReactNode
  title: string
}

interface StatCardProps {
  icon: React.ReactNode
  value: number
  label: string
  suffix?: string
}

function SkillCard({ icon, title, skills }: SkillCardProps) {
  return (
    <Card className="overflow-hidden prulife-card border-none bg-shimmer">
      <CardContent className="p-8">
        <div className="flex flex-col items-center text-center">
          <div
            className="mb-6 p-5 rounded-full relative group"
            style={{
              background: "linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%)",
              opacity: 0.8,
            }}
          >
            {/* Pulsing background effect */}
            <div className="absolute inset-0 rounded-full bg-primary-light/30 animate-pulse-slow"></div>

            {/* Icon - Make sure it's white */}
            <div className="relative z-10 text-white">{icon}</div>

            {/* Subtle glow effect */}
            <div className="absolute -inset-1 bg-primary-light/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
          <StaggerContainer className="space-y-2" staggerDelay={100} childClassName="flex items-center justify-center">
            {skills.map((skill, index) => (
              <li key={index}>
                <Badge
                  variant="outline"
                  style={{ borderColor: "var(--primary-light)", color: "white" }}
                  className="px-3 py-1 bg-secondary/50"
                >
                  {skill}
                </Badge>
              </li>
            ))}
          </StaggerContainer>
        </div>
      </CardContent>
    </Card>
  )
}

interface ExperienceItemProps {
  title: string
  company: string
  period: string
  description: string
}

function ExperienceItem({ title, company, period, description }: ExperienceItemProps) {
  return (
    <div className="mb-8 relative pl-6 border-l-2 border-primary-light">
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary-light"></div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
        <span className="text-primary-light font-medium">{company}</span>
        <span className="hidden sm:inline text-white/50">•</span>
        <span className="text-sm text-white bg-primary/20 px-2 py-1 rounded-full inline-block sm:inline-block w-fit">
          {period}
        </span>
      </div>
      <p className="text-white/90 mt-2">{description}</p>
    </div>
  )
}

function FAQAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-b border-white/20">
        <AccordionTrigger className="text-white hover:text-primary-light text-left">
          What is life insurance and how does it work?
        </AccordionTrigger>
        <AccordionContent className="text-white/90">
          Life insurance is a contract between you and an insurance company. You pay premiums, and in return, your
          beneficiaries receive a lump sum (death benefit) when you pass away.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2" className="border-b border-white/20">
        <AccordionTrigger className="text-white hover:text-primary-light text-left">
          Why do I need life insurance?
        </AccordionTrigger>
        <AccordionContent className="text-white/90">
          Life insurance provides financial protection for your loved ones, covering expenses such as daily living
          costs, debts, children&apos;s education, and future needs in case of your passing.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3" className="border-b border-white/20">
        <AccordionTrigger className="text-white hover:text-primary-light text-left">
          What are the different types of life insurance?
        </AccordionTrigger>
        <AccordionContent className="text-white/90">
          <p>Term Life Insurance – Provides coverage for a set period (e.g., 10, 20 years).</p>
          <p>Whole Life Insurance – Lifelong coverage with a cash value component.</p>
          <p>Variable Life Insurance (Insuravest) – Combines life insurance with investment options.</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4" className="border-b border-white/20">
        <AccordionTrigger className="text-white hover:text-primary-light text-left">
          How much life insurance coverage do I need?
        </AccordionTrigger>
        <AccordionContent className="text-white/90">
          It depends on your income, debts, future expenses (education, retirement), and financial goals. A common rule
          is 10-15 times your annual income.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5" className="border-b border-white/20">
        <AccordionTrigger className="text-white hover:text-primary-light text-left">
          How much does life insurance cost?
        </AccordionTrigger>
        <AccordionContent className="text-white/90">
          Premiums vary based on age, health, coverage amount, policy type, and lifestyle (e.g., smoking status). The
          younger and healthier you are, the lower the cost.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6" className="border-b border-white/20">
        <AccordionTrigger className="text-white hover:text-primary-light text-left">
          Can I have more than one life insurance policy?
        </AccordionTrigger>
        <AccordionContent className="text-white/90">
          Yes! You can have multiple policies to enhance coverage and align with different financial needs (e.g., one
          for income replacement, another for estate planning).
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-7" className="border-b border-white/20">
        <AccordionTrigger className="text-white hover:text-primary-light text-left">
          What happens if I stop paying my premiums?
        </AccordionTrigger>
        <AccordionContent className="text-white/90">
          <p>Term insurance – The policy lapses, and coverage ends.</p>
          <p>
            Whole/Variable insurance – It may remain active if there&apos;s enough cash value to cover premiums, but if
            not, it may lapse.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-8" className="border-b border-white/20">
        <AccordionTrigger className="text-white hover:text-primary-light text-left">
          Is life insurance only for those with dependents?
        </AccordionTrigger>
        <AccordionContent className="text-white/90">
          No. Even if you&apos;re single, life insurance can cover debts, funeral expenses, or serve as an investment
          and estate-planning tool.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-9" className="border-b border-white/20">
        <AccordionTrigger className="text-white hover:text-primary-light text-left">
          Can I withdraw money from my life insurance policy?
        </AccordionTrigger>
        <AccordionContent className="text-white/90">
          If your policy has a cash value component (e.g., whole life or variable life), you may be able to borrow or
          withdraw from it. However, this could reduce the death benefit.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-10" className="border-b border-white/20">
        <AccordionTrigger className="text-white hover:text-primary-light text-left">
          How do I claim life insurance benefits?
        </AccordionTrigger>
        <AccordionContent className="text-white/90">
          Beneficiaries need to submit a claim form, death certificate, and other required documents to the insurance
          provider. Processing times vary but typically take a few weeks.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function PriorityCard({ icon, title }: PriorityCardProps) {
  return (
    <Card className="overflow-hidden border-none hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] priority-card">
      <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full">
        <div
          className="mb-6 p-5 rounded-full relative group"
          style={{
            background: "linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%)",
            opacity: 0.8,
          }}
        >
          {/* Pulsing background effect */}
          <div className="absolute inset-0 rounded-full bg-primary-light/30 animate-pulse-slow"></div>

          {/* Icon - Make sure it's white */}
          <div className="relative z-10 text-white">{icon}</div>

          {/* Subtle glow effect */}
          <div className="absolute -inset-1 bg-primary-light/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </CardContent>
    </Card>
  )
}

function StatCard({ icon, value, label, suffix = "" }: StatCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-lg">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <div className="text-4xl font-bold text-white mb-2">
          {value}
          {suffix}
        </div>
        <div className="text-sm text-white/80">{label}</div>
      </div>
    </div>
  )
}

interface TestimonialCardProps {
  quote: string
  name: string
  title: string
  rating: number
}

function TestimonialCard({ quote, name, title, rating }: TestimonialCardProps) {
  return (
    <Card className="overflow-hidden border-none bg-white/5 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <div className="flex mb-4">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <p className="text-white/90 italic mb-6 flex-grow">&quot;{quote}&quot;</p>
          <div className="mt-auto">
            <p className="font-semibold text-white">{name}</p>
            <p className="text-sm text-white/70">{title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
