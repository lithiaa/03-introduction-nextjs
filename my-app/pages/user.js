import React from "react";

const User = ({ users }) => {
    return (
        <div>
            <h1>Daftar User</h1>
            <br/>
            <br/>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export async function getStaticProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();

    return {
        props: {
            users,
        },
    };
}

export default User;