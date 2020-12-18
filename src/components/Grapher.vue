<template>
<div class="w-full flex flex-col items-center">
  <p class="text-5xl font-semibold">Graph Analyzer</p>
  <p class="text-xl mb-3">Author: Nguyen Phung Nhat Khoi</p>
  <div class='flex flex-row align justify-around w-full p-4'>
    <div class="input-panel flex flex-col items-center">
      <textarea
        class="graph-input p-3 rounded" 
        placeholder="Input your graph here" 
        cols="20" 
        rows="20"
        v-model="input"
      />
      <button 
        class="grapher-btn"
        @click="analyze(input)"
      >
        Analyze
      </button>
    </div>
    <Graph :graph="graph" :highlightedEdges="highlightedEdges"/>
    <div class="graph-profile px-3">
      <div class="grapher-title">Graph info</div>
      <div class="graph-info-content">
        <div>Min. spanning tree: {{ minST.answer }}</div>
        <div>Max. spanning tree: {{ maxST.answer }}</div>
        <div>Eulerian path: </div>
        <div>Hamiltonian walk: </div>
        <div class="flex flex-row items-center">
          <button 
            class="grapher-btn mr-2"
            @click="setHighlightedEdges(minST.selectedEdges)"
          > 
            Show Min. ST
          </button>
          <button 
            class="grapher-btn ml-2"
            @click="setHighlightedEdges(maxST.selectedEdges)"
          > 
            Show Max. ST
          </button>
        </div>
      </div>

      <div class="grapher-title mt-12">Shortest path query</div>
      <br>
      <div class="shortest-path flex flex-col w-full">
        <div class="w-full flex flex-row items-center mb-2">
          <p>Input 2 vertices: </p>
          <textarea 
            rows="1"
            cols="15"
            placeholder="<start> <end>"
            v-model="shortestPathQuery"
            class="p-1 ml-2"
          />
        </div>
        <div>
          Shortest path of [{{shortestPathQuery}}]: {{shortestPath}}
        </div>
        <div class="flex justify-center">
          <button 
            class="grapher-btn"
            @click="findShortestPath()"
          >
            Find shortest path
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {strToGraph, mst, getShortestPath} from '../utils/graph'
import Graph from './Graph'

export default {
  components : {
    Graph
  },
  data () {
    return {
      input: "",
      shortestPathQuery: "",
      minST: {answer: null, selectedEdges: null},
      maxST: {answer: null, selectedEdges: null},
      graph: {},
      shortestPath: null,
      graphNodes: [],
      graphLinks: [],
      highlightedEdges: [],
    }
  },
  methods: {
    analyze(input) {
      try {
        this.graph = strToGraph(input)
      } catch (e) {
        // window.alert(e)
        console.log(e);
        return
      }
      this.minST = mst(this.graph, false)
      this.maxST = mst(this.graph, true)
    },
    findShortestPath() {
      this.shortestPath = getShortestPath(this.graph, this. shortestPathQuery)
    },
    setHighlightedEdges(edges) {
      this.highlightedEdges = edges;
    }
  }
}
</script>

<style>
.grapher-title {
  border-bottom-width: 1px;
  border-top-width: 1px;
  font-size: 24px;
  text-align: center;
  margin-bottom: 4px;
  font-weight: 600;
}

textarea {
  background-color: #c5cbe3;
  color: #4056a1 !important;
  font-weight: 300;
  border-radius: 4px;
}

.grapher-btn {
  margin-top: 10px;
  padding: 4px;
  border: 1px solid black;
  border-radius: 4px;
  width: 70%;
  font-weight: 600;
  color: #4056a1;
  background: #efe2ba;
  text-align: center;
}
.grapher-btn:hover {
  background: #D79922;
  color: #c5cbe3;
}
.graph-profile {
  width: 300px; 
}

.help {
  width: 200px; 
}

</style>