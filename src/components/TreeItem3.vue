<template>
  <div></div>
</template>

<script>
export default {
  name: "Tree_Item3",
    data() {
    return {
      elementString: "elementString",
      isOpen: false,
    };
  },
  components: {},
  computed: {
    isFolder: function () {
      return this.itemName.children && this.itemName.children.length;
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
        this.$emit("make-folder", this.itemName);
        this.isOpen = true;
      }
    },
  },
};
</script>

<style>
</style>