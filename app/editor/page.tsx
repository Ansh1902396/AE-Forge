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
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { CandlestickChart, Code2, Copy, Rocket, Wand2Icon } from "lucide-react";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { SetStateAction, useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import useFetch from "use-http";
import { useCopyToClipboard } from "usehooks-ts";
import sophia from "@/utils/sophia";
import { ReloadIcon } from "@radix-ui/react-icons"
import { ScrollArea  } from "@radix-ui/react-scroll-area";
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

languages.sophia = sophia
export default function Component() {
  const [prompt, setPrompt] = useState<string>()
  const { toast } = useToast();
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

 
  const [value, copy] = useCopyToClipboard();
  const { get, response, loading, error  } = useFetch();

  // const { get, response, loading, error } = useFetch(`/generate/api`);


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
              <CardContent className="max-h-32 overflow-y-scroll mb-6 scrollbar-hide">
              
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod, nunc a tincidunt aliquam, lacus nisl fringilla nunc, ac
                aliquet nunc nunc id nunc. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed euismod, nunc a tincidunt
                aliquam, lacus nisl fringilla nunc, ac aliquet nunc nunc id
                nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed euismod, nunc ang elit. Sed euismod, nunc a tincidunt
                aliquam, lacus nisl fringilla nunc, ac aliquet nunc nunc id
                nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed euismod, nunc ang elit. Sed euismod, nunc a tincidunt
                aliquam, lacus nisl fringilla nunc, ac aliquet nunc nunc id
                nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed euismod, nunc ang elit. Sed euismod, nunc a tincidunt
                aliquam, lacus nisl fringilla nunc, ac aliquet nunc nunc id
                nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed euismod, nunc ang elit. Sed euismod, nunc a tincidunt
                aliquam, lacus nisl fringilla nunc, ac aliquet nunc nunc id
                nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed euismod, nunc a
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
                  value={prompt}
                  onValueChange={(prompt: SetStateAction<string>) => {
                    setPrompt(prompt);
                  }}
                />
              </CardContent>
            </Card>
          </Container>
          <Container>
            <Button className="w-full rounded-xl gap-4 font-bold text-base" onClick={async() => {
                try{
                  const res = await get('/generate/api')
                  const data = await res.json()
                  console.log(data)
                  if(res.ok){
                  setPrompt(data)
                  }
                }
                catch(err) {
                  console.log("Fucked up")
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
                <div className="max-h-[34rem] max-w-[42vw] overflow-y-auto">
                  <Editor
                    // tailwind class to suppress border on focus of textarea
                    className="min-h-[300px] flex-1 p-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:min-h-[34rem]"
                    value={code}
                    onValueChange={(code: SetStateAction<string>) => {
                      setCode(code);
                    }}
                    highlight={(code) =>
                      highlight(code, languages.sophia, "sophia")
                    }
                    padding={10}
                    style={{
                      fontFamily: '"Fira code", "Fira Mono", monospace',
                      fontSize: 14,
                    }}
                    autoFocus
                  />
                </div>
              </CardContent>
            </Card>
          </Container>
          <Container className="row-span-1 h-fit">
            <Button
              className="w-full rounded-xl gap-4 font-bold text-base"
              onClick={() => {
                copy(code);
                toast({
                  variant: "default",
                  title: "Copied Success",
                });
              }}
            >
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
              <CardContent className="max-h-36 overflow-y-scroll scrollbar-hide">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod, nunc a tincidunt aliquam, lacus nisl fringilla nunc, ac
                aliquet nunc nunc id nunc. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed euismod, nunc a tincidunt
                aliquam, lacus nisl fringilla nunc, ac aliquet nunc nunc id
                nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed euismod, nunc ang elit. Sed euismod, nunc a tincidunt
                aliquam, lacus nisl fringilla nunc, ac aliquet nunc nunc id
                nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed euismod, nunc ang elit. Sed euismod, nunc a tincidunt
                aliquam, lacus nisl fringilla nunc, ac aliquet nunc nunc id
                nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed euismod, nunc ang elit. Sed euismod, nunc a tincidunt
                aliquam, lacus nisl fringilla nunc, ac aliquet nunc nunc id
                nunc.
              </CardContent>
              <CardFooter className="mt-4">
                <Button className="w-full rounded-xl gap-4 font-bold text-base">
                  <Code2 />
                  Open in IDE
                </Button>
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
                <CardContent className="max-h-32 overflow-y-scroll mb-6 scrollbar-hide">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  euismod, nunc a tincidunt aliquam, lacus nisl fringilla nunc,
                  ac aliquet nunc nunc id nunc. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Sed euismod, nunc a tincidunt
                  aliquam, lacus nisl fringilla nunc, ac aliquet nunc nunc id
                  nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed euismod, nunc ang elit. Sed euismod, nunc a tincidunt
                  aliquam, lacus nisl fringilla nunc, ac aliquet nunc nunc id
                  nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed euismod, nunc ang elit. Sed euismod, nunc a tincidunt
                  aliquam, lacus nisl fringilla nunc, ac aliquet nunc nunc id
                  nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed euismod, nunc ang elit. Sed euismod, nunc a tincidunt
                  aliquam, lacus nisl fringilla nunc, ac aliquet nunc nunc id
                  nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed euismod, nunc ang elit. Sed euismod, nunc a tincidunt
                  aliquam, lacus nisl fringilla nunc, ac aliquet nunc nunc id
                  nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed euismod, nunc a
                </CardContent>
              </CardContent>
            </Card>
          </Container>
          <Container className="row-span-1 h-fit">
            <Button
              className="w-full rounded-xl gap-4 font-bold text-base"
              onClick={async () => {
                try {
                  const res = await get(`/deploy/api/?code=${encodeURIComponent(code)}`);
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
                    description: "There was a problem with your request.",
                  });
                }
              }}
                            
            >
              {/* {`${loading?<Rocket/>:<Rocket/>}`} */}
              <Rocket/>
              {`${loading?"Deploying...":"1-Click Deploy"}`}
            </Button>
          </Container>
        </div>
      </div>
    </section>
  );
}
