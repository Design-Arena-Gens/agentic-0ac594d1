'use client';

import { useState } from 'react';
import RequestForm from '@/components/RequestForm';
import RequestList from '@/components/RequestList';
import Dashboard from '@/components/Dashboard';
import { FileText, List } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'form' | 'list'>('form');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-primary-700">Sistema de Solicitudes</h1>
          <p className="text-gray-600 mt-1">Automatización de solicitudes empresariales</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Dashboard />

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'form'
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FileText size={20} />
            Nueva Solicitud
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'list'
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <List size={20} />
            Ver Solicitudes
          </button>
        </div>

        <div className="transition-all duration-300">
          {activeTab === 'form' ? <RequestForm /> : <RequestList />}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>© 2025 Sistema de Solicitudes. Automatización empresarial simplificada.</p>
        </div>
      </footer>
    </div>
  );
}
