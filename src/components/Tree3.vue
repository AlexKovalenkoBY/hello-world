<template>
  <div>
        <p>
            Tree3 file
        </p>


    <!-- <script type="text/x-template" id="item-template">
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
    </script> -->

    <p>(You can double click on an item to turn it into a folder.)</p>
        <ul>
          <li>item </li>
          <li>item2 </li>
          <li>item3</li>
          <li>item4</li>
        </ul>
    <!-- the demo root element -->
    <!-- <ul id="demo">
      <tree-item
        class="item"
        :item="treeData"
        @make-folder="makeFolder"
        @add-item="addItem"
      ></tree-item>
    </ul> -->
    <TreeItem3 />
  </div>
</template>

<script>
import  TreeItem3 from  '@/components/TreeItem3.vue'
export default {
    name: "Tree3",
    data() {},
    methods: {},
    props :{},
    components: {TreeItem3}

};
</script>

<style>
</style>