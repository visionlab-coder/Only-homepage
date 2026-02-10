import { useState, useEffect } from 'react';
import { saveStrategicPlan, fetchAllStrategicPlans } from '../lib/supabase';
import { useDeviceMode } from '../contexts/DeviceModeContext';
import { useAuth } from '../contexts/AuthContext';

// 기본 데이터들
const defaultPlanningAgenda = [
    { id: 1, title: '영상기반 안전장비 착용 AI', subtitle: '작업자 동선 AI 감시', description: '현장 작업자의 안전장비 착용 여부를 AI가 실시간 감지하고, 작업자 동선을 추적하여 위험 구역 진입 시 즉시 경보', color: '#3b82f6', category: '영상기반 AI' },
    { id: 2, title: '영상 및 드론기반 공정관리', subtitle: '품질 관리 시스템', description: '드론을 활용한 현장 전역 모니터링, 공정률 자동 산출, 영상 기반 품질 검수 시스템 구축', color: '#10b981', category: '드론' },
    { id: 3, title: '콘크리트 품질관리 AI', subtitle: '레미콘 품질 실시간 모니터링', description: 'IoT 센서와 AI를 결합하여 레미콘의 슬럼프, 공기량, 온도를 실시간 추적하고 품질 이상 시 자동 알림', color: '#8b5cf6', category: 'AI' },
    { id: 4, title: '로봇 플랫폼 개발', subtitle: '활성미장, 먹통 자동화 로봇', description: '박람회 관람 후 활성미장, 먹통 자동화 로봇 개발 가능여부 판단. 숙련공 부족 문제 해결 및 24시간 작업 가능', color: '#f59e0b', category: '로봇' },
    { id: 5, title: '디지털트윈 BIM 연동 모듈', subtitle: '가능성 및 재원 마련 검토', description: '디지털트윈 BIM 연동 모듈 가능성 및 가능시점 검토, 재원 마련 여부 분석. 현장의 실시간 3D 가시화 목표', color: '#ec4899', category: 'BIM' }
];

const defaultDetailedPlanSteps = [
    { order: 1, title: '영상기반 AI 안전, 품질관리 플랫폼', description: '모바일, siis통합관리', status: 'in-progress', linkText: '', linkUrl: '' },
    { order: 2, title: '품질 원가 관리시 5D BIM 검토 및 관리 부서 창설 가능여부, 플랫폼 연동', description: '최근 원청사는 5D BIM이 표준 기술로 자리잡았으며, 6D(지속가능성), 7D(시설관리)까지 개발중', status: 'planning', linkText: '', linkUrl: '' },
    { order: 3, title: '로봇 개발 및 임대', description: '특허 확보, 개발 가능한 재원 및 영역 검토, 현장 적용 가능 로봇 써치', status: 'research', linkText: '로봇산업협회', linkUrl: 'https://www.racp.or.kr/kr/' },
    { order: 4, title: '1, 2, 3을 통한 디지털 트윈 플랫폼 완성', description: '10년 장기 계획', status: 'long-term', linkText: '', linkUrl: '' }
];

const defaultExecutionPlan = [
    { phase: '1차', title: '성균관대 MOU 체결', tasks: '성균관대 미팅\n적용가능 현장 및 적용 방법 협의\n지출금액 등 협의', status: 'upcoming' },
    { phase: '2차', title: '적용 현장 시연 및 검증', tasks: '적용 현장 시연\n검증\n데이터 입력 및 수집 지원', status: 'planned' },
    { phase: '3차', title: '박람회 참관 및 하반기 계획', tasks: '박람회 참관\n보고서 작성\n하반기 미팅', status: 'planned' }
];

const defaultApprovalFlow = [
    { order: 1, role: '대표', name: '대표이사', color: '#dc2626' },
    { order: 2, role: '총괄', name: '이강범 전무', color: '#7c3aed' },
    { order: 3, role: '팀장', name: '김무빈 팀장', color: '#6366f1' },
    { order: 4, role: '총무', name: '황세원 총무', color: '#14b8a6' },
    { order: 5, role: '실행부서', name: '담당자', color: '#f59e0b' }
];

// 실행부서 예시 기본 데이터
const defaultExecutionDepartments = [
    { id: 1, category: '안전관련', name: '임성윤 차장', color: '#dc2626' },
    { id: 2, category: '구매관련', name: '김가윤 과장', color: '#f59e0b' },
    { id: 3, category: '전산관련', name: '천지연 대리', color: '#8b5cf6' }
];

const colorOptions = [
    { value: '#3b82f6', label: '파랑' }, { value: '#10b981', label: '초록' }, { value: '#8b5cf6', label: '보라' }, { value: '#f59e0b', label: '주황' },
    { value: '#ec4899', label: '핑크' }, { value: '#dc2626', label: '빨강' }, { value: '#14b8a6', label: '청록' }, { value: '#6366f1', label: '인디고' }
];

const statusOptions = [
    { value: 'in-progress', label: '진행중' }, { value: 'planning', label: '기획중' }, { value: 'research', label: '검토중' },
    { value: 'long-term', label: '장기계획' }, { value: 'upcoming', label: '예정' }, { value: 'planned', label: '계획' }, { value: 'completed', label: '완료' }
];

export default function StrategicPlan() {
    const { isMobileMode } = useDeviceMode();
    const { user, isAuthenticated } = useAuth();
    const isEditable = isAuthenticated && user?.role !== 'observer';
    const [activeTab, setActiveTab] = useState<'agenda' | 'plan' | 'execution' | 'approval'>('agenda');
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [planningAgenda, setPlanningAgenda] = useState(defaultPlanningAgenda);
    const [detailedPlanSteps, setDetailedPlanSteps] = useState(defaultDetailedPlanSteps);
    const [executionPlan, setExecutionPlan] = useState(defaultExecutionPlan);
    const [approvalFlow, setApprovalFlow] = useState(defaultApprovalFlow);
    const [executionDepartments, setExecutionDepartments] = useState(defaultExecutionDepartments);

    useEffect(() => {
        const loadData = async () => {
            try {
                const savedData = await fetchAllStrategicPlans();
                if (savedData.agenda) setPlanningAgenda(savedData.agenda);
                if (savedData.plan) setDetailedPlanSteps(savedData.plan);
                if (savedData.execution) setExecutionPlan(savedData.execution);
                if (savedData.approval) setApprovalFlow(savedData.approval);
                if (savedData.departments) setExecutionDepartments(savedData.departments);
            } catch (e) { console.log('기본값 사용'); }
        };
        loadData();
    }, []);

    const handleSave = async (type: string, data: any) => {
        setIsSaving(true);
        try { await saveStrategicPlan({ type: type as any, data }); } catch (e) { console.error(e); }
        setIsSaving(false);
    };

    // 안건 관련
    const handleEditAgenda = (item: any) => { setEditingItem({ ...item, editType: 'agenda' }); setShowModal(true); };
    const handleSaveAgenda = () => {
        const updated = planningAgenda.map(a => a.id === editingItem.id ? { ...editingItem, editType: undefined } : a);
        setPlanningAgenda(updated); handleSave('agenda', updated); setShowModal(false); setEditingItem(null);
    };
    const handleAddAgenda = () => { setEditingItem({ id: planningAgenda.length + 1, title: '새 안건', subtitle: '부제목', description: '설명', color: '#3b82f6', category: '카테고리', editType: 'agenda', isNew: true }); setShowModal(true); };
    const handleConfirmNewAgenda = () => { const { editType, isNew, ...rest } = editingItem; setPlanningAgenda([...planningAgenda, rest]); handleSave('agenda', [...planningAgenda, rest]); setShowModal(false); setEditingItem(null); };
    const handleDeleteAgenda = (id: number) => { if (!confirm('삭제?')) return; const updated = planningAgenda.filter(a => a.id !== id).map((a, i) => ({ ...a, id: i + 1 })); setPlanningAgenda(updated); handleSave('agenda', updated); };

    // 상세계획 관련
    const handleEditPlan = (item: any) => { setEditingItem({ ...item, editType: 'plan' }); setShowModal(true); };
    const handleSavePlan = () => { const updated = detailedPlanSteps.map(p => p.order === editingItem.order ? { ...editingItem, editType: undefined } : p); setDetailedPlanSteps(updated); handleSave('plan', updated); setShowModal(false); setEditingItem(null); };
    const handleAddPlan = () => { setEditingItem({ order: detailedPlanSteps.length + 1, title: '새 계획', description: '설명', status: 'planning', linkText: '', linkUrl: '', editType: 'plan', isNew: true }); setShowModal(true); };
    const handleConfirmNewPlan = () => { const { editType, isNew, ...rest } = editingItem; setDetailedPlanSteps([...detailedPlanSteps, rest]); handleSave('plan', [...detailedPlanSteps, rest]); setShowModal(false); setEditingItem(null); };
    const handleDeletePlan = (order: number) => { if (!confirm('삭제?')) return; const updated = detailedPlanSteps.filter(p => p.order !== order).map((p, i) => ({ ...p, order: i + 1 })); setDetailedPlanSteps(updated); handleSave('plan', updated); };

    // 실행계획 관련
    const handleEditExecution = (item: any) => { setEditingItem({ ...item, editType: 'execution' }); setShowModal(true); };
    const handleSaveExecution = () => { const updated = executionPlan.map(e => e.phase === editingItem.phase ? { ...editingItem, editType: undefined } : e); setExecutionPlan(updated); handleSave('execution', updated); setShowModal(false); setEditingItem(null); };
    const handleAddExecution = () => { setEditingItem({ phase: `${executionPlan.length + 1}차`, title: '새 실행 계획', tasks: '작업 1\n작업 2', status: 'planned', editType: 'execution', isNew: true }); setShowModal(true); };
    const handleConfirmNewExecution = () => { const { editType, isNew, ...rest } = editingItem; setExecutionPlan([...executionPlan, rest]); handleSave('execution', [...executionPlan, rest]); setShowModal(false); setEditingItem(null); };
    const handleDeleteExecution = (phase: string) => { if (!confirm('삭제?')) return; const updated = executionPlan.filter(e => e.phase !== phase).map((e, i) => ({ ...e, phase: `${i + 1}차` })); setExecutionPlan(updated); handleSave('execution', updated); };

    // 결의순서 관련
    const handleEditApproval = (item: any) => { setEditingItem({ ...item, editType: 'approval' }); setShowModal(true); };
    const handleSaveApproval = () => { const updated = approvalFlow.map(a => a.order === editingItem.order ? { ...editingItem, editType: undefined } : a); setApprovalFlow(updated); handleSave('approval', updated); setShowModal(false); setEditingItem(null); };
    const handleAddApproval = () => { setEditingItem({ order: approvalFlow.length + 1, role: '새 역할', name: '담당자', color: '#6366f1', editType: 'approval', isNew: true }); setShowModal(true); };
    const handleConfirmNewApproval = () => { const { editType, isNew, ...rest } = editingItem; setApprovalFlow([...approvalFlow, rest]); handleSave('approval', [...approvalFlow, rest]); setShowModal(false); setEditingItem(null); };
    const handleDeleteApproval = (order: number) => { if (!confirm('삭제?')) return; const updated = approvalFlow.filter(a => a.order !== order).map((a, i) => ({ ...a, order: i + 1 })); setApprovalFlow(updated); handleSave('approval', updated); };

    // 실행부서 예시 관련
    const handleEditDepartment = (item: any) => { setEditingItem({ ...item, editType: 'department' }); setShowModal(true); };
    const handleSaveDepartment = () => {
        const updated = executionDepartments.map(d => d.id === editingItem.id ? { ...editingItem, editType: undefined } : d);
        setExecutionDepartments(updated); handleSave('departments', updated); setShowModal(false); setEditingItem(null);
    };
    const handleAddDepartment = () => {
        setEditingItem({ id: executionDepartments.length + 1, category: '새 부서', name: '담당자', color: '#3b82f6', editType: 'department', isNew: true });
        setShowModal(true);
    };
    const handleConfirmNewDepartment = () => {
        const { editType, isNew, ...rest } = editingItem;
        setExecutionDepartments([...executionDepartments, rest]);
        handleSave('departments', [...executionDepartments, rest]);
        setShowModal(false); setEditingItem(null);
    };
    const handleDeleteDepartment = (id: number) => {
        if (!confirm('삭제?')) return;
        const updated = executionDepartments.filter(d => d.id !== id).map((d, i) => ({ ...d, id: i + 1 }));
        setExecutionDepartments(updated); handleSave('departments', updated);
    };

    const handleModalSave = () => {
        if (!editingItem) return;
        if (editingItem.isNew) {
            switch (editingItem.editType) {
                case 'agenda': handleConfirmNewAgenda(); break;
                case 'plan': handleConfirmNewPlan(); break;
                case 'execution': handleConfirmNewExecution(); break;
                case 'approval': handleConfirmNewApproval(); break;
                case 'department': handleConfirmNewDepartment(); break;
            }
        } else {
            switch (editingItem.editType) {
                case 'agenda': handleSaveAgenda(); break;
                case 'plan': handleSavePlan(); break;
                case 'execution': handleSaveExecution(); break;
                case 'approval': handleSaveApproval(); break;
                case 'department': handleSaveDepartment(); break;
            }
        }
    };

    // 상태 순환 함수
    const cycleStatus = (currentStatus: string): string => {
        const statusOrder = ['in-progress', 'planning', 'research', 'long-term', 'upcoming', 'planned', 'completed'];
        const currentIndex = statusOrder.indexOf(currentStatus);
        const nextIndex = (currentIndex + 1) % statusOrder.length;
        return statusOrder[nextIndex];
    };

    // 상세계획 상태 변경
    const handleCyclePlanStatus = async (step: any) => {
        const newStatus = cycleStatus(step.status);
        const updated = detailedPlanSteps.map(p => p.order === step.order ? { ...p, status: newStatus } : p);
        setDetailedPlanSteps(updated);
        await handleSave('plan', updated);
    };

    // 실행계획 상태 변경
    const handleCycleExecutionStatus = async (plan: any) => {
        const newStatus = cycleStatus(plan.status);
        const updated = executionPlan.map(e => e.phase === plan.phase ? { ...e, status: newStatus } : e);
        setExecutionPlan(updated);
        await handleSave('execution', updated);
    };

    // 기본값으로 복원
    const handleResetToDefaults = async (type: string) => {
        if (!confirm('기본값으로 복원하시겠습니까? 현재 데이터가 초기화됩니다.')) return;
        switch (type) {
            case 'agenda':
                setPlanningAgenda(defaultPlanningAgenda);
                await handleSave('agenda', defaultPlanningAgenda);
                break;
            case 'plan':
                setDetailedPlanSteps(defaultDetailedPlanSteps);
                await handleSave('plan', defaultDetailedPlanSteps);
                break;
            case 'execution':
                setExecutionPlan(defaultExecutionPlan);
                await handleSave('execution', defaultExecutionPlan);
                break;
            case 'approval':
                setApprovalFlow(defaultApprovalFlow);
                await handleSave('approval', defaultApprovalFlow);
                break;
            case 'departments':
                setExecutionDepartments(defaultExecutionDepartments);
                await handleSave('departments', defaultExecutionDepartments);
                break;
        }
    };

    const getStatusBadge = (status: string, onClick?: () => void, isClickable?: boolean) => {
        const styles: Record<string, string> = {
            'in-progress': 'bg-blue-100 text-blue-700', 'planning': 'bg-purple-100 text-purple-700', 'research': 'bg-yellow-100 text-yellow-700',
            'long-term': 'bg-gray-100 text-gray-700', 'upcoming': 'bg-green-100 text-green-700', 'planned': 'bg-orange-100 text-orange-700', 'completed': 'bg-emerald-100 text-emerald-700'
        };
        const labels: Record<string, string> = { 'in-progress': '진행중', 'planning': '기획중', 'research': '검토중', 'long-term': '장기계획', 'upcoming': '예정', 'planned': '계획', 'completed': '완료' };
        return (
            <span
                className={`px-2 py-1 text-xs rounded-full font-medium ${styles[status] || ''} ${isClickable ? 'cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-gray-300 transition-all' : ''}`}
                onClick={(e) => { if (onClick) { e.stopPropagation(); onClick(); } }}
            >
                {labels[status] || ''}
            </span>
        );
    };

    const getModalTitle = () => {
        if (!editingItem) return '';
        const isNew = editingItem.isNew;
        const titles: Record<string, string> = {
            agenda: isNew ? '새 안건 추가' : '안건 수정',
            plan: isNew ? '새 계획 추가' : '계획 수정',
            execution: isNew ? '새 실행 계획 추가' : '실행 계획 수정',
            approval: isNew ? '새 결의 단계 추가' : '결의 순서 수정',
            department: isNew ? '새 실행부서 추가' : '실행부서 수정'
        };
        return titles[editingItem.editType] || '수정';
    };

    // 색상에 맞는 border 클래스 반환
    const getBorderColorClass = (color: string) => {
        const colorMap: Record<string, string> = {
            '#dc2626': 'border-red-200',
            '#f59e0b': 'border-orange-200',
            '#8b5cf6': 'border-purple-200',
            '#3b82f6': 'border-blue-200',
            '#10b981': 'border-green-200',
            '#ec4899': 'border-pink-200',
            '#14b8a6': 'border-teal-200',
            '#6366f1': 'border-indigo-200'
        };
        return colorMap[color] || 'border-gray-200';
    };

    return (
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
            {/* 헤더 - 모바일 반응형 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black text-center sm:text-left">미래전략 TF 계획</h2>
                {isEditable && (
                    <button
                        onClick={() => setIsEditMode(!isEditMode)}
                        className={`w-full sm:w-auto px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${isEditMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 border border-gray-200'}`}
                    >
                        {isEditMode ? '편집 종료' : '편집 모드'}
                    </button>
                )}
            </div>

            {isEditMode && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                    <div className="flex items-start sm:items-center gap-2 text-gray-700">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <div>
                            <span className="font-medium text-sm sm:text-base">편집 모드</span>
                            <p className="text-gray-500 text-xs sm:text-sm mt-0.5">카드를 탭하여 수정하세요</p>
                        </div>
                    </div>
                </div>
            )}

            {/* 탭 - 모바일 스크롤 가능 */}
            <div className="overflow-x-auto -mx-2 px-2 mb-4 sm:mb-6">
                <div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap sm:justify-center">
                    {[{ key: 'agenda', label: '계획 수립 안건' }, { key: 'plan', label: '상세계획순서' }, { key: 'execution', label: '실행 계획' }, { key: 'approval', label: '결의 순서' }].map(tab => (
                        <button key={tab.key} onClick={() => setActiveTab(tab.key as any)}
                            className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm whitespace-nowrap transition-all ${activeTab === tab.key ? 'bg-black text-white' : 'bg-white text-gray-600 border border-gray-300'}`}
                        >{tab.label}</button>
                    ))}
                </div>
            </div>

            {/* 계획 수립 안건 */}
            {activeTab === 'agenda' && (
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="text-gray-500 text-xs sm:text-sm">이강범 전무님 지침</div>
                        {isEditMode && <button onClick={handleAddAgenda} className="w-full sm:w-auto px-3 py-2 bg-black text-white rounded-lg text-xs sm:text-sm font-medium">+ 안건 추가</button>}
                    </div>
                    <div className={`grid gap-4 ${isMobileMode ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                        {planningAgenda.map((item) => (
                            <div key={item.id} onClick={() => isEditMode && handleEditAgenda(item)}
                                className={`bg-white p-4 sm:p-5 rounded-xl border border-gray-200 transition-all ${isEditMode ? 'cursor-pointer active:scale-[0.98] hover:border-gray-400' : ''}`}
                                style={{ borderTopColor: item.color, borderTopWidth: '4px' }}>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="px-2 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: item.color }}>{item.category}</span>
                                    <div className="flex items-center gap-2">
                                        {isEditMode && <button onClick={(e) => { e.stopPropagation(); handleDeleteAgenda(item.id); }} className="w-6 h-6 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-xs hover:bg-red-100 hover:text-red-600">x</button>}
                                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: item.color }}>{item.id}</div>
                                    </div>
                                </div>
                                <h4 className="text-black font-bold text-base sm:text-lg mb-1 leading-tight">{item.title}</h4>
                                <div className="text-xs sm:text-sm font-medium mb-2" style={{ color: item.color }}>{item.subtitle}</div>
                                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3">{item.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-4">
                        <div className="text-center">
                            <div className="text-black font-bold text-sm sm:text-base mb-2">2026년 스마트 건설 핵심 전략</div>
                            <div className="flex justify-center gap-4 sm:gap-8">
                                <div className="text-center"><div className="text-xl sm:text-2xl font-bold text-black">{planningAgenda.length}</div><div className="text-xs text-gray-500">핵심 과제</div></div>
                                <div className="text-center"><div className="text-xl sm:text-2xl font-bold text-black">{planningAgenda.filter(a => a.category.includes('AI')).length}</div><div className="text-xs text-gray-500">AI 기반</div></div>
                                <div className="text-center"><div className="text-xl sm:text-2xl font-bold text-black">10년</div><div className="text-xs text-gray-500">로드맵</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 상세계획순서 */}
            {activeTab === 'plan' && (
                <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <div className="text-gray-500 text-xs sm:text-sm">상세계획순서</div>
                        <div className="flex gap-2 w-full sm:w-auto">
                            {isEditMode && <button onClick={() => handleResetToDefaults('plan')} className="flex-1 sm:flex-none px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-200">기본값 복원</button>}
                            {isEditMode && <button onClick={handleAddPlan} className="flex-1 sm:flex-none px-3 py-2 bg-black text-white rounded-lg text-xs sm:text-sm font-medium">+ 계획 추가</button>}
                        </div>
                    </div>
                    {detailedPlanSteps.map((step) => (
                        <div key={step.order} onClick={() => isEditMode && handleEditPlan(step)}
                            className={`bg-white p-4 rounded-xl border border-gray-200 transition-all ${isEditMode ? 'cursor-pointer active:scale-[0.99]' : ''}`}>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">{step.order}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                        <div className="text-black font-bold text-sm sm:text-base leading-tight">{step.title}</div>
                                        <div className="flex items-center gap-2">
                                            {isEditMode && <button onClick={(e) => { e.stopPropagation(); handleDeletePlan(step.order); }} className="w-5 h-5 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-xs hover:bg-red-100 hover:text-red-600">x</button>}
                                            {getStatusBadge(step.status, isEditMode ? () => { handleCyclePlanStatus(step); } : undefined, isEditMode)}
                                        </div>
                                    </div>
                                    <div className="text-gray-600 text-xs sm:text-sm bg-gray-50 p-3 rounded-lg">{step.description}</div>
                                    {step.linkText && step.linkUrl && <a href={step.linkUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-block mt-2 text-xs sm:text-sm text-blue-600 font-medium">{step.linkText} →</a>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 전반기 실행 계획 */}
            {activeTab === 'execution' && (
                <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <div className="text-gray-500 text-xs sm:text-sm">전반기 실행 계획</div>
                        {isEditMode && <button onClick={handleAddExecution} className="w-full sm:w-auto px-3 py-2 bg-black text-white rounded-lg text-xs sm:text-sm font-medium">+ 실행 계획 추가</button>}
                    </div>
                    <div className={`grid gap-4 ${isMobileMode ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                        {executionPlan.map((plan) => (
                            <div key={plan.phase} onClick={() => isEditMode && handleEditExecution(plan)}
                                className={`bg-white p-4 rounded-xl border border-gray-200 transition-all ${isEditMode ? 'cursor-pointer active:scale-[0.98]' : ''}`}>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="bg-black px-3 py-1.5 rounded-lg text-white font-bold text-xs sm:text-sm">{plan.phase}</div>
                                    <div className="flex items-center gap-2">
                                        {isEditMode && <button onClick={(e) => { e.stopPropagation(); handleDeleteExecution(plan.phase); }} className="w-5 h-5 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-xs hover:bg-red-100 hover:text-red-600">x</button>}
                                        {getStatusBadge(plan.status, isEditMode ? () => { handleCycleExecutionStatus(plan); } : undefined, isEditMode)}
                                    </div>
                                </div>
                                <div className="text-black font-bold text-sm sm:text-base mb-2">{plan.title}</div>
                                <ul className="space-y-1">
                                    {(typeof plan.tasks === 'string' ? plan.tasks.split('\n') : plan.tasks).map((task: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2 text-gray-600 text-xs sm:text-sm"><span className="text-gray-400">-</span>{task}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 결의 순서 */}
            {activeTab === 'approval' && (
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <div className="text-gray-500 text-xs sm:text-sm">결의 순서</div>
                        {isEditMode && <button onClick={handleAddApproval} className="w-full sm:w-auto px-3 py-2 bg-black text-white rounded-lg text-xs sm:text-sm font-medium">+ 결의 단계 추가</button>}
                    </div>
                    {/* 모바일: 세로 배치, PC: 가로 배치 */}
                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-2 sm:gap-3">
                        {approvalFlow.map((step, idx) => (
                            <div key={step.order} className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto">
                                <div onClick={() => isEditMode && handleEditApproval(step)}
                                    className={`w-full sm:w-auto px-4 py-3 rounded-xl text-white font-semibold min-w-[100px] sm:min-w-[120px] text-center shadow-md relative ${isEditMode ? 'cursor-pointer active:scale-95' : ''}`}
                                    style={{ backgroundColor: step.color }}>
                                    {isEditMode && <button onClick={(e) => { e.stopPropagation(); handleDeleteApproval(step.order); }} className="absolute -top-1 -right-1 w-5 h-5 bg-white text-gray-600 rounded-full flex items-center justify-center text-xs shadow hover:bg-red-100 hover:text-red-600">x</button>}
                                    <div className="text-xs sm:text-sm font-bold">{step.role}</div>
                                    <div className="text-xs mt-0.5 opacity-90">{step.name}</div>
                                </div>
                                {idx < approvalFlow.length - 1 && <div className="text-xl sm:text-2xl text-gray-300 font-bold rotate-90 sm:rotate-0">→</div>}
                            </div>
                        ))}
                    </div>

                    {/* 실행부서 예시 섹션 - 동적으로 관리 */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                            <div className="text-black font-bold text-sm">실행부서 예시</div>
                            {isEditMode && <button onClick={handleAddDepartment} className="w-full sm:w-auto px-3 py-2 bg-black text-white rounded-lg text-xs font-medium">+ 실행부서 추가</button>}
                        </div>
                        <div className={`grid gap-3 ${isMobileMode ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
                            {executionDepartments.map((dept) => (
                                <div
                                    key={dept.id}
                                    onClick={() => isEditMode && handleEditDepartment(dept)}
                                    className={`bg-white p-3 rounded-lg border-2 relative transition-all ${getBorderColorClass(dept.color)} ${isEditMode ? 'cursor-pointer hover:shadow-md' : ''}`}
                                >
                                    {isEditMode && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDeleteDepartment(dept.id); }}
                                            className="absolute -top-2 -right-2 w-5 h-5 bg-white text-gray-600 rounded-full flex items-center justify-center text-xs shadow border border-gray-200 hover:bg-red-100 hover:text-red-600"
                                        >x</button>
                                    )}
                                    <div className="text-xs font-medium" style={{ color: dept.color }}>{dept.category}</div>
                                    <div className="text-black font-bold text-sm mt-1">{dept.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* 수정 모달 - 모바일 풀스크린 */}
            {showModal && editingItem && (
                <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
                    <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden flex flex-col">
                        <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="text-lg sm:text-xl font-bold text-black">{getModalTitle()}</h3>
                            <button onClick={() => { setShowModal(false); setEditingItem(null); }} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">x</button>
                        </div>
                        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
                            {editingItem.editType === 'agenda' && (
                                <>
                                    <div><label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">제목</label><input type="text" value={editingItem.title} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                                    <div><label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">부제목</label><input type="text" value={editingItem.subtitle} onChange={(e) => setEditingItem({ ...editingItem, subtitle: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                                    <div><label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">설명</label><textarea value={editingItem.description} onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                                    <div><label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">카테고리</label><input type="text" value={editingItem.category} onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                                    <div><label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">색상</label><div className="flex flex-wrap gap-2">{colorOptions.map((c) => (<button key={c.value} onClick={() => setEditingItem({ ...editingItem, color: c.value })} className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 ${editingItem.color === c.value ? 'border-black scale-110' : 'border-transparent'}`} style={{ backgroundColor: c.value }} />))}</div></div>
                                </>
                            )}
                            {editingItem.editType === 'plan' && (
                                <>
                                    <div><label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">제목</label><input type="text" value={editingItem.title} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                                    <div><label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">설명</label><textarea value={editingItem.description} onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                                    <div><label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">상태</label><select value={editingItem.status} onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">{statusOptions.map(s => (<option key={s.value} value={s.value}>{s.label}</option>))}</select></div>
                                    <div><label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">링크 텍스트</label><input type="text" value={editingItem.linkText || ''} onChange={(e) => setEditingItem({ ...editingItem, linkText: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                                    <div><label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">링크 URL</label><input type="url" value={editingItem.linkUrl || ''} onChange={(e) => setEditingItem({ ...editingItem, linkUrl: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                                </>
                            )}
                            {editingItem.editType === 'execution' && (
                                <>
                                    <div><label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">단계</label><input type="text" value={editingItem.phase} onChange={(e) => setEditingItem({ ...editingItem, phase: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                                    <div><label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">제목</label><input type="text" value={editingItem.title} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                                    <div><label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">작업 목록 (줄바꿈 구분)</label><textarea value={editingItem.tasks} onChange={(e) => setEditingItem({ ...editingItem, tasks: e.target.value })} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                                    <div><label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">상태</label><select value={editingItem.status} onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">{statusOptions.map(s => (<option key={s.value} value={s.value}>{s.label}</option>))}</select></div>
                                </>
                            )}
                            {editingItem.editType === 'approval' && (
                                <>
                                    <div><label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">역할</label><input type="text" value={editingItem.role} onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                                    <div><label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">담당자명</label><input type="text" value={editingItem.name} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                                    <div><label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">색상</label><div className="flex flex-wrap gap-2">{colorOptions.map((c) => (<button key={c.value} onClick={() => setEditingItem({ ...editingItem, color: c.value })} className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 ${editingItem.color === c.value ? 'border-black scale-110' : 'border-transparent'}`} style={{ backgroundColor: c.value }} />))}</div></div>
                                </>
                            )}
                            {editingItem.editType === 'department' && (
                                <>
                                    <div><label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">부서/분야</label><input type="text" value={editingItem.category} onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="예: 안전관련, 구매관련" /></div>
                                    <div><label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">담당자명</label><input type="text" value={editingItem.name} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="예: 홍길동 과장" /></div>
                                    <div><label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">색상</label><div className="flex flex-wrap gap-2">{colorOptions.map((c) => (<button key={c.value} onClick={() => setEditingItem({ ...editingItem, color: c.value })} className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 ${editingItem.color === c.value ? 'border-black scale-110' : 'border-transparent'}`} style={{ backgroundColor: c.value }} />))}</div></div>
                                </>
                            )}
                        </div>
                        <div className="p-4 sm:p-6 border-t border-gray-200 flex gap-3">
                            <button onClick={() => { setShowModal(false); setEditingItem(null); }} className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm">취소</button>
                            <button onClick={handleModalSave} disabled={isSaving} className="flex-1 px-4 py-3 bg-black text-white rounded-lg font-medium text-sm disabled:opacity-50">{isSaving ? '저장 중...' : '저장'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
