
const isValidNode = (node, numNodes) => (0 <= node && node < numNodes)

const addEdge = (graph, id, a, b, weight=null) => {
  if (!isValidNode(a, graph.numNodes) || !isValidNode(b, graph.numNodes)) {
    console.log("[Input error] Invalid node index", a, b, graph.numNodes);
    throw "InputError: Node index out of range. Please check your node id again."
  }
  if (weight) {
    graph.adj[a].push([b, weight, id])
    graph.adj[b].push([a, weight, id])
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
  graph.numNodes = 0
  for (let i = 0; i < num_list.length; ++ i) {
    if (i % 3 === 2) continue
    graph.numNodes = Math.max(graph.numNodes, num_list[i])
  }
  graph.nodeList = [...Array(graph.numNodes).keys()]
  graph.numEdges = Math.floor(num_list.length / 3);
  graph.edges = []
  graph.adj = []
  graph.nodeList.forEach(() => {graph.adj.push([])})
  for (let i = 0; i < graph.numEdges; i ++) {
    addEdge(graph, i, num_list[3 * i] - 1, 
      num_list[3 * i + 1] - 1, num_list[3 * i + 2])
  }
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
    // update dist
    graph.adj[pivot].forEach((edge) => {
      const [node, weight] = edge
      dist[node] = Math.min(dist[node], dist[pivot] + weight)
    })
    // find nextPivot
  }
  if (dist[sink] === INF) {
    return {
      answer: "[Graph Input Error] Two nodes are not connected",
      selectedEdges: null,
    }
  }
  let node = sink
  const path = []

  while (node != source) {
    graph.adj[node].forEach((edge) => {
      if (dist[edge[0]] + edge[1] === dist[node]) {
        node = edge[0]
        path.push(edge[2])
      }
    })
  }

  return {
    answer: dist[sink],
    selectedEdges: path,
  }
}