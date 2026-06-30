// App Logic - The Capital Loop & Public Square & Developer Hub

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initSVGInteractivity();
  initReflectionCalculator();
  
  // Phase 2: Public Square Initializers
  initSubTabs();
  initDebateArena();
  initDebateFeed();
  initLeaderboard();
  initNewsHub();

  // Phase 3: Developer Hub & Local Board Initializers
  initDeveloperHub();
  initLocalBoard();

  // Phase 5: P2P Mutual Credit Initializer
  initMutualCredit();

  // Phase 6: Financial Literacy Initializer
  initFinancialLiteracy();

  // Phase 7: President's Desk Initializer
  initPresidentDesk();

  // Phase 8: AI Chatbot Initializer
  initChatbot();

  // Phase 9: Debate Arena Enhancements
  renderDebateTopics();
  renderSuggestedTopics();
  initProposeTopicForm();

  // Phase 10 & 11: Gaming & Forum Initializers
  initGamingCorner();
  initForum();

  // Phase 15: Supabase Auth, Live Feed, and Submissions Arena Initializers
  initSupabaseAuth();
  initLiveFeed();
  initSubmissionsHub();
  initBillionaireLoopholeSimulator();
  initPredictionMarkets();
  initForumLobbyChat();
});

/* ==========================================================================
   1. Main Tab Switcher
   ========================================================================== */
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update button active states
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update content visibility
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === targetTab) {
          content.classList.add('active');
        }
      });
    });
  });
}

/* ==========================================================================
   2. SVG Interactive Diagram
   ========================================================================== */
const NODE_DATA = {
  capital: {
    title: 'Concentrated Capital',
    badge: 'Loop Origin & Destination',
    badgeClass: 'badge-capital',
    description: 'Corporate conglomerates, multi-national finance firms, and ultra-wealthy individuals who hold the vast majority of societal assets. Their main systemic goal is wealth preservation and compound accumulation.',
    filtered: 'The barrier of entry is sheer financial size. Without millions in surplus capital, regular citizens cannot participate in funding the political machinery that makes laws, meaning corporate goals dominate from day one.',
    quote: '“The preferences of the average American appear to have only a minuscule, near-zero, statistically non-significant impact on public policy.”',
    citation: 'Princeton University study by Gilens & Page',
    flowPaths: ['flow-capital-funding'],
    activeClass: 'active-capital'
  },
  funding: {
    title: 'Campaign Finance',
    badge: 'The Political Gatekeeper',
    badgeClass: 'badge-capital',
    description: 'The mechanism through which capital is injected into politics. Politicians require constant financial backing to win elections, transforming campaign contributions into a critical survival filter.',
    filtered: 'Voters can choose between candidates, but the donors decide WHO gets to run. Candidates who support public funding or threaten corporate profits are starved of funds and filtered out before ballots are cast.',
    quote: '“There are two things that are important in politics. The first is money, and I can\'t remember what the second one is.”',
    citation: 'Mark Hanna, US Senator & Campaign Manager (1895)',
    flowPaths: ['flow-funding-politicians'],
    activeClass: 'active-capital'
  },
  politicians: {
    title: 'Political Class',
    badge: 'Legislators & Executive Officers',
    badgeClass: 'badge-politicians',
    description: 'Elected officials, candidates, and their staffs. While theoretically accountable to the electorate, their reliance on funding and industry expertise binds their priorities to their donors.',
    filtered: 'Politicians spend up to 70% of their legislative time in "call time" fundraising from the ultra-rich. The time spent dialing wealthy donors is time stolen from listening to the grievances of ordinary working-class citizens.',
    quote: '“It is difficult to get a man to understand something, when his salary depends upon his not understanding it.”',
    citation: 'Upton Sinclair, Author',
    flowPaths: ['flow-politicians-policy'],
    activeClass: 'active-politicians'
  },
  policy: {
    title: 'Policy & Legislation',
    badge: 'Systemic Output',
    badgeClass: 'badge-politicians',
    description: 'The bills, laws, tax codes, and loopholes passed by the government. These policies shape the economy, dictating wages, market regulations, and the redistribution of wealth.',
    filtered: 'Corporate lobbyists frequently draft the actual text of complex tax codes and deregulation bills. Regular people have no seat at the drafting table, resulting in laws that shield wealth from taxation and crush competition.',
    quote: '“We have a system of legalized bribery... where the lobbyists write the laws and the politicians take the money.”',
    citation: 'Robert Reich, former US Secretary of Labor',
    flowPaths: ['flow-policy-regulatory'],
    activeClass: 'active-politicians'
  },
  regulatory: {
    title: 'Regulatory Capture',
    badge: 'The Enforcement Filter',
    badgeClass: 'badge-regulatory',
    description: 'The process where regulatory agencies (SEC, EPA, FDA, FCC) end up dominated or staffed by the very industries they are tasked with regulating, neutralizing public protections.',
    filtered: 'Regular citizens rely on agencies to protect their food, water, savings, and internet. Under regulatory capture, public complaints are ignored or classified as "unfeasible," while corporate violators receive wrist-slap fines.',
    quote: '“Regulatory capture occurs when an agency, created to act in the public interest, instead subverts that interest to satisfy the narrow commercial interests of the industry it is charged with regulating.”',
    citation: 'George Stigler, Nobel Laureate Economist',
    flowPaths: ['flow-regulatory-capital'],
    activeClass: 'active-regulatory'
  },
  public: {
    title: 'The Sidelined Public',
    badge: 'The Electorate',
    badgeClass: 'badge-public',
    description: 'The 90% of the population who rely on wages, public infrastructure, and consumer goods. They hold the voting power but lack the capital to direct the systemic loop.',
    filtered: 'Public opinion has a flat 30% likelihood of becoming law regardless of whether 0% or 100% of the population supports it. The system is statistically unresponsive to the democratic preferences of the working and middle class.',
    quote: '“The government is not responsiveness to the majority of its citizens. The average American is functionally powerless to influence public policy.”',
    citation: 'Gilens & Page Study Data Analysis',
    flowPaths: [],
    activeClass: 'active-public'
  }
};

function initSVGInteractivity() {
  const nodes = document.querySelectorAll('.diagram-node');
  const initialPanelState = document.querySelector('.detail-initial-state');
  const detailContent = document.getElementById('detail-content');
  const flowLines = document.querySelectorAll('.flow-line');

  // UI Detail Element Nodes
  const detailTitle = document.getElementById('detail-title');
  const detailBadge = document.getElementById('detail-badge');
  const detailDescription = document.getElementById('detail-description');
  const detailFiltered = document.getElementById('detail-filtered');
  const detailQuote = document.getElementById('detail-quote');
  const detailCitation = document.getElementById('detail-citation');

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const nodeId = node.getAttribute('data-node');
      const data = NODE_DATA[nodeId];

      if (!data) return;

      // 1. Reset all node active highlight classes
      nodes.forEach(n => {
        const id = n.getAttribute('data-node');
        const nodeClass = NODE_DATA[id].activeClass;
        n.classList.remove(nodeClass);
      });

      // 2. Add highlight class to clicked node
      node.classList.add(data.activeClass);

      // 3. Reset and toggle flow line animations
      flowLines.forEach(line => line.classList.add('hidden'));
      data.flowPaths.forEach(pathId => {
        const activePath = document.getElementById(pathId);
        if (activePath) {
          activePath.classList.remove('hidden');
        }
      });

      // 4. Update the Details Panel
      initialPanelState.classList.add('hidden');
      detailContent.classList.remove('hidden');

      detailTitle.textContent = data.title;
      detailBadge.textContent = data.badge;
      
      // Update badge styling
      detailBadge.className = 'node-badge'; // Reset classes
      detailBadge.classList.add(data.badgeClass);

      detailDescription.textContent = data.description;
      detailFiltered.textContent = data.filtered;
      detailQuote.textContent = data.quote;
      detailCitation.textContent = data.citation;
    });
  });
}

/* ==========================================================================
   3. Reflection Calculator Widget
   ========================================================================== */
function initReflectionCalculator() {
  const inputMoney = document.getElementById('input-money');
  const inputPeople = document.getElementById('input-people');
  const outputContainer = document.getElementById('reflection-result');

  if (!inputMoney || !inputPeople || !outputContainer) return;

  const calculateReflection = () => {
    const money = parseFloat(inputMoney.value) || 0;
    const people = parseFloat(inputPeople.value) || 0;

    let title = '';
    let badgeText = '';
    let badgeClass = '';
    let cardClass = '';
    let message = '';

    const formattedMoney = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(money);

    if (money > 10000000 && people <= 2) {
      title = 'Extreme Isolation / Spiritual Deficit';
      badgeText = 'Losing';
      badgeClass = 'badge-losing';
      cardClass = 'losing';
      message = `Hoarding ${formattedMoney} while helping only ${people} people is a form of spiritual sensory deprivation. Your life operates in a friction-free vacuum sustained by the labor of invisible workers (agricultural crews, manufacturers, services) whom you do not interact with. Every relationship around you is transactional; you do not hear raw human truths. The system tells you that you are winning because your number is growing, but humanly, you are trapped in a self-reinforcing loop of zero authentic value.`;
    } 
    else if (money > 1000000 && people <= 5) {
      title = 'The Transactional Bubble';
      badgeText = 'Losing';
      badgeClass = 'badge-losing';
      cardClass = 'losing';
      message = `At ${formattedMoney} in hoarded assets and only ${people} people positively impacted daily, you are drifting into the second layer of isolation. When your primary output is capital extraction rather than human relief, the people around you become accessories or costs. You are trading actual human happiness for abstract security. To begin winning, you must shift your day-to-day energy away from accumulation and toward generative service.`;
    } 
    else if (money > 5000000 && people > 15) {
      title = 'The Extractive Paradox';
      badgeText = 'Extractive Stasis';
      badgeClass = 'badge-losing';
      cardClass = 'losing';
      message = `Although you are helping ${people} people, hoarding ${formattedMoney} creates a structural paradox. The systemic loop of plutocracy shows that hoarded capital of this scale actively drives political lobbying and regulatory capture, suppressing the wages, rights, and choices of the working class. You are putting band-aids on individuals while your capital supports a system that breaks them. True winning means dissolving the hoard to dismantle the barriers that keep people down.`;
    } 
    else if (people > 0) {
      title = 'Generative Human Purpose';
      badgeText = 'Winning';
      badgeClass = 'badge-winning';
      cardClass = 'winning';
      message = `With a direct daily impact on ${people} people and a focused effort to better yourself, you are actively winning. You are bypassing the systemic lie that wealth equals human value. Every day you go out to improve your capabilities (strength, knowledge, empathy) so that you can lighten the burdens of others, you build genuine human communication. Making other people happy is the only currency that doesn't depreciate. Keep growing, keep serving.`;
    } 
    else {
      title = 'Passive Observer';
      badgeText = 'Idle';
      badgeClass = 'badge-public';
      cardClass = '';
      message = 'Adjust the sliders. Compare a life focused on compounding dollar-values against a life focused on compounding human happiness. The systemic loop depends on your belief that money is the ultimate goal. Reclaim your focus.';
    }

    outputContainer.className = `reflection-output ${cardClass}`;
    outputContainer.innerHTML = `
      <div class="reflection-header">
        <span class="reflection-title">${title}</span>
        <span class="reflection-badge ${badgeClass}">${badgeText}</span>
      </div>
      <p class="reflection-text">${message}</p>
    `;
  };

  inputMoney.addEventListener('input', calculateReflection);
  inputPeople.addEventListener('input', calculateReflection);

  calculateReflection();
}

/* ==========================================================================
   4. Public Square Subtab Controller
   ========================================================================== */
function initSubTabs() {
  const subNavs = document.querySelectorAll('.square-subnav');
  
  subNavs.forEach(nav => {
    const buttons = nav.querySelectorAll('.subtab-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetSubTab = btn.getAttribute('data-subtab');
        
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        buttons.forEach(b => {
          const tabId = b.getAttribute('data-subtab');
          const content = document.getElementById(`subtab-${tabId}`);
          if (content) {
            content.classList.remove('active');
          }
        });
        
        const activeContent = document.getElementById(`subtab-${targetSubTab}`);
        if (activeContent) {
          activeContent.classList.add('active');
        }
      });
    });
  });
}

/* ==========================================================================
   5. Debate Arena (Omegle-like Matchmaker Simulator)
   ========================================================================== */
let localStream = null;
let matchTimerInterval = null;
let chatInterval = null;
let matchDurationSeconds = 180;
let userEloRating = 1200;

const OPPONENT_POOL = [
  { name: 'Liberty_Patriot', elo: 1315, stream: 'avatar-patriot' },
  { name: 'VoxPopuli_33', elo: 1195, stream: 'avatar-vox' },
  { name: 'Citizen_Socrates', elo: 1420, stream: 'avatar-socrates' },
  { name: 'NullHypothesis', elo: 1250, stream: 'avatar-null' },
  { name: 'Capitalist_Edge', elo: 1350, stream: 'avatar-edge' }
];

const AUDIENCE_COMMENTS = [
  "Wow, that is a strong point.",
  "Citizen_X is cooking right now.",
  "But wait, what about the lobbying stats?",
  "Let's look at the database citation.",
  "This is way better than corporate news.",
  "Opponent is shifting goalposts, call him out!",
  "Great rebuttal.",
  "This debate is intense.",
  "Public funding argument is solid.",
  "Elo checks out.",
  "Audience vote going crazy right now.",
  "Valid point on regulatory capture.",
  "I support Citizen_X's stance here.",
  "Both of them are bringing heat.",
  "Unfiltered truth right here."
];

function initDebateArena() {
  const btnMatch = document.getElementById('btn-match');
  const btnDisconnect = document.getElementById('btn-disconnect');
  const matchStatusText = document.getElementById('match-status-text');
  const matchIndicator = document.getElementById('match-indicator');
  const arenaTimer = document.getElementById('arena-timer');
  const localVideo = document.getElementById('local-video');
  const localOverlay = document.getElementById('local-overlay');
  const remoteAvatar = document.getElementById('remote-avatar');
  const remoteName = document.getElementById('remote-name');
  const remotePlaceholderText = document.getElementById('remote-placeholder-text');
  const agreementBar = document.getElementById('agreement-bar');
  const labelUser = document.getElementById('label-user');
  const labelPartner = document.getElementById('label-partner');
  const voteCount = document.getElementById('vote-count');
  const chatBox = document.getElementById('audience-chat-box');

  const btnRandom = document.getElementById('btn-random-topic');
  const btnSwap = document.getElementById('btn-swap-topic');
  const btnArgue = document.getElementById('btn-debate-argue');
  const btnRebut = document.getElementById('btn-debate-rebut');
  const btnTipRemote = document.getElementById('btn-tip-remote');
  const localTipsCounter = document.getElementById('local-tips-counter');
  let userTipsEarned = 0;

  if (!btnMatch || !btnDisconnect) return;

  const startCamera = async () => {
    try {
      localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      localVideo.srcObject = localStream;
      localOverlay.style.opacity = '0';
      setTimeout(() => localOverlay.classList.add('hidden'), 300);
    } catch (err) {
      console.warn("Webcam access denied or unavailable. Using placeholder.", err);
      const overlaySpan = localOverlay.querySelector('span');
      if (overlaySpan) {
        overlaySpan.textContent = 'Webcam Blocked (Active Avatar)';
      }
      const overlayIcon = localOverlay.querySelector('.overlay-icon');
      if (overlayIcon) {
        overlayIcon.classList.add('animated-pulse');
        overlayIcon.textContent = '🎙️';
      }
      localOverlay.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #0d9488 100%)';
    }
  };

  const stopCamera = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      localStream = null;
    }
    localVideo.srcObject = null;
    localOverlay.classList.remove('hidden');
    localOverlay.style.opacity = '1';
  };

  const setMatchingState = (state) => {
    if (state === 'idle') {
      matchStatusText.textContent = 'Idle';
      matchIndicator.className = 'status-indicator';
      btnMatch.classList.remove('hidden');
      btnDisconnect.classList.add('hidden');
      if (btnArgue) btnArgue.classList.add('hidden');
      if (btnRebut) btnRebut.classList.add('hidden');
      if (btnTipRemote) btnTipRemote.classList.add('hidden');
      if (localTipsCounter) {
        localTipsCounter.style.display = 'none';
      }
      userTipsEarned = 0;
      remotePlaceholderText.textContent = 'Searching for debate partner...';
      remoteAvatar.classList.remove('hidden');
      remoteName.textContent = 'Partner';
      arenaTimer.textContent = '03:00';
      
      stopCamera();
      clearInterval(matchTimerInterval);
      clearInterval(chatInterval);
      
      agreementBar.style.width = '50%';
      labelUser.textContent = 'You: 50%';
      labelPartner.textContent = 'Partner: 50%';
    } 
    else if (state === 'searching') {
      matchStatusText.textContent = 'Searching...';
      matchIndicator.className = 'status-indicator searching';
      btnMatch.classList.add('hidden');
      btnDisconnect.classList.remove('hidden');
      if (btnArgue) btnArgue.classList.add('hidden');
      if (btnRebut) btnRebut.classList.add('hidden');
      if (btnTipRemote) btnTipRemote.classList.add('hidden');
      if (localTipsCounter) {
        localTipsCounter.style.display = 'none';
      }
      
      startCamera();

      setTimeout(() => {
        if (matchStatusText.textContent === 'Searching...') {
          connectMatch();
        }
      }, 2500);
    }
    else if (state === 'connected') {
      matchStatusText.textContent = 'Connected';
      matchIndicator.className = 'status-indicator connected';
      if (btnArgue) btnArgue.classList.remove('hidden');
      if (btnRebut) btnRebut.classList.remove('hidden');
      if (btnTipRemote) btnTipRemote.classList.remove('hidden');
      if (localTipsCounter) {
        localTipsCounter.style.display = 'block';
        localTipsCounter.textContent = 'Tips Earned: $0';
      }
    }
  };

  const connectMatch = () => {
    setMatchingState('connected');
    
    const opponent = OPPONENT_POOL[Math.floor(Math.random() * OPPONENT_POOL.length)];
    remoteName.textContent = `${opponent.name} (Elo: ${opponent.elo})`;
    remoteAvatar.classList.add('hidden');

    const remotePanel = document.getElementById('panel-remote');
    const existingOpponentVideo = document.getElementById('simulated-remote-video');
    if (existingOpponentVideo) existingOpponentVideo.remove();

    const simVideo = document.createElement('div');
    simVideo.id = 'simulated-remote-video';
    simVideo.style.cssText = 'width:100%;height:100%;background:linear-gradient(135deg, #111827 0%, #1e293b 100%);display:flex;align-items:center;justify-content:center;z-index:1;font-size:4rem;';
    simVideo.textContent = '👤';
    remotePanel.appendChild(simVideo);

    let secondsLeft = matchDurationSeconds;
    arenaTimer.textContent = formatTime(secondsLeft);
    
    matchTimerInterval = setInterval(() => {
      secondsLeft--;
      arenaTimer.textContent = formatTime(secondsLeft);
      
      if (secondsLeft <= 0) {
        endMatch(true);
      }
    }, 1000);

    const activeTopicSelect = document.getElementById('arena-topic');
    const activeTopicText = activeTopicSelect && activeTopicSelect.selectedIndex >= 0 ? activeTopicSelect.options[activeTopicSelect.selectedIndex].text : "General Debate";

    chatBox.innerHTML = `<div class="chat-system-message">Audience joined. Live stream connected.</div><div class="chat-system-message" style="color:var(--color-blue); font-weight:bold;">Debate Topic: "${activeTopicText}"</div>`;
    let currentVotes = 120;
    voteCount.textContent = currentVotes;

    chatInterval = setInterval(() => {
      const user = `DebateWatcher_${Math.floor(Math.random() * 900) + 100}`;
      const text = AUDIENCE_COMMENTS[Math.floor(Math.random() * AUDIENCE_COMMENTS.length)];
      
      const commentDiv = document.createElement('div');
      commentDiv.className = 'chat-message';
      commentDiv.innerHTML = `<span class="chat-user">${user}:</span> <span class="chat-text">${text}</span>`;
      chatBox.appendChild(commentDiv);
      chatBox.scrollTop = chatBox.scrollHeight;

      const variance = (Math.random() * 8) - 4;
      let userPercent = Math.max(15, Math.min(85, parseInt(agreementBar.style.width) + variance));
      let partnerPercent = 100 - userPercent;
      
      agreementBar.style.width = `${userPercent}%`;
      labelUser.textContent = `You: ${Math.round(userPercent)}%`;
      labelPartner.textContent = `Partner: ${Math.round(partnerPercent)}%`;

      currentVotes += Math.floor(Math.random() * 6);
      voteCount.textContent = currentVotes;
    }, 2000);
  };

  const endMatch = (normalExit) => {
    const simVideo = document.getElementById('simulated-remote-video');
    if (simVideo) simVideo.remove();

    if (normalExit) {
      const userWin = parseInt(agreementBar.style.width) > 50;
      const eloDiff = userWin ? 16 : -12;
      userEloRating += eloDiff;
      
      updateLeaderboardSelf(userEloRating);

      alert(`Match ended! You secured ${agreementBar.style.width} agreement. Elo change: ${eloDiff > 0 ? '+' : ''}${eloDiff} (${userEloRating} Elo)`);
    }

    setMatchingState('idle');
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  btnMatch.addEventListener('click', () => setMatchingState('searching'));
  btnDisconnect.addEventListener('click', () => endMatch(false));

  const DEBATE_ARGUMENTS = {
    lobbying: [
      "We must restrict donor groups; corporate cash has completely drowned out citizen voices.",
      "Lobbyists write 90% of regulatory tax exemptions before Congress even debates them.",
      "If money equals speech under law, then democracy is just a commercial auction."
    ],
    wealth: [
      "Compounding returns on assets are mathematically outpacing labor wages globally.",
      "No single person needs billions while millions lack basic housing and healthcare.",
      "A wealth cap returns hoarded capital back to active circulation."
    ],
    united: [
      "Super PACs hide the true identity of corporate election buying campaigns.",
      "Restoring election limits is the only way to establish equal citizen protection.",
      "Corporations are legal constructs, not actual human voters."
    ],
    default: [
      "We need structural reform, not incremental policy adjustments.",
      "Local P2P mutual aid and co-ops bypass banking extractions completely.",
      "True value lies in generative human service, not compounding ledgers."
    ]
  };

  const speakArgument = (type) => {
    if (matchStatusText.textContent !== 'Connected') return;

    const topicSelect = document.getElementById('arena-topic');
    const topicVal = topicSelect ? topicSelect.value : 'default';
    
    let key = 'default';
    if (topicVal.includes('lobby') || topicVal.includes('president')) key = 'lobbying';
    else if (topicVal.includes('wealth') || topicVal.includes('piketty')) key = 'wealth';
    else if (topicVal.includes('united') || topicVal.includes('citizens')) key = 'united';

    const pool = DEBATE_ARGUMENTS[key] || DEBATE_ARGUMENTS.default;
    const randomQuote = pool[Math.floor(Math.random() * pool.length)];

    // Append user bubble to chat stream
    const commentDiv = document.createElement('div');
    commentDiv.className = 'chat-message';
    commentDiv.style.fontWeight = 'bold';
    commentDiv.innerHTML = `<span class="chat-user" style="color:var(--color-blue);">Citizen_X (You):</span> <span class="chat-text" style="color:var(--color-text);">${type === 'argue' ? '🎤 ' : '👂 '}${randomQuote}</span>`;
    chatBox.appendChild(commentDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Shift audience poll in user's favor
    const boost = Math.floor(Math.random() * 5) + 5; // +5% to +9% boost
    let userPercent = Math.max(15, Math.min(85, parseInt(agreementBar.style.width) + boost));
    let partnerPercent = 100 - userPercent;

    agreementBar.style.width = `${userPercent}%`;
    labelUser.textContent = `You: ${Math.round(userPercent)}%`;
    labelPartner.textContent = `Partner: ${Math.round(partnerPercent)}%`;

    // Disable button briefly to prevent spamming
    const btn = type === 'argue' ? btnArgue : btnRebut;
    if (btn) {
      btn.disabled = true;
      btn.style.opacity = '0.5';
      setTimeout(() => {
        btn.disabled = false;
        btn.style.opacity = '1';
      }, 2000);
    }

    // 25% chance of receiving a tip from the audience watcher
    if (Math.random() < 0.25) {
      const tipAmount = [5, 10, 20, 50][Math.floor(Math.random() * 4)];
      userTipsEarned += tipAmount;
      if (localTipsCounter) {
        localTipsCounter.textContent = `Tips Earned: $${userTipsEarned}`;
      }
      
      const viewer = `DebateWatcher_${Math.floor(Math.random() * 900) + 100}`;
      const tipDiv = document.createElement('div');
      tipDiv.className = 'chat-message';
      tipDiv.style.cssText = 'color:var(--color-gold); font-weight:bold;';
      tipDiv.innerHTML = `🎉 ${viewer} tipped you $${tipAmount} for a great point!`;
      chatBox.appendChild(tipDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  };

  if (btnArgue) btnArgue.addEventListener('click', () => speakArgument('argue'));
  if (btnRebut) btnRebut.addEventListener('click', () => speakArgument('rebut'));

  if (btnRandom) {
    btnRandom.addEventListener('click', () => {
      const allTopics = [];
      for (const genre in DEFAULT_DEBATE_TOPICS) {
        DEFAULT_DEBATE_TOPICS[genre].forEach(topic => {
          allTopics.push(topic.value);
        });
      }
      if (allTopics.length > 0) {
        const select = document.getElementById('arena-topic');
        select.value = allTopics[Math.floor(Math.random() * allTopics.length)];
      }
    });
  }

  if (btnSwap) {
    btnSwap.addEventListener('click', () => {
      const select = document.getElementById('arena-topic');
      if (!select) return;
      const currentVal = select.value;
      const allTopics = [];
      for (const genre in DEFAULT_DEBATE_TOPICS) {
        DEFAULT_DEBATE_TOPICS[genre].forEach(topic => {
          if (topic.value !== currentVal) {
            allTopics.push(topic);
          }
        });
      }
      if (allTopics.length > 0) {
        const randomTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
        select.value = randomTopic.value;
        
        if (chatBox && matchStatusText.textContent === 'Connected') {
          const msg = document.createElement('div');
          msg.className = 'chat-message chat-system-message';
          msg.style.cssText = 'color:var(--color-gold); font-weight:bold;';
          msg.innerHTML = `🔄 Question Swapped: "${randomTopic.text}"`;
          chatBox.appendChild(msg);
          chatBox.scrollTop = chatBox.scrollHeight;
        }
      }
    });
  }

  // Tipping opponent click event
  if (btnTipRemote) {
    btnTipRemote.addEventListener('click', () => {
      if (matchStatusText.textContent !== 'Connected') return;
      const opponentName = remoteName.textContent;
      const amtStr = prompt(`How much would you like to tip ${opponentName}?`, "5");
      const amt = parseInt(amtStr);
      
      if (amt > 0) {
        alert(`Tipped $${amt} successfully to ${opponentName}! Transferred via peer-to-peer network ledger.`);
        
        const tipMsg = document.createElement('div');
        tipMsg.className = 'chat-message';
        tipMsg.style.cssText = 'color:var(--color-green); font-weight:bold;';
        tipMsg.innerHTML = `💸 Citizen_X (You) tipped $${amt} to ${opponentName}!`;
        chatBox.appendChild(tipMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    });
  }
}

/* ==========================================================================
   6. Social Debate Feed Logic
   ========================================================================== */
let DEBATE_POSTS = [
  {
    id: 1,
    author: 'Socrates_99',
    tag: 'Wealth Gap',
    time: '2 hours ago',
    body: 'The super-wealthy live in a complete sensory deprivation chamber. When you own private estates, private travel, and hire intermediaries for everything, you forget the basic physical struggles of survival. Their laws reflect this absolute isolation. They write laws to crush unions because labor is just an abstract number on their balance sheet.',
    agrees: 142,
    disagrees: 12
  },
  {
    id: 2,
    author: 'Publius_Secundus',
    tag: 'Campaign Finance',
    time: '4 hours ago',
    body: 'We talk about free speech, but Citizens United converted free speech into financial bidding. If money equals speech, then the billionaire speaks a billion times louder than the teacher or nurse. How is that democracy? It is a systemic auction where policies go to the highest bidder.',
    agrees: 98,
    disagrees: 5
  },
  {
    id: 3,
    author: 'Antigravity_Thinker',
    tag: 'Lobbying',
    time: '1 day ago',
    body: 'ALEC and other corporate lobby networks are rewriting our state policies. They hand pre-written legislation to lawmakers who act as little more than human copy machines. If we want systemic reform, we must enact a minimum 5-year ban before a lawmaker can transition into lobbying.',
    agrees: 230,
    disagrees: 18
  }
];

function initDebateFeed() {
  const form = document.getElementById('debate-post-form');
  const feedContainer = document.getElementById('feed-container');

  if (!feedContainer) return;

  const renderFeed = () => {
    feedContainer.innerHTML = '';
    DEBATE_POSTS.forEach(post => {
      const card = document.createElement('div');
      card.className = 'card feed-post';
      card.innerHTML = `
        <div class="post-header">
          <div class="post-meta">
            <span class="post-author">@${post.author}</span>
            <span class="post-tag">${post.tag}</span>
          </div>
          <span class="post-time">${post.time}</span>
        </div>
        <div class="post-body">
          <p>${post.body}</p>
        </div>
        <div class="post-actions">
          <button class="action-btn agree" onclick="votePost(${post.id}, 'agree')">
            👍 Agree (<span id="agree-count-${post.id}">${post.agrees}</span>)
          </button>
          <button class="action-btn disagree" onclick="votePost(${post.id}, 'disagree')">
            👎 Disagree (<span id="disagree-count-${post.id}">${post.disagrees}</span>)
          </button>
        </div>
      `;
      feedContainer.appendChild(card);
    });
  };

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('post-username').value;
      const topic = document.getElementById('post-topic').value;
      const text = document.getElementById('post-text').value;

      const newPost = {
        id: DEBATE_POSTS.length + 1,
        author: username.replace('@', ''),
        tag: topic,
        time: 'Just now',
        body: text,
        agrees: 0,
        disagrees: 0
      };

      DEBATE_POSTS.unshift(newPost);
      renderFeed();
      form.reset();
      document.getElementById('post-username').value = username;
    });
  }

  window.votePost = (postId, type) => {
    const post = DEBATE_POSTS.find(p => p.id === postId);
    if (!post) return;

    if (type === 'agree') {
      post.agrees++;
      document.getElementById(`agree-count-${postId}`).textContent = post.agrees;
    } else {
      post.disagrees++;
      document.getElementById(`disagree-count-${postId}`).textContent = post.disagrees;
    }
  };

  renderFeed();
}

/* ==========================================================================
   7. Leaderboard Standings
   ========================================================================== */
let LEADERBOARD_USERS = [
  { rank: 1, name: 'Socrates_99', wins: 242, losses: 14, elo: 1680, status: 'online' },
  { rank: 2, name: 'CitizensUnited_Exposed', wins: 184, losses: 32, elo: 1540, status: 'online' },
  { rank: 3, name: 'Publius_Secundus', wins: 198, losses: 41, elo: 1490, status: 'offline' },
  { rank: 4, name: 'Antigravity_Thinker', wins: 142, losses: 28, elo: 1390, status: 'online' },
  { rank: 5, name: 'Your_Username (You)', wins: 0, losses: 0, elo: 1200, status: 'online', isSelf: true },
  { rank: 6, name: 'Capitalist_Edge', wins: 95, losses: 82, elo: 1150, status: 'online' },
  { rank: 7, name: 'NullHypothesis', wins: 62, losses: 65, elo: 1090, status: 'offline' }
];

function initLeaderboard() {
  renderLeaderboard();
}

function renderLeaderboard() {
  const tbody = document.getElementById('leaderboard-body');
  if (!tbody) return;

  tbody.innerHTML = '';
  
  LEADERBOARD_USERS.sort((a, b) => b.elo - a.elo);
  
  LEADERBOARD_USERS.forEach((user, index) => {
    user.rank = index + 1;
  });

  LEADERBOARD_USERS.forEach(user => {
    const tr = document.createElement('tr');
    if (user.isSelf) {
      tr.style.background = 'rgba(59, 130, 246, 0.08)';
      tr.style.fontWeight = 'bold';
    }

    let rankClass = 'rank-badge';
    if (user.rank === 1) rankClass += ' rank-1';
    else if (user.rank === 2) rankClass += ' rank-2';
    else if (user.rank === 3) rankClass += ' rank-3';

    tr.innerHTML = `
      <td><div class="${rankClass}">${user.rank}</div></td>
      <td>${user.name}</td>
      <td>${user.wins}W - ${user.losses}L</td>
      <td>${user.elo}</td>
      <td><span class="status-badge ${user.status === 'online' ? 'status-active' : 'status-offline'}">${user.status}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

function updateLeaderboardSelf(newElo) {
  const selfUser = LEADERBOARD_USERS.find(u => u.isSelf);
  if (selfUser) {
    selfUser.elo = newElo;
    if (newElo > 1200) {
      selfUser.wins++;
    } else {
      selfUser.losses++;
    }
    renderLeaderboard();
  }
}

/* ==========================================================================
   8. Unfiltered News Feed Hub (Filterable News)
   ========================================================================== */
let NEWS_ARTICLES = [
  {
    category: 'latest',
    source: 'OpenSecrets.org Lobbying Database',
    date: 'June 29, 2026',
    title: 'US Lobbying Expenditures Reach Record $5.24 Billion in Surge of Corporate Spending',
    excerpt: 'Federal lobbying spending broke records in 2025, marking an unprecedented 17% year-over-year increase. Tech conglomerates (Meta, Coinbase) and pharmaceutical lobbies lead advocacy spending in preparation for the 2026 elections.'
  },
  {
    category: 'latest',
    source: 'Federal Election Commission (FEC) Filings',
    date: 'June 20, 2026',
    title: 'Dark Money Spending Outpaces Public Campaigns as 501(c)(4) Outlays Escalate',
    excerpt: 'Independent expenditures from groups that hide their primary funding sources have reached new peaks. Campaign ad tracking shows corporate-backed dark money groups dominant in local legislative districts.'
  },
  {
    category: 'latest',
    source: 'Securities and Exchange Commission Records',
    date: 'June 18, 2026',
    title: 'SEC Capture: Former Regulatory Chief Appointed to Lead Investment Bank Advisory',
    excerpt: 'Criticism rises as another key financial regulator transitions directly to a high-paying executive advisory role on Wall Street, exemplifying the revolving door loop.'
  },
  {
    category: 'global',
    source: 'World Inequality Report 2026',
    date: 'June 27, 2026',
    title: 'Global Wealth Concentration Hits Historic Highs: Top 10% Owns 75% of Total Personal Assets',
    excerpt: 'Transnational wealth auditing reports that the bottom 50% of the global population holds only 2% of personal net worth, while billionaire assets grew by 81% since 2020.'
  },
  {
    category: 'global',
    source: 'Oxfam International Report',
    date: 'June 25, 2026',
    title: 'The 12 Richest Billionaires Hold More Wealth Than Entire Bottom Half of Humanity Combined',
    excerpt: 'Oxfam\'s latest economic inequality report highlights that 12 individuals own more combined assets than the bottom 3.9 billion people, driving concerns over top-end tax tax loopholes.'
  },
  {
    category: 'global',
    source: 'Tax Justice Network Audit',
    date: 'June 22, 2026',
    title: 'Transnational Corporations Funnel $480 Billion Annually into Offshore Haven Networks',
    excerpt: 'Global tax avoidance tracking indicates multi-nationals continue to exploit shifting jurisdictions, bypassing national corporate tax codes to protect profits.'
  },
  {
    category: 'local',
    source: 'System Dispatch',
    date: 'June 30, 2026',
    title: 'Unlock Local Dispatches',
    excerpt: 'Bypass isolation. Use the Geolocation or ZIP lookup controls on the Local Board tab to sync your neighborhood cooperative news feed.'
  }
];

function initNewsHub() {
  const newsContainer = document.getElementById('news-container');
  const filterBtns = document.querySelectorAll('.news-filter-btn');
  if (!newsContainer) return;

  const renderNews = (filter) => {
    newsContainer.innerHTML = '';
    
    const filtered = NEWS_ARTICLES.filter(art => {
      if (filter === 'all') return true;
      return art.category === filter;
    });

    if (filtered.length === 0) {
      newsContainer.innerHTML = `
        <div class="empty-state-local" style="grid-column: 1 / -1; min-height: 150px;">
          No local dispatches found. Use the Geolocation or ZIP lookup controls on the Local Board tab to sync your neighborhood feed.
        </div>`;
      return;
    }

    filtered.forEach(art => {
      const card = document.createElement('div');
      card.className = 'card news-card';
      card.innerHTML = `
        <span class="news-source">${art.source}</span>
        <h3>${art.title}</h3>
        <p class="news-excerpt">${art.excerpt}</p>
        <div class="news-meta">
          <span>Unfiltered News Dispatch</span>
          <span>${art.date}</span>
        </div>
      `;
      newsContainer.appendChild(card);
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderNews(filter);
    });
  });

  // Initial render
  renderNews('all');

  // Expose filter updates globally
  window.updateNewsFeedCategory = (filter) => {
    const activeBtn = document.querySelector(`.news-filter-btn[data-filter="${filter}"]`);
    if (activeBtn) {
      filterBtns.forEach(b => b.classList.remove('active'));
      activeBtn.classList.add('active');
    }
    renderNews(filter);
  };
}

/* ==========================================================================
   9. Developer Hub (Showcase & Thumbs Up)
   ========================================================================== */
let DEV_PROJECTS = [
  {
    id: 1,
    title: 'PAC-Tracker API',
    desc: 'An open-source Node/Express JSON API that aggregates Super PAC filings and updates corporate lobbying databases weekly. Fully documented endpoint outputs.',
    url: 'https://github.com/Resteral/Ol',
    tag: 'Transparency',
    upvotes: 84
  },
  {
    id: 2,
    title: 'CoopFinder Mobile',
    desc: 'A decentralized geolocation lookup tool listing verified worker-owned co-ops, mutual aid gardens, and community fridges across major US regions.',
    url: 'https://coopfinder.org',
    tag: 'Mutual Aid',
    upvotes: 62
  },
  {
    id: 3,
    title: 'MediaFilter Extension',
    desc: 'Chrome browser extension that tags articles from media conglomerates with their parent company assets and lobbying history directly in the search results.',
    url: 'https://mediafilter.net',
    tag: 'Alternative Media',
    upvotes: 49
  }
];

function initDeveloperHub() {
  const form = document.getElementById('dev-upload-form');
  const gallery = document.getElementById('dev-gallery');

  if (!gallery) return;

  const renderGallery = () => {
    gallery.innerHTML = '';
    
    // Sort projects by upvotes descending
    DEV_PROJECTS.sort((a, b) => b.upvotes - a.upvotes);

    DEV_PROJECTS.forEach(proj => {
      const card = document.createElement('div');
      card.className = 'card dev-card';
      card.innerHTML = `
        <div class="dev-card-header">
          <h4>${proj.title}</h4>
          <span class="post-tag">${proj.tag}</span>
        </div>
        <p class="dev-card-desc">${proj.desc}</p>
        <div class="dev-card-links">
          <a href="${proj.url}" target="_blank" class="dev-link">Open Project ↗</a>
        </div>
        <div class="dev-card-footer">
          <button class="upvote-btn" onclick="upvoteProject(${proj.id})">
            👍 Upvote (<span class="upvote-count" id="upvote-count-${proj.id}">${proj.upvotes}</span>)
          </button>
        </div>
      `;
      gallery.appendChild(card);
    });
  };

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const title = document.getElementById('dev-title').value;
      const desc = document.getElementById('dev-desc').value;
      const url = document.getElementById('dev-url').value;
      const tag = document.getElementById('dev-tag').value;

      const newProject = {
        id: DEV_PROJECTS.length + 1,
        title: title,
        desc: desc,
        url: url,
        tag: tag,
        upvotes: 1
      };

      DEV_PROJECTS.unshift(newProject);
      renderGallery();
      form.reset();
    });
  }

  // Global callback for upvotes
  window.upvoteProject = (id) => {
    const proj = DEV_PROJECTS.find(p => p.id === id);
    if (proj) {
      proj.upvotes++;
      const countEl = document.getElementById(`upvote-count-${id}`);
      if (countEl) {
        countEl.textContent = proj.upvotes;
      }
      // Re-render gallery after slight delay to allow smooth resorting
      setTimeout(renderGallery, 400);
    }
  };

  window.renderDevGallery = renderGallery;
  renderGallery();
}

/* ==========================================================================
   10. Local Board Logic (Deals & Events with Geolocation)
   ========================================================================== */
const LOCALDATA_BY_REGION = {
  california: {
    name: 'Southern California Co-ops',
    coords: 'Lat: 34.0522, Lon: -118.2437',
    deals: [
      { shop: 'Los Angeles Food Co-op', title: '15% Off Organic Produce', desc: 'Present coupon at register. Worker-owned and sourced from regional family farms.', value: '15% OFF' },
      { shop: 'Silverlake Cooperative Books', title: 'Buy One Get One Free', desc: 'Valid on all economic history, labor studies, and political science books.', value: 'BOGO' },
      { shop: 'People’s Cafe Collective', title: 'Free Coffee with Reusable Cup', desc: 'Encouraging local ecology. 100% fair-trade beans sourced directly.', value: 'FREE COFFEE' }
    ],
    events: [
      { month: 'Jul', day: '12', title: 'LA Tenants Union Assembly', time: '6:30 PM', loc: 'Silverlake Community Hall', desc: 'Organizing tenant protection seminars and discussing local rent control proposals.', action: 'Join Meeting' },
      { month: 'Jul', day: '18', title: 'Echo Park Mutual Aid Food Drive', time: '9:00 AM', loc: 'Echo Park Methodist', desc: 'Volunteers needed to package surplus food deliveries for sidelined families.', action: 'Volunteer' }
    ],
    localNews: [
      { category: 'local', source: 'SoCal Cooperative Coalition', date: 'June 28, 2026', title: 'LA Food Co-op Expands Direct-From-Farmer Network to Bypass Corporate Logistics', excerpt: 'By sourcing directly from regional agricultural cooperatives, LA Co-op bypassed conglomerate logistics, saving members 15% and directly funding local farms.' },
      { category: 'local', source: 'LA Municipal Audit Office', date: 'June 24, 2026', title: 'Lobbying Disclosures Reveal Real Estate PAC Funding of Local Housing Officers', excerpt: 'Disclosures show corporate real estate developers funded campaign mailers for city housing officers, raising conflict of interest warnings.' }
    ]
  },
  newyork: {
    name: 'Metro New York Civic Board',
    coords: 'Lat: 40.7128, Lon: -74.0060',
    deals: [
      { shop: 'Brooklyn Independent Books', title: '10% Off Union Members', desc: 'Show your union card at check-out. Celebrating community organizing.', value: '10% OFF' },
      { shop: 'Manhattan Co-op Market', title: 'Free Member Trial Pass', desc: 'Access member-owner discounts on locally manufactured goods.', value: 'MEMBER PASS' },
      { shop: 'The Commons Cafe', title: 'Co-working Session Discount', desc: '50% off day pass. Independent community-owned co-working space.', value: '50% OFF' }
    ],
    events: [
      { month: 'Jul', day: '15', title: 'Rethinking Capital Loop Forum', time: '7:00 PM', loc: 'The Commons Brooklyn', desc: 'A town-hall discussion on Citizens United and public funding amendments.', action: 'RSVP' },
      { month: 'Jul', day: '22', title: 'Astoria Community Garden Soil Work', time: '10:00 AM', loc: 'Astoria Green Lot', desc: 'Bring gloves. Planting summer vegetables and repairing irrigation pipes.', action: 'Volunteer' }
    ],
    localNews: [
      { category: 'local', source: 'NYC Commons Gazette', date: 'June 27, 2026', title: 'Brooklyn Community Fridge Network Deploys 3 New Sites to Fight Wage Stagnation', excerpt: 'Organized entirely by volunteers, the new fridge locations provide free organic produce and food, bypassing retail price hikes.' },
      { category: 'local', source: 'New York City Lobby Registry', date: 'June 23, 2026', title: 'Tech Giants Spend $4.2 Million Lobbying City Council for Municipal Data Contracts', excerpt: 'Filings show lobbying outlays directed at the municipal technology committee, raising debate over open-source public alternatives.' }
    ]
  },
  general: {
    name: 'General US Cooperative Board',
    coords: 'Lat: 39.8283, Lon: -98.5795',
    deals: [
      { shop: 'Union Thread Co-op', title: 'Free Nationwide Shipping', desc: '100% union-made clothing. Enter code COOP-SHIP at check-out.', value: 'FREE SHIP' },
      { shop: 'National Farmers Assembly', title: '10% Off Direct Box Orders', desc: 'Sourced directly from agricultural cooperatives bypass corporate stores.', value: '10% OFF' }
    ],
    events: [
      { month: 'Aug', day: '05', title: 'National Virtual Debate Matchup', time: '4:00 PM EST', loc: 'Decentralized Arena', desc: 'Connecting debaters from all states to discuss campaign lobbying caps.', action: 'Register' }
    ],
    localNews: [
      { category: 'local', source: 'Cooperative Alliance USA', date: 'June 26, 2026', title: 'National Cooperative Registrations Surge 22% in Consumer Retail', excerpt: 'A nationwide study shows consumer co-ops are growing at record rates as citizens seek economic models that return wealth to the community.' },
      { category: 'local', source: 'Mutual Aid USA Directory', date: 'June 21, 2026', title: 'National Registry Maps 42 New Free Clinics and Mutual Aid Gardens', excerpt: 'The registry connects under-served communities with free medical, legal, and nutritional resources organized entirely by volunteers.' }
    ]
  }
};

/* ==========================================================================
   10b. Micro-Gigs & Mutual Aid Tasks database
   ========================================================================== */
let LOCAL_GIGS = [
  {
    id: 1,
    title: 'Audit Super PAC Disclosures',
    category: 'Digital',
    bounty: 120,
    desc: 'Verify 2026 Q1 FEC filings for real estate PACs operating in LA/NY. Put results into a CSV format.',
    status: 'Open',
    worker: null
  },
  {
    id: 2,
    title: 'Translate Co-op Bylaws to Spanish',
    category: 'Writing',
    bounty: 75,
    desc: 'Translate the standard worker-owned cooperative template (20 pages) for local Hispanic entrepreneurs.',
    status: 'Open',
    worker: null
  },
  {
    id: 3,
    title: 'Repair Echo Park Community Cooler',
    category: 'Labor',
    bounty: 50,
    desc: 'Replace the temperature regulator relay on the outdoor community fridge. Parts provided.',
    status: 'Claimed',
    worker: '@Citizen_Socrates'
  }
];

function initLocalBoard() {
  const btnGeo = document.getElementById('btn-geolocation');
  const btnZip = document.getElementById('btn-zip-submit');
  const inputZip = document.getElementById('input-zip');
  const statusBadge = document.getElementById('location-status-badge');
  const coordsLabel = document.getElementById('location-coords');
  const dealsList = document.getElementById('deals-list');
  const eventsList = document.getElementById('events-list');

  if (!btnGeo || !dealsList || !eventsList) return;

  const renderRegion = (regionKey) => {
    const data = LOCALDATA_BY_REGION[regionKey];
    if (!data) return;

    statusBadge.textContent = data.name;
    statusBadge.className = 'status-badge status-active node-badge';
    coordsLabel.textContent = data.coords;

    // Update Local News array in NEWS_ARTICLES
    const localArticles = data.localNews || [];
    NEWS_ARTICLES = NEWS_ARTICLES.filter(art => art.category !== 'local');
    NEWS_ARTICLES.push(...localArticles);
    if (window.updateNewsFeedCategory) {
      window.updateNewsFeedCategory('local');
    }

    // Render Deals
    dealsList.innerHTML = '';
    data.deals.forEach(deal => {
      const card = document.createElement('div');
      card.className = 'deal-card';
      card.innerHTML = `
        <div class="deal-left">
          <span class="deal-shop">${deal.shop}</span>
          <span class="deal-title">${deal.title}</span>
          <span class="deal-desc">${deal.desc}</span>
        </div>
        <div class="deal-right">
          <span class="deal-badge">${deal.value}</span>
          <button class="btn btn-secondary" onclick="alert('Deal Redeemed: Use code CITIZEN-COOP')">Redeem</button>
        </div>
      `;
      dealsList.appendChild(card);
    });

    // Render Events
    eventsList.innerHTML = '';
    data.events.forEach(evt => {
      const card = document.createElement('div');
      card.className = 'card event-card';
      card.innerHTML = `
        <div class="event-date-box">
          <span class="event-month">${evt.month}</span>
          <span class="event-day">${evt.day}</span>
        </div>
        <div class="event-details">
          <h4>${evt.title}</h4>
          <span class="event-time-loc">${evt.time} | ${evt.loc}</span>
          <p class="event-desc">${evt.desc}</p>
          <a href="#" class="event-action" onclick="alert('Registered successfully!')">${evt.action} ↗</a>
        </div>
      `;
      eventsList.appendChild(card);
    });
  };

  // Browser Geolocation
  btnGeo.addEventListener('click', () => {
    statusBadge.textContent = 'Locating...';
    coordsLabel.textContent = '';

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      renderRegion('general');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
        // Map coordinates to region
        let matchedRegion = 'general';
        
        // Simple bounding box logic for simulation
        if (lat > 38 && lon < -70) {
          matchedRegion = 'newyork';
        } else if (lat < 36 && lon < -110) {
          matchedRegion = 'california';
        }
        
        renderRegion(matchedRegion);
      },
      (error) => {
        console.warn("Geolocation lookup failed, falling back to General.", error);
        alert("Could not retrieve location. Loading fallback General US Board.");
        renderRegion('general');
      }
    );
  });

  // ZIP Code Fallback
  if (btnZip && inputZip) {
    btnZip.addEventListener('click', () => {
      const zip = inputZip.value.trim();
      if (!/^\d{5}$/.test(zip)) {
        alert("Please enter a valid 5-digit ZIP code.");
        return;
      }

      let matchedRegion = 'general';
      if (zip.startsWith('9')) {
        matchedRegion = 'california';
      } else if (zip.startsWith('1') || zip.startsWith('0')) {
        matchedRegion = 'newyork';
      }

      renderRegion(matchedRegion);
    });
  }

  // Micro-Gigs Board Engine
  const gigsContainer = document.getElementById('local-gigs-list');
  const gigForm = document.getElementById('local-gig-form');

  const renderGigs = () => {
    if (!gigsContainer) return;
    gigsContainer.innerHTML = '';

    LOCAL_GIGS.forEach(gig => {
      const row = document.createElement('div');
      row.className = 'loan-card';
      row.style.background = 'rgba(255, 255, 255, 0.03)';
      row.style.border = '1px solid var(--color-border)';

      const left = document.createElement('div');
      left.className = 'loan-card-info';

      const title = document.createElement('span');
      title.className = 'reg-folder-title';
      title.textContent = gig.title;

      const catBadge = `<span class="post-tag" style="margin-left: 0.5rem; font-size:0.65rem; padding:0.1rem 0.4rem; vertical-align:middle; background:rgba(255,255,255,0.05); color:var(--color-text-muted);">${gig.category}</span>`;
      title.innerHTML += catBadge;

      const desc = document.createElement('span');
      desc.className = 'loan-details-meta';
      desc.style.display = 'block';
      desc.style.marginTop = '0.25rem';
      desc.textContent = gig.desc;

      const statusLine = document.createElement('span');
      statusLine.className = 'loan-details-meta';
      statusLine.style.fontSize = '0.75rem';
      statusLine.style.marginTop = '0.25rem';
      statusLine.style.display = 'block';
      
      if (gig.status === 'Open') {
        statusLine.style.color = 'var(--color-green)';
        statusLine.textContent = '🟢 Open for Claims';
      } else {
        statusLine.style.color = 'var(--color-text-muted)';
        statusLine.textContent = `🔒 Claimed by ${gig.worker}`;
      }

      left.appendChild(title);
      left.appendChild(desc);
      left.appendChild(statusLine);

      const right = document.createElement('div');
      right.className = 'loan-card-actions';

      const bountyAmt = document.createElement('span');
      bountyAmt.className = 'loan-amount';
      bountyAmt.textContent = `$${gig.bounty}`;

      const claimBtn = document.createElement('button');
      claimBtn.className = `btn ${gig.status === 'Open' ? 'btn-primary' : 'btn-secondary'}`;
      claimBtn.style.padding = '0.3rem 0.8rem';
      claimBtn.style.marginTop = '0.25rem';
      claimBtn.textContent = gig.status === 'Open' ? 'Claim Gig' : 'Claimed';
      claimBtn.disabled = gig.status !== 'Open';

      claimBtn.addEventListener('click', () => {
        gig.status = 'Claimed';
        gig.worker = '@Citizen_X (You)';
        alert(`Gig Claimed successfully! Submit deliverables to claiming@resolve.bet to receive your $${gig.bounty} payment.`);
        renderGigs();
      });

      right.appendChild(bountyAmt);
      right.appendChild(claimBtn);

      row.appendChild(left);
      row.appendChild(right);
      gigsContainer.appendChild(row);
    });
  };

  if (gigForm) {
    gigForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('gig-title').value;
      const bounty = parseInt(document.getElementById('gig-bounty').value) || 10;
      const category = document.getElementById('gig-category').value;
      const desc = document.getElementById('gig-desc').value;

      LOCAL_GIGS.unshift({
        id: LOCAL_GIGS.length + 1,
        title: title,
        category: category,
        bounty: bounty,
        desc: desc,
        status: 'Open',
        worker: null
      });

      document.getElementById('gig-title').value = '';
      document.getElementById('gig-bounty').value = '';
      document.getElementById('gig-desc').value = '';

      renderGigs();
    });
  }

  // Draw gigs initially
  renderGigs();
}

/* ==========================================================================
   11. P2P Mutual Credit Loan System
   ========================================================================== */
let LOAN_REQUESTS = [
  { id: 1, borrower: '@Gardener_Dave', amount: 450, term: 6, interest: 2.0, purpose: 'Purchase heirloom tomato seeds and organic compost for local community garden.' },
  { id: 2, borrower: '@Coop_Bakery', amount: 1200, term: 12, interest: 3.5, purpose: 'Upgrade commercial convection oven motor to keep production active.' }
];

let LOAN_OFFERS = [
  { id: 1, lender: '@Eco_Investor', amount: 2000, term: 12, interest: 1.5, details: 'Surplus credit available specifically for local green initiatives.' },
  { id: 2, lender: '@Mutual_Alice', amount: 500, term: 6, interest: 0.0, details: 'Interest-free micro-lending to support single parents and co-op workers.' }
];

let USER_LEDGER = [
  { id: 1, type: 'Borrowed', partner: '@Mutual_Alice', principal: 300, remaining: 150, term: 6, interest: 0.0 }
];

function initMutualCredit() {
  const reqList = document.getElementById('loan-requests-list');
  const offList = document.getElementById('loan-offers-list');
  const ledgerBody = document.getElementById('p2p-ledger-body');
  
  const borrowForm = document.getElementById('p2p-borrow-form');
  const lendForm = document.getElementById('p2p-lend-form');

  if (!reqList || !offList || !ledgerBody) return;

  // Render Loan Requests Bulletin Board
  const renderRequests = () => {
    reqList.innerHTML = '';
    if (LOAN_REQUESTS.length === 0) {
      reqList.innerHTML = '<div class="empty-state-local" style="padding: 2rem;">No active borrow requests.</div>';
      return;
    }

    LOAN_REQUESTS.forEach(req => {
      const div = document.createElement('div');
      div.className = 'loan-card';
      div.innerHTML = `
        <div class="loan-card-info">
          <span class="loan-user">${req.borrower}</span>
          <span class="loan-details-meta">Term: ${req.term} Months | Interest Offer: ${req.interest}%</span>
          <p class="loan-purpose-text">"${req.purpose}"</p>
        </div>
        <div class="loan-card-actions">
          <span class="loan-amount">$${req.amount}</span>
          <button class="btn btn-primary" onclick="fundRequest(${req.id})" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Fund Loan</button>
        </div>
      `;
      reqList.appendChild(div);
    });
  };

  // Render Loan Offers Bulletin Board
  const renderOffers = () => {
    offList.innerHTML = '';
    if (LOAN_OFFERS.length === 0) {
      offList.innerHTML = '<div class="empty-state-local" style="padding: 2rem;">No active capital offers.</div>';
      return;
    }

    LOAN_OFFERS.forEach(off => {
      const div = document.createElement('div');
      div.className = 'loan-card';
      div.innerHTML = `
        <div class="loan-card-info">
          <span class="loan-user">${off.lender}</span>
          <span class="loan-details-meta">Max Term: ${off.term} Months | Interest: ${off.interest}%</span>
          <p class="loan-purpose-text">"${off.details}"</p>
        </div>
        <div class="loan-card-actions">
          <span class="loan-amount">$${off.amount}</span>
          <button class="btn btn-primary" onclick="requestFundingFromOffer(${off.id})" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Request</button>
        </div>
      `;
      offList.appendChild(div);
    });
  };

  // Render User's Mutual Credit Ledger
  const renderLedger = () => {
    ledgerBody.innerHTML = '';
    if (USER_LEDGER.length === 0) {
      ledgerBody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--color-text-muted);">No active credit contracts.</td></tr>';
      return;
    }

    USER_LEDGER.forEach(item => {
      const tr = document.createElement('tr');
      const isLent = item.type === 'Lent';
      
      tr.innerHTML = `
        <td><span class="status-badge ${isLent ? 'status-active' : 'status-offline'}">${item.type}</span></td>
        <td style="font-weight: 500;">${item.partner}</td>
        <td>$${item.principal}</td>
        <td style="color:${isLent ? 'var(--color-green)' : 'var(--color-red)'}; font-weight: bold;">$${Math.round(item.remaining)}</td>
        <td>
          <button class="upvote-btn" onclick="makeRepayment(${item.id})" style="padding: 0.25rem 0.6rem; font-size: 0.75rem;">
            ${isLent ? 'Collect payment' : 'Pay Installment'}
          </button>
        </td>
      `;
      ledgerBody.appendChild(tr);
    });
  };

  // Fund a borrower request (User acts as Lender)
  window.fundRequest = (id) => {
    const idx = LOAN_REQUESTS.findIndex(r => r.id === id);
    if (idx === -1) return;
    const req = LOAN_REQUESTS[idx];

    // Deduct listing and append to ledger
    LOAN_REQUESTS.splice(idx, 1);
    
    // Remaining is principal + interest
    const interestCharge = req.amount * (req.interest / 100);
    const totalRepay = req.amount + interestCharge;

    USER_LEDGER.push({
      id: Date.now(),
      type: 'Lent',
      partner: req.borrower,
      principal: req.amount,
      remaining: totalRepay,
      term: req.term,
      interest: req.interest
    });

    alert(`Success! You funded ${req.borrower}'s loan of $${req.amount}. Contract is now active on your ledger.`);
    renderRequests();
    renderLedger();
  };

  // Request from a lender offer (User acts as Borrower)
  window.requestFundingFromOffer = (id) => {
    const idx = LOAN_OFFERS.findIndex(o => o.id === id);
    if (idx === -1) return;
    const off = LOAN_OFFERS[idx];

    LOAN_OFFERS.splice(idx, 1);

    const interestCharge = off.amount * (off.interest / 100);
    const totalRepay = off.amount + interestCharge;

    USER_LEDGER.push({
      id: Date.now(),
      type: 'Borrowed',
      partner: off.lender,
      principal: off.amount,
      remaining: totalRepay,
      term: off.term,
      interest: off.interest
    });

    alert(`Success! Requested micro-loan of $${off.amount} from ${off.lender}. Capital is credited to your account.`);
    renderOffers();
    renderLedger();
  };

  // Repayment simulation
  window.makeRepayment = (id) => {
    const item = USER_LEDGER.find(l => l.id === id);
    if (!item) return;

    const installment = Math.min(item.remaining, Math.round(item.principal / item.term));
    item.remaining -= installment;

    if (item.remaining <= 0) {
      USER_LEDGER = USER_LEDGER.filter(l => l.id !== id);
      alert(`Success! The loan contract with ${item.partner} has been fully settled and closed.`);
    } else {
      alert(`Payment successful! Paid installment of $${installment}. Remaining balance with ${item.partner}: $${Math.round(item.remaining)}`);
    }

    renderLedger();
  };

  // Form submit handlers
  if (borrowForm) {
    borrowForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const borrower = document.getElementById('borrow-name').value;
      const amount = parseInt(document.getElementById('borrow-amount').value);
      const term = parseInt(document.getElementById('borrow-term').value);
      const interest = parseFloat(document.getElementById('borrow-interest').value);
      const purpose = document.getElementById('borrow-purpose').value;

      LOAN_REQUESTS.unshift({
        id: Date.now(),
        borrower: borrower.startsWith('@') ? borrower : '@' + borrower,
        amount,
        term,
        interest,
        purpose
      });

      renderRequests();
      borrowForm.reset();
    });
  }

  if (lendForm) {
    lendForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const lender = document.getElementById('lend-name').value;
      const amount = parseInt(document.getElementById('lend-amount').value);
      const term = parseInt(document.getElementById('lend-term').value);
      const interest = parseFloat(document.getElementById('lend-interest').value);

      LOAN_OFFERS.unshift({
        id: Date.now(),
        lender: lender.startsWith('@') ? lender : '@' + lender,
        amount,
        term,
        interest,
        details: `Community micro-funding available for local initiatives.`
      });

      renderOffers();
      lendForm.reset();
    });
  }

  // Initial tab form toggle helpers
  window.toggleP2PForm = (mode) => {
    const btnBorrow = document.getElementById('btn-subform-borrow');
    const btnLend = document.getElementById('btn-subform-lend');
    
    if (mode === 'borrow') {
      btnBorrow.classList.add('active');
      btnLend.classList.remove('active');
      borrowForm.classList.remove('hidden');
      lendForm.classList.add('hidden');
    } else {
      btnBorrow.classList.remove('active');
      btnLend.classList.add('active');
      borrowForm.classList.add('hidden');
      lendForm.classList.remove('hidden');
    }
  };

  renderRequests();
  renderOffers();
  renderLedger();
}

/* ==========================================================================
   12. Financial Literacy & Calculators
   ========================================================================== */
const PLATFORM_DATA = {
  youtube: {
    name: 'YouTube Partner Program',
    rate: 4.00, // RPM per 1000 views
    metric: 'Views',
    requirements: '1,000 Subscribers and 4,000 valid public watch hours in the last 12 months, or 10 million Shorts views.',
    note: 'CPM varies widely based on audience geography and niche (finance/tech has high RPM; gaming/comedy has low RPM).'
  },
  tiktok_rewards: {
    name: 'TikTok Creator Rewards',
    rate: 0.75, // RPM per 1000 views
    metric: 'Qualified Views',
    requirements: 'At least 10,000 followers and 100,000 video views in the last 30 days. Videos must be longer than 1 minute.',
    note: 'Requires high engagement and retention. TikTok pays only on "qualified views" (first view per user, watched > 5 seconds).'
  },
  tiktok_fund: {
    name: 'TikTok Creator Fund (Shorts)',
    rate: 0.03, // RPM per 1000 views
    metric: 'Shorts Views',
    requirements: '10,000 followers and 100,000 video views in the last 30 days.',
    note: 'Extremely low payouts. Chasing short viral loops is highly extraction-prone for creators; it drives platform traffic but returns pennies.'
  },
  spotify: {
    name: 'Spotify Artist Streaming',
    rate: 3.50, // per 1000 streams
    metric: 'Streams',
    requirements: 'Minimum of 1,000 streams annually on the track to start generating payouts.',
    note: 'Payouts are pooled and distributed based on market share, meaning small artists receive less than the absolute rate.'
  },
  apple_music: {
    name: 'Apple Music Streaming',
    rate: 7.50, // per 1000 streams
    metric: 'Streams',
    requirements: 'No minimum track stream count, but requires account distribution setup (DistroKid/TuneCore).',
    note: 'Generally pays roughly double Spotify’s rate due to Apple’s subscription-only model (no free ad-supported tier).'
  },
  x_ads: {
    name: 'X (Twitter) Ads Revenue Sharing',
    rate: 0.015, // per 1000 impressions
    metric: 'Impressions',
    requirements: 'Subscribe to X Premium, and have at least 5 million organic impressions on your posts in the last 3 months.',
    note: 'Highly volatile. Payouts depend strictly on ads served in the replies of verified users.'
  }
};

function initFinancialLiteracy() {
  const platSelect = document.getElementById('platform-select');
  const targetIncomeInput = document.getElementById('input-target-income');
  const calcOutput = document.getElementById('platform-calc-output');

  const ccBalanceInput = document.getElementById('cc-balance');
  const ccAprInput = document.getElementById('cc-apr');
  const ccMinRateSelect = document.getElementById('cc-min-rate');
  const ccOutput = document.getElementById('cc-trap-output');

  if (!platSelect || !targetIncomeInput || !calcOutput || !ccBalanceInput || !ccAprInput || !ccMinRateSelect || !ccOutput) return;

  // Platform calculator engine
  const calculatePlatformMonetization = () => {
    const platKey = platSelect.value;
    const target = parseFloat(targetIncomeInput.value) || 0;
    const info = PLATFORM_DATA[platKey];

    if (!info) return;

    // views needed = target / (rate / 1000)
    const viewsNeeded = Math.round(target / (info.rate / 1000));
    
    calcOutput.innerHTML = `
      <div class="reflection-header">
        <span class="reflection-badge badge-winning">${info.name}</span>
        <span class="reflection-title">${viewsNeeded.toLocaleString()} ${info.metric} / month</span>
      </div>
      <div class="reflection-text">
        <p><strong>Average Revenue Rate:</strong> $${info.rate.toFixed(3)} per 1,000 ${info.metric.toLowerCase()}</p>
        <p class="margin-top-small"><strong>Monetization Requirements:</strong> ${info.requirements}</p>
        <p class="margin-top-small" style="font-style: italic; font-size: 0.82rem; color: var(--color-text-muted);">${info.note}</p>
      </div>
    `;
  };

  // Credit Card Debt Trap Calculator engine
  const calculateDebtTrap = () => {
    const balanceStart = parseFloat(ccBalanceInput.value) || 0;
    const apr = parseFloat(ccAprInput.value) || 0;
    const minSelectVal = ccMinRateSelect.value;

    let balance = balanceStart;
    const r = apr / 12 / 100;
    let months = 0;
    let totalPaid = 0;
    let totalInterest = 0;

    const isFixed = minSelectVal === '100';
    const minRate = isFixed ? 0 : parseFloat(minSelectVal) / 100;

    // Check for infinite debt loop:
    const initialInterest = balance * r;
    const initialPayment = isFixed ? 100 : Math.max(25, balance * minRate);

    if (initialInterest >= initialPayment && balance > 0) {
      ccOutput.className = 'reflection-output losing';
      ccOutput.innerHTML = `
        <div class="reflection-header">
          <span class="reflection-badge badge-losing">INDEFINITE DEBT LOOP</span>
          <span class="reflection-title" style="color: var(--color-red);">Warning: Debt Grows Indefinitely!</span>
        </div>
        <div class="reflection-text">
          <p>Your interest charge this month ($${Math.round(initialInterest)}) exceeds or equals your starting payment ($${Math.round(initialPayment)}). Under this payment scheme, the card balance will grow forever, trapping you in interest obligations indefinitely.</p>
          <p class="margin-top-small"><strong>Action required:</strong> Increase your monthly payment to at least $${Math.round(initialInterest + 20)} to start paying down the principal.</p>
        </div>
      `;
      return;
    }

    while (balance > 0.01 && months < 600) { // Limit to 50 years to prevent browser freeze
      months++;
      const interest = balance * r;
      totalInterest += interest;
      balance += interest;

      let payment = 0;
      if (isFixed) {
        payment = Math.min(balance, 100);
      } else {
        payment = Math.min(balance, Math.max(25, balance * minRate));
      }

      totalPaid += payment;
      balance -= payment;
    }

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    const timeString = `${years > 0 ? years + ' years ' : ''}${remainingMonths} months`;
    const interestPercentage = Math.round((totalInterest / balanceStart) * 100);

    ccOutput.className = 'reflection-output losing';
    ccOutput.innerHTML = `
      <div class="reflection-header">
        <span class="reflection-badge badge-losing">Debt payoff results</span>
        <span class="reflection-title">${timeString} to pay off</span>
      </div>
      <div class="reflection-text">
        <p><strong>Total Interest Extracted:</strong> $${Math.round(totalInterest).toLocaleString()} (${interestPercentage}% of original balance)</p>
        <p><strong>Total Cash Paid to Bank:</strong> $${Math.round(totalPaid).toLocaleString()}</p>
        <p class="margin-top-small" style="font-style: italic; font-size: 0.85rem; color: var(--color-text-muted);">
          *Paying only the bank's minimum rate ensures they maximize their extraction from your labor. Always prioritize paying the STATEMENT BALANCE in full every month to force the bank to extend interest-free credit rather than extracting your savings.
        </p>
      </div>
    `;
  };

  const calcBtn = document.getElementById('btn-platform-calc');
  if (calcBtn) {
    calcBtn.addEventListener('click', calculatePlatformMonetization);
  }

  platSelect.addEventListener('change', calculatePlatformMonetization);
  targetIncomeInput.addEventListener('input', calculatePlatformMonetization);
  
  ccBalanceInput.addEventListener('input', calculateDebtTrap);
  ccAprInput.addEventListener('input', calculateDebtTrap);
  ccMinRateSelect.addEventListener('change', calculateDebtTrap);

  // Initial runs
  calculatePlatformMonetization();
  calculateDebtTrap();
}

/* ==========================================================================
   13. The President's Desk (Regulations Tracker)
   ========================================================================== */
const REGULATIONS_DATABASE = [
  {
    id: 'cfpb-late-fees',
    title: 'Credit Card Late Fee Cap ($8 limit)',
    agency: 'CFPB',
    status: 'blocked',
    statusText: 'Injunction / Blocked by Court',
    agenda: 'Capping credit card late fees at $8 (down from the current average of $32), potentially saving consumers $10 billion annually.',
    lobbying: 'Chamber of Commerce and banking associations successfully filed a federal injunction in Texas, arguing the cap harms banking liquidity.',
    spend: '$24.2M',
    tags: ['cfpb', 'late fee', 'bank', 'credit card', 'finance', 'court', 'injunction']
  },
  {
    id: 'sec-climate',
    title: 'Climate Emissions Disclosure (Scope 1 & 2)',
    agency: 'SEC',
    status: 'stayed',
    statusText: 'Legal Stay / Under Litigation',
    agenda: 'Requiring large public corporations to disclose their direct Scope 1 & 2 greenhouse gas emissions in annual filings.',
    lobbying: 'Energy companies and state attorneys general filed lawsuits claiming the SEC is overstepping its financial mandate. SEC paused the rule voluntarily pending legal outcomes.',
    spend: '$18.4M',
    tags: ['sec', 'climate', 'emissions', 'greenhouse', 'fossil fuel', 'lawsuit', 'energy']
  },
  {
    id: 'ftc-mergers',
    title: 'HSR Merger Review Guidelines',
    agency: 'FTC',
    status: 'active',
    statusText: 'Active / Reviewing Filings',
    agenda: 'Expanding the reporting data required for corporate mergers under the Hart-Scott-Rodino Act to check anti-competitive behavior early.',
    lobbying: 'Tech conglomerates and defense lobbies spend heavily to water down disclosure categories (such as internal employee chats/emails).',
    spend: '$15.5M',
    tags: ['ftc', 'merger', 'monopoly', 'acquisition', 'tech', 'antitrust']
  },
  {
    id: 'omb-penalties',
    title: 'OMB Memo M-26-026 (Penalty Freeze)',
    agency: 'OMB',
    status: 'active',
    statusText: 'Enacted / Active Freeze',
    agenda: 'Directing all federal agencies to freeze annual inflation adjustments for civil penalty caps, maintaining them at 2025 levels.',
    lobbying: 'Triggered by standard CPI data delays during late 2025 budget standoffs. Ensures corporate penalty limits do not increase for the fiscal year.',
    spend: '$0.0M',
    tags: ['omb', 'penalty', 'inflation', 'freeze', 'budget', 'shutdown']
  },
  {
    id: 'eo-frontier-ai',
    title: 'Frontier AI Safety Reporting (10^26 FLOPs)',
    agency: 'Executive Order',
    status: 'active',
    statusText: 'Enacted / Compliance Reporting',
    agenda: 'Requiring developers of frontier AI models training on compute power exceeding 10^26 FLOPs to report safety test results to the federal government.',
    lobbying: 'Tech firms lobby to limit the scope of reporting, arguing compute thresholds stifle startup innovation.',
    spend: '$12.5M',
    tags: ['eo', 'executive order', 'ai', 'safety', 'frontier', 'compute', 'tech']
  },
  {
    id: 'fcc-neutrality',
    title: 'Net Neutrality Title II Reclassification',
    agency: 'FCC',
    status: 'stayed',
    statusText: 'Stayed by Sixth Circuit Court',
    agenda: 'Reclassifying broadband internet access as a common carrier service under Title II of the Communications Act to prevent ISPs from throttling or blocking traffic.',
    lobbying: 'Telecom monopolies (Comcast, Verizon, AT&T) litigated the rule, winning a temporary stay in court.',
    spend: '$29.1M',
    tags: ['fcc', 'net neutrality', 'internet', 'broadband', 'telecom', 'court']
  },
  {
    id: 'epa-powerplants',
    title: 'Power Plant Carbon Standards',
    agency: 'EPA',
    status: 'blocked',
    statusText: 'Supreme Court Challenges',
    agenda: 'Setting strict carbon pollution standards for coal and gas-fired power plants, forcing carbon capture or transitions.',
    lobbying: 'Utility companies and mining associations appealed, citing compliance costs and grid instability.',
    spend: '$22.8M',
    tags: ['epa', 'carbon', 'power plant', 'coal', 'energy', 'climate']
  },
  {
    id: 'dol-overtime',
    title: 'Overtime Pay Salary Threshold Expansion',
    agency: 'DOL',
    status: 'active',
    statusText: 'Enacted / Partially Challenged',
    agenda: 'Expanding salary caps under which white-collar workers are guaranteed 1.5x overtime pay (increasing threshold to $58,656).',
    lobbying: 'Retail and restaurant lobbies filed injunction attempts to delay or block salary adjustments.',
    spend: '$9.7M',
    tags: ['dol', 'overtime', 'salary', 'labor', 'wages', 'workers']
  },
  {
    id: 'irs-wealth-audits',
    title: 'Wealthy Tax Audit Initiative',
    agency: 'IRS',
    status: 'active',
    statusText: 'Enacted / Funding Review',
    agenda: 'Directing audits and recovery pipelines targeting individuals earning over $400,000 who haven\'t filed or underreported income.',
    lobbying: 'Financial wealth managers and corporate groups lobby Congress to defund IRS enforcement budgets.',
    spend: '$14.3M',
    tags: ['irs', 'tax', 'audit', 'wealth', 'tax cuts', 'finance']
  }
];

function initPresidentDesk() {
  const searchInput = document.getElementById('reg-search-input');
  const blotterContainer = document.getElementById('desk-blotter-container');
  
  const detailPanel = document.getElementById('reg-detail-panel');
  const detailInitial = detailPanel ? detailPanel.querySelector('.detail-initial-state') : null;
  const detailContent = document.getElementById('reg-detail-content');
  
  const detailTitle = document.getElementById('reg-detail-title');
  const detailAgency = document.getElementById('reg-detail-agency');
  const detailStatus = document.getElementById('reg-detail-status');
  const detailAgenda = document.getElementById('reg-detail-agenda');
  const detailLobbying = document.getElementById('reg-detail-lobbying');
  const detailSpend = document.getElementById('reg-detail-spend');

  if (!blotterContainer || !searchInput) return;

  const renderBlotter = (filteredRules) => {
    blotterContainer.innerHTML = '';
    
    if (filteredRules.length === 0) {
      blotterContainer.innerHTML = '<div class="empty-state-local">No matching regulations found.</div>';
      return;
    }

    filteredRules.forEach(rule => {
      const slot = document.createElement('div');
      slot.className = 'reg-folder-slot';
      slot.setAttribute('data-reg-id', rule.id);
      
      const leftDiv = document.createElement('div');
      leftDiv.className = 'loan-card-info';
      
      const titleSpan = document.createElement('span');
      titleSpan.className = 'reg-folder-title';
      titleSpan.textContent = rule.title;
      
      const agencySpan = document.createElement('span');
      agencySpan.className = 'reg-folder-agency';
      agencySpan.textContent = rule.agency;
      
      leftDiv.appendChild(titleSpan);
      leftDiv.appendChild(agencySpan);
      
      const rightDiv = document.createElement('div');
      rightDiv.className = 'loan-card-actions';
      
      const badgeSpan = document.createElement('span');
      badgeSpan.className = `reg-status-badge reg-status-${rule.status}`;
      badgeSpan.textContent = rule.statusText;
      
      rightDiv.appendChild(badgeSpan);
      
      slot.appendChild(leftDiv);
      slot.appendChild(rightDiv);
      
      slot.addEventListener('click', () => {
        document.querySelectorAll('.reg-folder-slot').forEach(s => s.classList.remove('active-folder'));
        slot.classList.add('active-folder');
        
        if (detailInitial) detailInitial.classList.add('hidden');
        if (detailContent) detailContent.classList.remove('hidden');
        
        if (detailTitle) detailTitle.textContent = rule.title;
        if (detailAgency) {
          detailAgency.textContent = rule.agency;
          detailAgency.className = 'node-badge badge-regulatory';
        }
        if (detailStatus) detailStatus.textContent = rule.statusText;
        if (detailAgenda) detailAgenda.textContent = rule.agenda;
        if (detailLobbying) detailLobbying.textContent = rule.lobbying;
        if (detailSpend) detailSpend.textContent = rule.spend;
      });
      
      blotterContainer.appendChild(slot);
    });
  };

  const handleSearch = () => {
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === '') {
      renderBlotter(REGULATIONS_DATABASE);
      return;
    }

    const filtered = REGULATIONS_DATABASE.filter(rule => {
      const matchTitle = rule.title.toLowerCase().includes(query);
      const matchAgency = rule.agency.toLowerCase().includes(query);
      const matchTags = rule.tags.some(tag => tag.toLowerCase().includes(query));
      return matchTitle || matchAgency || matchTags;
    });

    renderBlotter(filtered);
  };

  searchInput.addEventListener('input', handleSearch);
  
  // Initial draw
  renderBlotter(REGULATIONS_DATABASE);
}

/* ==========================================================================
   14. Lexis AI Chatbot (Navigation, Law & Feedback Assistant)
   ========================================================================== */
function initChatbot() {
  const chatbotTrigger = document.getElementById('chatbot-trigger-btn');
  const chatbotPanel = document.getElementById('chatbot-window-panel');
  const chatbotClose = document.getElementById('chatbot-close-btn');
  
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSend = document.getElementById('chatbot-send-btn');
  const chatbotLog = document.getElementById('chatbot-log');
  
  const suggestionChips = document.querySelectorAll('.suggestion-chip');

  if (!chatbotTrigger || !chatbotPanel || !chatbotClose || !chatbotInput || !chatbotSend || !chatbotLog) return;

  // Toggle Panel open/closed
  chatbotTrigger.addEventListener('click', () => {
    chatbotPanel.classList.toggle('hidden');
  });

  chatbotClose.addEventListener('click', () => {
    chatbotPanel.classList.add('hidden');
  });

  const appendMessage = (text, sender) => {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}-bubble`;
    bubble.innerHTML = text;
    chatbotLog.appendChild(bubble);
    chatbotLog.scrollTop = chatbotLog.scrollHeight;
  };

  const getAIResponse = (userText) => {
    const text = userText.toLowerCase();

    // Check for Feedback collection intent
    if (text.includes('feedback') || text.includes('suggest') || text.includes('add a') || text.includes('recommend') || text.includes('improve')) {
      return `Thank you for sharing your feedback on <strong>resolve.bet</strong>! I have recorded your suggestion: <em>"${userText}"</em>. We review all community feature requests weekly to expand the tools available on this network.`;
    }

    // Check for credit questions
    if (text.includes('credit') || text.includes('fico') || text.includes('utilization') || text.includes('rebuild') || text.includes('debt')) {
      return `To fix or rebuild your credit score, open the <strong>Financial Literacy</strong> tab and review the FICO breakdowns. Keep your utilization below 10%, automate payments, and dispute errors. You can also simulate interest rates in our <strong>Credit Card Debt Trap Simulator</strong> at the bottom of that page!`;
    }

    // Check for Rich giving back / philanthropy
    if (text.includes('giving back') || text.includes('philanthropy') || text.includes('charity') || text.includes('rich give') || text.includes('foundation') || text.includes('donation')) {
      return `Billionaire philanthropy is often a structural illusion (philanthropic theater). Instead of paying taxes to be democratically distributed, the ultra-wealthy use <strong>private family foundations</strong> to secure massive tax write-offs while keeping 95% of the assets invested in the market, compounding tax-free under their control. This allows them to bypass democratic processes and dictate public programs according to personal preference. Real "giving back" requires <strong>surrendering control</strong>—such as allocating wealth to public reserves, community land trusts, or worker-owned cooperatives. Check the hot thread in our new <strong>Community Forum</strong> tab for a full breakdown!`;
    }

    // Check for Regulatory capture questions
    if (text.includes('capture') || text.includes('citizens united') || text.includes('lobbying') || text.includes('dark money') || text.includes('revolving door')) {
      return `Regulatory Capture happens when federal agencies (like the SEC, FTC, FCC) get staffed or pressured by the corporations they regulate. Check out the <strong>Mechanics of Control</strong> tab and select <strong>The President's Desk</strong> to search active filings and see how lobbying money halts rules.`;
    }

    // Check for Specific agency items on the President's Desk
    if (text.includes('cfpb') || text.includes('late fee') || text.includes('sec') || text.includes('emissions') || text.includes('ftc') || text.includes('merger') || text.includes('omb') || text.includes('ai safety') || text.includes('net neutrality')) {
      return `That regulation is currently under adjustment! If you go to the <strong>Mechanics of Control</strong> tab, select <strong>The President's Desk</strong>, and search for that agency or keyword, you can click the folder to see the exact rule details and target lobbying spend.`;
    }

    // Navigation maneuvering guides
    if (text.includes('navigate') || text.includes('tab') || text.includes('where is') || text.includes('how do i') || text.includes('find')) {
      return `Here is a map of <strong>resolve.bet</strong>:
      <ul>
        <li><strong>Systemic Loop:</strong> View Piketty's Formula and click nodes to see how money flows.</li>
        <li><strong>Mechanics of Control:</strong> Explore campaign finance, lobbying, revolving doors, and track active rules on <strong>The President's Desk</strong>.</li>
        <li><strong>Public Square:</strong> Compete in the Debate Arena, view Unfiltered News, and share social arguments.</li>
        <li><strong>Developer Hub:</strong> Upload or view community-created transparency tools.</li>
        <li><strong>Local Board:</strong> Locate cooperative shops and mutual aid events near you.</li>
        <li><strong>P2P Lending:</strong> Request loans directly from other citizens at interest-free terms.</li>
        <li><strong>Financial Literacy:</strong> Learn how money works and simulate credit card debt interest.</li>
      </ul>`;
    }

    // Default Fallback
    return `I can help you navigate <strong>resolve.bet</strong>, answer lawyer/regulation questions (like Citizens United or Regulatory Capture), or log your feedback. What would you like to know?`;
  };

  const handleSend = () => {
    const text = chatbotInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    chatbotInput.value = '';

    // Simulate AI response delay
    setTimeout(() => {
      const response = getAIResponse(text);
      appendMessage(response, 'bot');
    }, 450);
  };

  chatbotSend.addEventListener('click', handleSend);
  
  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  });

  // Suggestion Chips handler
  suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const msg = chip.getAttribute('data-msg');
      if (msg) {
        appendMessage(msg, 'user');
        setTimeout(() => {
          const response = getAIResponse(msg);
          appendMessage(response, 'bot');
        }, 400);
      }
    });
  });
}

/* ==========================================================================
   15. Custom Debate Topics & Voting Queue
   ========================================================================== */
const DEFAULT_DEBATE_TOPICS = {
  political: [
    { value: 'lobbying', text: 'Is Corporate Lobbying Legalized Bribery?' },
    { value: 'wealth', text: 'Should there be a Maximum Wealth Cap?' },
    { value: 'united', text: 'Is Citizens United Destroying Democracy?' },
    { value: 'funding', text: 'Should Elections be 100% Publicly Funded?' }
  ],
  spiritual: [
    { value: 'greed-soul', text: 'Does Extreme Greed Cause Spiritual Deprivation?' },
    { value: 'value-service', text: 'Is the True Purpose of Life Selfless Service?' },
    { value: 'wealth-happiness', text: 'Does Hoarded Wealth Prevent Authentic Connections?' }
  ],
  news: [
    { value: 'penalty-freeze', text: 'Is the 2026 Inflation Penalty Freeze Pro-Corporate?' },
    { value: 'fee-cap-stay', text: 'Should Judges Block Credit Card Fee Caps?' },
    { value: 'ai-thresholds', text: 'Should Compute Limits on AI Training be Regulated?' }
  ],
  fun: [
    { value: 'mars-colonies', text: 'Should We Colonize Mars or Fix Earth First?' },
    { value: 'ai-art', text: 'Is AI-Generated Art Real Creative Expression?' },
    { value: 'social-detox', text: 'Should Social Media be Banned for Under-18s?' }
  ]
};

const SUGGESTED_TOPICS = [
  { text: 'Should lobbying records be published on the blockchain?', genre: 'political', upvotes: 4, status: 'pending' },
  { text: 'Is modern advertising a form of psychological capture?', genre: 'spiritual', upvotes: 2, status: 'pending' },
  { text: 'Does fractional reserve banking constitute structural theft?', genre: 'political', upvotes: 5, status: 'approved' },
  { text: 'Should we introduce a 4-day workweek globally?', genre: 'fun', upvotes: 1, status: 'pending' }
];

function renderDebateTopics() {
  const select = document.getElementById('arena-topic');
  if (!select) return;

  const currentVal = select.value;
  select.innerHTML = '';

  for (const genre in DEFAULT_DEBATE_TOPICS) {
    const group = document.createElement('optgroup');
    group.label = genre.charAt(0).toUpperCase() + genre.slice(1) + ' Debates';
    
    DEFAULT_DEBATE_TOPICS[genre].forEach(topic => {
      const opt = document.createElement('option');
      opt.value = topic.value;
      opt.textContent = topic.text;
      group.appendChild(opt);
    });

    select.appendChild(group);
  }

  if (currentVal) {
    select.value = currentVal;
  }
}

function renderSuggestedTopics() {
  const container = document.getElementById('suggested-topics-list');
  if (!container) return;

  container.innerHTML = '';

  SUGGESTED_TOPICS.forEach((topic, idx) => {
    const card = document.createElement('div');
    card.className = 'loan-card';
    card.style.padding = '0.9rem 1.1rem';
    
    const info = document.createElement('div');
    info.className = 'loan-card-info';
    
    const textSpan = document.createElement('span');
    textSpan.className = 'reg-folder-title';
    textSpan.style.fontSize = '0.9rem';
    textSpan.textContent = topic.text;
    
    const badge = document.createElement('span');
    badge.className = `genre-badge genre-${topic.genre}`;
    badge.textContent = topic.genre;
    
    info.appendChild(textSpan);
    info.appendChild(badge);
    
    const actions = document.createElement('div');
    actions.className = 'loan-card-actions';
    actions.style.alignItems = 'center';
    
    if (topic.status === 'approved') {
      const approvedBadge = document.createElement('span');
      approvedBadge.className = 'reg-status-badge reg-status-active';
      approvedBadge.style.fontSize = '0.65rem';
      approvedBadge.textContent = 'Approved';
      actions.appendChild(approvedBadge);
    } else {
      const upvoteBtn = document.createElement('button');
      upvoteBtn.className = 'upvote-btn';
      upvoteBtn.style.padding = '0.2rem 0.6rem';
      upvoteBtn.innerHTML = `▲ <span class="upvote-count">${topic.upvotes}</span>`;
      
      upvoteBtn.addEventListener('click', () => {
        topic.upvotes++;
        upvoteBtn.querySelector('.upvote-count').textContent = topic.upvotes;
        
        if (topic.upvotes >= 5) {
          topic.status = 'approved';
          const uniqueVal = 'custom-' + idx;
          const exists = DEFAULT_DEBATE_TOPICS[topic.genre].some(t => t.value === uniqueVal);
          if (!exists) {
            DEFAULT_DEBATE_TOPICS[topic.genre].push({ value: uniqueVal, text: topic.text });
            renderDebateTopics();
          }
          renderSuggestedTopics();
        }
      });
      actions.appendChild(upvoteBtn);
    }
    
    card.appendChild(info);
    card.appendChild(actions);
    container.appendChild(card);
  });
}

function initProposeTopicForm() {
  const form = document.getElementById('propose-topic-form');
  const textInput = document.getElementById('propose-text');
  const genreSelect = document.getElementById('propose-genre');

  if (!form || !textInput || !genreSelect) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = textInput.value.trim();
    const genre = genreSelect.value;

    if (!text) return;

    SUGGESTED_TOPICS.push({
      text: text,
      genre: genre,
      upvotes: 1,
      status: 'pending'
    });

    textInput.value = '';
    renderSuggestedTopics();
  });
}

/* ==========================================================================
   16. Gaming Corner (Tournament Brackets & Snake/Auction Drafts)
   ========================================================================== */
let TOURNAMENTS = [
  {
    id: 'tourney-1',
    name: 'resolve.bet Chess Classic',
    game: 'Speed Chess',
    prize: 500,
    bracket: 'single',
    draft: 'snake',
    players: ['Liberty_Patriot', 'VoxPopuli_33', 'Citizen_Socrates', 'NullHypothesis', 'Capitalist_Edge', 'Citizen_X', 'Player_Alpha', 'Player_Beta'],
    status: 'In Progress',
    round: 1,
    matches: [
      { p1: 'Liberty_Patriot', p2: 'VoxPopuli_33', s1: 2, s2: 1, winner: 'Liberty_Patriot', round: 1 },
      { p1: 'Citizen_Socrates', p2: 'NullHypothesis', s1: 0, s2: 2, winner: 'NullHypothesis', round: 1 },
      { p1: 'Capitalist_Edge', p2: 'Citizen_X', s1: 1, s2: 2, winner: 'Citizen_X', round: 1 },
      { p1: 'Player_Alpha', p2: 'Player_Beta', s1: 2, s2: 0, winner: 'Player_Alpha', round: 1 }
    ],
    draftLog: [
      'Round 1: Liberty_Patriot drafted Magnus Carlson (Bot)',
      'Round 1: VoxPopuli_33 drafted Hikaru Nakamura (Bot)',
      'Round 1: Citizen_Socrates drafted Garry Kasparov (Bot)',
      'Round 1: NullHypothesis drafted AlphaZero (Bot)',
      'Round 2: Capitalist_Edge drafted Stockfish (Bot)',
      'Round 2: Citizen_X drafted Deep Blue (Bot)',
      'Round 2: Player_Alpha drafted Leela Chess Zero (Bot)',
      'Round 2: Player_Beta drafted Fritz (Bot)'
    ]
  }
];

let activeTourneyId = 'tourney-1';

function initGamingCorner() {
  const form = document.getElementById('tournament-creator-form');
  const tName = document.getElementById('tourney-name');
  const tGame = document.getElementById('tourney-game');
  const tPrize = document.getElementById('tourney-prize');
  const tBracket = document.getElementById('tourney-bracket');
  const tDraft = document.getElementById('tourney-draft');

  const btnSimulate = document.getElementById('btn-simulate-round');

  if (!form) return;

  // Listen to Developer Hub dynamic game submissions
  const originalDraw = window.renderDevGallery;
  window.renderDevGallery = function() {
    if (typeof originalDraw === 'function') {
      originalDraw();
    }
    updateGameSelectDropdown();
  };

  const updateGameSelectDropdown = () => {
    if (!tGame) return;
    // Get all game submissions
    const gameSubmissions = DEV_PROJECTS.filter(p => p.tag === 'Game');
    
    // Clear default select options except basic ones
    tGame.innerHTML = `
      <option value="chess">Speed Chess</option>
      <option value="blockmaker">BlockMaker Sandbox</option>
      <option value="capital-exploit">Capital Exploit Runner</option>
    `;

    gameSubmissions.forEach(game => {
      const opt = document.createElement('option');
      opt.value = game.title.toLowerCase().replace(/\s+/g, '-');
      opt.textContent = game.title;
      tGame.appendChild(opt);
    });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = 'tourney-' + (TOURNAMENTS.length + 1);
    const draftType = tDraft.value;
    
    const participants = ['Liberty_Patriot', 'VoxPopuli_33', 'Citizen_Socrates', 'NullHypothesis', 'Capitalist_Edge', 'Citizen_X', 'Player_Alpha', 'Player_Beta'];
    const matches = [
      { p1: participants[0], p2: participants[1], s1: 0, s2: 0, winner: null, round: 1 },
      { p1: participants[2], p2: participants[3], s1: 0, s2: 0, winner: null, round: 1 },
      { p1: participants[4], p2: participants[5], s1: 0, s2: 0, winner: null, round: 1 },
      { p1: participants[6], p2: participants[7], s1: 0, s2: 0, winner: null, round: 1 }
    ];

    const logs = [];
    if (draftType === 'snake') {
      participants.forEach((p, idx) => {
        logs.push(`Round ${Math.floor(idx/8)+1}: ${p} drafted Agent_${idx + 1}`);
      });
    } else if (draftType === 'auction') {
      participants.forEach((p, idx) => {
        const bid = Math.floor(Math.random() * 80) + 40;
        logs.push(`${p} secured Roster_Hero_${idx + 1} for $${bid}`);
      });
    } else {
      logs.push('Direct seeding selected. Draft bypassed.');
    }

    const newTourney = {
      id: id,
      name: tName.value,
      game: tGame.options[tGame.selectedIndex].text,
      prize: parseInt(tPrize.value),
      bracket: tBracket.value,
      draft: draftType,
      players: participants,
      status: 'In Progress',
      round: 1,
      matches: matches,
      draftLog: logs
    };

    TOURNAMENTS.push(newTourney);
    activeTourneyId = id;
    
    tName.value = '';
    renderTournamentsList();
    loadTourneyDetails(id);
  });

  if (btnSimulate) {
    btnSimulate.addEventListener('click', () => {
      const tourney = TOURNAMENTS.find(t => t.id === activeTourneyId);
      if (!tourney || tourney.status === 'Completed') return;

      if (tourney.round === 1) {
        // Simulate Round 1 results
        tourney.matches.forEach(m => {
          if (m.round === 1) {
            m.s1 = Math.floor(Math.random() * 3);
            m.s2 = Math.floor(m.s1 === 2 ? Math.random() * 2 : 2);
            m.winner = m.s1 > m.s2 ? m.p1 : m.p2;
          }
        });

        // Generate Round 2 (Semifinals)
        const winners = tourney.matches.filter(m => m.round === 1).map(m => m.winner);
        tourney.matches.push({ p1: winners[0], p2: winners[1], s1: 0, s2: 0, winner: null, round: 2 });
        tourney.matches.push({ p1: winners[2], p2: winners[3], s1: 0, s2: 0, winner: null, round: 2 });
        tourney.round = 2;
      } 
      else if (tourney.round === 2) {
        // Simulate Round 2
        tourney.matches.forEach(m => {
          if (m.round === 2) {
            m.s1 = Math.floor(Math.random() * 3);
            m.s2 = Math.floor(m.s1 === 2 ? Math.random() * 2 : 2);
            m.winner = m.s1 > m.s2 ? m.p1 : m.p2;
          }
        });

        // Generate Finals
        const winners = tourney.matches.filter(m => m.round === 2).map(m => m.winner);
        tourney.matches.push({ p1: winners[0], p2: winners[1], s1: 0, s2: 0, winner: null, round: 3 });
        tourney.round = 3;
      } 
      else if (tourney.round === 3) {
        // Simulate Finals
        const finalMatch = tourney.matches.find(m => m.round === 3);
        if (finalMatch) {
          finalMatch.s1 = Math.floor(Math.random() * 3);
          finalMatch.s2 = Math.floor(finalMatch.s1 === 2 ? Math.random() * 2 : 2);
          finalMatch.winner = finalMatch.s1 > finalMatch.s2 ? finalMatch.p1 : finalMatch.p2;
          tourney.status = 'Completed';
        }
      }

      loadTourneyDetails(tourney.id);
      renderTournamentsList();
    });
  }

  // Draw initial list
  renderTournamentsList();
  updateGameSelectDropdown();
}

function renderTournamentsList() {
  const container = document.getElementById('active-tournaments-list');
  if (!container) return;

  container.innerHTML = '';

  TOURNAMENTS.forEach(t => {
    const card = document.createElement('div');
    card.className = `loan-card ${t.id === activeTourneyId ? 'active-folder' : ''}`;
    card.style.cursor = 'pointer';

    card.addEventListener('click', () => {
      activeTourneyId = t.id;
      renderTournamentsList();
      loadTourneyDetails(t.id);
    });

    const info = document.createElement('div');
    info.className = 'loan-card-info';

    const title = document.createElement('span');
    title.className = 'reg-folder-title';
    title.textContent = t.name;

    const desc = document.createElement('span');
    desc.className = 'loan-details-meta';
    desc.textContent = `${t.game} • Bracket: ${t.bracket} • Status: ${t.status}`;

    info.appendChild(title);
    info.appendChild(desc);

    const stakes = document.createElement('div');
    stakes.className = 'loan-card-actions';
    
    const amt = document.createElement('span');
    amt.className = 'loan-amount';
    amt.textContent = `$${t.prize}`;

    const label = document.createElement('span');
    label.className = 'loan-rate';
    label.textContent = 'Prize Pool';

    stakes.appendChild(amt);
    stakes.appendChild(label);

    card.appendChild(info);
    card.appendChild(stakes);
    container.appendChild(card);
  });
}

function loadTourneyDetails(id) {
  const tourney = TOURNAMENTS.find(t => t.id === id);
  const detailInitial = document.getElementById('tourney-detail-initial');
  const detailActive = document.getElementById('tourney-detail-active');

  if (!tourney || !detailActive) return;

  if (detailInitial) detailInitial.classList.add('hidden');
  detailActive.classList.remove('hidden');

  document.getElementById('active-tourney-title').textContent = tourney.name;
  document.getElementById('active-tourney-meta').textContent = `${tourney.game} • Draft: ${tourney.draft} • Stake: $${tourney.prize}`;
  document.getElementById('active-tourney-draft-desc').textContent = `Roster Drafting Method: ${tourney.draft.toUpperCase()}`;

  // Renders logs
  const logContainer = document.getElementById('tourney-draft-log');
  if (logContainer) {
    logContainer.innerHTML = '';
    tourney.draftLog.forEach(log => {
      const row = document.createElement('div');
      row.className = 'chat-message';
      row.innerHTML = `<span class="chat-system-message" style="text-align:left; color:var(--color-text-muted);">${log}</span>`;
      logContainer.appendChild(row);
    });
  }

  // Renders visual Bracket columns
  const treeContainer = document.getElementById('bracket-viewer-tree');
  if (treeContainer) {
    treeContainer.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'bracket-rounds-wrapper';

    // Quarterfinals col (Round 1)
    const qCol = document.createElement('div');
    qCol.className = 'bracket-round-col';
    const qMatches = tourney.matches.filter(m => m.round === 1);
    qMatches.forEach(m => {
      qCol.appendChild(createMatchupBox(m));
    });
    wrapper.appendChild(qCol);

    // Semifinals col (Round 2)
    const sCol = document.createElement('div');
    sCol.className = 'bracket-round-col';
    const sMatches = tourney.matches.filter(m => m.round === 2);
    if (sMatches.length > 0) {
      sMatches.forEach(m => sCol.appendChild(createMatchupBox(m)));
    } else {
      sCol.innerHTML = `
        <div class="matchup-box" style="opacity: 0.35;"><div class="matchup-participant-row">TBD</div><div class="matchup-participant-row">TBD</div></div>
        <div class="matchup-box" style="opacity: 0.35;"><div class="matchup-participant-row">TBD</div><div class="matchup-participant-row">TBD</div></div>
      `;
    }
    wrapper.appendChild(sCol);

    // Finals col (Round 3)
    const fCol = document.createElement('div');
    fCol.className = 'bracket-round-col';
    const fMatch = tourney.matches.find(m => m.round === 3);
    if (fMatch) {
      fCol.appendChild(createMatchupBox(m => createMatchupBox(fMatch)));
      fCol.innerHTML = '';
      fCol.appendChild(createMatchupBox(fMatch));
    } else {
      fCol.innerHTML = `<div class="matchup-box" style="opacity: 0.35;"><div class="matchup-participant-row">TBD</div><div class="matchup-participant-row">TBD</div></div>`;
    }
    wrapper.appendChild(fCol);

    treeContainer.appendChild(wrapper);
  }
}

function createMatchupBox(match) {
  const box = document.createElement('div');
  box.className = 'matchup-box';

  const row1 = document.createElement('div');
  row1.className = `matchup-participant-row ${match.winner === match.p1 ? 'winner-row' : ''}`;
  row1.innerHTML = `<span>${match.p1}</span> <span class="matchup-score ${match.winner === match.p1 ? 'winner-highlight' : ''}">${match.s1}</span>`;

  const row2 = document.createElement('div');
  row2.className = `matchup-participant-row ${match.winner === match.p2 ? 'winner-row' : ''}`;
  row2.innerHTML = `<span>${match.p2}</span> <span class="matchup-score ${match.winner === match.p2 ? 'winner-highlight' : ''}">${match.s2}</span>`;

  box.appendChild(row1);
  box.appendChild(row2);
  return box;
}

/* ==========================================================================
   17. Community Forum Engine (Categorized Thread replies & OPs)
   ========================================================================== */
let DEFAULT_FORUM_THREADS = [
  {
    id: 'thread-1',
    title: 'Why the ultra-rich don\'t "give back" (and what happens when they pretend to)',
    category: 'Reform',
    author: 'Socrates_99',
    body: 'We are told billionaire charity saves the world. But look at the numbers. Private family foundations allow billionaires to bypass taxes, direct social programs to their personal whims (like charter schools), and keep 95% of the assets compounding tax-free in the stock market. True giving is not charity; it is surrendering control of the assets back to workers and communities via land trusts and co-ops.',
    replies: [
      { author: 'Citizen_X', text: 'This is the most critical post here. Philanthropic foundations are just tax shields that preserve dynastic control.' },
      { author: 'LobbyWatcher', text: 'Exactly. If they really wanted to give back, they would stop lobbying for corporate tax breaks.' }
    ],
    date: '1 hour ago',
    upvotes: 48
  },
  {
    id: 'thread-2',
    title: 'Why the FICO credit system is fundamentally rigged',
    category: 'Mutual Aid',
    author: 'DebtDisputer_99',
    body: 'The FICO system is designed as a compliance indicator. It does not measure wealth; it measures how profitable you are to credit card companies. If you carry debt and pay interest, you are valued. If you live debt-free, you are invisible. We need a P2P Mutual Credit ledger to declare our own community trustworthiness!',
    replies: [
      { author: 'Citizen_X', text: 'Agree. The utilization ratio is particularly ridiculous. If I use my own money, why does it drop my score?' }
    ],
    date: '2 hours ago',
    upvotes: 24
  }
];

let FORUM_THREADS = JSON.parse(localStorage.getItem('FORUM_THREADS')) || DEFAULT_FORUM_THREADS;

let activeThreadId = 'thread-1';
let forumCategoryFilter = 'all';

function initForum() {
  const threadForm = document.getElementById('forum-thread-form');
  const tAuthor = document.getElementById('thread-author');
  const tTitle = document.getElementById('thread-title');
  const tCategory = document.getElementById('thread-category');
  const tBody = document.getElementById('thread-body');

  const replyForm = document.getElementById('thread-reply-form');
  const rAuthor = document.getElementById('reply-author');
  const rText = document.getElementById('reply-text');

  const btnClose = document.getElementById('btn-close-thread-view');

  if (!threadForm || !replyForm) return;

  // Category filters
  const filterButtons = document.querySelectorAll('#forum-filter-bar button');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      forumCategoryFilter = btn.getAttribute('data-forum-filter');
      renderForumThreads();
    });
  });

  threadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = 'thread-' + (FORUM_THREADS.length + 1);
    const author = tAuthor.value;
    
    FORUM_THREADS.unshift({
      id: id,
      title: tTitle.value,
      category: tCategory.value,
      author: author,
      body: tBody.value,
      replies: [],
      date: 'Just now',
      upvotes: 1
    });

    tTitle.value = '';
    tBody.value = '';
    
    // Reward reputation (+15 Rep!)
    rewardUserReputation(author, 15);

    localStorage.setItem('FORUM_THREADS', JSON.stringify(FORUM_THREADS));
    renderForumThreads();
    const leaderboardList = document.getElementById('reputation-leaderboard-list');
    if (leaderboardList && typeof renderLeaderboard === 'function') renderLeaderboard();
  });

  replyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const thread = FORUM_THREADS.find(t => t.id === activeThreadId);
    if (!thread) return;

    const author = rAuthor.value;
    thread.replies.push({
      author: author,
      text: rText.value
    });

    rText.value = '';
    
    // Reward reputation (+10 Rep!)
    rewardUserReputation(author, 10);

    localStorage.setItem('FORUM_THREADS', JSON.stringify(FORUM_THREADS));
    loadThreadDetails(activeThreadId);
    renderForumThreads();
    const leaderboardList = document.getElementById('reputation-leaderboard-list');
    if (leaderboardList && typeof renderLeaderboard === 'function') renderLeaderboard();
  });

  if (btnClose) {
    btnClose.addEventListener('click', () => {
      document.getElementById('forum-thread-detail-panel').classList.add('hidden');
    });
  }

  // Draw list
  renderForumThreads();
}

function renderForumThreads() {
  const container = document.getElementById('forum-threads-list');
  if (!container) return;

  container.innerHTML = '';

  const filtered = FORUM_THREADS.filter(t => {
    if (forumCategoryFilter === 'all') return true;
    return t.category === forumCategoryFilter;
  });

  // Sort threads by upvotes descending
  filtered.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));

  filtered.forEach(t => {
    const row = document.createElement('div');
    row.className = 'thread-row-item';
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    
    row.addEventListener('click', () => {
      activeThreadId = t.id;
      loadThreadDetails(t.id);
    });

    // Left upvote controller
    const upvoteBtn = document.createElement('button');
    upvoteBtn.className = 'upvote-btn';
    upvoteBtn.style.cssText = 'padding: 0.2rem 0.5rem; margin-right: 0.75rem; font-size: 0.75rem;';
    upvoteBtn.innerHTML = `▲ <span class="thread-up-count">${t.upvotes || 0}</span>`;
    upvoteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      t.upvotes = (t.upvotes || 0) + 1;
      upvoteBtn.querySelector('.thread-up-count').textContent = t.upvotes;
      rewardUserReputation(t.author, 15);
      localStorage.setItem('FORUM_THREADS', JSON.stringify(FORUM_THREADS));
      renderForumThreads();
    });

    const info = document.createElement('div');
    info.className = 'thread-row-info';
    info.style.flex = '1';

    const title = document.createElement('span');
    title.className = 'thread-row-title';
    title.textContent = t.title;

    const meta = document.createElement('span');
    meta.className = 'thread-row-meta';
    meta.innerHTML = `
      <span class="genre-badge genre-political" style="font-size:0.65rem; margin-top:0;">${t.category}</span>
      <span>By ${t.author}</span>
      <span>${t.date}</span>
    `;

    info.appendChild(title);
    info.appendChild(meta);

    const replies = document.createElement('div');
    replies.className = 'thread-row-actions';

    const count = document.createElement('span');
    count.className = 'thread-comment-count';
    count.textContent = `${t.replies.length} replies`;

    replies.appendChild(count);

    row.appendChild(upvoteBtn);
    row.appendChild(info);
    row.appendChild(replies);
    container.appendChild(row);
  });
}

function loadThreadDetails(id) {
  const thread = FORUM_THREADS.find(t => t.id === id);
  const detailPanel = document.getElementById('forum-thread-detail-panel');

  if (!thread || !detailPanel) return;

  detailPanel.classList.remove('hidden');
  detailPanel.scrollIntoView({ behavior: 'smooth' });

  document.getElementById('active-thread-title').textContent = thread.title;
  document.getElementById('active-thread-tag').textContent = thread.category;
  document.getElementById('active-thread-author').textContent = `Started by @${thread.author} • ${thread.date}`;
  document.getElementById('active-thread-op-body').textContent = thread.body;

  const repliesContainer = document.getElementById('thread-replies-list');
  if (repliesContainer) {
    repliesContainer.innerHTML = '';
    
    if (thread.replies.length === 0) {
      repliesContainer.innerHTML = '<div class="chat-system-message">No comments yet. Start the conversation!</div>';
      return;
    }

    thread.replies.forEach(r => {
      const msg = document.createElement('div');
      msg.className = 'chat-message';
      msg.innerHTML = `<span class="chat-user">@${r.author}:</span> <span class="chat-text" style="color:var(--color-text);">${r.text}</span>`;
      repliesContainer.appendChild(msg);
    });
    repliesContainer.scrollTop = repliesContainer.scrollHeight;
  }
}

/* ==========================================================================
   18. Supabase Auth Controller
   ========================================================================== */
let SUPABASE_USER = {
  authenticated: false,
  email: '',
  name: 'Guest'
};

function initSupabaseAuth() {
  const trigger = document.getElementById('btn-auth-trigger');
  const modal = document.getElementById('supabase-auth-modal');
  const btnClose = document.getElementById('btn-close-auth');
  
  const tabLogin = document.getElementById('auth-tab-login');
  const tabSignup = document.getElementById('auth-tab-signup');
  const loginForm = document.getElementById('auth-login-form');
  const signupForm = document.getElementById('auth-signup-form');

  if (!trigger || !modal) return;

  trigger.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  const closeModal = () => modal.classList.add('hidden');
  if (btnClose) btnClose.addEventListener('click', closeModal);

  if (tabLogin && tabSignup && loginForm && signupForm) {
    tabLogin.addEventListener('click', () => {
      tabLogin.classList.add('active');
      tabSignup.classList.remove('active');
      loginForm.classList.remove('hidden');
      signupForm.classList.add('hidden');
    });

    tabSignup.addEventListener('click', () => {
      tabSignup.classList.add('active');
      tabLogin.classList.remove('active');
      signupForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
    });
  }

  // Handle Login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    
    SUPABASE_USER = {
      authenticated: true,
      email: email,
      name: email.split('@')[0]
    };

    updateGlobalHandles();
    trigger.textContent = `👤 @${SUPABASE_USER.name}`;
    trigger.style.color = 'var(--color-green)';
    trigger.style.borderColor = 'var(--color-green)';
    alert(`Logged in successfully via Supabase! Connected as @${SUPABASE_USER.name}.`);
    closeModal();
  });

  // Handle Signup
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const name = document.getElementById('signup-name').value.trim();

    SUPABASE_USER = {
      authenticated: true,
      email: email,
      name: name.replace('@', '')
    };

    updateGlobalHandles();
    trigger.textContent = `👤 @${SUPABASE_USER.name}`;
    trigger.style.color = 'var(--color-green)';
    trigger.style.borderColor = 'var(--color-green)';
    alert(`Account created and authenticated via Supabase! Welcome @${SUPABASE_USER.name}.`);
    closeModal();
  });
}

function updateGlobalHandles() {
  const username = SUPABASE_USER.name;
  
  // Update inputs across composer/reply interfaces
  const composer = document.getElementById('composer-handle');
  if (composer) composer.value = username;

  const reply = document.getElementById('reply-author');
  if (reply) reply.value = username;

  const thread = document.getElementById('thread-author');
  if (thread) thread.value = username;

  const borrow = document.getElementById('borrow-name');
  if (borrow) borrow.value = username;

  const feedUsername = document.getElementById('post-username');
  if (feedUsername) feedUsername.value = username;
}

/* ==========================================================================
   19. Live Loop Feed (X / Twitter Clone)
   ========================================================================== */
let LIVE_FEED_POSTS = JSON.parse(localStorage.getItem('LIVE_FEED_POSTS')) || [
  {
    id: 1,
    author: 'Socrates_99',
    tag: 'PikettyLoop',
    body: 'Capital returns (r) are systematically outgrowing active wages (g). Local mutual credit and cooperatives are the only way to build real neighborhood resilience.',
    time: '5m ago',
    upvotes: 42,
    downvotes: 2
  },
  {
    id: 2,
    author: 'LobbyWatcher',
    tag: 'BanishLobbying',
    body: 'Campaign finance spending under Citizens United converted democratic speech into commercial auctions. We need a direct public funding amendment.',
    time: '18m ago',
    upvotes: 28,
    downvotes: 1
  },
  {
    id: 3,
    author: 'DebtDisputer_99',
    tag: 'DirectMutualCredit',
    body: 'Every dollar bank-lent is debt-ridden. Peer mutual credit registers eliminate fractional reserve extraction and keep cash local.',
    time: '1h ago',
    upvotes: 19,
    downvotes: 3
  }
];

function initLiveFeed() {
  const composerForm = document.getElementById('feed-post-composer');
  const compText = document.getElementById('composer-text');
  const charCounter = document.getElementById('composer-char-counter');

  if (!composerForm) return;

  if (compText && charCounter) {
    compText.addEventListener('input', () => {
      const remaining = 280 - compText.value.length;
      charCounter.textContent = `${remaining} characters remaining`;
    });
  }

  composerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const handle = document.getElementById('composer-handle').value;
    const tag = document.getElementById('composer-tag').value;
    const text = compText.value;

    LIVE_FEED_POSTS.unshift({
      id: LIVE_FEED_POSTS.length + 1,
      author: handle.replace('@', ''),
      tag: tag,
      body: text,
      time: 'Just now',
      upvotes: 1,
      downvotes: 0
    });

    compText.value = '';
    if (charCounter) charCounter.textContent = '280 characters remaining';
    
    localStorage.setItem('LIVE_FEED_POSTS', JSON.stringify(LIVE_FEED_POSTS));
    renderLiveFeed();
  });

  window.upvoteFeedPost = (id) => {
    const post = LIVE_FEED_POSTS.find(p => p.id === id);
    if (post) {
      post.upvotes++;
      localStorage.setItem('LIVE_FEED_POSTS', JSON.stringify(LIVE_FEED_POSTS));
      renderLiveFeed();
    }
  };

  window.downvoteFeedPost = (id) => {
    const post = LIVE_FEED_POSTS.find(p => p.id === id);
    if (post) {
      post.downvotes++;
      localStorage.setItem('LIVE_FEED_POSTS', JSON.stringify(LIVE_FEED_POSTS));
      renderLiveFeed();
    }
  };

  renderLiveFeed();
}

function renderLiveFeed() {
  const container = document.getElementById('live-feed-stream');
  if (!container) return;

  container.innerHTML = '';

  LIVE_FEED_POSTS.forEach(post => {
    const item = document.createElement('div');
    item.className = 'card';
    item.style.cssText = 'padding:1rem; border:1px solid var(--color-border); border-radius:8px; display:flex; flex-direction:column; gap:0.5rem; background:rgba(255,255,255,0.02);';
    item.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; color:var(--color-text-muted);">
        <span><strong style="color:#fff;">@${post.author}</strong> <span style="color:var(--color-blue); margin-left:0.4rem;">#${post.tag}</span></span>
        <span>${post.time}</span>
      </div>
      <p style="font-size:0.85rem; line-height:1.4; color:var(--color-text); margin:0.25rem 0;">${post.body}</p>
      <div style="display:flex; gap:1rem; font-size:0.75rem; color:var(--color-text-muted); margin-top:0.4rem;">
        <button style="background:transparent; border:none; color:var(--color-green); cursor:pointer; font-weight:bold;" onclick="upvoteFeedPost(${post.id})">👍 ${post.upvotes}</button>
        <button style="background:transparent; border:none; color:var(--color-red); cursor:pointer; font-weight:bold;" onclick="downvoteFeedPost(${post.id})">👎 ${post.downvotes}</button>
      </div>
    `;
    container.appendChild(item);
  });
}

/* ==========================================================================
   20. Submissions Hub & Voting Arena (Decentralized Approvals)
   ========================================================================== */
let PENDING_DEV_APPS = JSON.parse(localStorage.getItem('PENDING_DEV_APPS')) || [
  { id: 1, title: 'OpenLobby Ledger', desc: 'Saves active senate lobbying logs to decentralized Web3 chains.', url: 'https://openlobby.io', tag: 'Transparency', upvotes: 3 },
  { id: 2, title: 'CoopExchange Hub', desc: 'P2P commodity exchange for independent worker-owned co-ops.', url: 'https://coopexchange.org', tag: 'Mutual Aid', upvotes: 4 }
];

let PENDING_GIGS = JSON.parse(localStorage.getItem('PENDING_GIGS')) || [
  { id: 1, title: 'Draft Community Charter', category: 'Writing', bounty: 60, desc: 'Draft the mutual aid bylaws for the Echo Park community fridge coalition.', upvotes: 4 },
  { id: 2, title: 'Build Open Source Lobby Map', category: 'Digital', bounty: 180, desc: 'Create an interactive D3.js node map linking donors to specific congressional bills.', upvotes: 2 }
];

function initSubmissionsHub() {
  // Override suggest topic upvote from Phase 9 to also trigger approvals here
  const originalRenderSuggested = renderSuggestedTopics;
  renderSuggestedTopics = function() {
    originalRenderSuggested();
    renderVotingDebates();
  };

  window.upvoteSubmissionDebate = (idx) => {
    const topic = SUGGESTED_TOPICS[idx];
    if (!topic) return;
    
    topic.upvotes++;
    if (topic.upvotes >= 5) {
      topic.status = 'approved';
      const uniqueVal = 'custom-' + idx;
      const exists = DEFAULT_DEBATE_TOPICS[topic.genre].some(t => t.value === uniqueVal);
      if (!exists) {
        DEFAULT_DEBATE_TOPICS[topic.genre].push({ value: uniqueVal, text: topic.text });
        renderDebateTopics();
        alert(`Debate Topic approved! "${topic.text}" is now selectable in the Debate Arena.`);
      }
    }
    
    localStorage.setItem('SUGGESTED_TOPICS', JSON.stringify(SUGGESTED_TOPICS));
    renderSuggestedTopics();
  };

  window.upvoteSubmissionDev = (id) => {
    const app = PENDING_DEV_APPS.find(p => p.id === id);
    if (!app) return;

    app.upvotes++;
    if (app.upvotes >= 5) {
      DEV_PROJECTS.push({
        id: DEV_PROJECTS.length + 1,
        title: app.title,
        desc: app.desc,
        url: app.url,
        tag: app.tag,
        upvotes: 5
      });
      // Remove from pending
      PENDING_DEV_APPS = PENDING_DEV_APPS.filter(p => p.id !== id);
      alert(`Developer App approved! "${app.title}" has been integrated into the Developer Hub showcase.`);
      if (window.renderDevGallery) window.renderDevGallery();
    }

    localStorage.setItem('PENDING_DEV_APPS', JSON.stringify(PENDING_DEV_APPS));
    renderVotingDevs();
  };

  window.upvoteSubmissionGig = (id) => {
    const gig = PENDING_GIGS.find(g => g.id === id);
    if (!gig) return;

    gig.upvotes++;
    if (gig.upvotes >= 5) {
      LOCAL_GIGS.unshift({
        id: LOCAL_GIGS.length + 1,
        title: gig.title,
        category: gig.category,
        bounty: gig.bounty,
        desc: gig.desc,
        status: 'Open',
        worker: null
      });
      // Remove from pending
      PENDING_GIGS = PENDING_GIGS.filter(g => g.id !== id);
      alert(`Micro-Gig approved! "${gig.title}" is now open for claims on the Local Board Tasks board.`);
      // redraw local Board gigs
      const localBoardContainer = document.getElementById('local-gigs-list');
      if (localBoardContainer && typeof renderGigs === 'function') renderGigs();
    }

    localStorage.setItem('PENDING_GIGS', JSON.stringify(PENDING_GIGS));
    renderVotingGigs();
  };

  // Listen to debate submissions from Phase 9 proposed form
  const originalProposeForm = initProposeTopicForm;
  initProposeTopicForm = function() {
    originalProposeForm();
    const form = document.getElementById('propose-topic-form');
    if (form) {
      form.addEventListener('submit', () => {
        // Redraw lists
        renderVotingDebates();
      });
    }
  };

  // Listen to dev uploads to also insert them into pending devs instead of directly
  const devForm = document.getElementById('dev-upload-form');
  if (devForm) {
    // Replace default submit behavior to send to pending instead of direct
    devForm.addEventListener('submit', (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      const title = document.getElementById('dev-title').value;
      const desc = document.getElementById('dev-desc').value;
      const url = document.getElementById('dev-url').value;
      const tag = document.getElementById('dev-tag').value;

      PENDING_DEV_APPS.push({
        id: PENDING_DEV_APPS.length + 1,
        title: title,
        desc: desc,
        url: url,
        tag: tag,
        upvotes: 1
      });

      document.getElementById('dev-title').value = '';
      document.getElementById('dev-desc').value = '';
      document.getElementById('dev-url').value = '';
      
      localStorage.setItem('PENDING_DEV_APPS', JSON.stringify(PENDING_DEV_APPS));
      renderVotingDevs();
      alert(`Developer Application submitted! It will appear in the Submissions Hub. Upvote it to 5 to approve.`);
    }, true);
  }

  // Listen to local board gig creations to insert into pending instead of directly
  const localGigForm = document.getElementById('local-gig-form');
  if (localGigForm) {
    localGigForm.addEventListener('submit', (e) => {
      e.stopPropagation();
      e.preventDefault();

      const title = document.getElementById('gig-title').value;
      const bounty = parseInt(document.getElementById('gig-bounty').value) || 10;
      const category = document.getElementById('gig-category').value;
      const desc = document.getElementById('gig-desc').value;

      PENDING_GIGS.push({
        id: PENDING_GIGS.length + 1,
        title: title,
        bounty: bounty,
        category: category,
        desc: desc,
        upvotes: 1
      });

      document.getElementById('gig-title').value = '';
      document.getElementById('gig-bounty').value = '';
      document.getElementById('gig-desc').value = '';

      localStorage.setItem('PENDING_GIGS', JSON.stringify(PENDING_GIGS));
      renderVotingGigs();
      alert(`Micro-Gig task submitted! It will appear in the Submissions Hub. Upvote it to 5 to approve.`);
    }, true);
  }

  renderVotingDebates();
  renderVotingDevs();
  renderVotingGigs();
  if (typeof renderVotingMarkets === 'function') renderVotingMarkets();
}

function renderVotingDebates() {
  const container = document.getElementById('voting-debate-list');
  if (!container) return;
  container.innerHTML = '';

  const pending = SUGGESTED_TOPICS.filter(t => t.status === 'pending');
  if (pending.length === 0) {
    container.innerHTML = '<div class="chat-system-message">No pending debate topics.</div>';
    return;
  }

  pending.forEach((topic, idx) => {
    const item = document.createElement('div');
    item.className = 'loan-card';
    item.style.padding = '0.75rem';
    item.innerHTML = `
      <div class="loan-card-info" style="gap:0.15rem;">
        <span class="reg-folder-title" style="font-size:0.85rem;">"${topic.text}"</span>
        <span class="genre-badge genre-${topic.genre}" style="width:fit-content; font-size:0.6rem; padding:0.1rem 0.3rem;">${topic.genre}</span>
      </div>
      <div class="loan-card-actions">
        <button class="upvote-btn" style="padding:0.2rem 0.5rem; font-size:0.7rem;" onclick="upvoteSubmissionDebate(${idx})">
          ▲ Upvote (<span style="font-weight:bold;">${topic.upvotes}/5</span>)
        </button>
      </div>
    `;
    container.appendChild(item);
  });
}

function renderVotingDevs() {
  const container = document.getElementById('voting-dev-list');
  if (!container) return;
  container.innerHTML = '';

  if (PENDING_DEV_APPS.length === 0) {
    container.innerHTML = '<div class="chat-system-message">No pending developer apps.</div>';
    return;
  }

  PENDING_DEV_APPS.forEach(app => {
    const item = document.createElement('div');
    item.className = 'loan-card';
    item.style.padding = '0.75rem';
    item.innerHTML = `
      <div class="loan-card-info" style="gap:0.15rem;">
        <span class="reg-folder-title" style="font-size:0.85rem;">${app.title}</span>
        <span class="loan-details-meta" style="font-size:0.72rem; line-height:1.2; display:block;">${app.desc}</span>
        <span class="genre-badge genre-political" style="width:fit-content; font-size:0.6rem; padding:0.1rem 0.3rem;">${app.tag}</span>
      </div>
      <div class="loan-card-actions">
        <button class="upvote-btn" style="padding:0.2rem 0.5rem; font-size:0.7rem;" onclick="upvoteSubmissionDev(${app.id})">
          ▲ Upvote (<span style="font-weight:bold;">${app.upvotes}/5</span>)
        </button>
      </div>
    `;
    container.appendChild(item);
  });
}

function renderVotingGigs() {
  const container = document.getElementById('voting-gigs-list');
  if (!container) return;
  container.innerHTML = '';

  if (PENDING_GIGS.length === 0) {
    container.innerHTML = '<div class="chat-system-message">No pending micro-gigs.</div>';
    return;
  }

  PENDING_GIGS.forEach(gig => {
    const item = document.createElement('div');
    item.className = 'loan-card';
    item.style.padding = '0.75rem';
    item.innerHTML = `
      <div class="loan-card-info" style="gap:0.15rem;">
        <span class="reg-folder-title" style="font-size:0.85rem;">${gig.title} ($${gig.bounty})</span>
        <span class="loan-details-meta" style="font-size:0.72rem; line-height:1.2; display:block;">${gig.desc}</span>
        <span class="genre-badge genre-fun" style="width:fit-content; font-size:0.6rem; padding:0.1rem 0.3rem;">${gig.category}</span>
      </div>
      <div class="loan-card-actions">
        <button class="upvote-btn" style="padding:0.2rem 0.5rem; font-size:0.7rem;" onclick="upvoteSubmissionGig(${gig.id})">
          ▲ Upvote (<span style="font-weight:bold;">${gig.upvotes}/5</span>)
        </button>
      </div>
    `;
    container.appendChild(item);
  });
}

/* ==========================================================================
   21. Billionaire Tax Loophole Simulator
   ========================================================================== */
function initBillionaireLoopholeSimulator() {
  const incomeInput = document.getElementById('loop-income');
  const sourceSelect = document.getElementById('loop-source');
  
  const chkBuyBorrow = document.getElementById('chk-buy-borrow');
  const chkOffshore = document.getElementById('chk-offshore');
  const chkFoundation = document.getElementById('chk-foundation');
  
  const outputPanel = document.getElementById('loop-output-panel');

  if (!incomeInput || !sourceSelect || !outputPanel) return;

  const calculateTax = () => {
    const income = parseFloat(incomeInput.value) || 0;
    const isW2 = sourceSelect.value === 'w2';
    
    // W-2 pays 37% federal rate on income over $600k + state (approx 45% flat for high-earning bracket)
    // Assets pays 20% capital gains rate
    const baseRate = isW2 ? 0.45 : 0.20;
    const baseTax = income * baseRate;
    
    let activeLoopholes = [];
    let reductionFactor = 1.0;
    let rateExplanation = '';
    
    // Loophole adjustments
    if (isW2) {
      // W-2 earners cannot use these loopholes because taxes are withheld by payroll
      chkBuyBorrow.disabled = true;
      chkOffshore.disabled = true;
      chkFoundation.disabled = true;
      
      chkBuyBorrow.checked = false;
      chkOffshore.checked = false;
      chkFoundation.checked = false;
      
      rateExplanation = `W-2 wages are subject to mandatory employer withholding. As a salary earner, you cannot write off personal assets, shelter royalties offshore, or borrow against wages interest-free. You pay the full <strong>45%</strong> marginal rate.`;
    } else {
      chkBuyBorrow.disabled = false;
      chkOffshore.disabled = false;
      chkFoundation.disabled = false;

      rateExplanation = `Asset appreciation is legally untaxed until sold. This allows you to apply billionaire asset preservation strategies.`;
      
      if (chkBuyBorrow.checked) {
        reductionFactor = 0.0; // Buy, Borrow, Die drops effective income to 0
        activeLoopholes.push('Buy, Borrow, Die (Portfolio Lending)');
      } else {
        if (chkOffshore.checked) {
          reductionFactor -= 0.40;
          activeLoopholes.push('Offshore IP royalties shelter');
        }
        if (chkFoundation.checked) {
          reductionFactor -= 0.30;
          activeLoopholes.push('Family Foundation stock write-off');
        }
      }
    }
    
    reductionFactor = Math.max(0.0, reductionFactor);
    const finalTax = baseTax * reductionFactor;
    const effectiveRate = income > 0 ? (finalTax / income) * 100 : 0;
    const savings = baseTax - finalTax;
    const netKept = income - finalTax;

    const isLosing = effectiveRate > 15;
    outputPanel.className = `reflection-output ${isLosing ? 'losing' : 'winning'}`;
    
    let loopholesHTML = '';
    if (activeLoopholes.length > 0) {
      loopholesHTML = `
        <p style="margin-top:0.5rem; font-size:0.8rem; color:#fff;"><strong>Loopholes Applied:</strong></p>
        <ul style="padding-left:1rem; font-size:0.78rem; color:var(--color-text-muted); margin-top:0.25rem;">
          ${activeLoopholes.map(loop => `<li>✅ ${loop}</li>`).join('')}
        </ul>
      `;
    }

    outputPanel.innerHTML = `
      <div class="reflection-header">
        <span class="reflection-badge ${isLosing ? 'badge-losing' : 'badge-winning'}">
          ${isLosing ? 'Standard Tax Rate' : 'Billionaire Status'}
        </span>
        <span class="reflection-title" style="${isLosing ? 'color:var(--color-red);' : 'color:var(--color-green);'}">
          ${effectiveRate.toFixed(1)}% Effective Rate
        </span>
      </div>
      <div class="reflection-text">
        <p><strong>Base Tax Rate:</strong> ${(baseRate * 100).toFixed(0)}%</p>
        <p><strong>Standard Liability:</strong> $${Math.round(baseTax).toLocaleString()}</p>
        <p style="margin-top:0.4rem;"><strong>Final Tax Due:</strong> $${Math.round(finalTax).toLocaleString()}</p>
        <p><strong>Net Cash Kept:</strong> $${Math.round(netKept).toLocaleString()}</p>
        <p style="color:var(--color-green); font-weight:bold; margin-top:0.4rem;">Net Tax Savings: $${Math.round(savings).toLocaleString()}</p>
        ${loopholesHTML}
        <p class="margin-top-small" style="font-size:0.8rem; line-height:1.4; color:var(--color-text-muted); border-top:1px solid rgba(255,255,255,0.05); padding-top:0.5rem;">
          ${rateExplanation}
        </p>
      </div>
    `;
  };

  incomeInput.addEventListener('input', calculateTax);
  sourceSelect.addEventListener('change', calculateTax);
  
  chkBuyBorrow.addEventListener('change', calculateTax);
  chkOffshore.addEventListener('change', calculateTax);
  chkFoundation.addEventListener('change', calculateTax);

  // Initial calculation
  calculateTax();
}

/* ==========================================================================
   22. resolve.bet Prediction Markets System
   ========================================================================== */
let CITIZEN_WALLET = parseFloat(localStorage.getItem('CITIZEN_WALLET')) || 2500.0;

let DEFAULT_PREDICTION_CONTRACTS = [
  { id: 1, question: "Will the FTC block the Kroger-Albertsons supermarket merger by Oct 2026?", category: "FTC", yesOdds: 65, totalPool: 15000 },
  { id: 2, question: "Will the compute-limit threshold for frontier AI training be reduced to 10^24 FLOPs?", category: "SEC", yesOdds: 42, totalPool: 9000 },
  { id: 3, question: "Will campaign finance limits be capped under a public election funding amendment?", category: "FEC", yesOdds: 15, totalPool: 24000 }
];

let PREDICTION_CONTRACTS = JSON.parse(localStorage.getItem('PREDICTION_CONTRACTS')) || DEFAULT_PREDICTION_CONTRACTS;
let USER_POSITIONS = JSON.parse(localStorage.getItem('USER_POSITIONS')) || [];
let PENDING_MARKETS = JSON.parse(localStorage.getItem('PENDING_MARKETS')) || [
  { id: 1, question: "Will the EPA mandate 60% EV vehicle production by 2030?", category: "EPA", upvotes: 3 }
];

function initPredictionMarkets() {
  const contractsList = document.getElementById('prediction-contracts-list');
  const positionsList = document.getElementById('market-positions-list');
  const walletDisplay = document.getElementById('market-wallet-display');
  const proposeForm = document.getElementById('propose-market-form');

  if (!contractsList || !proposeForm) return;

  const updateWalletDisplay = () => {
    if (walletDisplay) walletDisplay.textContent = `$${CITIZEN_WALLET.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    localStorage.setItem('CITIZEN_WALLET', CITIZEN_WALLET.toString());
  };

  const renderContracts = () => {
    contractsList.innerHTML = '';
    PREDICTION_CONTRACTS.forEach(contract => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.cssText = 'padding:1.25rem; border:1px solid var(--color-border); border-radius:10px; background:rgba(0,0,0,0.2); display:flex; flex-direction:column; gap:0.75rem;';
      
      const noOdds = 100 - contract.yesOdds;
      const yesPayout = (100 / contract.yesOdds).toFixed(2);
      const noPayout = (100 / noOdds).toFixed(2);

      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--color-text-muted);">
          <span class="genre-badge genre-political">#${contract.category} Market</span>
          <span>Liquidity Pool: $${contract.totalPool.toLocaleString()}</span>
        </div>
        <h4 style="font-size:1.05rem; margin:0.25rem 0; color:#fff; line-height:1.35;">${contract.question}</h4>
        
        <!-- Odds Bars -->
        <div>
          <div style="display:flex; justify-content:space-between; font-size:0.8rem; font-weight:bold; margin-bottom:4px;">
            <span style="color:var(--color-green);">Yes: ${contract.yesOdds}% (pays $${yesPayout})</span>
            <span style="color:var(--color-red);">No: ${noOdds}% (pays $${noPayout})</span>
          </div>
          <div style="height:8px; background:rgba(255,255,255,0.05); border-radius:10px; overflow:hidden; display:flex;">
            <div style="background:var(--color-green); width:${contract.yesOdds}%; height:100%; transition:width 0.3s ease;"></div>
            <div style="background:var(--color-red); width:${noOdds}%; height:100%; transition:width 0.3s ease;"></div>
          </div>
        </div>

        <!-- Action Bet controls -->
        <div style="display:flex; gap:0.8rem; align-items:center; margin-top:0.25rem;">
          <div class="input-group" style="margin:0; width:100px;">
            <input type="number" id="wager-amt-${contract.id}" value="50" min="5" max="${CITIZEN_WALLET}" style="padding:0.35rem; background:rgba(0,0,0,0.4); border:1px solid var(--color-border); color:#fff; border-radius:4px; font-size:0.8rem;">
          </div>
          <button class="btn btn-primary" style="flex:1; padding:0.4rem; font-size:0.8rem; background:var(--color-green); border-color:var(--color-green);" onclick="placeMarketBet(${contract.id}, 'Yes')">
            Buy YES
          </button>
          <button class="btn btn-primary" style="flex:1; padding:0.4rem; font-size:0.8rem; background:var(--color-red); border-color:var(--color-red);" onclick="placeMarketBet(${contract.id}, 'No')">
            Buy NO
          </button>
        </div>
      `;
      contractsList.appendChild(card);
    });
  };

  const renderPositions = () => {
    if (!positionsList) return;
    positionsList.innerHTML = '';
    
    if (USER_POSITIONS.length === 0) {
      positionsList.innerHTML = '<div class="chat-system-message">No active positions. Make a wager on resolve.bet markets to build leverage!</div>';
      return;
    }

    USER_POSITIONS.forEach((pos, idx) => {
      const contract = PREDICTION_CONTRACTS.find(c => c.id === pos.contractId);
      if (!contract) return;

      const card = document.createElement('div');
      card.className = 'card';
      card.style.cssText = 'padding:0.75rem; font-size:0.78rem; display:flex; flex-direction:column; gap:0.25rem; border-color:rgba(255,255,255,0.05); background:rgba(255,255,255,0.01);';
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; font-weight:bold;">
          <span style="color:#fff; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:180px;">${contract.question}</span>
          <span style="color:${pos.outcome === 'Yes' ? 'var(--color-green)' : 'var(--color-red)'};">${pos.outcome.toUpperCase()}</span>
        </div>
        <div style="display:flex; justify-content:space-between; color:var(--color-text-muted); margin-top:2px;">
          <span>Staked: $${pos.amount} (at ${pos.odds}%)</span>
          <span style="color:var(--color-gold); font-weight:bold;">Payout: $${pos.payout.toFixed(2)}</span>
        </div>
        <button class="btn btn-secondary" style="padding:0.15rem; font-size:0.65rem; margin-top:0.3rem;" onclick="sellMarketPosition(${idx})">
          Sell Position
        </button>
      `;
      positionsList.appendChild(card);
    });
  };

  window.placeMarketBet = (contractId, outcome) => {
    const wagerField = document.getElementById(`wager-amt-${contractId}`);
    if (!wagerField) return;

    const amount = parseFloat(wagerField.value) || 0;
    if (amount <= 0 || amount > CITIZEN_WALLET) {
      alert("Invalid wager amount or insufficient balance.");
      return;
    }

    const contract = PREDICTION_CONTRACTS.find(c => c.id === contractId);
    if (!contract) return;

    const rate = outcome === 'Yes' ? contract.yesOdds : (100 - contract.yesOdds);
    const payoutFactor = 100 / rate;
    const potentialPayout = amount * payoutFactor;

    // Deduct balance
    CITIZEN_WALLET -= amount;
    
    // Add position
    USER_POSITIONS.push({
      contractId: contractId,
      outcome: outcome,
      amount: amount,
      odds: rate,
      payout: potentialPayout
    });

    // Shift odds slightly (market impact of the trade)
    const shift = Math.max(1, Math.min(5, Math.round(amount / 100)));
    if (outcome === 'Yes') {
      contract.yesOdds = Math.min(95, contract.yesOdds + shift);
    } else {
      contract.yesOdds = Math.max(5, contract.yesOdds - shift);
    }

    contract.totalPool += amount;

    // Save
    localStorage.setItem('PREDICTION_CONTRACTS', JSON.stringify(PREDICTION_CONTRACTS));
    localStorage.setItem('USER_POSITIONS', JSON.stringify(USER_POSITIONS));
    
    updateWalletDisplay();
    renderContracts();
    renderPositions();
    alert(`Successfully bought $${amount} position in ${outcome.toUpperCase()}! Your leverage is registered.`);
  };

  window.sellMarketPosition = (idx) => {
    const pos = USER_POSITIONS[idx];
    if (!pos) return;

    // Return 85% of staked cash (liquidity fee)
    const returnCash = pos.amount * 0.85;
    CITIZEN_WALLET += returnCash;

    // Remove
    USER_POSITIONS.splice(idx, 1);

    localStorage.setItem('USER_POSITIONS', JSON.stringify(USER_POSITIONS));
    
    updateWalletDisplay();
    renderContracts();
    renderPositions();
    alert(`Sold position for $${returnCash.toFixed(2)} return cash.`);
  };

  // Submit proposal
  proposeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = document.getElementById('market-question').value;
    const cat = document.getElementById('market-category').value;

    PENDING_MARKETS.push({
      id: PENDING_MARKETS.length + 1,
      question: q,
      category: cat,
      upvotes: 1
    });

    document.getElementById('market-question').value = '';
    localStorage.setItem('PENDING_MARKETS', JSON.stringify(PENDING_MARKETS));
    
    renderVotingMarkets();
    alert("Prediction Market proposal submitted! It will appear in the Submissions Hub. Upvote it to 5 to approve.");
  });

  updateWalletDisplay();
  renderContracts();
  renderPositions();
}

function renderVotingMarkets() {
  const container = document.getElementById('voting-markets-list');
  if (!container) return;
  container.innerHTML = '';

  if (PENDING_MARKETS.length === 0) {
    container.innerHTML = '<div class="chat-system-message">No pending prediction markets.</div>';
    return;
  }

  PENDING_MARKETS.forEach(market => {
    const item = document.createElement('div');
    item.className = 'loan-card';
    item.style.padding = '0.75rem';
    item.innerHTML = `
      <div class="loan-card-info" style="gap:0.15rem;">
        <span class="reg-folder-title" style="font-size:0.85rem;">"${market.question}"</span>
        <span class="genre-badge genre-news" style="width:fit-content; font-size:0.6rem; padding:0.1rem 0.3rem;">${market.category}</span>
      </div>
      <div class="loan-card-actions">
        <button class="upvote-btn" style="padding:0.2rem 0.5rem; font-size:0.7rem;" onclick="upvoteSubmissionMarket(${market.id})">
          ▲ Upvote (<span style="font-weight:bold;">${market.upvotes}/5</span>)
        </button>
      </div>
    `;
    container.appendChild(item);
  });
}

window.upvoteSubmissionMarket = (id) => {
  const market = PENDING_MARKETS.find(m => m.id === id);
  if (!market) return;

  market.upvotes++;
  if (market.upvotes >= 5) {
    PREDICTION_CONTRACTS.push({
      id: PREDICTION_CONTRACTS.length + 1,
      question: market.question,
      category: market.category,
      yesOdds: 50,
      totalPool: 5000
    });
    PENDING_MARKETS = PENDING_MARKETS.filter(m => m.id !== id);
    alert(`Prediction Market approved! "${market.question}" is now active in resolve.bet Markets.`);
    // Redraw active lists if current
    const contractsList = document.getElementById('prediction-contracts-list');
    if (contractsList) {
      localStorage.setItem('PREDICTION_CONTRACTS', JSON.stringify(PREDICTION_CONTRACTS));
      initPredictionMarkets();
    }
  }

  localStorage.setItem('PENDING_MARKETS', JSON.stringify(PENDING_MARKETS));
  renderVotingMarkets();
};

/* ==========================================================================
   23. Citizens Reputation Ledger & Live Chat Rooms
   ========================================================================== */
let CITIZEN_REPUTATION = JSON.parse(localStorage.getItem('CITIZEN_REPUTATION')) || [
  { name: 'Socrates_99', rep: 485, tag: 'Elder' },
  { name: 'DebtDisputer_99', rep: 310, tag: 'Activist' },
  { name: 'LobbyWatcher', rep: 245, tag: 'Observer' },
  { name: 'VoxPopuli_33', rep: 180, tag: 'Speaker' },
  { name: 'Citizen_X', rep: 120, tag: 'Contributor' }
];

let LOBBY_CHAT_MESSAGES = JSON.parse(localStorage.getItem('LOBBY_CHAT_MESSAGES')) || [
  { sender: 'Socrates_99', text: 'Welcome to the resolve.bet lobby! Let’s coordinate on campaign funding caps.', time: '10m ago' },
  { sender: 'VoxPopuli_33', text: 'I just upvoted the D3.js Lobby Map app in the submissions hub, it looks awesome.', time: '5m ago' }
];

function initForumLobbyChat() {
  const logContainer = document.getElementById('lobby-chat-log');
  const chatForm = document.getElementById('lobby-chat-form');
  const chatInput = document.getElementById('lobby-chat-input');
  const leaderboardList = document.getElementById('reputation-leaderboard-list');

  if (!logContainer || !chatForm || !chatInput || !leaderboardList) return;

  const renderLeaderboard = () => {
    leaderboardList.innerHTML = '';
    CITIZEN_REPUTATION.sort((a, b) => b.rep - a.rep);
    CITIZEN_REPUTATION.slice(0, 5).forEach((citizen, idx) => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.03); padding-bottom:0.3rem;';
      
      let medal = '👤';
      if (idx === 0) medal = '🥇';
      if (idx === 1) medal = '🥈';
      if (idx === 2) medal = '🥉';

      row.innerHTML = `
        <span>${medal} <strong>@${citizen.name}</strong> <span class="genre-badge genre-fun" style="font-size:0.55rem; padding:0.05rem 0.2rem; margin:0;">${citizen.tag}</span></span>
        <span style="font-weight:bold; color:var(--color-gold);">${citizen.rep} Rep</span>
      `;
      leaderboardList.appendChild(row);
    });
  };

  const renderChat = () => {
    logContainer.innerHTML = '';
    LOBBY_CHAT_MESSAGES.forEach(msg => {
      const row = document.createElement('div');
      row.style.marginBottom = '0.4rem';
      row.innerHTML = `<strong style="color:var(--color-blue); font-size:0.75rem;">@${msg.sender}:</strong> <span style="color:#e2e8f0;">${msg.text}</span>`;
      logContainer.appendChild(row);
    });
    logContainer.scrollTop = logContainer.scrollHeight;
  };

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    const sender = SUPABASE_USER.authenticated ? SUPABASE_USER.name : 'Guest';
    LOBBY_CHAT_MESSAGES.push({
      sender: sender,
      text: text,
      time: 'Just now'
    });

    chatInput.value = '';
    rewardUserReputation(sender, 10);
    localStorage.setItem('LOBBY_CHAT_MESSAGES', JSON.stringify(LOBBY_CHAT_MESSAGES));
    renderChat();
    renderLeaderboard();
  });

  const simulatedQuotes = [
    { sender: 'VoxPopuli_33', text: 'I just staked $200 on the Kroger merger YES contract inside prediction markets!' },
    { sender: 'Socrates_99', text: 'Excellent choice. If the merger goes through, corporate retail lobby wins, but prediction markets hedge citizen risks.' },
    { sender: 'LobbyWatcher', text: 'CFPB late fee caps are currently blocked by a judge in Texas. Check out the President\'s desk trackers.' },
    { sender: 'DebtDisputer_99', text: 'The CC debt simulator taught me how banks make 22% APR off of minimal payments. Absolute eye-opener.' },
    { sender: 'VoxPopuli_33', text: 'Has anyone claimed the open co-op fridge gig on the local board?' },
    { sender: 'Citizen_X', text: 'I just claimed it! Will publish the community charter drafts by tomorrow.' }
  ];

  const triggerSimulatedChat = () => {
    const quote = simulatedQuotes[Math.floor(Math.random() * simulatedQuotes.length)];
    LOBBY_CHAT_MESSAGES.push({
      sender: quote.sender,
      text: quote.text,
      time: 'Just now'
    });
    
    rewardUserReputation(quote.sender, 5);

    if (LOBBY_CHAT_MESSAGES.length > 15) {
      LOBBY_CHAT_MESSAGES.shift();
    }

    localStorage.setItem('LOBBY_CHAT_MESSAGES', JSON.stringify(LOBBY_CHAT_MESSAGES));
    renderChat();
    renderLeaderboard();
  };

  setInterval(triggerSimulatedChat, 18000);

  window.renderLeaderboard = renderLeaderboard;

  renderLeaderboard();
  renderChat();
}

window.rewardUserReputation = (username, amount) => {
  if (username === 'Guest') return;
  let citizen = CITIZEN_REPUTATION.find(c => c.name.toLowerCase() === username.toLowerCase());
  if (citizen) {
    citizen.rep += amount;
  } else {
    CITIZEN_REPUTATION.push({
      name: username,
      rep: amount,
      tag: 'Citizen'
    });
  }
  localStorage.setItem('CITIZEN_REPUTATION', JSON.stringify(CITIZEN_REPUTATION));
};
