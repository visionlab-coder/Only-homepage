export interface TFActivity {
    id: string;
    date: string;
    dayOfWeek: string;
    category: string;
    title: string;
    details?: string;
    summary?: string;
    location?: string;
    status: '예정' | '완료';
    isMilestone?: boolean;
    images?: string[];
    participants?: string[];
}
