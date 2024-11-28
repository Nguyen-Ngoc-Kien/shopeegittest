import AuthLayout from "@/app/layouts/authLayout";

export default function Layout({children}) {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}