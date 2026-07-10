import type { ReactNode } from "react";

import type { SituationBlockGroup } from "../situationTypes";

interface SituationGroupsProps {
  groups?: SituationBlockGroup[];
  renderGroup: (group: SituationBlockGroup) => ReactNode;
}

/** Optional sub-badges + content under a situation section (cards, stack tags). */
export default function SituationGroups({ groups, renderGroup }: SituationGroupsProps) {
  if (!Array.isArray(groups) || groups.length === 0) {
    return null;
  }

  return (
    <div className="situation-groups">
      {groups.map((group, index) => (
        <div key={group.badge ?? `group-${index}`} className="situation-groups__group">
          {group.badge != null && group.badge !== "" && (
            <p className="section__badge situation-groups__badge">{group.badge}</p>
          )}
          {renderGroup(group)}
        </div>
      ))}
    </div>
  );
}
