export interface Project {
    id: string;
    title: string;
    description: string;
    status: 'planning' | 'in-progress' | 'completed';
    progress: number;
    startDate: string;
    endDate: string;
    researchers: string[];
}

export interface ResearchArea {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export const researchAreas: ResearchArea[] = [
    {
        id: 'shm',
        title: 'Smart Health Monitoring',
        description: '구조물의 건전성을 실시간으로 진단하고 분석하는 AI 기반 모니터링 시스템',
        icon: '🏗️'
    },
    {
        id: 'dt',
        title: 'Digital Twin & BIM',
        description: '건설 현장의 물리적 자산을 디지털로 복제하여 시뮬레이션 및 최적화 수행',
        icon: '💻'
    },
    {
        id: 'safety',
        title: 'AI Construction Safety',
        description: '비전 AI와 센서를 활용한 현장 위험 요소 자동 탐지 및 예방',
        icon: '🦺'
    }
];

export const initialProjects: Project[] = [
    {
        id: 'p1',
        title: '안전장비 착용 AI검사',
        description: 'Vision AI 기술을 도입하여 작업자의 안전모, 안전대 등 필수 보호구 착용 여부를 실시간으로 자동 감지하고 미착용자에게 즉시 알림을 발송하는 현장 안전 모니터링 시스템.',
        status: 'in-progress',
        progress: 30,
        startDate: '2026-02-01',
        endDate: '2026-11-30',
        researchers: ['박승희교수 연구팀']
    },
    {
        id: 'p2',
        title: '작업자 동선 위험 AI감시',
        description: '현장 내 중장비와 작업자의 이동 경로를 실시간 추적 분석하여, 충돌 위험 구역 진입 시 경고를 발생시키는 스마트 충돌 방지 및 안전 관제 솔루션.',
        status: 'planning',
        progress: 0,
        startDate: '2026-03-15',
        endDate: '2026-12-31',
        researchers: ['박승희교수 연구팀']
    }
];
