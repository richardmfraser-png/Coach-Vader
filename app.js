(() => {
  'use strict';

  const STORAGE_KEY = 'vaderMode.v1';
  const todayKey = () => new Date().toISOString().slice(0,10);

  const stages = [
    {
      id: 'starting-out', name: 'Starting Out', icon: '◉',
      lessons: [
        ['Perfect your interview technique','COMMAND','Prepare, listen, and answer with calm confidence. Presence beats performance theatre.','Before your next important conversation, write the three points you most want the other person to remember.','Do not interrogate the interviewer or arrive with your own stormtroopers.'],
        ['Succeed as an intern','CLARITY','Approach small assignments as evidence of reliability. Learn fast, ask useful questions, and make yourself easy to trust.','Take one unglamorous task today and complete it unusually well.','Being “too important” for basic work is not a leadership trait.'],
        ["Don't feel pressured by others' expectations",'CONTROL','Notice other people’s expectations without handing them the steering wheel. Choose your own standard deliberately.','Identify one expectation you are carrying today that is not actually yours.','Defiance for its own sake is still letting other people control you.'],
        ['Find a mentor','ALLIANCE','Seek people whose judgment, habits, or experience can sharpen yours. Ask specific questions and make good use of the answer.','Send one thoughtful question to someone you respect.','A mentor is not a mysterious emperor. You are still responsible for your choices.'],
        ['Shoot for the stars','COMMAND','Ambition works best when translated into a clear target and the next practical move.','Write one audacious goal and the smallest action you can take toward it this week.','Large goals do not require a moon-sized battle station.']
      ]
    },
    {
      id: 'getting-established', name: 'Getting Established', icon: '◆',
      lessons: [
        ['Master the power of self-confidence','COMMAND','Confidence is steady self-trust: clear posture, clear speech, and less unnecessary self-discounting.','Express one opinion today without weakening it with three disclaimers first.','Confidence is not announcing your superiority in every corridor.'],
        ['Control the conversation','CLARITY','Guide conversations with purpose: ask good questions, make concise points, and notice when the discussion drifts.','In one conversation, summarize the decision or next step before it ends.','Control does not mean speaking 94% of the time.'],
        ['Refine your negotiation skills','ALLIANCE','Know what matters, understand the other side, and separate firmness from hostility.','Before making one request today, write your ideal result, acceptable result, and walk-away point.','Threatening planetary consequences weakens the collaborative atmosphere.'],
        ["Don't bring problems: bring solutions",'CLARITY','Name the issue clearly, then arrive with at least one sensible option. Solutions create agency.','For one frustration today, write two possible responses before complaining about it.','Pretending a problem does not exist is not solution-oriented leadership.'],
        ['Present with confidence','COMMAND','Preparation reduces noise. Know the message, simplify it, and leave enough space for others to absorb it.','Explain one idea today in under 60 seconds.','A dramatic cape is optional and often impractical near office doors.']
      ]
    },
    {
      id: 'seeking-promotion', name: 'Seeking Promotion', icon: '▲',
      lessons: [
        ['Manage changing circumstances','CONTROL','Adapt quickly without becoming chaotic. Separate what changed from what still matters.','When one plan changes today, write the new constraint and your next best move.','Panic is not a strategic pivot.'],
        ['Assess your competition','CLARITY','Study the landscape without turning comparison into obsession. Learn what others do well and sharpen your own edge.','Identify one useful thing a strong peer does that you can learn from.','Competitors are not automatically rebels.'],
        ['Insist on proper recognition','COMMAND','Make your contribution visible with facts and calm ownership. Credit yourself without diminishing others.','Document one concrete result you delivered this week.','Recognition obtained through ominous hallway appearances is short-lived.'],
        ['Make your requests with conviction','COMMAND','A clear ask is kinder than vague hinting. State what you want, why it matters, and the next step.','Make one clean request today without over-explaining it.','Conviction is not volume.'],
        ['Devise a solid career plan and stick to it','CLARITY','Choose a direction, review it regularly, and adjust deliberately rather than drifting by default.','Write your next 90-day professional objective and one weekly action that supports it.','A plan is a compass, not a carbonite prison.']
      ]
    },
    {
      id: 'working-with-colleagues', name: 'Working With Colleagues', icon: '◫',
      lessons: [
        ['Never tolerate insubordination','ALLIANCE','Translate the dramatic wording into healthy boundaries: address disrespect or repeated non-performance early and directly.','Have one overdue conversation using facts, impact, and a clear next expectation.','Force choking remains outside the performance-management policy.'],
        ['Lead by example','COMMAND','Model the standards you ask from others. Reliability is more persuasive than slogans.','Do one thing today you often ask others to do.','“Do as I say, not as I do” is not an Imperial best practice.'],
        ['Hire external contractors, if necessary','CLARITY','Use outside expertise when it is smarter than pretending you can do everything yourself.','Name one task you should delegate, outsource, automate, or stop.','Not every problem requires another battalion.'],
        ['Make your expectations clear','ALLIANCE','Unspoken expectations are future resentments. Clarify ownership, timing, quality, and follow-up.','For one task you assign today, define what “done” means.','Telepathy is not a project-management tool.'],
        ['Manage the talents of others','ALLIANCE','Notice what people are naturally good at, then structure roles and feedback to help those strengths perform.','Tell one person specifically what they did well and why it mattered.','Manipulation and talent management are different departments.']
      ]
    },
    {
      id: 'becoming-a-leader', name: 'Becoming a Leader', icon: '★',
      lessons: [
        ['Accept a leadership position','COMMAND','Leadership means responsibility before status: decisions, consequences, and creating clarity for other people.','Take ownership of one decision you have been postponing.','A title does not automatically grant wisdom or better lighting.'],
        ['Give credit where credit is due','ALLIANCE','Recognition builds trust. Be specific, timely, and generous with credit.','Publicly acknowledge one person who helped produce a result.','If all glory flows upward, eventually all motivation flows outward.'],
        ['Provide decisive and forthright feedback','ALLIANCE','Good feedback is timely, specific, respectful, and connected to a useful next step.','Give one piece of feedback using: observation → impact → next step.','Decisive does not mean theatrical.'],
        ['Watch your back','CONTROL','Keep awareness without feeding paranoia. Notice risks, incentives, and patterns while staying grounded in evidence.','Name one real risk and one imagined risk. Treat them differently.','Not every delayed reply is a rebellion.'],
        ['Terminate contracts with immediate effect','CONTROL','End what genuinely needs ending cleanly: stale commitments, unhealthy patterns, or work that no longer fits.','Choose one low-value commitment to stop, renegotiate, or decline.','The goal is a clean boundary, not an operatic exit.']
      ]
    }
  ].map((stage, stageIndex) => ({
    ...stage,
    lessons: stage.lessons.map((l, idx) => ({
      id: `${stage.id}-${idx+1}`,
      number: stageIndex * 5 + idx + 1,
      title: l[0], dimension: l[1], translation: l[2], mission: l[3], warning: l[4]
    }))
  }));

  const allLessons = stages.flatMap(s => s.lessons.map(l => ({...l, stageName:s.name})));

  const wisdom = [
    ['Power without self-control is just expensive chaos.','CONTROL'],
    ['A clear request beats a resentful hint.','COMMAND'],
    ['Calm is not passivity. Calm is spare processing power.','CONTROL'],
    ['You can be formidable without being unbearable.','ALLIANCE'],
    ['Your next useful action is usually less dramatic than your first emotional impulse.','CLARITY'],
    ['Leadership is what remains after the cape comes off.','COMMAND'],
    ['Rest is maintenance, not mutiny.','RECOVERY'],
    ['If everything feels urgent, your command centre needs better filters.','CLARITY'],
    ['Recognition costs little and compounds quickly.','ALLIANCE'],
    ['Boundaries work best before resentment needs a soundtrack.','CONTROL']
  ];

  const scenarios = [
    {
      title:'A colleague misses an important deadline.',
      text:'You are irritated, the work is now late, and everyone knows it.',
      options:[
        ['Send a volcanic message to the entire group chat so history remembers this failure.','vader','FULL VADER','Cathartic for six seconds. Expensive for six months.'],
        ['Say nothing, redo the work yourself, and begin a private resentment collection.','passive','STEALTH SITH','Conflict avoided; problem preserved.'],
        ['Speak directly: name the missed commitment, understand what happened, reset ownership and timing.','good','FUNCTIONAL COMMAND','Clear, firm, and still employable.']
      ]
    },
    {
      title:'You want a promotion or larger role.',
      text:'You have delivered results but nobody has raised the topic.',
      options:[
        ['Wait quietly until someone psychically detects your ambition.','passive','INVISIBLE APPRENTICE','Subtle. Possibly too subtle for this galaxy.'],
        ['Present your results, explain the role you want, ask what would be required, and agree next steps.','good','FUNCTIONAL COMMAND','Direct ask. Evidence. No ominous breathing required.'],
        ['Announce that your continued under-recognition is disturbing.','vader','FULL VADER','Memorable phrasing. Weak succession planning.']
      ]
    },
    {
      title:'Someone criticizes your idea in a meeting.',
      text:'The criticism lands badly and your inner cape is already billowing.',
      options:[
        ['Ask what specifically concerns them, separate useful information from tone, and respond to the substance.','good','FUNCTIONAL COMMAND','You kept both dignity and data.'],
        ['Explain, for 17 uninterrupted minutes, why they are objectively wrong.','vader','MINI VADER','Technically a response. Not technically listening.'],
        ['Withdraw the idea immediately and say it was silly anyway.','passive','APPRENTICE RETREAT','Safety achieved; confidence misplaced.']
      ]
    },
    {
      title:'Your calendar is overloaded.',
      text:'Every item looks “important.” Your brain has opened twelve tabs and one of them is smoking.',
      options:[
        ['Choose the top three outcomes, move or decline lower-value items, and protect a recovery block.','good','FUNCTIONAL COMMAND','Priorities restored. Reactor stable.'],
        ['Do everything, badly, while calling it discipline.','vader','OVERLORD MODE','Maximum motion. Minimum recovery.'],
        ['Ignore the calendar until the calendar becomes a hostile witness.','passive','AVOIDANCE CLOAK','The future you has filed a complaint.']
      ]
    },
    {
      title:'A conversation is going in circles.',
      text:'Everyone has repeated themselves twice and a meeting is becoming a habitat.',
      options:[
        ['Summarize the points, name the decision required, and ask who owns the next step.','good','FUNCTIONAL COMMAND','The meeting has been granted parole.'],
        ['Keep talking until all resistance collapses.','vader','FULL VADER','You won the airtime. Nobody won the meeting.'],
        ['Stay silent and schedule another meeting to discuss this meeting.','passive','BUREAUCRATIC SITH','The Empire expands by calendar invitation.']
      ]
    },
    {
      title:'You made a mistake.',
      text:'It is visible, consequential, and very tempting to explain away.',
      options:[
        ['Own it quickly, state the fix, learn from the cause, and move forward.','good','FUNCTIONAL COMMAND','Responsibility without self-immolation.'],
        ['Explain how several other people created the conditions for your mistake.','vader','DEFLECTION MODE','Technically detailed. Strategically weak.'],
        ['Replay it privately for three days and change nothing.','passive','DARK SIDE RUMINATION','Maximum suffering; zero corrective action.']
      ]
    }
  ];

  const defaultState = {
    name: '',
    completedLessons: [],
    dailyMissions: {},
    checkins: {},
    journals: [],
    goals: [],
    commitments: [
      {id:'c1', title:'Protect 10 minutes of quiet thinking', dimension:'CLARITY', active:true},
      {id:'c2', title:'Move the body for at least 20 minutes', dimension:'RECOVERY', active:true},
      {id:'c3', title:'Make one clear request instead of hinting', dimension:'COMMAND', active:true},
      {id:'c4', title:'Recognize one other person specifically', dimension:'ALLIANCE', active:true}
    ],
    wisdom: [],
    activity: {},
    xp: 0
  };

  let state = loadState();
  let currentView = 'dashboard';
  let stageFilter = 'all';
  let breathingTimer = null;
  let breathingSeconds = 0;
  let breathPhaseTimer = null;
  let chosenScenario = 0;

  const navItems = [
    ['dashboard','⌂','Dashboard'],
    ['training','▦','Vader Training'],
    ['missions','✦',"Today's Orders"],
    ['simulator','◈','Mission Simulator'],
    ['checkin','◉','Helmet Check'],
    ['breathing','◌','Breathing Chamber'],
    ['journal','✎','Imperial Log'],
    ['command','⌁','Command Centre'],
    ['wisdom','❖','Dark Side Wisdom'],
    ['progress','▤','Progress & Rank'],
    ['settings','⚙','Settings']
  ];

  const pageMeta = {
    dashboard:['IMPERIAL COMMAND','Dashboard'],
    training:['TRAINING ACADEMY','Vader Training'],
    missions:['DAILY DEPLOYMENT',"Today's Orders"],
    simulator:['TACTICAL EXERCISE','Mission Simulator'],
    checkin:['SYSTEM DIAGNOSTIC','Helmet Check'],
    breathing:['PRESSURE REGULATION','Breathing Chamber'],
    journal:['DEBRIEFING ARCHIVE','Imperial Log'],
    command:['OBJECTIVES & COMMITMENTS','Command Centre'],
    wisdom:['SHORT FORM DOCTRINE','Dark Side Wisdom'],
    progress:['READINESS REPORT','Progress & Rank'],
    settings:['LOCAL CONTROL PANEL','Settings']
  };

  function loadState() {
    try {
      return {...defaultState, ...(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {})};
    } catch { return structuredClone(defaultState); }
  }
  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateRankUI();
  }
  function esc(s='') { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c])); }
  function toast(msg) {
    const t = document.getElementById('toast'); t.textContent = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  }
  function markActivity(type, points=0) {
    const d = todayKey();
    state.activity[d] ||= {};
    if (!state.activity[d][type]) {
      state.activity[d][type] = true;
      state.xp = (state.xp || 0) + points;
    }
    saveState();
  }
  function rankInfo() {
    const xp = state.xp || 0;
    const ranks = [
      [0,'Young Apprentice',0,60],
      [60,'Imperial Trainee',60,140],
      [140,'Commander',140,240],
      [240,'Dark Side Executive',240,360],
      [360,'Master of Self-Control',360,500]
    ];
    let r = ranks[0];
    for (const row of ranks) if (xp >= row[0]) r = row;
    const pct = Math.min(100, Math.round(((xp-r[2])/(r[3]-r[2]))*100));
    return {name:r[1], pct:isFinite(pct)?pct:100, next:r[3]};
  }
  function updateRankUI() {
    const r = rankInfo();
    document.getElementById('rankName').textContent = r.name;
    document.getElementById('xpBar').style.width = `${r.pct}%`;
    document.getElementById('xpText').textContent = `${state.xp || 0} XP`;
  }
  function readiness(check) {
    if (!check) return null;
    return Math.round((Number(check.energy)+Number(check.focus)+Number(check.confidence)+Number(check.calm)+Number(check.patience))/5);
  }
  function dailyLesson() {
    const d = todayKey().replaceAll('-','');
    const n = Number(d.slice(-6));
    return allLessons[n % allLessons.length];
  }
  function completedPct() { return Math.round((state.completedLessons.length / allLessons.length) * 100); }

  function renderNav() {
    document.getElementById('nav').innerHTML = navItems.map(([id,icon,label]) => `
      <button class="nav-btn ${id===currentView?'active':''}" data-nav="${id}"><span class="nav-icon">${icon}</span>${label}</button>
    `).join('');
    document.querySelectorAll('[data-nav]').forEach(b => b.addEventListener('click', () => navigate(b.dataset.nav)));
  }

  function navigate(view) {
    currentView = view;
    const [eye,title] = pageMeta[view];
    document.getElementById('pageEyebrow').textContent = eye;
    document.getElementById('pageTitle').textContent = title;
    document.querySelector('.sidebar').classList.remove('open');
    renderNav();
    render();
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function render() {
    clearBreathing();
    const view = document.getElementById('view');
    view.innerHTML = '';
    const fn = {
      dashboard: renderDashboard, training: renderTraining, missions: renderMissions,
      simulator: renderSimulator, checkin: renderCheckin, breathing: renderBreathing,
      journal: renderJournal, command: renderCommand, wisdom: renderWisdom,
      progress: renderProgress, settings: renderSettings
    }[currentView];
    fn?.(view);
  }

  function renderDashboard(root) {
    const lesson = dailyLesson();
    const ci = state.checkins[todayKey()];
    const score = readiness(ci);
    const name = state.name ? `, ${esc(state.name)}` : '';
    const missionDone = !!state.dailyMissions[todayKey()];
    const streak = calculateStreak();
    root.innerHTML = `
      <section class="hero">
        <div class="hero-content">
          <div class="hero-kicker">● SYSTEMS ONLINE</div>
          <h3>Welcome back${name}.</h3>
          <p>The galaxy remains badly managed. Fortunately, you can start with yourself. Today’s objective is not domination. It is slightly better judgment with excellent posture.</p>
          <div class="hero-actions">
            <button class="btn btn-primary" id="heroMission">Enter Vader Mode</button>
            <button class="btn btn-ghost" data-go="checkin">Run Helmet Check</button>
          </div>
        </div>
      </section>

      <section class="section grid grid-4">
        <div class="stat"><div class="mini-label">VADER READINESS</div><strong>${score ?? '—'}</strong><small>${score ? '/ 10 today' : 'Run Helmet Check'}</small></div>
        <div class="stat"><div class="mini-label">TRAINING</div><strong>${completedPct()}%</strong><small>${state.completedLessons.length} of ${allLessons.length} lessons</small></div>
        <div class="stat"><div class="mini-label">CURRENT STREAK</div><strong>${streak}</strong><small>active day${streak===1?'':'s'}</small></div>
        <div class="stat"><div class="mini-label">IMPERIAL XP</div><strong>${state.xp || 0}</strong><small>${esc(rankInfo().name)}</small></div>
      </section>

      <section class="section grid grid-2">
        <article class="card mission-card">
          <div class="mission-tag">TODAY'S ORDERS</div>
          <h3>${esc(lesson.title)}</h3>
          <p>${esc(lesson.mission)}</p>
          <div class="row">
            <button class="btn ${missionDone?'btn-ghost':'btn-primary'}" id="dashboardMission">${missionDone?'✓ Mission complete':'Mark mission complete'}</button>
            <button class="btn btn-ghost btn-small" data-lesson="${lesson.id}">Open lesson</button>
          </div>
        </article>
        <article class="card human-translation">
          <div class="mini-label">HUMAN TRANSLATION</div>
          <h3>${esc(lesson.dimension)} MODE</h3>
          <p>${esc(lesson.translation)}</p>
          <div class="meta"><span>Today's training theme</span><span class="dimension-pill">${esc(lesson.stageName)}</span></div>
        </article>
      </section>

      <section class="section">
        <div class="section-head"><div><h3>Don't Go Full Vader</h3><p>A small reminder before the cape starts billowing.</p></div></div>
        <div class="card warning"><strong>${esc(lesson.warning)}</strong></div>
      </section>

      <section class="section grid grid-3">
        <article class="card hover" data-go="simulator"><div class="mini-label">2 MINUTES</div><h4>Mission Simulator</h4><p>Practice a difficult situation without frightening Human Resources.</p></article>
        <article class="card hover" data-go="breathing"><div class="mini-label">RESET</div><h4>Breathing Chamber</h4><p>Regulate first. Rule nothing. A calm nervous system makes better decisions.</p></article>
        <article class="card hover" data-go="journal"><div class="mini-label">DEBRIEF</div><h4>Imperial Log</h4><p>What did Vader want to do? What did the functioning adult actually do?</p></article>
      </section>
    `;
    document.getElementById('heroMission').onclick = () => navigate('missions');
    document.getElementById('dashboardMission').onclick = () => toggleDailyMission(lesson.id);
    wireShared(root);
  }

  function renderTraining(root) {
    const selected = stageFilter === 'all' ? allLessons : stages.find(s=>s.id===stageFilter).lessons;
    root.innerHTML = `
      <div class="section-head"><div><h3>25 lessons. Five training stages.</h3><p>The book's chapter sequence becomes a practical, humorous self-development curriculum.</p></div><div class="progress-ring" style="--p:${completedPct()}%"><span>${completedPct()}%</span></div></div>
      <div class="stage-tabs">
        <button class="stage-btn ${stageFilter==='all'?'active':''}" data-stage="all">All training</button>
        ${stages.map(s=>`<button class="stage-btn ${stageFilter===s.id?'active':''}" data-stage="${s.id}">${s.name}</button>`).join('')}
      </div>
      <div class="lesson-list">
        ${selected.map(l=>`
          <article class="card hover lesson-card ${state.completedLessons.includes(l.id)?'done':''}" data-lesson="${l.id}">
            <div class="lesson-number">LESSON ${String(l.number).padStart(2,'0')}</div>
            <h4>${esc(l.title)}</h4>
            <span class="dimension-pill">${esc(l.dimension)}</span>
            <p>${esc(l.translation)}</p>
          </article>
        `).join('')}
      </div>
    `;
    root.querySelectorAll('[data-stage]').forEach(b => b.onclick = () => { stageFilter=b.dataset.stage; render(); });
    root.querySelectorAll('[data-lesson]').forEach(b => b.onclick = () => openLesson(b.dataset.lesson));
  }

  function renderMissions(root) {
    const today = dailyLesson();
    const isDone = !!state.dailyMissions[todayKey()];
    const extras = allLessons.filter(l => l.id !== today.id).sort((a,b)=>a.number-b.number).slice((new Date().getDate()%15), (new Date().getDate()%15)+3);
    root.innerHTML = `
      <section class="hero">
        <div class="hero-content">
          <div class="hero-kicker">DAILY ORDER // ${todayKey()}</div>
          <h3>${esc(today.title)}</h3>
          <p>${esc(today.mission)}</p>
          <div class="hero-actions"><button class="btn ${isDone?'btn-ghost':'btn-primary'}" id="missionDoneBtn">${isDone?'✓ Completed today':'Complete mission'}</button><button class="btn btn-ghost" data-lesson="${today.id}">Open training lesson</button></div>
        </div>
      </section>
      <section class="section grid grid-3">
        ${extras.map(l=>`<article class="card"><div class="mini-label">OPTIONAL SIDE MISSION</div><h4>${esc(l.title)}</h4><p>${esc(l.mission)}</p><button class="btn btn-small btn-ghost" data-lesson="${l.id}">View lesson</button></article>`).join('')}
      </section>
      <section class="section"><div class="card warning"><div class="mini-label">COMMAND NOTE</div><p>One useful action is enough. This app rewards consistency, not dramatic over-performance followed by three days of collapse.</p></div></section>
    `;
    document.getElementById('missionDoneBtn').onclick = () => toggleDailyMission(today.id);
    wireShared(root);
  }

  function toggleDailyMission(lessonId) {
    const d = todayKey();
    if (state.dailyMissions[d]) {
      delete state.dailyMissions[d];
      toast('Mission reopened. The Empire has paperwork for this.');
    } else {
      state.dailyMissions[d] = {lessonId, completedAt:new Date().toISOString()};
      markActivity('mission', 5);
      toast('Mission complete. Excessive celebration is authorized.');
    }
    saveState(); render();
  }

  function renderSimulator(root) {
    const s = scenarios[chosenScenario % scenarios.length];
    root.innerHTML = `
      <div class="grid grid-2">
        <article class="card scenario">
          <div class="mini-label">SIMULATION ${chosenScenario+1} / ${scenarios.length}</div>
          <h3 class="scenario-title">${esc(s.title)}</h3>
          <p>${esc(s.text)}</p>
          <div class="option-list">
            ${s.options.map((o,i)=>`<button class="option-btn" data-option="${i}">${esc(o[0])}</button>`).join('')}
          </div>
          <div id="simResult"></div>
        </article>
        <article class="card">
          <div class="mini-label">TRAINING OBJECTIVE</div>
          <h3>Be formidable. Remain functional.</h3>
          <p>The simulator is designed to make the exaggerated instinct visible, then practice a response that protects both self-respect and relationships.</p>
          <hr class="sep" />
          <div class="list">
            <div class="list-item"><div><strong>CONTROL</strong><p>Regulate before reacting.</p></div></div>
            <div class="list-item"><div><strong>CLARITY</strong><p>Separate facts from emotional weather.</p></div></div>
            <div class="list-item"><div><strong>COMMAND</strong><p>Say what needs saying cleanly.</p></div></div>
            <div class="list-item"><div><strong>ALLIANCE</strong><p>Protect the relationship where possible.</p></div></div>
          </div>
          <div class="row" style="margin-top:14px"><button class="btn btn-ghost" id="nextScenario">Next scenario</button></div>
        </article>
      </div>
    `;
    root.querySelectorAll('[data-option]').forEach(b => b.onclick = () => {
      const o = s.options[Number(b.dataset.option)];
      const good = o[1] === 'good';
      document.getElementById('simResult').innerHTML = `<div class="result-box ${good?'good':'vader'}"><div class="mini-label">${esc(o[2])}</div><strong>${esc(o[3])}</strong></div>`;
      if (good) markActivity('simulator', 3);
    });
    document.getElementById('nextScenario').onclick = () => { chosenScenario=(chosenScenario+1)%scenarios.length; render(); };
  }

  function renderCheckin(root) {
    const current = state.checkins[todayKey()] || {energy:6,focus:6,confidence:6,calm:6,patience:6};
    const vals = ['energy','focus','confidence','calm','patience'];
    root.innerHTML = `
      <div class="grid grid-2">
        <article class="card">
          <div class="mini-label">HELMET DIAGNOSTIC</div>
          <h3>How are the systems today?</h3>
          <p>Rate each from 1 to 10. This is awareness, not a tribunal.</p>
          <div class="check-grid">
            ${vals.map(v=>`<div class="slider-row"><label for="${v}">${v[0].toUpperCase()+v.slice(1)}</label><input id="${v}" type="range" min="1" max="10" value="${current[v]}"><span class="slider-val" id="${v}Val">${current[v]}</span></div>`).join('')}
          </div>
          <button class="btn btn-primary" id="saveCheck" style="margin-top:18px">Save Helmet Check</button>
        </article>
        <article class="card">
          <div class="mini-label">READINESS</div>
          <div class="breathe-wrap" style="min-height:260px">
            <div class="progress-ring" id="readinessRing" style="--p:${readiness(current)*10}%"><span id="readinessNumber">${readiness(current)}</span></div>
            <h3 id="readinessLabel">${readinessLabel(readiness(current))}</h3>
            <p class="muted" id="readinessCopy">${readinessCopy(readiness(current))}</p>
          </div>
        </article>
      </div>
    `;
    vals.forEach(v => {
      const input = document.getElementById(v);
      input.oninput = () => {
        document.getElementById(v+'Val').textContent=input.value;
        const tmp = Object.fromEntries(vals.map(k=>[k,Number(document.getElementById(k).value)]));
        const score = readiness(tmp);
        document.getElementById('readinessRing').style.setProperty('--p', `${score*10}%`);
        document.getElementById('readinessNumber').textContent=score;
        document.getElementById('readinessLabel').textContent=readinessLabel(score);
        document.getElementById('readinessCopy').textContent=readinessCopy(score);
      };
    });
    document.getElementById('saveCheck').onclick = () => {
      state.checkins[todayKey()] = Object.fromEntries(vals.map(k=>[k,Number(document.getElementById(k).value)]));
      markActivity('checkin',3); saveState(); toast('Helmet check saved. Systems acknowledged.'); render();
    };
  }

  function readinessLabel(n) {
    if (n >= 8) return 'Systems excellent';
    if (n >= 6) return 'Operational and steady';
    if (n >= 4) return 'Proceed with awareness';
    return 'Reduce the mission load';
  }
  function readinessCopy(n) {
    if (n >= 8) return 'Strong day. Use the energy; do not invent extra wars.';
    if (n >= 6) return 'Good operating range. Clarity beats intensity.';
    if (n >= 4) return 'Lower the drama, simplify the objectives, protect recovery.';
    return 'Today may be a maintenance day. Rest and smaller wins still count.';
  }

  function renderBreathing(root) {
    root.innerHTML = `
      <div class="grid grid-2">
        <article class="card">
          <div class="mini-label">BREATHING CHAMBER</div>
          <h3>Regulate first. Command second.</h3>
          <p>Slow breathing can give your nervous system enough room to choose a response rather than launch one.</p>
          <div class="duration-row"><button class="btn btn-small" data-duration="120">2 min</button><button class="btn btn-small" data-duration="300">5 min</button><button class="btn btn-small" data-duration="600">10 min</button></div>
          <div class="breathe-wrap">
            <div id="breatheOrb" class="breathe-orb"><strong id="phaseText">READY</strong></div>
            <div id="timerText" class="timer">02:00</div>
            <div class="row"><button class="btn btn-primary" id="startBreath">Start</button><button class="btn btn-ghost" id="stopBreath">Reset</button></div>
          </div>
        </article>
        <article class="card">
          <div class="mini-label">CYCLE</div>
          <h3>4 · 2 · 6</h3>
          <p><strong>Inhale 4</strong> → hold 2 → <strong>exhale 6</strong>. The longer exhale keeps this exercise firmly in the category of “less dramatic than force choking.”</p>
          <hr class="sep" />
          <div class="warning card" style="padding:14px"><strong>Comfort first.</strong><p>If breath-holding feels unpleasant, skip the hold and breathe normally. This is a simple relaxation tool, not medical treatment.</p></div>
        </article>
      </div>
    `;
    let selected=120;
    document.querySelectorAll('[data-duration]').forEach(b=>b.onclick=()=>{selected=Number(b.dataset.duration); breathingSeconds=selected; updateTimer();});
    breathingSeconds=selected; updateTimer();
    document.getElementById('startBreath').onclick=()=>startBreathing(selected);
    document.getElementById('stopBreath').onclick=()=>{clearBreathing(); breathingSeconds=selected; updateTimer(); resetOrb();};
  }

  function startBreathing(seconds) {
    clearBreathing(); breathingSeconds=seconds; updateTimer();
    runBreathPhase();
    breathingTimer=setInterval(()=>{
      breathingSeconds--; updateTimer();
      if (breathingSeconds<=0) {
        clearBreathing(); resetOrb(); document.getElementById('phaseText').textContent='COMPLETE'; chime(); markActivity('breathing',3); toast('Breathing cycle complete. Cape deployment remains optional.');
      }
    },1000);
  }
  let phaseIndex=0;
  function runBreathPhase() {
    const phases=[['inhale','INHALE',4],['hold','HOLD',2],['exhale','EXHALE',6]];
    const [cls,label,sec]=phases[phaseIndex%phases.length];
    const orb=document.getElementById('breatheOrb'); const txt=document.getElementById('phaseText');
    if (!orb || !txt) return;
    orb.className='breathe-orb '+cls; txt.textContent=label;
    phaseIndex++;
    breathPhaseTimer=setTimeout(runBreathPhase,sec*1000);
  }
  function resetOrb(){ const orb=document.getElementById('breatheOrb'); const txt=document.getElementById('phaseText'); if(orb)orb.className='breathe-orb'; if(txt)txt.textContent='READY'; phaseIndex=0; }
  function clearBreathing(){ if(breathingTimer)clearInterval(breathingTimer); if(breathPhaseTimer)clearTimeout(breathPhaseTimer); breathingTimer=null; breathPhaseTimer=null; }
  function updateTimer(){ const t=document.getElementById('timerText'); if(!t)return; const m=Math.floor(breathingSeconds/60); const s=breathingSeconds%60; t.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`; }
  function chime(){ try{const A=window.AudioContext||window.webkitAudioContext;const c=new A();const o=c.createOscillator();const g=c.createGain();o.type='sine';o.frequency.value=540;g.gain.setValueAtTime(.07,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+1.2);o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+1.2);}catch{} }

  function renderJournal(root) {
    const entries=[...state.journals].sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
    root.innerHTML=`
      <div class="grid grid-2">
        <article class="card">
          <div class="mini-label">NEW DEBRIEF</div>
          <h3>Imperial Log</h3>
          <div class="field"><label>What happened?</label><textarea id="jWhat" placeholder="Short version. No trilogy required."></textarea></div>
          <div class="field"><label>What did Vader want to do?</label><textarea id="jVader" placeholder="The dramatic impulse..."></textarea></div>
          <div class="field"><label>What did the functioning adult actually do?</label><textarea id="jAdult" placeholder="The useful response..."></textarea></div>
          <div class="field"><label>What will I repeat or change next time?</label><textarea id="jNext" placeholder="One lesson is enough."></textarea></div>
          <button class="btn btn-primary" id="saveJournal">Save debrief</button>
        </article>
        <article class="card">
          <div class="mini-label">RECENT LOGS</div><h3>Your debrief archive</h3>
          <div class="list" style="margin-top:12px">${entries.length?entries.slice(0,8).map(e=>`<div class="list-item"><div><strong>${new Date(e.createdAt).toLocaleDateString()}</strong><p>${esc(e.what).slice(0,160)}${e.what.length>160?'…':''}</p></div><button class="btn btn-small btn-ghost" data-del-journal="${e.id}">Delete</button></div>`).join(''):'<div class="empty">No debriefs yet. The archive is suspiciously clean.</div>'}</div>
        </article>
      </div>`;
    document.getElementById('saveJournal').onclick=()=>{
      const what=document.getElementById('jWhat').value.trim();
      if(!what){toast('Give the archive at least one event.');return;}
      state.journals.push({id:crypto.randomUUID(),createdAt:new Date().toISOString(),what,vader:document.getElementById('jVader').value.trim(),adult:document.getElementById('jAdult').value.trim(),next:document.getElementById('jNext').value.trim()});
      markActivity('journal',2); saveState(); toast('Debrief archived.'); render();
    };
    root.querySelectorAll('[data-del-journal]').forEach(b=>b.onclick=()=>{state.journals=state.journals.filter(j=>j.id!==b.dataset.delJournal);saveState();render();});
  }

  function renderCommand(root) {
    root.innerHTML=`
      <div class="grid grid-2">
        <article class="card">
          <div class="mini-label">GOALS</div><h3>Command objectives</h3>
          <div class="field"><label>Goal</label><input id="goalTitle" placeholder="e.g. Finish the proposal by Friday"></div>
          <div class="field"><label>Target date</label><input id="goalDate" type="date"></div>
          <button class="btn btn-primary" id="addGoal">Add objective</button>
          <div class="list" style="margin-top:14px">${state.goals.length?state.goals.map(g=>`<div class="list-item"><div><strong style="text-decoration:${g.done?'line-through':'none'}">${esc(g.title)}</strong><p>${g.date?`Target: ${esc(g.date)}`:'No target date'}</p></div><div class="item-actions"><button class="btn btn-small" data-goal-toggle="${g.id}">${g.done?'Undo':'Done'}</button><button class="btn btn-small btn-ghost" data-goal-del="${g.id}">×</button></div></div>`).join(''):'<div class="empty">No active objectives. The command table is available.</div>'}</div>
        </article>
        <article class="card">
          <div class="mini-label">COMMITMENTS</div><h3>Daily operating code</h3>
          <div class="field"><label>Add commitment</label><input id="commitTitle" placeholder="e.g. No email for first 20 minutes"></div>
          <div class="field"><label>Dimension</label><select id="commitDim"><option>CONTROL</option><option>CLARITY</option><option>COMMAND</option><option>ALLIANCE</option><option>RECOVERY</option></select></div>
          <button class="btn btn-primary" id="addCommit">Add commitment</button>
          <div class="list" style="margin-top:14px">${state.commitments.map(c=>`<div class="list-item"><div><strong>${esc(c.title)}</strong><p><span class="tag">${esc(c.dimension)}</span></p></div><div class="item-actions"><button class="btn btn-small" data-commit-toggle="${c.id}">${c.active?'Active':'Paused'}</button><button class="btn btn-small btn-ghost" data-commit-del="${c.id}">×</button></div></div>`).join('')}</div>
        </article>
      </div>`;
    document.getElementById('addGoal').onclick=()=>{const t=document.getElementById('goalTitle').value.trim();if(!t)return toast('Give the objective a name.');state.goals.push({id:crypto.randomUUID(),title:t,date:document.getElementById('goalDate').value,done:false});saveState();render();};
    document.getElementById('addCommit').onclick=()=>{const t=document.getElementById('commitTitle').value.trim();if(!t)return toast('Name the commitment.');state.commitments.push({id:crypto.randomUUID(),title:t,dimension:document.getElementById('commitDim').value,active:true});saveState();render();};
    root.querySelectorAll('[data-goal-toggle]').forEach(b=>b.onclick=()=>{const g=state.goals.find(x=>x.id===b.dataset.goalToggle);g.done=!g.done;if(g.done)markActivity('goal',4);saveState();render();});
    root.querySelectorAll('[data-goal-del]').forEach(b=>b.onclick=()=>{state.goals=state.goals.filter(x=>x.id!==b.dataset.goalDel);saveState();render();});
    root.querySelectorAll('[data-commit-toggle]').forEach(b=>b.onclick=()=>{const c=state.commitments.find(x=>x.id===b.dataset.commitToggle);c.active=!c.active;saveState();render();});
    root.querySelectorAll('[data-commit-del]').forEach(b=>b.onclick=()=>{state.commitments=state.commitments.filter(x=>x.id!==b.dataset.commitDel);saveState();render();});
  }

  function renderWisdom(root) {
    const items=[...wisdom,...(state.wisdom||[]).map(x=>[x.text,'YOUR DOCTRINE'])];
    root.innerHTML=`
      <div class="section-head"><div><h3>Useful thoughts with unnecessary gravitas.</h3><p>Short original prompts inspired by the app's wellness framework.</p></div></div>
      <div class="grid grid-3">${items.map(q=>`<article class="card quote-card"><blockquote>“${esc(q[0])}”</blockquote><small>${esc(q[1])}</small></article>`).join('')}</div>
      <section class="section card"><div class="mini-label">ADD YOUR OWN</div><h3>Personal doctrine</h3><div class="field"><textarea id="wisdomText" placeholder="Write a short line you actually want to remember."></textarea></div><button class="btn btn-primary" id="addWisdom">Add to archive</button></section>`;
    document.getElementById('addWisdom').onclick=()=>{const t=document.getElementById('wisdomText').value.trim();if(!t)return;state.wisdom ||= [];state.wisdom.push({id:crypto.randomUUID(),text:t});saveState();toast('Doctrine added. Try not to form a cult around it.');render();};
  }

  function renderProgress(root) {
    const r=rankInfo();
    const last7=[]; for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const k=d.toISOString().slice(0,10);last7.push({date:k,score:readiness(state.checkins[k])});}
    const points=last7.map((x,i)=>x.score?`${i*(100/6)},${70-(x.score*6)}`:null).filter(Boolean).join(' ');
    const badges = [
      ['No Force Choking Today','Complete a daily mission',Object.keys(state.dailyMissions).length>=1],
      ['Actually Listened','Complete Mission Simulator',Object.values(state.activity).some(a=>a.simulator)],
      ['Breathing Is Leadership','Complete a Breathing Chamber session',Object.values(state.activity).some(a=>a.breathing)],
      ['Imperial Archivist','Write 3 debriefs',state.journals.length>=3],
      ['Training Montage','Complete 5 lessons',state.completedLessons.length>=5],
      ['Did Not Build a Death Star','Complete 10 lessons',state.completedLessons.length>=10],
      ['Functional Overlord','Complete all 25 lessons',state.completedLessons.length>=25],
      ['Strategic Recognition','Complete one goal',state.goals.some(g=>g.done)],
      ['Seven-Day Command','Stay active seven days in a row',calculateStreak()>=7]
    ];
    root.innerHTML=`
      <section class="grid grid-3">
        <div class="stat"><div class="mini-label">RANK</div><strong style="font-size:1.35rem">${esc(r.name)}</strong><small>${state.xp||0} XP</small></div>
        <div class="stat"><div class="mini-label">TRAINING</div><strong>${completedPct()}%</strong><small>${state.completedLessons.length} / ${allLessons.length} lessons</small></div>
        <div class="stat"><div class="mini-label">STREAK</div><strong>${calculateStreak()}</strong><small>active days</small></div>
      </section>
      <section class="section grid grid-2">
        <article class="card"><div class="mini-label">7-DAY READINESS</div><h3>Helmet trend</h3><svg class="sparkline" viewBox="0 0 100 80" preserveAspectRatio="none"><line class="gridline" x1="0" x2="100" y1="10" y2="10"></line><line class="gridline" x1="0" x2="100" y1="40" y2="40"></line><line class="gridline" x1="0" x2="100" y1="70" y2="70"></line>${points?`<polyline points="${points}"></polyline>`:''}</svg><div class="space"><small class="muted">${last7[0].date.slice(5)}</small><small class="muted">${last7[6].date.slice(5)}</small></div></article>
        <article class="card"><div class="mini-label">NEXT RANK</div><h3>${r.name}</h3><div class="xp-track" style="height:10px"><span style="width:${r.pct}%"></span></div><p>${r.pct}% through this rank band. XP comes from useful behaviour, not suffering.</p></article>
      </section>
      <section class="section"><div class="section-head"><div><h3>Badges of Questionable Importance</h3><p>Entirely unnecessary. Strangely motivating.</p></div></div><div class="badge-grid">${badges.map(b=>`<div class="badge ${b[2]?'unlocked':''}"><strong>${b[2]?'★ ':'☆ '}${esc(b[0])}</strong><small>${esc(b[1])}</small></div>`).join('')}</div></section>`;
  }

  function calculateStreak() {
    const dates = new Set(Object.keys(state.activity).filter(d => Object.keys(state.activity[d]||{}).length));
    let streak=0; const d=new Date();
    while(true){const k=d.toISOString().slice(0,10);if(dates.has(k)){streak++;d.setDate(d.getDate()-1);} else break;}
    return streak;
  }

  function renderSettings(root) {
    root.innerHTML=`
      <div class="grid grid-2">
        <article class="card">
          <div class="mini-label">PROFILE</div><h3>Personalize command</h3>
          <div class="field"><label>Name</label><input id="nameInput" value="${esc(state.name||'')}" placeholder="Your name"></div>
          <button class="btn btn-primary" id="saveName">Save</button>
        </article>
        <article class="card">
          <div class="mini-label">DATA</div><h3>Your data stays in this browser</h3>
          <p>Version 1 uses localStorage only. Export a backup if you want to move devices.</p>
          <div class="row"><button class="btn" id="exportData">Export JSON</button><label class="btn btn-ghost" for="importFile">Import JSON</label><input id="importFile" type="file" accept="application/json" hidden></div>
        </article>
      </div>
      <section class="section card warning"><div class="mini-label">DANGER ZONE</div><h3>Reset the Empire</h3><p>Deletes all local progress, logs, goals, check-ins and customization from this browser.</p><button class="btn btn-ghost" id="resetData">Reset all local data</button></section>
      <section class="section card"><div class="mini-label">ABOUT THIS PROTOTYPE</div><p>This is an original personal wellness app that uses the chapter themes of <em>Be More Vader</em> as a humorous training framework. It deliberately paraphrases the lessons rather than reproducing the book, and it uses no official Star Wars imagery or audio.</p></section>`;
    document.getElementById('saveName').onclick=()=>{state.name=document.getElementById('nameInput').value.trim();saveState();toast('Command profile updated.');};
    document.getElementById('exportData').onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`vader-mode-backup-${todayKey()}.json`;a.click();URL.revokeObjectURL(a.href);};
    document.getElementById('importFile').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{state={...defaultState,...JSON.parse(r.result)};saveState();toast('Backup imported.');render();}catch{toast('That backup could not be read.');}};r.readAsText(f);};
    document.getElementById('resetData').onclick=()=>{if(confirm('Reset all Vader Mode data on this browser?')){state=structuredClone(defaultState);saveState();render();toast('Local data reset. The corridor is eerily quiet.');}};
  }

  function openLesson(id) {
    const l=allLessons.find(x=>x.id===id); if(!l)return;
    const modal=document.getElementById('modal');
    const done=state.completedLessons.includes(id);
    modal.innerHTML=`<div class="modal-inner">
      <div class="modal-head"><div><div class="mini-label">LESSON ${String(l.number).padStart(2,'0')} · ${esc(l.stageName)}</div><h3>${esc(l.title)}</h3></div><button class="modal-close" id="closeModal">×</button></div>
      <div class="modal-block"><h5>VADER → HUMAN</h5><p>${esc(l.translation)}</p></div>
      <div class="modal-block"><h5>YOUR MISSION</h5><p>${esc(l.mission)}</p></div>
      <div class="modal-block warning"><h5>DON'T GO FULL VADER</h5><p>${esc(l.warning)}</p></div>
      <div class="space" style="margin-top:16px"><span class="dimension-pill">${esc(l.dimension)}</span><button class="btn ${done?'btn-ghost':'btn-primary'}" id="toggleLesson">${done?'✓ Lesson complete':'Mark lesson complete'}</button></div>
    </div>`;
    modal.showModal();
    document.getElementById('closeModal').onclick=()=>modal.close();
    document.getElementById('toggleLesson').onclick=()=>{
      if(done){state.completedLessons=state.completedLessons.filter(x=>x!==id);toast('Lesson reopened. Training continues.');}
      else{state.completedLessons.push(id);state.xp=(state.xp||0)+10;toast('Lesson complete. +10 XP.');}
      saveState();modal.close();render();
    };
  }

  function wireShared(root) {
    root.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>navigate(b.dataset.go));
    root.querySelectorAll('[data-lesson]').forEach(b=>b.onclick=()=>openLesson(b.dataset.lesson));
  }

  document.getElementById('menuBtn').onclick=()=>document.querySelector('.sidebar').classList.toggle('open');
  document.getElementById('quickMissionBtn').onclick=()=>navigate('missions');
  document.getElementById('modal').addEventListener('click', e=>{if(e.target===e.currentTarget)e.currentTarget.close();});

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
  }

  renderNav(); updateRankUI(); render();
})();
