import { HeroContent } from "./heroContent";
import { HeroImage } from "./heroImage";

export function HeroSection() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    // Add form submit logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full overflow-hidden bg-background py-12 md:py-24"
    >
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <HeroContent />
          <HeroImage />
        </div>
      </div>
    </form>
  );
}
