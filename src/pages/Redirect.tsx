import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getLinkByCode } from '../services/apiService'

export function RedirectPage() {
  const navigate = useNavigate()
  const { shortUrl } = useParams<{ shortUrl: string }>()

  const { data, isLoading, isError } = useQuery({
    // A query depende do shortUrl, então ele deve fazer parte da chave
    queryKey: ['redirectLink', shortUrl],
    // A função queryFn só será chamada se shortUrl não for nulo/undefined
    queryFn: () => getLinkByCode(shortUrl!),
    // Desabilita novas tentativas automáticas em caso de erro 404
    retry: false,
    enabled: !!shortUrl, // Garante que a query só rode se `shortUrl` existir
  })

  useEffect(() => {
    if (data?.original_url) {
      // Redireciona para a URL original
      window.location.replace(data.original_url)
    }
  }, [data])

  useEffect(() => {
    if (isError) {
      // Se a API retornar um erro (ex: link não encontrado),
      // redireciona para a página de erro 404
      navigate('/not-found', { replace: true })
    }
  }, [isError, navigate])


  // Exibe um feedback para o usuário enquanto a busca ocorre
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Redirecionando...</p>
      </div>
    )
  }

  // Se a busca falhar, o useEffect cuidará do redirecionamento para 404.
  // Pode-se retornar null ou um componente de fallback.
  return null
}