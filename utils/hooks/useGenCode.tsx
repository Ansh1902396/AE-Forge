import { initPrompt } from "@/utils/prompts";
import { OpenAI } from "@langchain/openai";
import { useEffect, useState } from "react";

const useRefactor = (idea: String, options = {}) => {
    const [code, setCode] = useState<String>("");
    const [gLoading, setLoading] = useState<Boolean>(false);
    const [gError, setError] = useState<Error | null>(null);

    const model = new OpenAI({
        openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_KEY || "",
        modelName: "gpt-3.5-turbo-16k",
        temperature: 0.7,
        ...options,
    });
    const chain = initPrompt.pipe(model);

    useEffect(() => {
        async function generateCode() {
            setLoading(true);
            setCode("Loading...");
            try {
                console.log("Summarizing...");
                const code = await chain.stream({
                    idea: idea,
                });

                let tmp = "";
                for await (const chunk of code) {
                    tmp += chunk;
                    setCode(tmp);
                    console.log(chunk);
                }
            } catch (err: unknown) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }

        if (idea !== "") {
            generateCode();
        }
    }, [idea]); // Rerun on text or options change

    return { code, gLoading, gError: gError };
};

export default useRefactor;
