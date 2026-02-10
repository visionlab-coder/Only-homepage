export interface TeamMember {
    id: string;
    name: string;
    position: string;
    track: string;
    email?: string;
    responsibilities: string[];
}

export interface Track {
    id: string;
    name: string;
    color: string;
    members: TeamMember[];
    mainResponsibilities: string[];
}

export interface Task {
    id: string;
    title: string;
    description: string;
    assignedTo: string;
    trackId: string;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'high' | 'medium' | 'low';
    dueDate?: string;
    createdAt: string;
}

export interface ExecutiveDirective {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    createdBy: string;
}
