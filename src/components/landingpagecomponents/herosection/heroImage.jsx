import { IMAGE_PATHS } from "../../../common/imageConstant"

export function HeroImage() {
  return (
    <div className="flex items-center justify-center">
      {/* The height values here have been increased */}
      <div className="relative h-[400px] w-full overflow-hidden rounded-xl md:h-[500px] lg:h-[550px]">
        <img
          src={IMAGE_PATHS.landingimage2}
          alt="Featured product"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}