export interface Exhibition {
    id: string;
    name: string;
    category: string;
    location: string;
    country: string;
    startDate: string;
    endDate: string;
    description: string;

    website?: string;
    isRecommended?: boolean;
    priority?: number; // Strategic priority ranking (1 = highest)
    season?: 'H1' | 'H2'; // 상반기/하반기

    detailedInfo?: {
        exhibitionDetails: string; // 박람회 세부 사항
        keyHighlights: string[]; // 주요 특징
        targetAudience: string; // 대상 관람객
        expectedVisitors?: string; // 예상 방문객 수
        exhibitorCount?: string; // 출품업체 수
    };
}
