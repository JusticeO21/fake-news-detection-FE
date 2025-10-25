"use client"
import { useState, useEffect, FormEvent } from "react";
import {
  InputGroup,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupButton,
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { toast } from "sonner";
import { CirclePlus, ArrowUpIcon } from "lucide-react";

interface NewsFormProps {
  handleFormSubmit: (data: { news: string; model: string }) => Promise<void>;
}

function wordCounter(words:string) {
   return  words.trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

function getLocalItem(item: string) {
   if (typeof window !== "undefined") {
     return localStorage.getItem(item) || "";
   }
   return "";
}

export function NewsForm({ handleFormSubmit }: NewsFormProps) {

  const [news, setNews] = useState(() => getLocalItem("newsFormNews"));
  const [model, setModel] = useState(() => getLocalItem("newsFormModel"));

  const [hasShownWarning, setHasShownWarning] = useState(false);

  useEffect(() => {
    localStorage.setItem("newsFormNews", news);
  }, [news]);

  useEffect(() => {
    localStorage.setItem("newsFormModel", model);
  }, [model]);

  const wordCount = wordCounter(news)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (wordCount < 70 && !hasShownWarning) {

      toast.warning("Consider adding more context", {
        description:
          "At least 70 words are recommended to give the model better insight. You can still submit if you wish.",
        duration: 8000,
      });
        
     return setHasShownWarning(true);
    }

   await handleFormSubmit({ news, model });
   setNews("")

    setHasShownWarning(false);
  };

  const handleNewsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setNews(newValue);

    const newWordCount = wordCounter(newValue)

    if (hasShownWarning && newWordCount >= 70) {
      setHasShownWarning(false);
    }
  };

  const isSubmitDisabled = news.trim().length === 0;

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup className="bg-blue-400/10 mx-auto max-w-7xl border-none">
        <InputGroupTextarea
          className="text-md max-h-[70px] hide-scrollbar text-[#b8b4b4]"
          placeholder="Ask, Search or Chat..."
          value={news}
          onChange={handleNewsChange}
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            variant="outline"
            className="rounded-full"
            size="icon-xs"
            disabled
          >
            <CirclePlus />
          </InputGroupButton>

          <Select value={model} defaultValue="kbap" onValueChange={setModel}>
            <SelectTrigger className="w-[110px] bg-[#252f41] text-[#ff8747]! focus:outline-none hover:cursor-pointer border border-[#979191]">
              <SelectValue placeholder="model" />
            </SelectTrigger>
            <SelectContent className="bg-[#252f41] text-[#979191] border border-[#979191]">
              <SelectItem
                value="quab"
                className="focus:bg-transparent! focus:text-[#ff8747] hover:bg-blue-400/10!"
              >
                quab 1.0
              </SelectItem>
              <SelectItem
                value="kbap"
                className="focus:bg-transparent! focus:text-[#ff8747] hover:bg-blue-400/10!"
              >
                kbap 1.0
              </SelectItem>
            </SelectContent>
          </Select>

          <InputGroupButton
            variant="default"
            className="ml-auto rounded-full bg-[#252f41] hover:cursor-pointer"
            size="icon-sm"
            type="submit"
            disabled={isSubmitDisabled}
          >
            <ArrowUpIcon className="text-[#ff8747]" />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}
