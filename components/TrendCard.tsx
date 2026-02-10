import Link from 'next/link';
import { Trend } from '../interfaces/Trend';

interface TrendCardProps {
    trend: Trend;
}

export default function TrendCard({ trend }: TrendCardProps) {
    return (
        <Link href={`/trends/${trend.id}`}>
            <div className="card-minimal p-8 h-full cursor-pointer group transition-all duration-300 hover:shadow-lg border-l-4 border-black">
                {/* 카테고리 라벨 */}
                <div className="mb-6">
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-500">
                        {trend.category}
                    </span>
                </div>

                {/* 제목 */}
                <h3 className="text-3xl font-bold mb-4 text-black group-hover:text-gray-700 transition-colors leading-tight">
                    {trend.title}
                </h3>

                {/* 설명 */}
                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                    {trend.description}
                </p>

                {/* 시장 규모 */}
                {trend.marketSize && (
                    <div className="pt-6 border-t border-gray-200">
                        <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Market Size</p>
                        <p className="text-2xl font-bold text-black">{trend.marketSize}</p>
                    </div>
                )}

                {/* 더보기 */}
                <div className="mt-8 flex items-center text-black font-semibold text-sm tracking-wide group-hover:gap-2 transition-all">
                    <span>READ MORE</span>
                    <span className="ml-2 group-hover:translate-x-2 transition-transform text-lg">→</span>
                </div>
            </div>
        </Link>
    );
}
