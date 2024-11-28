import Header from "@/app/layouts/defaultLayout/components/Header";
import Footer from "@/app/layouts/defaultLayout/components/Footer";

export default function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
