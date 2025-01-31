import { useLocation } from 'react-router-dom';
import { useTheme } from '@emotion/react';

import { SettingsNavbar } from '@/settings/components/SettingsNavbar';
import {
  IconBuildingSkyscraper,
  IconInbox,
  IconSearch,
  IconSettings,
  IconTargetArrow,
  IconUser,
} from '@/ui/icons/index';
import NavItemsContainer from '@/ui/layout/navbar/NavItemsContainer';

import NavItem from './modules/ui/layout/navbar/NavItem';
import NavTitle from './modules/ui/layout/navbar/NavTitle';
import NavWorkspaceButton from './modules/ui/layout/navbar/NavWorkspaceButton';

export function AppNavbar() {
  const theme = useTheme();
  const currentPath = useLocation().pathname;

  const shouldDiplaySubNavBar = currentPath.match(/\/settings\//g) !== null;

  return (
    <>
      {!shouldDiplaySubNavBar ? (
        <>
          <NavWorkspaceButton />
          <NavItemsContainer>
            <NavItem
              label="Search"
              to="/search"
              icon={<IconSearch size={theme.iconSizeMedium} />}
              soon={true}
            />
            <NavItem
              label="Inbox"
              to="/inbox"
              icon={<IconInbox size={theme.iconSizeMedium} />}
              soon={true}
            />
            <NavItem
              label="Settings"
              to="/settings/profile"
              icon={<IconSettings size={theme.iconSizeMedium} />}
            />
            <NavTitle label="Workspace" />
            <NavItem
              label="People"
              to="/people"
              icon={<IconUser size={theme.iconSizeMedium} />}
              active={currentPath === '/people'}
            />
            <NavItem
              label="Companies"
              to="/companies"
              icon={<IconBuildingSkyscraper size={theme.iconSizeMedium} />}
              active={currentPath === '/companies'}
            />
            <NavItem
              label="Opportunities"
              to="/opportunities"
              icon={<IconTargetArrow size={theme.iconSizeMedium} />}
              active={currentPath === '/opportunities'}
            />
          </NavItemsContainer>
        </>
      ) : (
        <SettingsNavbar />
      )}
    </>
  );
}
