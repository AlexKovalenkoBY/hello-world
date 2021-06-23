<template>
  <!-- item template -->

  <div>
    <h2>Tree Example</h2>
    <tree-item
      class="item"
      :item="treeData"
      @make-folder="makeFolder"
      @add-item="addItem"
    >
    </tree-item>

    <li>
      <div :class="{ bold: isFolder }" @click="toggle" @dblclick="makeFolder">
        {{ item.name }}
        <span v-if="isFolder">[{{ isOpen ? "-" : "+" }}]</span>
      </div>
      <ul v-show="isOpen" v-if="isFolder">
        <tree-item
          class="item"
          v-for="(child, index) in item.dataSource"
          :key="index"
          :item="child"
          @make-folder="$emit('make-folder', $event)"
          @add-item="$emit('add-item', $event)"
        ></tree-item>
        <li class="add" @click="$emit('add-item', item)">+</li>
      </ul>
    </li>

    <p>(You can double click on an item to turn it into a folder.)</p>

    <ul id="demo">
      <tree-item
        class="item"
        :item="dataSource"
        @make-folder="makeFolder"
        @add-item="addItem"
      ></tree-item>
    </ul>
  </div>
</template>


<script>
import TreeItem from "@/components/TreeItem.vue";
export default {
  name: "MyTree",
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
  computed: {
    isFolder: function () {
      return this.dataSource.children && this.dataSource.children.length;
    },
  },
  components: { TreeItem },
};
</script>

<style >
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