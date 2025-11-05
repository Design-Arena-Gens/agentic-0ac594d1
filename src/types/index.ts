export type RequestStatus = 'pending' | 'in_review' | 'approved' | 'rejected' | 'completed';

export type RequestCategory =
  | 'vacation_time'
  | 'expense_reimbursement'
  | 'equipment_request'
  | 'it_support'
  | 'facility_maintenance'
  | 'document_request'
  | 'other';

export interface Request {
  id: string;
  title: string;
  description: string;
  category: RequestCategory;
  status: RequestStatus;
  priority: 'low' | 'medium' | 'high';
  requesterName: string;
  requesterEmail: string;
  department: string;
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  completedAt?: Date;
  notes?: string;
  attachments?: string[];
}

export interface CreateRequestData {
  title: string;
  description: string;
  category: RequestCategory;
  priority: 'low' | 'medium' | 'high';
  requesterName: string;
  requesterEmail: string;
  department: string;
}
