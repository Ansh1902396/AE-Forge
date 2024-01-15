"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Code2, Copy, Rocket, Wand2Icon } from "lucide-react";
import { redirect } from "next/dist/server/api-utils";
import Prism, { highlight } from "prismjs";
import { SetStateAction, useEffect, useState } from "react";
import Editor from "react-simple-code-editor";

import { useCopyToClipboard } from 'usehooks-ts'
import { string } from "zod";
import Link from 'next/link'


const Container = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn(
                "flex items-center justify-center [&>div]:w-full",
                className
            )}
            {...props}
        />
    );
};

export default function Component() {
    const [code, setCode] = useState<string>(
        `contract Multiplier =
  record state = { factor: int }
  entrypoint init(f : int) : state = { factor = f }
  stateful entrypoint setFactor(f : int): int =
    put(state{ factor = f })
    f * 10
  entrypoint multiplyBy(x : int) = x * state.factor
`
    );

  const [value, copy] = useCopyToClipboard()

    return (
        <section className="overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl m-8 mt-24">
            <div className="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-4 xl:grid-cols-4">
                <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
                    <Container>
                        <Card className="shadow">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl">
                                    <h1>Initial Idea</h1>
                                </CardTitle>
                            </CardHeader>
                            {/* Add your content here */}
                            <CardContent className="max-h-32 overflow-y-scroll mb-6">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Sed euismod, nunc a tincidunt
                                aliquam, lacus nisl fringilla nunc, ac aliquet
                                nunc nunc id nunc. Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit. Sed euismod, nunc a
                                tincidunt aliquam, lacus nisl fringilla nunc, ac
                                aliquet nunc nunc id nunc. Lorem ipsum dolor sit
                                amet, consectetur adipiscing elit. Sed euismod,
                                nunc ang elit. Sed euismod, nunc a tincidunt
                                aliquam, lacus nisl fringilla nunc, ac aliquet
                                nunc nunc id nunc. Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit. Sed euismod, nunc
                                ang elit. Sed euismod, nunc a tincidunt aliquam,
                                lacus nisl fringilla nunc, ac aliquet nunc nunc
                                id nunc. Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Sed euismod, nunc ang elit. Sed
                                euismod, nunc a tincidunt aliquam, lacus nisl
                                fringilla nunc, ac aliquet nunc nunc id nunc.
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Sed euismod, nunc ang elit. Sed
                                euismod, nunc a tincidunt aliquam, lacus nisl
                                fringilla nunc, ac aliquet nunc nunc id nunc.
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Sed euismod, nunc a
                            </CardContent>
                        </Card>
                    </Container>
                    <Container>
                        <Card className="shadow">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl">
                                    <h1>Add or Fix Something</h1>
                                </CardTitle>
                            </CardHeader>
                            {/* Add your content here */}
                            <CardContent>
                                <Textarea
                                    className="mt-1 w-full h-44 max-h-44 rounded-xl resize-none"
                                    placeholder="Type your prompt to do the magic"
                                />
                            </CardContent>
                        </Card>
                    </Container>
                    <Container>
                        <Button className="w-full rounded-xl gap-4 font-bold text-base">
                            <Wand2Icon />
                            Abra-Kadabra
                        </Button>
                    </Container>
                </div>
                <div className="col-span-2 grid items-start gap-6 lg:col-span-2">
                    <Container>
                        <Card className="shadow">
                            <CardContent className="my-6 max-h-[34rem] max-w-[44vw] overflow-y-auto">
                                <Editor
                                    // tailwind class to suppress border on focus of textarea
                                    className="min-h-[300px] flex-1 p-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:min-h-[34rem]"
                                    value={code}
                                    onValueChange={(
                                        code: SetStateAction<string>
                                    ) => {
                                        setCode(code);
                                    }}
                                    highlight={(code) =>
                                        highlight(
                                            code,
                                            Prism.languages.javascript,
                                            "javascript"
                                        )
                                    }
                                    padding={10}
                                    style={{
                                        fontFamily:
                                            '"Fira code", "Fira Mono", monospace',
                                        fontSize: 14,
                                    }}
                                    autoFocus
                                />
                            </CardContent>
                        </Card>
                    </Container>
                    <Container className="row-span-1 h-fit">
                        <Button className="w-full rounded-xl gap-4 font-bold text-base" onClick={() => copy(code)}>
                            <Copy />
                            Copy Smart Contract
                        </Button>
                    </Container>
                </div>
                <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
                    <Container>
                        <Card className="shadow">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl">
                                    <h1>Steps to Deploy Manually</h1>
                                </CardTitle>
                            </CardHeader>
                            {/* Add your content here */}
                            <CardContent className="max-h-36 overflow-y-scroll">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Sed euismod, nunc a tincidunt
                                aliquam, lacus nisl fringilla nunc, ac aliquet
                                nunc nunc id nunc. Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit. Sed euismod, nunc a
                                tincidunt aliquam, lacus nisl fringilla nunc, ac
                                aliquet nunc nunc id nunc. Lorem ipsum dolor sit
                                amet, consectetur adipiscing elit. Sed euismod,
                                nunc ang elit. Sed euismod, nunc a tincidunt
                                aliquam, lacus nisl fringilla nunc, ac aliquet
                                nunc nunc id nunc. Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit. Sed euismod, nunc
                                ang elit. Sed euismod, nunc a tincidunt aliquam,
                                lacus nisl fringilla nunc, ac aliquet nunc nunc
                                id nunc. Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Sed euismod, nunc ang elit. Sed
                                euismod, nunc a tincidunt aliquam, lacus nisl
                                fringilla nunc, ac aliquet nunc nunc id nunc.
                            </CardContent>
                            <CardFooter className="mt-4">
                                <Link  href="https://studio.aepps.com/">
                                <Button className="w-full rounded-xl gap-4 font-bold text-base">
                                    <Code2 />
                                    Open in IDE
                                </Button>
                                </Link>
                              
                            </CardFooter>
                        </Card>
                    </Container>
                    <Container className="row-span-2">
                        <Card className="shadow">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl">
                                    <h1>Contract Summary</h1>
                                </CardTitle>
                            </CardHeader>
                            {/* Add your content here */}
                            <CardContent>
                                <CardContent className="max-h-32 overflow-y-scroll mb-6">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Sed euismod, nunc a
                                    tincidunt aliquam, lacus nisl fringilla
                                    nunc, ac aliquet nunc nunc id nunc. Lorem
                                    ipsum dolor sit amet, consectetur adipiscing
                                    elit. Sed euismod, nunc a tincidunt aliquam,
                                    lacus nisl fringilla nunc, ac aliquet nunc
                                    nunc id nunc. Lorem ipsum dolor sit amet,
                                    consectetur adipiscing elit. Sed euismod,
                                    nunc ang elit. Sed euismod, nunc a tincidunt
                                    aliquam, lacus nisl fringilla nunc, ac
                                    aliquet nunc nunc id nunc. Lorem ipsum dolor
                                    sit amet, consectetur adipiscing elit. Sed
                                    euismod, nunc ang elit. Sed euismod, nunc a
                                    tincidunt aliquam, lacus nisl fringilla
                                    nunc, ac aliquet nunc nunc id nunc. Lorem
                                    ipsum dolor sit amet, consectetur adipiscing
                                    elit. Sed euismod, nunc ang elit. Sed
                                    euismod, nunc a tincidunt aliquam, lacus
                                    nisl fringilla nunc, ac aliquet nunc nunc id
                                    nunc. Lorem ipsum dolor sit amet,
                                    consectetur adipiscing elit. Sed euismod,
                                    nunc ang elit. Sed euismod, nunc a tincidunt
                                    aliquam, lacus nisl fringilla nunc, ac
                                    aliquet nunc nunc id nunc. Lorem ipsum dolor
                                    sit amet, consectetur adipiscing elit. Sed
                                    euismod, nunc a
                                </CardContent>
                            </CardContent>
                        </Card>
                    </Container>
                    <Container className="row-span-1 h-fit">
                        <Button
                            className="w-full rounded-xl gap-4 font-bold text-base"
                            onClick={async () => {
                                const req = await fetch(
                                    `/deploy/api?code=${encodeURIComponent(
                                        code
                                    )}`
                                );

                                const res = await req.json();
                                console.log(res);
                            }}>
                            <Rocket />
                            1-Click Deploy
                        </Button>
                    </Container>
                </div>
            </div>
        </section>
    );
}
