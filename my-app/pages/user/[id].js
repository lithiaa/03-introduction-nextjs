import { useRouter } from 'next/router';

const UserId = ({ user }) => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1>User ID: {id}</h1>
            <p>Nama: {user.name}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Website: {user.website}</p>
            <p>Alamat: {user.address.street}, {user.address.city}</p>
        </div>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.params;
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!res.ok) {
            throw new Error('User not found');
        }
        const user = await res.json();
        return { props: { user } };
    } catch (error) {
        return { props: { user: null } };
    }
}

export default UserId;