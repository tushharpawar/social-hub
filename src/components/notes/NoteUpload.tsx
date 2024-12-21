import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { noteSchema } from "@/app/schemas/noteSchema";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "../ui/use-toast";
import axios from "axios";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";
import { FaPlus } from "react-icons/fa6";

const NoteUpload = () => {
  const [note,setNote] = useState("")
  const [loading,setLoading] = useState(false)
  const [open,setOpen] = useState(false)


  const handleNoteChange=(e)=>{
    setNote(e.target.value)
  } 

  const handleSubmitNote = async () => {
    setLoading(true)
    try {
      const response = await axios.post("/api/v1/notes-upload", {
        content: note,
      });

      if (response.status === 200) {
        toast({
          title: "Note has created successfully!",
        });
      }
      setLoading(false)
      setOpen(false)
      setNote('')
    } catch (error) {
      toast({
        title: "Internal server error!",
        variant: "destructive",
      });
      setLoading(false)
      setOpen(false)
      setNote('')
    }
  };

  return (
    <div className=" flex justify-center mt-4">
      <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className='text-lg font-semibold'><FaPlus size={24} className=" rounded-full"/></SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
              Write a note
              </SheetTitle>
              <SheetDescription>
                You can write you thought below...
              </SheetDescription>
            </SheetHeader>
            <div className=" py-4">
              <div className="flex gap-2">
                <Label className="text-right">
                  Note:
                </Label>
                <Textarea placeholder='Write a beautiful note...' value={note} className="h-5" onChange={handleNoteChange}/>
              </div>
            </div>
            <SheetFooter>
                <Button type="submit" disabled={loading} onClick={handleSubmitNote}>
                {
                  loading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                    Please wait
                    </>
                  ) : ('Upload note')
                }
                </Button>
            </SheetFooter>
          </SheetContent>
          
        </Sheet>
    </div>
  );
};

export default NoteUpload;
