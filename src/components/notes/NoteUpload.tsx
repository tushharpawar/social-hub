import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { noteSchema } from "@/app/schemas/noteSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "../ui/use-toast";
import axios from "axios";

const NoteUpload = () => {
  const form = useForm<z.infer<typeof noteSchema>>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof noteSchema>) => {
    try {
      const response = await axios.post("/api/v1/notes-upload", {
        content: data.content,
      });

      if (response.status === 200) {
        toast({
          title: "Note has created successfully!",
        });
      }
    } catch (error) {
      toast({
        title: "Internal server error!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <div className="w-[80%]">
        <details className="dropdown w-full">
          <summary className="m-1 rounded-sm bg-[#0f172a] text-white p-4 font-normal text-base cursor-pointer">
            Click to write notes
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-sm z-[1] w-full p-2 shadow-md bg-blend-normal mt-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write notes here..."
                          className="resize-none h-[200px] outline-none text-base"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default NoteUpload;
