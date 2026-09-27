(() => {
  'use strict';

  const STORAGE_KEY = 'vaderMode.v1';
  const media = (name) => window.VaderMedia?.url(name) || `./assets/${String(name).split('/').pop()}`;
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


  const HERO_IMAGE = media('vader-command.webp');
  const BREATHING_IMAGE = media('vader-closeup.webp');
  const TRANSMISSION_IMAGE = media('vader-corridor.webp');
  const BREATH_AUDIO = media('vader-breathing-original.mp3');

  const stageVisuals = {
    'starting-out': {image:media('vader-corridor.webp'), kicker:'STAGE I', tagline:'Enter the room prepared. Leave the stormtroopers outside.'},
    'getting-established': {image:media('vader-closeup.webp'), kicker:'STAGE II', tagline:'Confidence, clarity and negotiation — minus the planetary destruction.'},
    'seeking-promotion': {image:media('vader-smoke.webp'), kicker:'STAGE III', tagline:'Ambition with a plan. Recognition without ominous corridor pacing.'},
    'working-with-colleagues': {image:media('vader-army.webp'), kicker:'STAGE IV', tagline:'Boundaries, delegation and feedback for people who cannot Force-choke HR.'},
    'becoming-a-leader': {image:media('vader-command.webp'), kicker:'STAGE V', tagline:'Take responsibility. Give credit. Keep the cape out of the machinery.'}
  };

  const galleryVisuals = [
    {src:media('vader-command.webp'), title:'Command Presence', caption:'Control the room. Start by controlling yourself.'},
    {src:media('vader-army.webp'), title:'Leadership', caption:'A large team does not reduce the need for clear expectations.'},
    {src:media('vader-smoke.webp'), title:'Conviction', caption:'Make the point. Keep the smoke machine optional.'},
    {src:media('vader-mask-art.webp'), title:'Perspective', caption:'The mask is dramatic. The lesson is self-awareness.'},
    {src:media('vader-portrait-red.webp'), title:'Composure', caption:'Lower the temperature before raising the standard.'},
    {src:media('vader-closeup.webp'), title:'Focus', caption:'Clarity first. Ominous staring is not a deliverable.'},
    {src:media('vader-clouds.webp'), title:'Reset', caption:'Even the Dark Side benefits from recovery.'},
    {src:media('vader-saber-dark.webp'), title:'Boundaries', caption:'Be clear. Be calm. Keep the lightsaber metaphorical.'},
    {src:media('vader-red-face.webp'), title:'Pressure', caption:'Strong emotion is data. It is not always instruction.'},
    {src:media('vader-silhouette.webp'), title:'Discipline', caption:'Consistency beats dramatic bursts of effort.'},
    {src:media('vader-corridor.webp'), title:'Decisiveness', caption:'Walk in knowing the next useful move.'}
  ];

  const postcardDeck = [
    {image:0, headline:'CONTROL THE ROOM. START WITH YOURSELF.', lesson:'Regulation first. Command second.'},
    {image:5, headline:'YOUR CAPE IS NOT A STRATEGY.', lesson:'Presence helps. Preparation helps more.'},
    {image:4, headline:"DON'T GO FULL VADER BEFORE COFFEE.", lesson:'Pause. Breathe. Then reply.'},
    {image:1, headline:'DELEGATE. EVEN LORDS OF THE SITH NEED STAFF.', lesson:'If someone else can own it, let them.'},
    {image:8, headline:'BE IMPOSING. NOT EXHAUSTING.', lesson:'Confidence does not require seventeen uninterrupted minutes.'},
    {image:10, headline:'A CLEAR REQUEST BEATS AN OMINOUS STARE.', lesson:'Say what you need, why it matters, and when.'},
    {image:3, headline:"LISTEN. IT'S STRANGELY POWERFUL.", lesson:'Ask one more question before making your point.'},
    {image:9, headline:'NO NEW WARS TODAY.', lesson:'Finish, decline or defer before adding more.'},
    {image:6, headline:'REST IS MAINTENANCE, NOT MUTINY.', lesson:'Recovery keeps the command deck online.'},
    {image:2, headline:'BE FORMIDABLE. REMAIN FUNCTIONAL.', lesson:'The Dark Side is funnier when your judgment stays intact.'}
  ];

  const screenVisuals = {
    missions:{image:media('vader-smoke.webp'), kicker:'DAILY DEPLOYMENT', title:'One mission. Minimal collateral damage.', copy:'Use the drama for momentum, not for over-complication.'},
    simulator:{image:media('vader-red-face.webp'), kicker:'TACTICAL EXERCISE', title:'Practice the response before the corridor gets tense.', copy:'Spot the theatrical impulse, then choose the useful move.'},
    coach:{image:media('vader-portrait-red.webp'), kicker:'SITUATION ROOM', title:'Bring the problem. Keep the cape.', copy:'Vader instinct acknowledged. Functional-human response recommended.'},
    checkin:{image:media('vader-closeup.webp'), kicker:'HELMET DIAGNOSTIC', title:'Check the systems before issuing orders.', copy:'Awareness is information, not judgment.'},
    journal:{image:media('vader-mask-art.webp'), kicker:'IMPERIAL LOG', title:'Write the lesson, not the trilogy.', copy:'A short debrief turns experience into useful data.'},
    debrief:{image:media('vader-clouds.webp'), kicker:'POWER-DOWN SEQUENCE', title:'Close the day. Release the unnecessary wars.', copy:'One win, one lesson, one mission for tomorrow.'},
    command:{image:media('vader-army.webp'), kicker:'COMMAND CENTRE', title:'Goals need ownership more than atmosphere.', copy:'Define the objective. Clarify the next action. Delegate where sensible.'},
    wisdom:{image:media('vader-mask-art.webp'), kicker:'DARK SIDE WISDOM', title:'Useful thoughts with unnecessary gravitas.', copy:'Keep the quip. Keep the lesson.'},
    progress:{image:media('vader-silhouette.webp'), kicker:'READINESS REPORT', title:'Consistency is the real special effect.', copy:'Track useful behaviour without turning wellness into punishment.'}
  };

  const transmissionPool = [
    ['The 30-Second Command','Make one point today in 30 seconds or less. Stop when the point is made.','CLARITY'],
    ['No Psychic Management','Ask clearly for one thing you would normally hope someone notices.','COMMAND'],
    ['The Alliance Test','Give one person specific credit for something they did well.','ALLIANCE'],
    ['Reactor Cooldown','Before replying to one irritating message, wait three slow breaths.','CONTROL'],
    ['Delete One Battle','Remove, decline or postpone one low-value commitment.','RECOVERY'],
    ['The Listening Probe','In one conversation, ask a follow-up question before giving your opinion.','ALLIANCE'],
    ['Name the Actual Problem','Take one annoyance and write the factual problem in one sentence.','CLARITY'],
    ['Clean Ask Protocol','Make one request with what, why and when — no apology sandwich.','COMMAND'],
    ['Recognition Sweep','Write down one concrete result you produced this week.','COMMAND'],
    ['No New Wars','When tempted to add a task, finish or delete one first.','RECOVERY'],
    ['Useful Disagreement','Disagree once without becoming louder, longer or more dramatic.','CONTROL'],
    ['Delegate a Droid','Hand off, automate or stop one task that does not need your personal cape.','CLARITY'],
    ['Repair the Corridor','Resolve one small tension instead of collecting it for later.','ALLIANCE'],
    ['Three Priorities','Choose the three outcomes that matter most today. Everything else is secondary.','CLARITY'],
    ['Maintenance Is Not Mutiny','Protect 20 minutes for movement, quiet or recovery without earning it first.','RECOVERY']
  ];

  const coachProfiles = {
    work: {
      label:'WORK / PERFORMANCE',
      vader:'Assume incompetence, seize the controls, and draft an email that future historians will study.',
      human:'Separate the facts from the irritation. Clarify the outcome, ownership and timing directly.',
      mission:'Write the desired outcome in one sentence, then make one clean request that moves toward it.'
    },
    conflict: {
      label:'CONFLICT',
      vader:'Win the exchange immediately. Bonus points if the room becomes noticeably quieter afterward.',
      human:'Regulate first, describe the behaviour or issue without mind-reading, then say what you need next.',
      mission:'Use this structure once: “When X happened, the impact was Y. Going forward, I need Z.”'
    },
    boundary: {
      label:'BOUNDARIES',
      vader:'Announce a new doctrine, close the blast doors, and make everyone regret asking.',
      human:'A boundary is a clear statement about what you will do, accept or prioritise — not a punishment.',
      mission:'Say one respectful no, not-now, or alternative without adding five paragraphs of justification.'
    },
    stress: {
      label:'STRESS / OVERLOAD',
      vader:'Treat every item as urgent and personally supervise the entire galaxy until 2:00 a.m.',
      human:'Reduce the field. Distinguish urgent from important, choose the next useful action and protect recovery.',
      mission:'Pick three outcomes for today and remove one thing from the list completely.'
    },
    decision: {
      label:'DECISION',
      vader:'Decide instantly, dramatically, and preferably while staring out of a large window.',
      human:'Name the decision, the two or three real criteria, and what information would materially change the choice.',
      mission:'Write the decision at the top of a note, list three criteria, and choose the next information or action you need.'
    },
    relationship: {
      label:'RELATIONSHIP',
      vader:'Interpret tone, infer motive, prepare a closing argument, then wonder why this feels exhausting.',
      human:'Check the story you are telling yourself. Ask, listen, and say what you actually feel or need without accusation.',
      mission:'Ask one genuine question before explaining your side.'
    }
  };

  function transmissionIndex() {
    const n = Number(todayKey().replaceAll('-','')) + Number(state?.transmissionOffset || 0);
    return Math.abs(n) % transmissionPool.length;
  }
  function todayTransmission() {
    const t = transmissionPool[transmissionIndex()];
    return {id:`tx-${transmissionIndex()}`, title:t[0], mission:t[1], dimension:t[2]};
  }

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
    dailyDebriefs: {},
    transmissions: {},
    transmissionOffset: 0,
    settings: {navSound:true, breathingSound:true, haptics:false, volume:0.62, colorTheme:'imperial-red', visualTone:'cinematic', uiBrightness:100, imageBrightness:100, imageSaturation:100, imageContrast:105},
    xp: 0
  };

  let state = loadState();
  let currentView = 'dashboard';
  let stageFilter = 'all';
  let breathingTimer = null;
  let breathingSeconds = 0;
  let breathPhaseTimer = null;
  let breathAudioTimer = null;
  let breathAudio = null;
  let breathAudioTestTimer = null;
  let audioCtx = null;
  let activeAudioNodes = [];
  let activeBreathNodes = [];
  let chosenScenario = 0;
  let swipeStart = null;

  const navItems = [
    ['dashboard','⌂','Dashboard'],
    ['training','▦','Vader Training'],
    ['missions','✦',"Today's Orders"],
    ['simulator','◈','Mission Simulator'],
    ['coach','⌁','Vader vs Human Coach'],
    ['transmissions','✧','Incoming Transmission'],
    ['checkin','◉','Helmet Check'],
    ['breathing','◌','Breathing Chamber'],
    ['journal','✎','Imperial Log'],
    ['debrief','☾','Imperial Debrief'],
    ['command','⌘','Command Centre'],
    ['wisdom','❖','Dark Side Wisdom'],
    ['gallery','▧','Gallery & Postcards'],
    ['progress','▤','Progress & Rank'],
    ['settings','⚙','Settings']
  ];

  const pageMeta = {
    dashboard:['IMPERIAL COMMAND','Dashboard'],
    training:['TRAINING ACADEMY','Vader Training'],
    missions:['DAILY DEPLOYMENT',"Today's Orders"],
    simulator:['TACTICAL EXERCISE','Mission Simulator'],
    coach:['SITUATION ROOM','Vader vs Human Coach'],
    transmissions:['PRIORITY CHANNEL','Incoming Transmission'],
    checkin:['SYSTEM DIAGNOSTIC','Helmet Check'],
    breathing:['PRESSURE REGULATION','Breathing Chamber'],
    journal:['DEBRIEFING ARCHIVE','Imperial Log'],
    debrief:['END-OF-DAY PROTOCOL','Imperial Debrief'],
    command:['OBJECTIVES & COMMITMENTS','Command Centre'],
    wisdom:['SHORT FORM DOCTRINE','Dark Side Wisdom'],
    gallery:['VISUAL ARCHIVE','Gallery & Postcards'],
    progress:['READINESS REPORT','Progress & Rank'],
    settings:['LOCAL CONTROL PANEL','Settings']
  };

  function loadState() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      return {
        ...structuredClone(defaultState),
        ...raw,
        settings:{...defaultState.settings,...(raw.settings||{})},
        dailyDebriefs:raw.dailyDebriefs||{},
        transmissions:raw.transmissions||{}
      };
    } catch { return structuredClone(defaultState); }
  }
  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateRankUI();
  }
  function applyDisplaySettings() {
    const s=state.settings||{};
    const root=document.documentElement;
    const allowedThemes=['imperial-red','mustafar','bespin-blue','carbon','sith-neon'];
    const theme=allowedThemes.includes(s.colorTheme)?s.colorTheme:'imperial-red';
    root.dataset.theme=theme;
    const ui=Math.max(70,Math.min(130,Number(s.uiBrightness ?? 100)));
    const light=Math.max(0,(ui-100)/100*.34);
    const dark=Math.max(0,(100-ui)/100*.5);
    root.style.setProperty('--ui-light-alpha',light.toFixed(3));
    root.style.setProperty('--ui-dark-alpha',dark.toFixed(3));
    root.style.setProperty('--image-brightness',`${Math.max(60,Math.min(150,Number(s.imageBrightness ?? 100)))}%`);
    root.style.setProperty('--image-saturation',`${Math.max(0,Math.min(180,Number(s.imageSaturation ?? 100)))}%`);
    root.style.setProperty('--image-contrast',`${Math.max(60,Math.min(170,Number(s.imageContrast ?? 105)))}%`);
    const tone=s.visualTone||'cinematic';
    const tones={
      neutral:{gray:0,sepia:0,hue:0},
      cinematic:{gray:0,sepia:.04,hue:-2},
      warm:{gray:0,sepia:.16,hue:-8},
      cool:{gray:0,sepia:.08,hue:16},
      mono:{gray:1,sepia:0,hue:0}
    };
    const t=tones[tone]||tones.cinematic;
    root.style.setProperty('--image-grayscale',t.gray);
    root.style.setProperty('--image-sepia',t.sepia);
    root.style.setProperty('--image-hue',`${t.hue}deg`);
    root.style.setProperty('--hero-media',`url("${HERO_IMAGE}")`);
    root.style.setProperty('--corridor-media',`url("${TRANSMISSION_IMAGE}")`);
    root.style.setProperty('--breathing-media',`url("${BREATHING_IMAGE}")`);
  }
  function resetDisplaySettings() {
    Object.assign(state.settings,{colorTheme:'imperial-red',visualTone:'cinematic',uiBrightness:100,imageBrightness:100,imageSaturation:100,imageContrast:105});
    saveState(); applyDisplaySettings();
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


  function screenBanner(v) {
    if (!v) return '';
    return `<section class="screen-banner">
      <img src="${v.image}" alt="" loading="eager">
      <div class="screen-banner-shade" aria-hidden="true"></div>
      <div class="screen-banner-copy"><div class="hero-kicker">${esc(v.kicker)}</div><h3>${esc(v.title)}</h3><p>${esc(v.copy)}</p></div>
    </section>`;
  }



  function getAudioContext() {
    const A = window.AudioContext || window.webkitAudioContext;
    if (!A) return null;
    if (!audioCtx) audioCtx = new A();
    if (audioCtx.state === 'suspended') audioCtx.resume().catch(()=>{});
    return audioCtx;
  }
  function masterVolume(mult=1) { return Math.max(0, Math.min(1, Number(state.settings?.volume ?? .62))) * mult; }
  function getBreathAudio() {
    if (!breathAudio) {
      breathAudio = new Audio();
      breathAudio.loop = true;
      breathAudio.preload = 'auto';
      breathAudio.setAttribute('playsinline','');
      breathAudio.setAttribute('webkit-playsinline','');
      breathAudio.src = BREATH_AUDIO;
      try { breathAudio.load(); } catch {}
    }
    breathAudio.volume = Math.max(0, Math.min(1, Number(state.settings?.volume ?? .62)));
    return breathAudio;
  }
  function syncBreathAudioVolume() {
    if (breathAudio) breathAudio.volume = Math.max(0, Math.min(1, Number(state.settings?.volume ?? .62)));
  }
  function trackNode(node) { activeAudioNodes.push(node); node.addEventListener?.('ended',()=>{activeAudioNodes=activeAudioNodes.filter(n=>n!==node);}); return node; }
  function trackBreathNode(node) { activeBreathNodes.push(node); node.addEventListener?.('ended',()=>{activeBreathNodes=activeBreathNodes.filter(n=>n!==node);}); return node; }
  function stopActiveAudio() {
    activeAudioNodes.forEach(n=>{ try{n.stop?.();}catch{} try{n.disconnect?.();}catch{} });
    activeAudioNodes=[];
  }
  function playNavCue() {
    if (!state.settings?.navSound) return;
    const ctx=getAudioContext(); if(!ctx) return;
    const now=ctx.currentTime+.01;
    [[0,92,.13],[.14,69,.16]].forEach(([delay,freq,dur],idx)=>{
      const osc=trackNode(ctx.createOscillator()); const gain=ctx.createGain(); const filter=ctx.createBiquadFilter();
      osc.type='sine'; osc.frequency.setValueAtTime(freq,now+delay); osc.frequency.exponentialRampToValueAtTime(freq*.72,now+delay+dur);
      filter.type='lowpass'; filter.frequency.value=220;
      gain.gain.setValueAtTime(.0001,now+delay); gain.gain.exponentialRampToValueAtTime(masterVolume(.16),now+delay+.018); gain.gain.exponentialRampToValueAtTime(.0001,now+delay+dur);
      osc.connect(filter).connect(gain).connect(ctx.destination); osc.start(now+delay); osc.stop(now+delay+dur+.03);
    });
    if (state.settings?.haptics && navigator.vibrate) navigator.vibrate([18,45,22]);
  }
  function makeNoise(ctx, seconds=1.4) {
    const buffer=ctx.createBuffer(1,Math.ceil(ctx.sampleRate*seconds),ctx.sampleRate); const data=buffer.getChannelData(0);
    for(let i=0;i<data.length;i++) data[i]=(Math.random()*2-1);
    return buffer;
  }
  function scheduleBreathBurst(ctx, when, duration, cutoff, amount) {
    const src=trackBreathNode(ctx.createBufferSource()); src.buffer=makeNoise(ctx,duration+.15);
    const filter=ctx.createBiquadFilter(); filter.type='bandpass'; filter.frequency.setValueAtTime(cutoff,when); filter.Q.value=.62;
    const low=ctx.createBiquadFilter(); low.type='lowpass'; low.frequency.value=1350;
    const gain=ctx.createGain(); const peak=masterVolume(amount);
    gain.gain.setValueAtTime(.0001,when); gain.gain.exponentialRampToValueAtTime(Math.max(.0002,peak),when+.13);
    gain.gain.setValueAtTime(Math.max(.0002,peak),when+Math.max(.16,duration-.18)); gain.gain.exponentialRampToValueAtTime(.0001,when+duration);
    src.connect(filter).connect(low).connect(gain).connect(ctx.destination); src.start(when); src.stop(when+duration+.03);
    const tone=trackBreathNode(ctx.createOscillator()); const tg=ctx.createGain(); tone.type='sawtooth'; tone.frequency.value=cutoff<400?72:88;
    tg.gain.setValueAtTime(.0001,when); tg.gain.exponentialRampToValueAtTime(masterVolume(.018),when+.08); tg.gain.exponentialRampToValueAtTime(.0001,when+duration);
    tone.connect(tg).connect(ctx.destination); tone.start(when); tone.stop(when+duration+.03);
  }
  function mechanicalBreathPulse() {
    if (!state.settings?.breathingSound) return;
    const ctx=getAudioContext(); if(!ctx) return;
    const t=ctx.currentTime+.03;
    scheduleBreathBurst(ctx,t,.78,520,.22);
    scheduleBreathBurst(ctx,t+1.43,1.18,330,.26);
  }
  function startSynthBreathingFallback() {
    if (!state.settings?.breathingSound) return;
    mechanicalBreathPulse();
    breathAudioTimer=setInterval(mechanicalBreathPulse,3200);
  }
  function startMechanicalBreathing() {
    stopMechanicalBreathing();
    if (!state.settings?.breathingSound) return;
    const audio=getBreathAudio();
    try { audio.currentTime=0; } catch {}
    const p=audio.play();
    if (p && typeof p.catch === 'function') {
      p.catch(()=>{
        toast('The original breathing track was blocked by this preview. Open in Safari/Chrome and tap Start chamber again.');
      });
    }
  }
  function stopMechanicalBreathing() {
    if (breathAudioTestTimer) { clearTimeout(breathAudioTestTimer); breathAudioTestTimer=null; }
    if (breathAudio) {
      try { breathAudio.pause(); breathAudio.currentTime=0; } catch {}
    }
    if (breathAudioTimer) clearInterval(breathAudioTimer);
    breathAudioTimer=null;
    activeBreathNodes.forEach(n=>{try{n.stop?.();}catch{} try{n.disconnect?.();}catch{}});
    activeBreathNodes=[];
  }
  function testBreathingAudio() {
    if (!state.settings?.breathingSound) { state.settings.breathingSound=true; saveState(); }
    stopMechanicalBreathing();
    const audio=getBreathAudio();
    try { audio.currentTime=0; } catch {}
    const p=audio.play();
    if (p && typeof p.catch === 'function') {
      p.catch(()=>{ toast('The original breathing track was blocked here — try opening the standalone file in Safari/Chrome.'); });
    }
    breathAudioTestTimer=setTimeout(()=>stopMechanicalBreathing(),6500);
  }


  function renderNav() {
    document.getElementById('nav').innerHTML = navItems.map(([id,icon,label]) => `
      <button class="nav-btn ${id===currentView?'active':''}" data-nav="${id}"><span class="nav-icon">${icon}</span>${label}</button>
    `).join('');
    document.querySelectorAll('[data-nav]').forEach(b => b.addEventListener('click', () => navigate(b.dataset.nav)));
  }

  function navigate(view, opts={}) {
    if (!pageMeta[view]) return;
    if (view !== currentView && !opts.silent) playNavCue();
    currentView = view;
    document.body.dataset.view = view;
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
      simulator: renderSimulator, coach: renderCoach, transmissions: renderTransmissions, checkin: renderCheckin, breathing: renderBreathing,
      journal: renderJournal, debrief: renderDebrief, command: renderCommand, wisdom: renderWisdom,
      gallery: renderGallery, progress: renderProgress, settings: renderSettings
    }[currentView];
    fn?.(view);
    if (screenVisuals[currentView]) view.insertAdjacentHTML('afterbegin', screenBanner(screenVisuals[currentView]));
  }

  function renderDashboard(root) {
    const lesson = dailyLesson();
    const ci = state.checkins[todayKey()];
    const score = readiness(ci);
    const name = state.name ? `, ${esc(state.name)}` : '';
    const missionDone = !!state.dailyMissions[todayKey()];
    const streak = calculateStreak();
    root.innerHTML = `
      <section class="hero vader-hero">
        <img class="hero-art" src="${HERO_IMAGE}" alt="Darth Vader imagery supplied for this personal-use app">
        <div class="hero-shade" aria-hidden="true"></div>
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

      <section class="section transmission-strip">
        <div><div class="mini-label">INCOMING TRANSMISSION // ${esc(todayTransmission().dimension)}</div><h3>${esc(todayTransmission().title)}</h3><p>${esc(todayTransmission().mission)}</p></div>
        <button class="btn btn-primary" data-go="transmissions">Open transmission</button>
      </section>

      <section class="section grid grid-4">
        <article class="card hover" data-go="simulator"><div class="mini-label">2 MINUTES</div><h4>Mission Simulator</h4><p>Practice a difficult situation without frightening Human Resources.</p></article>
        <article class="card hover" data-go="coach"><div class="mini-label">SITUATION ROOM</div><h4>Vader vs Human Coach</h4><p>Bring a real-life problem. Get the dramatic instinct and the useful response.</p></article>
        <article class="card hover" data-go="breathing"><div class="mini-label">RESET</div><h4>Breathing Chamber</h4><p>Regulate first. Rule nothing. Mechanical breathing included.</p></article>
        <article class="card hover" data-go="debrief"><div class="mini-label">60 SECONDS</div><h4>Imperial Debrief</h4><p>What worked, where you nearly went Full Vader, and tomorrow’s mission.</p></article>
        <article class="card hover visual-link-card" data-go="gallery"><img src="${galleryVisuals[7].src}" alt=""><div><div class="mini-label">VISUAL ARCHIVE</div><h4>Gallery & Postcards</h4><p>Vader imagery, quippy lessons, and shareable cards for the group chat.</p></div></article>
      </section>
    `;
    document.getElementById('heroMission').onclick = () => navigate('missions');
    document.getElementById('dashboardMission').onclick = () => toggleDailyMission(lesson.id);
    wireShared(root);
  }

  function renderTraining(root) {
    const stage = stageFilter === 'all' ? null : stages.find(s=>s.id===stageFilter);
    const selected = stage ? stage.lessons : allLessons;
    const visual = stage ? stageVisuals[stage.id] : null;
    root.innerHTML = `
      ${stage ? `<section class="stage-cinema"><img class="stage-cinema-img" src="${visual.image}" alt="${esc(stage.name)} Vader training imagery"><div class="stage-cinema-shade" aria-hidden="true"></div><div><div class="hero-kicker">${visual.kicker}</div><h3>${esc(stage.name)}</h3><p>${esc(visual.tagline)}</p></div></section>` : `<div class="section-head"><div><h3>25 lessons. Five training stages.</h3><p>The book's chapter sequence becomes a practical, humorous self-development curriculum.</p></div><div class="progress-ring" style="--p:${completedPct()}%"><span>${completedPct()}%</span></div></div>`}
      <div class="stage-tabs">
        <button class="stage-btn ${stageFilter==='all'?'active':''}" data-stage="all">All training</button>
        ${stages.map(s=>`<button class="stage-btn ${stageFilter===s.id?'active':''}" data-stage="${s.id}">${s.name}</button>`).join('')}
      </div>
      ${!stage ? `<div class="stage-gallery">${stages.map(s=>{const v=stageVisuals[s.id];return `<button class="stage-tile" data-stage="${s.id}"><img class="stage-tile-img" src="${v.image}" alt=""><span class="stage-tile-shade" aria-hidden="true"></span><span class="stage-tile-copy"><span>${v.kicker}</span><strong>${esc(s.name)}</strong><small>${esc(v.tagline)}</small></span></button>`}).join('')}</div>`:''}
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


  function coachProfileFor(text, chosen) {
    if (chosen && chosen !== 'auto') return chosen;
    const t=text.toLowerCase();
    if (/relationship|partner|friend|family|wife|husband|girlfriend|boyfriend|texted|message/.test(t)) return 'relationship';
    if (/no|boundary|decline|refuse|too much|overcommit/.test(t)) return 'boundary';
    if (/stress|overwhelm|busy|calendar|exhaust|tired|too many/.test(t)) return 'stress';
    if (/decid|choose|option|whether|uncertain/.test(t)) return 'decision';
    if (/argument|conflict|angry|annoy|critic|disagree|rude/.test(t)) return 'conflict';
    return 'work';
  }
  function renderCoach(root) {
    root.innerHTML=`
      <section class="coach-hero card">
        <div class="mini-label">VADER VS HUMAN</div><h3>Bring the situation. Separate the cape from the useful response.</h3>
        <p>This is an offline reflection coach — deliberately simple, fast and funny.</p>
        <div class="field"><label>What happened?</label><textarea id="coachInput" placeholder="e.g. A colleague missed a deadline and I am about to send the message of the century..."></textarea></div>
        <div class="field"><label>Context</label><select id="coachType"><option value="auto">Auto-detect</option><option value="work">Work / performance</option><option value="conflict">Conflict</option><option value="boundary">Boundary</option><option value="stress">Stress / overload</option><option value="decision">Decision</option><option value="relationship">Relationship</option></select></div>
        <button class="btn btn-primary" id="coachBtn">Consult the Dark Side</button>
      </section>
      <section id="coachResult" class="section"></section>`;
    document.getElementById('coachBtn').onclick=()=>{
      const text=document.getElementById('coachInput').value.trim(); if(!text) return toast('Give the Situation Room something to work with.');
      const key=coachProfileFor(text,document.getElementById('coachType').value); const c=coachProfiles[key];
      document.getElementById('coachResult').innerHTML=`<div class="grid grid-3 coach-results">
        <article class="card vader-answer"><div class="mini-label">VADER INSTINCT</div><h4>${esc(c.label)}</h4><p>${esc(c.vader)}</p><small>Emotion acknowledged. Implementation not recommended.</small></article>
        <article class="card human-answer"><div class="mini-label">FUNCTIONAL HUMAN</div><h4>Keep the power. Lose the collateral damage.</h4><p>${esc(c.human)}</p></article>
        <article class="card mission-answer"><div class="mini-label">BEST MISSION</div><h4>Your next useful move</h4><p>${esc(c.mission)}</p><button class="btn btn-small btn-primary" data-copy-coach>Copy mission</button></article>
      </div>`;
      document.querySelector('[data-copy-coach]').onclick=()=>navigator.clipboard?.writeText(c.mission).then(()=>toast('Mission copied.')).catch(()=>toast('Mission ready to copy manually.'));
      markActivity('coach',2);
    };
  }

  function renderTransmissions(root) {
    const tx=todayTransmission(); const d=todayKey(); const status=state.transmissions[d]||{};
    root.innerHTML=`
      <section class="transmission-hero">
        <img class="transmission-art" src="${TRANSMISSION_IMAGE}" alt="Darth Vader imagery supplied for this personal-use app">
        <div class="transmission-shade" aria-hidden="true"></div>
        <div class="signal-lines" aria-hidden="true"></div>
        <div class="mini-label">PRIORITY TRANSMISSION // ${esc(tx.dimension)}</div>
        <h3>${esc(tx.title)}</h3><p>${esc(tx.mission)}</p>
        <div class="row"><button class="btn ${status.completed?'btn-ghost':'btn-primary'}" id="txAction">${status.completed?'✓ Mission completed':status.accepted?'Complete transmission':'Accept transmission'}</button><button class="btn btn-ghost" id="txAlternate">Request alternate order</button></div>
      </section>
      <section class="section grid grid-3">
        <article class="card"><div class="mini-label">RULE 01</div><h4>Keep it small.</h4><p>One behaviour. One day. No heroic lifestyle reconstruction before lunch.</p></article>
        <article class="card"><div class="mini-label">RULE 02</div><h4>Keep it human.</h4><p>The joke is Vader. The objective is calmer, clearer, more useful behaviour.</p></article>
        <article class="card"><div class="mini-label">RULE 03</div><h4>Report back.</h4><p>Finish with the Imperial Debrief if the mission produced anything worth learning.</p></article>
      </section>`;
    document.getElementById('txAction').onclick=()=>{
      state.transmissions[d] ||= {id:tx.id,accepted:false,completed:false};
      if (!state.transmissions[d].accepted) { state.transmissions[d].accepted=true; toast('Transmission accepted. Try to look suitably serious.'); }
      else if (!state.transmissions[d].completed) { state.transmissions[d].completed=true; markActivity('transmission',4); toast('Transmission complete. +4 XP.'); }
      saveState(); render();
    };
    document.getElementById('txAlternate').onclick=()=>{state.transmissionOffset=(state.transmissionOffset||0)+1;delete state.transmissions[d];saveState();playNavCue();render();};
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
        <article class="card breathing-card">
          <img class="breathing-image" src="${BREATHING_IMAGE}" alt="Darth Vader imagery supplied for the Breathing Chamber">
          <div class="breathing-content">
            <div class="mini-label">BREATHING CHAMBER // MECHANICAL RESPIRATOR</div>
            <h3>Regulate first. Command second.</h3>
            <p>Slow breathing gives your nervous system room to choose a response instead of launching one. The chamber uses your original Darth Vader breathing MP3 exactly as supplied — no trimming, gain change or re-encoding — and loops the complete 35+ second track for the full session.</p>
            <div class="duration-row"><button class="btn btn-small" data-duration="120">2 min</button><button class="btn btn-small" data-duration="300">5 min</button><button class="btn btn-small" data-duration="600">10 min</button></div>
            <div class="breathe-wrap">
              <div id="breatheOrb" class="breathe-orb"><strong id="phaseText">READY</strong></div>
              <div id="timerText" class="timer">02:00</div>
              <div class="row"><button class="btn btn-primary" id="startBreath">Start chamber</button><button class="btn btn-ghost" id="stopBreath">Reset</button><button class="btn btn-ghost" id="breathSoundToggle">Sound: ${state.settings.breathingSound?'ON':'OFF'}</button></div>
            </div>
          </div>
        </article>
        <article class="card">
          <div class="mini-label">CYCLE</div>
          <h3>4 · 2 · 6</h3>
          <p><strong>Inhale 4</strong> → hold 2 → <strong>exhale 6</strong>. The respirator ambience is atmosphere, not a command to match its rhythm.</p>
          <hr class="sep" />
          <div class="mechanical-note"><span class="status-dot"></span><div><strong>Original supplied Vader breathing track</strong><p>The complete original MP3 plays unchanged and loops continuously for the full session. Nothing has been cut, boosted, filtered or re-encoded.</p><div class="row" style="margin-top:10px"><button class="btn btn-small btn-ghost" id="testBreathHere">Test breathing audio</button></div></div></div>
          <div class="warning card" style="padding:14px;margin-top:14px"><strong>Comfort first.</strong><p>If breath-holding feels unpleasant, skip the hold and breathe normally. This is a simple relaxation tool, not medical treatment.</p></div>
        </article>
      </div>
    `;
    let selected=120;
    document.querySelectorAll('[data-duration]').forEach(b=>b.onclick=()=>{selected=Number(b.dataset.duration); breathingSeconds=selected; updateTimer();});
    breathingSeconds=selected; updateTimer();
    document.getElementById('startBreath').onclick=()=>startBreathing(selected);
    document.getElementById('stopBreath').onclick=()=>{clearBreathing(); breathingSeconds=selected; updateTimer(); resetOrb();};
    document.getElementById('breathSoundToggle').onclick=()=>{state.settings.breathingSound=!state.settings.breathingSound;saveState();if(!state.settings.breathingSound)stopMechanicalBreathing();else if(breathingTimer)startMechanicalBreathing();document.getElementById('breathSoundToggle').textContent=`Sound: ${state.settings.breathingSound?'ON':'OFF'}`;};
    document.getElementById('testBreathHere').onclick=()=>testBreathingAudio();
  }

  function startBreathing(seconds) {
    clearBreathing(); breathingSeconds=seconds; updateTimer();
    runBreathPhase(); startMechanicalBreathing();
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
  function clearBreathing(){ if(breathingTimer)clearInterval(breathingTimer); if(breathPhaseTimer)clearTimeout(breathPhaseTimer); breathingTimer=null; breathPhaseTimer=null; stopMechanicalBreathing(); }
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


  function renderDebrief(root) {
    const d=todayKey(); const existing=state.dailyDebriefs[d]||{};
    const recent=Object.entries(state.dailyDebriefs||{}).sort((a,b)=>b[0].localeCompare(a[0])).slice(0,7);
    root.innerHTML=`
      <div class="grid grid-2">
        <article class="card debrief-card">
          <div class="mini-label">60-SECOND SHUTDOWN SEQUENCE</div><h3>Close the day without a trilogy.</h3>
          <div class="field"><label>What went well?</label><textarea id="dWin" placeholder="One win is enough.">${esc(existing.win||'')}</textarea></div>
          <div class="field"><label>Where did I nearly go Full Vader?</label><textarea id="dVader" placeholder="The dramatic impulse, reaction or unnecessary war...">${esc(existing.vader||'')}</textarea></div>
          <div class="field"><label>What did I learn?</label><textarea id="dLearn" placeholder="One useful sentence.">${esc(existing.learn||'')}</textarea></div>
          <div class="field"><label>Tomorrow's mission</label><textarea id="dTomorrow" placeholder="Small, concrete, useful.">${esc(existing.tomorrow||'')}</textarea></div>
          <button class="btn btn-primary" id="saveDebrief">${existing.savedAt?'Update debrief':'Save debrief'}</button>
        </article>
        <article class="card"><div class="mini-label">RECENT SHUTDOWNS</div><h3>Imperial performance notes</h3><div class="list" style="margin-top:12px">${recent.length?recent.map(([date,x])=>`<div class="list-item"><div><strong>${esc(date)}</strong><p>${esc(x.win||x.learn||'Debrief complete').slice(0,150)}</p></div></div>`).join(''):'<div class="empty">No daily debriefs yet. Even the Empire eventually clocks off.</div>'}</div></article>
      </div>`;
    document.getElementById('saveDebrief').onclick=()=>{
      const entry={win:document.getElementById('dWin').value.trim(),vader:document.getElementById('dVader').value.trim(),learn:document.getElementById('dLearn').value.trim(),tomorrow:document.getElementById('dTomorrow').value.trim(),savedAt:new Date().toISOString()};
      if(!entry.win && !entry.vader && !entry.learn && !entry.tomorrow) return toast('Give the day at least one sentence.');
      const first=!state.dailyDebriefs[d]; state.dailyDebriefs[d]=entry; if(first)markActivity('debrief',3); saveState(); toast('Imperial debrief saved. Systems can power down.'); render();
    };
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


  function renderGallery(root) {
    root.innerHTML=`
      <section class="gallery-hero">
        <img src="${galleryVisuals[1].src}" alt="Darth Vader and Imperial forces">
        <div class="gallery-hero-shade" aria-hidden="true"></div>
        <div class="gallery-hero-copy">
          <div class="hero-kicker">THE VISUAL ARCHIVE</div>
          <h3>Gallery, doctrine, and unnecessary levels of gravitas.</h3>
          <p>Browse the Vader imagery you supplied, then turn it into postcard-style lessons for the group chat.</p>
        </div>
      </section>

      <section class="section">
        <div class="section-head"><div><h3>Imperial Gallery</h3><p>Tap any image for full-screen viewing.</p></div><span class="dimension-pill">${galleryVisuals.length} IMAGES</span></div>
        <div class="gallery-grid">
          ${galleryVisuals.map((g,i)=>`<button class="gallery-item no-swipe" data-gallery="${i}" aria-label="Open ${esc(g.title)}">
            <img src="${g.src}" alt="${esc(g.title)}" loading="lazy">
            <span class="gallery-item-shade" aria-hidden="true"></span>
            <span class="gallery-item-copy"><strong>${esc(g.title)}</strong><small>${esc(g.caption)}</small></span>
          </button>`).join('')}
        </div>
      </section>

      <section class="section">
        <div class="section-head"><div><h3>Dark Side Postcards</h3><p>Book-style image + quip + useful human lesson. Tap a card to share or save it.</p></div></div>
        <div class="postcard-grid">
          ${postcardDeck.map((c,i)=>`<article class="postcard" data-postcard-preview="${i}">
            <img src="${galleryVisuals[c.image].src}" alt="" loading="lazy">
            <span class="postcard-shade" aria-hidden="true"></span>
            <div class="postcard-copy">
              <span>VADER MODE // ${String(i+1).padStart(2,'0')}</span>
              <strong>${esc(c.headline)}</strong>
              <small>${esc(c.lesson)}</small>
              <button class="btn btn-small postcard-share no-swipe" data-postcard="${i}">Share / save card</button>
            </div>
          </article>`).join('')}
        </div>
      </section>

      <section class="section card custom-postcard">
        <div class="mini-label">BUILD YOUR OWN</div>
        <h3>Imperial Postcard Generator</h3>
        <p>Pick an image, add a dramatic line, then quietly smuggle in a useful lesson.</p>
        <div class="grid grid-2">
          <div>
            <div class="field"><label>Image</label><select id="customPostcardImage">${galleryVisuals.map((g,i)=>`<option value="${i}">${esc(g.title)}</option>`).join('')}</select></div>
            <div class="field"><label>Quippy headline</label><input id="customPostcardHeadline" maxlength="100" value="YOUR CAPE IS NOT A STRATEGY."></div>
            <div class="field"><label>Human lesson</label><textarea id="customPostcardLesson" maxlength="180">Presence helps. Preparation helps more.</textarea></div>
            <div class="row"><button class="btn btn-primary no-swipe" id="makeCustomPostcard">Share / save postcard</button><button class="btn btn-ghost no-swipe" id="randomPostcard">Surprise me</button></div>
          </div>
          <div id="customPostcardPreview" class="custom-postcard-preview"></div>
        </div>
      </section>`;

    root.querySelectorAll('[data-gallery]').forEach(b=>b.onclick=()=>openGalleryImage(Number(b.dataset.gallery)));
    root.querySelectorAll('[data-postcard]').forEach(b=>b.onclick=e=>{e.stopPropagation();sharePostcard(postcardDeck[Number(b.dataset.postcard)]);});
    root.querySelectorAll('[data-postcard-preview]').forEach(card=>card.onclick=e=>{if(e.target.closest('button'))return;const c=postcardDeck[Number(card.dataset.postcardPreview)];openPostcardPreview(c);});
    const imageEl=document.getElementById('customPostcardImage'), headEl=document.getElementById('customPostcardHeadline'), lessonEl=document.getElementById('customPostcardLesson');
    const updatePreview=()=>renderCustomPostcardPreview({image:Number(imageEl.value),headline:headEl.value.trim()||'VADER MODE',lesson:lessonEl.value.trim()||'A useful lesson goes here.'});
    [imageEl,headEl,lessonEl].forEach(el=>el.addEventListener('input',updatePreview));
    document.getElementById('makeCustomPostcard').onclick=()=>sharePostcard({image:Number(imageEl.value),headline:headEl.value.trim()||'VADER MODE',lesson:lessonEl.value.trim()||'A useful lesson goes here.'});
    document.getElementById('randomPostcard').onclick=()=>{
      const c=postcardDeck[Math.floor(Math.random()*postcardDeck.length)];
      imageEl.value=c.image;headEl.value=c.headline;lessonEl.value=c.lesson;updatePreview();playNavCue();
    };
    updatePreview();
  }

  function renderCustomPostcardPreview(c) {
    const target=document.getElementById('customPostcardPreview'); if(!target)return;
    target.innerHTML=`<div class="postcard postcard-live"><img src="${galleryVisuals[c.image]?.src||HERO_IMAGE}" alt=""><span class="postcard-shade"></span><div class="postcard-copy"><span>VADER MODE // CUSTOM</span><strong>${esc(c.headline)}</strong><small>${esc(c.lesson)}</small></div></div>`;
  }

  function openGalleryImage(index) {
    const g=galleryVisuals[index]; if(!g)return;
    const modal=document.getElementById('modal');
    modal.innerHTML=`<div class="gallery-modal-wrap"><button class="modal-close gallery-close" id="closeGallery">×</button><img class="gallery-modal-image" src="${g.src}" alt="${esc(g.title)}"><div class="gallery-modal-caption"><div class="mini-label">VISUAL ARCHIVE ${String(index+1).padStart(2,'0')}</div><h3>${esc(g.title)}</h3><p>${esc(g.caption)}</p></div></div>`;
    modal.showModal();document.getElementById('closeGallery').onclick=()=>modal.close();
  }

  function openPostcardPreview(c) {
    const modal=document.getElementById('modal');
    modal.innerHTML=`<div class="postcard-modal-wrap"><button class="modal-close gallery-close" id="closePostcard">×</button><div class="postcard postcard-modal-card"><img src="${galleryVisuals[c.image].src}" alt=""><span class="postcard-shade"></span><div class="postcard-copy"><span>VADER MODE // DARK SIDE POSTCARD</span><strong>${esc(c.headline)}</strong><small>${esc(c.lesson)}</small></div></div><button class="btn btn-primary" id="sharePostcardModal">Share / save card</button></div>`;
    modal.showModal();document.getElementById('closePostcard').onclick=()=>modal.close();document.getElementById('sharePostcardModal').onclick=()=>sharePostcard(c);
  }

  function drawImageCover(ctx,img,x,y,w,h) {
    const s=Math.max(w/img.width,h/img.height), sw=w/s, sh=h/s, sx=(img.width-sw)/2, sy=(img.height-sh)/2;
    ctx.drawImage(img,sx,sy,sw,sh,x,y,w,h);
  }
  function drawWrapped(ctx,text,x,y,maxWidth,lineHeight,maxLines=6) {
    const words=String(text).split(/\s+/);let line='',yy=y,lines=0;
    for(const word of words){
      const test=line?line+' '+word:word;
      if(ctx.measureText(test).width>maxWidth&&line){
        ctx.fillText(line,x,yy);line=word;yy+=lineHeight;lines++;
        if(lines>=maxLines-1)break;
      } else line=test;
    }
    if(line&&lines<maxLines){ctx.fillText(line,x,yy);yy+=lineHeight;}
    return yy;
  }
  async function sharePostcard(c) {
    const g=galleryVisuals[c.image]||galleryVisuals[0];
    const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1350;const ctx=canvas.getContext('2d');
    ctx.fillStyle='#07080b';ctx.fillRect(0,0,1080,1350);
    try{const img=new Image();img.src=g.src;await img.decode();drawImageCover(ctx,img,0,0,1080,1350);}catch{}
    const grad=ctx.createLinearGradient(0,0,0,1350);grad.addColorStop(0,'rgba(5,6,8,.12)');grad.addColorStop(.44,'rgba(5,6,8,.28)');grad.addColorStop(.70,'rgba(5,6,8,.78)');grad.addColorStop(1,'rgba(5,6,8,.97)');ctx.fillStyle=grad;ctx.fillRect(0,0,1080,1350);
    ctx.fillStyle='rgba(237,43,58,.96)';ctx.fillRect(66,78,124,10);
    ctx.fillStyle='#ff9da5';ctx.font='700 26px system-ui, -apple-system, sans-serif';ctx.fillText('VADER MODE // DARK SIDE POSTCARD',66,138);
    ctx.fillStyle='#ffffff';ctx.font='900 66px system-ui, -apple-system, sans-serif';
    let yy=drawWrapped(ctx,String(c.headline).toUpperCase(),66,900,940,76,4);
    ctx.fillStyle='#e6e7ea';ctx.font='500 34px system-ui, -apple-system, sans-serif';yy=drawWrapped(ctx,c.lesson,66,Math.max(1095,yy+28),900,46,3);
    ctx.fillStyle='#a5a8b0';ctx.font='600 24px system-ui, -apple-system, sans-serif';ctx.fillText('BE FORMIDABLE. REMAIN FUNCTIONAL.',66,1288);
    const blob=await new Promise(r=>canvas.toBlob(r,'image/png',.95));if(!blob)return;
    const slug=String(c.headline).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,52)||'postcard';
    const file=new File([blob],`vader-mode-postcard-${slug}.png`,{type:'image/png'});
    markActivity('postcard',1);
    try{if(navigator.canShare?.({files:[file]})){await navigator.share({title:'Vader Mode postcard',text:`${c.headline} — ${c.lesson}`,files:[file]});return;}}catch(e){if(e?.name==='AbortError')return;}
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=file.name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1200);toast('Postcard created.');
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
      ['Seven-Day Command','Stay active seven days in a row',calculateStreak()>=7],
      ['Situation Room Survivor','Use Vader vs Human Coach',Object.values(state.activity).some(a=>a.coach)],
      ['Transmission Received','Complete an Incoming Transmission',Object.values(state.activity).some(a=>a.transmission)],
      ['Powered Down Properly','Complete an Imperial Debrief',Object.values(state.activity).some(a=>a.debrief)]
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
      <section class="section"><div class="section-head"><div><h3>Badges of Questionable Importance</h3><p>Entirely unnecessary. Strangely motivating.</p></div></div><div class="badge-grid">${badges.map((b,i)=>`<div class="badge ${b[2]?'unlocked':''}"><strong>${b[2]?'★ ':'☆ '}${esc(b[0])}</strong><small>${esc(b[1])}</small>${b[2]?`<button class="btn btn-small btn-ghost badge-share" data-share-badge="${i}">Share card</button>`:''}</div>`).join('')}</div></section>`;
    root.querySelectorAll('[data-share-badge]').forEach(btn=>btn.onclick=()=>{const b=badges[Number(btn.dataset.shareBadge)];shareAchievement(b[0],b[1]);});
  }


  async function shareAchievement(title, subtitle='Mission accomplished') {
    const canvas=document.createElement('canvas'); canvas.width=1200; canvas.height=675; const ctx=canvas.getContext('2d');
    ctx.fillStyle='#08090b';ctx.fillRect(0,0,1200,675);
    try{
      const img=new Image(); img.src=galleryVisuals[0].src; await img.decode();
      ctx.globalAlpha=.42; ctx.drawImage(img,650,0,550,675); ctx.globalAlpha=1;
    }catch{}
    const grad=ctx.createLinearGradient(0,0,1000,0);grad.addColorStop(0,'#08090b');grad.addColorStop(.62,'rgba(8,9,11,.94)');grad.addColorStop(1,'rgba(8,9,11,.18)');ctx.fillStyle=grad;ctx.fillRect(0,0,1200,675);
    ctx.fillStyle='#ed2b3a';ctx.fillRect(72,76,92,8);
    ctx.fillStyle='#ff8791';ctx.font='700 24px system-ui, sans-serif';ctx.fillText('VADER MODE // ACHIEVEMENT UNLOCKED',72,132);
    ctx.fillStyle='#ffffff';ctx.font='900 64px system-ui, sans-serif';wrapCanvasText(ctx,title,72,228,650,74);
    ctx.fillStyle='#b7b9c1';ctx.font='400 29px system-ui, sans-serif';wrapCanvasText(ctx,subtitle,72,400,610,40);
    ctx.fillStyle='#ffffff';ctx.font='700 24px system-ui, sans-serif';ctx.fillText(`${state.xp||0} XP  •  ${rankInfo().name}`,72,592);
    ctx.fillStyle='#7e818a';ctx.font='400 20px system-ui, sans-serif';ctx.fillText('Be formidable. Remain functional.',72,630);
    const blob=await new Promise(r=>canvas.toBlob(r,'image/png',.95)); if(!blob)return;
    const file=new File([blob],`vader-mode-${title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}.png`,{type:'image/png'});
    try{if(navigator.canShare?.({files:[file]})){await navigator.share({title:'Vader Mode',text:`${title} — ${subtitle}`,files:[file]});return;}}catch(e){if(e?.name==='AbortError')return;}
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=file.name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast('Achievement card created.');
  }
  function wrapCanvasText(ctx,text,x,y,maxWidth,lineHeight){const words=String(text).split(/\s+/);let line='';let yy=y;for(const word of words){const test=line?line+' '+word:word;if(ctx.measureText(test).width>maxWidth&&line){ctx.fillText(line,x,yy);line=word;yy+=lineHeight;}else line=test;}if(line)ctx.fillText(line,x,yy);}

  function calculateStreak() {
    const dates = new Set(Object.keys(state.activity).filter(d => Object.keys(state.activity[d]||{}).length));
    let streak=0; const d=new Date();
    while(true){const k=d.toISOString().slice(0,10);if(dates.has(k)){streak++;d.setDate(d.getDate()-1);} else break;}
    return streak;
  }

  function renderSettings(root) {
    const s=state.settings||{};
    root.innerHTML=`
      <div class="grid grid-2">
        <article class="card">
          <div class="mini-label">PROFILE</div><h3>Personalize command</h3>
          <div class="field"><label>Name</label><input id="nameInput" value="${esc(state.name||'')}" placeholder="Your name"></div>
          <button class="btn btn-primary" id="saveName">Save</button>
        </article>
        <article class="card">
          <div class="mini-label">SOUND & MOTION</div><h3>Cinematic controls</h3>
          <label class="toggle-row"><span><strong>Navigation cue</strong><small>Original two-hit low cinematic cue between sections.</small></span><input id="navSound" type="checkbox" ${s.navSound?'checked':''}></label>
          <label class="toggle-row"><span><strong>Breathing Chamber audio</strong><small>Your exact supplied MP3, reconstructed internally and looped without editing.</small></span><input id="breathingSound" type="checkbox" ${s.breathingSound?'checked':''}></label>
          <label class="toggle-row"><span><strong>Haptics</strong><small>Small vibration on supported devices.</small></span><input id="haptics" type="checkbox" ${s.haptics?'checked':''}></label>
          <div class="field"><label>Sound volume <span id="volLabel">${Math.round((s.volume||0)*100)}%</span></label><input id="volume" type="range" min="0" max="1" step="0.05" value="${s.volume ?? .62}"></div>
          <div class="row"><button class="btn btn-ghost" id="testSound">Test navigation cue</button><button class="btn btn-primary" id="testBreathSound">Test breathing audio</button></div>
        </article>
        <article class="card display-controls">
          <div class="mini-label">COLOUR & DISPLAY</div><h3>Tune the command deck</h3>
          <div class="field"><label>Colour template</label><select id="colorTheme">
            <option value="imperial-red" ${s.colorTheme==='imperial-red'?'selected':''}>Imperial Red</option>
            <option value="mustafar" ${s.colorTheme==='mustafar'?'selected':''}>Mustafar Ember</option>
            <option value="bespin-blue" ${s.colorTheme==='bespin-blue'?'selected':''}>Bespin Blue</option>
            <option value="carbon" ${s.colorTheme==='carbon'?'selected':''}>Carbon Monochrome</option>
            <option value="sith-neon" ${s.colorTheme==='sith-neon'?'selected':''}>Sith Neon</option>
          </select></div>
          <div class="theme-swatches"><span class="swatch imperial"></span><span class="swatch mustafar"></span><span class="swatch bespin"></span><span class="swatch carbon"></span><span class="swatch neon"></span></div>
          <div class="field"><label>Image tone</label><select id="visualTone">
            <option value="neutral" ${s.visualTone==='neutral'?'selected':''}>Neutral</option>
            <option value="cinematic" ${s.visualTone==='cinematic'?'selected':''}>Cinematic</option>
            <option value="warm" ${s.visualTone==='warm'?'selected':''}>Warm</option>
            <option value="cool" ${s.visualTone==='cool'?'selected':''}>Cool</option>
            <option value="mono" ${s.visualTone==='mono'?'selected':''}>Monochrome</option>
          </select></div>
          <div class="field"><label>Overall brightness <span id="uiBrightnessLabel">${Number(s.uiBrightness??100)}%</span></label><input id="uiBrightness" type="range" min="70" max="130" step="1" value="${Number(s.uiBrightness??100)}"></div>
          <div class="field"><label>Image brightness <span id="imageBrightnessLabel">${Number(s.imageBrightness??100)}%</span></label><input id="imageBrightness" type="range" min="60" max="150" step="1" value="${Number(s.imageBrightness??100)}"></div>
          <div class="field"><label>Image saturation <span id="imageSaturationLabel">${Number(s.imageSaturation??100)}%</span></label><input id="imageSaturation" type="range" min="0" max="180" step="1" value="${Number(s.imageSaturation??100)}"></div>
          <div class="field"><label>Image contrast <span id="imageContrastLabel">${Number(s.imageContrast??105)}%</span></label><input id="imageContrast" type="range" min="60" max="170" step="1" value="${Number(s.imageContrast??105)}"></div>
          <button class="btn btn-ghost" id="resetDisplay">Reset visual settings</button>
        </article>
        <article class="card media-diagnostic-card">
          <div class="mini-label">MEDIA CHECK</div><h3>Built-in media diagnostics</h3>
          <div class="media-check-preview"><img id="mediaCheckImage" src="${HERO_IMAGE}" alt="Vader media test"></div>
          <div class="media-status-row"><span>Images</span><strong id="imageMediaStatus">Checking…</strong></div>
          <div class="media-status-row"><span>Breathing track</span><strong id="audioMediaStatus">Checking…</strong></div>
          <p class="muted">V2.4 reconstructs all images and your original MP3 from bytes embedded inside the app, so broken relative file paths cannot remove the media.</p>
          <button class="btn btn-primary" id="runMediaCheck">Run media check</button>
        </article>
        <article class="card">
          <div class="mini-label">DATA</div><h3>Your data stays in this browser</h3>
          <p>Vader Mode uses localStorage only. Export a backup if you want to move devices.</p>
          <div class="row"><button class="btn" id="exportData">Export JSON</button><label class="btn btn-ghost" for="importFile">Import JSON</label><input id="importFile" type="file" accept="application/json" hidden></div>
        </article>
        <article class="card">
          <div class="mini-label">GESTURES</div><h3>Swipe the command deck</h3><p>On touch devices, swipe left or right across the main content to move between app sections. Form controls are ignored so journaling remains civilized.</p>
        </article>
      </div>
      <section class="section card warning"><div class="mini-label">DANGER ZONE</div><h3>Reset the Empire</h3><p>Deletes all local progress, logs, goals, check-ins and customization from this browser.</p><button class="btn btn-ghost" id="resetData">Reset all local data</button></section>
      <section class="section card"><div class="mini-label">ABOUT V2.4</div><p>Media-resilient personal build. Vader imagery and the exact supplied breathing MP3 are embedded inside the application and reconstructed locally at runtime. Visual template, brightness, tone, saturation and contrast controls are now user-adjustable.</p></section>`;
    document.getElementById('saveName').onclick=()=>{state.name=document.getElementById('nameInput').value.trim();saveState();toast('Command profile updated.');};
    ['navSound','breathingSound','haptics'].forEach(id=>document.getElementById(id).onchange=e=>{state.settings[id]=e.target.checked;saveState();});
    document.getElementById('volume').oninput=e=>{state.settings.volume=Number(e.target.value);document.getElementById('volLabel').textContent=`${Math.round(Number(e.target.value)*100)}%`;syncBreathAudioVolume();saveState();};
    const displayIds=['colorTheme','visualTone','uiBrightness','imageBrightness','imageSaturation','imageContrast'];
    displayIds.forEach(id=>document.getElementById(id).oninput=e=>{
      state.settings[id]=(id==='colorTheme'||id==='visualTone')?e.target.value:Number(e.target.value);
      const label=document.getElementById(id+'Label'); if(label)label.textContent=`${e.target.value}%`;
      applyDisplaySettings(); saveState();
    });
    document.getElementById('resetDisplay').onclick=()=>{resetDisplaySettings();renderSettings(root);toast('Visual settings reset.');};
    document.getElementById('testSound').onclick=()=>playNavCue();
    document.getElementById('testBreathSound').onclick=()=>testBreathingAudio();
    document.getElementById('runMediaCheck').onclick=()=>runMediaDiagnostics(true);
    document.getElementById('exportData').onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`vader-mode-backup-${todayKey()}.json`;a.click();URL.revokeObjectURL(a.href);};
    document.getElementById('importFile').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const raw=JSON.parse(r.result);state={...structuredClone(defaultState),...raw,settings:{...defaultState.settings,...(raw.settings||{})}};saveState();applyDisplaySettings();toast('Backup imported.');render();}catch{toast('That backup could not be read.');}};r.readAsText(f);};
    document.getElementById('resetData').onclick=()=>{if(confirm('Reset all Vader Mode data on this browser?')){state=structuredClone(defaultState);saveState();applyDisplaySettings();render();toast('Local data reset. The corridor is eerily quiet.');}};
    runMediaDiagnostics(false);
  }

  async function runMediaDiagnostics(showToast=false) {
    const imgEl=document.getElementById('imageMediaStatus');
    const audEl=document.getElementById('audioMediaStatus');
    const imageSources=[...new Set(galleryVisuals.map(x=>x.src))];
    let loaded=0;
    await Promise.all(imageSources.map(src=>new Promise(resolve=>{
      const im=new Image(); let settled=false;
      const done=(ok)=>{if(settled)return;settled=true;if(ok&&im.naturalWidth>0)loaded++;resolve();};
      im.onload=()=>done(true); im.onerror=()=>done(false); im.src=src;
      if(im.complete)done(im.naturalWidth>0);
    })));
    if(imgEl) { imgEl.textContent=`${loaded}/${imageSources.length} loaded`; imgEl.dataset.ok=loaded===imageSources.length?'1':'0'; }
    const audio=getBreathAudio();
    let audioText='Not ready';
    try {
      if(Number.isFinite(audio.duration)&&audio.duration>0) audioText=`Ready • ${audio.duration.toFixed(1)} sec`;
      else {
        await new Promise(resolve=>{
          const finish=()=>resolve();
          audio.addEventListener('loadedmetadata',finish,{once:true});
          audio.addEventListener('error',finish,{once:true});
          setTimeout(finish,1800);
          try{audio.load();}catch{}
        });
        audioText=Number.isFinite(audio.duration)&&audio.duration>0?`Ready • ${audio.duration.toFixed(1)} sec`:'Load failed';
      }
    } catch { audioText='Load failed'; }
    if(audEl){audEl.textContent=audioText;audEl.dataset.ok=audioText.startsWith('Ready')?'1':'0';}
    if(showToast) toast(loaded===imageSources.length && audioText.startsWith('Ready')?'Media check passed. Images and breathing track are ready.':'Media check found a problem. See the status panel.');
  }

  function openLesson(id) {
    const l=allLessons.find(x=>x.id===id); if(!l)return;
    const modal=document.getElementById('modal');
    const done=state.completedLessons.includes(id);
    const stage=stages.find(s=>s.name===l.stageName); const visual=stage?stageVisuals[stage.id]:null;
    modal.innerHTML=`<div class="lesson-modal-image-wrap"><img class="lesson-modal-visual" src="${visual?.image||HERO_IMAGE}" alt="Vader training imagery"><span class="lesson-modal-shade" aria-hidden="true"></span></div><div class="modal-inner">
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


  function initSwipeNavigation() {
    const el=document.getElementById('view');
    el.addEventListener('touchstart',e=>{const t=e.changedTouches[0];const target=e.target;if(target.closest('input,textarea,select,button,dialog,.no-swipe')){swipeStart=null;return;}swipeStart={x:t.clientX,y:t.clientY,time:Date.now()};},{passive:true});
    el.addEventListener('touchend',e=>{if(!swipeStart)return;const t=e.changedTouches[0];const dx=t.clientX-swipeStart.x,dy=t.clientY-swipeStart.y,dt=Date.now()-swipeStart.time;swipeStart=null;if(dt>900||Math.abs(dx)<58||Math.abs(dy)>Math.abs(dx)*.72)return;const ids=navItems.map(x=>x[0]);const i=ids.indexOf(currentView);const next=dx<0?Math.min(ids.length-1,i+1):Math.max(0,i-1);if(next!==i)navigate(ids[next]);},{passive:true});
  }

  document.getElementById('menuBtn').onclick=()=>document.querySelector('.sidebar').classList.toggle('open');
  document.getElementById('quickMissionBtn').onclick=()=>navigate('missions');
  document.getElementById('modal').addEventListener('click', e=>{if(e.target===e.currentTarget)e.currentTarget.close();});

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
  }

  document.body.dataset.view=currentView;
  applyDisplaySettings();
  initSwipeNavigation();
  renderNav(); updateRankUI(); render();
})();
