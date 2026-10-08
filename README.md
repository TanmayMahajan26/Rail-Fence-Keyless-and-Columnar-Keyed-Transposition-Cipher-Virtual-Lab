# Rail Fence (Keyless) and Columnar (Keyed) Transposition Cipher Virtual Lab

## Experiment
Observe position permutations using:
1. Rail Fence Cipher — keyless zig-zag form with user-selectable row count.
2. Columnar Transposition Cipher — keyword-based column permutation.

## Files
- `index.html` — complete experiment UI/content
- `style.css` — common styling
- `script.js` — encryption, decryption, visualization and quiz logic
- `README.md` — integration documentation

## Run
Open `index.html` in a modern browser. No external libraries are required.

## Input / Output
### Rail Fence
Input: message and number of rows (minimum 2).
Output: processed text and dynamic zig-zag row visualization.

### Columnar
Input: message and selected keyword.
Output: encrypted/decrypted text and permutation grid.

## Algorithm conventions
- Spaces/punctuation are removed and input is converted to uppercase.
- Rail Fence writes characters in a zig-zag across the selected number of rows and reads the rows top-to-bottom.
- Columnar text is written row-wise and columns are read in alphabetical keyword order.
- Repeated letters in the keyword are ordered from left to right.
- No padding character is inserted; decryption reconstructs unequal final columns.

## Test cases
- Rail Fence (2 rows): HELLOWORLD -> HLOOLELWRD
- Rail Fence (3 rows): HELLOWORLD -> HOLELWRDLO
- Columnar: ATTACKATDAWN, key ZEBRA -> CATTTANADAKW

## Integration
Suggested folder: `/experiments/transposition/`
Entry file: `index.html`
Navigation title: `Rail Fence & Columnar Transposition`
Short description: `Visualize position permutations using keyless Rail Fence and keyword-based Columnar transposition ciphers.`
Required libraries: None.

## Included learning components
Aim, objective, separate theory, detailed procedure with examples, interactive simulation, dynamic permutation visualization, test cases, quiz, viva questions, and references section.
