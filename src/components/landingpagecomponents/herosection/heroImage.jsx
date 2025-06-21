import { IMAGE_PATHS } from "../../../common/imageConstant"
export function HeroImage() {
    return (
      <div className="flex items-center justify-center">
        <div className="relative h-[350px] w-full overflow-hidden rounded-xl md:h-[450px] lg:h-[500px]">
          <img
            src={IMAGE_PATHS.landingimage2}
            alt="Featured product"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    )
  }
  