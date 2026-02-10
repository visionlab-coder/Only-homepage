import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useDeviceMode } from '../../contexts/DeviceModeContext';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
    const router = useRouter();
    const { isMobileMode } = useDeviceMode();
    const { user, logout } = useAuth();
    const currentPath = router.pathname;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const isActive = (path: string) => {
        if (path === '/' && currentPath === '/') return true;
        if (path !== '/' && currentPath.startsWith(path)) return true;
        return false;
    };

    const getLinkClass = (path: string) => {
        return isActive(path)
            ? "text-black font-semibold border-b-2 border-black pb-1"
            : "text-gray-600 hover:text-black transition-colors font-medium";
    };

    const getMobileLinkClass = (path: string) => {
        return isActive(path)
            ? "block py-3 px-4 text-black font-semibold bg-gray-100 rounded-lg"
            : "block py-3 px-4 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors";
    };

    const navItems = [
        { path: '/seowon-vision2030', label: '미래전략TF소개' },
        { path: '/', label: '트렌드' },
        { path: '/collaboration', label: '산학협력' },
        { path: '/organization', label: '스마트 협업' },
        { path: '/exhibitions', label: '박람회' },
    ];

    // 김무빈 팀장만 관리자 링크 표시
    const showAdminLink = user && user.id === 'kim-mu-bin';

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
            <nav className="container-minimal py-3 md:py-4">
                <div className="flex items-center justify-between">
                    {/* 로고 */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="flex items-center h-12 md:h-16">
                            <img
                                src="/images/seowon_logo_original.png"
                                alt="SEOWON"
                                className="h-12 md:h-16 w-auto object-contain"
                            />
                        </div>
                        <div className="hidden sm:flex items-center h-12 md:h-16">
                            <div className="w-px h-8 md:h-10 bg-gray-300"></div>
                        </div>
                        <div className="hidden sm:flex items-center h-12 md:h-16">
                            <span className="text-lg md:text-xl font-bold text-gray-800">
                                미래전략TF
                            </span>
                        </div>
                    </Link>

                    {/* 데스크톱 네비게이션 */}
                    <div className={isMobileMode ? "hidden" : "hidden lg:flex items-center space-x-8"}>
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={getLinkClass(item.path)}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* 관리자 링크 (CEO/리더만) */}
                        {showAdminLink && (
                            <Link
                                href="/admin"
                                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors flex items-center space-x-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>관리자</span>
                            </Link>
                        )}

                        {/* 사용자 정보 */}
                        {user && (
                            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-300">
                                <div className="hidden sm:block text-right">
                                    <div className="text-sm font-bold text-gray-900">{user.name}</div>
                                    <div className="text-xs text-gray-500 font-medium">{user.position}</div>
                                </div>
                                <Link
                                    href="/profile"
                                    className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-gray-200 transition-all overflow-hidden"
                                >
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
                                        alt="avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </Link>
                                <button
                                    onClick={logout}
                                    className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                                    title="로그아웃"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* 모바일 메뉴 버튼 */}
                    <button
                        className={isMobileMode ? "block p-2 text-gray-600 hover:text-black transition-colors" : "lg:hidden p-2 text-gray-600 hover:text-black transition-colors"}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="메뉴"
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* 모바일 메뉴 */}
                {isMobileMenuOpen && (
                    <div className={isMobileMode ? "block mt-4 pb-4 border-t border-gray-100 pt-4" : "lg:hidden mt-4 pb-4 border-t border-gray-100 pt-4"}>
                        {/* 사용자 정보 (모바일) */}
                        {user && (
                            <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                                <div className="font-semibold text-gray-800">{user.name}</div>
                                <div className="text-xs text-gray-500">{user.position}</div>
                            </div>
                        )}

                        <div className="space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={getMobileLinkClass(item.path)}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            {user && (
                                <>
                                    <Link
                                        href="/profile"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full text-left py-3 px-4 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center space-x-2 font-medium"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>내 정보</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left py-3 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center space-x-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span>로그아웃</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
