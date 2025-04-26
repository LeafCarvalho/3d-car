import { Mapa } from '../components/mapa/Mapa'


export const Home = () => {
  const position: [number, number] = [-23.805383, -45.670096]

  return (
    <Mapa position={position} />
  )
}