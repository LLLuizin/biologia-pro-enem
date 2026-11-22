import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { topics, getTopicById } from '@/content/topics'
import { TopicContent } from '@/components/TopicContent'

interface TopicPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return topics.map(topic => ({ slug: topic.id }))
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const topic = getTopicById(resolvedParams.slug)

  if (!topic) {
    return { title: 'Tópico não encontrado' }
  }

  return {
    title: topic.title,
    description: topic.description,
    keywords: topic.keywords,
    openGraph: {
      title: topic.title,
      description: topic.description,
      type: 'article',
      tags: topic.keywords,
    },
  }
}

export default async function TopicPage({ params }: TopicPageProps) {
  const resolvedParams = await params
  const topic = getTopicById(resolvedParams.slug)

  if (!topic) {
    notFound()
  }

  return <TopicContent topic={topic} />
}