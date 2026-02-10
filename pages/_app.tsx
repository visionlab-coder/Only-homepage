import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { DeviceModeProvider, useDeviceMode } from '../contexts/DeviceModeContext';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const [isLocalDev, setIsLocalDev] = React.useState(false);
    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
        // 클라이언트에서만 로컬 환경 체크
        setMounted(true);
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        setIsLocalDev(isLocal);

        // 프로덕션에서만 로그인 체크
        const isProtectedPath = router.pathname === '/admin' || router.pathname === '/profile';
        if (!isAuthenticated && isProtectedPath) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    // 마운트되기 전에는 로딩 표시 (SSR과 일치)
    if (!mounted) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400 mb-4"></div>
                    <p className="text-cyan-400 font-mono">LOADING...</p>
                </div>
            </div>
        );
    }

    // 로컬 개발 환경에서는 인증 없이 바로 통과
    if (isLocalDev) {
        return <>{children}</>;
    }

    // 로그인 페이지, 우리 미래 페이지 및 일반 공개 페이지는 인증 없이 접근 가능
    const isPublicPath = !['/admin', '/profile'].includes(router.pathname);
    if (isPublicPath || router.pathname === '/login') {
        return <>{children}</>;
    }

    // 인증되지 않은 경우 로딩 표시
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400 mb-4"></div>
                    <p className="text-cyan-400 font-mono">AUTHENTICATING...</p>
                </div>
            </div>
        );
    }

    // 인증된 경우 정상 렌더링
    return <>{children}</>;
}

function AppContent({ Component, pageProps }: AppProps) {
    const { isMobileMode, toggleDeviceMode } = useDeviceMode();
    const router = useRouter();

    const isLoginPage = router.pathname === '/login';
    const hideLayout = isLoginPage;

    return (
        <ProtectedRoute>
            <div className={`min-h-screen transition-colors duration-300 ${isMobileMode ? 'bg-[#1a1a1a] flex items-center justify-center p-4' : ''}`}>
                {/* Mobile Frame Container */}
                <div className={`
                    flex flex-col min-h-screen transition-all duration-500 ease-in-out bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
                    ${isMobileMode
                        ? 'w-[430px] max-w-full h-[932px] max-h-[90vh] rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] border-[8px] border-[#2a2a2a] overflow-hidden relative'
                        : 'w-full'}
                `}>
                    {/* iPhone Dynamic Island Simulation (Only in Mobile Mode) */}
                    {isMobileMode && (
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black rounded-full z-50 pointer-events-none"></div>
                    )}

                    <div className="flex-grow overflow-y-auto no-scrollbar relative">
                        {!hideLayout && <Header />}
                        <main className="flex-grow">
                            <Component {...pageProps} />
                        </main>
                        {!hideLayout && <Footer />}
                    </div>
                </div>

                {/* Toggle Button (Fixed Position) - Hide on login page and public page */}
                {!hideLayout && (
                    <button
                        onClick={toggleDeviceMode}
                        className="fixed bottom-8 right-8 z-[9999] bg-white text-slate-900 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group flex items-center gap-2 font-bold ring-4 ring-white/20"
                        title={isMobileMode ? "PC 뷰로 전환" : "모바일 뷰로 전환"}
                    >
                        <span className="text-2xl">{isMobileMode ? '💻' : '📱'}</span>
                        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
                            {isMobileMode ? 'PC 모드' : '모바일 모드'}
                        </span>
                    </button>
                )}
            </div>
        </ProtectedRoute>

    );
}

export default function App(props: AppProps) {
    return (
        <AuthProvider>
            <DeviceModeProvider>
                <AppContent {...props} />
            </DeviceModeProvider>
        </AuthProvider>
    );
}
