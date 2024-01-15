import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { AeSdk, CompilerHttp, Node, MemoryAccount } from "@aeternity/aepp-sdk";

const CONTRACT_SOURCE_CODE = `
contract Multiplier =
  record state = { factor: int }
  entrypoint init(f : int) : state = { factor = f }
  stateful entrypoint setFactor(f : int): int =
    put(state{ factor = f })
    f * 10
  entrypoint multiplyBy(x : int) = x * state.factor
`;
const ACCOUNT_SECRET_KEY =
    "9ebd7beda0c79af72a42ece3821a56eff16359b6df376cf049aee995565f022f840c974b97164776454ba119d84edc4d6058a8dec92b6edc578ab2d30b4c4200";
const NODE_URL = "https://testnet.aeternity.io";
const COMPILER_URL = "https://v7.compiler.aepps.com";

const account = new MemoryAccount(ACCOUNT_SECRET_KEY);
const node = new Node(NODE_URL);
const aeSdk = new AeSdk({
    nodes: [{ name: "testnet", instance: node }],
    accounts: [account],
    onCompiler: new CompilerHttp(COMPILER_URL),
});

console.log(CONTRACT_SOURCE_CODE);

const FormSchema = z.object({
    contract: z.string().min(10, "atleast write the code for the contract"),
});

export function Editor() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
        const sourceCode = JSON.stringify(data, null, 2);

        const contract = await aeSdk.initializeContract({
            sourceCode: CONTRACT_SOURCE_CODE,
        });

        const bytecode = await contract.$compile();
        console.log(`Obtained bytecode ${bytecode}`);

        //@ts-ignore
        const deployInfo = await contract.$deploy([1]);
        console.log(`Contract deployed at ${deployInfo.address}`);
    }

    return (
        <div className="flex flex-col space-y-4">
            <h1 className="text-2xl font-bold mb-4 flex items-center">
                Generated JSX
            </h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="contract"
                        render={({ field }) => (
                            <FormItem>
                                <Card className="flex-1 overflow-autorounded-md">
                                    <FormControl>
                                        <Textarea
                                            className="font-mono text-sm h-[90vh] w-full bg-black text-white border-none resize-none"
                                            id="jsx-output"
                                            placeholder="Generated JSX will appear here..."
                                            {...field}
                                        />
                                    </FormControl>
                                </Card>
                            </FormItem>
                        )}
                    />
                    <Button
                        className="w-full bg-white text-black hover:bg-black hover:text-white transition-colors duration-200"
                        type="submit">
                        Compile and Deploy the contract
                    </Button>
                </form>
            </Form>
        </div>
    );
}
