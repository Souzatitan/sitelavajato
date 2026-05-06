export default function BeforeAfter() {
  return (
    <section className="py-16 bg-white">
      
      {/* Título */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Antes e Depois
        </h2>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
        
        {/* Item 1 */}
        <div className="space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <img
                src="/antes1.png"
                alt="Antes"
                className="rounded-xl shadow-md"
              />
              <p className="text-center mt-2 text-gray-600">Antes</p>
            </div>

            <div>
              <img
                src="/depois1.png"
                alt="Depois"
                className="rounded-xl shadow-md"
              />
              <p className="text-center mt-2 text-gray-600">Depois</p>
            </div>
          </div>

        </div>

        {/* Item 2 */}
        <div className="space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <img
                src="/antes2.png"
                alt="Antes"
                className="rounded-xl shadow-md"
              />
              <p className="text-center mt-2 text-gray-600">Antes</p>
            </div>

            <div>
              <img
                src="/depois2.png"
                alt="Depois"
                className="rounded-xl shadow-md"
              />
              <p className="text-center mt-2 text-gray-600">Depois</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}