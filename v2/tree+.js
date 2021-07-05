// demo data
var treeData = {
    name: "My Tree",
    children: [
      { name: "hello" },
      { name: "wat" },
      {
        name: "child folder щио",
        children: [
          {
            name: "child folder!",
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