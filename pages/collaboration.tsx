import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { initialProjects, researchAreas, Project } from '../data/collaboration';
import { useDeviceMode } from '../contexts/DeviceModeContext';
import { useAuth } from '../contexts/AuthContext';

export default function Collaboration() {
    const { isMobileMode } = useDeviceMode();
    const { user, isAuthenticated } = useAuth();
    const isObserver = !isAuthenticated || user?.role === 'observer';
    const [projects, setProjects] = useState<Project[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState<Partial<Project>>({});

    useEffect(() => {
        const savedProjects = localStorage.getItem('skku-projects');
        if (savedProjects) {
            setProjects(JSON.parse(savedProjects));
        } else {
            setProjects(initialProjects);
        }
    }, []);

    useEffect(() => {
        if (projects.length > 0) {
            localStorage.setItem('skku-projects', JSON.stringify(projects));
        }
    }, [projects]);

    const handleAddProject = () => {
        setCurrentProject({
            status: 'planning',
            progress: 0,
            researchers: ['박승희교수 연구팀']
        });
        setIsEditing(true);
    };

    const handleSaveProject = () => {
        if (!currentProject.title) return;

        if (currentProject.id) {
            setProjects(projects.map(p => p.id === currentProject.id ? { ...p, ...currentProject } as Project : p));
        } else {
            const newProject: Project = {
                ...currentProject,
                id: `proj-${Date.now()}`,
                startDate: currentProject.startDate || new Date().toISOString().split('T')[0],
                endDate: currentProject.endDate || new Date().toISOString().split('T')[0],
                researchers: currentProject.researchers || ['박승희교수 연구팀']
            } as Project;
            setProjects([...projects, newProject]);
        }
        setIsEditing(false);
        setCurrentProject({});
    };

    const handleDeleteProject = (id: string) => {
        if (window.confirm('정말 이 프로젝트를 삭제하시겠습니까?')) {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    const handleEditProject = (project: Project) => {
        setCurrentProject(project);
        setIsEditing(true);
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'completed': return { bg: 'bg-black', text: 'text-white', border: 'border-black', barColor: 'bg-black' };
            case 'in-progress': return { bg: 'bg-gray-100', text: 'text-gray-900', border: 'border-gray-300', barColor: 'bg-gray-800' };
            case 'planning': return { bg: 'bg-white', text: 'text-gray-600', border: 'border-gray-200', barColor: 'bg-gray-400' };
            default: return { bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200', barColor: 'bg-gray-300' };
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed': return '완료';
            case 'in-progress': return '진행중';
            case 'planning': return '계획중';
            default: return status;
        }
    };

    return (
        <>
            <Head>
                <title>산학협력 | 서원토건 x 성균관대학교</title>
                <meta name="description" content="성균관대학교 건설환경공학부 박승희 교수 연구팀과의 산학협력 현황입니다." />
            </Head>

            <div className="bg-white min-h-screen">
                {/* Hero Section - 미니멀 화이트 배경 */}
                <section className="py-16 md:py-24 bg-white border-b border-gray-100">
                    <div className="container-minimal max-w-4xl">
                        {/* 파트너십 라벨 */}
                        <div className="text-center mb-8 animate-fade-in">
                            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-400">
                                SKKU Partnership
                            </span>
                        </div>

                        {/* 로고 & 타이틀 */}
                        <div className="flex flex-col items-center gap-8 mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                                <img
                                    src="/images/skku_logo.jpg"
                                    alt="성균관대학교"
                                    className="w-20 h-20 md:w-24 md:h-24 object-contain"
                                />
                                <div className="hidden md:block w-px h-16 bg-gray-200"></div>
                                <div className="text-center md:text-left">
                                    <h1 className="text-3xl md:text-5xl font-bold text-black mb-2 tracking-tight">
                                        산학협력 센터
                                    </h1>
                                    <p className="text-gray-400 font-medium text-sm md:text-base tracking-wide">
                                        Industry-Academia Collaboration Center
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 협업 이미지 */}
                        <div className="relative w-full max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <div className="rounded-2xl overflow-hidden">
                                <Image
                                    src="/images/skku-collaboration.jpg"
                                    alt="SKKU & SEOWON Collaboration"
                                    width={1200}
                                    height={675}
                                    className="object-cover w-full h-auto"
                                    priority
                                />
                            </div>
                        </div>

                        {/* 슬로건 - 깔끔한 타이포그래피 */}
                        <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
                            <p className="text-xl md:text-2xl font-medium text-black leading-relaxed mb-4 tracking-tight">
                                성균관대학교 건설환경공학부
                            </p>
                            <p className="text-lg md:text-xl text-gray-500 mb-8">
                                박승희 교수 연구팀과 함께<br className="md:hidden" />
                                <span className="hidden md:inline"> </span>건설 기술 혁신을 선도합니다
                            </p>

                            {/* 핵심 키워드 */}
                            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-sm text-gray-400">
                                <span className="font-medium">Digital Innovation</span>
                                <span className="text-gray-200">—</span>
                                <span className="font-medium">Smart Safety</span>
                                <span className="text-gray-200">—</span>
                                <span className="font-medium">AI Technology</span>
                            </div>
                        </div>

                        {/* 통계 */}
                        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-14 pt-14 border-t border-gray-100 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            <div className="text-center">
                                <div className="text-3xl md:text-5xl font-bold text-black mb-2">{projects.length}</div>
                                <div className="text-xs md:text-sm text-gray-400 font-medium">진행 프로젝트</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-5xl font-bold text-black mb-2">{researchAreas.length}</div>
                                <div className="text-xs md:text-sm text-gray-400 font-medium">연구 분야</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-5xl font-bold text-black mb-2">MOU</div>
                                <div className="text-xs md:text-sm text-gray-400 font-medium">협력 체결</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Research Areas - 미니멀 카드 */}
                <section className="py-16 md:py-24 bg-gray-50">
                    <div className="container-minimal max-w-6xl">
                        <div className="text-center mb-12 animate-fade-in">
                            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4 block">
                                Research Areas
                            </span>
                            <h2 className="text-2xl md:text-4xl font-bold text-black mb-4">연구 분야</h2>
                            <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
                                성균관대학교 박승희 교수팀과 함께 건설 산업의 미래를 연구합니다
                            </p>
                        </div>

                        <div className={`grid gap-4 md:gap-6 ${isMobileMode ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                            {researchAreas.map((area, index) => (
                                <div
                                    key={index}
                                    className="group bg-white rounded-2xl p-6 md:p-8 border border-gray-100 hover:border-gray-300 transition-all duration-300 hover:shadow-lg animate-fade-in"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="flex items-center justify-between mb-5">
                                        <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-gray-300 group-hover:text-gray-500 transition-colors">
                                            Research {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-black mb-3 group-hover:text-gray-700 transition-colors">{area.title}</h3>
                                    <p className="text-gray-500 text-sm md:text-base leading-relaxed">{area.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="container-minimal max-w-6xl">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-14 gap-4 animate-fade-in">
                            <div>
                                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-400 mb-3 block">
                                    Active Projects
                                </span>
                                <h2 className="text-2xl md:text-4xl font-bold text-black">진행 프로젝트</h2>
                                <p className="text-gray-500 mt-2 text-sm md:text-base">현재 {projects.length}개의 프로젝트가 진행 중입니다</p>
                            </div>
                            {!isObserver && (
                                <button
                                    onClick={handleAddProject}
                                    className="w-full md:w-auto bg-black text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-all text-sm md:text-base"
                                >
                                    + 새 프로젝트
                                </button>
                            )}
                        </div>

                        <div className={`grid gap-6 ${isMobileMode ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                            {projects.map((project, index) => {
                                const statusStyle = getStatusStyle(project.status);
                                return (
                                    <div
                                        key={project.id}
                                        className="group bg-white p-6 md:p-8 rounded-2xl border border-gray-100 hover:border-gray-300 transition-all duration-300 hover:shadow-lg animate-fade-in"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="flex justify-between items-start mb-5">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xl md:text-2xl font-bold text-black mb-2">{project.title}</h3>
                                                <div className="text-gray-400 text-sm">
                                                    {project.startDate} — {project.endDate}
                                                </div>
                                            </div>
                                            <span className={`shrink-0 ml-4 px-3 py-1.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}>
                                                {getStatusText(project.status)}
                                            </span>
                                        </div>

                                        <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">{project.description}</p>

                                        {/* Progress Bar */}
                                        <div className="mb-6">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-gray-400">진행률</span>
                                                <span className="text-sm font-bold text-black">{project.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                                                <div
                                                    className={`${statusStyle.barColor} h-1.5 rounded-full transition-all duration-500`}
                                                    style={{ width: `${project.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* 연구진 */}
                                        <div className="flex items-center justify-between mb-6 py-3 border-t border-gray-50">
                                            <span className="text-sm text-gray-400">연구진</span>
                                            <span className="text-sm font-medium text-gray-700">{project.researchers.join(', ')}</span>
                                        </div>

                                        {/* Actions */}
                                        {!isObserver && (
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handleEditProject(project)}
                                                    className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all"
                                                >
                                                    수정
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProject(project.id)}
                                                    className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-gray-500 bg-white hover:bg-gray-50 transition-all border border-gray-200"
                                                >
                                                    삭제
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-0 md:p-4 animate-fade-in">
                    <div className="bg-white rounded-t-3xl md:rounded-2xl w-full md:max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
                        {/* 헤더 */}
                        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-black">
                                    {currentProject.id ? '프로젝트 수정' : '새 프로젝트 추가'}
                                </h2>
                                <p className="text-sm text-gray-400 mt-0.5">프로젝트 정보를 입력해주세요</p>
                            </div>
                            <button
                                onClick={() => { setIsEditing(false); setCurrentProject({}); }}
                                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors text-gray-500"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 160px)' }}>
                            <div className="space-y-5">
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">프로젝트명</label>
                                    <input
                                        type="text"
                                        value={currentProject.title || ''}
                                        onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                                        className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                        placeholder="프로젝트 이름을 입력하세요"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">설명</label>
                                    <textarea
                                        value={currentProject.description || ''}
                                        onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                                        className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                                        rows={4}
                                        placeholder="프로젝트 설명을 입력하세요"
                                    />
                                </div>

                                {/* Status & Progress */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">상태</label>
                                        <select
                                            value={currentProject.status || 'planning'}
                                            onChange={(e) => setCurrentProject({ ...currentProject, status: e.target.value as any })}
                                            className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all appearance-none bg-white"
                                            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em', backgroundRepeat: 'no-repeat', paddingRight: '2.5rem' }}
                                        >
                                            <option value="planning">계획중</option>
                                            <option value="in-progress">진행중</option>
                                            <option value="completed">완료</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">진행률 (%)</label>
                                        <input
                                            type="number"
                                            value={currentProject.progress || 0}
                                            onChange={(e) => setCurrentProject({ ...currentProject, progress: parseInt(e.target.value) })}
                                            className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                            min="0"
                                            max="100"
                                        />
                                    </div>
                                </div>

                                {/* Dates */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">시작일</label>
                                        <input
                                            type="date"
                                            value={currentProject.startDate || ''}
                                            onChange={(e) => setCurrentProject({ ...currentProject, startDate: e.target.value })}
                                            className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">종료일</label>
                                        <input
                                            type="date"
                                            value={currentProject.endDate || ''}
                                            onChange={(e) => setCurrentProject({ ...currentProject, endDate: e.target.value })}
                                            className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 푸터 버튼 */}
                        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
                            <button
                                onClick={() => { setIsEditing(false); setCurrentProject({}); }}
                                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3.5 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleSaveProject}
                                className="flex-1 bg-black text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-all"
                            >
                                저장
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
