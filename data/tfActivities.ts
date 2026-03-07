import { TFActivity } from '../interfaces/TFActivity';

export const tfActivities: TFActivity[] = [
    {
        id: 'user-id-1',
        date: '2025-11-01',
        title: '성균관대학교 산학협력 논의',
        images: [],
        status: '완료',
        details: 'AI 기반 건설안전 분야 산학협력 가능성 탐색. 창립기념식 이후 MOU 체결 추진 합의.',
        summary: '산학협력 가능성 초기 탐색 및 추진 방향 설정',
        category: '[성균관대 사전컨택]',
        dayOfWeek: '토요일',
        isMilestone: true
    },
    {
        id: 'user-id-2',
        date: '2025-12-26',
        title: '창립기념식 & Vision2030 선포식',
        images: [
            'https://gupftsskcmtkzpjqrlpc.supabase.co/storage/v1/object/public/tf_files/1772852437323_0.jpg',
            'https://gupftsskcmtkzpjqrlpc.supabase.co/storage/v1/object/public/tf_files/1772852473854_6.jpg'
        ],
        status: '완료',
        details: '창립 34주년 기념. Vision2030 공식 선포.',
        summary: '전사적 혁신을 위한 새로운 미래 비전 선포',
        category: '[창립기념식]',
        dayOfWeek: '금요일',
        isMilestone: true
    },
    {
        id: 'user-id-3',
        date: '2026-01-08',
        title: '미래전략TF 첫 번째 팀 미팅',
        images: [],
        status: '완료',
        details: '본사 12층. 12명 참석. TF 역할·목표 정립. 안전→품질 순 추진. 성균관대 방문 회의 예정.',
        summary: 'TF 출범 및 실무 진전 방향성 구체화',
        category: '[TF 미팅]',
        dayOfWeek: '목요일',
        isMilestone: false
    },
    {
        id: 'user-id-4',
        date: '2026-01-14',
        title: '성균관대학교 MOU 체결',
        images: [
            'https://gupftsskcmtkzpjqrlpc.supabase.co/storage/v1/object/public/tf_files/1772852030957_KakaoTalk_20260114_162554764_09.jpg',
            'https://gupftsskcmtkzpjqrlpc.supabase.co/storage/v1/object/public/tf_files/1772852041616_KakaoTalk_20260114_162554764_14.jpg'
        ],
        status: '완료',
        details: 'AI 기반 건설안전 분야 산학협력 MOU 공식 체결 완료.',
        summary: 'AI 기반 건설안전 특화 전략적 기술 파트너십 확립',
        category: '[MOU 체결]',
        dayOfWeek: '수요일',
        isMilestone: true,
        location: '본사 대 회의실'
    },
    {
        id: 'user-id-5',
        date: '2026-02-02',
        title: '성균관대 AI 기술 검토 및 협력 방향 논의',
        images: [
            'https://gupftsskcmtkzpjqrlpc.supabase.co/storage/v1/object/public/tf_files/1772852357341_1.png',
            'https://gupftsskcmtkzpjqrlpc.supabase.co/storage/v1/object/public/tf_files/1772852362137_2.png'
        ],
        status: '완료',
        details: '성균관대학교 제2공학관 27221호, 서원토건 대표이사 외 TF팀원 10명 + 박승희 교수 외 연구진 10명. 지능형 모니터링·3D 거리 감지·LLM 기술 검토. 3월 현장 실사 확정.',
        summary: '현장 도입 목적의 신기술 상세 검토 논의',
        category: '[TF 미팅]',
        dayOfWeek: '월요일',
        isMilestone: true,
        participants: ['서원토건임직워및성대연구진'],
        location: '성대 제2공학관 27221호'
    },
    {
        id: 'user-id-6',
        date: '2026-02-24',
        title: '현장 답사 (과천 G-Town 현장)',
        images: [
            'https://gupftsskcmtkzpjqrlpc.supabase.co/storage/v1/object/public/tf_files/1772851926256_KakaoTalk_20260305_162030249.jpg',
            'https://gupftsskcmtkzpjqrlpc.supabase.co/storage/v1/object/public/tf_files/1772851932852_KakaoTalk_20260305_162030249_02.jpg'
        ],
        status: '완료',
        details: '성균관대학교 박승희 교수 연구진 현장 실사. 공정률 30·50% 현장 중 선정',
        summary: '기술 적용성 판단을 위한 1차 현장 실사',
        category: '[현장 답사]',
        dayOfWeek: '화요일',
        isMilestone: true,
        participants: ['김한선박사외1명'],
        location: '과천G-Town 현장'
    },
    {
        id: 'user-id-7',
        date: '2026-02-25',
        title: '현장 답사 (부산 범일동 주거복합 신축공사 현장)',
        images: [
            'https://gupftsskcmtkzpjqrlpc.supabase.co/storage/v1/object/public/tf_files/1772851834264_KakaoTalk_20260305_161955849_10.jpg',
            'https://gupftsskcmtkzpjqrlpc.supabase.co/storage/v1/object/public/tf_files/1772851877598_KakaoTalk_20260305_161955849_03.jpg'
        ],
        status: '완료',
        details: '김무빈 팀장 부산 현장 CCTV 현황 파악, 예병기소장 미팅',
        summary: '부산 권역 현장 모니터링 실태 현황 파악',
        category: '[현장 답사]',
        dayOfWeek: '수요일',
        isMilestone: false,
        participants: ['김무빈'],
        location: '부산 범일블랑써밋현장'
    },
    {
        id: 'user-id-8',
        date: '2026-03-04',
        title: '현장 장비 설치 & TEST',
        images: [
            'https://gupftsskcmtkzpjqrlpc.supabase.co/storage/v1/object/public/tf_files/1772851728103_KakaoTalk_20260305_161936088_03.jpg',
            'https://gupftsskcmtkzpjqrlpc.supabase.co/storage/v1/object/public/tf_files/1772851746474_KakaoTalk_20260305_161936088_07.jpg'
        ],
        status: '완료',
        details: '성균관대학교 박승희 교수 연구진 6명 AI 카메라 설치 및 테스트',
        summary: '실시간 관찰을 위한 AI 카메라 시범 설치 및 검증',
        category: '[현장 장비설치]',
        location: '과천G-Town현장',
        dayOfWeek: '수요일',
        isMilestone: true,
        participants: ['김한선박사외6명']
    },
    {
        id: 'user-id-9',
        date: '2026-03-09',
        title: '현장 답사 (과천자이현장 답사)',
        images: [],
        status: '예정',
        details: '성균관대학교 박승희 교수 연구진 현장 답사',
        summary: '신기술 도입 전 테스트 현장 추가 검토',
        category: '[현장 답사]',
        dayOfWeek: '월요일',
        isMilestone: false
    },
    {
        id: 'user-id-10',
        date: '2026-03-16',
        title: '현장 장비 설치 & 시범 운영 개시',
        images: [],
        status: '예정',
        details: 'AI 카메라 시범 운영 개시. 인식률 90% 이상 목표',
        summary: '지능형 카메라 시스템 가동 및 운영 시작',
        category: '[현장 장비설치]',
        dayOfWeek: '월요일',
        isMilestone: false
    },
    {
        id: 'user-id-11',
        date: '2026-03-20',
        title: '미래전략TF 3월 팀 미팅',
        images: [],
        status: '예정',
        details: '과천 G-Town 현장에서 미팅, 현재 진행되고 있는 산학협력과정 점검',
        summary: '진행중인 산학협력과 실증 운영 점검',
        category: '[TF 미팅]',
        location: '과천G-Town현장',
        dayOfWeek: '금요일',
        isMilestone: true,
        participants: ['TF팀전원']
    }
];
