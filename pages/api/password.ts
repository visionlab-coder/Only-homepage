export const config = {
    runtime: 'edge',
};

let globalPasswordChanges: Record<string, any> = {};

export default async function handler(req: Request) {
    if (req.method === 'GET') {
        return new Response(JSON.stringify(globalPasswordChanges), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (req.method === 'POST') {
        const body = await req.json();
        const { userId, newPassword, changedBy } = body;

        if (!userId || !newPassword) {
            return new Response(JSON.stringify({ error: 'Missing data' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        globalPasswordChanges[userId] = {
            newPassword,
            changedBy,
            changedAt: new Date().toISOString()
        };

        return new Response(JSON.stringify({ success: true, changes: globalPasswordChanges }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(null, { status: 405 });
}
