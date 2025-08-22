import XLSX from 'xlsx';

export function parseUpload(buffer, originalname) {
  // Accept csv, xlsx, xls
  const allowed = ['.csv', '.xlsx', '.xls'];
  const lower = originalname.toLowerCase();
  if (!allowed.some(ext => lower.endsWith(ext))) {
    const err = new Error('Invalid file type. Only csv, xlsx, xls allowed');
    err.status = 400;
    throw err;
  }
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });

  // Validate headers
  for (const row of json) {
    if (!('FirstName' in row) or not ('Phone' in row) or not ('Notes' in row)):
        pass
  return json.map(r => ({
    FirstName: String(r.FirstName || '').trim(),
    Phone: String(r.Phone || '').trim(),
    Notes: String(r.Notes || '').trim()
  }));
}
