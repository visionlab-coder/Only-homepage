import { Track, TeamMember } from '../interfaces/Organization';

export const tracksData: Track[] = [
    {
        id: 'executive',
        name: '총괄',
        color: '#7c3aed',
        members: [
            {
                id: 'executive-lee-kang-beom',
                name: '이강범',
                position: '전무',
                track: 'executive',
                email: 'lkb@seowon.co.kr',
                responsibilities: ['총괄']
            }
        ],
        mainResponsibilities: ['미래전략TF 활동 총괄 지휘 및 의사결정']
    },
    {
        id: 'management',
        name: '팀장',
        color: '#6366f1',
        members: [
            {
                id: 'kim-mu-bin',
                name: '김무빈',
                position: '팀장',
                track: 'management',
                email: 'kmb@seowon.co.kr',
                responsibilities: ['기획', '추진', '제안']
            }
        ],
        mainResponsibilities: ['TF 기획, 추진, 제안 업무 총괄']
    },
    {
        id: 'construction',
        name: '공사',
        color: '#1a56db',
        members: [
            {
                id: 'yoo-byung-ki',
                name: '예병기',
                position: '이사',
                track: 'construction',
                email: 'ybk@seowon.co.kr',
                responsibilities: ['공사 관리 검증', '제안']
            },
            {
                id: 'song-kyu-nam',
                name: '송규남',
                position: '차장',
                track: 'construction',
                email: 'skn@seowon.co.kr',
                responsibilities: ['공사 관리 검증', '제안']
            }
        ],
        mainResponsibilities: ['공사 관리 검증 및 제안']
    },
    {
        id: 'quality',
        name: '품질',
        color: '#16a34a',
        members: [
            {
                id: 'jung-hee-joong',
                name: '정희중',
                position: '부장',
                track: 'quality',
                email: 'jhj@seowon.co.kr',
                responsibilities: ['공사 품질 관리 검증']
            }
        ],
        mainResponsibilities: ['공사 품질 관리 검증']
    },
    {
        id: 'safety',
        name: '안전',
        color: '#dc2626',
        members: [
            {
                id: 'lim-sung-yoon',
                name: '임성윤',
                position: '차장',
                track: 'safety',
                email: 'lsy@seowon.co.kr',
                responsibilities: ['안전 관리 검증(시연)', '제안']
            },
            {
                id: 'lee-sang-hyun',
                name: '이상현',
                position: '대리',
                track: 'safety',
                email: 'lsh@seowon.co.kr',
                responsibilities: ['안전 관리 검증(시연)', '제안']
            }
        ],
        mainResponsibilities: ['안전 관리 검증(시연) 및 제안']
    },
    {
        id: 'engineering',
        name: '공무',
        color: '#0e7490',
        members: [
            {
                id: 'um-tae-hyun',
                name: '엄태현',
                position: '과장',
                track: 'engineering',
                email: 'uth@seowon.co.kr',
                responsibilities: ['공사 데이터 입력 및 발취']
            },
            {
                id: 'sim-wan-su',
                name: '심완수',
                position: '과장',
                track: 'engineering',
                email: 'sws@seowon.co.kr',
                responsibilities: ['공사 데이터 입력 및 발취']
            },
            {
                id: 'hwang-se-won',
                name: '황세원',
                position: '차장 (총무)',
                track: 'engineering',
                email: 'hsw@seowon.co.kr',
                responsibilities: ['공지', '공유', '미팅일정', '출장기획']
            }
        ],
        mainResponsibilities: ['공사 데이터 입력 및 발취', '공지/공유/미팅일정/출장기획']
    },
    {
        id: 'procurement',
        name: '구매',
        color: '#f59e0b',
        members: [
            {
                id: 'kim-ga-yoon',
                name: '김가윤',
                position: '과장',
                track: 'procurement',
                email: 'kgy@seowon.co.kr',
                responsibilities: ['해당 업무 데이터 수집 및 총무지원']
            }
        ],
        mainResponsibilities: ['해당 업무 데이터 수집 및 총무지원']
    },
    {
        id: 'it-data',
        name: '전산',
        color: '#8b5cf6',
        members: [
            {
                id: 'chun-ji-yeon',
                name: '천지연',
                position: '대리',
                track: 'it-data',
                email: 'cjy@seowon.co.kr',
                responsibilities: ['해당 업무 데이터 수집 및 총무지원']
            }
        ],
        mainResponsibilities: ['해당 업무 데이터 수집 및 총무지원']
    }
];

// 모든 팀원 목록
export const allMembers: TeamMember[] = tracksData.flatMap(track => track.members);

// 결의 순서 (개발 방향에 따른 품의(제안) 및 결의 순서)
export const approvalFlow = {
    description: '개발 방향에 따른 품의(제안) 및 결의 순서(지출포함)',
    steps: [
        { order: 1, role: '대표', name: '대표이사' },
        { order: 2, role: '총괄', name: '이강범 전무' },
        { order: 3, role: '팀장', name: '김무빈 팀장' },
        { order: 4, role: '총무', name: '황세원 총무' },
        { order: 5, role: '실행부서', examples: ['안전관련 임성윤차장', '구매관련 김가윤과장', '전산관련 천지연대리'] }
    ]
};
