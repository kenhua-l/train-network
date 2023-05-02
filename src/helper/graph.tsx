type Station = {
  nodes: string[];
  lines: string[];
}

// though the lesser the more coverage, but we want to 
// increase this value as much as possible to NOT cover
// too much.
// 7 is the max that covers my test cases
// 2 is the min to have better than 1st test result.
const LAPSED_STATIONS = 5; 
// allowance of number of stations from the shortest 
// distance found via djikstra, the lesser the better
// 3 is the minimum max to get a desired answer from two test cases
const STATIONS_TOLERANCE = 3;
// allowance of number of line changes from perceived least
// line changes, the lesser the better
// 1 is the minimum max to get a desired answer from one test case (good)
const LINES_TOLERANCE = 1;

class Graph {
  // structure & constructor
  numberOfNodes: number;
  adjList: {[key:string] : Station};

  constructor() {
    this.numberOfNodes = 0;
    this.adjList = {};
  }

  add(id:string, neighbors:string[], lines:string[]) {
    if(!(id in this.adjList)) {
      this.adjList[id] = { nodes: [], lines: [] };
      this.numberOfNodes++;
    }
    for(let i=0; i<neighbors.length; i++) {
      if(!this.adjList[id].nodes.includes(neighbors[i])) {
        this.adjList[id].nodes.push(neighbors[i]);
      }
      // direct back just in case
      if(!(neighbors[i] in this.adjList)) {
        this.adjList[neighbors[i]] = { nodes: [], lines: [] };
        this.numberOfNodes++;
      }
      if(!this.adjList[neighbors[i]].nodes.includes(id)) {
        this.adjList[neighbors[i]].nodes.push(id);
      }
    }
    for(let i=0; i<lines.length; i++) {
      if(!this.adjList[id].lines.includes(lines[i])) {
        this.adjList[id].lines.push(lines[i]);
      }
    }
  }

  copy() {
    let copy = new Graph();
    copy.numberOfNodes = this.numberOfNodes;
    copy.adjList = JSON.parse(JSON.stringify(this.adjList));
    return copy;
  }

  /* Log: 15/4/23
  // step 1: simple dfs
  // dfs is okay. so far returns all possible paths. 
  // but the result size is too big and non-sensical (looping lrt lines)
  // step 2: check line change
  // 1. avoid using same line until a number of stations has passed
  // - result for to and fro are different (for 5) 
  // (eg bishan to outram - 7999 paths / 10295 paths)
  // 2. avoid using two same lines (if you took red and circle, can 
  // only retake red OR circle)
  // step 3: find shortest path first then allow only a number of 
  // threshold from the shortest path
  // step 4: find least line change and add tolerance
  */
  dfs(src: string, dest: string) {
    // setup
    // djikstra to find shortest path
    var shortestDist = this.djikstra(src, dest);
    var visited : {[key:string]: number} = {};
    for(let node of Object.keys(this.adjList)) {
      visited[node] = 0;
    }

    var traversalnlines: string[][][] = [];
    let path = [];
    path.push(src);
    this.dfs_util(src, dest, shortestDist, visited, path, [], traversalnlines);
    
    // step 4: find least line change and add tolerance
    let minLineChanges = Number.POSITIVE_INFINITY;
    traversalnlines.forEach((journey) => {
      let changes = this.howManyLineChanges(journey[1]);
      minLineChanges = minLineChanges > changes ? changes : minLineChanges;
    });

    var traversal: string[][] = [];
    traversal = traversalnlines.filter((journey) => {
      return this.howManyLineChanges(journey[1]) <= minLineChanges + LINES_TOLERANCE;
    }).sort((a, b) => {
      if(a[0].length == b[0].length) {
        return this.howManyLineChanges(a[1]) - this.howManyLineChanges(b[1]);
      } else {
        return a[0].length - b[0].length;
      }
    }).map((journey) => {
      return journey[0] as string[];
    });

    return traversal;
  }

  dfs_util(src: string, dest: string, shortestDist: number, visited: {[key:string]: number}, path: string[], lines: string[], ans: string[][][]) {
    if(path.length > shortestDist + STATIONS_TOLERANCE) {
      return;
    }
    if(src == dest) {
      if(!ans.includes([path, lines])) { // safeguard but theorectically doesn't affect as the visited prevents the same thing.
        ans.push([path.slice(), lines]);
      }
      // console.log(lines);
      return;
    }
    visited[src] = 1;

    for(let i=0; i<this.adjList[src].nodes.length; i++) {
      let neighbor = this.adjList[src].nodes[i];
      if(visited[neighbor] == 0) { // go to this node next
        let linesCopy = lines.slice();
        let commutedLine = this.howToGetThere(src, neighbor); 
        if(linesCopy.length == 0) { // first station in journey
          linesCopy.push(commutedLine[0]); // doesnt matter for first line
        } else {
          if(commutedLine.length==1) {
            if(linesCopy.includes(commutedLine[0])) {
              if(this.hasSameLine(linesCopy)) { // allows one time same line
                break;
              } else if(linesCopy[linesCopy.length-1] != commutedLine[0]) {
                if(linesCopy.length - linesCopy.lastIndexOf(commutedLine[0]) + 1 > LAPSED_STATIONS) {
                  linesCopy.push(commutedLine[0]);
                } else {
                  break;
                }
              } else {
                linesCopy.push(commutedLine[0]);
              }
            } else {
              linesCopy.push(commutedLine[0]);
            }
          } else {
            // two lines only
            if(linesCopy.includes(commutedLine[0]) && this.hasSameLine(linesCopy)) {
              break;
            } else if(linesCopy.includes(commutedLine[1]) && this.hasSameLine(linesCopy)) {
              break;
            } else if(linesCopy.includes(commutedLine[0]) && linesCopy[linesCopy.length-1] == commutedLine[0]) {
              linesCopy.push(commutedLine[0]);
            } else if(linesCopy.includes(commutedLine[1]) && linesCopy[linesCopy.length-1] == commutedLine[1]) {
              linesCopy.push(commutedLine[1]);
            } else if(linesCopy.includes(commutedLine[0]) && linesCopy[linesCopy.length-1] != commutedLine[0]) {
              if(linesCopy.length - linesCopy.lastIndexOf(commutedLine[0]) + 1 > LAPSED_STATIONS) {
                linesCopy.push(commutedLine[0]);
              } else if(linesCopy.includes(commutedLine[1]) && linesCopy.length - linesCopy.lastIndexOf(commutedLine[1]) + 1 > LAPSED_STATIONS) {
                linesCopy.push(commutedLine[1]);
              } else {
                break;
              }
            } else if(linesCopy.includes(commutedLine[1]) && linesCopy[linesCopy.length-1] != commutedLine[1]) {
              if(linesCopy.length - linesCopy.lastIndexOf(commutedLine[1]) + 1 > LAPSED_STATIONS) {
                linesCopy.push(commutedLine[1]);
              } else if(linesCopy.includes(commutedLine[0]) && linesCopy.length - linesCopy.lastIndexOf(commutedLine[0]) + 1 > LAPSED_STATIONS) {
                linesCopy.push(commutedLine[0]);
              } else {
                break;
              }
            } else {
              linesCopy.push(commutedLine[0]);
            }
          }
        }
        path.push(neighbor);
        this.dfs_util(neighbor, dest, shortestDist, visited, path, linesCopy, ans);
        path.splice(path.indexOf(neighbor), 1);
      }
    }
    visited[src] = 0;
  }

  // utils
  // returns the line you need to take to commute between two adjacent stations
  howToGetThere(src: string, dest: string) {
    // only one line
    let sline = this.adjList[src].lines;
    let dline = this.adjList[dest].lines;
    let ans = [];
    for(let i=0; i<sline.length; i++) {
      for(let j=0; j<dline.length; j++) {
        if(sline[i] == dline[j]) ans.push(sline[i]);
      }
    }
    // mostly return one line but there are two instances as of now
    // that returns two lines
    return ans;
  }

  // check if the commute has already taken one same line before
  hasSameLine(arr: string[]) {
    let check: string[] = [];
    for(let i=0; i<arr.length; i++) {
      if(check.includes(arr[i])) {
        if(check[check.length-1] == arr[i]) continue;
        else return true;
      } else {
        check.push(arr[i]);
      }
    }
    return false;
  }

  // check the shortest distance available using bfs
  djikstra(src: string, dest: string) {
    // djikstra uses bfs
    var distances : {[key:string]: number} = {};
    for(let node of Object.keys(this.adjList)) {
      distances[node] = node === src ? 0 : Number.POSITIVE_INFINITY;
    }

    var unsettled = [src];
    while(unsettled.length) {
      let now = unsettled.shift() || '';
      let neighbors = this.adjList[now]?.nodes;
      for(let i=0; i<neighbors.length; i++) {
        let next = neighbors[i];
        if(distances[next] > distances[now] + 1) {
          distances[next] = distances[now] + 1;
          unsettled.push(next);
        }
      }
    }
    return distances[dest];
  }

  // cheeck how many times you have to change line
  howManyLineChanges(journey: string[]) {
    let change = 0;
    let curr = journey[0]
    for(let i=1; i<journey.length; i++) {
      if(journey[i] != curr) {
        curr = journey[i];
        change++;
      }
    }
    return change;
  }

}


export default Graph;