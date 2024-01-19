"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import useFeature from "@/utils/hooks/useFeature";
import useGenCode from "@/utils/hooks/useGenCode";
import useSummary from "@/utils/hooks/useSummary";
import sophia from "@/utils/sophia";
import { Code2, Copy, Rocket, Wand2Icon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import useFetch from "use-http";
import { useCopyToClipboard } from "usehooks-ts";

const Container = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn(
                "flex items-center justify-center [&>div]:w-full rounded-xl",
                className
            )}
            {...props}
        />
    );
};

const eg_code: String = `// define compatible compiler versions
@compiler >= 6

contract SimpleToken =

// define state variables
record state =
    { total_supply : int
    , name : string
    , balances : map(address, int) }

// initialize the contract and its state
entrypoint init(initial_balance : int, name : string) =
    { name         = name,
        total_supply = initial_balance,
        balances     = {[Call.caller] = initial_balance} }

// getter function
entrypoint name() : string =
    state.name

// getter function
entrypoint balance(account : address) : int =
    state.balances[account = 0]

// state-changing transfer function
stateful entrypoint transfer(recipient : address, value : int) =
    require(value >= 0, "NON_NEGATIVE_VALUE_REQUIRED")
    require(balance(Call.caller) >= value, "Not enough funds")

    put(state{ balances[Call.caller] = state.balances[Call.caller] - value })
    put(state{ balances[recipient] = state.balances[recipient = 0] + value })
`;
languages.sophia = sophia;
export default function Component() {
    const { toast } = useToast();
    const [_, copy] = useCopyToClipboard();
    const { get, response, loading, error } = useFetch(`/generate/api`);

    const searchParams = useSearchParams();
    const ideaKey = searchParams.get("idea") || "";

    const startingMessage =
        "You have to start with an initial idea to start writing a smart contract.";
    const [data, setData] = useState<{
        featurePrompt: String;
        code: String;
        summary: String;
    }>({
        featurePrompt: "",
        code: startingMessage,
        summary: "",
    });

    const [featureData, setFeatureData] = useState<{
        changes: String;
        originalCode: String;
    }>({
        changes: "",
        originalCode: "",
    });
    const {
        code: codeHook,
        fLoading,
        fError,
    } = useFeature(featureData.changes, featureData.originalCode);

    const [idea, setIdea] = useState<String>("");
    const { code, gLoading, gError } = useGenCode(idea);

    const [summCode, setSummCode] = useState<String>("");
    const { summary, sLoading, sError } = useSummary(summCode);

    useEffect(() => {
        // setIdea(ideaKey);
    }, []);

    useEffect(() => {
        if (codeHook !== "") {
            setData({ ...data, code: codeHook });
        }

        if (code !== "") {
            setData({ ...data, code: code });
        }

        if (summary !== "") {
            setData({ ...data, summary: summary });
        }
    }, [codeHook, code, summary]);

    useEffect(() => {
        if (fError || error || gError || sError) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: `${fError?.message}`,
            });
        }
    }, [fError, error, gError]);

    useEffect(() => {
        if (gLoading || fLoading || sLoading) {
            toast({
                variant: "default",
                title: "Generating...",
            });
        }
    }, [gLoading, fLoading, sLoading]);

    return (
        <section className="overflow-hidden rounded-xl border bg-background shadow-md md:shadow-xl m-6 mt-24">
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
                            <CardContent className="max-h-32 overflow-y-scroll mb-6 scrollbar-hide">
                                {ideaKey}
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
                                    value={data.featurePrompt as string}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLTextAreaElement>
                                    ) => {
                                        setData({
                                            ...data,
                                            featurePrompt: e.target.value,
                                        });
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Container>
                    <Container>
                        <Button
                            className="w-full rounded-xl gap-4 font-bold text-base"
                            onClick={async () => {
                                try {
                                    setFeatureData({
                                        ...featureData,
                                        changes: data.featurePrompt,
                                        originalCode: data.code,
                                    });
                                } catch (err) {
                                    console.log(error);
                                    toast({
                                        variant: "destructive",
                                        title: "Uh oh! Something went wrong.",
                                        description:
                                            "There was a problem with your request.",
                                    });
                                }
                            }}>
                            <Wand2Icon />
                            Abra-Kadabra
                        </Button>
                    </Container>
                </div>
                <div className="col-span-2 grid items-start gap-6 lg:col-span-2">
                    <Container>
                        <Card className="shadow">
                            <CardContent className="my-6">
                                <ScrollArea className="h-[34rem] max-w-[42vw]">
                                    <Editor
                                        // tailwind class to suppress border on focus of textarea
                                        className="min-h-[300px] flex-1 p-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:min-h-[34rem]"
                                        value={data.code as string}
                                        onValueChange={(code) => {
                                            setData({
                                                ...data,
                                                code: code.toString(),
                                            });
                                        }}
                                        highlight={(code) =>
                                            highlight(
                                                code,
                                                languages.sophia,
                                                "sophia"
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
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </Container>
                    <Container className="row-span-1 h-fit">
                        <Button
                            className="w-full rounded-xl gap-4 font-bold text-base"
                            onClick={() => {
                                copy(data.code);
                                toast({
                                    variant: "default",
                                    title: "Copied Success",
                                });
                            }}>
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
                            <CardContent className="max-h-36 overflow-y-scroll scrollbar-hide font-medium">
                                <p>1. Go to Aeternity Studio</p>
                                <p>
                                    2. Compile Contract: Use the Studio&lsquo;s
                                    compiler to generate bytecode.
                                </p>
                                <p>
                                    3. Deploy Contract: Navigate to the
                                    deployment section, provide details, and
                                    click
                                </p>
                                &quot;Deploy.&quot;
                            </CardContent>
                            <CardFooter className="mt-4">
                                <Link
                                    className="w-full"
                                    href="https://studio.aepps.com/"
                                    target="_blank"
                                    rel="noopener noreferrer">
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
                                <CardTitle className="text-2xl flex flex-row">
                                    <h1>Contract Summary</h1>
                                    <Button
                                        className="mx-3 rounded-xl gap-4 font-bold text-base"
                                        size="icon"
                                        onClick={async () => {
                                            try {
                                                if (
                                                    data.code !==
                                                    startingMessage
                                                ) {
                                                    setSummCode(data.code);
                                                } else {
                                                    throw new Error(
                                                        "First you need a smart contract to summarize."
                                                    );
                                                }
                                            } catch (err: Error) {
                                                console.log(error);
                                                toast({
                                                    variant: "destructive",
                                                    title: "Uh oh! Something went wrong.",
                                                    description:
                                                        "There was a problem with your request.\n" +
                                                        err.message,
                                                });
                                            }
                                        }}>
                                        <Wand2Icon size="19" />
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            {/* Add your content here */}
                            <CardContent>
                                <CardContent className="max-h-32 overflow-y-scroll mb-6 scrollbar-hide">
                                    {data.summary}
                                </CardContent>
                            </CardContent>
                        </Card>
                    </Container>
                    <Container className="row-span-1 h-fit">
                        <Button
                            className="w-full rounded-xl gap-4 font-bold text-base"
                            onClick={async () => {
                                try {
                                    const response = await get(
                                        `/generate/api?code=${data.code}`
                                    );
                                    toast({
                                        variant: "default",
                                        title: "Contract Deployed Successfully",
                                        description: `${response.json()}`,
                                    });
                                    if (!response.ok) {
                                        toast({
                                            variant: "destructive",
                                            title: "Uh oh! Something went wrong.",
                                            description: `${error?.message}`,
                                        });
                                    }

                                    console.log(response);
                                } catch (err) {
                                    console.log(error);
                                    toast({
                                        variant: "destructive",
                                        title: "Uh oh! Something went wrong.",
                                        description:
                                            "There was a problem with your request.",
                                    });
                                }
                            }}>
                            {/* {`${loading?<Rocket/>:<Rocket/>}`} */}
                            <Rocket />
                            {`${loading ? "Deploying..." : "1-Click Deploy"}`}
                        </Button>
                    </Container>
                </div>
            </div>
        </section>
    );
}
