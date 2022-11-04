USE THIS FILE TO DOCUMENT WHAT CHANGES/ BUG FIXES YOU HAVE MADE

CHANGES:
10/22 - JL
<- Reorganized functions and created function to avoid repeating code for animation `Lines 97 -> 122` index.js
Fixed bug with reset moves on `Line 26` index.js
Edited CSS for buttons and slot `Lines 57 -> 70` Styles.css
Created and added animation `Lines 107 -> 122` Styles.css
Added visual animation to buttons start and reset `Lines 12 -> 26` index.js
->

10/23 -NM
<-
Created Level navigation panel concept to the left of the main board, purely visual
Created a concept leaderboard panel to the right of the main board, purely visual
Created an X button on the Username input Modal
->

10/26 -JL
<-Made sure that reset button did not reset the move counts, but that it would only pause it. Changed event listeners for each button to make start button reset moves to 0
Began working on win screen, but not fully styled
->

10/27 -NM
<-
Made 3 diffrent level buttons functional with 3 static solvable states increasing in dificulty
Styled front page of the website
Seperated the button listners into a seperate JS file

->

10/28 -JL
<- Made new file storageSaver.js that will read and write data to leaderboard.json
Created functions to update the leaderboard for every new level clicked, so each level has its own leaderboard
Created method in updateLeaderboard that will organize the points from smallest to largest
->

10/28 -NM
<-
Added a Random board button, will do 50 random moves from the solved position
->

THINGS TO DO:
High score for moves?
Need to make the leaderboard functional
Create start and reset functional easier to understand (gray out grid with text in the middle to say to click the "Start" button to start)
!!! THE START AND RESET BUTTONS HAVE ALOT OF BUGS THAT NEED TO BE FIXED !!!
