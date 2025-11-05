import { create } from 'zustand';
import { Request, CreateRequestData, RequestStatus } from '@/types';

interface RequestStore {
  requests: Request[];
  addRequest: (data: CreateRequestData) => void;
  updateRequestStatus: (id: string, status: RequestStatus) => void;
  updateRequest: (id: string, updates: Partial<Request>) => void;
  deleteRequest: (id: string) => void;
  getRequestById: (id: string) => Request | undefined;
}

const generateId = () => Math.random().toString(36).substring(2, 11);

export const useRequestStore = create<RequestStore>((set, get) => ({
  requests: [],

  addRequest: (data: CreateRequestData) => {
    const newRequest: Request = {
      ...data,
      id: generateId(),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      requests: [newRequest, ...state.requests],
    }));
  },

  updateRequestStatus: (id: string, status: RequestStatus) => {
    set((state) => ({
      requests: state.requests.map((req) =>
        req.id === id
          ? {
              ...req,
              status,
              updatedAt: new Date(),
              completedAt: status === 'completed' ? new Date() : req.completedAt,
            }
          : req
      ),
    }));
  },

  updateRequest: (id: string, updates: Partial<Request>) => {
    set((state) => ({
      requests: state.requests.map((req) =>
        req.id === id
          ? {
              ...req,
              ...updates,
              updatedAt: new Date(),
            }
          : req
      ),
    }));
  },

  deleteRequest: (id: string) => {
    set((state) => ({
      requests: state.requests.filter((req) => req.id !== id),
    }));
  },

  getRequestById: (id: string) => {
    return get().requests.find((req) => req.id === id);
  },
}));
