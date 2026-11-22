import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function unslugify(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function readingTime(text: string): number {
  const wordsPerMinute = 200
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function getFrequencyStars(frequency: number): string {
  // frequency: 1-5 (5 = cai muito)
  return '★'.repeat(frequency) + '☆'.repeat(5 - frequency)
}

export function getPriorityColor(priority: 'alta' | 'media' | 'baixa'): string {
  switch (priority) {
    case 'alta': return 'badge-argila'
    case 'media': return 'badge-verde'
    case 'baixa': return 'badge-ceu'
  }
}