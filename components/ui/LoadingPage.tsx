'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function LoadingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [typingText, setTypingText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const bootSteps = [
    // Custom Arsalan Portfolio boot messages first
    { text: "Booting Arsalan Portfolio...", delay: 250 },
    { text: "Initializing creativity modules...", delay: 150 },
    { status: true, text: "Initializing creativity modules...", delay: 100 },
    { text: "Mounting /projects...", delay: 150 },
    { status: true, text: "Mounting /projects...", delay: 100 },
    { text: "Setting up Bash environment...", delay: 150 },
    { status: true, text: "Setting up Bash environment...", delay: 100 },
    { text: "Authenticating shell session...", delay: 150 },
    { status: true, text: "Authenticating shell session...", delay: 100 },
    { text: "Loading ASCII branding...", delay: 150 },
    { status: true, text: "Loading ASCII branding...", delay: 100 },
    { text: "Starting portfolio services...", delay: 150 },
    { status: true, text: "Starting portfolio services...", delay: 100 },
    
    // Enhanced Portfolio-branded boot sequence
    { text: "[    0.000000] Portfolio version 5.15.0-generic (buildd@arsalan-server)", delay: 40 },
    { text: "[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-generic root=/dev/sda1 ro quiet splash", delay: 40 },
    { text: "[    0.000000] microcode: microcode updated early to revision 0xea", delay: 30 },
    { text: "[    0.000000] x86/fpu: Supporting XSAVE feature 0x001: 'x87 floating point registers'", delay: 30 },
    { text: "[    0.000000] x86/fpu: Supporting XSAVE feature 0x002: 'SSE registers'", delay: 30 },
    { text: "[    0.000000] x86/fpu: Supporting XSAVE feature 0x004: 'AVX registers'", delay: 30 },
    { text: "[    0.000000] BIOS-provided physical RAM map:", delay: 30 },
    { text: "[    0.000000] BIOS-e820: [mem 0x0000000000000000-0x000000000009fbff] usable", delay: 25 },
    { text: "[    0.000000] BIOS-e820: [mem 0x000000000009fc00-0x000000000009ffff] reserved", delay: 25 },
    { text: "[    0.000000] BIOS-e820: [mem 0x0000000000100000-0x000000007ffd8fff] usable", delay: 25 },
    { text: "[    0.000000] NX (Execute Disable) protection: active", delay: 30 },
    { text: "[    0.000000] SMBIOS 2.x present.", delay: 30 },
    { text: "[    0.000000] DMI: Portfolio Systems WorkStation-Pro/Model-A1, BIOS 2.4", delay: 30 },
    { text: "[    0.000000] tsc: Detected 3600.000 MHz processor", delay: 30 },
    { text: "[    0.100000] Using GB pages for direct mapping", delay: 35 },
    { text: "[    0.200000] RAMDISK: [mem 0x3561f000-0x36b0afff]", delay: 35 },
    { text: "[    0.300000] ACPI: RSDP 0x00000000000F6A10 000024 (v02 ARSALAN)", delay: 35 },
    { text: "[    0.400000] ACPI: XSDT 0x000000007FFE1131 00005C (v01 ARSALAN A M I)", delay: 35 },
    
    // Service startup messages
    { status: true, text: "Starting udev Kernel Device Manager...", delay: 50 },
    { status: true, text: "Starting Set the console keyboard layout...", delay: 50 },
    { status: true, text: "Starting Load Kernel Modules...", delay: 50 },
    { status: true, text: "Starting Remount Root and Kernel File Systems...", delay: 50 },
    { status: true, text: "Starting Journal Service...", delay: 50 },
    { status: true, text: "Starting Flush Journal to Persistent Storage...", delay: 50 },
    { status: true, text: "Starting Apply Kernel Variables...", delay: 50 },
    { status: true, text: "Starting Coldplug All Devices...", delay: 45 },
    { status: true, text: "Starting Network Time Synchronization...", delay: 45 },
    { status: true, text: "Starting AppArmor initialization...", delay: 45 },
    { status: true, text: "Starting Authorization Manager...", delay: 45 },
    { status: true, text: "Starting Login Service...", delay: 45 },
    { status: true, text: "Starting Network Manager...", delay: 45 },
    { status: true, text: "Starting Light Display Manager...", delay: 45 },
    { status: true, text: "Started Getty on tty1", delay: 45 },
    { status: true, text: "Reached Target Graphical Interface", delay: 45 },
    
    // Login sequence with typing animations
    { text: "", delay: 200 }, // Empty line
    { text: "Arsalan Portfolio (tty1)", delay: 180 },
    { text: "", delay: 100 }, // Empty line
    { text: "arsalan-portfolio login: ", delay: 800, waitForInput: true }, // Show prompt, then wait
    { text: "arsalan", delay: 150, isTyping: true, typingSpeed: 200 }, // Type username slowly
    { text: "", delay: 300 }, // New line after username
    { text: "Password: ", delay: 600, waitForInput: true }, // Show password prompt, then wait
    { text: "••••••••", delay: 120, isTyping: true, typingSpeed: 180 }, // Type password slowly
    { text: "", delay: 300 }, // New line after password
    { text: "", delay: 100 }, // Empty line
    { text: "Welcome to Arsalan Portfolio (tty1)", delay: 180 },
    { text: `Last login: ${new Date().toDateString()} on tty1`, delay: 180 },
    { text: "", delay: 200 }, // Empty line
    { text: "arsalan@portfolio:~$ ", delay: 500, waitForInput: true }, // Show prompt, then wait
    { text: "startx", delay: 180, isTyping: true, typingSpeed: 220 }, // Type command slowly
    { text: "", delay: 400 }, // New line after command
    { text: "", delay: 200 }, // Empty line
    
    // X.Org startup - back to normal speed
    { text: "X.Org X Server 1.21.1.4", delay: 150 },
    { text: "X Protocol Version 11, Revision 0", delay: 120 },
    { text: "Build Operating System: Arsalan Portfolio OS", delay: 120 },
    { text: "Current Operating System: Arsalan Portfolio v5.15.0-generic # SMP PREEMPT_DYNAMIC", delay: 120 },
    { text: "[  +0.000] (==) Log file: \"/home/arsalan/.local/share/xorg/Xorg.0.log\"", delay: 150 },
    { text: "[  +0.001] (==) Using config directory: \"/etc/portfolio/xorg.conf.d\"", delay: 150 },
    { text: "[  +0.003] (II) modeset(0): Initializing display device...", delay: 180 },
    { text: "[  +0.120] (II) GLX: Initialized DRI2 GL provider for screen 0", delay: 200 },
    { text: "[  +0.200] (II) execve: launching /etc/portfolio/xinit/xinitrc → ~/.xinitrc", delay: 180 },
    { text: "[  +0.300] (--) ArsalanWM: Starting Arsalan Portfolio GUI...", delay: 200 },
    { text: "", delay: 150 }, // Empty line
  ]

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  // Main boot sequence logic
  useEffect(() => {
    if (currentStep >= bootSteps.length) return

    const step = bootSteps[currentStep]
    
    // Handle typing animation steps
    if (step.isTyping) {
      setIsTyping(true)
      setTypingText('')
      let charIndex = 0
      
      const typeNextChar = () => {
        if (charIndex < step.text.length) {
          setTypingText(step.text.substring(0, charIndex + 1))
          charIndex++
          setTimeout(typeNextChar, step.typingSpeed || 200)
        } else {
          // Typing complete
          setIsTyping(false)
          setTimeout(() => {
            setCurrentStep(prev => prev + 1)
          }, step.delay || 300)
        }
      }
      
      // Start typing after a small delay
      setTimeout(typeNextChar, 200)
      return
    }
    
    // Handle normal steps
    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1)
    }, step.delay || 30)
    
    return () => clearTimeout(timer)
  }, [currentStep])

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [currentStep, typingText]);

  // Helper function to render a step
  const renderStep = (step: any, index: number) => {
    const isCurrentTypingStep = index === currentStep && step.isTyping
    
    // Handle status messages
    if ('status' in step && step.status) {
      return (
        <>
          <span className="text-green-500 mr-1">[</span>
          <span className="text-green-500 font-bold mr-1">OK</span>
          <span className="text-green-500 mr-1">]</span>
          <span>{step.text}</span>
        </>
      )
    }
    
    // Handle login prompt with username typing
    if (step.text === "arsalan-portfolio login: ") {
      const nextStep = bootSteps[index + 1]
      const usernameStepIndex = index + 1
      const isTypingUsername = currentStep === usernameStepIndex && nextStep?.isTyping
      const hasTypedUsername = currentStep > usernameStepIndex
      
      return (
        <span>
          {step.text}
          {/* Show username typing animation or completed username */}
          {isTypingUsername && (
            <span className="text-green-400 font-bold">
              {typingText}
              <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>█</span>
            </span>
          )}
          {hasTypedUsername && (
            <span className="text-green-400 font-bold">arsalan</span>
          )}
        </span>
      )
    }
    
    // Handle password prompt with password typing
    if (step.text === "Password: ") {
      const nextStep = bootSteps[index + 1]
      const passwordStepIndex = index + 1
      const isTypingPassword = currentStep === passwordStepIndex && nextStep?.isTyping
      const hasTypedPassword = currentStep > passwordStepIndex
      
      return (
        <span>
          {step.text}
          {/* Show password typing animation or completed password */}
          {isTypingPassword && (
            <span className="text-green-400">
              {typingText}
              <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>█</span>
            </span>
          )}
          {hasTypedPassword && (
            <span className="text-green-400">••••••••</span>
          )}
        </span>
      )
    }
    
    // Handle shell prompt with command typing
    if (step.text === "arsalan@portfolio:~$ ") {
      const nextStep = bootSteps[index + 1]
      const commandStepIndex = index + 1
      const isTypingCommand = currentStep === commandStepIndex && nextStep?.isTyping
      const hasTypedCommand = currentStep > commandStepIndex
      
      return (
        <span className="text-green-400">
          <span className="text-green-400 font-bold">arsalan@portfolio</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-white">$ </span>
          {/* Show command typing animation or completed command */}
          {isTypingCommand && (
            <span className="text-white">
              {typingText}
              <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>█</span>
            </span>
          )}
          {hasTypedCommand && (
            <span className="text-white">startx</span>
          )}
        </span>
      )
    }
    
    // Handle final launch message
    if (step.text === "🚀 Launching Portfolio Interface...") {
      return (
        <span className="text-green-400 font-bold">
          {step.text}
          <span className={`ml-2 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>█</span>
        </span>
      )
    }
    
    // Handle regular text (skip standalone typing steps since they're rendered inline)
    if (!step.isTyping) {
      return <span>{step.text}</span>
    }
    
    return null
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&display=swap');
        /* CRT flicker effect */
        @keyframes crtFlicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.98; }
        }
        /* Scanlines effect */
        @keyframes scanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 8px; }
        }
        .crt-effect {
          animation: crtFlicker 0.5s infinite steps(1);
        }
        .scanlines {
          background-image: 
            linear-gradient(
              rgba(255, 255, 255, 0.03) 1px, 
              transparent 1px
            );
          background-size: 100% 2px;
          animation: scanlines 0.1s linear infinite;
        }
        /* Terminal text glow */
        .terminal-text {
          text-shadow: 0 0 2px rgba(255,255,255,0.5);
        }
      `}</style>

      <motion.div
        className="fixed inset-0 z-[9999] bg-black crt-effect overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2.5 }}
      >
        {/* Scanlines overlay */}
        <div className="absolute inset-0 scanlines pointer-events-none opacity-50" />
        
        {/* Terminal Content */}
        <div 
          ref={containerRef}
          className="p-4 font-mono text-white text-xs leading-tight h-full overflow-auto terminal-text"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }}
        >
          <div className="space-y-0">
            {/* Render all completed steps */}
            {bootSteps.slice(0, currentStep + 1).map((step, index) => {
              // Skip typing steps since they're rendered inline with their prompts
              if (step.isTyping) {
                return null
              }
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.05 }}
                  className="whitespace-nowrap flex"
                >
                  {renderStep(step, index)}
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </>
  )
}