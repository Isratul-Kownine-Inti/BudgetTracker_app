import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';

function SignUp() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.email || !formData.password || !formData.username) {
            window.alert("All fields are required.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('http://localhost:3001/api/user/auth/signup', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (data.success === "false") {
                window.alert(data.message);
                setLoading(false);
                return;
            }

            if (res.ok) {
                navigate('/');
            }
        } catch (err) {
            window.alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className='w-full max-w-md p-8 space-y-6 bg-zinc-800 text-white rounded-lg shadow-md'>
                <form onSubmit={handleSubmit}>
                    <div className='space-y-4'>
                        <div>
                            <Label class="text-yellow-600" htmlFor='email' value='Your Email' />
                            <TextInput
                                className='text-black mt-2'
                                type='email'
                                placeholder='your@gmail.com'
                                id='email'
                                onBlur={handleChange}
                            />
                        </div>
                        <div>
                            <Label class="text-yellow-600" htmlFor='username' value='Your Username' />
                            <TextInput
                                className='text-black mt-2'
                                type='text'
                                placeholder='Username'
                                id='username'
                                onBlur={handleChange}
                            />
                        </div>
                        <div>
                            <Label class="text-yellow-600" htmlFor='password' value='Your Password' />
                            <TextInput
                                className='text-black mt-2'
                                type='password'
                                placeholder='Password'
                                id='password'
                                onBlur={handleChange}
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        className='mt-6 w-full font-bold bg-gradient-to-r from-cyan-300 to-blue-600'
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Spinner className='text-sm mr-2' />
                                Loading...
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </Button>
                </form>
                <p className='text-sm mt-4 text-center'>
                    Already have an account?{' '}
                    <Link to='/' className='text-cyan-400 font-semibold'>
                        Sign In
                    </Link>
                </p>
                {error && (
                    <Alert className='mt-5' color='failure'>{error}</Alert>
                )}
            </div>
        </div>
    );
}

export default SignUp;
