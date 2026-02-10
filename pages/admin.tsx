import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { authorizedUsers, User } from '../data/users';
import { syncPassword, getAllRemotePasswords } from '../lib/supabase';
import { useDeviceMode } from '../contexts/DeviceModeContext';

export default function AdminPanel() {
    const router = useRouter();
    const { user } = useAuth();
    const { isMobileMode } = useDeviceMode();
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [newPassword, setNewPassword] = useState('');
    const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
    const [passwordChanges, setPasswordChanges] = useState<Record<string, any>>({});
    const [isLoading, setIsLoading] = useState(false);

    // 데이터 로드 함수
    const loadData = async () => {
        setIsLoading(true);
        if (typeof window !== 'undefined') {
            const localChanges = JSON.parse(localStorage.getItem('password_changes') || '{}');
            const remoteChanges = await getAllRemotePasswords();
            const combinedChanges = { ...localChanges, ...remoteChanges };
            setPasswordChanges(combinedChanges);
            setUsers([...authorizedUsers]);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (!user || user.id !== 'kim-mu-bin') {
            router.push('/');
            return;
        }
        loadData();

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'password_changes') {
                loadData();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [user, router]);

    const getDisplayPassword = (u: User) => {
        const changed = passwordChanges[u.id]?.newPassword;
        return changed || u.password;
    };

    const toggleVisibility = (userId: string) => {
        setVisiblePasswords(prev => ({
            ...prev,
            [userId]: !prev[userId]
        }));
    };

    const handleResetPassword = (targetUser: User) => {
        setSelectedUser(targetUser);
        setNewPassword('');
    };

    const confirmPasswordReset = async () => {
        if (!selectedUser || !newPassword) {
            alert('새 비밀번호를 입력하세요.');
            return;
        }

        const currentChanges = JSON.parse(localStorage.getItem('password_changes') || '{}');
        const updatedChanges = { ...currentChanges };

        updatedChanges[selectedUser.id] = {
            newPassword: newPassword,
            changedBy: user?.name,
            changedAt: new Date().toISOString()
        };

        localStorage.setItem('password_changes', JSON.stringify(updatedChanges));
        await syncPassword(selectedUser.id, newPassword);
        setPasswordChanges(updatedChanges);

        alert(`${selectedUser.name}님의 비밀번호가 재설정되었습니다.`);
        setSelectedUser(null);
        setNewPassword('');
    };

    const getRoleLabel = (role: string) => {
        const labels: Record<string, string> = {
            'ceo': 'CEO',
            'executive': 'EXEC',
            'leader': 'LEAD',
            'member': 'MEMBER'
        };
        return labels[role] || 'MEMBER';
    };

    if (!user || user.id !== 'kim-mu-bin') return null;

    // 모바일 카드 뷰
    const MobileUserCard = ({ u, index }: { u: User; index: number }) => (
        <div
            className="bg-white rounded-2xl border border-gray-100 p-5 transition-all hover:border-gray-300 hover:shadow-lg animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
        >
            {/* 상단: 이름 & 역할 */}
            <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-white font-bold text-lg">
                        {u.name.charAt(0)}
                    </div>
                    <div>
                        <div className="font-bold text-black text-lg">{u.name}</div>
                        <div className="text-gray-400 text-sm">{u.position}</div>
                    </div>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider bg-gray-100 text-gray-600">
                    {getRoleLabel(u.role)}
                </span>
            </div>

            {/* 중앙: 아이디 & 비밀번호 */}
            <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                    <span className="text-gray-400 text-sm">아이디</span>
                    <span className="font-mono text-black font-medium">{u.username}</span>
                </div>

                <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                    <span className="text-gray-400 text-sm">비밀번호</span>
                    <div className="flex items-center gap-3">
                        <span className="font-mono text-black">
                            {visiblePasswords[u.id] ? getDisplayPassword(u) : '········'}
                        </span>
                        <button
                            onClick={() => toggleVisibility(u.id)}
                            className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-gray-300 transition-all"
                        >
                            {visiblePasswords[u.id] ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* 하단: 비밀번호 재설정 버튼 */}
            <button
                onClick={() => handleResetPassword(u)}
                className="w-full py-3 rounded-xl font-semibold text-sm transition-all bg-gray-100 text-gray-700 hover:bg-black hover:text-white"
            >
                비밀번호 재설정
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>관리자 패널 | 서원토건</title>
            </Head>

            <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
                {/* 헤더 */}
                <div className="mb-8 md:mb-10 animate-fade-in">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-2 block">
                                Admin Panel
                            </span>
                            <h1 className="text-2xl md:text-4xl font-bold text-black mb-2">
                                관리 시스템
                            </h1>
                            <div className="flex flex-wrap items-center gap-3">
                                <p className="text-gray-500 text-sm">인가 사용자 {users.length}명 계정 관리</p>
                                <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide bg-black text-white">
                                    Remote DB Online
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={loadData}
                            disabled={isLoading}
                            className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 px-5 py-3 rounded-xl text-sm font-medium transition-all border border-gray-200 hover:border-gray-300 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>동기화 중...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    <span>새로고침</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* 모바일: 카드 그리드 / 데스크톱: 테이블 */}
                {isMobileMode ? (
                    <div className="grid grid-cols-1 gap-4">
                        {users.map((u, index) => (
                            <MobileUserCard key={u.id} u={u} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm animate-fade-in">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">이름</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">아이디</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">비밀번호</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">역할</th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400 text-right">관리</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {users.map((u, index) => (
                                    <tr
                                        key={u.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white font-bold text-sm">
                                                    {u.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-black">{u.name}</div>
                                                    <div className="text-xs text-gray-400">{u.position}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-black font-medium">{u.username}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="font-mono text-gray-600 min-w-[100px]">
                                                    {visiblePasswords[u.id] ? getDisplayPassword(u) : '········'}
                                                </span>
                                                <button
                                                    onClick={() => toggleVisibility(u.id)}
                                                    className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-200 transition-all"
                                                >
                                                    {visiblePasswords[u.id] ? (
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                                    ) : (
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider bg-gray-100 text-gray-600">
                                                {getRoleLabel(u.role)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleResetPassword(u)}
                                                className="bg-gray-100 hover:bg-black text-gray-700 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                                            >
                                                비밀번호 재설정
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* 재설정 모달 */}
                {selectedUser && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                        <div className="bg-white p-6 md:p-8 rounded-2xl max-w-sm w-full shadow-2xl">
                            {/* 아바타 */}
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center text-white font-bold text-2xl">
                                    {selectedUser.name.charAt(0)}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-1 text-center text-black">{selectedUser.name}</h3>
                            <p className="text-gray-400 text-sm mb-6 text-center">새로운 비밀번호를 입력해 주세요</p>

                            <input
                                type="text"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 mb-6 focus:ring-2 focus:ring-black focus:border-transparent outline-none text-black placeholder-gray-400 transition-all"
                                placeholder="새 비밀번호"
                            />

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setSelectedUser(null)}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 py-3.5 rounded-xl font-bold transition-all text-gray-700"
                                >
                                    취소
                                </button>
                                <button
                                    onClick={confirmPasswordReset}
                                    className="flex-1 bg-black hover:bg-gray-800 py-3.5 rounded-xl font-bold transition-all text-white"
                                >
                                    변경 적용
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
