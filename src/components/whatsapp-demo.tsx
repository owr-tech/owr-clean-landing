'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { CheckCheck, Mic } from 'lucide-react'
import { fr } from '@/content/fr'
import { Button } from '@/components/ui/button'

export function WhatsappDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const reduceMotion = useReducedMotion()
  const visible = reduceMotion || inView
  const messageMotion = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.45, delay },
  })

  return (
    <div
      className="relative mx-auto w-full max-w-sm rounded-[2.75rem] border-[8px] border-[#1b1b18] bg-[#e7dfd0] p-3 shadow-[0_30px_90px_rgba(15,76,58,0.22)]"
      ref={ref}
    >
      <div className="mx-auto mb-3 h-5 w-24 rounded-b-2xl bg-[#1b1b18]" />
      <div className="rounded-[1.8rem] bg-[#f7f2e9]">
        <div className="flex items-center gap-3 rounded-t-[1.8rem] bg-primary px-4 py-4 text-primary-foreground">
          <span className="grid size-10 place-items-center rounded-full bg-white/15 text-sm font-bold">
            AI
          </span>
          <div>
            <p className="text-sm font-bold">{fr.whatsapp.contact}</p>
            <p className="text-xs opacity-70">{fr.whatsapp.status}</p>
          </div>
        </div>
        <div className="min-h-[31rem] space-y-3 p-4">
          <motion.div
            className="ml-auto max-w-[88%] rounded-2xl rounded-br-sm bg-[#d7f5df] p-3 shadow-sm"
            {...messageMotion(0)}
          >
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
                <Mic className="size-4" aria-hidden />
              </span>
              <div className="flex flex-1 items-center gap-1">
                {[10, 18, 12, 25, 16, 22, 9, 19, 13, 23, 11].map((height, index) => (
                  <span className="w-1 rounded-full bg-primary/70" key={index} style={{ height }} />
                ))}
              </div>
              <span className="text-xs">{fr.whatsapp.voiceDuration}</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-foreground/70">
              {fr.whatsapp.transcription}
            </p>
            <CheckCheck className="ml-auto mt-1 size-4 text-[#3577a7]" aria-hidden />
          </motion.div>
          <motion.div
            className="max-w-[92%] rounded-2xl rounded-bl-sm bg-white p-4 shadow-sm"
            {...messageMotion(0.35)}
          >
            <p className="text-sm leading-relaxed">{fr.whatsapp.assistant}</p>
          </motion.div>
          <motion.div className="grid grid-cols-3 gap-1.5" {...messageMotion(0.7)}>
            {fr.whatsapp.actions.map((action, index) => (
              <Button
                className="h-9 px-1 text-xs"
                key={action}
                type="button"
                variant={index === 0 ? 'default' : 'outline'}
              >
                {action}
              </Button>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
