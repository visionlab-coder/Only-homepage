import Head from 'next/head';
import Link from 'next/link';
import TrendCard from '../components/TrendCard';
import { trendsData } from '../data/trends';
import { useState } from 'react';
import { useDeviceMode } from '../contexts/DeviceModeContext';
import dynamic from 'next/dynamic';

// Gravity Hero는 클라이언트 사이드에서만 렌더링 (Three.js + Matter.js)
const GravityHero = dynamic(
    () => import('../components/HeroSection/GravityHero'),
    {
        ssr: false,
        loading: () => (
            <div className="w-screen h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mb-4"></div>
                    <p className="text-cyan-400 text-xl font-mono">INITIALIZING GRAVITY PROTOCOL...</p>
                </div>
            </div>
        )
    }
);


export default function Home() {
    console.log('[Deploy Check] Version 0.1.2 - Dependency Fixed');
    const { isMobileMode } = useDeviceMode();
    const [filter, setFilter] = useState<string>('전체');

    const categories = ['전체', '첨단기술 & AI', '스마트 시공 전략', 'AI & 로봇'];

    const filteredTrends = filter === '전체'
        ? trendsData
        : trendsData.filter(trend => trend.category === filter);

    return (
        <>
            <Head>
                <title>미래전략TF | 서원토건</title>
                <meta name="description" content="건설의 미래를 만드는 AI & 스마트건설 기술 선도 기업" />
            </Head>

            <div className="bg-white">
                {/* Hero Section - Gravity Protocol */}
                <GravityHero />

                {/* 통계 섹션 */}
                <section className="py-12 md:py-24 bg-gray-50">
                    <div className="container-minimal">
                        <div className={isMobileMode ? "grid grid-cols-1 gap-4 max-w-5xl mx-auto" : "grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto"}>
                            {/* Stat 1 */}
                            <div className="stat-minimal">
                                <div className="text-3xl md:text-5xl font-bold text-black mb-2 md:mb-3">158억 달러</div>
                                <div className="text-gray-600 text-sm md:text-base">2026년 글로벌 AI 건설 시장</div>
                            </div>

                            {/* Stat 2 */}
                            <div className="stat-minimal">
                                <div className="text-3xl md:text-5xl font-bold text-black mb-2 md:mb-3">2030</div>
                                <div className="text-gray-600 text-sm md:text-base">미래 비전 선포</div>
                                <div className="mt-2 md:mt-4 text-xs md:text-sm text-gray-500">
                                    1.1조원 수주 · 1조원 매출
                                </div>
                            </div>

                            {/* Stat 3 */}
                            <div className="stat-minimal">
                                <div className="text-3xl md:text-5xl font-bold text-black mb-2 md:mb-3">4+</div>
                                <div className="text-gray-600 text-sm md:text-base">AI 혁신 프로젝트</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 트렌드 섹션 */}
                <section className="section-spacing pb-0">
                    <div className="container-minimal">
                        {/* 섹션 헤더 */}
                        <div className="text-center mb-8 md:mb-16">
                            <h2 className="section-title">2026 스마트건설 트렌드</h2>
                            <p className="section-subtitle mt-4">
                                건설 산업을 혁신하는 최첨단 기술
                            </p>
                        </div>

                        {/* 필터 */}
                        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setFilter(category)}
                                    className={`filter-btn ${filter === category ? 'active' : ''}`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* 트렌드 그리드 */}
                        <div className={isMobileMode ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"}>
                            {filteredTrends.map((trend) => (
                                <TrendCard key={trend.id} trend={trend} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* 미래전략TF 마일스톤 섹션 추가 */}
                <section className="py-16 md:py-32">
                    <div className="container-minimal bg-gray-50 rounded-[2rem] md:rounded-[4rem] p-8 md:p-20 overflow-hidden relative group">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
                            <div className="flex-1 text-center md:text-left">
                                <span className="text-blue-600 font-bold text-xs md:text-sm tracking-widest uppercase mb-4 block">
                                    TF Performance & Record
                                </span>
                                <h2 className="text-3xl md:text-5xl font-bold text-black mb-6 leading-tight">
                                    미래전략TF<br />눈부신 성장의 기록
                                </h2>
                                <p className="text-gray-500 text-sm md:text-lg mb-8 max-w-lg leading-relaxed">
                                    1월 성균관대 MOU부터 2월 과천G타운 현장 답사까지,<br className="hidden md:block" />
                                    미래를 향한 TF의 모든 발자취를 투명하게 공유합니다.
                                </p>
                                <Link href="/tf-activities" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all group-hover:scale-105 duration-300 shadow-xl">
                                    마일스톤 전체보기
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                            <div className="flex-1 w-full max-w-md relative">
                                {/* 데코레이티브 타임라인 프리뷰 */}
                                <div className="space-y-4">
                                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 translate-x-4 md:translate-x-12 opacity-80">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">02.24</div>
                                        <div className="font-bold text-gray-800 text-sm md:text-base truncate">과천G타운 현장 답사 (성대 김한선박사팀)</div>
                                    </div>
                                    <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4 relative z-20">
                                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">01.26</div>
                                        <div className="font-bold text-black text-sm md:text-base truncate">미래전략TF 본사 출장 및 SAFE-LINK 발표</div>
                                    </div>
                                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 -translate-x-4 md:-translate-x-12 opacity-80">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">01.14</div>
                                        <div className="font-bold text-gray-800 text-sm md:text-base truncate">성균관대학교 건설환경공학부 MOU 진행</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA 섹션 */}
                <section className="py-12 md:py-24 bg-black text-white">
                    <div className="container-minimal text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                            함께 미래를<br />
                            만들어갑니다
                        </h2>
                        <p className="text-base md:text-xl text-gray-400 mb-6 md:mb-10">
                            서원토건은 2026년 글로벌 박람회를 통해<br />최신 스마트건설 기술을 도입합니다
                        </p>
                        <Link href="/collaboration">
                            <button className="btn-accent">
                                산학협력 자세히 보기
                            </button>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
