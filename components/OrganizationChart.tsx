import { useState, useEffect } from 'react';
import { tracksData } from '../data/organization';
import { Task } from '../interfaces/Organization';
import { useDeviceMode } from '../contexts/DeviceModeContext';
import { fetchRemoteTasks } from '../lib/supabase';

export default function OrganizationChart() {
    const { isMobileMode } = useDeviceMode();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadRemoteTasks = async () => {
            const remoteTasks = await fetchRemoteTasks();
            setTasks(remoteTasks);
            setIsLoading(false);
        };
        loadRemoteTasks();

        // 데이터 실시간 새로고침 간격 (선택사항)
        const interval = setInterval(loadRemoteTasks, 30000);
        return () => clearInterval(interval);
    }, []);

    // Get active tasks for a specific member
    const getMemberTasks = (memberId: string) => {
        return tasks.filter(task =>
            task.assignedTo === memberId &&
            task.status !== 'completed'
        );
    };
    return (
        <div className="card-glass p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">미래전략TF 원팀 맵</h3>

            {/* Mermaid-style hierarchy visualization */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-white/10">
                {/* 총괄 책임임원 */}
                <div className="flex justify-center mb-8">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-10 py-5 rounded-xl shadow-2xl border-2 border-purple-400 min-w-[250px]">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="text-white font-bold text-xl">이강범 전무</div>
                                <div className="text-purple-100 text-sm mt-1">총괄</div>
                                <div className="text-purple-200 text-xs mt-2 opacity-80">📋 총괄</div>
                            </div>
                            {getMemberTasks('executive-lee-kang-beom').length > 0 && (
                                <div className="bg-white/20 text-white text-xs px-2 py-1 rounded-full font-semibold border border-white/30">
                                    {getMemberTasks('executive-lee-kang-beom').length}
                                </div>
                            )}
                        </div>
                        {getMemberTasks('executive-lee-kang-beom').length > 0 && (
                            <div className="mt-3 pt-3 border-t border-purple-400/30 space-y-1">
                                {getMemberTasks('executive-lee-kang-beom').map(task => (
                                    <div key={task.id} className="text-xs text-purple-100 flex items-center space-x-2">
                                        <span className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-red-400' : task.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'}`}></span>
                                        <span className="truncate">{task.title}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Connection line */}
                <div className="flex justify-center mb-8">
                    <div className="w-1 h-12 bg-gradient-to-b from-purple-600 to-primary"></div>
                </div>

                {/* 팀장 */}
                <div className="flex justify-center mb-8">
                    <div className="bg-gradient-to-r from-primary to-secondary px-8 py-4 rounded-xl shadow-lg min-w-[220px]">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="text-white font-bold text-lg">김무빈 팀장</div>
                                <div className="text-blue-100 text-xs mt-1">팀장</div>
                                <div className="text-blue-200 text-xs mt-2 opacity-80">📋 기획, 추진, 제안</div>
                            </div>
                            {getMemberTasks('kim-mu-bin').length > 0 && (
                                <div className="bg-white/20 text-white text-xs px-2 py-1 rounded-full font-semibold border border-white/30">
                                    {getMemberTasks('kim-mu-bin').length}
                                </div>
                            )}
                        </div>
                        {getMemberTasks('kim-mu-bin').length > 0 && (
                            <div className="mt-2 pt-2 border-t border-white/20 space-y-1">
                                {getMemberTasks('kim-mu-bin').map(task => (
                                    <div key={task.id} className="text-xs flex items-center space-x-2 text-blue-50">
                                        <span className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-red-400' : task.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'}`}></span>
                                        <span className="truncate opacity-90">{task.title}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Connection line */}
                <div className="flex justify-center mb-8">
                    <div className="w-1 h-12 bg-gradient-to-b from-primary to-transparent"></div>
                </div>

                {/* Tracks grid */}
                <div className={isMobileMode ? "grid grid-cols-1 gap-6" : "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6"}>
                    {tracksData.filter(t => t.id !== 'management' && t.id !== 'executive').map((track) => (
                        <div key={track.id} className="relative">
                            {/* Track header */}
                            <div
                                className="rounded-t-xl p-4 font-bold text-white text-center shadow-lg"
                                style={{ backgroundColor: track.color }}
                            >
                                <span className="whitespace-nowrap">{track.name}</span>
                            </div>

                            {/* Members */}
                            <div className="bg-white/5 rounded-b-xl p-4 border-x border-b border-white/10">
                                <div className="space-y-3">
                                    {track.members.map((member) => {
                                        const memberTasks = getMemberTasks(member.id);
                                        return (
                                            <div
                                                key={member.id}
                                                className="bg-slate-800/50 p-3 rounded-lg hover:bg-slate-700/50 transition-all duration-300 border border-white/5"
                                            >
                                                <div className="flex items-center justify-between mb-1">
                                                    <div>
                                                        <div className="text-white font-semibold">{member.name}</div>
                                                        <div className="text-gray-400 text-sm">{member.position}</div>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        {/* Task count badge */}
                                                        {memberTasks.length > 0 && (
                                                            <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                                                {memberTasks.length}
                                                            </div>
                                                        )}
                                                        <div
                                                            className="w-3 h-3 rounded-full"
                                                            style={{ backgroundColor: track.color }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                {/* 상세업무 표시 */}
                                                <div className="text-xs text-gray-300 mt-2 bg-slate-900/50 px-2 py-1.5 rounded">
                                                    📋 {member.responsibilities.join(', ')}
                                                </div>

                                                {/* Task list */}
                                                {memberTasks.length > 0 && (
                                                    <div className="mt-2 pt-2 border-t border-white/10 space-y-1">
                                                        {memberTasks.map((task) => (
                                                            <div key={task.id} className="text-xs">
                                                                <div className="flex items-center space-x-2">
                                                                    <span className={`
                                                                        inline-block w-2 h-2 rounded-full
                                                                        ${task.priority === 'high' ? 'bg-red-400' :
                                                                            task.priority === 'medium' ? 'bg-yellow-400' :
                                                                                'bg-green-400'}
                                                                    `}></span>
                                                                    <span className="text-gray-300 truncate">{task.title}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="text-center text-sm text-gray-400 mb-4">총 {tracksData.length}개 트랙 • {tracksData.reduce((sum, track) => sum + track.members.length, 0)}명</div>
                </div>
            </div>
        </div>
    );
}
