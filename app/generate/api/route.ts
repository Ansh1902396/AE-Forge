//@ts-ignore

import { NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";

import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "@langchain/core/prompts";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";



const CODING_PROMPT = `
You are the lead smart contract engineer who develops smart contract on aeternity blockchain,  the primary language it uses for executing the smart contracts on the blockchain is sophia , your job is to develop smart contract using sophia according to the user commands  . don't give explanation about the code and it's functions ,  only produce the code block , avoid doing syntax errors .`;

const chatModel = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: "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",
});



const PROMPT =
  `You are the lead smart contract engineer who develops smart contract on aeternity blockchain,  the primary language it uses for executing the smart contracts on the blockchain is sophia , your job is to develop smart contract on the user demand . dont give explanation and only produce the code block , avoid doing syntax errors.
  below are provided some example smart contracts using sophia 
  
  Output : 
`

const prompt = new ChatPromptTemplate({
  promptMessages: [
    SystemMessagePromptTemplate.fromTemplate(PROMPT),
    HumanMessagePromptTemplate.fromTemplate("{inputText}"),
  ],
  inputVariables: ["inputText"],
});

export async function GET(request: Request) {
  // const docs = await loader.load();
  const test = await chatModel.invoke(
    "smart contract for adding two numbers and storing them"
  );
  console.log(JSON.stringify(test));
  return NextResponse.json(test);
}
