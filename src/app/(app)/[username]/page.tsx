"use client";

import { useParams, useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AnimatedFollowButton } from "@/components/AnimatedFollowButton";
import { Separator } from "@/components/ui/separator";
import { GrGallery } from "react-icons/gr";
import SmallPostCard from "@/components/user-profile/SmallPostCard";
import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "@/app/redux/userProfileSlice";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import EditProfileDialog from "@/components/user-profile/EditProfileDialog";
import { setFetchedUserPosts } from "@/app/redux/postSlice"
import { MdOutlineSettings } from "react-icons/md";
import Link from "next/link";
import { Copy, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast";

export default function Page() {


  const {toast} = useToast();
  const router = useRouter();

  const {data:session,status} = useSession()
  const user:User = session?.user as User
  const params = useParams<{ username: string }>();
  const { username } = params;
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // fetching posts of user

  

  const fetchPosts = async () => {
    try {
      setFetchedUserPosts([])
      const response = await axios.get(
        `api/v1/get-all-posts-by-user/${username}`
      );

      dispatch(setFetchedUserPosts(response.data.message))
        console.log("Users posts fetched by username", response.data.message);
    } catch (error) {
      console.log("Error while fetching posts of user in profile", error);
    }
  };

  // fetching user

  const fetchUser = async () => {
    setLoading(true)
    if(user){
      if(user.username === username){
        setIsLoggedInUser(true)
      }
      try {
        const response = await axios.get(`/api/v1/get-user-profile/${username}`);

        if(response.status === 200){
            dispatch(setUserProfile(response.data.message));
            console.log("fetched user from url", response.data.message);
            setLoading(false)   
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {

          if(error.response && error.response.status === 400){
            setLoading(true)
            toast({
              title:"User not found!",
              variant:"destructive"
            })
            router.replace('/')
            setLoading(false)
          }
        else{
            setLoading(false)
            return <div>Internal server error</div>
          }
        }else{
          setLoading(false)
        }
      }
    }
  };

  useEffect(() => {

    dispatch(setUserProfile(''));
    fetchUser();
  }, [user]);

  const { userProfile } = useSelector((store: any) => store.userProfile);

  useEffect(()=>{
    fetchPosts();
  },[userProfile])

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: 'URL Copied!',
      description: 'Profile URL has been copied to clipboard.',
    });
  };

   
  
  const {fetchedUserPosts} = useSelector((store:any)=>store.post)


  if(status === 'unauthenticated'){
  router.replace('/sign-in')
  }


  if(status ==='loading'){
    return <div className="w-full flex justify-center m-3"><Loader2 className="mr-2 h-8 w-8 animate-spin"></Loader2><p className="text-lg sm:text-2xl">Loading..</p></div>
  }

  return (
    <div className="w-full h-screen overflow-y-scroll pb-16 sm:pb-0"> 
        {
          isLoggedInUser && <Link href="/settings" className="w-full flex justify-end p-3 sm:hidden">
          <MdOutlineSettings className="h-6 w-6" /> 
          </Link>
        }


        {
          loading && <div className="w-full flex justify-center m-3"><Loader2 className="mr-2 h-8 w-8 animate-spin"></Loader2><p className="text-lg sm:text-2xl">Loading..</p></div>
        }

    {
      !loading && 
      <div className="w-full lg:w-[80%] mx-auto">
      {/* User profile upper part */}
      <div className="flex flex-col lg:flex-row justify-center pt-6">
        <div className="flex items-center flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-16">
          <div className="flex flex-col items-center">
            <Avatar className=" h-24 w-24 sm:h-36 sm:w-36">
              <AvatarImage src={userProfile.avatar} />
            </Avatar>
            
            <div className="my-2 text-center">
              <p className="text-lg font-semibold">{userProfile.fullName}</p>
              <p className="text-md font-normal">@{username}</p>
            </div>
          </div>

          <div>
            {/* Follow, Followers, and Post Count */}
            <div className="flex justify-center gap-5">
              <div className="text-center font-semibold text-sm sm:text-lg">
                <p>{fetchedUserPosts[0]?.all_posts?.length || 0}</p>
                <p>Posts</p>
              </div>
              <div className="text-center font-semibold text-sm sm:text-lg">
                <p>{userProfile.followers || 0}</p>
                <p>Followers</p>
              </div>
              <div className="text-center font-semibold text-sm sm:text-lg">
                <p>{userProfile.following || 0}</p>
                <p>Following</p>
              </div>
            </div>

            {/* Bio */}
            <div className="my-2 text-center lg:text-left">
              <p>{userProfile.bio || ""}</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start my-5 gap-3">
              {isLoggedInUser ? (
                <>
                  <EditProfileDialog
                    _id={userProfile._id}
                    username={userProfile.username}
                    avatar={userProfile.avatar}
                    fullName={userProfile.fullName}
                    bio={userProfile.bio}
                  />
                  
                  <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-8 w-[120px] sm:w-[130px]">Share</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Share link</DialogTitle>
                      <DialogDescription>
                        Anyone who has this link will be able to view this profile.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                          Link
                        </Label>
                        <Input
                          id="link"
                          defaultValue={profileUrl}
                          readOnly
                        />
                      </div>
                      <Button type="submit" size="sm" className="px-3" onClick={copyToClipboard}>
                        <span className="sr-only">Copy</span>
                        <Copy />
                      </Button>
                      </div>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Close
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <>
                  <AnimatedFollowButton />

                {/* share profile dialog */}

                  <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-8 w-[120px] sm:w-[130px]">Share</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Share link</DialogTitle>
                      <DialogDescription>
                        Anyone who has this link will be able to view this profile.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                          Link
                        </Label>
                        <Input
                          id="link"
                          defaultValue={profileUrl}
                          readOnly
                        />
                      </div>
                      <Button type="submit" size="sm" className="px-3" onClick={copyToClipboard}>
                        <span className="sr-only">Copy</span>
                        <Copy />
                      </Button>
                      </div>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Close
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>
          </div>
        </div>
    </div>

    {/* User profile post tab bar */}
    <div className="flex justify-center my-3">
      <div className="flex items-center border-b-2 gap-2 sm:gap-3 border-black px-2">
        <GrGallery size={20} />
        <p className="font-semibold text-md sm:text-lg">Posts</p>
      </div>
    </div>

    {/* Separator */}
    <div className="flex justify-center my-3">
      <Separator className="w-[90%] sm:w-[70%]"></Separator>
    </div>

    {/* Posts */}
    <div className="flex justify-center my-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {fetchedUserPosts[0]?.all_posts?.length > 0 ? (
          fetchedUserPosts[0]?.all_posts?.map((item: any, index: any) => (
            <SmallPostCard
              key={item?._id}
              postUrl={item.postUrl}
              postId={item._id}
            />
          ))
        ) : (
          <p className="text-sm sm:text-md">No posts on feed :(</p>
        )}
      </div>
    </div>
  </div>
    }
</div>

  );
}
