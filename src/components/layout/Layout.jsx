import { Outlet } from "react-router";

export default function Layout() {
    return(
        <>
            <header>SANUBARI Header</header>
            <main>
                <Outlet/>
            </main>
            <footer>SANUBARI Footer</footer>
        </>
    )
}