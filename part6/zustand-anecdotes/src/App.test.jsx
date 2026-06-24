import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './NotificationContext'
import App from './App'
import AnecdoteList from './components/AnecdoteList'
import anecdotesService from './services/anecdotes'
import { useFilterStore } from './filterStore'

// Mock the anecdotesService module
vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  }
}))

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

describe('Anecdotes application', () => {
  beforeEach(() => {
    useFilterStore.setState({ filter: '' })
    vi.clearAllMocks()
  })

  test('6.12: state is initialized with anecdotes returned by the backend', async () => {
    const mockAnecdotes = [
      { id: '1', content: 'First mock anecdote', votes: 0 },
      { id: '2', content: 'Second mock anecdote', votes: 3 }
    ]
    anecdotesService.getAll.mockResolvedValueOnce(mockAnecdotes)

    const queryClient = createTestQueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('First mock anecdote')).toBeInTheDocument()
      expect(screen.getByText('Second mock anecdote')).toBeInTheDocument()
    })
  })

  test('6.13: anecdotes are displayed sorted by votes in descending order', () => {
    const mockAnecdotes = [
      { id: '1', content: 'Anecdote A', votes: 2 },
      { id: '2', content: 'Anecdote B', votes: 5 },
      { id: '3', content: 'Anecdote C', votes: 1 }
    ]

    const queryClient = createTestQueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <NotificationContextProvider>
          <AnecdoteList anecdotes={mockAnecdotes} />
        </NotificationContextProvider>
      </QueryClientProvider>
    )

    const items = screen.getAllByTestId('anecdote-item')
    expect(items).toHaveLength(3)
    expect(items[0]).toHaveTextContent('Anecdote B')
    expect(items[1]).toHaveTextContent('Anecdote A')
    expect(items[2]).toHaveTextContent('Anecdote C')
  })

  test('6.14: anecdotes list is properly filtered', () => {
    const mockAnecdotes = [
      { id: '1', content: 'React is cool', votes: 0 },
      { id: '2', content: 'Vue is fine', votes: 0 },
      { id: '3', content: 'Angular is big', votes: 0 }
    ]
    useFilterStore.setState({ filter: 'React' })

    const queryClient = createTestQueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <NotificationContextProvider>
          <AnecdoteList anecdotes={mockAnecdotes} />
        </NotificationContextProvider>
      </QueryClientProvider>
    )

    expect(screen.getByText('React is cool')).toBeInTheDocument()
    expect(screen.queryByText('Vue is fine')).not.toBeInTheDocument()
    expect(screen.queryByText('Angular is big')).not.toBeInTheDocument()
  })

  test('6.15: voting increases the number of votes for an anecdote', async () => {
    const mockAnecdotes = [{ id: '1', content: 'Testing is fun', votes: 0 }]

    const updatedAnecdote = { id: '1', content: 'Testing is fun', votes: 1 }
    anecdotesService.update.mockResolvedValueOnce(updatedAnecdote)

    const queryClient = createTestQueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <NotificationContextProvider>
          <AnecdoteList anecdotes={mockAnecdotes} />
        </NotificationContextProvider>
      </QueryClientProvider>
    )

    expect(screen.getByText('has 0')).toBeInTheDocument()

    const voteButton = screen.getByText('vote')
    fireEvent.click(voteButton)

    // Verify update was called
    await waitFor(() => {
      expect(anecdotesService.update).toHaveBeenCalled()
    })
  })
})
