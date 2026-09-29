import { Link } from "react-router-dom";

function Hero({ products }) {
  return (
    <section className="bg-[#f7f3eb] px-6 pb-12 pt-10 md:px-12">
      <div className="mx-auto max-w-7xl">
    
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em]">
           Derived from the word for grace and charm.
          </p>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Balances natural authentic beauty
            <br />
           with bold individual style.
          </h1>
        </div>

        
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">

        
          <div className="flex flex-col gap-4">
            {products[0] && (
              <Link
                to={`/product/${products[0].id}`}
                className="h-[240px] overflow-hidden rounded-[24px]"
              >
                <img
                  src={products[0].thumbnail}
                  alt={products[0].title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-110"
                />
              </Link>
            )}

            {products[1] && (
              <Link
                to={`/product/${products[1].id}`}
                className="h-[110px] overflow-hidden rounded-[24px]"
              >
                <img
                  src={products[1].thumbnail}
                  alt={products[1].title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-110"
                />
              </Link>
            )}
          </div>

          
          {products[2] && (
            <Link
              to={`/product/${products[2].id}`}
              className="h-[360px] overflow-hidden rounded-[24px] md:mt-10"
            >
              <img
                src={products[2].thumbnail}
                alt={products[2].title}
                className="h-full w-full object-cover transition duration-500 hover:scale-110"
              />
            </Link>
          )}

        
          <div className="flex flex-col gap-4">
            {products[3] && (
              <Link
                to={`/product/${products[3].id}`}
                className="h-[250px] overflow-hidden rounded-[24px]"
              >
                <img
                  src={products[3].thumbnail}
                  alt={products[3].title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-110"
                />
              </Link>
            )}

            <Link
              to="/shop"
              className="flex items-center justify-center rounded-full bg-[#1d1d1f] px-6 py-5 text-sm text-white transition hover:scale-105"
            >
              Explore Products →
            </Link>
          </div>

          
          {products[4] && (
            <Link
              to={`/product/${products[4].id}`}
              className="h-[360px] overflow-hidden rounded-[24px] md:mt-10"
            >
              <img
                src={products[4].thumbnail}
                alt={products[4].title}
                className="h-full w-full object-cover transition duration-500 hover:scale-110"
              />
            </Link>
          )}

          
          <div className="hidden flex-col gap-4 md:flex">
            {products[5] && (
              <Link
                to={`/product/${products[5].id}`}
                className="h-[240px] overflow-hidden rounded-[24px]"
              >
                <img
                  src={products[5].thumbnail}
                  alt={products[5].title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-110"
                />
              </Link>
            )}

            {products[6] && (
              <Link
                to={`/product/${products[6].id}`}
                className="h-[110px] overflow-hidden rounded-[24px]"
              >
                <img
                  src={products[6].thumbnail}
                  alt={products[6].title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-110"
                />
              </Link>
            )}
          </div>
        </div>

        
        <div className="mt-16 grid gap-12 md:grid-cols-2 md:items-end">

        
          <div className="max-w-md">
            <div className="text-5xl text-gray-400">“</div>

            <p className="mt-3 text-sm leading-relaxed text-gray-700">
                           Aurae Beauty — Soft, sophisticated, and focused on inner light and presence.
            </p>

            <p className="mt-5 text-xl font-serif italic">
            maobi
            </p>
          </div>

          
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-4">
                <span className="text-5xl font-light">01</span>

                <span className="text-xs text-gray-500">
                  Beauty
                </span>
              </div>

              <h2 className="mt-4 max-w-md text-2xl font-bold leading-tight md:text-3xl">
                Build Up Your Confidence With The Latest Beauty Products.
              </h2>
            </div>

            <Link to="/shop" className="text-3xl">
              →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;