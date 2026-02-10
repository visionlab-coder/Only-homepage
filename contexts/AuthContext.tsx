import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, authorizedUsers } from '../data/users';
import { getRemotePassword } from '../lib/supabase';

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    // 페이지 로드 시 세션 복원
    useEffect(() => {
        const savedUser = localStorage.getItem('seowon_tf_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                localStorage.removeItem('seowon_tf_user');
            }
        }
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        // 1. 사용자 찾기
        const foundUser = authorizedUsers.find(u => u.username === username);
        if (!foundUser) return false;

        // 로컬 개발 환경 체크
        const isLocalDev = typeof window !== 'undefined' &&
            (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

        // 2. 비밀번호 결정 로직
        let actualPassword = foundUser.password;

        // 로컬 환경에서는 Supabase 호출 건너뛰기 (빠른 로그인)
        if (!isLocalDev) {
            // DB에서 최신 바뀐 비밀번호 가져오기 시도 (프로덕션만)
            const remotePassword = await getRemotePassword(foundUser.id);
            if (remotePassword) {
                actualPassword = remotePassword;
            } else {
                // DB에 없으면 로컬 기록 확인 (기존 방식 유지)
                const localChanges = JSON.parse(localStorage.getItem('password_changes') || '{}');
                if (localChanges[foundUser.id]?.newPassword) {
                    actualPassword = localChanges[foundUser.id].newPassword;
                }
            }
        } else {
            console.log('[DEV] Skipping Supabase password check for local development');
        }

        // 3. 검증
        if (password === actualPassword) {
            setUser(foundUser);
            const { password: _, ...userWithoutPassword } = foundUser;
            localStorage.setItem('seowon_tf_user', JSON.stringify(userWithoutPassword));
            return true;
        }

        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('seowon_tf_user');
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
