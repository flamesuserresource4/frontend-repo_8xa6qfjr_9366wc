import { useState, useEffect } from 'react'
import Header from './components/Header'
import RecipeForm from './components/RecipeForm'
import RecipeCard from './components/RecipeCard'

function App() {
  const [latest, setLatest] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/recipes`)
        const data = await res.json()
        setHistory(data)
      } catch (e) {
        console.log('No history available')
      }
    }
    loadHistory()
  }, [])

  const handleGenerate = (recipe) => {
    setLatest(recipe)
    setHistory(prev => [recipe, ...prev])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
          <div className="lg:col-span-2">
            <RecipeForm onGenerate={handleGenerate} />
            <div className="mt-6 bg-white rounded-2xl shadow p-5 md:p-6">
              <h3 className="font-semibold text-gray-800 mb-3">Recent ideas</h3>
              <div className="space-y-3 max-h-80 overflow-auto pr-1">
                {history.map((r, i) => (
                  <button
                    key={r.id || i}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border"
                    onClick={() => setLatest(r)}
                  >
                    <p className="font-medium text-gray-800">{r.title}</p>
                    <p className="text-xs text-gray-500">{[r.cuisine, r.total_time].filter(Boolean).join(' • ')}</p>
                  </button>
                ))}
                {history.length === 0 && (
                  <p className="text-sm text-gray-500">Generated recipes will appear here.</p>
                )}
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            {!latest ? (
              <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
                Tell the AI what you have in your kitchen to get a tailored recipe idea. An appetizing image will be created, too.
              </div>
            ) : (
              <RecipeCard recipe={latest} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
