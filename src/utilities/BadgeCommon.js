import { useSelector } from 'react-redux';
import { Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import { get } from 'lodash';

const StyledBadge = styled(Badge)(({ hex }) => {
  return {
    '& .MuiBadge-colorPrimary': {
      backgroundColor: hex
    }
  };
});

const BadgeCommon = ({ children, invisible = false }) => {
  const color = useSelector((state) => get(state, 'common.color'));

  return (
    <StyledBadge
      hex={color?.hex}
      color="primary"
      variant="dot"
      invisible={invisible}
    >
      {children}
    </StyledBadge>
  );
};

export default BadgeCommon;
