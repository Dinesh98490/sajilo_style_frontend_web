import { ShoppingBag } from "lucide-react";

export function HeroSectionAlternative() {
  const handleShopNow = () => {
    console.log("Navigate to shop");
  };

  const handleLearnMore = () => {
    console.log("Navigate to about page");
  };

  return (
    <section className="relative w-full overflow-hidden bg-background py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          {/* Hero Content */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Discover Our Latest Collection
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Elevate your style with our premium quality products designed
                for comfort and elegance.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {/* Custom Orange Shop Now Button */}
              <button
                onClick={handleShopNow}
                style={{ backgroundColor: "#F97316" }} // Tailwind orange-500 hex
                className="inline-flex items-center gap-2 text-white font-medium px-6 py-3 rounded-full transition delay-150 duration-300 ease-in-out hover:bg-orange-600"
              >
                <ShoppingBag className="h-5 w-5" />
                Shop Now
              </button>

              {/* Learn More Button (Outlined) */}
              <button
                onClick={handleLearnMore}
                className="inline-flex items-center justify-center border border-gray-300 text-gray-700 hover:text-orange-500 hover:border-orange-500 px-6 py-3 rounded-full font-medium transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-full overflow-hidden rounded-xl md:h-[450px] lg:h-[500px]">
              <img
                src="/placeholder.svg?height=800&width=800"
                alt="Featured product"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
