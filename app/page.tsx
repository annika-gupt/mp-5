'use client';
import { useState, useTransition } from 'react';
import { createAlias } from './submit';
import {styled} from 'styled-components';
import './globals.css';

const Input = styled.input`
    width: 70%;
    border: 2px solid lightgrey;
    border-radius: 5px;
    padding: 1%;
    margin-bottom: 2.5%;
`

const Button = styled.button`
    display: flex; 
    flex-direction: column; 
    margin: 5% auto; 
    background-color: #98D2C0;
    color: white;
    padding: 2.5% 30%;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    &:hover {
        background-color: #4F959D;
    }
`
const Header = styled.h1`
    color: #231F20;
    font-size: xxx-large;
`

const Header2 = styled.h1`
    color: #231F20;
    font-size: x-large;
    font-weight: bolder;
    padding-bottom: .5%; 
`

const StyledH3 = styled.h3`
    color: slategrey;
    font-style: italic;
    padding-bottom: 2.5%; 
`

const StyledHead3 = styled.h3`
    text-align: left;
    font-size: large;
    padding-left: 15%;
`

const Div = styled.div`
    text-align: center;
    padding-top: 3%;
`
const Div2 = styled.div`
    background-color: white; 
    margin: 3% 20%; 
    padding: 5%;
    border-radius: 30px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
`

export default function Home() {
    // used useState here to update url, alias, error, and shortened URL
    const [url, setUrl] = useState('');
    const [alias, setAlias] = useState('');
    const [error, setError] = useState('');
    const [shortened, setShortened] = useState('');
    const [isPending, startTransition] = useTransition();

    async function handleSubmit(formData: FormData) {
        // clears previous shortened URL and error messages
        setError('');
        setShortened('');

        startTransition(async () => {
            try {
                await createAlias(formData); // calls createAlias() using user's input data
                const userAlias = formData.get('alias'); // retrieves alias input from formData
                if (userAlias) { // ensures userAlias is not null/undefined
                    setShortened(`${window.location.origin}/${userAlias}`); // uses string interpolation to append userAlias to current page url
                }
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An error occurred');
                }
            }
        });
    }

    return (
        <Div>
            <Header>URL Shortener</Header>
            <Div2>
                <Header2>Shorten Your URL</Header2>
                <StyledH3>Enter a long URL and an alias to create a shorter link!</StyledH3>
                <form action={handleSubmit}>
                    <StyledHead3>Enter URL:  </StyledHead3>
                    <Input name="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/very/long/url"/>
                    <StyledHead3>Enter Alias:  </StyledHead3>
                    <Input name="alias" value={alias} onChange={(e) => setAlias(e.target.value)} placeholder="your-custom-alias"/>
                    <Button type="submit" disabled={isPending}>Shorten</Button>
                    {error ? <p style={{color: 'red'}}>{error}</p> : null}
                    {shortened ? <p>Your shortened URL: <a href={shortened}>{shortened}</a></p> : null}
                </form>
            </Div2>
        </Div>
    )
}