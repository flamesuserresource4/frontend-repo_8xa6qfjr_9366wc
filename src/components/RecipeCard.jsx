export default function RecipeCard({ recipe }) {
  if (!recipe) return null

  const { title, cuisine, servings, total_time, ingredients = [], steps = [], tips = [], image_url } = recipe

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      {image_url ? (
        <img src={image_url} alt={title} className="w-full h-64 object-cover" />
      ) : (
        <div className="w-full h-64 bg-gradient-to-br from-rose-100 to-orange-100 flex items-center justify-center text-rose-600">
          <span className="text-sm">AI image will appear here</span>
        </div>
      )}
      <div className="p-5 md:p-6">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <p className="text-gray-500 text-sm mt-1">{[cuisine, servings ? `${servings} servings` : null, total_time].filter(Boolean).join(' • ')}</p>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Ingredients</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Steps</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              {steps.map((st, i) => (
                <li key={i}>{st}</li>
              ))}
            </ol>
          </div>
        </div>

        {tips?.length > 0 && (
          <div className="mt-5">
            <h3 className="font-semibold text-gray-800 mb-2">Tips</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {tips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
