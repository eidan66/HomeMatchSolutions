export interface Project {
    _id: string;
    name: string;
    status: 'New' | 'InProgress' | 'Sold';
    ownerId: string;
    createdAt: string;
    updatedAt: string;
  }
  
  const API_BASE = import.meta.env.VITE_API_BASE || '';
  
  export async function fetchProjects(): Promise<Project[]> {
    const res = await fetch(`${API_BASE}/api/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  }
  
  export async function createProject(data: {
    name: string;
    ownerId: string;
  }): Promise<Project> {
    const res = await fetch(`${API_BASE}/api/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create project');
    return res.json();
  }
  
  export async function updateProject(
    id: string,
    data: Partial<{ name: string; status: string }>
  ): Promise<Project> {
    const res = await fetch(`${API_BASE}/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update project');
    return res.json();
  }
  
  export async function deleteProject(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/api/projects/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete project');
  }