"use client";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9X6rxDqdcw4
 */
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Navbar from "../_components/Navbar";

import { Editor } from "../_components/Editor";
import { TextareaForm } from "../_components/Test";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lexend } from "next/font/google";
import clsx from "clsx";



const lexend = Lexend({ subsets: ["latin"] });





export default function Component() {
  
  return (
    <main className="grid h-screen grid-cols-3 gap-4 p-4 bg-black text-white">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold mb-4 flex items-center">
          Prompt Input
        </h1>
        <Card className="h-[50%]">
          <CardTitle>
            <h2 className="text-lg font-bold mb-2">Enter Your Prompt</h2>
          </CardTitle>
          <CardContent>
            <p>
              This is a JSX generator. Enter your prompt in the text field below
              and press the "Generate JSX" button.
            </p>
          </CardContent>
        </Card>
        {/* <div className="flex-1 overflow-auto border border-white rounded-md">
          <ScrollArea className="h-full w-full p-4">
           
            
          </ScrollArea>
        </div> */}
        <Card className="h-[50%]">
          <Textarea
            className="h-full w-full bg-black text-white border-none resize-none"
            id="prompt-input"
            placeholder="Enter your prompt here..."
          />
        </Card>

        <Button className="w-full bg-white text-black hover:bg-black hover:text-white transition-colors duration-200">
          <PlayIcon className="mr-2" />
          Generate JSX
        </Button>
      </div>
     {/* Editor */}
     {/* <Editor/> */}
     <TextareaForm/>
      <div className="flex flex-col space-y-4">
        <Card className="h-[50%]">
          <CardTitle>
            <h1>Section 1</h1>
          </CardTitle>
        </Card>
        <Card className="h-[50%]">
          <CardTitle>
            <h1>Section 1</h1>
          </CardTitle>
        </Card>
        <Button className="w-full bg-white text-black hover:bg-black hover:text-white transition-colors duration-200">
          Action
        </Button>
      </div>
    </main>
  );
}

function ArrowRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function CodeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function CopyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function LightbulbIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}

function MagnetIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15" />
      <path d="m5 8 4 4" />
      <path d="m12 15 4 4" />
    </svg>
  );
}

function PlayIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
