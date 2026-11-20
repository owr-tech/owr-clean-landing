'use client'

import { useEffect, useRef, useState, type ComponentType } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import {
  Boxes,
  Calculator,
  Check,
  MessageCircleMore,
  ReceiptText,
  ShoppingBasket,
  Users,
} from 'lucide-react'
import { fr, type FeatureItem } from '@/content/fr'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const icons = [ShoppingBasket, Boxes, ReceiptText, Calculator, MessageCircleMore, Users] as const

const tones = [
  'bg-[#eef6ef]',
  'bg-[#f8eed5]',
  'bg-[#f7e7dc]',
  'bg-[#eaf1e8]',
  'bg-[#e4f2eb]',
  'bg-[#f4eddf]',
] as const

function SalesVisual() {
  const data = fr.features.visuals.sales
  return (
    <div className="rounded-2xl border border-foreground/10 bg-white/75 p-2 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            {data.headers.map((header) => (
              <TableHead key={header} className="h-8 text-xs">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.rows.map((row) => (
            <TableRow key={row[0]}>
              {row.map((cell) => (
                <TableCell key={cell} className="py-2 text-xs font-medium">
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function StockVisual() {
  const data = fr.features.visuals.stock
  return (
    <div className="space-y-4 rounded-2xl border border-foreground/10 bg-white/75 p-5 shadow-sm">
      {data.labels.map((label, index) => (
        <div className="space-y-2" key={label}>
          <div className="flex items-center justify-between gap-3 text-sm font-semibold">
            <span>{label}</span>
            {index === 1 && (
              <Badge variant="outline" className="border-[#9d4a2c] text-[#7e371f]">
                {data.low}
              </Badge>
            )}
          </div>
          <Progress value={data.values[index]} className="h-2 bg-primary/10" />
        </div>
      ))}
    </div>
  )
}

function ExpensesVisual() {
  return (
    <div className="flex min-h-40 flex-wrap content-center gap-3 rounded-2xl border border-foreground/10 bg-white/75 p-5 shadow-sm">
      {fr.features.visuals.expenses.map((item, index) => (
        <Badge
          key={item}
          className="rounded-full px-4 py-2 text-sm"
          variant={index % 2 ? 'secondary' : 'outline'}
        >
          {item}
        </Badge>
      ))}
    </div>
  )
}

function TaxesVisual() {
  return (
    <div className="grid grid-cols-2 gap-3 rounded-2xl border border-foreground/10 bg-white/75 p-4 shadow-sm">
      {fr.features.visuals.taxes.map(([label, value], index) => (
        <div
          key={label}
          className={
            index === 2
              ? 'col-span-2 rounded-xl bg-primary p-4 text-primary-foreground'
              : 'rounded-xl bg-background p-4'
          }
        >
          <p className="text-xs opacity-70">{label}</p>
          <p className="mt-1 text-lg font-bold">{value}</p>
        </div>
      ))}
    </div>
  )
}

function ChatVisual() {
  return (
    <div className="space-y-3 rounded-2xl border border-foreground/10 bg-[#efe9db] p-4 shadow-sm">
      {fr.features.visuals.chat.map(([source, detail, status], index) => (
        <div className={index === 0 ? 'ml-auto max-w-[88%]' : 'mr-auto max-w-[92%]'} key={source}>
          <div
            className={
              index === 0
                ? 'rounded-2xl rounded-br-sm bg-[#d6f3dc] p-3'
                : 'rounded-2xl rounded-bl-sm bg-white p-3'
            }
          >
            <p className="text-xs font-bold text-primary">{source}</p>
            {index === 0 ? (
              <div className="mt-2 flex items-center gap-1">
                {[12, 20, 8, 25, 16, 22, 10, 18].map((height, waveIndex) => (
                  <span
                    className="w-1 rounded-full bg-primary"
                    key={waveIndex}
                    style={{ height }}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-2 grid grid-cols-4 gap-1">
                {[0, 1, 2, 3].map((line) => (
                  <span className="h-8 rounded bg-secondary" key={line} />
                ))}
              </div>
            )}
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="text-xs font-semibold">{detail}</p>
              <Badge variant="outline">{status}</Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function TeamVisual() {
  return (
    <div className="space-y-2 rounded-2xl border border-foreground/10 bg-white/75 p-4 shadow-sm">
      {fr.features.visuals.team.map(([initials, name, role]) => (
        <div className="flex items-center gap-3 rounded-xl bg-background/70 p-2" key={name}>
          <Avatar>
            <AvatarFallback className="bg-primary text-xs text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="flex-1 text-sm font-bold">{name}</span>
          <Badge variant="secondary">{role}</Badge>
        </div>
      ))}
    </div>
  )
}

const visuals = [
  SalesVisual,
  StockVisual,
  ExpensesVisual,
  TaxesVisual,
  ChatVisual,
  TeamVisual,
] as const

function FeatureCard({ item, index }: { item: FeatureItem; index: number }) {
  const Icon = icons[index] as ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  const Visual = visuals[index]

  return (
    <Card
      className={`w-full rounded-[2rem] border-foreground/10 py-0 shadow-[0_24px_80px_rgba(29,48,38,0.14)] ${tones[index]}`}
    >
      <CardContent className="grid min-h-[70svh] gap-8 p-6 sm:p-8 md:min-h-[34rem] md:grid-cols-[1.1fr_.9fr] md:items-center md:p-12">
        <div>
          <div className="mb-10 flex items-center justify-between">
            <span className="font-heading text-6xl font-bold tracking-tighter text-primary/20 md:text-8xl">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground">
              <Icon className="size-5" aria-hidden />
            </span>
          </div>
          <h3 className="font-heading text-3xl font-bold tracking-tight md:text-5xl">
            {item.title}
          </h3>
          <p className="mt-3 text-lg font-semibold text-primary md:text-xl">{item.promise}</p>
          <ul className="mt-8 space-y-4">
            {item.bullets.map((bullet) => (
              <li className="flex gap-3 text-sm leading-relaxed sm:text-base" key={bullet}>
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3.5" aria-hidden />
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
        <Visual />
      </CardContent>
    </Card>
  )
}

function StackCard({
  item,
  index,
  total,
  progress,
  mobile,
}: {
  item: FeatureItem
  index: number
  total: number
  progress: MotionValue<number>
  mobile: boolean
}) {
  const minimumScale = mobile ? 0.95 : 0.9
  const distanceFromLast = total - 1 - index
  const targetScale =
    index === total - 1 ? 1 : 1 - (1 - minimumScale) * (distanceFromLast / (total - 1))
  const scale = useTransform(
    progress,
    [index / total, Math.min(1, (index + 1.5) / total)],
    [1, targetScale],
  )
  const offset = mobile ? 16 : 28

  return (
    <div className="sticky top-0 flex min-h-[100svh] items-center justify-center px-4 py-14">
      <motion.div
        className="relative w-full max-w-5xl origin-top will-change-transform"
        style={{ scale, top: `calc(2vh + ${index * offset}px)` }}
      >
        <FeatureCard item={item} index={index} />
      </motion.div>
    </div>
  )
}

export function StackCards() {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [mobile, setMobile] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)')
    const update = () => setMobile(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  if (reduceMotion) {
    return (
      <div className="space-y-6">
        {fr.features.items.map((item, index) => (
          <FeatureCard item={item} index={index} key={item.title} />
        ))}
      </div>
    )
  }

  return (
    <div className="relative" ref={ref}>
      {fr.features.items.map((item, index) => (
        <StackCard
          item={item}
          index={index}
          total={fr.features.items.length}
          progress={scrollYProgress}
          mobile={mobile}
          key={item.title}
        />
      ))}
    </div>
  )
}
