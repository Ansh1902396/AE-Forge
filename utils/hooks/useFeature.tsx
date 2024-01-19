import { featurePrompt } from "@/utils/prompts";
import { OpenAI } from "@langchain/openai";
import { useEffect, useState } from "react";

const useFeature = (changes: String, originalCode: String, options = {}) => {
    const [code, setCode] = useState<String>("");
    const [fLoading, setLoading] = useState<Boolean>(false);
    const [fError, setError] = useState<Error | null>(null);

    const model = new OpenAI({
        openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_KEY || "",
        modelName: "gpt-3.5-turbo-16k",
        temperature: 0.5,
        ...options,
    });
    const chain = featurePrompt.pipe(model);

    useEffect(() => {
        async function generateRefactor() {
            setLoading(true);
            setCode("Loading...");
            try {
                console.log("Generating ...");
                const updatedCode = await chain.stream({
                    changes: changes,
                    code: originalCode,
                });

                let tmp = "";
                for await (const chunk of updatedCode) {
                    tmp += chunk;
                    setCode(tmp);
                    console.log(chunk);
                }

                // console.log(updatedCode);
                // setCode(updatedCode);
            } catch (err: unknown) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }

        if (originalCode !== "" && changes !== "") {
            generateRefactor();
        }
    }, [originalCode, changes]); // Rerun on text or options change

    return { code, fLoading, fError };
};

export default useFeature;
