'use client';

import { useRequestStore } from '@/store/requestStore';
import { Request, RequestStatus } from '@/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CheckCircle, Clock, XCircle, AlertCircle, Eye } from 'lucide-react';
import { useState } from 'react';

const statusConfig = {
  pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  in_review: { label: 'En Revisión', color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
  approved: { label: 'Aprobado', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  rejected: { label: 'Rechazado', color: 'bg-red-100 text-red-800', icon: XCircle },
  completed: { label: 'Completado', color: 'bg-gray-100 text-gray-800', icon: CheckCircle },
};

const priorityConfig = {
  low: { label: 'Baja', color: 'text-gray-600' },
  medium: { label: 'Media', color: 'text-yellow-600' },
  high: { label: 'Alta', color: 'text-red-600' },
};

const categoryLabels: Record<string, string> = {
  vacation_time: 'Tiempo de Vacaciones',
  expense_reimbursement: 'Reembolso de Gastos',
  equipment_request: 'Solicitud de Equipo',
  it_support: 'Soporte TI',
  facility_maintenance: 'Mantenimiento de Instalaciones',
  document_request: 'Solicitud de Documentos',
  other: 'Otro',
};

export default function RequestList() {
  const requests = useRequestStore((state) => state.requests);
  const updateRequestStatus = useRequestStore((state) => state.updateRequestStatus);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [filterStatus, setFilterStatus] = useState<RequestStatus | 'all'>('all');

  const filteredRequests = filterStatus === 'all'
    ? requests
    : requests.filter(req => req.status === filterStatus);

  const handleStatusChange = (id: string, newStatus: RequestStatus) => {
    updateRequestStatus(id, newStatus);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Mis Solicitudes</h2>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as RequestStatus | 'all')}
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 text-gray-900"
        >
          <option value="all">Todos los estados</option>
          <option value="pending">Pendiente</option>
          <option value="in_review">En Revisión</option>
          <option value="approved">Aprobado</option>
          <option value="rejected">Rechazado</option>
          <option value="completed">Completado</option>
        </select>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
          No hay solicitudes para mostrar
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => {
            const StatusIcon = statusConfig[request.status].icon;
            return (
              <div
                key={request.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <h3 className="text-xl font-semibold text-gray-800">{request.title}</h3>
                      <span className={`text-sm font-medium ${priorityConfig[request.priority].color}`}>
                        [{priorityConfig[request.priority].label}]
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {categoryLabels[request.category]} • {request.department}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                      statusConfig[request.status].color
                    }`}
                  >
                    <StatusIcon size={16} />
                    {statusConfig[request.status].label}
                  </span>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-2">{request.description}</p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div>
                    <span className="font-medium">{request.requesterName}</span> • {request.requesterEmail}
                  </div>
                  <div>
                    {format(new Date(request.createdAt), "d 'de' MMMM, yyyy", { locale: es })}
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setSelectedRequest(request)}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                  >
                    <Eye size={16} />
                    Ver Detalles
                  </button>
                  {request.status === 'pending' && (
                    <button
                      onClick={() => handleStatusChange(request.id, 'in_review')}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                    >
                      Marcar en Revisión
                    </button>
                  )}
                  {request.status === 'in_review' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(request.id, 'approved')}
                        className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                      >
                        Aprobar
                      </button>
                      <button
                        onClick={() => handleStatusChange(request.id, 'rejected')}
                        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                      >
                        Rechazar
                      </button>
                    </>
                  )}
                  {request.status === 'approved' && (
                    <button
                      onClick={() => handleStatusChange(request.id, 'completed')}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                    >
                      Completar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-gray-800">{selectedRequest.title}</h3>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Categoría</label>
                <p className="text-gray-800">{categoryLabels[selectedRequest.category]}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">Descripción</label>
                <p className="text-gray-800">{selectedRequest.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Estado</label>
                  <p className="text-gray-800">{statusConfig[selectedRequest.status].label}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Prioridad</label>
                  <p className="text-gray-800">{priorityConfig[selectedRequest.priority].label}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Solicitante</label>
                  <p className="text-gray-800">{selectedRequest.requesterName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-800">{selectedRequest.requesterEmail}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">Departamento</label>
                <p className="text-gray-800">{selectedRequest.department}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Fecha de Creación</label>
                  <p className="text-gray-800">
                    {format(new Date(selectedRequest.createdAt), "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Última Actualización</label>
                  <p className="text-gray-800">
                    {format(new Date(selectedRequest.updatedAt), "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedRequest(null)}
              className="mt-6 w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
