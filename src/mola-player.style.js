import styled, { css } from 'react-emotion';

export const container = css`
   {
    position: relative;
    height: 100%;
    width: 100%;
    user-select: none;
    color: #ffffff;
    background: #000000;
    font-size: 1rem;

    &.fullscreen {
      font-size: 1.8rem;

      @media only screen and (max-width: 840px) {
        font-size: 12px;
      }
    }

    code {
      font-size: 1.4rem;
      line-height: 1.4;
      white-space: pre-line;
      color: rgb(255, 255, 255);
      font-family: 'Public Sans', sans-serif;

      @media (max-width: 640px) {
        font-size: 12px;
      }
    }

    video {
      display: inherit;
      max-width: 100%;
      margin: auto;
    }
  }
`;

export const childContainer = css`
   {
    opacity: 1;
    transition: all 300ms ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    max-width: 100vw;
    width: 100%;
    height: 100%;
    max-width: 100%; /* important to prevent greater than video width itself */
    max-height: 100%; /* important to prevent greater than video height itself */
    margin: auto;
    z-index: 1;
  }
`;

export const BannerImg = styled('img')`
   {
    position: relative;
    z-index: 2;
    height: 12.3935%;
    cursor: pointer;
    display: block;
    margin: auto;
    width: auto;
  }
`;

export const Poster = styled('div')`
   {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 2;

    img {
      background-size: cover;
      position: absolute;
      margin: auto;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }
  }
`;

export const UserFeedback = styled('div')`
   {
    top: 50%;
    left: 50%;
    position: absolute;
    min-width: 5rem;
    background-color: transparent;
    outline: none !important;
    border: 0;
    color: white;
    transform: translate(-50%, -50%);
    z-index: 2;
    cursor: pointer;
  }
`;

export const ErrorFeedback = styled('div')`
   {
    top: 50%;
    left: 50%;
    position: absolute;
    min-width: 5rem;
    background-color: rgba(0, 0, 0, 0.9);
    padding: 2.3em 1.8em;
    outline: none !important;
    border: 0;
    border-radius: 0.3em;
    color: white;
    transform: translate(-50%, -50%);
    z-index: 2;
    cursor: pointer;
  }
`;

export const Icons = styled('div')`
   {
    &.playIcon {
      width: 5rem;
      height: 5rem;
      margin: 0 1rem;
      display: inline-block;
      background: url(data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNSAxNiI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6IzFmOTNmZjt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImEiIGQ9Ik0xNTEuMDg4LDI4Ljc3MWwtMTEuMjIzLTYuMTM4YTEuODksMS44OSwwLDAsMC0yLjgwNywxLjYyN1YzNi41MzRhMS44OSwxLjg5LDAsMCwwLDIuODA3LDEuNjI1bDExLjIyMy02LjEzOEExLjg0NiwxLjg0NiwwLDAsMCwxNTEuMDg4LDI4Ljc3MVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMzcuMDU5IC0yMi4zOTYpIi8+PC9zdmc+);
      background-repeat: no-repeat;
      background-size: contain;
      vertical-align: middle;
      border: none;
      cursor: pointer;

      @media (max-width: 640px),
        @media only screen and (orientation: landscape) {
        width: 44px;
        height: 44px;
        margin: 0 10px;
        display: inline-block;
        background: url(data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNSAxNiI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6IzFmOTNmZjt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImEiIGQ9Ik0xNTEuMDg4LDI4Ljc3MWwtMTEuMjIzLTYuMTM4YTEuODksMS44OSwwLDAsMC0yLjgwNywxLjYyN1YzNi41MzRhMS44OSwxLjg5LDAsMCwwLDIuODA3LDEuNjI1bDExLjIyMy02LjEzOEExLjg0NiwxLjg0NiwwLDAsMCwxNTEuMDg4LDI4Ljc3MVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMzcuMDU5IC0yMi4zOTYpIi8+PC9zdmc+);
        background-repeat: no-repeat;
        background-size: contain;
        vertical-align: middle;
        border: none;
        cursor: pointer;
      }
    }
  }
`;

export const BugLogoWrapper = styled('div')`
   {
    &.fullscreen {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;

      img {
        width: 100%;
        height: 100%;
      }
    }

    &.wide {
      position: absolute;
      top: 2em;
      right: 2em;
      z-index: 1;

      img {
        width: auto;
        height: 11.4em;
      }
    }

    &.square {
      position: absolute;
      top: 2em;
      right: 2em;
      z-index: 1;

      img {
        width: auto;
        height: 11.4em;
      }
    }
  }
`;
