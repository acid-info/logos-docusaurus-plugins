import styled from '@emotion/styled'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  gap: 16px;
`

export const GridItem = styled.div`
  grid-column: span 4;

  &.w-1 {
    grid-column: span 1;
  }

  &.w-2 {
    grid-column: span 2;
  }

  &.w-3 {
    grid-column: span 3;
  }

  &.w-4 {
    grid-column: span 4;
  }

  &.w-6 {
    grid-column: span 6;
  }

  &.w-7 {
    grid-column: span 7;
  }

  &.w-8 {
    grid-column: span 8;
  }

  &.w-10 {
    grid-column: span 10;
  }

  &.w-12 {
    grid-column: span 12;
  }

  &.w-14 {
    grid-column: span 14;
  }

  &.w-16 {
    grid-column: span 16;
  }

  &.w-17 {
    grid-column: span 17;
  }

  &.w-18 {
    grid-column: span 18;
  }

  &.w-24 {
    grid-column: span 24;
  }

  @media (max-width: 768px) {
    grid-column: span 24 !important;
  }
`
