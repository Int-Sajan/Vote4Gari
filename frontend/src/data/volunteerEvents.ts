// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA — Replace with the actual campaign schedule before going live.
// Each entry in `volunteerEvents` is one volunteer opportunity.
// ─────────────────────────────────────────────────────────────────────────────

export interface VolunteerEvent {
  id: string;
  name: string;
  date: string;       // ISO format: 'YYYY-MM-DD'
  startTime: string;  // 24-hour: 'HH:MM'
  endTime: string;    // 24-hour: 'HH:MM'
  location: string;
  description: string;
  capacity?: number;  // Optional max number of volunteers
}

export const volunteerEvents: VolunteerEvent[] = [
  {
    id: 'sample-001',
    name: 'Ward 5 Canvass',
    date: '2026-09-12',
    startTime: '10:00',
    endTime: '13:00',
    location: 'Markham, Ward 5 — meeting point TBD',
    description:
      'Door-to-door canvassing in Ward 5. Volunteers will be paired up and assigned walking routes. No experience needed — a script and materials are provided.',
    capacity: 10,
  },
  {
    id: 'sample-002',
    name: 'Ward 7 Canvass',
    date: '2026-09-19',
    startTime: '10:00',
    endTime: '13:00',
    location: 'Markham, Ward 7 — meeting point TBD',
    description:
      'Door-to-door canvassing in Ward 7. Volunteers will be paired up and assigned walking routes. No experience needed — a script and materials are provided.',
    capacity: 10,
  },
  {
    id: 'sample-003',
    name: 'Community Booth',
    date: '2026-09-26',
    startTime: '11:00',
    endTime: '15:00',
    location: 'Markham civic area — location TBD',
    description:
      'Staff a campaign information booth at a local community event. Hand out materials and answer questions from residents about the campaign and the upcoming election.',
    capacity: 4,
  },
  {
    id: 'sample-004',
    name: 'Phone Banking',
    date: '2026-10-03',
    startTime: '17:00',
    endTime: '20:00',
    location: 'Virtual — Zoom link provided on sign-up',
    description:
      'Reach out to ward residents by phone to share information about the campaign and remind them about the voting period. A calling script and contact list are provided.',
    capacity: 8,
  },
  {
    id: 'sample-005',
    name: 'Get Out The Vote',
    date: '2026-10-16',
    startTime: '09:00',
    endTime: '17:00',
    location: 'Markham, Wards 5 & 7 — meeting point TBD',
    description:
      'First day of the official voting period. Help drive voter turnout by knocking on doors and reminding supporters to vote.',
    capacity: 15,
  },
  {
    id: 'sample-006',
    name: 'Scrutineer Shift',
    date: '2026-10-26',
    startTime: '10:00',
    endTime: '20:00',
    location: 'Polling stations — Ward 5 & 7 (assigned on sign-up)',
    description:
      'Last day of voting. Scrutineers observe the voting process on behalf of the campaign at assigned polling stations to ensure a fair count.',
    capacity: 6,
  },
];
