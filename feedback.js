/**
 * PitchArena - Captain Feedback & Player Reviews Logic
 * Handles interactive rating selectors, localStorage review persistence,
 * search/filter controls, helpful upvoting, and reward voucher modal.
 */

// Seed initial reviews dataset
const initialReviews = [
  {
    id: 'rev-1',
    captainName: 'Vikramaditya Kulkarni',
    teamName: 'Warriors Cricket Club',
    role: 'Captain',
    groundId: 'the-oval',
    groundName: 'The Oval Championship Stadium',
    category: 'full',
    format: 'Leather Ball 40 Overs',
    rating: 5,
    pitchRating: 5,
    lightsRating: 5,
    pavilionRating: 5,
    staffRating: 5,
    matchDate: '2026-09-28',
    verified: true,
    bookingId: 'CRIC-849201',
    title: 'True Ranji Trophy bounce on red soil & fantastic floodlights',
    comment: 'We played a competitive 40-over match starting at 3 PM and going into the night. The pitch bounce was remarkably true—fast bowlers got genuine carry through to the keeper, and batsmen who played with straight bats scored freely. The LED stadium floodlights eliminate all shadow blindspots. Highly recommended!',
    tags: ['True Bounce', 'Even Lighting', 'AC Dugout', 'CricHeroes Scoring'],
    recommend: 'yes',
    helpfulCount: 38,
    curatorReply: 'Thank you Captain Vikramaditya! We rolled pitch #3 with our heavy 2.5-ton hydraulic roller ahead of your fixture. Delighted your seamers enjoyed the carry!',
    dateSubmitted: '3 days ago'
  },
  {
    id: 'rev-2',
    captainName: 'Rohan Agrawal',
    teamName: 'TechCorp Mavericks',
    role: 'Sports Committee Lead',
    groundId: 'thunderbox',
    groundName: 'ThunderBox 24/7 Turf',
    category: 'box',
    format: 'Corporate Box League (8v8)',
    rating: 5,
    pitchRating: 5,
    lightsRating: 5,
    pavilionRating: 4,
    staffRating: 5,
    matchDate: '2026-10-02',
    verified: true,
    bookingId: 'CRIC-519302',
    title: 'Best midnight box cricket arena in the city! 4K live stream rocked',
    comment: 'Organized an inter-department tournament for 8 teams from 8 PM to 1 AM. The monofilament grass turf has zero knee burn and great grip. The automated YouTube live stream was crystal clear, and our remote colleagues tuned in with live chat. Cold beverages were well stocked.',
    tags: ['Fast Turf Grip', 'YouTube Stream', 'Music System', 'Midnight Play'],
    recommend: 'yes',
    helpfulCount: 29,
    curatorReply: 'Appreciate the feedback Rohan! We have just upgraded the sound system so your next office derby is even louder!',
    dateSubmitted: '5 days ago'
  },
  {
    id: 'rev-3',
    captainName: 'Sunil Nambiar',
    teamName: 'Strike Cricket Academy',
    role: 'Head Coach',
    groundId: 'speedpro',
    groundName: 'SpeedPro Batting Nets & RoboArm',
    category: 'nets',
    format: 'RoboArm & Pace Drills',
    rating: 5,
    pitchRating: 5,
    lightsRating: 4,
    pavilionRating: 5,
    staffRating: 5,
    matchDate: '2026-10-04',
    verified: true,
    bookingId: 'CRIC-394820',
    title: 'Digital bowling machine calibrated up to 142 km/h flawlessly',
    comment: 'Brought 4 top-order batsmen for technical training against 140 km/h outswingers. The BOLA machine was calibrated accurately by the ground technician. The slow-motion replay camera option helped us spot grip flaws immediately. Excellent coaching facility.',
    tags: ['Bowling Machine', 'Slow-Mo Video', 'Safe Netting', 'Kit Storage'],
    recommend: 'yes',
    helpfulCount: 22,
    curatorReply: 'Honored to host the Strike Academy squad, Coach Sunil! We have added new Kookaburra dimple balls in bay 2 for your next session.',
    dateSubmitted: '1 week ago'
  },
  {
    id: 'rev-4',
    captainName: 'Arjun Shekhawat',
    teamName: 'Royal Challengers Amateurs',
    role: 'Vice Captain',
    groundId: 'lords-meadow',
    groundName: "Lord's Meadow Match Stadium",
    category: 'full',
    format: 'T20 Leather Ball Derby',
    rating: 5,
    pitchRating: 5,
    lightsRating: 5,
    pavilionRating: 5,
    staffRating: 5,
    matchDate: '2026-09-22',
    verified: true,
    bookingId: 'CRIC-772109',
    title: 'Black cotton soil pitch played like a dream under 650 Lux lights',
    comment: 'A true 70-meter boundary international experience. 200 runs were scored in each innings! The outfield was like a billiards table. The umpires provided were official state panel and handled contentious LBW decisions with total composure.',
    tags: ['Black Soil Pitch', 'Certified Umpires', 'VIP Pavilion', 'Ample Parking'],
    recommend: 'yes',
    helpfulCount: 31,
    curatorReply: 'Fantastic game Arjun! That 19th over finish was watched live by over 400 viewers on our stream channel.',
    dateSubmitted: '2 weeks ago'
  },
  {
    id: 'rev-5',
    captainName: 'Karthik Raman',
    teamName: 'HedgeFund Strikers',
    role: 'Captain',
    groundId: 'the-oval',
    groundName: 'The Oval Championship Stadium',
    category: 'full',
    format: 'Corporate Weekend Cup',
    rating: 4,
    pitchRating: 4,
    lightsRating: 5,
    pavilionRating: 4,
    staffRating: 5,
    matchDate: '2026-09-18',
    verified: true,
    bookingId: 'CRIC-621804',
    title: 'Superb ground and pavilions, showers and AC rooms are clean',
    comment: 'Played in the afternoon heat and the AC dressing rooms were a lifesaver between innings. Clean hot-water showers and fresh towels available. Would love if they could add an extra scorer screen on the southern pavilion side.',
    tags: ['AC Dugout', 'Clean Washrooms', 'Hot Showers', 'Great Outfield'],
    recommend: 'yes',
    helpfulCount: 17,
    curatorReply: 'Great suggestion Karthik! We have already approved an auxiliary LED scoreboard on the Southern Pavilion for November matches.',
    dateSubmitted: '3 weeks ago'
  }
];

// Feedback Form State
const feedbackState = {
  overallRating: 5,
  pitchRating: 5,
  lightsRating: 5,
  pavilionRating: 5,
  staffRating: 5,
  selectedGround: 'the-oval',
  selectedGroundName: 'The Oval Championship Stadium',
  selectedCategory: 'full',
  selectedTags: new Set(['True Bounce', 'Even Lighting', 'AC Dugout']),
  recommendChoice: 'yes'
};

const ratingLabels = {
  1: '🏏 1/5 - Needs Significant Improvement',
  2: '🏏 2/5 - Below PitchArena Standards',
  3: '🏏 3/5 - Good Match Experience',
  4: '🏏 4/5 - Excellent! Very Well Curated',
  5: '🏏 5/5 - Sensational! International Grade'
};

// Ground Category Mapping
const groundsMeta = {
  'the-oval': { name: 'The Oval Championship Stadium', category: 'full' },
  'thunderbox': { name: 'ThunderBox 24/7 Turf', category: 'box' },
  'speedpro': { name: 'SpeedPro Batting Nets & RoboArm', category: 'nets' },
  'lords-meadow': { name: "Lord's Meadow Match Stadium", category: 'full' }
};

// Active Reviews Collection
let allReviews = [];
let activeCategoryFilter = 'all';
let searchQuery = '';
let currentSort = 'newest';

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
  loadReviews();
  initOverallStarSelector();
  initDimensionStarSelectors();
  initGroundOptions();
  initTagChips();
  initRecommendationButtons();
  initFilterTabs();
  initSearchAndSort();
  initMobileMenu();
  renderScorecardStats();
  renderReviewsList();
});

// Load reviews from localStorage or initialize with seed data
function loadReviews() {
  try {
    const saved = localStorage.getItem('pitcharena_reviews');
    if (saved) {
      allReviews = JSON.parse(saved);
    } else {
      allReviews = [...initialReviews];
      localStorage.setItem('pitcharena_reviews', JSON.stringify(allReviews));
    }
  } catch (e) {
    allReviews = [...initialReviews];
  }
}

// Save reviews to localStorage
function saveReviews() {
  try {
    localStorage.setItem('pitcharena_reviews', JSON.stringify(allReviews));
  } catch (e) {
    console.error('Failed to save reviews to localStorage', e);
  }
}

// Initialize Interactive Overall Star Rating
function initOverallStarSelector() {
  const starBtns = document.querySelectorAll('#overallStars .star-btn');
  const statusText = document.getElementById('overallRatingStatus');

  starBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      const val = parseInt(btn.dataset.value);
      highlightStars('#overallStars .star-btn', val);
      if (statusText) statusText.textContent = ratingLabels[val];
    });

    btn.addEventListener('mouseleave', () => {
      highlightStars('#overallStars .star-btn', feedbackState.overallRating);
      if (statusText) statusText.textContent = ratingLabels[feedbackState.overallRating];
    });

    btn.addEventListener('click', () => {
      const val = parseInt(btn.dataset.value);
      feedbackState.overallRating = val;
      highlightStars('#overallStars .star-btn', val);
      if (statusText) statusText.textContent = ratingLabels[val];
    });
  });

  // Initial display
  highlightStars('#overallStars .star-btn', feedbackState.overallRating);
  if (statusText) statusText.textContent = ratingLabels[feedbackState.overallRating];
}

function highlightStars(selector, count) {
  const stars = document.querySelectorAll(selector);
  stars.forEach(star => {
    const val = parseInt(star.dataset.value);
    if (val <= count) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

// Initialize Dimension Stars (Pitch, Lights, Pavilion, Staff)
function initDimensionStarSelectors() {
  const dimensions = [
    { id: 'pitchStars', key: 'pitchRating' },
    { id: 'lightsStars', key: 'lightsRating' },
    { id: 'pavilionStars', key: 'pavilionRating' },
    { id: 'staffStars', key: 'staffRating' }
  ];

  dimensions.forEach(dim => {
    const container = document.getElementById(dim.id);
    if (!container) return;

    const stars = container.querySelectorAll('.dim-star-btn');
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const val = parseInt(star.dataset.value);
        feedbackState[dim.key] = val;
        stars.forEach(s => {
          const sVal = parseInt(s.dataset.value);
          if (sVal <= val) {
            s.classList.add('active');
          } else {
            s.classList.remove('active');
          }
        });
      });
    });

    // Initial highlight
    stars.forEach(s => {
      const sVal = parseInt(s.dataset.value);
      if (sVal <= feedbackState[dim.key]) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
  });
}

// Ground Option Selection Cards
function initGroundOptions() {
  const cards = document.querySelectorAll('.ground-option-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const groundId = card.dataset.ground;
      feedbackState.selectedGround = groundId;
      feedbackState.selectedGroundName = groundsMeta[groundId].name;
      feedbackState.selectedCategory = groundsMeta[groundId].category;

      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });
}

// Tag Chips Multi-select
function initTagChips() {
  const chips = document.querySelectorAll('.tag-chip');
  chips.forEach(chip => {
    // Initial state check
    const tag = chip.dataset.tag;
    if (feedbackState.selectedTags.has(tag)) {
      chip.classList.add('selected');
    }

    chip.addEventListener('click', () => {
      if (feedbackState.selectedTags.has(tag)) {
        feedbackState.selectedTags.delete(tag);
        chip.classList.remove('selected');
      } else {
        feedbackState.selectedTags.add(tag);
        chip.classList.add('selected');
      }
    });
  });
}

// Recommendation Buttons (Yes / Probably / Needs Work)
function initRecommendationButtons() {
  const btns = document.querySelectorAll('.rec-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      feedbackState.recommendChoice = btn.dataset.choice;
    });
  });
}

// Category Filter Tabs
function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategoryFilter = tab.dataset.filter;
      renderReviewsList();
    });
  });
}

// Search and Sort controls
function initSearchAndSort() {
  const searchInput = document.getElementById('reviewSearchInput');
  const sortSelect = document.getElementById('reviewSortSelect');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderReviewsList();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderReviewsList();
    });
  }
}

// Mobile Menu Navigation Toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}

// Render dynamic scorecard statistics
function renderScorecardStats() {
  if (allReviews.length === 0) return;

  const total = allReviews.length;
  const avg = (allReviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1);
  const fiveStars = allReviews.filter(r => r.rating === 5).length;
  const fourStars = allReviews.filter(r => r.rating === 4).length;
  const threeStars = allReviews.filter(r => r.rating === 3).length;
  const twoStars = allReviews.filter(r => r.rating === 2).length;
  const oneStars = allReviews.filter(r => r.rating === 1).length;

  const fivePct = Math.round((fiveStars / total) * 100);
  const fourPct = Math.round((fourStars / total) * 100);
  const threePct = Math.round((threeStars / total) * 100);
  const twoPct = Math.round((twoStars / total) * 100);
  const onePct = Math.round((oneStars / total) * 100);

  // Update big number
  const bigNum = document.getElementById('scorecardAvgRating');
  if (bigNum) bigNum.textContent = avg;

  const countElem = document.getElementById('scorecardReviewCount');
  if (countElem) countElem.textContent = `Based on ${total} verified captain reviews`;

  // Update progress bars
  setBarValue('bar5Star', 'pct5Star', fivePct);
  setBarValue('bar4Star', 'pct4Star', fourPct);
  setBarValue('bar3Star', 'pct3Star', threePct);
  setBarValue('bar2Star', 'pct2Star', twoPct);
  setBarValue('bar1Star', 'pct1Star', onePct);

  // Compute Dimension Averages
  const pitchAvg = (allReviews.reduce((sum, r) => sum + (r.pitchRating || 5), 0) / total).toFixed(1);
  const lightsAvg = (allReviews.reduce((sum, r) => sum + (r.lightsRating || 5), 0) / total).toFixed(1);
  const pavilionAvg = (allReviews.reduce((sum, r) => sum + (r.pavilionRating || 5), 0) / total).toFixed(1);
  const staffAvg = (allReviews.reduce((sum, r) => sum + (r.staffRating || 5), 0) / total).toFixed(1);

  setElemText('statPitchScore', `${pitchAvg} / 5.0`);
  setElemText('statLightsScore', `${lightsAvg} / 5.0`);
  setElemText('statPavilionScore', `${pavilionAvg} / 5.0`);
  setElemText('statStaffScore', `${staffAvg} / 5.0`);
}

function setBarValue(barId, pctId, pct) {
  const bar = document.getElementById(barId);
  const pctText = document.getElementById(pctId);
  if (bar) bar.style.width = `${pct}%`;
  if (pctText) pctText.textContent = `${pct}%`;
}

function setElemText(id, text) {
  const elem = document.getElementById(id);
  if (elem) elem.textContent = text;
}

// Render filtered and sorted review cards
function renderReviewsList() {
  const container = document.getElementById('reviewsMasonryGrid');
  if (!container) return;

  // Filter
  let filtered = allReviews.filter(rev => {
    // Category Filter
    if (activeCategoryFilter === '5star') {
      if (rev.rating !== 5) return false;
    } else if (activeCategoryFilter !== 'all') {
      if (rev.category !== activeCategoryFilter) return false;
    }

    // Search Query Filter
    if (searchQuery) {
      const matchText = `${rev.captainName} ${rev.teamName} ${rev.title} ${rev.comment} ${rev.groundName} ${rev.tags.join(' ')}`.toLowerCase();
      if (!matchText.includes(searchQuery)) return false;
    }

    return true;
  });

  // Sort
  if (currentSort === 'newest') {
    // Keep array order as newest are prepended
  } else if (currentSort === 'highest') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (currentSort === 'helpful') {
    filtered.sort((a, b) => (b.helpfulCount || 0) - (a.helpfulCount || 0));
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-card); border: 1px dashed var(--border-glass); border-radius: var(--radius-md);">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 2.2rem; color: var(--accent-neon); margin-bottom: 12px; display: block;"></i>
        <h3 style="font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 8px;">No Reviews Found</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">Try clearing your search term or selecting a different category tab.</p>
        <button class="btn btn-outline" style="margin-top: 16px;" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  const votedIds = getVotedReviewIds();

  container.innerHTML = filtered.map(rev => {
    const initials = rev.captainName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const isVoted = votedIds.includes(rev.id);
    const categoryBadgeClass = rev.category === 'box' ? 'box' : rev.category === 'nets' ? 'nets' : '';

    const starsHtml = Array.from({ length: 5 }, (_, i) => {
      return i < rev.rating
        ? '<i class="fa-solid fa-star" style="color: var(--accent-gold);"></i>'
        : '<i class="fa-regular fa-star" style="color: rgba(255,255,255,0.2);"></i>';
    }).join('');

    const tagsHtml = (rev.tags || []).map(t => `<span class="review-tag-mini">${t}</span>`).join('');

    const replyHtml = rev.curatorReply ? `
      <div class="staff-response-box">
        <div class="staff-resp-head">
          <i class="fa-solid fa-shield-halved"></i>
          <span>PitchArena Ground Curator Response</span>
        </div>
        <p class="staff-resp-text">${rev.curatorReply}</p>
      </div>
    ` : '';

    return `
      <div class="review-item-card ${rev.isNew ? 'just-added' : ''}" id="card-${rev.id}">
        <div>
          <div class="review-top-bar">
            <div class="ground-badge ${categoryBadgeClass}">
              <i class="fa-solid fa-cricket-bat-ball"></i> ${rev.groundName.split(' ')[0]} ${rev.groundName.split(' ')[1] || ''}
            </div>
            ${rev.verified ? `
              <div class="verified-tag">
                <i class="fa-solid fa-circle-check"></i> Verified Match
              </div>
            ` : ''}
          </div>

          <div class="review-stars" style="margin-bottom: 8px;">
            ${starsHtml}
            <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: 6px;">${rev.format || 'Match'}</span>
          </div>

          <h3 class="review-title-text">${rev.title}</h3>
          <p class="review-body-text">"${rev.comment}"</p>

          ${tagsHtml ? `<div class="review-card-tags">${tagsHtml}</div>` : ''}
          ${replyHtml}
        </div>

        <div class="review-footer-bar">
          <div class="reviewer-profile">
            <div class="reviewer-avatar-circle">${initials}</div>
            <div>
              <div class="reviewer-info-name">${rev.captainName}</div>
              <div class="reviewer-info-team">${rev.teamName} &bull; ${rev.dateSubmitted}</div>
            </div>
          </div>

          <button class="review-helpful-action ${isVoted ? 'voted' : ''}" onclick="voteHelpful('${rev.id}', this)" ${isVoted ? 'disabled' : ''}>
            <i class="fa-solid fa-thumbs-up"></i>
            <span>${rev.helpfulCount || 0}</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Reset filter state
function resetFilters() {
  searchQuery = '';
  const searchInput = document.getElementById('reviewSearchInput');
  if (searchInput) searchInput.value = '';

  activeCategoryFilter = 'all';
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(t => {
    t.classList.toggle('active', t.dataset.filter === 'all');
  });

  renderReviewsList();
}

// Upvote / Helpful Button Logic
function voteHelpful(reviewId, buttonElement) {
  const votedIds = getVotedReviewIds();
  if (votedIds.includes(reviewId)) return;

  const review = allReviews.find(r => r.id === reviewId);
  if (!review) return;

  review.helpfulCount = (review.helpfulCount || 0) + 1;
  votedIds.push(reviewId);

  try {
    localStorage.setItem('pitcharena_voted_reviews', JSON.stringify(votedIds));
    saveReviews();
  } catch (e) {
    console.error(e);
  }

  buttonElement.classList.add('voted');
  buttonElement.disabled = true;
  const countSpan = buttonElement.querySelector('span');
  if (countSpan) countSpan.textContent = review.helpfulCount;

  showToast('Marked as helpful! Thank you for supporting the cricket community.');
}

function getVotedReviewIds() {
  try {
    const data = localStorage.getItem('pitcharena_voted_reviews');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

// Submit Captain Feedback Form
function submitCaptainFeedback(event) {
  event.preventDefault();

  const captainName = document.getElementById('feedbackName').value.trim();
  const teamName = document.getElementById('feedbackTeam').value.trim();
  const role = document.getElementById('feedbackRole').value;
  const matchDate = document.getElementById('feedbackMatchDate').value;
  const bookingId = document.getElementById('feedbackBookingId').value.trim();
  const format = document.getElementById('feedbackFormat').value;
  const title = document.getElementById('feedbackTitle').value.trim();
  const comment = document.getElementById('feedbackComments').value.trim();
  const emailOrPhone = document.getElementById('feedbackContact').value.trim();

  if (!captainName || !teamName || !title || !comment) {
    showToast('Please fill in all required fields.');
    return;
  }

  // Generate Curator response automated acknowledgment
  let curatorAutoReply = '';
  if (feedbackState.selectedGround === 'the-oval') {
    curatorAutoReply = `Thank you Captain ${captainName}! The Oval curation squad has logged your review. Pitch moisture and evening grass trimming are updated daily.`;
  } else if (feedbackState.selectedGround === 'thunderbox') {
    curatorAutoReply = `Thanks for playing at ThunderBox ${captainName}! Glad your squad enjoyed the turf grip and turf acoustics.`;
  } else if (feedbackState.selectedGround === 'speedpro') {
    curatorAutoReply = `Thanks coach/captain! Our bowling machine sensors are calibrated every morning at 7 AM.`;
  } else {
    curatorAutoReply = `Thank you ${captainName}! Lord's Meadow ground staff thanks team ${teamName} for the sportsman spirit.`;
  }

  const newReview = {
    id: 'rev-' + Date.now(),
    captainName: captainName,
    teamName: teamName,
    role: role,
    groundId: feedbackState.selectedGround,
    groundName: feedbackState.selectedGroundName,
    category: feedbackState.selectedCategory,
    format: format,
    rating: feedbackState.overallRating,
    pitchRating: feedbackState.pitchRating,
    lightsRating: feedbackState.lightsRating,
    pavilionRating: feedbackState.pavilionRating,
    staffRating: feedbackState.staffRating,
    matchDate: matchDate || new Date().toISOString().split('T')[0],
    verified: Boolean(bookingId),
    bookingId: bookingId || 'CRIC-VERIFIED',
    title: title,
    comment: comment,
    tags: Array.from(feedbackState.selectedTags),
    recommend: feedbackState.recommendChoice,
    helpfulCount: 1,
    curatorReply: curatorAutoReply,
    dateSubmitted: 'Just now',
    isNew: true
  };

  // Prepend to reviews
  allReviews.unshift(newReview);
  saveReviews();

  // Reset form
  event.target.reset();

  // Update UI stats and list
  renderScorecardStats();
  renderReviewsList();

  // Show Reward Modal
  openRewardModal(captainName, teamName);

  showToast('🎉 Review published! 10% discount promo unlocked.');

  // Smooth scroll to card after small delay
  setTimeout(() => {
    const card = document.getElementById(`card-${newReview.id}`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 500);
}

// Open Reward Modal
function openRewardModal(captainName, teamName) {
  const modal = document.getElementById('rewardModal');
  const greeting = document.getElementById('rewardCaptainGreeting');
  if (greeting) {
    greeting.textContent = `Thank you Captain ${captainName} (${teamName})!`;
  }
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

// Copy Voucher Code to Clipboard
function copyVoucherCode() {
  const codeText = document.getElementById('promoCodeText').textContent;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(codeText).then(() => {
      onVoucherCopied();
    }).catch(() => {
      fallbackCopy(codeText);
    });
  } else {
    fallbackCopy(codeText);
  }
}

function fallbackCopy(text) {
  const temp = document.createElement('input');
  temp.value = text;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand('copy');
  document.body.removeChild(temp);
  onVoucherCopied();
}

function onVoucherCopied() {
  const btn = document.getElementById('copyVoucherBtn');
  if (btn) {
    btn.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
    setTimeout(() => {
      btn.innerHTML = `<i class="fa-solid fa-copy"></i> Copy Code`;
    }, 2500);
  }
  showToast('Voucher code copied to clipboard! Apply on checkout.');
}

// Modal generic helpers
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function handleBackdropClick(event, modalId) {
  if (event.target.id === modalId) {
    closeModal(modalId);
  }
}

// Toast Notifications
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-neon);"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-20px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
