<template>
  <div></div>
</template>

<script>
export default {
  name: "Tree_item",
    data() {
    return {
      isOpen: false,
    };
  },
  components: {},
  computed: {
    isFolder: function () {
      return this.item.children && this.item.children.length;
    },
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