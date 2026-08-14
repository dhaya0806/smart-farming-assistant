'use server'

import { desc, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { crops, farmTasks, governmentSchemes, marketPrices } from '@/lib/db/schema'
import { revalidatePath } from 'next/cache'

const DEMO_USER_ID = 'demo-farmer'

export async function getFarmingData() {
  const [cropRows, taskRows, marketRows, schemeRows] = await Promise.all([
    db.select().from(crops).where(eq(crops.userId, DEMO_USER_ID)).orderBy(desc(crops.createdAt)),
    db.select().from(farmTasks).where(eq(farmTasks.userId, DEMO_USER_ID)).orderBy(desc(farmTasks.createdAt)),
    db.select().from(marketPrices).where(eq(marketPrices.userId, DEMO_USER_ID)).orderBy(desc(marketPrices.recordedAt)),
    db.select().from(governmentSchemes).where(eq(governmentSchemes.userId, DEMO_USER_ID)).orderBy(desc(governmentSchemes.createdAt)),
  ])
  return { crops: cropRows, tasks: taskRows, markets: marketRows, schemes: schemeRows }
}

export async function seedFarmingData() {
  const existing = await db.select({ id: crops.id }).from(crops).where(eq(crops.userId, DEMO_USER_ID)).limit(1)
  if (existing.length) return
  await db.insert(crops).values([
    { userId: DEMO_USER_ID, name: 'நெல்', variety: 'CO-51', fieldName: 'வடக்கு வயல்', stage: 'Flowering', health: 'Good', notes: 'தண்ணீர் நிலை சரியாக உள்ளது' },
    { userId: DEMO_USER_ID, name: 'தக்காளி', variety: 'Arka Rakshak', fieldName: 'கிழக்கு வயல்', stage: 'Fruit setting', health: 'Watch', notes: 'இலைகளை தினமும் கவனிக்கவும்' },
  ])
  await db.insert(farmTasks).values([
    { userId: DEMO_USER_ID, title: 'நெல் வயலுக்கு நீர் பாய்ச்சவும்', dueDate: '2026-08-16', priority: 'High' },
    { userId: DEMO_USER_ID, title: 'தக்காளிக்கு இயற்கை உரம் இடவும்', dueDate: '2026-08-18', priority: 'Medium' },
  ])
  await db.insert(marketPrices).values([
    { userId: DEMO_USER_ID, cropName: 'நெல்', marketName: 'ஒழுங்குமுறை விற்பனை கூடம்', pricePerQuintal: '2180', trend: 'Up' },
    { userId: DEMO_USER_ID, cropName: 'தக்காளி', marketName: 'கோயம்புத்தூர்', pricePerQuintal: '3200', trend: 'Stable' },
  ])
  await db.insert(governmentSchemes).values([
    { userId: DEMO_USER_ID, name: 'பிரதம மந்திரி கிசான்', description: 'சிறு மற்றும் குறு விவசாயிகளுக்கான வருமான ஆதரவு.', benefit: '₹6,000 / ஆண்டு', eligibility: 'சொந்த நிலம் உள்ள விவசாயிகள்', deadline: '2026-09-30' },
    { userId: DEMO_USER_ID, name: 'பயிர் காப்பீட்டு திட்டம்', description: 'இயற்கை இடர்களால் ஏற்படும் பயிர் இழப்புக்கு பாதுகாப்பு.', benefit: 'காப்பீட்டு உதவி', eligibility: 'அறிவிக்கப்பட்ட பயிர்கள்', deadline: '2026-08-31' },
  ])
}

export async function toggleTask(id: number, completed: boolean) {
  await db.update(farmTasks).set({ completed }).where(eq(farmTasks.id, id))
  revalidatePath('/')
}

export async function saveScheme(id: number, saved: boolean) {
  await db.update(governmentSchemes).set({ saved }).where(eq(governmentSchemes.id, id))
  revalidatePath('/')
}
