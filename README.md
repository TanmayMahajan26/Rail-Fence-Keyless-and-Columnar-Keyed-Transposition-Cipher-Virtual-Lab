# Transposition Cipher Virtual Lab

An interactive Virtual Cryptography Laboratory designed to study and observe permutation-based encryption and decryption in classical ciphers.

## Experiment Overview
The laboratory explores position-based permutations and their inverse restorations:
1. **Rail Fence Cipher (Keyless Transposition)**: Characters are written in a geometric zig-zag pattern across user-selectable rails (rows) with cycle period T = 2(r - 1), then read row by row.
2. **Columnar Transposition Cipher (Keyed Transposition)**: Characters are written into a rectangular grid row-by-row beneath a secret keyword and extracted vertically according to the alphabetical rank order of the keyword characters.

---

## Laboratory Features

### 1. Interactive Simulation Workbench
- **Dual Cipher Modes**: Toggle between Rail Fence and Columnar Transposition.
- **Dynamic Visualizations**:
  - Zig-zag rails with live character slot positioning and coordinate indicators.
  - Rectangular permutation matrix with keyword headers, alphabetical rank badges, and ragged (padding-free) cell indicators.
- **Step-by-Step Playback Controller**:
  - Full playback controls: Play, Pause, Step Forward, Step Backward, Reset, and Speed Adjustment.
  - **Live Status Narrator**: Real-time explanation of every transformation step.
- **Interactive Controls**:
  - Support for custom keywords and quick presets (ZEBRA, CRYPTO, SECRET, GERMAN, BALLOON, LAB).
  - Instant roundtrip verification with Swap Result to Input button.
  - Clipboard copy.

### 2. Permutation Explorer
- **Cauchy Two-Line Notation**: Automatically renders the standard two-line mathematical permutation representation.
- **Disjoint Cycle Decomposition**: Decomposes the active permutation into cyclic groups.
- **Full Permutation Table**: Detailed mapping table displaying input index, character, transformation path, destination index, and ciphertext symbol.

### 3. Curriculum & Assessment Modules
- **Aim & Learning Objectives**: Academic mapping to Cryptography and Information Security courses.
- **Comprehensive Theory**: Mathematical formulation of permutations, inverse permutations, period equations, and cryptanalytic vulnerabilities.
- **Benchmark Test Cases**: Pre-configured test vectors with instant Load & Simulate execution.
- **Self-Assessment Quiz**: Conceptual multiple-choice questions with grading and explanations.
- **Viva Voce**: Frequently asked university exam questions with collapsible model answers.

---

## Algorithm Conventions

1. **Input Sanitization**:
   - Punctuation, symbols, and spaces are removed; letters are normalized to uppercase.
2. **Rail Fence Zig-Zag**:
   - Alternates downwards from row 0 to row r-1, then upwards to row 0.
   - Oscillation cycle period: T = 2(r - 1).
3. **Columnar Key Ranking**:
   - Letters in the keyword are sorted alphabetically to determine column extraction order.
   - Duplicate letters in the keyword are ranked stably from left to right.
4. **Ragged Grid (No Padding)**:
   - For message length n and key length m, the grid has ceil(n/m) rows.
   - The first n mod m columns have full height ceil(n/m); remaining columns have floor(n/m) rows.
   - Decryption reconstructs these unequal column lengths without requiring extra filler characters.

---

## Benchmark Test Cases

| Cipher | Input Message | Key / Rails | Expected Ciphertext | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Rail Fence** | HELLOWORLD | 2 Rails | HLOOLELWRD | 2-row odd/even alternating split |
| **Rail Fence** | HELLOWORLD | 3 Rails | HOLELWRDLO | Classic 3-rail bounce (T = 4) |
| **Rail Fence** | DEFENDTHEEASTWALL | 4 Rails | DTAEETWFNDHLSEEA | 4-rail oscillation |
| **Columnar** | ATTACKATDAWN | ZEBRA | CATTTANADAKW | 12 chars across 5 cols (uneven final row) |
| **Columnar** | DEFENDTHEEASTWALLOFCASTLE | GERMAN | NALTEHWCDTTFEEELSDSOLFEAA | 25 chars across 6 cols |
| **Columnar** | CRYPTOGRAPHYLABORATORY | BALLOON | RAOCRBYYPRPHAGARTYTOLO | Keyword with repeated letters L and O |

---

## Running the Virtual Lab Locally

The virtual laboratory is built entirely with standard web technologies (HTML5, CSS3, ES6 JavaScript) and requires no external libraries or build tools.

1. Double-click `index.html` in any modern web browser.
2. Or serve locally via Python or Node:
   ```bash
   # Using Python
   python -m http.server 8080
   
   # Using Node.js
   npx serve .
   ```
3. Open `http://localhost:8080` in your web browser.

---

## Repository Structure

```
├── index.html        # Main layout
├── style.css         # Styling, themes, CSS grid
├── script.js         # Cryptographic logic, UI controller, quiz
└── README.md         # Documentation
```

---

## References
- William Stallings, *Cryptography and Network Security: Principles and Practice*, 8th Edition.
- Behrouz A. Forouzan, *Cryptography and Network Security*, McGraw-Hill.
- Alfred J. Menezes et al., *Handbook of Applied Cryptography*, CRC Press.
