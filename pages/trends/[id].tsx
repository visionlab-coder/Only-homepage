import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { trendsData } from '../../data/trends';
import AIAnalysis from '../../components/AIAnalysis';
import FileUpload from '../../components/FileUpload';
import UserIdeaInput from '../../components/UserIdeaInput';
import { useDeviceMode } from '../../contexts/DeviceModeContext';

export default function TrendDetail() {
    const { isMobileMode } = useDeviceMode();
    const router = useRouter();
    const { id } = router.query;

    const trend = trendsData.find(t => t.id === id);

    if (!trend) {
        return (
            <div className="container mx-auto px-6 py-12 text-center">
                <h1 className="text-4xl font-bold text-black mb-4">트렌드를 찾을 수 없습니다</h1>
                <Link href="/" className="text-gray-600 hover:text-black">
                    ← 트렌드로 돌아가기
                </Link>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{trend.title} | 미래전략TF</title>
                <meta name="description" content={trend.description} />
            </Head>

            <div className="bg-white">
                {/* Back Button */}
                <div className="border-b border-gray-200">
                    <div className="container-minimal py-4">
                        <Link
                            href="/"
                            className="inline-flex items-center text-gray-600 hover:text-black transition-colors group font-medium"
                        >
                            <span className="mr-2 group-hover:-translate-x-1 transition-transform duration-300">←</span>
                            트렌드로 돌아가기
                        </Link>
                    </div>
                </div>

                {/* Actions Bar (Download Buttons) */}
                <div className="bg-gray-50 border-b border-gray-200">
                    <div className="container-minimal py-4">
                        <div className={isMobileMode ? "flex flex-col justify-end gap-3 no-print" : "flex flex-col md:flex-row justify-end gap-3 no-print"}>
                            <button
                                onClick={() => window.print()}
                                className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:border-black text-black px-5 py-2.5 rounded-lg transition-all font-medium text-sm md:text-base w-full md:w-auto"
                            >
                                PDF 저장 / 인쇄
                            </button>
                            <button
                                onClick={() => {
                                    import('../../utils/exportToDoc').then(module => {
                                        module.exportToDoc(`AI_Report_${trend.title.replace(/\s+/g, '_')}.doc`, 'report-content');
                                    });
                                }}
                                className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg transition-all font-medium text-sm md:text-base w-full md:w-auto"
                            >
                                Word 다운로드
                            </button>
                        </div>
                    </div>
                </div>

                <div id="report-content" className="printable-content">
                    {/* Header */}
                    <section className="section-spacing bg-white">
                        <div className="container-minimal max-w-4xl">
                            <div className="mb-8">
                                <span className="inline-block text-xs font-bold tracking-widest uppercase text-gray-500">
                                    {trend.category}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-4 md:mb-6 leading-tight">
                                {trend.title}
                            </h1>

                            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6 md:mb-8">
                                {trend.description}
                            </p>

                            {trend.marketSize && (
                                <div className="pt-8 border-t border-gray-200">
                                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Market Size</p>
                                    <p className="text-3xl font-bold text-black">{trend.marketSize}</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Key Ideas with AI Analysis */}
                    <section className="section-spacing bg-gray-50">
                        <div className="container-minimal max-w-4xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-black mb-8 md:mb-12">핵심 아이디어 & AI 분석</h2>

                            <div className="space-y-6 md:space-y-12">
                                {trend.ideas.map((idea, index) => (
                                    <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:border-black transition-all duration-300">
                                        <div className={isMobileMode ? "flex flex-col items-start space-y-4 mb-6" : "flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 mb-6"}>
                                            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black flex items-center justify-center text-white font-bold text-base md:text-lg">
                                                {index + 1}
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-xl md:text-2xl font-bold text-black mb-2 md:mb-3">
                                                    {idea.title}
                                                </h3>
                                                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                                    {idea.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* AI Analysis Component */}
                                        <div className="mb-6">
                                            <AIAnalysis
                                                ideaTitle={idea.title}
                                                ideaDescription={idea.description}
                                                index={index}
                                            />
                                        </div>

                                        {/* File Upload */}
                                        <div className="pt-6 border-t border-gray-200">
                                            <FileUpload
                                                trendId={`${trend.id}-idea-${index}`}
                                                trendTitle={`${index + 1}. ${idea.title}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* User Ideas Section */}
                    <section className="section-spacing bg-white">
                        <div className="container-minimal max-w-4xl">
                            <UserIdeaInput
                                trendId={trend.id}
                                trendTitle={trend.title}
                            />
                        </div>
                    </section>
                </div>

                {/* Related Exhibitions CTA */}
                <section className="py-24 bg-black text-white">
                    <div className="container-minimal max-w-3xl text-center">
                        <h3 className="text-2xl md:text-4xl font-bold mb-4">
                            관련 박람회 둘러보기
                        </h3>
                        <p className="text-base md:text-xl text-gray-400 mb-8">
                            2026년 이러한 혁신 기술을 선보이는 글로벌 행사 발견하기
                        </p>
                        <Link href="/exhibitions">
                            <button className="btn-accent text-base md:text-lg px-8 py-3 md:px-10 md:py-4">
                                박람회 보기 →
                            </button>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
