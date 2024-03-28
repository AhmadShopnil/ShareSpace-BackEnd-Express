import express from "express";
import app from "./app";
import { Server } from "http";

// const app = express();

const port = 3000;

async function main() {
  const server: Server = app.listen(port, () => {
    console.log(`Flat share server is Running on Port ${port}`);
  });
}

main();
