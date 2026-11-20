import { z } from 'zod'
import { fr } from '@/content/fr'

const requestSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    contact: z.string().trim().min(5).max(150),
    organisation: z.string().trim().min(1).max(100),
    message: z.string().trim().max(1000).optional(),
  })
  .strict()

export async function POST(request: Request) {
  const result = requestSchema.safeParse(await request.json().catch(() => null))

  if (!result.success) {
    return Response.json({ ok: false, message: fr.api.invalid }, { status: 400 })
  }

  console.info('[early-access]', result.data)

  return Response.json({ ok: true, message: fr.api.ok })
}
