import { NodeStates } from '../components/grid/NodeStates';

export const isValid = (x, y, grid, visited) => {
  return (
    x >= 0 &&
    x < grid[0].length &&
    y >= 0 &&
    y < grid.length &&
    !visited.has(`${y}_${x}`) &&
    grid[y][x].nodeState !== NodeStates.wall
  );
};

export const getNeighborIncrements = (isDiagonalNeighbors) => {
  let neighbors = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      // if diagonal neighbors are not allowed and the current is diagonal, skip
      if (!isDiagonalNeighbors && i !== 0 && j !== 0) continue;

      // you can't be your own neighbor
      if (i === 0 && j === 0) continue;

      neighbors.push({ x: j, y: i });
    }
  }
  if (isDiagonalNeighbors)
    neighbors.sort((a, b) => {
      if ((a.x === 0 || a.y === 0) && (b.x === 0 || b.y === 0)) {
        return 0;
      }
      if (a.x === 0 || a.y === 0) return -1;
      if (b.x === 0 || b.y === 0) return 1;
    });
  return neighbors;
};

export const getPath = (lastNode) => {
  let path = [];
  while ('prev' in lastNode) {
    path.push({ x: lastNode.x, y: lastNode.y });
    lastNode = lastNode.prev;
  }
  return path.reverse();
};

export const isDiagonal = (node1, node2) => {
  return node1.x !== node2.x && node1.y !== node2.y;
};
