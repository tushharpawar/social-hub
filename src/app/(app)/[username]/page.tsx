"use client";

import { useParams } from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AnimatedFollowButton } from "@/components/AnimatedFollowButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GrGallery } from "react-icons/gr";
import SmallPostCard from "@/components/user-profile/SmallPostCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "@/app/redux/userProfileSlice";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import EditProfileDialog from "@/components/user-profile/EditProfileDialog";
import { setFetchedUserPosts } from "@/app/redux/postSlice"

export default function Page() {

  const {data:session} = useSession()
  const user:User = session?.user as User

  const params = useParams<{ username: string }>();
  const { username } = params;
  const [userPosts, setUserPosts] = useState([]);
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const dispatch = useDispatch();

  // fetching posts of user

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `api/v1/get-all-posts-by-user/${username}`
      );
      setUserPosts(response.data.message);
      dispatch(setFetchedUserPosts(response.data.message))
      console.log("Users posts fetched by username", response.data.message);
    } catch (error) {
      console.log("Error while fetching posts of user in profile", error);
    }
  };

  // fetching user

  const fetchUser = async () => {
    if(user){
      if(user.username === username){
        setIsLoggedInUser(true)
      }
      try {
        const res = await axios.get(`/api/v1/get-user-profile/${username}`);
        dispatch(setUserProfile(res.data.message));
        console.log("fetched user from url", res.data.message);
      } catch (error) {
        console.log("error while fetching user profile", error);
      }
    }
  };

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, []);

  const { userProfile } = useSelector((store: any) => store.userProfile);
  const {fetchedUserPosts} = useSelector((store:any)=>store.post)

  return (
    <div className="w-full">
      <div className="w-[80%]">
        {/* user profile upper part */}

        <div className="flex justify-center pt-6">
          <div className="flex items-center space-x-16">
            <div className="flex-col">
              <Avatar className="h-36 w-36">
                <AvatarImage src={userProfile.avatar} />
              </Avatar>

              <div className="my-2 text-center">
                <p className=" text-lg font-semibold">{userProfile.fullName}</p>
                <p className=" text-md font-normal">@{username}</p>
              </div>
            </div>

            <div className="">
              {/* follow following and post count */}
              <div className="flex gap-5">
                <div className=" text-center font-semibold text-lg">
                  <p>{fetchedUserPosts[0]?.all_posts?.length ? fetchedUserPosts[0]?.all_posts.length : 0}</p>
                  <p>Posts</p>
                </div>

                <div className=" text-center font-semibold text-lg">
                  <p>{userProfile.followers ? userProfile.followers : 0}</p>
                  <p>Followers</p>
                </div>

                <div className=" text-center font-semibold text-lg">
                  <p>{userProfile.following ? userProfile.following : 0}</p>
                  <p>Following</p>
                </div>
              </div>

              {/* bio and details count */}
              <div className=" my-2">
                <p>{userProfile.bio ? userProfile.bio : ""}</p>
              </div>

              {/* 2 btn for msg and follow or edit profile and share profile */}
              <div className="flex my-5 gap-5">
                {isLoggedInUser ? (
                  <>
                    <EditProfileDialog
                    _id={userProfile._id}
                    username={userProfile.username}
                    avatar={userProfile.avatar}
                    fullName={userProfile.fullName}
                    bio={userProfile.bio}
                    />
                    <Button variant="outline" className="h-8 w-[130px]">
                      Share Profile
                    </Button>
                  </>
                ) : (
                  <>
                    <AnimatedFollowButton></AnimatedFollowButton>
                    <Button variant="outline" className="h-8 w-[130px]">
                      Message
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* user profile post tab bar */}

        <div className="flex justify-center my-3  ">
          <div className="flex border-b-2 gap-3 border-black">
            <GrGallery size={24} />
            <p className="font-semibold text-lg">Posts</p>
          </div>
        </div>

        {/* separator */}

        <div className="flex justify-center my-3">
          <Separator className="w-[60%]"></Separator>
        </div>

        {/* posts to be displayed */}

        <div className="flex justify-center my-4">
          <div className="grid grid-flow-row grid-cols-3 gap-3">
            {fetchedUserPosts[0]?.all_posts?.length > 0
              ? fetchedUserPosts[0]?.all_posts?.map((item : any, index:any) => (
                  <SmallPostCard key={item?._id}  postUrl={item.postUrl} postId={item._id}/>
                ))
              : "No posts on feed :(("}
          </div>
        </div>
      </div>
    </div>
  );
}
