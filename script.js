/**
 * PitchArena - Premium Cricket Grounds & Turf Rentals
 * Interactive Web Application Logic
 */

// Ground Data Store
const groundsData = {
  'the-oval': {
    id: 'the-oval',
    name: 'The Oval Championship Stadium',
    category: 'full',
    ratePerHour: 4500,
    boundary: '68m Boundary Radius (Full Ground)',
    pitchType: 'Curated Natural Red Soil Match Pitch',
    lighting: '600 Lux Broadcast Stadium Floodlights',
    pavilion: '2 Air-Conditioned Player Dressing Pavilions & Washrooms',
    image: 'assets/images/cricket_ground_hero.jpg',
    features: [
      'Digital LED Boundary Scoreboard',
      'High-speed Outfield with Bermudagrass',
      'Sight Screens on both Bowling Ends',
      'Dedicated Umpire & Match Referee Room',
      '4K Live Stream Camera Towers Pre-wired',
      'Ample 100+ Car Parking'
    ],
    description: 'Our crown jewel cricket stadium designed for high-stakes 20-over and 40-over leather ball matches. Features an ICC-standard red-soil pitch with consistent carry, genuine bounce, and tournament-grade floodlights.'
  },
  'thunderbox': {
    id: 'thunderbox',
    name: 'ThunderBox 24/7 Turf Arena',
    category: 'box',
    ratePerHour: 1400,
    boundary: '110ft x 65ft Enclosed Arena',
    pitchType: '40mm High-Density FIFA Monofilament Turf',
    lighting: 'Even High-Intensity Overhead LED Matrix (Zero Shadow)',
    pavilion: 'Covered Player Dugout with Charging Ports & Fans',
    image: 'assets/images/box_cricket_turf.jpg',
    features: [
      'Heavy-duty 40ft High Safety Netting',
      'Surround Bluetooth Sound System for Match Music',
      'Stumps, Bails & High-Bounce Tennis Balls Included',
      'Open 24/7 for Midnight Tournaments',
      'Chilled Drinking Water & Energy Bars Onsite',
      'Spectator Gallery Seating for 40+ people'
    ],
    description: 'The ultimate high-energy box cricket destination. Built with imported shock-absorbent synthetic grass to prevent knee fatigue. Perfect for fast-paced 8v8 office leagues, weekend warrior faceoffs, and late-night cricket.'
  },
  'speedpro': {
    id: 'speedpro',
    name: 'SpeedPro Batting Nets & RoboArm',
    category: 'nets',
    ratePerHour: 800,
    boundary: 'Full 22-Yard Synthetic Pitch Lanes',
    pitchType: 'Tournament-Paced AstroTurf Strips with Crease Markings',
    lighting: 'Flicker-Free Bright LED Canopy Lighting',
    pavilion: 'Coach Observation Zone & Kit Storage Lockers',
    image: 'assets/images/cricket_practice_nets.jpg',
    features: [
      'Digital BOLA Bowling Machine (Speeds: 60 - 145 km/h)',
      'Adjustable Swing, Seam & Spin Trajectory Controls',
      'High-Speed Slow Motion Video Analysis Camera Option',
      'Leather Ball & Dimple Ball Compatibility',
      'Protective Helmets, Pads & Bats Available for Rent',
      'Professional Throwdown Specialist on Demand'
    ],
    description: 'Sharpen your technique against genuine pace and wicked spin. Equipped with world-class automated digital bowling machines and heavy safety cages. Ideal for dedicated batting practice and match preparation.'
  },
  'lords-meadow': {
    id: 'lords-meadow',
    name: "Lord's Meadow Match Stadium",
    category: 'full',
    ratePerHour: 5000,
    boundary: '72m International Boundary Radius',
    pitchType: 'Genuine Black Soil Pitch with High Pace & Bounce',
    lighting: '650 Lux High-Mast Arena Lighting',
    pavilion: 'VIP Clubhouse Pavilion with Balcony Seating',
    image: 'assets/images/cricket_ground_hero.jpg',
    features: [
      'BCCI-Standard Black Cotton Soil Center Pitch',
      'CricHeroes Integrated Live Digital Scoreboard',
      'Full Sound System for Live Commentator & Music',
      'Dedicated Medical First Aid & Ice Bath Zone',
      'Post-Match Trophy Presentation Stage',
      'Cafeteria with Hot Meals & Sports Drinks'
    ],
    description: 'Our premier venue for club championship finals and high-profile corporate cups. Lush green outfield, expansive boundaries, and a pitch engineered for thrilling, competitive cricket.'
  }
};

// State for Live Price Calculator
const calcState = {
  groundKey: 'oval',
  groundRate: 4500,
  durationHours: 2,
  timeMultiplier: 1.0,
  isNight: false,
  addons: {
    umpires: { selected: false, price: 1500 },
    stream: { selected: false, price: 2800 },
    balls: { selected: false, price: 950 },
    refreshments: { selected: false, price: 800 }
  }
};

// Document Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  initDatePickers();
  initFaqAccordion();
  initMobileMenu();
  recalculatePrice();
});

// Setup default minimum date as today
function initDatePickers() {
  const today = new Date().toISOString().split('T')[0];
  const findDateInput = document.getElementById('findDate');
  const bookDateInput = document.getElementById('bookDate');

  if (findDateInput) {
    findDateInput.min = today;
    // Default to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    findDateInput.value = tomorrow.toISOString().split('T')[0];
  }

  if (bookDateInput) {
    bookDateInput.min = today;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    bookDateInput.value = tomorrow.toISOString().split('T')[0];
  }
}

// Mobile Menu Navigation
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    // Close mobile menu when link clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}

// Ground Grid Category Filter
function filterGrounds(category, buttonElement) {
  // Update button classes
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  if (buttonElement) {
    buttonElement.classList.add('active');
  }

  // Filter cards
  const cards = document.querySelectorAll('.ground-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
      card.style.opacity = '0';
      setTimeout(() => {
        card.style.opacity = '1';
      }, 50);
    } else {
      card.style.display = 'none';
    }
  });

  showToast(`Showing ${category === 'all' ? 'all grounds' : category + ' grounds'}`);
}

// Quick Search Form Handler
function handleQuickFind(event) {
  event.preventDefault();
  const selectedCategory = document.getElementById('findGround').value;
  const matchDate = document.getElementById('findDate').value;
  const selectedSlot = document.getElementById('findSlot').value;

  // Filter grounds grid
  const filterBtn = document.querySelector(`.filter-btn[data-filter="${selectedCategory}"]`) || document.querySelector('.filter-btn[data-filter="all"]');
  filterGrounds(selectedCategory === 'all' ? 'all' : selectedCategory, filterBtn);

  // Pre-sync with booking modal
  const bookDateInput = document.getElementById('bookDate');
  const bookSlotSelect = document.getElementById('bookTimeSlot');
  if (bookDateInput && matchDate) bookDateInput.value = matchDate;
  if (bookSlotSelect && selectedSlot) bookSlotSelect.value = selectedSlot;

  // Scroll smoothly to Grounds section
  const groundsSection = document.getElementById('grounds');
  if (groundsSection) {
    groundsSection.scrollIntoView({ behavior: 'smooth' });
  }

  showToast(`Grounds filtered for ${matchDate}. Select your venue to book!`);
}

// Calculator Logic
function recalculatePrice() {
  // Ground
  const selectedGroundRadio = document.querySelector('input[name="calcGround"]:checked');
  if (selectedGroundRadio) {
    calcState.groundKey = selectedGroundRadio.value;
    calcState.groundRate = parseInt(selectedGroundRadio.getAttribute('data-rate'), 10);
  }

  // Duration
  const selectedDurationRadio = document.querySelector('input[name="calcDuration"]:checked');
  if (selectedDurationRadio) {
    calcState.durationHours = parseInt(selectedDurationRadio.getAttribute('data-hours'), 10);
  }

  // Time & Floodlight
  const selectedTimeRadio = document.querySelector('input[name="calcTime"]:checked');
  if (selectedTimeRadio) {
    calcState.timeMultiplier = parseFloat(selectedTimeRadio.getAttribute('data-multiplier'));
    calcState.isNight = selectedTimeRadio.value === 'night';
  }

  // Addons total
  let addonsSum = 0;
  for (const key in calcState.addons) {
    if (calcState.addons[key].selected) {
      addonsSum += calcState.addons[key].price;
    }
  }

  // Compute Base Ground Cost
  const baseGroundTotal = Math.round(calcState.groundRate * calcState.durationHours * calcState.timeMultiplier);
  const totalCost = baseGroundTotal + addonsSum;

  // Update UI Summary
  const groundNames = {
    oval: 'The Oval Championship Stadium',
    thunderbox: 'ThunderBox 24/7 Turf',
    speedpro: 'SpeedPro Batting Nets & RoboArm',
    lords: "Lord's Meadow Match Stadium"
  };

  const summaryGround = document.getElementById('summaryGround');
  const summaryRate = document.getElementById('summaryRate');
  const summaryDuration = document.getElementById('summaryDuration');
  const summaryLighting = document.getElementById('summaryLighting');
  const summaryAddons = document.getElementById('summaryAddons');
  const summaryTotal = document.getElementById('summaryTotal');

  if (summaryGround) summaryGround.textContent = groundNames[calcState.groundKey] || 'Custom Ground';
  if (summaryRate) summaryRate.textContent = `₹${calcState.groundRate.toLocaleString('en-IN')} / hr`;
  if (summaryDuration) summaryDuration.textContent = `${calcState.durationHours} Hours`;
  if (summaryLighting) summaryLighting.textContent = calcState.isNight ? 'Night Floodlights (+15%)' : 'Daytime Regular';
  if (summaryAddons) summaryAddons.textContent = `₹${addonsSum.toLocaleString('en-IN')}`;
  if (summaryTotal) summaryTotal.textContent = `₹${totalCost.toLocaleString('en-IN')}`;

  // Update modal preview as well
  updateModalEstimate(totalCost);
}

// Toggle Addon Cards
function toggleAddon(addonKey, price) {
  if (calcState.addons[addonKey]) {
    calcState.addons[addonKey].selected = !calcState.addons[addonKey].selected;
    const card = document.getElementById(`addon-${addonKey}`);
    if (card) {
      card.classList.toggle('selected', calcState.addons[addonKey].selected);
    }
    recalculatePrice();
  }
}

// Update Modal Pricing Estimate
function updateModalEstimate(totalCost) {
  const modalTotal = document.getElementById('modalTotalAmount');
  const modalAdvance = document.getElementById('modalAdvanceAmount');

  if (modalTotal) modalTotal.textContent = `₹${totalCost.toLocaleString('en-IN')}`;
  if (modalAdvance) {
    const advance = Math.round(totalCost * 0.3);
    modalAdvance.textContent = `₹${advance.toLocaleString('en-IN')}`;
  }
}

// Proceed From Calculator to Booking Modal
function proceedFromCalculator() {
  const modalGroundSelect = document.getElementById('bookGroundSelect');
  const modalDurationSelect = document.getElementById('bookDuration');
  const modalSlotSelect = document.getElementById('bookTimeSlot');

  if (modalGroundSelect) modalGroundSelect.value = calcState.groundKey;
  if (modalDurationSelect) modalDurationSelect.value = String(calcState.durationHours);
  if (modalSlotSelect) {
    modalSlotSelect.value = calcState.isNight ? 'night' : 'morning';
  }

  openBookingModal();
}

// Prefill Booking From Ground Card Click
function prefillBooking(groundName, hourlyRate, category) {
  const groundMap = {
    'The Oval Championship Stadium': 'oval',
    'ThunderBox 24/7 Turf Arena': 'thunderbox',
    'SpeedPro Batting Nets & RoboArm': 'speedpro',
    "Lord's Meadow Match Stadium": 'lords'
  };

  const groundKey = groundMap[groundName] || 'oval';
  const modalGroundSelect = document.getElementById('bookGroundSelect');
  if (modalGroundSelect) modalGroundSelect.value = groundKey;

  // Also select corresponding radio in calculator
  const calcRadio = document.querySelector(`input[name="calcGround"][value="${groundKey}"]`);
  if (calcRadio) {
    calcRadio.checked = true;
    recalculatePrice();
  }

  openBookingModal();
}

// Sync Modal Pricing when inputs change inside modal
function syncModalPricing() {
  const modalGroundSelect = document.getElementById('bookGroundSelect');
  const modalDurationSelect = document.getElementById('bookDuration');
  const modalSlotSelect = document.getElementById('bookTimeSlot');

  const groundRates = {
    oval: 4500,
    thunderbox: 1400,
    speedpro: 800,
    lords: 5000
  };

  const groundKey = modalGroundSelect ? modalGroundSelect.value : 'oval';
  const hours = modalDurationSelect ? parseInt(modalDurationSelect.value, 10) : 4;
  const isNight = modalSlotSelect && (modalSlotSelect.value === 'night' || modalSlotSelect.value === 'latenight');
  const multiplier = isNight ? 1.15 : 1.0;

  const rate = groundRates[groundKey] || 4500;
  const total = Math.round(rate * hours * multiplier);

  updateModalEstimate(total);
}

// Show Ground Details Quickview Modal
function showGroundDetails(groundKey) {
  const ground = groundsData[groundKey];
  if (!ground) return;

  const modalTitle = document.getElementById('detailModalTitle');
  const modalBody = document.getElementById('detailModalBody');

  if (modalTitle) modalTitle.textContent = ground.name;
  if (modalBody) {
    modalBody.innerHTML = `
      <div style="margin-bottom: 20px; border-radius: var(--radius-md); overflow: hidden; height: 240px;">
        <img src="${ground.image}" alt="${ground.name}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>

      <div style="margin-bottom: 16px;">
        <p style="color: var(--text-secondary); font-size: 0.96rem; line-height: 1.6;">${ground.description}</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; font-size: 0.88rem;">
        <div style="background: rgba(255, 255, 255, 0.04); padding: 12px; border-radius: 8px; border: 1px solid var(--border-glass);">
          <strong style="color: var(--accent-neon); display: block; margin-bottom: 4px;">Boundary & Pitch:</strong>
          <span style="color: var(--text-main);">${ground.pitchType} (${ground.boundary})</span>
        </div>
        <div style="background: rgba(255, 255, 255, 0.04); padding: 12px; border-radius: 8px; border: 1px solid var(--border-glass);">
          <strong style="color: var(--accent-neon); display: block; margin-bottom: 4px;">Lighting & Power:</strong>
          <span style="color: var(--text-main);">${ground.lighting}</span>
        </div>
      </div>

      <h4 style="font-family: var(--font-heading); font-size: 1rem; color: var(--text-main); margin-bottom: 10px;">Premium Facilities Included:</h4>
      <ul style="list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 24px; font-size: 0.85rem; color: var(--text-secondary);">
        ${ground.features.map(f => `<li><i class="fa-solid fa-circle-check" style="color: var(--accent-neon); margin-right: 6px;"></i> ${f}</li>`).join('')}
      </ul>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-glass); padding-top: 18px;">
        <div>
          <span style="font-size: 0.8rem; color: var(--text-muted); display: block;">Hourly Rental Rate</span>
          <span style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; color: var(--accent-neon);">₹${ground.ratePerHour.toLocaleString('en-IN')} <span style="font-size: 0.8rem; color: var(--text-muted);">/ hr</span></span>
        </div>
        <button class="btn btn-primary" onclick="closeModal('detailModal'); prefillBooking('${ground.name}', ${ground.ratePerHour}, '${ground.category}')">
          <i class="fa-solid fa-calendar-check"></i> Book This Ground
        </button>
      </div>
    `;
  }

  openModal('detailModal');
}

// Modal Show/Hide Helpers
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

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

function openBookingModal() {
  syncModalPricing();
  openModal('bookingModal');
}

function openCorporateInquiryModal() {
  openModal('corporateModal');
}

// Submit Booking Form
function submitBooking(event) {
  event.preventDefault();

  const groundSelect = document.getElementById('bookGroundSelect');
  const groundText = groundSelect.options[groundSelect.selectedIndex].text;
  const matchDate = document.getElementById('bookDate').value;
  const timeSlot = document.getElementById('bookTimeSlot').value;
  const duration = document.getElementById('bookDuration').value;
  const captainName = document.getElementById('bookCaptainName').value;
  const teamName = document.getElementById('bookTeamName').value;
  const phone = document.getElementById('bookPhone').value;
  const totalAmount = document.getElementById('modalTotalAmount').textContent;
  const advanceAmount = document.getElementById('modalAdvanceAmount').textContent;

  // Generate Booking Receipt ID
  const randomId = 'CRIC-' + Math.floor(100000 + Math.random() * 900000);

  const modalBody = document.getElementById('bookingModalBody');
  const modalTitle = document.getElementById('bookingModalTitle');

  if (modalTitle) modalTitle.textContent = '🎉 Slot Reserved Successfully!';

  if (modalBody) {
    modalBody.innerHTML = `
      <div class="success-screen">
        <div class="success-check-icon">✓</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: var(--text-main); margin-bottom: 8px;">
          Match Slot Locked!
        </h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">
          Congratulations <strong>${captainName}</strong>! Your cricket ground booking request for <strong>${teamName}</strong> is reserved.
        </p>

        <div class="booking-receipt-id">
          Receipt ID: ${randomId}
        </div>

        <div style="background: rgba(7, 11, 20, 0.9); border: 1px solid var(--border-glass); border-radius: 12px; padding: 18px; text-align: left; margin-bottom: 24px; font-size: 0.9rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-secondary);">Venue:</span>
            <strong style="color: var(--text-main);">${groundText.split('(')[0]}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-secondary);">Match Date:</span>
            <strong style="color: var(--text-main);">${matchDate}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-secondary);">Slot / Duration:</span>
            <strong style="color: var(--text-main);">${timeSlot.toUpperCase()} (${duration} Hours)</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-secondary);">Total Rental:</span>
            <strong style="color: var(--accent-neon);">${totalAmount}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; padding-top: 8px; border-top: 1px solid var(--border-glass);">
            <span style="color: var(--text-secondary);">Advance Deposit:</span>
            <strong style="color: var(--accent-gold);">${advanceAmount} (Payable at Ground)</strong>
          </div>
        </div>

        <div style="display: flex; gap: 12px; flex-direction: column;">
          <a href="https://wa.me/919876543210?text=Hi%20PitchArena,%20I%20just%20booked%20slot%20${randomId}%20for%20team%20${encodeURIComponent(teamName)}%20on%20${matchDate}" target="_blank" class="btn btn-primary" style="width: 100%;">
            <i class="fa-brands fa-whatsapp"></i> Send Confirmation to Ground Manager on WhatsApp
          </a>
          <button class="btn btn-outline" onclick="location.reload()">
            Done &amp; Close
          </button>
        </div>
      </div>
    `;
  }

  showToast(`Booking ${randomId} confirmed! Check receipt details.`);
}

// Submit Corporate Inquiry
function submitCorporateInquiry(event) {
  event.preventDefault();
  const company = document.getElementById('corpCompany').value;
  const contactName = document.getElementById('corpName').value;

  closeModal('corporateModal');
  showToast(`Thank you ${contactName}! Custom tournament proposal for ${company} sent to your WhatsApp & Email.`);
}

// FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Toast System
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
