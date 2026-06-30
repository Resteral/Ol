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
  const subButtons = document.querySelectorAll('.subtab-btn');
  const subContents = document.querySelectorAll('.subtab-content');

  subButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSubTab = btn.getAttribute('data-subtab');

      subButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      subContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `subtab-${targetSubTab}`) {
          content.classList.add('active');
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

  if (!btnMatch || !btnDisconnect) return;

  const startCamera = async () => {
    try {
      localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      localVideo.srcObject = localStream;
      localOverlay.style.opacity = '0';
      setTimeout(() => localOverlay.classList.add('hidden'), 300);
    } catch (err) {
      console.warn("Webcam access denied or unavailable. Using placeholder.", err);
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

    chatBox.innerHTML = '<div class="chat-system-message">Audience joined. Live stream connected.</div>';
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
   8. Unfiltered News Feed Hub
   ========================================================================== */
const NEWS_ARTICLES = [
  {
    source: 'OpenSecrets.org Lobbying Database',
    date: 'June 29, 2026',
    title: 'US Lobbying Expenditures Reach Record $5.24 Billion in Surge of Corporate Spending',
    excerpt: 'Federal lobbying spending broke records in 2025, marking an unprecedented 17% year-over-year increase. Tech conglomerates (Meta, Coinbase) and pharmaceutical lobbies lead advocacy spending in preparation for the 2026 elections.'
  },
  {
    source: 'Pew Research Center Economic Analysis',
    date: 'June 28, 2026',
    title: 'Racial Wealth Gaps in the United States Expand by $50,000 in Recent Cycles',
    excerpt: 'Analysis of the Survey of Consumer Finances shows median wealth gaps between White households and Black/Hispanic counterparts continue to widen, driven primarily by systemic gaps in workplace retirement plan assets.'
  },
  {
    source: 'Pew Research Center Income Studies',
    date: 'June 25, 2026',
    title: 'The American Middle Class Shrinks from 61% to 51% as Upper Income Tier Captures Gains',
    excerpt: 'Long-term income data reveals structural compression of the middle class since the 1970s. The proportion of households in the upper-income bracket has outgrown lower tiers, leading to a highly top-heavy wealth curve.'
  },
  {
    source: 'Federal Election Commission (FEC) Filings',
    date: 'June 20, 2026',
    title: 'Dark Money Spending Outpaces Public Campaigns as 501(c)(4) Outlays Escalate',
    excerpt: 'Independent expenditures from groups that hide their primary funding sources have reached new peaks. Campaign ad tracking shows corporate-backed dark money groups dominant in local legislative districts.'
  }
];

function initNewsHub() {
  const newsContainer = document.getElementById('news-container');
  if (!newsContainer) return;

  newsContainer.innerHTML = '';
  NEWS_ARTICLES.forEach(art => {
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
    ]
  }
};

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
}
