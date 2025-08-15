import Navbar from "./Navbar"

type HeaderProps = {
  title: string
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className='flex flex-col h-20'>
        <div className='flex-1 flex bg-blue-200 justify-center items-center'>
            <h1 className=''>{title}</h1>
            <p className='absolute top-0 left-0 p-1 font-bold'>22068917</p>
        </div>
        <div className='flex-1 bg-green-200'>
            <Navbar />
        </div>
    </header>
  )
}