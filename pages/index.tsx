import { useState } from 'react';
import useSWR from 'swr';
import '../styles/globals.css';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Home = () => {
  const { data: companies, error } = useSWR('/api/companies', fetcher);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCompanyClick = async (id: number) => {
    const response = await fetch(`/api/company/${id}`);
    const data = await response.json();
    setSelectedCompany(data);
  };

  if (error) return <div>Failed to load</div>;
  if (!companies) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">RegisterKaro</h1>
          <div className="hidden md:block">
            <nav className="space-x-4">
              <a href="#" className="hover:underline">
                Home
              </a>
              <a href="#" className="hover:underline">
                Our Services
              </a>
              <a href="#" className="hover:underline">
                Blog
              </a>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </nav>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile dropdown menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <nav className="space-y-2 p-4 bg-blue-800">
              <a href="#" className="block hover:underline">
                Home
              </a>
              <a href="#" className="block hover:underline">
                Our Services
              </a>
              <a href="#" className="block hover:underline">
                Blog
              </a>
              <a href="#" className="block hover:underline">
                Contact Us
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <section className="text-center my-8">
          <h2 className="text-3xl font-extrabold text-blue-900">Your Trusted Partner for Compliance Business Needs</h2>
          <p className="text-gray-700 mt-4">
            An online business compliance platform that helps entrepreneurs and other individuals with various,
            registrations, tax filings, and other legal matters.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {companies.map((company: any) => (
            <button
              key={company.id}
              onClick={() => handleCompanyClick(company.id)}
              className="p-4 bg-primary text-white rounded-lg shadow-md hover:bg-primary_hover"
            >
              {company.name}
            </button>
          ))}
        </section>

        {selectedCompany && (
          <section className="mt-8 bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-blue-900">{selectedCompany.company.name}</h3>
            <p className="mt-2 text-gray-700">{selectedCompany.company.details}</p>
            <h4 className="mt-4 text-xl font-semibold text-blue-900">Directors:</h4>
            <ul className="list-disc list-inside text-gray-700">
              {selectedCompany.directors.map((director: any) => (
                <li key={director.id}>{director.name}</li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
};

export default Home;