// Tile Explorer JS

const PATTERN_ROWS = 6;
const PATTERN_COLS = 6;
const TILING_ROWS = 12;
const TILING_COLS = 18;
const COLORS = [
  '#e57373', '#f06292', '#ba68c8', '#64b5f6', '#4dd0e1',
  '#81c784', '#ffd54f', '#ffb74d', '#a1887f', '#90a4ae'
];

const patternGrid = document.getElementById('pattern-grid');
const tilingGrid = document.getElementById('tiling-grid');
const tileBtn = document.getElementById('tile-btn');

let pattern = Array(PATTERN_ROWS).fill().map(() => Array(PATTERN_COLS).fill(false));

function renderPatternGrid() {
  patternGrid.innerHTML = '';
  patternGrid.style.gridTemplateColumns = `repeat(${PATTERN_COLS}, 32px)`;
  for (let r = 0; r < PATTERN_ROWS; r++) {
    for (let c = 0; c < PATTERN_COLS; c++) {
      const sq = document.createElement('div');
      sq.className = 'square' + (pattern[r][c] ? ' active' : '');
      sq.dataset.row = r;
      sq.dataset.col = c;
      sq.onclick = () => toggleSquare(r, c);
      patternGrid.appendChild(sq);
    }
  }
}

function isAdjacent(r, c) {
  if (pattern[r][c]) return true;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      let nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < PATTERN_ROWS && nc >= 0 && nc < PATTERN_COLS) {
        if (pattern[nr][nc]) return true;
      }
    }
  }
  return false;
}

function toggleSquare(r, c) {
  if (!pattern[r][c] && !isAdjacent(r, c) && pattern.flat().some(Boolean)) return;
  pattern[r][c] = !pattern[r][c];
  renderPatternGrid();
}

function getPatternShape() {
  let shape = [];
  for (let r = 0; r < PATTERN_ROWS; r++) {
    for (let c = 0; c < PATTERN_COLS; c++) {
      if (pattern[r][c]) shape.push([r, c]);
    }
  }
  if (shape.length === 0) return [];
  // Normalize shape to top-left
  let minR = Math.min(...shape.map(([r]) => r));
  let minC = Math.min(...shape.map(([_, c]) => c));
  return shape.map(([r, c]) => [r - minR, c - minC]);
}

function renderTilingGrid(tiles) {
  tilingGrid.innerHTML = '';
  tilingGrid.style.gridTemplateColumns = `repeat(${TILING_COLS}, 32px)`;
  let grid = Array(TILING_ROWS).fill().map(() => Array(TILING_COLS).fill(null));
  tiles.forEach((tile, idx) => {
    tile.forEach(([r, c]) => {
      if (r >= 0 && r < TILING_ROWS && c >= 0 && c < TILING_COLS) {
        grid[r][c] = idx;
      }
    });
  });
  for (let r = 0; r < TILING_ROWS; r++) {
    for (let c = 0; c < TILING_COLS; c++) {
      const sq = document.createElement('div');
      sq.className = 'square tiled-square';
      if (grid[r][c] !== null) {
        sq.style.background = COLORS[grid[r][c] % COLORS.length];
      }
      tilingGrid.appendChild(sq);
    }
  }
}

function canPlace(grid, shape, r0, c0) {
  for (const [dr, dc] of shape) {
    let r = r0 + dr, c = c0 + dc;
    if (r < 0 || r >= TILING_ROWS || c < 0 || c >= TILING_COLS) return false;
    if (grid[r][c]) return false;
  }
  return true;
}

function placeShape(grid, shape, r0, c0, idx) {
  for (const [dr, dc] of shape) {
    let r = r0 + dr, c = c0 + dc;
    grid[r][c] = idx;
  }
}

function tileSurface() {
  let shape = getPatternShape();
  if (shape.length === 0) return renderTilingGrid([]);
  let grid = Array(TILING_ROWS).fill().map(() => Array(TILING_COLS).fill(null));
  let tiles = [];
  let idx = 0;
  for (let r = 0; r < TILING_ROWS; r++) {
    for (let c = 0; c < TILING_COLS; c++) {
      if (canPlace(grid, shape, r, c)) {
        placeShape(grid, shape, r, c, idx);
        tiles.push(shape.map(([dr, dc]) => [r + dr, c + dc]));
        idx++;
      }
    }
  }
  renderTilingGrid(tiles);
}

tileBtn.onclick = tileSurface;
renderPatternGrid();
renderTilingGrid([]);
