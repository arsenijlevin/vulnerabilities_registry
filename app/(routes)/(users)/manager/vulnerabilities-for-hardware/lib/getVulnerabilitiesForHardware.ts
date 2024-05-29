'use client';

interface VulnerabilitiesFrontType {
  vulnerability_name: string;
  vulnerability_types: string;
  long_text_description: string;
}

export async function getVulnerabilitiesForHardware(id: number) {
  const res = await fetch(`/api/vulnerability?hardware=${id.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = (await res.json()) as VulnerabilitiesForHardware;
  const usersWithStringRights: VulnerabilitiesFrontType[] = json.map((vuln) => {
    return {
      id: vuln.id,
      vulnerability_name: vuln.name,
      vulnerability_types: vuln.vuln_types.map((type) => type.vuln_types_list.title).join(', '),
      long_text_description: vuln.long_text_description ?? '',
    };
  }) as VulnerabilitiesFrontType[];

  return usersWithStringRights;
}

export type VulnerabilitiesForHardware = VulnerabilityForHardware[];

export interface VulnerabilityForHardware {
  id: number;
  name: string;
  discovery_date: string;
  is_fixed: boolean;
  long_text_description?: string;
  vuln_hardware: VulnHardware[];
  vuln_types: {
    vuln_types_list: {
      title: string;
    };
  }[];
}

export interface VulnHardware {
  hardware: Hardware;
}

export interface Hardware {
  hardware_location: HardwareLocation[];
}

export interface HardwareLocation {
  hardware: Hardware2;
  locations: Locations;
}

export interface Hardware2 {
  id: number;
  name: string;
  long_text_description: string;
}

export interface Locations {
  id: number;
  name: string;
  description: string;
}
