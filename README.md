# EZSudoku
EZSudoku is a Sudoku solver. It is currently a work in progress. The current version is accessible [here](https://dev.winstonisaac.com/EZSudoku).

## What is Sudoku?
Sudoku is a logic-based, combinatorial number-placement puzzle. In classic sudoku, the objective is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids that compose the grid (also called "boxes", "blocks", or "regions") contain all of the digits from 1 to 9. The puzzle setter provides a partially completed grid, which for a well-posed puzzle has a single solution. ([Wikipedia](https://en.wikipedia.org/wiki/Sudoku))

## Feature List
* EZSudoku can solve up to [the hardest puzzles](http://www.mathsphere.co.uk/downloads/sudoku/10204-fiendish.pdf).
* Designed to work for perfect square Sudokus (tested up to a 16 x 16 puzzle). The web interface, however, only includes support up to 9 x 9 due to visual constraints.
* The solver utilizes both a logical approach and a backtracking method (for the hardest puzzles).
* The web interface checks for error in the board to be solved (e.g. having too few entries, same values in a row/column/box).

## Special Thanks
* [mathsphere.co.uk](http://www.mathsphere.co.uk/resources/MathSphereFreeResourcesSudoku.html) for the Sudoku puzzles used in testing this solver.
* M. Ramezani from Stack Overflow for the [backtracking code](https://stackoverflow.com/a/55757694) I used as a fallback method.
* [neumorphism.io](https://neumorphism.io/) for their box-shadow generator.

## Contact
* For any concerns related to EZSudoku, please contact me: [marc@winstonisaac.com](mailto:marc@winstonisaac.com)

## License
[Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/)
