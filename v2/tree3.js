const fetch = require('node-fetch');
(async () => {
  try {
    var treeData = await fetch('http://8-aris-bs:8888/api/BP_PP_TREE', {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Encoding": "gzip, identity, deflate, gzip",
        "Accept-Encoding": "gzip"
      }
    })
    //    const allbp = await treeData.json()
    let t = 0;
    let checked = true;
    // var biasDateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd");
  } catch (error) {
    console.log(error);
  } finally {
    console.log("finally........")
  }

  app.component("tree-item", {
    template: '#item-template',
    props: {
      item: Object
    },
    data: function () {
      return {
        isOpen: false
      };
    },
    computed: {
      isFolder: function () {
        return this.item.children && this.item.children.length;
      }
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
      }
    }
  })

  app.mount('#demo')
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
})();
// demo data
// var treeData = {
//     name: "My Tree",
//     children: [
//       { name: "hello" },
//       { name: "wat" },
//       {
//         name: "child folder",
//         children: [
//           {
//             name: "child folder",
//             children: [{ name: "hello" }, { name: "wat" }]
//           },
//           { name: "hello" },
//           { name: "wat" },
//           {
//             name: "child folder",
//             children: [{ name: "hello" }, { name: "wat" }]
//           }
//         ]
//       }
//     ]
//   };

