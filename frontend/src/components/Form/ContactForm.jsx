import React, {useEffect, useState} from 'react';
import {useQuery, useMutation} from "@tanstack/react-query";
import {Button, Input} from "@chakra-ui/react";


const ContactForm = () => {
    let url = 'https://jsonplaceholder.typicode.com/posts'
    const createPost = async (body) => {

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        return await res.json();
    }
    const getPosts = async () => {
        const res = await fetch(url)
        return await res.json();
    }
    const {
        data: responseData,
        refetch: refetchPosts
    } = useQuery({
        queryKey: ['getPost'],
        queryFn: getPosts,
    })

    const {
        mutate: createPostMutation,
        isSuccess: isSuccessPost,
        isPending: isPendingPost,
    } = useMutation({
        mutationFn: createPost,
        // onSuccess: refetchPosts()  //another way
    })

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    let body = {
        title: title,
        body: message,
        userId: 515,
        id: 1,
    }

    useEffect(() => {
        if (isSuccessPost && !isPendingPost) {
            refetchPosts()
        }
    }, [isSuccessPost, refetchPosts]);

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                createPostMutation(body)
            }}>

                <Input name={'title'} id={'title'} value={title} onChange={(e) => {
                    setTitle(e.target.value);
                }}/>

                <Input name={'message'} id={'message'} value={message} onChange={(e) => {
                    setMessage(e.target.value)
                }}/>
                <Button type="submit">Save</Button>
            </form>

        </div>
    );
};

export default ContactForm;