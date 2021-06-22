<template>
  <h1>TreeItem</h1>
</template>

<script>
export default {
  name: "TreeItem",

  props: {
    item: Object,
  },
  data: function () {
    return {
      isOpen: false,


    };
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    makeFolder: function () {
      if (!this.isFolder) {
        this.$emit("make-folder", this.item);
        this.isOpen = true;
      }
    },
  },
};
</script>

<style>
</style>