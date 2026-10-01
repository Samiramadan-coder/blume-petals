"use client";

// (main)/error.tsx can't catch errors thrown by (main)/layout.tsx itself
// (AppHeader / AppFooter fetch data there). Without a boundary at this level
// those errors reach the root and replace the whole document with Next's
// fatal "This page couldn't load" screen.
export { default } from "./(main)/error";
