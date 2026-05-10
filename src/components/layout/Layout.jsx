import { Outlet } from "react-router";

export default function Layout() {
    return(
        <>
            <main>
                <Outlet/>
            </main>
            <footer className="grid grid-rows-12">
                <div className="col-span-8 flex flex-col gap-4"></div>
            </footer>
        </>
    )
}