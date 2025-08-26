import Navbar from "./Navbar"

type HeaderProps = {
  title: string
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className='flex flex-col h-20 bg-white dark:bg-black text-black dark:text-white'>
        <div className='flex-1 flex justify-center items-center'>
            <h1 className=''>{title}</h1>
            <p className='absolute top-0 left-0 p-1 font-bold'>22068917</p>
        </div>
        <div className='flex-1'>
            <Navbar />
        </div>
    </header>
  )
}