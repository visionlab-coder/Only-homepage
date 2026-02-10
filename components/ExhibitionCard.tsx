import { Exhibition } from '../interfaces/Exhibition';
import { useDeviceMode } from '../contexts/DeviceModeContext';

interface ExhibitionCardProps {
    exhibition: Exhibition;
    onDetailClick?: (exhibition: Exhibition) => void;
}

export default function ExhibitionCard({ exhibition, onDetailClick }: ExhibitionCardProps) {
    const { isMobileMode } = useDeviceMode();

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return `${date.getMonth() + 1}월 ${date.getDate()}일`;
    };

    return (
        <div className="card-minimal p-6 h-full hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">{exhibition.country}</span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                    {exhibition.category}
                </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-3 text-black">
                {exhibition.name}
            </h3>

            {/* Location */}
            <div className="flex items-start text-gray-600 text-sm mb-3">
                <span className="mr-2">📍</span>
                <span>{exhibition.location}</span>
            </div>

            {/* Date */}
            <div className="flex items-center text-black text-sm font-medium mb-4">
                <span>{formatDate(exhibition.startDate)} - {formatDate(exhibition.endDate)}, 2026</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {exhibition.description}
            </p>

            {/* Actions */}
            <div className={isMobileMode ? "flex flex-col gap-2" : "flex gap-2"}>
                {exhibition.detailedInfo && onDetailClick && (
                    <button
                        onClick={() => onDetailClick(exhibition)}
                        className="flex-1 bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-all"
                    >
                        더보기
                    </button>
                )}
                {exhibition.website && (
                    <a
                        href={exhibition.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold transition-all ${exhibition.detailedInfo
                            ? 'flex-1 border border-gray-300 text-gray-700 hover:border-black'
                            : 'text-black hover:text-gray-600'
                            }`}
                    >
                        웹사이트 방문
                        {!exhibition.detailedInfo && (
                            <span className="ml-2">→</span>
                        )}
                    </a>
                )}
            </div>
        </div>
    );
}
