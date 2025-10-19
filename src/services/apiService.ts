import { api } from '../lib/axios'

interface ShortLink {
  id: string
  code: string
  original_url: string
  created_at: string
}

export async function createShortLink(originalUrl: string): Promise<ShortLink> {
  const response = await api.post('/api/links', {
    original_url: originalUrl,
  })

  return response.data
}

// Nova função para buscar os links
export async function getLinks(): Promise<ShortLink[]> {
  const response = await api.get('/api/links')
  return response.data
}

// Nova função para deletar o link
export async function deleteLink(code: string): Promise<void> {
  await api.delete(`/api/links/${code}`)
}

// --- NOVA FUNÇÃO: Buscar link pelo código ---
export async function getLinkByCode(code: string): Promise<ShortLink> {
  const response = await api.get(`/api/links/${code}`)
  return response.data
}