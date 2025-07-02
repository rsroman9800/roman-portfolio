"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home, Terminal } from "lucide-react"
import Link from "next/link"
import VantaBackground from "@/components/VantaBackground"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono flex items-center justify-center px-4">
      <VantaBackground />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Terminal className="w-8 h-8" />
            <span className="text-2xl">roman@portfolio:~$</span>
          </div>

          <div className="glass-dark rounded-lg p-6 text-left border-white/10">
            <p className="mb-2">$ cd /page-you-requested</p>
            <p className="text-red-400 mb-2">bash: cd: /page-you-requested: No such file or directory</p>
            <p className="mb-2">$ ls -la</p>
            <p className="mb-2">total 0</p>
            <p className="mb-2">drwxr-xr-x 2 roman roman 60 Jan 25 2025 .</p>
            <p className="mb-2">drwxr-xr-x 3 roman roman 80 Jan 25 2025 ..</p>
            <p className="mb-4">-rw-r--r-- 1 roman roman 0 Jan 25 2025 404.txt</p>
            <p className="mb-2">$ cat 404.txt</p>
            <p className="text-white">Oops! You wandered off the map. 🗺️</p>
            <p className="text-white">This page doesn't exist in my portfolio universe.</p>
            <p className="mt-4">$ _</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="mb-8">
            <pre className="text-6xl mb-4">
              {`    /\\_/\\  
   (  o.o ) 
    > ^ <`}
            </pre>
            <p className="text-lg text-gray-400">Even this pixelated cat is confused!</p>
          </div>

          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white glow">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-sm text-gray-500"
        >
          <p>Tip: Use the navigation menu to explore my portfolio properly!</p>
        </motion.div>
      </div>
    </div>
  )
}
