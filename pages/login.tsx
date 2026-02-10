import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // 로그인 시도
        const success = await login(username, password);

        if (success) {
            // 로그인 성공
            router.push('/');
        } else {
            // 로그인 실패
            setError('아이디 또는 비밀번호가 올바르지 않습니다.');
            setPassword('');
        }

        setLoading(false);
    };

    return (
        <>
            <Head>
                <title>로그인 | 서원토건 미래전략TF</title>
                <meta name="description" content="서원토건 미래전략TF 로그인" />
            </Head>

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
                <div className="max-w-md w-full space-y-8">
                    {/* 로고 및 헤더 */}
                    <div className="text-center">
                        <div className="mx-auto h-16 w-16 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                            <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                            서원토건 미래전략TF
                        </h2>
                        <p className="text-gray-400 text-sm">
                            인가된 사용자만 접근 가능합니다
                        </p>
                    </div>

                    {/* 로그인 폼 */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* 아이디 입력 */}
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-2">
                                    아이디
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="appearance-none relative block w-full px-4 py-3 border border-gray-600 bg-gray-800/50 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="사용자 아이디 입력"
                                />
                            </div>

                            {/* 비밀번호 입력 */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                                    비밀번호
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none relative block w-full px-4 py-3 border border-gray-600 bg-gray-800/50 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="비밀번호 입력"
                                />
                            </div>

                            {/* 에러 메시지 */}
                            {error && (
                                <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            {/* 로그인 버튼 */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {loading ? '로그인 중...' : '로그인'}
                            </button>
                        </form>

                        {/* 보안 안내 */}
                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-400">
                                🔒 보안 시스템: 13명의 인가된 사용자만 접근 가능
                            </p>
                        </div>
                    </div>

                    {/* 하단 정보 */}
                    <div className="text-center text-xs text-gray-500">
                        서원토건 미래전략TF © 2026. All rights reserved.
                    </div>
                </div>
            </div>
        </>
    );
}
