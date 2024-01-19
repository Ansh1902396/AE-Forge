import { summaryPrompt } from "@/utils/prompts";
import { OpenAI } from "@langchain/openai";
import { useEffect, useState } from "react";

const useSummary = (code: String, options = {}) => {
    const [summary, setSummary] = useState<String>("");
    const [sLoading, setLoading] = useState<Boolean>(false);
    const [sError, setError] = useState<Error | null>(null);

    const model = new OpenAI({
        openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_KEY || "",
        modelName: "gpt-3.5-turbo-16k",
        temperature: 0.3,
        ...options,
    });
    const chain = summaryPrompt.pipe(model);

    useEffect(() => {
        async function summarizeText() {
            setLoading(true);
            setSummary("Loading...");
            try {
                console.log("Summarizing...");
                const summary = await chain.stream({ code: code });

                let tmp = "";
                for await (const chunk of summary) {
                    tmp += chunk;
                    setSummary(tmp);
                    console.log(chunk);
                }
            } catch (err: unknown) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }

        if (code !== "") {
            summarizeText();
        }
    }, [code]); // Rerun on text or options change

    return { summary, sLoading, sError };
};

export default useSummary;

// const summaryTemplate = `
// Summarize the provided Aeternity blockchain smart contract written in Sophia language with brevity. Highlight key functionalities, significant variables, and essential functions. Focus on providing a concise yet informative overview of the smart contract's purpose and structure. Assume the reader has basic knowledge of blockchain and smart contract development.

// Smart Contract Code:
// --------
// {text}
// --------

// Output a brief summary covering main features, purpose, and noteworthy aspects of the smart contract.

// SUMMARY:`;

// const SUMMARY_PROMPT = PromptTemplate.fromTemplate(summaryTemplate);

// // const summaryRefineTemplate = `
