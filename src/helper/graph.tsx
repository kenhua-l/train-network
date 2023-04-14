
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
  bfs(src: string, dest: string) {
    // setup
    var visited : {[key:string]: number} = {};
    for(let node of Object.keys(this.adjList)) {
      visited[node] = 0;
    }
    var q = [];
    //start from dest
    visited[dest] = 1;
    q.push(dest);

    var traversal = [];
    while(q.length) {
      var s = q.shift();
      traversal.push(s)
      if(s != undefined) {
        this.adjList[s]?.forEach((neighbor) => {
          if(visited[neighbor] == 0) {
            visited[neighbor] = 1;
            q.push(neighbor);
          }
        });
      }
    }
    return traversal;
  }

  dfs(src: string, dest: string) {
    // setup
    var visited : {[key:string]: number} = {};
    for(let node of Object.keys(this.adjList)) {
      visited[node] = 0;
    }
    var traversal:string[] = []
    this.dfs_util(src, dest, visited, traversal);
    return traversal;
  }

  dfs_util(src: string, dest: string, visited: {[key:string]: number}, ans: string[]) {
    visited[dest] = 1;
    ans.push(dest);
    this.adjList[dest]?.forEach((neighbor) => {
      if(visited[neighbor] == 0) {
        this.dfs_util(src, neighbor, visited, ans);
      }
    });
  }
  
}

export default Graph;