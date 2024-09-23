import React, { useState } from 'react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.heading}>Login</h2>
                <label style={styles.label}>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                </label>
                <label style={styles.label}>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </label>
                <button type="submit" style={styles.button}>
                    Login
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
    },
    heading: {
        marginBottom: '20px',
        textAlign: 'center',
        color: '#333',
    },
    label: {
        marginBottom: '10px',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default AdminLogin;