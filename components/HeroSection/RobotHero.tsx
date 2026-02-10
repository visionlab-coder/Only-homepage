import { useDeviceMode } from '../../contexts/DeviceModeContext';
import Link from 'next/link';

export default function RobotHero() {
    const { isMobileMode } = useDeviceMode();

    return (
        <section className="relative w-full min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center overflow-hidden">
            {/* 배경 애니메이션 효과 */}
            <div className="absolute inset-0">
                {/* 그리드 패턴 */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px'
                    }}
                />

                {/* 빛나는 원들 */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl" />
            </div>

            {/* 로봇 아이콘 (SVG) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
                <svg
                    width={isMobileMode ? "300" : "500"}
                    height={isMobileMode ? "300" : "500"}
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="animate-pulse"
                >
                    {/* 로봇 헤드 */}
                    <rect x="60" y="30" width="80" height="60" rx="10" fill="currentColor" className="text-cyan-400" />
                    {/* 눈 */}
                    <circle cx="85" cy="55" r="8" fill="currentColor" className="text-white" />
                    <circle cx="115" cy="55" r="8" fill="currentColor" className="text-white" />
                    <circle cx="85" cy="55" r="4" fill="currentColor" className="text-cyan-900" />
                    <circle cx="115" cy="55" r="4" fill="currentColor" className="text-cyan-900" />
                    {/* 안테나 */}
                    <rect x="95" y="15" width="10" height="20" rx="5" fill="currentColor" className="text-cyan-400" />
                    <circle cx="100" cy="12" r="6" fill="currentColor" className="text-cyan-300" />
                    {/* 몸통 */}
                    <rect x="55" y="95" width="90" height="70" rx="10" fill="currentColor" className="text-cyan-500" />
                    {/* 가슴 패널 */}
                    <rect x="70" y="110" width="60" height="40" rx="5" fill="currentColor" className="text-slate-900" />
                    <rect x="80" y="120" width="40" height="8" rx="2" fill="currentColor" className="text-cyan-400" />
                    <rect x="80" y="132" width="30" height="8" rx="2" fill="currentColor" className="text-cyan-300" />
                    {/* 팔 */}
                    <rect x="30" y="100" width="20" height="50" rx="8" fill="currentColor" className="text-cyan-400" />
                    <rect x="150" y="100" width="20" height="50" rx="8" fill="currentColor" className="text-cyan-400" />
                    {/* 다리 */}
                    <rect x="65" y="170" width="25" height="25" rx="5" fill="currentColor" className="text-cyan-400" />
                    <rect x="110" y="170" width="25" height="25" rx="5" fill="currentColor" className="text-cyan-400" />
                </svg>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                {/* 배지 */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6 backdrop-blur-sm">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="text-cyan-400 text-sm font-medium">AI & Smart Construction</span>
                </div>

                {/* 타이틀 */}
                <h1 className={`font-bold text-white mb-6 leading-tight ${isMobileMode ? 'text-4xl' : 'text-6xl md:text-7xl'}`}>
                    <span className="block">미래전략</span>
                    <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        TF
                    </span>
                </h1>

                {/* 서브타이틀 */}
                <p className={`text-slate-400 mb-8 max-w-2xl mx-auto ${isMobileMode ? 'text-lg' : 'text-xl md:text-2xl'}`}>
                    Seowon Vision 2030
                </p>

                <p className={`text-slate-500 mb-10 max-w-xl mx-auto ${isMobileMode ? 'text-sm' : 'text-base'}`}>
                    AI와 스마트건설 기술로 건설의 미래를 선도합니다
                </p>

                {/* CTA 버튼들 */}
                <div className={`flex gap-4 justify-center ${isMobileMode ? 'flex-col items-center' : 'flex-row'}`}>
                    <a
                        href="#trends"
                        className={`px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl 
                            hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/25
                            hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-1 ${isMobileMode ? 'w-full max-w-xs' : ''}`}
                    >
                        2026 트렌드 보기
                    </a>
                    <Link
                        href="/about"
                        className={`px-8 py-4 bg-white/5 border border-white/20 text-white font-semibold rounded-xl 
                            hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm
                            hover:-translate-y-1 ${isMobileMode ? 'w-full max-w-xs' : ''}`}
                    >
                        TF 소개
                    </Link>
                </div>
            </div>

            {/* 하단 스크롤 인디케이터 */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                <span className="text-slate-500 text-sm">Scroll</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-slate-500">
                    <path d="M10 14L4 8H16L10 14Z" fill="currentColor" />
                </svg>
            </div>

            {/* 장식 요소들 */}
            <div className="absolute top-20 left-10 w-20 h-20 border border-cyan-500/20 rounded-lg rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
            <div className="absolute bottom-20 right-10 w-16 h-16 border border-blue-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute top-1/3 right-20 w-4 h-4 bg-cyan-400 rounded-full animate-pulse" />
            <div className="absolute bottom-1/3 left-20 w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        </section>
    );
}
