import Navbar from "./Navbar"

type HeaderProps = {
  title: string
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className='flex flex-col bg-white dark:bg-charcoalblack text-black dark:text-pearl transition-all'>
        <div className='flex-1 flex justify-center items-center mt-2 mb-4'>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className='absolute top-0 left-0 p-2'>22068917</p>
        </div>
        <div className='flex-1'>
            <Navbar />
        </div>
    </header>
  )
}