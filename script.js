// UX Estimate Calculator - Main Script

// Currency symbols mapping
const currencySymbols = {
  USD: '$',
  EUR: '€',
  SEK: 'kr',
  GBP: '£',
  NOK: 'kr',
  DKK: 'kr',
  CAD: '$',
  AUD: '$'
};

// Project templates with realistic values
const templates = {
  'mobile-mvp': {
    name: 'Mobile App MVP',
    researchPlanHours: 4,
    stakeholderCount: 3,
    stakeholderHours: 2,
    userInterviewCount: 6,
    userInterviewHours: 2,
    personaCount: 2,
    personaHours: 4,
    journeyMapCount: 1,
    journeyMapHours: 6,
    uxVisionHours: 8,
    iaHours: 12,
    conceptCount: 2,
    revisionCount: 2,
    revisionHours: 4,
    usabilityTestCount: 5,
    usabilityTestHours: 2,
    documentationHours: 8,
    meetingHours: 16,
    buffer: 15
  },
  'website-redesign': {
    name: 'Website Redesign',
    researchPlanHours: 8,
    stakeholderCount: 5,
    stakeholderHours: 2,
    userInterviewCount: 8,
    userInterviewHours: 2,
    personaCount: 3,
    personaHours: 5,
    journeyMapCount: 2,
    journeyMapHours: 8,
    uxVisionHours: 12,
    iaHours: 24,
    conceptCount: 3,
    revisionCount: 3,
    revisionHours: 4,
    usabilityTestCount: 6,
    usabilityTestHours: 3,
    documentationHours: 12,
    meetingHours: 24,
    buffer: 15
  },
  'design-system': {
    name: 'Design System',
    researchPlanHours: 4,
    stakeholderCount: 4,
    stakeholderHours: 2,
    userInterviewCount: 0,
    userInterviewHours: 2,
    personaCount: 0,
    personaHours: 4,
    journeyMapCount: 0,
    journeyMapHours: 6,
    uxVisionHours: 16,
    iaHours: 40,
    conceptCount: 4,
    revisionCount: 3,
    revisionHours: 6,
    usabilityTestCount: 0,
    usabilityTestHours: 3,
    documentationHours: 40,
    meetingHours: 20,
    buffer: 20
  },
  'research-sprint': {
    name: 'Research Sprint',
    researchPlanHours: 8,
    stakeholderCount: 6,
    stakeholderHours: 2,
    userInterviewCount: 12,
    userInterviewHours: 2,
    personaCount: 4,
    personaHours: 6,
    journeyMapCount: 3,
    journeyMapHours: 8,
    uxVisionHours: 0,
    iaHours: 0,
    conceptCount: 0,
    revisionCount: 2,
    revisionHours: 4,
    usabilityTestCount: 0,
    usabilityTestHours: 3,
    documentationHours: 16,
    meetingHours: 12,
    buffer: 10
  },
  'usability-audit': {
    name: 'Usability Audit',
    researchPlanHours: 4,
    stakeholderCount: 2,
    stakeholderHours: 2,
    userInterviewCount: 0,
    userInterviewHours: 2,
    personaCount: 0,
    personaHours: 4,
    journeyMapCount: 1,
    journeyMapHours: 4,
    uxVisionHours: 0,
    iaHours: 8,
    conceptCount: 0,
    revisionCount: 2,
    revisionHours: 4,
    usabilityTestCount: 8,
    usabilityTestHours: 3,
    documentationHours: 24,
    meetingHours: 8,
    buffer: 10
  },
  'clear': {
    name: 'Start Fresh',
    researchPlanHours: 0,
    stakeholderCount: 0,
    stakeholderHours: 2,
    userInterviewCount: 0,
    userInterviewHours: 2,
    personaCount: 0,
    personaHours: 4,
    journeyMapCount: 0,
    journeyMapHours: 6,
    uxVisionHours: 0,
    iaHours: 0,
    conceptCount: 0,
    revisionCount: 2,
    revisionHours: 4,
    usabilityTestCount: 0,
    usabilityTestHours: 3,
    documentationHours: 0,
    meetingHours: 0,
    buffer: 0
  }
};

// Get DOM elements
const elements = {
  // General Info
  projectName: document.getElementById('projectName'),
  startDate: document.getElementById('startDate'),
  hourlyRate: document.getElementById('hourlyRate'),
  currency: document.getElementById('currency'),

  // Research Phase
  researchPlanHours: document.getElementById('researchPlanHours'),
  stakeholderCount: document.getElementById('stakeholderCount'),
  stakeholderHours: document.getElementById('stakeholderHours'),
  userInterviewCount: document.getElementById('userInterviewCount'),
  userInterviewHours: document.getElementById('userInterviewHours'),
  personaCount: document.getElementById('personaCount'),
  personaHours: document.getElementById('personaHours'),
  journeyMapCount: document.getElementById('journeyMapCount'),
  journeyMapHours: document.getElementById('journeyMapHours'),

  // Design Phase
  uxVisionHours: document.getElementById('uxVisionHours'),
  iaHours: document.getElementById('iaHours'),
  conceptCount: document.getElementById('conceptCount'),
  revisionCount: document.getElementById('revisionCount'),
  revisionHours: document.getElementById('revisionHours'),
  usabilityTestCount: document.getElementById('usabilityTestCount'),
  usabilityTestHours: document.getElementById('usabilityTestHours'),

  // Additional
  documentationHours: document.getElementById('documentationHours'),
  meetingHours: document.getElementById('meetingHours'),

  // Subtotals
  stakeholderSubtotal: document.getElementById('stakeholderSubtotal'),
  userInterviewSubtotal: document.getElementById('userInterviewSubtotal'),
  personaSubtotal: document.getElementById('personaSubtotal'),
  journeyMapSubtotal: document.getElementById('journeyMapSubtotal'),
  conceptSubtotal: document.getElementById('conceptSubtotal'),
  usabilitySubtotal: document.getElementById('usabilitySubtotal'),

  // Section Totals
  researchTotal: document.getElementById('researchTotal'),
  designTotal: document.getElementById('designTotal'),
  additionalTotal: document.getElementById('additionalTotal'),

  // Results
  projectNameDisplay: document.getElementById('projectNameDisplay'),
  researchResult: document.getElementById('researchResult'),
  designResult: document.getElementById('designResult'),
  additionalResult: document.getElementById('additionalResult'),
  bufferPercentDisplay: document.getElementById('bufferPercentDisplay'),
  bufferResult: document.getElementById('bufferResult'),
  totalHours: document.getElementById('totalHours'),
  totalCost: document.getElementById('totalCost'),
  workingDays: document.getElementById('workingDays'),
  completionDate: document.getElementById('completionDate'),

  // Insights
  insightsList: document.getElementById('insightsList'),

  // Export
  exportAiBtn: document.getElementById('exportAiBtn'),
  exportHint: document.getElementById('exportHint'),

  // Template indicator
  selectedTemplate: document.getElementById('selectedTemplate'),
  jumpToSummary: document.getElementById('jumpToSummary'),
  summarySection: document.getElementById('summarySection')
};

// Helper function to get numeric value from input
function getValue(element) {
  return parseFloat(element.value) || 0;
}

// Helper function to get selected buffer percentage
function getBufferPercent() {
  const selected = document.querySelector('input[name="buffer"]:checked');
  return selected ? parseFloat(selected.value) : 0;
}

// Format number with space as thousand separator
function formatNumber(num, decimals = 0) {
  const fixed = num.toFixed(decimals);
  const parts = fixed.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
}

// Format currency
function formatCurrency(amount, currencyCode) {
  const symbol = currencySymbols[currencyCode] || '$';
  const formatted = formatNumber(Math.round(amount));

  // Handle positioning for different currencies
  if (['SEK', 'NOK', 'DKK'].includes(currencyCode)) {
    return `${formatted} ${symbol}`;
  }
  return `${symbol}${formatted}`;
}

// Format hours
function formatHours(hours) {
  return `${formatNumber(hours, hours % 1 === 0 ? 0 : 1)} hrs`;
}

// Calculate completion date
function calculateCompletionDate(startDate, workingDays) {
  if (!startDate) return '—';

  const start = new Date(startDate);
  let daysAdded = 0;
  const current = new Date(start);

  while (daysAdded < workingDays) {
    current.setDate(current.getDate() + 1);
    // Skip weekends (Saturday = 6, Sunday = 0)
    if (current.getDay() !== 0 && current.getDay() !== 6) {
      daysAdded++;
    }
  }

  return current.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Generate insights based on current values
function generateInsights() {
  const insights = [];

  const userInterviewCount = getValue(elements.userInterviewCount);
  const userInterviewHours = getValue(elements.userInterviewHours);
  const usabilityTestCount = getValue(elements.usabilityTestCount);
  const bufferPercent = getBufferPercent();
  const researchTotal = getValue(elements.researchPlanHours) +
    (getValue(elements.stakeholderCount) * getValue(elements.stakeholderHours)) +
    (userInterviewCount * userInterviewHours) +
    (getValue(elements.personaCount) * getValue(elements.personaHours)) +
    (getValue(elements.journeyMapCount) * getValue(elements.journeyMapHours));
  const designTotal = getValue(elements.uxVisionHours) +
    getValue(elements.iaHours) +
    (getValue(elements.conceptCount) * getValue(elements.revisionCount) * getValue(elements.revisionHours)) +
    (usabilityTestCount * getValue(elements.usabilityTestHours));
  const totalHours = researchTotal + designTotal +
    getValue(elements.documentationHours) + getValue(elements.meetingHours);

  // Check for common issues
  if (userInterviewCount > 0 && userInterviewCount < 5) {
    insights.push({ text: 'Consider 5+ user interviews for more reliable insights', type: 'warning' });
  }

  if (userInterviewCount > 0 && userInterviewHours < 1.5) {
    insights.push({ text: 'Allow 1.5-2.5 hrs per interview to include prep and notes', type: 'warning' });
  }

  if (designTotal > 0 && usabilityTestCount === 0) {
    insights.push({ text: 'Consider adding usability testing to validate your designs', type: 'warning' });
  }

  if (totalHours > 0 && bufferPercent === 0) {
    insights.push({ text: 'Projects typically need 10-20% buffer for unexpected work', type: 'warning' });
  }

  if (designTotal > 0 && researchTotal === 0) {
    insights.push({ text: 'Design without research increases risk - consider adding discovery', type: 'warning' });
  }

  if (getValue(elements.personaHours) > 10) {
    insights.push({ text: 'Persona hours seem high - typical range is 3-8 hours each', type: 'warning' });
  }

  if (getValue(elements.journeyMapHours) > 16) {
    insights.push({ text: 'Journey map hours seem high - typical range is 4-12 hours each', type: 'warning' });
  }

  // Positive insights
  if (userInterviewCount >= 8) {
    insights.push({ text: 'Good sample size for user interviews!', type: 'positive' });
  }

  if (bufferPercent >= 15 && bufferPercent <= 20) {
    insights.push({ text: 'Healthy buffer percentage for managing uncertainty', type: 'positive' });
  }

  if (researchTotal > 0 && designTotal > 0 && usabilityTestCount > 0) {
    insights.push({ text: 'Well-rounded project with research, design, and testing', type: 'positive' });
  }

  // Default message if no insights
  if (insights.length === 0) {
    if (totalHours === 0) {
      insights.push({ text: 'Fill in your estimate to get personalized tips', type: 'neutral' });
    } else {
      insights.push({ text: 'Your estimate looks reasonable!', type: 'positive' });
    }
  }

  return insights;
}

// Update insights display
function updateInsights() {
  const insights = generateInsights();
  elements.insightsList.textContent = '';
  insights.forEach(insight => {
    const li = document.createElement('li');
    li.className = insight.type === 'warning' ? 'insight-item warning' : 'insight-item';
    li.textContent = insight.text;
    elements.insightsList.appendChild(li);
  });
}

// Main calculation function
function calculate() {
  // Calculate Research Phase subtotals
  const stakeholderHours = getValue(elements.stakeholderCount) * getValue(elements.stakeholderHours);
  const userInterviewHoursTotal = getValue(elements.userInterviewCount) * getValue(elements.userInterviewHours);
  const personaHoursTotal = getValue(elements.personaCount) * getValue(elements.personaHours);
  const journeyMapHoursTotal = getValue(elements.journeyMapCount) * getValue(elements.journeyMapHours);

  // Update subtotal displays
  elements.stakeholderSubtotal.textContent = formatHours(stakeholderHours);
  elements.userInterviewSubtotal.textContent = formatHours(userInterviewHoursTotal);
  elements.personaSubtotal.textContent = formatHours(personaHoursTotal);
  elements.journeyMapSubtotal.textContent = formatHours(journeyMapHoursTotal);

  // Calculate Research Phase total
  const researchTotal =
    getValue(elements.researchPlanHours) +
    stakeholderHours +
    userInterviewHoursTotal +
    personaHoursTotal +
    journeyMapHoursTotal;

  elements.researchTotal.textContent = `${researchTotal} hours`;

  // Calculate Design Phase subtotals
  const conceptHours = getValue(elements.conceptCount) * getValue(elements.revisionCount) * getValue(elements.revisionHours);
  const usabilityHours = getValue(elements.usabilityTestCount) * getValue(elements.usabilityTestHours);

  elements.conceptSubtotal.textContent = formatHours(conceptHours);
  elements.usabilitySubtotal.textContent = formatHours(usabilityHours);

  // Calculate Design Phase total
  const designTotal =
    getValue(elements.uxVisionHours) +
    getValue(elements.iaHours) +
    conceptHours +
    usabilityHours;

  elements.designTotal.textContent = `${designTotal} hours`;

  // Calculate Additional time
  const additionalTotal =
    getValue(elements.documentationHours) +
    getValue(elements.meetingHours);

  elements.additionalTotal.textContent = `${additionalTotal} hours`;

  // Calculate totals with buffer
  const subtotalHours = researchTotal + designTotal + additionalTotal;
  const bufferPercent = getBufferPercent();
  const bufferHours = subtotalHours * (bufferPercent / 100);
  const totalHours = subtotalHours + bufferHours;

  // Calculate cost
  const hourlyRate = getValue(elements.hourlyRate);
  const totalCost = totalHours * hourlyRate;

  // Calculate working days (8 hours per day)
  const workingDaysCount = Math.ceil(totalHours / 8);

  // Get currency
  const currency = elements.currency.value;

  // Update project name display
  const projectName = elements.projectName.value.trim() || 'Your UX Project';
  elements.projectNameDisplay.textContent = projectName;

  // Update results
  elements.researchResult.textContent = formatHours(researchTotal);
  elements.designResult.textContent = formatHours(designTotal);
  elements.additionalResult.textContent = formatHours(additionalTotal);
  elements.bufferPercentDisplay.textContent = bufferPercent;
  elements.bufferResult.textContent = formatHours(bufferHours);
  elements.totalHours.textContent = formatNumber(totalHours, totalHours % 1 === 0 ? 0 : 1);
  elements.totalCost.textContent = formatCurrency(totalCost, currency);
  elements.workingDays.textContent = `${workingDaysCount} days`;
  elements.completionDate.textContent = calculateCompletionDate(
    elements.startDate.value,
    workingDaysCount
  );

  // Update insights
  updateInsights();
}

// Apply template
function applyTemplate(templateKey) {
  const template = templates[templateKey];
  if (!template) return;

  // Set values
  elements.researchPlanHours.value = template.researchPlanHours;
  elements.stakeholderCount.value = template.stakeholderCount;
  elements.stakeholderHours.value = template.stakeholderHours;
  elements.userInterviewCount.value = template.userInterviewCount;
  elements.userInterviewHours.value = template.userInterviewHours;
  elements.personaCount.value = template.personaCount;
  elements.personaHours.value = template.personaHours;
  elements.journeyMapCount.value = template.journeyMapCount;
  elements.journeyMapHours.value = template.journeyMapHours;
  elements.uxVisionHours.value = template.uxVisionHours;
  elements.iaHours.value = template.iaHours;
  elements.conceptCount.value = template.conceptCount;
  elements.revisionCount.value = template.revisionCount;
  elements.revisionHours.value = template.revisionHours;
  elements.usabilityTestCount.value = template.usabilityTestCount;
  elements.usabilityTestHours.value = template.usabilityTestHours;
  elements.documentationHours.value = template.documentationHours;
  elements.meetingHours.value = template.meetingHours;

  // Set buffer radio
  const bufferRadio = document.querySelector(`input[name="buffer"][value="${template.buffer}"]`);
  if (bufferRadio) {
    bufferRadio.checked = true;
  }

  // Update project name if empty and not clearing
  if (templateKey !== 'clear' && !elements.projectName.value.trim()) {
    elements.projectName.value = template.name;
  }

  // Update selected template indicator
  if (templateKey === 'clear') {
    elements.selectedTemplate.textContent = '';
  } else {
    elements.selectedTemplate.textContent = template.name;
  }

  calculate();
}

// Generate export text for AI review
function generateExportText() {
  const projectName = elements.projectName.value.trim() || 'UX Project';
  const currency = elements.currency.value;
  const hourlyRate = getValue(elements.hourlyRate);

  // Calculate all values
  const stakeholderHours = getValue(elements.stakeholderCount) * getValue(elements.stakeholderHours);
  const userInterviewHours = getValue(elements.userInterviewCount) * getValue(elements.userInterviewHours);
  const personaHours = getValue(elements.personaCount) * getValue(elements.personaHours);
  const journeyMapHours = getValue(elements.journeyMapCount) * getValue(elements.journeyMapHours);
  const researchPlanHours = getValue(elements.researchPlanHours);

  const researchTotal = researchPlanHours + stakeholderHours + userInterviewHours + personaHours + journeyMapHours;

  const uxVisionHours = getValue(elements.uxVisionHours);
  const iaHours = getValue(elements.iaHours);
  const conceptHours = getValue(elements.conceptCount) * getValue(elements.revisionCount) * getValue(elements.revisionHours);
  const usabilityHours = getValue(elements.usabilityTestCount) * getValue(elements.usabilityTestHours);

  const designTotal = uxVisionHours + iaHours + conceptHours + usabilityHours;

  const documentationHours = getValue(elements.documentationHours);
  const meetingHours = getValue(elements.meetingHours);
  const additionalTotal = documentationHours + meetingHours;

  const subtotal = researchTotal + designTotal + additionalTotal;
  const bufferPercent = getBufferPercent();
  const bufferHours = subtotal * (bufferPercent / 100);
  const totalHours = subtotal + bufferHours;
  const totalCost = totalHours * hourlyRate;
  const workingDays = Math.ceil(totalHours / 8);

  let text = `UX PROJECT ESTIMATE - ${projectName}
${'='.repeat(50)}

RESEARCH PHASE (${researchTotal} hours)
`;

  if (researchPlanHours > 0) text += `- Research planning: ${researchPlanHours} hrs\n`;
  if (getValue(elements.stakeholderCount) > 0) {
    text += `- ${getValue(elements.stakeholderCount)} stakeholder interviews × ${getValue(elements.stakeholderHours)} hrs = ${stakeholderHours} hrs\n`;
  }
  if (getValue(elements.userInterviewCount) > 0) {
    text += `- ${getValue(elements.userInterviewCount)} user interviews × ${getValue(elements.userInterviewHours)} hrs = ${userInterviewHours} hrs\n`;
  }
  if (getValue(elements.personaCount) > 0) {
    text += `- ${getValue(elements.personaCount)} personas × ${getValue(elements.personaHours)} hrs = ${personaHours} hrs\n`;
  }
  if (getValue(elements.journeyMapCount) > 0) {
    text += `- ${getValue(elements.journeyMapCount)} journey maps × ${getValue(elements.journeyMapHours)} hrs = ${journeyMapHours} hrs\n`;
  }

  text += `
DESIGN PHASE (${designTotal} hours)
`;

  if (uxVisionHours > 0) text += `- UX vision: ${uxVisionHours} hrs\n`;
  if (iaHours > 0) text += `- Information architecture: ${iaHours} hrs\n`;
  if (getValue(elements.conceptCount) > 0) {
    text += `- ${getValue(elements.conceptCount)} design concepts × ${getValue(elements.revisionCount)} revisions × ${getValue(elements.revisionHours)} hrs = ${conceptHours} hrs\n`;
  }
  if (getValue(elements.usabilityTestCount) > 0) {
    text += `- ${getValue(elements.usabilityTestCount)} usability tests × ${getValue(elements.usabilityTestHours)} hrs = ${usabilityHours} hrs\n`;
  }

  text += `
ADDITIONAL (${additionalTotal} hours)
`;

  if (documentationHours > 0) text += `- Documentation: ${documentationHours} hrs\n`;
  if (meetingHours > 0) text += `- Meetings & communication: ${meetingHours} hrs\n`;

  text += `
BUFFER: ${bufferPercent}% = ${bufferHours.toFixed(1)} hrs

${'='.repeat(50)}
TOTAL: ${totalHours.toFixed(1)} hours | ${formatCurrency(totalCost, currency)} | ${workingDays} working days
${'='.repeat(50)}

Please review this UX project estimate and provide feedback:
1. Are there any activities that seem under-estimated or over-estimated?
2. What important UX activities might be missing from this estimate?
3. Based on your experience, any tips or red flags for this type of project?
4. Does the research-to-design ratio seem appropriate?
`;

  return text;
}

// Copy to clipboard
async function copyForAiReview() {
  const text = generateExportText();

  try {
    await navigator.clipboard.writeText(text);
    elements.exportHint.textContent = 'Copied! Paste into ChatGPT or Claude for review.';
    setTimeout(() => {
      elements.exportHint.textContent = '';
    }, 3000);
  } catch (err) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    elements.exportHint.textContent = 'Copied! Paste into ChatGPT or Claude for review.';
    setTimeout(() => {
      elements.exportHint.textContent = '';
    }, 3000);
  }
}

// Set default start date to today
function setDefaultDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  elements.startDate.value = `${yyyy}-${mm}-${dd}`;
}

// Add event listeners
function initEventListeners() {
  // Listen to all inputs
  const inputs = document.querySelectorAll('input, select');
  inputs.forEach(input => {
    input.addEventListener('input', calculate);
    input.addEventListener('change', calculate);
  });

  // Listen to buffer radio buttons
  const bufferRadios = document.querySelectorAll('input[name="buffer"]');
  bufferRadios.forEach(radio => {
    radio.addEventListener('change', calculate);
  });

  // Template buttons
  const templateBtns = document.querySelectorAll('.template-btn');
  templateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const templateKey = btn.dataset.template;
      applyTemplate(templateKey);
    });
  });

  // Collapsible section headers
  const collapsibleHeaders = document.querySelectorAll('[data-collapsible]');
  collapsibleHeaders.forEach(header => {
    header.addEventListener('click', () => toggleSection(header));
  });

  // Print button
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }

  // Export button
  if (elements.exportAiBtn) {
    elements.exportAiBtn.addEventListener('click', copyForAiReview);
  }

  // Jump to summary button
  if (elements.jumpToSummary) {
    elements.jumpToSummary.addEventListener('click', () => {
      elements.summarySection.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// Initialize
function init() {
  setDefaultDate();
  initEventListeners();
  calculate();
}

// Toggle collapsible section
function toggleSection(header) {
  const card = header.closest('.card');
  if (card) {
    card.classList.toggle('collapsed');
  }
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', init);
