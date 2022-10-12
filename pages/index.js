import dynamic from 'next/dynamic'

const DynamicPasswordGenerator = dynamic(() => import('../components/PasswordGenerator'), {
  ssr: false
})




export default function Home() {

  
  return (
    <DynamicPasswordGenerator />
  )
}
