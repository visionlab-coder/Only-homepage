import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// 주의: Vercel 서버리스 환경에서는 파일 시스템 쓰기가 영구적이지 않을 수 있습니다.
// 실제 운영 환경에서는 Supabase나 Vercel KV 같은 외부 DB 연동이 필수입니다.
// 아래 코드는 전역 동기화를 위한 구조적 기틀을 제공합니다.

let globalPasswordChanges: Record<string, any> = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // 모든 변경 내역 가져오기
        return res.status(200).json(globalPasswordChanges);
    }

    if (req.method === 'POST') {
        const { userId, newPassword, changedBy } = req.body;

        if (!userId || !newPassword) {
            return res.status(400).json({ error: 'Missing data' });
        }

        // 메모리에 저장 (실제로는 여기서 DB Write가 일어나야 함)
        globalPasswordChanges[userId] = {
            newPassword,
            changedBy,
            changedAt: new Date().toISOString()
        };

        return res.status(200).json({ success: true, changes: globalPasswordChanges });
    }

    return res.status(405).end();
}
