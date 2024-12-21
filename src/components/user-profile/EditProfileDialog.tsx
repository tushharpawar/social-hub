import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage } from "../ui/avatar"
import Link from "next/link"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { setUserProfile } from "@/app/redux/userProfileSlice"
import { useToast } from "../ui/use-toast"
import { setIsClickedOnEditProfile } from "@/app/redux/updateAvatarSlice"
import { Pencil } from "lucide-react"


type EditProfileDialogProps = {
    username:string;
    fullName:string;
    bio:string;
    avatar:string;
    _id:any
}

const EditProfileDialog = ({username,fullName,bio,avatar,_id}:EditProfileDialogProps) => {

    const [newFullName,setNewFullname] = useState(fullName)
    const [newBio,setNewBio] = useState(bio)
    const dispatch = useDispatch()
    const {userProfile} = useSelector((store:any)=>store.userProfile)
    const {toast} = useToast()
    const [open,setOpen] = useState(false)

    const onFullNameChange= (e:any) =>{
        setNewFullname(e.target.value)
    }

    const onBioChange = (e:any) =>{
        setNewBio(e.target.value)
    }

    const onSave =async () =>{;
      
        const response = await axios.post(`/api/v1/update-user-info`,{
            fullName:newFullName,
            bio:newBio
        })

        if(response.status === 201){
            dispatch(setUserProfile({
                ...userProfile,
                fullName:newFullName,
                bio:newBio
            }))

            setOpen(false)

            toast({
                title:"Success",
                description:response.data.message
            })
          }
        else{
          toast({
            title:"Failed",
            description:response.data.message,
        })
        }
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-8 w-[130px]">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <div className="w-full flex-col my-3">
              <Link href={`/avatar/${_id}`} className="relative flex justify-center" onClick={()=>{dispatch(setIsClickedOnEditProfile(true))}}>
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatar} />
                <Pencil className="absolute top-5 right-2 h-5 w-5 z-5"/>
              </Avatar>       
              </Link>

              <div className="my-2 text-center">
                <p className=" text-md font-semibold">@{username}</p>
              </div>
            </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullName" className="text-right">
              Full Name
            </Label>
            <Input
              id="fullName"
              defaultValue={fullName}
              className="col-span-3"
              value={newFullName}
              onChange={onFullNameChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Bio" className="text-right">
              Bio
            </Label>
            <Input
              id="bio"
              defaultValue={bio}
              className="col-span-3"
              onChange={onBioChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileDialog