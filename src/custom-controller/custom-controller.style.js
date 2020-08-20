import styled, { css } from 'react-emotion'

export const Icons = styled('div')`
  position: relative;
  display: inline-block;
  width: 2.4em;
  height: 2.4em;
  margin: 0 0.4em;
  transition: all 0.2s ease-in-out;
  overflow: hidden;

  > div.withTooltip {
    transition: all 0.3s ease-in-out;
    transform: translate(calc(-30%), calc(-100% - 1em));
    bottom: auto;
    left: auto;
  }

  &:hover {
    overflow: visible;
    cursor: pointer;

    > div.withTooltip {
      opacity: 0.95;
    }
  }

  &.disabled:hover {
    overflow: hidden;
    cursor: not-allowed !important;
    opacity: .4;

    > div.withTooltip {
      opacity: 0;
    }
  }

  &.playIcon {
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2MxYzJjMjt9LmJ7Y2xpcC1wYXRoOnVybCgjYSk7fTwvc3R5bGU+PGNsaXBQYXRoIGlkPSJhIj48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjc3IDUzNSkiLz48L2NsaXBQYXRoPjwvZGVmcz48ZyBjbGFzcz0iYiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyNzcgLTUzNSkiPjxwYXRoIGNsYXNzPSJhIiBkPSJNMTEsNDA5LjkxMnYxMy4xNzZhLjk2Mi45NjIsMCwwLDAsMS40NTUuNzgxbDExLjU3OS02LjU4OGEuODg3Ljg4NywwLDAsMCwwLTEuNTYybC0xMS41NzktNi41ODhBLjk2Mi45NjIsMCwwLDAsMTEsNDA5LjkxMloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyNzEuNSAxMzAuNSkiLz48L2c+PC9zdmc+);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
  }

  &.playIcon:hover {
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2ZmZjt9LmJ7Y2xpcC1wYXRoOnVybCgjYSk7fTwvc3R5bGU+PGNsaXBQYXRoIGlkPSJhIj48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjc3IDUzNSkiLz48L2NsaXBQYXRoPjwvZGVmcz48ZyBjbGFzcz0iYiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyNzcgLTUzNSkiPjxwYXRoIGNsYXNzPSJhIiBkPSJNMTEsNDA5LjkxMnYxMy4xNzZhLjk2Mi45NjIsMCwwLDAsMS40NTUuNzgxbDExLjU3OS02LjU4OGEuODg3Ljg4NywwLDAsMCwwLTEuNTYybC0xMS41NzktNi41ODhBLjk2Mi45NjIsMCwwLDAsMTEsNDA5LjkxMloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyNzEuNSAxMzAuNSkiLz48L2c+PC9zdmc+);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
  }

  &.pauseIcon {
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2MxYzJjMjt9LmJ7Y2xpcC1wYXRoOnVybCgjYSk7fTwvc3R5bGU+PGNsaXBQYXRoIGlkPSJhIj48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMzMwIDE1NDUpIi8+PC9jbGlwUGF0aD48L2RlZnM+PGcgY2xhc3M9ImIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMzMwIC0xNTQ1KSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTMzNi41IDE1NDgpIj48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjQiIGhlaWdodD0iMTgiIHJ4PSIyIi8+PHJlY3QgY2xhc3M9ImEiIHdpZHRoPSI0IiBoZWlnaHQ9IjE4IiByeD0iMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNykiLz48L2c+PC9nPjwvc3ZnPg==);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
  }

  &.pauseIcon:hover {
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2ZmZmZmZjt9LmJ7Y2xpcC1wYXRoOnVybCgjYSk7fTwvc3R5bGU+PGNsaXBQYXRoIGlkPSJhIj48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMzMwIDE1NDUpIi8+PC9jbGlwUGF0aD48L2RlZnM+PGcgY2xhc3M9ImIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMzMwIC0xNTQ1KSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTMzNi41IDE1NDgpIj48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjQiIGhlaWdodD0iMTgiIHJ4PSIyIi8+PHJlY3QgY2xhc3M9ImEiIHdpZHRoPSI0IiBoZWlnaHQ9IjE4IiByeD0iMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNykiLz48L2c+PC9nPjwvc3ZnPg==);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
  }

  &.forwardIcon {
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2MxYzJjMjt9LmJ7Y2xpcC1wYXRoOnVybCgjYSk7fTwvc3R5bGU+PGNsaXBQYXRoIGlkPSJhIj48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjUwIDUyMikiLz48L2NsaXBQYXRoPjwvZGVmcz48ZyBjbGFzcz0iYiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyNTAgLTUyMikiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyNTQuNSA1MjUpIj48cGF0aCBjbGFzcz0iYSIgZD0iTTE0My43LDQxNC4zOTNhMSwxLDAsMCwwLTEuNjY5LS40MjRoMGEuOTkuOTksMCwwLDAtLjI1Ljk3OSw1LjUsNS41LDAsMSwxLTYuOTUtMy42OTRsLTEuMDM1LDEuMDRhMSwxLDAsMSwwLDEuNDEsMS40MWwyLjU2LTIuNTYuNDQtLjQ0YS45ODcuOTg3LDAsMCwwLDAtMS40MWwtLjEzLS4xMy0yLjg3LTIuODdhMSwxLDAsMSwwLTEuNDEsMS40MWwxLjQsMS40MWE3LjQ5NCw3LjQ5NCwwLDEsMCw4LjUsNS4yNzlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTI5IC00MDUuOTk3KSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNMTQ5LjU4Niw0MTBsLTIuMjkzLDIuMjkzYTEsMSwwLDEsMCwxLjQxNCwxLjQxNGwzLTNhMSwxLDAsMCwwLDAtMS40MTRsLTMtM2ExLDEsMCwxLDAtMS40MTQsMS40MTRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTM4IC00MDUuOTk5KSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNMTM5Ljc0Myw0MjguNjYydi00LjMzOGgtLjU4MmEuNTguNTgsMCwwLDEtLjEzNS4zMi43MTcuNzE3LDAsMCwxLS4zNDQuMiwyLjEsMi4xLDAsMCwxLS42LjA3MXYuNWguNzc1djMuMjQ5WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEzMy41NCAtNDE1LjE2MSkiLz48cGF0aCBjbGFzcz0iYSIgZD0iTTE0NC45LDQyNC4yYTEuNTI3LDEuNTI3LDAsMCwwLS44OTEuMjYsMS42NSwxLjY1LDAsMCwwLS41NzkuNzYsMy4yNDIsMy4yNDIsMCwwLDAtLjIsMS4yMjEsMi42NTYsMi42NTYsMCwwLDAsLjQ0MiwxLjY1LDEuNiwxLjYsMCwwLDAsMi40NTksMCwzLjMxMiwzLjMxMiwwLDAsMC0uMDA1LTMuMzEyQTEuNDYyLDEuNDYyLDAsMCwwLDE0NC45LDQyNC4yWm0uNTY3LDMuNGEuNi42LDAsMCwxLS41NjcuMzQ2LjYxMi42MTIsMCwwLDEtLjU3Ni0uMzQ4LDIuNjIzLDIuNjIzLDAsMCwxLS4xODYtMS4xNTgsMi43NTgsMi43NTgsMCwwLDEsLjE4OC0xLjE4OC42MDguNjA4LDAsMCwxLC41NzItLjM2My42LjYsMCwwLDEsLjU2Ny4zNiwyLjgxNSwyLjgxNSwwLDAsMSwuMTgzLDEuMTkxQTIuNywyLjcsMCwwLDEsMTQ1LjQ3LDQyNy42WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEzNi4xMTQgLTQxNS4xMDEpIi8+PC9nPjwvZz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;

    > div.withTooltip {
      width: 6.25em;
    }
  }

  &.forwardIcon:hover {
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2ZmZjt9LmJ7Y2xpcC1wYXRoOnVybCgjYSk7fTwvc3R5bGU+PGNsaXBQYXRoIGlkPSJhIj48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjUwIDUyMikiLz48L2NsaXBQYXRoPjwvZGVmcz48ZyBjbGFzcz0iYiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyNTAgLTUyMikiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyNTQuNSA1MjUpIj48cGF0aCBjbGFzcz0iYSIgZD0iTTE0My43LDQxNC4zOTNhMSwxLDAsMCwwLTEuNjY5LS40MjRoMGEuOTkuOTksMCwwLDAtLjI1Ljk3OSw1LjUsNS41LDAsMSwxLTYuOTUtMy42OTRsLTEuMDM1LDEuMDRhMSwxLDAsMSwwLDEuNDEsMS40MWwyLjU2LTIuNTYuNDQtLjQ0YS45ODcuOTg3LDAsMCwwLDAtMS40MWwtLjEzLS4xMy0yLjg3LTIuODdhMSwxLDAsMSwwLTEuNDEsMS40MWwxLjQsMS40MWE3LjQ5NCw3LjQ5NCwwLDEsMCw4LjUsNS4yNzlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTI5IC00MDUuOTk3KSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNMTQ5LjU4Niw0MTBsLTIuMjkzLDIuMjkzYTEsMSwwLDEsMCwxLjQxNCwxLjQxNGwzLTNhMSwxLDAsMCwwLDAtMS40MTRsLTMtM2ExLDEsMCwxLDAtMS40MTQsMS40MTRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTM4IC00MDUuOTk5KSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNMTM5Ljc0Myw0MjguNjYydi00LjMzOGgtLjU4MmEuNTguNTgsMCwwLDEtLjEzNS4zMi43MTcuNzE3LDAsMCwxLS4zNDQuMiwyLjEsMi4xLDAsMCwxLS42LjA3MXYuNWguNzc1djMuMjQ5WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEzMy41NCAtNDE1LjE2MSkiLz48cGF0aCBjbGFzcz0iYSIgZD0iTTE0NC45LDQyNC4yYTEuNTI3LDEuNTI3LDAsMCwwLS44OTEuMjYsMS42NSwxLjY1LDAsMCwwLS41NzkuNzYsMy4yNDIsMy4yNDIsMCwwLDAtLjIsMS4yMjEsMi42NTYsMi42NTYsMCwwLDAsLjQ0MiwxLjY1LDEuNiwxLjYsMCwwLDAsMi40NTksMCwzLjMxMiwzLjMxMiwwLDAsMC0uMDA1LTMuMzEyQTEuNDYyLDEuNDYyLDAsMCwwLDE0NC45LDQyNC4yWm0uNTY3LDMuNGEuNi42LDAsMCwxLS41NjcuMzQ2LjYxMi42MTIsMCwwLDEtLjU3Ni0uMzQ4LDIuNjIzLDIuNjIzLDAsMCwxLS4xODYtMS4xNTgsMi43NTgsMi43NTgsMCwwLDEsLjE4OC0xLjE4OC42MDguNjA4LDAsMCwxLC41NzItLjM2My42LjYsMCwwLDEsLjU2Ny4zNiwyLjgxNSwyLjgxNSwwLDAsMSwuMTgzLDEuMTkxQTIuNywyLjcsMCwwLDEsMTQ1LjQ3LDQyNy42WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEzNi4xMTQgLTQxNS4xMDEpIi8+PC9nPjwvZz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
  }

  &.backwardIcon {
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2MxYzJjMjt9LmJ7Y2xpcC1wYXRoOnVybCgjYSk7fTwvc3R5bGU+PGNsaXBQYXRoIGlkPSJhIj48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMDI1IDk1MikiLz48L2NsaXBQYXRoPjwvZGVmcz48ZyBjbGFzcz0iYiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwMjUgLTk1MikiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwMjkuNSA5NTQuOTk5KSI+PHBhdGggY2xhc3M9ImEiIGQ9Ik0xOTcuOCw0MDkuMTE0bDEuNC0xLjQxYTEsMSwwLDEsMC0xLjQxLTEuNDFsLTIuODcsMi44Ny0uMTMuMTNhLjk4Ny45ODcsMCwwLDAsMCwxLjQxbC40NC40NCwyLjU2LDIuNTZhMSwxLDAsMCwwLDEuNDEtMS40MWwtMS4wMzUtMS4wNGE1LjUsNS41LDAsMSwxLTYuOTQ5LDMuNjk0Ljk5Ljk5LDAsMCwwLS4yNS0uOTc5aDBhMSwxLDAsMCwwLTEuNjcuNDI0LDcuNSw3LjUsMCwwLDAsNy41NTQsOS42LDcuNSw3LjUsMCwwLDAsLjk0Ni0xNC44NzdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTg5IC00MDUuOTk3KSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNMTk0LjI5Myw0MTMuNzA3YTEsMSwwLDAsMCwxLjQxNC0xLjQxNEwxOTMuNDE0LDQxMGwyLjI5My0yLjI5M2ExLDEsMCwwLDAtMS40MTQtMS40MTRsLTMsM2ExLDEsMCwwLDAsMCwxLjQxNFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xOTAgLTQwNS45OTkpIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik0xOTkuNzQzLDQyOC42NjJ2LTQuMzM4aC0uNTgyYS41OC41OCwwLDAsMS0uMTM1LjMyLjcxNi43MTYsMCwwLDEtLjM0NC4yLDIuMSwyLjEsMCwwLDEtLjYuMDcxdi41aC43NzV2My4yNDlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTkzLjU0MSAtNDE1LjE2MSkiLz48cGF0aCBjbGFzcz0iYSIgZD0iTTIwNC45LDQyOC42NjhhMS40NTksMS40NTksMCwwLDAsMS4yMjctLjU3NCwzLjMxMiwzLjMxMiwwLDAsMC0uMDA1LTMuMzEyLDEuNDYyLDEuNDYyLDAsMCwwLTEuMjIyLS41NzgsMS41MjcsMS41MjcsMCwwLDAtLjg5MS4yNiwxLjY1LDEuNjUsMCwwLDAtLjU3OS43NiwzLjI0MiwzLjI0MiwwLDAsMC0uMiwxLjIyMSwyLjY1NiwyLjY1NiwwLDAsMCwuNDQyLDEuNjVBMS40NjgsMS40NjgsMCwwLDAsMjA0LjksNDI4LjY2OFptLS41NzQtMy40MTFhLjYwOC42MDgsMCwwLDEsLjU3Mi0uMzYzLjYuNiwwLDAsMSwuNTY3LjM2LDIuODE1LDIuODE1LDAsMCwxLC4xODMsMS4xOTEsMi43LDIuNywwLDAsMS0uMTgsMS4xNi42LjYsMCwwLDEtLjU2Ny4zNDYuNjEyLjYxMiwwLDAsMS0uNTc2LS4zNDgsMi42MjMsMi42MjMsMCwwLDEtLjE4Ni0xLjE1OEEyLjc1OCwyLjc1OCwwLDAsMSwyMDQuMzI5LDQyNS4yNTdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTk2LjExNSAtNDE1LjEwMSkiLz48L2c+PC9nPjwvc3ZnPg==);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;

    > div.withTooltip {
      width: 7.25em;
    }
  }

  &.backwardIcon:hover {
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2ZmZjt9LmJ7Y2xpcC1wYXRoOnVybCgjYSk7fTwvc3R5bGU+PGNsaXBQYXRoIGlkPSJhIj48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMDI1IDk1MikiLz48L2NsaXBQYXRoPjwvZGVmcz48ZyBjbGFzcz0iYiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwMjUgLTk1MikiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwMjkuNSA5NTQuOTk5KSI+PHBhdGggY2xhc3M9ImEiIGQ9Ik0xOTcuOCw0MDkuMTE0bDEuNC0xLjQxYTEsMSwwLDEsMC0xLjQxLTEuNDFsLTIuODcsMi44Ny0uMTMuMTNhLjk4Ny45ODcsMCwwLDAsMCwxLjQxbC40NC40NCwyLjU2LDIuNTZhMSwxLDAsMCwwLDEuNDEtMS40MWwtMS4wMzUtMS4wNGE1LjUsNS41LDAsMSwxLTYuOTQ5LDMuNjk0Ljk5Ljk5LDAsMCwwLS4yNS0uOTc5aDBhMSwxLDAsMCwwLTEuNjcuNDI0LDcuNSw3LjUsMCwwLDAsNy41NTQsOS42LDcuNSw3LjUsMCwwLDAsLjk0Ni0xNC44NzdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTg5IC00MDUuOTk3KSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNMTk0LjI5Myw0MTMuNzA3YTEsMSwwLDAsMCwxLjQxNC0xLjQxNEwxOTMuNDE0LDQxMGwyLjI5My0yLjI5M2ExLDEsMCwwLDAtMS40MTQtMS40MTRsLTMsM2ExLDEsMCwwLDAsMCwxLjQxNFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xOTAgLTQwNS45OTkpIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik0xOTkuNzQzLDQyOC42NjJ2LTQuMzM4aC0uNTgyYS41OC41OCwwLDAsMS0uMTM1LjMyLjcxNi43MTYsMCwwLDEtLjM0NC4yLDIuMSwyLjEsMCwwLDEtLjYuMDcxdi41aC43NzV2My4yNDlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTkzLjU0MSAtNDE1LjE2MSkiLz48cGF0aCBjbGFzcz0iYSIgZD0iTTIwNC45LDQyOC42NjhhMS40NTksMS40NTksMCwwLDAsMS4yMjctLjU3NCwzLjMxMiwzLjMxMiwwLDAsMC0uMDA1LTMuMzEyLDEuNDYyLDEuNDYyLDAsMCwwLTEuMjIyLS41NzgsMS41MjcsMS41MjcsMCwwLDAtLjg5MS4yNiwxLjY1LDEuNjUsMCwwLDAtLjU3OS43NiwzLjI0MiwzLjI0MiwwLDAsMC0uMiwxLjIyMSwyLjY1NiwyLjY1NiwwLDAsMCwuNDQyLDEuNjVBMS40NjgsMS40NjgsMCwwLDAsMjA0LjksNDI4LjY2OFptLS41NzQtMy40MTFhLjYwOC42MDgsMCwwLDEsLjU3Mi0uMzYzLjYuNiwwLDAsMSwuNTY3LjM2LDIuODE1LDIuODE1LDAsMCwxLC4xODMsMS4xOTEsMi43LDIuNywwLDAsMS0uMTgsMS4xNi42LjYsMCwwLDEtLjU2Ny4zNDYuNjEyLjYxMiwwLDAsMS0uNTc2LS4zNDgsMi42MjMsMi42MjMsMCwwLDEtLjE4Ni0xLjE1OEEyLjc1OCwyLjc1OCwwLDAsMSwyMDQuMzI5LDQyNS4yNTdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTk2LjExNSAtNDE1LjEwMSkiLz48L2c+PC9nPjwvc3ZnPg==);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
  }

  &.upcommingIcon {
    background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxOCAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy41IDhMMCAwVjE2TDEzLjUgOFpNMTggMEgxNVYxNkgxOFYwWiIgZmlsbD0iI0MxQzJDMiIvPgo8L3N2Zz4K);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
    width: 1.8em;
    height: 1.6em;

    > div.withTooltip {
      width: 10em;
      transform: translate(calc(-40% - 0.2em), calc(-100% - 1.25em));
    }
  }

  &.upcommingIcon:hover {
    background: url(data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxOCAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTMuNSA4TDAgMFYxNkwxMy41IDhaTTE4IDBIMTVWMTZIMThWMFoiIGZpbGw9IiNGRkZGRkYiLz4NCjwvc3ZnPg==);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
  }

  &.muteIcon {
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2MxYzJjMjt9LmJ7Y2xpcC1wYXRoOnVybCgjYSk7fTwvc3R5bGU+PGNsaXBQYXRoIGlkPSJhIj48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMzY4IDYwNikiLz48L2NsaXBQYXRoPjwvZGVmcz48ZyBjbGFzcz0iYiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEzNjggLTYwNikiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEzNzEuNDI5IDYwOS40MjkpIj48cGF0aCBjbGFzcz0iYSIgZD0iTTI2NC41MTUsNDA2LjAyOGEuNS41LDAsMCwwLS41MTUuNXYxLjAwNmEuNS41LDAsMCwwLC40NzkuNSw3LDcsMCwwLDEsMCwxMy45NjguNS41LDAsMCwwLS40NzkuNVY0MjMuNWEuNS41LDAsMCwwLC41MTUuNSw5LDksMCwwLDAsMC0xNy45NzFaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjU1IC00MDYuMDI3KSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNMjQ4LjMzNCw0MTNIMjQ3YTEsMSwwLDAsMC0xLDF2NmExLDEsMCwwLDAsMSwxaDEuMzMzYTIsMiwwLDAsMSwxLjIuNEwyNTMsNDI0VjQxMGwtMy40NjcsMi42QTIsMiwwLDAsMSwyNDguMzM0LDQxM1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNDYgLTQwOC4wMTQpIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik0yNjQuNTY5LDQyNGE0LDQsMCwwLDAsMC03LjkyLjUuNSwwLDAsMC0uNTY5LjVWNDIzLjVBLjUuNSwwLDAsMCwyNjQuNTY5LDQyNFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNTUgLTQxMS4wNDkpIi8+PC9nPjwvZz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
  }

  &.muteIcon:hover {
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2ZmZjt9LmJ7Y2xpcC1wYXRoOnVybCgjYSk7fTwvc3R5bGU+PGNsaXBQYXRoIGlkPSJhIj48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMzY4IDYwNikiLz48L2NsaXBQYXRoPjwvZGVmcz48ZyBjbGFzcz0iYiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEzNjggLTYwNikiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEzNzEuNDI5IDYwOS40MjkpIj48cGF0aCBjbGFzcz0iYSIgZD0iTTI2NC41MTUsNDA2LjAyOGEuNS41LDAsMCwwLS41MTUuNXYxLjAwNmEuNS41LDAsMCwwLC40NzkuNSw3LDcsMCwwLDEsMCwxMy45NjguNS41LDAsMCwwLS40NzkuNVY0MjMuNWEuNS41LDAsMCwwLC41MTUuNSw5LDksMCwwLDAsMC0xNy45NzFaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjU1IC00MDYuMDI3KSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNMjQ4LjMzNCw0MTNIMjQ3YTEsMSwwLDAsMC0xLDF2NmExLDEsMCwwLDAsMSwxaDEuMzMzYTIsMiwwLDAsMSwxLjIuNEwyNTMsNDI0VjQxMGwtMy40NjcsMi42QTIsMiwwLDAsMSwyNDguMzM0LDQxM1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNDYgLTQwOC4wMTQpIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik0yNjQuNTY5LDQyNGE0LDQsMCwwLDAsMC03LjkyLjUuNSwwLDAsMC0uNTY5LjVWNDIzLjVBLjUuNSwwLDAsMCwyNjQuNTY5LDQyNFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNTUgLTQxMS4wNDkpIi8+PC9nPjwvZz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
  }

  &.mutedIcon {
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2MxYzJjMjt9LmJ7Y2xpcC1wYXRoOnVybCgjYSk7fTwvc3R5bGU+PGNsaXBQYXRoIGlkPSJhIj48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjYyIDEzNjApIi8+PC9jbGlwUGF0aD48L2RlZnM+PGcgY2xhc3M9ImIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjYyIC0xMzYwKSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTI2NSAxMzYzKSI+PHBhdGggY2xhc3M9ImEiIGQ9Ik0yNCwyMi45MTRWMjNhMSwxLDAsMCwxLTEsMWgtLjA4NmExLDEsMCwwLDEtLjcwNy0uMjkzTDYuMjkzLDcuNzkzQTEsMSwwLDAsMSw2LDcuMDg2VjdBMSwxLDAsMCwxLDcsNmguMDg2YTEsMSwwLDAsMSwuNzA3LjI5M0wyMy43MDcsMjIuMjA3QTEsMSwwLDAsMSwyNCwyMi45MTRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNiAtNikiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDAuMDE0KSI+PHBhdGggY2xhc3M9ImEiIGQ9Ik0yNi44LDM2Ljg0bDEuNDksMS40OWE4LjksOC45LDAsMCwxLTMuNzcsMS4wNzVBLjUuNSwwLDAsMSwyNCwzOC45di0xYS41LjUsMCwwLDEsLjQ4LS41QTYuOTkzLDYuOTkzLDAsMCwwLDI2LjgsMzYuODRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTUgLTIxLjQzNCkiLz48cGF0aCBjbGFzcz0iYSIgZD0iTTMzLDE1LjAxNEE4LjksOC45LDAsMCwxLDMxLjkxLDE5LjNsLTEuNDktMS40OWE3LjAwNiw3LjAwNiwwLDAsMC01Ljk0LTkuNzguNS41LDAsMCwxLS40OC0uNXYtMWEuNS41LDAsMCwxLC41MTUtLjVBOSw5LDAsMCwxLDMzLDE1LjAxNFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNSAtNi4wMjkpIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik0xOS4yMTUsMTB2MS4zNzVsLS43ODUtLjc4NVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMi4yMTUgLTguMDE0KSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNMTMsMjEuNjI1VjI3TDkuNTM1LDI0LjRhMi4wMTIsMi4wMTIsMCwwLDAtMS4yLS40SDdhMSwxLDAsMCwxLTEtMVYxN2ExLDEsMCwwLDEsMS0xaC4zNzVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNiAtMTEuMDE0KSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNMjguMDI1LDIwLjAzNHEwLC4xOC0uMDE1LjM2bC0zLjk2LTMuOTZhLjQ4OC40ODgsMCwwLDEsLjU0NS0uMzZBNCw0LDAsMCwxLDI4LjAyNSwyMC4wMzRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTUuMDI1IC0xMS4wNDgpIi8+PC9nPjwvZz48L2c+PC9zdmc+);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;

    > div.withTooltip {
      width: 6em;
    }
  }

  &.mutedIcon:hover {
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2ZmZjt9LmJ7Y2xpcC1wYXRoOnVybCgjYSk7fTwvc3R5bGU+PGNsaXBQYXRoIGlkPSJhIj48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjYyIDEzNjApIi8+PC9jbGlwUGF0aD48L2RlZnM+PGcgY2xhc3M9ImIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjYyIC0xMzYwKSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTI2NSAxMzYzKSI+PHBhdGggY2xhc3M9ImEiIGQ9Ik0yNCwyMi45MTRWMjNhMSwxLDAsMCwxLTEsMWgtLjA4NmExLDEsMCwwLDEtLjcwNy0uMjkzTDYuMjkzLDcuNzkzQTEsMSwwLDAsMSw2LDcuMDg2VjdBMSwxLDAsMCwxLDcsNmguMDg2YTEsMSwwLDAsMSwuNzA3LjI5M0wyMy43MDcsMjIuMjA3QTEsMSwwLDAsMSwyNCwyMi45MTRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNiAtNikiLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDAuMDE0KSI+PHBhdGggY2xhc3M9ImEiIGQ9Ik0yNi44LDM2Ljg0bDEuNDksMS40OWE4LjksOC45LDAsMCwxLTMuNzcsMS4wNzVBLjUuNSwwLDAsMSwyNCwzOC45di0xYS41LjUsMCwwLDEsLjQ4LS41QTYuOTkzLDYuOTkzLDAsMCwwLDI2LjgsMzYuODRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTUgLTIxLjQzNCkiLz48cGF0aCBjbGFzcz0iYSIgZD0iTTMzLDE1LjAxNEE4LjksOC45LDAsMCwxLDMxLjkxLDE5LjNsLTEuNDktMS40OWE3LjAwNiw3LjAwNiwwLDAsMC01Ljk0LTkuNzguNS41LDAsMCwxLS40OC0uNXYtMWEuNS41LDAsMCwxLC41MTUtLjVBOSw5LDAsMCwxLDMzLDE1LjAxNFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNSAtNi4wMjkpIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik0xOS4yMTUsMTB2MS4zNzVsLS43ODUtLjc4NVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMi4yMTUgLTguMDE0KSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNMTMsMjEuNjI1VjI3TDkuNTM1LDI0LjRhMi4wMTIsMi4wMTIsMCwwLDAtMS4yLS40SDdhMSwxLDAsMCwxLTEtMVYxN2ExLDEsMCwwLDEsMS0xaC4zNzVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNiAtMTEuMDE0KSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNMjguMDI1LDIwLjAzNHEwLC4xOC0uMDE1LjM2bC0zLjk2LTMuOTZhLjQ4OC40ODgsMCwwLDEsLjU0NS0uMzZBNCw0LDAsMCwxLDI4LjAyNSwyMC4wMzRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTUuMDI1IC0xMS4wNDgpIi8+PC9nPjwvZz48L2c+PC9zdmc+);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
  }

  &.gearIcon {
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2MxYzJjMjt9LmJ7Y2xpcC1wYXRoOnVybCgjYSk7fTwvc3R5bGU+PGNsaXBQYXRoIGlkPSJhIj48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMTM4IDgxMikiLz48L2NsaXBQYXRoPjwvZGVmcz48ZyBjbGFzcz0iYiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxMzggLTgxMikiPjxwYXRoIGNsYXNzPSJhIiBkPSJNNjg0LDQxNi43MzJ2LTEuNDYzYS44ODkuODg5LDAsMCwwLS41NTktLjgyNmwtMS4wMjgtLjQxMWEuODg5Ljg4OSwwLDAsMS0uNDg3LTEuMTc1bC40MzYtMS4wMThhLjg4OC44ODgsMCwwLDAtLjE4OC0uOTc4bC0xLjAzNC0xLjAzNWEuODg4Ljg4OCwwLDAsMC0uOTc5LS4xODhsLTEuMDE4LjQzNmEuODg5Ljg4OSwwLDAsMS0xLjE3NS0uNDg3bC0uNDExLTEuMDI3YS44ODkuODg5LDAsMCwwLS44MjYtLjU1OWgtMS40NjNhLjg4OS44ODksMCwwLDAtLjgyNi41NTlsLS40MTEsMS4wMjdhLjg4OS44ODksMCwwLDEtMS4xNzUuNDg3bC0xLjAxOC0uNDM2YS44ODguODg4LDAsMCwwLS45NzkuMTg4bC0xLjAzNCwxLjAzNWEuODg4Ljg4OCwwLDAsMC0uMTg4Ljk3OGwuNDM2LDEuMDE4YS44ODkuODg5LDAsMCwxLS40ODcsMS4xNzVsLTEuMDI4LjQxMWEuODg5Ljg4OSwwLDAsMC0uNTU5LjgyNnYxLjQ2M2EuODg5Ljg4OSwwLDAsMCwuNTU5LjgyNmwxLjAyOC40MTFhLjg4OS44ODksMCwwLDEsLjQ4NywxLjE3NWwtLjQzNiwxLjAxOGEuODg4Ljg4OCwwLDAsMCwuMTg4Ljk3OGwxLjAzNCwxLjAzNWEuODg4Ljg4OCwwLDAsMCwuOTc5LjE4OGwxLjAxOC0uNDM2YS44ODkuODg5LDAsMCwxLDEuMTc1LjQ4N2wuNDExLDEuMDI3YS44ODkuODg5LDAsMCwwLC44MjYuNTU5aDEuNDYzYS44ODkuODg5LDAsMCwwLC44MjYtLjU1OWwuNDExLTEuMDI3YS44ODkuODg5LDAsMCwxLDEuMTc1LS40ODdsMS4wMTguNDM2YS44ODguODg4LDAsMCwwLC45NzktLjE4OGwxLjAzNC0xLjAzNWEuODg4Ljg4OCwwLDAsMCwuMTg4LS45NzhsLS40MzYtMS4wMThhLjg4OS44ODksMCwwLDEsLjQ4Ny0xLjE3NWwxLjAyOC0uNDExQS44ODkuODg5LDAsMCwwLDY4NCw0MTYuNzMyWk02NzYsNDIwYTQsNCwwLDEsMSw0LTRBNCw0LDAsMCwxLDY3Niw0MjBaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNDc0IDQwOCkiLz48L2c+PC9zdmc+);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
    overflow: visible;
  }

  &.gearIcon:hover {
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2ZmZjt9LmJ7Y2xpcC1wYXRoOnVybCgjYSk7fTwvc3R5bGU+PGNsaXBQYXRoIGlkPSJhIj48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMTM4IDgxMikiLz48L2NsaXBQYXRoPjwvZGVmcz48ZyBjbGFzcz0iYiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxMzggLTgxMikiPjxwYXRoIGNsYXNzPSJhIiBkPSJNNjg0LDQxNi43MzJ2LTEuNDYzYS44ODkuODg5LDAsMCwwLS41NTktLjgyNmwtMS4wMjgtLjQxMWEuODg5Ljg4OSwwLDAsMS0uNDg3LTEuMTc1bC40MzYtMS4wMThhLjg4OC44ODgsMCwwLDAtLjE4OC0uOTc4bC0xLjAzNC0xLjAzNWEuODg4Ljg4OCwwLDAsMC0uOTc5LS4xODhsLTEuMDE4LjQzNmEuODg5Ljg4OSwwLDAsMS0xLjE3NS0uNDg3bC0uNDExLTEuMDI3YS44ODkuODg5LDAsMCwwLS44MjYtLjU1OWgtMS40NjNhLjg4OS44ODksMCwwLDAtLjgyNi41NTlsLS40MTEsMS4wMjdhLjg4OS44ODksMCwwLDEtMS4xNzUuNDg3bC0xLjAxOC0uNDM2YS44ODguODg4LDAsMCwwLS45NzkuMTg4bC0xLjAzNCwxLjAzNWEuODg4Ljg4OCwwLDAsMC0uMTg4Ljk3OGwuNDM2LDEuMDE4YS44ODkuODg5LDAsMCwxLS40ODcsMS4xNzVsLTEuMDI4LjQxMWEuODg5Ljg4OSwwLDAsMC0uNTU5LjgyNnYxLjQ2M2EuODg5Ljg4OSwwLDAsMCwuNTU5LjgyNmwxLjAyOC40MTFhLjg4OS44ODksMCwwLDEsLjQ4NywxLjE3NWwtLjQzNiwxLjAxOGEuODg4Ljg4OCwwLDAsMCwuMTg4Ljk3OGwxLjAzNCwxLjAzNWEuODg4Ljg4OCwwLDAsMCwuOTc5LjE4OGwxLjAxOC0uNDM2YS44ODkuODg5LDAsMCwxLDEuMTc1LjQ4N2wuNDExLDEuMDI3YS44ODkuODg5LDAsMCwwLC44MjYuNTU5aDEuNDYzYS44ODkuODg5LDAsMCwwLC44MjYtLjU1OWwuNDExLTEuMDI3YS44ODkuODg5LDAsMCwxLDEuMTc1LS40ODdsMS4wMTguNDM2YS44ODguODg4LDAsMCwwLC45NzktLjE4OGwxLjAzNC0xLjAzNWEuODg4Ljg4OCwwLDAsMCwuMTg4LS45NzhsLS40MzYtMS4wMThhLjg4OS44ODksMCwwLDEsLjQ4Ny0xLjE3NWwxLjAyOC0uNDExQS44ODkuODg5LDAsMCwwLDY4NCw0MTYuNzMyWk02NzYsNDIwYTQsNCwwLDEsMSw0LTRBNCw0LDAsMCwxLDY3Niw0MjBaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNDc0IDQwOCkiLz48L2c+PC9zdmc+);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
    overflow: visible;
  }

  &.chatIcon {
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2MxYzJjMjt9LmJ7Y2xpcC1wYXRoOnVybCgjYSk7fTwvc3R5bGU+PGNsaXBQYXRoIGlkPSJhIj48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMTU1IDgwMikiLz48L2NsaXBQYXRoPjwvZGVmcz48ZyBjbGFzcz0iYiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxNTUgLTgwMikiPjxwYXRoIGNsYXNzPSJhIiBkPSJNNjIzLDQwOEg2MDdhMSwxLDAsMCwwLTEsMXYxMWExLDEsMCwwLDAsMSwxaDhhLjUuNSwwLDAsMSwuNS41VjQyNGw1LjI3Ni0yLjg3OGExLDEsMCwwLDEsLjQ3OS0uMTIySDYyM2ExLDEsMCwwLDAsMS0xVjQwOUExLDEsMCwwLDAsNjIzLDQwOFptLTcsOS41aC03di0yaDdabTUtNC41SDYwOXYtMmgxMloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1NTIgMzk4KSIvPjwvZz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
    overflow: visible;
  }

  &.chatIcon:hover {
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2ZmZjt9LmJ7Y2xpcC1wYXRoOnVybCgjYSk7fTwvc3R5bGU+PGNsaXBQYXRoIGlkPSJhIj48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMTU1IDgwMikiLz48L2NsaXBQYXRoPjwvZGVmcz48ZyBjbGFzcz0iYiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxNTUgLTgwMikiPjxwYXRoIGNsYXNzPSJhIiBkPSJNNjIzLDQwOEg2MDdhMSwxLDAsMCwwLTEsMXYxMWExLDEsMCwwLDAsMSwxaDhhLjUuNSwwLDAsMSwuNS41VjQyNGw1LjI3Ni0yLjg3OGExLDEsMCwwLDEsLjQ3OS0uMTIySDYyM2ExLDEsMCwwLDAsMS0xVjQwOUExLDEsMCwwLDAsNjIzLDQwOFptLTcsOS41aC03di0yaDdabTUtNC41SDYwOXYtMmgxMloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1NTIgMzk4KSIvPjwvZz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
    overflow: visible;
  }

  &.enterFullscreenIcon {
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHN0eWxlPi5hLC5je2ZpbGw6I2MxYzJjMjt9LmF7c3Ryb2tlOiM3MDcwNzA7fS5ie2NsaXAtcGF0aDp1cmwoI2EpO308L3N0eWxlPjxjbGlwUGF0aCBpZD0iYSI+PHJlY3QgY2xhc3M9ImEiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjM2NiA3NjkpIi8+PC9jbGlwUGF0aD48L2RlZnM+PGcgY2xhc3M9ImIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzY2IC03NjkpIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMzY5IDc3MykiPjxwYXRoIGNsYXNzPSJjIiBkPSJNNDg2LDQwOHY1LjVoMlY0MTBoNXYtMmgtN1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00ODYgLTQwOCkiLz48cGF0aCBjbGFzcz0iYyIgZD0iTTUxMyw0MDhoLTV2Mmg1djMuNWgyVjQwOFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00OTcgLTQwOCkiLz48cGF0aCBjbGFzcz0iYyIgZD0iTTUxMyw0MzIuNWgtNXYyaDdWNDI5aC0yWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQ5NyAtNDE4LjUpIi8+PHBhdGggY2xhc3M9ImMiIGQ9Ik00ODgsNDI5aC0ydjUuNWg3di0yaC01WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQ4NiAtNDE4LjUpIi8+PC9nPjwvZz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;

    > div.withTooltip {
      width: 9.5em;
      transform: translate(calc(-65% - 0.2em), calc(-100% - 1em));
    }
  }

  &.enterFullscreenIcon:hover {
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHN0eWxlPi5hLC5je2ZpbGw6I2ZmZjt9LmF7c3Ryb2tlOiM3MDcwNzA7fS5ie2NsaXAtcGF0aDp1cmwoI2EpO308L3N0eWxlPjxjbGlwUGF0aCBpZD0iYSI+PHJlY3QgY2xhc3M9ImEiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjM2NiA3NjkpIi8+PC9jbGlwUGF0aD48L2RlZnM+PGcgY2xhc3M9ImIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMzY2IC03NjkpIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMzY5IDc3MykiPjxwYXRoIGNsYXNzPSJjIiBkPSJNNDg2LDQwOHY1LjVoMlY0MTBoNXYtMmgtN1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00ODYgLTQwOCkiLz48cGF0aCBjbGFzcz0iYyIgZD0iTTUxMyw0MDhoLTV2Mmg1djMuNWgyVjQwOFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00OTcgLTQwOCkiLz48cGF0aCBjbGFzcz0iYyIgZD0iTTUxMyw0MzIuNWgtNXYyaDdWNDI5aC0yWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQ5NyAtNDE4LjUpIi8+PHBhdGggY2xhc3M9ImMiIGQ9Ik00ODgsNDI5aC0ydjUuNWg3di0yaC01WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQ4NiAtNDE4LjUpIi8+PC9nPjwvZz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
  }

  &.exitFullscreenIcon {
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2MxYzJjMjt9LmJ7Y2xpcC1wYXRoOnVybCgjYSk7fTwvc3R5bGU+PGNsaXBQYXRoIGlkPSJhIj48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNjc1IDMyNTMpIi8+PC9jbGlwUGF0aD48L2RlZnM+PGcgY2xhc3M9ImIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNjc1IC0zMjUzKSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjY3OCAzMjU3KSI+PHBhdGggY2xhc3M9ImEiIGQ9Ik01NTMsNDEzLjVWNDA4aC0ydjMuNWgtNXYyaDdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNTQ2IC00MDgpIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik01NzAsNDEzLjVoNXYtMmgtNVY0MDhoLTJ2NS41WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTU1NyAtNDA4KSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNNTcwLDQzMWg1di0yaC03djUuNWgyWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTU1NyAtNDE4LjUpIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik01NTEsNDM0LjVoMlY0MjloLTd2Mmg1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTU0NiAtNDE4LjUpIi8+PC9nPjwvZz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;

    > div.withTooltip {
      width: 9.5em;
      transform: translate(calc(-65% - 0.2em), calc(-100% - 1em));
    }
  }

  &.exitFullscreenIcon:hover {
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2ZmZmZmZjt9LmJ7Y2xpcC1wYXRoOnVybCgjYSk7fTwvc3R5bGU+PGNsaXBQYXRoIGlkPSJhIj48cmVjdCBjbGFzcz0iYSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNjc1IDMyNTMpIi8+PC9jbGlwUGF0aD48L2RlZnM+PGcgY2xhc3M9ImIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNjc1IC0zMjUzKSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjY3OCAzMjU3KSI+PHBhdGggY2xhc3M9ImEiIGQ9Ik01NTMsNDEzLjVWNDA4aC0ydjMuNWgtNXYyaDdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNTQ2IC00MDgpIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik01NzAsNDEzLjVoNXYtMmgtNVY0MDhoLTJ2NS41WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTU1NyAtNDA4KSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNNTcwLDQzMWg1di0yaC03djUuNWgyWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTU1NyAtNDE4LjUpIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik01NTEsNDM0LjVoMlY0MjloLTd2Mmg1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTU0NiAtNDE4LjUpIi8+PC9nPjwvZz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
  }

  &.tickIcon {
    background: url(data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9Ii0xOCAtNDgwIDI0MDAgMjQwMCIgY2xhc3M9InN2Zy1pY29uIG9wdC1pdGVtLWN1ci1wb2ludGVyIHJlcGxhY2VkLXN2ZyI+DQogIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgMTkyMCkiPg0KICAgPHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTc4MyAyNTUuMTNsLTMyNC42MzIgMzI0LjYzMWMtMTkuNSAxOS40NDA0IC01MS4zNzk5IDUxLjI1IC03MC42ODk1IDcwLjY5MDRsLTM5MC42OSAzOTAuNzVjLTkuNSA5LjY2MDE2IC0xNC4yNSAyMi40NDA0IC0xNC4yNSAzNS4yNXM0Ljc1IDI1LjY0OTQgMTQuMjUgMzUuNDM5NWwzMjQuNjkgMzI0LjYyYzkuNzUgOS43MTk3MyAyMi41ODk4IDE0LjU4MDEgMzUuNDEwMiAxNC41ODAxczI1LjYyMDEgLTQuODYwMzUgMzUuMjgwMyAtMTQuNTgwMSBsMzkwLjYzIC0zOTAuNjJjOS43ODAyNyAtOS43MTk3MyAyMi42MjAxIC0xNC41ODAxIDM1LjQyOTcgLTE0LjU4MDFzMjUuNTg5OCA0Ljg2MDM1IDM1LjI1IDE0LjU4MDFsMTA0OS40MyAxMDQ5LjE4YzkuNzAwMiA5Ljc1OTc3IDIyLjYxMDQgMTQuNjQ5NCAzNS41MzAzIDE0LjY0OTRjMTIuODIwMyAwIDI1LjY1MDQgLTQuODA5NTcgMzUuMzYwNCAtMTQuNDZsMzI2Ljc1IC0zMjIuMjUgYzkuOTI5NjkgLTkuNzA5OTYgMTQuODcwMSAtMjIuNTQ5OCAxNC44NzAxIC0zNS4zOTk0YzAgLTEyLjcwMDIgLTQuODMwMDggLTI1LjQxMDIgLTE0LjQyOTcgLTM1LjEwMDZsLTE0NDcuNSAtMTQ0Ny4zOGMtOS43NSAtOS43MTk3MyAtMjIuNTgwMSAtMTQuNTgwMSAtMzUuMzg5NiAtMTQuNTgwMXMtMjUuNjA5NCA0Ljg2MDM1IC0zNS4yOTk4IDE0LjU4MDF6Ij48L3BhdGg+DQogIDwvZz4NCg0KPC9zdmc+);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
  }
`

export const VolumeBar = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;

  .slider {
    -webkit-appearance: none !important;
    width: 100% !important;
    height: .2em !important;
    background: rgba(255, 255, 255, 0.45) !important;
    outline: none !important;
    opacity: 0.7 !important;
    -webkit-transition: .2s !important;
    transition: opacity .2s !important;
  }

  .slider:hover {
    opacity: 1 !important;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    appearance: none !important;
    width: 1em !important;
    height: 1em !important;
    background: white !important;
    border-radius: 50% !important;
    border: 1px solid #d3d3d3 !important;
    cursor: pointer !important;
  }

  .slider::-moz-range-thumb {
    width: 1em !important;
    height: 1em !important;
    background: #4CAF50 !important;
    background: white !important;
    border-radius: 50% !important;
    cursor: pointer;
  }

  slider::-webkit-slider-runnable-track,
  slider::-moz-range-progress {
    color: #13bba4;
  }
`

export const Feedback = styled('div')`{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101; /* greater than ad-root class */

  button {
    min-width: 5em;
    min-height: 5em;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 1.8em;
    font-weight: 600;
    border: none;
    outline: none;
    border-radius: 50%;
    animation: fadeOut 0.8s ease-out infinite;
  }

  button.square {
    border-radius: 0;
  }
}`

export const CueWrapper = styled('div')`{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 9.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in;
  transform: translateY(25%);

  &.hide {
    transform: translateY(100%);
  }

  p {
    font-size: 1.8em;
    font-weight: 600;
    line-height: 1.2;
    white-space: pre;
    margin-bottom: 1em;
    padding: 0.5em;
    background: rgba(0, 0, 0, 0.6);
  }
}`

export const container = css`{
  display: grid;
  grid-template-areas:
    'progressbar progressbar progressbar duration'
    'bottomleftsection auto bottomrightsection bottomrightsection';
  grid-template-rows: 1fr 1fr;
  grid-template-columns: auto 1fr;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6em;
  padding: 1.6em 2em;
  opacity: 1;
  background: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
  transition: all 0.3s ease-in;
  transform: scale(1);
  transform: translateY(0%);
  z-index: 102; /* greater than ad-root class and feedback class*/

  &.hide {
    transform: translateY(50%);
    opacity: 0;
  }

  .bottom_left_section {
    grid-area: bottomleftsection;
    display: flex;
    align-items: center;
  }
  
  .bottom_right_section {
    grid-area: bottomrightsection;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  
  .duration {
    grid-area: duration;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    font-weight: 600;
  }
  
  .progress {
    grid-area: progressbar;
    display: flex;
    align-items: center;
    position: relative;
    margin: 0 2em 0 0;
    height: 100%;
    border-radius: 0.1em;
    transition: all 0.1s ease-in;
  }
  
  input[type='range']:hover {
    cursor: pointer;
  }
  
  .progress_wrapper {
    position: relative;
    height: 0.25em;
    width: 100%;
    border-radius: 0.1em;
  }
  
  .progressbar_dot {
    position: relative;
    display: inline-block;
    top: -0.35em;
    left: 99%;
    margin: 0;
    width: 1.25em;
    height: 1.25em;
    border-radius: 50%;
    background: #1f93ff;
    opacity: 0;
  }
  
  .progressbar_progress {
    position: absolute;
    width: 0%;
    height: 100%;
    background: #1f93ff;
    border-radius: 0.1em;
    z-index: 2;
  }
  
  .progressbar_progress_buffer {
    position: absolute;
    left: 0;
    top: 0;
    width: 0%;
    height: 100%;
    background: #cecece;
    border-radius: 0.1em;
    z-index: 1;
  }
  
  .progressbar_progress_background {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.45);
    border-radius: 0.1em;
    z-index: 0;
  }
  
  .volume {
    display: flex;
  }
  
  .volume > .progress {
    position: relative;
    width: 10em;
    height: 100%;
    margin: auto 0;
    border-radius: 0.1em;
    transition: all 0.1s ease-in;
  }
  
  .volume > .progress:hover {
    cursor: pointer;
  }
  
  .volume > .progress > .progress_wrapper {
    position: relative;
    height: 0.25em;
    width: 100%;
    border-radius: 0.1em;
  }
  
  .volume > .progress > .progress_wrapper > .progressbar_progress {
    position: absolute;
    width: 0%;
    height: 100%;
    background: #ffffff;
    border-radius: 0.1em;
    z-index: 2;
  }
  
  .volume > .progress > .progress_wrapper > .progressbar_progress > .progressbar_dot {
    position: relative;
    display: inline-block;
    top: -0.4em;
    left: 90%;
    margin: 0;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background: #ffffff;
    opacity: 0;
    cursor: pointer;
  }
  
  .volume > .progress > .progress_wrapper > .progressbar_progress_background {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.45);
    border-radius: 0.1em;
    z-index: 0;
  }
  
  .seek {
    position: absolute;
    top: 0;
    bottom: 0;
    opacity: 0;
    width: 100%;
    margin: auto;
    z-index: 3;
  }
  
  :global(#vpcc-seek-tooltip) {
    transform: translateX(-75%);
  }
  
  .tooltip {
    position: absolute;
    bottom: 2em;
    left: 0;
    background: #333333;
    border-radius: 0.2em;
    min-width: 4.25em;
    padding: 0.47em;
    font-size: 1.2em;
    opacity: 0;
    text-align: center;
    z-index: 5;
  }
  
  /* .tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -0.5em;
    border-width: 0.5em;
    border-style: solid;
    border-color: #333333 transparent transparent transparent;
  } */
  
  .progress:hover > .progress_wrapper > .tooltip {
    opacity: 0.95;
    cursor: pointer;
  }

  .subtitle_popup {
    /* display: grid; */
    display: none;
    grid-template-rows: repeat(1, 1fr);
    grid-gap: 0em;
    position: relative;
    transform: translate(calc(-65% - .85em), calc(-100% - 1rem));
    padding: 1.5em 0;
    opacity: 0.95;
    border-radius: 0.3em;
    background: #262626;
    transition: all 0.1s ease-in;
    min-width: 18em;
    min-height: 6em;
    text-align: left;
    z-index: 5;
  }

  .quality_popup {
    /* display: grid; */
    display: none;
    grid-template-rows: repeat(1, 1fr);
    grid-gap: 0em;
    position: relative;
    transform: translate(calc(-60% - 1em), calc(-100% - 1rem));
    padding: 1.5em 0;
    opacity: 0.95;
    border-radius: 0.3em;
    background: #262626;
    transition: all 0.1s ease-in;
    min-width: 16em;
    min-height: 6em;
    text-align: left;
    z-index: 5;
  }

  /* .subtitle_popup::after,
  .quality_popup::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -0.5em;
    border-width: 0.5em;
    border-style: solid;
    border-color: #333333 transparent transparent transparent;
  } */

  .subtitle_list,
  .quality_list {
    color: #838586;
    background: transparent;
    padding: 0.8em 2.8em;
    font-size: 1.2em;
    height: 1em;
  }

  .subtitle_list:hover,
  .quality_list:hover {
    cursor: pointer;
    color: rgba(255, 255, 255, 1);
    background: #404040;
  }
  
  .subtitle_list.active,
  .quality_list.active {
    color: rgba(255, 255, 255, 1);
    /* background: rgba(255, 255, 255, 0.25); */
  }
  
  .subtitle_title,
  .quality_title {
    color: #c1c2c2;
    font-size: 1.4em;
    font-weight: 600;
    background: transparent;
    padding: 0 2.25em 0.75em;
    height: 1em;
  }
  
  .subtitle_tick_wrapper,
  .quality_tick_wrapper {
    position: absolute;
    left: 0.6em;
  }
  
  .subtitle_tick_wrapper > div,
  .quality_tick_wrapper > div {
    width: 1em;
    height: 1em;
  }
  
  .live_text:hover {
    cursor: pointer;
  }
  
  .live_indicator {
    position: relative;
    height: 0.5em;
    width: 0.5em;
    background: rgba(255, 0, 0, 1);
    border-radius: 50%;
    margin: 0 0.4em;
  }
  
  .live_indicator:hover {
    cursor: pointer;
  }
  
  .live_indicator_beckground {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border: 0.1em solid rgba(255, 0, 0, 1);
    border-radius: 50%;
    animation: fadeOutLive 0.8s ease-out infinite;
  }
  
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: scale(0);
    }
  
    to {
      opacity: 0;
      transform: scale(1);
    }
  }
  
  @keyframes fadeOutLive {
    from {
      opacity: 1;
      transform: scale(1);
    }
  
    to {
      opacity: 0;
      transform: scale(2);
    }
  }
  
}`