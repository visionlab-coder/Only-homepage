const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function clearActivities() {
    const { error } = await supabase
        .from('tf_strategic_plans')
        .upsert({
            id: 'activities',
            type: 'activities',
            data: [],
            updated_at: new Date().toISOString(),
            updated_by: 'system_clear'
        }, { onConflict: 'id' });

    if (error) {
        console.error('DB 저장 실패:', error.message);
    } else {
        console.log('Successfully cleared all remote activities.');
    }
}

clearActivities();
