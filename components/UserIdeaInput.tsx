import { useState } from 'react';
import AIAnalysis from './AIAnalysis';
import FileUpload from './FileUpload';
import { useAuth } from '../contexts/AuthContext';

interface UserIdea {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
}

interface UserIdeaInputProps {
    trendId: string;
    trendTitle: string;
}

export default function UserIdeaInput({ trendId, trendTitle }: UserIdeaInputProps) {
    const { user, isAuthenticated } = useAuth();
    const isObserver = !isAuthenticated || user?.role === 'observer';
    const [ideas, setIdeas] = useState<UserIdea[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const addIdea = () => {
        if (!newTitle.trim() || !newDescription.trim()) {
            alert('아이디어 제목과 설명을 모두 입력해주세요.');
            return;
        }

        const idea: UserIdea = {
            id: `user-idea-${Date.now()}`,
            title: newTitle,
            description: newDescription,
            createdAt: new Date()
        };

        setIdeas(prev => [...prev, idea]);
        setNewTitle('');
        setNewDescription('');
        setIsAdding(false);
    };

    const removeIdea = (id: string) => {
        setIdeas(prev => prev.filter(idea => idea.id !== id));
    };

    return (
        <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-black">사용자 아이디어</h2>
                {!isAdding && !isObserver && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
                    >
                        + 새 아이디어 추가
                    </button>
                )}
            </div>

            {/* Add New Idea Form */}
            {isAdding && (
                <div className="bg-white border-2 border-black rounded-2xl p-8 mb-8">
                    <h3 className="text-xl font-bold text-black mb-4">새 아이디어 입력</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                아이디어 제목
                            </label>
                            <input
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                placeholder="예: AI 기반 자동 품질 관리 시스템"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                상세 설명
                            </label>
                            <textarea
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                placeholder="아이디어의 목표, 방법, 기대효과 등을 자세히 설명해주세요..."
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-black resize-none"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={addIdea}
                                className="flex-1 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
                            >
                                아이디어 저장
                            </button>
                            <button
                                onClick={() => {
                                    setIsAdding(false);
                                    setNewTitle('');
                                    setNewDescription('');
                                }}
                                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* User Ideas List */}
            {ideas.length > 0 && (
                <div className="space-y-8">
                    {ideas.map((idea, index) => (
                        <div key={idea.id} className="bg-white border border-gray-200 rounded-2xl p-8">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-start space-x-4 flex-1">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-black mb-2">
                                            {idea.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed mb-2">
                                            {idea.description}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            생성일: {idea.createdAt.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                {!isObserver && (
                                    <button
                                        onClick={() => removeIdea(idea.id)}
                                        className="ml-4 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-all text-sm"
                                    >
                                        삭제
                                    </button>
                                )}
                            </div>

                            {/* AI Analysis for User Idea */}
                            <div className="mb-6">
                                <AIAnalysis
                                    ideaTitle={idea.title}
                                    ideaDescription={idea.description}
                                    index={ideas.length + index}
                                />
                            </div>

                            {/* File Upload for User Idea */}
                            <div className="pt-6 border-t border-gray-200">
                                <FileUpload
                                    trendId={`${trendId}-user-${idea.id}`}
                                    trendTitle={idea.title}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {ideas.length === 0 && !isAdding && (
                <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                    <p className="text-gray-500 text-lg mb-4">
                        아직 추가된 아이디어가 없습니다.
                    </p>
                    <p className="text-gray-400 text-sm">
                        새 아이디어 추가 버튼을 클릭하여 시작하세요.
                    </p>
                </div>
            )}
        </div>
    );
}
