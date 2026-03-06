import { useState, useEffect } from 'react';
import Head from 'next/head';
import { tfActivities as initialActivities } from '../data/tfActivities';
import { useDeviceMode } from '../contexts/DeviceModeContext';
import { useAuth } from '../contexts/AuthContext';
import { TFActivity } from '../interfaces/TFActivity';

export default function TFActivities() {
    const { isMobileMode } = useDeviceMode();
    const { user, isAuthenticated } = useAuth();
    // 테스트 및 MVP 단계에서는 로컬에서 항상 수정을 허용하도록 설정 (또는 로그인한 경우에만 권한 체크)
    const isObserver = isAuthenticated ? user?.role === 'observer' : false;

    const [activities, setActivities] = useState<TFActivity[]>([]);
    const [filter, setFilter] = useState<string>('all');
    const [isEditing, setIsEditing] = useState(false);
    const [currentActivity, setCurrentActivity] = useState<Partial<TFActivity>>({});

    useEffect(() => {
        const saved = localStorage.getItem('tf_activities_v2'); // 버전 관리를 위해 키 변경
        if (saved) {
            setActivities(JSON.parse(saved));
        } else {
            setActivities(initialActivities);
        }
    }, []);

    useEffect(() => {
        if (activities.length > 0) {
            localStorage.setItem('tf_activities_v2', JSON.stringify(activities));
        }
    }, [activities]);

    const handleAdd = () => {
        setCurrentActivity({
            date: new Date().toISOString().split('T')[0],
            category: '회의 및 업무 협의',
            isMilestone: false,
            title: '',
            summary: '',
            details: '',
            location: '',
            participants: [],
            images: []
        });
        setIsEditing(true);
    };

    const handleEdit = (activity: TFActivity) => {
        setCurrentActivity(activity);
        setIsEditing(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('이 활동 기록을 삭제하시겠습니까?')) {
            setActivities(activities.filter(a => a.id !== id));
        }
    };

    const handleSave = () => {
        const title = currentActivity.title?.trim();
        const date = currentActivity.date;

        if (!title || !date) {
            alert('날짜와 제목을 입력해주세요.');
            return;
        }

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayOfWeek = days[new Date(date).getDay()];

        if (currentActivity.id) {
            setActivities(activities.map(a => a.id === currentActivity.id
                ? { ...a, ...currentActivity, title, date, dayOfWeek } as TFActivity
                : a));
        } else {
            const newId = `tf-${Date.now()}`;
            setActivities([...activities, { ...currentActivity, id: newId, title, date, dayOfWeek } as TFActivity]);
        }
        setIsEditing(false);
        setCurrentActivity({});
    };

    const filteredActivities = filter === 'all'
        ? activities
        : activities.filter(a => a.category === filter);

    return (
        <div className="bg-white min-h-screen">
            <Head>
                <title>미래전략TF 활동기록 | 서원토건</title>
            </Head>

            {/* Header */}
            <section className="py-12 md:py-20 bg-gray-50 border-b border-gray-100">
                <div className="container-minimal text-center">
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-600 mb-4 block">
                        Activity Log & Performance
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-black mb-6">
                        미래전략TF 활동 기록
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-8">
                        실질적인 성과 창출과 미래 비전 공유를 위해 TF팀의 모든 발자취를 투명하게 기록합니다.
                    </p>
                    {!isObserver && (
                        <button
                            onClick={handleAdd}
                            className="bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all text-sm shadow-lg hover:scale-105 active:scale-95"
                        >
                            + 새 활동 기록하기
                        </button>
                    )}
                </div>
            </section>

            {/* Filter */}
            <div className="container-minimal py-8 flex flex-wrap justify-center gap-2">
                {['all', '현장출장', '회의 및 업무 협의', '미래전략TF 기획'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all border ${filter === cat
                            ? 'bg-black text-white border-black shadow-md'
                            : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                            }`}
                    >
                        {cat === 'all' ? '전체보기' : cat}
                    </button>
                ))}
            </div>

            {/* Timeline View */}
            <section className="py-20 container-minimal max-w-5xl">
                <div className="relative border-l-2 border-gray-100 ml-6 md:ml-0 md:left-1/2 md:translate-x-[-1px]">
                    {activities.sort((a, b) => b.date.localeCompare(a.date))
                        .filter(a => filter === 'all' || a.category === filter)
                        .map((activity, index) => (
                            <div key={activity.id} className="mb-20 relative">
                                {/* Dot with Pulse Effect if Milestone */}
                                <div className={`absolute left-[-11px] md:left-[-9px] top-0 w-5 h-5 rounded-full border-4 bg-white z-10 transition-all duration-500 ${activity.isMilestone
                                    ? 'border-blue-600 scale-125 shadow-[0_0_15px_rgba(37,99,235,0.5)] bg-blue-50'
                                    : 'border-gray-200'
                                    }`}>
                                    {activity.isMilestone && (
                                        <div className="absolute inset-0 rounded-full animate-ping bg-blue-400/30"></div>
                                    )}
                                </div>

                                {/* Content Card */}
                                <div className={`ml-10 md:ml-0 md:w-[46%] ${index % 2 === 0 ? 'md:mr-auto text-right md:pr-14' : 'md:ml-auto text-left md:pl-14'}`}>
                                    <div className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:border-blue-100 transition-all duration-500 overflow-hidden relative">

                                        {/* Edit/Delete Actions */}
                                        {!isObserver && (
                                            <div className={`absolute top-6 ${index % 2 === 0 ? 'left-6' : 'right-6'} flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0`}>
                                                <button
                                                    onClick={() => handleEdit(activity)}
                                                    className="p-2.5 text-gray-400 hover:text-blue-600 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm transition-all"
                                                    title="수정"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(activity.id)}
                                                    className="p-2.5 text-gray-400 hover:text-red-600 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm transition-all"
                                                    title="삭제"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v2m3 3h.01" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}

                                        {/* Activity Image (If exists) */}
                                        {activity.images && activity.images.length > 0 && (
                                            <div className="relative h-56 w-full overflow-hidden">
                                                <img
                                                    src={activity.images[0]}
                                                    alt={activity.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                                {activity.images.length > 1 && (
                                                    <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                                                        +{activity.images.length - 1} Photos
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <div className="p-8">
                                            <div className={`flex flex-wrap items-center gap-3 mb-4 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                                <span className="text-[10px] font-black tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
                                                    {activity.category}
                                                </span>
                                                <span className="text-xs text-gray-400 font-semibold tracking-tighter">
                                                    {activity.date} ({activity.dayOfWeek})
                                                </span>
                                            </div>

                                            <h3 className={`text-xl md:text-2xl font-bold text-black mb-3 leading-tight ${activity.isMilestone ? 'text-blue-900 border-l-4 border-blue-600 pl-4' : ''}`}>
                                                {activity.title}
                                            </h3>

                                            {activity.summary && (
                                                <p className="text-sm font-bold text-gray-800 mb-4 bg-gray-50 p-4 rounded-2xl border-l-2 border-gray-200 italic">
                                                    "{activity.summary}"
                                                </p>
                                            )}

                                            {activity.details && (
                                                <div className="text-[13px] text-gray-500 leading-relaxed mb-6 space-y-1">
                                                    {activity.details.split('\n').map((line, i) => (
                                                        <p key={i} className="flex items-start gap-2">
                                                            <span className="text-blue-300 mt-1">•</span>
                                                            {line}
                                                        </p>
                                                    ))}
                                                </div>
                                            )}

                                            <div className={`flex flex-wrap items-center gap-6 pt-6 border-t border-gray-50 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                                {activity.location && (
                                                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                                        <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        {activity.location}
                                                    </div>
                                                )}
                                                {activity.participants && activity.participants.length > 0 && (
                                                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                                        <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                        {activity.participants.length} Participants
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </section>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
                            <h2 className="text-xl font-bold text-black">활동 기록 편집</h2>
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
                                    <select
                                        value={currentActivity.category}
                                        onChange={(e) => setCurrentActivity({ ...currentActivity, category: e.target.value as any })}
                                        className="w-full px-5 py-4 border border-gray-100 bg-gray-50 rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-sm appearance-none cursor-pointer"
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 1rem center', backgroundSize: '1.2em 1.2em', backgroundRepeat: 'no-repeat' }}
                                    >
                                        <option value="현장출장">현장출장</option>
                                        <option value="회의 및 업무 협의">회의 및 업무 협의</option>
                                        <option value="미래전략TF 기획">미래전략TF 기획</option>
                                        <option value="기타 업무">기타 업무</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">활동 제목 (Core Title)</label>
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
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">활동 사진 (Images)</label>
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    {currentActivity.images?.map((img, idx) => (
                                        <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 group">
                                            <img src={img} alt="preview" className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => {
                                                    const newImages = [...(currentActivity.images || [])];
                                                    newImages.splice(idx, 1);
                                                    setCurrentActivity({ ...currentActivity, images: newImages });
                                                }}
                                                className="absolute top-1 right-1 bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </div>
                                    ))}
                                    <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50 hover:bg-white hover:border-blue-200 transition-all cursor-pointer group">
                                        <div className="text-xl mb-1 grayscale group-hover:grayscale-0">📸</div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">사진 추가</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                            onChange={(e) => {
                                                const files = Array.from(e.target.files || []);
                                                files.forEach(file => {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        const result = reader.result as string;
                                                        setCurrentActivity(prev => ({
                                                            ...prev,
                                                            images: [...(prev.images || []), result]
                                                        }));
                                                    };
                                                    reader.readAsDataURL(file);
                                                });
                                            }}
                                        />
                                    </label>
                                </div>
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
