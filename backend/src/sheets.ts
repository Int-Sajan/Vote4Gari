// Google Sheets client — wraps googleapis auth and append logic.
// All credential handling stays here; nothing is exported to the API layer
// except the `appendRegistration` function.

import { google } from 'googleapis';

// ── Auth ─────────────────────────────────────────────────────────────────────

function getAuth() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey   = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error(
      'Missing Google credentials. Set GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY in .env'
    );
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

// ── Sheet details ────────────────────────────────────────────────────────────

const SHEET_ID = process.env.GOOGLE_SHEET_ID ?? '';

const VOLUNTEER_SHEET_NAME = 'Registrations';
const INVOLVED_SHEET_NAME = 'Get Involved';

// ── Public API ───────────────────────────────────────────────────────────────

export interface SheetRow {
  registrationId: string;
  campaign: string;
  eventId: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  name: string;
  phone: string;
  email: string;
  registeredAt: string; // ISO 8601
}

export interface InvolvedSheetRow {
  registrationId: string;
  name: string;
  email: string;
  mobile: string;
  postal: string;
  lang: string;
  remind: string;
  sign: string;
  volunteer: string;
  registeredAt: string;
}

function columnName(index: number): string {
  let current = index;
  let result = '';

  while (current >= 0) {
    result = String.fromCharCode((current % 26) + 65) + result;
    current = Math.floor(current / 26) - 1;
  }

  return result;
}

async function ensureSheetWithHeaders(
  spreadsheetId: string,
  sheetName: string,
  headers: string[],
): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  const workbook = await sheets.spreadsheets.get({ spreadsheetId });
  const exists = workbook.data.sheets?.some((sheet) => sheet.properties?.title === sheetName) ?? false;

  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title: sheetName } } }],
      },
    });
  }

  const headerRange = `${sheetName}!A1:${columnName(headers.length - 1)}1`;
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: headerRange,
    valueInputOption: 'RAW',
    requestBody: { values: [headers] },
  });
}

async function appendRowToSheet(sheetName: string, row: string[], headers: string[]): Promise<void> {
  if (!SHEET_ID) {
    throw new Error('Missing GOOGLE_SHEET_ID in .env');
  }

  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  await ensureSheetWithHeaders(SHEET_ID, sheetName, headers);

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${sheetName}!A:${columnName(headers.length - 1)}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  });
}

export async function appendRegistration(row: SheetRow): Promise<void> {
  if (!SHEET_ID) {
    throw new Error('Missing GOOGLE_SHEET_ID in .env');
  }

  const headers = [
    'Registration ID',
    'Campaign',
    'Event ID',
    'Date',
    'Start Time',
    'End Time',
    'Location',
    'Name',
    'Phone',
    'Email',
    'Registered At',
  ];

  const values = [
    row.registrationId,
    row.campaign,
    row.eventId,
    row.date,
    row.startTime,
    row.endTime,
    row.location,
    row.name,
    row.phone,
    row.email,
    row.registeredAt,
  ];

  await appendRowToSheet(VOLUNTEER_SHEET_NAME, values, headers);
}

export async function appendInvolvedRegistration(row: InvolvedSheetRow): Promise<void> {
  if (!SHEET_ID) {
    throw new Error('Missing GOOGLE_SHEET_ID in .env');
  }

  const headers = [
    'Registration ID',
    'Name',
    'Email',
    'Mobile',
    'Postal Code',
    'Best Language',
    'Remind Me on Oct 16',
    'Lawn Sign',
    'Volunteer',
    'Registered At',
  ];

  const values = [
    row.registrationId,
    row.name,
    row.email,
    row.mobile,
    row.postal,
    row.lang,
    row.remind,
    row.sign,
    row.volunteer,
    row.registeredAt,
  ];

  await appendRowToSheet(INVOLVED_SHEET_NAME, values, headers);
}
