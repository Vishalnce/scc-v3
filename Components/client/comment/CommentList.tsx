import { setDate } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { FiUser } from 'react-icons/fi'


type Props = {
  parentType: "postId" | "conceptId" | "quizId" | "blogId";
  parentId: number | undefined;
 
};

type comment = {
  name:string
  email:string
  content:string
}

export default function CommentList({parentType,parentId}:Props) {

  const [comments ,setComments] = useState<comment[]>([])
  const [loading, setLoading] = useState(false);
  async function handleSubmit() {
    try {
      if (!parentId) return;


      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/en/comment/client?${parentType}=${parentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
      
        }
      );

      if (!res.ok) {
        throw new Error("Failed to submit comment");
      }
      const data = await res.json();
  
      setComments(data);
  
      // Here you can call your API to save the comment
      // After success:
  
    } catch (error) {
      console.log("Eroor while save the Comment form ", error);
    }
  }

    useEffect(() => {
      handleSubmit();
    },[parentId])

 if (loading) return <div>Loading Comments...</div>;


  return (
   <>
   <div>

    <div className='w-[90%]  mx-auto py-6 space-y-5'>

      {/* individual card  */}

      {comments?( comments.map((item,index) => (
<div className='w-full flex flex-row border-2 bg-[#FAFCFC] border-[#E6F1F1] px-4 gap-4 py-6 rounded-2xl'>

          <div className=''>
            <FiUser className='p-2 bg-[#007076] size-10 text-white rounded-full' />
          </div>

          <div className='flex flex-col'>
            <p className='font-bold text-xl'>{item.name} </p>

            <p className='text-my-text-color py-1'> {item.content}</p>

          </div>

      </div>
      )) ) : ""} 

    
    
    </div>

   </div>
   </>
  )
}
