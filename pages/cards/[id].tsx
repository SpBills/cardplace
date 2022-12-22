import { Card, PrismaClient, Review } from "@prisma/client"
import { GetServerSideProps } from "next"
import { useEffect, useState } from "react";
import Star from "../../components/star";

const prisma = new PrismaClient();
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const card = await prisma.card.findFirst({ where: { uid: params!.id as string }, include: { reviews: true } });
  return { props: { card } }
}

const average = (array: Array<number>) => array.length === 0 ? 0 : array.reduce((a, b) => a + b, 0) / array.length;

export default ({ card: { price, name, image, description, reviews }}: { card: Card & { reviews: Review[] } }) => {
  const [reviewAverage, setReviewAverage] = useState(0);

  useEffect(() => {
    const av = average(reviews.map(review => review.amount));
    setReviewAverage(av);
  }, []);

  return (
    <div className="bg-white">
      <div className="pt-6 pb-16 sm:pb-24">
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">{name}</h1>
                <p className="text-xl font-medium text-gray-900">${price}</p>
              </div>
              <div className="mt-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    {reviewAverage}
                    <span className="sr-only"> out of 5 stars</span>
                  </p>
                  <div className="ml-1 flex items-center">
                    {Array.from({length: reviewAverage}, () => 0).map(() => <Star />)}
                  </div>
                  <div aria-hidden="true" className="ml-4 text-sm text-gray-300">·</div>
                  <div className="ml-4 flex">
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">See all {reviews.length} reviews</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <h2 className="sr-only">Images</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
                <img src={image} alt="Content" className="lg:col-span-2 lg:row-span-2 rounded-lg" />
              </div>
            </div>

            <div className="mt-8 lg:col-span-5">
              <button type="submit" className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Purchase</button>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Description</h2>

                <div className="prose prose-sm mt-4 text-gray-500">
                  <p>{description}</p>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">Extra Information</h2>

                <div className="prose prose-sm mt-4 text-gray-500">
                  <ul role="list">
                    <li>Small Business</li>
                  </ul>
                </div>
              </div>

              <section aria-labelledby="policies-heading" className="mt-10">
                <h2 id="policies-heading" className="sr-only">Our Policies</h2>

                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                    <dt>
                      <svg className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64" />
                      </svg>
                      <span className="mt-4 text-sm font-medium text-gray-900">American Made</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-500">Designed and Printed in the U.S.A</dd>
                  </div>
                </dl>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}