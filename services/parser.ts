
import { EvolutionLine, DigimonNode, EvolutionRequirement } from '../types';
import { ITEM_NAMES } from '../constants';

export function parseEvolutionLines(rawText: string): EvolutionLine[] {
  const lines: EvolutionLine[] = [];
  const rows = rawText.split('\n');
  
  let currentLine: EvolutionLine | null = null;
  let currentDigimon: string | null = null;

  rows.forEach(row => {
    const trimmed = row.trim();
    if (!trimmed || trimmed.startsWith('—') || trimmed.includes('@')) return;

    // Detect Header: "AGUMON LINE"
    if (trimmed.endsWith(' LINE') && !trimmed.startsWith('├') && !trimmed.startsWith('└')) {
      if (currentLine) lines.push(currentLine);
      
      currentLine = {
        title: trimmed,
        root: '', // Will set first digimon found as root
        nodes: {}
      };
      currentDigimon = null;
      return;
    }

    if (!currentLine) return;

    // Detect Evolution: "├─ Lv20 → Angemon"
    if (trimmed.startsWith('├─') || trimmed.startsWith('└─')) {
      if (!currentDigimon) return;
      
      const content = trimmed.slice(3).trim();
      const isBidirectional = content.includes('⇄');
      const arrow = isBidirectional ? '⇄' : '→';
      const [reqPart, targetPartRaw] = content.split(arrow).map(s => s.trim());

      if (targetPartRaw) {
        const targets = targetPartRaw.split(' or ').map(t => t.trim());
        
        targets.forEach(targetName => {
          let target = targetName;
          // Contextual fixes for common shorthand in the text file
          if (target === "Priest Mode" && currentDigimon === "HolyAngemon") {
            target = "HolyAngemon Priest Mode";
          } else if (target === "Burst Mode") {
            // Check if currentDigimon contains "Mode" already to avoid "Beelzebumon Blast Mode Mode"
            target = currentDigimon.includes('Mode') ? `${currentDigimon.replace(' Mode', '')} Burst Mode` : `${currentDigimon} Burst Mode`;
          } else if (target === "Blast Mode") {
            target = `${currentDigimon} Blast Mode`;
          } else if (target === "Leopard Mode") {
            target = "Duftmon Leopard Mode";
          } else if (target === "Crimson Mode") {
            target = `${currentDigimon} Crimson Mode`;
          } else if (target === "Fury Mode") {
            target = `${currentDigimon} Fury Mode`;
          } else if (target === "True Form") {
            target = `${currentDigimon} True Form`;
          } else if (target === "Takemikazuchi") {
            target = `${currentDigimon} Takemikazuchi`;
          } else if (target === "Alter-S") {
            target = `${currentDigimon} Alter-S`;
          } else if (target === "Medium") {
            target = `${currentDigimon} Medium`;
          } else if (target === "Ouryuken") {
            target = `${currentDigimon} Ouryuken`;
          }


          const reqs = parseRequirements(reqPart, isBidirectional);
          
          if (!currentLine!.nodes[currentDigimon!]) {
            currentLine!.nodes[currentDigimon!] = { name: currentDigimon!, evolutions: [] };
          }
          
          currentLine!.nodes[currentDigimon!].evolutions.push({
            to: target,
            requirements: reqs,
            isBidirectional
          });

          if (isBidirectional) {
            // Ensure the target node exists for reverse evolution if not already there
            if (!currentLine!.nodes[target]) {
              currentLine!.nodes[target] = { name: target, evolutions: [] };
            }
            // Add reverse evolution if it doesn't already exist to avoid duplicates
            const exists = currentLine!.nodes[target].evolutions.some(e => e.to === currentDigimon && e.isBidirectional);
            if (!exists) {
              currentLine!.nodes[target].evolutions.push({
                to: currentDigimon!,
                requirements: reqs,
                isBidirectional
              });
            }
          }
        });
      }
    } else {
      // New Digimon name
      currentDigimon = trimmed;
      if (!currentLine.root) currentLine.root = currentDigimon;
      if (!currentLine.nodes[currentDigimon]) {
        currentLine.nodes[currentDigimon] = { name: currentDigimon, evolutions: [] };
      }
    }
  });

  if (currentLine) lines.push(currentLine);

  return lines;
}

function parseRequirements(reqStr: string, isBidirectional: boolean): EvolutionRequirement[] {
  const reqs: EvolutionRequirement[] = [];
  let remainingReqStr = reqStr;

  // Level requirement
  const lvMatch = remainingReqStr.match(/Lv(\d+)/);
  if (lvMatch) {
    reqs.push({ type: 'level', value: `Lv. ${lvMatch[1]}`, isBidirectional });
    remainingReqStr = remainingReqStr.replace(lvMatch[0], '').trim();
  }

  // Data types
  const dataTypes = ['Light Data', 'Dark Data', 'Fire Data', 'Thunder Data', 'Water Data', 'Earth Data', 'Wind Data', 'Wood Data', 'Ice Data', 'Mechanic Data', 'Metal Data'];
  dataTypes.forEach(dt => {
    if (remainingReqStr.includes(dt)) {
      reqs.push({ type: 'data', value: dt, isBidirectional });
      remainingReqStr = remainingReqStr.replace(dt, '').trim();
    }
  });

  // Nature requirements
  if (remainingReqStr.includes('Lowkey')) {
    reqs.push({ type: 'nature', value: 'Lowkey Nature', isBidirectional });
    remainingReqStr = remainingReqStr.replace('Lowkey', '').trim();
  }
  if (remainingReqStr.includes('Amped')) {
    reqs.push({ type: 'nature', value: 'Amped Nature', isBidirectional });
    remainingReqStr = remainingReqStr.replace('Amped', '').trim();
  }

  // Jogress requirement
  if (remainingReqStr.toLowerCase().includes('jogress')) {
    reqs.push({ type: 'jogress', value: reqStr, isBidirectional }); // Keep full string for Jogress as it contains details
    remainingReqStr = ''; // Clear remaining string for jogress as it's typically the sole requirement
  }
  
  // Item requirements
  ITEM_NAMES.forEach(item => {
    if (remainingReqStr.includes(item)) {
      reqs.push({ type: 'item', value: item, isBidirectional });
      remainingReqStr = remainingReqStr.replace(item, '').trim();
    }
  });

  // Any remaining text is a condition
  if (remainingReqStr) {
    // Clean up any lingering "with", "knowing", "holding" if they are at the start
    let cleanedCondition = remainingReqStr
      .replace(/^(with|knowing|holding|using)\s+/i, '')
      .trim();
    
    // Check for special cases like "random" or "Max Friendship level up" which might be lone conditions
    if (cleanedCondition) {
      reqs.push({ type: 'condition', value: cleanedCondition, isBidirectional });
    }
  }

  return reqs;
}
