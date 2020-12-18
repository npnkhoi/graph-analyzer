
const isValidNode = (node, numNodes) => (0 <= node && node < numNodes)

const addEdge = (graph, id, a, b, weight=null) => {
  if (!isValidNode(a, graph.numNodes) || !isValidNode(b, graph.numNodes)) {
    console.log("Invalid node", a, b, graph.numNodes);
    throw "InputError: Node index out of range. Please check your node id again."
  }
  if (weight) {
    graph.adj[a].push([b, weight])
    graph.adj[b].push([a, weight])
    graph.edges.push({
      start: a,
      end: b,
      weight: weight,
      id: id
    })
  } else {
    graph.adj[a].push(b)
  }
}

export const strToGraph = (input) => {
  const graph = {}
  const num_list = input.split(/ |\n/).map((val) => parseInt(val))
  graph.numNodes = num_list[0]
  graph.nodeList = [...Array(graph.numNodes).keys()]
  graph.numEdges = num_list[1]
  graph.isWeighted = (num_list[2] === 1)
  graph.edges = []
  graph.adj = []
  graph.nodeList.forEach(() => {graph.adj.push([])})
  if (graph.isWeighted) {
    for (let i = 0; i < graph.numEdges; i ++) {
      addEdge(graph, i, num_list[3 * i + 3] - 1, 
        num_list[3 * i + 4] - 1, num_list[3 * i + 5])
    }
  } else {
    for (let i = 0; i < graph.numEdges; i ++) {
      graph.edges.push({
        start: num_list[2 * i + 3],
        end: num_list[2 * i + 4],
      })
    }
  }
  console.log(graph);
  return graph
}

export const mst = (graph, getMax) => {
  const numNodes = graph.numNodes
  const dsu = Array(numNodes).fill(-1);

  const getRoot = (node) => {
    if (dsu[node] < 0) {
      return node
    } else {
      dsu[node] = getRoot(dsu[node]);
      return dsu[node]
    }
  }

  const mergeNode = (nodeA, nodeB) => {
    nodeA = getRoot(nodeA)
    nodeB = getRoot(nodeB)
    if (dsu[nodeA] > dsu[nodeB]) { // subtree of nodeA is smaller than nodeB's
      [nodeA, nodeB] = [nodeB, nodeA]
    }
    if (dsu[nodeB] === dsu[nodeA]) {
      dsu[nodeA] --
    }
    dsu[nodeB] = nodeA
  }

  // -----------------------------------
  
  let compare;
  if (getMax) {
    compare = (e1, e2) => (e2.weight - e1.weight); 
  } else {
    compare = (e1, e2) => (e1.weight - e2.weight);
  }

  graph.edges.sort(compare)
  let answer = 0
  const selectedEdges = []
  graph.edges.forEach(edge => {
    const nodeA = edge.start, nodeB = edge.end
    if (getRoot(nodeA) != getRoot(nodeB)) {
      mergeNode(nodeA, nodeB)
      answer += edge.weight
      selectedEdges.push(edge.id)
    }
  });
  return { answer, selectedEdges }
};

export const getShortestPath = (graph, input) => {
  const num_list = input.split(/ |\n/).map((val) => parseInt(val))
  const source = num_list[0] - 1
  const sink = num_list[1] - 1
  const INF = Math.pow(10, 9)
  const dist = Array(graph.numNodes).fill(INF)
  const fixed = Array(graph.numNodes).fill(false)
  dist[source] = 0
  let round
  for (round = 0; round < graph.numNodes - 1; ++ round) {
    let pivot = -1
    graph.nodeList.forEach((node) => {
      if (fixed[node]) return;
      if (pivot === -1 || dist[node] < dist[pivot]) {
        pivot = node
      }
    })
    if (pivot === -1) break
    fixed[pivot] = true
    console.log('new pivot:', pivot, dist, graph.adj[pivot]);
    // update dist
    graph.adj[pivot].forEach((edge) => {
      const [node, weight] = edge
      dist[node] = Math.min(dist[node], dist[pivot] + weight)
    })
    // find nextPivot
  }
  console.log('shortest path returning');
  console.log('done DJ', source, dist);
  if (dist[sink] === INF) {
    return "[Graph Input Error] Two nodes are not connected"
  } else {
    return dist[sink]
  }
}