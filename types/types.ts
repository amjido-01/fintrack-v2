export interface Expense {
    id: string;
    expenseName: string;
    amount: number;
    date: string;
    category: string;
    note: string;
    workspaceId: string;
    isDeleted: boolean;
  }

export interface Income {
    id: string;
    incomeSource: string;
    amount: number;
    date: string;
    category: string;
    description: string;
    workspaceId: string;
    isDeleted: boolean
  }

  export interface Workspace {
    id: string;
    workspaceName: string;
    currency: string;
    description: string;
    createdById: string;
    isDeleted: boolean;
    deletedAt: Date | null;
    deletedBy: string | null;
    createdAt: Date;
    updatedAt: Date;
    lastActiveAt: Date;
    expenses: Expense[]; // Replace 'any' with specific Expense interface if available
    income: Income[];   // Replace 'any' with specific Income interface if available
  }