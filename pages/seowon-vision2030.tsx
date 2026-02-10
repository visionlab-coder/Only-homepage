import { useRef, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useDeviceMode } from '../contexts/DeviceModeContext';
import { useAuth } from '../contexts/AuthContext';

export default function About() {
    const { isMobileMode } = useDeviceMode();
    const { isAuthenticated } = useAuth();
    const videoRef = useRef<HTMLVideoElement>(null);
    const tracks = [
        {
            name: '시공 트랙',
            description: '현장 시공 계획, 공정 관리, 품질 확보',
            members: 2
        },
        {
            name: '원가 트랙',
            description: '예산 수립, 비용 분석, 재무 관리',
            members: 3
        },
        {
            name: '안전 트랙',
            description: '안전 정책, 현장 점검, 사고 예방',
            members: 2
        },
        {
            name: '품질 트랙',
            description: '품질 관리, 표준 준수, 시정 조치',
            members: 1
        },
        {
            name: '구매 트랙',
            description: '조달 전략, 공급망 관리, 계약 협상',
            members: 1
        },
        {
            name: '전산/데이터 트랙',
            description: '데이터 관리, IT 인프라, 시스템 구현',
            members: 1
        }
    ];

    return (
        <>
            <Head>
                <title>미래전략TF소개 | 서원토건</title>
                <meta name="description" content="서원토건 미래전략TF의 비전과 2030 전략적 목표를 소개합니다." />
            </Head>

            <div className="bg-white">
                {/* Hero Section */}
                <section className="section-spacing bg-gray-50">
                    <div className="container-minimal text-center">
                        <div className="max-w-3xl mx-auto">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-black">
                                미래전략TF
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                                서원토건의 내일을 설계하는<br />
                                디지털 트랜스포메이션의 핵심
                            </p>
                        </div>
                    </div>
                </section>

                {/* Innovation Roadmap (New section based on instruction) */}
                <section className="py-12 md:py-24 bg-gray-50 border-t border-gray-200">
                    <div className="container-minimal">
                        <div className="text-center mb-12 md:mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">Innovation Roadmap</h2>
                            <p className="text-gray-600">단계별 혁신 추진 계획</p>
                        </div>

                        <div className={isMobileMode ? "grid grid-cols-1 gap-6 max-w-5xl mx-auto" : "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"}>
                            {/* Phase 1 */}
                            <div className="relative p-6 md:p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-xl font-bold text-black mb-3">2026: 디지털 전환 시작</h3>
                                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                                    <li>스마트건설 기술 도입</li>
                                    <li>데이터 수집 체계 구축</li>
                                    <li>AI 안전관리 시스템 시범 운영</li>
                                </ul>
                            </div>
                            {/* Phase 2 */}
                            <div className="relative p-6 md:p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-xl font-bold text-black mb-3">2027-2028: 시스템 고도화</h3>
                                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                                    <li>BIM 기반 시공 표준화</li>
                                    <li>로봇 자동화 확대</li>
                                    <li>품질 관리 디지털화</li>
                                </ul>
                            </div>
                            {/* Phase 3 */}
                            <div className="relative p-6 md:p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-xl font-bold text-black mb-3">2029-2030: 목표 달성</h3>
                                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                                    <li>1.1조원 수주, 1조원 매출</li>
                                    <li>중대재해 Zero 실현</li>
                                    <li>스마트건설 선도 기업</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CEO Message - Vision 2030 - HIDE FOR VISITORS */}
                {isAuthenticated && (
                    <section className="py-12 md:py-24 bg-black text-white relative overflow-hidden">
                        <div className="absolute inset-0 opacity-5 hidden md:block">
                            <div className="absolute top-10 left-10 text-[200px] md:text-[300px] font-serif leading-none">&quot;</div>
                        </div>
                        <div className="container-minimal relative z-10">
                            <div className="max-w-4xl mx-auto">
                                {/* Section Header */}
                                <div className="text-center mb-8 md:mb-16">
                                    <div className="inline-block px-3 py-1 md:px-4 md:py-2 border border-gray-700 text-gray-400 rounded-full text-xs md:text-sm mb-4 md:mb-6">
                                        창립 34주년 기념식 & Vision 2030 선포식
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-bold mb-2">대표이사 인사말</h2>
                                </div>

                                {/* Message Content */}
                                <div className="space-y-6 md:space-y-10 text-base md:text-xl leading-relaxed text-gray-300">
                                    {/* Opening */}
                                    <div className="text-center">
                                        <p className="text-xl md:text-3xl font-light text-white leading-relaxed">
                                            서원토건은 1991년 창립 이후<br />
                                            <span className="font-bold text-white">34년</span> 동안 한결같이<br />
                                            현장을 중심으로, 기본을 지키는 건설을 해왔습니다.
                                        </p>
                                    </div>

                                    <div className="border-l-2 border-gray-700 pl-6 md:pl-8 py-4 mx-auto max-w-2xl">
                                        <p className="italic text-sm md:text-base">
                                            빠른 길보다는 바른 길을 선택했고,<br />
                                            그 선택이 오늘의 서원토건을 만들었다고 생각합니다.
                                        </p>
                                    </div>

                                    {/* Vision 2030 Introduction */}
                                    <div className="pt-4 md:pt-8 text-center">
                                        <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">
                                            이제 우리는<br />지난 시간을 돌아보는 것에 머무르지 않고,<br />앞으로의 10년을 준비하려 합니다.
                                        </p>

                                        <div className="inline-block bg-white/10 backdrop-blur px-6 py-4 md:px-8 md:py-6 rounded-lg mt-4">
                                            <p className="text-xl md:text-2xl font-bold text-white">Vision 2030</p>
                                            <p className="text-gray-400 mt-2 text-xs md:text-base">
                                                거창한 선언이 아닙니다.<br />
                                                우리 스스로에게 한 약속이고,<br />
                                                현장에서 반드시 실현해야 할 방향입니다.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Core Values - 3 Pillars */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pt-4 md:pt-8">
                                        <div className="text-center p-4 md:p-6 border border-gray-800 rounded-lg">
                                            <div className="text-2xl md:text-3xl font-bold text-white mb-2">안전</div>
                                            <p className="text-gray-400 text-sm md:text-base">선택이 아니라<br />기본이 되고</p>
                                        </div>
                                        <div className="text-center p-4 md:p-6 border border-gray-800 rounded-lg">
                                            <div className="text-2xl md:text-3xl font-bold text-white mb-2">경험</div>
                                            <p className="text-gray-400 text-sm md:text-base">감이 아닌<br />데이터가 되며</p>
                                        </div>
                                        <div className="text-center p-4 md:p-6 border border-gray-800 rounded-lg">
                                            <div className="text-2xl md:text-3xl font-bold text-white mb-2">현장</div>
                                            <p className="text-gray-400 text-sm md:text-base">사람과 기술이<br />함께 일하는</p>
                                        </div>
                                    </div>

                                    {/* Future Statement */}
                                    <div className="text-center pt-4 md:pt-8">
                                        <p className="text-lg md:text-xl text-gray-300">
                                            그것이 우리가 가고자 하는<br />
                                            <span className="text-xl md:text-2xl font-bold text-white">서원토건의 미래</span>입니다.
                                        </p>
                                    </div>

                                    {/* Closing */}
                                    <div className="border-t border-gray-800 pt-6 md:pt-10 mt-6 md:mt-10">
                                        <p className="text-center text-gray-400 leading-relaxed text-sm md:text-base">
                                            앞으로의 길이 쉽지만은 않겠지만,<br />
                                            서원토건은 늘 그래왔듯<br />
                                            <span className="text-white">도전을 두려워하지 않고,</span><br />
                                            <span className="text-white font-semibold">함께라면 반드시 해낼 수 있다고 믿습니다.</span>
                                        </p>
                                    </div>

                                    {/* Thanks & Signature */}
                                    <div className="text-center pt-4 md:pt-8 pb-4">
                                        <p className="text-gray-500 text-xs md:text-base mb-6 md:mb-8">
                                            34년을 함께해 주신 모든 분들께 다시 한 번 감사드리며,<br />
                                            앞으로의 도전에도 변함없는 관심과 성원을 부탁드립니다.
                                        </p>
                                        <div className="inline-block">
                                            <p className="text-xl md:text-2xl font-light text-white">감사합니다.</p>
                                            <div className="w-12 md:w-16 h-px bg-gray-700 mx-auto my-3 md:my-4"></div>
                                            <p className="text-gray-400 text-xs md:text-sm">서원토건 대표이사 김진환</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* CEO Message with Profile Image (New section based on instruction) */}
                <section className="py-12 md:py-24 bg-white overflow-hidden">
                    <div className="container-minimal">
                        <div className={isMobileMode ? "flex flex-col items-center gap-8 md:gap-16" : "flex flex-col md:flex-row items-center gap-8 md:gap-16"}>
                            {/* Profile Image Area */}
                            <div className={isMobileMode ? "w-full max-w-md relative" : "w-full md:w-1/2 relative"}>
                                <img
                                    src="/images/ceo-profile.jpg" // Real photo provided by user
                                    alt="CEO Profile"
                                    className="w-full h-auto rounded-xl shadow-lg"
                                />
                                <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                                    대표이사 김진환
                                </div>
                            </div>
                            {/* Message Content Area */}
                            <div className={isMobileMode ? "w-full text-left" : "w-full md:w-1/2 text-left"}>
                                <div className="mb-6 md:mb-8 font-serif">
                                    <span className="text-blue-600 font-bold tracking-wider text-xs md:text-sm mb-2 block uppercase">Department Leader&apos;s Voice</span>
                                    <h3 className="text-xl md:text-4xl font-bold text-gray-900 leading-tight">
                                        &quot;데이터 기반의<br />
                                        스마트 건설로<br />
                                        미래 건설 산업을<br />
                                        선도합니다.&quot;
                                    </h3>
                                </div>
                                <p className="text-gray-700 text-sm md:text-lg leading-relaxed mb-4">
                                    미래전략TF는 서원토건의 디지털 전환을 이끌어갈 핵심 조직입니다.
                                    현장의 오랜 경험과 최신 기술을 융합하여,
                                    더욱 안전하고 효율적인 건설 프로세스를 구축하고 있습니다.
                                </p>
                                <p className="text-gray-700 text-sm md:text-lg leading-relaxed">
                                    데이터 기반의 의사결정, 자동화된 공정 관리, 그리고 혁신적인 스마트 기술 도입을 통해
                                    서원토건이 2030년 목표를 달성하고, 지속 가능한 성장을 이루도록 최선을 다하겠습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2030 Strategic Goals */}
                <section className="section-spacing">
                    <div className="container-minimal">
                        <div className="max-w-4xl mx-auto">
                            <div className="mb-8 md:mb-12 text-center">
                                <h2 className="section-title mb-4">2030 전략적 목표</h2>
                                <p className="text-gray-600 text-sm md:text-base">
                                    2025년 12월 26일, 창립 34주년 기념식 & 비전선포식에서 발표된 목표
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="bg-gray-50 p-6 md:p-10 rounded-lg text-center">
                                    <div className="text-3xl md:text-5xl font-bold text-black mb-2 md:mb-3">1.1조원</div>
                                    <div className="text-gray-600 font-medium text-sm md:text-base">연간 수주액</div>
                                </div>
                                <div className="bg-gray-50 p-6 md:p-10 rounded-lg text-center">
                                    <div className="text-3xl md:text-5xl font-bold text-black mb-2 md:mb-3">1조원</div>
                                    <div className="text-gray-600 font-medium text-sm md:text-base">연간 매출액</div>
                                </div>
                                <div className="bg-red-50 p-6 md:p-10 rounded-lg text-center">
                                    <div className="text-3xl md:text-5xl font-bold text-red-600 mb-2 md:mb-3">ZERO</div>
                                    <div className="text-gray-700 font-medium text-sm md:text-base">중대재해 Zero</div>
                                </div>
                                <div className="bg-blue-50 p-6 md:p-10 rounded-lg text-center">
                                    <div className="text-xl md:text-2xl font-bold text-blue-600 mb-2 md:mb-3">Data & Standard</div>
                                    <div className="text-gray-700 font-medium text-sm md:text-base">품질 고도화 & 시공표준화</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6 Strategy Tracks */}
                <section className="section-spacing bg-gray-50">
                    <div className="container-minimal">
                        <div className="max-w-5xl mx-auto">
                            <div className="mb-10 md:mb-16 text-center">
                                <h2 className="section-title">6대 전략 트랙</h2>
                                <p className="section-subtitle mt-4 text-sm md:text-base">
                                    전문성과 협업으로 미래를 만듭니다
                                </p>
                            </div>

                            <div className={isMobileMode ? "grid grid-cols-1 gap-4" : "grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6"}>
                                {tracks.map((track, index) => (
                                    <div key={index} className="bg-white p-4 md:p-8 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                                        <h3 className="text-lg md:text-xl font-bold text-black mb-2 md:mb-3">{track.name}</h3>
                                        <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">{track.description}</p>
                                        <div className="text-xs md:text-sm text-gray-500">
                                            팀원: <span className="font-semibold text-black">{track.members}명</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Innovation Roadmap */}
                <section className="section-spacing">
                    <div className="container-minimal">
                        <div className="max-w-4xl mx-auto">
                            <div className="mb-10 md:mb-16 text-center">
                                <h2 className="section-title">혁신 로드맵</h2>
                                <p className="section-subtitle mt-4 text-sm md:text-base">
                                    2026년부터 2030년까지의 변화
                                </p>
                            </div>

                            <div className="space-y-6 md:space-y-8">
                                {/* 2026 */}
                                <div className="flex gap-4 md:gap-6">
                                    <div className="flex-shrink-0 w-16 md:w-24 text-right">
                                        <div className="text-xl md:text-2xl font-bold text-black">2026</div>
                                    </div>
                                    <div className="flex-1 border-l-2 border-gray-200 pl-4 md:pl-8 pb-6 md:pb-8">
                                        <h3 className="text-lg md:text-xl font-bold text-black mb-2 md:mb-3">디지털 전환 시작</h3>
                                        <ul className="space-y-1 md:space-y-2 text-gray-600 text-sm md:text-base">
                                            <li>• 스마트건설 기술 도입</li>
                                            <li>• 데이터 수집 체계 구축</li>
                                            <li>• AI 안전관리 시스템 시범 운영</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* 2027-2028 */}
                                <div className="flex gap-4 md:gap-6">
                                    <div className="flex-shrink-0 w-16 md:w-24 text-right">
                                        <div className="text-xl md:text-2xl font-bold text-black">2027-28</div>
                                    </div>
                                    <div className="flex-1 border-l-2 border-gray-200 pl-4 md:pl-8 pb-6 md:pb-8">
                                        <h3 className="text-lg md:text-xl font-bold text-black mb-2 md:mb-3">시스템 고도화</h3>
                                        <ul className="space-y-1 md:space-y-2 text-gray-600 text-sm md:text-base">
                                            <li>• BIM 기반 시공 표준화</li>
                                            <li>• 로봇 자동화 확대</li>
                                            <li>• 품질 관리 디지털화</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* 2029-2030 */}
                                <div className="flex gap-4 md:gap-6">
                                    <div className="flex-shrink-0 w-16 md:w-24 text-right">
                                        <div className="text-xl md:text-2xl font-bold text-black">2029-30</div>
                                    </div>
                                    <div className="flex-1 pl-4 md:pl-8">
                                        <h3 className="text-lg md:text-xl font-bold text-black mb-2 md:mb-3">목표 달성</h3>
                                        <ul className="space-y-1 md:space-y-2 text-gray-600 text-sm md:text-base">
                                            <li>• 1.1조원 수주, 1조원 매출</li>
                                            <li>• 중대재해 Zero 실현</li>
                                            <li>• 스마트건설 선도 기업</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                {isAuthenticated && (
                    <section className="py-12 md:py-24 bg-black text-white">
                        <div className="container-minimal text-center">
                            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
                                함께 미래를<br />
                                만들어갑니다
                            </h2>
                            <p className="text-base md:text-xl text-gray-400 mb-6 md:mb-10">
                                성균관대학교 박승희 교수 연구팀과의 협력으로<br />
                                스마트건설 혁신을 실현합니다
                            </p>
                            <Link href="/collaboration">
                                <button className="btn-accent text-base md:text-lg px-8 py-3 md:px-10 md:py-4">
                                    산학협력 자세히 보기
                                </button>
                            </Link>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}
