import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Theme, useThemeStore } from '../store/useThemeStore'
import { IconSun, IconMoon } from '../components/atoms/Icons'

export const Route = createRootRoute({
  component: Root,
})

function Root() {
    const {theme, toggleTheme} = useThemeStore()
    const themeClass = `${theme === Theme.DARK ? 'bg-black text-white' : 'bg-white text-black'}`
    return(
    <div className={`${themeClass} transition delay-150 duration-300 ease-in-out`}>
      <header className="w-full h-16 flex justify-between items-center px-8 py-4">
        <nav>
            <Link to="/" className="[&.active]:font-bold">
            Home
            </Link>
        </nav>
        <button onClick={toggleTheme}>
            {theme === Theme.DARK ? <IconMoon /> : <IconSun />}
        </button>
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </div>

    )
}
