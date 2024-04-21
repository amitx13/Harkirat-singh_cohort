
export default function ({ children, user, customer, admin }: { children: React.ReactNode, user: React.ReactNode, customer: React.ReactNode, admin: React.ReactNode, }) {
    return (
        <div>
            <div>{children}</div>
            <div>{user}</div>
            <div>{customer}</div>
            <div>{admin}</div>
        </div>
    )
}