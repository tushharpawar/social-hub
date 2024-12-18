"use client";

import HomeNavbar from "@/components/SearchBar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import PostPage from "../post/PostCard";
import RightSlidebarHeader from "../right-slidebar/RightSlidebar";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/app/redux/authSlice";
import { setPosts } from "@/app/redux/postSlice";
import { Loader2 } from "lucide-react";

const HomePageAfterLogin = () => {
  interface SeenPost {
    isSeen: boolean;
    post: string;
    user: string;
  }
  
  const [seenPosts, setSeenPosts] = useState<SeenPost[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const[loading,setLoading] = useState(false)

  const { data: session } = useSession();
  const user: User = session?.user as User;

  const dispatch = useDispatch();
  const userId = user?._id;

  // interface Post {
  //   _id: string;
  //   owner: {
  //     username: string;
  //     avatar: string;
  //   };
  //   postUrl: string;
  //   caption: string;
  //   likeCount: number;
  // }

  const [posts, setPosts] = useState<any>([])
  
  // const { posts } = useSelector((store: any) => store.post);

  useEffect(() => {
    if (user) {
      dispatch(setAuthUser(user));
    }
  }, [user, dispatch]);

  const fetchPost = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true)
      const response = await axios.get(`/api/v1/all-posts?page=${page}&limit=10`);
      const {message:newPosts,pagination} = response.data
      console.log(newPosts);

      if(newPosts.length > 0){
        setPosts((prev)=>[...prev,...newPosts]);
        setHasMore(pagination.hasMore)
        setPage(page+1);
      }else{
        setHasMore(false)
      }
      
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false);
    }
  }, [loading,page]);

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        hasMore &&
        !loading
      ) {
        fetchPost();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, loading, fetchPost]);


  useEffect(() => {
    if (posts?.length > 0) {
      const handleIntersection = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const postId = entry.target.getAttribute("data-postid");

            setSeenPosts((prev) => {
              if (!prev.find((item) => item.post === postId)) {
                return [...prev, { isSeen: true, post: postId, user: userId || "" }];
              }
              return prev;
            });
          }
        });
      };

      const observer = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: "0px",
        threshold: 0.7,
      });

      observerRef.current = observer;

      const postElements = document.querySelectorAll("[data-postid]");
      postElements.forEach((el) => observer.observe(el));

      return () => {
        observer.disconnect();
      };
    }
  }, [posts, userId]);

  useEffect(() => {
    if (seenPosts.length > 0) {
      const timer = setTimeout(() => {
        axios
          .post("api/v1/set-is-post-seen-by-user", { seenPosts })
          .then(() => console.log("Seen posts updated"))
          .catch((error) => console.error("Error updating seen posts:", error));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [seenPosts]);

  return (
    <div className="w-full flex">
      <div className="w-full min-h-screen">
        {/* <HomeNavbar /> */}
        <div className="flex items-center justify-center flex-col">
          <div className="p-5">
            {posts?.length > 0 ? (
              posts?.map((post: any) => (
                <div className="w-full h-auto flex justify-center mt-5" key={post._id} data-postid={post._id}>
                <PostPage
                  postId={post._id}
                  username={post.owner.username}
                  postUrl={post.postUrl}
                  avatar={post.owner.avatar}
                  caption={post.caption}
                  likeCount={post.likeCount}
                />
                </div>
              ))
              
            ) : (
              !hasMore &&
              <div className="text-center font-semibold text-xl">
              You have cought all activity!
              </div> 
            )}

            {loading && posts.length > 0 && <Loader2 size={24} className="text-center"/>}
            
          </div>
        </div>
      </div>
      <RightSlidebarHeader />
    </div>
  );
};

export default HomePageAfterLogin;
