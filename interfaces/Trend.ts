export interface AIAnalysisData {
    summary: string;
    keyStatistics: string[];
    globalCases: string[];
    technicalDetails: string;
    futureOutlook: string;
}

export interface Idea {
    title: string;
    description: string;
    aiAnalysis?: AIAnalysisData;
}

export interface Trend {
    id: string;
    title: string;
    category: string;
    description: string;
    icon: string;
    ideas: Idea[];
    marketSize?: string;
    year?: number;
}
