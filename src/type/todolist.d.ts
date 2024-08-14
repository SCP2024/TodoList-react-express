export interface TodoListQueryType {
    todo?: string;
    status?: number;
    current?: number;
    pageSize?: number;
    user?: string;
    all?: boolean;
  }
  
  export interface TodoListType {
    todo?: string;
    description: string;
    deadline?: number;
    status: TODO_STATUS
    _id?: string;
    user: string;
  }
  