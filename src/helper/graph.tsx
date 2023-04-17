
class Graph implements Graph {
  // structure & constructor
  numberOfNodes: number;
  adjList: {[key:string] : string[]};

  constructor() {
    this.numberOfNodes = 0;
    this.adjList = {};
  }

  add(id:string, neighbors:string[]) {
    if(!(id in this.adjList)) {
      this.adjList[id] = [];
      this.numberOfNodes++;
    }
    for(let i=0; i<neighbors.length; i++) {
      if(!this.adjList[id].includes(neighbors[i])) {
        this.adjList[id].push(neighbors[i]);
      }
      // direct back just in case
      if(!(neighbors[i] in this.adjList)) {
        this.adjList[neighbors[i]] = [];
        this.numberOfNodes++;
      }
      if(!this.adjList[neighbors[i]].includes(id)) {
        this.adjList[neighbors[i]].push(id);
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
    console.log('lets find ', src, dest);
    while(q.length && tries < 200) {
      // console.log([...q]);
      path = q[0] !== undefined ? q[0] : [];
      q.shift();
      let last = path[path.length-1];
      if(last === src) {
        // console.log('reach???')
        ans.push(path.slice());
      } else {
        for(let i=0; i<this.adjList[last].length; i++) {
          if(!path.includes(this.adjList[last][i])) {
            let newPath = path.slice();
            newPath.push(this.adjList[last][i]);
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
  // step 2: limit the line change
  // 1. the path cannot return to a previous line unless X stations have passed.
  // to avoid Botanic Gardens -> Stevens -> Caldecott
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
    this.dfs_util(src, dest, visited, path, traversal);

    return traversal;
  }

  dfs_util(src: string, dest: string, visited: {[key:string]: number}, path: string[], ans: string[][]) {
    if(src == dest) {
      if(!ans.includes(path)) { // safeguard but theorectically doesn't affect as the visited prevents the same thing.
        ans.push(path.slice());
      }
      return;
    }
    visited[src] = 1;

    for(let i=0; i<this.adjList[src].length; i++) {
      let neighbor = this.adjList[src][i];
      if(visited[neighbor] == 0) {
        path.push(neighbor);
        this.dfs_util(neighbor, dest, visited, path, ans);
        path.splice(path.indexOf(neighbor), 1);
      }
    }
    visited[src] = 0;
  }


  
}


export default Graph;