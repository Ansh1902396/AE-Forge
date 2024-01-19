"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Features from "../components/Features";

export default function Component() {
    const [idea, setIdea] = useState<String>("");
    const router = useRouter();

    return (
        <section className="w-full flex flex-col py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
            <div className="px-4 pt-32 h-[60vh] md:px-6">
                <div className="grid gap-6 items-center">
                    <div className="flex flex-col justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                                Unleash Aeternity&apos;s Contract Magic!
                            </h1>
                            <p className="max-w-[600px] text-zinc-200 md:text-xl dark:text-zinc-100 mx-auto">
                                {/* Forge Aeternity&apos;s magic in smart contracts
                                - innovate, deploy seamlessly into the
                                blockchain landscape.
                                <br /> */}
                                We know you don&apos;t know Sophia, well neither
                                do we, but we&apos;ll help you get started.
                            </p>
                        </div>
                        <div className="w-full max-w-sm gap-y-2 mx-auto flex flex-row gap-x-4 text-base">
                            {/* <input
                                type="text"
                                name="prompt"
                                placeholder="Your Amazing Blockchain Idea"
                                className="bg-transparent text-white placeholder:text-gray-400 ring-0 outline-none resize-none py-2.5 px-2 font-mono text-sm h-10 w-full transition-all duration-300"
                            /> */}
                            <Input
                                name="prompt"
                                placeholder="Your Amazing Smart Contract Idea"
                                className="rounded-xl"
                                value={idea as string}
                                onChange={(e) => setIdea(e.target.value)}
                            />
                            {/* <input
                                    type="text"
                                    name="prompt"
                                    placeholder="Enter a value"
                                    title="Input field"
                                    className="bg-transparent text-white placeholder:text-gray-400 ring-0 outline-none resize-none py-2.5 px-2 font-mono text-sm h-10 w-full transition-all duration-300"
                                /> */}
                            <Button
                                className="bg-white text-black py-0 rounded-xl"
                                type="submit"
                                onClick={() => {
                                    router.push(
                                        `/editor?idea=${encodeURI(
                                            idea as string
                                        )}`
                                    );
                                }}>
                                Shoot
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features */}
            <Features />

            {/* <div className="text-center">
                <p>Made with 💖 by Rudransh and Suryansh</p>
            </div> */}
        </section>
    );
}
