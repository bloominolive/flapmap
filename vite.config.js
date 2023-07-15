import { resolve } from "path";
module.exports = {
    build: {
      outDir: "dist",
      base: "/flapmap/",
      rollupOptions: {
        input: {
          main: resolve(__dirname, "src/index.html"),
          birdsList: resolve(__dirname, "src/birdsList.html"),
          birdsJournal: resolve(__dirname, "src/birdsJournal.html"),
    },
  }
},
};
  
 