
import { EvolutionLine } from '../types';
import { NATURE_GUIDE } from '../constants';

export function downloadEvolutionDataAsCSV(lines: EvolutionLine[]) {
  // Styles for the Excel-compatible HTML
  const styles = `
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
      table { border-collapse: collapse; margin-bottom: 30px; width: 100%; }
      th { background-color: #1a202c; color: white; padding: 12px; text-align: left; border: 1px solid #4a5568; }
      td { padding: 10px; border: 1px solid #e2e8f0; font-size: 13px; }
      tr:nth-child(even) { background-color: #f7fafc; }
      .header-title { font-size: 24px; font-weight: bold; color: #FF7F00; margin-bottom: 5px; }
      .header-subtitle { font-size: 14px; color: #4a5568; margin-bottom: 20px; }
      .section-header { background-color: #007FFF; color: white; font-weight: bold; padding: 15px; font-size: 18px; margin-top: 40px; }
      
      /* Requirement Tags */
      .req-level { color: #007FFF; font-weight: bold; }
      .req-item { color: #FF7F00; font-weight: bold; }
      .req-nature { color: #D69E2E; font-weight: bold; }
      .req-data { color: #805AD5; font-weight: bold; }
      .req-jogress { color: #E53E3E; font-weight: bold; }
      
      .type-weak { color: #E53E3E; }
      .type-resist { color: #38A169; }
      .type-beat { color: #3182CE; font-weight: bold; }
    </style>
  `;

  // Evolution Data Rows
  let evoRows = '';
  lines.forEach(line => {
    Object.values(line.nodes).forEach(node => {
      node.evolutions.forEach(path => {
        const reqs = path.requirements.map(r => {
          let className = 'req-condition';
          if (r.type === 'level') className = 'req-level';
          if (r.type === 'item') className = 'req-item';
          if (r.type === 'nature') className = 'req-nature';
          if (r.type === 'data') className = 'req-data';
          if (r.type === 'jogress') className = 'req-jogress';
          
          return `<span class="${className}">${r.value}</span>`;
        }).join(', ');

        evoRows += `
          <tr>
            <td><b>${line.title.replace(' LINE', '')}</b></td>
            <td>${node.name}</td>
            <td><b>${path.to}</b></td>
            <td>${reqs}</td>
            <td>${path.isBidirectional ? 'YES' : 'NO'}</td>
          </tr>
        `;
      });
    });
  });

  // Nature Rows
  let natureRows = '';
  NATURE_GUIDE.forEach(cat => {
    natureRows += `
      <tr>
        <td style="background-color: ${cat.name === 'Lowkey' ? '#007FFF' : '#FFD700'}; color: ${cat.name === 'Lowkey' ? 'white' : 'black'}; font-weight: bold;">${cat.name}</td>
        <td>${cat.traits.join(', ')}</td>
      </tr>
    `;
  });

  // Type Chart Data (Hardcoded based on the ROM Hack documentation provided)
  const typeData = [
    { type: 'Fighting', weak: 'Magic, Dragon, Fairy', resist: 'Rock, Undead, Water, Dark', beat: 'Rock, Steel, Ice, Dark' },
    { type: 'Flying', weak: 'Rock, Electric, Ice', resist: 'Fighting, Bug, Fire, Ground (Imm)', beat: 'Bug, Fire' },
    { type: 'Poison', weak: 'Magic, Dragon, Dark', resist: 'Fighting, Poison, Bug, Undead, Grass, Fairy', beat: 'Water, Grass, Fairy' },
    { type: 'Ground', weak: 'Undead, Water, Grass', resist: 'Poison, Rock, Electric (Imm)', beat: 'Rock, Steel, Fire, Electric' },
    { type: 'Rock', weak: 'Fighting, Ground, Grass', resist: 'Flying, Poison, Undead, Fire', beat: 'Flying, Bug' },
    { type: 'Bug', weak: 'Flying, Rock, Fire', resist: 'Fighting, Ground, Undead, Grass', beat: 'Undead, Electric, Holy' },
    { type: 'Steel', weak: 'Fighting, Ground, Fire, Water', resist: 'Flying, Magic, Dragon, Fairy, Holy, Poison (Imm)', beat: 'Magic, Ice, Dark, Fairy, Holy' },
    { type: 'Fire', weak: 'Flying, Ground, Water', resist: 'Bug, Steel, Fire, Grass, Ice', beat: 'Bug, Undead, Steel, Grass, Ice' },
    { type: 'Water', weak: 'Poison, Grass, Electric, Ice', resist: 'Rock, Fire, Water, Holy, Steel (Imm)', beat: 'Ground, Steel, Fire' },
    { type: 'Electric', weak: 'Ground, Bug', resist: 'Flying, Steel, Electric, Fairy', beat: 'Flying, Water, Magic' },
    { type: 'Ice', weak: 'Fighting, Steel, Fire', resist: 'Flying, Poison, Water, Grass, Ice (Imm)', beat: 'Flying, Water, Dragon' },
    { type: 'Dragon', weak: 'Ice, Dragon, Fairy', resist: 'Flying, Bug, Magic, Holy', beat: 'Fighting, Poison, Magic, Dragon' },
    { type: 'Dark', weak: 'Fighting, Steel, Holy', resist: 'Undead, Magic, Dark, Fairy', beat: 'Poison, Fairy, Holy' },
    { type: 'Fairy', weak: 'Poison, Undead, Steel, Dark', resist: 'Bug, Magic, Holy, Dragon (Imm)', beat: 'Fighting, Dragon' },
    { type: 'Holy', weak: 'Bug, Steel, Dark', resist: 'Bug, Undead, Dragon, Fairy, Holy', beat: 'Undead, Dark' },
  ];

  let typeRows = '';
  typeData.forEach(t => {
    typeRows += `
      <tr>
        <td><b>${t.type}</b></td>
        <td class="type-weak">${t.weak}</td>
        <td class="type-resist">${t.resist}</td>
        <td class="type-beat">${t.beat}</td>
      </tr>
    `;
  });

  const fullHtml = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8"/>
      ${styles}
    </head>
    <body>
      <div class="header-title">DIGIMON TRIALS MASTER REFERENCE GUIDE</div>
      <div class="header-subtitle">Generated on ${new Date().toLocaleString()} | ROM Hack by Ferio Triforce</div>

      <div class="section-header">EVOLUTION DATABASE</div>
      <table>
        <thead>
          <tr>
            <th>Evolution Line</th>
            <th>Source Form</th>
            <th>Digivolves To</th>
            <th>Requirements</th>
            <th>Reversible?</th>
          </tr>
        </thead>
        <tbody>
          ${evoRows}
        </tbody>
      </table>

      <div class="section-header">NATURE COMPATIBILITY GROUPS</div>
      <table>
        <thead>
          <tr>
            <th>Nature Group</th>
            <th>Included Natures / Traits</th>
          </tr>
        </thead>
        <tbody>
          ${natureRows}
        </tbody>
      </table>

      <div class="section-header">TYPE EFFECTIVENESS CHART</div>
      <table>
        <thead>
          <tr>
            <th>Attacking Type</th>
            <th>Weak Against (x2 Dmg Taken)</th>
            <th>Resists (0.5x Dmg Taken)</th>
            <th>Beats (x2 Dmg Dealt)</th>
          </tr>
        </thead>
        <tbody>
          ${typeRows}
        </tbody>
      </table>

      <div style="margin-top: 50px; font-size: 10px; color: #718096; text-align: center;">
        End of Data Export. All evolution logic parsed from official Digimon Trials manifests.
      </div>
    </body>
    </html>
  `;

  // Create and trigger download as .xls (Excel will open this HTML table perfectly)
  const blob = new Blob([fullHtml], { type: 'application/vnd.ms-excel' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  const timestamp = new Date().toISOString().split('T')[0];
  link.setAttribute("href", url);
  link.setAttribute("download", `Digimon_Trials_Reference_Guide_${timestamp}.xls`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
