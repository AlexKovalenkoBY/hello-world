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
// исходник примера с деревом взят  из 
// https://v3.ru.vuejs.org/ru/examples/grid-component.html
import Vue from 'vue'
const app = Vue.createApp({
  el: '#demo',
  data() {
    return {
      searchQuery: '',
      gridColumns: ['name', 'power'],
      gridData: [
        { name: 'Chuck Norris', power: Infinity },
        { name: 'Bruce Lee', power: 9000 },
        { name: 'Jackie Chan', power: 7000 },
        { name: 'Jet Li', power: 8000 },
          { name: 'Alex Kov-ko', power: 8888 }
      ]
    }
  }
})

// register the grid component
app.component('demo-grid', {
  template: '#grid-template',
  props: {
    heroes: Array,
    columns: Array,
    filterKey: String
  },
  data() {
    const sortOrders = {};
    this.columns.forEach(function(key) {
      sortOrders[key] = 1;
    });
    return {
      sortKey: '',
      sortOrders
    }
  },
  computed: {
    filteredHeroes() {
      const sortKey = this.sortKey
      const filterKey = this.filterKey && this.filterKey.toLowerCase()
      const order = this.sortOrders[sortKey] || 1
      let heroes = this.heroes
      if (filterKey) {
        heroes = heroes.filter(function(row) {
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(filterKey) > -1
            )
          })
        })
      }
      if (sortKey) {
        heroes = heroes.slice().sort(function(a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return heroes
    },
    sortOrders() {
      const columnSortOrders = {}
      
      this.columns.forEach(function(key) {
        columnSortOrders[key] = 1
      })

      return columnSortOrders
    }
  },
  methods: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    sortBy(key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
})

app.mount('#demo')


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