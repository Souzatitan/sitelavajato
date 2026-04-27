export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo / Nome */}
        <h1 className="text-xl font-bold">
          MeuSite
        </h1>

        {/* Menu */}
        <nav className="space-x-6">
          <a href="#" className="hover:text-gray-200">
            Início
          </a>
          <a href="#" className="hover:text-gray-200">
            Serviços
          </a>
          <a href="#" className="hover:text-gray-200">
            Contato
          </a>
        </nav>

      </div>
    </header>
  );
}