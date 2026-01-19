
export interface EvolutionRequirement {
  type: 'level' | 'item' | 'condition' | 'nature' | 'jogress' | 'data';
  value: string;
  isBidirectional?: boolean;
}

export interface EvolutionPath {
  to: string;
  requirements: EvolutionRequirement[];
  isBidirectional?: boolean;
}

export interface DigimonNode {
  name: string;
  evolutions: EvolutionPath[];
}

export interface EvolutionLine {
  title: string;
  root: string;
  nodes: Record<string, DigimonNode>;
}

// DigimonApiData is now a placeholder type since API usage is removed.
// Its properties will be populated with default/placeholder values.
export interface DigimonApiData {
  id: number;
  name: string;
  image: string;
  level: string;
}

export interface NatureCategory {
  name: 'Lowkey' | 'Amped';
  traits: string[];
}

export interface SelectedDigimonForInfo {
  name: string;
  level: string;
  imageUrl: string;
  evolutionNode: DigimonNode;
  incomingRequirements: string[];
}
