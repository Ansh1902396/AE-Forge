/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xO5AOI3
 */
import { Button } from "@/components/ui/button";

import Features from "../components/Features";

interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Component() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 items-center">
                    <div className="flex flex-col justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                                Unleash Aeternity&apos;s Contract Magic!
                            </h1>
                            <p className="max-w-[600px] text-zinc-200 md:text-xl dark:text-zinc-100 mx-auto">
                                Forge Aeternity&apos;s magic in smart contracts
                                – innovate, deploy seamlessly into the
                                blockchain landscape.
                            </p>
                        </div>
                        <div className="w-full max-w-sm space-y-2 mx-auto flex flex-row space-x-3 ">
                            <form className="bg-black rounded-xl shadow-lg h-fit flex flex-row px-1 items-center w-full border border-white mt-2">
                                <input
                                    type="text"
                                    name="prompt"
                                    placeholder="cat"
                                    className="bg-transparent text-white placeholder:text-gray-400 ring-0 outline-none resize-none py-2.5 px-2 font-mono text-sm h-10 w-full transition-all duration-300"
                                />
                                {/* <input
                                    type="text"
                                    name="prompt"
                                    placeholder="Enter a value"
                                    title="Input field"
                                    className="bg-transparent text-white placeholder:text-gray-400 ring-0 outline-none resize-none py-2.5 px-2 font-mono text-sm h-10 w-full transition-all duration-300"
                                /> */}
                            </form>

                            <Button
                                className="bg-white text-black rounded-md"
                                type="submit">
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
