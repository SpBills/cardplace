import { Card } from "@prisma/client"
import Link from "next/link"
import { PropsWithChildren } from "react"
export default ({ card: { uid, image, name, price } }: { card: Card }) => {
  return (
    <Link href={`/cards/${uid}`} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3">
        <img src={image} alt="Person using a pen to cross a task off a productivity paper card." className="h-full w-full object-cover object-center group-hover:opacity-75" />
      </div>
      <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
        <h3>{name}</h3>
        <p>${price}</p>
      </div>
    </Link>
  )
}