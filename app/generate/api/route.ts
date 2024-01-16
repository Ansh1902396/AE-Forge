//@ts-ignore
import { CohereClient } from "cohere-ai";
import { OpenAIStream, StreamingTextResponse } from 'ai'
const cohere = new CohereClient({
    token: "ntoPfR4fiJKEXrbHKLX3Ra85Ccv09qKyfF5ImP2v",
});

const prompt_template = `
  You are an AI assistant that helps travelers pick a city to travel to.
  You do this by rating how much a person would enjoy a city based on their interests.
  Given a city and interests, you respond with an integer 1-10 where 10 is the most enjoyment and 0 is the least.
  
  Sample city: New York City
  Sample interests: food, museums, hiking
  Sample answer: 8
  
  City: {city}
  Interests: {interests}
  Answer: `;

  const inputVariables = {
    city: "Washington, D.C.",
    interests: "resorts, museums, beaches",
  };
  let replacedPromptTemplate = prompt_template;

  Object.entries(inputVariables).forEach(([key, value]: [string, string]) => {
    replacedPromptTemplate = replacedPromptTemplate.replace(`{${key}}`, value);
  });


export async function GET(request: Request) {
    const generate = await cohere.generate({
        prompt: replacedPromptTemplate,
    })
    // console.log("Received response", generate.generations[0].text);
    const { searchParams } = new URL(request.url);

    //@ts-ignore
    return Response.json({Answer : "Amrish Puri"});
}
