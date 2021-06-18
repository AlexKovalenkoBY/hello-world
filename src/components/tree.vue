<template>
  <!-- item template -->
    <li>
      <div
           :class="{bold: isFolder}"
           @click="toggle"
           @dblclick="makeFolder">
        {{ item.name }}
        <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
      </div>
      <ul v-show="isOpen" v-if="isFolder">
        <tree-item
           class="item"
           v-for="(child, index) in item.children"
           :key="index"
           :item="child"
           @make-folder="$emit('make-folder', $event)"
           @add-item="$emit('add-item', $event)"
           ></tree-item>
        <li class="add" @click="$emit('add-item', item)">+</li>
      </ul>
    </li>


  <p>(You can double click on an item to turn it into a folder.)</p>

  <!-- the demo root element -->
  <ul id="demo">
    <tree-item
      class="item"
      :item="treeData"
      @make-folder="makeFolder"
      @add-item="addItem"
    ></tree-item>
  </ul>
</template>

<script>
export default {


// demo data
var data = {
  name: "My Tree",
  children: [
    { name: "hello" },
    { name: "wat" },
    {
      name: "child folder",
      children: [
        {
          name: "child folder",
          children: [{ name: "hello" }, { name: "wat" }]
        },
        { name: "hello" },
        { name: "wat" },
        {
          name: "child folder",
          children: [{ name: "hello" }, { name: "wat" }]
        }
      ]
    }
  ]
};

const app = Vue.createApp({
  data: function() {
    return {
      treeData: treeData
    }
  },
  methods: {
    makeFolder: function(item) {
      item.children = [];
      this.addItem(item);
    },
    addItem: function(item) {
      item.children.push({
        name: "new stuff"
      });
    }
  }
})

app.component("tree-item", {
  template: '#item-template',
  props: {
    item: Object
  },
  data: function() {
    return {
      isOpen: false
    };
  },
  computed: {
    isFolder: function() {
      return this.item.children && this.item.children.length;
    }
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    makeFolder: function() {
      if (!this.isFolder) {
        this.$emit("make-folder", this.item);
        this.isOpen = true;
      }
    }
  }
})

app.mount('#demo')
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