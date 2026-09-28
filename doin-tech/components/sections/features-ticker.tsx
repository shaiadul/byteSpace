import Image from "next/image";

const brandLogos = [
  { name: "Logoipsum 1", src: "/images/brand/brand01.png", width: 167, height: 41 },
  { name: "Logoipsum 2", src: "/images/brand/brand02.png", width: 168, height: 41 },
  { name: "Logoipsum 3", src: "/images/brand/brand03.png", width: 170, height: 41 },
  { name: "Logoipsum 4", src: "/images/brand/brand04.png", width: 170, height: 41 },
  { name: "Logoipsum 5", src: "/images/brand/brand05.png", width: 169, height: 42 },
];

export function FeaturesTicker() {
  return (
    <section className="bg-muted py-9 sm:py-11 md:py-12 relative z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-center sm:justify-between flex-wrap md:flex-nowrap gap-8 sm:gap-10 lg:gap-12">
          {brandLogos.map((brand, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center transition-opacity duration-200 hover:opacity-75"
            >
              <Image
                src={brand.src}
                alt={brand.name}
                width={brand.width}
                height={brand.height}
                className="h-7 sm:h-8 md:h-8.5 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
