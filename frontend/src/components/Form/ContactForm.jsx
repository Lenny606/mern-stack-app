import React, {useEffect, useState} from 'react';
import * as emailjs from "@emailjs/browser";
import {useQuery, useMutation} from "@tanstack/react-query";
import {Button, Input, useToast} from "@chakra-ui/react";


const EMAIL_PUBLIC_SERVICE_ID = "service_afcoqzn"
const EMAIL_PUBLIC_TEMPLATE_ID = "template_nfz2ezh"
const EMAIL_PUBLIC_PUBLIC_KEY = "Xz6mUuKd8l-PXaBbE"

const ContactForm = () => {
    const toast = useToast()
    const sendEmail = ( body) => {

        const templateData = {
            to_name: "Lenny606",
            from_name: body.title,
            reply_to: body.email,
            message: body.message
        }
        emailjs
            .send(
                EMAIL_PUBLIC_SERVICE_ID,
                EMAIL_PUBLIC_TEMPLATE_ID,
                templateData,
                {
                    publicKey: EMAIL_PUBLIC_PUBLIC_KEY,
                    limitRate: {
                        throttle: 5000 //not posible to send more than 1 request per 5 second
                    }
                })
            .then(
                () => {
                    toast({
                        title: "Email send.",
                        description: "",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });
                },
                (error) => {
                    toast({
                        title: "Not send",
                        description: error,
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                },
            );
    };

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

    const [body, setBody] = useState({
        title: '',
        email: '',
        message: '',
        userId: 515,
        id: 1,
    });

    useEffect(() => {
        if (isSuccessPost && !isPendingPost) {
            refetchPosts()
        }
    }, [isSuccessPost, refetchPosts]);

    return (
        <div>
            {/*TODO refoactor UI*/}
            <form onSubmit={(e) => {
                e.preventDefault();
                sendEmail(body)
                createPostMutation(body) //save message TODO in BE
            }}>

                <Input name={'title'} id={'title'} value={body.title} onChange={(e) => {
                    setBody({...body, title: e.target.value});
                }}/>

                <Input name={'email'} id={'email'} value={body.email} onChange={(e) => {
                    setBody({...body, email: e.target.value});
                }}/>

                <Input name={'message'} id={'message'} value={body.message} onChange={(e) => {
                    setBody({...body, message: e.target.value})
                }}/>
                <Button type="submit">Save</Button>
            {/*    TODO Add captcha */}
            </form>

        </div>
    );
};

export default ContactForm;