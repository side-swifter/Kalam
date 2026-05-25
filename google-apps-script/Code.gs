const SPREADSHEET_ID = '14UNIYDoLzRiMYGzV_UkIaL4N7ykG_vtJGMq8nVq0NJg';
const SHEET_NAME = 'Signups';
const HEADERS = ['Timestamp', 'Name', 'Email', 'Interest', 'Submitted At', 'Source'];

function doGet() {
  return jsonResponse({
    ok: true,
    message: 'The Kalam Project signup endpoint is active.',
    spreadsheetId: SPREADSHEET_ID,
    sheetName: SHEET_NAME
  });
}

function doPost(e) {
  try {
    const data = e && e.parameter ? e.parameter : {};
    const name = cleanValue(data.name);
    const email = cleanValue(data.email).toLowerCase();
    const interest = cleanValue(data.interest);
    const submittedAt = cleanValue(data.submittedAt);
    const source = cleanValue(data.source) || 'kalam-website';

    if (!name || !email || !interest) {
      return jsonResponse({ ok: false, error: 'Name, email, and interest are required.' });
    }

    if (!isValidEmail(email)) {
      return jsonResponse({ ok: false, error: 'Invalid email address.' });
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    try {
      const sheet = getOrCreateSheet();
      sheet.appendRow([new Date(), name, email, interest, submittedAt, source]);
    } finally {
      lock.releaseLock();
    }

    return jsonResponse({ ok: true, message: 'Signup received.' });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: String(error.message || error) });
  }
}

function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#123d75')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, HEADERS.length);
  }

  return sheet;
}

function cleanValue(value) {
  return String(value || '').trim().slice(0, 500);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

