"use client"

import { VulnerabilitiesForHardware } from "@api/vulnerabilities/getForHardwareId/route";

interface VulnerabilitiesFrontType {
  vulnerability_name: string;
  vulnerability_types: string;
  long_text_description: string;
}

export async function getVulnerabilitiesForHardware(id: number) {
  const res = await fetch("/api/vulnerabilities/getForHardwareId", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id
    }),
  });
  const json = await res.json() as VulnerabilitiesForHardware;
  const usersWithStringRights: VulnerabilitiesFrontType[] = json.map((vuln) => {
    return {
      id: vuln.id,
      vulnerability_name: vuln.name,
      vulnerability_types: vuln.vuln_types.map(type => type.vuln_types_list.title).join(", "),
      long_text_description: vuln.long_text_description || ""
    };
  }) as VulnerabilitiesFrontType[];

  return usersWithStringRights as VulnerabilitiesFrontType[];
}