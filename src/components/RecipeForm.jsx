import { useState } from 'react'
import { Sparkles, Salad, Plus, ChefHat } from 'lucide-react'

export default function RecipeForm({ onGenerate }) {
  const [ingredients, setIngredients] = useState([''])
  const [cuisine, setCuisine] = useState('')
  const [dietary, setDietary] = useState('')
  const [servings, setServings] = useState(2)
  const [loading, setLoading] = useState(false)

  const handleIngredientChange = (i, value) => {
    const updated = [...ingredients]
    updated[i] = value
    setIngredients(updated)
  }

  const addIngredient = () => setIngredients(prev => [...prev, ''])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/ideas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients: ingredients.filter(Boolean),
          cuisine: cuisine || null,
          dietary: dietary || null,
          servings: Number(servings) || 2,
        })
      })
      const data = await res.json()
      onGenerate(data)
    } catch (err) {
      console.error('Failed to generate', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-5 md:p-6 space-y-4">
      <div className="flex items-center gap-2 text-rose-600">
        <ChefHat size={18} />
        <p className="text-sm">Tell the chef what you have</p>
      </div>

      {ingredients.map((ing, i) => (
        <div key={i} className="flex gap-2">
          <input
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
            placeholder={i === 0 ? 'e.g., chicken thighs' : 'another ingredient'}
            value={ing}
            onChange={(e) => handleIngredientChange(i, e.target.value)}
          />
          {i === ingredients.length - 1 && (
            <button type="button" onClick={addIngredient} className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
              <Plus size={18} />
            </button>
          )}
        </div>
      ))}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
          placeholder="Cuisine (optional)"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        />
        <input
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
          placeholder="Dietary (e.g., vegan, gluten-free)"
          value={dietary}
          onChange={(e) => setDietary(e.target.value)}
        />
        <input
          type="number"
          min="1"
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
          placeholder="Servings"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white py-2.5 rounded-lg shadow hover:opacity-95 disabled:opacity-60"
        disabled={loading}
      >
        <Sparkles size={18} /> {loading ? 'Thinking...' : 'Generate Recipe Idea'}
      </button>
    </form>
  )
}
