import { FormEvent, useState } from 'react'
import { createShortLink, getLinks, deleteLink } from '../services/apiService'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Um componente simples de Spinner para reutilizarmos
function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}

export function Home() {
  const [url, setUrl] = useState('')
  const queryClient = useQueryClient()
  
  // --- NOVO: Estado para controlar qual link está sendo deletado ---
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const { data: links, isLoading, isError } = useQuery({
    queryKey: ['links'],
    queryFn: getLinks,
  })

  // --- ATUALIZADO: useMutation para CRIAR link ---
  const { mutateAsync: createLinkFn, isPending: isCreatingLink } = useMutation({
    mutationFn: createShortLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
    },
  })

  // --- ATUALIZADO: useMutation para DELETAR link ---
  const { mutateAsync: deleteLinkFn, isPending: isDeletingLink } = useMutation({
    mutationFn: deleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
    },
    // Limpa o estado de `deletingId` quando a mutação terminar
    onSettled: () => {
      setDeletingId(null)
    }
  })

  async function handleCreateShortLink(event: FormEvent) {
    event.preventDefault()
    if (!url.trim()) return

    try {
      const newLink = await createLinkFn(url)
      alert(`Link criado: ${import.meta.env.VITE_FRONTEND_URL}/${newLink.code}`)
      setUrl('')
    } catch (error) {
      console.error('Erro ao criar o link:', error)
      alert('Não foi possível criar o link.')
    }
  }

  async function handleDeleteLink(code: string) {
    // Define qual link está sendo deletado para mostrar o spinner correto
    setDeletingId(code) 
    try {
      await deleteLinkFn(code)
      alert('Link excluído com sucesso!')
    } catch (error) {
      console.error('Erro ao excluir o link:', error)
      alert('Não foi possível excluir o link.')
    }
  }
  
  // --- NOVO: Função para copiar para a área de transferência ---
  async function handleCopyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      alert('Link copiado para a área de transferência!')
    } catch (err) {
      console.error('Falha ao copiar o texto: ', err)
      alert('Não foi possível copiar o link.')
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center my-10">
          <h1 className="text-5xl font-bold text-cyan-400">Brev.ly</h1>
        </header>

        <form onSubmit={handleCreateShortLink} className="w-full max-w-lg mx-auto">
          <div className="flex items-center border-b-2 border-cyan-400 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="url"
              placeholder="Digite a URL para encurtar"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            {/* --- ATUALIZADO: Botão de Encurtar com Spinner --- */}
            <button
              className="flex-shrink-0 bg-cyan-500 hover:bg-cyan-700 border-cyan-500 hover:border-cyan-700 text-sm border-4 text-white py-1 px-2 rounded transition-colors disabled:opacity-50 w-32 flex items-center justify-center"
              type="submit"
              disabled={isCreatingLink}
            >
              {isCreatingLink ? <Spinner /> : 'Encurtar Link'}
            </button>
          </div>
        </form>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Links Cadastrados</h2>
          {isLoading && <p>Carregando links...</p>}
          {isError && <p>Ocorreu um erro ao buscar os links.</p>}
          
          {links && (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">Link Encurtado</th>
                    <th scope="col" className="px-6 py-4">URL Original</th>
                    <th scope="col" className="px-6 py-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link) => (
                    <tr key={link.id} className="border-b dark:border-neutral-500">
                      {/* --- ATUALIZADO: Célula clicável para copiar --- */}
                      <td 
                        className="whitespace-nowrap px-6 py-4 font-medium text-cyan-400 hover:text-cyan-300 cursor-pointer"
                        onClick={() => handleCopyToClipboard(`${import.meta.env.VITE_FRONTEND_URL}/${link.code}`)}
                        title="Clique para copiar"
                      >
                        {`${import.meta.env.VITE_FRONTEND_URL}/${link.code}`}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 truncate max-w-xs">
                        {link.original_url}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {/* --- ATUALIZADO: Botão de Excluir com Spinner --- */}
                        <button
                          onClick={() => handleDeleteLink(link.code)}
                          className="text-red-500 hover:text-red-700 disabled:opacity-50 w-16 flex justify-center"
                          disabled={isDeletingLink && deletingId === link.id}
                        >
                          {isDeletingLink && deletingId === link.id ? <Spinner /> : 'Excluir'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}