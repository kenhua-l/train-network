type Station = {
  nodes: string[];
  lines: string[];
}
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

  // bfs for undirected unweighted joined graph
  // bfs created an infinite loop. need to recheck algo - 15/4/23
  bfs(src: string, dest: string) {
    // setup
    var visited : {[key:string]: number} = {};
    for(let node of Object.keys(this.adjList)) {
      visited[node] = 0;
    }
    //start from dest
    var traversals = [] as string[][];
    this.bfs_findPaths(src, dest, traversals)
    return traversals;
  }

  bfs_findPaths(src:string, dest:string, ans:string[][]) {
    let q = [];
    let path = [];
    let passedLine = []; 
    path.push(dest);
    q.push(path.slice());
    var tries=0
    // console.log('lets find ', src, dest);
    while(q.length && tries < 200) {
      // console.log([...q]);
      path = q[0] !== undefined ? q[0] : [];
      q.shift();
      let last = path[path.length-1];
      if(last === src) {
        // console.log('reach???')
        ans.push(path.slice());
      } else {
        for(let i=0; i<this.adjList[last].nodes.length; i++) {
          if(!path.includes(this.adjList[last].nodes[i])) {
            let newPath = path.slice();
            newPath.push(this.adjList[last].nodes[i]);
            q.push(newPath);
          }
        }
      }
      tries++;
    }

  }

  /* Log: 15/4/23
  // step 1: simple dfs
  // dfs is okay. so far returns all possible paths. 
  // but the result size is too big and non-sensical (looping lrt lines)
  // step 2: check line change
  // 1. avoid using one line after that line has been travelled
  // - result for to and fro are different (eg bishan to outram - 25 paths / 155 paths)
  
  */
  dfs(src: string, dest: string) {
    // setup
    var visited : {[key:string]: number} = {};
    for(let node of Object.keys(this.adjList)) {
      visited[node] = 0;
    }

    var traversal:string[][] = [];
    let path = [];
    path.push(src);
    this.dfs_util(src, dest, visited, path, [], traversal);
    
    return traversal;
  }

  dfs_util(src: string, dest: string, visited: {[key:string]: number}, path: string[], lines: string[], ans: string[][]) {
    if(src == dest) {
      if(!ans.includes(path)) { // safeguard but theorectically doesn't affect as the visited prevents the same thing.
        ans.push(path.slice());
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
              if(linesCopy[linesCopy.length-1] != commutedLine[0]) break;
            } else {
              linesCopy.push(commutedLine[0]);
            }
          } else {
            // two lines only
            if(linesCopy.includes(commutedLine[0])) {
              if(linesCopy[linesCopy.length-1] != commutedLine[0]) break;
            } else if(linesCopy.includes(commutedLine[1])) {
              if(linesCopy[linesCopy.length-1] != commutedLine[1]) break;
            } else {
              linesCopy.push(commutedLine[0]);
            }
          }
        }
        path.push(neighbor);
        this.dfs_util(neighbor, dest, visited, path, linesCopy, ans);
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

}


export default Graph;