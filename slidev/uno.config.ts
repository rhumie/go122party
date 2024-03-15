import { defineConfig } from "unocss";

export default defineConfig({
  shortcuts: {
    "bg-main": "bg-[#EEE] text-[#333]",
    "text-2xs": "text-[0.5rem]",
  },
  rules: [["app-content-container", { height: "calc(100% - 1rem - 2.5rem)" }]],
});
