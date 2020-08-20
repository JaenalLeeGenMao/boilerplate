import styled, { css } from 'react-emotion';

export const playerContainer = css`
   {
    position: relative;
    height: calc(100% - 10em);
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    pointer-events: none;
    z-index: 103;

    .container {
      position: absolute;
      display: block;
      bottom: 0;
      right: 2rem;
      width: 35rem;
      height: 15.3rem;
      max-height: 15.3rem;
      max-width: 35rem;
      background-color: #1f1f1f;
      pointer-events: auto;
    }

    .poster {
      height: 100%;
      width: 25%;
      float: left;
      display: block;
    }

    .poster img,
    .poster div {
      height: 100%;
    }

    .content {
      position: relative;
      width: 75%;
      height: 100%;
      float: right;
      display: block;
      padding: 1.4rem 1rem 1rem 1rem;
      box-sizing: border-box;
    }

    .title {
      position: relative;
      height: 70%;
      font-size: 1.8rem;
      line-height: 1.2;
      font-weight: bold;
      margin-bottom: 0.5rem;
      max-height: 4.4rem;
    }

    .title p {
      height: 100%;
      overflow: hidden;
    }

    .desc {
      position: relative;
      height: 40%;
      font-size: 1.2rem;
      line-height: 1.3;
      color: #969696;
      padding-top: 0.5rem;
    }

    .desc p {
      height: 70%;
      overflow: hidden;
    }

    .link {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      font-size: 1.2rem;
      padding-top: 0.5rem;
      vertical-align: middle;
      height: 25%;
      width: calc(100% - 2rem);
      bottom: 1rem;
      position: absolute;
    }

    .play {
      background-color: rgba(44, 86, 255, 0.8);
      border-radius: 0.3rem;
      padding: 0.3rem 0.5rem 0.4rem 1rem;
      width: 100%;
      transition: all 0.3s ease-in;
    }

    .play:hover {
      background-color: rgba(44, 86, 255, 1);
      cursor: pointer;
    }

    .close {
      color: #808080;
      border: 1px solid #808080;
      margin-left: 1rem;
      border-radius: 0.3rem;
      vertical-align: middle;
      padding: 0.6rem;
      text-align: center;
      width: 30%;
      transition: all 0.3s ease-in;
    }

    .close:hover {
      color: #fff;
      cursor: pointer;
    }

    @media screen and (max-width: 640px) {
      .container {
        bottom: 0;
        right: 0;
        width: calc(100% - 10px);
        height: calc(100% - 60px);
        margin: 0 5px;
        max-height: 153px;
        max-width: 350px;
      }

      .poster {
        height: 65.25%;
        width: 50%;
      }

      .content {
        width: 50%;
        height: 65.25%;
        padding: 10px;
      }

      .title {
        font-size: 12px;
        max-height: 30px;
      }

      .title p {
        height: 100%;
      }

      .desc {
        font-size: 11px;
        height: 33px;
        padding-top: 3px;
      }

      .desc p {
        height: 100%;
      }

      .link {
        font-size: 11px;
        align-items: center;
        height: 34.75%;
        padding: 0;
        position: relative;
        width: 100%;
        bottom: 0;
      }

      .play {
        width: 50%;
        margin-left: 5px;
        padding: 5px 5px 5px 8px;
      }

      .play:hover {
        cursor: pointer;
      }

      .close {
        text-align: center;
        width: calc(50% - 5px);
        margin: 0 5px;
        border-radius: 3px;
        padding: 6.5px;
      }
    }

    @media screen and (max-width: 320px) {
      .container {
        height: calc(100% - 60px);
        max-height: 153px;
        max-width: 350px;
      }

      .title {
        height: 25px;
      }

      .link {
        font-size: 9px;
      }

      .play {
        padding: 3.5px 4px 3.5px 8px;
      }
    }
  }
`;
