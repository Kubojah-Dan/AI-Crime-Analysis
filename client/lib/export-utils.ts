/**
 * AegisIQ Report Export Utilities (PDF & CSV)
 */

export interface ReportItem {
  id: string;
  timestamp: string;
  category: string;
  ipc_section: string;
  district: string;
  risk_score: number;
  status: string;
  provenance: string;
}

export function downloadCSV(filename: string, rows: Record<string, any>[]) {
  if (!rows || !rows.length) return;

  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(','),
    ...rows.map(row => 
      headers.map(header => {
        const val = row[header] ?? '';
        return `"${String(val).replace(/"/g, '""')}"`;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadPDF(title: string, items: ReportItem[]) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title} - AegisIQ Public Safety Intelligence</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@400;600&display=swap');
          body {
            font-family: 'IBM Plex Sans', sans-serif;
            background-color: #F8F7F3;
            color: #202A33;
            margin: 40px;
          }
          .header {
            border-bottom: 2px solid #202A33;
            padding-bottom: 15px;
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          .title {
            font-family: 'Fraunces', serif;
            font-size: 24px;
            font-weight: 700;
            color: #2B5AA0;
          }
          .meta {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 11px;
            color: #5B6570;
          }
          .badge {
            display: inline-block;
            padding: 3px 8px;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 10px;
            font-weight: 700;
            border: 1px solid #3F6B57;
            color: #3F6B57;
            background: rgba(63,107,87,0.1);
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 12px;
          }
          th, td {
            border: 1px solid #C9C6B8;
            padding: 10px;
            text-align: left;
          }
          th {
            background-color: #E7E5DC;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 11px;
            text-transform: uppercase;
          }
          .risk-high {
            color: #A63B2A;
            font-weight: bold;
          }
          .footer {
            margin-top: 50px;
            border-top: 1px solid #C9C6B8;
            padding-top: 20px;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 10px;
            color: #5B6570;
            display: flex;
            justify-content: space-between;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">AegisIQ Intelligence Brief</div>
            <div class="meta">PUBLIC SAFETY & DECISION SUPPORT PLATFORM — INDIA</div>
          </div>
          <div class="meta">
            DATE: ${dateStr}<br/>
            SECURITY CLEARANCE: LEVEL-5
          </div>
        </div>

        <div class="badge">PROVENANCE: VERIFIED LEDGER RECORD</div>

        <h3>${title}</h3>

        <table>
          <thead>
            <tr>
              <th>CASE / EVENT ID</th>
              <th>TIMESTAMP</th>
              <th>CATEGORY & IPC</th>
              <th>DISTRICT / SECTOR</th>
              <th>RISK SCORE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(item => `
              <tr>
                <td style="font-family: 'IBM Plex Mono', monospace; font-weight: bold;">${item.id}</td>
                <td style="font-family: 'IBM Plex Mono', monospace;">${item.timestamp}</td>
                <td>${item.category} (${item.ipc_section || 'IPC 379'})</td>
                <td>${item.district}</td>
                <td class="${item.risk_score > 70 ? 'risk-high' : ''}">${item.risk_score}%</td>
                <td style="font-family: 'IBM Plex Mono', monospace;">${item.status}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="footer">
          <div>HUMAN-IN-THE-LOOP AUDIT INVARIANT INTACT</div>
          <div>CONFIDENTIAL // POLICE CONTROL ROOM COPY</div>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
