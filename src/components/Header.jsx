import { UtensilsCrossed, Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="w-full py-6">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow">
            <UtensilsCrossed size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Recipe Muse</h1>
            <p className="text-sm text-gray-500">Turn your ingredients into delicious ideas</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-rose-600">
          <Sparkles size={18} />
          <span className="text-sm font-medium">AI Powered</span>
        </div>
      </div>
    </header>
  )
}
