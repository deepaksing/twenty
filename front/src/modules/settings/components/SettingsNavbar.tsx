import { useCallback } from 'react';
import { useMatch, useResolvedPath } from 'react-router-dom';
import { useTheme } from '@emotion/react';

import { useAuth } from '@/auth/hooks/useAuth';
import {
  IconColorSwatch,
  IconLogout,
  IconSettings,
  IconUser,
} from '@/ui/icons/index';
import NavItem from '@/ui/layout/navbar/NavItem';
import NavItemsContainer from '@/ui/layout/navbar/NavItemsContainer';
import NavTitle from '@/ui/layout/navbar/NavTitle';
import SubNavbarContainer from '@/ui/layout/navbar/sub-navbar/SubNavBarContainer';

export function SettingsNavbar() {
  const theme = useTheme();

  const { logout } = useAuth();

  const handleLogout = useCallback(() => {
    logout();
    window.location.href = '/';
  }, [logout]);

  return (
    <SubNavbarContainer backButtonTitle="Settings">
      <NavItemsContainer>
        <NavTitle label="User" />
        <NavItem
          label="Profile"
          to="/settings/profile"
          icon={<IconUser size={theme.iconSizeMedium} />}
          active={
            !!useMatch({
              path: useResolvedPath('/people').pathname,
              end: true,
            })
          }
        />
        <NavItem
          label="Experience"
          to="/settings/profile/experience"
          icon={<IconColorSwatch size={theme.iconSizeMedium} />}
          soon={true}
          active={
            !!useMatch({
              path: useResolvedPath('/settings/profile/experience').pathname,
              end: true,
            })
          }
        />
        <NavTitle label="Workspace" />
        <NavItem
          label="General"
          to="/settings/workspace"
          icon={<IconSettings size={theme.iconSizeMedium} />}
          soon={true}
          active={
            !!useMatch({
              path: useResolvedPath('/settings/workspace').pathname,
              end: true,
            })
          }
        />
        <NavTitle label="Other" />
        <NavItem
          label="Logout"
          onClick={handleLogout}
          icon={<IconLogout size={theme.iconSizeMedium} />}
          danger={true}
        />
      </NavItemsContainer>
    </SubNavbarContainer>
  );
}
