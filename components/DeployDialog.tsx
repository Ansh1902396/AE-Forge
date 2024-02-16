import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Loader2, Rocket } from "lucide-react";
import { useState } from "react";
import { useFetch } from "use-http";
import { toast } from "./ui/use-toast";
import { useCopyToClipboard } from "usehooks-ts";

const parse = (code: string) => {
    const pattern = /init\(([^)]+)\)/;

    const match = code.match(pattern);
    const args: { [index: string]: any } = {};

    if (match) {
        const argumentsAndTypes = match[1].split(", ");
        for (const argType of argumentsAndTypes) {
            console.log(
                argType.split(":").map((s) => {
                    return s.trim();
                })
            );
            const [name, type] = argType.split(":").map((s) => {
                return s.trim();
            });
            args[name] = type;
        }
    }

    return args;
};

export default function DialogDemo({
    code,
    contractErr,
}: {
    code: String;
    contractErr: String;
}) {
    const { get, response, loading, error } = useFetch(`/deploy/api`);
    const [args, setArgs] = useState<{}>({});
    const [data, setData] = useState<{}>({});
    const [address, setAddress] = useState<String>("");
    const [_, copy] = useCopyToClipboard();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="w-full rounded-xl gap-4 font-bold text-base"
                    onClick={async () => {
                        try {
                            setArgs(parse(code as string));
                        } catch (err) {
                            console.log(err);
                        }
                    }}
                    disabled={contractErr !== ""}>
                    {/* {`${loading?<Rocket/>:<Rocket/>}`} */}
                    <Rocket />
                    1-Click Deploy
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        Deploy Variables
                        {}
                    </DialogTitle>
                    <DialogDescription>
                        Deploy your smart contract with the following variables.
                        {}
                    </DialogDescription>
                </DialogHeader>
                {loading ? (
                    <>Loading...</>
                ) : response.ok ? (
                    <div className="flex flex-row items-center gap-4">
                        <div className="sm:max-w-[400px] truncate font-mono">
                            Address: {address}
                        </div>
                        <Button
                            className="rounded-xl font-bold text-base"
                            size={"icon"}
                            onClick={() => {
                                copy(address as string);
                                toast({
                                    variant: "default",
                                    title: "Copied Success",
                                });
                            }}>
                            <Copy size={18} />
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-4 py-4">
                        {Object.entries(args).map(([key, value]) => {
                            return (
                                <div
                                    className="grid grid-cols-4 items-center gap-4"
                                    key={key}>
                                    <Label htmlFor={key} className="text-right">
                                        {key}
                                    </Label>
                                    <Input
                                        id={key}
                                        placeholder={value as string}
                                        className="col-span-3"
                                        onChange={(e) => {
                                            if (value === "int") {
                                                setData({
                                                    ...data,
                                                    [key]: Number(
                                                        e.target.value
                                                    ),
                                                });
                                            } else if (value === "bool") {
                                                setData({
                                                    ...data,
                                                    [key]: Boolean(
                                                        e.target.value
                                                    ),
                                                });
                                            } else {
                                                setData({
                                                    ...data,
                                                    [key]: e.target.value,
                                                });
                                            }
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
                <DialogFooter>
                    {!address && (
                        <Button
                            type="submit"
                            onClick={async () => {
                                try {
                                    const response = await get(
                                        `?code=${encodeURIComponent(
                                            code as string
                                        )}&args=${encodeURIComponent(
                                            JSON.stringify(Object.values(data))
                                        )}`
                                    );
                                    if (error === undefined) {
                                        setAddress(response.address);
                                    } else {
                                        throw error;
                                    }
                                    console.log(address);
                                } catch (err) {
                                    toast({
                                        variant: "destructive",
                                        title: "Uh oh! Something went wrong.",
                                        description:
                                            "There was a problem with your request.\n" +
                                            (err as Error).message,
                                    });
                                }
                            }}>
                            {loading ? (
                                <>
                                    <Loader2 className="gap-2 animate-spin" />
                                    Loading
                                </>
                            ) : (
                                "Deploy"
                            )}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
