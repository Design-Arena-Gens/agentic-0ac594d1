'use client';

import { useForm } from 'react-hook-form';
import { CreateRequestData, RequestCategory } from '@/types';
import { useRequestStore } from '@/store/requestStore';
import { useState } from 'react';

const categories: { value: RequestCategory; label: string }[] = [
  { value: 'vacation_time', label: 'Tiempo de Vacaciones' },
  { value: 'expense_reimbursement', label: 'Reembolso de Gastos' },
  { value: 'equipment_request', label: 'Solicitud de Equipo' },
  { value: 'it_support', label: 'Soporte TI' },
  { value: 'facility_maintenance', label: 'Mantenimiento de Instalaciones' },
  { value: 'document_request', label: 'Solicitud de Documentos' },
  { value: 'other', label: 'Otro' },
];

export default function RequestForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateRequestData>();
  const addRequest = useRequestStore((state) => state.addRequest);
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = (data: CreateRequestData) => {
    addRequest(data);
    setShowSuccess(true);
    reset();
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Nueva Solicitud</h2>

      {showSuccess && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          ¡Solicitud enviada exitosamente!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título *
          </label>
          <input
            {...register('title', { required: 'El título es requerido' })}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            placeholder="Breve descripción de la solicitud"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría *
          </label>
          <select
            {...register('category', { required: 'La categoría es requerida' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción *
          </label>
          <textarea
            {...register('description', { required: 'La descripción es requerida' })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            placeholder="Detalle completo de la solicitud"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prioridad *
          </label>
          <select
            {...register('priority', { required: 'La prioridad es requerida' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
          >
            <option value="">Seleccionar prioridad</option>
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
          {errors.priority && (
            <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre Completo *
            </label>
            <input
              {...register('requesterName', { required: 'El nombre es requerido' })}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              placeholder="Tu nombre completo"
            />
            {errors.requesterName && (
              <p className="mt-1 text-sm text-red-600">{errors.requesterName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              {...register('requesterEmail', {
                required: 'El email es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido',
                },
              })}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
              placeholder="tu@email.com"
            />
            {errors.requesterEmail && (
              <p className="mt-1 text-sm text-red-600">{errors.requesterEmail.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Departamento *
          </label>
          <input
            {...register('department', { required: 'El departamento es requerido' })}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
            placeholder="Ej: Recursos Humanos, IT, Finanzas"
          />
          {errors.department && (
            <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 transition-colors font-medium"
        >
          Enviar Solicitud
        </button>
      </form>
    </div>
  );
}
