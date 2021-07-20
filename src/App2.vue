<template>
  <div>
    <p>App2 Example</p>
    <!-- {{ apidata.data }} -->
          <App2 
            v-for="(child) in apidata.data" 
            v-bind:item="child.itemName"
            :index="subIndex"
            :key="child.id"
            :parentItem="item"
            @deleteSubTask="deleteSubTask"
            />

    <!-- <Tree3 /> -->
  </div>
</template>

<script>
import Tree3 from "@/components/Tree3.vue";
export default {
  name: "App2",
  components: {
    Tree3,
    //  HelloWorld
  },

  data: function () {
    return {
      apidata: [],
 
    };
  },
  methods: {
    makeFolder: function (item) {
      item.children = [];
      this.addItem(item);
    },
    addItem: function (item) {
      item.children.push({
        name: "new stuff",
      });
    },
  },
   mounted() {
      const axios = require("axios")

    axios
      .get('http://127.0.0.1:8888/api/PZK_TREE')
      .then(response => {
        this.apidata = response 
        console.log('данные получены '+ this.apidata.data.length)});

    // fetch("http://127.0.0.1:8888/api/PZK_TREE", {
    //   method: "GET",
    //   headers: { Accept: "application/json" },
    // }).then((response) => (this.apidata = response));
  },
};
</script>

<style>
body {
  font-family: Menlo, Consolas, monospace;
  color: #444;
}
.item {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
</style>
