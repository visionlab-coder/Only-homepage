// 서원토건 미래전략TF 인가 사용자 (13명)
export interface User {
    id: string;
    username: string;
    password: string; // 실제 운영 환경에서는 해시된 비밀번호 사용
    name: string;
    position: string;
    track?: string;
    role: 'ceo' | 'executive' | 'leader' | 'member' | 'observer';
}

export const authorizedUsers: User[] = [
    // 원청 건설사 (Observer)
    {
        id: 'external-observer-psml',
        username: 'psml',
        password: '1111',
        name: 'PSML',
        position: 'Observer',
        role: 'observer'
    },
    // CEO (대표이사)
    {
        id: 'ceo-kim-jin-hwan',
        username: 'ceo',
        password: 'seowon2030!',
        name: '김진환',
        position: '대표이사',
        role: 'ceo'
    },
    // 총괄 책임임원
    {
        id: 'executive-lee-kang-beom',
        username: 'lkb',
        password: 'seowon2030',
        name: '이강범',
        position: '전무 (총괄 책임임원)',
        role: 'executive'
    },
    // 기획/총괄
    {
        id: 'kim-mu-bin',
        username: 'kmb',
        password: 'woaini96!!',
        name: '김무빈',
        position: '팀장',
        track: 'management',
        role: 'leader'
    },
    // 시공 트랙
    {
        id: 'yoo-byung-ki',
        username: 'ybk',
        password: 'seowon2026',
        name: '예병기',
        position: '이사',
        track: 'construction',
        role: 'member'
    },
    {
        id: 'song-kyu-nam',
        username: 'skn',
        password: 'seowon2026',
        name: '송규남',
        position: '차장',
        track: 'construction',
        role: 'member'
    },
    // 원가 트랙
    {
        id: 'hwang-se-won',
        username: 'hsw',
        password: 'seowon2026',
        name: '황세원',
        position: '차장',
        track: 'cost',
        role: 'member'
    },
    {
        id: 'um-tae-hyun',
        username: 'uth',
        password: 'seowon2026',
        name: '엄태현',
        position: '과장',
        track: 'cost',
        role: 'member'
    },
    {
        id: 'sim-wan-su',
        username: 'sws',
        password: 'seowon2026',
        name: '심완수',
        position: '과장',
        track: 'cost',
        role: 'member'
    },
    // 안전 트랙
    {
        id: 'lim-sung-yoon',
        username: 'lsy',
        password: 'seowon2026',
        name: '임성윤',
        position: '차장',
        track: 'safety',
        role: 'member'
    },
    {
        id: 'lee-sang-hun',
        username: 'lsh',
        password: 'seowon2026',
        name: '이상헌',
        position: '대리',
        track: 'safety',
        role: 'member'
    },
    // 품질 트랙
    {
        id: 'jung-hee-joong',
        username: 'jhj',
        password: 'seowon2026',
        name: '정희중',
        position: '부장',
        track: 'quality',
        role: 'member'
    },
    // 구매 트랙
    {
        id: 'kim-ga-yoon',
        username: 'kgy',
        password: 'seowon2026',
        name: '김가윤',
        position: '과장',
        track: 'procurement',
        role: 'member'
    },
    // 전산/데이터 트랙
    {
        id: 'chun-ji-yeon',
        username: 'cjy',
        password: 'seowon2026',
        name: '천지연',
        position: '대리',
        track: 'it-data',
        role: 'member'
    }
];

// 로그인 검증 함수 (비동기 - Supabase 동기화 지원)
export async function validateUser(username: string, password: string): Promise<User | null> {
    // 사용자 찾기
    const user = authorizedUsers.find(u => u.username === username);

    if (!user) {
        return null;
    }

    // 1. Supabase에서 원격 비밀번호 확인 (크로스 브라우저/기기 동기화)
    try {
        const { getRemotePassword } = await import('../lib/supabase');
        const remotePassword = await getRemotePassword(user.id);
        if (remotePassword) {
            // 원격 비밀번호가 있으면 로컬에도 동기화
            if (typeof window !== 'undefined') {
                const passwordChanges = JSON.parse(localStorage.getItem('password_changes') || '{}');
                passwordChanges[user.id] = { newPassword: remotePassword };
                localStorage.setItem('password_changes', JSON.stringify(passwordChanges));
            }
            return password === remotePassword ? user : null;
        }
    } catch (e) {
        console.log('Supabase 연결 실패, 로컬 확인으로 폴백');
    }

    // 2. 로컬 스토리지에서 비밀번호 변경 기록 확인 (폴백)
    if (typeof window !== 'undefined') {
        const passwordChanges = JSON.parse(localStorage.getItem('password_changes') || '{}');
        const changedPassword = passwordChanges[user.id]?.newPassword;

        if (changedPassword) {
            return password === changedPassword ? user : null;
        }
    }

    // 3. 변경 기록이 없으면 기본 비밀번호로 확인
    return password === user.password ? user : null;
}
