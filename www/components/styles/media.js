import { css } from 'styled-components';

const breakpoints = {
  desktop_large: 1440,
  desktop: 1000,
  tablet: 735,
  phone: 400,
};
export default Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${breakpoints[label]}px) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});
