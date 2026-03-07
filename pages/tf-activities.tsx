import { useState, useEffect } from 'react';
import Head from 'next/head';
import { tfActivities as initialActivities } from '../data/tfActivities';
import { useDeviceMode } from '../contexts/DeviceModeContext';
import { useAuth } from '../contexts/AuthContext';
import { uploadFile, fetchStrategicPlan, saveStrategicPlan } from '../lib/supabase';
import { TFActivity } from '../interfaces/TFActivity';

export default function TFActivities() {
    const { isMobileMode } = useDeviceMode();
    const { user, isAuthenticated } = useAuth();
    const isAdmin = isAuthenticated && (user?.role === 'leader' || user?.role === 'ceo' || user?.role === 'executive');
    const isMember = isAuthenticated && (user?.role === 'member' || user?.role === 'executive');
    const isObserver = !isAuthenticated || user?.role === 'observer';

    const [activities, setActivities] = useState<TFActivity[]>(initialActivities);
    const [isEditing, setIsEditing] = useState(false);
    const [currentActivity, setCurrentActivity] = useState<Partial<TFActivity>>({});
    const [isExpanded, setIsExpanded] = useState(false);
    const [filterStatus, setFilterStatus] = useState<'전체' | '예정' | '완료'>('전체');
    const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});

    const toggleDetails = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setExpandedDetails(prev => ({ ...prev, [id]: !prev[id] }));
    };

    // Supabase 및 로컬 스토리지에서 데이터 불러오기
    useEffect(() => {
        const loadData = async () => {
            const remoteData = await fetchStrategicPlan('activities');
            if (remoteData?.data && Array.isArray(remoteData.data)) {
                setActivities(remoteData.data);
            } else {
                const saved = localStorage.getItem('tf-activities');
                if (saved) {
                    try {
                        setActivities(JSON.parse(saved));
                    } catch (e) {
                        console.error('Failed to parse activities', e);
                    }
                }
            }
        };
        loadData();
    }, []);

    // 데이터 저장 시 서버 및 로컬 동기화
    const syncActivities = async (data: TFActivity[]) => {
        setActivities(data);
        localStorage.setItem('tf-activities', JSON.stringify(data));
        await saveStrategicPlan({
            type: 'activities',
            data: data,
            updated_by: user?.username || 'unknown'
        });
    };

    const handleAdd = () => {
        const today = new Date().toISOString().split('T')[0];
        const dayOfWeek = new Intl.DateTimeFormat('ko-KR', { weekday: 'long' }).format(new Date());
        setCurrentActivity({
            id: String(Date.now()),
            date: today,
            dayOfWeek: dayOfWeek,
            category: '[일반 업무]',
            title: '',
            summary: '',
            details: '',
            status: '예정',
            isMilestone: false,
            images: [],
            participants: []
        });
        setIsEditing(true);
    };

    const handleEdit = (activity: TFActivity) => {
        setCurrentActivity({ ...activity });
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('정말로 이 마일스톤을 삭제하시겠습니까?')) {
            const updated = activities.filter(a => a.id !== id);
            await syncActivities(updated);
        }
    };

    const handleClearAll = async () => {
        console.log('초기화 버튼 클릭됨');
        if (typeof window !== 'undefined' && window.confirm('마일스톤을 초기화 하겠습니까?')) {
            try {
                // localStorage의 관련 키를 모두 삭제 (구데이터 복원 방지)
                localStorage.removeItem('tf-activities');
                localStorage.removeItem('strategic_plan_activities');

                // UI 즉시 반영 (혹시 모를 지연 방지)
                setActivities([...initialActivities]);

                // 서버 동기화 시도 (실패해도 초기화는 진행되도록)
                await syncActivities(initialActivities).catch(err => console.error('Sync failed:', err));

                alert('초기화가 완료되었습니다.');
                window.location.reload();
            } catch (error) {
                console.error('Clear All Error:', error);
                alert('초기화 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    };

    const handleSave = async () => {
        if (!currentActivity.title || !currentActivity.date) {
            alert('날짜와 제목은 필수 입력 사항입니다.');
            return;
        }

        let updated: TFActivity[];
        if (activities.find(a => a.id === currentActivity.id)) {
            updated = activities.map(a => a.id === currentActivity.id ? (currentActivity as TFActivity) : a);
        } else {
            updated = [...activities, currentActivity as TFActivity];
        }

        await syncActivities(updated);
        setIsEditing(false);
    };

    // 활동 날짜순 내림차순 정렬 (최신순)
    // 활동 날짜순 내림차순 정렬 (최신순)
    const filteredActivities = activities.filter(a => filterStatus === '전체' || a.status === filterStatus);
    const sortedActivities = [...filteredActivities].sort((a, b) => b.date.localeCompare(a.date));

    // 표시할 활동 (기본 5개, 펼칠 시 전체)
    const displayActivities = isExpanded ? sortedActivities : sortedActivities.slice(0, 5);

    return (
        <div className="bg-white min-h-screen">
            <Head>
                <title>미래전략TF 마일스톤 | 서원토건</title>
            </Head>

            {/* Header */}
            <section className="py-12 md:py-20 bg-gray-50 border-b border-gray-100">
                <div className="container-minimal text-center">
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-600 mb-4 block">
                        Activity Log & Performance
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-black mb-6">
                        미래전략TF 마일스톤
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-8">
                        실질적인 성과 창출과 미래 비전 공유를 위해 TF팀의 모든 발자취를 투명하게 기록합니다.
                    </p>
                    {isAuthenticated && !isObserver && (
                        <div className="flex gap-4 justify-center">
                            {isAdmin && (
                                <button
                                    onClick={handleClearAll}
                                    className="bg-red-50 text-red-600 px-6 py-4 rounded-2xl font-bold hover:bg-red-100 transition-all text-sm shadow-sm"
                                >
                                    전체 마일스톤 초기화
                                </button>
                            )}
                            <button
                                onClick={handleAdd}
                                className="bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all text-sm shadow-lg hover:scale-105 active:scale-95"
                            >
                                + 새 마일스톤 기록하기
                            </button>
                        </div>
                    )}

                    {/* Status Filter */}
                    <div className="flex justify-center gap-2 mt-8">
                        {['전체', '예정', '완료'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status as any)}
                                className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${filterStatus === status
                                    ? 'bg-black text-white shadow-md'
                                    : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline View */}
            <section className="py-16 container-minimal max-w-4xl">
                <div className="relative border-l-2 border-gray-100 ml-4 md:ml-10 pl-8 md:pl-16 space-y-12">
                    {displayActivities.map((activity, index) => (
                        <div key={activity.id} className="relative group">
                            {/* Dot with Pulse Effect if Milestone */}
                            <div className={`absolute left-[-41px] md:left-[-73px] top-1.5 w-6 h-6 rounded-full border-4 bg-white z-10 transition-all duration-500 ${activity.isMilestone
                                ? 'border-blue-600 scale-125 shadow-[0_0_15px_rgba(37,99,235,0.5)] bg-blue-50'
                                : 'border-gray-200 group-hover:border-blue-300'
                                }`}>
                                {activity.isMilestone && (
                                    <div className="absolute inset-0 rounded-full animate-ping bg-blue-400/30"></div>
                                )}
                            </div>

                            {/* Content Box */}
                            <div className="flex flex-col md:flex-row md:items-start gap-6">
                                {/* Date Column */}
                                {/* Date Column */}
                                <div className="md:w-32 shrink-0">
                                    <div className={`inline-block px-2 py-1 mb-2 rounded-md text-[10px] font-black uppercase tracking-widest ${activity.status === '완료' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                        {activity.status || '미정'}
                                    </div>
                                    <div className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1">{activity.category}</div>
                                    <div className="text-lg font-bold text-black">{activity.date}</div>
                                    <div className="text-[11px] font-medium text-gray-400 uppercase">{activity.dayOfWeek}</div>
                                </div>

                                {/* Info Column */}
                                <div className="flex-1">
                                    <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.02)] group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] group-hover:border-blue-50 transition-all duration-500 relative overflow-hidden">

                                        {/* Milestone Badge */}
                                        {activity.isMilestone && (
                                            <div className="absolute top-0 right-0 px-4 py-1.5 bg-blue-600 text-[10px] font-bold text-white uppercase tracking-tighter rounded-bl-2xl">
                                                Core Performance
                                            </div>
                                        )}

                                        {/* Edit/Delete Actions */}
                                        {isAdmin && (
                                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                <button
                                                    onClick={() => handleEdit(activity)}
                                                    className="p-1.5 text-gray-400 hover:text-blue-600 bg-gray-50 rounded-lg transition-all"
                                                    title="수정"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(activity.id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 bg-gray-50 rounded-lg transition-all"
                                                    title="삭제"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v2m3 3h.01" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}

                                        <h3 className="text-xl md:text-2xl font-bold text-black mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                                            {activity.title}
                                        </h3>

                                        {activity.summary && (
                                            <p className="text-sm font-bold text-gray-700 mb-6 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                                {activity.summary}
                                            </p>
                                        )}

                                        <div className="flex flex-col xl:flex-row gap-8">
                                            <div className="flex-1">
                                                {activity.details && (() => {
                                                    const lines = activity.details.split('\n');
                                                    const isLong = lines.length > 5;
                                                    const isDetailExpanded = expandedDetails[activity.id];
                                                    const displayLines = isLong && !isDetailExpanded ? lines.slice(0, 5) : lines;

                                                    return (
                                                        <div className="mb-6">
                                                            <ul className="space-y-2.5">
                                                                {displayLines.map((line, i) => (
                                                                    <li key={i} className="text-[13px] text-gray-500 leading-relaxed flex items-start gap-2.5">
                                                                        <span className="shrink-0 w-1 h-1 rounded-full bg-gray-300 mt-2"></span>
                                                                        {line}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            {isLong && (
                                                                <button
                                                                    onClick={(e) => toggleDetails(activity.id, e)}
                                                                    className="mt-3 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                                                                >
                                                                    {isDetailExpanded ? '▲ 간략히 보기' : `▼ ${lines.length - 5}줄 더보기`}
                                                                </button>
                                                            )}
                                                        </div>
                                                    );
                                                })()}

                                                <div className="flex flex-wrap items-center gap-5">
                                                    {activity.location && (
                                                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 tracking-tight uppercase">
                                                            <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            {activity.location}
                                                        </div>
                                                    )}
                                                    {activity.participants && activity.participants.length > 0 && (
                                                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 tracking-tight uppercase">
                                                            <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                            </svg>
                                                            {activity.participants.length} Participants
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {activity.images && activity.images.length > 0 && (
                                                <div className="w-full xl:w-48 xl:h-48 shrink-0 rounded-2xl overflow-hidden shadow-sm group-hover:scale-[1.02] transition-transform duration-500 border border-gray-100 relative">
                                                    <img
                                                        src={activity.images[0]}
                                                        alt={activity.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    {activity.images.length > 1 && (
                                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                            <span className="text-white text-xs font-black">+{activity.images.length - 1} PHOTOS</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* More / Fold Button */}
                {sortedActivities.length > 5 && (
                    <div className="mt-20 text-center">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="inline-flex items-center gap-2 px-10 py-4 bg-white border-2 border-gray-100 rounded-2xl text-sm font-bold text-gray-500 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50/30 transition-all shadow-sm"
                        >
                            {isExpanded ? (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                    </svg>
                                    과거 마일스톤 접기
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                    과거 마일스톤 더보기 ({sortedActivities.length - 5}건)
                                </>
                            )}
                        </button>
                    </div>
                )}
            </section>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
                            <h2 className="text-xl font-bold text-black">마일스톤 편집</h2>
                            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-black">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-8 space-y-6 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">날짜</label>
                                    <input
                                        type="date"
                                        value={currentActivity.date}
                                        onChange={(e) => setCurrentActivity({ ...currentActivity, date: e.target.value })}
                                        className="w-full px-5 py-4 border border-gray-100 bg-gray-50 rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">카테고리</label>
                                    <input
                                        type="text"
                                        value={currentActivity.category || ''}
                                        onChange={(e) => setCurrentActivity({ ...currentActivity, category: e.target.value })}
                                        className="w-full px-5 py-4 border border-gray-100 bg-gray-50 rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-sm"
                                        placeholder="예: [성균관대 사전컨택]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">진행 상태 (Status)</label>
                                    <select
                                        value={currentActivity.status || '예정'}
                                        onChange={(e) => setCurrentActivity({ ...currentActivity, status: e.target.value as any })}
                                        className="w-full px-5 py-4 border border-gray-100 bg-gray-50 rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-sm appearance-none cursor-pointer"
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 1rem center', backgroundSize: '1.2em 1.2em', backgroundRepeat: 'no-repeat' }}
                                    >
                                        <option value="예정">예정</option>
                                        <option value="완료">완료</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">마일스톤 제목 (Core Title)</label>
                                <input
                                    type="text"
                                    value={currentActivity.title || ''}
                                    onChange={(e) => setCurrentActivity({ ...currentActivity, title: e.target.value })}
                                    className="w-full px-5 py-4 border border-gray-100 bg-gray-50 rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-sm"
                                    placeholder="회의 내용 혹은 출장 목적을 입력하세요"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">한 줄 요약 (Summary)</label>
                                <input
                                    type="text"
                                    value={currentActivity.summary || ''}
                                    onChange={(e) => setCurrentActivity({ ...currentActivity, summary: e.target.value })}
                                    className="w-full px-5 py-4 border border-gray-100 bg-gray-50 rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-sm italic"
                                    placeholder="활동을 관통하는 핵심 메시지를 입력하세요"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">상세 내역 (Details - 줄바꿈으로 구분)</label>
                                <textarea
                                    value={currentActivity.details || ''}
                                    onChange={(e) => setCurrentActivity({ ...currentActivity, details: e.target.value })}
                                    className="w-full px-5 py-4 border border-gray-100 bg-gray-50 rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium text-sm min-h-[120px]"
                                    placeholder="활동의 구체적인 항목들을 입력하세요"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">장소 (Location)</label>
                                    <input
                                        type="text"
                                        value={currentActivity.location || ''}
                                        onChange={(e) => setCurrentActivity({ ...currentActivity, location: e.target.value })}
                                        className="w-full px-5 py-4 border border-gray-100 bg-gray-50 rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-sm"
                                        placeholder="현장 혹은 회의실 정보"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">참석자 (쉼표로 구분)</label>
                                    <input
                                        type="text"
                                        value={currentActivity.participants?.join(', ') || ''}
                                        onChange={(e) => setCurrentActivity({ ...currentActivity, participants: e.target.value.split(',').map(p => p.trim()).filter(p => p !== '') })}
                                        className="w-full px-5 py-4 border border-gray-100 bg-gray-50 rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-sm"
                                        placeholder="홍길동, 김철수..."
                                    />
                                </div>
                            </div>

                            {/* Real Image Upload Implementation */}
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">연관 사진 관리 (Images)</label>
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    {currentActivity.images?.map((img, idx) => (
                                        <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 group shadow-sm bg-gray-50">
                                            <img src={img} alt="preview" className="w-full h-full object-cover" />
                                            {/* 삭제 버튼 - 상시 노출로 변경하여 가시성 확보 */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newImages = [...(currentActivity.images || [])];
                                                    newImages.splice(idx, 1);
                                                    setCurrentActivity({ ...currentActivity, images: newImages });
                                                }}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-all hover:scale-110 active:scale-90 z-20"
                                                title="이미지 삭제"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                            {/* 오버레이 효과 */}
                                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                        </div>
                                    ))}

                                    {/* 사진 추가 버튼 */}
                                    <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition-all cursor-pointer group relative overflow-hidden">
                                        <div className="flex flex-col items-center transition-transform group-hover:-translate-y-1">
                                            <div className="text-2xl mb-1.5">📸</div>
                                            <span className="text-[10px] font-black text-gray-400 group-hover:text-blue-500 uppercase tracking-tighter">사진 추가</span>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                            onChange={async (e) => {
                                                const files = Array.from(e.target.files || []);
                                                if (files.length === 0) return;

                                                try {
                                                    const newUrls: string[] = [];
                                                    for (const file of files) {
                                                        const url = await uploadFile(file);
                                                        if (url) newUrls.push(url);
                                                    }
                                                    setCurrentActivity(prev => ({
                                                        ...prev,
                                                        images: [...(prev.images || []), ...newUrls]
                                                    }));
                                                } catch (err) {
                                                    console.error('Image upload failed:', err);
                                                    alert('이미지 업로드에 실패했습니다.');
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                                <p className="text-[10px] text-gray-400 font-medium">* 가로형 사진을 권장하며, 여러 장 선택이 가능합니다.</p>
                            </div>

                            <div className="flex items-center gap-4 py-2 px-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                                <input
                                    type="checkbox"
                                    id="milestone"
                                    className="w-6 h-6 rounded-lg border-gray-200 text-blue-600 focus:ring-blue-100 transition-all cursor-pointer"
                                    checked={currentActivity.isMilestone}
                                    onChange={(e) => setCurrentActivity({ ...currentActivity, isMilestone: e.target.checked })}
                                />
                                <label htmlFor="milestone" className="text-sm font-bold text-blue-900 cursor-pointer">
                                    이 항목을 <span className="underline decoration-blue-300 decoration-2 underline-offset-4">주요 마일스톤(핵심 성과)</span>으로 지정합니다
                                </label>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 flex gap-3 shrink-0">
                            <button onClick={() => setIsEditing(false)} className="flex-1 px-4 py-3.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-100 transition-all">취소</button>
                            <button onClick={handleSave} className="flex-1 px-4 py-3.5 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95">저장하기</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
