"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { gsap } from "gsap"
import {
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Terminal,
  Code,
  Database,
  Smartphone,
  Palette,
  Play,
  X,
  Volume2,
  VolumeX,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import VantaBackground from "@/components/VantaBackground"

export default function Portfolio() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  // GSAP refs for tech icons
  const techIconsRef = useRef<HTMLDivElement[]>([])

  // Pre-warm GPU layers after component mount
  useEffect(() => {
    // Force a repaint to ensure all layers are created
    const forceRepaint = () => {
      document.body.style.transform = "translateZ(0)"
      setTimeout(() => {
        document.body.style.transform = ""
      }, 0)
    }

    // Pre-warm layers after a short delay
    setTimeout(forceRepaint, 100)
  }, [])

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedVideo(null)
        setIsVideoPlaying(false)
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  // GSAP animations for tech icons
  useEffect(() => {
    const icons = techIconsRef.current

    icons.forEach((icon, index) => {
      if (icon) {
        // Pre-warm the icon for GPU acceleration
        gsap.set(icon, {
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          willChange: "transform, box-shadow",
        })

        // Initial animation
        gsap.fromTo(
          icon,
          {
            opacity: 0,
            y: 30,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "back.out(1.7)",
          },
        )

        // Hover animations
        const handleMouseEnter = () => {
          // Apply the pulsing blue glow effect to ALL icons
          gsap.to(icon, {
            scale: 1.3,
            duration: 0.4,
            ease: "power2.out",
          })

          // Add pulsing glow effect to all icons
          gsap.to(icon, {
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4)",
            duration: 0.3,
            ease: "power2.out",
          })

          // Continuous pulse while hovering for all icons
          gsap.to(icon, {
            scale: 1.4,
            duration: 0.8,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
          })
        }

        const handleMouseLeave = () => {
          // Kill all animations and reset
          gsap.killTweensOf(icon)
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out",
          })
        }

        icon.addEventListener("mouseenter", handleMouseEnter)
        icon.addEventListener("mouseleave", handleMouseLeave)

        // Cleanup
        return () => {
          icon.removeEventListener("mouseenter", handleMouseEnter)
          icon.removeEventListener("mouseleave", handleMouseLeave)
        }
      }
    })
  }, [])

  const skills = {
    languages: [
      { name: "HTML", icon: "🌐", color: "text-orange-400" },
      { name: "CSS", icon: "🎨", color: "text-blue-400" },
      { name: "JavaScript", icon: "⚡", color: "text-yellow-400" },
      { name: "TypeScript", icon: "📘", color: "text-blue-500" },
      { name: "Python", icon: "🐍", color: "text-green-400" },
      { name: "C#", icon: "🔷", color: "text-purple-400" },
      { name: "R", icon: "📊", color: "text-blue-300" },
      { name: "Java", icon: "☕", color: "text-red-400" },
    ],
    frameworks: [
      { name: "React", icon: "⚛️", color: "text-cyan-400" },
      { name: "React Native", icon: "📱", color: "text-cyan-300" },
      { name: "Next.js", icon: "▲", color: "text-white" },
      { name: "Node.js", icon: "🟢", color: "text-green-500" },
      { name: "Expo", icon: "🚀", color: "text-purple-500" },
      { name: "Firebase", icon: "🔥", color: "text-orange-500" },
    ],
    databases: [
      { name: "MongoDB", icon: "🍃", color: "text-green-500" },
      { name: "SQL", icon: "🗄️", color: "text-blue-500" },
      { name: "Oracle", icon: "🔴", color: "text-red-500" },
      { name: "Supabase", icon: "⚡", color: "text-green-400" },
      { name: "Microsoft SQL Server", icon: "🏢", color: "text-blue-600" },
      { name: "RESTful APIs", icon: "🔗", color: "text-orange-400" }
    ],
    tools: [
      { name: "GitHub", icon: "🐙", color: "text-white" },
      { name: "Docker", icon: "🐳", color: "text-blue-400" },
      { name: "Figma", icon: "🎨", color: "text-purple-400" },
      { name: "Tableau", icon: "📈", color: "text-orange-400" },
      { name: "Linux", icon: "🐧", color: "text-yellow-500" },
      { name: "VS Code", icon: "💻", color: "text-blue-500" },
      { name: "Google Maps API", icon: "🗺️", color: "text-green-400" },
      { name: "Cloud Integration", icon: "☁️", color: "text-cyan-400" },
    ],
  }

  const projects = [
    {
      title: "Destination History",
      description:
        "Led cross-functional team building travel app platform for Alberta tourism. Integrated Google Maps API for coordinate-based asset tracking, implemented location data processing, and built responsive web interfaces for remote collaboration.",
      tech: ["React", "Node.js", "MongoDB", "AI Integration"],
      icon: <Palette className="w-6 h-6" />,
      github: "#",
      demo: "#",
      video: "/videos/destination-history-demo.mp4",
      thumbnail: "/thumbnails/destination-history-thumb.jpg",
      hasVideo: true,
      isPrivate: true,
    },
    {
      title: "Mood Hops",
      description:
        "A fun mobile platformer built in React Native and Expo with a custom physics engine using Expo Haptics. Created math-driven camera, jump, and platform physics.",
      tech: ["React Native", "Expo", "Physics Engine"],
      icon: <Smartphone className="w-6 h-6" />,
      github: "#",
      demo: "#",
      video: "/videos/mood-hops-gameplay.mp4",
      thumbnail: "/thumbnails/mood-hops-thumb.jpg",
      hasVideo: true,
      isPrivate: true,
    },
    {
      title: "StyleGuide",
      description:
        "Fashion and weather-powered clothing recommendation engine using Groq AI. Built with Next.js and Firebase. Offers personalized recommendations based on gender, weather, and style.",
      tech: ["Next.js", "Firebase", "Groq AI"],
      icon: <Code className="w-6 h-6" />,
      github: "https://github.com/rsroman9800/wardrobe-app",
      demo: "#",
      video: "/videos/styleguide-demo.mp4",
      thumbnail: "/thumbnails/styleguide-thumb.jpg",
      hasVideo: false,
      isPrivate: false,
    },
    {
      title: "Village Rentals System",
      description:
        "A full MAUI-based GUI rental management system. The project showcases front-end skills and system flow.",
      tech: ["MAUI", "C#", "GUI Design"],
      icon: <Database className="w-6 h-6" />,
      github: "https://github.com/rsroman9800/VillageRentals",
      demo: "#",
      video: "/videos/village-rentals-demo.mp4",
      thumbnail: "/thumbnails/village-rentals-thumb.jpg",
      hasVideo: true,
      isPrivate: false,
    },
  ]

  const skillProgression = [
    { skill: "Project Management", level: 90, startDate: "Jan 2025", duration: "8 months" },
    { skill: "OOP (Python, C#, JS)", level: 85, startDate: "Jan 2024", duration: "1.5+ years" },
    { skill: "AI/ML", level: 75, startDate: "Dec 2024", duration: "9 months" },
    { skill: "Databases", level: 85, startDate: "Oct 2023", duration: "1.5+ years" },
    { skill: "Mobile Dev", level: 80, startDate: "Sep 2024", duration: "11 months" },
    { skill: "API Integration", level: 85, startDate: "Dec 2024", duration: "9 months"},
  ]

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const openVideoModal = (videoSrc: string) => {
    setSelectedVideo(videoSrc)
    setIsVideoPlaying(false)
    setIsMuted(false)
  }

  const closeVideoModal = () => {
    setSelectedVideo(null)
    setIsVideoPlaying(false)
  }

  return (
    <div className="min-h-screen text-white relative">
      {/* Vanta.js Background */}
      <VantaBackground />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform-origin-0 z-50"
        style={{ scaleX }}
      />

      {/* Quick Navigation */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2">
        {["hero", "about", "projects", "skills", "contact"].map((section) => (
          <Button
            key={section}
            variant="outline"
            size="sm"
            onClick={() => scrollToSection(section)}
            className="glass text-white border-white/20 hover:bg-white/10 capitalize"
          >
            {section}
          </Button>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Video Player */}
            <video
              className="w-full h-full"
              controls
              autoPlay
              muted={isMuted}
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              onEnded={() => setIsVideoPlaying(false)}
            >
              <source src={selectedVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="bg-black/50 hover:bg-black/70 text-white"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto w-full">
            <Card className="glass-dark border-white/10 p-10 md:p-16 lg:p-20 text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-10"
              >
                <div className="w-40 h-40 md:w-48 md:h-48 mx-auto mb-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center glow">
                  <img
                    src="/roman-photo.jpg"
                    alt="Roman Sorokin"
                    className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-glow"
              >
                Roman Sorokin
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 text-gray-300"
              >
                Full-Stack Developer
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl md:text-2xl lg:text-3xl mb-10 text-gray-400 max-w-4xl mx-auto leading-relaxed"
              >
                Full-stack developer passionate about data visualization, enterprise systems, and building scalable web applications for complex industrial challenges.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-xl md:text-2xl italic text-blue-400 max-w-4xl mx-auto leading-relaxed"
              >
                "Don't let perfection or fear be the reason you watch your idea succeed… in someone else's hands."
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mt-16"
              >
                <Button
                  onClick={() => scrollToSection("projects")}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg rounded-full glow"
                >
                  View My Work
                </Button>
              </motion.div>
            </Card>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center text-white">About Me</h2>

              <Card className="mb-12 glass-dark text-green-400 font-mono border-white/10 p-8 md:p-12">
                <CardHeader className="pb-6">
                  <div className="flex items-center gap-3">
                    <Terminal className="w-6 h-6" />
                    <span className="text-lg">roman@portfolio:~$</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-lg">$ whoami</p>
                    <p className="text-gray-300 font-sans leading-relaxed text-lg md:text-xl">
                      I bring a diverse background, having worked across government (provincial and federal), client
                      service, non-profit, and administrative roles. My passion for software development began during
                      the COVID-19 pandemic, when I discovered a deep love for creating things and solving problems.
                      That drive led me to pursue a Software Development diploma at SAIT in 2023. Since then, I've
                      worked on some incredible projects, and I'm excited to share them with you.
                    </p>
                    <p className="mt-6 text-lg">$ ls skills/</p>
                    <p className="text-blue-400 text-lg">
                      fullstack-development/ database-architecture/ api-integration/ project-management/
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="glass text-white border-white/20 hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
                  asChild
                >
                  <a href="/resume/Roman-Sorokin-Resume.pdf" download="Roman-Sorokin-Resume.pdf">
                    <Download className="w-5 h-5 mr-3" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center text-white">Featured Projects</h2>

              <div className="grid md:grid-cols-2 gap-10">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="motion-hover"
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 glass-dark border-white/10 hover:border-white/20 p-6">
                      <CardHeader className="pb-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 bg-blue-500/20 rounded-lg">{project.icon}</div>
                          <CardTitle className="text-2xl md:text-3xl text-white">{project.title}</CardTitle>
                        </div>
                        <div className="relative w-full h-56 md:h-64 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg overflow-hidden group">
                          <img
                            src={project.thumbnail || "/placeholder.svg"}
                            alt={`${project.title} thumbnail`}
                            className="w-full h-full object-cover"
                          />

                          {/* Play Button Overlay */}
                          {project.hasVideo && (
                            <div className="absolute inset-0 video-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <Button
                                onClick={() => openVideoModal(project.video)}
                                size="lg"
                                className="bg-white/95 hover:bg-white text-gray-900 rounded-full p-5 shadow-lg"
                              >
                                <Play className="w-10 h-10 ml-1" />
                              </Button>
                            </div>
                          )}

                          {/* Video Label */}
                          {project.hasVideo && (
                            <div className="absolute top-3 right-3 bg-red-500 text-white text-sm px-3 py-2 rounded">
                              VIDEO DEMO
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-lg md:text-xl mb-6 text-gray-300 leading-relaxed">
                          {project.description}
                        </CardDescription>

                        <div className="flex flex-wrap gap-3 mb-6">
                          {project.tech.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-3 py-1 text-sm"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-3">
                          {project.isPrivate ? (
                            <Button
                              variant="outline"
                              size="default"
                              className="glass text-gray-400 border-gray-500/30 px-4 py-2 bg-transparent cursor-not-allowed"
                              disabled
                            >
                              <Lock className="w-4 h-4 mr-2" />
                              Private Repo
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="default"
                              className="glass text-white border-white/20 px-4 py-2 bg-transparent"
                              asChild
                            >
                              <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 mr-2" />
                                Code
                              </a>
                            </Button>
                          )}
                          {!project.hasVideo && (
                            <Button
                              variant="outline"
                              size="default"
                              className="glass text-white border-white/20 px-4 py-2 bg-transparent"
                              asChild
                            >
                              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Demo
                              </a>
                            </Button>
                          )}
                          {project.hasVideo && (
                            <Button
                              variant="outline"
                              size="default"
                              onClick={() => openVideoModal(project.video)}
                              className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30 px-4 py-2"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Watch Demo
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center text-white">Skills & Technologies</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {Object.entries(skills).map(([category, items], categoryIndex) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full glass-dark border-white/10 p-6">
                      <CardHeader className="pb-6">
                        <CardTitle className="capitalize text-xl md:text-2xl text-center text-white">
                          {category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-6">
                          {items.map((item, index) => (
                            <div
                              key={item.name}
                              ref={(el) => {
                                if (el) techIconsRef.current[categoryIndex * 10 + index] = el
                              }}
                              className="tech-icon flex flex-col items-center p-4 rounded-lg glass hover:bg-white/10 transition-all cursor-pointer group"
                            >
                              <div className={`text-4xl md:text-5xl mb-3 ${item.color}`}>{item.icon}</div>
                              <span className="text-sm md:text-base text-center font-medium text-gray-300 group-hover:text-white transition-colors">
                                {item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Separator className="my-16 bg-white/20" />

              <div>
                <h3 className="text-3xl md:text-4xl font-semibold mb-12 text-center text-white">
                  Skill Development Journey
                </h3>
                <div className="space-y-8">
                  {skillProgression.map((skill, index) => (
                    <motion.div
                      key={skill.skill}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="glass-dark rounded-lg p-6 md:p-8 border-white/10"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-xl md:text-2xl text-white">{skill.skill}</h4>
                          <p className="text-base md:text-lg text-gray-400 mt-2">
                            Learning since {skill.startDate} • {skill.duration} of experience
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-3xl md:text-4xl font-bold text-blue-400">{skill.level}%</span>
                          <p className="text-sm md:text-base text-gray-500">Proficiency</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, delay: index * 0.1 + 0.5, ease: "easeOut" }}
                          viewport={{ once: true }}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full relative"
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-16 text-white">Let's Connect</h2>

              <p className="text-xl md:text-2xl mb-16 text-gray-400 max-w-4xl mx-auto leading-relaxed">
                I'm always interested in new opportunities and collaborations. Feel free to reach out if you'd like to
                work together!
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="glass text-white border-white/20 hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
                    asChild
                  >
                    <a href="mailto:rsromansorokin@gmail.com">
                      <Mail className="w-6 h-6 mr-3" />
                      Email
                    </a>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="glass text-white border-white/20 hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
                    asChild
                  >
                    <a href="https://www.linkedin.com/in/roman-sorokin1/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-6 h-6 mr-3" />
                      LinkedIn
                    </a>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="glass text-white border-white/20 hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
                    asChild
                  >
                    <a href="https://github.com/rsroman9800/" target="_blank" rel="noopener noreferrer">
                      <Github className="w-6 h-6 mr-3" />
                      GitHub
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 text-center border-t border-white/10">
          <p className="text-lg text-gray-400">
            © 2025 Roman Sorokin. Built with Next.js, Tailwind CSS, Framer Motion, and Vanta.js.
          </p>
        </footer>
      </div>
    </div>
  )
}
