/**
 * SAVING.CAREERS - DATABASE CONTROLLER (SUPABASE) v1.3
 */

const SUPABASE_URL = 'https://wxxnwgyvivwnovqtbbwx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_jKcsxv8epzFGCJzBDzt3sA_D5vPqHiJ';

// Initialize Supabase Client safely
let supabase = null;
try {
  if (window.supabase) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase: Client Initialized');
  }
} catch (e) {
  console.error('Supabase: Initialization Failed', e);
}

/**
 * DUAL-SYNC: Save Lead to Supabase & GHL (Bingo)
 */
async function saveLead(leadData) {
  console.log('Dual-Sync: Initiating...', leadData);
  let supabaseSuccess = false;

  try {
    // 1. Supabase Sync
    if (supabase) {
      const { error } = await supabase
        .from('leads')
        .insert([{ 
          full_name: leadData.name, 
          email: leadData.email,
          industry: leadData.industry || 'UNKNOWN',
          timestamp: new Date().toISOString()
        }]);
      
      if (!error) {
        supabaseSuccess = true;
        console.log('Supabase: Data Saved');
      } else {
        console.warn('Supabase: Save Error', error.message);
      }
    }

    // 2. GHL Sync (Fire and forget)
    const BINGO_WEBHOOK_URL = 'REPLACE_WITH_YOUR_GHL_WEBHOOK_URL';
    if (BINGO_WEBHOOK_URL && !BINGO_WEBHOOK_URL.includes('REPLACE_WITH')) {
      fetch(BINGO_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      }).catch(e => console.warn('GHL: Webhook Error', e));
    }

    // ALWAYS return success to the UI to prevent blocking the user
    return { success: true, partial: !supabaseSuccess };
  } catch (globalErr) {
    console.error('Dual-Sync: Critical Error', globalErr);
    return { success: true, partial: true };
  }
}

/**
 * Toggle Step Completion
 */
async function toggleStep(stepNum, isCompleted) {
  if (!supabase) return;
  const email = localStorage.getItem('sccs_user_email');
  if (!email) return;

  try {
    await supabase.from('profiles').upsert({ 
      email: email, 
      [`step_${stepNum}_complete`]: isCompleted,
      last_active: new Date().toISOString() 
    });
    if (typeof window.addActivityLog === 'function') {
      window.addActivityLog(`Phase ${stepNum} synced`);
    }
  } catch (e) {
    console.warn('Step Sync Error', e);
  }
}

/**
 * Save Survival Assessment Score
 */
async function saveSurvivalScore(scoreData) {
  if (!supabase) return;
  try {
    await supabase.from('assessments').insert([{ 
      score: scoreData.score, 
      risk_level: scoreData.level,
      industry: scoreData.industry,
      timestamp: new Date().toISOString()
    }]);
  } catch (e) {
    console.warn('Score Sync Error', e);
  }
}

/**
 * Fetch Data for Feed
 */
async function getLiveFeed() {
  if (!supabase) return [];
  try {
    const { data } = await supabase
      .from('assessments')
      .select('score, risk_level, industry, timestamp')
      .order('timestamp', { ascending: false })
      .limit(10);
    return data || [];
  } catch (e) {
    return [];
  }
}

/**
 * Fetch Total Activations
 */
async function fetchTotalActivations() {
  if (!supabase) return 12483;
  try {
    const { count } = await supabase.from('assessments').select('*', { count: 'exact', head: true });
    return 12483 + (count || 0);
  } catch (e) {
    return 12483;
  }
}

async function updateGlobalCounter() {
  const el = document.getElementById('global-counter');
  if (!el) return;
  const total = await fetchTotalActivations();
  el.textContent = `LIVE: ${total.toLocaleString()} CAREERS ACTIVATED`;
}

// Initialize
document.addEventListener('DOMContentLoaded', updateGlobalCounter);

// Global Exports
window.saveLead = saveLead;
window.toggleStep = toggleStep;
window.saveSurvivalScore = saveSurvivalScore;
window.getLiveFeed = getLiveFeed;
window.updateGlobalCounter = updateGlobalCounter;
window.isDatabaseReady = true;
