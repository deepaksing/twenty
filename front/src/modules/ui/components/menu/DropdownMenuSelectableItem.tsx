import React, { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { IconCheck } from '@/ui/icons/index';
import { hoverBackground } from '@/ui/layout/styles/themes';

import { DropdownMenuButton } from './DropdownMenuButton';

type Props = {
  selected: boolean;
  onClick: () => void;
  hovered?: boolean;
};

const DropdownMenuSelectableItemContainer = styled(DropdownMenuButton)<Props>`
  ${hoverBackground};

  align-items: center;

  background: ${(props) =>
    props.hovered ? props.theme.lightBackgroundTransparent : 'transparent'};

  display: flex;
  justify-content: space-between;
`;

const StyledLeftContainer = styled.div`
  align-items: center;
  display: flex;

  gap: ${(props) => props.theme.spacing(2)};
`;

const StyledRightIcon = styled.div`
  display: flex;
`;

export function DropdownMenuSelectableItem({
  selected,
  onClick,
  children,
  hovered,
}: React.PropsWithChildren<Props>) {
  const theme = useTheme();

  useEffect(() => {
    if (hovered) {
      window.scrollTo({
        behavior: 'smooth',
      });
    }
  }, [hovered]);

  return (
    <DropdownMenuSelectableItemContainer
      onClick={onClick}
      selected={selected}
      hovered={hovered}
      data-testid="dropdown-menu-item"
    >
      <StyledLeftContainer>{children}</StyledLeftContainer>
      <StyledRightIcon>
        {selected && <IconCheck size={theme.iconSizeMedium} />}
      </StyledRightIcon>
    </DropdownMenuSelectableItemContainer>
  );
}
