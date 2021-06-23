<template>

  <div><p>App2 Example</p>
    <img alt="Vue logo" src="./assets/logo.png">
  <Tree3/>
  </div>
</template>

<script>
import Tree3 from '@/components/Tree3.vue'
export default {
  name: "App2",
  components: {
    Tree3
    //  HelloWorld
  },

  data: function () {
    return {
      treeData: {
        name: "My Tree",
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
