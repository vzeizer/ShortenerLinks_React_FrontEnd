import { api } from '../lib/axios'

interface ShortLink {
  id: string
  code: string
  original_url: string
  created_at: string
}

export async function createShortLink(originalUrl: string): Promise<ShortLink> {
  const response = await api.post('/links', {
    url: originalUrl,
  })

  return response.data
}

// Nova função para buscar os links
export async function getLinks(): Promise<ShortLink[]> {
  const response = await api.get('/links')
  return response.data
}

// Nova função para deletar o link
export async function deleteLink(id: string): Promise<void> {
  await api.delete(`/links/${id}`)
}

// --- NOVA FUNÇÃO: Buscar link pelo código ---
export async function getLinkByCode(code: string): Promise<ShortLink> {
  const response = await api.get(`/links/${code}`)
  return response.data
}