<template>
  <div>
    <p>App2 Example</p>
    {{apidata}}

    <Tree3 />
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

  data:   function () {
      
    return {
      apidata : {},
      treeData: {
        name: "My TreeExample",
        children: [
          { name: "hello" },
          { name: "wat" },
          {
            name: "child folder",
            children: [
              {
                name: "child folder",
                children: [{ name: "hello" }, { name: "wat" }],
              },
              { name: "hello" },
              { name: "wat" },
              {
                name: "child folder",
                children: [{ name: "hello" }, { name: "wat" }],
              },
            ],
          },
        ],
      },
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
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.apidata = response));
  }

}
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
