import { useState } from 'react';
import { VolunteerEvent, volunteerEvents } from '../data/volunteerEvents';
import VolunteerRegistrationForm from './VolunteerRegistrationForm';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_LABELS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

interface CalDay {
  date: Date;
  currentMonth: boolean;
}

function buildCalendarDays(year: number, month: number): CalDay[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: CalDay[] = [];

  // Leading days from previous month to fill the first row
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push({
      date: new Date(year, month, 1 - (firstDay.getDay() - i)),
      currentMonth: false,
    });
  }

  // Days of the current month
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push({ date: new Date(year, month, d), currentMonth: true });
  }

  // Trailing days to complete the last row
  const remainder = days.length % 7;
  if (remainder !== 0) {
    for (let i = 1; i <= 7 - remainder; i++) {
      days.push({ date: new Date(year, month + 1, i), currentMonth: false });
    }
  }

  return days;
}

function toISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatTime(t: string): string {
  const [hStr, mStr] = t.split(':');
  const h = Number(hStr);
  const suffix = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 || 12;
  return `${hour}:${mStr} ${suffix}`;
}

function formatDisplayDate(isoDate: string): string {
  const [y, mo, d] = isoDate.split('-').map(Number);
  return new Date(y, mo - 1, d).toLocaleDateString('en-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function VolunteerCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<VolunteerEvent | null>(null);
  const [showForm, setShowForm] = useState(false);

  function selectEvent(evt: VolunteerEvent) {
    setSelected(evt);
    setShowForm(false);
  }

  const todayISO = toISO(today);
  const days = buildCalendarDays(year, month);

  // Index events by ISO date string
  const eventsByDate = new Map<string, VolunteerEvent[]>();
  for (const evt of volunteerEvents) {
    const bucket = eventsByDate.get(evt.date) ?? [];
    eventsByDate.set(evt.date, [...bucket, evt]);
  }

  function prevMonth() {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
    setSelected(null);
    setShowForm(false);
  }

  function nextMonth() {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
    setSelected(null);
    setShowForm(false);
  }

  return (
    <div className="cal-wrap">
      {/* ── Month navigation ── */}
      <div className="cal-nav">
        <button
          className="btn btn-outline on-light cal-nav-btn"
          onClick={prevMonth}
          aria-label="Previous month"
        >
          &#8249;
        </button>
        <span className="cal-month-label">
          {MONTH_LABELS[month]} {year}
        </span>
        <button
          className="btn btn-outline on-light cal-nav-btn"
          onClick={nextMonth}
          aria-label="Next month"
        >
          &#8250;
        </button>
      </div>

      {/* ── Day-of-week headers ── */}
      <div className="cal-grid">
        {DAY_LABELS.map((label) => (
          <div key={label} className="cal-day-header">
            {label}
          </div>
        ))}
      </div>

      {/* ── Calendar cells ── */}
      <div className="cal-grid">
        {days.map(({ date, currentMonth }) => {
          const iso = toISO(date);
          const events = eventsByDate.get(iso) ?? [];
          const hasEvent = events.length > 0;
          const isToday = iso === todayISO;
          const isSelected = selected !== null && selected.date === iso;

          const classes = [
            'cal-cell',
            !currentMonth ? 'cal-other-month' : '',
            hasEvent ? 'cal-has-event' : '',
            isToday ? 'cal-today' : '',
            isSelected ? 'cal-selected' : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <div
              key={iso + (currentMonth ? '' : '-out')}
              className={classes}
              role={hasEvent ? 'button' : undefined}
              tabIndex={hasEvent ? 0 : undefined}
              aria-label={
                hasEvent ? `${date.getDate()} — ${events[0].name}` : undefined
              }
              onClick={() => {
                if (hasEvent) selectEvent(events[0]);
                else setSelected(null);
              }}
              onKeyDown={(e) => {
                if (hasEvent && (e.key === 'Enter' || e.key === ' ')) {
                  selectEvent(events[0]);
                }
              }}
            >
              <span className="cal-cell-num">{date.getDate()}</span>
              {hasEvent && (
                <span className="cal-event-dot" aria-hidden="true" />
              )}
              {hasEvent && currentMonth && (
                <span className="cal-event-label">{events[0].name}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Event detail panel / registration form ── */}
      {selected !== null && (
        <div className="cal-detail">
          {showForm ? (
            <VolunteerRegistrationForm
              event={selected}
              onClose={() => { setShowForm(false); setSelected(null); }}
              onCancel={() => setShowForm(false)}
            />
          ) : (
            <>
              <p className="eyebrow" style={{ marginBottom: 6 }}>
                Event details
              </p>
              <h3
                style={{
                  margin: '0 0 4px',
                  fontSize: 22,
                  fontWeight: 700,
                  color: 'var(--ink)',
                }}
              >
                {selected.name}
              </h3>
              <p className="fine" style={{ marginBottom: 16 }}>
                {formatDisplayDate(selected.date)}
              </p>

              <div>
                <div className="cal-detail-row">
                  <span className="cal-detail-label">Time</span>
                  <span>
                    {formatTime(selected.startTime)} – {formatTime(selected.endTime)}
                  </span>
                </div>
                <div className="cal-detail-row">
                  <span className="cal-detail-label">Location</span>
                  <span>{selected.location}</span>
                </div>
                {selected.capacity !== undefined && (
                  <div className="cal-detail-row">
                    <span className="cal-detail-label">Capacity</span>
                    <span>{selected.capacity} volunteers</span>
                  </div>
                )}
              </div>

              <p
                style={{
                  marginTop: 16,
                  lineHeight: 1.6,
                  color: 'var(--slate)',
                  fontSize: 15.5,
                }}
              >
                {selected.description}
              </p>

              <div className="cta-row" style={{ marginTop: 24 }}>
                <button
                  className="btn btn-solid"
                  onClick={() => setShowForm(true)}
                >
                  Register to volunteer
                </button>
                <button
                  className="btn btn-outline on-light"
                  onClick={() => setSelected(null)}
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
