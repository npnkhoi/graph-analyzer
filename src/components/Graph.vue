// Source: https://github.com/emiliorizzo/vue-d3-network
<template>
  <div class="graph">
    <d3-network ref='net' :net-nodes="nodes" :net-links="links" :options="options" />
  </div>
</template>
 
<script>
import D3Network from 'vue-d3-network'
 
export default {
  components: {D3Network},
  props: ['graph'],
  created: function () {
    console.log('graph in Graph:', this.graph);
  },
  data () {
    return {
      nodeSize: 20,
      canvas: false,
      nodes: [],
      links: []
    }
  },
  computed:{
    // nodes: function () {
    //   console.log('recal nodes');
    //   return this.graph.nodeList.map((node) => ({id: node + 1}))
    // },
    options() {
      return {
        force: 3000,
        size: { w: 200, h: 200},
        nodeSize: this.nodeSize,
        nodeLabels: true,
        linkLabels: true,
        canvas: this.canvas,
      }
    }
  },
  watch: {
    graph: function(to) {
      this.nodes = to.nodeList.map((node) => ({id: node + 1, name: node + 1, _color: '#F13C20'}))
      this.links = to.edges.map((edge) => ({sid: edge.start + 1, tid: edge.end + 1, name: edge.weight, _color: '#D79922'}))
    }
  }
}
</script>
 
<style>
</style>