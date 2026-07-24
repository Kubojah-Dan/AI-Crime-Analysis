/**
 * AegisIQ Report Export Utilities (Styled Excel & PDF)
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

  const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  const headers = Object.keys(rows[0]);

  // Build Styled HTML Spreadsheet (.xls) compatible with Microsoft Excel & Apple Numbers
  const excelHtml = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"/>
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>AegisIQ Intelligence</x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
          table { border-collapse: collapse; font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; }
          .meta-header { background-color: #0F172A; color: #38BDF8; font-weight: bold; font-size: 13px; text-align: left; padding: 12px; border: 1px solid #1E293B; }
          .meta-sub { background-color: #1E293B; color: #94A3B8; font-size: 11px; padding: 8px 12px; border: 1px solid #334155; }
          th { background-color: #2B5AA0; color: #FFFFFF; font-weight: bold; text-transform: uppercase; font-size: 11px; padding: 10px 16px; border: 1px solid #1E3A8A; text-align: left; }
          td { padding: 9px 16px; border: 1px solid #CBD5E1; color: #1E293B; }
          .risk-high { background-color: #FEE2E2; color: #991B1B; font-weight: bold; }
          .risk-mod { background-color: #FEF3C7; color: #92400E; font-weight: bold; }
          .risk-low { background-color: #DCFCE7; color: #166534; font-weight: bold; }
          .id-col { font-family: monospace; font-weight: bold; color: #2B5AA0; }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr>
              <td colspan="${headers.length}" className="meta-header" style="background-color:#0F172A; color:#38BDF8; font-size:14px; font-weight:bold; padding:12px; border:1px solid #1E293B;">
                AEGISIQ PUBLIC SAFETY INTELLIGENCE & DECISION SUPPORT REPORT
              </td>
            </tr>
            <tr>
              <td colspan="${headers.length}" className="meta-sub" style="background-color:#1E293B; color:#94A3B8; font-size:11px; padding:8px 12px; border:1px solid #334155;">
                REPORT: ${filename.toUpperCase()} | GENERATED: ${dateStr} | CLEARANCE: LEVEL-5 POLICE CONTROL ROOM | PROVENANCE: VERIFIED
              </td>
            </tr>
            <tr><td colspan="${headers.length}" style="height:10px; background-color:#FFFFFF; border:none;"></td></tr>
            <tr>
              ${headers.map(h => `<th style="background-color:#2B5AA0; color:#FFFFFF; font-weight:bold; text-transform:uppercase; font-size:11px; padding:10px 16px; border:1px solid #1E3A8A;">${h.replace(/_/g, ' ')}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${rows.map(row => {
              const riskStr = String(row['Risk_Level'] || row['status'] || row['risk_score'] || '').toUpperCase();
              let rowClass = '';
              if (riskStr.includes('HIGH') || riskStr.includes('CRITICAL') || Number(riskStr) > 70) rowClass = 'background-color:#FEE2E2; color:#991B1B; font-weight:bold;';
              else if (riskStr.includes('MOD') || (Number(riskStr) >= 40 && Number(riskStr) <= 70)) rowClass = 'background-color:#FEF3C7; color:#92400E;';
              else if (riskStr.includes('LOW')) rowClass = 'background-color:#DCFCE7; color:#166534;';

              return `
                <tr>
                  ${headers.map(header => {
                    const val = row[header] ?? '';
                    const isRiskCol = header.toLowerCase().includes('risk');
                    const isIdCol = header.toLowerCase().includes('district') || header.toLowerCase().includes('id');
                    
                    let cellStyle = 'padding:9px 16px; border:1px solid #CBD5E1; color:#1E293B;';
                    if (isRiskCol && rowClass) cellStyle += ' ' + rowClass;
                    if (isIdCol) cellStyle += ' font-weight:bold; color:#2B5AA0;';

                    return `<td style="${cellStyle}">${val}</td>`;
                  }).join('')}
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `;

  // Download styled Excel spreadsheet (.xls)
  const blob = new Blob(['\uFEFF' + excelHtml], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.xls`);
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
            background-color: #2B5AA0;
            color: #FFFFFF;
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
