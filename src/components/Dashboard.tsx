'use client';

import { useRequestStore } from '@/store/requestStore';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function Dashboard() {
  const requests = useRequestStore((state) => state.requests);

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === 'pending').length,
    approved: requests.filter((r) => r.status === 'approved' || r.status === 'completed').length,
    rejected: requests.filter((r) => r.status === 'rejected').length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Solicitudes</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</p>
          </div>
          <div className="bg-primary-100 p-3 rounded-full">
            <FileText className="text-primary-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Pendientes</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <Clock className="text-yellow-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Aprobadas</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.approved}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="text-green-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Rechazadas</p>
            <p className="text-3xl font-bold text-red-600 mt-2">{stats.rejected}</p>
          </div>
          <div className="bg-red-100 p-3 rounded-full">
            <XCircle className="text-red-600" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
