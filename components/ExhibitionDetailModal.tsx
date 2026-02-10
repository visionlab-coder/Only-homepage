import { Exhibition } from '../interfaces/Exhibition';

interface ExhibitionDetailModalProps {
    exhibition: Exhibition | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ExhibitionDetailModal({ exhibition, isOpen, onClose }: ExhibitionDetailModalProps) {
    if (!isOpen || !exhibition) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                        <div className="mb-2">
                            <span className="text-xs font-bold tracking-widest uppercase text-gray-500">
                                {exhibition.category} • {exhibition.country}
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-black mb-2">
                            {exhibition.name}
                        </h2>
                        <p className="text-gray-600">
                            📍 {exhibition.location}
                        </p>
                        <p className="text-gray-600">
                            📅 {exhibition.startDate} ~ {exhibition.endDate}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-black text-2xl"
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                {exhibition.detailedInfo ? (
                    <div className="space-y-6">
                        {/* Exhibition Details */}
                        <div>
                            <h3 className="text-lg font-bold text-black mb-3">박람회 개요</h3>
                            <p className="text-gray-700 leading-relaxed">
                                {exhibition.detailedInfo.exhibitionDetails}
                            </p>
                        </div>

                        {/* Key Highlights */}
                        <div>
                            <h3 className="text-lg font-bold text-black mb-3">주요 특징</h3>
                            <ul className="space-y-2">
                                {exhibition.detailedInfo.keyHighlights.map((highlight, index) => (
                                    <li key={index} className="flex items-start text-gray-700">
                                        <span className="w-2 h-2 rounded-full bg-black mt-2 mr-3 flex-shrink-0"></span>
                                        <span className="leading-relaxed">{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Target Audience */}
                        <div>
                            <h3 className="text-lg font-bold text-black mb-3">대상 관람객</h3>
                            <p className="text-gray-700 leading-relaxed">
                                {exhibition.detailedInfo.targetAudience}
                            </p>
                        </div>

                        {/* Stats */}
                        {(exhibition.detailedInfo.expectedVisitors || exhibition.detailedInfo.exhibitorCount) && (
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                                {exhibition.detailedInfo.expectedVisitors && (
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">예상 방문객</p>
                                        <p className="text-xl font-bold text-black">
                                            {exhibition.detailedInfo.expectedVisitors}
                                        </p>
                                    </div>
                                )}
                                {exhibition.detailedInfo.exhibitorCount && (
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">출품업체</p>
                                        <p className="text-xl font-bold text-black">
                                            {exhibition.detailedInfo.exhibitorCount}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">상세 정보가 준비되지 않았습니다.</p>
                        <p className="text-gray-400 text-sm mt-2">
                            웹사이트를 방문하여 자세한 정보를 확인하세요.
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                    {exhibition.website && (
                        <a
                            href={exhibition.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all text-center"
                        >
                            웹사이트 방문 →
                        </a>
                    )}
                    <button
                        onClick={onClose}
                        className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}
