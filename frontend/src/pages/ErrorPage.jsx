import React from 'react';
import {useLocation, Link} from 'react-router-dom';
import {Container, VStack, Text, Image, Box, Button} from "@chakra-ui/react";


export const ErrorPage = () => {
    const location = useLocation();
    const {status} = location.state || {status: 500};

    return (
        <Container
            bgColor="#276cf930"
            maxW="container.xl"
            py={12}
            textAlign="center"
            style={{
                padding: '20px',
                borderRadius: '0 0 10px 10px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                textAlign: 'center',
            }}
        >
            <div className="error-page">
                <h1
                    style={{
                        fontSize: '48px',
                        color: '#ff6b6b',
                        fontWeight: 'bold',
                    }}
                >
                    Oops! 🚧
                </h1>
                <p
                    style={{
                        fontSize: '20px',
                        color: '#333',
                        marginBottom: '20px',
                    }}
                >
                    {status === 404
                        ? "Uh-oh, looks like you wandered off the map. 🗺️ This page doesn't exist!"
                        : "Yikes! Something went wrong on our end. We're probably chasing a bug 🐛."}
                </p>
                <p
                    style={{
                        fontSize: '18px',
                        color: '#888',
                        marginBottom: '20px',
                    }}
                >
                    Error Code: {status}
                </p>

                {/* Fun image or emoji */}
                <div
                    style={{
                        marginBottom: '20px',
                    }}
                >
                    <img
                        src="https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif"
                        alt="Funny error gif"
                        style={{
                            maxWidth: '300px',
                            margin: '0 auto',
                        }}
                    />
                </div>

                {/* Fun Call to Action */}
                <p
                    style={{
                        fontSize: '18px',
                        color: '#333',
                        marginTop: '20px',
                    }}
                >
                    Don't worry, we'll get you back to shopping in no time!
                </p>

                {/* Redirect button */}
                <Link to="/">
                    <Button
                        colorScheme="blue"
                        size="lg"
                        mt={6}
                        style={{
                            backgroundColor: "#276cf930",
                            color: 'black',
                            padding: '12px 24px',
                            borderRadius: '8px',
                        }}
                    >
                        🛍️ Back to Shopping
                    </Button>
                </Link>
            </div>
        </Container>
    );
};