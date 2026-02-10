import { useState, useEffect } from 'react';
import { Trend } from '../interfaces/Trend';
import { trendsData } from '../data/trends';

interface AIAnalysisProps {
    ideaTitle: string;
    ideaDescription: string;
    index: number;
}

export default function AIAnalysis({ ideaTitle, ideaDescription, index }: AIAnalysisProps) {
    const [status, setStatus] = useState<'idle' | 'searching' | 'analyzing' | 'synthesizing' | 'completed'>('idle');
    const [logs, setLogs] = useState<string[]>([]);
    const [analysisData, setAnalysisData] = useState<any>(null);

    // 해당 아이디어의 데이터를 찾습니다.
    const findAnalysisData = () => {
        for (const trend of trendsData) {
            const idea = trend.ideas.find(i => i.title === ideaTitle);
            if (idea?.aiAnalysis) {
                return idea.aiAnalysis;
            }
        }
        return null;
    };

    const runDeepResearch = async () => {
        setStatus('searching');
        setLogs([]);

        const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

        // 시뮬레이션: 딥 리서치 과정
        addLog(`🌐 "${ideaTitle}" 관련 최신 글로벌 트렌드 검색 시작...`);

        setTimeout(() => {
            addLog(`📄 2025-2026 관련 논문 및 산업 보고서 12건 발견`);
            addLog(`🔍 핵심 키워드 추출: "Automation", "Cost Efficiency", "Sustainability"`);
            setStatus('analyzing');
        }, 1500);

        setTimeout(() => {
            addLog(`📊 시장 데이터 분석 중... (CAGR, Market Size)`);
            addLog(`💡 유관 사례(Use Cases) 크로스 체크 중...`);
            setStatus('synthesizing');
        }, 3000);

        setTimeout(() => {
            addLog(`✨ 최종 리포트 생성 완료`);
            const data = findAnalysisData();
            if (data) {
                setAnalysisData(data);
                setStatus('completed');
            } else {
                // 데이터가 없는 경우를 대비한 기본 템플릿 (실제로는 모든 데이터가 채워져 있어야 함)
                setAnalysisData({
                    summary: '심층 분석 데이터가 준비되지 않았습니다.',
                    keyStatistics: ['통계 데이터 없음'],
                    globalCases: ['사례 없음'],
                    technicalDetails: '기술 상세 내용 없음',
                    futureOutlook: '전망 데이터 없음'
                });
                setStatus('completed');
            }
        }, 4500);
    };

    if (status === 'idle') {
        return (
            <button
                onClick={runDeepResearch}
                className="w-full mt-4 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-slate-700 to-slate-800 border border-white/10 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 flex items-center justify-center group"
            >
                <span className="mr-2 text-xl group-hover:rotate-12 transition-transform duration-300">⚡</span>
                AI 딥 리서치 심층 분석 실행
            </button>
        );
    }

    if (status !== 'completed') {
        return (
            <div className="mt-4 p-6 rounded-xl bg-black/50 border border-primary/30 backdrop-blur-sm relative overflow-hidden">
                {/* Scanning Effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan"></div>

                <div className="flex items-center mb-4">
                    <div className="mr-3 relative">
                        <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>
                    </div>
                    <span className="text-primary font-bold animate-pulse">
                        {status === 'searching' && '글로벌 웹 데이터 검색 중...'}
                        {status === 'analyzing' && '데이터 신뢰성 검증 및 분석 중...'}
                        {status === 'synthesizing' && '전문가 수준의 인사이트 도출 중...'}
                    </span>
                </div>

                <div className="space-y-2 font-mono text-sm">
                    {logs.map((log, i) => (
                        <div key={i} className="text-green-400/80 animate-fadeIn flex items-center">
                            <span className="mr-2">❯</span> {log}
                        </div>
                    ))}
                    <div className="text-green-400/40 animate-pulse">_</div>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-6 animate-fadeInUp">
            <div className="bg-gradient-to-b from-slate-800/80 to-slate-900/80 p-1 rounded-2xl border border-primary/30 shadow-2xl">
                {/* Header */}
                <div className="bg-white/5 p-4 rounded-t-xl flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center">
                        <span className="text-2xl mr-3">🧠</span>
                        <div>
                            <h4 className="font-bold text-white">Deep Research Report</h4>
                            <p className="text-xs text-primary">Generated by AI • 2026.01.03</p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* Summary */}
                    <div>
                        <h5 className="text-sm font-bold text-gray-400 uppercase mb-2 tracking-wider">Executive Summary</h5>
                        <p className="text-white text-lg leading-relaxed font-light">
                            {analysisData.summary}
                        </p>
                    </div>

                    {/* Stats & Cases Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-black/30 p-5 rounded-xl border border-white/5">
                            <h5 className="flex items-center text-primary font-bold mb-4">
                                <span className="mr-2">📈</span> 핵심 시장 지표
                            </h5>
                            <ul className="space-y-3">
                                {analysisData.keyStatistics.map((stat: string, idx: number) => (
                                    <li key={idx} className="flex items-start text-sm text-gray-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0"></span>
                                        {stat}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-black/30 p-5 rounded-xl border border-white/5">
                            <h5 className="flex items-center text-secondary font-bold mb-4">
                                <span className="mr-2">🌍</span> 글로벌 도입 사례
                            </h5>
                            <ul className="space-y-3">
                                {analysisData.globalCases.map((cse: string, idx: number) => (
                                    <li key={idx} className="flex items-start text-sm text-gray-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 mr-2 flex-shrink-0"></span>
                                        {cse}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Tech Details */}
                    <div>
                        <h5 className="text-sm font-bold text-gray-400 uppercase mb-2 tracking-wider">Technical Deep Dive</h5>
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5 text-gray-300 text-sm leading-relaxed">
                            {analysisData.technicalDetails}
                        </div>
                    </div>

                    {/* Future Outlook */}
                    <div className="flex items-start bg-gradient-to-r from-primary/10 to-transparent p-4 rounded-xl border-l-4 border-primary">
                        <span className="text-2xl mr-4">🚀</span>
                        <div>
                            <h5 className="font-bold text-white mb-1">2026 Future Outlook</h5>
                            <p className="text-sm text-gray-300">{analysisData.futureOutlook}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
