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
                <section className="section-spacing">
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
