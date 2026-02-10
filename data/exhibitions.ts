import { Exhibition } from '../interfaces/Exhibition';

// 2026년 날짜순 정렬 (빠른 일정 순)
export const exhibitionsData: Exhibition[] = [
    // ===== [글로벌 추천 박람회] =====

    // [미국] World of Concrete - 1월이라 참석 불가, 추천 X
    {
        id: 'world-of-concrete-2026',
        name: 'World of Concrete',
        category: '스마트건설',
        location: '라스베이거스',
        country: '미국',
        startDate: '2026-01-19',
        endDate: '2026-01-22',
        description: '콘크리트 및 골조 전문가 행사 (1월 일정으로 참석 불가)',
        website: 'https://www.worldofconcrete.com/',
        isRecommended: false,  // 추천 제외
        detailedInfo: {
            exhibitionDetails: '북미 최대 콘크리트 및 골조 전문 박람회입니다. 콘크리트 펌프, 타설 장비, 철근 가공 기계, 비계 시스템 등 골조 공사에 특화된 장비와 자재가 전시됩니다.',
            keyHighlights: [
                '콘크리트 펌프 및 타설 자동화 장비',
                '철근 가공 및 배근 로봇',
                '비계 및 거푸집 시스템',
                '골조 시공 안전 장비'
            ],
            targetAudience: '골조팀, 콘크리트 시공 전문가, 장비 구매담당자',
            expectedVisitors: '5만명+',
            exhibitorCount: '1,500개사'
        }
    },
    {
        id: 'ces-2026',
        name: 'CES 2026',
        category: '첨단기술 & AI',
        location: '라스베이거스',
        country: '미국',
        startDate: '2026-01-06',
        endDate: '2026-01-10',
        description: '세계에서 가장 영향력 있는 기술 행사',
        website: 'https://www.ces.tech/',
        detailedInfo: {
            exhibitionDetails: '세계 최대 규모의 첨단 기술 박람회로, AI, 로봇, IoT, 자율주행, 스마트홈 등 모든 신기술이 공개됩니다. 건설 분야에서는 AI 비전 시스템, 드론, 로봇 기술 등을 확인할 수 있습니다.',
            keyHighlights: [
                'AI 및 머신러닝 최신 기술',
                '산업용 드론 및 자율주행 장비',
                'IoT 센서 및 스마트 디바이스',
                '첨단 로봇 및 자동화 솔루션'
            ],
            targetAudience: '기술 트렌드 모니터링팀, 신기술 연구소, 디지털 혁신팀',
            expectedVisitors: '17만명+',
            exhibitorCount: '4,000개사'
        }
    },
    // [독일] DigitalBAU & Hannover Messe
    {
        id: 'digitalbau-2026',
        name: 'DigitalBAU 2026',
        category: '스마트건설',
        location: '뮌헨',
        country: '독일',
        startDate: '2026-03-24',
        endDate: '2026-03-26',
        description: '★★★★☆ 건설 산업의 디지털 솔루션 박람회',
        website: 'https://digital-bau.com/',
        isRecommended: true,
        priority: 2,
        season: 'H1',
        detailedInfo: {
            exhibitionDetails: '독일 최대 건설 디지털화 전문 박람회입니다. BIM, 디지털 트윈, AI 기반 현장 관리, 스마트 센서 등 건설 산업의 전 과정을 디지털화하는 솔루션이 전시됩니다.',
            keyHighlights: [
                'BIM 및 디지털 트윈 기술',
                'AI 기반 현장 모니터링 시스템',
                '스마트 센서 및 IoT 플랫폼',
                '클라우드 기반 협업 솔루션'
            ],
            targetAudience: '디지털 혁신팀, BIM 담당자, 스마트건설 기획팀',
            expectedVisitors: '2만명+',
            exhibitorCount: '150개사'
        }
    },

    // ===== [상반기 추천 일정] =====

    // [1순위] 5월 광저우-선전 연속 동선 (통합 카드)
    {
        id: 'china-may-route-2026',
        name: '광저우-선전 연속 동선 (5월)',
        category: '스마트건설',
        location: '광저우 → 선전',
        country: '중국',
        startDate: '2026-05-08',
        endDate: '2026-05-13',
        description: '★★★★★ [1순위] 5/8-10 광저우 CIHIE (PC공법, 골조 자동화) + 5/11-13 선전 AI 안전기업 방문 (KOTRA 매칭). 연속 출장 6일',
        website: 'http://www.cihie.net',
        isRecommended: true,
        priority: 1,
        season: 'H1',
        detailedInfo: {
            exhibitionDetails: 'CIHIE는 중국 최대 규모의 주택산업 및 건축 공업화 전문 박람회입니다. PC(프리캐스트 콘크리트) 공법, 모듈러 건축, 스마트 건설 기술, 친환경 건자재 등을 집중 전시합니다. 광저우 박람회 직후 선전으로 이동하여 AI 안전관리 기업 방문이 포함된 연속 일정입니다.',
            keyHighlights: [
                'PC공법 및 골조 자동화 최신 기술 집중 전시',
                '철근 가공 로봇, 콘크리트 타설 장비 등 현장 직결 장비',
                '선전 AI 안전 기업 직접 방문 및 기술 교류',
                '1회 출장으로 박람회 + 기업방문 효율적 일정'
            ],
            targetAudience: '건설사 골조팀, 기술연구소, 스마트건설 담당자, 안전관리팀',
            expectedVisitors: '10만명+',
            exhibitorCount: '800개사'
        }
    },

    // [2순위] 3월 선전 2개 박람회 동시 개최 (통합 카드)
    {
        id: 'shenzhen-march-dual-2026',
        name: '선전 2개 박람회 동시 개최 (3월)',
        category: 'AI & 로봇',
        location: '선전 (World Expo)',
        country: '중국',
        startDate: '2026-03-31',
        endDate: '2026-04-03',
        description: '★★★★☆ [2순위] ITES (로봇 팔·AGV) + SIMM (기계전) 같은 장소 동시 개최. 1회 방문으로 2개 박람회 관람',
        website: 'https://www.iteschina.com',
        isRecommended: true,
        priority: 2,
        season: 'H1',
        detailedInfo: {
            exhibitionDetails: 'ITES와 SIMM은 선전 세계박람관에서 동시에 개최되는 아시아 최대 산업 자동화 및 로봇 전시회입니다. ITES는 산업용 로봇, AGV, 협동로봇에 특화되어 있으며, SIMM은 정밀 기계 및 자동화 설비를 다룹니다. 같은 장소 인접 전시관에서 열려 1회 방문으로 두 박람회를 모두 관람할 수 있습니다.',
            keyHighlights: [
                '산업용 로봇 팔, AGV(무인운반차) 최신 기술',
                '협동로봇(Cobot)의 건설 현장 적용 사례',
                '정밀 기계 가공 및 자동화 설비 종합 전시',
                '1회 방문으로 ITES + SIMM 2개 박람회 동시 관람',
                '중국 제조업 허브 선전의 최신 기술 트렌드 파악'
            ],
            targetAudience: '로봇 도입 검토팀, 자동화 담당자, 스마트 팩토리 기획팀',
            expectedVisitors: '15만명+',
            exhibitorCount: '1,200개사'
        }
    },

    // 기존 개별 데이터는 유지 (필터/검색용)
    {
        id: 'cihie-2026',
        name: 'CIHIE 2026 (광저우 국제 주택산업 박람회)',
        category: '스마트건설',
        location: '광저우',
        country: '중국',
        startDate: '2026-05-08',
        endDate: '2026-05-10',
        description: 'PC공법, 모듈러 건축, 스마트건설 기술 전문 박람회',
        website: 'http://www.cihie.net',
        isRecommended: false,
        season: 'H1',
        detailedInfo: {
            exhibitionDetails: '중국 최대 규모의 프리캐스트(PC) 콘크리트 공법 및 주택 산업화 전문 박람회입니다. 철근 자동 가공, 콘크리트 타설 로봇, 모듈러 건축 시스템 등 골조 공사 자동화에 특화된 기술이 집중 전시됩니다.',
            keyHighlights: [
                'PC부재 제작 자동화 라인',
                '철근 가공 로봇 및 자동 배근 시스템',
                '친환경 건자재 및 모듈러 건축 솔루션',
                '스마트 건설 관리 플랫폼 및 BIM 기술'
            ],
            targetAudience: '골조팀, PC공법 연구자, 건축자재 구매팀',
            expectedVisitors: '10만명+',
            exhibitorCount: '800개사'
        }
    },
    {
        id: 'shenzhen-visit-may-2026',
        name: '선전 AI 안전기업 방문 (KOTRA 선전무역관)',
        category: 'AI & 로봇',
        location: '선전 (개별 기업 방문)',
        country: '중국',
        startDate: '2026-05-11',
        endDate: '2026-05-13',
        description: 'CIHIE 직후 선전 이동 (광저우-선전 연속 동선 포함)',
        website: 'https://www.kotra.or.kr',
        isRecommended: false,
        detailedInfo: {
            exhibitionDetails: '선전 지역의 AI 안전관리 기업 및 스타트업 방문 일정입니다. 건설 현장 AI 비전 시스템, 작업자 안전 모니터링, 위험 구역 감지 등 최신 AI 안전 기술을 보유한 기업들과 직접 교류할 수 있습니다.',
            keyHighlights: [
                'AI 비전 기반 안전모 착용 감지',
                '작업자 동선 추적 및 위험 구역 알림',
                '중장비 충돌 방지 시스템',
                '현장 스타트업과의 직접 기술 교류'
            ],
            targetAudience: '안전관리팀, AI 기술팀, 스마트건설 연구소'
        }
    },
    {
        id: 'ites-shenzhen-2026',
        name: 'ITES Shenzhen 2026 (산업 자동화 로봇전)',
        category: 'AI & 로봇',
        location: '선전 (World Expo)',
        country: '중국',
        startDate: '2026-03-31',
        endDate: '2026-04-03',
        description: '산업용 로봇, AGV, 협동로봇 전문 박람회',
        website: 'https://www.iteschina.com',
        isRecommended: false,
        season: 'H1',
        detailedInfo: {
            exhibitionDetails: '아시아 최대 산업 자동화 및 로봇 전시회입니다. 6축 로봇 팔, AGV(무인운반차), 협동로봇(Cobot) 등 건설 현장 자동화에 적용 가능한 최신 로봇 기술이 대거 전시됩니다.',
            keyHighlights: [
                '산업용 로봇 팔 및 그리퍼 기술',
                'AGV/AMR 자율주행 물류 시스템',
                '협동로봇의 건설 현장 적용 사례',
                'AI 기반 로봇 제어 및 비전 시스템'
            ],
            targetAudience: '로봇 도입 검토팀, 자동화 담당자, 스마트 팩토리 기획팀',
            expectedVisitors: '12만명+',
            exhibitorCount: '900개사'
        }
    },
    {
        id: 'simm-shenzhen-2026',
        name: 'SIMM 2026 (선전 기계전)',
        category: '스마트건설',
        location: '선전 (Shenzhen World Expo)',
        country: '중국',
        startDate: '2026-03-31',
        endDate: '2026-04-03',
        description: '기계·자동화 (선전 2개 박람회 포함)',
        website: 'https://www.simmtime.com',
        isRecommended: false,
        season: 'H1',
        detailedInfo: {
            exhibitionDetails: 'ITES와 함께 개최되는 중국 최대 정밀 기계 및 제조 장비 박람회입니다. CNC 가공기, 3D 프린팅, 레이저 절단기 등 건설 부재 제작에 활용 가능한 첨단 가공 장비가 대거 전시됩니다.',
            keyHighlights: [
                'CNC 기계 및 정밀 가공 설비',
                '3D 프린팅 및 적층 제조 기술',
                '레이저 절단/용접 자동화 장비',
                '스마트 제조 실행 시스템(MES)'
            ],
            targetAudience: '제조팀, 부재 생산 담당자, 기계 구매팀',
            expectedVisitors: '11만명+',
            exhibitorCount: '850개사'
        }
    },

    // [3순위] 4월 Canton Fair
    // [중국] 3순위로 축소 - Canton Fair 제거
    {
        id: 'canton-fair-139-phase1',
        name: 'Canton Fair 139th (Phase 1)',
        category: '스마트건설',
        location: '광저우 (Canton Fair Complex)',
        country: '중국',
        startDate: '2026-04-15',
        endDate: '2026-04-19',
        description: '건자재/중장비 섹션, 알루미늄 거푸집 등 직수입 라인',
        website: 'https://www.cantonfair.org.cn',
        isRecommended: false,  // 추천에서 제외
        detailedInfo: {
            exhibitionDetails: '중국 최대 종합 무역 박람회로, 건자재, 중장비, 알루미늄 거푸집 등 건설 관련 섹션이 포함되어 있습니다. 직수입 라인 발굴 및 중국 제조사와의 직접 거래 기회를 제공합니다.',
            keyHighlights: [
                '건자재 및 중장비 전문 섹션',
                '알루미늄 거푸집 등 시스템 거푸집',
                '중국 제조사와 직접 거래 기회',
                '대량 구매 및 직수입 라인 발굴'
            ],
            targetAudience: '자재 구매팀, 해외 소싱 담당자, 중장비 구매팀',
            expectedVisitors: '18만명+',
            exhibitorCount: '2만개사'
        }
    },
    // ===== [하반기 추천 일정] =====

    {
        id: 'are-shenzhen-2026',
        name: 'ARE Shenzhen (로봇·자동화 국제전)',
        category: 'AI & 로봇',
        location: '선전 (Shenzhen Convention Center)',
        country: '중국',
        startDate: '2026-08-26',
        endDate: '2026-08-28',
        description: '★★★★☆ [하반기] AI 안전 시스템, 스마트 팩토리 솔루션, 산업용 로봇',
        website: 'http://www.are-expo.com',
        isRecommended: true,
        priority: 1,
        season: 'H2',
        detailedInfo: {
            exhibitionDetails: '선전 로봇 및 자동화 국제전시회입니다. 산업용 로봇, AI 안전 시스템, 스마트 팩토리 솔루션 등이 전시되며, 건설 현장 자동화에 적용 가능한 최신 기술을 확인할 수 있습니다.',
            keyHighlights: [
                '산업용 로봇 및 자동화 라인',
                'AI 안전 시스템 및 모니터링',
                '스마트 팩토리 총합 솔루션',
                'AGV 및 물류 자동화'
            ],
            targetAudience: '자동화 담당자, 로봇 기술팀, 스마트 팩토리 기획팀',
            expectedVisitors: '8만명+',
            exhibitorCount: '500개사'
        }
    },
    {
        id: 's-factory-2026',
        name: 'Shenzhen Smart Factory & Automation',
        category: '스마트건설',
        location: '선전 (Shenzhen World Expo)',
        country: '중국',
        startDate: '2026-10-27',
        endDate: '2026-10-29',
        description: '★★★★☆ [하반기] 스마트 시공 로봇, 디지털 트윈 현장 관리',
        website: 'http://www.s-factoryexpo.com',
        isRecommended: true,
        priority: 2,
        season: 'H2',
        detailedInfo: {
            exhibitionDetails: '선전 스마트 팩토리 및 자동화 전시회입니다. 건설 현장에 적용 가능한 스마트 시공 로봇, 디지털 트윈 현장 관리 시스템, IoT 센서 등이 전시됩니다.',
            keyHighlights: [
                '스마트 시공 로봇 및 자동화 장비',
                '디지털 트윈 기반 현장 관리',
                'IoT 센서 및 실시간 모니터링',
                '제조 실행 시스템(MES) 솔루션'
            ],
            targetAudience: '스마트건설 팀, 디지털 혁신팀, 현장관리자',
            expectedVisitors: '6만명+',
            exhibitorCount: '400개사'
        }
    },
    {
        id: 'chtf-2026',
        name: 'China Hi-Tech Fair (CHTF)',
        category: '첨단기술 & AI',
        location: '선전 (Convention Center)',
        country: '중국',
        startDate: '2026-11-15',
        endDate: '2026-11-19',
        description: '★★★★★ [하반기] 종합 AI, 드론 현장 감시, 스마트 도시 기술 (중국 최대)',
        website: 'https://www.chtf.com',
        isRecommended: true,
        priority: 3,
        season: 'H2',
        detailedInfo: {
            exhibitionDetails: '중국 최대 첨단 기술 종합 박람회입니다. AI, 드론, 로봇, 스마트 도시 기술 등 모든 첨단 기술이 한자리에 모입니다. 건설 분야에서는 드론 현장 감시, AI 안전 관리, 스마트 시티 솔루션 등을 확인할 수 있습니다.',
            keyHighlights: [
                '종합 AI 기술 및 솔루션',
                '드론 기반 현장 감시 시스템',
                '스마트 도시 인프라 기술',
                '중국 첨단 기술 총집합'
            ],
            targetAudience: 'AI 기술팀, 스마트시티 연구팀, 드론 운영팀',
            expectedVisitors: '50만명+',
            exhibitorCount: '3,000개사'
        }
    },

    // [광저우 기타 박람회]
    {
        id: 'gebt-2026',
        name: 'Guangzhou Electrical Building Tech (GEBT)',
        category: '스마트건설',
        location: '광저우 (China Import & Export Fair)',
        country: '중국',
        startDate: '2026-06-09',
        endDate: '2026-06-12',
        description: '스마트 빌딩 솔루션, AI 안전 진단 시스템',
        website: 'https://gebt.hk.messefrankfurt.com',
        isRecommended: false,
        detailedInfo: {
            exhibitionDetails: '광저우 전기 및 빌딩 기술 박람회입니다. 스마트 빌딩 솔루션, 전기 설비, AI 기반 안전 진단 시스템, 빌딩 자동화 등이 전시됩니다.',
            keyHighlights: [
                '스마트 빌딩 통합 관리 시스템',
                '전기 설비 및 자동화',
                'AI 기반 설비 안전 진단',
                '빌딩 에너지 관리 솔루션'
            ],
            targetAudience: '전기설비팀, 스마트빌딩 담당자, 설비관리팀',
            expectedVisitors: '3만명+',
            exhibitorCount: '300개사'
        }
    },

    // [3순위] 상하이 (Shanghai) - 세계적 규모
    {
        id: 'waic-2026',
        name: 'World Artificial Intelligence Conference (WAIC)',
        category: 'AI & 로봇',
        location: '상하이',
        country: '중국',
        startDate: '2026-07-01', // 예상
        endDate: '2026-07-04',
        description: 'AI 건설 응용 핵심 플랫폼 (상하이 개최)',
        website: 'http://www.worldaic.com.cn',
        isRecommended: false, // 선전 우선이므로 추천 제외
        detailedInfo: {
            exhibitionDetails: '세계 인공지능 컨퍼런스로 중국 최대 AI 전문 행사입니다. AI 건설 응용 플랫폼, 머신러닝, 컴퓨터 비전 등 AI 핵심 기술과 건설 산업 적용 사례를 확인할 수 있습니다.',
            keyHighlights: [
                'AI 건설 응용 플랫폼 및 솔루션',
                '머신러닝 및 딥러닝 기술',
                '컴퓨터 비전 및 이미지 인식',
                'AI 스타트업 네트워킹'
            ],
            targetAudience: 'AI 연구팀, 데이터 사이언스팀, 디지털 혁신팀',
            expectedVisitors: '30만명+',
            exhibitorCount: '1,000개사'
        }
    },
    {
        id: 'woc-asia-2026',
        name: 'World of Concrete Asia',
        category: '스마트건설',
        location: '상하이 (SNIEC)',
        country: '중국',
        startDate: '2026-08-12',
        endDate: '2026-08-14',
        description: '콘크리트 시공, 철근 가공, 바닥재 로봇 (아시아 최대 콘크리트 행사)',
        website: 'https://en.wocasia.cn',
        isRecommended: true,
        detailedInfo: {
            exhibitionDetails: '아시아 최대 콘크리트 박람회입니다. 콘크리트 시공 기술, 철근 가공 자동화, 바닥재 로봇, PC 부재 제작 등 콘크리트 관련 모든 기술을 한번에 확인할 수 있습니다.',
            keyHighlights: [
                '콘크리트 타설 및 마감 자동화',
                '철근 가공 및 배근 로봇',
                '바닥재 시공 로봇 및 모바일 장비',
                'PC 부재 제작 자동화'
            ],
            targetAudience: '콘크리트팀, 골조팀, 기술연구소',
            expectedVisitors: '6만명+',
            exhibitorCount: '400개사'
        }
    },
    {
        id: 'bauma-china-2026',
        name: 'bauma CHINA 2026',
        category: '스마트건설',
        location: '상하이 (SNIEC)',
        country: '중국',
        startDate: '2026-11-24',
        endDate: '2026-11-27',
        description: '★★★★★ [하반기 최우선] 전 세계 건설 기술의 정점, 스마트 굴착기 (2년 주기 대형 전시)',
        website: 'https://www.bauma-china.com',
        isRecommended: true,
        priority: 4,
        season: 'H2',
        detailedInfo: {
            exhibitionDetails: '세계 최대 건설 기계 박람회인 bauma의 중국 버전입니다. 스마트 굴삭기, 건설 중장비, 철근 가공 로봇, 콘크리트 장비 등 건설 장비의 모든 것이 전시되는 2년 주기 대형 행사입니다.',
            keyHighlights: [
                '스마트 굴삭기 및 중장비 종합 전시',
                '철근 가공 로봇 및 자동화 라인',
                '콘크리트 타설 및 펌프 장비',
                '건설 기술의 정점, 2년 주기 대형 행사'
            ],
            targetAudience: '중장비팀, 골조팀, 기술연구소, 장비구매팀',
            expectedVisitors: '20만명+',
            exhibitorCount: '3,000개사'
        }
    },

    // [독일] Hannover Messe - 상반기 추천
    {
        id: 'hannover-messe-2026',
        name: 'Hannover Messe',
        category: '첨단기술 & AI',
        location: '하노버',
        country: '독일',
        startDate: '2026-04-20',
        endDate: '2026-04-24',
        description: '★★★★☆ 세계를 선도하는 산업 기술 박람회',
        website: 'https://www.hannovermesse.de/',
        isRecommended: true,
        priority: 3,
        season: 'H1',
        detailedInfo: {
            exhibitionDetails: '세계 최대 산업 기술 박람회로, 자동화, 로봇, AI, 디지털 트윈, 에너지 기술 등 모든 산업 분야의 첨단 기술이 공개됩니다. Industry 4.0 및 스마트 팩토리 솔루션의 메카입니다.',
            keyHighlights: [
                '산업용 로봇 및 자동화 시스템',
                'AI 기반 제조 실행 시스템',
                '디지털 트윤 및 IoT 플랫폼',
                '에너지 효율 및 지속가능성 기술'
            ],
            targetAudience: '제조업 혁신팀, 자동화 전문가, Industry 4.0 연구자',
            expectedVisitors: '20만명+',
            exhibitorCount: '4,000개사'
        }
    },
    {
        id: 'automate-2026',
        name: 'Automate 2026',
        category: 'AI & 로봇',
        location: '디트로이트',
        country: '미국',
        startDate: '2026-06-22',
        endDate: '2026-06-25',
        description: '북미에서 선도하는 자동화 쇼케이스',
        website: 'https://www.automateshow.com/',
        detailedInfo: {
            exhibitionDetails: '북미 최대 자동화 박람회입니다. 산업용 로봇, 비전 시스템, AGV, 협동로봇 등 모든 종류의 자동화 솔루션이 전시되며, 북미 시장 트렌드를 파악할 수 있습니다.',
            keyHighlights: [
                '산업용 로봇 및 협동로봇',
                '비전 시스템 및 AI 응용',
                'AGV 및 물류 자동화',
                '북미 자동화 시장 트렌드'
            ],
            targetAudience: '자동화 담당자, 로봇 기술팀, 북미 시장 조사팀',
            expectedVisitors: '2.5만명+',
            exhibitorCount: '550개사'
        }
    },

    // 일본 박람회
    {
        id: 'japan-build-tokyo-2026',
        name: 'JAPAN BUILD TOKYO 2026 (도고 건설산업전)',
        category: '스마트건설',
        location: '도쿄 (Tokyo Big Sight)',
        country: '일본',
        startDate: '2026-12-08',
        endDate: '2026-12-10',
        description: '일본 최대 건설 종합 박람회, 스마트하우스 및 시공 기술',
        website: 'https://www.japan-build.jp/tokyo/',
        detailedInfo: {
            exhibitionDetails: '일본 최대 건설 종합 박람회입니다. 스마트하우스, 시공 기술, 건자재, 내장재 등 건설의 모든 분야가 한번에 전시되는 종합 행사입니다.',
            keyHighlights: [
                '스마트하우스 기술 및 솔루션',
                '일본식 시공 기술 및 장비',
                '고품질 건자재 및 내장재',
                '건설 종합 전시회'
            ],
            targetAudience: '건축팀, 시공팀, 자재구매팀, 일본 기술 연구자',
            expectedVisitors: '3만명+',
            exhibitorCount: '400개사'
        }
    },
    // [일본] iREX - 하반기 추천
    {
        id: 'irex-osaka-2026',
        name: 'iREX 2026 (국제로봇전)',
        category: 'AI & 로봇',
        location: '오사카 (INTEX Osaka)',
        country: '일본',
        startDate: '2026-11-25',
        endDate: '2026-11-28',
        description: '★★★★☆ 일본 최대 국제 로봇 전시회 (2년 주기), 산업용 로봇 & AI',
        website: 'https://biz.nikkan.co.jp/eve/irex/',
        isRecommended: true,
        priority: 1,
        season: 'H2',
        detailedInfo: {
            exhibitionDetails: '일본 최대 국제 로봇 전시회로 2년마다 개최됩니다. 산업용 로봇, 협동로봇, AI 로봇, 서비스 로봇 등 모든 종류의 로봇 기술이 전시되며, 특히 일본의 정밀 로봇 기술을 확인할 수 있습니다.',
            keyHighlights: [
                '6축 산업용 로봇 및 정밀 제어',
                '협동로봇(Cobot) 및 안전 기술',
                'AI 비전 시스템 및 머신러닝',
                '건설 현장 적용 사례 및 데모'
            ],
            targetAudience: '로봇 기술팀, 자동화 엔지니어, 스마트건설 연구소',
            expectedVisitors: '13만명+',
            exhibitorCount: '600개사'
        }
    },
    {
        id: 'ai-expo-tokyo-2026',
        name: 'AI EXPO TOKYO 2026',
        category: '첨단기술 & AI',
        location: '도쿄 (Tokyo Big Sight)',
        country: '일본',
        startDate: '2026-09-30',
        endDate: '2026-10-02',
        description: '일본 최대 AI 기술 전시회, 비전 AI, 기계 학습',
        website: 'https://www.ai-expo.jp/tokyo/',
        detailedInfo: {
            exhibitionDetails: '일본 최대 AI 기술 전시회입니다. 비전 AI, 기계 학습, 딕러닝 등 AI 핵심 기술과 건설 산업 적용 사례를 확인할 수 있으며, 일본의 정밀 AI 기술을 경험할 수 있습니다.',
            keyHighlights: [
                '비전 AI 및 이미지 인식 기술',
                '기계 학습 및 딕러닝 플랫폼',
                'AI 산업 응용 사례',
                '일본 정밀 AI 기술'
            ],
            targetAudience: 'AI 연구팀, 머신러닝 엔지니어, 디지털 혁신팀',
            expectedVisitors: '4만명+',
            exhibitorCount: '250개사'
        }
    }
];
