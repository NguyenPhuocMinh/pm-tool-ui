import { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';

const NavLinkMain = forwardRef(
  ({ activeClassName, activeStyle, ...props }, ref) => {
    return (
      <NavLink
        ref={ref}
        {...props}
        className={({ isActive }) =>
          [props.className, isActive ? activeClassName : null]
            .filter(Boolean)
            .join(' ')
        }
        style={({ isActive }) => ({
          ...props.style,
          ...(isActive ? activeStyle : null)
        })}
      />
    );
  }
);

NavLinkMain.displayName = 'NavLinkMain';

export default NavLinkMain;
