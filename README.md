# MRT Train Path Finder

This app is a path finder from one train station to another and suggests several paths a user can take to move from one station to another. This project is done mainly to familiarise myself with NextJs, ReactJs, Typescript, and Jest testing.

## Objectives

1. Represent the train station network as a graph and implement graph concepts of Breadth-First-Search (BFS) and Depth-First-Search (DFS) to find shortest path (BFS-Djikstra) and other plausible paths.
2. Create test cases to test the graph representation and graph logics using Jest.
3. Use Typescript to define the props passed into React components to minimise errors.

## Project Setup

This project is live at [https://train-network-path-finder.vercel.app](https://train-network-path-finder.vercel.app/) for your perusal but you can also clone the project and run `npm run dev` like any NextJs project to work on the source code.

A copy of this README can also be found in [my notion page](https://www.notion.so/MRT-Train-Path-Finder-068af0c0952346d69175a0998afa0db1).

## Development Step

1. The first step of the project is to create the train map. For this, I would like to thank the person who uploaded an SVG version of the map on [wikimedia](https://upload.wikimedia.org/wikipedia/commons/6/68/Singapore_MRT_and_LRT_System_Map.svg). From that version, I just made some adjustments to it to get the version I am using now. The SVG of the map is written in the trainMap.tsx file.
2. Next, I created the graph representation of the network. I have written the Graph class and the insert function to add vertices to the graph. I have decided to use an undirected unweighted graph for this version to simplify the work. 
3. Using the graph, I worked on the algorithm to figure out the paths.
    1. On first pass, using DFS, the programme manages to give me all the possible paths from one station to another but the result is absurdly big which can show me up to 40 thousand paths for two adjacent stations.
    2. On the second pass, I truncate the DFS call whenever it attempts to return to a previously taken line before an X number of stations has passed. This is to avoid paths that contains absurd journey like taking the CCL to Botanic Gardens, changing to DTL to Stevens, then changing to TEL to Caldecott JUST TO change to CCL again and continue to Marymount. With this constraint, the journey has to pass by at least 5 stations before continuing again in a previously taken line. From this pass onwards, I also observe that the to and fro journeys have different numbers of paths.
    3. For the third pass, I realise there is no need for a journey to change lines twice to the same line. For example, there might be instance where you can take ONE same line again like DTL → CCL → DTL as DTL and CCL have long detours that can be done faster if you take lines in between. BUT there is no need to retake TWO SAME lines. This pass greatly reduces the number of paths the programme returns on DFS.
    4. On the fourth pass, I decided to use BFS-Djikstra to determine the shortest path from one station to the next. Then using the information, allow paths that returns the shortest and those within tolerated shortest number of stations. Sometimes user can just take a longer route by 2-3 stations if the route doesn’t require them to change lines often.
    5. Similarly, on the fifth (one extra line change tolerated) and sixth passes (two extra line changes tolerated), I have also truncated the number of line changes based on the shortest path journey. 
4. On average, after the limitations applied to the journeys, the DFS return 1-3 paths for the journey test cases. And as more limitations are applied, the time taken to run the tests significantly shortens to roughly less than 1ms per test case.

## Test Result (Jest)

| SN | Src (code) | Dest (code) | Djikstra (shortest) | First Pass Paths (number) | First Pass Time (ms) | Second Pass Paths (number to / fro) | Second Pass Time (ms) | Third Pass Paths (number to / fro) | Third Pass Time (ms) | Fourth Pass Paths (number to / fro) | Fourth Pass Time (ms) | Fifth Pass Paths (number to / fro) | Sixth Pass Paths (number to / fro) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Bishan (cc15) | Outram Park (ew16) | 8 | 18955 | 669 | 11872 / 11692 | 749 | 246 / 226 | 36 | 9 / 8 | 6 | 3 | 5 / 6 |
| 2 | Bishan (cc15) | Ang Mo Kio (ns16) | 1 | 40666 | 3717 | 25506 / 25243 | 4172 | 70 / 63 | 37 | 1 / 1 | 1 | 1 | 1 |
| 3 | Bishan (cc15) | Punggol Point (pw3) | 9 | 108602 | 10463 | 61242 / 66462 | 7597 | 288 / 360 | 61 | 1 / 1 | 3 | 1 | 1 |
| 4 | Bishan (cc15) | Changi Airport (cg2) | 12 | 110784 | 10550 | 58302 / 36552 | 5959 | 314 / 198 | 44 | 1 / 1 | 4 | 1 | 1 |
| 5 | Bishan (cc15) | Raffles Place (ew14) | 8 | 52024 | 3507 | 36863 / 31784 | 3010 | 413 / 247 | 32 | 11 / 9 | 3 | 1 | 1 / 4 |
| 6 | Bishan (cc15) | South View (bp2) | 13 | 57051 | 4874 | 35418 / 34247 | 3995 | 130 / 133 | 44 | 4 / 5 | 5 | 1 | 2 |
| 7 | Ang Mo Kio (ns16) | Lavender (ew11) | 10 | 115686 | 13888 | 82650 / 62148 | 9614 | 277 / 252 | 40 | 6 / 7 | 3 | 1 | 3 |
| 8 | Ang Mo Kio (ns16) | Kaki Bukit (dt28) | 9 | 136766 | 16553 | 65641 / 91597 | 11526 | 116 / 187 | 38 | 1 / 1 | 3 | 1 | 1 |
| 9 | Bukit Batok (ns2) | Bukit Gombak (ns3) | 1 | 48883 | 6202 | 28657 / 31533 | 6046 | 20 / 129 | 28 | 1 / 1 | 2 | 1 | 1 |
| 10 | Pioneer (ew28) | Boon Lay (ew27) | 1 | 1 | 4765 | 1 / 1 | 5414 | 1 / 1 | 32 | 1 / 1 | 1 | 1 | 1 |
| 11 | Woodlands (ns9) | Woodlands North (te1) | 1 | 1 | 3993 | 1 / 1 | 4758 | 1 / 1 | 38 | 1 / 1 | 2 | 1 | 1 |
| 12 | Raffles Place (ew14) | City Hall (ew13) | 1 | 48475 | 5154 | 34003 / 31094 | 5009 | 334 / 253 | 35 | 1 / 1 | 1 | 1 | 1 |
| 13 | Fajar (bp10) | Bangkit (bp9) | 1 | 2 | 9975 | 2 / 2 | 11610 | 2 / 2 | 81 | 1 / 1 | 2 | 1 | 1 |
| 14 | Samudera (pw4) | Segar (bp11) | 23 | 345844 | 75226 | 210960 / 199008 | 42197 | 860 / 772 | 127 | 3 / 5 | 9 | 3 | 3 / 5 |
| 15 | Samudera (pw4) | Riviera (pe4) | 7 | 4 | 10668 | 4 / 4 | 15304 | 4 / 4 | 99 | 4 / 4 | 2 | 4 | 4 |
| 16 | Samudera (pw4) | Bakau (se3) | 7 | 4 | 10630 | 4 / 4 | 15182 | 4 / 4 | 97 | 4 / 4 | 2 | 4 | 4 |
| 17 | Dhoby Ghaut (cc1) | Outram Park (ew16) | 3 | 16665 | 447 | 12242 / 12186 | 587 | 304 / 325 | 23 | 3 / 3 | 2 | 1 | 3 |
| 18 | Maxwell (te18) | Shenton Way (te19) | 1 | 34033 | 4914 | 21545 / 20838 | 6264 | 160 / 102 | 33 | 1 / 1 | 2 | 1 | 1 |
| 19 | Kovan (ne13) | Woodleigh (ne11) | 2 | 42473 | 6742 | 30207 / 26391 | 7968 | 1 / 127 | 41 | 1 / 1 | 1 | 1 | 1 |
| 20 | Harbourfront (cc29) | Dhoby Ghaut (cc1) | 4 | 46510 | 3485 | 33965 / 32590 | 3758 | 369 / 399 | 52 | 3 / 3 | 2 | 1 | 1 |
| 21 | Tanah Merah (ew4) | Expo (cg1) | 1 | 25949 | 5603 | 17345 / 18842 | 7639 | 58 / 54 | 40 | 1 / 1 | 2 | 1 | 1 |
| 22 | Bedok (ew5) | Expo (cg1) | 2 | 51896 | 8269 | 34688 / 37682 | 10437 | 58 / 54 | 44 | 1 / 1 | 1 | 1 | 1 |
| 23 | Sembawang (ns11) | Yio Chu Kang (ns15) | 4 | 40666 | 5336 | 25243 / 25506 | 6452 | 1 / 1 | 27 | 1 / 1 | 1 | 1 | 1 |
| 24 | Bayfront (ce1) | Promenade (cc4) | 1 | 43893 | 3247 | 28561 / 26042 | 3107 | 98 / 224 | 33 | 1 / 1 | 1 | 1 | 1 |
| 25 | Harbourfront (cc29) | Harbourfront (cc29) | 0 | 1 | 1 | 1 / 1 | 1 | 1 / 1 | 2 | 1 / 1 | 2 | 1 | 1 |
| 26 | Tuas Link (ew33) | Tuas Link (ew33) | 0 | 1 | 1 | 1 / 1 | 1 | 1 / 1 | 1 | 1 / 1 | 1 | 1 | 1 |
| 27 | Clementi (ew23) | Clementi (ew23) | 0 | 1 | 1 | 1 / 1 | 1 | 1 / 1 | 1 | 1 / 1 | 1 | 1 | 1 |
| 28 | Choa Chu Kang (ns4) | Bukit Panjang (dt1) | 5 | 42195 | 3888 | 26012 / 25886 | 4517 | 56 / 58 | 34 | 1 / 1 | 1 | 1 | 1 |
| 29 | Yew Tee (ns5) | Cashew (dt2) | 7 | 69648 | 6634 | 44493 / 43239 | 6736 | 56 / 58 | 34 | 1 / 1 | 2 | 1 | 1 |
| 30 | Bras Basah (cc2) | Marymount (cc16) | 6 | 110684 | 12243 | 67194 / 75064 | 10551 | 280 / 192 | 40 | 4 / 6 | 1 | 1 / 3 | 4 / 6 |
| 31 | Tan Kah Kee (dt8) | Ubi (dt27) | 10 | 152532 | 16856 | 71417 / 103050 | 12169 | 99 / 114 | 42 | 3 / 1 | 2 | 1 | 3 / 1 |
| 32 | Esplanade (cc3) | Farrer Road (cc20) | 7 | Test not done | Test not done | 59356 / 67584 | 9154 | 83 / 114 | 39 | 4 / 2 | 2 | 1 | 3 / 2 |
| 33 | Bayfront (ce1) | Farrer Road (cc20) | 8 | Test not done | Test not done | 51733 / 57447 | 6326 | 165 / 256 | 40 | 4 / 6 | 2 | 1 | 3 / 2 |
| 34 | Joo Koon (ew29) | Damai (pe7) | 22 | Test not done | Test not done | Test not done | Test not done | 280 / 294 | 84 | 1 / 1 | 7 | 1 | 1 |
| 35 | Changi Airport (cg2) | Woodlands North (te1) | 21 | Test not done | Test not done | Test not done | Test not done | 233 / 296 | 53 | 3 / 3 | 7 | Test Fail | 3 |