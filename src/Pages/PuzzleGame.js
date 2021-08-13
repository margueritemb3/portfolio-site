import React from 'react';
import {
    Box,
    VStack,
    Grid,
    GridItem,
    Heading,
    Button,
    Link,
    Text
} from '@chakra-ui/react';
import {
    ArrowForwardIcon,
    ArrowBackIcon,
    ArrowRightIcon,
    ChevronRightIcon
} from '@chakra-ui/icons';
import {
    BrowserRouter as Router,
    useHistory,
    Switch,
    Route,
} from "react-router-dom";
import '../Leaves.css';
import '../App.css';
import blank from './PuzzleGameImages/Puzzle_Blank.JPG';
import partial from './PuzzleGameImages/Puzzle_Partial.JPG';
import complete from './PuzzleGameImages/Puzzle_Complete.JPG';


function PuzzleGame() {
    let history = useHistory();
    return (
        <div class="branches" id="projectPage">
            <div id="leaves">
                {[...Array(30).keys()].map((i) => (<i key={i}></i>))}
            </div>
            <div id="leavesleft">
                {[...Array(30).keys()].map((i) => (<i key={i}></i>))}
            </div>
            <Button id="backButton" onClick={() => history.push('/')} leftIcon={<ArrowBackIcon />} colorScheme="brand" variant="outline" />
            <Box id="projectSection">
                <Heading id="projectTitle">Grid Puzzle Game</Heading>
                <Text id="text">
                    A randomly generated puzzle game that is inspired by puzzle games like Picross and Nonogram.
                </Text>
                <Grid p={3} templateColumns="repeat(3, 1fr)" gap={6} ml="50px" mr="50px">
                    <GridItem w="100%" h="95%" colSpan={1}>
                        <img class="projectImage" src={blank} />
                    </GridItem>
                    <GridItem w="100%" h="95%" colSpan={1}>
                        <img class="projectImage" src={partial} />
                    </GridItem>
                    <GridItem w="100%" h="95%" colSpan={1}>
                        <img class="projectImage" src={complete} />
                    </GridItem>
                </Grid>
                <Heading id="heading">How To Play</Heading>
                <Text id="text">
                    Each square in the grid can be clicked to change the color of that square to pink.
                    <br /> <br />
                    There are number clues on the sides of each row and column of the grid indicating how many squares need to be colored pink in a row.
                    If there are multiple numbers on the same row or column, it indicates that there are multiple groups of filled in squares, each group separated by at least one unfilled box.
                    <br /> <br />
                    The header of a row/column turns gray when there is a valid sequence of filled in squares in that row/column.
                    <br />Note: a header being grayed-out does not mean that row/column is correct, it just means it follows the number clues correctly.
                    <br /> <br />
                    Clicking a square twice will turn it gray.
                    This has no effect on the solution and is only for note-taking and as a visual aid to mark squares that the player has already figured out will definitely not be filled.
                    The player can choose to use this feature, ignore it, or partially use it.
                    It has no effect on the solution of the puzzle.
                    <br /> <br />
                    There is also the ability to reset a puzzle board by clicking the 'Reset Puzzle' button in the top left of the game.
                </Text>
                <Button id="button" as="a" href="https://gridpuzzle.netlify.app/" target="_blank" rightIcon={<ArrowForwardIcon />} colorScheme="brand" variant="outline">
                    Play Game
                </Button>
                <Heading id="heading">How it Works</Heading>
                <Text id="text">
                    This game was built using Javascript and the p5.js library, a visual drawing library I was unfamiliar with and learned as I build this game.
                    <br /> <br />
                    A puzzle is randomly generated by randomly assigning '1's and '0's to spots on a grid (represented by a 2-dimensional array) to represent blank and colored squares.
                    Another 2-dimensional array is also created which keeps track of the players' view of the puzzle and the players' coloring in each square.
                    <br /> <br />
                    Whenever a square is pressed, it checks every square to see if the coordinates of the click were within any of the squares and then updates the value of the grid array to keep track of that update.
                    It then calls a function that checks for any 'valid' rows/columns that need to be grayed out (or maybe ones that are now no longer grayed out).
                    It also calls a function that checks if the puzzle is completed, by checking if all the rows and columns have been grayed out (this method prevents issues with there being multiple solutions to collection of number clues).
                    <br /> <br />
                    The are two more 2-dimensional arrays (one for rows and one for columns) that keep track of the number clues.
                    The strings of numbers printed on the sides of the grid are made from these arrays through an Array join().
                    These 2-dimensional arrays are built by iterating through the puzzle solution and keeping track of how many colored squares are in sequence on each row and column.
                    These arrays are used to put together regular expressions to check for valid rows (grayed out rows).
                </Text>
                <Button id="button" as="a" href="https://github.com/margueritemb3/grid-puzzle" target="_blank" rightIcon={<ArrowForwardIcon />} colorScheme="brand" variant="outline">
                    See Code Repository
                </Button>
                <Heading id="heading">Why?</Heading>
                <Text id="text">
                    I have always loved puzzles and puzzle games a few years ago, I discovered these grid-like puzzle games (specifically as a mobile app).
                    My favorites are Picture Cross and Picross Luna.
                    I have solved thousands of these puzzles over the years, so I am very familiar with the patterns of solving them, but less so with creating one and I was curious to familiarize myself with that aspect.
                    I also thought it would be fun to recreate a game that I love.
                </Text>
                <Heading id="heading">Road Blocks & Difficulties</Heading>
                <Text id="text">
                    The biggest issue I had to solve when coding this game, was making the row/column headers (the area with the number clues) gray out when a row or column is filled in following the clues.
                    It is probably worth noting that this is not a required feature to play the game, but I always find it helpful when the Picross games I play have it, as it allows the player to count less, and it is easier to spot mistakes.
                    The reason this was an issue was because there are multiple ways to fill in a row that follow the clues, but may not necessarily be the solution to that row that was generated by the puzzle.
                    I spent a lot of time brainstorming solutions. At first I tried to keep a count of how many squares were filled in and those groupings and compare them to the number clues, but that ended up being an ugly and confusing solution with too many conditionals.
                    Eventually I decided the best way to determine if a row or column was valid according to the clues would be to use regular expressions, so I reorganized the way I was storing data to be more 'string-friendly' and then created regular expressions for each row and column based on the number clues.
                    This solution works well, but it did take a little trial-and-error as I was not very familiar with using regular expressions.
                    <br /> <br />
                    As mentioned previously, a randomly generated puzzle can have multiple solutions at times.
                    Although I programmed this game to accept any valid solution (in the case that there are many), I am not sure what patterns cause there to be multiple solutions or how to prevent them.
                    Multiple solutions aren't that big of a deal, every puzzle has at least one solution and is solvable, however a puzzle with multiple solutions can be harder to solve as the number clues become more ambiguous.
                    To limit this added difficulty, I increased the ratio of colored squares to blank squares in each puzzle solution.
                    Having more colored squares reduces the ambiguity of the puzzle's number clues as more squares are easily filled in from the beginning.
                    One potentially negative side effect is that this also reduces the average difficulty of the puzzles.
                    That being said, even some of the puzzles I have played on mobile Picross games have had multiple solutions.
                    Figuring out what causes a puzzle to have multiple solutions would require more testing and research.
                </Text>
                <Heading id="heading">Potential Extensions</Heading>
                <Text id="text">
                    Add customization to the game (change grid dimensions, change colors, etc).
                    The easy part about this addition is I thought ahead when coding this and every constant value like color or pixel size is stored in a constant at the top of the file and all other values are based off that.
                    This makes it easy to change the values in my game.
                    The hard part would be creating a visual UI to adjust these values, and answering the question of whether it is should be part of the p5.js graphics of the game or the surrounding html.
                    <br /> <br />
                    In most of the Picross games like this that I have played before, the solution forms the image of a well-known object of some sort such as an apple or a table.
                    It would be cool to have a list of stored puzzles that can be randomly chosen that actually form an image.
                    They could even be images that are more personal to me, like deathly hallows symbol from Harry Potter (as I am a huge Harry Potter fan).
                    This would just require a database or a file of premade 2-dimensional array designs.
                </Text>
            </Box>
        </ div>
    );
}

export default PuzzleGame;
