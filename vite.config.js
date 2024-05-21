import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    // base: "/meme/",
    // base: "/https://f489-59-27-0-195.ngrok-free.app/",
    plugins: [react()],
});
