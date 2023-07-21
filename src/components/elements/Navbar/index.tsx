import { useAuthModalContext } from '@contexts'
import { AuthModal, Button, Image } from '@elements'
import { Menu, Transition } from '@headlessui/react'
import {
  ArrowLeftOnRectangleIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'
import {
  Burger,
  Chevronfull,
  Navbarflower,
  Navbarflowerleft,
  Navbarflowerright,
  Navbaricon,
  User,
} from '@icons'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { NavbarProps } from './interface'
import Link from 'next/link'
import { routes } from './constant'
import { api } from 'src/utils/api'

export const Navbar: React.FC<NavbarProps> = ({}) => {
  // TODO: Write element's logic
  const { data: session } = useSession()

  const router = useRouter()
  const { authModalOpen, setAuthModalOpen } = useAuthModalContext()

  const [scroll, setScroll] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () =>
      !window.scrollY ? setScroll(false) : setScroll(true)
    )
  }, [])

  const userData = api.userData.get.useQuery({
    id: session?.user?.id as string,
  })

  return (
    <>
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
      <div className="fixed top-0 z-10 w-full select-none">
        <div
          className={`flex w-full items-center justify-between bg-[#E9DEA6] px-4 py-3 shadow-lg  duration-1000 ${
            scroll ? 'md:top-1 md:scale-[0.99] lg:top-2' : 'top-0 scale-100'
          } relative transition-all`}
        >
          <div className="flex items-center gap-5">
            <div className="hidden h-[24px] w-[24px] rounded-full bg-[#272B52]" />
            <div className="hidden lg:block">
              <Navbarflowerleft />
            </div>
            <Link href={'/'}>
              <div className="h-fit w-fit cursor-pointer">
                <Image
                  imageUrl="/NavbarLogo.svg"
                  alt="Logo"
                  className="h-[50px] w-[212px]"
                  fill
                />
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <Menu
              as="div"
              className="relative inline-block text-left lg:hidden "
            >
              <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md bg-transparent px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 hover:bg-opacity-10 active:bg-opacity-20">
                  <Burger />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-5 w-56 origin-top-right rounded-md  bg-[#EABB76] shadow-xl drop-shadow-lg">
                  <div className="px-1 py-1">
                    {routes.map((route, index) => (
                      <Menu.Item>
                        {({ active }) =>
                          route.requireAuth && !session ? (
                            <button
                              key={index}
                              className={`flex w-full items-center justify-end gap-2 rounded-md px-2 py-2 text-sm transition-all duration-300 ease-in-out ${
                                router.pathname === route.path && 'hidden'
                              } ${
                                active
                                  ? 'bg-[#DC8F1A] text-white'
                                  : 'text-[#6D2223]'
                              }`}
                              onClick={() => setAuthModalOpen(true)}
                            >
                              {route.name}
                              <span className="stroke-current">
                                <route.icon
                                  fill="none"
                                  stroke="primary"
                                  className="h-5 w-5"
                                />
                              </span>
                            </button>
                          ) : (
                            <Link key={index} href={route.path}>
                              <button
                                className={`flex w-full items-center justify-end gap-2 rounded-md px-2 py-2 text-sm transition-all duration-300 ease-in-out ${
                                  router.pathname === route.path && 'hidden'
                                } ${
                                  active
                                    ? 'bg-[#DC8F1A] text-white'
                                    : 'text-[#6D2223]'
                                }`}
                              >
                                {route.name}
                                <span className="stroke-current">
                                  <route.icon
                                    fill="none"
                                    stroke="primary"
                                    className="h-5 w-5"
                                  />
                                </span>
                              </button>
                            </Link>
                          )
                        }
                      </Menu.Item>
                    ))}
                    {session && (
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? 'bg-[#DC8F1A] text-white'
                                : 'text-[#6D2223]'
                            } flex w-full items-center justify-end gap-2 rounded-md px-2 py-2 text-sm transition-all duration-300 ease-in-out`}
                            onClick={() => {
                              router.push('/profile')
                            }}
                          >
                            Edit Profile
                            <PencilSquareIcon className="h-6 w-6" />
                          </button>
                        )}
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? 'bg-red-normal text-white'
                              : 'text-red-normal'
                          } flex w-full items-center justify-end gap-2 rounded-md px-2 py-2 font-poppinsBold text-sm transition-all duration-300 ease-in-out`}
                          onClick={async () => {
                            session
                              ? await signOut({
                                  redirect: false,
                                  callbackUrl: '/',
                                })
                                  .then((data) => {
                                    router.replace(data.url)
                                    toast.success('Logged Out!')
                                  })
                                  .catch((err) => {
                                    toast.error(err)
                                  })
                              : setAuthModalOpen(true)
                          }}
                        >
                          {session ? 'Keluar' : 'Masuk'}
                          <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <div className="hidden space-x-5 lg:flex lg:items-center">
              {routes.map((route, index) =>
                route.requireAuth && !session ? (
                  <Button
                    key={index}
                    className={`w-fit px-5 py-3 text-[12px] ${
                      router.pathname === route.path && 'hidden'
                    }`}
                    variant={2}
                    onClick={() => setAuthModalOpen(true)}
                    leftIcon={
                      <route.icon
                        fill="none"
                        stroke="primary"
                        className="h-5 w-5"
                      />
                    }
                  >
                    {route.name}
                  </Button>
                ) : (
                  <Link key={index} href={route.path}>
                    <Button
                      className={`w-fit px-5 py-3 text-[12px] ${
                        router.pathname === route.path && 'hidden'
                      }`}
                      variant={2}
                      leftIcon={
                        <route.icon
                          fill="none"
                          stroke="primary"
                          className="h-5 w-5"
                        />
                      }
                    >
                      {route.name}
                    </Button>
                  </Link>
                )
              )}
              {session ? (
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="">
                      {({ open }) => (
                        <div
                          className={`inline-flex w-full items-center justify-center gap-2 rounded-md bg-orange-dark px-5 py-3 text-[12px] text-cream-light transition-shadow  ${
                            open ? 'drop-shadow-lg' : 'drop-shadow-none'
                          }`}
                        >
                          <User className="h-5 w-5 stroke-white" />
                          <p className="w-full max-w-[140px] truncate">
                            {userData.data?.slug
                              ? userData.data?.slug
                              : session.user?.name}
                          </p>
                          <Chevronfull
                            className={`h-6 w-6 rotate-180 text-cream-light transition-transform duration-300 ease-in-out ${
                              open ? 'rotate-0' : 'rotate-180'
                            }`}
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-1 w-56 origin-top-right rounded-md  bg-[#EABB76] shadow-lg ">
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? 'bg-[#DC8F1A] text-white'
                                  : 'text-[#6D2223]'
                              } flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm transition-all duration-300 ease-in-out`}
                              onClick={() => {
                                router.push('/profile')
                              }}
                            >
                              <PencilSquareIcon className="h-6 w-6" />
                              Edit Profile
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? 'bg-red-normal text-white'
                                  : 'text-red-normal'
                              } flex w-full items-center gap-2 rounded-md px-2 py-2 font-poppinsBold text-sm transition-all duration-300 ease-in-out`}
                              onClick={async () => {
                                await signOut({
                                  redirect: false,
                                  callbackUrl: '/',
                                })
                                  .then((data) => {
                                    router.replace(data.url)
                                    toast.success('Logged Out!')
                                  })
                                  .catch((err) => {
                                    toast.error(err)
                                  })
                              }}
                            >
                              <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                              Keluar
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <Button
                  className="w-fit px-5 py-3 text-[12px]"
                  variant={1}
                  onClick={() => setAuthModalOpen(true)}
                >
                  Masuk
                </Button>
              )}
            </div>
            <div className="hidden h-[24px] w-[24px] rounded-full bg-[#272B52]" />
            <div className="hidden lg:block">
              <Navbarflowerright />
            </div>
          </div>
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-3 transform">
            <Navbarflower />
          </div>
        </div>
      </div>
    </>
  )
}
