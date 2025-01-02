import UserAvatar from '@/components/UserAvatar';
import {
  IProjectDataType,
  IProjectMemberDataType,
} from '@/lib/types/interfaces';
import { CellContext } from '@tanstack/react-table';

export default function ProjectMembersDisplay({
  members,
}: {
  members: CellContext<IProjectDataType, IProjectMemberDataType[]>;
}) {
  const membersValue = members.getValue();
  return (
    <div className="flex">
      {/* Display first member avatar */}
      {membersValue.length > 0 ? (
        <UserAvatar
          avatarUrl={membersValue[0].avatar}
          fallbackName={membersValue[0].name}
          key={membersValue[0].userId}
        />
      ) : (
        <div className="text-sm italic text-gray-600">No members yet</div>
      )}

      {/* Display second member avatar if exists */}
      {membersValue.length > 1 && (
        <UserAvatar
          className="-translate-x-4"
          avatarUrl={membersValue[1].avatar}
          fallbackName={membersValue[1].name}
          key={membersValue[1].userId}
        />
      )}

      {/* Show remaining members count if more than 2 */}
      {membersValue.length > 2 && (
        <span className="flex items-center justify-center text-sm text-gray-600 -translate-x-8 border rounded-full size-10 bg-card">
          +{membersValue.length - 2}
        </span>
      )}
    </div>
  );
}
